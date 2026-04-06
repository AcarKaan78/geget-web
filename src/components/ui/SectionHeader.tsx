import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  overline?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
}

export default function SectionHeader({
  overline,
  title,
  subtitle,
  align = 'center',
  light = false,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        align === 'center' && 'text-center',
        align === 'left' && 'text-left'
      )}
    >
      {overline && (
        <span
          className={cn(
            'inline-block uppercase tracking-widest text-sm font-semibold',
            light ? 'text-accent-300' : 'text-primary-500'
          )}
        >
          {overline}
        </span>
      )}

      <h2
        className={cn(
          'text-3xl md:text-4xl font-heading font-bold',
          overline && 'mt-3',
          light ? 'text-white' : 'text-neutral-900'
        )}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={cn(
            'text-lg mt-4',
            light ? 'text-neutral-300' : 'text-neutral-500',
            align === 'center' && 'max-w-2xl mx-auto'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
