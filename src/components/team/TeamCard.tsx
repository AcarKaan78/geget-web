'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Twitter, Instagram, Linkedin } from 'lucide-react';
import type { TeamMember } from '@/types';
import Card from '@/components/ui/Card';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface TeamCardProps {
  member: TeamMember;
  index: number;
}

function getInitials(name: string): string {
  const parts = name.split(' ');
  if (parts.length < 2) return parts[0]?.[0]?.toUpperCase() ?? '';
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Extracts the member key fragment from a full translation key.
 * e.g. "team.members.halilEcer.name" -> "members.halilEcer"
 */
function getMemberKey(fullKey: string): string {
  // fullKey format: "team.members.<memberKey>.<field>"
  const withoutPrefix = fullKey.replace(/^team\./, '');
  // Remove the trailing field (.name / .role / .bio)
  const parts = withoutPrefix.split('.');
  return parts.slice(0, -1).join('.');
}

export default function TeamCard({ member, index }: TeamCardProps) {
  const t = useTranslations('team');
  const memberKey = getMemberKey(member.nameKey);

  const name = t(`${memberKey}.name`);
  const role = t(`${memberKey}.role`);
  const bio = t(`${memberKey}.bio`);
  const initials = getInitials(name);

  return (
    <ScrollReveal delay={index * 0.1}>
      <Card hover padding="lg" className="text-center">
        {/* Diamond-shaped avatar */}
        <div className="flex justify-center">
          <div className="relative w-20 h-20 rotate-45 bg-gradient-to-br from-primary-500 to-primary-700 overflow-hidden rounded-md mx-auto">
            {member.imageUrl ? (
              <Image
                src={member.imageUrl}
                alt={name}
                fill
                className="-rotate-45 object-cover scale-[1.42]"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                <span className="-rotate-45 text-white text-xl font-bold select-none">
                  {initials}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Name */}
        <h3 className="font-heading font-semibold text-lg mt-6 text-neutral-900">
          {name}
        </h3>

        {/* Role */}
        <p className="text-primary-500 text-sm font-medium mt-1">
          {role}
        </p>

        {/* Bio */}
        <p className="text-neutral-500 text-sm mt-2 line-clamp-2">
          {bio}
        </p>

        {/* Social links */}
        {member.social && (
          <div className="flex gap-3 justify-center mt-4">
            {member.social.twitter && (
              <a
                href={member.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-neutral-400 hover:text-primary-500 transition"
              >
                <Twitter size={18} />
              </a>
            )}
            {member.social.instagram && (
              <a
                href={member.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-neutral-400 hover:text-primary-500 transition"
              >
                <Instagram size={18} />
              </a>
            )}
            {member.social.linkedin && (
              <a
                href={member.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-neutral-400 hover:text-primary-500 transition"
              >
                <Linkedin size={18} />
              </a>
            )}
          </div>
        )}
      </Card>
    </ScrollReveal>
  );
}
