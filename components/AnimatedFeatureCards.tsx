"use client";

import React from 'react';
import { Brain, CheckCircle, TrendingUp, Check } from 'lucide-react';

/**
 * "How LLMs work" principle cards.
 *
 * Previous version mounted a rAF-throttled scroll listener + IntersectionObserver
 * to drive a fan-out scroll animation on desktop. That was visually loud, added
 * main-thread cost on every scroll, and provided little real information. This
 * version is a static, editorial 3-column grid with deeper, more granular copy.
 */

interface PrincipleCard {
  number: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  lead: string;
  bullets: string[];
}

const cards: PrincipleCard[] = [
  {
    number: '01',
    icon: Brain,
    title: 'Different sources',
    lead: "LLMs don't pull from search rankings. They compose answers from a small, trusted set of evidence.",
    bullets: [
      'Earned media (TechCrunch, HBR, BBC)',
      'Wikipedia and knowledge graphs',
      'Structured schema and review data',
      'Reddit, expert blogs and forums',
    ],
  },
  {
    number: '02',
    icon: CheckCircle,
    title: 'Authority focused',
    lead: 'Models reward credibility and consistency, not keyword density or backlinks.',
    bullets: [
      'Verifiable expert bios and author data',
      'Repeated mentions across high-trust outlets',
      'Cross-platform brand consistency',
      'Real outcomes — case studies, reviews',
    ],
  },
  {
    number: '03',
    icon: TrendingUp,
    title: 'Recommendation based',
    lead: "There's no list of ten. AI returns a named recommendation, or it returns nothing.",
    bullets: [
      'Brand named, not just listed',
      'Clear, structured descriptions',
      'Strong knowledge-graph presence',
      'Specific use-case associations',
    ],
  },
];

const AnimatedFeatureCards = () => {
  return (
    <div className="py-12 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <article
              key={card.number}
              className="group relative overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm p-7 md:p-8 flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ta-rise"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              {/* Top accent that draws in on hover */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-500 to-orange-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
              />
              {/* Faint watermark numeral */}
              <span
                aria-hidden="true"
                className="absolute top-2 right-4 text-6xl md:text-7xl font-bold tabular-nums text-orange-500/[0.07] leading-none select-none pointer-events-none"
              >
                {card.number}
              </span>

              <div className="relative flex flex-col flex-1">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-orange-600">
                    {card.number}
                  </span>
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center shadow-sm shadow-orange-500/30 group-hover:scale-105 transition-transform duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-slate-900 mb-3">
                  {card.title}
                </h3>
                <p className="text-base text-slate-600 leading-relaxed">
                  {card.lead}
                </p>

                <div className="border-t border-slate-200 mt-6 pt-5">
                  <ul className="space-y-3">
                    {card.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-3 text-sm text-slate-700 leading-snug"
                      >
                        <span className="mt-0.5 w-4 h-4 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3" strokeWidth={3} />
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default AnimatedFeatureCards;
