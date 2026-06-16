"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { useFormPopup } from '@/hooks/useFormPopup';
import { useScheduleCallPopup } from '@/hooks/useScheduleCallPopup';
import { getRelatedIndustries } from '@/lib/industries';
import type { IndustryContent, IndustryIcon } from '@/lib/industry/types';
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Search,
  Target,
  Layers,
  Megaphone,
  UserCheck,
  FileText,
  BarChart3,
  Award,
  Building2,
  AlertTriangle,
  TrendingUp,
  ChevronDown,
  Star,
  Quote,
  ShieldCheck,
  X as XIcon,
  Plus as PlusIcon,
  type LucideIcon,
} from 'lucide-react';

const ICONS: Record<IndustryIcon, LucideIcon> = { Search, Target, Layers, Megaphone, UserCheck, FileText, BarChart3, Award, Building2, Star };

const Footer = dynamic(() =>
  import('@/components/Footer').then((m) => m.Footer)
);
const FormPopup = dynamic(
  () => import('@/components/FormPopup').then((m) => m.FormPopup),
  { ssr: false }
);
const ScheduleCallPopup = dynamic(
  () => import('@/components/ScheduleCallPopup').then((m) => m.ScheduleCallPopup),
  { ssr: false }
);

// ---------------------------------------------------------------------------
// Reusable section header (matches site editorial style)
// ---------------------------------------------------------------------------
const SectionEyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-xs font-medium tracking-[0.18em] uppercase text-orange-600 mb-4">
    {children}
  </p>
);

