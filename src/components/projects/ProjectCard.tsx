'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import type { Project } from '@/types';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  locale: string;
}

const statusStyles: Record<Project['status'], string> = {
  active: 'bg-green-100 text-green-700',
  completed: 'bg-blue-100 text-blue-700',
  planned: 'bg-yellow-100 text-yellow-700',
};

export default function ProjectCard({ project, locale }: ProjectCardProps) {
  const t = useTranslations('projects');

  const titlePath = project.titleKey.replace('projects.', '');
  const descriptionPath = project.descriptionKey.replace('projects.', '');

  return (
    <div
      className={cn(
        'rounded-xl bg-white border border-neutral-200 shadow-sm',
        'transition-all duration-300',
        'hover:-translate-y-1 hover:shadow-lg',
        'overflow-hidden'
      )}
    >
      {/* Top gradient placeholder area */}
      <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 rounded-t-xl relative overflow-hidden">
        {/* Category badge */}
        <span className="absolute top-4 left-4 rounded-full bg-white/90 text-primary-600 text-xs font-semibold px-3 py-1">
          {t(`filters.${project.category}`)}
        </span>

        {/* Status badge */}
        <span
          className={cn(
            'absolute top-4 right-4 rounded-full text-xs font-semibold px-3 py-1',
            statusStyles[project.status]
          )}
        >
          {t(`status.${project.status}`)}
        </span>
      </div>

      {/* Body */}
      <div className="p-6">
        <h3 className="font-heading font-semibold text-lg text-neutral-900">
          {t(titlePath)}
        </h3>

        <p className="text-neutral-500 text-sm mt-2 font-body line-clamp-3">
          {t(descriptionPath)}
        </p>

        <p className="text-neutral-400 text-xs mt-4 font-body">
          {formatDate(project.date, locale === 'tr' ? 'tr-TR' : 'en-US')}
        </p>
      </div>
    </div>
  );
}
