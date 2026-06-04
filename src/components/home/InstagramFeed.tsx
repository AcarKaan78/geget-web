'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { SOCIAL_LINKS } from '@/lib/constants';
import type { InstagramPost } from '@/lib/instagram/types';
import { PREVIEW_INSTAGRAM_POSTS } from '@/lib/instagram/featured';

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

const EMBED_SCRIPT_ID = 'instagram-embed-script';

function processEmbeds() {
  window.instgrm?.Embeds?.process();
}

function loadEmbedScript() {
  if (document.getElementById(EMBED_SCRIPT_ID)) {
    processEmbeds();
    return;
  }
  const script = document.createElement('script');
  script.id = EMBED_SCRIPT_ID;
  script.async = true;
  script.src = 'https://www.instagram.com/embed.js';
  script.onload = processEmbeds;
  document.body.appendChild(script);
}

export default function InstagramFeed() {
  const t = useTranslations('home');
  const [posts, setPosts] = useState<InstagramPost[] | null>(null);

  // Load the admin-managed list of post URLs.
  useEffect(() => {
    let active = true;
    fetch('/api/instagram', { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : { posts: [] }))
      .then((data) => {
        if (active) setPosts(Array.isArray(data.posts) ? data.posts : []);
      })
      .catch(() => {
        if (active) setPosts([]);
      });
    return () => {
      active = false;
    };
  }, []);

  // Post URLs come from the admin panel (production). When that list is empty,
  // fall back to the local PREVIEW list in development so the section can be
  // viewed on localhost without the Vercel Blob token.
  const adminUrls = posts?.map((p) => p.url) ?? [];
  const previewUrls =
    process.env.NODE_ENV === 'development' ? PREVIEW_INSTAGRAM_POSTS : [];
  const urls = adminUrls.length > 0 ? adminUrls : previewUrls;

  // Turn the blockquotes into real Instagram cards once we have URLs.
  useEffect(() => {
    if (urls.length > 0) loadEmbedScript();
  }, [urls.join('|')]);

  // Hide the whole section until we know there is something to show.
  if (urls.length === 0) return null;

  return (
    <section className="relative bg-white py-24 md:py-32 overflow-hidden">
      {/* Atmosphere */}
      <div
        aria-hidden
        className="absolute -top-24 -left-32 w-[34rem] h-[34rem] rounded-full bg-primary-100/60 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -right-24 w-[30rem] h-[30rem] rounded-full bg-accent-300/20 blur-3xl"
      />

      <Container className="relative z-10">
        <ScrollReveal>
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary-600">
              <Instagram className="h-3.5 w-3.5" />
              {t('instagram.overline')}
            </span>
            <h2 className="mt-3 font-heading font-bold text-neutral-900 text-3xl md:text-4xl tracking-tight">
              {t('instagram.title')}
            </h2>
            <p className="mt-4 max-w-2xl text-neutral-500 text-lg font-body leading-relaxed">
              {t('instagram.subtitle')}
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3 items-start">
          {urls.map((url, i) => (
            <motion.div
              key={url}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.5,
                delay: (i % 3) * 0.08,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="flex justify-center"
            >
              {/* Instagram's embed.js upgrades this blockquote into the real post card. */}
              <blockquote
                className="instagram-media w-full"
                data-instgrm-permalink={url}
                data-instgrm-version="14"
                style={{
                  margin: 0,
                  maxWidth: 540,
                  width: '100%',
                  minWidth: 0,
                  borderRadius: 16,
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 10px 30px -18px rgba(10,24,53,0.35)',
                }}
              />
            </motion.div>
          ))}
        </div>

        <ScrollReveal delay={0.1}>
          <div className="mt-12 flex justify-center">
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-br from-primary-700 to-primary-900 px-7 py-3.5 text-sm md:text-base font-semibold text-white shadow-[0_20px_40px_-18px_rgba(10,24,53,0.7)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              <Instagram className="h-4 w-4" />
              {t('instagram.follow')}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
