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
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <article
              key={card.number}
              className="group bg-white rounded-xl border border-slate-200 shadow-sm p-7 md:p-8 flex flex-col hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-medium tracking-[0.18em] uppercase text-orange-600">
                  {card.number}
                </span>
                <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
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
                <ul className="space-y-2.5">
                  {card.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2.5 text-sm text-slate-700 leading-snug"
                    >
                      <Check className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default AnimatedFeatureCards;
