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
  Sparkles,
  ArrowRight,
} from 'lucide-react';

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
  { name: 'ChatGPT', url: 'https://cdn.brandfetch.io/openai.com/w/512/h/139/logo?c=1idP0DrE2OZDRG5HYTw' },
  { name: 'Claude', url: 'https://cdn.brandfetch.io/claude.ai/w/512/h/111/logo?c=1idP0DrE2OZDRG5HYTw' },
  { name: 'Perplexity', url: 'https://cdn.brandfetch.io/perplexity.ai/w/512/h/512?c=1idP0DrE2OZDRG5HYTw' },
  { name: 'Gemini', url: 'https://cdn.brandfetch.io/gemini.google.com/w/512/h/512/logo' },
];

const supportingStats = [
  { value: '60%', label: 'of product discovery now starts in AI chats' },
  { value: '90%', label: 'of ChatGPT citations come from page 2+ of Google' },
  { value: '0-click', label: "search is exploding—your site might never get visited unless you're named" },
];

// Section chapter marker. Keep it inline (no new file) so each section can
// reference it. The dark prop tweaks colors for dark-background sections.
const ChapterEyebrow: React.FC<{ n: string; title: string; dark?: boolean }> = ({ n, title, dark }) => (
  <div className="inline-flex items-center gap-2.5 mb-5">
    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
    <span className="text-xs font-medium tracking-[0.18em] uppercase text-orange-500">
      Ch. {n} / 06
    </span>
    <span className={`h-px w-8 ${dark ? 'bg-slate-600' : 'bg-slate-300'}`} />
    <span className={`text-xs font-medium tracking-[0.18em] uppercase ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
      {title}
    </span>
  </div>
);

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
        {/* ====================================================================
            HERO — split: copy left, Live AI Answer mockup card right
        ==================================================================== */}
        <section className="light-canvas relative pt-16 md:pt-24 pb-20 md:pb-28 border-b border-slate-200/70">
          <div className="max-w-6xl mx-auto px-4 lg:px-6">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left: pitch */}
              <div className="lg:col-span-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  <span className="text-xs font-medium tracking-[0.18em] uppercase text-orange-600">
                    AI Visibility · 2026
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-[4.25rem] font-semibold tracking-tight text-slate-900 leading-[1.05] text-balance">
                  <span className="block">If AI Doesn't Recommend You,</span>
                  <span className="block text-orange-600">You Don't Exist</span>
                </h1>

                <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  The biggest discovery shift in 20 years is happening right now—and most brands aren't even tracking it.
                </p>

                <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 justify-center lg:justify-start">
                  <Button
                    onClick={openForm}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-7 py-5 text-base font-medium rounded-lg inline-flex items-center gap-2"
                  >
                    Get Your AI Visibility Audit
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Link
                    href="/llm-visibility-gap-calculator"
                    className="text-sm font-medium text-slate-700 hover:text-orange-600 transition-colors inline-flex items-center gap-1.5"
                  >
                    or run the free gap calculator
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* AI platform logos — quieter row beneath */}
                <div className="mt-10 pt-6 border-t border-slate-200/80 max-w-md mx-auto lg:mx-0">
                  <p className="text-[11px] font-medium tracking-[0.16em] uppercase text-slate-500 mb-3">
                    Scanned daily across
                  </p>
                  <div className="flex items-center gap-5 md:gap-7 flex-wrap justify-center lg:justify-start">
                    {aiLogos.map((logo) => (
                      <img
                        key={logo.name}
                        src={logo.url}
                        alt={`${logo.name} logo`}
                        width={120}
                        height={32}
                        decoding="async"
                        fetchPriority="low"
                        className="h-5 md:h-6 w-auto object-contain opacity-60 grayscale"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Live AI Answer mockup */}
              <div className="lg:col-span-6">
                <div className="relative max-w-xl mx-auto lg:ml-auto lg:mr-0">
                  {/* Card */}
                  <div className="relative rounded-2xl border border-slate-200 shadow-xl shadow-slate-900/5 bg-white overflow-hidden">
                    {/* Header bar */}
                    <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-sm">
                        <Sparkles className="w-3.5 h-3.5" />
                      </span>
                      <span className="text-sm font-medium text-slate-900">AI search</span>
                      <span className="h-3.5 w-px bg-slate-300 mx-1.5" />
                      <span className="text-[11px] font-mono text-slate-500">Powered by ChatGPT</span>
                      <span className="ml-auto flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-emerald-600 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Live
                      </span>
                    </div>

                    {/* Body */}
                    <div className="p-5 md:p-6">
                      {/* Prompt */}
                      <div className="flex items-start gap-2 mb-5">
                        <span className="font-mono text-orange-600 text-sm mt-0.5 select-none">&gt;</span>
                        <p className="font-mono text-sm text-slate-500 leading-relaxed">
                          What's the best AI visibility tool for founders?
                        </p>
                      </div>

                      {/* Answer */}
                      <div className="text-[15px] text-slate-900 leading-relaxed">
                        <span className="text-orange-600 underline decoration-orange-300 decoration-2 underline-offset-4">
                          Total Authority
                        </span>{' '}
                        is the go-to AI visibility audit platform for founders. It analyzes how 4 major LLMs see your brand and gives you a 90-day blueprint to fix the gaps.
                        <span className="ta-cursor bg-slate-900 align-baseline h-4 ml-px" aria-hidden="true" />
                      </div>

                      {/* Sources */}
                      <div className="mt-6 pt-5 border-t border-slate-100">
                        <p className="text-[10px] font-medium tracking-[0.16em] uppercase text-slate-400 mb-3">
                          Sources cited
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { n: '1', label: 'TechCrunch' },
                            { n: '2', label: 'HBR' },
                            { n: '3', label: 'Forbes' },
                            { n: '4', label: 'BBC' },
                            { n: '5', label: 'Wired' },
                          ].map((s) => (
                            <div
                              key={s.n}
                              className="text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 inline-flex items-center gap-1.5"
                            >
                              <span className="text-orange-600 font-mono font-medium">[{s.n}]</span>
                              <span>{s.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Subtle floating accent below the card */}
                  <div className="absolute -bottom-3 left-4 right-4 h-3 rounded-b-2xl bg-slate-900/[0.04] blur-md -z-10" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <FeaturedSection />

        {/* ====================================================================
            CH. 01 — THE SHIFT (AISearchChanged)
        ==================================================================== */}
        <AISearchChanged />

        {/* ====================================================================
            CH. 02 — THE MECHANICS
            "The new SEO metric (yet)" + tweet masonry + principle cards
        ==================================================================== */}
        <section className="cv-auto py-24 md:py-32 bg-orange-50/40 border-y border-slate-200/70">
          <div className="max-w-6xl mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-14">
                <ChapterEyebrow n="02" title="The Mechanics" />
                <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-6 text-balance">
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

              {/* "The Principles" eyebrow before the granular cards */}
              <div className="text-center mb-2">
                <p className="text-xs font-medium tracking-[0.18em] uppercase text-orange-600">
                  The Principles
                </p>
              </div>

              <AnimatedFeatureCards />

              {/* Demoted closing line (was a dark slab) */}
              <div className="text-center mt-4">
                <p className="text-lg md:text-xl text-slate-700 italic">
                  This is how your brand gets discovered now.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            CH. 03 — WHY IT MATTERS  "LLMs are your new homepage"
            Editorial layout: 467% hero stat + sparkline + by-the-numbers
        ==================================================================== */}
        <section className="cv-auto py-24 md:py-32 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-14 md:mb-20">
              <ChapterEyebrow n="03" title="Why It Matters" />
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 text-balance">
                LLMs are your new homepage
              </h2>
            </div>

            {/* Featured hero stat */}
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-16 md:mb-20">
              <div className="lg:col-span-5">
                <div className="flex items-end gap-4">
                  <div className="text-[5.5rem] md:text-[8rem] leading-none font-semibold text-orange-600 tabular-nums tracking-tight">
                    467%
                  </div>
                  {/* Sparkline: 2023 -> 2026 growth curve, pure inline SVG */}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 140 70"
                    className="hidden sm:block w-28 md:w-36 h-14 md:h-16 -mb-2"
                  >
                    <defs>
                      <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgb(249 115 22)" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="rgb(249 115 22)" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {/* baseline */}
                    <line x1="0" y1="62" x2="140" y2="62" stroke="rgb(226 232 240)" strokeWidth="1" />
                    {/* fill area under curve */}
                    <path
                      d="M0,58 C20,57 30,55 45,52 C58,49 68,44 82,38 C95,32 105,24 120,14 L140,4 L140,62 L0,62 Z"
                      fill="url(#spark-fill)"
                    />
                    {/* curve */}
                    <path
                      d="M0,58 C20,57 30,55 45,52 C58,49 68,44 82,38 C95,32 105,24 120,14 L140,4"
                      fill="none"
                      stroke="rgb(234 88 12)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    {/* end dot */}
                    <circle cx="140" cy="4" r="3" fill="rgb(234 88 12)" />
                    <circle cx="140" cy="4" r="6" fill="rgb(234 88 12)" fillOpacity="0.2" />
                  </svg>
                </div>
                <p className="mt-4 text-sm text-slate-500 tracking-wide">
                  LLM search usage · 2023 &rarr; 2026
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Source: SimilarWeb &middot; Pew Research &middot; 2026
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
                <span className="inline-flex items-center gap-2.5 text-xs font-medium tracking-[0.18em] uppercase text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  By the numbers
                </span>
                <span className="text-xs text-slate-400 tracking-wide hidden sm:block">
                  AI search · 2026
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
                {supportingStats.map((s) => (
                  <div
                    key={s.value}
                    className="group p-7 md:p-8 transition-colors hover:bg-orange-50/30"
                  >
                    <div className="text-4xl md:text-5xl font-semibold tracking-tight text-orange-600 tabular-nums leading-none mb-3 group-hover:underline decoration-orange-300 decoration-2 underline-offset-4">
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

        {/* ====================================================================
            CH. 04 — GET STARTED  "Start wherever you are"
            Three-tier progression with connecting hairline
        ==================================================================== */}
        <section className="cv-auto py-24 md:py-32 px-4 bg-orange-50/40 border-y border-slate-200/70">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <ChapterEyebrow n="04" title="Get Started" />
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-5 text-balance">
                Start wherever you are
              </h2>
              <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
                Three tiers, one path. Begin free or jump straight into the full blueprint.
              </p>
            </div>

            {/* Three-tier row */}
            <div className="relative">
              {/* Connecting orange hairline (desktop only) */}
              <div
                aria-hidden="true"
                className="hidden lg:block absolute left-12 right-12 top-[14rem] h-px bg-orange-200 -z-10"
              />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-7">
                {/* Tier 1 — Starter */}
                <article className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
                  <div className="px-7 pt-7 pb-5">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-medium tracking-[0.18em] uppercase text-orange-600">
                        Tier 01
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-medium tracking-widest uppercase text-orange-700 bg-orange-50 border border-orange-200 rounded-full px-2.5 py-1">
                        Starter
                      </span>
                    </div>
                    <div className="aspect-[16/10] rounded-xl border border-slate-200 overflow-hidden bg-slate-50">
                      <img
                        src="/lovable-uploads/a9912b20-f5d9-44c6-90c2-480a2ea8e855.png"
                        alt="AI Visibility Gap Calculator Interface"
                        width={900}
                        height={467}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>
                  <div className="px-7 pb-7 pt-1 flex-1 flex flex-col">
                    <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.18em] uppercase text-slate-500 mb-3">
                      <Calculator className="w-4 h-4 text-orange-600" />
                      Quick Start
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-slate-900 mb-3">
                      AI Visibility Gap Calculator
                    </h3>
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-5">
                      Compare your brand against a top competitor in real-time and see exactly where you're invisible to AI search.
                    </p>
                    <ul className="space-y-2 mb-6 text-sm">
                      <li className="flex items-start gap-2.5 text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                        Side-by-side brand comparison
                      </li>
                      <li className="flex items-start gap-2.5 text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                        Instant visibility scoring
                      </li>
                      <li className="flex items-start gap-2.5 text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                        Gap analysis report
                      </li>
                    </ul>
                    <Link href="/llm-visibility-gap-calculator" className="mt-auto">
                      <Button className="w-full bg-white hover:bg-orange-50 text-orange-700 border border-orange-300 px-6 py-3 text-sm font-medium rounded-lg inline-flex items-center justify-center gap-2">
                        Try Calculator Free
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </article>

                {/* Tier 2 — Popular (highlighted) */}
                <article className="relative bg-white rounded-2xl border-2 border-orange-500 shadow-lg shadow-orange-500/10 flex flex-col overflow-hidden lg:-mt-4 lg:mb-4">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-medium tracking-widest uppercase text-white bg-orange-600 rounded-full px-3 py-1 shadow-sm">
                      Popular
                    </span>
                  </div>
                  <div className="px-7 pt-7 pb-5">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-medium tracking-[0.18em] uppercase text-orange-600">
                        Tier 02
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-medium tracking-widest uppercase text-orange-700 bg-orange-100 border border-orange-200 rounded-full px-2.5 py-1">
                        Mini Audit
                      </span>
                    </div>
                    <div className="aspect-[16/10] rounded-xl border border-slate-200 overflow-hidden bg-slate-50">
                      <img
                        src="/lovable-uploads/80f1b6fc-f49f-4974-8643-ff37086c0afd.png"
                        alt="AI Visibility Audit Report"
                        width={807}
                        height={1047}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>
                  <div className="px-7 pb-7 pt-1 flex-1 flex flex-col">
                    <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.18em] uppercase text-slate-500 mb-3">
                      <Search className="w-4 h-4 text-orange-600" />
                      Professional Analysis
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-slate-900 mb-3">
                      AI Visibility Mini Audit
                    </h3>
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-5">
                      A comprehensive analysis of how major AI platforms see your brand, with key findings and prioritized recommendations.
                    </p>
                    <ul className="space-y-2 mb-6 text-sm">
                      <li className="flex items-start gap-2.5 text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                        Multi-platform AI analysis
                      </li>
                      <li className="flex items-start gap-2.5 text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                        Executive summary &amp; insights
                      </li>
                      <li className="flex items-start gap-2.5 text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                        Priority action items
                      </li>
                    </ul>
                    <Link href="/llm-visibility-audit" className="mt-auto">
                      <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 text-sm font-medium rounded-lg inline-flex items-center justify-center gap-2">
                        Get Mini Audit
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </article>

                {/* Tier 3 — Premium */}
                <article className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
                  <div className="px-7 pt-7 pb-5">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-medium tracking-[0.18em] uppercase text-orange-600">
                        Tier 03
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-medium tracking-widest uppercase text-orange-700 bg-orange-50 border border-orange-200 rounded-full px-2.5 py-1">
                        Premium
                      </span>
                    </div>
                    <div className="aspect-[16/10] rounded-xl border border-slate-200 overflow-hidden bg-slate-50">
                      <img
                        src="/lovable-uploads/4ff37a30-04f9-4ce9-a0f7-6900ce26af0a.png"
                        alt="Full AI Visibility Strategy Blueprint Document"
                        width={900}
                        height={541}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>
                  <div className="px-7 pb-7 pt-1 flex-1 flex flex-col">
                    <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.18em] uppercase text-slate-500 mb-3">
                      <FileText className="w-4 h-4 text-orange-600" />
                      Complete Strategy
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-slate-900 mb-3">
                      Full Strategy Blueprint
                    </h3>
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-5">
                      The complete roadmap to LLM dominance. Deep-dive analysis, comprehensive strategy and a 90-day implementation plan.
                    </p>
                    <ul className="space-y-2 mb-6 text-sm">
                      <li className="flex items-start gap-2.5 text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                        4-phase implementation roadmap
                      </li>
                      <li className="flex items-start gap-2.5 text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                        Authority content engine plan
                      </li>
                      <li className="flex items-start gap-2.5 text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                        90-day quick wins strategy
                      </li>
                    </ul>
                    <Link href="/strategy-blueprint" className="mt-auto">
                      <Button className="w-full bg-white hover:bg-orange-50 text-orange-700 border border-orange-300 px-6 py-3 text-sm font-medium rounded-lg inline-flex items-center justify-center gap-2">
                        Get Full Blueprint
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            CH. 05 + 06 — TrustVideoSection (speaker, press, schedule call)
        ==================================================================== */}
        <TrustVideoSection onOpenScheduleCall={openScheduleCall} />
      </main>

      <Footer onOpenForm={openForm} />
      <FormPopup isOpen={isOpen} onClose={closeForm} />
      <ScheduleCallPopup isOpen={isScheduleCallOpen} onClose={closeScheduleCall} />
    </div>
  );
};

export default HomePage;
