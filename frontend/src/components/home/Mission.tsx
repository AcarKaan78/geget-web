import { useTranslations } from 'next-intl';
import ScrollReveal from '../ui/ScrollReveal';

export default function Mission() {
  const t = useTranslations('home.mission');

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50/60 via-white to-primary-50/40 py-20 sm:py-28">
      {/* Decorative diamond shape */}
      <div className="absolute -right-12 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true">
        <div className="h-48 w-48 rotate-45 rounded-3xl border-2 border-primary-100 opacity-40" />
      </div>
      <div className="absolute -left-8 top-20 pointer-events-none" aria-hidden="true">
        <div className="h-24 w-24 rotate-45 rounded-2xl border border-primary-100 opacity-30" />
      </div>

      <div className="section-container relative">
        <div className="mx-auto max-w-4xl">
          {/* Quote */}
          <ScrollReveal>
            <blockquote className="relative">
              {/* Decorative quote mark */}
              <div
                className="absolute -left-4 -top-6 font-heading text-8xl font-bold leading-none text-primary-100 select-none sm:-left-8 sm:-top-8 sm:text-9xl"
                aria-hidden="true"
              >
                &ldquo;
              </div>

              <div className="relative border-l-4 border-accent-500 pl-6 sm:pl-8">
                <p className="font-heading text-2xl font-bold leading-relaxed text-primary-700 sm:text-3xl md:text-4xl">
                  {t('quote')}
                </p>
              </div>

              {/* Closing quote mark */}
              <div
                className="absolute -bottom-8 right-0 font-heading text-8xl font-bold leading-none text-primary-100 select-none sm:text-9xl"
                aria-hidden="true"
              >
                &rdquo;
              </div>
            </blockquote>
          </ScrollReveal>

          {/* Description */}
          <ScrollReveal delay={0.2}>
            <p className="mt-12 text-lg leading-relaxed text-neutral-600 sm:mt-16 sm:text-xl">
              {t('description')}
            </p>
          </ScrollReveal>

          {/* Decorative divider */}
          <ScrollReveal delay={0.3}>
            <div className="mt-12 flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-primary-200" />
              <div className="h-3 w-3 rotate-45 rounded-sm bg-primary-300" />
              <div className="h-px w-12 bg-primary-200" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
