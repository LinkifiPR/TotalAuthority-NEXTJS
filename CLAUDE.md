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
| `/med-spas`, `/law-firms`, `/accountancy-firms`, … (24 total) | Industry landing pages — all rendered from the shared `IndustryLandingPage` template (see Industries System below) |
| `/ai-setup` | AI Setup Engine landing/tool page |
| `/ai-setup/delivery` | AI Setup delivery dashboard with background generation polling |
| `/api/ai-setup` | Legacy/direct AI setup API route |
| `/api/ai-setup/start` | Starts async AI setup background job |
| `/api/ai-setup/status` | Polls async AI setup job status/result |

---

## Industries System (data-driven landing pages)

All 24 industry landing pages render from **one shared template** so structure is identical and only the copy changes. To add or edit an industry:

- **Registry**: `lib/industries.ts` — slug, display name, status (`live`/`coming-soon`), related slugs, short description. The Header dropdown and Footer column are data-driven off this file. All 24 are currently `live`.
- **Template**: `components/industry/IndustryLandingPage.tsx` — the generic page (all ~21 sections, scroll progress bar, dynamic icon map). Takes `content: IndustryContent`. **Do not hardcode industry copy here.**
- **Contract**: `lib/industry/types.ts` — the `IndustryContent` interface with **fixed array lengths** (6 prompts, 12 prompt categories, 9 pillars, 24 services, 12 FAQs, etc.). New industries must match these lengths or the layout drifts.
- **Content configs**: `lib/industry/content/<camelCaseSlug>.ts` — one per industry (e.g. `lawFirms.ts`), each `export const <name>: IndustryContent = {...}`.
- **SEO helper**: `lib/industry/seo.ts` — `buildIndustryMetadata()` + `buildIndustryJsonLd()` (Service + BreadcrumbList + FAQPage JSON-LD) generated per industry.
- **Routes**: `app/<slug>/page.tsx` — ~11-line file that imports the config + helpers and renders `<IndustryLandingPage>`. (Static segment beats the `[slug]` blog route.)

**To add a new industry**: add the entry to `lib/industries.ts` (status `live`), create `lib/industry/content/<name>.ts` (copy an existing config, retain array lengths), and create `app/<slug>/page.tsx` (copy an existing route). Logos live in `public/med-spas-logos/` and are reused across every industry.

**Language**: all industry copy is **US English** (spelling + US institutions/examples/resources). Keep new content US (optimize/specialize/center, attorney not solicitor, IRS not HMRC, Zillow not Rightmove, Chapter 7/11/13 not CVL/MVL, etc.).

---

## Internal Linking System (blog ↔ blog ↔ industries)

Hub-and-spoke topic clusters. **Industry pages** (`/<slug>`) and **product pages** (`/llm-visibility-audit`, `/strategy-blueprint`, `/llm-visibility-gap-calculator`) are hubs; **blog posts** are spokes. The high-value links auto-generate from post **tags** — no per-post hand-mapping.

**Tagging convention (drives everything):** in each post's `tags[]` —
- **Industry slug tag(s)** — 1–3 values that exactly match slugs in `lib/industries.ts` (e.g. `med-spas`). These create the post→industry and industry→post links.
- **One primary cluster tag** from the vocabulary: `AI Visibility`, `Generative Engine Optimization`, `Answer Engine Optimization`, `Digital PR & Earned Media`, `Authority Building`, `Local SEO`, `AI Platform Guides`, `Case Studies`.
- Free-form descriptive tags as desired (they boost related-post overlap scoring).

**What's automated:**
- **Post → related articles** + **post → relevant industry hubs**: computed server-side in `app/[slug]/page.tsx` (helpers in `lib/blog/related.ts`: `scoreRelatedPosts` by shared-tag overlap → category → recency; `industriesFromTags`), rendered by `components/blog/RelatedPosts.tsx` at the foot of every post.
- **Industry hub → guides**: `lib/industry/guides.ts` `getIndustryGuides(slug)` fetches posts tagged with the slug; each `app/<slug>/page.tsx` (ISR, `revalidate = 300`) passes them as `relatedPosts` to `IndustryLandingPage`, which renders a "Guides & resources" section. Returns `[]` (section hidden) when Supabase is unconfigured.
- **Blog list → industries**: "Browse guides by industry" row on `/blog` + `/insights`.
- **Sitemap**: `app/sitemap.ts` now includes all 24 industry URLs (`LIVE_INDUSTRIES`).

**Anchor-text rules (logical, not over-optimized):** descriptive/natural anchors (use the destination's real name/title); vary anchors to the same URL; never "click here"; 2–5 contextual in-content links per ~1,000 words, only where genuinely relevant; one link per destination per post; reciprocal where logical, never forced.

**Follow-up (not yet done):** retro-fitting contextual in-content links into the existing posts' HTML needs a temporary Netlify-deployed Supabase migration route (sandbox can't reach the DB) + an editorial pass using the rules above.

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
- **Industry pages** use the light template aesthetic with **orange** as the primary accent and **emerald** as a complementary accent (e.g. prompt-category chips, the before/after "After" card). Single-accent-orange-on-slate/white is the house style; avoid the multi-colour "rainbow" look.
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

