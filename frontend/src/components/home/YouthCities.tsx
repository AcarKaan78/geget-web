import { useTranslations } from 'next-intl';
import { MapPin, MessageCircle, Vote } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';

interface Feature {
  key: string;
  icon: React.ElementType;
}

const features: Feature[] = [
  { key: 'accessible', icon: MapPin },
  { key: 'dialogue', icon: MessageCircle },
  { key: 'participation', icon: Vote },
];

export default function YouthCities() {
  const t = useTranslations('home.youthCities');

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50/30 via-accent-50/20 to-primary-50/50 py-20 sm:py-28">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" aria-hidden="true" />

      <div className="section-container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text content */}
          <div>
            <ScrollReveal direction="left">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-600">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
                {t('title')}
              </span>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.1}>
              <h2 className="mt-4 font-heading text-3xl font-bold text-primary-900 sm:text-4xl">
                {t('title')}
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.2}>
              <p className="mt-4 text-lg leading-relaxed text-neutral-600">
                {t('subtitle')}
              </p>
            </ScrollReveal>

            {/* Feature list */}
            <div className="mt-8 space-y-5">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <ScrollReveal
                    key={feature.key}
                    direction="left"
                    delay={0.3 + index * 0.1}
                  >
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                        <Icon className="h-5 w-5" strokeWidth={1.8} />
                      </div>
                      <div>
                        <h3 className="font-heading text-base font-bold text-primary-900">
                          {t(`features.${feature.key}.title`)}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                          {t(`features.${feature.key}.description`)}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

          {/* Image / Illustration placeholder */}
          <ScrollReveal direction="right" delay={0.2}>
            <div className="relative">
              {/* Main image placeholder */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-primary-100 via-primary-50 to-accent-50">
                {/* Cityscape illustration with shapes */}
                <div className="absolute inset-0 flex items-end justify-center p-8">
                  {/* Buildings */}
                  <div className="flex items-end gap-3 w-full max-w-xs">
                    <div className="w-12 rounded-t-lg bg-primary-300/60" style={{ height: '40%' }} />
                    <div className="w-16 rounded-t-lg bg-primary-400/50" style={{ height: '60%' }} />
                    <div className="w-10 rounded-t-lg bg-accent-400/40" style={{ height: '35%' }} />
                    <div className="w-14 rounded-t-lg bg-primary-300/50" style={{ height: '70%' }} />
                    <div className="w-12 rounded-t-lg bg-primary-500/40" style={{ height: '50%' }} />
                    <div className="w-10 rounded-t-lg bg-accent-500/30" style={{ height: '45%' }} />
                    <div className="w-16 rounded-t-lg bg-primary-400/45" style={{ height: '55%' }} />
                  </div>
                </div>

                {/* Decorative diamonds */}
                <div className="absolute top-8 right-8 h-12 w-12 rotate-45 rounded-lg border-2 border-primary-300/40" />
                <div className="absolute top-16 left-12 h-8 w-8 rotate-45 rounded-md bg-accent-400/20" />
                <div className="absolute top-6 left-1/3 h-6 w-6 rotate-45 rounded-sm border border-primary-400/30" />

                {/* People silhouette dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-end gap-2">
                  <div className="h-3 w-3 rounded-full bg-primary-500/40" />
                  <div className="h-4 w-4 rounded-full bg-accent-500/50" />
                  <div className="h-3 w-3 rounded-full bg-primary-400/40" />
                  <div className="h-3.5 w-3.5 rounded-full bg-primary-600/30" />
                  <div className="h-3 w-3 rounded-full bg-accent-400/40" />
                </div>
              </div>

              {/* Floating accent card */}
              <div className="absolute -bottom-4 -left-4 rounded-xl bg-white p-4 shadow-xl shadow-neutral-900/10 sm:-bottom-6 sm:-left-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-500/10">
                    <MapPin className="h-5 w-5 text-accent-600" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">Aktif</p>
                    <p className="font-heading text-sm font-bold text-primary-900">5+ Sehir</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
