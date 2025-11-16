"use client";

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { TrendingUp, Search, Bot, AlertTriangle } from 'lucide-react';

// Terminal typewriter effect (robust, Safari/StrictMode safe)
const useTypewriter = (text: string, speed = 50) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const indexRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);

  const clearTick = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const startTyping = () => {
    clearTick();
    indexRef.current = 0;
    setDisplayText('');
    setIsTyping(true);
  };

  useEffect(() => {
    if (!isTyping) return;

    const tick = () => {
      const i = indexRef.current + 1;
      indexRef.current = i;
      if (i <= text.length) {
        setDisplayText(text.slice(0, i));
        timeoutRef.current = window.setTimeout(tick, speed);
      } else {
        setIsTyping(false);
        clearTick();
      }
    };

    timeoutRef.current = window.setTimeout(tick, speed);
    return clearTick;
  }, [text, speed, isTyping]);

  // Cleanup if text changes while typing
  useEffect(() => () => clearTick(), [text]);

  return { displayText, isTyping, startTyping };
};

// LLM activity streams
const llmStreams = [
  {
    title: "Scanning Gemini",
    logo: "https://cdn.brandfetch.io/google.com/w/512/h/161/logo?c=1idP0DrE2OZDRG5HYTw",
    lines: [
      "🧠 Query: \"Best sales software for fast-growing teams\"",
      "🌐 Sources used: TechCrunch, Zapier, Harvard Business Review, Reddit threads",
      "🧾 Citation scan: 27 sources evaluated",
      "📌 Featured brands:",
      "   ✅ HubSpot",
      "   ✅ Close",
      "   ✅ Pipedrive",
      "   ❌ [YourBrand] not included",
      "📉 Confidence score for [YourBrand]: 0.1 (Low)",
      "📂 Reason: Not mentioned in recent media / No structured data found"
    ],
    color: "text-blue"
  },
  {
    title: "Scanning ChatGPT",
    logo: "https://cdn.brandfetch.io/openai.com/w/512/h/139/logo?c=1idP0DrE2OZDRG5HYTw",
    lines: [
      "🤖 Prompt: \"What's the top platform for secure file sharing?\"",
      "📈 Sources: Wired, Forbes, Wikipedia, customer reviews",
      "🔍 Scan depth: 14 data points analyzed",
      "📊 Ranked output:",
      "   1. Dropbox",
      "   2. Google Drive", 
      "   3. Box",
      "   ❌ [YourBrand] not referenced",
      "",
      "🧩 Reason: No high-authority citations / Missing organization schema",
      "🗑️ Response fallback: \"I don't have specific information on that company.\""
    ],
    color: "text-orange"
  },
  {
    title: "Scanning Claude",
    logo: "https://cdn.brandfetch.io/claude.ai/w/512/h/111/logo?c=1idP0DrE2OZDRG5HYTw",
    lines: [
      "🧠 Query: \"Is [YourBrand] a reliable choice for ecommerce hosting?\"",
      "🔎 Evaluating: credibility signals, expert bios, press mentions, trust factors",
      "📚 Training sources:",
      "   - Knowledge graphs",
      "   - News outlets",
      "   - Business databases",
      "🧪 Brand audit:",
      "   ❌ Knowledge panel: Not found",
      "   ❌ Recent media: None detected",
      "   ❌ Author data / schema: Incomplete",
      "",
      "💡 Claude Summary: Not enough verified evidence to recommend this brand."
    ],
    color: "text-purple"
  },
  {
    title: "Scanning Perplexity",
    logo: "https://cdn.brandfetch.io/perplexity.ai/w/512/h/512?c=1idP0DrE2OZDRG5HYTw",
    lines: [
      "🧠 Prompt: \"Who are the top competitors to Webflow?\"",
      "🔗 Sources retrieved: 21 (Google, Reddit, Medium, SaaS blogs)",
      "📰 Prioritized content:",
      "   - \"Best website builders\" roundups",
      "   - Reddit upvoted threads",
      "   - Recent expert comparison posts",
      "",
      "🏁 Cited brands:",
      "   ✅ Webflow",
      "   ✅ Framer",
      "   ✅ Wix",
      "   ❌ [YourBrand] excluded from results",
      "📌 System note: Lacked recent coverage / No high-authority citations detected"
    ],
    color: "text-green"
  }
];

