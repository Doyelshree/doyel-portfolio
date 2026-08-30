'use client';

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import React, { useState } from 'react';

/**
 * The wobble from `WobbleCard`, retargeted at a fixed image frame.
 *
 * `WobbleCard` translates its own outer <section>, which works when the card is
 * the outermost element but tears a gap open when the frame is clipped by a
 * parent (a card header, an aspect-video box). Here the frame stays put and the
 * image drifts inside it: the drift maxes out at half the frame / 20 = 2.5%,
 * and the 1.06 hover scale gives 3% of bleed on every side to cover it.
 */
export const WobbleImage = ({
  children,
  className,
  containerClassName,
  overlay,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  /** Rendered above the wobbling image and left un-wobbled (play buttons, scrims). */
  overlay?: React.ReactNode;
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = event;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (clientX - (rect.left + rect.width / 2)) / 20;
    const y = (clientY - (rect.top + rect.height / 2)) / 20;
    setMousePosition({ x, y });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      className={cn('relative overflow-hidden', containerClassName)}
    >
      <motion.div
        style={{
          transform: isHovering
            ? `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) scale3d(1.06, 1.06, 1)`
            : 'translate3d(0px, 0px, 0) scale3d(1, 1, 1)',
          transition: 'transform 0.1s ease-out',
        }}
        className={cn('relative h-full w-full', className)}
      >
        {children}
      </motion.div>
      {overlay}
    </div>
  );
};
