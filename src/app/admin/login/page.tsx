import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/auth/guard';
import LoginForm from '@/app/admin/login/LoginForm';

export default async function LoginPage() {
  if (await isAdmin()) {
    redirect('/admin');
  }
  return <LoginForm />;
}
