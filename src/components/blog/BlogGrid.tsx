'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import type { LocalizedPost } from '@/lib/blog/types';
import Container from '@/components/ui/Container';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import BlogCard from '@/components/blog/BlogCard';

interface BlogGridProps {
  posts: LocalizedPost[];
  locale: string;
}

export default function BlogGrid({ posts, locale }: BlogGridProps) {
  const t = useTranslations('blog');

  return (
    <section className="py-20 bg-white">
      <Container>
        <SectionHeader title={t('postsLabel')} subtitle={t('subtitle')} />

        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {posts.map((post, index) => (
              <ScrollReveal key={post.slug} delay={index * 0.1}>
                <BlogCard post={post} locale={locale} />
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
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
