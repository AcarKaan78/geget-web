import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return NextResponse.json(
      { error: 'ADMIN_PASSWORD not configured on server.' },
      { status: 500 },
    );
  }

  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Geçersiz istek.' }, { status: 400 });
  }

  if (!body.password || typeof body.password !== 'string') {
    return NextResponse.json({ error: 'Parola gerekli.' }, { status: 400 });
  }

  if (!safeCompare(body.password, expected)) {
    return NextResponse.json({ error: 'Parola hatalı.' }, { status: 401 });
  }

  const session = await getSession();
  session.loggedIn = true;
  session.loggedInAt = Date.now();
  await session.save();

  return NextResponse.json({ ok: true });
}

function safeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}
