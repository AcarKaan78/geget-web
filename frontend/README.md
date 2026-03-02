# GEGET Frontend

Next.js 14 frontend application for the GEGET (Genclik Gelecek ve Toplum Dernegi) NGO website.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Internationalization:** next-intl (Turkish / English)
- **Forms:** react-hook-form + zod
- **Animations:** Framer Motion
- **Icons:** Lucide React

## Project Structure

```
src/
  app/              # Next.js App Router pages and layouts
    globals.css     # Global styles, CSS variables, Tailwind directives
    layout.tsx      # Root layout
  components/       # Reusable UI components
    ui/             # Base UI primitives (Button, Card, Input, etc.)
    layout/         # Header, Footer, Navigation
    sections/       # Page-specific sections (Hero, FocusAreas, Stats, etc.)
  i18n/             # Internationalization configuration
    navigation.ts   # Locale-aware navigation helpers
    request.ts      # Server-side locale resolution
    routing.ts      # Locale routing definition
  lib/              # Utilities and shared logic
    api.ts          # API fetch wrapper
    constants.ts    # Navigation links, social links, site config
    utils.ts        # cn() helper, date formatting
  messages/         # Translation JSON files
    tr.json         # Turkish translations
    en.json         # English translations
  middleware.ts     # next-intl locale middleware
  types/            # TypeScript type definitions
    index.ts        # Project, TeamMember, ContactFormData, etc.
```

## Getting Started

### Prerequisites

- Node.js 22+
- npm

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

The application will start at [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm start
```

### Docker

```bash
docker build -t geget-frontend .
docker run -p 3000:3000 geget-frontend
```

## Internationalization (i18n)

The site supports two locales:

| Locale | Language | URL Prefix |
|--------|----------|------------|
| `tr`   | Turkish  | `/tr/...`  |
| `en`   | English  | `/en/...`  |

Turkish is the default locale. All routes are prefixed with the locale code.

### Adding Translations

1. Add keys to both `src/messages/tr.json` and `src/messages/en.json`.
2. Use translations in components via `useTranslations('namespace')` from `next-intl`.

### Translation Namespaces

- `common` -- Navigation, CTA buttons, footer, shared UI strings
- `home` -- Hero, mission, focus areas, stats, CTA, partners
- `about` -- Story, vision, mission, philosophy, values
- `projects` -- Categories, statuses, detail labels
- `team` -- Roles, section titles
- `contact` -- Form fields, validation messages, info section
- `metadata` -- Page titles and descriptions for SEO

## Component Library

### Planned Components

- **Layout:** Header, Footer, MobileNav, LanguageSwitcher
- **UI:** Button, Card, Input, Textarea, Badge, Container, Section
- **Sections:** Hero, FocusAreas, Stats, MissionQuote, YouthCities, CTA, Partners
- **Pages:** Home, About, Projects, Team, Contact

## Environment Variables

| Variable              | Description           | Default                  |
|-----------------------|-----------------------|--------------------------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL  | `http://localhost:8080`  |

## Brand Colors

| Token         | Value     |
|---------------|-----------|
| Primary 50    | `#EBF2FC` |
| Primary 500   | `#3278E0` |
| Primary 900   | `#0A1835` |
| Accent 400    | `#38BDF8` |
| Accent 500    | `#0EA5E9` |
| Accent 600    | `#0284C7` |

## Fonts

- **Headings:** Plus Jakarta Sans (400-800, italic)
- **Body:** Source Sans 3 (400-800, italic)

Both fonts include full Turkish character support.

## License

All rights reserved. GEGET -- Genclik Gelecek ve Toplum Dernegi.
