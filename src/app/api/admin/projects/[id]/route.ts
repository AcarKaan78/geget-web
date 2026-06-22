import { NextRequest, NextResponse } from 'next/server';
import { isAdmin } from '@/lib/auth/guard';
import {
  deleteProject,
  updateProject,
  type ProjectPatch,
} from '@/lib/projects/storage';
import type {
  ProjectCategory,
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

interface PatchBody {
  category?: string;
  status?: string;
  date?: string;
  tr?: Partial<LocalizedProjectContent>;
  en?: Partial<LocalizedProjectContent> | null;
}

function normalize(
  value: Partial<LocalizedProjectContent> | undefined,
): LocalizedProjectContent | null {
  const title = value?.title?.trim();
  if (!title) return null;
  return { title, description: value?.description?.trim() ?? '' };
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

  const patch: ProjectPatch = {};

  if (typeof body.category === 'string') {
    if (!CATEGORIES.includes(body.category as ProjectCategory)) {
      return NextResponse.json({ error: 'Geçersiz kategori.' }, { status: 400 });
    }
    patch.category = body.category as ProjectCategory;
  }
  if (typeof body.status === 'string') {
    if (!STATUSES.includes(body.status as ProjectStatus)) {
      return NextResponse.json({ error: 'Geçersiz durum.' }, { status: 400 });
    }
    patch.status = body.status as ProjectStatus;
  }
  if (typeof body.date === 'string' && /^\d{4}-\d{2}$/.test(body.date)) {
    patch.date = body.date;
  }
  if (body.tr !== undefined) {
    const tr = normalize(body.tr);
    if (!tr) {
      return NextResponse.json(
        { error: 'Türkçe başlık gerekli.' },
        { status: 400 },
      );
    }
    patch.tr = tr;
  }
  if (body.en !== undefined) {
    patch.en = body.en ? normalize(body.en) ?? undefined : undefined;
  }

  if (Object.keys(patch).length === 0) {
    return NextResponse.json({ error: 'Güncellenecek alan yok.' }, { status: 400 });
  }

  const next = await updateProject(params.id, patch);
  if (!next) {
    return NextResponse.json({ error: 'Proje bulunamadı.' }, { status: 404 });
  }
  return NextResponse.json(next);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const denied = await requireAuth();
  if (denied) return denied;

  const next = await deleteProject(params.id);
  if (!next) {
    return NextResponse.json({ error: 'Proje bulunamadı.' }, { status: 404 });
  }
  return NextResponse.json(next);
}
