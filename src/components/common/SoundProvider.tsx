'use client';

import { bind, setVolume } from 'cuelume';
import { useEffect } from 'react';

/** Global loudness for every cuelume sound, from 0 to 1. */
const VOLUME = 0.7;

/**
 * Everything a visitor reads as a button.
 *
 * `[data-slot="button"]` matters as much as `button` here: our own `<Button>`
 * renders an `<a>` whenever it is used with `asChild` (the navbar home button,
 * every "View details" link), and Radix triggers do the same. `[role="button"]`
 * catches the rest of the primitives that dress a `div` up as a control.
 */
const BUTTON_SELECTOR = [
  'button',
  '[role="button"]',
  '[data-slot="button"]',
  'input[type="button"]',
  'input[type="submit"]',
  'input[type="reset"]',
  'summary',
].join(',');

const PRESS_ATTR = 'data-cuelume-press';
const RELEASE_ATTR = 'data-cuelume-release';

/** Put this on a button (or any ancestor) to keep that subtree silent. */
const IGNORE_ATTR = 'data-cuelume-ignore';

const markElement = (element: Element) => {
  if (element.closest(`[${IGNORE_ATTR}]`)) return;

  // An empty value is intentional — cuelume falls back to its own `press` and
  // `release` recipes for any attribute that doesn't name a sound.
  if (!element.hasAttribute(PRESS_ATTR)) element.setAttribute(PRESS_ATTR, '');
  if (!element.hasAttribute(RELEASE_ATTR))
    element.setAttribute(RELEASE_ATTR, '');
};

const markSubtree = (root: Element) => {
  if (root.matches(BUTTON_SELECTOR)) markElement(root);
  root.querySelectorAll(BUTTON_SELECTOR).forEach(markElement);
};

/**
 * Gives every button on the site the same press/release click, via cuelume's
 * declarative `data-cuelume-*` attributes.
 *
 * `bind()` installs delegated listeners on the document once and resolves the
 * attributes at event time, so the attributes are all that any element needs.
 * Stamping them is the job left over, and it can't be done once at startup: a
 * portfolio built on the App Router swaps its page content client-side, and
 * dialogs, dropdowns and tooltips only reach the DOM when they open. A
 * `MutationObserver` keeps up with all of it, so a new button anywhere is
 * audible without being wired up by hand.
 */
export default function SoundProvider() {
  useEffect(() => {
    // Idempotent per root, and its listeners live for the life of the
    // document — nothing to tear down when this effect re-runs.
    bind();
    setVolume(VOLUME);

    markSubtree(document.body);

    const observer = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (node instanceof Element) markSubtree(node);
        }
      }
    });

    // Only `childList` — we never react to our own attribute writes, so there
    // is no feedback loop to guard against.
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null;
}
