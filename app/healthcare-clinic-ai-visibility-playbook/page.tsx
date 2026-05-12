"use client";

import React from 'react';
import Script from 'next/script';
import {
  CheckCircle2,
  Lock,
  Star,
  ClipboardList,
  Instagram,
  Award,
  Globe2,
  FileText,
  Building2,
  Microscope,
  EyeOff,
  ListChecks,
  Target,
} from 'lucide-react';

const HEADLINE_STATS = [
  { number: '10', label: 'Audit actions' },
  { number: '4', label: 'Visibility mechanisms' },
  { number: '6', label: 'Vertical playbooks' },
  { number: '60–90', label: 'Days to recommended' },
];

const PLAYBOOK_TEASERS = [
  {
    icon: Instagram,
    label: 'Action · Social Presence',
    teaser: 'The exact posting cadence and content mix ChatGPT treats as proof a clinic is real and currently operating.',
    color: 'text-pink-600',
    bg: 'bg-pink-50',
  },
  {
    icon: Award,
    label: 'Action · Society Directories',
    teaser: 'Which professional societies move the needle by vertical — and the directory-profile checklist that turns a $200/year membership into citations.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: Globe2,
    label: 'Action · Review Aggregators',
    teaser: "Why a complete profile on one specific aggregator is table stakes — and which verticals can safely skip it.",
    color: 'text-orange-600',
    bg: 'bg-orange-50',
  },
  {
    icon: FileText,
    label: 'Action · Service-Page Architecture',
    teaser: 'The single highest-ROI on-page action — one page per procedure × city, with the title/copy formula that gets cited.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    icon: ClipboardList,
    label: 'Action · Content Layer',
    teaser: 'The blog topics that AI search actually pulls into recommendations — and the ones that look great but never get cited.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    icon: Microscope,
    label: 'Action · Outcomes Data',
    teaser: 'For fertility and outcomes-reported verticals: the public dataset ChatGPT reads directly, and how to make sure yours says the right thing.',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
];

const MECHANISMS = [
  {
    title: 'Existence Proof',
    description:
      '"Does this clinic actually exist as a real business?" The signals that confirm you exist in AI\'s worldview.',
  },
  {
    title: 'Authority Validation',
    description:
      '"Has a credentialing body or trusted aggregator confirmed this clinic?" One directory listing worth more than ten PR placements.',
  },
  {
    title: 'Outcomes Evidence',
    description:
      '"Is there third-party evidence of patient outcomes?" Structured data and patient-voice signals beat star ratings.',
  },
  {
    title: 'Education Layer',
    description:
      '"What is this procedure, and what should I look for?" The content that gets pulled into recommendation framing.',
  },
];

const FORM_EMBED_HTML = `
<iframe
  src="https://go.totalauthority.com/widget/form/cDDns3ffiet58eBJg69B"
  style="width:100%;min-height:520px;border:none;border-radius:8px;background:white"
  id="inline-cDDns3ffiet58eBJg69B"
  data-layout='{"id":"INLINE"}'
  data-trigger-type="alwaysShow"
  data-trigger-value=""
  data-activation-type="alwaysActivated"
  data-activation-value=""
  data-deactivation-type="neverDeactivate"
  data-deactivation-value=""
  data-form-name="Medical Clinic AIV Playbook"
  data-height="520"
  data-layout-iframe-id="inline-cDDns3ffiet58eBJg69B"
  data-form-id="cDDns3ffiet58eBJg69B"
  title="Medical Clinic AIV Playbook"
></iframe>
`;

const HealthcareClinicAIVisibilityPlaybook = () => {
  return (
    <>
      <Script
        src="https://go.totalauthority.com/js/form_embed.js"
        strategy="afterInteractive"
      />

      <div className="min-h-screen bg-white">
        {/* HERO with FORM */}
        <section className="relative overflow-hidden bg-gradient-to-b from-orange-50/60 via-white to-white pt-16 pb-20 px-4">
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
                  <ClipboardList className="w-3.5 h-3.5 text-orange-700" />
                  <span className="text-xs font-bold text-orange-900 tracking-widest uppercase">
                    Free Playbook · 2026
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-slate-900 leading-[1.05] mb-6 tracking-tight">
                  The Healthcare Clinic{' '}
                  <span className="text-orange-600">AI Visibility Playbook</span>
                </h1>

                <p className="text-lg md:text-xl text-slate-700 leading-relaxed mb-8">
                  The exact step-by-step plan for getting your clinic recommended by ChatGPT, Perplexity, and
                  Google's AI overviews — built from analyzing <strong>61,531 source citations</strong> across six
                  healthcare verticals.
                </p>

                <ul className="space-y-3 mb-8">
                  {[
                    'The 10-action audit framework you can run against your clinic this week',
                    'The 4 visibility mechanisms ChatGPT uses to compose a recommendation',
                    'Vertical-specific plays for med spa, plastic surgery, dermatology, hair transplant, IVF and cosmetic dentistry',
                    'A 60–90 day execution timeline — what to do first, second, and what to skip',
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
              <div className="lg:col-span-5 lg:sticky lg:top-8">
                <div className="relative">
                  <div className="absolute -inset-3 bg-gradient-to-tr from-orange-300/30 via-orange-100/20 to-blue-200/30 rounded-3xl blur-2xl" />
                  <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
                    {/* Cover */}
                    <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900 px-6 py-8 text-white">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl" />
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl" />
                      <div className="relative">
                        <div className="text-[10px] font-bold tracking-[0.2em] text-orange-300 uppercase mb-2">
                          Total Authority · Playbook
                        </div>
                        <div className="text-lg font-bold leading-tight mb-3">
                          The Healthcare Clinic AI Visibility Playbook
                        </div>
                        <div className="text-xs text-slate-300 mb-4 leading-snug">
                          The 10-action framework for getting your clinic recommended by AI search.
                        </div>
                        <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-white/10 backdrop-blur border border-white/20 rounded text-[10px] font-mono">
                          Free PDF · April–May 2026
                        </div>
                      </div>
                    </div>

                    {/* Form */}
                    <div className="p-5 md:p-6">
                      <h3 className="text-lg font-bold text-slate-900 mb-1">Get the free playbook</h3>
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
              The Premise
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
              ChatGPT doesn't rank pages.
              <br />
              It <span className="text-orange-600">composes a recommendation</span> from a small set of sources it
              trusts.
            </h2>
            <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
              The playbook works because it targets those four trust signals directly. Win all four and ChatGPT
              recommends you. Win two and lose two and you're <strong className="text-slate-900">invisible</strong>.
            </p>
          </div>
        </section>

        {/* FOUR MECHANISMS — teaser */}
        <section className="py-16 px-4 bg-slate-50 border-y border-slate-200">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-full mb-5 text-xs font-bold tracking-widest uppercase text-slate-700">
                <Target className="w-3.5 h-3.5 text-orange-600" />
                The 4 Mechanisms
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
                Every AI recommendation is built from these four signals.
              </h2>
              <p className="text-slate-600">
                The playbook gives you the exact tactics to win each one.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {MECHANISMS.map((m, idx) => (
                <div
                  key={m.title}
                  className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center font-bold">
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1.5">{m.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{m.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PLAYBOOK ACTIONS — teaser */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-100 border border-orange-200 rounded-full mb-5 text-xs font-bold tracking-widest uppercase text-orange-900">
                <ListChecks className="w-3.5 h-3.5" />
                Inside the Playbook
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
                Ten actions. Ordered. Vertical-aware.
              </h2>
              <p className="text-slate-600">
                Each action targets a specific signal ChatGPT pulls from. Run them in order and a clinic moves from
                invisible to recommended in 60–90 days.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {PLAYBOOK_TEASERS.map((p, idx) => {
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
                        Step #{String(idx + 1).padStart(2, '0')}
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
                href="#inline-cDDns3ffiet58eBJg69B"
                className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-7 py-3.5 text-base font-bold rounded-xl shadow-lg shadow-orange-500/20 transition-all transform hover:-translate-y-0.5"
              >
                Unlock all ten actions →
              </a>
            </div>
          </div>
        </section>

        {/* VERTICAL PLAYBOOKS — teaser */}
        <section className="py-20 px-4 bg-slate-50 border-y border-slate-200">
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-full mb-5 text-xs font-bold tracking-widest uppercase text-slate-700">
                <Building2 className="w-3.5 h-3.5 text-orange-600" />
                Vertical-Specific Plays
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-3">
                One generic strategy is wrong for every vertical.
              </h2>
              <p className="text-slate-600">
                The playbook includes a dedicated section for each — what to prioritize, what to skip, where the
                wins actually come from.
              </p>
            </div>

            <div className="relative rounded-2xl border border-slate-200 shadow-sm overflow-hidden bg-white">
              <div className="grid grid-cols-2 md:grid-cols-3 divide-x divide-y divide-slate-200">
                {[
                  'Med Spa',
                  'Plastic Surgery',
                  'Dermatology',
                  'Hair Transplant',
                  'Fertility / IVF',
                  'Cosmetic Dentistry',
                ].map((v, i) => (
                  <div key={v} className="p-6 bg-white">
                    <div className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-2">
                      Playbook · 0{i + 1}
                    </div>
                    <div className="text-lg font-bold text-slate-900 mb-3">{v}</div>
                    <div className="space-y-1.5">
                      <div className="h-2.5 w-full rounded bg-slate-200" />
                      <div className="h-2.5 w-10/12 rounded bg-slate-200" />
                      <div className="h-2.5 w-8/12 rounded bg-slate-200" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Lock overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-white/40 via-white/85 to-white pointer-events-none">
                <div className="pointer-events-auto bg-white rounded-2xl shadow-xl border border-slate-200 px-6 py-5 max-w-sm text-center">
                  <div className="inline-flex w-10 h-10 rounded-full bg-orange-100 text-orange-700 items-center justify-center mb-3">
                    <EyeOff className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-semibold text-slate-900 mb-3">
                    Each vertical playbook is inside the free PDF.
                  </p>
                  <a
                    href="#inline-cDDns3ffiet58eBJg69B"
                    className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 text-sm font-bold rounded-lg transition-colors"
                  >
                    Get the playbook →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-20 px-4 bg-gradient-to-br from-orange-50 via-white to-blue-50 border-t border-slate-200">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
              Stop guessing how AI sees your clinic.
            </h2>
            <p className="text-lg text-slate-700 mb-8">
              Grab the full playbook — every action, every vertical play, the 60–90 day timeline. Free.
            </p>
            <a
              href="#inline-cDDns3ffiet58eBJg69B"
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg font-bold rounded-xl shadow-2xl shadow-orange-500/30 transition-all transform hover:-translate-y-1"
            >
              Get the Free Playbook →
            </a>
            <p className="mt-4 text-sm text-slate-500">Sent to your inbox in under 60 seconds.</p>
          </div>
        </section>
      </div>
    </>
  );
};

export default HealthcareClinicAIVisibilityPlaybook;
