"use client";

import React, { useEffect, useRef } from 'react';
import Script from 'next/script';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FormPopup } from '@/components/FormPopup';
import { useFormPopup } from '@/hooks/useFormPopup';
import {
  ArrowDown,
  Stethoscope,
  BarChart3,
  Sparkles,
  CheckCircle2,
  Lock,
  FileText,
  Instagram,
  Globe2,
  ShieldCheck,
  MessageSquareText,
  TrendingUp,
  Quote,
  Building2,
  Microscope,
} from 'lucide-react';

const VERTICALS = [
  'Med Spa',
  'Plastic Surgery',
  'Dermatology',
  'Hair Transplant',
  'Fertility',
  'Cosmetic Dentistry',
];

const HEADLINE_STATS = [
  { number: '1,005', label: 'ChatGPT prompts run', sub: 'Real clinic-recommendation queries' },
  { number: '61,531', label: 'Source citations analyzed', sub: 'Every URL ChatGPT pulled from' },
  { number: '6 × 5', label: 'Sub-verticals × cities', sub: 'Med spa, plastic surgery, derm, hair, IVF, dentistry' },
  { number: '76%', label: 'Citations are your own site', sub: 'But homepages are only 11% of that' },
];

const PLATFORM_FINDINGS = [
  {
    icon: Instagram,
    title: 'Instagram beats RealSelf',
    citations: '2,617',
    insight:
      '71% of Instagram citations point to clinic and physician accounts — not patient testimonials. ChatGPT uses it as proof your business is real and currently operating.',
    accent: 'from-pink-500/15 to-orange-500/15',
    accentText: 'text-pink-600',
  },
  {
    icon: Globe2,
    title: 'RealSelf is a directory, not a review site',
    citations: '2,174',
    insight:
      "40% of RealSelf citations go to /find/[procedure]/[city] landing pages. Your individual reviews matter only as the upstream signal that ranks you on those pages.",
    accent: 'from-orange-500/15 to-amber-500/15',
    accentText: 'text-orange-600',
  },
  {
    icon: ShieldCheck,
    title: 'Professional societies are the unsung kingmakers',
    citations: '6.2%',
    insight:
      'ISHRS, ASPS, SART, AAD directory listings cost $200–$2,000/year and are cited more than most paid ad campaigns ever achieve. Membership without a complete profile is wasted spend.',
    accent: 'from-blue-500/15 to-cyan-500/15',
    accentText: 'text-blue-600',
  },
  {
    icon: MessageSquareText,
    title: 'Reddit is the quality-evidence layer',
    citations: '629',
    insight:
      '99% of Reddit citations are specific threads (not subreddits). A single positive r/[city] mention is worth more than 10 paid ads for "best of city" prompts.',
    accent: 'from-rose-500/15 to-red-500/15',
    accentText: 'text-rose-600',
  },
  {
    icon: FileText,
    title: 'Your blog is the #2 driver — bigger than your homepage',
    citations: '18%',
    insight:
      'Blog + deep content = 12,364 citations vs 4,955 for homepages across all clinic-owned sources. "Blogging is dead" is wrong for AI search.',
    accent: 'from-emerald-500/15 to-teal-500/15',
    accentText: 'text-emerald-600',
  },
  {
    icon: Microscope,
    title: 'Fertility is ruled by outcomes data',
    citations: '17.2%',
    insight:
      "SART's public outcomes report alone drives 260 fertility citations. ChatGPT reads your IVF cycle numbers directly — marketing copy cannot override what your SART data says.",
    accent: 'from-violet-500/15 to-indigo-500/15',
    accentText: 'text-violet-600',
  },
];

const WHATS_INSIDE = [
  {
    title: 'The 4 mechanisms ChatGPT uses to recommend clinics',
    detail:
      'Existence proof, authority validation, outcomes evidence, education layer — and the exact source types that feed each one.',
  },
  {
    title: 'Platform-by-platform citation breakdown',
    detail:
      'Instagram, RealSelf, YouTube, Reddit, professional societies — what page type is actually being cited and why.',
  },
  {
    title: 'Vertical-specific playbooks',
    detail:
      'Six separate citation-mix tables for med spa, plastic surgery, dermatology, hair transplant, fertility, and cosmetic dentistry.',
  },
  {
    title: 'The 10 actions that collapse the data into a strategy',
    detail:
      'Ordered for any clinic audit — from Instagram cadence to society directory completeness to service-page architecture.',
  },
  {
    title: 'Why most healthcare marketing playbooks fail in AI search',
    detail:
      "The 'social proof = testimonials' and 'RealSelf = reviews' myths, mechanically debunked with citation data.",
  },
  {
    title: 'A clinic-ready audit framework',
    detail:
      'The exact checklist you can run against your own digital footprint this week.',
  },
];

