"use client";

import React from 'react';
import Script from 'next/script';
import {
  CheckCircle2,
  Lock,
  Star,
  Stethoscope,
  Instagram,
  Globe2,
  ShieldCheck,
  MessageSquareText,
  FileText,
  Microscope,
  EyeOff,
} from 'lucide-react';

const HEADLINE_STATS = [
  { number: '1,005', label: 'ChatGPT prompts analyzed' },
  { number: '61,531', label: 'Source citations classified' },
  { number: '6', label: 'Healthcare verticals' },
  { number: '5', label: 'U.S. cities' },
];

const PLATFORM_FINDINGS = [
  {
    icon: Instagram,
    label: 'Social',
    teaser: 'Why one social platform out-cites every review site combined — and what kind of post ChatGPT is actually pulling.',
    color: 'text-pink-600',
    bg: 'bg-pink-50',
  },
  {
    icon: Globe2,
    label: 'Review Aggregators',
    teaser: "The page-type breakdown that proves the dominant review site isn't being used for reviews at all.",
    color: 'text-orange-600',
    bg: 'bg-orange-50',
  },
  {
    icon: ShieldCheck,
    label: 'Professional Societies',
    teaser: 'The $200–$2,000/year directory listings that out-cite most paid ad campaigns — and the one mistake that wastes the spend.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: MessageSquareText,
    label: 'Reddit',
    teaser: 'Which threads ChatGPT pulls from, why subreddit pages almost never appear, and the single mention that beats 10 paid ads.',
    color: 'text-rose-600',
    bg: 'bg-rose-50',
  },
  {
    icon: FileText,
    label: 'Own Site',
    teaser: 'The page-type that outperforms your homepage by 2.5×. "Blogging is dead" is wrong for AI search — the data shows exactly why.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    icon: Microscope,
    label: 'Outcomes Data',
    teaser: 'The public dataset ChatGPT reads directly when ranking fertility clinics — and the vertical-specific signal you can\'t outspend.',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
];

const FORM_EMBED_HTML = `
<iframe
  src="https://go.totalauthority.com/widget/form/0Ym4YNqnvepx6j2lYGaM"
  style="width:100%;min-height:520px;border:none;border-radius:8px;background:white"
  id="inline-0Ym4YNqnvepx6j2lYGaM"
  data-layout='{"id":"INLINE"}'
  data-trigger-type="alwaysShow"
  data-trigger-value=""
  data-activation-type="alwaysActivated"
  data-activation-value=""
  data-deactivation-type="neverDeactivate"
  data-deactivation-value=""
  data-form-name="Medical Clinic Prompt Study"
  data-height="520"
  data-layout-iframe-id="inline-0Ym4YNqnvepx6j2lYGaM"
  data-form-id="0Ym4YNqnvepx6j2lYGaM"
  title="Medical Clinic Prompt Study"
></iframe>
`;

const HealthcareAIVisibilityStudy = () => {
  return (
    <>
      <Script
        src="https://go.totalauthority.com/js/form_embed.js"
        strategy="afterInteractive"
      />

      <div className="min-h-screen bg-white">
        {/* HERO with FORM */}
        <section className="relative overflow-hidden bg-gradient-to-b from-orange-50/60 via-white to-white pt-16 pb-20 px-4">
          {/* subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(0deg,#000 1px,transparent 1px),linear-gradient(90deg,#000 1px,transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-orange-200/40 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              {/* LEFT — Pitch */}
              <div className="lg:col-span-7 pt-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-100 border border-orange-200 rounded-full mb-6">
                  <Stethoscope className="w-3.5 h-3.5 text-orange-700" />
                  <span className="text-xs font-bold text-orange-900 tracking-widest uppercase">
                    Free Research Report · 2026
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-slate-900 leading-[1.05] mb-6 tracking-tight">
                  What <span className="text-orange-600">1,005 ChatGPT prompts</span> reveal about how clinics
                  actually get recommended.
                </h1>

                <p className="text-lg md:text-xl text-slate-700 leading-relaxed mb-8">
                  We analyzed <strong>61,531 source citations</strong> across 6 healthcare verticals and 5 U.S.
                  cities to map the exact pages ChatGPT pulls when a patient asks for a clinic recommendation.
                </p>

                <ul className="space-y-3 mb-8">
                  {[
                    'The 4 mechanisms ChatGPT uses to compose a clinic recommendation',
                    'Platform-by-platform citation data — Instagram, RealSelf, Reddit, YouTube, professional societies',
                    'Vertical-specific playbooks for med spa, plastic surgery, dermatology, hair transplant, IVF and cosmetic dentistry',
                    'The 10-action audit framework you can run against your own clinic this week',
                  ].map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-800 leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-slate-500" />
                    Instant access · No credit card
                  </div>
                  <div className="flex items-center gap-1.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
                    ))}
                    <span className="ml-1 font-medium text-slate-700">Trusted by clinic owners & marketers</span>
                  </div>
                </div>
              </div>

              {/* RIGHT — Cover + Form */}
              <div className="lg:col-span-5 lg:sticky lg:top-24">
                <div className="relative">
                  <div className="absolute -inset-3 bg-gradient-to-tr from-orange-300/30 via-orange-100/20 to-blue-200/30 rounded-3xl blur-2xl" />
                  <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
                    {/* PDF Cover Thumbnail */}
                    <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900 px-6 py-8 text-white">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl" />
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl" />
                      <div className="relative">
                        <div className="text-[10px] font-bold tracking-[0.2em] text-orange-300 uppercase mb-2">
                          Total Authority · Deep Dive
                        </div>
                        <div className="text-lg font-bold leading-tight mb-3">
                          Healthcare AI Visibility Study
                        </div>
                        <div className="text-xs text-slate-300 mb-4 leading-snug">
                          What 1,005 ChatGPT Prompts Tell Us About Healthcare Clinic Visibility
                        </div>
                        <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-white/10 backdrop-blur border border-white/20 rounded text-[10px] font-mono">
                          12-page PDF · April–May 2026
                        </div>
                      </div>
                    </div>

                    {/* Form */}
                    <div className="p-5 md:p-6">
                      <h3 className="text-lg font-bold text-slate-900 mb-1">Get the free study</h3>
                      <p className="text-sm text-slate-500 mb-4">Delivered to your inbox in under 60 seconds.</p>
                      <div
                        className="w-full"
                        dangerouslySetInnerHTML={{ __html: FORM_EMBED_HTML }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS STRIP */}
        <section className="border-y border-slate-200 bg-slate-50 px-4 py-10">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {HEADLINE_STATS.map((s) => (
              <div key={s.label}>
                <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">{s.number}</div>
                <div className="text-xs md:text-sm text-slate-600 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* THESIS */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-100 border border-orange-200 rounded-full mb-5 text-xs font-bold tracking-widest uppercase text-orange-900">
              The Thesis
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
              ChatGPT does not rank pages.
              <br />
              It <span className="text-orange-600">composes a recommendation</span> from a small set of sources.
            </h2>
            <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
              Those sources fall into four mechanically distinct roles. Most healthcare marketing playbooks confuse
              them. A clinic that wins in all four is what ChatGPT recommends. A clinic that wins in two and loses
              two is <strong className="text-slate-900">invisible</strong>.
            </p>
          </div>
        </section>

        {/* KEY FINDINGS GRID — teaser */}
        <section className="py-16 px-4 bg-slate-50 border-y border-slate-200">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
                Six findings inside the report.
              </h2>
              <p className="text-slate-600">
                Every answer is derived from classifying real source URLs — not estimates. Download the study to see the data.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {PLATFORM_FINDINGS.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.label + idx}
                    className="group relative bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all overflow-hidden"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`inline-flex w-11 h-11 rounded-lg ${p.bg} ${p.color} items-center justify-center`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-bold tracking-widest uppercase text-slate-400">
                        <Lock className="w-3 h-3" />
                        Finding #{String(idx + 1).padStart(2, '0')}
                      </div>
                    </div>
                    <div className="text-[10px] font-bold tracking-widest uppercase text-slate-500 mb-2">
                      {p.label}
                    </div>
                    <p className="text-base text-slate-800 leading-relaxed">{p.teaser}</p>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-10">
              <a
                href="#inline-0Ym4YNqnvepx6j2lYGaM"
                className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-7 py-3.5 text-base font-bold rounded-xl shadow-lg shadow-orange-500/20 transition-all transform hover:-translate-y-0.5"
              >
                Unlock all six findings →
              </a>
            </div>
          </div>
        </section>

        {/* VERTICAL PLAYBOOKS — teaser */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-3">
                Each vertical has a different playbook.
              </h2>
              <p className="text-slate-600">
                One generic "do social + blog" strategy is wrong for nearly every vertical. The full report includes
                a citation-mix table for each.
              </p>
            </div>

            <div className="relative rounded-2xl border border-slate-200 shadow-sm overflow-hidden bg-white">
              <div className="overflow-x-auto">
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
                      'Med Spa',
                      'Plastic Surgery',
                      'Dermatology',
                      'Hair Transplant',
                      'Fertility',
                      'Cosmetic Dentistry',
                    ].map((vertical) => (
                      <tr key={vertical}>
                        <td className="px-5 py-4 font-semibold text-slate-900">{vertical}</td>
                        {[...Array(6)].map((_, i) => (
                          <td key={i} className="px-5 py-4 text-right">
                            <span className="inline-block w-12 h-3 rounded bg-slate-200" />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Lock overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-white/40 via-white/85 to-white pointer-events-none">
                <div className="pointer-events-auto bg-white rounded-2xl shadow-xl border border-slate-200 px-6 py-5 max-w-sm text-center">
                  <div className="inline-flex w-10 h-10 rounded-full bg-orange-100 text-orange-700 items-center justify-center mb-3">
                    <EyeOff className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-semibold text-slate-900 mb-3">
                    Vertical-specific citation mix is inside the full report.
                  </p>
                  <a
                    href="#inline-0Ym4YNqnvepx6j2lYGaM"
                    className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 text-sm font-bold rounded-lg transition-colors"
                  >
                    Get the data →
                  </a>
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-500 text-center mt-4">
              Source: Total Authority Healthcare AI Visibility Study · 61,531 cited URLs · April–May 2026
            </p>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-20 px-4 bg-gradient-to-br from-orange-50 via-white to-blue-50 border-t border-slate-200">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
              Stop guessing how AI sees your clinic.
            </h2>
            <p className="text-lg text-slate-700 mb-8">
              Grab the full 12-page study and the 10-action audit framework. Free.
            </p>
            <a
              href="#inline-0Ym4YNqnvepx6j2lYGaM"
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg font-bold rounded-xl shadow-2xl shadow-orange-500/30 transition-all transform hover:-translate-y-1"
            >
              Get the Free Study →
            </a>
            <p className="mt-4 text-sm text-slate-500">Sent to your inbox in under 60 seconds.</p>
          </div>
        </section>

      </div>
    </>
  );
};

export default HealthcareAIVisibilityStudy;
