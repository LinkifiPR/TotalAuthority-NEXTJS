"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { useFormPopup } from '@/hooks/useFormPopup';
import { useScheduleCallPopup } from '@/hooks/useScheduleCallPopup';
import { getRelatedIndustries } from '@/lib/industries';
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
} from 'lucide-react';

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
const AuditHeroVisual = () => (
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
          Med Spa AI Visibility Audit
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
                53<span className="text-orange-500 text-2xl">/100</span>
              </div>
              <div className="text-xs text-slate-500 mt-2">
                16/30 audited answers mentioned the brand
              </div>
            </div>
            <div className="text-right text-xs text-slate-500">
              <div className="font-medium text-slate-700">10 answers</div>
              <div>cited the website</div>
            </div>
          </div>
          <div className="h-2 rounded-full bg-slate-100 mt-4 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-600"
              style={{ width: '53%' }}
            />
          </div>
        </div>

        {/* Model breakdown */}
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { name: 'ChatGPT', score: 40, m: '4/10', c: '7/10' },
            { name: 'Gemini', score: 50, m: '5/10', c: '3/10' },
            { name: 'Perplexity', score: 30, m: '3/10', c: '1/10' },
          ].map((m) => (
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
            <span>Top competitors recommended instead</span>
            <span className="text-slate-400 font-normal normal-case tracking-normal">
              4 of 10 prompts
            </span>
          </div>
          {[
            { name: 'Glow Aesthetics', count: 7 },
            { name: 'Refine Med Spa', count: 5 },
            { name: 'Lumen Skin Lab', count: 4 },
          ].map((c, i) => (
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
            {[
              'RealSelf',
              'Allure',
              'Healthline',
              'Reddit',
              'Yelp',
              'Local press',
              'Provider directory',
            ].map((s) => (
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
// Sticky in-page sub-nav (the spec asks for 7 anchors)
// ---------------------------------------------------------------------------
const SubNav = () => {
  const items = [
    { href: '#ai-visibility', label: 'AI Visibility' },
    { href: '#what-we-analyse', label: 'What We Analyse' },
    { href: '#what-we-do', label: 'What We Do' },
    { href: '#process', label: 'Our Process' },
    { href: '#results', label: 'Results' },
    { href: '#faqs', label: 'FAQs' },
    { href: '#audit', label: 'Get Your Audit' },
  ];
  return (
    <nav className="hidden lg:block border-b border-slate-200 bg-white shadow-sm sticky top-24 z-40">
      <div className="max-w-6xl mx-auto px-4 flex items-center gap-1 overflow-x-auto">
        {items.map((it) => (
          <a
            key={it.href}
            href={it.href}
            className="text-xs font-medium text-slate-600 hover:text-orange-600 px-3 py-3 whitespace-nowrap transition-colors"
          >
            {it.label}
          </a>
        ))}
      </div>
    </nav>
  );
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
const MedSpasClient = () => {
  const { isOpen, openForm, closeForm } = useFormPopup();
  const {
    isOpen: isScheduleCallOpen,
    openScheduleCall,
    closeScheduleCall,
  } = useScheduleCallPopup();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const related = getRelatedIndustries('med-spas');

  return (
    <div className="min-h-screen bg-white">
      <Header onOpenForm={openForm} />

      <SubNav />

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
                  AI Visibility and Authority Building for Med Spas
                </SectionEyebrow>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.05] text-balance">
                  Make Your Med Spa the One{' '}
                  <span className="text-orange-600">AI Recommends</span>
                </h1>
                <p className="mt-6 text-base md:text-lg text-slate-700 leading-relaxed">
                  Your prospective patients are asking ChatGPT, Gemini and Perplexity where to go
                  for Botox, dermal fillers, laser treatments, microneedling, skin rejuvenation
                  and medical aesthetics.
                </p>
                <p className="mt-4 text-base md:text-lg text-slate-700 leading-relaxed">
                  TotalAuthority shows you whether your med spa appears in those answers, which
                  competitors are being recommended instead, and which sources are influencing
                  the results. We then build the external authority, earned media, content and
                  brand signals needed to improve your visibility.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href="/llm-visibility-audit"
                    className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-7 py-4 rounded-lg font-semibold shadow-lg shadow-orange-900/20 transition-colors"
                  >
                    Get Your AI Visibility Audit
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
                  See how your med spa is mentioned, cited and compared across leading AI platforms.
                </p>

                <div className="mt-8 pt-6 border-t border-slate-200 flex items-center gap-2 text-xs font-medium tracking-wide text-slate-500">
                  <Sparkles className="w-4 h-4 text-orange-500" />
                  Measured across ChatGPT, Gemini and Perplexity
                </div>
              </div>

              <div className="lg:col-span-6">
                <AuditHeroVisual />
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
              Your next patient may ask AI before they search Google
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-5">
              People are increasingly using AI platforms to shortlist providers, compare
              treatments and decide which clinics appear credible. They are asking questions
              such as:
            </p>
            <ul className="space-y-2.5 mb-8">
              {[
                'Who offers the best Hydrafacial near me?',
                'Which med spa is best for natural-looking Botox?',
                'Where should I go for RF microneedling?',
                'Which clinic has the strongest reviews for dermal fillers?',
                'Who is a trusted provider for laser skin rejuvenation?',
                'Which med spa specialises in acne scarring or sun damage?',
              ].map((q) => (
                <li key={q} className="flex items-start gap-3 text-slate-700">
                  <span className="text-orange-500 mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" />
                  <span className="italic">"{q}"</span>
                </li>
              ))}
            </ul>
            <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-4">
              AI can answer those questions without sending the user through a traditional list
              of search results. Your clinic may have an excellent reputation, experienced
              practitioners and hundreds of positive reviews. That does not guarantee you will
              be included.
            </p>
            <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-8">
              AI systems form their answers using the sources and signals they can find across
              the wider web. If your competitors are better represented across those sources,
              they may be recommended ahead of you.
            </p>

            <div className="border-l-4 border-orange-600 bg-orange-50/50 pl-6 py-5 pr-5 rounded-r-lg">
              <p className="text-lg md:text-xl font-semibold text-slate-900 leading-snug">
                The clinic being recommended is not necessarily the best clinic. It is often the
                clinic with the clearest and strongest visible authority.
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
                Find out exactly where your med spa stands
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                Our Multi-Model AI Visibility Audit tests the commercially valuable questions
                your patients are likely to ask. We don't simply search for your brand name. We
                test the treatment, service and local discovery prompts that could lead to a new
                consultation.
              </p>
            </div>

            {/* Prompt categories */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 md:p-8 mb-12">
              <h3 className="text-sm font-semibold tracking-[0.16em] uppercase text-slate-500 mb-5">
                Example prompt categories we test
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  'Best med spa in your city',
                  'Best Botox or Dysport provider',
                  'Best dermal filler clinic',
                  'Best Hydrafacial provider',
                  'Best microneedling treatment',
                  'Best laser hair removal clinic',
                  'Best IPL or photofacial provider',
                  'Best chemical peel clinic',
                  'Best acne treatment med spa',
                  'Best skin rejuvenation clinic',
                ].map((p) => (
                  <div
                    key={p}
                    className="flex items-start gap-2.5 text-sm text-slate-700 bg-orange-50/30 border border-orange-100 rounded-lg px-3 py-2.5"
                  >
                    <Search className="w-3.5 h-3.5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>"{p}"</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Audit output cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Overall AI Visibility Score',
                  body: 'A clear baseline showing how consistently your med spa appears across the audited answers.',
                  icon: BarChart3,
                },
                {
                  title: 'Model-by-Model Results',
                  body: 'Separate visibility scores for ChatGPT, Gemini and Perplexity.',
                  icon: Layers,
                },
                {
                  title: 'Mention and Citation Tracking',
                  body: 'We identify whether your med spa appeared, whether your website was cited, whether you were actively recommended, and whether your positioning was accurately understood.',
                  icon: UserCheck,
                },
                {
                  title: 'Prompt Visibility Map',
                  body: 'A simple view showing the services and searches where your clinic is mentioned, not mentioned, recommended or cited.',
                  icon: Target,
                },
              ].map((card) => (
                <article
                  key={card.title}
                  className="rounded-xl border border-slate-200 bg-white p-6 md:p-7 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-11 h-11 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center mb-4">
                    <card.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                    {card.body}
                  </p>
                </article>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/llm-visibility-audit"
                className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-7 py-4 rounded-lg font-semibold shadow-lg shadow-orange-900/20"
              >
                Audit My Med Spa
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
                See who AI recommends instead
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                A missing recommendation is only part of the picture. The more useful question
                is which competitors appear instead, how frequently they are recommended, and
                why AI associates them more strongly with a treatment or location.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 items-start">
              <div>
                <h3 className="text-sm font-semibold tracking-[0.16em] uppercase text-slate-500 mb-4">
                  Our audit identifies
                </h3>
                <ul className="space-y-3">
                  {[
                    'Competitors appearing across multiple AI models',
                    'Clinics repeatedly recommended for priority treatments',
                    'Competitors associated with particular services',
                    'The prompts where your clinic is absent',
                    'The websites supporting competitor recommendations',
                    'The businesses gaining visibility despite having weaker real-world credentials',
                  ].map((it) => (
                    <li key={it} className="flex items-start gap-3 text-slate-700">
                      <CheckCircle2 className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-base text-slate-700 leading-relaxed mt-6 italic">
                  This gives you a practical competitive view based on AI-generated
                  recommendations, rather than assumptions about who your online competitors
                  are.
                </p>
              </div>

              {/* Competitor table mock */}
              <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                <div className="px-5 py-3 border-b border-slate-200 bg-slate-50 text-xs font-semibold tracking-[0.16em] uppercase text-slate-500">
                  Recurring competitors
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
                    {[
                      { name: 'Glow Aesthetics', m: 3, p: 7, f: '23×' },
                      { name: 'Refine Med Spa', m: 2, p: 5, f: '14×' },
                      { name: 'Lumen Skin Lab', m: 3, p: 4, f: '11×' },
                      { name: 'Atelier Aesthetics', m: 1, p: 3, f: '6×' },
                      { name: 'Vue Med Spa', m: 2, p: 2, f: '5×' },
                    ].map((c, i) => (
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
                Discover which sources are influencing AI
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                Improving AI visibility is not only a website project. AI platforms may rely on
                editorial media coverage, industry publications, local recommendation pages,
                review platforms, directories, listicles, Reddit discussions, professional
                profiles, treatment comparison pages, competitor websites, social profiles and
                your own treatment and location pages.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                Our source analysis identifies which websites appear most frequently across the
                answers being generated in your market. This allows us to see where your brand
                is already represented, where competitors have an advantage, and where new
                authority needs to be created.
              </p>
            </div>

            <div className="bg-slate-900 text-white rounded-2xl p-8 md:p-10 mb-10">
              <p className="text-xl md:text-2xl leading-relaxed">
                Your website tells AI what you say about yourself.{' '}
                <span className="text-orange-300 font-semibold">
                  Third-party sources help validate whether that claim should be trusted.
                </span>
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Top Recurring Sources',
                  body: 'The websites appearing most frequently across audited answers.',
                  items: ['RealSelf', 'Allure', 'Healthline', 'Local press'],
                },
                {
                  title: 'Used Across Multiple AI Models',
                  body: 'Sources relied upon by more than one platform.',
                  items: ['Reddit', 'NYT Wellness', 'NPR Health'],
                },
                {
                  title: 'Owned vs Third-Party Signals',
                  body: 'A comparison between citations from your own website and appearances from external sources.',
                  items: ['Your domain: 23%', 'Third-party: 77%'],
                },
              ].map((card) => (
                <article
                  key={card.title}
                  className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">{card.body}</p>
                  <div className="flex flex-wrap gap-2">
                    {card.items.map((i) => (
                      <span
                        key={i}
                        className="inline-flex text-[11px] font-medium text-slate-700 bg-orange-50 border border-orange-100 rounded-full px-2.5 py-1"
                      >
                        {i}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
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
                Does AI understand what you want to be known for?
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                Being mentioned is not enough if your med spa is associated with the wrong
                services or described too generically. We compare what you want AI to understand
                with what the platforms currently say about your clinic.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-semibold tracking-[0.16em] uppercase text-slate-500 mb-4">
                  Positioning examples
                </h3>
                <ul className="space-y-3">
                  {[
                    'Leading med spa for advanced skin rejuvenation',
                    'Trusted provider for natural-looking injectables',
                    'Specialist clinic for acne scarring and skin texture',
                    'Local authority for RF microneedling',
                    'Premier provider of Hydrafacial treatments',
                    'Medically led clinic for cosmetic aesthetics',
                    'Multi-location provider with experienced injectors',
                  ].map((it) => (
                    <li key={it} className="flex items-start gap-3 text-slate-700">
                      <Award className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold tracking-[0.16em] uppercase text-slate-500 mb-4">
                  We assess whether AI accurately understands
                </h3>
                <ul className="space-y-2.5">
                  {[
                    'Who your clinic serves',
                    'Where you operate',
                    'Which treatments you specialise in',
                    'What differentiates your approach',
                    'Who your practitioners are',
                    'Which credentials support your expertise',
                    'Which problems you are best placed to treat',
                    'How your clinic compares with local competitors',
                  ].map((it) => (
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

            <div className="mt-10 bg-orange-50 border border-orange-200 rounded-xl p-6 md:p-7">
              <p className="text-lg md:text-xl font-semibold text-slate-900 leading-snug">
                Your brand needs to be consistently understood before it can be consistently
                recommended.
              </p>
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
                We build the authority behind the recommendation
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                TotalAuthority is an AI visibility and authority-building agency. We identify
                the external signals influencing recommendations, create the strategy needed to
                strengthen them, and execute the work required to build a more visible and
                defensible brand.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                This combines AI visibility analysis with digital PR, earned media, content,
                entity optimisation, citation building and external authority development.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  num: '01',
                  title: 'Multi-Model AI Visibility Auditing',
                  body: 'High-intent prompts tested across ChatGPT, Gemini and Perplexity. We measure mentions, citations, recommendations, positioning, treatment-level visibility, local visibility, competitors and sources.',
                  icon: Search,
                },
                {
                  num: '02',
                  title: 'AI Authority Strategy Blueprint',
                  body: 'The Blueprint turns audit findings into a prioritised execution plan: competitors, sources, AI-cited rankings, website alignment, third-party gaps, PR opportunities, citations and content priorities.',
                  icon: FileText,
                  href: '/strategy-blueprint',
                },
                {
                  num: '03',
                  title: 'Earned Media and Digital PR',
                  body: 'We position your qualified practitioners as expert sources for journalists covering medical aesthetics, skincare, injectables, healthy ageing and dermatology — for editorial features, expert commentary and authoritative backlinks.',
                  icon: Megaphone,
                },
                {
                  num: '04',
                  title: 'Third-Party Authority Development',
                  body: 'We strengthen your presence across industry directories, review platforms, practitioner profiles, local business resources, treatment comparison pages and professional associations.',
                  icon: Layers,
                },
                {
                  num: '05',
                  title: 'Brand and Entity Alignment',
                  body: 'We align business names, locations, practitioner biographies, credentials, treatment categories, social profiles, directory listings and website schema so AI systems build a clearer understanding of the business.',
                  icon: UserCheck,
                },
                {
                  num: '06',
                  title: 'Citable Content and Authority Assets',
                  body: 'Original research, treatment guides, practitioner-led explainers, safety resources, comparison pages, patient decision tools and proprietary data — each asset has a defined role in the authority strategy.',
                  icon: FileText,
                },
                {
                  num: '07',
                  title: 'Ongoing AI Visibility Tracking',
                  body: 'We continue testing the prompts most valuable to your clinic: recommendation frequency, brand mentions, treatment-level visibility, competitor share of voice, citation sources and positioning accuracy.',
                  icon: BarChart3,
                },
              ].map((p) => (
                <article
                  key={p.num}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 md:p-7 shadow-sm hover:shadow-md hover:border-orange-200 transition-all flex flex-col"
                >
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs font-semibold tracking-[0.16em] uppercase text-orange-600">
                      {p.num}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                      <p.icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2.5 leading-tight">
                    {p.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed flex-1">{p.body}</p>
                  {p.href && (
                    <Link
                      href={p.href}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-orange-600 hover:text-orange-700"
                    >
                      Learn more <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 8. EARNED MEDIA DIFFERENTIATOR                                   */}
        {/* ============================================================== */}
        <section className="cv-auto py-20 md:py-28 px-4 bg-white border-t border-slate-200/70">
          <div className="max-w-5xl mx-auto">
            <SectionEyebrow>Earned Media</SectionEyebrow>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-6 text-balance">
              Real authority is earned outside your own website
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-4">
              Every med spa can publish claims about being trusted, experienced or clinically
              led. Independent media coverage gives those claims external support.
            </p>
            <p className="text-base text-slate-700 leading-relaxed mb-6">
              When a practitioner is quoted in a recognised publication, several things happen:
            </p>
            <ul className="grid md:grid-cols-2 gap-3 mb-10">
              {[
                'The practitioner becomes associated with a relevant area of expertise',
                'The clinic earns an independent brand mention',
                'The website may receive an authoritative backlink',
                'Search engines gain another reference point',
                'AI systems gain external information about the brand',
                'Patients see evidence that the expert is trusted by journalists',
              ].map((it) => (
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
              The same piece of editorial coverage can support brand discovery, SEO, practitioner
              authority, patient confidence and AI visibility. This is why earned media forms a
              central part of the TotalAuthority process.
            </p>

            <div className="border-t border-slate-200 pt-10">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-500 mb-6">
                Publications featuring our clients and their experts
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4 items-center">
                {['BBC', 'Bloomberg', 'Business Insider', 'Forbes', 'Mashable', 'The New York Times', 'Yahoo', 'MSN'].map(
                  (name) => (
                    <div
                      key={name}
                      className="text-center text-base md:text-lg font-semibold text-slate-400 hover:text-slate-700 transition-colors"
                    >
                      {name}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 9. PRACTITIONER AUTHORITY                                        */}
        {/* ============================================================== */}
        <section className="cv-auto py-20 md:py-28 px-4 bg-slate-50/40">
          <div className="max-w-5xl mx-auto">
            <SectionEyebrow>Practitioner Authority</SectionEyebrow>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-6 text-balance">
              Patients trust practitioners, not faceless clinic pages
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-4">
              In medical aesthetics, the person performing the treatment can be as important as
              the clinic itself. Your medical director, injectors, aestheticians and clinical
              specialists hold expertise that can strengthen the authority of the entire brand.
            </p>
            <p className="text-base text-slate-700 leading-relaxed mb-8">
              We help develop that expertise into visible authority through:
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
              {[
                'Practitioner positioning',
                'Expert biographies',
                'Credential alignment',
                'Media commentary',
                'Journalist profiles',
                'Author pages',
                'Topic specialisation',
                'Podcast appearances',
                'Broadcast opportunities',
                'Expert-led content',
                'Professional citations',
              ].map((i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 text-sm text-slate-700 bg-white border border-slate-200 rounded-lg px-3 py-2.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                  {i}
                </span>
              ))}
            </div>
            <p className="text-base text-slate-700 leading-relaxed italic">
              A practitioner with genuine expertise can become a recognised source for both
              patients and journalists. That authority then supports the clinic they represent.
            </p>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 10. TREATMENT VISIBILITY                                         */}
        {/* ============================================================== */}
        <section className="cv-auto py-20 md:py-28 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl mb-12">
              <SectionEyebrow>Treatment Visibility</SectionEyebrow>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-5 text-balance">
                Build visibility around the treatments that generate revenue
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                Your campaign should not chase vague visibility. It should strengthen the
                association between your clinic, location, practitioners and the services you
                want to grow.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 md:p-8 mb-8">
              <h3 className="text-sm font-semibold tracking-[0.16em] uppercase text-slate-500 mb-5">
                A med spa strategy may focus on
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                {[
                  'Botox',
                  'Dysport',
                  'Dermal fillers',
                  'Lip augmentation',
                  'Facial balancing',
                  'Hydrafacial',
                  'RF microneedling',
                  'Traditional microneedling',
                  'IPL photorejuvenation',
                  'Laser skin resurfacing',
                  'Chemical peels',
                  'Laser hair removal',
                  'Acne treatments',
                  'Skin tightening',
                  'Body contouring',
                  'Medical-grade skincare',
                  'Hair restoration',
                  'Medical weight loss',
                  'Permanent makeup',
                  'Nano brows',
                  'Microblading',
                ].map((t) => (
                  <span
                    key={t}
                    className="text-sm font-medium text-slate-700 bg-orange-50/50 border border-orange-100 rounded-lg px-3 py-2 text-center"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-lg text-slate-700 leading-relaxed italic max-w-3xl">
              A clinic may be highly visible for one treatment and completely absent for
              another. Our process exposes those differences. Every treatment area is reviewed
              separately because the competitors, sources and authority signals can differ
              considerably.
            </p>
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
                Our Process
              </p>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-5 text-balance">
                From AI visibility baseline to authority building
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  n: '01',
                  t: 'Define the Commercial Priorities',
                  b: 'We identify the treatments, locations and patient searches most valuable to your clinic. This prevents the campaign from becoming a broad exercise with no commercial focus.',
                },
                {
                  n: '02',
                  t: 'Complete the Multi-Model Audit',
                  b: 'We test relevant prompts across ChatGPT, Gemini and Perplexity. We document mentions, recommendations, citations, competitors and sources.',
                },
                {
                  n: '03',
                  t: 'Build the Strategy Blueprint',
                  b: 'We analyse why competitors are appearing, which sources are influencing results and where your authority footprint is weak. You receive a prioritised roadmap for implementation.',
                },
                {
                  n: '04',
                  t: 'Strengthen the Foundation',
                  b: 'We improve the clarity and consistency of brand positioning, practitioner entities, treatment associations, profiles, website information, citations, structured data and local signals.',
                },
                {
                  n: '05',
                  t: 'Build External Authority',
                  b: 'We execute the work across earned media, digital PR, expert positioning, third-party profiles, relevant directories, citable content, authority assets and external mentions.',
                },
                {
                  n: '06',
                  t: 'Track and Refine',
                  b: 'We monitor how visibility changes across the target prompts and compare progress with the competitors identified in the original audit.',
                },
              ].map((s) => (
                <div
                  key={s.n}
                  className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 md:p-7 hover:bg-white/[0.07] transition-colors"
                >
                  <div className="text-3xl font-bold text-orange-400 tabular-nums mb-3">{s.n}</div>
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
                AI visibility, before and after
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                AI visibility improvement should be measured through several indicators rather
                than one isolated answer.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 md:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-slate-200 text-slate-600 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">Before</h3>
                </div>
                <ul className="space-y-2.5">
                  {[
                    'The clinic appears inconsistently',
                    'Important treatment prompts produce no mention',
                    'Competitors dominate recommendations',
                    'AI uses weak or inaccurate positioning',
                    'The website receives few citations',
                    'Practitioners have little external authority',
                    'Third-party source coverage is limited',
                    'The clinic does not know which sources influence results',
                  ].map((it) => (
                    <li
                      key={it}
                      className="flex items-start gap-2.5 text-sm text-slate-700"
                    >
                      <span className="w-1.5 h-1.5 mt-2 rounded-full bg-slate-400 flex-shrink-0" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 to-white p-6 md:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">After</h3>
                </div>
                <ul className="space-y-2.5">
                  {[
                    'The clinic appears across more valuable prompts',
                    'Priority treatments have stronger brand association',
                    'Brand descriptions become more accurate',
                    'Practitioner expertise is clearer',
                    'More trusted sources mention the clinic',
                    'The website earns relevant citations',
                    'Competitive gaps begin to reduce',
                    'Progress is monitored across multiple AI platforms',
                  ].map((it) => (
                    <li
                      key={it}
                      className="flex items-start gap-2.5 text-sm text-slate-800 font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4 mt-0.5 text-orange-500 flex-shrink-0" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-l-4 border-slate-300 pl-5 py-2 text-sm text-slate-600 leading-relaxed max-w-3xl">
              <strong className="text-slate-800">Important qualification:</strong> No agency
              controls the answers generated by ChatGPT, Gemini, Perplexity or any other
              independent platform. Our role is to improve the quality, clarity and authority
              of the sources and signals those systems may rely upon.
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
              Built for med spas with genuine expertise to promote
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-10">
              TotalAuthority is best suited to established clinics that have credible
              practitioners, strong patient care and the capacity to convert increased
              visibility into consultations.
            </p>

            <h3 className="text-sm font-semibold tracking-[0.16em] uppercase text-slate-500 mb-4">
              Best-fit clinic types
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
              {[
                'Established single-location med spas',
                'Multi-location med spa groups',
                'Medical director-led clinics',
                'Plastic surgery and aesthetics practices',
                'Dermatology-led aesthetic clinics',
                'Injectable clinics',
                'Skin and laser clinics',
                'Medical weight-loss and aesthetics providers',
                'Med spas entering new cities',
                'Clinic groups building acquisition value',
                'Practitioner-led brands',
                'Med spas operating in competitive local markets',
              ].map((i) => (
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
                <strong className="text-slate-900">Qualification:</strong> We build authority
                around real expertise. The clinic must be able to support its positioning
                through appropriate qualifications, credible treatment experience and
                responsible patient communication.
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
                Why med spas lose AI visibility
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  t: 'Strong reputation, weak external evidence',
                  b: 'The clinic may have loyal patients but very few independent sources confirming its expertise.',
                },
                {
                  t: 'Practitioner expertise is hidden',
                  b: 'Highly qualified professionals are presented through short team biographies with little external recognition.',
                },
                {
                  t: 'The brand is associated with the wrong services',
                  b: 'AI may recognise the clinic but connect it more strongly with secondary treatments than its commercial priorities.',
                },
                {
                  t: 'Competitors occupy the trusted sources',
                  b: 'Other clinics appear in the directories, articles, reviews and comparison pages AI is already using.',
                },
                {
                  t: 'Website content is too generic',
                  b: 'Treatment pages repeat the same information found on hundreds of other med spa websites.',
                },
                {
                  t: 'Local and brand information conflicts',
                  b: 'Clinic, practitioner and location details are inconsistent across profiles and third-party sources.',
                },
                {
                  t: 'Marketing is focused entirely on social media',
                  b: 'The clinic receives attention through Instagram or TikTok but has little searchable, independent authority elsewhere.',
                },
                {
                  t: 'Nobody is tracking AI recommendations',
                  b: 'The business measures rankings, traffic and paid leads without knowing whether AI platforms are recommending competitors.',
                },
              ].map((g, i) => (
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
                Not another SEO agency repackaging its existing service
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-5">
                AI visibility cannot be improved through a checklist of technical changes alone.
                TotalAuthority combines the capabilities needed to understand and influence the
                wider authority landscape.
              </p>
              <p className="text-base text-slate-700 leading-relaxed">
                The work is built around the way AI platforms are currently describing,
                comparing and recommending businesses.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {[
                {
                  t: 'Built around real outputs',
                  b: 'You receive documented prompts, model results, competitor recommendations and citation sources.',
                  icon: BarChart3,
                },
                {
                  t: 'Authority before vanity metrics',
                  b: 'The focus is on building a brand that can be validated across the wider web.',
                  icon: Award,
                },
                {
                  t: 'Earned media capability',
                  b: 'We do not simply tell you that media authority is valuable. We have the infrastructure and journalist relationships to earn it.',
                  icon: Megaphone,
                },
                {
                  t: 'Strategy connected to execution',
                  b: 'The audit and Blueprint lead directly into a defined implementation plan.',
                  icon: Target,
                },
              ].map((d) => (
                <article
                  key={d.t}
                  className="rounded-2xl border border-slate-200 bg-white p-6 md:p-7 shadow-sm"
                >
                  <div className="w-11 h-11 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center mb-4">
                    <d.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-2">
                    {d.t}
                  </h3>
                  <p className="text-sm md:text-base text-slate-600 leading-relaxed">{d.b}</p>
                </article>
              ))}
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
              Get your Med Spa AI Visibility Audit
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-10 max-w-3xl">
              See how your clinic currently appears across ChatGPT, Gemini and Perplexity. Your
              audit will examine high-intent prompts linked to your location, treatments and
              desired positioning.
            </p>

            <div className="grid lg:grid-cols-2 gap-8 mb-10">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-7 shadow-sm">
                <h3 className="text-sm font-semibold tracking-[0.16em] uppercase text-slate-500 mb-4">
                  What the audit includes
                </h3>
                <ul className="space-y-2.5">
                  {[
                    'Overall AI visibility score',
                    'ChatGPT visibility baseline',
                    'Gemini visibility baseline',
                    'Perplexity visibility baseline',
                    'Brand mention tracking',
                    'Website citation tracking',
                    'Recommendation tracking',
                    'Positioning analysis',
                    'Prompt visibility map',
                    'Recurring competitor analysis',
                    'AI source landscape',
                    'Owned vs third-party signal comparison',
                    'Recommended next step',
                  ].map((it) => (
                    <li key={it} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-orange-200 bg-gradient-to-br from-white to-orange-50/40 p-6 md:p-8 shadow-sm flex flex-col">
                <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-3">
                  Request your audit
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Your audit is reviewed using your actual brand, market, treatments and local
                  competitors.
                </p>
                <ul className="text-sm text-slate-700 space-y-1.5 mb-6">
                  <li>• First name and last name</li>
                  <li>• Business email and phone</li>
                  <li>• Med spa name and website</li>
                  <li>• Primary location and number of locations</li>
                  <li>• Most important treatments</li>
                  <li>• Treatments you want to grow</li>
                </ul>
                <div className="mt-auto space-y-3">
                  <Link
                    href="/llm-visibility-audit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-4 rounded-lg font-semibold shadow-lg shadow-orange-900/20 transition-colors"
                  >
                    Get My Med Spa Audit
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
                  Next step after the audit
                </p>
                <h3 className="text-xl md:text-2xl font-semibold mb-2">
                  Turn findings into a clear execution plan
                </h3>
                <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                  The AI Authority Strategy Blueprint takes the audit's baseline and sets out
                  the prioritised work needed across competitors, sources, media, website
                  positioning, profiles, citations and content.
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
                Authority building you can see
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                Real evidence rather than broad claims — across audit outputs, earned media,
                authority case studies and client testimonials.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {[
                {
                  t: 'AI Visibility Audit Example',
                  b: 'Anonymised reports showing overall score, mentions across each model, website citations, prompt visibility map, competitor recommendations and source landscape.',
                  icon: BarChart3,
                },
                {
                  t: 'Earned Media Results',
                  b: 'Tier-one editorial coverage, dofollow media links, practitioner quotes, broadcast opportunities, podcast placements and journalist relationships.',
                  icon: Megaphone,
                },
                {
                  t: 'Authority Case Studies',
                  b: 'Client category, initial authority gap, work completed, media secured, visibility or SEO outcome and campaign duration.',
                  icon: FileText,
                },
                {
                  t: 'Client Testimonials',
                  b: 'Quotes that reference quality of publications, strategic insight, communication, brand authority, measurable growth and practitioner positioning.',
                  icon: Award,
                },
              ].map((p) => (
                <article
                  key={p.t}
                  className="rounded-2xl border border-slate-200 bg-white p-6 md:p-7 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-11 h-11 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center mb-4">
                    <p.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-2">
                    {p.t}
                  </h3>
                  <p className="text-sm md:text-base text-slate-600 leading-relaxed">{p.b}</p>
                </article>
              ))}
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
                What makes this different from traditional med spa marketing?
              </h2>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-900 text-white text-[10px] uppercase tracking-wider">
                    <th className="px-5 py-3 text-left font-semibold">Traditional marketing</th>
                    <th className="px-5 py-3 text-left font-semibold">TotalAuthority approach</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [
                      'Run paid ads for immediate leads',
                      'Build an authority footprint that supports discovery across multiple channels',
                    ],
                    [
                      'Publish generic treatment blogs',
                      'Create content and assets designed around specific citation and authority opportunities',
                    ],
                    [
                      'Track Google rankings alone',
                      'Track mentions, citations and recommendations across multiple AI platforms',
                    ],
                    [
                      'Promote claims made by the clinic',
                      'Earn independent support from trusted third parties',
                    ],
                    [
                      'Focus on the clinic brand only',
                      'Build the authority of the clinic and its practitioners',
                    ],
                    [
                      'Build backlinks as isolated SEO assets',
                      'Build connected media, brand, entity and citation signals',
                    ],
                    [
                      'Measure social engagement',
                      'Measure treatment visibility, competitor share and source influence',
                    ],
                    [
                      'Optimise only the website',
                      'Strengthen the wider source environment surrounding the clinic',
                    ],
                  ].map(([a, b], i) => (
                    <tr
                      key={a}
                      className={`${i % 2 ? 'bg-slate-50/60' : 'bg-white'} border-t border-slate-200`}
                    >
                      <td className="px-5 py-4 text-slate-600">{a}</td>
                      <td className="px-5 py-4 text-slate-900 font-medium">{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 20. FAQ                                                          */}
        {/* ============================================================== */}
        <section id="faqs" className="scroll-mt-36 cv-auto py-20 md:py-28 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <SectionEyebrow>FAQs</SectionEyebrow>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-10 text-balance">
              Frequently asked questions
            </h2>
            <div className="space-y-3">
              {[
                {
                  q: 'What is AI visibility for a med spa?',
                  a: 'AI visibility refers to whether your clinic appears when people ask platforms such as ChatGPT, Gemini and Perplexity for recommendations, comparisons or information about treatments in your area. It also includes whether your website is cited, whether your clinic is accurately described, and whether your practitioners are recognised for relevant expertise.',
                },
                {
                  q: 'How do you measure our visibility?',
                  a: "We create a defined set of high-intent prompts based on your treatments, location and commercial priorities. We then audit the answers across ChatGPT, Gemini and Perplexity, recording brand mentions, website citations, direct recommendations, competitors and source usage.",
                },
                {
                  q: 'Can you guarantee that AI will recommend us?',
                  a: 'No. The platforms operate independently and their answers can change. We strengthen the authority, relevance, consistency and third-party evidence connected with your brand. These are the areas most likely to improve how your clinic is understood and considered.',
                },
                {
                  q: 'Is AI visibility the same as SEO?',
                  a: 'No, but the two are connected. SEO focuses heavily on website rankings and organic traffic. AI visibility also includes third-party mentions, citations, practitioner entities, reviews, external profiles, editorial coverage and the sources used to produce generated answers. Strong authority building can support both.',
                },
                {
                  q: 'Does our med spa still need local SEO?',
                  a: 'Yes. Patients still use Google Search and Google Maps, while AI platforms may also rely on local business information. TotalAuthority complements local SEO by developing broader brand, practitioner, media and third-party authority.',
                },
                {
                  q: 'Why is earned media part of the strategy?',
                  a: 'Editorial coverage gives your clinic independent recognition. It can connect your practitioners with relevant expertise, create authoritative mentions, earn backlinks and give both patients and AI systems additional sources through which to validate the brand.',
                },
                {
                  q: 'Do you work on our website?',
                  a: 'Website alignment can form part of the implementation plan. This may include positioning, treatment associations, practitioner information, citable content, entity clarity, structured data and internal site recommendations. The work is directed by the gaps identified in the audit and Blueprint.',
                },
                {
                  q: 'Do you create content?',
                  a: 'Yes, where content has a clear authority purpose. This can include expert resources, original research, treatment guides, comparison pages, reports and other assets that may support citations, media outreach and patient education.',
                },
                {
                  q: 'Can you promote individual injectors and practitioners?',
                  a: 'Yes, provided their experience and credentials support the positioning. Practitioner authority can include media commentary, expert biographies, topic specialisation, professional profiles and expert-led content.',
                },
                {
                  q: 'Can you help a multi-location med spa group?',
                  a: 'Yes. Multi-location clinics need clear connections between the parent brand, each location, practitioners, treatment offerings, local profiles and external mentions. The audit and strategy can be structured around individual markets or the wider group.',
                },
                {
                  q: 'How quickly will visibility improve?',
                  a: 'There is no universal timeframe. Some improvements can occur after clearer information or stronger source coverage is discovered. Building a defensible authority footprint requires sustained execution across several areas. Progress should be judged across multiple prompts and models rather than one isolated result.',
                },
                {
                  q: 'What happens after the audit?',
                  a: 'The next stage is the AI Authority Strategy Blueprint. This expands the baseline findings into a prioritised plan covering competitors, sources, media, website positioning, profiles, citations, content and authority assets. TotalAuthority can then execute the strategy.',
                },
              ].map((f, i) => {
                const open = openFaq === i;
                return (
                  <div
                    key={f.q}
                    className="rounded-xl border border-slate-200 bg-white overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(open ? null : i)}
                      className="w-full text-left px-5 md:px-6 py-4 flex items-center justify-between gap-4 hover:bg-slate-50"
                      aria-expanded={open}
                    >
                      <span className="font-semibold text-slate-900 text-sm md:text-base">
                        {f.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-500 transition-transform ${
                          open ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {open && (
                      <div className="px-5 md:px-6 pb-5 text-sm md:text-base text-slate-700 leading-relaxed">
                        {f.a}
                      </div>
                    )}
                  </div>
                );
              })}
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
              AI visibility for adjacent clinical specialties
            </h2>
            <p className="text-slate-600 mb-8 max-w-2xl">
              Explore how TotalAuthority approaches visibility and authority building for other
              clinical and practitioner-led businesses.
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
              Find out where you stand
            </p>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6 text-balance">
              Is AI recommending your med spa, or your competitors?
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed mb-10 max-w-2xl mx-auto">
              Your clinic may already be visible for some treatments and absent for others. The
              only way to know is to test the questions your prospective patients are asking,
              examine the competitors appearing instead, and identify the sources influencing
              those answers. Start with a clear visibility baseline. Then build the authority
              required to compete.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/llm-visibility-audit"
                className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-7 py-4 rounded-lg font-semibold shadow-lg shadow-orange-900/30"
              >
                Get Your Med Spa AI Visibility Audit
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
              Measured across ChatGPT, Gemini and Perplexity using prompts tailored to your
              clinic, treatments and location.
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
          Audit My Med Spa
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <Footer onOpenForm={openForm} />
      <FormPopup isOpen={isOpen} onClose={closeForm} />
      <ScheduleCallPopup isOpen={isScheduleCallOpen} onClose={closeScheduleCall} />
    </div>
  );
};

export default MedSpasClient;
