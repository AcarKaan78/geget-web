import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { Instagram, Twitter, Mail, ExternalLink } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('common');

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/hakkimizda', label: t('nav.about') },
    { href: '/projeler', label: t('nav.projects') },
    { href: '/ekibimiz', label: t('nav.team') },
    { href: '/iletisim', label: t('nav.contact') },
  ];

  const socialLinks = [
    {
      href: 'https://instagram.com/geget',
      label: 'Instagram',
      icon: Instagram,
    },
    {
      href: 'https://twitter.com/geget',
      label: 'Twitter',
      icon: Twitter,
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-primary-800 to-primary-900">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 -right-24 h-64 w-64 rotate-45 rounded-3xl bg-white/[0.02]" />
        <div className="absolute -bottom-16 -left-16 h-48 w-48 rotate-12 rounded-3xl bg-white/[0.02]" />
      </div>

      <div className="section-container relative">
        {/* Main footer content */}
        <div className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Column 1: Logo and description */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/images/logo-color.png"
                alt="GEGET Logo"
                width={36}
                height={36}
                className="h-9 w-9 object-contain brightness-0 invert"
              />
              <span className="font-heading text-xl font-bold text-white">
                GEGET
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-primary-200">
              {t('footer.description')}
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-primary-200 transition-all duration-200 hover:bg-white/20 hover:text-white"
                    aria-label={social.label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-primary-300">
              {t('footer.quickLinks')}
            </h3>
            <ul className="mt-4 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-sm text-primary-200 transition-colors duration-200 hover:text-white"
                  >
                    <span className="mr-2 h-px w-0 bg-accent-400 transition-all duration-200 group-hover:w-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-primary-300">
              {t('footer.contactTitle')}
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${t('footer.email')}`}
                  className="inline-flex items-center gap-2 text-sm text-primary-200 transition-colors duration-200 hover:text-white"
                >
                  <Mail className="h-4 w-4" />
                  {t('footer.email')}
                </a>
              </li>
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-primary-200 transition-colors duration-200 hover:text-white"
                    >
                      <Icon className="h-4 w-4" />
                      {social.label}
                      <ExternalLink className="h-3 w-3 opacity-50" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 4: Newsletter (Coming Soon) */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-primary-300">
              {t('footer.newsletter')}
            </h3>
            <div className="mt-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-500/20 px-3 py-1 text-xs font-semibold text-accent-400">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-400 animate-pulse" />
                {t('footer.newsletterSoon')}
              </span>
              <p className="mt-3 text-sm leading-relaxed text-primary-200">
                {t('footer.newsletterDesc')}
              </p>
              {/* Newsletter form placeholder */}
              <div className="mt-4 flex gap-2">
                <div className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                  <span className="text-xs text-primary-400">E-posta</span>
                </div>
                <div className="rounded-lg bg-white/10 px-4 py-2">
                  <span className="text-xs text-primary-300">
                    {t('footer.newsletterSoon')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-primary-300">
              {t('footer.copyright')}
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/gizlilik"
                className="text-xs text-primary-300 transition-colors duration-200 hover:text-white"
              >
                {t('footer.privacy')}
              </Link>
              <Link
                href="/kullanim-sartlari"
                className="text-xs text-primary-300 transition-colors duration-200 hover:text-white"
              >
                {t('footer.terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
