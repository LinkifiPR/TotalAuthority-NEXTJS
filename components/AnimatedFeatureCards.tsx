"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Brain, CheckCircle, TrendingUp } from 'lucide-react';

const AnimatedFeatureCards = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress - trigger much earlier and complete sooner
      const elementTop = rect.top;
      const startTrigger = windowHeight * 0.9;  // Start when element is 90% down the screen (earlier)
      const endTrigger = windowHeight * 0.4;    // Complete when element is 40% down the screen (sooner)
      
      let progress = 0;
      if (elementTop <= startTrigger) {
        progress = Math.min(1, (startTrigger - elementTop) / (startTrigger - endTrigger));
      }
      
      progress = Math.max(0, Math.min(1, progress));
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate transforms based on scroll progress - responsive
  const maxSpread = window.innerWidth >= 768 ? 450 : 120; // Much larger spread for dramatic fan-out
  const spreadX = maxSpread * scrollProgress;
  const rotationAngle = (window.innerWidth >= 768 ? 18 : 8) * scrollProgress; // Increased rotation

  return (
    <div ref={containerRef} className="relative py-20 overflow-visible">
      {/* Mobile: Vertical Stack */}
      <div className="md:hidden flex flex-col space-y-8 px-4">
        {/* Card 1 - Different Sources */}
        <div className="w-full max-w-sm mx-auto">
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-orange-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 transform rotate-45 -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-500/5 transform rotate-12 translate-y-12 -translate-x-12"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">Different Sources</h3>
              <p className="text-slate-600 leading-relaxed text-lg">LLMs pull from earned media, Wikipedia, structured data, and high-trust sources</p>
            </div>
          </div>
        </div>

        {/* Card 2 - Authority Focused */}
        <div className="w-full max-w-sm mx-auto">
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-28 h-28 bg-slate-200/20 transform -rotate-12 -translate-y-14 -translate-x-14"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-slate-200/10 transform rotate-45 translate-y-10 translate-x-10"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">Authority Focused</h3>
              <p className="text-slate-600 leading-relaxed text-lg">They favor authority, credibility, and real-world citations—not just keyword rankings</p>
            </div>
          </div>
        </div>

        {/* Card 3 - Recommendation Based */}
        <div className="w-full max-w-sm mx-auto">
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-orange-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-orange-500/10 transform -rotate-45 -translate-y-16 -translate-x-16"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-orange-500/5 transform -rotate-12 translate-y-12 translate-x-12"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-orange-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">Recommendation Based</h3>
              <p className="text-slate-600 leading-relaxed text-lg">They recommend based on who's consistently mentioned and clearly described</p>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: Fan-out Animation */}
      <div className="hidden md:block relative w-full max-w-5xl mx-auto px-8 flex items-center justify-center min-h-[400px]">
        {/* Card 1 - Different Sources (Left) */}
        <div 
          className="absolute w-80 transition-all duration-700 ease-out"
          style={{
            left: '50%',
            transform: `translateX(-50%) translateX(${-spreadX}px) rotate(${-rotationAngle}deg)`,
          }}
        >
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-orange-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 transform rotate-45 -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-500/5 transform rotate-12 translate-y-12 -translate-x-12"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">Different Sources</h3>
              <p className="text-slate-600 leading-relaxed text-lg">LLMs pull from earned media, Wikipedia, structured data, and high-trust sources</p>
            </div>
          </div>
        </div>

        {/* Card 2 - Authority Focused (Center) */}
        <div 
          className="absolute w-80 transition-all duration-700 ease-out"
          style={{
            left: '50%',
            transform: `translateX(-50%) rotate(0deg)`,
            zIndex: 10,
          }}
        >
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-28 h-28 bg-slate-200/20 transform -rotate-12 -translate-y-14 -translate-x-14"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-slate-200/10 transform rotate-45 translate-y-10 translate-x-10"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">Authority Focused</h3>
              <p className="text-slate-600 leading-relaxed text-lg">They favor authority, credibility, and real-world citations—not just keyword rankings</p>
            </div>
          </div>
        </div>

        {/* Card 3 - Recommendation Based (Right) */}
        <div 
          className="absolute w-80 transition-all duration-700 ease-out"
          style={{
            left: '50%',
            transform: `translateX(-50%) translateX(${spreadX}px) rotate(${rotationAngle}deg)`,
          }}
        >
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-orange-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-orange-500/10 transform -rotate-45 -translate-y-16 -translate-x-16"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-orange-500/5 transform -rotate-12 translate-y-12 translate-x-12"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-orange-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">Recommendation Based</h3>
              <p className="text-slate-600 leading-relaxed text-lg">They recommend based on who's consistently mentioned and clearly described</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedFeatureCards;