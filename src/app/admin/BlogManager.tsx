'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { upload } from '@vercel/blob/client';
import {
  Plus,
  Trash2,
  Loader2,
  Check,
  AlertCircle,
  ExternalLink,
  Pencil,
  X as XIcon,
  Upload,
} from 'lucide-react';
import type {
  BlogPostEntry,
  BlogCategoryKey,
  BlogManifest,
} from '@/lib/blog/types';

interface BlogManagerProps {
  initialPosts: BlogPostEntry[];
}

type Status =
  | { kind: 'idle' }
  | { kind: 'ok'; message: string }
  | { kind: 'error'; message: string };

const CATEGORY_OPTIONS: { value: BlogCategoryKey; label: string }[] = [
  { value: 'policy', label: 'Politika' },
  { value: 'city', label: 'Şehirler' },
  { value: 'community', label: 'Topluluk' },
];

const CATEGORY_LABEL: Record<BlogCategoryKey, string> = {
  policy: 'Politika',
  city: 'Şehirler',
  community: 'Topluluk',
};

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function bodyToText(content: string[]): string {
  return content.join('\n\n');
}

function textToBody(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
}

function formatDate(iso: string): string {
  const d = new Date(iso.length === 10 ? `${iso}T00:00:00` : iso);
  return d.toLocaleDateString('tr-TR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export default function BlogManager({ initialPosts }: BlogManagerProps) {
  const router = useRouter();
  const [posts, setPosts] = useState(initialPosts);
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [, startTransition] = useTransition();

  function applyManifest(manifest: BlogManifest) {
    setPosts(manifest.posts);
    startTransition(() => router.refresh());
  }

  async function handleDelete(id: string) {
    if (!confirm('Bu yazı kalıcı olarak silinecek. Emin misin?')) return;
    try {
      const res = await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus({ kind: 'error', message: data.error ?? 'Silinemedi.' });
        return;
      }
      applyManifest(data);
      setStatus({ kind: 'ok', message: 'Yazı silindi.' });
    } catch {
      setStatus({ kind: 'error', message: 'Silme başarısız.' });
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-lg font-semibold text-primary-900">
            Blog Yazıları
          </h2>
          <p className="text-sm text-neutral-500 mt-0.5">
            Yazı ekle, düzenle veya sil. Türkçe zorunlu, İngilizce opsiyonel.
          </p>
        </div>
        {!creating && (
          <button
            onClick={() => {
              setCreating(true);
              setEditingId(null);
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-primary-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-800 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Yeni Yazı
          </button>
        )}
      </div>

      {(status.kind === 'ok' || status.kind === 'error') && (
        <div>
          {status.kind === 'ok' ? (
            <span className="inline-flex items-center gap-1.5 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1">
              <Check className="h-4 w-4" />
              {status.message}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-full px-3 py-1">
              <AlertCircle className="h-4 w-4" />
              {status.message}
            </span>
          )}
        </div>
      )}

      {creating && (
        <section className="rounded-2xl bg-white ring-1 ring-neutral-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-200">
            <h3 className="font-heading text-base font-semibold text-primary-900">
              Yeni Yazı Ekle
            </h3>
          </div>
          <PostForm
            mode="create"
            onDone={(manifest) => {
              applyManifest(manifest);
              setCreating(false);
              setStatus({ kind: 'ok', message: 'Yazı eklendi.' });
            }}
            onCancel={() => setCreating(false)}
            onError={(message) => setStatus({ kind: 'error', message })}
          />
        </section>
      )}

      <section className="rounded-2xl bg-white ring-1 ring-neutral-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
          <h3 className="font-heading text-base font-semibold text-primary-900">
            Mevcut Yazılar
          </h3>
          <span className="text-xs text-neutral-500 tabular-nums">
            {posts.length} yazı
          </span>
        </div>

        {posts.length === 0 ? (
          <div className="px-6 py-16 text-center text-neutral-500">
            Henüz yazı yok. Yukarıdan yeni yazı ekleyebilirsin.
          </div>
        ) : (
          <ul className="divide-y divide-neutral-100">
            {posts.map((post) => (
              <li key={post.id}>
                {editingId === post.id ? (
                  <div className="bg-primary-50/40">
                    <div className="px-6 py-3 border-b border-primary-100">
                      <span className="text-xs font-semibold text-primary-700">
                        Düzenleniyor: {post.tr.title}
                      </span>
                    </div>
                    <PostForm
                      mode="edit"
                      initial={post}
                      onDone={(manifest) => {
                        applyManifest(manifest);
                        setEditingId(null);
                        setStatus({ kind: 'ok', message: 'Yazı güncellendi.' });
                      }}
                      onCancel={() => setEditingId(null)}
                      onError={(message) =>
                        setStatus({ kind: 'error', message })
                      }
                    />
                  </div>
                ) : (
                  <div className="px-6 py-4 flex items-center gap-4 hover:bg-neutral-50 transition-colors">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.coverImage}
                      alt=""
                      className="h-12 w-16 rounded-md object-cover bg-neutral-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="block font-medium text-primary-900 truncate">
                        {post.tr.title}
                      </span>
                      <span className="text-xs text-neutral-400 mt-0.5 inline-block">
                        {formatDate(post.date)} · {CATEGORY_LABEL[post.categoryKey]} ·{' '}
                        {post.readingMinutes} dk · /blog/{post.slug}
                        {post.en ? ' · EN ✓' : ' · EN —'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <a
                        href={`/tr/blog/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Yazıyı aç"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 hover:text-primary-700 hover:bg-primary-50"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                      <button
                        onClick={() => {
                          setEditingId(post.id);
                          setCreating(false);
                        }}
                        title="Düzenle"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 hover:text-primary-700 hover:bg-primary-50"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        title="Sil"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 hover:text-rose-600 hover:bg-rose-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

interface PostFormProps {
  mode: 'create' | 'edit';
  initial?: BlogPostEntry;
  onDone: (manifest: BlogManifest) => void;
  onCancel: () => void;
  onError: (message: string) => void;
}

const LABEL =
  'block text-xs uppercase tracking-[0.18em] font-semibold text-neutral-500 mb-1.5';
const INPUT =
  'w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-shadow';

function PostForm({ mode, initial, onDone, onCancel, onError }: PostFormProps) {
  const [date, setDate] = useState(initial?.date ?? today());
  const [readingMinutes, setReadingMinutes] = useState(
    initial?.readingMinutes ?? 3,
  );
  const [categoryKey, setCategoryKey] = useState<BlogCategoryKey>(
    initial?.categoryKey ?? 'community',
  );
  const [coverAspect, setCoverAspect] = useState<'video' | 'square'>(
    initial?.coverAspect ?? 'video',
  );
  const [instagramUrl, setInstagramUrl] = useState(initial?.instagramUrl ?? '');
  const [coverImage, setCoverImage] = useState(initial?.coverImage ?? '');
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const [trTitle, setTrTitle] = useState(initial?.tr.title ?? '');
  const [trExcerpt, setTrExcerpt] = useState(initial?.tr.excerpt ?? '');
  const [trBody, setTrBody] = useState(
    initial ? bodyToText(initial.tr.content) : '',
  );

  const [enTitle, setEnTitle] = useState(initial?.en?.title ?? '');
  const [enExcerpt, setEnExcerpt] = useState(initial?.en?.excerpt ?? '');
  const [enBody, setEnBody] = useState(
    initial?.en ? bodyToText(initial.en.content) : '',
  );

  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!trTitle.trim()) {
      onError('Türkçe başlık gerekli.');
      return;
    }
    setBusy(true);
    try {
      let finalCover = coverImage;
      if (coverFile) {
        const blob = await upload(`blog/${coverFile.name}`, coverFile, {
          access: 'public',
          handleUploadUrl: '/api/admin/upload',
          contentType: coverFile.type,
        });
        finalCover = blob.url;
      }
      if (!finalCover) {
        onError('Kapak görseli gerekli.');
        setBusy(false);
        return;
      }

      const enFilled = enTitle.trim().length > 0;
      const payload = {
        date,
        readingMinutes: Number(readingMinutes) || 3,
        categoryKey,
        coverImage: finalCover,
        coverAspect,
        instagramUrl: instagramUrl.trim() || undefined,
        tr: {
          title: trTitle.trim(),
          excerpt: trExcerpt.trim(),
          content: textToBody(trBody),
        },
        en: enFilled
          ? {
              title: enTitle.trim(),
              excerpt: enExcerpt.trim(),
              content: textToBody(enBody),
            }
          : null,
      };

      const url =
        mode === 'create'
          ? '/api/admin/blog/register'
          : `/api/admin/blog/${initial!.id}`;
      const method = mode === 'create' ? 'POST' : 'PATCH';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        onError(data.error ?? 'Kaydedilemedi.');
        setBusy(false);
        return;
      }
      const manifest: BlogManifest =
        mode === 'create' ? data.manifest : data;
      onDone(manifest);
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Bir hata oluştu.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
      {/* Turkish (required) */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-primary-800">Türkçe *</h4>
        <label className="block">
          <span className={LABEL}>Başlık *</span>
          <input
            value={trTitle}
            onChange={(e) => setTrTitle(e.target.value)}
            required
            placeholder="Yazı başlığı"
            className={INPUT}
          />
        </label>
        <label className="block">
          <span className={LABEL}>Özet</span>
          <textarea
            value={trExcerpt}
            onChange={(e) => setTrExcerpt(e.target.value)}
            rows={2}
            placeholder="Kısa özet (liste ve önizlemede görünür)"
            className={INPUT}
          />
        </label>
        <label className="block">
          <span className={LABEL}>İçerik</span>
          <textarea
            value={trBody}
            onChange={(e) => setTrBody(e.target.value)}
            rows={8}
            placeholder="Paragrafları boş satırla ayır."
            className={`${INPUT} font-body leading-relaxed`}
          />
          <span className="text-xs text-neutral-400 mt-1 inline-block">
            Her paragrafı boş bir satırla ayır.
          </span>
        </label>
      </div>

      {/* English (optional) */}
      <div className="space-y-4 border-t border-neutral-100 pt-5">
        <h4 className="text-sm font-semibold text-neutral-600">
          English — opsiyonel{' '}
          <span className="font-normal text-neutral-400">
            (boş bırakılırsa İngilizce sitede Türkçe gösterilir)
          </span>
        </h4>
        <label className="block">
          <span className={LABEL}>Title</span>
          <input
            value={enTitle}
            onChange={(e) => setEnTitle(e.target.value)}
            placeholder="Post title"
            className={INPUT}
          />
        </label>
        <label className="block">
          <span className={LABEL}>Excerpt</span>
          <textarea
            value={enExcerpt}
            onChange={(e) => setEnExcerpt(e.target.value)}
            rows={2}
            placeholder="Short summary"
            className={INPUT}
          />
        </label>
        <label className="block">
          <span className={LABEL}>Content</span>
          <textarea
            value={enBody}
            onChange={(e) => setEnBody(e.target.value)}
            rows={8}
            placeholder="Separate paragraphs with a blank line."
            className={`${INPUT} font-body leading-relaxed`}
          />
        </label>
      </div>

      {/* Meta */}
      <div className="space-y-4 border-t border-neutral-100 pt-5">
        <h4 className="text-sm font-semibold text-primary-800">Ayarlar</h4>

        <label className="block">
          <span className={LABEL}>Kapak Görseli {mode === 'create' && '*'}</span>
          <div className="flex items-center gap-4">
            {coverImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={coverImage}
                alt=""
                className="h-16 w-24 rounded-md object-cover bg-neutral-100 shrink-0"
              />
            )}
            <div className="relative flex-1 rounded-lg border-2 border-dashed border-neutral-300 hover:border-primary-400 transition-colors bg-neutral-50/60">
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="flex items-center gap-3 px-4 py-3">
                <Upload className="h-5 w-5 text-primary-600" />
                <span className="text-sm text-neutral-600 truncate">
                  {coverFile
                    ? coverFile.name
                    : coverImage
                      ? 'Değiştirmek için seç…'
                      : 'JPG, PNG veya WEBP seç…'}
                </span>
              </div>
            </div>
          </div>
        </label>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <label className="block">
            <span className={LABEL}>Tarih</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={INPUT}
            />
          </label>
          <label className="block">
            <span className={LABEL}>Kategori</span>
            <select
              value={categoryKey}
              onChange={(e) => setCategoryKey(e.target.value as BlogCategoryKey)}
              className={INPUT}
            >
              {CATEGORY_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className={LABEL}>Okuma (dk)</span>
            <input
              type="number"
              min={1}
              value={readingMinutes}
              onChange={(e) => setReadingMinutes(Number(e.target.value))}
              className={INPUT}
            />
          </label>
          <label className="block">
            <span className={LABEL}>Kapak Oranı</span>
            <select
              value={coverAspect}
              onChange={(e) =>
                setCoverAspect(e.target.value as 'video' | 'square')
              }
              className={INPUT}
            >
              <option value="video">Geniş (16:9)</option>
              <option value="square">Kare (1:1)</option>
            </select>
          </label>
        </div>

        <label className="block">
          <span className={LABEL}>Instagram Bağlantısı — opsiyonel</span>
          <input
            value={instagramUrl}
            onChange={(e) => setInstagramUrl(e.target.value)}
            placeholder="https://www.instagram.com/p/..."
            className={INPUT}
          />
        </label>
      </div>

      <div className="flex items-center gap-2 pt-2">
        <button
          type="submit"
          disabled={busy || !trTitle.trim()}
          className="inline-flex items-center gap-2 rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {busy ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Kaydediliyor…
            </>
          ) : mode === 'create' ? (
            'Yayımla'
          ) : (
            'Kaydet'
          )}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold text-neutral-600 hover:bg-neutral-100 transition-colors"
        >
          <XIcon className="h-4 w-4" />
          İptal
        </button>
      </div>
    </form>
  );
}
