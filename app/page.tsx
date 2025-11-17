"use client";

import React, { useEffect } from 'react';
import Script from 'next/script';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import AISearchChanged from '@/components/sections/AISearchChanged';
import FeaturedSection from '@/components/FeaturedSection';
import AnimatedFeatureCards from '@/components/AnimatedFeatureCards';
import { TrustVideoSection } from '@/components/TrustVideoSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useFormPopup } from '@/hooks/useFormPopup';
import { FormPopup } from '@/components/FormPopup';
import { useScheduleCallPopup } from '@/hooks/useScheduleCallPopup';
import { ScheduleCallPopup } from '@/components/ScheduleCallPopup';
import { 
  MessageSquare, 
  Search, 
  TrendingUp, 
  Brain, 
  Calculator, 
  FileText, 
  Zap,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Bot,
  Network,
  Cpu
} from 'lucide-react';

const Index = () => {
  const { isOpen, openForm, closeForm } = useFormPopup();
  const { isOpen: isScheduleCallOpen, openScheduleCall, closeScheduleCall } = useScheduleCallPopup();

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).twttr?.widgets) {
      (window as any).twttr.widgets.load();
    }
  }, []);

  const aiLogos = [
    {
      name: "OpenAI",
      url: "https://cdn.brandfetch.io/openai.com/w/512/h/139/logo?c=1idP0DrE2OZDRG5HYTw",
      size: "h-6"
    },
    {
      name: "Claude", 
      url: "https://cdn.brandfetch.io/claude.ai/w/512/h/111/logo?c=1idP0DrE2OZDRG5HYTw",
      size: "h-6"
    },
    {
      name: "Perplexity",
      url: "https://cdn.brandfetch.io/perplexity.ai/w/512/h/512?c=1idP0DrE2OZDRG5HYTw", 
      size: "h-8 w-8"
    },
    {
      name: "Gemini",
      url: "https://cdn.brandfetch.io/gemini.google.com/w/512/h/512/logo",
      size: "h-6"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-blue-50">
      <Script
        src="https://platform.twitter.com/widgets.js"
        strategy="lazyOnload"
        onLoad={() => {
          if ((window as any).twttr?.widgets) {
            (window as any).twttr.widgets.load();
          }
        }}
      />
      <Header onOpenForm={openForm} />
      
      {/* Hero Section - Ultra Focused */}
      <section className="relative pt-14 md:pt-20 pb-10 md:pb-16 overflow-hidden">
        {/* Simple soft background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-orange-50/25 to-blue-50/25"></div>

        <div className="relative max-w-5xl mx-auto px-4 text-center z-10">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight">
            <span className="block">If AI Doesn't Recommend You,</span>
            <span className="block text-orange-500">You Don't Exist</span>
          </h1>

          <p className="mt-6 text-lg md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            The biggest discovery shift in 20 years is happening right now—and most brands aren't even tracking it.
          </p>

          {/* Logos row below the hero, no overlap with text */}
          <div className="mt-10 md:mt-12 flex items-center justify-center gap-8 md:gap-12 flex-wrap">
            {aiLogos.map((logo, index) => (
              <div
                key={logo.name}
                className="shrink-0 rounded-xl p-3 bg-white/80 backdrop-blur-sm border border-white/60 shadow-sm hover:shadow-lg transition-shadow duration-300 animate-wobble-pulse transform-gpu"
                style={{
                  animationDelay: `${index * 0.2}s, ${index * 0.2}s`,
                  animationDuration: `${3.6 + index * 0.4}s, ${2.6 + index * 0.2}s`,
                  willChange: 'transform, opacity'
                }}
              >
                <img
                  src={logo.url}
                  alt={`${logo.name} logo`}
                  className="h-8 md:h-10 w-auto object-contain opacity-90"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturedSection />

      <AISearchChanged />

      {/* What Is LLM Visibility Section - Redesigned Clean */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-orange-50/30 via-slate-50 to-orange-50/50 relative overflow-hidden">
        {/* Geometric background elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-500/10 transform rotate-45 rounded-lg"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-slate-200/50 transform rotate-12 rounded-lg"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-orange-400/20 transform -rotate-12 rounded-lg"></div>
        
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Clean header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-black mb-6 text-slate-900">
                The new SEO metric no one's reporting on 
                <span className="text-orange-500">(yet)</span>
              </h2>
              <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
            </div>
            
            {/* Intro Text */}
            <div className="max-w-4xl mx-auto text-center mb-16">
              <p className="text-xl md:text-2xl mb-8 leading-relaxed text-slate-700">
                LLM Visibility is about whether your brand is actually mentioned—and trusted—by AI systems when users search conversationally.
              </p>
              
              <p className="text-lg font-bold text-orange-600 bg-orange-50 rounded-full px-8 py-4 inline-block">
                It's a different set of rules, sources, and signals than traditional SEO.
              </p>
            </div>

            {/* Tweet Masonry Layout */}
            <div className="relative max-w-6xl mx-auto mb-16">
              {/* Masonry Grid Container */}
              <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {/* Tweet 1 - Vercel */}
                <div className="break-inside-avoid transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/20 mb-6">
                  <div className="bg-white rounded-2xl p-4 shadow-lg border border-slate-100 hover:border-orange-200">
                    <blockquote className="twitter-tweet" data-theme="light" data-align="center" data-conversation="none" data-cards="hidden">
                      <p lang="en" dir="ltr">AI is changing how content gets discovered. Now, SEO ranking ≠ LLM visibility.<br/><br/>No one has all the answers, but here&#39;s how we&#39;re adapting our approach to SEO for LLMs and AI search.<a href="https://t.co/wesQMO5GID">https://t.co/wesQMO5GID</a></p>
                      &mdash; Vercel (@vercel) <a href="https://twitter.com/vercel/status/1932543887735992524?ref_src=twsrc%5Etfw">June 10, 2025</a>
                    </blockquote>
                  </div>
                </div>

                {/* Tweet 2 - Neil Patel */}
                <div className="break-inside-avoid transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/20 mb-6">
                  <div className="bg-white rounded-2xl p-4 shadow-lg border border-slate-100 hover:border-orange-200">
                    <blockquote className="twitter-tweet" data-theme="light" data-align="center" data-conversation="none" data-cards="hidden">
                      <p lang="en" dir="ltr">Whether you want to call it GEO, AI SEO, SEO, or anything else… the more important thing is that you focus on ensuring LLM is citing your business.<br/><br/>Just like marketers and companies call it different names, many people are looking for "AI Rankings." <a href="https://t.co/tz8DU86hHq">pic.twitter.com/tz8DU86hHq</a></p>
                      &mdash; Neil Patel (@neilpatel) <a href="https://twitter.com/neilpatel/status/1966834257126715852?ref_src=twsrc%5Etfw">September 13, 2025</a>
                    </blockquote>
                  </div>
                </div>

                {/* Tweet 3 - Britney Muller */}
                <div className="break-inside-avoid transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/20 mb-6">
                  <div className="bg-white rounded-2xl p-4 shadow-lg border border-slate-100 hover:border-orange-200">
                    <blockquote className="twitter-tweet" data-theme="light" data-align="center" data-conversation="none" data-cards="hidden">
                      <p lang="en" dir="ltr">✍️Brand mentions are the new backlinks in the age of AI search. While Google counts links, AI counts conversations. The game has shifted from link-building to voice-building. <br/><br/>🔗Here&#39;s what&#39;s fascinating: AI doesn&#39;t need hyperlinks to understand authority, it reads context more… <a href="https://t.co/110cNJ0HaZ">pic.twitter.com/110cNJ0HaZ</a></p>
                      &mdash; Britney Muller (@BritneyMuller) <a href="https://twitter.com/BritneyMuller/status/1891826247635959942?ref_src=twsrc%5Etfw">February 18, 2025</a>
                    </blockquote>
                  </div>
                </div>

                {/* Tweet 4 - a16z */}
                <div className="break-inside-avoid transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/20 mb-6">
                  <div className="bg-white rounded-2xl p-4 shadow-lg border border-slate-100 hover:border-orange-200">
                    <blockquote className="twitter-tweet" data-theme="light" data-align="center" data-conversation="none" data-cards="hidden">
                      <p lang="en" dir="ltr">SEO is slowly losing its dominance. Welcome to GEO.<br/><br/>In the age of ChatGPT, Perplexity, and Claude, Generative Engine Optimization is positioned to become the new playbook for brand visibility.<br/><br/>It&#39;s not about gaming the algorithm — it&#39;s about being cited by it.<br/><br/>The brands that… <a href="https://t.co/jsjZ4ee8Z6">pic.twitter.com/jsjZ4ee8Z6</a></p>
                      &mdash; a16z (@a16z) <a href="https://twitter.com/a16z/status/1927766844062011834?ref_src=twsrc%5Etfw">May 28, 2025</a>
                    </blockquote>
                  </div>
                </div>

                {/* Tweet 5 - Semrush */}
                <div className="break-inside-avoid transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/20 mb-6">
                  <div className="bg-white rounded-2xl p-4 shadow-lg border border-slate-100 hover:border-orange-200">
                    <blockquote className="twitter-tweet" data-theme="light" data-align="center" data-conversation="none" data-cards="hidden">
                      <p lang="en" dir="ltr">Answer engine optimization (AEO) is a set of marketing practices used to increase your brand's visibility in AI-generated answers—like Google's AI Mode and ChatGPT responses. <br/><br/>Key AEO techniques include:<br/>1. Getting positive mentions in news articles, blogs, podcasts, and other… <a href="https://t.co/zSVcYQqSLb">pic.twitter.com/zSVcYQqSLb</a></p>
                      &mdash; Semrush (@semrush) <a href="https://twitter.com/semrush/status/1968250348809646191?ref_src=twsrc%5Etfw">September 17, 2025</a>
                    </blockquote>
                  </div>
                </div>

                {/* Tweet 6 - Mordy Oberstein */}
                <div className="break-inside-avoid transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/20 mb-6">
                  <div className="bg-white rounded-2xl p-4 shadow-lg border border-slate-100 hover:border-orange-200">
                    <blockquote className="twitter-tweet" data-theme="light" data-align="center" data-conversation="none" data-cards="hidden">
                      <p lang="en" dir="ltr">I don&#39;t know how many times I can keep saying this:<br/><br/>If you are a brand, you should be concerned with the perception of your brand across the ENTIRE web if you want to get some LLM visibility. It is not about your cite being sourced. It is about how you are perceived. <br/><br/>[BTW,… <a href="https://t.co/985ihwuJHJ">pic.twitter.com/985ihwuJHJ</a></p>
                      &mdash; Mordy Oberstein🎗️🇮🇱 (@MordyOberstein) <a href="https://twitter.com/MordyOberstein/status/1968324061437857998?ref_src=twsrc%5Etfw">September 17, 2025</a>
                    </blockquote>
                  </div>
                </div>

                {/* Tweet 7 - Matt Diggity */}
                <div className="break-inside-avoid transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/20 mb-6">
                  <div className="bg-white rounded-2xl p-4 shadow-lg border border-slate-100 hover:border-orange-200">
                    <blockquote className="twitter-tweet" data-theme="light" data-align="center" data-conversation="none" data-cards="hidden">
                      <p lang="en" dir="ltr">Get Featured in AI Search (4 Steps)<br/><br/>Forget Google's blue links for a second.<br/><br/>The new battleground is whether ChatGPT, Gemini, and Perplexity actually mention your brand.<br/><br/>And yes: it has real bottom-line applications.<br/><br/>Applications<br/><br/>• If AI keeps recommending you, you win…</p>
                      &mdash; Matt Diggity (@mattdiggityseo) <a href="https://twitter.com/mattdiggityseo/status/1964887039922626908?ref_src=twsrc%5Etfw">September 8, 2025</a>
                    </blockquote>
                  </div>
                </div>

                {/* Tweet 8 - Mark Carrington */}
                <div className="break-inside-avoid transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/20 mb-6">
                  <div className="bg-white rounded-2xl p-4 shadow-lg border border-slate-100 hover:border-orange-200">
                    <blockquote className="twitter-tweet" data-theme="light" data-align="center" data-conversation="none" data-cards="hidden">
                      <p lang="en" dir="ltr"><a href="https://twitter.com/hashtag/strato?src=hash&amp;ref_src=twsrc%5Etfw">#strato</a> In the Age of AI Search, PR Holds the Keys to Visibility <a href="https://t.co/2LRdF9O3ym">https://t.co/2LRdF9O3ym</a></p>
                      &mdash; Mark Carrington (@Stratocharge) <a href="https://twitter.com/Stratocharge/status/1968345227623641263?ref_src=twsrc%5Etfw">September 17, 2025</a>
                    </blockquote>
                  </div>
                </div>

                {/* Tweet 9 - Chris Panteli */}
                <div className="break-inside-avoid transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/20 mb-6">
                  <div className="bg-white rounded-2xl p-4 shadow-lg border border-slate-100 hover:border-orange-200">
                    <blockquote className="twitter-tweet" data-theme="light" data-align="center" data-conversation="none" data-cards="hidden">
                      <p lang="en" dir="ltr">🔥 𝐓𝐇𝐄 𝐀𝐈 𝐕𝐈𝐒𝐈𝐁𝐈𝐋𝐈𝐓𝐘 𝐆𝐀𝐏 🔥<br/><br/>We analysed 96 LLM visibility audits across multiple industries — and uncovered something huge:<br/><br/>𝐍𝐢𝐧𝐞𝐭𝐲-𝐧𝐢𝐧𝐞 𝐩𝐞𝐫 𝐜𝐞𝐧𝐭 of businesses are 𝐢𝐧𝐯𝐢𝐬𝐢𝐛𝐥𝐞 to 𝐂𝐡𝐚𝐭𝐆𝐏𝐓.<br/><br/>When customers ask AI for… <a href="https://t.co/BIy5me7Dqd">pic.twitter.com/BIy5me7Dqd</a></p>
                      &mdash; Chris Panteli (Co-Founder) (@Linkifi_) <a href="https://twitter.com/Linkifi_/status/1960711013407359141?ref_src=twsrc%5Etfw">August 27, 2025</a>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
            
            <AnimatedFeatureCards />
            
            {/* Bottom CTA */}
            <div className="text-center">
              <div className="inline-block bg-slate-900 rounded-2xl px-8 py-6 shadow-xl">
                <p className="text-2xl md:text-3xl font-bold text-white">
                  This is how your brand gets discovered now.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Matters Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-full blur-3xl animate-float-tech"></div>
          <div className="absolute bottom-32 right-20 w-80 h-80 bg-gradient-to-br from-emerald-400/10 to-blue-500/10 rounded-full blur-3xl animate-float-tech" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-br from-orange-400/10 to-pink-500/10 rounded-full blur-3xl animate-float-tech" style={{animationDelay: '4s'}}></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-20 text-center bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              LLMs are your new homepage
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-20">
              {/* Stat 1 - Chat Discovery */}
              <div className="group relative overflow-hidden">
                {/* Diagonal background accent */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-gradient-to-br from-purple-500/15 to-blue-500/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700"></div>
                
                <div className="relative bg-white/90 backdrop-blur-sm border border-slate-200/50 rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500 hover:border-blue-300/50 hover:-translate-y-1">
                  {/* Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <svg className="w-8 h-8 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <div className="w-3 h-3 bg-blue-400/30 rounded-full animate-ping"></div>
                  </div>
                  
                  <div className="text-6xl md:text-7xl font-black mb-4 text-slate-800 group-hover:scale-105 transition-transform duration-300">
                    60%
                  </div>
                  <p className="text-xl text-slate-600 leading-relaxed font-medium">
                    of product discovery now starts in AI chats
                  </p>
                  
                  {/* Decorative line */}
                  <div className="absolute bottom-4 left-10 w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                </div>
              </div>

              {/* Stat 2 - Growth */}
              <div className="group relative overflow-hidden">
                {/* Diagonal background accent */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-emerald-500/20 to-green-600/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-gradient-to-br from-teal-500/15 to-emerald-500/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700"></div>
                
                <div className="relative bg-white/90 backdrop-blur-sm border border-slate-200/50 rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500 hover:border-emerald-300/50 hover:-translate-y-1">
                  {/* Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <svg className="w-8 h-8 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div className="w-3 h-3 bg-emerald-400/30 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                  </div>
                  
                  <div className="text-6xl md:text-7xl font-black mb-4 text-slate-800 group-hover:scale-105 transition-transform duration-300">
                    467%
                  </div>
                  <p className="text-xl text-slate-600 leading-relaxed font-medium">
                    growth in LLM traffic since 2023
                  </p>
                  
                  {/* Decorative line */}
                  <div className="absolute bottom-4 left-10 w-16 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
                </div>
              </div>

              {/* Stat 3 - Citations */}
              <div className="group relative overflow-hidden">
                {/* Diagonal background accent */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-orange-500/20 to-red-600/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-gradient-to-br from-pink-500/15 to-orange-500/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700"></div>
                
                <div className="relative bg-white/90 backdrop-blur-sm border border-slate-200/50 rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500 hover:border-orange-300/50 hover:-translate-y-1">
                  {/* Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <svg className="w-8 h-8 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="w-3 h-3 bg-orange-400/30 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
                  </div>
                  
                  <div className="text-6xl md:text-7xl font-black mb-4 text-slate-800 group-hover:scale-105 transition-transform duration-300">
                    90%
                  </div>
                  <p className="text-xl text-slate-600 leading-relaxed font-medium">
                    of ChatGPT citations come from page 2+ of Google
                  </p>
                  
                  {/* Decorative line */}
                  <div className="absolute bottom-4 left-10 w-16 h-1 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full"></div>
                </div>
              </div>

              {/* Stat 4 - Zero Click */}
              <div className="group relative overflow-hidden">
                {/* Diagonal background accent */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-indigo-600/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-gradient-to-br from-violet-500/15 to-purple-500/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700"></div>
                
                <div className="relative bg-white/90 backdrop-blur-sm border border-slate-200/50 rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500 hover:border-purple-300/50 hover:-translate-y-1">
                  {/* Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <svg className="w-8 h-8 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <div className="w-3 h-3 bg-purple-400/30 rounded-full animate-ping" style={{animationDelay: '1.5s'}}></div>
                  </div>
                  
                  <div className="text-5xl md:text-6xl font-black mb-4 text-slate-800 group-hover:scale-105 transition-transform duration-300">
                    0-click
                  </div>
                  <p className="text-xl text-slate-600 leading-relaxed font-medium">
                    search is exploding—your site might never get visited unless you're named directly
                  </p>
                  
                  {/* Decorative line */}
                  <div className="absolute bottom-4 left-10 w-16 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"></div>
                </div>
              </div>
            </div>
            
            {/* Quote */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/5 via-blue-900/5 to-purple-900/5 rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500"></div>
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-br from-orange-500/20 to-pink-500/20 rounded-full blur-xl"></div>
              
              <blockquote className="relative bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-3xl p-12 text-center shadow-xl hover:shadow-2xl transition-all duration-500">
                <div className="absolute top-8 left-10 text-7xl text-slate-300/80 font-serif leading-none">"</div>
                <div className="absolute bottom-8 right-10 text-7xl text-slate-300/80 font-serif leading-none rotate-180">"</div>
                <p className="text-2xl md:text-3xl font-semibold text-slate-800 italic leading-relaxed px-8 relative z-10">
                  If your brand isn't being pulled into the answer, it's not even part of the conversation.
                </p>
                
                {/* Decorative elements */}
                <div className="absolute top-1/2 left-4 w-2 h-16 bg-gradient-to-b from-blue-500/30 to-purple-500/30 rounded-full transform -translate-y-1/2"></div>
                <div className="absolute top-1/2 right-4 w-2 h-16 bg-gradient-to-b from-orange-500/30 to-pink-500/30 rounded-full transform -translate-y-1/2"></div>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Start Wherever You Are Section */}
      <section className="py-20 md:py-32 px-4 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6 text-slate-900">
              Start wherever you are
            </h2>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto">
              Here's how to take your first step toward LLM visibility.
            </p>
          </div>

          <div className="space-y-24">
            {/* AI Visibility Gap Calculator */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="lg:order-2">
                {/* iPad Frame */}
                <div className="relative mx-auto max-w-md">
                  {/* iPad Background */}
                  <div className="bg-slate-800 rounded-3xl p-4 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                    <div className="bg-black rounded-2xl p-1">
                      <img 
                        src="/lovable-uploads/a9912b20-f5d9-44c6-90c2-480a2ea8e855.png" 
                        alt="AI Visibility Gap Calculator Interface"
                        className="w-full rounded-xl"
                      />
                    </div>
                  </div>
                  {/* Floating Badge */}
                  <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                    FREE
                  </div>
                </div>
              </div>
              <div className="lg:order-1">
                <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full font-semibold mb-6">
                  <Calculator className="w-5 h-5" />
                  Quick Start
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                  AI Visibility Gap Calculator
                </h3>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Compare your brand against a top competitor in real-time. See exactly where you win and where you're completely invisible to AI search engines. Get instant insights in just 2 minutes.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-slate-700">Side-by-side brand comparison</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-slate-700">Instant visibility scoring</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-slate-700">Gap analysis report</span>
                  </div>
                </div>
                <a href="https://totalauthority.com/llm-visibility-gap-calculator">
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    Try Calculator Free →
                  </Button>
                </a>
              </div>
            </div>

            {/* AI Visibility Mini Audit */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                {/* iPad Frame */}
                <div className="relative mx-auto max-w-md">
                  {/* iPad Background */}
                  <div className="bg-slate-800 rounded-3xl p-4 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                    <div className="bg-white rounded-2xl p-1">
                      <img 
                        src="/lovable-uploads/80f1b6fc-f49f-4974-8643-ff37086c0afd.png" 
                        alt="AI Visibility Audit Report"
                        className="w-full rounded-xl"
                      />
                    </div>
                  </div>
                  {/* Floating Badge */}
                  <div className="absolute -top-4 -right-4 bg-blue-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                    POPULAR
                  </div>
                </div>
              </div>
              <div>
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold mb-6">
                  <Search className="w-5 h-5" />
                  Professional Analysis
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                  AI Visibility Mini Audit
                </h3>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Get a comprehensive analysis of how major AI platforms see your brand. Detailed report with executive summary, key findings, and actionable recommendations to boost your AI visibility.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-slate-700">Multi-platform AI analysis</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-slate-700">Executive summary & insights</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-slate-700">Priority action items</span>
                  </div>
                </div>
                <a href="https://totalauthority.com/llm-visibility-audit">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    Get Mini Audit →
                  </Button>
                </a>
              </div>
            </div>

            {/* Full AI Visibility Strategy Blueprint */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="lg:order-2">
                {/* iPad Frame */}
                <div className="relative mx-auto max-w-md">
                  {/* iPad Background */}
                  <div className="bg-slate-800 rounded-3xl p-4 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                    <div className="bg-white rounded-2xl p-1">
                      <img 
                        src="/lovable-uploads/4ff37a30-04f9-4ce9-a0f7-6900ce26af0a.png" 
                        alt="Full AI Visibility Strategy Blueprint Document"
                        className="w-full rounded-xl"
                      />
                    </div>
                  </div>
                  {/* Floating Badge */}
                  <div className="absolute -top-4 -right-4 bg-purple-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                    PREMIUM
                  </div>
                </div>
              </div>
              <div className="lg:order-1">
                <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-semibold mb-6">
                  <FileText className="w-5 h-5" />
                  Complete Strategy
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                  Full AI Visibility Strategy Blueprint
                </h3>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  The complete roadmap to LLM dominance. Deep-dive analysis, comprehensive strategy document, and a 90-day implementation plan to systematically build your AI search authority.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-slate-700">4-phase implementation roadmap</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-slate-700">Authority content engine plan</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-slate-700">90-day quick wins strategy</span>
                  </div>
                </div>
                <a href="https://totalauthority.com/strategy-blueprint">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    Get Full Blueprint →
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustVideoSection onOpenScheduleCall={openScheduleCall} />

      <Footer onOpenForm={openForm} />
      <FormPopup isOpen={isOpen} onClose={closeForm} />
      <ScheduleCallPopup isOpen={isScheduleCallOpen} onClose={closeScheduleCall} />
      
      {/* Animation Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float-gentle-0 {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(2deg); }
          }
          @keyframes float-gentle-1 {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(-3deg); }
          }
          @keyframes float-gentle-2 {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-12px) rotate(4deg); }
          }
          @keyframes float-gentle-3 {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-18px) rotate(-2deg); }
          }
          @keyframes float-tech-0 {
            0%, 100% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-10px) scale(1.1); }
          }
          @keyframes float-tech-1 {
            0%, 100% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-8px) scale(1.05); }
          }
          @keyframes float-tech-2 {
            0%, 100% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-12px) scale(1.08); }
          }
          @keyframes float-tech-3 {
            0%, 100% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-6px) scale(1.12); }
          }
          @keyframes float-tech-4 {
            0%, 100% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-14px) scale(1.06); }
          }
          @keyframes float-tech-5 {
            0%, 100% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-9px) scale(1.09); }
          }
          @keyframes spin-very-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes spin-reverse-slow {
            from { transform: rotate(360deg); }
            to { transform: rotate(0deg); }
          }
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-spin-very-slow {
            animation: spin-very-slow 40s linear infinite;
          }
          .animate-spin-reverse-slow {
            animation: spin-reverse-slow 35s linear infinite;
          }
          .animate-spin-slow {
            animation: spin-slow 30s linear infinite;
          }
        `
      }} />
    </div>
  );
};

export default Index;
