"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { User, LogOut } from 'lucide-react';

interface HeaderProps {
  onOpenForm: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenForm }) => {
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
  };

  const handleLogoClick = () => {
    // If we're already on the homepage, scroll to top
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // If we're on another page, Link will handle navigation and we'll scroll to top
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSectionNavigation = (sectionId: string) => {
    if (pathname === '/') {
      // Already on homepage, just scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to homepage first, then scroll to section
      router.push('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" onClick={handleLogoClick} className="flex items-center space-x-2 md:space-x-3">
            {/* Clean Robot Face Logo */}
            <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
              {/* Outer decorative circle */}
              <div className="absolute inset-0 rounded-full border-2 border-orange-200 opacity-30"></div>
              
              {/* Middle circle */}
              <div className="absolute inset-1 rounded-full border border-orange-300 opacity-50"></div>
              
              {/* Robot face container */}
              <div className="relative w-6 h-6 md:w-7 md:h-7 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                {/* Eyes */}
                <div className="absolute top-1.5 md:top-2 left-1 md:left-1.5 w-1 md:w-1.5 h-1 md:h-1.5 bg-white rounded-full"></div>
                <div className="absolute top-1.5 md:top-2 right-1 md:right-1.5 w-1 md:w-1.5 h-1 md:h-1.5 bg-white rounded-full"></div>
                
                {/* Mouth */}
                <div className="absolute bottom-1 md:bottom-1.5 left-1/2 transform -translate-x-1/2 w-1.5 md:w-2 h-0.5 bg-white rounded-full"></div>
                
                {/* Small antenna dot */}
                <div className="absolute -top-0.5 md:-top-1 left-1/2 transform -translate-x-1/2 w-0.5 md:w-1 h-0.5 md:h-1 bg-orange-400 rounded-full"></div>
              </div>
              
              {/* Orbital accent dots */}
              <div className="absolute top-0.5 md:top-1 right-0.5 md:right-1 w-1 md:w-1.5 h-1 md:h-1.5 bg-blue-500 rounded-full"></div>
              <div className="absolute bottom-0.5 md:bottom-1 left-0.5 md:left-1 w-0.5 md:w-1 h-0.5 md:h-1 bg-purple-500 rounded-full"></div>
            </div>
            
            {/* Brand name with enhanced typography */}
            <div className="flex flex-col">
              <span className="text-lg md:text-2xl font-black text-slate-900 tracking-tight leading-none" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                Total<span className="text-orange-500">Authority</span>
              </span>
              <span className="text-xs text-slate-500 font-medium tracking-wider uppercase leading-none mt-0.5 hidden sm:block">
                AI Visibility
              </span>
            </div>
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
          
          {user ? (
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" onClick={scrollToTop}>
                <Button variant="outline" className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Dashboard</span>
                </Button>
              </Link>
              <Button 
                variant="outline" 
                onClick={handleSignOut}
                className="flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link href="/llm-visibility-audit" onClick={scrollToTop}>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  AI Visibility Audit
                </Button>
              </Link>
              <Link href="/auth" onClick={scrollToTop}>
                <Button variant="outline">
                  Sign In
                </Button>
              </Link>
            </div>
          )}
        </nav>
        
        <div className="lg:hidden">
          {user ? (
            <Link href="/dashboard" onClick={scrollToTop}>
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Dashboard</span>
              </Button>
            </Link>
          ) : (
            <div className="flex items-center space-x-2">
              <Link href="/llm-visibility-audit" onClick={scrollToTop}>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2">
                  AI Visibility Audit
                </Button>
              </Link>
              <Link href="/auth" onClick={scrollToTop}>
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