### 2026-06-18
Focus: industries rollout → US English → internal-linking system → sitemap/cache fixes → blog-card images → header dropdown. (Handoff snapshot for the next session.)

**Industries system (24 pages, data-driven)** — built one shared template `components/industry/IndustryLandingPage.tsx` (client) + contract `lib/industry/types.ts` (`IndustryContent`, fixed array lengths) + per-industry `lib/industry/content/<camelCaseSlug>.ts` + SEO helper `lib/industry/seo.ts` + thin async `app/<slug>/page.tsx` (calls `getIndustryGuides`, `revalidate=300`). Registry `lib/industries.ts` (all `live`). Proved on Law Firms, then rolled out all 24 (parallel sub-agents) and migrated Med Spas onto the template. See the "Industries System" section above.

**US English** — full localization pass (spelling + US institutions/examples/resources): attorneys/Chambers USA/ABA, IRS/AICPA/Form 1040, 401(k)/IRA, the "Big I", Healthgrades/Joint Commission/CDC, Zillow/NAR/AIA/ASCE, BizBuySell/IBBA, insolvency → Chapter 7/11/13. `seo.ts` `en_US`/`areaServed: United States`; "Rehab Centres" → "Rehab Centers".

**Internal-linking system** — see the "Internal Linking System" section above. `lib/blog/related.ts` (`scoreRelatedPosts`, `industriesFromTags`) → `components/blog/RelatedPosts.tsx` (Related articles + relevant-industry links, with featured images) in `BlogPostClient`; `lib/industry/guides.ts` `getIndustryGuides` (tagged-first + recent fallback, with featured images) → "Guides & resources" section in the template; "Browse by industry" row on `/blog`+`/insights`; editor **Industries picker** `components/blog/editor/BlogPostIndustries.tsx`. Tagging convention = industry-slug tag(s) + one cluster tag (reuses `tags[]`). All ~28 existing posts were auto-tagged via a temporary `/api/admin/migrate-tags` route (rules-based, dry-run-verified, then **deleted**).

**Sitemap** — `app/sitemap.ts` now includes the 24 industries and is `export const dynamic = 'force-dynamic'`. The live `/sitemap.xml` had been serving a stale **Netlify Durable Cache** copy of an old Supabase `generate-sitemap` proxy (1-yr TTL); removed the proxy from `public/_redirects` and the owner did one "Clear cache and deploy site". Now correct (63 URLs: 11 pages + 24 industries + 28 posts; no `/auth`/`/dashboard`).

**Header** (`components/Header.tsx`) — Industries dropdown opens on **hover** (+ click), removed redundant "Live" badges.

**Build/deploy/sandbox notes** — fresh container: `npm install` first. Google Fonts blocked → stub Inter in `app/layout.tsx` before `npx next build`, then `git checkout -- app/layout.tsx`. `.next` is tracked → `git restore --staged .next && git checkout -- .next` before staging. Sandbox **cannot reach Supabase** (DB ops need a temporary Netlify route); the **live site IS reachable** (curl + headless Chromium at `/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell` via `playwright-core`, args `--no-sandbox --ignore-certificate-errors`, `ignoreHTTPSErrors:true`). Push to `main` + `claude/hopeful-fermat-cia7hk` with the TA-2 write PAT (Contents R/W) set on the remote first.

**Open item** — Christopher reported blog/industry links "frozen" in **Safari**. Not reproducible in headless Chromium (all links navigate, zero console errors); likely stale cached JS chunks after rapid deploys. Also fixed a real bug: the blog-list card overlay only covered the title (not the whole card). Awaiting his retest after a hard refresh (⌘⇧R); if it persists, instrument Safari specifically.

**Design** — orange primary + emerald complementary accents, light template aesthetic, no multi-colour "rainbow".

### 2026-06-16
Focus: Footer fix → Med Spas polish/SEO → **industries landing-page system** → roll out all 24 industries → convert everything to **US English**.

**Footer**
- Industries column switched from a 2-col grid to CSS multi-column flow (`columns-2` + `break-inside-avoid`) so wrapping names no longer create ragged rows.

**Med Spas page polish + SEO (`/med-spas`)**
- Section redesigns: "ask AI" search-bar prompts (no quote boxes), all-faint-green prompt categories, data-driven Source Landscape cards (frequency bars, per-model dots, owned-vs-third-party split), premium dark Brand callout, 9-pillar (3×3) services grid with ghost numerals, full-width "Important qualification" band, upgraded "Why TotalAuthority" cards, cohesive treatment chips.
- Replaced the messy logo strip with 8 real publication logos in `public/med-spas-logos/` (NYT, BBC, Guardian, Forbes, ELLE, Men's Health, Healthline, HubSpot), forced to uniform black via `filter: grayscale(1) brightness(0)` (they're white-on-transparent assets — `mix-blend-multiply` made them invisible).
- Replaced the in-page sub-nav with a slim **orange scroll progress bar**.
- SEO: Service + Breadcrumb + **FAQPage** JSON-LD, richer metadata, FAQ extracted to a shared module, in-prose internal links.

