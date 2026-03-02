<p align="center">
  <img src="frontend/public/images/logo-color.png" alt="GEGET Logo" width="180" />
</p>

<h1 align="center">GEGET — Genclik Gelecek ve Toplum Dernegi</h1>

<p align="center">
  <strong>Official website for GEGET, a Turkish youth association empowering young people for a sustainable future.</strong>
</p>

<p align="center">
  <a href="https://geget.org">geget.org</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="https://www.instagram.com/genclikgelecekvetoplumdernegi">Instagram</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="https://x.com/halil_ecer">X (Twitter)</a>
</p>

---

## Architecture

```
                    +-----------------------+
                    |       Internet         |
                    +-----------+-----------+
                                |
                         :80 / :443
                    +-----------+-----------+
                    |        Nginx          |
                    |   reverse proxy       |
                    |   SSL termination     |
                    |   rate limiting       |
                    |   security headers    |
                    +-----+----------+------+
                          |          |
                   /      |          |  /api/*
            +------+------+   +-----+--------+
            |   Frontend   |  |    Backend    |
            |  Next.js 14  |  |   Go 1.22    |
            |  App Router  |  |   Chi v5     |
            |    :3000     |  |    :8080     |
            +--------------+  +------+-------+
                                     |
                              +------+-------+
                              |  PostgreSQL  |
                              |  16-alpine   |
                              |    :5432     |
                              +--------------+
```

**Monorepo** with two services orchestrated by Docker Compose:

- **Frontend** — Next.js 14 (App Router), TypeScript, Tailwind CSS 3.4, next-intl, Framer Motion
- **Backend** — Go 1.22, Chi router, pgx (PostgreSQL driver), golang-migrate
- **Database** — PostgreSQL 16 with 7 migration files
- **Proxy** — Nginx with SSL, gzip, security headers, and rate limiting

---

## Tech Stack

| Layer | Technology | Details |
|-------|-----------|---------|
| Frontend | Next.js 14 | App Router, SSG, TypeScript strict mode |
| Styling | Tailwind CSS 3.4 | Custom design system with CSS variables |
| Animation | Framer Motion 11 | Scroll reveals, staggered animations, page transitions |
| i18n | next-intl 3.x | Turkish (default) + English, locale-prefixed routes |
| Forms | react-hook-form + Zod | Client-side validation with server submission |
| Backend | Go 1.22 + Chi v5 | RESTful API with structured JSON responses |
| Database | PostgreSQL 16 | pgx driver, golang-migrate for schema management |
| Email | go-mail | SMTP-based contact form notifications |
| Proxy | Nginx | Reverse proxy, SSL termination, static caching |
| Container | Docker + Compose | Multi-stage builds, health checks, named volumes |

---

## Prerequisites

- **Docker** >= 24.0 and **Docker Compose** >= 2.20
- **Node.js** >= 20 LTS *(optional, for local frontend dev without Docker)*
- Go is **not** required locally — all Go compilation happens inside Docker

---

## Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/geget-org/geget.git
cd geget

# 2. Copy environment template
cp .env.example .env
# Edit .env with your secrets (DB_PASSWORD, SMTP credentials, JWT_SECRET)

# 3. Start development environment
docker compose -f docker-compose.dev.yml up -d

# 4. Wait ~60s for npm install on first run, then visit:
#    Frontend:  http://localhost:3000/tr
#    Backend:   http://localhost:8080/api/healthz
```

### Using Make

```bash
make dev          # Start dev environment
make build        # Build production images
make up           # Start production services (detached)
make down         # Stop all services
make logs         # Follow service logs
make migrate-up   # Run database migrations
make migrate-down # Roll back last migration
make test         # Run tests
make lint         # Lint frontend code
make clean        # Remove containers, volumes, images
```

---

## Development

### Full Stack (Docker)

```bash
docker compose -f docker-compose.dev.yml up -d
```

This starts:
| Service | URL | Notes |
|---------|-----|-------|
| Frontend | http://localhost:3000 | Hot-reload via volume mounts |
| Backend | http://localhost:8080 | Auto-rebuilds on container restart |
| PostgreSQL | localhost:5433 | Mapped to 5433 to avoid conflicts |

### Frontend Only (Local Node.js)

```bash
cd frontend
npm install
npm run dev         # http://localhost:3000
npm run build       # Production build
npm run lint        # ESLint check
```

### Backend Only (Docker)

```bash
docker build -t geget-backend ./backend
docker run -p 8080:8080 \
  -e DATABASE_URL="postgres://geget:password@host.docker.internal:5432/geget?sslmode=disable" \
  -e ENVIRONMENT=development \
  geget-backend
