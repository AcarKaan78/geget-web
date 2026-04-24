'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { teamStructure, type TeamDepartment, type TeamUnit } from '@/lib/team';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import ScrollReveal from '@/components/ui/ScrollReveal';
import MemberTile from '@/components/team/MemberTile';

function UnitBlock({ unit }: { unit: TeamUnit }) {
  const t = useTranslations('team');
  return (
    <div className="rounded-xl border border-neutral-200 bg-white/70 p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <span className="inline-block w-2 h-2 rotate-45 bg-accent-500" />
        <h4 className="font-heading font-semibold text-lg text-primary-800">
          {t(unit.nameKey)}
        </h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <MemberTile person={unit.coordinator} size="md" highlight />
        {unit.members.map((m) => (
          <MemberTile key={m.name} person={m} size="md" />
        ))}
      </div>
    </div>
  );
}

function DepartmentBlock({ dept, index }: { dept: TeamDepartment; index: number }) {
  const t = useTranslations('team');
  return (
    <ScrollReveal delay={index * 0.05}>
      <section className="mt-16">
        <div className="rounded-2xl bg-gradient-to-br from-primary-50 via-white to-accent-300/5 border border-primary-100 p-8 md:p-10">
          <div className="flex items-center gap-3">
            <span className="inline-block w-3 h-3 rotate-45 bg-primary-500" />
            <span className="uppercase tracking-widest text-xs font-semibold text-primary-500">
              {`0${index + 1}`.slice(-2)}
            </span>
          </div>
          <h3 className="font-heading font-bold text-2xl md:text-3xl text-neutral-900 mt-3">
            {t(dept.nameKey)}
          </h3>
          <p className="text-neutral-600 mt-2 max-w-3xl">{t(dept.descriptionKey)}</p>
        </div>

        <div className="mt-8 space-y-8">
          {dept.coordinator && (
            <div className="rounded-xl border border-neutral-200 bg-white/70 p-6 md:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <MemberTile person={dept.coordinator} size="md" highlight />
                {dept.members?.map((m) => (
                  <MemberTile key={m.name} person={m} size="md" />
                ))}
              </div>
            </div>
          )}

          {dept.units?.map((unit) => (
            <UnitBlock key={unit.slug} unit={unit} />
          ))}
        </div>
      </section>
    </ScrollReveal>
  );
}

export default function TeamGrid() {
  const t = useTranslations('team');
  const { founder, generalCoordinators, administrativeCoordinators, departments } =
    teamStructure;

  return (
    <section className="py-20 bg-neutral-50">
      <Container>
        <SectionHeader
          overline={t('leadership')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <ScrollReveal>
          <div className="mt-16 flex justify-center">
            <div className="w-full max-w-sm">
              <MemberTile person={founder} size="lg" highlight />
            </div>
          </div>
        </ScrollReveal>

        <div className="relative max-w-2xl mx-auto mt-6 mb-2" aria-hidden>
          <div className="flex justify-center">
            <div className="h-8 border-l-2 border-dashed border-primary-300" />
          </div>

          <div className="hidden sm:block relative h-6">
            <div className="absolute top-0 left-1/4 right-1/4 border-t-2 border-dashed border-primary-300" />
            <div className="absolute top-0 left-1/4 h-6 border-l-2 border-dashed border-primary-300" />
            <div className="absolute top-0 right-1/4 h-6 border-l-2 border-dashed border-primary-300" />
          </div>

          <div className="sm:hidden flex justify-center">
            <div className="h-4 border-l-2 border-dashed border-primary-300" />
          </div>
        </div>

        <ScrollReveal delay={0.1}>
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-5 justify-center">
              <span className="inline-block w-2 h-2 rotate-45 bg-accent-500" />
              <h4 className="font-heading font-semibold text-base text-primary-800 uppercase tracking-widest">
                {t('generalCoordination')}
              </h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {generalCoordinators.map((person) => (
                <MemberTile key={person.name} person={person} size="md" highlight />
              ))}
            </div>
          </div>
        </ScrollReveal>

        {administrativeCoordinators.length > 0 && (
          <ScrollReveal delay={0.15}>
            <div className="max-w-3xl mx-auto mt-12">
              <div className="flex items-center gap-3 mb-5 justify-center">
                <span className="inline-block w-2 h-2 rotate-45 bg-accent-500" />
                <h4 className="font-heading font-semibold text-base text-primary-800 uppercase tracking-widest">
                  {t('administrativeCoordination')}
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {administrativeCoordinators.map((person) => (
                  <MemberTile key={person.name} person={person} size="md" highlight />
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        <div className="mt-20">
          <SectionHeader title={t('structure')} />

          {departments.map((dept, i) => (
            <DepartmentBlock key={dept.slug} dept={dept} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
