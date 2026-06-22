# Blog Admin CRUD — Design

Date: 2026-06-22

## Goal
Let admins create, edit, and delete blog posts (bilingual TR/EN, full content) from
the existing `/admin` panel without a redeploy — matching how Reports and Instagram
already work.

## Current state
- Post metadata is hardcoded in `src/lib/blog.ts` (static array).
- Post text (title/excerpt/content) lives in `src/messages/{tr,en}.json` under
  `blog.posts.<slug>.*`.
- Public blog pages are static-generated and read content via `next-intl` `t()`.
- Reports & Instagram, by contrast, are dynamic: data in a Vercel Blob `manifest.json`,
  fetched at runtime, edited live from `/admin`.

## Approach
Move blog posts to the same Blob-manifest model. The 4 existing posts are seeded from
the current static sources, so the blog never goes blank and they are immediately
editable/deletable.

## 1. Storage layer — `src/lib/blog/`
- `types.ts` — `BlogPostEntry`:
  - `id, slug, date, readingMinutes, categoryKey ('policy'|'city'|'community'),
     coverImage, coverAspect ('video'|'square'), instagramUrl?`
  - `tr: { title, excerpt, content: string[] }`
  - `en?: { title, excerpt, content: string[] }` — optional; English site falls back to `tr`
  - `createdAt, updatedAt`
  - `BlogManifest = { version: 1; posts: BlogPostEntry[] }`
- `storage.ts` — `readManifest / addPost / updatePost / deletePost` against
  `blog/manifest.json` in Vercel Blob. Copied from `lib/reports/storage.ts`.
- `seed.ts` — builds the 4 current posts from `lib/blog.ts` + imported message JSON.
  `readManifest()` returns this seed when no persisted manifest exists, guaranteeing
  zero downtime. The first admin write persists the manifest.
- Reuse `lib/reports/slug.ts` (`slugify`, `uniqueSlug`).

## 2. Public pages (runtime render, like `/raporlar`)
- `src/app/[locale]/blog/[slug]/page.tsx` → `export const dynamic = 'force-dynamic'`,
  remove `generateStaticParams`. Resolve localized fields from `post.en ?? post.tr`.
- `src/app/[locale]/blog/page.tsx` → load posts server-side, pass resolved localized
  post view-models to `BlogGrid` → `BlogCard` as props. Static UI strings
  (`readMore`, category labels, etc.) stay in `messages`.
- `src/app/sitemap.ts` → read posts from the manifest (now async).

## 3. Admin panel
- New "Blog" tab in `src/app/admin/AdminShell.tsx`.
- New `src/app/admin/BlogManager.tsx` (mirrors `AdminDashboard.tsx`): create form +
  list with inline edit and delete.
  - Fields: TR title/excerpt/body (required), EN title/excerpt/body (optional),
    cover image upload, category dropdown, date, reading minutes, cover aspect,
    Instagram URL.
  - Body editor: textarea; blank-line-separated blocks become `content[]` paragraphs.
  - Cover upload reuses `/api/admin/upload` with a `blog/` path prefix.
- API routes under `src/app/api/admin/blog/`:
  - `register/route.ts` (POST) — create.
  - `[id]/route.ts` (PATCH update, DELETE). DELETE also removes the cover Blob if the
    URL is a Blob URL.
  - Auth-guarded via `isAdmin()`.
- `src/app/admin/page.tsx` loads the blog manifest and passes it to `AdminShell`.

## Untouched
Auth/session/login/logout, Reports, Instagram, all other pages. `lib/blog.ts` and the
`messages` blog content remain as the seed source.

## Trade-off
Blog detail pages move from static to dynamic rendering (same as Reports already are).
This is what enables live editing.