```

---

## Project Structure

```
geget/
├── backend/                        # Go API server
│   ├── cmd/server/main.go          # Entry point: config -> DB -> routes -> serve
│   ├── internal/
│   │   ├── config/                 # Environment-based configuration
│   │   ├── handler/                # HTTP handlers (10 resource handlers)
│   │   │   ├── health.go           # GET /api/healthz, /api/readyz
│   │   │   ├── contact.go          # POST/GET /api/contact (active)
│   │   │   ├── project.go          # GET /api/projects (static data)
│   │   │   ├── team.go             # GET /api/team (static data)
│   │   │   └── *.go                # 6 scaffolded handlers (501 stubs)
│   │   ├── middleware/             # Request ID, logging, recovery, rate limit, auth
│   │   ├── model/                  # Data structures (10 domain models)
│   │   ├── response/               # JSON response helpers
│   │   ├── router/                 # Chi route definitions
│   │   ├── server/                 # HTTP server with graceful shutdown
│   │   ├── service/                # Business logic (mail service)
│   │   └── store/                  # PostgreSQL data access layer
│   ├── migrations/                 # 7 up/down SQL migration pairs
│   ├── Dockerfile                  # Multi-stage: golang:1.22-alpine -> alpine:3.19
│   └── go.mod
│
├── frontend/                       # Next.js 14 application
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx          # Root layout with metadata template
│   │   │   ├── globals.css         # Tailwind directives, CSS custom properties
│   │   │   ├── robots.ts           # Programmatic robots.txt
│   │   │   ├── sitemap.ts          # Dynamic sitemap (10 URLs, 2 locales)
│   │   │   └── [locale]/           # Locale-scoped pages
│   │   │       ├── layout.tsx      # NextIntlClientProvider + Navbar + Footer
│   │   │       ├── page.tsx        # Homepage (7 sections + JSON-LD)
│   │   │       ├── hakkimizda/     # About (Story, Values, Timeline)
│   │   │       ├── projeler/       # Projects (filterable grid)
│   │   │       ├── ekibimiz/       # Team (member grid)
│   │   │       ├── iletisim/       # Contact (form + info)
│   │   │       └── not-found.tsx   # Custom 404
│   │   ├── components/
│   │   │   ├── layout/             # Navbar, MobileMenu, Footer
│   │   │   ├── home/               # Hero, Mission, FocusAreas, Stats, etc.
│   │   │   ├── about/              # Story, Values, Timeline
│   │   │   ├── projects/           # ProjectGrid, ProjectCard
│   │   │   ├── team/               # TeamGrid, TeamCard
│   │   │   ├── contact/            # ContactForm, ContactInfo
│   │   │   └── ui/                 # Button, Card, Badge, ScrollReveal, etc.
│   │   ├── hooks/                  # useScrollPosition, useInView
│   │   ├── i18n/                   # next-intl config (routing, navigation)
│   │   ├── lib/                    # API client, utils, constants, metadata
│   │   ├── messages/               # tr.json, en.json (complete translations)
│   │   └── types/                  # Shared TypeScript interfaces
│   ├── public/images/              # Logo variants, OG image
│   ├── Dockerfile                  # Multi-stage: node:22-alpine (deps -> build -> run)
│   ├── tailwind.config.ts          # Brand colors, fonts, custom animations
│   └── package.json
│
├── nginx/
│   └── nginx.conf                  # Production: SSL, security headers, rate limiting
│
├── docker-compose.yml              # Production (frontend + backend + db + nginx)
├── docker-compose.dev.yml          # Development (hot-reload, exposed ports)
├── Makefile                        # Common commands
├── .env.example                    # Environment variable template
├── .gitignore
└── .dockerignore
```

---

## API Reference

### Active Endpoints (Phase 1)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/healthz` | Liveness check |
| `GET` | `/api/readyz` | Readiness check |
| `POST` | `/api/contact` | Submit contact form (saves to DB + sends email) |
| `GET` | `/api/contact` | List contact submissions |
| `GET` | `/api/contact/{id}` | Get submission by ID |
| `PATCH` | `/api/contact/{id}/read` | Mark submission as read |
| `GET` | `/api/projects` | List all projects (static data) |
| `GET` | `/api/projects/{id}` | Get project by ID |
| `GET` | `/api/team` | List team members (static data) |
| `GET` | `/api/team/{id}` | Get team member by ID |

### Scaffolded Endpoints (Phase 2-3, returns 501)

| Resource | Endpoints |
|----------|-----------|
| Members | `POST /register`, `POST /login`, `GET /me`, `PUT /me`, `GET /` |
| Events | `GET /`, `GET /{id}`, `POST /`, `POST /{id}/register` |
| Blog | `GET /`, `GET /{slug}`, `POST /`, `PUT /{slug}`, `DELETE /{slug}`, `GET /categories`, `GET /tags` |
| Donations | `POST /`, `GET /campaigns`, `GET /campaigns/{id}` |
| Volunteers | `GET /positions`, `GET /positions/{id}`, `POST /apply`, `GET /applications` |
| Newsletter | `POST /subscribe`, `POST /unsubscribe`, `GET /subscribers` |

All scaffolded endpoints live under `/api/<resource>` and return `501 Not Implemented`.

### Response Format

```json
{
  "success": true,
  "data": { ... },
  "error": null,
  "meta": {
    "page": 1,
    "per_page": 20,
    "total": 100,
    "total_pages": 5
  }
}
```

---

## Pages & Routes

