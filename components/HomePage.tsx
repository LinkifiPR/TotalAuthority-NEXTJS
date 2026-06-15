"use client";

import React, { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import dynamic from 'next/dynamic';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useFormPopup } from '@/hooks/useFormPopup';
import { useScheduleCallPopup } from '@/hooks/useScheduleCallPopup';
import {
  Calculator,
  FileText,
  Search,
} from 'lucide-react';
import {
  GapCalculatorVisual,
  MiniAuditVisual,
  BlueprintVisual,
} from '@/components/GetStartedVisuals';

// Below-the-fold sections are code-split so they don't bloat the initial
// JS bundle / hydration. ssr:true keeps their content server-rendered for SEO.
const FeaturedSection = dynamic(() => import('@/components/FeaturedSection'));
const AISearchChanged = dynamic(() => import('@/components/sections/AISearchChanged'));
const AnimatedFeatureCards = dynamic(() => import('@/components/AnimatedFeatureCards'));
const TrustVideoSection = dynamic(() =>
  import('@/components/TrustVideoSection').then((m) => m.TrustVideoSection)
);
const Footer = dynamic(() => import('@/components/Footer').then((m) => m.Footer));

// Modals are hidden until opened — load them only on the client, on demand.
const FormPopup = dynamic(() =>
  import('@/components/FormPopup').then((m) => m.FormPopup), { ssr: false }
);
const ScheduleCallPopup = dynamic(() =>
  import('@/components/ScheduleCallPopup').then((m) => m.ScheduleCallPopup), { ssr: false }
);

const aiLogos = [
  { name: 'OpenAI', url: 'https://cdn.brandfetch.io/openai.com/w/512/h/139/logo?c=1idP0DrE2OZDRG5HYTw' },
  { name: 'Claude', url: 'https://cdn.brandfetch.io/claude.ai/w/512/h/111/logo?c=1idP0DrE2OZDRG5HYTw' },
  { name: 'Perplexity', url: 'https://cdn.brandfetch.io/perplexity.ai/w/512/h/512?c=1idP0DrE2OZDRG5HYTw' },
  { name: 'Gemini', url: 'https://cdn.brandfetch.io/gemini.google.com/w/512/h/512/logo' },
];

const supportingStats = [
  { value: '60%', label: 'of product discovery now starts in AI chats' },
  { value: '90%', label: 'of ChatGPT citations come from page 2+ of Google' },
  { value: '0-click', label: "search is exploding—your site might never get visited unless you're named" },
];

