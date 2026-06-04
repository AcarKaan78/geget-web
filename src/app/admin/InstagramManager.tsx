'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Trash2,
  Loader2,
  Check,
  AlertCircle,
  ExternalLink,
  Instagram,
} from 'lucide-react';
import type { InstagramPost } from '@/lib/instagram/types';

interface InstagramManagerProps {
  initialPosts: InstagramPost[];
}

type Status =
  | { kind: 'idle' }
  | { kind: 'saving' }
  | { kind: 'ok'; message: string }
  | { kind: 'error'; message: string };

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('tr-TR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export default function InstagramManager({ initialPosts }: InstagramManagerProps) {
  const router = useRouter();
  const [posts, setPosts] = useState(initialPosts);
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [url, setUrl] = useState('');
  const [, startTransition] = useTransition();

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const value = url.trim();
    if (!value) return;

    setStatus({ kind: 'saving' });
    try {
      const res = await fetch('/api/admin/instagram/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: value }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error ?? 'Eklenemedi.');
      }
      setPosts(data.manifest.posts);
      setUrl('');
      setStatus({ kind: 'ok', message: 'Gönderi eklendi.' });
      startTransition(() => router.refresh());
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Bir hata oluştu.';
      setStatus({ kind: 'error', message });
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Bu gönderi listeden kaldırılacak. Emin misin?')) return;
    try {
      const res = await fetch(`/api/admin/instagram/${id}`, { method: 'DELETE' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus({ kind: 'error', message: data.error ?? 'Silinemedi.' });
        return;
      }
      setPosts(data.posts);
      setStatus({ kind: 'ok', message: 'Gönderi kaldırıldı.' });
      startTransition(() => router.refresh());
    } catch {
      setStatus({ kind: 'error', message: 'Silme başarısız.' });
    }
  }

  return (
    <div className="space-y-10">
      <section className="rounded-2xl bg-white ring-1 ring-neutral-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200">
          <h2 className="font-heading text-lg font-semibold text-primary-900">
            Instagram Gönderisi Ekle
          </h2>
          <p className="text-sm text-neutral-500 mt-0.5">
            Instagram&apos;da gönderiyi aç → &quot;…&quot; menüsü → <strong>Bağlantıyı kopyala</strong>,
            sonra buraya yapıştır. Gönderi, ana sayfada otomatik olarak görünür.
          </p>
        </div>
        <form onSubmit={handleAdd} className="px-6 py-6 space-y-5">
          <label className="block">
            <span className="block text-xs uppercase tracking-[0.18em] font-semibold text-neutral-500 mb-1.5">
              Gönderi Linki *
            </span>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              placeholder="https://www.instagram.com/p/…"
              className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-shadow"
            />
          </label>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={status.kind === 'saving' || !url.trim()}
              className="inline-flex items-center gap-2 rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {status.kind === 'saving' ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Ekleniyor…
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  Ekle
                </>
              )}
            </button>

            {status.kind === 'ok' && (
              <span className="inline-flex items-center gap-1.5 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1">
                <Check className="h-4 w-4" />
                {status.message}
              </span>
            )}
            {status.kind === 'error' && (
              <span className="inline-flex items-center gap-1.5 text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-full px-3 py-1">
                <AlertCircle className="h-4 w-4" />
                {status.message}
              </span>
            )}
          </div>
        </form>
      </section>

      <section className="rounded-2xl bg-white ring-1 ring-neutral-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
          <h2 className="font-heading text-lg font-semibold text-primary-900">
            Yayındaki Gönderiler
          </h2>
          <span className="text-xs text-neutral-500 tabular-nums">
            {posts.length} gönderi
          </span>
        </div>

        {posts.length === 0 ? (
          <div className="px-6 py-16 text-center text-neutral-500">
            Henüz gönderi yok. Yukarıdan bir Instagram linki ekleyebilirsin.
          </div>
        ) : (
          <ul className="divide-y divide-neutral-100">
            {posts.map((p) => (
              <li
                key={p.id}
                className="px-6 py-4 flex items-center gap-4 hover:bg-neutral-50 transition-colors"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary-700 shrink-0">
                  <Instagram className="h-4 w-4" />
                </span>
                <div className="flex-1 min-w-0">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block font-medium text-primary-900 truncate hover:text-primary-700"
                  >
                    {p.url}
                  </a>
                  <span className="text-xs text-neutral-400 mt-0.5 inline-block">
                    {formatDate(p.uploadedAt)}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Gönderiyi aç"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 hover:text-primary-700 hover:bg-primary-50"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <button
                    onClick={() => handleDelete(p.id)}
                    title="Kaldır"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 hover:text-rose-600 hover:bg-rose-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
