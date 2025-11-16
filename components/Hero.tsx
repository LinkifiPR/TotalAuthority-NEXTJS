"use client";


import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Zap, TrendingUp, Brain, Code, Activity } from 'lucide-react';
import { AILogos } from './AILogos';

interface HeroProps {
  onOpenForm: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenForm }) => {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ['Brand?', 'Company?', 'Founder?', 'CEO?'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <section className="bg-gradient-to-br from-slate-50 via-orange-50 to-blue-50 py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-2 md:mb-6 leading-tight">
          Does AI Recommend Your
        </h1>
        <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-orange-500 mb-6 relative h-8 md:h-16 lg:h-20">
          {words.map((word, index) => (
            <span
              key={word}
              className={`absolute top-0 left-1/2 transform -translate-x-1/2 transition-opacity duration-500 ease-in-out ${
                index === currentWord
                  ? 'opacity-100'
                  : 'opacity-0'
              }`}
            >
              {word}
            </span>
          ))}
        </div>
        
        <p className="text-lg md:text-xl lg:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto">
          Instantly find out with our free LLM Visibility Audit.
        </p>
        
        <div className="mb-8">
          <Button
            onClick={() => window.location.href = 'https://buy.stripe.com/eVq8wO938f2EdU3bfzdIA00'}
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Run My Free Audit →
          </Button>
        </div>
        
        <div className="flex flex-col items-center justify-center gap-3 md:gap-4 text-xs md:text-sm text-slate-500 mb-16 max-w-4xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-500 flex-shrink-0" />
              <span className="text-center sm:text-left">100% free • No code • &lt;60 sec setup</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-500 flex-shrink-0" />
              <span className="text-center sm:text-left">ChatGPT brand visibility report</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-500 flex-shrink-0" />
            <span className="text-center">Human‑validated report delivered in 1 business day</span>
          </div>
        </div>
        
        <div className="mt-16">
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-2xl p-4 md:p-8 max-w-5xl mx-auto relative overflow-hidden border border-slate-700">
            {/* Technical background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full" style={{
                backgroundImage: `
                  radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0),
                  linear-gradient(90deg, rgba(59, 130, 246, 0.1) 0%, transparent 50%, rgba(147, 51, 234, 0.1) 100%)
                `,
                backgroundSize: '40px 40px, 100% 100%'
              }}></div>
            </div>

            {/* Animated circuit lines */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-10 left-10 w-20 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50 animate-pulse"></div>
              <div className="absolute top-20 right-20 w-px h-16 bg-gradient-to-b from-transparent via-purple-400 to-transparent opacity-50 animate-pulse" style={{animationDelay: '1s'}}></div>
              <div className="absolute bottom-16 left-1/4 w-24 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-50 animate-pulse" style={{animationDelay: '2s'}}></div>
              <div className="absolute bottom-10 right-1/3 w-px h-12 bg-gradient-to-b from-transparent via-emerald-400 to-transparent opacity-50 animate-pulse" style={{animationDelay: '0.5s'}}></div>
            </div>

            {/* Floating tech icons */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-6 right-12 animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}>
                <Brain className="w-4 h-4 text-blue-400 opacity-30" />
              </div>
              <div className="absolute top-16 left-12 animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}>
                <Code className="w-5 h-5 text-purple-400 opacity-25" />
              </div>
              <div className="absolute bottom-20 right-8 animate-bounce" style={{animationDelay: '2s', animationDuration: '3.5s'}}>
                <Activity className="w-4 h-4 text-emerald-400 opacity-30" />
              </div>
            </div>

            <div className="relative z-10">
              <div className="text-center mb-6 md:mb-8">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-orange-500/20 rounded-full border border-blue-400/30 mb-6 shadow-lg backdrop-blur-sm">
                  <Zap className="w-5 h-5 text-blue-400 animate-pulse" />
                  <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">
                    The Future of Search is AI
                  </h2>
                  <TrendingUp className="w-5 h-5 text-orange-400 animate-pulse" style={{animationDelay: '0.5s'}} />
                </div>
                <p className="text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
                  <span className="text-xl md:text-2xl font-bold text-orange-400 animate-pulse">60%</span> of buyers already start with AI assistants—and that number is accelerating. If your brand isn't recommended inside those chats, it's invisible.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
                <div className="space-y-4">
                  <div className="group bg-gradient-to-br from-red-900/40 via-red-800/30 to-red-900/40 border border-red-500/30 rounded-xl p-3 md:p-4 backdrop-blur-sm hover:border-red-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-red-300 font-medium text-sm md:text-base">Before TotalAuthority</span>
                      </div>
                      <div className="ml-auto opacity-50">
                        <div className="w-6 h-1 bg-red-500/30 rounded-full"></div>
                        <div className="w-4 h-1 bg-red-500/20 rounded-full mt-1"></div>
                        <div className="w-5 h-1 bg-red-500/10 rounded-full mt-1"></div>
                      </div>
                    </div>
                    <p className="text-xs md:text-sm text-red-200/80 font-mono bg-red-950/50 p-2 rounded border border-red-500/20">
                      "I don't have specific information about [Your Brand]..."
                    </p>
                  </div>
                  
                  <div className="group bg-gradient-to-br from-emerald-900/40 via-emerald-800/30 to-emerald-900/40 border border-emerald-500/30 rounded-xl p-3 md:p-4 backdrop-blur-sm hover:border-emerald-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                        <span className="text-emerald-300 font-medium text-sm md:text-base">After TotalAuthority</span>
                      </div>
                      <div className="ml-auto opacity-50">
                        <div className="w-8 h-1 bg-emerald-500/50 rounded-full"></div>
                        <div className="w-6 h-1 bg-emerald-500/40 rounded-full mt-1"></div>
                        <div className="w-7 h-1 bg-emerald-500/30 rounded-full mt-1"></div>
                      </div>
                    </div>
                    <p className="text-xs md:text-sm text-emerald-200/80 font-mono bg-emerald-950/50 p-2 rounded border border-emerald-500/20">
                      "[Your Brand] is the leading solution for..."
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <ul className="space-y-3 text-left">
                    <li className="flex items-start gap-3 group">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-emerald-400 mt-0.5 flex-shrink-0 group-hover:text-emerald-300 transition-colors" />
                      <span className="text-slate-300 text-sm md:text-base group-hover:text-slate-200 transition-colors">The majority of product and service discovery is shifting to chatbots and LLMs—long before anyone clicks a Google result.</span>
                    </li>
                    <li className="flex items-start gap-3 group">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-emerald-400 mt-0.5 flex-shrink-0 group-hover:text-emerald-300 transition-colors" />
                      <span className="text-slate-300 text-sm md:text-base group-hover:text-slate-200 transition-colors">Buyers can research a problem, compare strategies and choose a provider within a single AI conversation.</span>
                    </li>
                    <li className="flex items-start gap-3 group">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-emerald-400 mt-0.5 flex-shrink-0 group-hover:text-emerald-300 transition-colors" />
                      <span className="text-slate-300 text-sm md:text-base group-hover:text-slate-200 transition-colors">LLM visibility boosts the same authority signals Google rewards, so every improvement also lifts your SEO.</span>
                    </li>
                    <li className="flex items-start gap-3 group">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-emerald-400 mt-0.5 flex-shrink-0 group-hover:text-emerald-300 transition-colors" />
                      <span className="text-slate-300 text-sm md:text-base group-hover:text-slate-200 transition-colors">Early movers secure "memory share" inside the models—latecomers pay 10× more to catch up.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <AILogos />
    </section>
  );
};
