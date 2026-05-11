'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { TeamPerson } from '@/lib/team';
import { cn } from '@/lib/utils';

interface MemberTileProps {
  person: TeamPerson;
  size?: 'sm' | 'md' | 'lg';
  highlight?: boolean;
  onSelect?: (person: TeamPerson) => void;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? '';
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const sizeStyles = {
  sm: {
    avatar: 'w-20 h-20',
    pixels: 80,
    initials: 'text-sm',
    name: 'text-sm',
    role: 'text-xs',
    padding: 'p-5',
  },
  md: {
    avatar: 'w-24 h-24',
    pixels: 96,
    initials: 'text-base',
    name: 'text-base',
    role: 'text-xs',
    padding: 'p-6',
  },
  lg: {
    avatar: 'w-32 h-32',
    pixels: 128,
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
  onSelect,
}: MemberTileProps) {
  const t = useTranslations('team');
  const s = sizeStyles[size];
  const role = t(`roles.${person.roleKey}`);
  const initials = getInitials(person.name);
  const isInteractive = !!person.bioKey && !!onSelect;

  const containerClasses = cn(
    'group relative rounded-xl bg-white border text-center w-full',
    'transition-all duration-300',
    isInteractive
      ? 'hover:-translate-y-1.5 hover:shadow-xl hover:border-primary-300 cursor-pointer'
      : 'hover:-translate-y-1 hover:shadow-lg',
    highlight
      ? 'border-primary-300 shadow-md bg-gradient-to-b from-white to-primary-50/40'
      : 'border-neutral-200 shadow-sm',
    s.padding
  );

  const innerContent = (
    <>
      {/* Subtle "open" hint diamond for interactive tiles */}
      {isInteractive && (
        <span
          aria-hidden
          className={cn(
            'absolute top-3 right-3 w-1.5 h-1.5 rotate-45 transition-all duration-300',
            highlight ? 'bg-accent-500' : 'bg-primary-400',
            'opacity-0 group-hover:opacity-100 group-hover:scale-150'
          )}
        />
      )}

      <div className="flex justify-center">
        <div
          className={cn(
            'relative rotate-45 overflow-hidden rounded-md ring-1 transition-all duration-300',
            isInteractive && 'group-hover:ring-2',
            highlight
              ? 'bg-gradient-to-br from-primary-500 to-primary-700 ring-primary-300 group-hover:ring-primary-500'
              : 'bg-gradient-to-br from-primary-400 to-primary-600 ring-primary-200 group-hover:ring-primary-400',
            s.avatar
          )}
        >
          {person.image ? (
            <div className="absolute inset-0 -rotate-45 scale-[1.42]">
              <Image
                src={person.image}
                alt={person.name}
                width={s.pixels * 2}
                height={s.pixels * 2}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
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
          )}
        </div>
      </div>

      <h3
        className={cn(
          'font-heading font-semibold mt-5 text-neutral-900 transition-colors duration-300',
          isInteractive && 'group-hover:text-primary-700',
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

      {/* Animated underline reveal for interactive tiles */}
      {isInteractive && (
        <span
          aria-hidden
          className={cn(
            'absolute left-1/2 -translate-x-1/2 bottom-3 h-0.5 w-0',
            'bg-gradient-to-r from-transparent via-primary-500 to-transparent',
            'transition-all duration-500 group-hover:w-12'
          )}
        />
      )}
    </>
  );

  if (isInteractive) {
    return (
      <button
        type="button"
        onClick={() => onSelect!(person)}
        aria-label={`${person.name} — ${role}`}
        className={cn(
          containerClasses,
          'text-left focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
        )}
      >
        {innerContent}
      </button>
    );
  }

  return <div className={containerClasses}>{innerContent}</div>;
}
