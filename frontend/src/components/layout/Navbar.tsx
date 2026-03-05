'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname, Link } from '@/i18n/navigation';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import MobileMenu from './MobileMenu';
import LanguageSwitcher from '../ui/LanguageSwitcher';

interface NavLink {
  href: string;
  label: string;
}

export default function Navbar() {
  const t = useTranslations('common');
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks: NavLink[] = [
    { href: '/', label: t('nav.home') },
    { href: '/hakkimizda', label: t('nav.about') },
    { href: '/projeler', label: t('nav.projects') },
    { href: '/ekibimiz', label: t('nav.team') },
    { href: '/blog', label: t('nav.blog') },
    { href: '/iletisim', label: t('nav.contact') },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const isActiveLink = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-neutral-900/5'
            : 'bg-transparent'
        )}
      >
        <nav className="section-container">
          <div className="flex h-16 items-center justify-between lg:h-20">
            {/* Logo */}
            <Link href="/" className="relative z-10 flex items-center gap-3">
              <Image
                src="/images/logo-color.png"
                alt="GEGET Logo"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
                priority
              />
              <span
                className={cn(
                  'font-heading text-lg font-bold transition-colors duration-300',
                  isScrolled ? 'text-primary-800' : 'text-white'
                )}
              >
                GEGET
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-0.5 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                    isActiveLink(link.href)
                      ? isScrolled
                        ? 'text-primary-600'
                        : 'text-white'
                      : isScrolled
                        ? 'text-neutral-600 hover:text-primary-600 hover:bg-primary-50'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                  )}
                >
                  {link.label}
                  {isActiveLink(link.href) && (
                    <span
                      className={cn(
                        'absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full',
                        isScrolled ? 'bg-primary-600' : 'bg-white'
                      )}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Right side: Language Switcher + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <div className="hidden lg:block">
                <LanguageSwitcher />
              </div>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn(
                  'relative z-10 rounded-lg p-2 transition-colors duration-200 lg:hidden',
                  isScrolled
                    ? 'text-neutral-700 hover:bg-neutral-100'
                    : 'text-white hover:bg-white/10'
                )}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
        currentPath={pathname}
      />
    </>
  );
}
