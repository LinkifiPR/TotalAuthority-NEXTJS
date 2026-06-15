"use client";

import React, { useEffect, useRef, useState } from 'react';
import { TrendingUp, Search, Bot, AlertTriangle } from 'lucide-react';

// LLM activity streams — emoji stripped, plain ASCII markers for a more
// professional terminal feel. Typewriter logic unchanged.
const llmStreams = [
  {
    title: 'Scanning Gemini',
    logo: 'https://cdn.brandfetch.io/google.com/w/512/h/161/logo?c=1idP0DrE2OZDRG5HYTw',
    lines: [
      'Query: "Best sales software for fast-growing teams"',
      'Sources used: TechCrunch, Zapier, Harvard Business Review, Reddit threads',
      'Citation scan: 27 sources evaluated',
      'Featured brands:',
      '  > HubSpot',
      '  > Close',
      '  > Pipedrive',
      '  - [YourBrand] not included',
      'Confidence score for [YourBrand]: 0.1 (Low)',
      'Reason: Not mentioned in recent media / No structured data found',
    ],
  },
  {
    title: 'Scanning ChatGPT',
    logo: 'https://cdn.brandfetch.io/openai.com/w/512/h/139/logo?c=1idP0DrE2OZDRG5HYTw',
    lines: [
      'Prompt: "What\'s the top platform for secure file sharing?"',
      'Sources: Wired, Forbes, Wikipedia, customer reviews',
      'Scan depth: 14 data points analyzed',
      'Ranked output:',
      '  1. Dropbox',
      '  2. Google Drive',
      '  3. Box',
      '  - [YourBrand] not referenced',
      '',
      'Reason: No high-authority citations / Missing organization schema',
      'Response fallback: "I don\'t have specific information on that company."',
    ],
  },
  {
    title: 'Scanning Claude',
    logo: 'https://cdn.brandfetch.io/claude.ai/w/512/h/111/logo?c=1idP0DrE2OZDRG5HYTw',
    lines: [
      'Query: "Is [YourBrand] a reliable choice for ecommerce hosting?"',
      'Evaluating: credibility signals, expert bios, press mentions, trust factors',
      'Training sources:',
      '  - Knowledge graphs',
      '  - News outlets',
      '  - Business databases',
      'Brand audit:',
      '  - Knowledge panel: Not found',
      '  - Recent media: None detected',
      '  - Author data / schema: Incomplete',
      '',
      'Claude Summary: Not enough verified evidence to recommend this brand.',
    ],
  },
  {
    title: 'Scanning Perplexity',
    logo: 'https://cdn.brandfetch.io/perplexity.ai/w/512/h/512?c=1idP0DrE2OZDRG5HYTw',
    lines: [
      'Prompt: "Who are the top competitors to Webflow?"',
      'Sources retrieved: 21 (Google, Reddit, Medium, SaaS blogs)',
      'Prioritized content:',
      '  - "Best website builders" roundups',
      '  - Reddit upvoted threads',
      '  - Recent expert comparison posts',
      '',
      'Cited brands:',
      '  > Webflow',
      '  > Framer',
      '  > Wix',
      '  - [YourBrand] excluded from results',
      'System note: Lacked recent coverage / No high-authority citations detected',
    ],
  },
];

const TerminalOutput: React.FC<{ active: boolean; onComplete: () => void }> = ({ active, onComplete }) => {
  const [streamIndex, setStreamIndex] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const typingIntervalRef = useRef<number | null>(null);
  const timeoutsRef = useRef<number[]>([]);
  const runIdRef = useRef(0);

  const clearAllTimers = () => {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }
    timeoutsRef.current.forEach((id) => clearTimeout(id));
    timeoutsRef.current = [];
  };

  const addTimeout = (cb: () => void, ms: number) => {
    const id = window.setTimeout(cb, ms);
    timeoutsRef.current.push(id);
    return id;
  };

  const currentStream = llmStreams[streamIndex];

  useEffect(() => {
    if (!active) {
      clearAllTimers();
      return;
    }

    clearAllTimers();
    runIdRef.current += 1;

    setStreamIndex(0);
    setLineIndex(0);
    setDisplayedLines([]);
    setCurrentLine('');
    setIsTyping(false);

    addTimeout(() => {
      typeNextLine(runIdRef.current, 0, 0);
    }, 500);

    return clearAllTimers;
  }, [active]);

  const typeNextLine = (runId: number, sIndex: number, lIndex: number) => {
    if (runId !== runIdRef.current) return;

    const stream = llmStreams[sIndex];
    if (!stream) return;
    if (lIndex >= stream.lines.length) {
      moveToNextStream(runId, sIndex);
      return;
    }

    const lineToType = stream.lines[lIndex];

    setIsTyping(true);
    setCurrentLine('');
    setStreamIndex(sIndex);
    setLineIndex(lIndex);

    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }

    let charIndex = 0;
    typingIntervalRef.current = window.setInterval(() => {
      if (runId !== runIdRef.current) {
        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
        return;
      }

      if (charIndex <= lineToType.length) {
        setCurrentLine(lineToType.slice(0, charIndex));
        charIndex++;
      } else {
        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;

        setDisplayedLines((prev) =>
          prev[prev.length - 1] === lineToType ? prev : [...prev, lineToType]
        );
        setCurrentLine('');
        setIsTyping(false);

        addTimeout(() => {
          typeNextLine(runId, sIndex, lIndex + 1);
        }, 500);
      }
    }, 30);
  };

  const moveToNextStream = (runId: number, sIndex: number) => {
    if (runId !== runIdRef.current) return;

    if (sIndex + 1 < llmStreams.length) {
      addTimeout(() => {
        setStreamIndex(sIndex + 1);
        setLineIndex(0);
        setDisplayedLines([]);
        addTimeout(() => typeNextLine(runId, sIndex + 1, 0), 500);
      }, 1500);
    } else {
      addTimeout(() => {
        setStreamIndex(0);
        setLineIndex(0);
        setDisplayedLines([]);
        addTimeout(() => typeNextLine(runId, 0, 0), 500);
      }, 2000);
    }
  };

  if (!active) return null;

  return (
    <div className="font-mono text-sm h-full flex flex-col">
      <div className="mb-4 flex items-center gap-3 pb-3 border-b border-slate-700">
        <img
          src={currentStream.logo}
          alt={currentStream.title}
          className={`w-5 h-5 object-contain ${
            currentStream.title === 'Scanning ChatGPT' || currentStream.title === 'Scanning Claude'
              ? 'filter brightness-0 invert'
              : ''
          }`}
        />
        <span className="text-sm text-slate-200 font-medium tracking-wide">
          [{currentStream.title}]
        </span>
        <div className="flex-1" />
        <div className="text-[10px] text-emerald-400 tracking-widest uppercase">Active</div>
      </div>

      <div className="flex-1 flex flex-col justify-start space-y-1.5">
        {displayedLines.map((line, index) => (
          <div key={index} className="text-emerald-300/90 leading-relaxed text-[13px]">
            {line || ' '}
          </div>
        ))}

        {isTyping && (
          <div className="text-emerald-300/90 leading-relaxed text-[13px]">
            {currentLine}
            <span className="opacity-70">_</span>
          </div>
        )}
      </div>
    </div>
  );
};

