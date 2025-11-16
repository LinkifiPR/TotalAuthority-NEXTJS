"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export const AuditPricingSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set target date to 5 days from now
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 5);

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 px-4 bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get Your <span className="text-orange-500 border-b-4 border-orange-500">AI Visibility Audit</span>
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Before Your Competition Does
          </h3>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Know exactly who AI recommends in your market and whether it's you.<br />
            Fast, standardized, actionable insights delivered within 48 hours.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-slate-800 rounded-2xl p-8 border-2 border-orange-500 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-orange-500 text-white px-6 py-1 rounded-full text-sm font-medium">
                Most Efficient Way to Grow in 2025
              </span>
            </div>

            <div className="mt-4">
              {/* Countdown Timer */}
              <div className="flex justify-center gap-3 mb-8">
                <div className="flex flex-col items-center">
                  <div className="bg-orange-500 rounded-lg w-16 h-16 flex items-center justify-center shadow-lg">
                    <span className="text-3xl font-bold text-white">{timeLeft.days}</span>
                  </div>
                  <span className="text-xs text-slate-400 mt-2 font-semibold">DAYS</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-orange-500 rounded-lg w-16 h-16 flex items-center justify-center shadow-lg">
                    <span className="text-3xl font-bold text-white">{timeLeft.hours}</span>
                  </div>
                  <span className="text-xs text-slate-400 mt-2 font-semibold">HOURS</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-orange-500 rounded-lg w-16 h-16 flex items-center justify-center shadow-lg">
                    <span className="text-3xl font-bold text-white">{timeLeft.minutes}</span>
                  </div>
                  <span className="text-xs text-slate-400 mt-2 font-semibold">MINS</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-orange-500 rounded-lg w-16 h-16 flex items-center justify-center shadow-lg">
                    <span className="text-3xl font-bold text-white">{timeLeft.seconds}</span>
                  </div>
                  <span className="text-xs text-slate-400 mt-2 font-semibold">SECS</span>
                </div>
              </div>

              <h3 className="text-3xl font-bold text-white mb-2">AI Visibility Audit</h3>
              <p className="text-slate-300 mb-6">Everything you need to get started</p>

              <div className="mb-8">
                <div className="flex items-baseline mb-6">
                  <span className="text-sm text-slate-400 mr-2">Model:</span>
                  <span className="text-xl text-white font-semibold">ChatGPT</span>
                  <div className="ml-auto flex items-center gap-3">
                    <span className="relative text-2xl text-slate-400 font-bold">
                      $89
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                        <line x1="0" y1="35" x2="100" y2="5" stroke="#f97316" strokeWidth="3" />
                      </svg>
                    </span>
                    <span className="text-4xl font-bold text-white">$17</span>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Check className="w-5 h-5 text-orange-500 mr-2" />
                  What You Get:
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-slate-300">
                    <span className="text-orange-500 font-bold">•</span>
                    <span><strong className="text-white">Executive Scorecard:</strong> 0–10 visibility score with coverage across discovery and research prompts</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-300">
                    <span className="text-orange-500 font-bold">•</span>
                    <span><strong className="text-white">Discovery Coverage Table:</strong> Who shows up for "Best [service] in [city]" prompts—and whether you appear</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-300">
                    <span className="text-orange-500 font-bold">•</span>
                    <span><strong className="text-white">Research Coverage Table:</strong> See if you appear for pricing, comparison, and legitimacy prompts</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-300">
                    <span className="text-orange-500 font-bold">•</span>
                    <span><strong className="text-white">Citations Roll-Up:</strong> List of domains LLMs used—reviews, listicles, press, forums—with your presence or absence</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-300">
                    <span className="text-orange-500 font-bold">•</span>
                    <span><strong className="text-white">ChatGPT Results (default):</strong> Live data from controlled prompts run directly in ChatGPT</span>
                  </li>
                </ul>
              </div>

              <div className="mb-8">
                <h4 className="text-xl font-semibold text-white mb-4">👇 How It Works:</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-slate-300">
                    <span className="text-orange-500 font-bold">•</span>
                    <span>You choose your phrases (5 discovery, 10 research)—we'll send examples</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-300">
                    <span className="text-orange-500 font-bold">•</span>
                    <span>We run standardized prompts and capture who gets recommended and why</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-300">
                    <span className="text-orange-500 font-bold">•</span>
                    <span>You get a clear snapshot of where you stand—and what's influencing it</span>
                  </li>
                </ul>
              </div>

              <div className="mb-8">
                <h4 className="text-xl font-semibold text-white mb-4">🧠 Built For:</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-slate-300">
                    <span className="text-orange-500 font-bold">•</span>
                    <span>Local service businesses (HVAC, roofing, cleaning, pest control, etc.)</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-300">
                    <span className="text-orange-500 font-bold">•</span>
                    <span>Real estate brokerages and teams</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-300">
                    <span className="text-orange-500 font-bold">•</span>
                    <span>Law firms, accountants, dentists, med-aesthetic clinics, and more</span>
                  </li>
                </ul>
              </div>

              <Button 
                onClick={() => window.location.href = 'https://app.totalauthority.com/ai-visibility-audit'}
                className="w-full py-6 text-lg font-semibold bg-orange-500 hover:bg-orange-600 text-white"
              >
                Start Your Audit Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
