'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Menu } from 'lucide-react';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import MobileMenu from '@/components/layout/MobileMenu';

export default function Navbar() {
  const t = useTranslations('common');
  const pathname = usePathname();
  const scrollY = useScrollPosition();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isScrolled = scrollY >= 50;

  // Extract locale from pathname (first segment)
  const segments = pathname.split('/').filter(Boolean);
  const locale = segments[0] === 'en' ? 'en' : 'tr';

  // Current path without locale prefix for active-link matching
  const pathWithoutLocale = '/' + segments.slice(1).join('/');

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'transition-all duration-300 ease-in-out',
          isScrolled
            ? 'bg-white shadow-md text-neutral-800'
            : 'bg-transparent text-white'
        )}
      >
        <Container>
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href={`/${locale}`}
              className={cn(
                'font-heading font-bold text-xl transition-colors duration-300',
                isScrolled ? 'text-primary-700' : 'text-white'
              )}
            >
              GEGET
            </Link>

            {/* Desktop nav links */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const labelKey = link.labelKey.replace('common.', '');
                const href = `/${locale}${link.href === '/' ? '' : link.href}`;
                const isActive =
                  link.href === '/'
                    ? pathWithoutLocale === '/' || pathWithoutLocale === ''
                    : pathWithoutLocale.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={href}
                    className={cn(
                      'relative px-3 py-2 text-sm font-medium uppercase tracking-wide',
                      'transition-colors duration-200',
                      // Active state
                      isActive
                        ? isScrolled
                          ? 'text-primary-500'
                          : 'text-accent-300'
                        : isScrolled
                          ? 'text-neutral-600 hover:text-primary-500'
                          : 'text-white/90 hover:text-white',
                      // Underline group
                      'group'
                    )}
                  >
                    {t(labelKey)}

                    {/* Animated underline */}
                    <span
                      className={cn(
                        'absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2',
                        'transition-all duration-300 ease-out',
                        isActive
                          ? cn(
                              'w-full',
                              isScrolled ? 'bg-primary-500' : 'bg-accent-300'
                            )
                          : cn(
                              'w-0 group-hover:w-full',
                              isScrolled
                                ? 'bg-primary-500'
                                : 'bg-white'
                            )
                      )}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Right side: language switcher + CTA + hamburger */}
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-3">
                <LanguageSwitcher light={!isScrolled} />
                <Button
                  variant="primary"
                  size="sm"
                  href={`/${locale}/iletisim`}
                >
                  {t('cta.contact')}
                </Button>
              </div>

              {/* Mobile hamburger */}
              <button
                className={cn(
                  'md:hidden p-2 rounded-lg transition-colors duration-200',
                  isScrolled
                    ? 'text-neutral-700 hover:bg-neutral-100'
                    : 'text-white hover:bg-white/10'
                )}
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        locale={locale}
      />
    </>
  );
}
