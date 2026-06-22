import { NextRequest, NextResponse } from 'next/server';
import { isAdmin } from '@/lib/auth/guard';
import { deletePost, updatePost, type BlogPostPatch } from '@/lib/blog/storage';
import type {
  BlogCategoryKey,
  LocalizedContent,
} from '@/lib/blog/types';

export const runtime = 'nodejs';

const CATEGORIES: BlogCategoryKey[] = ['policy', 'city', 'community'];

interface PatchBody {
  date?: string;
  readingMinutes?: number;
  categoryKey?: string;
  coverImage?: string;
  coverAspect?: string;
  instagramUrl?: string;
  tr?: Partial<LocalizedContent>;
  en?: Partial<LocalizedContent> | null;
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

async function requireAuth(): Promise<NextResponse | null> {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Yetkisiz.' }, { status: 401 });
  }
  return null;
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const denied = await requireAuth();
  if (denied) return denied;

  let body: PatchBody;
  try {
    body = (await req.json()) as PatchBody;
  } catch {
    return NextResponse.json({ error: 'Geçersiz istek.' }, { status: 400 });
  }

  const patch: BlogPostPatch = {};

  if (typeof body.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(body.date)) {
    patch.date = body.date;
  }
  if (typeof body.readingMinutes === 'number' && body.readingMinutes > 0) {
    patch.readingMinutes = Math.round(body.readingMinutes);
  }
  if (typeof body.categoryKey === 'string') {
    if (!CATEGORIES.includes(body.categoryKey as BlogCategoryKey)) {
      return NextResponse.json({ error: 'Geçersiz kategori.' }, { status: 400 });
    }
    patch.categoryKey = body.categoryKey as BlogCategoryKey;
  }
  if (typeof body.coverImage === 'string' && body.coverImage.trim()) {
    patch.coverImage = body.coverImage.trim();
  }
  if (body.coverAspect === 'square' || body.coverAspect === 'video') {
    patch.coverAspect = body.coverAspect;
  }
  if (typeof body.instagramUrl === 'string') {
    patch.instagramUrl = body.instagramUrl.trim() || undefined;
  }
  if (body.tr !== undefined) {
    const tr = normalizeLocalized(body.tr);
    if (!tr) {
      return NextResponse.json(
        { error: 'Türkçe başlık gerekli.' },
        { status: 400 },
      );
    }
    patch.tr = tr;
  }
  if (body.en !== undefined) {
    // null or an empty-title object clears the English version.
    patch.en = body.en ? normalizeLocalized(body.en) ?? undefined : undefined;
  }

  if (Object.keys(patch).length === 0) {
    return NextResponse.json({ error: 'Güncellenecek alan yok.' }, { status: 400 });
  }

  const next = await updatePost(params.id, patch);
  if (!next) {
    return NextResponse.json({ error: 'Yazı bulunamadı.' }, { status: 404 });
  }
  return NextResponse.json(next);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const denied = await requireAuth();
  if (denied) return denied;

  const next = await deletePost(params.id);
  if (!next) {
    return NextResponse.json({ error: 'Yazı bulunamadı.' }, { status: 404 });
  }
  return NextResponse.json(next);
}
