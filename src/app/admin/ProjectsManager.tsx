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
  Pencil,
  X as XIcon,
  ArrowLeft,
  Upload,
} from 'lucide-react';
import type {
  ProjectEntry,
  ProjectCategory,
  ProjectStatus,
  ProjectsManifest,
} from '@/lib/projects/types';

interface ProjectsManagerProps {
  initialProjects: ProjectEntry[];
}

type Status =
  | { kind: 'idle' }
  | { kind: 'ok'; message: string }
  | { kind: 'error'; message: string };

const CATEGORY_OPTIONS: { value: ProjectCategory; label: string }[] = [
  { value: 'policy', label: 'Politika' },
  { value: 'education', label: 'Eğitim' },
  { value: 'social', label: 'Sosyal' },
  { value: 'technology', label: 'Teknoloji' },
];

const STATUS_OPTIONS: { value: ProjectStatus; label: string }[] = [
  { value: 'active', label: 'Aktif' },
  { value: 'completed', label: 'Tamamlandı' },
  { value: 'planned', label: 'Planlanan' },
];

const CATEGORY_LABEL: Record<ProjectCategory, string> = {
  policy: 'Politika',
  education: 'Eğitim',
  social: 'Sosyal',
  technology: 'Teknoloji',
};

const STATUS_LABEL: Record<ProjectStatus, string> = {
  active: 'Aktif',
  completed: 'Tamamlandı',
  planned: 'Planlanan',
};

const STATUS_BADGE: Record<ProjectStatus, string> = {
  active: 'bg-green-100 text-green-700',
  completed: 'bg-blue-100 text-blue-700',
  planned: 'bg-yellow-100 text-yellow-700',
};

function thisMonth(): string {
  return new Date().toISOString().slice(0, 7);
}

function formatMonth(value: string): string {
  const d = new Date(`${value}-01T00:00:00`);
  return d.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' });
}

