import React from 'react';
import { cn } from '@/lib/utils';

interface NoiseOverlayProps {
  opacity?: number;
  blend?: 'overlay' | 'soft-light' | 'screen' | 'multiply';
  className?: string;
}

/**
 * A subtle SVG-based grain layer. Kills banding on dark gradients and adds
 * a quiet print-like texture. Render inside a relative container.
 */
export default function NoiseOverlay({
  opacity = 0.12,
  blend = 'overlay',
  className,
}: NoiseOverlayProps) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>`;
  return (
    <div
      aria-hidden="true"
      className={cn('absolute inset-0 pointer-events-none', className)}
      style={{
        backgroundImage: `url("data:image/svg+xml;utf8,${svg}")`,
        backgroundSize: '180px 180px',
        opacity,
        mixBlendMode: blend,
      }}
    />
  );
}
