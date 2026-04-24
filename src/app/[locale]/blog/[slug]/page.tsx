import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Container from '@/components/ui/Container';
import DiamondPattern from '@/components/ui/DiamondPattern';
import { blogPosts, getPost } from '@/lib/blog';
import { formatDate } from '@/lib/utils';
import { routing } from '@/../../i18n/routing';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    blogPosts.map((post) => ({ locale, slug: post.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const t = await getTranslations({ locale, namespace: 'blog' });
  const title = t(`posts.${slug}.title`);
  const description = t(`posts.${slug}.excerpt`);

  return {
    title: `${title} — GEGET`,
    description,
    alternates: {
      canonical: `https://geget.org/${locale}/blog/${slug}`,
      languages: {
        tr: `https://geget.org/tr/blog/${slug}`,
        en: `https://geget.org/en/blog/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://geget.org/${locale}/blog/${slug}`,
      siteName: 'GEGET',
      locale: locale === 'tr' ? 'tr_TR' : 'en_US',
      type: 'article',
      images: [post.coverImage],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = getPost(slug);
  if (!post) notFound();

  const t = await getTranslations({ locale, namespace: 'blog' });
  const title = t(`posts.${slug}.title`);
  const excerpt = t(`posts.${slug}.excerpt`);
  const category = t(`categories.${post.categoryKey}`);
  const content = t.raw(`posts.${slug}.content`) as string[];

  return (
    <>
      <section className="relative bg-gradient-to-br from-primary-700 to-primary-900 pt-32 pb-20 overflow-hidden">
        <DiamondPattern count={5} opacity={0.05} color="white" />
        <Container className="relative z-10 max-w-3xl">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-primary-200 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{t('backToList')}</span>
          </Link>

          <div className="mt-8 flex items-center gap-3 text-primary-200 text-sm">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
              {category}
            </span>
            <span>{formatDate(post.date, locale === 'tr' ? 'tr-TR' : 'en-US')}</span>
            <span className="inline-block h-1 w-1 rounded-full bg-primary-300" />
            <span>
              {post.readingMinutes} {t('minuteRead')}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mt-4 leading-tight">
            {title}
          </h1>

          <p className="text-primary-100 text-lg mt-6 leading-relaxed">
            {excerpt}
          </p>
        </Container>
      </section>

      <section className="py-16 bg-white">
        <Container className="max-w-3xl">
          <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-neutral-200 shadow-sm">
            <Image
              src={post.coverImage}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          </div>

          <article className="mt-10 space-y-6 text-neutral-700 font-body text-lg leading-relaxed">
            {content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </article>

          <div className="mt-12 pt-8 border-t border-neutral-200">
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors text-sm font-semibold"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{t('backToList')}</span>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
