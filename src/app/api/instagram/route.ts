import { NextResponse } from 'next/server';
import { readManifest } from '@/lib/instagram/storage';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const manifest = await readManifest();
    return NextResponse.json(manifest, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (err) {
    console.error('[api/instagram] read failed', err);
    return NextResponse.json(
      { version: 1, posts: [] },
      { status: 500, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}