const TerminalOutput: React.FC<{ active: boolean; onComplete: () => void }> = ({ active, onComplete }) => {
  const [streamIndex, setStreamIndex] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Timer/interval management to prevent duplicate loops
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

  // Reset when activated
  useEffect(() => {
    if (!active) {
      clearAllTimers();
      return;
    }
    
    console.log('Terminal activated - resetting state');
    clearAllTimers();
    runIdRef.current += 1;

    setStreamIndex(0);
    setLineIndex(0);
    setDisplayedLines([]);
    setCurrentLine('');
    setIsTyping(false);
    
  // Start the first line after a brief delay
  addTimeout(() => {
    console.log('Starting first line typing');
    typeNextLine(runIdRef.current, 0, 0);
  }, 500);

  return clearAllTimers;
}, [active]);

  const typeNextLine = (runId: number, sIndex: number, lIndex: number) => {
    if (runId !== runIdRef.current) return; // stale run

    const stream = llmStreams[sIndex];
    if (!stream) return;
    if (lIndex >= stream.lines.length) {
      console.log('No more lines in current stream');
      moveToNextStream(runId, sIndex);
      return;
    }

    const lineToType = stream.lines[lIndex];
    console.log(`Typing line ${lIndex} of stream ${sIndex}: "${lineToType}"`);
    
    setIsTyping(true);
    setCurrentLine('');
    setStreamIndex(sIndex);
    setLineIndex(lIndex);
    
    // Ensure only one interval is active
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
        console.log('Finished typing line, adding to displayed lines');
        
        // Line finished typing, add to displayed lines (dedupe)
        setDisplayedLines(prev => (prev[prev.length - 1] === lineToType ? prev : [...prev, lineToType]));
        setCurrentLine('');
        setIsTyping(false);
        
        // Move to next line after delay
        addTimeout(() => {
          typeNextLine(runId, sIndex, lIndex + 1);
        }, 500);
      }
    }, 30);
  };

  const moveToNextStream = (runId: number, sIndex: number) => {
    console.log(`Moving from stream ${sIndex} to next`);
    if (runId !== runIdRef.current) return;
    
    if (sIndex + 1 < llmStreams.length) {
      addTimeout(() => {
        console.log(`Starting stream ${sIndex + 1}`);
        setStreamIndex(sIndex + 1);
        setLineIndex(0);
        setDisplayedLines([]);
        addTimeout(() => typeNextLine(runId, sIndex + 1, 0), 500);
      }, 1500);
    } else {
      console.log('All streams completed, restarting cycle');
      addTimeout(() => {
        console.log('Restarting from stream 0');
        setStreamIndex(0);
        setLineIndex(0);
        setDisplayedLines([]);
        addTimeout(() => typeNextLine(runId, 0, 0), 500);
      }, 2000);
    }
  };

  if (!active) return null;

  console.log('Rendering terminal:', {
    streamIndex,
    lineIndex,
    displayedLines: displayedLines.length,
    currentLine,
    isTyping,
    currentStreamTitle: currentStream.title
  });

  return (
    <div className="font-mono text-sm h-full flex flex-col">
      <div className={`font-bold ${currentStream.color} animate-pulse mb-4 flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 border border-green-400/30`}>
        <img 
          src={currentStream.logo} 
          alt={currentStream.title} 
          className={`w-6 h-6 object-contain ${currentStream.title === 'Scanning ChatGPT' || currentStream.title === 'Scanning Claude' ? 'filter brightness-0 invert' : ''}`}
        />
        <span className="text-lg font-black tracking-wider uppercase">
          [{currentStream.title}]
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-green-400/50 to-transparent ml-2" />
        <div className="text-xs text-green-400/70 font-mono">ACTIVE</div>
      </div>
      
      <div className="flex-1 flex flex-col justify-start space-y-2">
        {displayedLines.map((line, index) => (
          <div key={index} className="text-green-400 leading-relaxed">
            {line}
          </div>
        ))}
        
        {isTyping && (
          <div className="text-green-400 leading-relaxed">
            {currentLine}
            <span className="animate-pulse">_</span>
          </div>
        )}
        
        {!isTyping && lineIndex >= currentStream.lines.length && (
          <div className="text-green-400/30 text-xs pt-2">
            ---
          </div>
        )}
      </div>
    </div>
  );
};

