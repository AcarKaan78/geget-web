import React from 'react';
import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import ScrollReveal from '@/components/ui/ScrollReveal';
import {
  Users,
  Eye,
  Leaf,
  Heart,
  Lightbulb,
  HandHeart,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface ValueItem {
  key: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const valuesData: Omit<ValueItem, 'title' | 'description'>[] = [
  { key: 'participation', icon: Users },
  { key: 'transparency', icon: Eye },
  { key: 'sustainability', icon: Leaf },
  { key: 'inclusivity', icon: Heart },
  { key: 'innovation', icon: Lightbulb },
  { key: 'solidarity', icon: HandHeart },
];

export default function Values() {
  const t = useTranslations('about.values');

  return (
    <section className="py-20 bg-neutral-50">
      <Container>
        <SectionHeader
          title={t('title')}
          subtitle={t('subtitle')}
          centered
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {valuesData.map((value, index) => {
            const Icon = value.icon;
            return (
              <ScrollReveal
                key={value.key}
                delay={index * 0.1}
                direction="up"
              >
                <div className="group bg-primary-50 rounded-xl p-6 lg:p-8 transition-all duration-300 hover:bg-white hover:shadow-lg hover:-translate-y-1 h-full">
                  <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary-500 transition-colors duration-300">
                    <Icon className="w-7 h-7 text-primary-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-neutral-900 mb-3">
                    {t(`items.${value.key}.title`)}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed font-body">
                    {t(`items.${value.key}.description`)}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