**Industries system (see "Industries System" section above)**
- Built the shared `IndustryLandingPage` template + `IndustryContent` contract + `seo.ts` helper. Proved it on **Law Firms** first (sign-off gate), then rolled out the remaining 22 + migrated Med Spas onto the template (retired `MedSpasClient.tsx`/`faqData.ts`). All 24 flipped to `live`.
- Content authored in parallel via sub-agents to a strict schema (fixed array lengths); each type-checked clean.

**US English conversion**
- Owner asked for US English including examples + sector resources. Did a deterministic spelling sweep (optimize/specialize/center/program/analyze/counseling/specialty/anonymized/advisor) across all configs + template, then sub-agents swapped UK→US institutions/examples/resources per sector (attorneys/Chambers USA/ABA, IRS/AICPA/Form 1040, 401(k)/IRA, the "Big I", Healthgrades/Joint Commission/CDC, Zillow/NAR/AIA/ASCE, BizBuySell/IBBA, insolvency → Chapter 7/11/13/ABI). `seo.ts` → `en_US` / `areaServed: United States`; "Rehab Centres" → "Rehab Centers".

**Verification**
- `npx next build` green for all 24 industry routes after each phase. Structure preserved (12 FAQs each, fixed array lengths). Spot-checked pages across clusters via headless-Chromium screenshots.

**Build/deploy note (sandbox)**
- Google Fonts is blocked locally → before `npx next build`, stub Inter in `app/layout.tsx` (comment the import, `const inter = { className: '' }`), build, then `git checkout -- app/layout.tsx`. `.next` is tracked → `git restore --staged .next && git checkout -- .next` before staging.

**Git / push**
- Pushed to both `main` and `claude/hopeful-fermat-cia7hk`. Write-enabled fine-grained PAT ("TA-2", Contents: Read & Write) is required — the read-only token fails with 403 on both `git push` and the GitHub API. Owner provides the PAT; set it on the remote before pushing.

**Key commits this session**
- footer columns fix · med-spas redesign + logos · progress bar + SEO + FAQ extract · `IndustryLandingPage` template + Law Firms · full 24-industry rollout (`59b46f8`) · US English conversion (`6fa06b9`)

**Next steps**
- Confirm Netlify deploy is green and skim a few industry pages live. Optionally fine-tune any sector term for US positioning. Adding a new industry is now: registry entry + one content config + one route file.

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

### 2026-04-28
Focus: CTA block updates across all blog posts + project setup in Cowork.

**CTA block overhaul (`components/blog/ReusableBlocksManager.tsx`)**
- Removed "Free" from headline — now reads "Get Your LLM Visibility Audit"
- Button changed from postMessage call to direct link: `https://totalauthority.com/llm-visibility-audit`
- Button text updated: "Start Free Audit →" → "Start Audit Now →"
- Removed "24-hour delivery" and "No sales call" badges (product is now paid)
- Added "+ Over $300 worth of free bonuses" line below button
- Block renamed from "Free LLM Visibility Audit CTA" to "LLM Visibility Audit CTA"

**Database migration — all 16 existing blog posts updated in Supabase**
- CTA content was baked into post HTML in the DB — template changes alone don't update existing posts
- Used a temporary API route (`/api/admin/migrate-cta`) deployed to Netlify to run the migration server-side (sandbox has no external network access)
- All 16 posts confirmed updated, migration route then deleted
- For future CTA changes: same pattern — update template + run a migration route

**Site title update (from session 2026-04-03)**
- `app/layout.tsx` title updated to "Total Authority - AI Visibility"

**Workflow notes**
- GitHub PAT needed at start of each session to push: `git remote set-url origin https://chrispanteli:<PAT>@github.com/LinkifiPR/TotalAuthority-NEXTJS.git`
- Sandbox cannot reach external networks (Supabase, etc.) — use Netlify API routes for DB operations
- Supabase service role key: stored securely by Christopher (do not commit)

**Commits pushed this session**
- `53adf53` — site title update
- `ea6adcf` — CLAUDE.md created
- `003491d` — CLAUDE.md session notes
- `c82ecf7` — CTA block updates + migration script
- `fd1323a` — temporary migration route (deleted next commit)
- `211c482` — migration route removed

**Next steps**
- Verify CTA looks correct on live blog posts (check totalauthority.com/what-is-llm-optimization)
- Clean up legacy Replit files (`replit.md`, `sync-to-github.sh`)
- Add `.env*` to `.gitignore` and run `git rm --cached .env.local`

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
