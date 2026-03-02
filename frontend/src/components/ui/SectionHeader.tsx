import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeader({
  title,
  subtitle,
  centered = false,
  light = false,
}: SectionHeaderProps) {
  return (
    <div className={cn('mb-12', centered && 'text-center')}>
      <h2
        className={cn(
          'text-3xl md:text-4xl font-bold font-heading',
          light ? 'text-white' : 'text-neutral-900'
        )}
      >
        {title}
      </h2>

      {/* Decorative accent bar */}
      <div
        className={cn(
          'mt-4 h-1 w-16 rounded-full',
          light ? 'bg-accent-400' : 'bg-primary-500',
          centered && 'mx-auto'
        )}
        aria-hidden="true"
      />

      {subtitle && (
        <p
          className={cn(
            'mt-4 text-lg max-w-2xl',
            light ? 'text-white/80' : 'text-neutral-500',
            centered && 'mx-auto'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
