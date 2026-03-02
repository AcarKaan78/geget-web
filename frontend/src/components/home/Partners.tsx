import { useTranslations } from 'next-intl';
import { Building } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';

export default function Partners() {
  const t = useTranslations('home.partners');

  // Placeholder partner slots
  const partnerSlots = Array.from({ length: 8 }, (_, i) => i + 1);

  return (
    <section className="relative bg-neutral-50 py-20 sm:py-24">
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" aria-hidden="true" />

      <div className="section-container">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-700">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
              {t('title')}
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="mt-4 font-heading text-3xl font-bold text-primary-900 sm:text-4xl">
              {t('title')}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p className="mt-4 text-lg text-neutral-600">
              {t('subtitle')}
            </p>
          </ScrollReveal>
        </div>

        {/* Partner logos grid */}
        <ScrollReveal delay={0.2}>
          <div className="relative mt-16">
            {/* Coming soon overlay */}
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <div className="rounded-full bg-white/90 px-8 py-3 shadow-lg backdrop-blur-sm">
                <span className="flex items-center gap-2 font-heading text-sm font-semibold text-primary-700">
                  <span className="h-2 w-2 rounded-full bg-accent-500 animate-pulse" />
                  {t('comingSoon')}
                </span>
              </div>
            </div>

            {/* Partner placeholders */}
            <div className="grid grid-cols-2 gap-4 opacity-40 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
              {partnerSlots.map((slot) => (
                <div
                  key={slot}
                  className="flex aspect-[2/1] items-center justify-center rounded-xl border border-neutral-200 bg-white transition-all duration-200"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Building className="h-8 w-8 text-neutral-300" strokeWidth={1.2} />
                    <div className="h-2 w-16 rounded-full bg-neutral-200" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
