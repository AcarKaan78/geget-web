'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Menu, ArrowUpRight } from 'lucide-react';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import Container from '@/components/ui/Container';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import MobileMenu from '@/components/layout/MobileMenu';

export default function Navbar() {
  const t = useTranslations('common');
  const pathname = usePathname();
  const scrollY = useScrollPosition();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isScrolled = scrollY >= 40;

  const segments = pathname.split('/').filter(Boolean);
  const locale = segments[0] === 'en' ? 'en' : 'tr';
  const pathWithoutLocale = '/' + segments.slice(1).join('/');

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'transition-[background-color,border-color,backdrop-filter,box-shadow] duration-500 ease-out',
          isScrolled
            ? 'bg-white/85 backdrop-blur-xl border-b border-neutral-200/70 shadow-[0_1px_0_0_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.2)]'
            : 'bg-transparent border-b border-transparent'
        )}
      >
        <Container>
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Brand */}
            <Link
              href={`/${locale}`}
              className="group flex items-center gap-3 transition-opacity"
              aria-label="GEGET"
            >
              <span className="relative inline-flex h-9 w-9 md:h-10 md:w-10">
                <Image
                  src="/images/logo-mark.png"
                  alt=""
                  width={80}
                  height={80}
                  priority
                  className="object-contain drop-shadow-sm"
                />
                <span
                  aria-hidden
                  className={cn(
                    'absolute inset-0 rounded-md blur-md transition-opacity duration-500',
                    isScrolled ? 'opacity-0' : 'opacity-60',
                    'bg-accent-500/20'
                  )}
                />
              </span>
              <span className="flex flex-col leading-none">
                <span
                  className={cn(
                    'font-heading font-bold text-lg md:text-xl tracking-tight transition-colors duration-500',
                    isScrolled ? 'text-primary-800' : 'text-white'
                  )}
                >
                  GEGET
                </span>
                <span
                  className={cn(
                    'hidden md:block font-body text-[10px] uppercase tracking-[0.22em] mt-0.5 transition-colors duration-500',
                    isScrolled ? 'text-neutral-400' : 'text-white/60'
                  )}
                >
                  Gençlik · Gelecek · Toplum
                </span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
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
                      'relative px-3 py-2 text-sm font-medium transition-colors duration-200 group',
                      isActive
                        ? isScrolled
                          ? 'text-primary-700'
                          : 'text-white'
                        : isScrolled
                          ? 'text-neutral-600 hover:text-primary-700'
                          : 'text-white/80 hover:text-white'
                    )}
                  >
                    {t(labelKey)}
                    <span
                      className={cn(
                        'pointer-events-none absolute left-3 right-3 -bottom-0.5 h-[2px] rounded-full origin-left',
                        'transition-transform duration-300 ease-out',
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                        isScrolled ? 'bg-primary-600' : 'bg-accent-300'
                      )}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Right: switcher + CTA + hamburger */}
            <div className="flex items-center gap-2 md:gap-3">
              <div className="hidden md:flex items-center gap-3">
                <LanguageSwitcher light={!isScrolled} />
                <Link
                  href={`/${locale}/iletisim`}
                  className={cn(
                    'group inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold',
                    'transition-all duration-300',
                    isScrolled
                      ? 'bg-primary-700 text-white hover:bg-primary-800 shadow-sm hover:shadow-md'
                      : 'bg-white text-primary-900 hover:bg-accent-300 hover:text-primary-900'
                  )}
                >
                  <span>{t('cta.contact')}</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>

              {/* Mobile hamburger */}
              <button
                className={cn(
                  'lg:hidden p-2 rounded-lg transition-colors duration-200',
                  isScrolled
                    ? 'text-neutral-800 hover:bg-neutral-100'
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

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        locale={locale}
      />
    </>
  );
}
