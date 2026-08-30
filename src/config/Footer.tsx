import { about } from './About';

export const footerConfig = {
  developer: about.name,
  text: 'Built by',
  copyright: 'All rights reserved.',
  // Template credit — the portfolio design this site is built on.
  // Leave empty to hide the credit line entirely.
  templateCredit: {} as { text?: string; href?: string; name?: string },
};
