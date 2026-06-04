'use client';

import React, { useState, useTransition, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { upload } from '@vercel/blob/client';
import {
  FileText,
  ImageIcon,
  Upload,
  Trash2,
  Loader2,
  Check,
  AlertCircle,
  ExternalLink,
  Pencil,
  X as XIcon,
} from 'lucide-react';
import type { ReportEntry, ReportType } from '@/lib/reports/types';

interface AdminDashboardProps {
  initialReports: ReportEntry[];
}

type Status =
  | { kind: 'idle' }
  | { kind: 'uploading'; progress?: number }
  | { kind: 'ok'; message: string }
  | { kind: 'error'; message: string };

const ALLOWED_TYPES: Record<string, ReportType> = {
  'application/pdf': 'pdf',
  'image/jpeg': 'image',
  'image/png': 'image',
  'image/webp': 'image',
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('tr-TR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export default function AdminDashboard({ initialReports }: AdminDashboardProps) {
  const router = useRouter();
  const [reports, setReports] = useState(initialReports);
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [titleTr, setTitleTr] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !titleTr.trim()) return;

    const type = ALLOWED_TYPES[file.type];
    if (!type) {
      setStatus({ kind: 'error', message: 'Sadece PDF, JPG, PNG veya WEBP.' });
      return;
    }

    setStatus({ kind: 'uploading' });

    try {
      const newBlob = await upload(`reports/${file.name}`, file, {
        access: 'public',
        handleUploadUrl: '/api/admin/upload',
        contentType: file.type,
      });

      const res = await fetch('/api/admin/reports/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titleTr: titleTr.trim(),
          titleEn: titleEn.trim() || undefined,
          type,
          fileUrl: newBlob.url,
          fileName: file.name,
          sizeBytes: file.size,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error ?? 'Kayıt edilemedi.');
      }

      setReports(data.manifest.reports);
      setTitleTr('');
      setTitleEn('');
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setStatus({ kind: 'ok', message: 'Rapor eklendi.' });
      startTransition(() => router.refresh());
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Yükleme başarısız.';
      setStatus({ kind: 'error', message });
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Bu rapor kalıcı olarak silinecek. Emin misin?')) return;
    try {
      const res = await fetch(`/api/admin/reports/${id}`, { method: 'DELETE' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus({ kind: 'error', message: data.error ?? 'Silinemedi.' });
        return;
      }
      setReports(data.reports);
      setStatus({ kind: 'ok', message: 'Rapor silindi.' });
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
              Yeni Rapor Ekle
            </h2>
            <p className="text-sm text-neutral-500 mt-0.5">
              PDF, JPG, PNG veya WEBP. Maksimum dosya boyutu Vercel Blob limitleri ile sınırlı.
            </p>
          </div>
          <form onSubmit={handleUpload} className="px-6 py-6 space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <label className="block">
                <span className="block text-xs uppercase tracking-[0.18em] font-semibold text-neutral-500 mb-1.5">
                  Başlık (Türkçe) *
                </span>
                <input
                  type="text"
                  value={titleTr}
                  onChange={(e) => setTitleTr(e.target.value)}
                  required
                  placeholder="2026 Yıllık Faaliyet Raporu"
                  className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-shadow"
                />
              </label>
              <label className="block">
                <span className="block text-xs uppercase tracking-[0.18em] font-semibold text-neutral-500 mb-1.5">
                  Title (English) — opsiyonel
                </span>
                <input
                  type="text"
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  placeholder="2026 Annual Activity Report"
                  className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-shadow"
                />
              </label>
            </div>

            <label className="block">
              <span className="block text-xs uppercase tracking-[0.18em] font-semibold text-neutral-500 mb-1.5">
                Dosya *
              </span>
              <div className="relative rounded-lg border-2 border-dashed border-neutral-300 hover:border-primary-400 transition-colors bg-neutral-50/60">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf,image/jpeg,image/png,image/webp"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                  required
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="flex items-center gap-3 px-4 py-4">
                  <Upload className="h-5 w-5 text-primary-600" />
                  <div className="flex-1 min-w-0">
                    {file ? (
                      <span className="text-sm text-primary-900 font-medium truncate block">
                        {file.name}
                      </span>
                    ) : (
                      <span className="text-sm text-neutral-500">
                        Bilgisayardan seç…
                      </span>
                    )}
                    {file && (
                      <span className="text-xs text-neutral-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB · {file.type}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </label>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={status.kind === 'uploading' || !file || !titleTr.trim()}
                className="inline-flex items-center gap-2 rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {status.kind === 'uploading' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Yükleniyor…
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    Yükle ve Yayımla
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
              Mevcut Raporlar
            </h2>
            <span className="text-xs text-neutral-500 tabular-nums">
              {reports.length} kayıt
            </span>
          </div>

          {reports.length === 0 ? (
            <div className="px-6 py-16 text-center text-neutral-500">
              Henüz rapor yok. Yukarıdan yeni rapor ekleyebilirsin.
            </div>
          ) : (
            <ul className="divide-y divide-neutral-100">
              {reports.map((r) => (
                <ReportRow
                  key={r.id}
                  report={r}
                  isEditing={editingId === r.id}
                  onEditStart={() => setEditingId(r.id)}
                  onEditCancel={() => setEditingId(null)}
                  onSaved={(updatedManifest) => {
                    setReports(updatedManifest.reports);
                    setEditingId(null);
                    setStatus({ kind: 'ok', message: 'Güncellendi.' });
                    startTransition(() => router.refresh());
                  }}
                  onError={(msg) => setStatus({ kind: 'error', message: msg })}
                  onDelete={() => handleDelete(r.id)}
                />
              ))}
            </ul>
          )}
        </section>
    </div>
  );
}

interface RowProps {
  report: ReportEntry;
  isEditing: boolean;
  onEditStart: () => void;
  onEditCancel: () => void;
  onSaved: (manifest: { reports: ReportEntry[] }) => void;
  onError: (msg: string) => void;
  onDelete: () => void;
}

function ReportRow({
  report,
  isEditing,
  onEditStart,
  onEditCancel,
  onSaved,
  onError,
  onDelete,
}: RowProps) {
  const [titleTr, setTitleTr] = useState(report.titleTr);
  const [titleEn, setTitleEn] = useState(report.titleEn ?? '');
  const [saving, setSaving] = useState(false);
  const Icon = report.type === 'pdf' ? FileText : ImageIcon;

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/reports/${report.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titleTr: titleTr.trim(),
          titleEn: titleEn.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        onError(data.error ?? 'Güncellenemedi.');
        return;
      }
      onSaved(data);
    } catch {
      onError('Bir hata oluştu.');
    } finally {
      setSaving(false);
    }
  }

  if (isEditing) {
    return (
      <li className="px-6 py-5 bg-primary-50/40">
        <div className="grid md:grid-cols-2 gap-3 mb-3">
          <input
            value={titleTr}
            onChange={(e) => setTitleTr(e.target.value)}
            placeholder="Başlık (TR)"
            className="rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-primary-500"
          />
          <input
            value={titleEn}
            onChange={(e) => setTitleEn(e.target.value)}
            placeholder="Title (EN) — opsiyonel"
            className="rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-primary-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            disabled={saving || !titleTr.trim()}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary-800 disabled:opacity-50"
          >
            {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            Kaydet
          </button>
          <button
            onClick={onEditCancel}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-neutral-600 hover:bg-neutral-100"
          >
            <XIcon className="h-3.5 w-3.5" />
            İptal
          </button>
        </div>
      </li>
    );
  }

  return (
    <li className="px-6 py-4 flex items-center gap-4 hover:bg-neutral-50 transition-colors">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary-700 shrink-0">
        <Icon className="h-4 w-4" />
      </span>
      <div className="flex-1 min-w-0">
        <span className="block font-medium text-primary-900 truncate">
          {report.titleTr}
        </span>
        {report.titleEn && (
          <span className="block text-xs text-neutral-500 truncate">
            EN: {report.titleEn}
          </span>
        )}
        <span className="text-xs text-neutral-400 mt-0.5 inline-block">
          {formatDate(report.uploadedAt)} · /raporlar/{report.slug}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <a
          href={report.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Dosyayı aç"
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 hover:text-primary-700 hover:bg-primary-50"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
        <button
          onClick={onEditStart}
          title="Başlığı düzenle"
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 hover:text-primary-700 hover:bg-primary-50"
        >
          <Pencil className="h-4 w-4" />
        </button>
        <button
          onClick={onDelete}
          title="Sil"
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 hover:text-rose-600 hover:bg-rose-50"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </li>
  );
}
