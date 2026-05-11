import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { isAdmin } from '@/lib/auth/guard';
import { addReport, readManifest } from '@/lib/reports/storage';
import { slugify, uniqueSlug } from '@/lib/reports/slug';
import type { ReportEntry, ReportType } from '@/lib/reports/types';

export const runtime = 'nodejs';

interface RegisterBody {
  titleTr?: string;
  titleEn?: string;
  type?: ReportType;
  fileUrl?: string;
  fileName?: string;
  sizeBytes?: number;
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

  const titleTr = body.titleTr?.trim();
  if (!titleTr) {
    return NextResponse.json({ error: 'Türkçe başlık gerekli.' }, { status: 400 });
  }
  if (body.type !== 'pdf' && body.type !== 'image') {
    return NextResponse.json({ error: 'Geçersiz dosya tipi.' }, { status: 400 });
  }
  if (!body.fileUrl || typeof body.fileUrl !== 'string') {
    return NextResponse.json({ error: 'Dosya URL eksik.' }, { status: 400 });
  }

  const manifest = await readManifest();
  const taken = new Set(manifest.reports.map((r) => r.slug));
  const slug = uniqueSlug(slugify(titleTr), taken);

  const entry: ReportEntry = {
    id: nanoid(12),
    slug,
    titleTr,
    titleEn: body.titleEn?.trim() || undefined,
    type: body.type,
    fileUrl: body.fileUrl,
    fileName: body.fileName?.trim() || titleTr,
    sizeBytes: typeof body.sizeBytes === 'number' ? body.sizeBytes : 0,
    uploadedAt: new Date().toISOString(),
  };

  const next = await addReport(entry);
  return NextResponse.json({ ok: true, manifest: next, report: entry });
}
