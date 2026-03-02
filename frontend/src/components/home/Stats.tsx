'use client';

import { useTranslations } from 'next-intl';
import AnimatedCounter from '../ui/AnimatedCounter';
import { cn } from '@/lib/utils';

interface StatItem {
  key: string;
}

const statKeys: StatItem[] = [
  { key: 'projects' },
  { key: 'youth' },
  { key: 'cities' },
  { key: 'partners' },
];

export default function Stats() {
  const t = useTranslations('home.stats');

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-800 to-primary-900 py-20 sm:py-24">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-10 left-[10%] h-32 w-32 rotate-45 rounded-2xl border border-white/[0.04]" />
        <div className="absolute bottom-10 right-[15%] h-24 w-24 rotate-45 rounded-xl border border-white/[0.06]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary-600/10 blur-3xl" />
      </div>

      <div className="section-container relative">
        <div className="grid grid-cols-2 gap-8 sm:gap-12 lg:grid-cols-4">
          {statKeys.map((stat, index) => {
            const value = parseInt(t(`${stat.key}.value`), 10);
            const suffix = t(`${stat.key}.suffix`);
            const label = t(`${stat.key}.label`);

            return (
              <div
                key={stat.key}
                className={cn(
                  'flex flex-col items-center text-center',
                  index < statKeys.length - 1 && 'lg:border-r lg:border-white/10'
                )}
              >
                <div className="font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                  <AnimatedCounter
                    target={value}
                    suffix={suffix}
                    duration={2000}
                  />
                </div>
                <p className="mt-2 text-sm font-medium uppercase tracking-wider text-primary-300 sm:mt-3 sm:text-base">
                  {label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
