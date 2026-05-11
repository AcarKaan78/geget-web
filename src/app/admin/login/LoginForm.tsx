'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Loader2 } from 'lucide-react';

export default function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? 'Giriş başarısız.');
        return;
      }
      router.replace('/admin');
      router.refresh();
    } catch {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900" />
      <div className="absolute inset-0 -z-10 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20 backdrop-blur">
            <Lock className="h-6 w-6 text-accent-300" />
          </div>
          <h1 className="mt-6 font-heading text-3xl font-bold text-white">
            GEGET Yönetim
          </h1>
          <p className="mt-2 text-sm text-primary-200">
            Devam etmek için yönetici parolasını girin.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white/[0.06] backdrop-blur-xl ring-1 ring-white/10 p-6 shadow-2xl"
        >
          <label className="block">
            <span className="text-xs uppercase tracking-[0.22em] text-primary-200 font-semibold">
              Parola
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              required
              className="mt-2 w-full rounded-lg bg-white/10 border border-white/15 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-accent-400 focus:bg-white/15 transition-colors"
              placeholder="••••••••"
            />
          </label>

          {error && (
            <p className="mt-4 text-sm text-rose-300 bg-rose-500/10 border border-rose-400/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent-500 px-4 py-3 text-sm font-semibold text-primary-900 transition-all hover:bg-accent-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? 'Doğrulanıyor…' : 'Giriş Yap'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-primary-300/70">
          Yalnızca yetkili kullanıcılar.
        </p>
      </div>
    </div>
  );
}
