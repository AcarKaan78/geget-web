import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';

export default function CTA() {
  const t = useTranslations('home.cta');

  return (
    <section className="relative overflow-hidden bg-primary-600 py-20 sm:py-24">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Diamond pattern */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.06]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="cta-diamonds"
              x="0"
              y="0"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="22"
                y="22"
                width="16"
                height="16"
                rx="3"
                transform="rotate(45 30 30)"
                fill="white"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-diamonds)" />
        </svg>

        {/* Gradient orbs */}
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary-500/30 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent-500/20 blur-3xl" />
      </div>

      <div className="section-container relative">
        <div className="mx-auto max-w-2xl text-center">
          <ScrollReveal>
            <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              {t('title')}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-white/80">
              {t('description')}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="mt-10">
              <Link
                href="/iletisim"
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-semibold text-primary-700 shadow-xl shadow-primary-900/20 transition-all duration-300 hover:bg-neutral-50 hover:shadow-2xl hover:shadow-primary-900/25"
              >
                {t('button')}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
