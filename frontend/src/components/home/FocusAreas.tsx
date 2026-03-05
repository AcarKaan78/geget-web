'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { Scale, Building2, Heart, Globe, Rocket, Shield, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FocusArea {
  key: string;
  icon: LucideIcon;
}

const focusAreas: FocusArea[] = [
  { key: 'policies', icon: Scale },
  { key: 'cities', icon: Building2 },
  { key: 'wellbeing', icon: Heart },
  { key: 'networks', icon: Globe },
  { key: 'projects', icon: Rocket },
  { key: 'future', icon: Shield },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function FocusAreas() {
  const t = useTranslations('home.focusAreas');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-accent-50/30 to-primary-100/50 py-20 sm:py-28">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-200 to-transparent" />
      </div>

      <div className="section-container relative">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-700"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
            {t('title')}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 font-heading text-3xl font-bold text-primary-900 sm:text-4xl"
          >
            {t('title')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-lg text-neutral-600"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        {/* Cards grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {focusAreas.map((area) => {
            const Icon = area.icon;
            return (
              <motion.div
                key={area.key}
                variants={cardVariants}
                className={cn(
                  'group relative overflow-hidden rounded-2xl bg-white p-8',
                  'border border-neutral-100 shadow-sm',
                  'transition-all duration-300',
                  'hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-900/5',
                  'hover:border-primary-200'
                )}
              >
                {/* Gradient accent on top */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-accent-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Icon */}
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-all duration-300 group-hover:bg-primary-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary-600/25">
                  <Icon className="h-6 w-6" strokeWidth={1.8} />
                </div>

                {/* Title */}
                <h3 className="font-heading text-lg font-bold text-primary-900 transition-colors duration-300 group-hover:text-primary-700">
                  {t(`areas.${area.key}.title`)}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  {t(`areas.${area.key}.description`)}
                </p>

                {/* Decorative diamond */}
                <div
                  className="absolute -bottom-6 -right-6 h-16 w-16 rotate-45 rounded-lg bg-primary-50 opacity-0 transition-all duration-300 group-hover:opacity-50"
                  aria-hidden="true"
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
