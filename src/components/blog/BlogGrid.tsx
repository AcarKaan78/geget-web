'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { blogPosts } from '@/lib/blog';
import Container from '@/components/ui/Container';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import BlogCard from '@/components/blog/BlogCard';

export default function BlogGrid() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] === 'en' ? 'en' : 'tr';
  const t = useTranslations('blog');

  return (
    <section className="py-20 bg-white">
      <Container>
        <SectionHeader title={t('postsLabel')} subtitle={t('subtitle')} />

        {blogPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {blogPosts.map((post, index) => (
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
