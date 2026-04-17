"use client";


import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (headings.length === 0) return;
    const elements = headings
      .map(h => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const HEADER_OFFSET = 96;

    const computeActive = () => {
      let current = '';
      for (const el of elements) {
        if (el.getBoundingClientRect().top - HEADER_OFFSET <= 0) {
          current = el.id;
        } else {
          break;
        }
      }
      setActiveHeading(prev => (prev === current ? prev : current));
    };

    const observer = new IntersectionObserver(computeActive, {
      rootMargin: `-${HEADER_OFFSET}px 0px -60% 0px`,
      threshold: [0, 1],
    });
    elements.forEach(el => observer.observe(el));
    window.addEventListener('scroll', computeActive, { passive: true });
    computeActive();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', computeActive);
    };
  }, [headings]);

  const scrollToHeading = (headingId: string) => {
    const element = document.getElementById(headingId);
    if (!element) return;
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto space-y-6 pr-1">
      {/* Table of Contents */}
      <Card className="border border-gray-200 shadow-sm bg-white">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
            <div className="w-1 h-6 bg-orange-500 rounded-full mr-3"></div>
            Table of Contents
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <nav className="space-y-1">
            {headings.map((heading) => (
              <button
                key={heading.id}
                onClick={() => scrollToHeading(heading.id)}
                className={`block w-full text-left text-sm py-3 px-4 rounded-lg transition-all duration-200 border-l-4 ${
                  activeHeading === heading.id
                    ? 'bg-orange-50 text-orange-700 font-semibold border-orange-500 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 border-transparent hover:border-gray-200'
                } ${
                  heading.level === 2 ? 'ml-0' : 
                  heading.level === 3 ? 'ml-4' : 
                  heading.level === 4 ? 'ml-8' : 'ml-0'
                }`}
              >
                <span className="line-clamp-2 leading-relaxed">{heading.text}</span>
              </button>
            ))}
          </nav>
        </CardContent>
      </Card>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Card className="border border-gray-200 shadow-sm bg-white">
          <CardContent className="p-4">
            <Button
              onClick={scrollToTop}
              variant="outline"
              size="sm"
              className="w-full hover:bg-orange-50 hover:border-orange-200 hover:text-orange-700 transition-colors font-medium"
            >
              <ChevronUp className="w-4 h-4 mr-2" />
              Back to Top
            </Button>
          </CardContent>
        </Card>
      )}

    </div>
  );
};
