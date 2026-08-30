import { House } from 'lucide-react';
import { Link } from 'next-view-transitions';
import React from 'react';

import { Button } from '../ui/button';
import { ThemeToggleButton } from './ThemeSwitch';

/**
 * Transparent sticky bar carrying a single pill of controls — home and the
 * theme toggle — aligned to the top right. The bar itself paints nothing, so
 * the page shows through; only the pill has a surface.
 */
export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 w-full bg-transparent">
      <nav
        aria-label="Primary"
        className="flex justify-end py-4 pr-12 pl-4 md:py-6 md:pr-84 md:pl-6"
      >
        <div className="flex items-center gap-1 rounded-full border border-gray-100 bg-white/70 p-1 shadow-sm backdrop-blur-md dark:border-gray-800 dark:bg-neutral-900/70">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="size-10 rounded-full transition-all duration-300 active:scale-95"
            track={{
              name: 'button_click',
              data: { buttonId: 'home', section: 'navbar' },
            }}
          >
            <Link href="/" aria-label="Home">
              <House className="size-4" />
            </Link>
          </Button>
          {/* Reveal originates from the toggle's own corner. */}
          <ThemeToggleButton
            className="rounded-full"
            variant="circle"
            start="top-right"
            blur
          />
        </div>
      </nav>
    </header>
  );
}
