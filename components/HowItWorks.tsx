"use client";


import React, { useEffect, useState } from 'react';
import { Search, FileText, CheckCircle, Sparkles, Zap, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HowItWorksProps {
  onOpenForm?: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenForm }) => {
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('how-it-works');
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      
      if (sectionTop <= windowHeight * 0.8 && sectionTop + sectionHeight >= windowHeight * 0.2) {
        const visibleStart = Math.max(0, windowHeight * 0.8 - sectionTop);
        const totalDistance = sectionHeight + windowHeight * 0.6;
        const progress = Math.min(1, Math.max(0, visibleStart / totalDistance));
        
        setLineHeight(progress * 100);
      } else if (sectionTop > windowHeight * 0.8) {
        setLineHeight(0);
      } else if (sectionTop + sectionHeight < windowHeight * 0.2) {
        setLineHeight(100);
      }
    };

    let ticking = false;
    const smoothScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', smoothScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', smoothScroll);
  }, []);

  const steps = [
    {
      icon: Search,
      title: "Enter your brand, main service offering, and three primary target search phrases.",
      time: "(≈ 60 sec)"
    },
    {
      icon: FileText,
      title: "We query ChatGPT using your input and real-buyer prompts.",
      time: ""
    },
    {
      icon: CheckCircle,
      title: "Receive your one-page scorecard, along with your hits, misses, and three quick wins.",
      time: ""
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden relative">
      {/* Background tech pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
            How the Free Audit Works
          </h2>
        </div>
        
        <div className="relative">
          {/* Static background line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-700/50 transform -translate-x-1/2 hidden md:block"></div>
          
          {/* Animated foreground line */}
          <div 
            className="absolute left-1/2 top-0 w-0.5 bg-gradient-to-b from-orange-400 via-blue-400 to-purple-400 transform -translate-x-1/2 hidden md:block transition-all duration-300 ease-out"
            style={{ 
              height: `${lineHeight}%`,
              boxShadow: `0 0 10px rgba(249, 115, 22, 0.3)`
            }}
          ></div>
          
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`relative flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Step content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'} text-center md:text-left`}>
                  <div className="group bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 transition-all duration-300 hover:border-orange-400/30 hover:shadow-xl hover:shadow-orange-500/10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="absolute top-4 right-4 w-16 h-16 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                      <svg viewBox="0 0 64 64" className="w-full h-full text-orange-400">
                        <path d="M8,8 L56,8 L56,24 L40,24 L40,40 L56,40 L56,56" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              fill="none"/>
                        <circle cx="8" cy="8" r="3" fill="currentColor"/>
                        <circle cx="56" cy="56" r="3" fill="currentColor" className="text-blue-400"/>
                      </svg>
                    </div>
                    
                    <div className="relative z-10">
                      <h3 className="text-lg font-semibold text-white mb-3 leading-relaxed">
                        {step.title}
                      </h3>
                      {step.time && (
                        <p className="text-slate-400 text-sm font-normal">
                          {step.time}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Icon circle */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-orange-500/30 relative">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-orange-400 rounded-full flex items-center justify-center text-orange-400 font-bold text-sm shadow-lg">
                    {index + 1}
                  </div>
                </div>
                
                {/* Empty space for alternating layout */}
                <div className="flex-1 hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Enhanced CTA Section */}
        <div className="mt-20 text-center relative">
          {/* Background glow effects */}
          <div className="absolute inset-0 -m-8">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-blue-500/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          </div>

          <div className="relative bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-3xl p-12 border border-gradient-to-r border-orange-400/30 shadow-2xl shadow-orange-500/10 overflow-hidden">
            {/* Animated border gradient */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500/20 via-blue-500/20 to-purple-500/20 p-[1px]">
              <div className="w-full h-full rounded-3xl bg-gradient-to-br from-slate-800/95 to-slate-900/95"></div>
            </div>
            
            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-orange-400 rounded-full animate-bounce opacity-60" style={{animationDelay: '0s'}}></div>
              <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce opacity-60" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-purple-400 rounded-full animate-bounce opacity-60" style={{animationDelay: '1s'}}></div>
              <div className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 bg-orange-300 rounded-full animate-bounce opacity-60" style={{animationDelay: '1.5s'}}></div>
            </div>
            
            <div className="relative z-10">
              <div className="mb-8">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-500/20 to-blue-500/20 rounded-full border border-orange-400/40 backdrop-blur-sm mb-6 shadow-lg">
                  <Sparkles className="w-5 h-5 text-orange-300 animate-pulse" />
                  <span className="text-orange-200 font-semibold text-lg">Ready to get started?</span>
                  <Zap className="w-5 h-5 text-blue-300 animate-pulse" style={{animationDelay: '0.5s'}} />
                </div>
              </div>
              
              <Button 
                onClick={onOpenForm}
                size="lg" 
                className="relative bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-16 py-8 text-2xl font-bold rounded-2xl shadow-2xl hover:shadow-orange-500/40 transition-all duration-300 transform hover:scale-105 border-2 border-orange-400/50 group overflow-hidden"
              >
                {/* Button glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-orange-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Button content */}
                <div className="relative flex items-center gap-3">
                  <span>Start My Audit</span>
                  <div className="transform group-hover:translate-x-2 transition-transform duration-300">
                    →
                  </div>
                </div>
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 -top-1 -bottom-1 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </Button>
              
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-center gap-2 text-slate-300">
                  <Clock className="w-4 h-4 text-orange-400" />
                  <p className="text-lg font-medium">
                    Your comprehensive AI visibility report in 24 hours
                  </p>
                </div>
                
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-500/10 to-blue-500/10 rounded-full border border-orange-400/20 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
                    <span className="text-slate-300 font-medium">AI-Powered Visibility Engine</span>
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
