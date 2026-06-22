import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/auth/guard';
import { readManifest as readReports } from '@/lib/reports/storage';
import { readManifest as readInstagram } from '@/lib/instagram/storage';
import { readManifest as readBlog } from '@/lib/blog/storage';
import AdminShell from '@/app/admin/AdminShell';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  if (!(await isAdmin())) {
    redirect('/admin/login');
  }
  const [reports, instagram, blog] = await Promise.all([
    readReports(),
    readInstagram(),
    readBlog(),
  ]);
  return (
    <AdminShell
      initialReports={reports.reports}
      initialPosts={instagram.posts}
      initialBlogPosts={blog.posts}
    />
  );
}
