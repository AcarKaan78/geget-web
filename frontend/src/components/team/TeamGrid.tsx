import React from 'react';
import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import ScrollReveal from '@/components/ui/ScrollReveal';
import TeamCard from '@/components/team/TeamCard';
import type { TeamMember } from '@/components/team/TeamCard';

const teamMembers: TeamMember[] = [
  {
    id: 'halil-ibrahim-ecer',
    name: 'Halil Ibrahim Ecer',
    role: 'Kurucu Baskan',
    bio: 'Genclik politikalari ve sivil toplum alaninda deneyimli lider. GEGET\'in kurulusu ve stratejik yoneliminden sorumlu.',
    socials: {
      linkedin: '#',
      twitter: '#',
      instagram: '#',
    },
  },
  {
    id: 'elif-yilmaz',
    name: 'Elif Yilmaz',
    role: 'Genel Sekreter',
    bio: 'Organizasyon yonetimi ve kurumsal iletisim uzmani. Dernegin idari isleyisini koordine ediyor.',
    socials: {
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    id: 'mehmet-kaya',
    name: 'Mehmet Kaya',
    role: 'Proje Koordinatoru',
    bio: 'Proje yonetimi ve AB hibe programlari konusunda uzmanlasmis. Tum projelerin planlanmasi ve yurutulmesinden sorumlu.',
    socials: {
      linkedin: '#',
      instagram: '#',
    },
  },
  {
    id: 'zeynep-demir',
    name: 'Zeynep Demir',
    role: 'Iletisim Sorumlusu',
    bio: 'Dijital iletisim ve sosyal medya stratejisi konusunda deneyimli. GEGET\'in gorununurlugunu artirmak icin calisiyor.',
    socials: {
      twitter: '#',
      instagram: '#',
    },
  },
  {
    id: 'ahmet-ozturk',
    name: 'Ahmet Ozturk',
    role: 'Genclik Politikalari Uzmani',
    bio: 'Kamu politikasi ve genclik calismalari alaninda akademik gecmise sahip. Politika belgeleri ve arastirmalar hazirliyor.',
    socials: {
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    id: 'ayse-celik',
    name: 'Ayse Celik',
    role: 'Uluslararasi Iliskiler',
    bio: 'Uluslararasi sivil toplum aglari ve Avrupa genclik programlari konusunda deneyimli. Dis iliskileri ve ortakliklari yonetiyor.',
    socials: {
      linkedin: '#',
      instagram: '#',
    },
  },
];

export default function TeamGrid() {
  const t = useTranslations('team');

  return (
    <section className="py-20 bg-white">
      <Container>
        <SectionHeader
          title={t('title')}
          subtitle={t('subtitle')}
          centered
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {teamMembers.map((member, index) => (
            <ScrollReveal
              key={member.id}
              delay={index * 0.1}
              direction="up"
            >
              <TeamCard member={member} />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
