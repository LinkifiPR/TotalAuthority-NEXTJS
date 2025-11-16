"use client";

import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FormPopup } from '@/components/FormPopup';
import { useFormPopup } from '@/hooks/useFormPopup';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Search, Brain, Globe, Target, TrendingUp, Users, Zap, ArrowRight, Star, MessageCircle, BarChart3, Shield, Sparkles, Eye, Award, Bot, Network, Cpu, Activity, ShoppingCart, Phone, CreditCard } from "lucide-react";
import { LLMGrowthChart } from '@/components/LLMGrowthChart';
import { BOOKING_URL } from '@/config/links';

const FullAudit = () => {
  const { isOpen, openForm, closeForm } = useFormPopup();

  // AI Logos from homepage
  const aiLogos = [
    {
      name: "OpenAI",
      url: "https://cdn.brandfetch.io/openai.com/w/512/h/139/logo?c=1idP0DrE2OZDRG5HYTw",
      size: "h-8"
    },
    {
      name: "Claude",
      url: "https://cdn.brandfetch.io/claude.ai/w/512/h/111/logo?c=1idP0DrE2OZDRG5HYTw",
      size: "h-8"
    },
    {
      name: "Perplexity",
      url: "https://cdn.brandfetch.io/perplexity.ai/w/512/h/512?c=1idP0DrE2OZDRG5HYTw",
      size: "h-10 w-10"
    },
    {
      name: "Google",
      url: "https://cdn.brandfetch.io/google.com/w/512/h/161/logo?c=1idP0DrE2OZDRG5HYTw",
      size: "h-8"
    }
  ];
  const quickWins = [
    "Schema and boilerplate fixes",
    "Review profile claims", 
    "Easy citation upgrades"
  ];

  const longTermPlays = [
    "PR and content placement strategy",
    "Entity creation and profile optimization",
    "Listicle outreach and AI-friendly content positioning"
  ];

  const auditFeatures = [
    {
      icon: MessageCircle,
      title: "What Prospects Are Really Asking LLMs",
      description: "This isn't just about 'best X' lists. We analyze the entire discovery journey — from first pain point to final vendor choice. We surface the exact prompts your prospects are asking inside LLMs.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Eye,
      title: "How You Show Up When Buyers Ask AI", 
      description: "We run dozens of real prompts across ChatGPT, Claude, Gemini, and Perplexity to test if you appear in recommendations, how you compare to competitors, and what's influencing the answers.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Brain,
      title: "What the AI Models Know About You",
      description: "We assess core brand data, review signals, media credibility, metadata, boilerplate, and structured information. Outdated or inconsistent data means you don't get recommended.",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: Shield,
      title: "Whether You're an Entity They Can Trust",
      description: "We check Google Knowledge Panel status, entity resolution on LinkedIn, Crunchbase, G2, Wikidata, and on-site schema. If LLMs don't recognize you as credible, you're not on the shortlist.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: BarChart3,
      title: "What's Influencing the Answers — and Where You're Missing",
      description: "We map the real sources shaping recommendations: high-authority listicles, review hubs, blogs, forums. Sites that mention your competitors — but not you.",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: Award,
      title: "A Full Digital Authority & Reputation Pulse",
      description: "We scan domain authority and backlinks, presence and ratings on trusted review platforms, and consistency across key citations and descriptions.",
      color: "from-violet-500 to-purple-500"
    }
  ];

  const whoThisIsFor = [
    {
      icon: "⚖️",
      title: "Professional Services",
      description: "Real estate brokerages, law firms, financial advisors — anyone who relies on trust, reputation, and referrals.",
      gradient: "from-blue-500/10 to-cyan-500/10",
      border: "border-blue-500/20"
    },
    {
      icon: "🧹",
      title: "SaaS, Service, and Product Companies", 
      description: "Especially those in competitive or commoditized categories, where differentiation matters.",
      gradient: "from-purple-500/10 to-pink-500/10",
      border: "border-purple-500/20"
    },
    {
      icon: "📈",
      title: "Agencies & Growth Teams",
      description: "Brands investing in SEO, PR, or thought leadership — but unsure how that translates into AI visibility.",
      gradient: "from-emerald-500/10 to-teal-500/10",
      border: "border-emerald-500/20"
    },
    {
      icon: "🧠",
      title: "Founders & CMOs",
      description: "Leaders who want to own their narrative in AI-generated search results — before their competitors do.",
      gradient: "from-orange-500/10 to-red-500/10",
      border: "border-orange-500/20"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-blue-50">
      <Header onOpenForm={openForm} />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 md:pt-24 pb-12 md:pb-20 px-4">
        {/* Animated robotic background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Matrix-style floating elements */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-orange-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse robot-glow"></div>
          <div className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-r from-purple-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse robot-glow" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse robot-glow" style={{animationDelay: '2s'}}></div>
          
          {/* Floating tech icons */}
          <div className="absolute top-32 left-20 animate-float">
            <Brain className="w-8 h-8 text-orange-500/30" />
          </div>
          <div className="absolute top-60 right-32 animate-float" style={{animationDelay: '1s'}}>
            <Bot className="w-10 h-10 text-blue-500/30" />
          </div>
          <div className="absolute bottom-60 left-32 animate-float" style={{animationDelay: '2s'}}>
            <Cpu className="w-7 h-7 text-purple-500/30" />
          </div>
          <div className="absolute bottom-32 right-20 animate-float" style={{animationDelay: '0.5s'}}>
            <Network className="w-9 h-9 text-orange-500/30" />
          </div>
          <div className="absolute top-80 left-1/2 animate-float" style={{animationDelay: '1.5s'}}>
            <Activity className="w-6 h-6 text-blue-500/30" />
          </div>
          
          {/* Tech grid lines */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full" style={{
              backgroundImage: `
                radial-gradient(circle at 2px 2px, rgba(249, 115, 22, 0.3) 1px, transparent 0),
                linear-gradient(90deg, rgba(249, 115, 22, 0.1) 0%, transparent 50%, rgba(59, 130, 246, 0.1) 100%)
              `,
              backgroundSize: '40px 40px, 100% 100%'
            }}></div>
          </div>
          
          {/* Animated circuit lines */}
          <div className="absolute top-20 left-10 w-32 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent tech-line"></div>
          <div className="absolute top-40 right-20 w-px h-24 bg-gradient-to-b from-transparent via-blue-500/50 to-transparent tech-line" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-40 left-1/3 w-40 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent tech-line" style={{animationDelay: '4s'}}></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-500/10 via-blue-500/10 to-purple-500/10 border border-orange-500/20 rounded-full mb-8 backdrop-blur-sm hover:border-orange-500/40 transition-all duration-300">
              <Sparkles className="w-5 h-5 text-orange-500 animate-pulse" />
              <span className="text-lg font-semibold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
                🚀 Strategy Blueprint
              </span>
              <Sparkles className="w-5 h-5 text-blue-500 animate-pulse" style={{animationDelay: '0.5s'}} />
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 md:mb-8 leading-tight">
              <span className="bg-gradient-to-r from-slate-900 via-orange-600 to-blue-600 bg-clip-text text-transparent">
                The Era of LLM Search
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 bg-clip-text text-transparent">
                Is Here
              </span>
            </h1>

            <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-slate-600 mb-6 md:mb-8 leading-relaxed max-w-4xl mx-auto px-4">{/* ... keep existing paragraph content ... */}
              Millions of buyers now turn to <span className="font-bold text-orange-600">ChatGPT</span>, <span className="font-bold text-purple-600">Claude</span>, <span className="font-bold text-blue-600">Gemini</span>, and <span className="font-bold text-emerald-600">Perplexity</span> instead of Google.
            </p>
            
            {/* AI Logos Section */}
            <div className="mb-12">
              <p className="text-sm text-slate-500 mb-6 font-medium">We test across all major AI platforms</p>
              <div className="flex justify-center items-center gap-8 flex-wrap">
                {aiLogos.map((logo, index) => (
                  <div 
                    key={logo.name} 
                    className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 border border-orange-200/50 robot-glow animate-wobble"
                  >
                    <img 
                      src={logo.url} 
                      alt={logo.name} 
                      className={`${logo.size} object-contain opacity-80 hover:opacity-100 transition-opacity duration-300`} 
                      loading="lazy" 
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-2xl p-8 md:p-12 mb-12 relative overflow-hidden border border-slate-700 max-w-4xl mx-auto">
              {/* Animated background elements */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full" style={{
                  backgroundImage: `
                    radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0),
                    linear-gradient(90deg, rgba(59, 130, 246, 0.1) 0%, transparent 50%, rgba(147, 51, 234, 0.1) 100%)
                  `,
                  backgroundSize: '40px 40px, 100% 100%'
                }}></div>
              </div>

              {/* Floating tech particles */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-6 right-12 animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}>
                  <Brain className="w-6 h-6 text-blue-400 opacity-40" />
                </div>
                <div className="absolute top-16 left-12 animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}>
                  <Sparkles className="w-5 h-5 text-purple-400 opacity-35" />
                </div>
                <div className="absolute bottom-16 right-16 animate-bounce" style={{animationDelay: '2s', animationDuration: '3.5s'}}>
                  <Zap className="w-5 h-5 text-orange-400 opacity-40" />
                </div>
              </div>

              <div className="relative z-10 space-y-6">
                <p className="text-2xl md:text-3xl text-slate-300 italic leading-relaxed">
                  "What's the best <span className="text-orange-400 font-semibold">[solution]</span> for my needs?"
                </p>
                <p className="text-2xl md:text-3xl text-slate-300 italic leading-relaxed">
                  "Who should I trust with <span className="text-blue-400 font-semibold">[problem]</span>?"
                </p>
                <p className="text-2xl md:text-3xl text-slate-300 italic leading-relaxed">
                  "Is <span className="text-purple-400 font-semibold">[your brand]</span> any good?"
                </p>
              </div>
            </div>

            <div className="space-y-8 mb-12">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 space-y-4">
                <p>These tools don't return 10 blue links.</p>
                <p>They <span className="bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">answer</span> the question — and recommend who they trust.</p>
              </div>
              <div className="relative bg-gradient-to-br from-red-50 via-orange-50 to-red-50 border-2 border-red-300/50 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto shadow-2xl overflow-hidden backdrop-blur-sm">
                {/* Animated warning elements */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-4 right-8 animate-bounce">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  </div>
                  <div className="absolute bottom-6 left-12 animate-bounce" style={{animationDelay: '1s'}}>
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  </div>
                  <div className="absolute top-1/2 right-16 animate-bounce" style={{animationDelay: '0.5s'}}>
                    <div className="w-4 h-4 bg-red-400 rounded-full"></div>
                  </div>
                </div>
                
                {/* Glowing border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20 rounded-3xl blur-xl"></div>
                
                <div className="relative z-10 text-center">
                  <div className="inline-flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                      <span className="text-white text-xl font-bold">⚠️</span>
                    </div>
                  </div>
                  <p className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-red-600 via-orange-600 to-red-700 bg-clip-text text-transparent leading-relaxed">
                    If your brand isn't showing up...
                    <br />
                    <span className="text-3xl md:text-5xl">You're invisible in the next generation of search.</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Button size="lg" asChild className="group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-xl px-12 py-8 rounded-2xl shadow-2xl hover:shadow-3xl hover:shadow-orange-500/25 hover:scale-105 transition-all duration-300 border-2 border-orange-400 robot-glow pulse hover:animate-none relative overflow-hidden w-full sm:w-auto">
                <a href="https://go.totalauthority.com/widget/form/IDsBlNLPcfoCN3EcyU7x" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <CreditCard className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                  Buy Now
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </Button>
              
              <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Polished PDF report with screenshots</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Visibility scores and gaps analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Strategic action plan included</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LLM SEO Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-slate-100 via-white to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-orange-500 to-blue-500 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full blur-2xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-5xl mx-auto mb-12 md:mb-20">
            <h2 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 md:mb-12 leading-tight">
              <span className="bg-gradient-to-r from-slate-900 via-orange-600 to-blue-600 bg-clip-text text-transparent">
                LLM SEO Is the New
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 bg-clip-text text-transparent">
                Competitive Frontier
              </span>
            </h2>
            
            <div className="space-y-6 md:space-y-8">
              <p className="text-lg md:text-xl lg:text-2xl text-slate-600 leading-relaxed px-4">
                Traditional SEO and PR aren't enough. LLMs use different signals, different sources, and different logic to decide who gets recommended.
              </p>
              
              <div className="bg-gradient-to-r from-orange-500/10 to-blue-500/10 border border-orange-500/20 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 backdrop-blur-sm mx-4 md:mx-0">
                <p className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 mb-4 md:mb-6">
                  That's why we built the <span className="bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">Full LLM Visibility Strategy Blueprint</span>:
                </p>
                <p className="text-lg md:text-xl lg:text-2xl text-slate-700 leading-relaxed">
                  A complete teardown of how you appear across AI-powered tools — and a clear plan to dominate them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LLM Growth Chart Section */}
      <LLMGrowthChart />

      {/* What We Uncover Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-slate-100 via-orange-50/30 to-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(249, 115, 22, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)
            `
          }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 md:mb-20">
            <div className="inline-flex items-center gap-3 px-4 md:px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full mb-6 md:mb-8 backdrop-blur-sm mx-4 md:mx-0">
              <Search className="w-5 md:w-6 h-5 md:h-6 text-blue-600" />
              <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                🔎 Inside the Strategy Blueprint: What We Uncover
              </span>
            </div>
            
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent px-4">
              Six Critical Visibility Factors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto px-4 md:px-0">
            {auditFeatures.map((feature, index) => (
              <Card 
                key={index} 
                className="group relative overflow-hidden bg-white/95 border-2 border-orange-200/50 transition-all duration-300 hover:border-orange-400/80 hover:shadow-xl rounded-2xl md:rounded-3xl shadow-lg"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <CardContent className="p-6 md:p-8 relative z-10">
                  <div className="flex items-center mb-4 md:mb-6">
                    <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl bg-gradient-to-br ${feature.color} shadow-md mr-3 md:mr-4 transition-transform duration-300`}>
                      <feature.icon className="h-6 w-6 md:h-7 md:w-7 text-white" />
                    </div>
                    <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                      {index + 1}.
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-3 md:mb-4 text-slate-900 transition-colors leading-tight">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-base md:text-lg transition-colors">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Action Plan Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-slate-100 via-white to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-32 left-16 w-40 h-40 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-32 right-16 w-48 h-48 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 md:mb-20">
            <div className="inline-flex items-center gap-3 px-4 md:px-6 py-3 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-full mb-6 md:mb-8 backdrop-blur-sm mx-4 md:mx-0">
              <Sparkles className="w-5 md:w-6 h-5 md:h-6 text-emerald-600" />
              <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                🌟 Your Personalized Action Plan
              </span>
            </div>
            
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent px-4">
              Fast Wins & Long-Term Strategy
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-slate-600 leading-relaxed max-w-3xl mx-auto px-4">
              You'll get a prioritized roadmap with both fast and foundational moves to dominate AI search
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto px-4 md:px-0">
            <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 md:hover:scale-110 hover:-translate-y-2 bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200/50 hover:border-emerald-400/80 relative overflow-hidden" style={{filter: 'drop-shadow(0 20px 40px rgba(16, 185, 129, 0.15))'}}>
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 group-hover:from-emerald-500/15 group-hover:to-teal-500/15 transition-all duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-blue-500/5 group-hover:from-orange-500/10 group-hover:to-blue-500/10 transition-all duration-500"></div>
              
              <CardContent className="p-6 md:p-10 relative z-10">
                <div className="flex items-center mb-6 md:mb-8">
                  <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg mr-3 md:mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Zap className="h-6 w-6 md:h-8 md:w-8 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900">Quick Wins (30 Days)</h3>
                </div>
                <ul className="space-y-3 md:space-y-4">
                  {quickWins.map((item, index) => (
                    <li key={index} className="flex items-start group-hover:scale-105 transition-transform duration-300">
                      <div className="p-1 rounded-full bg-emerald-500 mr-3 md:mr-4 mt-1 flex-shrink-0">
                        <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-white" />
                      </div>
                      <span className="text-base md:text-lg text-slate-700 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 md:hover:scale-110 hover:-translate-y-2 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200/50 hover:border-blue-400/80 relative overflow-hidden" style={{filter: 'drop-shadow(0 20px 40px rgba(59, 130, 246, 0.15))'}}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 group-hover:from-blue-500/15 group-hover:to-indigo-500/15 transition-all duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-purple-500/5 group-hover:from-orange-500/10 group-hover:to-purple-500/10 transition-all duration-500"></div>
              
              <CardContent className="p-6 md:p-10 relative z-10">
                <div className="flex items-center mb-6 md:mb-8">
                  <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 shadow-lg mr-3 md:mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Target className="h-6 w-6 md:h-8 md:w-8 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900">Long-Term Plays (90–180 Days)</h3>
                </div>
                <ul className="space-y-3 md:space-y-4">
                  {longTermPlays.map((item, index) => (
                    <li key={index} className="flex items-start group-hover:scale-105 transition-transform duration-300">
                      <div className="p-1 rounded-full bg-blue-500 mr-3 md:mr-4 mt-1 flex-shrink-0">
                        <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-white" />
                      </div>
                      <span className="text-base md:text-lg text-slate-700 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Who This Is For Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-orange-50 to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(249, 115, 22, 0.1) 0%, transparent 50%)
            `
          }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-500/10 to-blue-500/10 border border-orange-500/20 rounded-full mb-8 backdrop-blur-sm">
              <Users className="w-6 h-6 text-orange-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
                💡 Who This Is For
              </span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
              Perfect For Forward-Thinking Leaders
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {whoThisIsFor.map((item, index) => (
              <Card key={index} className={`group hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-br ${item.gradient} border-2 ${item.border} hover:border-opacity-60 relative overflow-hidden backdrop-blur-sm`}>
                <CardContent className="p-10 relative z-10">
                  <div className="flex items-center mb-6">
                    <span className="text-5xl mr-6 group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 group-hover:text-slate-800 transition-colors">{item.title}</h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-lg group-hover:text-slate-700 transition-colors">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Walk Away With */}
      <section className="py-24 bg-gradient-to-br from-slate-100 via-white to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-orange-500 to-red-500 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500/10 to-orange-500/10 border border-purple-500/20 rounded-full mb-8 backdrop-blur-sm">
              <Star className="w-6 h-6 text-purple-600 animate-pulse" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-orange-600 bg-clip-text text-transparent">
                ⚡ What You'll Walk Away With
              </span>
              <Star className="w-6 h-6 text-orange-600 animate-pulse" style={{animationDelay: '0.5s'}} />
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-slate-900 to-purple-900 bg-clip-text text-transparent">
              Complete AI Visibility Intelligence
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-8 max-w-6xl mx-auto">
            {[
              "A full breakdown of how your brand appears (or doesn't) across ChatGPT, Claude, Gemini, and Perplexity",
              "A clear understanding of the exact research your prospects are doing in LLMs",
              "The exact sources the LLMs are citing, so you can target the domains that shape recommendations",
              "The exact content types you should be creating to earn those citations and influence answers",
              "A prioritized action plan covering both quick wins and long-term plays",
              "A prompt pack so you can track visibility and changes over time",
              "Everything delivered in a polished PDF report with screenshots, scores, and source links"
            ].map((item, index) => (
              <Card 
                key={index} 
                className="group relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-slate-700 hover:border-purple-500/50 shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 hover:scale-105 hover:-translate-y-2"
                style={{
                  filter: 'drop-shadow(0 25px 50px rgba(147, 51, 234, 0.15))',
                  background: 'linear-gradient(135deg, rgba(15, 23, 42, 1) 0%, rgba(30, 41, 59, 1) 50%, rgba(15, 23, 42, 1) 100%)',
                  boxShadow: `
                    0 25px 50px -12px rgba(0, 0, 0, 0.4),
                    0 25px 50px -12px rgba(147, 51, 234, 0.2),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1),
                    inset 0 -1px 0 rgba(147, 51, 234, 0.2)
                  `
                }}
              >
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                  <div className="absolute top-0 left-0 w-full h-full" style={{
                    backgroundImage: `
                      radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0),
                      linear-gradient(90deg, rgba(147, 51, 234, 0.1) 0%, transparent 50%, rgba(249, 115, 22, 0.1) 100%)
                    `,
                    backgroundSize: '40px 40px, 100% 100%'
                  }}></div>
                </div>

                {/* Glowing border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-orange-500/20 to-purple-500/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Floating decorative elements */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-purple-500/20 to-orange-500/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                  <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-tr from-orange-500/15 to-blue-500/15 rounded-full blur-xl group-hover:scale-125 transition-transform duration-700" style={{animationDelay: '0.2s'}}></div>
                </div>

                <CardContent className="p-8 relative z-10">
                  <div className="flex items-start group-hover:scale-105 transition-transform duration-300">
                    {/* Enhanced Star Icon Container */}
                    <div className="relative mr-6 mt-2 flex-shrink-0">
                        <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500 via-orange-500 to-purple-600 shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 relative overflow-hidden">
                          {/* Inner glow effect */}
                          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
                          <Star className="h-6 w-6 text-white relative z-10" />
                        
                        {/* Pulsing ring effect */}
                        <div className="absolute inset-0 rounded-2xl border-2 border-white/30 animate-pulse"></div>
                      </div>
                      
                      {/* Floating sparkle effects */}
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full animate-ping opacity-75"></div>
                      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-60" style={{animationDelay: '0.5s'}}></div>
                    </div>
                    
                    {/* Enhanced Text Content */}
                    <div className="flex-1">
                      <span className="text-lg md:text-xl leading-relaxed text-slate-300 group-hover:text-white transition-colors duration-300 font-medium">
                        {item}
                      </span>
                      
                      {/* Progress indicator */}
                      <div className="mt-4 h-1 bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-purple-500 to-orange-500 rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700"
                          style={{animationDelay: `${index * 0.1}s`}}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                
                {/* Premium number badge */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-orange-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {index + 1}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-orange-50 via-blue-50 to-purple-50 relative overflow-hidden">
        {/* Background animations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-orange-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-purple-400/15 to-pink-400/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-500/10 via-blue-500/10 to-purple-500/10 border border-orange-500/20 rounded-full mb-8 backdrop-blur-sm">
              <Sparkles className="w-6 h-6 text-orange-600 animate-pulse" />
              <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent">
                🛒 Ready to See What LLMs Really Say About You?
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-slate-900 via-orange-600 to-blue-600 bg-clip-text text-transparent">
                Get Complete AI Visibility
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 bg-clip-text text-transparent">
                Intelligence Today
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-slate-600 mb-12 leading-relaxed">
              Get the full visibility Strategy Blueprint — including your visibility scores, gaps, and strategic action plan — for just
            </p>
            
            <div className="relative max-w-4xl mx-auto">
              {/* Pricing Card with Enhanced Design */}
              <div className="relative group">
                {/* Animated background glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500 rounded-3xl blur opacity-30 group-hover:opacity-60 animate-pulse transition duration-1000"></div>
                
                {/* Main pricing card */}
                <div className="relative bg-gradient-to-br from-white via-orange-50/30 to-purple-50/30 border-2 border-white/50 rounded-3xl p-8 md:p-12 backdrop-blur-xl shadow-2xl">
                  {/* Floating sparkles */}
                  <div className="absolute top-6 right-8 opacity-20">
                    <Sparkles className="w-8 h-8 text-orange-500 animate-spin" style={{animationDuration: '8s'}} />
                  </div>
                  <div className="absolute bottom-6 left-8 opacity-15">
                    <Star className="w-6 h-6 text-purple-500 animate-bounce" style={{animationDelay: '1s'}} />
                  </div>
                  
                   {/* Price display */}
                   <div className="text-center mb-6 md:mb-8 px-4">
                     <div className="relative inline-block">
                       <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-orange-600 via-red-500 to-purple-600 bg-clip-text text-transparent mb-4 tracking-tight leading-none">
                         $199
                       </div>
                       {/* Subtle underline effect */}
                       <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 md:w-24 h-1 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full opacity-60"></div>
                     </div>
                     <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mt-4 md:mt-6">
                       <div className="flex items-center gap-1">
                         <Award className="w-4 h-4 md:w-5 md:h-5 text-orange-500" />
                         <span className="text-base md:text-lg font-semibold text-slate-700">One-time investment</span>
                       </div>
                       <span className="text-slate-400 hidden sm:block">•</span>
                       <div className="flex items-center gap-1">
                         <Zap className="w-4 h-4 md:w-5 md:h-5 text-purple-500" />
                         <span className="text-base md:text-lg font-semibold text-slate-700">Lifetime value</span>
                       </div>
                     </div>
                   </div>
                  
                   {/* Action buttons container */}
                   <div className="space-y-4 md:space-y-6 px-2 md:px-0">
                      {/* Enhanced Buy Now Button */}
                      <Button size="lg" asChild className="group relative w-full bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 hover:from-orange-600 hover:via-red-600 hover:to-purple-700 text-white text-lg md:text-2xl font-bold px-8 md:px-20 py-8 md:py-12 rounded-2xl shadow-2xl border-0 transform transition-all duration-300 hover:scale-[1.02] overflow-hidden">
                        <a href="https://go.totalauthority.com/widget/form/IDsBlNLPcfoCN3EcyU7x" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center relative z-10">
                          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                          <CreditCard className="mr-3 md:mr-4 h-6 w-6 md:h-8 md:w-8 transition-transform duration-200 group-hover:scale-110" />
                          Buy Now
                          <ArrowRight className="ml-3 md:ml-4 h-6 w-6 md:h-8 md:w-8 transition-transform duration-200 group-hover:translate-x-1" />
                        </a>
                      </Button>
                     
                     {/* Stylized "or" separator */}
                     <div className="relative py-3 md:py-4">
                       <div className="absolute inset-0 flex items-center">
                         <div className="w-full border-t border-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
                       </div>
                       <div className="relative flex justify-center">
                         <span className="bg-gradient-to-r from-orange-50 to-purple-50 px-4 md:px-6 py-2 text-base md:text-lg font-medium text-slate-500 rounded-full border border-slate-200 shadow-sm">or</span>
                       </div>
                     </div>
                     
                     {/* Enhanced Book a Call Button */}
                      <Button variant="outline" size="lg" asChild className="group relative w-full bg-white/80 backdrop-blur-sm text-lg md:text-xl font-semibold px-8 md:px-16 py-6 md:py-10 rounded-2xl border-2 border-slate-300 hover:border-orange-500 hover:bg-gradient-to-r hover:from-orange-50 hover:to-purple-50 hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/25 overflow-hidden">
                        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center relative z-10">
                         <div className="absolute inset-0 bg-gradient-to-r from-orange-100/0 via-orange-100/50 to-purple-100/50 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                         <Phone className="mr-3 md:mr-4 h-6 w-6 md:h-7 md:w-7 text-slate-600 group-hover:text-orange-600 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                         <span className="text-slate-700 group-hover:text-slate-800">Book a Call</span>
                         <Sparkles className="ml-3 md:ml-4 h-5 w-5 md:h-6 md:w-6 text-orange-500 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
                       </a>
                     </Button>
                   </div>
                </div>
              </div>
              
               {/* Enhanced info card */}
               <div className="relative mt-8 md:mt-12 group px-2 md:px-0">
                 <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-30"></div>
                 <div className="relative bg-gradient-to-r from-slate-50 via-blue-50/50 to-purple-50/30 border border-slate-200/50 rounded-2xl p-6 md:p-8 backdrop-blur-sm shadow-lg">
                   <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4">
                     <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
                     <span className="text-base md:text-lg font-semibold text-slate-700 text-center">Prefer to talk it through first?</span>
                   </div>
                   <p className="text-slate-600 text-center text-base md:text-lg leading-relaxed">
                     We'll walk you through whether this is the right fit for your brand and answer any questions about the Strategy Blueprint Process.
                   </p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer onOpenForm={openForm} />
      <FormPopup isOpen={isOpen} onClose={closeForm} />
    </div>
  );
};

export default FullAudit;