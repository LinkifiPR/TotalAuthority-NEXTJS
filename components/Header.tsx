"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { INDUSTRIES } from '@/lib/industries';

interface HeaderProps {
  onOpenForm: () => void;
}

export const Header: React.FC<HeaderProps> = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogoClick = () => {
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Close the Industries dropdown when clicking outside.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIndustriesOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" onClick={handleLogoClick} className="flex items-center">
            <img
              src="/total-authority-logo.png"
              alt="TotalAuthority AI Visibility"
              width={601}
              height={200}
              className="h-11 w-auto sm:h-14 md:h-16"
            />
          </Link>
        </div>

        <nav className="hidden lg:flex items-center space-x-8">
          <Link
            href="/about"
            onClick={scrollToTop}
            className="text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium"
          >
            About
          </Link>

          {/* Industries dropdown */}
          <div
            className="relative"
            ref={dropdownRef}
            onMouseEnter={() => setIndustriesOpen(true)}
            onMouseLeave={() => setIndustriesOpen(false)}
          >
            <button
              type="button"
              onClick={() => setIndustriesOpen((v) => !v)}
              className="text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium inline-flex items-center gap-1"
              aria-haspopup="true"
              aria-expanded={industriesOpen}
            >
              Industries
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${
                  industriesOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {industriesOpen && (
              <div className="absolute right-0 top-full mt-2 w-[480px] bg-white border border-slate-200 rounded-xl shadow-xl p-3 z-50">
                <div className="grid grid-cols-2 gap-1">
                  {INDUSTRIES.map((ind) => {
                    const isLive = ind.status === 'live';
                    const baseClasses =
                      'flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors';
                    if (isLive) {
                      return (
                        <Link
                          key={ind.slug}
                          href={`/${ind.slug}`}
                          onClick={() => {
                            setIndustriesOpen(false);
                            scrollToTop();
                          }}
                          className={`${baseClasses} text-slate-700 hover:bg-orange-50 hover:text-orange-700 font-medium`}
                        >
                          <span>{ind.name}</span>
                        </Link>
                      );
                    }
                    return (
                      <span
                        key={ind.slug}
                        className={`${baseClasses} text-slate-400 cursor-default select-none`}
                        title={`${ind.name} — coming soon`}
                      >
                        <span>{ind.name}</span>
                        <span className="text-[10px] font-medium uppercase tracking-wider text-slate-300">
                          Soon
                        </span>
                      </span>
                    );
                  })}
                </div>
                <div className="border-t border-slate-100 mt-3 pt-3 px-3">
                  <p className="text-xs text-slate-500">
                    More industries launching soon.{' '}
                    <Link
                      href="/llm-visibility-audit"
                      className="text-orange-600 hover:text-orange-700 font-medium"
                      onClick={() => setIndustriesOpen(false)}
                    >
                      Audit your business →
                    </Link>
                  </p>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/blog"
            onClick={scrollToTop}
            className="text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium"
          >
            Blog
          </Link>
          <Link
            href="/podcast"
            onClick={scrollToTop}
            className="text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium"
          >
            Podcast
          </Link>
          <Link href="/llm-visibility-audit" onClick={scrollToTop}>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              AI Visibility Audit
            </Button>
          </Link>
        </nav>

        <div className="lg:hidden flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="text-slate-700 px-2 py-2 text-sm font-medium"
            aria-label="Toggle navigation"
          >
            Menu
          </button>
          <Link href="/llm-visibility-audit" onClick={scrollToTop}>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2">
              Audit
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile menu drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white">
          <div className="max-w-6xl mx-auto px-4 py-4 space-y-1">
            <Link
              href="/about"
              onClick={() => { setMobileOpen(false); scrollToTop(); }}
              className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              About
            </Link>
            <details className="group">
              <summary className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer list-none flex items-center justify-between">
                Industries
                <ChevronDown className="w-3.5 h-3.5 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="pl-3 pb-2 grid grid-cols-2 gap-1 mt-1">
                {INDUSTRIES.map((ind) =>
                  ind.status === 'live' ? (
                    <Link
                      key={ind.slug}
                      href={`/${ind.slug}`}
                      onClick={() => { setMobileOpen(false); scrollToTop(); }}
                      className="px-3 py-1.5 rounded text-xs font-medium text-slate-700 hover:bg-orange-50 hover:text-orange-700"
                    >
                      {ind.name}
                    </Link>
                  ) : (
                    <span
                      key={ind.slug}
                      className="px-3 py-1.5 rounded text-xs text-slate-400"
                    >
                      {ind.name}
                    </span>
                  )
                )}
              </div>
            </details>
            <Link
              href="/blog"
              onClick={() => { setMobileOpen(false); scrollToTop(); }}
              className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Blog
            </Link>
            <Link
              href="/podcast"
              onClick={() => { setMobileOpen(false); scrollToTop(); }}
              className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Podcast
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
