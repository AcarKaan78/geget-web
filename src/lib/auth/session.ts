import { cookies } from 'next/headers';
import { getIronSession, SessionOptions } from 'iron-session';

export interface AdminSession {
  loggedIn?: boolean;
  loggedInAt?: number;
}

export function sessionOptions(): SessionOptions {
  const password = process.env.SESSION_SECRET;
  if (!password || password.length < 32) {
    throw new Error(
      'SESSION_SECRET env var missing or too short (need 32+ chars).',
    );
  }
  return {
    password,
    cookieName: 'geget_admin_session',
    cookieOptions: {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    },
  };
}

export async function getSession() {
  const cookieStore = await cookies();
  return getIronSession<AdminSession>(cookieStore, sessionOptions());
}
