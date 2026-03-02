import React from 'react';
import { useTranslations } from 'next-intl';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { Link } from '@/i18n/navigation';
import {
  Landmark,
  GraduationCap,
  Users,
  Cpu,
  ArrowRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Project {
  id: string;
  titleKey: string;
  descriptionKey: string;
  category: 'politika' | 'egitim' | 'sosyal' | 'teknoloji';
  status: 'active' | 'completed' | 'upcoming';
}

const categoryIcons: Record<string, LucideIcon> = {
  politika: Landmark,
  egitim: GraduationCap,
  sosyal: Users,
  teknoloji: Cpu,
};

const categoryGradients: Record<string, string> = {
  politika: 'from-primary-600 to-primary-800',
  egitim: 'from-accent-500 to-primary-600',
  sosyal: 'from-primary-400 to-accent-600',
  teknoloji: 'from-primary-700 to-primary-900',
};

const statusVariants: Record<string, 'success' | 'info' | 'warning'> = {
  active: 'success',
  completed: 'info',
  upcoming: 'warning',
};

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const t = useTranslations('projects');
  const Icon = categoryIcons[project.category];
  const gradient = categoryGradients[project.category];

  return (
    <Card hover className="flex flex-col h-full">
      {/* Image placeholder area with gradient and icon */}
      <div
        className={`relative bg-gradient-to-br ${gradient} h-48 flex items-center justify-center`}
      >
        <Icon className="w-16 h-16 text-white/30" />

        {/* Category badge */}
        <div className="absolute top-3 right-3">
          <Badge variant="default" className="bg-white/90 text-primary-700">
            {t(`categories.${project.category}`)}
          </Badge>
        </div>

        {/* Status badge */}
        <div className="absolute bottom-3 left-3">
          <Badge variant={statusVariants[project.status]}>
            {t(`status.${project.status}`)}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-heading font-bold text-lg text-neutral-900 mb-2">
          {t(project.titleKey)}
        </h3>
        <p className="text-neutral-600 text-sm leading-relaxed mb-4 flex-1 font-body">
          {t(project.descriptionKey)}
        </p>
        <Link
          href={`/projects/${project.id}`}
          className="inline-flex items-center gap-1.5 text-primary-600 font-semibold text-sm hover:text-primary-700 transition-colors group"
        >
          {t('readMore')}
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </Card>
  );
}
