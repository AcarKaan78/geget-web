'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import ProjectCard from '@/components/projects/ProjectCard';
import { cn } from '@/lib/utils';
import type { Project } from '@/components/projects/ProjectCard';

const projects: Project[] = [
  {
    id: 'genclik-politikalari-atolyesi',
    titleKey: 'items.youthPolicyWorkshop.title',
    descriptionKey: 'items.youthPolicyWorkshop.description',
    category: 'politika',
    status: 'active',
  },
  {
    id: 'dijital-okuryazarlik-programi',
    titleKey: 'items.digitalLiteracy.title',
    descriptionKey: 'items.digitalLiteracy.description',
    category: 'egitim',
    status: 'active',
  },
  {
    id: 'genc-dostu-sehir-endeksi',
    titleKey: 'items.youthFriendlyCity.title',
    descriptionKey: 'items.youthFriendlyCity.description',
    category: 'sosyal',
    status: 'upcoming',
  },
  {
    id: 'genclik-diyalog-platformu',
    titleKey: 'items.youthDialogue.title',
    descriptionKey: 'items.youthDialogue.description',
    category: 'teknoloji',
    status: 'active',
  },
  {
    id: 'surdurulebilir-gelecek-kampi',
    titleKey: 'items.sustainableFutureCamp.title',
    descriptionKey: 'items.sustainableFutureCamp.description',
    category: 'egitim',
    status: 'completed',
  },
  {
    id: 'yerel-yonetim-genclik-danisma-kurulu',
    titleKey: 'items.localGovYouthCouncil.title',
    descriptionKey: 'items.localGovYouthCouncil.description',
    category: 'politika',
    status: 'upcoming',
  },
];

type CategoryFilter = 'all' | 'politika' | 'egitim' | 'sosyal' | 'teknoloji';

const categories: CategoryFilter[] = [
  'all',
  'politika',
  'egitim',
  'sosyal',
  'teknoloji',
];

export default function ProjectGrid() {
  const t = useTranslations('projects');
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section className="py-20 bg-neutral-50">
      <Container>
        <SectionHeader
          title={t('title')}
          subtitle={t('subtitle')}
          centered
        />

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={cn(
                'px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200',
                activeFilter === category
                  ? 'bg-primary-600 text-white shadow-md shadow-primary-600/25'
                  : 'bg-white text-neutral-600 hover:bg-primary-50 hover:text-primary-600 border border-neutral-200'
              )}
            >
              {t(`filterCategories.${category}`)}
            </button>
          ))}
        </div>

        {/* Projects grid with animation */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-neutral-500 text-lg">
              {t('noProjects')}
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}
