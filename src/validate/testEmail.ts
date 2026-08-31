// Quick test script to verify the Resend setup for the contact form.
// Run with: bun run test-email
// Bun loads .env.local automatically, so no dotenv needed.
import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL;
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL;

const DEFAULT_FROM = 'Portfolio Contact <onboarding@resend.dev>';

async function testEmail(): Promise<void> {
  console.log('🔍 Testing Resend setup...\n');

  if (!RESEND_API_KEY) {
    console.log('❌ RESEND_API_KEY not found!');
    console.log('   Add it to .env.local:');
    console.log('   RESEND_API_KEY="re_..."\n');
    return;
  }

  if (!CONTACT_TO_EMAIL) {
    console.log('❌ CONTACT_TO_EMAIL not found!');
    console.log('   Add the address that should receive contact messages:');
    console.log('   CONTACT_TO_EMAIL="you@example.com"\n');
    console.log(
      "   On Resend's test domain this must be the same address you\n" +
        '   created the Resend account with, or delivery is refused.\n',
    );
    return;
  }

  const from = CONTACT_FROM_EMAIL || DEFAULT_FROM;

  console.log('1️⃣ Configuration');
  console.log(`   From: ${from}`);
  console.log(`   To:   ${CONTACT_TO_EMAIL}\n`);

  console.log('2️⃣ Sending test message...');

  const { data, error } = await new Resend(RESEND_API_KEY).emails.send({
    from,
    to: CONTACT_TO_EMAIL,
    replyTo: 'visitor@example.com',
    subject: 'New portfolio message from Test Visitor',
    text: 'This is a test message from your portfolio contact form.',
    html: '<p>This is a test message from your portfolio contact form.</p>',
  });

  if (error) {
    console.log('❌ Failed to send!');
    console.log(`   ${error.name}: ${error.message}\n`);
    console.log('   Common causes:');
    console.log('   • The API key is wrong or lacks sending permission.');
    console.log(
      '   • On the test domain, CONTACT_TO_EMAIL is not your Resend\n' +
        '     account address.\n',
    );
    return;
  }

  console.log('✅ Test message sent!');
  console.log(`   Email id: ${data?.id}`);
  console.log(`   Check ${CONTACT_TO_EMAIL} — and try hitting Reply, it`);
  console.log('   should address visitor@example.com, not yourself.\n');
  console.log('🎉 Your contact form should work now.\n');
}

testEmail().catch(console.error);
