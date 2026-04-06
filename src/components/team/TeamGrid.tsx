'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { teamMembers } from '@/lib/team';
import SectionHeader from '@/components/ui/SectionHeader';
import TeamCard from '@/components/team/TeamCard';

export default function TeamGrid() {
  const t = useTranslations('team');

  return (
    <section>
      <SectionHeader
        title={t('title')}
        subtitle={t('subtitle')}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
        {teamMembers.map((member, index) => (
          <TeamCard key={member.id} member={member} index={index} />
        ))}
      </div>
    </section>
  );
}
