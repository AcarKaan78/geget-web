import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/auth/guard';
import { readManifest } from '@/lib/reports/storage';
import AdminDashboard from '@/app/admin/AdminDashboard';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  if (!(await isAdmin())) {
    redirect('/admin/login');
  }
  const manifest = await readManifest();
  return <AdminDashboard initialReports={manifest.reports} />;
}