const HomePage = () => {
  const { isOpen, openForm, closeForm } = useFormPopup();
  const { isOpen: isScheduleCallOpen, openScheduleCall, closeScheduleCall } = useScheduleCallPopup();

  // Twitter widgets.js is heavy (~9 embeds = lots of main-thread work).
  // We only load it once the tweets section is about to enter the viewport.
  const tweetsRef = useRef<HTMLDivElement>(null);
  const [tweetsNear, setTweetsNear] = useState(false);

  useEffect(() => {
    if (!tweetsRef.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTweetsNear(true);
          io.disconnect();
        }
      },
      { rootMargin: '600px 0px' }
    );
    io.observe(tweetsRef.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (tweetsNear && typeof window !== 'undefined' && (window as any).twttr?.widgets) {
      (window as any).twttr.widgets.load();
    }
  }, [tweetsNear]);

  return (
    <div className="min-h-screen bg-white">
      {tweetsNear && (
        <Script
          src="https://platform.twitter.com/widgets.js"
          strategy="lazyOnload"
          onLoad={() => {
            if ((window as any).twttr?.widgets) {
              (window as any).twttr.widgets.load();
            }
          }}
        />
      )}
      <Header onOpenForm={openForm} />

      <main>
        {/* Hero */}
        <section className="relative pt-16 md:pt-24 pb-14 md:pb-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.02] text-balance">
              <span className="block">If AI Doesn't Recommend You,</span>
              <span className="block text-orange-600">You Don't Exist</span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              The biggest discovery shift in 20 years is happening right now—and most brands aren't even tracking it.
            </p>

            {/* AI platform logos */}
            <div className="mt-12 flex items-center justify-center gap-6 md:gap-10 flex-wrap">
              {aiLogos.map((logo, index) => (
                <div
                  key={logo.name}
                  className="shrink-0 rounded-xl p-3 bg-white border border-slate-200 shadow-sm animate-wobble-pulse transform-gpu"
                  style={{
                    animationDelay: `${index * 0.2}s`,
                    animationDuration: `${3.6 + index * 0.4}s`,
                    willChange: 'transform, opacity',
                  }}
                >
                  <img
                    src={logo.url}
                    alt={`${logo.name} logo`}
                    width={120}
                    height={40}
                    decoding="async"
                    fetchPriority="low"
                    className="h-8 md:h-10 w-auto object-contain opacity-90"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <FeaturedSection />

        <AISearchChanged />

        {/* What Is LLM Visibility */}
        <section className="cv-auto py-20 md:py-28 bg-orange-50/40 border-y border-slate-200/70">
          <div className="max-w-6xl mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-14">
                <p className="text-xs font-medium tracking-[0.18em] uppercase text-orange-600 mb-4">
                  LLM Visibility
                </p>
                <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-6">
                  The new SEO metric no one's reporting on{' '}
                  <span className="text-orange-600 italic font-normal">(yet)</span>
                </h2>
              </div>

              <div className="max-w-3xl mx-auto text-center mb-14">
                <p className="text-lg md:text-xl text-slate-700 leading-relaxed mb-8">
                  LLM Visibility is about whether your brand is actually mentioned—and trusted—by AI systems when users search conversationally.
                </p>
                <p className="text-base md:text-lg text-slate-700 border-l-4 border-orange-600 pl-4 text-left max-w-2xl mx-auto italic">
                  It's a different set of rules, sources, and signals than traditional SEO.
                </p>
              </div>

              {/* Tweet masonry */}
              <div className="relative max-w-6xl mx-auto mb-16">
                <div ref={tweetsRef} className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
                  {/* Tweet 1 - Vercel */}
                  <div className="break-inside-avoid mb-5">
                    <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                      <blockquote className="twitter-tweet" data-theme="light" data-align="center" data-conversation="none" data-cards="hidden">
                        <p lang="en" dir="ltr">AI is changing how content gets discovered. Now, SEO ranking ≠ LLM visibility.<br/><br/>No one has all the answers, but here&#39;s how we&#39;re adapting our approach to SEO for LLMs and AI search.<a href="https://t.co/wesQMO5GID">https://t.co/wesQMO5GID</a></p>
                        &mdash; Vercel (@vercel) <a href="https://twitter.com/vercel/status/1932543887735992524?ref_src=twsrc%5Etfw">June 10, 2025</a>
                      </blockquote>
                    </div>
                  </div>

                  {/* Tweet 2 - Neil Patel */}
                  <div className="break-inside-avoid mb-5">
                    <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                      <blockquote className="twitter-tweet" data-theme="light" data-align="center" data-conversation="none" data-cards="hidden">
                        <p lang="en" dir="ltr">Whether you want to call it GEO, AI SEO, SEO, or anything else… the more important thing is that you focus on ensuring LLM is citing your business.<br/><br/>Just like marketers and companies call it different names, many people are looking for "AI Rankings." <a href="https://t.co/tz8DU86hHq">pic.twitter.com/tz8DU86hHq</a></p>
                        &mdash; Neil Patel (@neilpatel) <a href="https://twitter.com/neilpatel/status/1966834257126715852?ref_src=twsrc%5Etfw">September 13, 2025</a>
                      </blockquote>
                    </div>
                  </div>

                  {/* Tweet 3 - Britney Muller */}
                  <div className="break-inside-avoid mb-5">
                    <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                      <blockquote className="twitter-tweet" data-theme="light" data-align="center" data-conversation="none" data-cards="hidden">
                        <p lang="en" dir="ltr">✍️Brand mentions are the new backlinks in the age of AI search. While Google counts links, AI counts conversations. The game has shifted from link-building to voice-building. <br/><br/>🔗Here&#39;s what&#39;s fascinating: AI doesn&#39;t need hyperlinks to understand authority, it reads context more… <a href="https://t.co/110cNJ0HaZ">pic.twitter.com/110cNJ0HaZ</a></p>
                        &mdash; Britney Muller (@BritneyMuller) <a href="https://twitter.com/BritneyMuller/status/1891826247635959942?ref_src=twsrc%5Etfw">February 18, 2025</a>
                      </blockquote>
                    </div>
                  </div>

                  {/* Tweet 4 - a16z */}
                  <div className="break-inside-avoid mb-5">
                    <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                      <blockquote className="twitter-tweet" data-theme="light" data-align="center" data-conversation="none" data-cards="hidden">
                        <p lang="en" dir="ltr">SEO is slowly losing its dominance. Welcome to GEO.<br/><br/>In the age of ChatGPT, Perplexity, and Claude, Generative Engine Optimization is positioned to become the new playbook for brand visibility.<br/><br/>It&#39;s not about gaming the algorithm — it&#39;s about being cited by it.<br/><br/>The brands that… <a href="https://t.co/jsjZ4ee8Z6">pic.twitter.com/jsjZ4ee8Z6</a></p>
                        &mdash; a16z (@a16z) <a href="https://twitter.com/a16z/status/1927766844062011834?ref_src=twsrc%5Etfw">May 28, 2025</a>
                      </blockquote>
                    </div>
                  </div>

                  {/* Tweet 5 - Semrush */}
                  <div className="break-inside-avoid mb-5">
                    <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                      <blockquote className="twitter-tweet" data-theme="light" data-align="center" data-conversation="none" data-cards="hidden">
                        <p lang="en" dir="ltr">Answer engine optimization (AEO) is a set of marketing practices used to increase your brand's visibility in AI-generated answers—like Google's AI Mode and ChatGPT responses. <br/><br/>Key AEO techniques include:<br/>1. Getting positive mentions in news articles, blogs, podcasts, and other… <a href="https://t.co/zSVcYQqSLb">pic.twitter.com/zSVcYQqSLb</a></p>
                        &mdash; Semrush (@semrush) <a href="https://twitter.com/semrush/status/1968250348809646191?ref_src=twsrc%5Etfw">September 17, 2025</a>
                      </blockquote>
                    </div>
                  </div>

                  {/* Tweet 6 - Mordy Oberstein */}
                  <div className="break-inside-avoid mb-5">
                    <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                      <blockquote className="twitter-tweet" data-theme="light" data-align="center" data-conversation="none" data-cards="hidden">
                        <p lang="en" dir="ltr">I don&#39;t know how many times I can keep saying this:<br/><br/>If you are a brand, you should be concerned with the perception of your brand across the ENTIRE web if you want to get some LLM visibility. It is not about your cite being sourced. It is about how you are perceived. <br/><br/>[BTW,… <a href="https://t.co/985ihwuJHJ">pic.twitter.com/985ihwuJHJ</a></p>
                        &mdash; Mordy Oberstein🎗️🇮🇱 (@MordyOberstein) <a href="https://twitter.com/MordyOberstein/status/1968324061437857998?ref_src=twsrc%5Etfw">September 17, 2025</a>
                      </blockquote>
                    </div>
                  </div>

                  {/* Tweet 7 - Matt Diggity */}
                  <div className="break-inside-avoid mb-5">
                    <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                      <blockquote className="twitter-tweet" data-theme="light" data-align="center" data-conversation="none" data-cards="hidden">
                        <p lang="en" dir="ltr">Get Featured in AI Search (4 Steps)<br/><br/>Forget Google's blue links for a second.<br/><br/>The new battleground is whether ChatGPT, Gemini, and Perplexity actually mention your brand.<br/><br/>And yes: it has real bottom-line applications.<br/><br/>Applications<br/><br/>• If AI keeps recommending you, you win…</p>
                        &mdash; Matt Diggity (@mattdiggityseo) <a href="https://twitter.com/mattdiggityseo/status/1964887039922626908?ref_src=twsrc%5Etfw">September 8, 2025</a>
                      </blockquote>
                    </div>
                  </div>

                  {/* Tweet 8 - Mark Carrington */}
                  <div className="break-inside-avoid mb-5">
                    <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                      <blockquote className="twitter-tweet" data-theme="light" data-align="center" data-conversation="none" data-cards="hidden">
                        <p lang="en" dir="ltr"><a href="https://twitter.com/hashtag/strato?src=hash&amp;ref_src=twsrc%5Etfw">#strato</a> In the Age of AI Search, PR Holds the Keys to Visibility <a href="https://t.co/2LRdF9O3ym">https://t.co/2LRdF9O3ym</a></p>
                        &mdash; Mark Carrington (@Stratocharge) <a href="https://twitter.com/Stratocharge/status/1968345227623641263?ref_src=twsrc%5Etfw">September 17, 2025</a>
                      </blockquote>
                    </div>
                  </div>

                  {/* Tweet 9 - Chris Panteli */}
                  <div className="break-inside-avoid mb-5">
                    <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
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
              <div className="text-center mt-4">
                <div className="inline-block bg-slate-900 rounded-xl px-8 py-5">
                  <p className="text-xl md:text-2xl font-semibold text-white">
                    This is how your brand gets discovered now.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LLMs are your new homepage — editorial hero-stat layout */}
        <section className="cv-auto py-20 md:py-28 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-14 md:mb-20">
              <p className="text-xs font-medium tracking-[0.18em] uppercase text-orange-600 mb-4">
                Why It Matters
              </p>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900">
                LLMs are your new homepage
              </h2>
            </div>

            {/* Featured hero stat */}
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-16 md:mb-20">
              <div className="lg:col-span-5">
                <div className="flex items-start gap-3">
                  <div className="text-[5.5rem] md:text-[8rem] leading-none font-semibold text-orange-600 tabular-nums tracking-tight">
                    467%
                  </div>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="w-7 h-7 md:w-10 md:h-10 mt-3 md:mt-5 text-orange-600 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17L17 7" />
                    <path d="M9 7h8v8" />
                  </svg>
                </div>
                <p className="mt-3 text-sm text-slate-500 tracking-wide">
                  LLM search usage · 2023 &rarr; 2026
                </p>
              </div>

              <div className="lg:col-span-7">
                <h3 className="text-2xl md:text-4xl font-semibold tracking-tight text-slate-900 leading-tight text-balance">
                  Search is being rewritten in front of you.
                </h3>
                <p className="mt-5 text-base md:text-lg text-slate-600 leading-relaxed">
                  More product discovery now happens inside ChatGPT, Gemini, Claude and Perplexity than through any other channel.
                  The brands that get named in those answers are the ones that win the customer — everyone else is invisible.
                </p>
              </div>
            </div>

            {/* By the numbers — horizontal strip */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="px-6 md:px-8 py-4 border-b border-slate-200 flex items-center justify-between">
                <span className="text-xs font-medium tracking-[0.18em] uppercase text-slate-500">
                  By the numbers
                </span>
                <span className="text-xs text-slate-400 tracking-wide hidden sm:block">
                  AI search · 2026
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
                {supportingStats.map((s) => (
                  <div key={s.value} className="p-7 md:p-8">
                    <div className="text-4xl md:text-5xl font-semibold tracking-tight text-orange-600 tabular-nums leading-none mb-3">
                      {s.value}
                    </div>
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Closing quote */}
            <blockquote className="border-l-4 border-orange-600 pl-6 max-w-3xl mx-auto mt-16 md:mt-20">
              <p className="text-xl md:text-2xl text-slate-700 italic leading-relaxed">
                If your brand isn't being pulled into the answer, it's not even part of the conversation.
              </p>
            </blockquote>
          </div>
        </section>

        {/* Start Wherever You Are */}
        <section className="cv-auto py-20 md:py-28 px-4 bg-orange-50/40 border-y border-slate-200/70">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-xs font-medium tracking-[0.18em] uppercase text-orange-600 mb-4">
                Get Started
              </p>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-5">
                Start wherever you are
              </h2>
              <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
                Here's how to take your first step toward LLM visibility.
              </p>
            </div>

            <div className="space-y-20">
              {/* AI Visibility Gap Calculator */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="lg:order-2">
                  <div className="relative mx-auto max-w-lg">
                    <GapCalculatorVisual />
                    <span className="absolute -top-3 -right-3 z-10 bg-white text-orange-700 text-xs font-medium tracking-wide rounded-full px-2.5 py-1 border border-orange-200 shadow-sm">
                      FREE
                    </span>
                  </div>
                </div>
                <div className="lg:order-1">
                  <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.18em] uppercase text-orange-600 mb-4">
                    <Calculator className="w-4 h-4" />
                    Quick Start
                  </div>
                  <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 mb-5">
                    AI Visibility Gap Calculator
                  </h3>
                  <p className="text-base md:text-lg text-slate-600 mb-6 leading-relaxed">
                    Compare your brand against a top competitor in real-time. See exactly where you win and where you're completely invisible to AI search engines. Get instant insights in just 2 minutes.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3 text-slate-700">
                      <span className="w-1.5 h-1.5 bg-orange-600 rounded-full" />
                      Side-by-side brand comparison
                    </li>
                    <li className="flex items-center gap-3 text-slate-700">
                      <span className="w-1.5 h-1.5 bg-orange-600 rounded-full" />
                      Instant visibility scoring
                    </li>
                    <li className="flex items-center gap-3 text-slate-700">
                      <span className="w-1.5 h-1.5 bg-orange-600 rounded-full" />
                      Gap analysis report
                    </li>
                  </ul>
                  <Link href="/llm-visibility-gap-calculator">
                    <Button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 text-base font-medium rounded-lg">
                      Try Calculator Free
                    </Button>
                  </Link>
                </div>
              </div>

              {/* AI Visibility Mini Audit */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="relative mx-auto max-w-lg">
                    <MiniAuditVisual />
                    <span className="absolute -top-3 -right-3 z-10 bg-orange-600 text-white text-xs font-medium tracking-wide rounded-full px-2.5 py-1 border border-orange-600 shadow-sm">
                      POPULAR
                    </span>
                  </div>
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.18em] uppercase text-orange-600 mb-4">
                    <Search className="w-4 h-4" />
                    Professional Analysis
                  </div>
                  <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 mb-5">
                    AI Visibility Mini Audit
                  </h3>
                  <p className="text-base md:text-lg text-slate-600 mb-6 leading-relaxed">
                    Get a comprehensive analysis of how major AI platforms see your brand. Detailed report with executive summary, key findings, and actionable recommendations to boost your AI visibility.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3 text-slate-700">
                      <span className="w-1.5 h-1.5 bg-orange-600 rounded-full" />
                      Multi-platform AI analysis
                    </li>
                    <li className="flex items-center gap-3 text-slate-700">
                      <span className="w-1.5 h-1.5 bg-orange-600 rounded-full" />
                      Executive summary & insights
                    </li>
                    <li className="flex items-center gap-3 text-slate-700">
                      <span className="w-1.5 h-1.5 bg-orange-600 rounded-full" />
                      Priority action items
                    </li>
                  </ul>
                  <Link href="/llm-visibility-audit">
                    <Button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 text-base font-medium rounded-lg">
                      Get Mini Audit
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Full AI Visibility Strategy Blueprint */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="lg:order-2">
                  <div className="relative mx-auto max-w-lg">
                    <BlueprintVisual />
                    <span className="absolute -top-3 -right-3 z-10 bg-white text-orange-700 text-xs font-medium tracking-wide rounded-full px-2.5 py-1 border border-orange-200 shadow-sm">
                      PREMIUM
                    </span>
                  </div>
                </div>
                <div className="lg:order-1">
                  <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.18em] uppercase text-orange-600 mb-4">
                    <FileText className="w-4 h-4" />
                    Complete Strategy
                  </div>
                  <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 mb-5">
                    Full AI Visibility Strategy Blueprint
                  </h3>
                  <p className="text-base md:text-lg text-slate-600 mb-6 leading-relaxed">
                    The complete roadmap to LLM dominance. Deep-dive analysis, comprehensive strategy document, and a 90-day implementation plan to systematically build your AI search authority.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3 text-slate-700">
                      <span className="w-1.5 h-1.5 bg-orange-600 rounded-full" />
                      4-phase implementation roadmap
                    </li>
                    <li className="flex items-center gap-3 text-slate-700">
                      <span className="w-1.5 h-1.5 bg-orange-600 rounded-full" />
                      Authority content engine plan
                    </li>
                    <li className="flex items-center gap-3 text-slate-700">
                      <span className="w-1.5 h-1.5 bg-orange-600 rounded-full" />
                      90-day quick wins strategy
                    </li>
                  </ul>
                  <Link href="/strategy-blueprint">
                    <Button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 text-base font-medium rounded-lg">
                      Get Full Blueprint
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <TrustVideoSection onOpenScheduleCall={openScheduleCall} />
      </main>

      <Footer onOpenForm={openForm} />
      <FormPopup isOpen={isOpen} onClose={closeForm} />
      <ScheduleCallPopup isOpen={isScheduleCallOpen} onClose={closeScheduleCall} />
    </div>
  );
};

export default HomePage;
