'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  light?: boolean;
  className?: string;
}

const locales = ['tr', 'en'] as const;
type Locale = (typeof locales)[number];

export default function LanguageSwitcher({
  light = false,
  className,
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  const segments = pathname.split('/').filter(Boolean);
  const currentLocale: Locale =
    segments[0] && locales.includes(segments[0] as Locale)
      ? (segments[0] as Locale)
      : 'tr';

  function switchLocale(locale: Locale) {
    if (locale === currentLocale) return;
    const newSegments = [...segments];
    if (locales.includes(segments[0] as Locale)) {
      newSegments[0] = locale;
    } else {
      newSegments.unshift(locale);
    }
    router.push('/' + newSegments.join('/'));
  }

  return (
    <div
      className={cn(
        'relative inline-flex items-center rounded-full p-1 text-[11px] font-semibold uppercase tracking-[0.14em]',
        'transition-colors duration-300',
        light
          ? 'bg-white/10 ring-1 ring-inset ring-white/15 backdrop-blur'
          : 'bg-neutral-100 ring-1 ring-inset ring-neutral-200',
        className
      )}
      role="group"
      aria-label="Language switcher"
    >
      {locales.map((locale) => {
        const isActive = locale === currentLocale;
        return (
          <button
            key={locale}
            type="button"
            onClick={() => switchLocale(locale)}
            aria-current={isActive ? 'true' : undefined}
            className={cn(
              'relative z-10 px-3 py-1 rounded-full transition-colors duration-300 min-w-[2.25rem]',
              isActive
                ? light
                  ? 'text-primary-900'
                  : 'text-white'
                : light
                  ? 'text-white/70 hover:text-white'
                  : 'text-neutral-500 hover:text-neutral-800'
            )}
          >
            {isActive && (
              <motion.span
                layoutId="lang-pill-thumb"
                className={cn(
                  'absolute inset-0 -z-10 rounded-full shadow-sm',
                  light
                    ? 'bg-white'
                    : 'bg-primary-600'
                )}
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                aria-hidden="true"
              />
            )}
            {locale.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