const realityCards = [
  {
    icon: TrendingUp,
    title: 'The shift is already here',
    stat: '467%',
    body: 'Growth in LLM search usage since 2023. More product discovery now happens inside tools like ChatGPT than through Google itself.',
  },
  {
    icon: Search,
    title: "You can't track what you can't see",
    stat: '90%',
    body: "Of ChatGPT citations come from sources ranked beyond page 1 of Google. Strong SEO doesn't mean you'll show up in AI answers.",
  },
  {
    icon: Bot,
    title: 'LLMs pick winners',
    stat: '1 result',
    body: "There's no list of 10 options anymore. Chat-based search gives one brand, one product, one result. You're either named—or invisible.",
  },
];

const AISearchChanged: React.FC = () => {
  const [cycle, setCycle] = useState(0);
  const monitorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = monitorRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setCycle(1);
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const handleCycleComplete = () => {
    /* keep output visible after first pass */
  };

  return (
    <section
      aria-label="AI Search Has Changed Everything"
      className="cv-auto relative py-20 md:py-28 bg-white"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <header className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-orange-600 mb-4">
            The Shift
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900">
            The way people search has changed.
          </h2>
          <p className="mt-5 text-base md:text-lg text-slate-600 leading-relaxed">
            AI-powered tools like ChatGPT, Gemini, Claude, and Perplexity are now answering the questions your future buyers are asking.
            <br />
            <span className="text-slate-900 font-medium">But here's what no one's telling you…</span>
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-start mb-16">
          <div className="relative" ref={monitorRef}>
            <div className="rounded-xl border border-slate-200 shadow-sm overflow-hidden bg-slate-900">
              <div className="flex items-center gap-3 px-5 py-3 border-b border-slate-800">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                </div>
                <div className="text-slate-400 text-xs font-mono tracking-wider">
                  llm-activity-monitor
                </div>
                <div className="flex-1" />
                <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">
                  live
                </div>
              </div>

              <div className="p-5 md:p-6 min-h-[480px]">
                <TerminalOutput
                  key={cycle}
                  active={cycle > 0}
                  onComplete={handleCycleComplete}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 mb-3">
                The reality check
              </h3>
              <p className="text-slate-600">
                AI models are reshaping how people discover brands. Here's what's actually happening.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {realityCards.map((card) => {
                const Icon = card.icon;
                return (
                  <article
                    key={card.title}
                    className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow"
                  >
                    <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900 mb-1">
                        {card.title}
                      </h4>
                      <div className="text-lg font-semibold text-orange-600 mb-1.5">
                        {card.stat}
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">{card.body}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        {/* Final statement */}
        <div className="rounded-xl bg-slate-900 p-10 md:p-14 text-center max-w-4xl mx-auto">
          <div className="inline-flex w-12 h-12 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-400 items-center justify-center mb-6">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <p className="text-2xl md:text-4xl font-semibold tracking-tight leading-tight">
            <span className="block text-slate-100">
              If your brand isn't being mentioned in AI answers,
            </span>
            <span className="block text-orange-400 mt-2">
              you're not even in the conversation.
            </span>
          </p>
          <div className="w-12 h-px bg-orange-500/50 mx-auto my-8" />
          <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            AI search is redefining brand discovery. Position yourself where it matters.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AISearchChanged;
