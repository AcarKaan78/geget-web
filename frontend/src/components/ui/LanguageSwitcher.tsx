'use client';

import React, { useTransition } from 'react';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (newLocale: 'tr' | 'en') => {
    if (newLocale === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-lg border border-neutral-200 p-0.5',
        'bg-neutral-100',
        isPending && 'opacity-60 pointer-events-none',
        className
      )}
      role="radiogroup"
      aria-label="Dil secimi"
    >
      <button
        role="radio"
        aria-checked={locale === 'tr'}
        onClick={() => switchLocale('tr')}
        className={cn(
          'px-3 py-1 text-sm font-semibold rounded-md transition-all duration-200',
          locale === 'tr'
            ? 'bg-primary-600 text-white shadow-sm'
            : 'text-neutral-600 hover:text-neutral-900'
        )}
      >
        TR
      </button>
      <button
        role="radio"
        aria-checked={locale === 'en'}
        onClick={() => switchLocale('en')}
        className={cn(
          'px-3 py-1 text-sm font-semibold rounded-md transition-all duration-200',
          locale === 'en'
            ? 'bg-primary-600 text-white shadow-sm'
            : 'text-neutral-600 hover:text-neutral-900'
        )}
      >
        EN
      </button>
    </div>
  );
}
