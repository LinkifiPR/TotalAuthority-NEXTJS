"use client";

import React from 'react';

/**
 * Bespoke, brand-matched product mockups for the "Start wherever you are"
 * section. These replace flat PNG screenshots — they're crisp at any size,
 * match the orange/slate design language exactly, animate subtly on scroll
 * (via .cv-auto on the parent section), and cost zero image requests.
 *
 * Pure presentational markup — no hooks, no state, no listeners.
 */

const Glow = () => (
  <div
    aria-hidden="true"
    className="absolute -inset-4 bg-orange-200/25 rounded-[2rem] blur-2xl -z-10"
  />
);

/* ---------------------------------------------------------------------------
   1. AI Visibility Gap Calculator — animated head-to-head comparison
--------------------------------------------------------------------------- */
export const GapCalculatorVisual = () => (
  <div className="relative">
    <Glow />
    <div className="relative rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-900/5 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-slate-200 bg-slate-50">
        <span className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
        </span>
        <span className="ml-1 text-sm font-medium text-slate-900">AI Visibility Gap</span>
        <span className="ml-auto inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-widest text-emerald-600">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 ta-pulse-soft" />
          Live
        </span>
      </div>

      {/* Body */}
      <div className="relative p-5 md:p-6">
        {/* Scanning sweep */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="ta-sweep absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-orange-100/60 to-transparent" />
        </div>

        {/* Compare chips */}
        <div className="relative flex items-center gap-2 mb-6">
          <span className="flex-1 text-center text-xs font-mono text-slate-700 bg-slate-50 border border-slate-200 rounded-md py-1.5 truncate">
            yourbrand.com
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-orange-600">vs</span>
          <span className="flex-1 text-center text-xs font-mono text-slate-500 bg-slate-50 border border-slate-200 rounded-md py-1.5 truncate">
            competitor.com
          </span>
        </div>

        {/* Bars */}
        <div className="relative space-y-5">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-slate-900">Your Brand</span>
              <span className="text-sm font-semibold text-orange-600 tabular-nums">42</span>
            </div>
            <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="ta-bar-fill h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-600"
                style={{ width: '42%' }}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-slate-700">Top Competitor</span>
              <span className="text-sm font-semibold text-slate-700 tabular-nums">78</span>
            </div>
            <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="ta-bar-fill h-full rounded-full bg-slate-700"
                style={{ width: '78%', animationDelay: '0.15s' }}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative mt-6 pt-5 border-t border-slate-100 flex items-end justify-between">
          <div>
            <div className="text-[10px] font-medium uppercase tracking-widest text-slate-400 mb-1">
              Visibility gap
            </div>
            <div className="text-3xl font-semibold tracking-tight text-orange-600 tabular-nums leading-none">
              36 pts
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-500">Invisible for</div>
            <div className="text-sm font-semibold text-slate-900">6 of 10 prompts</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ---------------------------------------------------------------------------
   2. AI Visibility Mini Audit — cross-model baseline report
--------------------------------------------------------------------------- */
const auditModels = [
  { name: 'ChatGPT', score: 40, mentions: '4/10', citations: '7/10' },
  { name: 'Gemini', score: 50, mentions: '5/10', citations: '3/10' },
  { name: 'Perplexity', score: 30, mentions: '3/10', citations: '1/10' },
];

export const MiniAuditVisual = () => (
  <div className="relative">
    <Glow />
    <div className="relative rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-900/5 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-slate-200 bg-slate-50">
        <span className="text-sm font-medium text-slate-900">Cross-Model Baseline</span>
        <span className="ml-auto text-[10px] font-medium uppercase tracking-widest text-orange-600">
          AI Visibility Audit
        </span>
      </div>

      <div className="p-5">
        {/* Per-model mini cards */}
        <div className="grid grid-cols-3 gap-3">
          {auditModels.map((m, i) => (
            <div key={m.name} className="rounded-lg border border-slate-200 p-3">
              <div className="text-[11px] font-medium text-slate-700 truncate mb-1.5">{m.name}</div>
              <div className="text-xl font-semibold text-orange-600 tabular-nums leading-none mb-2">
                {m.score}
              </div>
              <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="ta-bar-fill h-full rounded-full bg-orange-500"
                  style={{ width: `${m.score}%`, animationDelay: `${i * 0.12}s` }}
                />
              </div>
              <div className="mt-2 text-[10px] text-slate-400">{m.mentions} mentions</div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="mt-4 rounded-lg border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-4 bg-slate-900 text-white text-[10px] font-medium uppercase tracking-wider">
            <div className="px-3 py-2">Model</div>
            <div className="px-3 py-2 text-right">Mentions</div>
            <div className="px-3 py-2 text-right">Citations</div>
            <div className="px-3 py-2 text-right">Score</div>
          </div>
          {auditModels.map((m, i) => (
            <div
              key={m.name}
              className={`grid grid-cols-4 text-xs ${i % 2 ? 'bg-slate-50' : 'bg-white'}`}
            >
              <div className="px-3 py-2.5 text-slate-700">{m.name}</div>
              <div className="px-3 py-2.5 text-right text-slate-600 tabular-nums">{m.mentions}</div>
              <div className="px-3 py-2.5 text-right text-slate-600 tabular-nums">{m.citations}</div>
              <div className="px-3 py-2.5 text-right font-semibold text-orange-600 tabular-nums">
                {m.score}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

/* ---------------------------------------------------------------------------
   3. Full Strategy Blueprint — dark score hero + 90-day roadmap
--------------------------------------------------------------------------- */
const phases = ['Foundation', 'Authority', 'Content', 'Scale'];

export const BlueprintVisual = () => (
  <div className="relative">
    <Glow />
    <div className="relative rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-900/5 overflow-hidden">
      {/* Brand strip */}
      <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-200">
        <span className="grid place-items-center w-6 h-6 rounded-md bg-orange-600 text-white text-[10px] font-bold">
          TA
        </span>
        <span className="text-sm font-medium text-slate-900">Total Authority</span>
        <span className="ml-auto text-[10px] text-slate-400">Strategy Blueprint</span>
      </div>

      <div className="p-5">
        <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-orange-600 mb-3">
          Multi-Model AI Visibility Audit
        </div>

        {/* Dark score hero */}
        <div className="relative rounded-xl bg-slate-900 p-5 text-white overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.20),transparent_55%)]"
          />
          <div className="relative flex items-center justify-between gap-4">
            <div>
              <div className="flex items-baseline">
                <span className="text-5xl font-semibold tracking-tight tabular-nums leading-none">53</span>
                <span className="text-lg font-semibold text-orange-400">/100</span>
              </div>
              <div className="mt-2 text-[11px] text-slate-400 uppercase tracking-wider">
                Overall AI visibility
              </div>
            </div>
            <div className="flex-1 max-w-[46%]">
              <div className="text-[11px] text-slate-300 mb-2 text-right">
                16/30 answers mentioned you
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="ta-bar-fill h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-400"
                  style={{ width: '53%' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 90-day roadmap */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-medium uppercase tracking-widest text-slate-500">
              90-day roadmap
            </span>
            <span className="text-[10px] text-slate-400">4 phases</span>
          </div>
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute left-2 right-2 top-[7px] h-px bg-slate-200"
            />
            <div className="relative grid grid-cols-4 gap-2">
              {phases.map((p, i) => (
                <div key={p} className="flex flex-col items-center text-center">
                  <span
                    className={`w-3.5 h-3.5 rounded-full border-2 ${
                      i === 0 ? 'bg-orange-600 border-orange-600' : 'bg-white border-slate-300'
                    }`}
                  />
                  <span className="mt-2 text-[10px] font-medium text-slate-700">{p}</span>
                  <span className="text-[9px] text-slate-400">Phase {i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
