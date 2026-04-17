"use client";

import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface BlogPostSidebarProps {
  headings: Heading[];
}

export const BlogPostSidebar: React.FC<BlogPostSidebarProps> = ({ headings }) => {
  const [activeHeading, setActiveHeading] = useState<string>('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    if (headings.length === 0) return;

    const HEADER_OFFSET = 110;

    const compute = () => {
      setShowScrollTop(window.scrollY > 400);

      let current = '';
      for (const h of headings) {
        const el = document.getElementById(h.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - HEADER_OFFSET <= 0) {
          current = h.id;
        } else {
          break;
        }
      }

      // Before the first heading scrolls past, highlight the first item.
      if (!current && headings.length > 0 && window.scrollY > 50) {
        const first = document.getElementById(headings[0].id);
        if (first && first.getBoundingClientRect().top < window.innerHeight) {
          current = headings[0].id;
        }
      }

      setActiveHeading(prev => (prev === current ? prev : current));
    };

    compute();
    window.addEventListener('scroll', compute, { passive: true });
    window.addEventListener('resize', compute, { passive: true });
    return () => {
      window.removeEventListener('scroll', compute);
      window.removeEventListener('resize', compute);
    };
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (headings.length === 0) return null;

  return (
    <div className="space-y-2">
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="flex items-center px-3 pt-3 pb-2 border-b border-gray-100">
          <div className="w-1 h-4 bg-orange-500 rounded-full mr-2"></div>
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wide">
            Table of Contents
          </h3>
        </div>
        <nav className="py-1">
          {headings.map((heading) => {
            const isActive = activeHeading === heading.id;
            const indent =
              heading.level === 3 ? 'pl-7' :
              heading.level === 4 ? 'pl-10' : 'pl-3';
            return (
              <button
                key={heading.id}
                onClick={() => scrollToHeading(heading.id)}
                className={`block w-full text-left text-xs py-1.5 pr-3 ${indent} border-l-2 transition-colors leading-snug ${
                  isActive
                    ? 'bg-orange-50 text-orange-700 font-semibold border-orange-500'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 border-transparent'
                }`}
              >
                <span className="line-clamp-2">{heading.text}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-full flex items-center justify-center gap-1 py-2 px-3 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-orange-50 hover:text-orange-700 hover:border-orange-200 transition-colors"
        >
          <ChevronUp className="w-3.5 h-3.5" />
          Back to top
        </button>
      )}
    </div>
  );
};
