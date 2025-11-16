"use client";

import React from 'react';

import confusionIllustration from '@/assets/confusion-to-clarity-illustration.png';

interface NoIdeaSectionProps {
  onOpenForm?: () => void;
}

export const NoIdeaSection: React.FC<NoIdeaSectionProps> = ({ onOpenForm }) => {
  return (
    <section className="py-20 px-8 md:px-16 lg:px-24 bg-gradient-to-b from-white to-blue-50 relative">
      <div className="max-w-7xl mx-auto relative">
        {/* Main Content Section with Organic Blob */}
        <div className="relative">
          
          <div className="relative bg-blue-50 rounded-3xl p-12 md:p-16 lg:p-20" style={{ zIndex: 1 }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                Most Businesses Have No Idea Where They Stand
              </h2>
              
              <p className="text-lg text-slate-700 leading-relaxed">
                You can't build an AI strategy without knowing where you stand today. And right now, you're flying blind.
              </p>
              
              <p className="text-lg text-slate-700 leading-relaxed">
                Our audit reveals your current AI visibility, competitive gaps, and the exact sources driving recommendations in your market.
              </p>
              
              <p className="text-lg text-slate-900 font-semibold leading-relaxed">
                No fluff. No theory. Just the specific actions that will get you recommended.
              </p>
            </div>

            {/* Right: Illustration */}
            <div className="flex justify-center lg:justify-end">
              <img 
                src={confusionIllustration} 
                alt="Business professional confused about AI visibility versus having clear data insights" 
                className="w-full max-w-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
};
