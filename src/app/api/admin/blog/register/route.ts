import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { isAdmin } from '@/lib/auth/guard';
import { addPost, readManifest, existingSlugs } from '@/lib/blog/storage';
import { slugify, uniqueSlug } from '@/lib/reports/slug';
import type {
  BlogCategoryKey,
  BlogPostEntry,
  LocalizedContent,
} from '@/lib/blog/types';

export const runtime = 'nodejs';

const CATEGORIES: BlogCategoryKey[] = ['policy', 'city', 'community'];

interface RegisterBody {
  date?: string;
  readingMinutes?: number;
  categoryKey?: string;
  coverImage?: string;
  coverAspect?: string;
  instagramUrl?: string;
  tr?: Partial<LocalizedContent>;
  en?: Partial<LocalizedContent>;
}

function cleanContent(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((p) => (typeof p === 'string' ? p.trim() : ''))
    .filter((p) => p.length > 0);
}

function normalizeLocalized(
  value: Partial<LocalizedContent> | undefined,
): LocalizedContent | null {
  const title = value?.title?.trim();
  if (!title) return null;
  return {
    title,
    excerpt: value?.excerpt?.trim() ?? '',
    content: cleanContent(value?.content),
  };
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Yetkisiz.' }, { status: 401 });
  }

  let body: RegisterBody;
  try {
    body = (await req.json()) as RegisterBody;
  } catch {
    return NextResponse.json({ error: 'Geçersiz istek.' }, { status: 400 });
  }

  const tr = normalizeLocalized(body.tr);
  if (!tr) {
    return NextResponse.json(
      { error: 'Türkçe başlık gerekli.' },
      { status: 400 },
    );
  }
  const en = normalizeLocalized(body.en) ?? undefined;

  const categoryKey = (body.categoryKey ?? '') as BlogCategoryKey;
  if (!CATEGORIES.includes(categoryKey)) {
    return NextResponse.json({ error: 'Geçersiz kategori.' }, { status: 400 });
  }

  if (!body.coverImage || typeof body.coverImage !== 'string') {
    return NextResponse.json({ error: 'Kapak görseli gerekli.' }, { status: 400 });
  }

  const date =
    typeof body.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(body.date)
      ? body.date
      : new Date().toISOString().slice(0, 10);

  const readingMinutes =
    typeof body.readingMinutes === 'number' && body.readingMinutes > 0
      ? Math.round(body.readingMinutes)
      : 3;

  const coverAspect = body.coverAspect === 'square' ? 'square' : 'video';
  const instagramUrl = body.instagramUrl?.trim() || undefined;

  const manifest = await readManifest();
  const slug = uniqueSlug(slugify(tr.title), existingSlugs(manifest));
  const now = new Date().toISOString();

  const entry: BlogPostEntry = {
    id: nanoid(12),
    slug,
    date,
    readingMinutes,
    categoryKey,
    coverImage: body.coverImage,
    coverAspect,
    instagramUrl,
    tr,
    en,
    createdAt: now,
    updatedAt: now,
  };

  const next = await addPost(entry);
  return NextResponse.json({ ok: true, manifest: next, post: entry });
}
