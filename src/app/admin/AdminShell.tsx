'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, FileText, Instagram, Newspaper, FolderKanban } from 'lucide-react';
import AdminDashboard from '@/app/admin/AdminDashboard';
import InstagramManager from '@/app/admin/InstagramManager';
import BlogManager from '@/app/admin/BlogManager';
import ProjectsManager from '@/app/admin/ProjectsManager';
import type { ReportEntry } from '@/lib/reports/types';
import type { InstagramPost } from '@/lib/instagram/types';
import type { BlogPostEntry } from '@/lib/blog/types';
import type { ProjectEntry } from '@/lib/projects/types';

interface AdminShellProps {
  initialReports: ReportEntry[];
  initialPosts: InstagramPost[];
  initialBlogPosts: BlogPostEntry[];
  initialProjects: ProjectEntry[];
}

type Tab = 'reports' | 'instagram' | 'blog' | 'projects';

export default function AdminShell({
  initialReports,
  initialPosts,
  initialBlogPosts,
  initialProjects,
}: AdminShellProps) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('reports');

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.replace('/admin/login');
    router.refresh();
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-[0.28em] text-neutral-400 font-semibold">
              Yönetim
            </span>
            <h1 className="font-heading text-2xl font-bold text-primary-900 mt-0.5">
              GEGET Panel
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-neutral-600 hover:text-primary-700 hover:bg-neutral-100 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Çıkış
          </button>
        </div>

        <div className="mx-auto max-w-6xl px-6">
          <nav className="flex gap-1 -mb-px">
            <TabButton
              active={tab === 'reports'}
              onClick={() => setTab('reports')}
              icon={<FileText className="h-4 w-4" />}
              label="Raporlar"
            />
            <TabButton
              active={tab === 'blog'}
              onClick={() => setTab('blog')}
              icon={<Newspaper className="h-4 w-4" />}
              label="Blog"
            />
            <TabButton
              active={tab === 'projects'}
              onClick={() => setTab('projects')}
              icon={<FolderKanban className="h-4 w-4" />}
              label="Projeler"
            />
            <TabButton
              active={tab === 'instagram'}
              onClick={() => setTab('instagram')}
              icon={<Instagram className="h-4 w-4" />}
              label="Instagram"
            />
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        {tab === 'reports' && <AdminDashboard initialReports={initialReports} />}
        {tab === 'blog' && <BlogManager initialPosts={initialBlogPosts} />}
        {tab === 'projects' && (
          <ProjectsManager initialProjects={initialProjects} />
        )}
        {tab === 'instagram' && <InstagramManager initialPosts={initialPosts} />}
      </main>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={
        'inline-flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ' +
        (active
          ? 'border-primary-700 text-primary-900'
          : 'border-transparent text-neutral-500 hover:text-primary-700')
      }
    >
      {icon}
      {label}
    </button>
  );
}
