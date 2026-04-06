import React from 'react';
import { cn } from '@/lib/utils';

type CardPadding = 'sm' | 'md' | 'lg';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: CardPadding;
}

const paddingStyles: Record<CardPadding, string> = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export default function Card({
  children,
  className,
  hover = true,
  padding = 'md',
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl bg-white border border-neutral-200 shadow-sm',
        'transition-all duration-300',
        hover && 'hover:-translate-y-1 hover:shadow-lg',
        paddingStyles[padding],
        className
      )}
    >
      {children}
    </div>
  );
}
