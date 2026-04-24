'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import type { TeamPerson } from '@/lib/team';
import { cn } from '@/lib/utils';

interface MemberTileProps {
  person: TeamPerson;
  size?: 'sm' | 'md' | 'lg';
  highlight?: boolean;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? '';
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const sizeStyles = {
  sm: {
    avatar: 'w-14 h-14',
    initials: 'text-sm',
    name: 'text-sm',
    role: 'text-xs',
    padding: 'p-5',
  },
  md: {
    avatar: 'w-16 h-16',
    initials: 'text-base',
    name: 'text-base',
    role: 'text-xs',
    padding: 'p-6',
  },
  lg: {
    avatar: 'w-24 h-24',
    initials: 'text-xl',
    name: 'text-xl',
    role: 'text-sm',
    padding: 'p-8',
  },
};

export default function MemberTile({
  person,
  size = 'md',
  highlight = false,
}: MemberTileProps) {
  const t = useTranslations('team');
  const s = sizeStyles[size];
  const role = t(`roles.${person.roleKey}`);
  const initials = getInitials(person.name);

  return (
    <div
      className={cn(
        'rounded-xl bg-white border text-center',
        'transition-all duration-300 hover:-translate-y-1 hover:shadow-lg',
        highlight
          ? 'border-primary-300 shadow-md bg-gradient-to-b from-white to-primary-50/40'
          : 'border-neutral-200 shadow-sm',
        s.padding
      )}
    >
      <div className="flex justify-center">
        <div
          className={cn(
            'relative rotate-45 overflow-hidden rounded-md',
            highlight
              ? 'bg-gradient-to-br from-primary-500 to-primary-700'
              : 'bg-gradient-to-br from-primary-400 to-primary-600',
            s.avatar
          )}
        >
          <div className="flex items-center justify-center w-full h-full">
            <span
              className={cn(
                '-rotate-45 text-white font-bold select-none',
                s.initials
              )}
            >
              {initials}
            </span>
          </div>
        </div>
      </div>

      <h3
        className={cn(
          'font-heading font-semibold mt-5 text-neutral-900',
          s.name
        )}
      >
        {person.name}
      </h3>

      <p
        className={cn(
          'font-medium mt-1',
          highlight ? 'text-primary-700' : 'text-primary-500',
          s.role
        )}
      >
        {role}
      </p>
    </div>
  );
}
