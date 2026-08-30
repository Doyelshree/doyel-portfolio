import { footerConfig } from '@/config/Footer';
import React from 'react';

import Container from './Container';

export default function Footer() {
  return (
    <Container className="py-16">
      <div className="flex flex-col items-center justify-center">
        <p className="text-secondary text-center text-sm">
          {footerConfig.text} <b>{footerConfig.developer}</b> <br /> &copy;{' '}
          {new Date().getFullYear()}. {footerConfig.copyright}
        </p>
        {footerConfig.templateCredit.name && footerConfig.templateCredit.href && (
          <p className="text-secondary mt-2 text-center text-xs">
            {footerConfig.templateCredit.text}{' '}
            <a
              href={footerConfig.templateCredit.href}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              {footerConfig.templateCredit.name}
            </a>
          </p>
        )}
      </div>
    </Container>
  );
}
