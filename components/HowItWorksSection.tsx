"use client";

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Search, Bot, BarChart3, FileCheck, LucideProps } from 'lucide-react';

type Step = {
  icon: React.ElementType;
  number: number;
  title: string;
  description: string;
  side: 'left' | 'right';
};

const HowItWorksSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [smoothProgress, setSmoothProgress] = useState(0);
  const [illuminatedSteps, setIlluminatedSteps] = useState<Set<number>>(new Set([1])); // Start with step 2 (index 1) bright
  const rafRef = useRef<number>();

  const steps: Step[] = useMemo(
    () => [
      {
        icon: Search,
        number: 1,
        side: 'right',
        title: 'You Choose Your Market',
        description:
          "Tell us your business type and location. We'll suggest the key phrases customers use to find you, or customize your own list.",
      },
      {
        icon: Bot,
        number: 2,
        side: 'left',
        title: 'We Test Live AI Responses',
        description:
          "Our system asks ChatGPT (and other AIs) your exact phrases and captures who gets recommended. Real searches, real results, real citations.\nNo simulations. We test what your customers actually see.",
      },
      {
        icon: BarChart3,
        number: 3,
        side: 'right',
        title: 'We Map Your Competition',
        description:
          'We identify patterns in the results and trace back the sources driving recommendations. Which review sites matter? What content influences AI?\nAnd discover the hidden factors that determine AI rankings.',
      },
      {
        icon: FileCheck,
        number: 4,
        side: 'left',
        title: 'You Get Your Scorecard',
        description:
          'Your visibility score, competitor analysis, and the exact sources you need to target. Stop guessing, start winning.\nSee exactly where you stand and how to improve.',
      },
    ],
    []
  );

  // Smooth animation for dot position
  useEffect(() => {
    const animate = () => {
      setSmoothProgress(prev => {
        const diff = scrollProgress - prev;
        const step = diff * 0.15; // Smooth interpolation factor
        return Math.abs(diff) < 0.001 ? scrollProgress : prev + step;
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [scrollProgress]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !lineRef.current) return;

      const section = sectionRef.current;
      const line = lineRef.current;
      const sectionRect = section.getBoundingClientRect();
      const lineRect = line.getBoundingClientRect();
      
      // Calculate how far through the section we've scrolled
      const windowHeight = window.innerHeight;
      const sectionTop = sectionRect.top;
      const sectionHeight = sectionRect.height;
      
      // Start animation when section enters viewport, complete when it leaves
      const startPoint = windowHeight * 0.7; // Start when section is 70% into view
      const endPoint = -sectionHeight + windowHeight * 0.3; // End when section is 70% out of view
      
      let progress = 0;
      if (sectionTop <= startPoint && sectionTop >= endPoint) {
        progress = (startPoint - sectionTop) / (startPoint - endPoint);
        progress = Math.max(0, Math.min(1, progress));
      } else if (sectionTop < endPoint) {
        progress = 1;
      }
      
      setScrollProgress(progress);

      // Determine which steps should be illuminated based on dot position
      const dotPosition = progress * lineRect.height;
      const newIlluminated = new Set<number>();
      
      stepRefs.current.forEach((stepEl, index) => {
        if (!stepEl) return;
        const stepRect = stepEl.getBoundingClientRect();
        const stepCenter = stepRect.top + stepRect.height / 2;
        const stepCenterRelativeToLine = stepCenter - lineRect.top;
        
        // Illuminate if dot has passed the step's center
        // Make the last step (index 3) illuminate earlier with a larger offset
        const offset = index === 3 ? 200 : 50;
        if (dotPosition >= stepCenterRelativeToLine - offset) {
          newIlluminated.add(index);
        }
      });
      
      setIlluminatedSteps(newIlluminated);
    };

    handleScroll(); // Initial call
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-[#F5F3F0]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            How It Works:{' '}
            <span className="text-orange-600 relative inline-block">
              4 Simple Steps
              <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 400 15" preserveAspectRatio="none">
                <path
                  d="M5,10 Q50,3 95,8 Q140,13 185,7 Q230,4 275,9 Q320,12 365,8"
                  stroke="#EA580C"
                  strokeWidth={4}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto">
            No complex setup. No ongoing commitments. Just a clear snapshot of where you stand in AI search.
          </p>
        </header>

        {/* Timeline wrapper */}
        <div className="relative">
          {/* Center vertical line */}
          <div 
            ref={lineRef} 
            className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 w-px bg-slate-300 h-full"
          />
          
          {/* Orange dot - smoothly animated based on scroll */}
          <div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-orange-600 shadow-[0_0_0_4px_#fff,0_0_20px_rgba(234,88,12,0.4)]"
            style={{ 
              top: `${smoothProgress * 100}%`,
              transform: `translate(-50%, -50%) scale(${1 + smoothProgress * 0.15})`
            }}
          />

          <div className="space-y-20 md:space-y-28">
            {steps.map((step, index) => {
              const Icon = step.icon as React.ElementType<LucideProps>;
              const isIlluminated = illuminatedSteps.has(index);

              return (
                <div
                  key={step.number}
                  ref={(el) => (stepRefs.current[index] = el)}
                  className="relative"
                >
                  <div className="grid md:grid-cols-2 gap-12 items-start">
                    {/* Left column */}
                    <div className={step.side === 'left' ? '' : 'hidden md:block'}>
                      {step.side === 'left' && (
                        <div className="md:pr-16 relative">
                          {/* Subtle glow when active */}
                          <div className="absolute top-1/2 right-0 -translate-y-1/2 hidden md:block pointer-events-none">
                            <div 
                              className={`w-32 h-32 rounded-full blur-3xl transition-all duration-1000 ${
                                isIlluminated ? 'bg-orange-400/20 opacity-100 scale-100' : 'opacity-0 scale-75'
                              }`} 
                            />
                          </div>
                          
                          <div className="inline-flex items-center gap-3 mb-4">
                            <Icon 
                              className={`w-6 h-6 text-slate-900 md:transition-all md:duration-700 md:ease-out ${
                                !isIlluminated && 'md:text-slate-300'
                              }`} 
                              strokeWidth={1.75} 
                            />
                            <h3 
                              className={`text-2xl md:text-3xl font-bold text-slate-900 md:transition-all md:duration-700 md:ease-out ${
                                !isIlluminated && 'md:text-slate-400'
                              }`}
                            >
                              {step.number}. {step.title}
                            </h3>
                          </div>
                          <p 
                            className={`whitespace-pre-line leading-relaxed text-slate-700 md:transition-all md:duration-700 md:ease-out ${
                              !isIlluminated && 'md:text-slate-400'
                            }`}
                          >
                            {step.description}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Right column */}
                    <div className={step.side === 'right' ? '' : 'hidden md:block'}>
                      {step.side === 'right' && (
                        <div className="md:pl-16 md:text-right relative">
                          {/* Subtle glow when active */}
                          <div className="absolute top-1/2 left-0 -translate-y-1/2 hidden md:block pointer-events-none">
                            <div 
                              className={`w-32 h-32 rounded-full blur-3xl transition-all duration-1000 ${
                                isIlluminated ? 'bg-orange-400/20 opacity-100 scale-100' : 'opacity-0 scale-75'
                              }`} 
                            />
                          </div>
                          
                          <div className="inline-flex items-center gap-3 mb-4">
                            <Icon 
                              className={`w-6 h-6 text-slate-900 md:transition-all md:duration-700 md:ease-out ${
                                !isIlluminated && 'md:text-slate-300'
                              }`} 
                              strokeWidth={1.75} 
                            />
                            <h3 
                              className={`text-2xl md:text-3xl font-bold text-slate-900 md:transition-all md:duration-700 md:ease-out ${
                                !isIlluminated && 'md:text-slate-400'
                              }`}
                            >
                              {step.number}. {step.title}
                            </h3>
                          </div>
                          <p 
                            className={`whitespace-pre-line leading-relaxed text-slate-700 md:transition-all md:duration-700 md:ease-out ${
                              !isIlluminated && 'md:text-slate-400'
                            }`}
                          >
                            {step.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
