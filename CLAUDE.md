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
| Framework | Next.js 16 (App Router) |
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
  ai-setup/           # AI Setup Engine landing and delivery dashboard
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
| `/ai-setup` | AI Setup Engine landing/tool page |
| `/ai-setup/delivery` | AI Setup delivery dashboard with background generation polling |
| `/api/ai-setup` | Legacy/direct AI setup API route |
| `/api/ai-setup/start` | Starts async AI setup background job |
| `/api/ai-setup/status` | Polls async AI setup job status/result |

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
- `OPENROUTER_API_KEY`
- `OPENROUTER_MODEL`
- `OPENROUTER_RUNTIME_MODEL`
- `OPENROUTER_FALLBACK_MODEL`
- `AI_SETUP_JOB_SECRET`
- Any Google Analytics / tracking IDs

---

## Design Rules

- **Default site style remains light mode** for existing pages unless Christopher explicitly asks for a redesign
- **Intentional exception**: `/ai-setup` and `/ai-setup/delivery` now use a dark, technical, BridgeMind-inspired product aesthetic with Total Authority orange as the accent colour
- **Preserve existing design** on legacy/core site pages unless the task is specifically a redesign
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

### 2026-04-24
Focus: AI Setup Engine production architecture, output quality, delivery dashboard design, and browser stability.

**AI Setup Engine architecture**
- Added/solidified async generation flow for `/ai-setup/delivery`: frontend creates a session, starts `/api/ai-setup/start`, polls `/api/ai-setup/status`, and renders the completed delivery pack.
- Added Netlify background worker path for long-running generation so OpenRouter calls are not constrained by synchronous request limits.
- Server-side job storage is the source of truth for generated packs. Browser session storage is now intentionally lightweight.
- Hardened browser storage after a completion-time reload/crash report: `writeDeliverySessionResult` no longer persists full generated output into `sessionStorage`, and storage quota/security failures are caught safely.

**AI Setup Engine generation quality**
- Strengthened site extraction and generation grounding with richer source profiles, evidence/confidence logic, prompt-injection filtering, robots parsing/merge guidance, quality rubric checks, stricter OpenRouter output validation, backup-model handling, and deterministic repair paths for partial model drafts.
- Current product rule: the tool should use OpenRouter for real generation; fallback mode is treated as an environment/runtime problem, not the desired user-facing path.
- Added tests covering partial model drafts, quality repair, robots merge, prompt-injection filtering, publishable AI info page tone, and delivery session storage behavior.

**AI Setup Engine UI**
- Rebuilt `/ai-setup` as a dark, technical product page heavily influenced by BridgeMind visual direction while preserving the shared Total Authority header/footer and orange brand accent.
- Rebuilt `/ai-setup/delivery` as a dark SaaS-style dashboard with compact typography, collapsible metric detail panels, output tabs, standalone `llms.txt` and `agents.md` tabs, download/copy actions, and a more polished implementation guide console.
- Implementation guide now includes a vibe-coded sites prompt/playbook alongside WordPress, Webflow, Shopify, and custom HTML/developer handoff.
- Bottom CTA now uses one orange button linking to `https://go.totalauthority.com/widget/bookings/free-strategy-call-ta`.

**Verification**
- `npm run test:ai-setup` currently passes 19 tests.
- `npx next build` passed after the latest storage hardening.

**Recent commits pushed to `main`**
- `97b403a` — async AI setup job pipeline with polling and richer LLM output
- `783a494` — generation quality hardening
- `77cb9f0` — delivery dashboard redesign
- `96c3f36` — accept partial AI setup model drafts
- `042a111` — delivery discovery tabs
- `7264adc` — dashboard interactions and CTA cleanup
- `764d976` — BridgeMind-inspired dark AI setup redesign
- `a3316d7` — delivery session storage hardening

**Next steps**
- Confirm latest Netlify deploy is green.
- Run live generation against several real domains and inspect whether OpenRouter logs show current calls.
- Continue tightening output tone if generated pages still sound too cautious or analyst-like.

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

### 2026-04-17
Focus: canonical-URL bug (Stephen's feedback), client-side exception on page transitions, and blog-post Table of Contents sidebar fixes.

**Canonical URLs**
- `lib/siteConfig.ts` centralises `siteUrl` (defaults to `https://totalauthority.com`, overridable via `NEXT_PUBLIC_SITE_URL`). All `generateMetadata` / canonical references now go through this, so blog posts canonicalise to `.com`, not `.co`.
- Home page (`app/page.tsx`) now emits a self-referencing canonical via `metadata.alternates.canonical = '/'`.
- Blog post canonical fallback (`app/[slug]/page.tsx`) builds from `siteUrl + post.slug` when the editor leaves the Canonical URL field blank.
- Blog editor Canonical URL field placeholder/helper text updated to `/post-slug` + "leave blank to auto-generate" — stops editors from typing the old `/blog/post-slug` pattern.

**Error boundaries — "Application error: a client-side exception has occurred"**
- Added `app/error.tsx` to catch per-route errors below the layout (branded reload UI, auto-reloads on ChunkLoadError).
- Added `app/global-error.tsx` to catch errors in the root layout / providers themselves (this is what Stephen was hitting; the plain-text default fallback renders only when the root layout can't render). Uses inline styles because Tailwind may not be loaded at that boundary.
- Most common trigger: `ChunkLoadError` after a Netlify deploy invalidates client chunks in already-open tabs. Both boundaries now auto-recover via `window.location.reload()`.

**Blog post Table of Contents sidebar (`/[slug]` pages)**
All existing and future posts inherit these fixes — TOC entries come from live DOM extraction, not a per-post field.
- `components/blog/BlogPostClient.tsx`: heading extraction scoped to `.blog-prose` (inner article body) so the post title `<h1>` is excluded. Uses a `MutationObserver` (disconnects after 2s) instead of the old triple-`setTimeout`, so IDs are assigned even when async scripts mutate the article DOM.
- **Only H2s appear in the TOC** (per owner's preference) — `scope.querySelectorAll('h2')`. H3/H4 still render in the article body and remain anchorable via URL fragment.
- Sidebar column is now `<aside class="... self-start sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">` — sticky lives on the column itself rather than relying on flex-stretch + inner sticky.
- `components/blog/BlogPostSidebar.tsx`: rewritten as a compact bordered box (dropped Shadcn Card), `text-xs` entries, 2px orange left-border active indicator, small "Back to top" pill. Active tracking is a plain scroll/resize listener comparing `getBoundingClientRect().top` against a 110px offset (header clearance).
- `components/blog/BlogPostContent.tsx`: added `scroll-margin-top: 6rem !important` to the `.blog-prose h1–h4` rules so anchor navigation and `scrollIntoView()` always land the heading just below the sticky site Header.

**Infrastructure / workflow**
- GitHub PAT is stored in `.git/config` (remote URL), NOT in `.env.local` — `.env.local` is currently TRACKED by git (not in `.gitignore`) and contains the Supabase anon key, so writing the PAT there would push it to a public repo. **Action items for Christopher**: (1) regenerate the PAT shared in chat, (2) add `.env*` to `.gitignore` and run `git rm --cached .env.local`.

**Commits pushed to `main` this session**
- `0e2ffae` — canonical-URL centralisation + blog editor field cleanup
- `3acb2d3` — `app/global-error.tsx` last-resort boundary
- `6bdafa3` — initial blog TOC fix (IntersectionObserver + `scroll-margin-top`)
- `bdcb461` — TOC follow-up: sticky on column, exclude article title, tighter compact design
- `a331dbc` — TOC scoped to H2s only
