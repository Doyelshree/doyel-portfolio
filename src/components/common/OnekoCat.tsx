import { catConfig } from '@/config/Cat';
import Script from 'next/script';
import React from 'react';

export default function OnekoCat() {
  if (!catConfig.enabled) {
    return null;
  }

  // Absolute, not './oneko/...'. next/script injects this client-side, so a
  // relative URL resolves against the current page: fine on /projects, but on
  // /projects/farmora it becomes /projects/oneko/oneko.js and 404s, and the cat
  // never loads for the rest of the session.
  return <Script src="/oneko/oneko.js" data-cat="/oneko/oneko.gif" />;
}
