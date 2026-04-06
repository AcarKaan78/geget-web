'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Instagram, Twitter, Mail, MapPin } from 'lucide-react';
import { NAV_LINKS, SOCIAL_LINKS, CONTACT_INFO } from '@/lib/constants';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import DiamondPattern from '@/components/ui/DiamondPattern';

export default function Footer() {
  const t = useTranslations('common');
  const pathname = usePathname();

  // Extract locale from pathname
  const segments = pathname.split('/').filter(Boolean);
  const locale = segments[0] === 'en' ? 'en' : 'tr';

  return (
    <footer className="relative overflow-hidden bg-primary-900 text-white">
      {/* Decorative diamond pattern */}
      <DiamondPattern count={6} opacity={0.03} color="white" />

      <Container className="relative z-10 py-16">
        {/* Three-column grid */}
        <div className="grid gap-12 md:grid-cols-3">
          {/* Column 1: Logo, description & social */}
          <div>
            <Link
              href={`/${locale}`}
              className="flex items-center gap-2 font-heading text-2xl font-bold tracking-tight"
            >
              <Image
                src="/images/logo-color.png"
                alt="GEGET"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
              GEGET
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-neutral-300">
              {t('footer.description')}
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 transition-colors duration-200 hover:text-accent-400"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 transition-colors duration-200 hover:text-accent-400"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => {
                const labelKey = link.labelKey.replace('common.', '');
                const href = `/${locale}${link.href === '/' ? '' : link.href}`;

                return (
                  <li key={link.href}>
                    <Link
                      href={href}
                      className="inline-block text-neutral-300 transition-all duration-200 hover:text-white hover:translate-x-1"
                    >
                      {t(labelKey)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">
              {t('footer.contactInfo')}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-neutral-400" />
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-neutral-300 transition-colors duration-200 hover:text-white"
                >
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Instagram className="mt-0.5 h-5 w-5 shrink-0 text-neutral-400" />
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-300 transition-colors duration-200 hover:text-white"
                >
                  {CONTACT_INFO.instagram}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Twitter className="mt-0.5 h-5 w-5 shrink-0 text-neutral-400" />
                <a
                  href={SOCIAL_LINKS.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-300 transition-colors duration-200 hover:text-white"
                >
                  {CONTACT_INFO.twitter}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-neutral-400" />
                <span className="text-neutral-300">{CONTACT_INFO.location}</span>
              </li>
            </ul>

            <div className="mt-8">
              <Button
                variant="outline"
                size="sm"
                href={`/${locale}/iletisim`}
                className="border-white/30 text-white hover:bg-white/10"
              >
                {t('cta.contact')}
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-neutral-400">
              &copy; {new Date().getFullYear()} GEGET. {t('footer.rights')}
            </p>
            <div className="flex items-center gap-6 text-sm text-neutral-400">
              <Link
                href={`/${locale}/gizlilik`}
                className="transition-colors duration-200 hover:text-white"
              >
                {t('footer.privacy')}
              </Link>
              <Link
                href={`/${locale}/kullanim-kosullari`}
                className="transition-colors duration-200 hover:text-white"
              >
                {t('footer.terms')}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
