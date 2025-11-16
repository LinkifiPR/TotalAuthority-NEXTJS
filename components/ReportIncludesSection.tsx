"use client";

import React from 'react';
import { FileCheck, Search, BarChart3, Link2, Monitor } from 'lucide-react';
import { Button } from './ui/button';

interface ReportIncludesSectionProps {
  onOpenForm?: () => void;
}

export const ReportIncludesSection: React.FC<ReportIncludesSectionProps> = ({ onOpenForm }) => {
  const features = [
    {
      icon: FileCheck,
      title: 'Executive Scorecard',
      subtitle: 'YOUR AI VISIBILITY SCORE (0-10)',
      description: 'Get your overall visibility rating across all tested phrases, with clear benchmarks showing how you compare to competitors in your market.',
    },
    {
      icon: Search,
      title: 'Discovery Coverage Table',
      subtitle: 'WHO AI RECOMMENDS IN YOUR MARKET',
      description: 'See who gets recommended for "best [service] in [city]" searches, and whether you appear, across all 5 discovery phrases.',
    },
    {
      icon: BarChart3,
      title: 'Research Coverage Table',
      subtitle: 'YOUR EARLY-STAGE VISIBILITY',
      description: 'Track your visibility across 10 research prompts prospects ask when exploring pain points and solutions, before they start looking for providers.',
    },
    {
      icon: Link2,
      title: 'Citations Roll-Up',
      subtitle: 'LINKS DRIVING AI RECOMMENDATIONS',
      description: 'The complete list of domains that shaped your audit results, listicles, review sites, press or forums showing exactly where you need presence.',
    },
    {
      icon: Monitor,
      title: 'Platform Snapshot',
      subtitle: 'VISIBILITY ACROSS MAJOR AI ASSISTANTS',
      subtitleExtra: '(Optional)',
      description: 'See how your visibility compares across ChatGPT, Claude, Gemini, and Perplexity. Because different audiences use different AI tools.',
    },
  ];

  return (
    <section className="py-20 px-8 md:px-16 lg:px-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Your Complete{' '}
            <span className="relative inline-block text-orange-500">
              AI Visibility Report
              <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 400 15" preserveAspectRatio="none">
                <path d="M5,10 Q50,3 95,8 Q140,13 185,7 Q230,4 275,9 Q320,12 365,8" 
                      stroke="#F97316" 
                      strokeWidth="4" 
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"/>
              </svg>
            </span>
            {' '}Includes:
          </h2>
        </div>

        {/* Features Grid */}
        <div className="mb-12">
          {/* Top 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {features.slice(0, 3).map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-orange-200 group"
              >
                <div className="w-16 h-16 mb-6 bg-orange-100 rounded-xl p-3 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
                  <feature.icon className="w-full h-full text-slate-900" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm font-semibold text-orange-500 mb-4 uppercase tracking-wide">
                  {feature.subtitle}
                  {feature.subtitleExtra && (
                    <span className="text-orange-400"> {feature.subtitleExtra}</span>
                  )}
                </p>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom 2 cards centered */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {features.slice(3, 5).map((feature, index) => (
              <div
                key={index + 3}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-orange-200 group"
              >
                <div className="w-16 h-16 mb-6 bg-orange-100 rounded-xl p-3 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
                  <feature.icon className="w-full h-full text-slate-900" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm font-semibold text-orange-500 mb-4 uppercase tracking-wide">
                  {feature.subtitle}
                  {feature.subtitleExtra && (
                    <span className="text-orange-400"> {feature.subtitleExtra}</span>
                  )}
                </p>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Box */}
        <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-8 mb-8 text-center">
          <p className="text-lg md:text-xl text-slate-800 font-medium">
            Everything you need to dominate AI recommendations —<br />
            delivered in a clear, actionable report within one business day.
          </p>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={() => window.location.href = 'https://app.totalauthority.com/ai-visibility-audit'}
            className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-6 text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Start Your Audit Now
          </Button>
        </div>
      </div>
    </section>
  );
};