// ---------------------------------------------------------------------------
// Audit hero visual — bespoke HTML/CSS/SVG mockup of a real audit interface
// ---------------------------------------------------------------------------
const AuditHeroVisual = ({ content }: { content: IndustryContent }) => (
  <div className="relative">
    <div
      aria-hidden="true"
      className="absolute -inset-4 bg-orange-200/25 rounded-[2rem] blur-2xl -z-10"
    />
    <div className="relative rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-slate-200 bg-slate-50">
        <span className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
        </span>
        <span className="ml-1 text-sm font-medium text-slate-900">
          {content.hero.dashboardTitle}
        </span>
        <span className="ml-auto inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-widest text-emerald-600">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Live
        </span>
      </div>

      {/* Body */}
      <div className="p-5 md:p-6 space-y-5">
        {/* Overall score */}
        <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-orange-50 to-white p-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-widest text-orange-600 mb-1">
                Overall AI Visibility
              </div>
              <div className="text-5xl font-bold text-slate-900 tabular-nums leading-none">
                {content.dashboard.score}<span className="text-orange-500 text-2xl">/100</span>
              </div>
              <div className="text-xs text-slate-500 mt-2">
                {content.dashboard.scoreCaption}
              </div>
            </div>
            <div className="text-right text-xs text-slate-500">
              <div className="font-medium text-slate-700">{content.dashboard.citedLine}</div>
              <div>{content.dashboard.citedSub}</div>
            </div>
          </div>
          <div className="h-2 rounded-full bg-slate-100 mt-4 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-600"
              style={{ width: `${content.dashboard.score}%` }}
            />
          </div>
        </div>

        {/* Model breakdown */}
        <div className="grid grid-cols-3 gap-2.5">
          {content.dashboard.models.map((m) => (
            <div
              key={m.name}
              className="rounded-lg border border-slate-200 p-3 bg-white"
            >
              <div className="text-[11px] font-medium text-slate-700 mb-1">{m.name}</div>
              <div className="text-xl font-semibold text-orange-600 tabular-nums leading-none mb-2">
                {m.score}
              </div>
              <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden mb-2">
                <div
                  className="h-full rounded-full bg-orange-500"
                  style={{ width: `${m.score}%` }}
                />
              </div>
              <div className="text-[10px] text-slate-400">{m.m} mentions · {m.c} cited</div>
            </div>
          ))}
        </div>

        {/* Competitor panel */}
        <div className="rounded-lg border border-slate-200 overflow-hidden">
          <div className="px-4 py-2.5 bg-slate-900 text-white text-[10px] font-semibold uppercase tracking-wider flex items-center justify-between">
            <span>{content.dashboard.competitorsHeading}</span>
            <span className="text-slate-400 font-normal normal-case tracking-normal">
              {content.dashboard.competitorsCaption}
            </span>
          </div>
          {content.dashboard.competitors.map((c, i) => (
            <div
              key={c.name}
              className={`flex items-center justify-between px-4 py-2.5 text-xs ${
                i % 2 ? 'bg-slate-50' : 'bg-white'
              }`}
            >
              <span className="text-slate-700 font-medium">{c.name}</span>
              <span className="text-orange-600 font-semibold tabular-nums">
                {c.count}× recommended
              </span>
            </div>
          ))}
        </div>

        {/* Source landscape */}
        <div className="rounded-lg border border-slate-200 p-4 bg-slate-50/40">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-3">
            Top sources influencing answers
          </div>
          <div className="flex flex-wrap gap-2">
            {content.dashboard.sources.map((s) => (
              <span
                key={s}
                className="inline-flex items-center text-[11px] font-medium text-slate-700 bg-white border border-slate-200 rounded-full px-2.5 py-1"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// Reading progress bar — a slim orange indicator that fills as the visitor
// scrolls the page. Replaces the old in-page anchor sub-nav for a cleaner,
// more streamlined top of page.
// ---------------------------------------------------------------------------
const ScrollProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? Math.min(100, (el.scrollTop / max) * 100) : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div
      className="fixed top-0 inset-x-0 z-[60] h-1 pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-orange-500 to-orange-400 shadow-sm shadow-orange-500/30 transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export const IndustryLandingPage: React.FC<{ content: IndustryContent }> = ({ content }) => {
  const { isOpen, openForm, closeForm } = useFormPopup();
  const {
    isOpen: isScheduleCallOpen,
    openScheduleCall,
    closeScheduleCall,
  } = useScheduleCallPopup();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const related = getRelatedIndustries(content.slug);

  return (
    <div className="min-h-screen bg-white">
      <Header onOpenForm={openForm} />

      <ScrollProgressBar />

      <main>
        {/* ============================================================== */}
        {/* 1. HERO                                                          */}
        {/* ============================================================== */}
        <section
          id="ai-visibility"
          className="scroll-mt-36 relative pt-14 md:pt-20 pb-20 md:pb-28 px-4 bg-gradient-to-b from-orange-50/40 to-white"
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6">
                <SectionEyebrow>
                  {content.hero.eyebrow}
                </SectionEyebrow>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.05] text-balance">
                  {content.hero.headlinePre}{' '}
                  <span className="text-orange-600">{content.hero.headlineHighlight}</span>
                  {content.hero.headlinePost}
                </h1>
                <p className="mt-6 text-base md:text-lg text-slate-700 leading-relaxed">
                  {content.hero.paragraphs[0]}
                </p>
                <p className="mt-4 text-base md:text-lg text-slate-700 leading-relaxed">
                  {content.hero.paragraphs[1]}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href="/llm-visibility-audit"
                    className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-7 py-4 rounded-lg font-semibold shadow-lg shadow-orange-900/20 transition-colors"
                  >
                    {content.cta.heroPrimary}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={openScheduleCall}
                    className="inline-flex items-center gap-2 px-6 py-4 rounded-lg font-semibold text-slate-900 border border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-colors"
                  >
                    Book a Strategy Call
                  </button>
                </div>

                <p className="mt-5 text-xs text-slate-500 max-w-md">
                  {content.hero.supportingLine}
                </p>

                <div className="mt-8 pt-6 border-t border-slate-200 flex items-center gap-2 text-xs font-medium tracking-wide text-slate-500">
                  <Sparkles className="w-4 h-4 text-orange-500" />
                  {content.hero.footnote}
                </div>
              </div>

              <div className="lg:col-span-6">
                <AuditHeroVisual content={content} />
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 2. PROBLEM-AGITATION                                             */}
        {/* ============================================================== */}
        <section
          id="what-we-analyse"
          className="scroll-mt-36 cv-auto py-20 md:py-28 px-4 bg-white border-y border-slate-200/70"
        >
          <div className="max-w-4xl mx-auto">
            <SectionEyebrow>The Shift</SectionEyebrow>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-6 text-balance">
              {content.shift.heading}
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-8">
              {content.shift.intro}
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-10">
              {content.shift.questions.map((q) => (
                <div
                  key={q}
                  className="group flex items-center gap-3 bg-slate-50/80 border border-slate-200 rounded-xl px-3.5 py-3 hover:bg-white hover:border-orange-300 hover:shadow-sm transition-all"
                >
                  <span className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white text-orange-500 border border-slate-200 group-hover:text-orange-600 group-hover:border-orange-200 transition-colors">
                    <Search className="w-4 h-4" strokeWidth={2.25} />
                  </span>
                  <span className="text-sm md:text-[15px] text-slate-700 leading-snug">{q}</span>
                </div>
              ))}
            </div>
            <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-4">
              {content.shift.paragraphs[0]}
            </p>
            <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-8">
              {content.shift.paragraphs[1]}
            </p>

            <div className="border-l-4 border-orange-600 bg-orange-50/50 pl-6 py-5 pr-5 rounded-r-lg">
              <p className="text-lg md:text-xl font-semibold text-slate-900 leading-snug">
                {content.shift.callout}
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 3. AUDIT DEMONSTRATION                                           */}
        {/* ============================================================== */}
        <section className="cv-auto py-20 md:py-28 px-4 bg-slate-50/40">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl mb-14">
              <SectionEyebrow>The Audit</SectionEyebrow>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-5 text-balance">
                {content.audit.heading}
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                {content.audit.introPre}
                <Link
                  href="/llm-visibility-audit"
                  className="text-orange-600 hover:text-orange-700 font-medium underline underline-offset-2 decoration-orange-300"
                >
                  Multi-Model AI Visibility Audit
                </Link>
                {content.audit.introPost}
              </p>
            </div>

            {/* Prompt categories */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 md:p-8 mb-12">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-semibold tracking-[0.16em] uppercase text-slate-500">
                  Example prompt categories we test
                </h3>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  12 categories
                </span>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {content.audit.promptCategories.map((p) => (
                  <div
                    key={p}
                    className="group flex items-start gap-2.5 text-sm text-emerald-900/80 bg-emerald-50/70 border border-emerald-100 rounded-lg px-3 py-2.5 hover:bg-emerald-50 hover:border-emerald-200 transition-colors"
                  >
                    <Search className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-emerald-600" />
                    <span className="leading-snug">"{p}"</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Audit output cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {(() => {
                const outIcons = [BarChart3, Layers, UserCheck, Target];
                return content.audit.outputCards.map((card, i) => {
                  const Icon = outIcons[i];
                  return (
                    <article
                      key={card.t}
                      className="rounded-xl border border-slate-200 bg-white p-6 md:p-7 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="w-11 h-11 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center mb-4">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-2">
                        {card.t}
                      </h3>
                      <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                        {card.b}
                      </p>
                    </article>
                  );
                });
              })()}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/llm-visibility-audit"
                className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-7 py-4 rounded-lg font-semibold shadow-lg shadow-orange-900/20"
              >
                {content.cta.auditSection}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 4. COMPETITOR INTELLIGENCE                                       */}
        {/* ============================================================== */}
        <section className="cv-auto py-20 md:py-28 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl mb-12">
              <SectionEyebrow>Competitor Intelligence</SectionEyebrow>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-5 text-balance">
                {content.competitorIntel.heading}
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                {content.competitorIntel.intro}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 items-start">
              <div>
                <h3 className="text-sm font-semibold tracking-[0.16em] uppercase text-slate-500 mb-4">
                  {content.competitorIntel.identifiesHeading}
                </h3>
                <ul className="space-y-3">
                  {content.competitorIntel.identifies.map((it) => (
                    <li key={it} className="flex items-start gap-3 text-slate-700">
                      <CheckCircle2 className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-base text-slate-700 leading-relaxed mt-6 italic">
                  {content.competitorIntel.note}
                </p>
              </div>

              {/* Competitor table mock */}
              <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                <div className="px-5 py-3 border-b border-slate-200 bg-slate-50 text-xs font-semibold tracking-[0.16em] uppercase text-slate-500">
                  {content.competitorIntel.tableHeading}
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-900 text-white text-[10px] uppercase tracking-wider">
                      <th className="px-4 py-2.5 text-left font-medium">Competitor</th>
                      <th className="px-2 py-2.5 text-center font-medium">AI Models</th>
                      <th className="px-2 py-2.5 text-center font-medium">Prompts</th>
                      <th className="px-4 py-2.5 text-right font-medium">Frequency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {content.competitorIntel.tableRows.map((c, i) => (
                      <tr
                        key={c.name}
                        className={`${i % 2 ? 'bg-slate-50' : 'bg-white'}`}
                      >
                        <td className="px-4 py-2.5 font-medium text-slate-800">
                          {c.name}
                        </td>
                        <td className="px-2 py-2.5 text-center text-slate-600 tabular-nums">
                          {c.m}
                        </td>
                        <td className="px-2 py-2.5 text-center text-slate-600 tabular-nums">
                          {c.p}
                        </td>
                        <td className="px-4 py-2.5 text-right font-semibold text-orange-600 tabular-nums">
                          {c.f}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 5. SOURCE LANDSCAPE                                              */}
        {/* ============================================================== */}
        <section className="cv-auto py-20 md:py-28 px-4 bg-slate-50/40">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl mb-14">
              <SectionEyebrow>Source Landscape</SectionEyebrow>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-5 text-balance">
                {content.sourceLandscape.heading}
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                {content.sourceLandscape.paragraphs[0]}
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                {content.sourceLandscape.paragraphs[1]}
              </p>
            </div>

            {/* Editorial pull-quote */}
            <div className="relative max-w-4xl mx-auto mb-14">
              <div className="relative overflow-hidden bg-slate-900 text-white rounded-2xl px-8 py-10 md:px-14 md:py-12 shadow-xl shadow-slate-900/25">
                <div
                  aria-hidden="true"
                  className="absolute -top-10 -right-8 w-52 h-52 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"
                />
                <Quote className="w-8 h-8 text-orange-400/80 mb-5" />
                <p className="relative text-xl md:text-[26px] leading-snug text-slate-300">
                  {content.sourceLandscape.pullQuoteLine1}
                </p>
                <p className="relative text-xl md:text-[26px] font-semibold leading-snug text-white mt-2">
                  {content.sourceLandscape.pullQuoteLead}{' '}
                  <span className="text-orange-400">{content.sourceLandscape.pullQuoteHighlight}</span>
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 items-stretch">
              {/* Card 1 — Top recurring sources (ranked) */}
              <article className="group rounded-2xl border border-slate-200 bg-white p-6 md:p-7 shadow-sm hover:shadow-lg hover:border-orange-200 hover:-translate-y-0.5 transition-all flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 leading-tight">
                    {content.sourceLandscape.topSourcesTitle}
                  </h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {content.sourceLandscape.topSourcesBody}
                </p>
                <ul className="mt-auto space-y-3">
                  {content.sourceLandscape.topSources.map((s) => (
                    <li key={s.name}>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-medium text-slate-700">{s.name}</span>
                        <span className="tabular-nums text-slate-400">{s.pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-400"
                          style={{ width: `${s.pct}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </article>

              {/* Card 2 — Used across multiple AI models */}
              <article className="group rounded-2xl border border-slate-200 bg-white p-6 md:p-7 shadow-sm hover:shadow-lg hover:border-orange-200 hover:-translate-y-0.5 transition-all flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 leading-tight">
                    {content.sourceLandscape.multiModelTitle}
                  </h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {content.sourceLandscape.multiModelBody}
                </p>
                <ul className="mt-auto space-y-2.5">
                  {content.sourceLandscape.multiModel.map((s) => (
                    <li
                      key={s.name}
                      className="flex items-center justify-between gap-2 rounded-lg bg-slate-50 border border-slate-100 px-3 py-2.5"
                    >
                      <span className="text-sm font-medium text-slate-700">{s.name}</span>
                      <span className="flex items-center gap-1.5">
                        {['ChatGPT', 'Gemini', 'Perplexity'].map((m) => (
                          <span
                            key={m}
                            title={m}
                            className={`w-2 h-2 rounded-full ${
                              s.models.includes(m) ? 'bg-orange-500' : 'bg-slate-200'
                            }`}
                          />
                        ))}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="text-[11px] text-slate-400 mt-3.5">
                  Dots indicate ChatGPT · Gemini · Perplexity
                </p>
              </article>

              {/* Card 3 — Owned vs third-party signals */}
              <article className="group rounded-2xl border border-slate-200 bg-white p-6 md:p-7 shadow-sm hover:shadow-lg hover:border-orange-200 hover:-translate-y-0.5 transition-all flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 leading-tight">
                    {content.sourceLandscape.ownedTitle}
                  </h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {content.sourceLandscape.ownedBody}
                </p>
                <div className="mt-auto">
                  <div className="flex h-3 rounded-full overflow-hidden mb-4 ring-1 ring-slate-100">
                    <div className="bg-slate-300" style={{ width: `${content.sourceLandscape.ownedPct}%` }} />
                    <div className="bg-gradient-to-r from-orange-500 to-orange-400" style={{ width: `${content.sourceLandscape.thirdPartyPct}%` }} />
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-2xl font-bold text-slate-700 tabular-nums leading-none">
                        {content.sourceLandscape.ownedPct}%
                      </div>
                      <div className="text-xs text-slate-500 mt-1.5">Your domain</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-orange-600 tabular-nums leading-none">
                        {content.sourceLandscape.thirdPartyPct}%
                      </div>
                      <div className="text-xs text-slate-500 mt-1.5">Third-party</div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 6. BRAND UNDERSTANDING                                           */}
        {/* ============================================================== */}
        <section className="cv-auto py-20 md:py-28 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl mb-12">
              <SectionEyebrow>Brand Understanding</SectionEyebrow>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-5 text-balance">
                {content.brand.heading}
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                {content.brand.intro}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-semibold tracking-[0.16em] uppercase text-slate-500 mb-4">
                  {content.brand.positioningHeading}
                </h3>
                <ul className="space-y-3">
                  {content.brand.positioning.map((it) => (
                    <li key={it} className="flex items-start gap-3 text-slate-700">
                      <Award className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold tracking-[0.16em] uppercase text-slate-500 mb-4">
                  {content.brand.assessHeading}
                </h3>
                <ul className="space-y-2.5">
                  {content.brand.assess.map((it) => (
                    <li
                      key={it}
                      className="flex items-start gap-2.5 text-sm md:text-base text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Brand statement — premium callout */}
            <div className="mt-16 relative max-w-4xl mx-auto">
              <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white px-8 py-12 md:px-14 md:py-14 text-center shadow-xl shadow-slate-900/25">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_50%_0%,#ffffff,transparent_60%)]"
                />
                <div
                  aria-hidden="true"
                  className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-80 h-40 bg-orange-500/15 blur-3xl rounded-full pointer-events-none"
                />
                <div className="relative">
                  <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-7">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 text-sm font-medium text-slate-200">
                      <ShieldCheck className="w-4 h-4 text-orange-400" />
                      {content.brand.calloutPillA}
                    </span>
                    <ArrowRight className="w-5 h-5 text-orange-400 flex-shrink-0" />
                    <span className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-orange-500/30">
                      <Star className="w-4 h-4" />
                      {content.brand.calloutPillB}
                    </span>
                  </div>
                  <p className="text-2xl md:text-3xl font-semibold leading-snug text-balance">
                    {content.brand.calloutStatement}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 7. WHAT TOTALAUTHORITY DOES                                      */}
        {/* ============================================================== */}
        <section
          id="what-we-do"
          className="scroll-mt-36 cv-auto py-20 md:py-28 px-4 bg-gradient-to-b from-slate-50/40 to-white"
        >
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl mb-14">
              <SectionEyebrow>What We Do</SectionEyebrow>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-5 text-balance">
                {content.whatWeDo.heading}
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                {content.whatWeDo.paragraphsPre}
                <Link
                  href={content.whatWeDo.paragraphLinkHref}
                  className="text-orange-600 hover:text-orange-700 font-medium underline underline-offset-2 decoration-orange-300"
                >
                  {content.whatWeDo.paragraphLinkLabel}
                </Link>
                {content.whatWeDo.paragraphsPost}
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                {content.whatWeDo.paragraph2}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {content.whatWeDo.pillars.map((p) => {
                const Icon = ICONS[p.icon];
                return (
                <article
                  key={p.num}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 md:p-7 shadow-sm hover:shadow-xl hover:border-orange-200 hover:-translate-y-1 transition-all flex flex-col"
                >
                  {/* Large ghost numeral as a graphic element */}
                  <span
                    aria-hidden="true"
                    className="absolute -top-3 right-3 text-7xl font-bold tabular-nums leading-none select-none text-slate-100 group-hover:text-orange-100 transition-colors"
                  >
                    {p.num}
                  </span>
                  {/* Persistent corner accent */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-7 h-9 w-1 rounded-r-full bg-gradient-to-b from-orange-500 to-orange-400"
                  />
                  <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center shadow-md shadow-orange-500/30 mb-5 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-orange-500/40 transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="relative text-lg font-semibold text-slate-900 mb-2.5 leading-tight">
                    {p.title}
                  </h3>
                  <p className="relative text-sm text-slate-600 leading-relaxed flex-1">{p.body}</p>
                  {p.href && (
                    <Link
                      href={p.href}
                      className="relative mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-orange-600 hover:text-orange-700"
                    >
                      Learn more <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 8. EARNED MEDIA DIFFERENTIATOR                                   */}
        {/* ============================================================== */}
        <section className="cv-auto pt-20 md:pt-28 pb-14 md:pb-16 px-4 bg-white border-t border-slate-200/70">
          <div className="max-w-5xl mx-auto">
            <SectionEyebrow>Earned Media</SectionEyebrow>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-6 text-balance">
              {content.earnedMedia.heading}
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-4">
              {content.earnedMedia.paragraphs[0]}
            </p>
            <p className="text-base text-slate-700 leading-relaxed mb-6">
              {content.earnedMedia.effectsIntro}
            </p>
            <ul className="grid md:grid-cols-2 gap-3 mb-10">
              {content.earnedMedia.effects.map((it) => (
                <li
                  key={it}
                  className="flex items-start gap-3 text-slate-700 bg-orange-50/40 border border-orange-100 rounded-lg px-4 py-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-orange-500 mt-1 flex-shrink-0" />
                  <span className="text-sm">{it}</span>
                </li>
              ))}
            </ul>
            <p className="text-base text-slate-700 leading-relaxed mb-12">
              {content.earnedMedia.closing}
            </p>

            <div className="border-t border-slate-200 pt-10">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-500 mb-10 text-center">
                {content.earnedMedia.logosHeading}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-10 gap-y-10 items-center">
                {[
                  { name: 'The New York Times', src: '/med-spas-logos/nyt.webp' },
                  { name: 'BBC', src: '/med-spas-logos/bbc.svg' },
                  { name: 'The Guardian', src: '/med-spas-logos/guardian.webp' },
                  { name: 'Forbes', src: '/med-spas-logos/forbes.webp' },
                  { name: 'ELLE', src: '/med-spas-logos/elle.svg' },
                  { name: "Men's Health", src: '/med-spas-logos/menshealth.webp' },
                  { name: 'Healthline', src: '/med-spas-logos/healthline.webp' },
                  { name: 'HubSpot', src: '/med-spas-logos/hubspot.webp' },
                ].map((p) => (
                  <div
                    key={p.name}
                    className="flex items-center justify-center h-10 md:h-12"
                    aria-label={p.name}
                  >
                    <img
                      src={p.src}
                      alt={`${p.name} logo`}
                      loading="lazy"
                      decoding="async"
                      className="h-5 md:h-6 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                      style={{ filter: 'grayscale(1) brightness(0) saturate(100%)' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 9. PRACTITIONER AUTHORITY                                        */}
        {/* ============================================================== */}
        <section className="cv-auto py-14 md:py-16 px-4 bg-slate-50/40">
          <div className="max-w-5xl mx-auto">
            <SectionEyebrow>{content.practitioner.sectionLabel}</SectionEyebrow>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-6 text-balance">
              {content.practitioner.heading}
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-4">
              {content.practitioner.paragraphs[0]}
            </p>
            <p className="text-base text-slate-700 leading-relaxed mb-8">
              {content.practitioner.developIntro}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-12">
              {content.practitioner.chips.map((i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 text-sm text-slate-700 bg-white border border-slate-200 rounded-lg px-3 py-2.5 hover:border-orange-200 hover:shadow-sm transition-all"
                >
                  <UserCheck className="w-3.5 h-3.5 flex-shrink-0 text-orange-500" />
                  {i}
                </span>
              ))}
            </div>
            <div className="max-w-2xl mx-auto text-center">
              <div className="h-px w-12 bg-orange-500/60 mx-auto mb-5" />
              <p className="text-lg md:text-xl text-slate-700 italic leading-relaxed">
                {content.practitioner.closing}
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 10. TREATMENT VISIBILITY                                         */}
        {/* ============================================================== */}
        <section className="cv-auto pt-14 md:pt-16 pb-20 md:pb-28 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl mb-12">
              <SectionEyebrow>{content.services.sectionLabel}</SectionEyebrow>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-5 text-balance">
                {content.services.heading}
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                {content.services.intro}
              </p>
            </div>

            <div className="relative rounded-2xl border border-slate-200 bg-white shadow-sm p-6 md:p-8 mb-10 overflow-hidden">
              {/* Decorative glow background */}
              <div
                aria-hidden="true"
                className="absolute -top-24 -right-24 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-24 -left-24 w-72 h-72 bg-orange-100/25 rounded-full blur-3xl"
              />
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-semibold tracking-[0.16em] uppercase text-slate-500">
                    {content.services.focusHeading}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-orange-700 bg-orange-50 border border-orange-200 rounded-full px-2.5 py-1">
                    <Sparkles className="w-3 h-3" />
                    {content.services.badge}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {content.services.items.map((t) => (
                    <span
                      key={t}
                      className="group flex items-center gap-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 cursor-default transition-all hover:border-orange-300 hover:bg-orange-50/50 hover:shadow-sm"
                    >
                      <span
                        aria-hidden="true"
                        className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0 group-hover:bg-orange-500 transition-colors"
                      />
                      <span className="leading-snug">{t}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Centered italic with framing rule */}
            <div className="max-w-3xl mx-auto text-center">
              <div className="h-px w-12 bg-orange-500/60 mx-auto mb-5" />
              <p className="text-lg md:text-xl text-slate-700 italic leading-relaxed">
                {content.services.closing}
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 11. HOW THE PROCESS WORKS                                        */}
        {/* ============================================================== */}
        <section
          id="process"
          className="scroll-mt-36 cv-auto py-20 md:py-28 px-4 bg-slate-900 text-white"
        >
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl mb-14">
              <p className="text-xs font-medium tracking-[0.18em] uppercase text-orange-400 mb-4">
                {content.process.eyebrow}
              </p>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-5 text-balance">
                {content.process.heading}
              </h2>
            </div>

            <div className="relative grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.process.steps.map((s, i) => (
                <div
                  key={s.n}
                  className="relative group bg-white/[0.04] border border-white/10 rounded-2xl p-6 md:p-7 hover:bg-white/[0.07] hover:border-orange-500/30 transition-all"
                >
                  {/* Connector arrow to next card (desktop only). Tail at the
                      right edge of all but the last in each row of 3. */}
                  {i !== 5 && (i + 1) % 3 !== 0 && (
                    <div
                      aria-hidden="true"
                      className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-slate-900 border border-orange-500/40 text-orange-400 group-hover:text-orange-300 group-hover:border-orange-500/70 transition-all"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                  {/* For the wrap-around at end of row, draw a down arrow on mobile/tablet */}
                  {i !== 5 && (
                    <div
                      aria-hidden="true"
                      className="md:hidden flex absolute -bottom-5 left-1/2 -translate-x-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-slate-900 border border-orange-500/40 text-orange-400"
                    >
                      <ArrowRight className="w-4 h-4 rotate-90" />
                    </div>
                  )}
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-3xl font-bold text-orange-400 tabular-nums">{s.n}</div>
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-orange-400/70">
                      Step
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2.5">{s.t}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{s.b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 12. BEFORE AND AFTER                                             */}
        {/* ============================================================== */}
        <section
          id="results"
          className="scroll-mt-36 cv-auto py-20 md:py-28 px-4 bg-white"
        >
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl mb-12">
              <SectionEyebrow>What Progress Looks Like</SectionEyebrow>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-5 text-balance">
                {content.beforeAfter.heading}
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                {content.beforeAfter.intro}
              </p>
            </div>

            <div className="relative grid md:grid-cols-2 gap-6 mb-12">
              {/* Connector arrow Before -> After (desktop) */}
              <div
                aria-hidden="true"
                className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center rounded-full bg-white border-2 border-slate-200 shadow-lg text-slate-400"
              >
                <ArrowRight className="w-5 h-5" />
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-600 flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900">Before</h3>
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                    Today's gaps
                  </span>
                </div>
                <ul className="space-y-3">
                  {content.beforeAfter.before.map((it) => (
                    <li
                      key={it}
                      className="flex items-start gap-2.5 text-sm text-slate-600"
                    >
                      <span className="mt-0.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-white border border-slate-300 flex-shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      </span>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-white p-6 md:p-8 shadow-md shadow-emerald-500/10">
                <div
                  aria-hidden="true"
                  className="absolute -top-20 -right-20 w-56 h-56 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none"
                />
                <div className="relative">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/30">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-900">After</h3>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Outcomes
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {content.beforeAfter.after.map((it) => (
                      <li
                        key={it}
                        className="flex items-start gap-2.5 text-sm text-slate-800 font-medium"
                      >
                        <span className="mt-0.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-emerald-500 text-white flex-shrink-0 shadow-sm shadow-emerald-500/40">
                          <CheckCircle2 className="w-3 h-3" strokeWidth={3} />
                        </span>
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Important qualification — full-width band */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-6 md:px-9 md:py-7 flex items-start gap-5">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-500 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="md:border-l md:border-slate-200 md:pl-5">
                <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-500 mb-2">
                  Important qualification
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                  No agency controls the answers generated by ChatGPT, Gemini, Perplexity or any
                  other independent platform. Our role is to improve the quality, clarity and
                  authority of the sources and signals those systems may rely upon.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 13. WHO THIS IS FOR                                              */}
        {/* ============================================================== */}
        <section className="cv-auto py-20 md:py-28 px-4 bg-slate-50/40">
          <div className="max-w-5xl mx-auto">
            <SectionEyebrow>Who This Is For</SectionEyebrow>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-5 text-balance">
              {content.whoFor.heading}
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-10">
              {content.whoFor.intro}
            </p>

            <h3 className="text-sm font-semibold tracking-[0.16em] uppercase text-slate-500 mb-4">
              {content.whoFor.typesHeading}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
              {content.whoFor.types.map((i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 text-sm text-slate-700 bg-white border border-slate-200 rounded-lg px-3.5 py-3"
                >
                  <Building2 className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span>{i}</span>
                </div>
              ))}
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <p className="text-base text-slate-700 leading-relaxed">
                <strong className="text-slate-900">Qualification:</strong> {content.whoFor.qualification}
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 14. WHY MED SPAS LOSE AI VISIBILITY                              */}
        {/* ============================================================== */}
        <section className="cv-auto py-20 md:py-28 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl mb-12">
              <SectionEyebrow>Common Gaps</SectionEyebrow>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-5 text-balance">
                {content.gaps.heading}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {content.gaps.items.map((g, i) => (
                <article
                  key={g.t}
                  className="rounded-xl border border-slate-200 bg-white p-5 hover:border-orange-200 hover:shadow-md transition-all"
                >
                  <div className="text-xs font-semibold tracking-[0.16em] uppercase text-orange-600 mb-3">
                    Gap {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 mb-2 leading-snug">
                    {g.t}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{g.b}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 15. WHY TOTALAUTHORITY                                           */}
        {/* ============================================================== */}
        <section className="cv-auto py-20 md:py-28 px-4 bg-slate-50/40">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl mb-12">
              <SectionEyebrow>Why TotalAuthority</SectionEyebrow>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-5 text-balance">
                {content.whyUs.heading}
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-5">
                {content.whyUs.paragraphs[0]}
              </p>
              <p className="text-base text-slate-700 leading-relaxed">
                {content.whyUs.paragraphs[1]}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {content.whyUs.items.map((d) => {
                const Icon = ICONS[d.icon];
                return (
                <article
                  key={d.t}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 md:p-7 shadow-sm hover:shadow-lg hover:border-orange-200 hover:-translate-y-0.5 transition-all"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -top-px h-1 bg-gradient-to-r from-orange-500 to-orange-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                  />
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center shadow-md shadow-orange-500/30 flex-shrink-0 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-2 leading-tight">
                        {d.t}
                      </h3>
                      <p className="text-sm md:text-base text-slate-600 leading-relaxed">{d.b}</p>
                    </div>
                  </div>
                </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 16. AUDIT OFFER                                                  */}
        {/* ============================================================== */}
        <section
          id="audit"
          className="scroll-mt-36 cv-auto py-20 md:py-28 px-4 bg-gradient-to-b from-orange-50/40 to-white"
        >
          <div className="max-w-5xl mx-auto">
            <SectionEyebrow>Get Started</SectionEyebrow>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-5 text-balance">
              {content.auditOffer.heading}
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-10 max-w-3xl">
              {content.auditOffer.intro}
            </p>

            <div className="grid lg:grid-cols-2 gap-8 mb-10">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-7 shadow-sm">
                <h3 className="text-sm font-semibold tracking-[0.16em] uppercase text-slate-500 mb-4">
                  {content.auditOffer.includesHeading}
                </h3>
                <ul className="space-y-2.5">
                  {content.auditOffer.includes.map((it) => (
                    <li key={it} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-orange-200 bg-gradient-to-br from-white to-orange-50/40 p-6 md:p-8 shadow-sm flex flex-col">
                <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-3">
                  {content.auditOffer.requestHeading}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {content.auditOffer.requestIntro}
                </p>
                <ul className="text-sm text-slate-700 space-y-1.5 mb-6">
                  {content.auditOffer.formFields.map((f) => (
                    <li key={f}>• {f}</li>
                  ))}
                </ul>
                <div className="mt-auto space-y-3">
                  <Link
                    href="/llm-visibility-audit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-4 rounded-lg font-semibold shadow-lg shadow-orange-900/20 transition-colors"
                  >
                    {content.cta.auditOffer}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={openScheduleCall}
                    className="w-full inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium text-slate-900 border border-slate-300 hover:bg-slate-50 transition-colors"
                  >
                    Book a Strategy Call
                  </button>
                </div>
              </div>
            </div>

            {/* Internal link card: Blueprint */}
            <div className="rounded-2xl border border-slate-200 bg-slate-900 text-white p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
              <div>
                <p className="text-xs font-medium tracking-[0.18em] uppercase text-orange-400 mb-2">
                  {content.auditOffer.blueprintEyebrow}
                </p>
                <h3 className="text-xl md:text-2xl font-semibold mb-2">
                  {content.auditOffer.blueprintHeading}
                </h3>
                <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                  {content.auditOffer.blueprintBody}
                </p>
              </div>
              <Link
                href="/strategy-blueprint"
                className="inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-orange-50 px-5 py-3 rounded-lg font-semibold whitespace-nowrap"
              >
                See the Blueprint
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 18. PROOF & CASE STUDIES                                         */}
        {/* ============================================================== */}
        <section className="cv-auto py-20 md:py-28 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl mb-12">
              <SectionEyebrow>Proof</SectionEyebrow>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-5 text-balance">
                {content.proof.heading}
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                {content.proof.intro}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {content.proof.cards.map((p) => {
                const Icon = ICONS[p.icon];
                return (
                <article
                  key={p.t}
                  className="rounded-2xl border border-slate-200 bg-white p-6 md:p-7 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-11 h-11 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-2">
                    {p.t}
                  </h3>
                  <p className="text-sm md:text-base text-slate-600 leading-relaxed">{p.b}</p>
                </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 19. COMPARISON                                                   */}
        {/* ============================================================== */}
        <section className="cv-auto py-20 md:py-28 px-4 bg-slate-50/40">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl mb-12">
              <SectionEyebrow>Comparison</SectionEyebrow>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-5 text-balance">
                {content.comparison.heading}
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-5 lg:gap-6">
              {/* Traditional column */}
              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col">
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-200 text-slate-600 flex items-center justify-center">
                    <XIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-slate-500">
                      Traditional
                    </p>
                    <p className="text-base font-semibold text-slate-900">{content.comparison.traditionalLabel}</p>
                  </div>
                </div>
                <ul className="divide-y divide-slate-100 flex-1">
                  {content.comparison.traditional.map((it) => (
                    <li key={it} className="flex items-start gap-3 px-6 py-3.5 text-sm text-slate-600">
                      <span className="mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-slate-500 flex-shrink-0">
                        <XIcon className="w-3 h-3" strokeWidth={3} />
                      </span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* TotalAuthority column (highlighted) */}
              <div className="relative rounded-2xl border-2 border-orange-500 bg-white shadow-lg shadow-orange-500/10 overflow-hidden flex flex-col">
                <div
                  aria-hidden="true"
                  className="absolute -top-24 -right-24 w-56 h-56 bg-orange-200/30 rounded-full blur-3xl pointer-events-none"
                />
                <div className="relative px-6 py-4 border-b border-orange-200 bg-gradient-to-r from-orange-50 to-white flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center shadow-md shadow-orange-500/30">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-orange-600">
                      TotalAuthority
                    </p>
                    <p className="text-base font-semibold text-slate-900">{content.comparison.authorityLabel}</p>
                  </div>
                </div>
                <ul className="relative divide-y divide-orange-100 flex-1">
                  {content.comparison.authority.map((it) => (
                    <li
                      key={it}
                      className="flex items-start gap-3 px-6 py-3.5 text-sm text-slate-800 font-medium"
                    >
                      <span className="mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500 text-white flex-shrink-0 shadow-sm shadow-emerald-500/40">
                        <CheckCircle2 className="w-3 h-3" strokeWidth={3} />
                      </span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 20. FAQ                                                          */}
        {/* ============================================================== */}
        <section id="faqs" className="scroll-mt-36 cv-auto py-20 md:py-28 px-4 bg-gradient-to-b from-slate-50/40 to-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <SectionEyebrow>FAQs</SectionEyebrow>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 text-balance">
                Frequently asked questions
              </h2>
              <p className="mt-4 text-base text-slate-600 max-w-2xl mx-auto">
                {content.faq.intro}
              </p>
            </div>
            <div className="space-y-3">
              {content.faq.items.map((f, i) => {
                const open = openFaq === i;
                return (
                  <div
                    key={f.q}
                    className={`relative rounded-xl border bg-white overflow-hidden transition-all ${
                      open
                        ? 'border-orange-300 shadow-lg shadow-orange-500/10'
                        : 'border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md'
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaq(open ? null : i)}
                      className="w-full text-left px-5 md:px-6 py-4 flex items-center justify-between gap-4"
                      aria-expanded={open}
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <span
                          className={`flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold tabular-nums transition-colors ${
                            open
                              ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-sm shadow-orange-500/30'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className={`font-semibold text-sm md:text-base ${
                          open ? 'text-slate-900' : 'text-slate-800'
                        }`}>
                          {f.q}
                        </span>
                      </div>
                      <span
                        className={`flex-shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full transition-colors ${
                          open
                            ? 'bg-orange-50 text-orange-600'
                            : 'bg-slate-50 text-slate-500'
                        }`}
                      >
                        {open ? (
                          <XIcon className="w-3.5 h-3.5" strokeWidth={3} />
                        ) : (
                          <PlusIcon className="w-3.5 h-3.5" strokeWidth={3} />
                        )}
                      </span>
                    </button>
                    {open && (
                      <div className="px-5 md:px-6 pb-5 pl-[4.25rem] text-sm md:text-base text-slate-700 leading-relaxed">
                        {f.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Friendly post-FAQ CTA */}
            <div className="mt-10 text-center text-sm text-slate-600">
              Still have questions?{' '}
              <button
                onClick={openScheduleCall}
                className="text-orange-600 hover:text-orange-700 font-medium underline underline-offset-4"
              >
                Book a strategy call →
              </button>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* RELATED INDUSTRIES (internal linking)                            */}
        {/* ============================================================== */}
        <section className="cv-auto py-16 md:py-20 px-4 bg-slate-50/40 border-t border-slate-200/70">
          <div className="max-w-6xl mx-auto">
            <SectionEyebrow>Related Industries</SectionEyebrow>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 mb-3">
              {content.related.heading}
            </h2>
            <p className="text-slate-600 mb-8 max-w-2xl">
              {content.related.intro}
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((ind) => {
                const isLive = ind.status === 'live';
                const Inner = (
                  <>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold tracking-[0.16em] uppercase text-orange-600">
                        Industry
                      </span>
                      <span
                        className={`text-[10px] font-medium uppercase tracking-widest ${
                          isLive ? 'text-orange-600' : 'text-slate-400'
                        }`}
                      >
                        {isLive ? 'Live' : 'Coming soon'}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-orange-700 transition-colors">
                      {ind.name}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {ind.shortDescription}
                    </p>
                  </>
                );
                return isLive ? (
                  <Link
                    key={ind.slug}
                    href={`/${ind.slug}`}
                    className="group block rounded-xl border border-slate-200 bg-white p-5 hover:shadow-md hover:border-orange-200 transition-all"
                  >
                    {Inner}
                  </Link>
                ) : (
                  <div
                    key={ind.slug}
                    className="block rounded-xl border border-dashed border-slate-200 bg-white/60 p-5"
                  >
                    {Inner}
                  </div>
                );
              })}
            </div>

            {/* Internal links to product flow */}
            <div className="mt-10 flex flex-wrap gap-3 items-center justify-center text-sm">
              <span className="text-slate-500">Or explore:</span>
              <Link
                href="/llm-visibility-audit"
                className="text-orange-600 hover:text-orange-700 font-medium"
              >
                AI Visibility Audit →
              </Link>
              <span className="text-slate-300">·</span>
              <Link
                href="/llm-visibility-gap-calculator"
                className="text-orange-600 hover:text-orange-700 font-medium"
              >
                Visibility Gap Calculator →
              </Link>
              <span className="text-slate-300">·</span>
              <Link
                href="/strategy-blueprint"
                className="text-orange-600 hover:text-orange-700 font-medium"
              >
                Strategy Blueprint →
              </Link>
              <span className="text-slate-300">·</span>
              <Link
                href="/about"
                className="text-orange-600 hover:text-orange-700 font-medium"
              >
                About →
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 21. FINAL CTA                                                    */}
        {/* ============================================================== */}
        <section className="cv-auto py-24 md:py-32 px-4 bg-slate-900 text-white relative overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute -top-32 -right-32 w-[480px] h-[480px] bg-orange-500/15 rounded-full blur-3xl"
          />
          <div className="relative max-w-4xl mx-auto text-center">
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-orange-400 mb-5">
              {content.finalCta.eyebrow}
            </p>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6 text-balance">
              {content.finalCta.heading}
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed mb-10 max-w-2xl mx-auto">
              {content.finalCta.paragraph}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/llm-visibility-audit"
                className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-7 py-4 rounded-lg font-semibold shadow-lg shadow-orange-900/30"
              >
                {content.cta.final}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={openScheduleCall}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-lg font-semibold text-white border border-white/30 hover:bg-white/5"
              >
                Book a Strategy Call
              </button>
            </div>
            <p className="mt-8 text-xs text-slate-400 max-w-xl mx-auto">
              {content.finalCta.footnote}
            </p>
          </div>
        </section>
      </main>

      {/* Mobile sticky CTA */}
      <div className="md:hidden fixed bottom-3 left-3 right-3 z-50">
        <Link
          href="/llm-visibility-audit"
          className="w-full bg-orange-600 hover:bg-orange-700 text-white px-5 py-3.5 rounded-xl font-semibold shadow-2xl shadow-orange-900/30 flex items-center justify-center gap-2"
        >
          {content.cta.mobile}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <Footer onOpenForm={openForm} />
      <FormPopup isOpen={isOpen} onClose={closeForm} />
      <ScheduleCallPopup isOpen={isScheduleCallOpen} onClose={closeScheduleCall} />
    </div>
  );
};
