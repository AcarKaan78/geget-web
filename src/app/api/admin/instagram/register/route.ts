import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { isAdmin } from '@/lib/auth/guard';
import { addPost } from '@/lib/instagram/storage';
import {
  isInstagramPostUrl,
  normalizeInstagramUrl,
  type InstagramPost,
} from '@/lib/instagram/types';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Yetkisiz.' }, { status: 401 });
  }

  let body: { url?: string };
  try {
    body = (await req.json()) as { url?: string };
  } catch {
    return NextResponse.json({ error: 'Geçersiz istek.' }, { status: 400 });
  }

  const raw = body.url?.trim();
  if (!raw || !isInstagramPostUrl(raw)) {
    return NextResponse.json(
      { error: 'Geçerli bir Instagram gönderi linki gir (örn. instagram.com/p/...).' },
      { status: 400 },
    );
  }

  const entry: InstagramPost = {
    id: nanoid(12),
    url: normalizeInstagramUrl(raw),
    uploadedAt: new Date().toISOString(),
  };

  const next = await addPost(entry);
  return NextResponse.json({ ok: true, manifest: next, post: entry });
}
