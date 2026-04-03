# CLAUDE.md — Total Authority Project Context

> This file exists so Claude can get up to speed instantly at the start of each session.
> **Update this file at the end of every session** with any changes, decisions made, or new context.

---

## Project Overview

**Total Authority** is a PR/Marketing Visibility Tool — a SaaS web app that helps businesses audit and improve their visibility in LLM-based search (e.g. ChatGPT, Perplexity). It includes public landing/marketing pages, audit tools, a user dashboard, and an admin panel.

**Live site**: Deployed via Netlify (connected to this GitHub repo — pushes to `main` auto-deploy)

---

## Owner

- **Name**: Christopher
- **Email**: chrispanteli@gmail.com
- **GitHub org**: LinkifiPR

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS (custom palette: beige, orange, blue) |
| UI Components | Shadcn UI + Radix UI |
| Forms | React Hook Form + Zod |
| Data Fetching | TanStack Query (React Query v5) |
| Database/Auth | Supabase (PostgreSQL, Auth, Edge Functions) |
| ORM | Drizzle |
| Deployment | Netlify (`npx next build`, publishes `.next`) |
| Analytics | Google Analytics |

---

## Repository

- **GitHub**: https://github.com/LinkifiPR/TotalAuthority-NEXTJS.git
- **Branch**: `main` (auto-deploys to Netlify on push)
- **How to clone**: `git clone https://github.com/LinkifiPR/TotalAuthority-NEXTJS.git`

---

## Project History

- Originally built in **Lovable** as a React + Vite app
- **Migrated to Next.js 14** (App Router) — this repo is the migrated version
- Was hosted and edited in **Replit** — Christopher is moving off Replit entirely
- New editing workflow: **Claude (Cowork)** → edit files → push to GitHub → Netlify deploys

---

## Folder Structure

```
app/                  # Next.js App Router pages & routes
  layout.tsx          # Root layout
  page.tsx            # Landing page
  [slug]/             # Dynamic blog post routes
  about/
  admin/              # Admin panel (protected)
  api/                # API routes
  audit/
  auth/
  blog/
  dashboard/          # User dashboard (protected)
  ... (24 total routes)

components/           # All UI and feature components
  ui/                 # Shadcn UI base components
  admin/              # Admin-specific components
  audit/              # Audit tool components
  blog/               # Blog components
  dashboard/          # Dashboard components
  sections/           # Landing page sections
  Header.tsx, Footer.tsx, Hero.tsx, FAQ.tsx, etc.

lib/                  # Utilities, Supabase client, helpers
hooks/                # Custom React hooks (incl. AuthProvider)
server/               # Server-side code
types/                # TypeScript type definitions
config/               # App configuration
public/               # Static assets
```

---

## Key Pages & Routes

| Route | Purpose |
|---|---|
| `/` | Landing page (marketing) |
| `/auth` | Login / signup |
| `/dashboard` | User dashboard (protected) |
| `/admin` | Admin overview (protected) |
| `/admin/users` | User management |
| `/admin/audits` | Audit management |
| `/admin/posts` | Blog post CRUD |
| `/blog` or `/insights` | Blog list |
| `/[slug]` | Individual blog posts |
| `/llm-visibility-gap-calculator` | Free audit tool |
| `/llm-visibility-audit` | Audit tool |
| `/strategy-blueprint` | Full audit form |
| `/audit/:slug` | Audit report viewer |

---

## Supabase Configuration

- **Project URL**: https://pgbcixncaeyjunwxrsik.supabase.co
- **Anon Key**: stored in `.env.local` (not committed)
- **Features used**: Auth, PostgreSQL tables (users, audits, blog posts), Edge Functions (PDF generation, email drafts, analytics), Row Level Security

---

## Environment Variables

Stored in `.env.local` (not in repo). Key vars:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Any Google Analytics / tracking IDs

---

## Design Rules

- **Light mode only** (no dark mode)
- **Preserve existing design** — this is a migration, not a redesign
- Custom Tailwind animations: wobble, float, shimmer, fade-in
- Custom color palette: beige, orange, blue themed
- Mobile-first, responsive

---

## Workflow (How We Work Together)

1. Clone repo: `git clone https://github.com/LinkifiPR/TotalAuthority-NEXTJS.git`
2. Make edits in Cowork
3. Commit and push to GitHub (requires GitHub PAT — ask Christopher to provide if not set)
4. Netlify auto-deploys on push to `main`

**To push changes**, configure git credentials:
```bash
git config user.email "chrispanteli@gmail.com"
git config user.name "Christopher"
# Use GitHub PAT as password when pushing
```

---

## Files to Note

- `CLAUDE.md` — this file, update each session
- `replit.md` — legacy Replit context (can be removed eventually)
- `sync-to-github.sh` — legacy Replit sync script (can be removed eventually)
- `netlify.toml` — Netlify build config
- `design_guidelines.md` — migration design principles

---

## Session Log

### 2026-04-03
- Christopher connected this project to Cowork for the first time
- Repo cloned from GitHub
- Decided to move off Replit entirely — Cowork will be the new editing environment
- GitHub → Netlify pipeline stays the same
- Created this CLAUDE.md file
- GitHub push workflow confirmed working — Christopher provides a GitHub PAT at the start of each session to enable pushing. PAT should be stored securely (e.g. 1Password) and regenerated after sharing in chat
- To configure push: `git remote set-url origin https://chrispanteli:<PAT>@github.com/LinkifiPR/TotalAuthority-NEXTJS.git`
- **Change made**: Updated site title in `app/layout.tsx` from "Total Authority - PR & Marketing Visibility Tool" to "Total Authority - AI Visibility". Also updated meta description to match.
- **Next steps**: Clean up legacy Replit files (`replit.md`, `sync-to-github.sh`); continue iterating on the site
