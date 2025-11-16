"use client";

import React from 'react';
import { BarChart3, Grid3X3, Trophy, Sparkles } from 'lucide-react';
import { FeatureCard } from './FeatureCard';
import { DeliverySection } from './DeliverySection';
import { TestimonialsSection } from './TestimonialsSection';

interface WhatYouReceiveProps {
  onOpenForm: () => void;
}

export const WhatYouReceive: React.FC<WhatYouReceiveProps> = ({ onOpenForm }) => {
  const features = [
    {
      icon: BarChart3,
      title: 'MiniScore (0–10)',
      description: 'Your current LLM visibility benchmark compared to industry leaders',
      gradientColor: 'from-orange-500 to-orange-600',
      hoverColor: 'orange'
    },
    {
      icon: Grid3X3,
      title: 'Mention Matrix',
      description: 'Detailed breakdown of who ChatGPT recommends and why for your search terms.',
      gradientColor: 'from-blue-500 to-blue-600',
      hoverColor: 'blue'
    },
    {
      icon: Trophy,
      title: 'Top 3 Quick Wins',
      description: 'Actionable strategies to earn your first AI recommendations fast',
      gradientColor: 'from-purple-500 to-purple-600',
      hoverColor: 'purple'
    }
  ];

  return (
    <section id="what-you-receive" className="py-20 px-4 bg-gradient-to-br from-slate-50 via-orange-50 to-blue-50 relative overflow-hidden">
      {/* Enhanced background decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange-200 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-200 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-200 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-20 right-1/4 w-28 h-28 bg-emerald-200 rounded-full blur-2xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
      </div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-100 via-purple-50 to-blue-100 rounded-full border border-orange-200 mb-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <Sparkles className="w-5 h-5 text-orange-500 animate-pulse" />
            <span className="text-slate-700 text-sm font-semibold tracking-wide">Your Complete Analysis Package</span>
            <Sparkles className="w-5 h-5 text-blue-500 animate-pulse" style={{animationDelay: '0.5s'}} />
          </div>
          <h2 className="text-5xl font-bold text-slate-900 mb-6 bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 bg-clip-text">
            What You'll Receive
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            A comprehensive analysis that reveals exactly where you stand in the AI landscape and provides actionable strategies to improve your visibility
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              gradientColor={feature.gradientColor}
              hoverColor={feature.hoverColor}
            />
          ))}
        </div>
        
        <DeliverySection onOpenForm={onOpenForm} />
        
        <TestimonialsSection />
      </div>
    </section>
  );
};
