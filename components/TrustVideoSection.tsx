"use client";

import React from 'react';
import { Award, CheckCircle, Star } from 'lucide-react';
import { EnhancedVideoPlayer } from './EnhancedVideoPlayer';

interface TrustVideoSectionProps {
  onOpenScheduleCall?: () => void;
}

const pressArticles = [
  { src: '/lovable-uploads/389badc7-1f14-44dc-8e85-469f50464cca.png', alt: 'Press Gazette - Google AI Overviews' },
  { src: '/lovable-uploads/c6bfa99c-4268-4369-9ce2-50a754736d14.png', alt: 'Startups - AI search pushing brands out' },
  { src: '/lovable-uploads/d2638782-3923-4a94-bc23-6b0d382614f9.png', alt: 'BBC Future - Is Google destroying the web' },
  { src: '/lovable-uploads/785ba351-c48f-458e-8ad6-3ec5a0ca1716.png', alt: 'Business Wire - Semrush AI Visibility Index' },
  { src: '/lovable-uploads/d6257f0e-9786-4840-86ab-95aaa10a8738.png', alt: 'BBC News - AI challenges Google dominance' },
  { src: '/lovable-uploads/3ff5095e-02f5-4711-8cee-245cb237e7f8.png', alt: 'The Drum - Brand AI-ready' },
];

export const TrustVideoSection: React.FC<TrustVideoSectionProps> = ({ onOpenScheduleCall }) => {
  return (
    <section className="cv-auto py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-orange-600 mb-4">
            Why us
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-6">
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
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Award className="w-5 h-5 text-orange-600" />
                    <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-slate-900">
                      Building Authority Through Digital PR
                    </h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed mb-5">
                    Watch <span className="font-medium text-slate-900">Chris Panteli</span> share cutting-edge insights on building digital authority at <span className="font-medium text-slate-900">SEO Estonia</span>, one of Europe's most prestigious search marketing conferences.
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

                <div className="md:ml-6 w-full md:w-auto md:min-w-[140px]">
                  <div className="rounded-lg border border-slate-200 bg-slate-50 px-5 py-4 text-center">
                    <div className="text-2xl font-semibold text-orange-600 mb-1">500+</div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider">Businesses Helped</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* In The Press */}
        <div className="mt-24">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-orange-600 mb-4">
              In The Press
            </p>
            <h3 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-5">
              The AI hype is real
            </h3>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed">
              Understanding the change in search and how you can be discovered is one of the most significant factors determining your business success in 2024.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
            {pressArticles.map((article) => (
              <article
                key={article.src}
                className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <img
                  src={article.src}
                  alt={article.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto"
                />
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

        {/* Schedule call */}
        <div className="mt-24">
          <div className="max-w-3xl mx-auto bg-orange-50/60 rounded-xl border border-orange-200 p-10 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 mb-4">
              Want to talk to one of our team?
            </h3>
            <p className="text-base md:text-lg text-slate-700 mb-8 leading-relaxed">
              Let's discuss your AI visibility strategy and how we can help you dominate search results.
            </p>
            <button
              onClick={onOpenScheduleCall}
              className="inline-flex items-center bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Schedule a Call
            </button>
            <div className="mt-6 flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm text-slate-600">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-orange-600" />
                Free 30-min Strategy Call
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-orange-600" />
                No Obligation
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-orange-600" />
                Expert AI Insights
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
