import Container from '@/components/common/Container';
import { Button } from '@/components/ui/button';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { resumeConfig } from '@/config/Resume';
import { Download } from 'lucide-react';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  ...getMetadata('/resume'),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function ResumePage() {
  return (
    <Container>
      <div className="mx-auto w-full max-w-3xl space-y-4">
        <div className="flex justify-end">
          <Button
            asChild
            variant="outline"
            track={{
              name: 'button_click',
              data: { buttonId: 'resume_download', section: 'resume_page' },
            }}
          >
            {/* Same-origin, so `download` actually saves the file rather than
                opening it in a tab. */}
            <a
              href={resumeConfig.url}
              download={resumeConfig.fileName}
              className="flex items-center gap-2"
            >
              <Download className="size-4" />
              Download Resume
            </a>
          </Button>
        </div>
        {/* svh rather than vh so mobile browsers' collapsing toolbars do not
            push the viewer past the bottom of the screen. */}
        <iframe
          src={resumeConfig.url}
          title="Resume"
          className="block h-[calc(100svh-12rem)] w-full rounded-lg border"
        ></iframe>
      </div>
    </Container>
  );
}
