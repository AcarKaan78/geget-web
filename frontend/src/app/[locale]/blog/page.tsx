import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { constructMetadata } from '@/lib/metadata';
import { BookOpen, Pen, Users, Lightbulb, Calendar, MessageSquare } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return constructMetadata({
    title: t('blog.title'),
    description: t('blog.description'),
    locale,
    path: '/blog',
  });
}

const categoryIcons = [
  { key: 'policy', icon: Lightbulb },
  { key: 'stories', icon: Users },
  { key: 'education', icon: BookOpen },
  { key: 'opinion', icon: MessageSquare },
  { key: 'events', icon: Calendar },
];

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'blog' });

  return (
    <>
      {/* Hero section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 py-24 sm:py-32">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-10 left-[10%] h-32 w-32 rotate-45 rounded-2xl border border-white/[0.06]" />
          <div className="absolute bottom-10 right-[15%] h-24 w-24 rotate-45 rounded-xl border border-white/[0.08]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-accent-500/10 blur-3xl" />
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary-500/20 blur-3xl" />
        </div>

        <div className="section-container relative text-center">
          <ScrollReveal>
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
              <Pen className="h-8 w-8 text-white" strokeWidth={1.8} />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              {t('title')}
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
              {t('subtitle')}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Description + categories */}
      <section className="relative bg-gradient-to-b from-primary-50/60 via-white to-accent-50/30 py-20 sm:py-28">
        <div className="section-container">
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-lg leading-relaxed text-neutral-600 sm:text-xl">
                {t('description')}
              </p>
            </div>
          </ScrollReveal>

          {/* Category pills */}
          <ScrollReveal delay={0.15}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              {categoryIcons.map((cat) => {
                const Icon = cat.icon;
                return (
                  <div
                    key={cat.key}
                    className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white px-5 py-2.5 text-sm font-medium text-primary-700 shadow-sm transition-all duration-200 hover:border-primary-300 hover:shadow-md"
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.8} />
                    {t(`categories.${cat.key}`)}
                  </div>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Coming soon card */}
          <ScrollReveal delay={0.25}>
            <div className="mx-auto mt-16 max-w-2xl">
              <div className="relative overflow-hidden rounded-2xl border border-primary-100 bg-white p-10 text-center shadow-lg shadow-primary-900/5 sm:p-14">
                {/* Decorative gradient */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500" />

                {/* Animated dots */}
                <div className="mx-auto mb-6 flex items-center justify-center gap-2">
                  <span className="h-3 w-3 animate-pulse rounded-full bg-primary-400" />
                  <span className="h-3 w-3 animate-pulse rounded-full bg-accent-500" style={{ animationDelay: '0.2s' }} />
                  <span className="h-3 w-3 animate-pulse rounded-full bg-primary-400" style={{ animationDelay: '0.4s' }} />
                </div>

                <h3 className="font-heading text-2xl font-bold text-primary-800 sm:text-3xl">
                  {t('comingSoon')}
                </h3>

                <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
                  {t('comingSoonText')}
                </p>

                <div className="mt-8">
                  <p className="text-sm font-medium italic text-primary-500">
                    {t('stayTuned')}
                  </p>
                </div>

                {/* Decorative corners */}
                <div className="absolute -bottom-4 -right-4 h-20 w-20 rotate-45 rounded-lg bg-primary-50" aria-hidden="true" />
                <div className="absolute -top-4 -left-4 h-16 w-16 rotate-45 rounded-lg bg-accent-50" aria-hidden="true" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