const FORM_EMBED_HTML = `
<iframe
  src="https://go.totalauthority.com/widget/form/0Ym4YNqnvepx6j2lYGaM"
  style="width:100%;height:640px;border:none;border-radius:12px;background:white"
  id="inline-0Ym4YNqnvepx6j2lYGaM"
  data-layout='{"id":"INLINE"}'
  data-trigger-type="alwaysShow"
  data-trigger-value=""
  data-activation-type="alwaysActivated"
  data-activation-value=""
  data-deactivation-type="neverDeactivate"
  data-deactivation-value=""
  data-form-name="Medical Clinic Prompt Study"
  data-height="640"
  data-layout-iframe-id="inline-0Ym4YNqnvepx6j2lYGaM"
  data-form-id="0Ym4YNqnvepx6j2lYGaM"
  title="Medical Clinic Prompt Study"
></iframe>
`;

const HealthcareAIVisibilityStudy = () => {
  const { isOpen, openForm, closeForm } = useFormPopup();
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <Script
        src="https://go.totalauthority.com/js/form_embed.js"
        strategy="afterInteractive"
      />

      <div className="min-h-screen bg-gradient-to-b from-white via-orange-50/30 to-white">
        <Header onOpenForm={openForm} />

        {/* HERO */}
        <section className="relative overflow-hidden pt-24 pb-20 px-4">
          {/* Crosshatch background */}
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(0deg, #000 1px, transparent 1px),
                linear-gradient(90deg, #000 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />
          {/* Soft orange glow */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-orange-200/40 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 border border-orange-200 rounded-full mb-6">
                  <Stethoscope className="w-4 h-4 text-orange-700" />
                  <span className="text-sm font-semibold text-orange-900 tracking-wide uppercase">
                    Healthcare AI Visibility Study · 2026
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.05] mb-6">
                  What <span className="text-orange-600">1,005 ChatGPT prompts</span> reveal about how clinics
                  actually get recommended.
                </h1>

                <p className="text-lg md:text-xl text-slate-700 leading-relaxed mb-8 max-w-2xl">
                  We analyzed <strong className="text-slate-900">61,531 source citations</strong> across
                  six healthcare verticals and five U.S. cities to map the exact pages ChatGPT pulls when a
                  patient asks for a clinic recommendation. The findings break almost every
                  healthcare-marketing assumption.
                </p>

                <div className="flex flex-wrap gap-3 mb-8">
                  {VERTICALS.map((v) => (
                    <span
                      key={v}
                      className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700 shadow-sm"
                    >
                      {v}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={scrollToForm}
                    className="group inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-5 text-lg font-bold rounded-2xl shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    Get the Full Study (Free)
                    <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                  </button>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Lock className="w-4 h-4" />
                    Instant access · No credit card
                  </div>
                </div>
              </div>

              {/* Hero visual / report mockup */}
              <div className="lg:col-span-5">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-tr from-orange-300/30 via-orange-100/30 to-blue-200/30 rounded-3xl blur-2xl" />
                  <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
                    <div className="bg-slate-900 px-6 py-3 flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                      <span className="ml-3 text-xs text-slate-300 font-mono">healthcare_ai_visibility_study.pdf</span>
                    </div>
                    <div className="p-6">
                      <div className="text-[10px] font-semibold tracking-widest text-orange-600 uppercase mb-2">
                        Total Authority · Deep Dive
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight">
                        What 1,005 ChatGPT Prompts Tell Us About Healthcare Clinic Visibility
                      </h3>
                      <div className="space-y-2 mb-5">
                        <div className="h-2 bg-slate-100 rounded w-full" />
                        <div className="h-2 bg-slate-100 rounded w-11/12" />
                        <div className="h-2 bg-slate-100 rounded w-10/12" />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-orange-50 border border-orange-100 rounded-xl p-3">
                          <div className="text-2xl font-bold text-orange-600">76%</div>
                          <div className="text-[11px] text-slate-600 leading-tight">Citations on clinic-owned sites</div>
                        </div>
                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
                          <div className="text-2xl font-bold text-blue-600">2,617</div>
                          <div className="text-[11px] text-slate-600 leading-tight">Instagram citations</div>
                        </div>
                        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3">
                          <div className="text-2xl font-bold text-emerald-600">868</div>
                          <div className="text-[11px] text-slate-600 leading-tight">ISHRS directory citations</div>
                        </div>
                        <div className="bg-violet-50 border border-violet-100 rounded-xl p-3">
                          <div className="text-2xl font-bold text-violet-600">549</div>
                          <div className="text-[11px] text-slate-600 leading-tight">SART outcomes citations</div>
                        </div>
                      </div>
                    </div>
                    <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
                      <span>April–May 2026</span>
                      <span className="font-mono">12 pages · PDF</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HEADLINE STATS BAR */}
        <section className="relative px-4 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {HEADLINE_STATS.map((s) => (
                <div
                  key={s.label}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="text-4xl font-bold text-slate-900 mb-1">{s.number}</div>
                  <div className="text-sm font-semibold text-orange-600 mb-1">{s.label}</div>
                  <div className="text-xs text-slate-500 leading-snug">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* THESIS / WHY IT MATTERS */}
        <section className="py-20 px-4 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-orange-500 rounded-full blur-3xl" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
          </div>
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 rounded-full mb-6 text-xs font-semibold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              The Thesis
            </div>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-8">
              ChatGPT does not rank pages.
              <br />
              It <span className="text-orange-400">composes a recommendation</span> from a small set of sources it
              considers authoritative.
            </h2>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-6 max-w-3xl">
              Those sources fall into four mechanically distinct roles. Most healthcare marketing playbooks confuse
              them — they treat Instagram as social proof, Yelp as reviews, RealSelf as reviews. The data shows
              ChatGPT is using each platform for a much more specific job.
            </p>
            <p className="text-lg md:text-xl text-white font-semibold max-w-3xl">
              A clinic that wins in all four mechanisms is what ChatGPT recommends. A clinic that wins in two and
              loses two is <span className="text-orange-400 underline decoration-2 underline-offset-4">invisible</span>.
            </p>
          </div>
        </section>

        {/* KEY FINDINGS GRID */}
        <section className="py-24 px-4 bg-gradient-to-b from-white to-orange-50/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-100 border border-orange-200 rounded-full mb-5 text-xs font-semibold tracking-widest uppercase text-orange-900">
                <BarChart3 className="w-3.5 h-3.5" />
                A Preview of the Findings
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-5 leading-tight">
                Six findings that will change how you think about clinic visibility.
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Every percentage below is derived from classifying real source URLs — not estimates, not impressions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {PLATFORM_FINDINGS.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.title}
                    className="group relative bg-white rounded-2xl border border-slate-200 p-7 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                  >
                    <div
                      className={`absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gradient-to-br ${p.accent} blur-2xl opacity-70 group-hover:opacity-100 transition-opacity`}
                    />
                    <div className="relative">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center ${p.accentText}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-slate-900 leading-none">{p.citations}</div>
                          <div className="text-[10px] text-slate-500 tracking-widest uppercase mt-1">citations</div>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug">{p.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{p.insight}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* WHAT'S INSIDE */}
        <section className="py-24 px-4 bg-blue-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-blue-200 rounded-full mb-5 text-xs font-semibold tracking-widest uppercase text-blue-900">
                  <FileText className="w-3.5 h-3.5" />
                  What's Inside the Study
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
                  A 12-page deep dive — written for clinic owners and marketing leads.
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-8">
                  Not a fluff piece. Not a vendor sales sheet. A mechanically-grounded breakdown of every source
                  type ChatGPT cites for healthcare recommendations, with an actionable interpretation for each.
                </p>
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <div className="flex items-start gap-3 mb-3">
                    <Quote className="w-6 h-6 text-orange-500 flex-shrink-0" />
                    <p className="text-slate-700 italic leading-relaxed">
                      "The findings collapse into roughly ten actions. Order them in any audit — and a clinic that
                      executes on them moves from invisible to recommended in 60–90 days."
                    </p>
                  </div>
                  <div className="text-sm text-slate-500 pl-9">— Methodology section, page 8</div>
                </div>
              </div>

              <div className="space-y-3">
                {WHATS_INSIDE.map((item, idx) => (
                  <div
                    key={item.title}
                    className="bg-white rounded-xl border border-slate-200 p-5 hover:border-orange-300 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-9 h-9 bg-orange-100 text-orange-700 rounded-lg flex items-center justify-center font-bold text-sm">
                        {String(idx + 1).padStart(2, '0')}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">{item.detail}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* VERTICAL CITATION MIX TABLE */}
        <section className="py-24 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-100 border border-orange-200 rounded-full mb-5 text-xs font-semibold tracking-widest uppercase text-orange-900">
                <Building2 className="w-3.5 h-3.5" />
                Citation Mix Differs by Vertical
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-5">
                Each row is a different playbook.
              </h2>
              <p className="text-lg text-slate-600">
                One generic "do social media + blog" strategy is wrong for nearly every vertical. Here's the mix
                ChatGPT actually cites.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="px-5 py-4 text-left font-semibold">Vertical</th>
                    <th className="px-5 py-4 text-right font-semibold">Own site</th>
                    <th className="px-5 py-4 text-right font-semibold">Social</th>
                    <th className="px-5 py-4 text-right font-semibold">Society</th>
                    <th className="px-5 py-4 text-right font-semibold">Review agg</th>
                    <th className="px-5 py-4 text-right font-semibold">Reddit</th>
                    <th className="px-5 py-4 text-right font-semibold">Gov / Other</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    ['Med Spa', '75.8%', '10.5%', '3.8%', '5.6%', '1.5%', '1.9%'],
                    ['Plastic Surgery', '76.0%', '9.2%', '5.9%', '7.1%', '0.6%', '0.7%'],
                    ['Dermatology', '79.9%', '7.2%', '4.9%', '6.8%', '0.5%', '0.1%'],
                    ['Hair Transplant', '73.7%', '8.3%', '10.0%', '6.1%', '1.5%', '—'],
                    ['Fertility', '76.1%', '5.0%', '9.5%', '0.2%', '1.2%', '7.7%'],
                    ['Cosmetic Dentistry', '81.7%', '10.3%', '3.4%', '3.3%', '0.9%', '0.2%'],
                  ].map(([vertical, own, social, society, review, reddit, gov]) => (
                    <tr key={vertical} className="hover:bg-orange-50/40 transition-colors">
                      <td className="px-5 py-4 font-semibold text-slate-900">{vertical}</td>
                      <td className="px-5 py-4 text-right text-slate-700 font-mono">{own}</td>
                      <td className="px-5 py-4 text-right text-slate-700 font-mono">{social}</td>
                      <td className="px-5 py-4 text-right text-slate-700 font-mono">{society}</td>
                      <td className="px-5 py-4 text-right text-slate-700 font-mono">{review}</td>
                      <td className="px-5 py-4 text-right text-slate-700 font-mono">{reddit}</td>
                      <td className="px-5 py-4 text-right text-slate-700 font-mono">{gov}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 text-center mt-4">
              Source: Total Authority Healthcare AI Visibility Study · 61,531 cited URLs · April–May 2026
            </p>
          </div>
        </section>

        {/* FORM SECTION */}
        <section ref={formRef} id="get-the-study" className="py-24 px-4 bg-gradient-to-br from-orange-50 via-white to-blue-50 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(0deg, #000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-600 text-white rounded-full mb-6 text-xs font-bold tracking-widest uppercase shadow-lg shadow-orange-500/30">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Get the Full 12-Page Study
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
                  Sent straight to your inbox.
                  <br />
                  <span className="text-orange-600">Free.</span>
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-8">
                  Enter your details and we'll send you the full PDF — including the 10-action audit framework,
                  every platform-by-platform breakdown, and the vertical playbook tables.
                </p>

                <ul className="space-y-4">
                  {[
                    'Full 12-page PDF — every chart, every URL classification',
                    'The 4-mechanism framework ChatGPT uses to compose recommendations',
                    'Vertical-specific playbooks for 6 healthcare sub-niches',
                    'The 10-action clinic audit checklist',
                  ].map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-800 leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-slate-500" />
                    <p className="text-sm text-slate-600">
                      No spam. We use your email only to send the study and occasional related research. Unsubscribe anytime.
                    </p>
                  </div>
                </div>
              </div>

              {/* Form embed */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-orange-300/40 via-orange-100/30 to-blue-200/40 rounded-3xl blur-2xl" />
                <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 p-4 md:p-6">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">Send me the study</h3>
                    <p className="text-sm text-slate-500">Delivered to your inbox in under 60 seconds</p>
                  </div>
                  <div
                    className="w-full"
                    dangerouslySetInnerHTML={{ __html: FORM_EMBED_HTML }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA STRIP */}
        <section className="py-16 px-4 bg-slate-900 text-white">
          <div className="max-w-5xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Stop guessing how AI sees your clinic.
            </h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              The same data that powers Total Authority audits is in this study. Read it, run it against your own
              footprint, and know exactly where you stand.
            </p>
            <button
              onClick={scrollToForm}
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg font-bold rounded-2xl shadow-2xl shadow-orange-500/30 transition-all transform hover:-translate-y-1"
            >
              Get the Free Study
              <ArrowDown className="w-5 h-5" />
            </button>
          </div>
        </section>

        <Footer onOpenForm={openForm} />
        <FormPopup isOpen={isOpen} onClose={closeForm} />
      </div>
    </>
  );
};

export default HealthcareAIVisibilityStudy;
