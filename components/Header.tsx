"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

interface HeaderProps {
  onOpenForm: () => void;
}

export const Header: React.FC<HeaderProps> = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogoClick = () => {
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSectionNavigation = (sectionId: string) => {
    if (pathname === '/') {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

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
        
        <div className="lg:hidden">
          <Link href="/llm-visibility-audit" onClick={scrollToTop}>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2">
              AI Visibility Audit
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
