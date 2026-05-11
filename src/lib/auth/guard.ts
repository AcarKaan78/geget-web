import { getSession } from './session';

export async function isAdmin(): Promise<boolean> {
  const session = await getSession();
  return Boolean(session.loggedIn);
}

export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) {
    throw new AdminAuthError();
  }
}

export class AdminAuthError extends Error {
  constructor() {
    super('Unauthorized');
    this.name = 'AdminAuthError';
  }
}
