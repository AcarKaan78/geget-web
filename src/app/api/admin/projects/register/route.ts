import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { isAdmin } from '@/lib/auth/guard';
import { addProject } from '@/lib/projects/storage';
import type {
  ProjectCategory,
  ProjectEntry,
  ProjectStatus,
  LocalizedProjectContent,
} from '@/lib/projects/types';

export const runtime = 'nodejs';

const CATEGORIES: ProjectCategory[] = [
  'policy',
  'education',
  'social',
  'technology',
];
const STATUSES: ProjectStatus[] = ['active', 'completed', 'planned'];

interface RegisterBody {
  category?: string;
  status?: string;
  date?: string;
  coverImage?: string;
  tr?: Partial<LocalizedProjectContent>;
  en?: Partial<LocalizedProjectContent>;
}

function normalize(
  value: Partial<LocalizedProjectContent> | undefined,
): LocalizedProjectContent | null {
  const title = value?.title?.trim();
  if (!title) return null;
  return { title, description: value?.description?.trim() ?? '' };
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

  const tr = normalize(body.tr);
  if (!tr) {
    return NextResponse.json(
      { error: 'Türkçe başlık gerekli.' },
      { status: 400 },
    );
  }
  const en = normalize(body.en) ?? undefined;

  const category = (body.category ?? '') as ProjectCategory;
  if (!CATEGORIES.includes(category)) {
    return NextResponse.json({ error: 'Geçersiz kategori.' }, { status: 400 });
  }

  const status = (body.status ?? '') as ProjectStatus;
  if (!STATUSES.includes(status)) {
    return NextResponse.json({ error: 'Geçersiz durum.' }, { status: 400 });
  }

  if (!body.coverImage || typeof body.coverImage !== 'string') {
    return NextResponse.json({ error: 'Kapak görseli gerekli.' }, { status: 400 });
  }

  const date =
    typeof body.date === 'string' && /^\d{4}-\d{2}$/.test(body.date)
      ? body.date
      : new Date().toISOString().slice(0, 7);

  const now = new Date().toISOString();
  const entry: ProjectEntry = {
    id: nanoid(12),
    category,
    status,
    date,
    coverImage: body.coverImage,
    tr,
    en,
    createdAt: now,
    updatedAt: now,
  };

  const next = await addProject(entry);
  return NextResponse.json({ ok: true, manifest: next, project: entry });
}
