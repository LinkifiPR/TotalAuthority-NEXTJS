"use client";

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import HowItWorksSection from '@/components/HowItWorksSection';
import { AuditTestimonialsSection } from '@/components/AuditTestimonialsSection';
import { BestForSection } from '@/components/BestForSection';
import { CompetitorCTASection } from '@/components/CompetitorCTASection';
import { ReportIncludesSection } from '@/components/ReportIncludesSection';
import { NoIdeaSection } from '@/components/NoIdeaSection';
import { ComparisonTableSection } from '@/components/ComparisonTableSection';
import { AuditPricingSection } from '@/components/AuditPricingSection';
import { BonusSection } from '@/components/BonusSection';
import { FAQSection } from '@/components/FAQSection';
import { FinalCTA } from '@/components/FinalCTA';

const LLMVisibilityAudit = () => {
  return (
    <>
      <Helmet>
        <title>LLM Visibility Audit - Get Your AI Visibility Score</title>
        <meta name="description" content="Are you invisible to AI? Get your LLM Visibility Score and have your business show up before competitors in AI search results." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-white via-orange-50/30 to-white">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          {/* Crosshatch Background Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03]" 
            style={{
              backgroundImage: `
                linear-gradient(0deg, #000 1px, transparent 1px),
                linear-gradient(90deg, #000 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}
          />

          <div className="max-w-6xl mx-auto text-center relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-orange-100 rounded-full mb-8 border border-orange-200">
              <span className="text-sm font-medium text-orange-900">
                Most Efficient Way to Grow in 2025
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
              Are you invisible to AI?
              <br />
              Get your <span className="text-orange-600">AI Visibility Score UP</span>
              <ArrowUpRight className="inline-block w-12 h-12 md:w-16 md:h-16 text-orange-600 ml-2" />
            </h1>

            {/* CTA Button */}
            <div className="mt-12 mb-4">
              <Button 
                onClick={() => window.location.href = 'https://app.totalauthority.com/ai-visibility-audit'}
                size="lg"
                className="bg-orange-600 hover:bg-orange-700 text-white px-16 py-8 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
              >
                Start Your Audit Now
              </Button>
            </div>

            {/* Price */}
            <div className="flex items-center justify-center gap-3">
              <span className="relative text-2xl text-slate-400 font-bold">
                $89
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                  <line x1="0" y1="35" x2="100" y2="5" stroke="#f97316" strokeWidth="3" />
                </svg>
              </span>
              <p className="text-sm text-slate-600 font-medium">
                ONLY $17 - Limited time price
              </p>
            </div>

            {/* AI Platform Logos */}
            <div className="flex items-center justify-center gap-12 mt-8">
              <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all">
                <img 
                  src="https://cdn.brandfetch.io/perplexity.ai/w/512/h/512?c=1idP0DrE2OZDRG5HYTw" 
                  alt="Perplexity" 
                  className="h-12 w-12 object-contain opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all">
                <img 
                  src="https://cdn.brandfetch.io/openai.com/w/512/h/139/logo?c=1idP0DrE2OZDRG5HYTw" 
                  alt="OpenAI" 
                  className="h-10 object-contain opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all">
                <img 
                  src="https://cdn.brandfetch.io/google.com/w/512/h/161/logo?c=1idP0DrE2OZDRG5HYTw" 
                  alt="Google" 
                  className="h-10 object-contain opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all">
                <img 
                  src="https://cdn.brandfetch.io/claude.ai/w/512/h/111/logo?c=1idP0DrE2OZDRG5HYTw" 
                  alt="Claude" 
                  className="h-10 object-contain opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          </div>
        </section>

        {/* LLM Visibility Audit Preview Section */}
        <section className="pt-4 pb-16 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 md:p-12 animate-fade-in">
              {/* Section Header */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-2">
                  ChatGPT Visibility Audit
                </h2>
                <p className="text-slate-600">
                  Have your business show up before competitors.
                </p>
              </div>

              {/* Chart Area */}
              <div className="bg-slate-50 rounded-2xl p-8 mb-8 group">
                <svg className="w-full h-64 animate-scale-in" viewBox="0 0 800 300" preserveAspectRatio="xMidYMid meet">
                  <style>
                    {`
                      .chart-line {
                        transition: all 0.3s ease;
                        animation: drawLine 1.5s ease-out forwards;
                        stroke-dasharray: 1000;
                        stroke-dashoffset: 1000;
                      }
                      @keyframes drawLine {
                        to {
                          stroke-dashoffset: 0;
                        }
                      }
                      .group:hover .chart-line {
                        stroke-width: 3;
                        filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
                      }
                      .chart-area {
                        transition: all 0.3s ease;
                        animation: fadeInArea 1s ease-out 0.3s forwards;
                        opacity: 0;
                      }
                      @keyframes fadeInArea {
                        to {
                          opacity: 0.8;
                        }
                      }
                      .group:hover .chart-area {
                        opacity: 0.9;
                      }
                    `}
                  </style>
                  <defs>
                    <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: 'rgb(251, 146, 60)', stopOpacity: 0.8 }} />
                      <stop offset="100%" style={{ stopColor: 'rgb(251, 146, 60)', stopOpacity: 0.2 }} />
                    </linearGradient>
                    <linearGradient id="brownGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: 'rgb(120, 113, 108)', stopOpacity: 0.6 }} />
                      <stop offset="100%" style={{ stopColor: 'rgb(120, 113, 108)', stopOpacity: 0.3 }} />
                    </linearGradient>
                  </defs>
                  
                  {/* Competitor area (brown) */}
                  <path
                    className="chart-area"
                    d="M 50 200 L 150 180 L 250 170 L 350 160 L 450 155 L 550 150 L 650 148 L 750 145 L 750 250 L 50 250 Z"
                    fill="url(#brownGradient)"
                  />
                  <path
                    className="chart-line"
                    d="M 50 200 L 150 180 L 250 170 L 350 160 L 450 155 L 550 150 L 650 148 L 750 145"
                    stroke="rgb(87, 83, 78)"
                    strokeWidth="2"
                    fill="none"
                  />
                  
                  {/* Your Business area (orange) */}
                  <path
                    className="chart-area"
                    d="M 50 180 L 150 160 L 250 140 L 350 110 L 450 90 L 550 70 L 650 60 L 750 50 L 750 250 L 50 250 Z"
                    fill="url(#orangeGradient)"
                  />
                  <path
                    className="chart-line"
                    d="M 50 180 L 150 160 L 250 140 L 350 110 L 450 90 L 550 70 L 650 60 L 750 50"
                    stroke="rgb(234, 88, 12)"
                    strokeWidth="2"
                    fill="none"
                  />

                  {/* Labels */}
                  <circle cx="750" cy="50" r="5" fill="rgb(249, 115, 22)" />
                  <text x="760" y="55" fontSize="14" fill="rgb(51, 65, 85)" fontWeight="500">Your Business</text>
                  
                  <circle cx="750" cy="145" r="5" fill="rgb(87, 83, 78)" />
                  <text x="760" y="150" fontSize="14" fill="rgb(51, 65, 85)" fontWeight="500">Competitor</text>
                </svg>
              </div>

              {/* Rankings Table */}
              <div className="overflow-hidden rounded-xl border border-slate-200">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Rank</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Company</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Position</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Citations</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100 bg-green-50/50">
                      <td className="px-6 py-4">
                        <span className="text-green-600 font-bold">#1</span>
                        <span className="ml-2 text-xs text-green-600">↑1</span>
                      </td>
                      <td className="px-6 py-4 flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="font-medium text-slate-900">Your Business</span>
                      </td>
                      <td className="px-6 py-4 text-slate-700">1.0</td>
                      <td className="px-6 py-4">
                        <span className="text-green-600 font-semibold">11 URLs</span>
                      </td>
                    </tr>
                    <tr className="bg-red-50/50">
                      <td className="px-6 py-4">
                        <span className="text-red-600 font-bold">#2</span>
                        <span className="ml-2 text-xs text-red-600">↓3</span>
                      </td>
                      <td className="px-6 py-4 flex items-center gap-2">
                        <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                        <span className="font-medium text-slate-700">Competitor</span>
                      </td>
                      <td className="px-6 py-4 text-slate-700">2.0</td>
                      <td className="px-6 py-4">
                        <span className="text-red-600 font-semibold">2 URLs</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* AI Invisibility Section */}
        <section className="py-24 px-4 bg-blue-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center justify-items-center md:w-fit mx-auto">
              {/* Left Content */}
              <div className="animate-fade-in">
                <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-8 leading-tight">
                  If you're not recommended by AI,{' '}
                  <span className="text-orange-600 relative inline-block">
                    you're invisible
                    <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 400 15" preserveAspectRatio="none">
                      <path d="M5,10 Q50,3 95,8 Q140,13 185,7 Q230,4 275,9 Q320,12 365,8" 
                            stroke="#EA580C" 
                            strokeWidth="4" 
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"/>
                    </svg>
                  </span>
                  .
                </h2>
                
                <p className="text-xl text-slate-700 mb-6 leading-relaxed">
                  Your customers are changing how they search. Instead of just Googling, they're asking AI assistants for direct recommendations.
                </p>
                
                <p className="text-xl text-slate-700 mb-6 leading-relaxed">
                  They're asking, "Who's the best plumber near me?" or "Compare the top real estate agents in downtown."
                </p>
                
                <p className="text-xl text-slate-900 mb-10 leading-relaxed">
                  When that question is asked, a new kind of list is being created, and <strong className="font-semibold">your business is either on it, or it doesn't exist</strong>.
                </p>
                
                <Button 
                  onClick={() => window.location.href = 'https://app.totalauthority.com/ai-visibility-audit'}
                  size="lg"
                  className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-6 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Start Your Audit Now
                </Button>
              </div>

              {/* Right Illustration */}
              <div className="relative animate-scale-in flex justify-center">
                <svg viewBox="0 0 500 500" className="w-full max-w-lg">
                  {/* Browser Window */}
                  <rect x="60" y="40" width="340" height="360" rx="20" fill="#B8BCC4" stroke="#000" strokeWidth="3"/>
                  
                  {/* Browser Header */}
                  <rect x="60" y="40" width="340" height="60" rx="20" fill="#93B5E1"/>
                  <rect x="60" y="80" width="340" height="20" fill="#93B5E1"/>
                  
                  {/* Browser Dots */}
                  <circle cx="90" cy="65" r="8" fill="#FF9B7A"/>
                  <circle cx="120" cy="65" r="8" fill="#FFD88A"/>
                  <circle cx="150" cy="65" r="8" fill="#A8E6A3"/>
                  
                  {/* Content Lines */}
                  <line x1="90" y1="140" x2="220" y2="140" stroke="#000" strokeWidth="4" strokeLinecap="round"/>
                  <line x1="90" y1="190" x2="340" y2="190" stroke="#000" strokeWidth="4" strokeLinecap="round"/>
                  <line x1="90" y1="220" x2="370" y2="220" stroke="#000" strokeWidth="4" strokeLinecap="round"/>
                  <line x1="90" y1="250" x2="350" y2="250" stroke="#000" strokeWidth="4" strokeLinecap="round"/>
                  <line x1="90" y1="280" x2="370" y2="280" stroke="#000" strokeWidth="4" strokeLinecap="round"/>
                  <line x1="90" y1="310" x2="310" y2="310" stroke="#000" strokeWidth="4" strokeLinecap="round"/>
                  <line x1="90" y1="340" x2="240" y2="340" stroke="#000" strokeWidth="4" strokeLinecap="round"/>
                  
                  {/* Search Bar */}
                  <rect x="90" y="355" width="280" height="35" rx="18" fill="white" stroke="#000" strokeWidth="3"/>
                  <line x1="110" y1="372" x2="140" y2="372" stroke="#64748B" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M 350 365 L 360 372 L 350 380" stroke="#000" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  
                  {/* Person */}
                  {/* Head */}
                  <circle cx="380" cy="250" r="40" fill="white" stroke="#000" strokeWidth="3"/>
                  
                  {/* Body */}
                  <path d="M 340 290 L 340 380 L 420 380 L 420 290 Z" fill="#93B5E1" stroke="#000" strokeWidth="3"/>
                  
                  {/* Legs */}
                  <path d="M 340 380 L 340 460 L 365 460 L 365 380 Z" fill="#7CA3D1" stroke="#000" strokeWidth="3"/>
                  <path d="M 395 380 L 395 460 L 420 460 L 420 380 Z" fill="#7CA3D1" stroke="#000" strokeWidth="3"/>
                  
                  {/* Arm pointing */}
                  <path d="M 340 310 Q 280 300 240 310 L 250 330 Q 285 320 340 335 Z" fill="#93B5E1" stroke="#000" strokeWidth="3"/>
                  
                  {/* Hand/Finger */}
                  <ellipse cx="238" cy="318" rx="12" ry="15" fill="#93B5E1" stroke="#000" strokeWidth="3"/>
                  <path d="M 228 315 L 220 310 L 223 303 L 231 308 Z" fill="#93B5E1" stroke="#000" strokeWidth="3"/>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-20 px-4 bg-blue-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center animate-fade-in">
                <div className="text-6xl font-bold text-slate-900 mb-3">10,000+</div>
                <div className="text-xl text-slate-600 font-medium">Queries Tested</div>
              </div>
              <div className="text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="text-6xl font-bold text-slate-900 mb-3">2,000+</div>
                <div className="text-xl text-slate-600 font-medium">Businesses Analyzed</div>
              </div>
              <div className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="text-6xl font-bold text-slate-900 mb-3">50+</div>
                <div className="text-xl text-slate-600 font-medium">Industries Covered</div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <HowItWorksSection />

        {/* Testimonials Section */}
        <AuditTestimonialsSection />

        {/* Best For Section */}
        <BestForSection />

        {/* Competitor CTA Section */}
        <CompetitorCTASection />

        {/* Report Includes Section */}
        <ReportIncludesSection />

        {/* No Idea Section */}
        <NoIdeaSection />

        {/* Comparison Table Section */}
        <ComparisonTableSection />

        {/* Audit Pricing Section */}
        <AuditPricingSection />

        {/* Bonus Section */}
        <BonusSection />

        {/* FAQ Section */}
        <FAQSection />

        {/* Final CTA */}
        <FinalCTA />
      </div>
    </>
  );
};

export default LLMVisibilityAudit;
