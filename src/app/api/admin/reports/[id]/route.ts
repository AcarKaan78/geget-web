import { NextRequest, NextResponse } from 'next/server';
import { isAdmin } from '@/lib/auth/guard';
import { deleteReport, updateReport } from '@/lib/reports/storage';

export const runtime = 'nodejs';

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

  let body: { titleTr?: string; titleEn?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Geçersiz istek.' }, { status: 400 });
  }

  const patch: { titleTr?: string; titleEn?: string } = {};
  if (typeof body.titleTr === 'string' && body.titleTr.trim().length > 0) {
    patch.titleTr = body.titleTr.trim();
  }
  if (typeof body.titleEn === 'string') {
    patch.titleEn = body.titleEn.trim() || undefined;
  }
  if (Object.keys(patch).length === 0) {
    return NextResponse.json({ error: 'Güncellenecek alan yok.' }, { status: 400 });
  }

  const next = await updateReport(params.id, patch);
  if (!next) {
    return NextResponse.json({ error: 'Rapor bulunamadı.' }, { status: 404 });
  }
  return NextResponse.json(next);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const denied = await requireAuth();
  if (denied) return denied;

  const next = await deleteReport(params.id);
  if (!next) {
    return NextResponse.json({ error: 'Rapor bulunamadı.' }, { status: 404 });
  }
  return NextResponse.json(next);
}
