"use client";

import Image from "next/image";

const bonuses = [
  {
    title: "The State of Small Business Visibility in ChatGPT (2025 Report)",
    description: "Get the full picture. This exclusive research summary reveals how nearly 100 small businesses perform in real AI answers — and why most don't show up. See what's holding them back and what it takes to get on the map.",
    price: 39,
    image: "/lovable-uploads/industry_report.png"
  },
  {
    title: "LLM Visibility Cheat Sheet",
    description: "Based on insights from 100+ audits, this PDF gives you the exact playbook to become visible in AI results. Covers schema, citations, content gaps, and entity setup — everything you need to get recognised by ChatGPT, Claude, Gemini, and Perplexity.",
    price: 109,
    image: "/lovable-uploads/cheat_sheet.png"
  },
  {
    title: "Build Your Own Brand Tracker (Guide + Workflow)",
    description: "Never miss another brand mention. This guide shows you how to set up a fully automated brand tracking system using free tools and n8n — so you can catch citations, claim unlinked mentions, and turn them into backlinks.",
    price: 129,
    image: "/lovable-uploads/brand_tracker.png"
  },
  {
    title: "PR-Ready Checklist",
    description: "Want to get quoted or featured in the media? This checklist shows you what journalists look for before they include you — from your About page to your Google results. Use it to tighten your brand presentation and get press-ready fast.",
    price: 49,
    image: "/lovable-uploads/pr_checklist.png"
  }
];

const totalValue = bonuses.reduce((sum, bonus) => sum + bonus.price, 0);

export const BonusSection = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-background">
      {/* Checkered background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `repeating-linear-gradient(45deg, hsl(var(--foreground)) 0, hsl(var(--foreground)) 2px, transparent 2px, transparent 20px),
                         repeating-linear-gradient(-45deg, hsl(var(--foreground)) 0, hsl(var(--foreground)) 2px, transparent 2px, transparent 20px)`
      }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            Wait—That's Not All.<br />
            You're Getting These <span className="text-orange-500">Bonuses</span> Too.
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-2xl md:text-3xl font-semibold text-foreground/90 leading-relaxed mb-6">
              This is{" "}
              <span className="relative inline-block px-3 py-1 mx-1">
                <span className="absolute inset-0 bg-orange-500/20 animate-pulse rounded"></span>
                <span className="relative text-orange-500">unbelievable value</span>
              </span>
              {" "}—{" "}
              <span className="relative inline-block px-3 py-1 mx-1">
                <span className="absolute inset-0 bg-blue-500/20 animate-pulse rounded" style={{ animationDelay: '0.3s' }}></span>
                <span className="relative text-blue-500">completely free</span>
              </span>
              {" "}with every order.
            </p>
            <p className="text-xl md:text-2xl text-foreground/70 leading-relaxed max-w-3xl mx-auto">
              These aren't filler PDFs. They're built from{" "}
              <span className="relative inline-block px-2 py-0.5">
                <span className="absolute inset-0 bg-green-500/15 rounded" style={{ animation: 'pulse 3s ease-in-out infinite', animationDelay: '0.6s' }}></span>
                <span className="relative font-medium text-foreground">real audit insights</span>
              </span>
              , designed to help you take action fast.
            </p>
          </div>
        </div>

        {/* Bundle Image */}
        <div className="flex justify-center mb-16 animate-fade-in">
          <div className="max-w-4xl w-full relative">
            <Image
              src="/lovable-uploads/all_products_bundle.png"
              alt="All bonus products bundle"
              width={1200}
              height={600}
              className="w-full h-auto object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>

        {/* Total Value Badge */}
        <div className="text-center mb-20">
          <div className="inline-block">
            <div className="bg-gradient-to-r from-orange-500/20 via-orange-500/30 to-orange-500/20 border-4 border-orange-500 rounded-2xl px-12 py-8 shadow-[0_0_50px_rgba(249,115,22,0.3)] relative overflow-hidden">
              {/* Animated glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/20 to-transparent animate-[shimmer_2s_ease-in-out_infinite]"></div>
              
              <div className="relative flex flex-col items-center gap-3">
                <span className="text-3xl font-bold text-foreground uppercase tracking-wider">Total Value</span>
                
                {/* Price with animated strikethrough */}
                <div className="relative">
                  <span className="text-7xl font-black text-foreground">${totalValue}</span>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-2 bg-red-500 w-0 animate-[strikethrough_1.5s_ease-out_0.5s_forwards] origin-left" style={{
                      transform: 'rotate(-8deg)',
                      boxShadow: '0 0 10px rgba(239, 68, 68, 0.6)'
                    }}></div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-5xl font-black text-orange-500 animate-pulse">FREE</span>
                  <span className="text-2xl font-bold text-foreground/80">with every order</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid - 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
          {bonuses.map((bonus, index) => (
            <div 
              key={index}
              className="animate-fade-in group flex flex-col items-center"
              style={{ animationDelay: `${index * 100}ms` }}
              data-testid={`bonus-card-${index}`}
            >
              {/* Product Image with Hover Effect */}
              <div className="mb-6 relative">
                {/* Glowing gradient backdrop - visible on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 to-blue-500/30 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-110"></div>
                
                {/* Image container with hover animations */}
                <div className="relative transition-all duration-500 ease-out group-hover:scale-105 group-hover:-rotate-2">
                  <Image
                    src={bonus.image}
                    alt={bonus.title}
                    width={280}
                    height={400}
                    className="w-auto h-[280px] object-contain drop-shadow-2xl transition-all duration-500 group-hover:drop-shadow-[0_20px_40px_rgba(249,115,22,0.3)]"
                  />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-3 leading-tight text-center min-h-[3.5rem] flex items-center px-2">
                {bonus.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground mb-5 leading-relaxed text-sm text-center px-2 flex-grow">
                {bonus.description}
              </p>

              {/* Price Badge */}
              <div className="flex flex-col items-center gap-2 mt-auto">
                <div className="relative inline-block">
                  <span className="text-2xl font-bold text-muted-foreground/60 line-through decoration-2 decoration-red-500">
                    ${bonus.price}
                  </span>
                </div>
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2.5 rounded-full shadow-lg">
                  <span className="text-xl font-black tracking-wider">FREE</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
