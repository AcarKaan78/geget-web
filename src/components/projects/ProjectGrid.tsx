'use client';

import React, { useState } from 'react';
import { Diamond } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Container from '@/components/ui/Container';
import ScrollReveal from '@/components/ui/ScrollReveal';
import ProjectCard from '@/components/projects/ProjectCard';
import { projects } from '@/lib/projects';
import { cn } from '@/lib/utils';

type CategoryFilter = 'all' | 'policy' | 'education' | 'social' | 'technology';

const FILTER_OPTIONS: CategoryFilter[] = [
  'all',
  'policy',
  'education',
  'social',
  'technology',
];

export default function ProjectGrid() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'tr';
  const t = useTranslations('projects');
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section className="py-20 bg-white">
      <Container>
        {/* Filter bar */}
        <div className="flex flex-wrap gap-3 justify-center mt-12 mb-12">
          {FILTER_OPTIONS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                'px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300',
                activeFilter === filter
                  ? 'bg-primary-500 text-white shadow-sm'
                  : 'bg-white text-neutral-600 border border-neutral-200 hover:border-primary-300'
              )}
            >
              {t(`filters.${filter}`)}
            </button>
          ))}
        </div>

        {/* Projects grid or empty state */}
        {filteredProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ScrollReveal key={project.id} delay={index * 0.1}>
                <ProjectCard project={project} locale={locale} />
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rotate-45 bg-primary-100 flex items-center justify-center rounded-sm mb-6">
              <Diamond className="w-7 h-7 -rotate-45 text-primary-400" />
            </div>
            <h3 className="font-heading font-semibold text-xl text-neutral-900">
              {t('empty.title')}
            </h3>
            <p className="text-neutral-500 mt-2 font-body max-w-sm">
              {t('empty.description')}
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}
