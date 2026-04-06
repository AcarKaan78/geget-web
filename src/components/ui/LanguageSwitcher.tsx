'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  light?: boolean;
  className?: string;
}

const locales = ['tr', 'en'] as const;
type Locale = (typeof locales)[number];

const localeLabels: Record<Locale, string> = {
  tr: 'TR',
  en: 'EN',
};

export default function LanguageSwitcher({
  light = false,
  className,
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Extract current locale from the first segment of the pathname
  const segments = pathname.split('/').filter(Boolean);
  const currentLocale: Locale =
    segments[0] && locales.includes(segments[0] as Locale)
      ? (segments[0] as Locale)
      : 'tr';

  function switchLocale(locale: Locale) {
    if (locale === currentLocale) return;

    // Replace the locale segment in the pathname
    const newSegments = [...segments];
    if (locales.includes(segments[0] as Locale)) {
      newSegments[0] = locale;
    } else {
      newSegments.unshift(locale);
    }

    const newPath = '/' + newSegments.join('/');
    router.push(newPath);
  }

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 text-sm uppercase tracking-wide',
        className
      )}
    >
      {locales.map((locale, index) => (
        <React.Fragment key={locale}>
          {index > 0 && (
            <span
              className={cn(
                light ? 'text-white/40' : 'text-neutral-300'
              )}
              aria-hidden="true"
            >
              |
            </span>
          )}
          <button
            onClick={() => switchLocale(locale)}
            className={cn(
              'transition-colors duration-200 hover:opacity-80',
              locale === currentLocale
                ? cn(
                    'font-bold',
                    light ? 'text-accent-300' : 'text-primary-500'
                  )
                : cn(
                    light ? 'text-white/70' : 'text-neutral-500'
                  )
            )}
            aria-label={`Switch to ${localeLabels[locale]}`}
            aria-current={locale === currentLocale ? 'true' : undefined}
          >
            {localeLabels[locale]}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
}
