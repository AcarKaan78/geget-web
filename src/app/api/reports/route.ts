import { NextResponse } from 'next/server';
import { readManifest } from '@/lib/reports/storage';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const manifest = await readManifest();
    return NextResponse.json(manifest, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (err) {
    console.error('[api/reports] read failed', err);
    return NextResponse.json(
      { version: 1, reports: [] },
      { status: 500, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}
