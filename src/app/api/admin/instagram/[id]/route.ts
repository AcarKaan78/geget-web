import { NextRequest, NextResponse } from 'next/server';
import { isAdmin } from '@/lib/auth/guard';
import { deletePost } from '@/lib/instagram/storage';

export const runtime = 'nodejs';

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Yetkisiz.' }, { status: 401 });
  }

  const next = await deletePost(params.id);
  if (!next) {
    return NextResponse.json({ error: 'Gönderi bulunamadı.' }, { status: 404 });
  }
  return NextResponse.json(next);
}
