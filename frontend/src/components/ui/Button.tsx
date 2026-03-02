'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Link } from '@/i18n/navigation';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  loading?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<string, string> = {
  primary:
    'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 focus-visible:ring-primary-500',
  secondary:
    'bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-600 focus-visible:ring-accent-500',
  outline:
    'border-2 border-white text-white hover:bg-white/10 active:bg-white/20 focus-visible:ring-white',
  ghost:
    'text-primary-600 hover:bg-primary-50 active:bg-primary-100 focus-visible:ring-primary-500',
};

const sizeStyles: Record<string, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-2.5 text-base gap-2',
  lg: 'px-8 py-3.5 text-lg gap-2.5',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  loading = false,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = cn(
    'inline-flex items-center justify-center font-semibold rounded-lg',
    'transition-all duration-200 ease-in-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  const content = (
    <>
      {loading && (
        <Loader2
          className={cn('animate-spin', size === 'sm' ? 'h-4 w-4' : 'h-5 w-5')}
        />
      )}
      {children}
    </>
  );

  if (href && !disabled && !loading) {
    return (
      <Link href={href} className={baseStyles}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={baseStyles}
      disabled={disabled || loading}
      {...props}
    >
      {content}
    </button>
  );
}
