"use client";

import React from 'react';
import { Button } from './ui/button';

interface CompetitorCTASectionProps {
  onOpenForm?: () => void;
}

export const CompetitorCTASection: React.FC<CompetitorCTASectionProps> = ({ onOpenForm }) => {
  return (
    <section className="relative py-24 px-8 md:px-16 lg:px-24 bg-slate-900 overflow-hidden">
      {/* Grid Pattern Background */}
      <div 
        className="absolute inset-0 opacity-20" 
        style={{
          backgroundImage: `
            linear-gradient(to right, #1e293b 1px, transparent 1px),
            linear-gradient(to bottom, #1e293b 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Don't Let Your Competitors Get Ahead
        </h2>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
          Every day you wait, your competitors are being recommended instead of you.
        </p>

        {/* Animated CTA Button */}
        <div className="flex flex-col items-center gap-4">
          <Button
            size="lg"
            onClick={() => window.location.href = 'https://app.totalauthority.com/ai-visibility-audit'}
            className="relative bg-orange-500 hover:bg-orange-600 text-white px-12 py-8 text-xl md:text-2xl font-bold rounded-xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-110 group overflow-hidden"
            style={{ animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}
          >
            {/* Shine effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
            <span className="relative z-10">Start Your Audit Now</span>
          </Button>

          {/* Delivery Info */}
          <p className="text-sm text-slate-400">
            Delivery within one business day
          </p>
        </div>
      </div>

      {/* Glow effect around button area */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
    </section>
  );
};
