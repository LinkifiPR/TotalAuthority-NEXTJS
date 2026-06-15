"use client";

import React from 'react';
import { Award, CheckCircle, Star } from 'lucide-react';
import { EnhancedVideoPlayer } from './EnhancedVideoPlayer';

interface TrustVideoSectionProps {
  onOpenScheduleCall?: () => void;
}

const pressArticles = [
  { src: '/lovable-uploads/389badc7-1f14-44dc-8e85-469f50464cca.png', alt: 'Press Gazette - Google AI Overviews', publication: 'Press Gazette' },
  { src: '/lovable-uploads/c6bfa99c-4268-4369-9ce2-50a754736d14.png', alt: 'Startups - AI search pushing brands out', publication: 'Startups' },
  { src: '/lovable-uploads/d2638782-3923-4a94-bc23-6b0d382614f9.png', alt: 'BBC Future - Is Google destroying the web', publication: 'BBC Future' },
  { src: '/lovable-uploads/785ba351-c48f-458e-8ad6-3ec5a0ca1716.png', alt: 'Business Wire - Semrush AI Visibility Index', publication: 'Business Wire' },
  { src: '/lovable-uploads/d6257f0e-9786-4840-86ab-95aaa10a8738.png', alt: 'BBC News - AI challenges Google dominance', publication: 'BBC News' },
  { src: '/lovable-uploads/3ff5095e-02f5-4711-8cee-245cb237e7f8.png', alt: 'The Drum - Brand AI-ready', publication: 'The Drum' },
];

export const TrustVideoSection: React.FC<TrustVideoSectionProps> = ({ onOpenScheduleCall }) => {
  return (
    <section className="cv-auto pt-20 md:pt-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2.5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            <span className="text-xs font-medium tracking-[0.18em] uppercase text-orange-500">
              Ch. 05 / 06
            </span>
            <span className="h-px w-8 bg-slate-300" />
            <span className="text-xs font-medium tracking-[0.18em] uppercase text-slate-500">
              Why Trust Us
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-6 text-balance">
            Why should you trust us?
          </h2>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed">
            <span className="font-medium text-slate-900">Chris Panteli</span>, our co-founder, is an internationally recognized speaker.
            This is him speaking at <span className="font-medium text-slate-900">SEO Estonia</span> on building authority through digital PR.
          </p>
        </div>

        {/* Video card */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 md:p-6 bg-slate-50">
              <div className="rounded-lg overflow-hidden border border-slate-200">
                <EnhancedVideoPlayer
                  vimeoId="1121564015"
                  title="Chris Panteli - SEO Estonia Conference"
                />
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 border-t border-slate-200">
              <div className="flex items-center gap-3 mb-3">
                <Award className="w-5 h-5 text-orange-600" />
                <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-slate-900">
                  Building Authority Through Digital PR
                </h3>
              </div>
              <p className="text-slate-600 leading-relaxed mb-5 max-w-3xl">
                Watch <span className="font-medium text-slate-900">Chris Panteli</span> share cutting-edge insights on building digital authority at <span className="font-medium text-slate-900">SEO Estonia</span>, one of Europe's most prestigious search marketing conferences. He's helped 500+ businesses get found by AI search.
              </p>
              <ul className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-sm">
                <li className="flex items-center gap-2 text-slate-700">
                  <CheckCircle className="w-4 h-4 text-orange-600" />
                  Internationally Recognized Speaker
                </li>
                <li className="flex items-center gap-2 text-slate-700">
                  <Star className="w-4 h-4 text-orange-600" />
                  Digital PR Expert
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* In The Press */}
        <div className="mt-24">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-orange-600 mb-4">
              In The Press
            </p>
            <h3 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-5 text-balance">
              The AI hype is real
            </h3>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed">
              Understanding the change in search and how you can be discovered is one of the most significant factors determining your business success in 2026.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
            {pressArticles.map((article) => (
              <article
                key={article.src}
                className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="aspect-[4/5] bg-slate-50 overflow-hidden">
                  <img
                    src={article.src}
                    alt={article.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="px-4 py-3 border-t border-slate-100 bg-white">
                  <p className="text-[11px] font-medium tracking-[0.16em] uppercase text-slate-500">
                    {article.publication}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12 max-w-3xl mx-auto">
            <p className="text-lg md:text-xl font-semibold text-slate-900 mb-3">
              The writing is on the wall. AI is changing everything.
            </p>
            <p className="text-base text-slate-600">
              Major publications worldwide are reporting the same story:{' '}
              <span className="font-medium text-slate-900">traditional search is dying</span>, and businesses that don't adapt will be invisible.
            </p>
          </div>
        </div>

      </div>

      {/* Schedule call — full-bleed dark closer (CH. 06) */}
      <div className="dark-canvas mt-20 md:mt-24 relative text-white overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2.5 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                <span className="text-xs font-medium tracking-[0.18em] uppercase text-orange-400">
                  Ch. 06 / 06
                </span>
                <span className="h-px w-8 bg-slate-600" />
                <span className="text-xs font-medium tracking-[0.18em] uppercase text-slate-400">
                  Ready To Start
                </span>
              </div>
              <h3 className="text-3xl md:text-5xl font-semibold tracking-tight text-white leading-tight text-balance">
                Talk to one of our team.
              </h3>
              <div className="h-px w-12 bg-orange-500 mt-6 mb-6" />
              <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-xl">
                Let's discuss your AI visibility strategy and how we can help you get named where it matters.
              </p>
            </div>

            <div className="flex flex-col items-start lg:items-end gap-6">
              <button
                onClick={onOpenScheduleCall}
                className="inline-flex items-center bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-medium text-base shadow-lg shadow-orange-900/30 transition-colors"
              >
                Schedule a Call
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M13 5l7 7-7 7" />
                </svg>
              </button>
              <ul className="space-y-2 text-sm text-slate-300 lg:text-right">
                <li className="flex items-center gap-2 lg:justify-end">
                  <CheckCircle className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  Free 30-min Strategy Call
                </li>
                <li className="flex items-center gap-2 lg:justify-end">
                  <CheckCircle className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  No Obligation
                </li>
                <li className="flex items-center gap-2 lg:justify-end">
                  <CheckCircle className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  Expert AI Insights
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
