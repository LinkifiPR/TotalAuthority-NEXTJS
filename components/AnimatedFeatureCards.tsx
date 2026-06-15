"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Brain, CheckCircle, TrendingUp } from 'lucide-react';

const AnimatedFeatureCards = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

    // rAF-throttled scroll handler + IntersectionObserver gate.
    // Previously this ran the math on every scroll event of the whole page
    // (heavy main-thread cost). Now we only compute when the cards are near
    // the viewport, and at most once per animation frame.
    let ticking = false;
    let isNear = false;

    const compute = () => {
      ticking = false;
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const startTrigger = windowHeight * 0.9;
      const endTrigger = windowHeight * 0.4;
      let progress = 0;
      if (rect.top <= startTrigger) {
        progress = Math.min(1, (startTrigger - rect.top) / (startTrigger - endTrigger));
      }
      setScrollProgress(Math.max(0, Math.min(1, progress)));
    };

    const onScroll = () => {
      if (!isNear || ticking) return;
      ticking = true;
      requestAnimationFrame(compute);
    };
    const onResize = () => setIsMobile(window.innerWidth < 768);

    const io = new IntersectionObserver(
      (entries) => {
        isNear = entries[0].isIntersecting;
        if (isNear) compute();
      },
      { rootMargin: '50% 0px' }
    );
    if (containerRef.current) io.observe(containerRef.current);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    compute();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      io.disconnect();
    };
  }, []);

  // Calculate transforms based on scroll progress - responsive
  const maxSpread = isMobile ? 120 : 450; // Much larger spread for dramatic fan-out
  const spreadX = maxSpread * scrollProgress;
  const rotationAngle = (isMobile ? 8 : 18) * scrollProgress; // Increased rotation

  const cards = [
    {
      icon: Brain,
      title: 'Different Sources',
      body: 'LLMs pull from earned media, Wikipedia, structured data, and high-trust sources',
      tone: 'orange' as const,
    },
    {
      icon: CheckCircle,
      title: 'Authority Focused',
      body: 'They favor authority, credibility, and real-world citations—not just keyword rankings',
      tone: 'slate' as const,
    },
    {
      icon: TrendingUp,
      title: 'Recommendation Based',
      body: "They recommend based on who's consistently mentioned and clearly described",
      tone: 'orange' as const,
    },
  ];

  const Card = ({ card }: { card: typeof cards[number] }) => {
    const Icon = card.icon;
    const iconTone =
      card.tone === 'orange'
        ? 'bg-orange-50 text-orange-600'
        : 'bg-slate-100 text-slate-700';
    return (
      <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-5 ${iconTone}`}>
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-slate-900 mb-3">
          {card.title}
        </h3>
        <p className="text-slate-600 leading-relaxed">{card.body}</p>
      </div>
    );
  };

  return (
    <div ref={containerRef} className="relative py-16 overflow-visible">
      {/* Mobile: Vertical Stack */}
      <div className="md:hidden flex flex-col space-y-6 px-4">
        {cards.map((card) => (
          <div key={card.title} className="w-full max-w-sm mx-auto">
            <Card card={card} />
          </div>
        ))}
      </div>

      {/* Desktop: Fan-out animation (rAF-throttled scroll, IO-gated) */}
      <div className="hidden md:block relative w-full max-w-5xl mx-auto px-8 flex items-center justify-center min-h-[360px]">
        {/* Left */}
        <div
          className="absolute w-80 transition-all duration-700 ease-out"
          style={{
            left: '50%',
            transform: `translateX(-50%) translateX(${-spreadX}px) rotate(${-rotationAngle}deg)`,
          }}
        >
          <Card card={cards[0]} />
        </div>

        {/* Center */}
        <div
          className="absolute w-80 transition-all duration-700 ease-out"
          style={{
            left: '50%',
            transform: `translateX(-50%) rotate(0deg)`,
            zIndex: 10,
          }}
        >
          <Card card={cards[1]} />
        </div>

        {/* Right */}
        <div
          className="absolute w-80 transition-all duration-700 ease-out"
          style={{
            left: '50%',
            transform: `translateX(-50%) translateX(${spreadX}px) rotate(${rotationAngle}deg)`,
          }}
        >
          <Card card={cards[2]} />
        </div>
      </div>
    </div>
  );
};

export default AnimatedFeatureCards;