export default function ProjectsManager({
  initialProjects,
}: ProjectsManagerProps) {
  const router = useRouter();
  const [projects, setProjects] = useState(initialProjects);
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [, startTransition] = useTransition();

  function applyManifest(manifest: ProjectsManifest) {
    setProjects(manifest.projects);
    startTransition(() => router.refresh());
  }

  async function handleDelete(id: string) {
    if (!confirm('Bu proje kalıcı olarak silinecek. Emin misin?')) return;
    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus({ kind: 'error', message: data.error ?? 'Silinemedi.' });
        return;
      }
      applyManifest(data);
      setStatus({ kind: 'ok', message: 'Proje silindi.' });
    } catch {
      setStatus({ kind: 'error', message: 'Silme başarısız.' });
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-lg font-semibold text-primary-900">
            Projeler
          </h2>
          <p className="text-sm text-neutral-500 mt-0.5">
            Proje ekle, düzenle veya sil. Türkçe zorunlu, İngilizce opsiyonel.
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
            Yeni Proje
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
          <ProjectForm
            mode="create"
            onDone={(manifest) => {
              applyManifest(manifest);
              setCreating(false);
              setStatus({ kind: 'ok', message: 'Proje eklendi.' });
            }}
            onCancel={() => setCreating(false)}
            onError={(message) => setStatus({ kind: 'error', message })}
          />
        </section>
      )}

      <section className="rounded-2xl bg-white ring-1 ring-neutral-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
          <h3 className="font-heading text-base font-semibold text-primary-900">
            Mevcut Projeler
          </h3>
          <span className="text-xs text-neutral-500 tabular-nums">
            {projects.length} proje
          </span>
        </div>

        {projects.length === 0 ? (
          <div className="px-6 py-16 text-center text-neutral-500">
            Henüz proje yok. Yukarıdan yeni proje ekleyebilirsin.
          </div>
        ) : (
          <ul className="divide-y divide-neutral-100">
            {projects.map((project) => (
              <li key={project.id}>
                {editingId === project.id ? (
                  <div className="bg-primary-50/40">
                    <ProjectForm
                      mode="edit"
                      initial={project}
                      onDone={(manifest) => {
                        applyManifest(manifest);
                        setEditingId(null);
                        setStatus({ kind: 'ok', message: 'Proje güncellendi.' });
                      }}
                      onCancel={() => setEditingId(null)}
                      onError={(message) =>
                        setStatus({ kind: 'error', message })
                      }
                    />
                  </div>
                ) : (
                  <div className="px-6 py-4 flex items-center gap-4 hover:bg-neutral-50 transition-colors">
                    {project.coverImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={project.coverImage}
                        alt=""
                        className="h-12 w-16 rounded-md object-cover bg-neutral-100 shrink-0"
                      />
                    ) : (
                      <span className="h-12 w-16 rounded-md bg-gradient-to-br from-primary-100 to-primary-200 shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <span className="block font-medium text-primary-900 truncate">
                        {project.tr.title}
                      </span>
                      <span className="text-xs text-neutral-400 mt-0.5 inline-flex items-center gap-2">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${STATUS_BADGE[project.status]}`}
                        >
                          {STATUS_LABEL[project.status]}
                        </span>
                        {CATEGORY_LABEL[project.category]} · {formatMonth(project.date)}
                        {project.en ? ' · EN ✓' : ' · EN —'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => {
                          setEditingId(project.id);
                          setCreating(false);
                        }}
                        title="Düzenle"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 hover:text-primary-700 hover:bg-primary-50"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
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

interface ProjectFormProps {
  mode: 'create' | 'edit';
  initial?: ProjectEntry;
  onDone: (manifest: ProjectsManifest) => void;
  onCancel: () => void;
  onError: (message: string) => void;
}

const LABEL =
  'block text-xs uppercase tracking-[0.18em] font-semibold text-neutral-500 mb-1.5';
const INPUT =
  'w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-shadow';

function ProjectForm({
  mode,
  initial,
  onDone,
  onCancel,
  onError,
}: ProjectFormProps) {
  const [category, setCategory] = useState<ProjectCategory>(
    initial?.category ?? 'policy',
  );
  const [projectStatus, setProjectStatus] = useState<ProjectStatus>(
    initial?.status ?? 'active',
  );
  const [date, setDate] = useState(initial?.date ?? thisMonth());
  const [coverImage, setCoverImage] = useState(initial?.coverImage ?? '');
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const [trTitle, setTrTitle] = useState(initial?.tr.title ?? '');
  const [trDescription, setTrDescription] = useState(
    initial?.tr.description ?? '',
  );
  const [enTitle, setEnTitle] = useState(initial?.en?.title ?? '');
  const [enDescription, setEnDescription] = useState(
    initial?.en?.description ?? '',
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
        const blob = await upload(`projects/${coverFile.name}`, coverFile, {
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
        category,
        status: projectStatus,
        date,
        coverImage: finalCover,
        tr: { title: trTitle.trim(), description: trDescription.trim() },
        en: enFilled
          ? { title: enTitle.trim(), description: enDescription.trim() }
          : null,
      };

      const url =
        mode === 'create'
          ? '/api/admin/projects/register'
          : `/api/admin/projects/${initial!.id}`;
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
      const manifest: ProjectsManifest =
        mode === 'create' ? data.manifest : data;
      onDone(manifest);
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Bir hata oluştu.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <div className="px-6 py-4 border-b border-neutral-200 flex items-center gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-semibold text-neutral-600 hover:bg-neutral-100 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Geri
        </button>
        <h3 className="font-heading text-base font-semibold text-primary-900">
          {mode === 'create' ? 'Yeni Proje Ekle' : `Düzenle: ${initial?.tr.title}`}
        </h3>
      </div>

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
              placeholder="Proje adı"
              className={INPUT}
            />
          </label>
          <label className="block">
            <span className={LABEL}>Açıklama</span>
            <textarea
              value={trDescription}
              onChange={(e) => setTrDescription(e.target.value)}
              rows={3}
              placeholder="Projenin kısa açıklaması"
              className={INPUT}
            />
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
              placeholder="Project name"
              className={INPUT}
            />
          </label>
          <label className="block">
            <span className={LABEL}>Description</span>
            <textarea
              value={enDescription}
              onChange={(e) => setEnDescription(e.target.value)}
              rows={3}
              placeholder="Short description"
              className={INPUT}
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

          <div className="grid sm:grid-cols-3 gap-4">
            <label className="block">
              <span className={LABEL}>Kategori</span>
              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value as ProjectCategory)
                }
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
              <span className={LABEL}>Durum</span>
              <select
                value={projectStatus}
                onChange={(e) =>
                  setProjectStatus(e.target.value as ProjectStatus)
                }
                className={INPUT}
              >
                {STATUS_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className={LABEL}>Tarih (Ay)</span>
              <input
                type="month"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={INPUT}
              />
            </label>
          </div>
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
    </div>
  );
}
