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
    const handleScroll = () => {
      // Show scroll to top button when scrolled down
      setShowScrollTop(window.scrollY > 400);

      // Update active heading based on scroll position
      const headingElements = headings
        .map(h => document.getElementById(h.id))
        .filter((el): el is HTMLElement => el !== null);
      
      let currentActive = '';
      for (let i = headingElements.length - 1; i >= 0; i--) {
        const element = headingElements[i];
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            currentActive = element.id;
            break;
          }
        }
      }
      
      if (currentActive !== activeHeading) {
        setActiveHeading(currentActive);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings, activeHeading]);

  const scrollToHeading = (headingId: string) => {
    console.log('Attempting to scroll to heading:', headingId);
    const element = document.getElementById(headingId);
    
    if (element) {
      console.log('Found element:', element);
      const offsetTop = element.offsetTop - 100; // Account for fixed header
      window.scrollTo({ 
        top: offsetTop, 
        behavior: 'smooth' 
      });
    } else {
      console.log('Element not found for ID:', headingId);
      // Try to find by text content as fallback
      const allHeadings = document.querySelectorAll('.blog-content h1, .blog-content h2, .blog-content h3, .blog-content h4');
      const targetHeading = headings.find(h => h.id === headingId);
      
      if (targetHeading) {
        const matchingElement = Array.from(allHeadings).find(el => 
          el.textContent?.trim() === targetHeading.text.trim()
        );
        
        if (matchingElement) {
          console.log('Found matching element by text:', matchingElement);
          const offsetTop = matchingElement.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ 
            top: offsetTop, 
            behavior: 'smooth' 
          });
        }
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="sticky top-8 space-y-6">
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
                className={`block w-full text-left text-sm py-3 px-4 rounded-lg transition-all duration-200 border-l-3 ${
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
