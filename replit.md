# Total Authority Copy - Next.js Migration Project

## Overview
This project is a **migration** from a React + Vite application to Next.js 14 with App Router. The original application was built in Lovable and is being converted to Next.js while preserving all functionality and visual design.

## Original Application Architecture

### Tech Stack (Original)
- **Frontend**: React 18, TypeScript, Vite
- **Routing**: React Router DOM v6
- **Backend**: Supabase (PostgreSQL database, Auth, Edge Functions)
- **UI Components**: Shadcn UI + Radix UI primitives
- **Styling**: Tailwind CSS with custom animations
- **Forms**: React Hook Form + Zod validation
- **Data Fetching**: TanStack Query (React Query v5)
- **SEO**: React Helmet Async

### Application Features
The application is a **PR/Marketing Visibility Tool** with the following features:

#### Public Pages
- Landing page with hero, features, pricing
- About page
- Blog system (list view + individual posts)
- Audit tools:
  - LLM Visibility Gap Calculator
  - LLM Visibility Audit
  - Full Audit / Strategy Blueprint
  - Audit Report viewer (dynamic slug-based)
- Legal pages (Privacy Policy, Terms of Service, Cookie Policy)
- Thank you pages (multiple variations)
- Audit Claim Tutorial

#### Protected Pages
- **Dashboard**: User dashboard for managing audits
- **Admin Panel**:
  - Admin Overview
  - User Management
  - Audit Management
  - Blog Post Management (CRUD)
  - Settings

### Route Structure (24 Total Routes)
```
/ - Landing page
/auth - Authentication
/dashboard - User dashboard
/about - About page
/blog - Blog list
/insights - Blog list (alias)
/:slug - Individual blog post (dynamic)
/preview/:slug - Blog post preview

/admin - Admin overview
/admin/audits - Audit management
/admin/users - User management
/admin/posts - Blog post management
/admin/posts/:id - Blog post editor
/admin/settings - Admin settings

/audit/:slug - Audit report viewer
/audit-claim-tutorial - Tutorial
/llm-visibility-gap-calculator - Calculator tool
/llm-visibility-audit - Audit tool
/strategy-blueprint - Full audit form
/full-audit-thank-you - Thank you page
/thankyou - Thank you page
/thanks - Thank you page

/privacy-policy - Privacy policy
/terms-of-service - Terms of service
/cookie-policy - Cookie policy
```

### Supabase Configuration
- **URL**: https://pgbcixncaeyjunwxrsik.supabase.co
- **Anon Key**: (stored in client.ts)
- **Features Used**:
  - Authentication (via AuthProvider hook)
  - Database tables for audits, users, blog posts
  - Edge Functions for PDF generation, email drafts, analytics
  - Row Level Security (RLS) policies

### Key Components
- **Admin Components**: User tables, audit management, post editor
- **Audit Components**: Forms, reports, calculators
- **Blog Components**: Post list, post viewer, admin editor
- **Dashboard Components**: User stats, audit history
- **UI Components**: Full Shadcn UI suite (40+ components)
- **Custom Components**: Hero, Features, Testimonials, Pricing, etc.

### Custom Styling Features
- Custom Tailwind animations (wobble, float, shimmer, fade-in)
- Custom color palette (beige, orange, blue themed)
- Responsive design with mobile-first approach
- Dark mode not implemented (light mode only)

## Migration Strategy

### Phase 1: Clone & Analyze ✅
- Downloaded complete repository from GitHub
- Analyzed routing structure, components, and dependencies
- Documented application architecture

### Phase 2: Initialize Next.js (In Progress)
- Set up Next.js 14 with App Router
- Configure TypeScript and Tailwind CSS
- Install all necessary dependencies
- Preserve existing design tokens

### Phase 3: Component Migration
- Transfer all Shadcn UI components
- Migrate custom components with 'use client' directives
- Port utilities, hooks, and types
- Preserve all styling and animations

### Phase 4: Route Migration
- Convert React Router routes to Next.js file-based routing
- Implement layouts for admin, dashboard sections
- Set up middleware for protected routes
- Preserve all URL structures

### Phase 5: Supabase Integration
- Configure Supabase client for Next.js (server/client)
- Implement authentication flow
- Set up middleware for auth checks
- Preserve all database queries

### Phase 6: Integration & Testing
- Connect all pages with backend
- Verify all features work correctly
- Add metadata/SEO
- Test authentication flow
- Ensure production-ready

## Next.js Migration Notes

### Server vs Client Components
- All interactive components will need 'use client' directive
- Forms, hooks, and state management = Client Components
- Static content and data fetching = Server Components where possible
- Supabase queries can use both server and client components

### Routing Conversions
```
React Router               →  Next.js App Router
/                         →  app/page.tsx
/about                    →  app/about/page.tsx
/blog                     →  app/blog/page.tsx
/:slug                    →  app/[slug]/page.tsx
/admin                    →  app/admin/page.tsx
/admin/posts/:id          →  app/admin/posts/[id]/page.tsx
```

### Environment Variables
- Supabase URL and Key will move to .env.local
- Client-side vars will be prefixed with NEXT_PUBLIC_

## Current Status
- Repository cloned and analyzed
- Architecture documented
- Ready to initialize Next.js project

## Recent Changes
- 2025-11-16: Initial repository analysis and documentation