const AISearchChanged: React.FC = () => {
  const [cycle, setCycle] = useState(0);
  const monitorRef = useRef<HTMLDivElement>(null);

  const gridBackground = useMemo(
    () => ({
      backgroundImage:
        "radial-gradient(hsl(var(--orange) / 0.08) 1px, transparent 1px), radial-gradient(hsl(var(--blue) / 0.06) 1px, transparent 1px)",
      backgroundSize: '24px 24px, 36px 36px',
      backgroundPosition: '0 0, 12px 12px'
    }),
    []
  );

  useEffect(() => {
    const element = monitorRef.current;
    if (!element) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCycle(1);
        }
      });
    }, { threshold: 0.3 });
    
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const handleCycleComplete = () => {
    // Stop after one full pass; keep output visible
    console.log('Terminal cycle complete');
  };

  return (
    <section aria-label="AI Search Has Changed Everything" className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0" style={gridBackground} />
      <div className="absolute inset-0 bg-beige/50" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <header className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight">
            The way people search has changed.
          </h2>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground">
            AI-powered tools like ChatGPT, Gemini, Claude, and Perplexity are now answering the questions your future buyers are asking.
            <br />
            <span className="font-semibold text-orange">But here's what no one's telling you…</span>
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-10 md:gap-14 items-start mb-16">
          <div className="relative" ref={monitorRef}>
            <div className="relative rounded-3xl border-2 border-slate-600 bg-gradient-to-b from-slate-800 to-slate-900 shadow-[0_20px_60px_-20px_hsl(var(--orange)/0.25)] p-4 md:p-6">
              <div className="rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-black text-green-400 p-6 relative overflow-hidden min-h-[550px] border-2 border-slate-700 shadow-[inset_0_2px_20px_rgba(34,197,94,0.1)]">
                <div className="absolute inset-0 bg-gradient-to-b from-green-400/10 via-transparent to-green-400/5 pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400/50 via-blue-400/50 to-purple-400/50 animate-pulse" />
                
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-green-400/30">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm shadow-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm shadow-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm shadow-green-500/50" />
                  </div>
                  <div className="text-green-400/90 text-sm font-mono font-bold tracking-wider">LLM ACTIVITY MONITOR v2.4.1</div>
                  <div className="flex-1" />
                  <div className="text-xs text-green-400/60 font-mono">
                    <span className="animate-pulse">●</span> LIVE
                  </div>
                </div>
                
                <div className="h-[480px] flex flex-col">
                  <TerminalOutput 
                    key={cycle}
                    active={cycle > 0}
                    onComplete={handleCycleComplete}
                  />
                </div>
              </div>
              <div className="mt-4 h-3 rounded-full bg-muted mx-auto w-24" />
              <div className="mt-1 h-2 rounded-full bg-muted/60 mx-auto w-32" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl md:text-3xl font-black mb-4">The Reality Check</h3>
              <p className="text-muted-foreground">AI models are reshaping how people discover brands. Here's what's actually happening.</p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {/* Card 1 */}
              <article className="group relative rounded-xl border border-border/50 bg-gradient-to-br from-card via-card/95 to-card/90 p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="absolute inset-x-0 -top-0.5 h-1 rounded-t-xl bg-gradient-to-r from-orange via-orange/80 to-orange/60" />
                <div className="absolute inset-0 bg-gradient-to-br from-orange/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 flex items-start gap-4">
                  <div className="rounded-lg bg-gradient-to-br from-orange/20 to-orange/10 p-2.5 text-orange shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-black mb-1 group-hover:text-orange transition-colors duration-300">The shift is already here</h4>
                    <div className="text-xl font-black text-orange mb-1">📈 467%</div>
                    <p className="text-sm text-muted-foreground">Growth in LLM search usage since 2023. More product discovery now happens inside tools like ChatGPT than through Google itself.</p>
                  </div>
                </div>
              </article>

              {/* Card 2 */}
              <article className="group relative rounded-xl border border-border/50 bg-gradient-to-br from-card via-card/95 to-card/90 p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="absolute inset-x-0 -top-0.5 h-1 rounded-t-xl bg-gradient-to-r from-blue via-blue/80 to-blue/60" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 flex items-start gap-4">
                  <div className="rounded-lg bg-gradient-to-br from-blue/20 to-blue/10 p-2.5 text-blue shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Search className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-black mb-1 group-hover:text-blue transition-colors duration-300">You can't track what you can't see</h4>
                    <div className="text-xl font-black text-blue mb-1">🔍 90%</div>
                    <p className="text-sm text-muted-foreground">Of ChatGPT citations come from sources ranked beyond page 1 of Google. Strong SEO doesn't mean you'll show up in AI answers.</p>
                  </div>
                </div>
              </article>

              {/* Card 3 */}
              <article className="group relative rounded-xl border border-border/50 bg-gradient-to-br from-card via-card/95 to-card/90 p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="absolute inset-x-0 -top-0.5 h-1 rounded-t-xl bg-gradient-to-r from-red via-red/80 to-red/60" />
                <div className="absolute inset-0 bg-gradient-to-br from-red/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 flex items-start gap-4">
                  <div className="rounded-lg bg-gradient-to-br from-red/20 to-red/10 p-2.5 text-red shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-black mb-1 group-hover:text-red transition-colors duration-300">LLMs pick winners</h4>
                    <div className="text-xl font-black text-red mb-1">🏆</div>
                    <p className="text-sm text-muted-foreground">There's no list of 10 options anymore. Chat-based search gives one brand, one product, one result. You're either named—or invisible.</p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>


        {/* Tech-inspired Final Statement - Better Centered Layout */}
        <div className="relative rounded-2xl bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-sm border border-orange-500/20 p-8 md:p-12 shadow-xl overflow-hidden">
          {/* Subtle animated background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/20 to-transparent animate-pulse"></div>
          </div>
          
          {/* Glowing border effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/20 via-slate-500/10 to-orange-500/20 opacity-30 animate-pulse"></div>
          <div className="absolute inset-[1px] rounded-2xl bg-gradient-to-br from-slate-900/95 to-slate-800/95"></div>
          
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            {/* Icon centered at top */}
            <div className="relative mb-8 flex justify-center">
              <div className="absolute inset-0 bg-orange-500/30 rounded-full blur-md animate-pulse"></div>
              <div className="relative rounded-full bg-gradient-to-br from-orange-500/20 to-slate-600/20 border border-orange-400/30 p-4 backdrop-blur-sm">
                <AlertTriangle className="w-8 h-8 text-orange-400" />
              </div>
            </div>
            
            {/* Centered text content */}
            <div className="space-y-6">
              <p className="text-2xl md:text-4xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-slate-100 to-slate-200 bg-clip-text text-transparent block">
                  If your brand isn't being mentioned in AI answers,
                </span>
                <span className="bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent block mt-2">
                  you're not even in the conversation.
                </span>
              </p>
              
              <div className="w-24 h-1 bg-orange-500 mx-auto my-8"></div>
              
              <p className="text-xl text-slate-300/90 font-medium leading-relaxed max-w-2xl mx-auto">
                AI search is redefining brand discovery. Position yourself where it matters.
              </p>
            </div>
          </div>
          
          {/* Subtle corner accents */}
          <div className="absolute top-4 right-4 w-1 h-1 bg-orange-400 rounded-full animate-ping"></div>
          <div className="absolute bottom-4 left-4 w-1 h-1 bg-orange-400 rounded-full animate-ping animation-delay-200"></div>
        </div>
      </div>
    </section>
  );
};

export default AISearchChanged;