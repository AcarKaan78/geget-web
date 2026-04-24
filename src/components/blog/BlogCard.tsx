'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { BlogPost } from '@/lib/blog';
import { formatDate, cn } from '@/lib/utils';

interface BlogCardProps {
  post: BlogPost;
  locale: string;
}

export default function BlogCard({ post, locale }: BlogCardProps) {
  const t = useTranslations('blog');

  const title = t(`posts.${post.slug}.title`);
  const excerpt = t(`posts.${post.slug}.excerpt`);
  const category = t(`categories.${post.categoryKey}`);

  return (
    <Link
      href={`/${locale}/blog/${post.slug}`}
      className={cn(
        'group relative block rounded-xl bg-white border border-neutral-200 shadow-sm overflow-hidden',
        'transition-all duration-300',
        'hover:-translate-y-1 hover:shadow-lg',
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
      )}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={post.coverImage}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 rounded-full bg-white/90 text-primary-600 text-xs font-semibold px-3 py-1">
          {category}
        </span>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-3 text-xs text-neutral-500">
          <span>{formatDate(post.date, locale === 'tr' ? 'tr-TR' : 'en-US')}</span>
          <span className="inline-block h-1 w-1 rounded-full bg-neutral-300" />
          <span>
            {post.readingMinutes} {t('minuteRead')}
          </span>
        </div>

        <h3 className="font-heading font-semibold text-lg text-neutral-900 mt-3 group-hover:text-primary-700 transition-colors">
          {title}
        </h3>

        <p className="text-neutral-500 text-sm mt-2 font-body line-clamp-3">
          {excerpt}
        </p>

        <div className="mt-4 inline-flex items-center gap-1 text-primary-600 text-sm font-semibold">
          <span>{t('readMore')}</span>
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </Link>
  );
}
