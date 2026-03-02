import React from 'react';
import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { BookOpen, Target, Compass } from 'lucide-react';

export default function Story() {
  const t = useTranslations('about.story');

  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text column */}
          <ScrollReveal direction="left">
            <SectionHeader title={t('title')} />
            <div className="space-y-6 text-neutral-600 leading-relaxed font-body">
              <p className="text-lg">
                {t('paragraph1')}
              </p>
              <p>
                {t('paragraph2')}
              </p>
              <p>
                {t('paragraph3')}
              </p>
            </div>
          </ScrollReveal>

          {/* Decorative element column */}
          <ScrollReveal direction="right" delay={0.2}>
            <div className="relative">
              {/* Main decorative card */}
              <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-8 text-white shadow-xl">
                <div className="space-y-8">
                  {/* Mission highlight */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-lg mb-1">
                        {t('missionTitle')}
                      </h3>
                      <p className="text-white/80 text-sm">
                        {t('missionText')}
                      </p>
                    </div>
                  </div>

                  {/* Vision highlight */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <Compass className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-lg mb-1">
                        {t('visionTitle')}
                      </h3>
                      <p className="text-white/80 text-sm">
                        {t('visionText')}
                      </p>
                    </div>
                  </div>

                  {/* Philosophy highlight */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-lg mb-1">
                        {t('philosophyTitle')}
                      </h3>
                      <p className="text-white/80 text-sm">
                        {t('philosophyText')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Background decorative elements */}
              <div
                className="absolute -top-4 -right-4 w-24 h-24 bg-accent-400/20 rounded-full -z-10"
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary-200/30 rounded-full -z-10"
                aria-hidden="true"
              />
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
