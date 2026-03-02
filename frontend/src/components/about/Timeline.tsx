'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import { Sparkles, Building2, Rocket } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface TimelineItem {
  key: string;
  year: string;
  icon: LucideIcon;
}

const timelineItems: TimelineItem[] = [
  { key: 'idea', year: '2025', icon: Sparkles },
  { key: 'founding', year: '2026 Q1', icon: Building2 },
  { key: 'projects', year: '2026 Q2', icon: Rocket },
];

const itemVariants = {
  hidden: (direction: 'left' | 'right') => ({
    opacity: 0,
    x: direction === 'left' ? -50 : 50,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const dotVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

export default function Timeline() {
  const t = useTranslations('about.timeline');

  return (
    <section className="py-20 bg-white">
      <Container size="md">
        <SectionHeader title={t('title')} centered />

        <div className="relative">
          {/* Vertical line - centered on desktop, left-aligned on mobile */}
          <div
            className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-primary-200"
            aria-hidden="true"
          />

          <div className="space-y-12 md:space-y-16">
            {timelineItems.map((item, index) => {
              const Icon = item.icon;
              const isEven = index % 2 === 0;
              const direction = isEven ? 'left' : 'right';

              return (
                <div
                  key={item.key}
                  className="relative flex items-center"
                >
                  {/* Timeline dot */}
                  <motion.div
                    variants={dotVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10"
                  >
                    <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center shadow-lg shadow-primary-500/25">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </motion.div>

                  {/* Content - mobile: always right, desktop: alternating */}
                  <div
                    className={`
                      w-full pl-20 md:pl-0 md:w-1/2
                      ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:ml-auto'}
                    `}
                  >
                    <motion.div
                      custom={isEven ? 'left' : 'right'}
                      variants={itemVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: '-50px' }}
                      className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full mb-3">
                        {item.year}
                      </span>
                      <h3 className="font-heading font-bold text-xl text-neutral-900 mb-2">
                        {t(`items.${item.key}.title`)}
                      </h3>
                      <p className="text-neutral-600 leading-relaxed font-body">
                        {t(`items.${item.key}.description`)}
                      </p>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
