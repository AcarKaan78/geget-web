'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Mail, Instagram, Twitter, MapPin } from 'lucide-react';
import { CONTACT_INFO, SOCIAL_LINKS } from '@/lib/constants';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}

function InfoItem({ icon, label, children }: InfoItemProps) {
  return (
    <div className="flex items-start gap-4 mb-6 last:mb-0">
      <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-sm text-neutral-500">{label}</p>
        <div className="text-neutral-800 font-medium">{children}</div>
      </div>
    </div>
  );
}

export default function ContactInfo() {
  const t = useTranslations('contact');

  return (
    <ScrollReveal delay={0.2}>
      <div className="bg-neutral-50 rounded-2xl p-8">
        <h3 className="font-heading font-semibold text-xl mb-8 text-neutral-900">
          {t('info.title')}
        </h3>

        {/* Email */}
        <InfoItem
          icon={<Mail size={20} className="text-primary-500" />}
          label={t('info.emailLabel')}
        >
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="text-primary-500 hover:underline underline-offset-2 transition"
          >
            {CONTACT_INFO.email}
          </a>
        </InfoItem>

        {/* Instagram */}
        <InfoItem
          icon={<Instagram size={20} className="text-primary-500" />}
          label={t('info.instagramLabel')}
        >
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-500 hover:underline underline-offset-2 transition"
          >
            {CONTACT_INFO.instagram}
          </a>
        </InfoItem>

        {/* Twitter / X */}
        <InfoItem
          icon={<Twitter size={20} className="text-primary-500" />}
          label={t('info.twitterLabel')}
        >
          <a
            href={SOCIAL_LINKS.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-500 hover:underline underline-offset-2 transition"
          >
            {CONTACT_INFO.twitter}
          </a>
        </InfoItem>

        {/* Location */}
        <InfoItem
          icon={<MapPin size={20} className="text-primary-500" />}
          label={t('info.locationLabel')}
        >
          {CONTACT_INFO.location}
        </InfoItem>
      </div>
    </ScrollReveal>
  );
}
