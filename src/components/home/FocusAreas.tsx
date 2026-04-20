'use client';

import React from 'react';
import Image from 'next/image';
import {
  Scale,
  Building2,
  Heart,
  Globe,
  Rocket,
  ShieldCheck,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { cn } from '@/lib/utils';

interface FocusItem {
  key: string;
  icon: LucideIcon;
}

const FOCUS_ITEMS: FocusItem[] = [
  { key: 'youthPolicies', icon: Scale },
  { key: 'youthFriendlyCities', icon: Building2 },
  { key: 'youthWellbeing', icon: Heart },
  { key: 'youthNetworks', icon: Globe },
  { key: 'youthProjects', icon: Rocket },
  { key: 'empowerment', icon: ShieldCheck },
];

export default function FocusAreas() {
  const t = useTranslations('home');

  return (
    <section className="relative py-24 md:py-32 bg-white overflow-hidden">
      {/* Faint top diamond watermark */}
      <div
        aria-hidden
        className="absolute top-12 left-1/2 -translate-x-1/2 w-[64rem] h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent"
      />

      <Container>
        <SectionHeader
          overline={t('focusAreas.overline')}
          title={t('focusAreas.title')}
          subtitle={t('focusAreas.subtitle')}
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[minmax(14rem,1fr)] gap-4 md:gap-5">
          {FOCUS_ITEMS.map((item, index) => {
            const Icon = item.icon;
            const isFeatured = index === 0;

            return (
              <ScrollReveal
                key={item.key}
                delay={index * 0.07}
                className={cn(isFeatured && 'lg:col-span-2 lg:row-span-2')}
              >
                {isFeatured ? (
                  <article className="group relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-primary-800 via-primary-900 to-[#050d24] p-8 md:p-10 text-white ring-1 ring-white/5">
                    {/* Decorative logo watermark */}
                    <Image
                      src="/images/logo-mark.png"
                      alt=""
                      aria-hidden
                      width={420}
                      height={420}
                      className="absolute -right-16 -bottom-16 w-[22rem] opacity-[0.18] pointer-events-none select-none transition-transform duration-700 group-hover:rotate-[6deg]"
                    />

                    {/* Accent gradient */}
                    <span
                      aria-hidden
                      className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-accent-500/30 blur-3xl"
                    />

                    <div className="relative flex h-full flex-col">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-12 w-12 rotate-45 items-center justify-center rounded-md bg-white/10 ring-1 ring-white/15 backdrop-blur">
                          <Icon className="h-5 w-5 -rotate-45 text-accent-300" />
                        </span>
                        <span className="text-[11px] uppercase tracking-[0.3em] text-accent-300 font-semibold">
                          {t('focusAreas.overline')}
                        </span>
                      </div>

                      <h3 className="mt-8 font-heading font-bold text-3xl md:text-4xl lg:text-[2.5rem] leading-tight tracking-tight text-balance">
                        {t(`focusAreas.items.${item.key}.title`)}
                      </h3>

                      <p className="mt-4 max-w-md text-white/75 font-body text-base md:text-lg leading-relaxed">
                        {t(`focusAreas.items.${item.key}.description`)}
                      </p>

                      <div className="mt-auto pt-8 flex items-center gap-2 text-sm font-semibold text-accent-300">
                        <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                          {t('focusAreas.overline')}
                        </span>
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </article>
                ) : (
                  <article className="group relative h-full overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 md:p-7 transition-all duration-300 hover:border-primary-300 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-20px_rgba(43,94,167,0.35)]">
                    {/* Hover accent bar */}
                    <span
                      aria-hidden
                      className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary-400 to-accent-500 scale-y-0 origin-top transition-transform duration-500 group-hover:scale-y-100"
                    />

                    <div className="flex items-start justify-between">
                      <span className="inline-flex h-12 w-12 rotate-45 items-center justify-center rounded-md bg-primary-50 transition-colors duration-300 group-hover:bg-primary-500">
                        <Icon className="h-5 w-5 -rotate-45 text-primary-600 transition-colors duration-300 group-hover:text-white" />
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-neutral-300 transition-all duration-300 group-hover:text-primary-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>

                    <h3 className="mt-6 font-heading font-semibold text-xl text-neutral-900 leading-snug">
                      {t(`focusAreas.items.${item.key}.title`)}
                    </h3>

                    <p className="mt-2 text-sm md:text-[0.95rem] text-neutral-500 font-body leading-relaxed">
                      {t(`focusAreas.items.${item.key}.description`)}
                    </p>
                  </article>
                )}
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
