import { socialHandles } from '@/config/Hero';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import * as z from 'zod';

const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

// Resend's shared test domain. Swap this for an address on your own verified
// domain (via CONTACT_FROM_EMAIL) once you have one — no other code changes.
const DEFAULT_FROM = 'Portfolio Contact <onboarding@resend.dev>';

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email(),
  message: z.string().trim().min(10).max(1000),
  // Honeypot. The form renders this hidden, so a real visitor always leaves it
  // empty; anything in it came from a bot filling every input it found.
  website: z.string().optional(),
});

function getClientIP(request: NextRequest): string {
  // Get IP from various headers in order of preference
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (realIP) {
    return realIP;
  }
  if (cfConnectingIP) {
    return cfConnectingIP;
  }

  return 'unknown';
}

function checkRateLimit(clientIP: string): {
  allowed: boolean;
  remaining: number;
} {
  const now = Date.now();
  const clientData = rateLimitStore.get(clientIP);

  if (!clientData || now > clientData.resetTime) {
    // First request or window expired
    rateLimitStore.set(clientIP, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1 };
  }

  if (clientData.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  // Increment count
  clientData.count++;
  rateLimitStore.set(clientIP, clientData);

  return {
    allowed: true,
    remaining: RATE_LIMIT_MAX_REQUESTS - clientData.count,
  };
}

/**
 * Everything a visitor types is interpolated into the HTML body, so it has to
 * be escaped — otherwise a message containing markup would render as markup in
 * the inbox.
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function sendEmail(data: {
  name: string;
  email: string;
  message: string;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error('RESEND_API_KEY not configured');
    return false;
  }

  // Defaults to the address in the Hero config — the repo's single source of
  // truth for contact details. On Resend's test domain this has to be the same
  // address the Resend account was created with, or delivery is refused.
  const to = process.env.CONTACT_TO_EMAIL || socialHandles.email;
  const from = process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM;
  const submittedAt = new Date().toISOString();

  const text = [
    `Name:  ${data.name}`,
    `Email: ${data.email}`,
    '',
    data.message,
    '',
    `Submitted: ${submittedAt}`,
  ].join('\n');

  const html = `
    <div style="font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #111;">
      <h2 style="margin: 0 0 16px; font-size: 18px;">New portfolio message</h2>
      <p style="margin: 0 0 4px;"><strong>Name:</strong> ${escapeHtml(data.name)}</p>
      <p style="margin: 0 0 16px;"><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <div style="padding: 16px; background: #f5f5f5; border-radius: 8px; white-space: pre-wrap;">${escapeHtml(
        data.message,
      )}</div>
      <p style="margin: 16px 0 0; font-size: 12px; color: #666;">Submitted ${submittedAt}</p>
    </div>
  `.trim();

  try {
    const { data: sent, error } = await new Resend(apiKey).emails.send({
      from,
      to,
      // So replying from the inbox reaches the visitor rather than yourself.
      replyTo: data.email,
      subject: `New portfolio message from ${data.name}`,
      text,
      html,
    });

    if (error) {
      console.error('Failed to send contact email:', error);
      return false;
    }

    return Boolean(sent);
  } catch (error) {
    console.error('Error sending contact email:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const clientIP = getClientIP(request);
    const rateLimit = checkRateLimit(clientIP);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: 'Too many requests. Please try again later.',
          retryAfter: RATE_LIMIT_WINDOW / 1000,
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': (Date.now() + RATE_LIMIT_WINDOW).toString(),
          },
        },
      );
    }

    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // Report success without sending. Telling a bot that the honeypot gave it
    // away only teaches it to skip the field next time.
    if (validatedData.website) {
      return NextResponse.json({
        message: 'Message sent successfully!',
        success: true,
      });
    }

    const emailSent = await sendEmail(validatedData);

    if (!emailSent) {
      return NextResponse.json(
        { error: 'Failed to send message. Please try again.' },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        message: 'Message sent successfully!',
        success: true,
      },
      {
        headers: {
          'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
        },
      },
    );
  } catch (error) {
    console.error('API Error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Invalid form data',
          details: error.errors,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
