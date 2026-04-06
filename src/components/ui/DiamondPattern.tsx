'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface DiamondPatternProps {
  count?: number;
  opacity?: number;
  color?: string;
  animated?: boolean;
  className?: string;
}

/**
 * Deterministic pseudo-random number generator based on index.
 * Returns a value between 0 and 1.
 */
function seededValue(index: number, seed: number): number {
  const x = Math.sin(index * 9301 + seed * 49297) * 49271;
  return x - Math.floor(x);
}

export default function DiamondPattern({
  count = 5,
  opacity = 0.05,
  color = 'white',
  animated = true,
  className,
}: DiamondPatternProps) {
  const diamonds = Array.from({ length: count }, (_, i) => {
    // Deterministic size between 64px (w-16) and 160px (w-40)
    const size = 64 + seededValue(i, 1) * 96;
    // Deterministic positions
    const top = seededValue(i, 2) * 100;
    const left = seededValue(i, 3) * 100;
    // Deterministic animation delay
    const animDelay = seededValue(i, 4) * 6;
    // Deterministic animation duration between 6s and 12s
    const animDuration = 6 + seededValue(i, 5) * 6;

    return {
      size,
      top,
      left,
      animDelay,
      animDuration,
    };
  });

  return (
    <div
      className={cn(
        'absolute inset-0 pointer-events-none overflow-hidden',
        className
      )}
      aria-hidden="true"
    >
      {diamonds.map((d, i) => (
        <div
          key={i}
          className={cn(
            'absolute border border-current rotate-45',
            animated && 'animate-float'
          )}
          style={{
            width: d.size,
            height: d.size,
            top: `${d.top}%`,
            left: `${d.left}%`,
            color,
            opacity,
            animationDelay: animated ? `${d.animDelay}s` : undefined,
            animationDuration: animated ? `${d.animDuration}s` : undefined,
          }}
        />
      ))}
    </div>
  );
}
