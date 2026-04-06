'use client';

import React from 'react';
import {
  Users,
  UserCheck,
  Eye,
  HeartHandshake,
  Lightbulb,
  Leaf,
  type LucideIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Card from '@/components/ui/Card';

interface ValueItem {
  key: string;
  icon: LucideIcon;
}

const VALUE_ITEMS: ValueItem[] = [
  { key: 'collaboration', icon: Users },
  { key: 'participation', icon: UserCheck },
  { key: 'transparency', icon: Eye },
  { key: 'inclusivity', icon: HeartHandshake },
  { key: 'innovation', icon: Lightbulb },
  { key: 'sustainability', icon: Leaf },
];

export default function Values() {
  const t = useTranslations('about');

  return (
    <section className="py-20 bg-neutral-50">
      <Container>
        <SectionHeader
          overline={t('values.overline')}
          title={t('values.title')}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {VALUE_ITEMS.map((item, index) => {
            const Icon = item.icon;

            return (
              <ScrollReveal key={item.key} delay={index * 0.1}>
                <Card hover className="group">
                  {/* Diamond-shaped icon container */}
                  <div
                    className="w-14 h-14 rotate-45 bg-primary-100 flex items-center justify-center rounded-sm transition-colors duration-300 group-hover:bg-primary-500"
                  >
                    <Icon
                      className="w-6 h-6 -rotate-45 text-primary-500 transition-colors duration-300 group-hover:text-white"
                    />
                  </div>

                  <h3 className="font-heading font-semibold text-lg mt-6 text-neutral-900">
                    {t(`values.items.${item.key}.title`)}
                  </h3>

                  <p className="text-neutral-500 text-sm mt-2 font-body">
                    {t(`values.items.${item.key}.description`)}
                  </p>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