| Turkish Route | English Route | Page |
|---------------|---------------|------|
| `/tr` | `/en` | Homepage — Hero, Mission, Focus Areas, Stats, Youth Cities, CTA, Partners |
| `/tr/hakkimizda` | `/en/hakkimizda` | About — Story, Core Values, Timeline |
| `/tr/projeler` | `/en/projeler` | Projects — Filterable project grid |
| `/tr/ekibimiz` | `/en/ekibimiz` | Team — Team member cards |
| `/tr/iletisim` | `/en/iletisim` | Contact — Form + contact info |

All pages include:
- `generateMetadata()` with OpenGraph, Twitter cards, canonical URLs, and hreflang alternates
- `setRequestLocale()` for static generation compatibility
- Responsive design (mobile-first)

---

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DB_PASSWORD` | Yes | — | PostgreSQL password |
| `PORT` | No | `8080` | Backend server port |
| `ENVIRONMENT` | No | `production` | `development` or `production` |
| `DATABASE_URL` | Auto | — | Full Postgres connection string |
| `SMTP_HOST` | No | `smtp.gmail.com` | SMTP server for contact emails |
| `SMTP_PORT` | No | `587` | SMTP port |
| `SMTP_USER` | No | — | SMTP username |
| `SMTP_PASSWORD` | No | — | SMTP password |
| `SMTP_FROM` | No | `noreply@geget.org` | Sender email address |
| `JWT_SECRET` | Phase 2 | — | JWT signing key |
| `JWT_EXPIRY` | No | `24h` | Token expiration |
| `NEXT_PUBLIC_API_URL` | No | `https://geget.org` | API base URL for frontend |
| `NEXT_PUBLIC_SITE_URL` | No | `https://geget.org` | Public site URL |

See `.env.example` for a complete template.

---

## Deployment

### Production with Docker Compose

```bash
# 1. Configure environment
cp .env.example .env
# Set strong DB_PASSWORD, JWT_SECRET, SMTP credentials

# 2. Add SSL certificates
mkdir -p nginx/ssl
cp /path/to/fullchain.pem nginx/ssl/
cp /path/to/privkey.pem nginx/ssl/

# 3. Build and launch
docker compose up -d --build

# 4. Verify
curl http://localhost/api/healthz
# {"success":true,"data":{"service":"geget-backend","status":"healthy"}}
```

### Docker Image Sizes

| Image | Size |
|-------|------|
| `geget-backend` | ~32 MB |
| `geget-frontend` | ~180 MB |
| `postgres:16-alpine` | ~240 MB |

### Health Checks

The PostgreSQL container includes a built-in health check (`pg_isready`). The backend waits for the database to be healthy before starting. Migrations run automatically on startup.

---

## Design System

### Brand Colors

| Token | Value | Usage |
|-------|-------|-------|
| `primary-500` | `#2563eb` | Primary blue (buttons, links, accents) |
| `primary-600` | `#1d4ed8` | Hover states |
| `primary-700` | `#1e40af` | Active states |
| `accent-400` | `#facc15` | Accent yellow (highlights, badges) |
| `neutral-900` | `#111827` | Text |
| `neutral-500` | `#6b7280` | Secondary text |

### Typography

- **Headings**: Plus Jakarta Sans (700, 800)
- **Body**: Source Sans 3 (400, 600)

### Animation

Scroll-triggered reveals powered by Framer Motion with `whileInView`. Staggered children animations for grids and lists. Counter animations with `requestAnimationFrame` and `easeOutQuart` easing.

---

## Roadmap

### Phase 1 — Public Website (Current)
- [x] Homepage with 7 animated sections
- [x] About page (story, values, timeline)
- [x] Projects page with filterable grid
- [x] Team page with member cards
- [x] Contact page with form + DB storage + email
- [x] Turkish/English i18n
- [x] SEO (sitemap, robots.txt, OpenGraph, JSON-LD)
- [x] Docker deployment with nginx

### Phase 2 — Admin & Auth (Scaffolded)
- [ ] JWT authentication
- [ ] Member registration and login
- [ ] Admin dashboard
- [ ] Blog with categories and tags
- [ ] Event management with registrations
- [ ] Image upload

### Phase 3 — Community Features (Planned)
- [ ] Online donations with campaign support
- [ ] Volunteer position listings and applications
- [ ] Newsletter with double opt-in
- [ ] Member portal

---

## Database Schema

7 migration files creating:

1. **contact_submissions** — Contact form entries with read tracking
2. **members** — User accounts with roles and auth fields
3. **events** + **event_registrations** — Events with geo, pricing, and signups
4. **blog_categories** + **blog_posts** + **blog_tags** + **blog_post_tags** — Full blog system
5. **donation_campaigns** + **donations** — Donation tracking
6. **volunteer_positions** + **volunteer_applications** — Volunteer management
7. **newsletter_subscribers** — Newsletter with double opt-in tokens

Only `contact_submissions` is actively used in Phase 1. All other tables are created but their API endpoints return 501.

---

## License

All rights reserved. This project is the property of GEGET - Genclik Gelecek ve Toplum Dernegi.

---

<p align="center">
  Built with care for the GEGET community.
</p>
