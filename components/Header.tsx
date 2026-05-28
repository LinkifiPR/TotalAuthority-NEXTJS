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
          <Link href="/" onClick={handleLogoClick} className="flex items-center">
            <img
              src="/total-authority-logo.png"
              alt="TotalAuthority AI Visibility"
              className="h-10 w-auto sm:h-12 md:h-14"
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
          
          {user ? (
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" onClick={scrollToTop}>
                <Button
                  variant="outline"
                  className="flex items-center space-x-2 border-slate-300 bg-white text-slate-900 hover:bg-slate-100"
                >
                  <User className="w-4 h-4" />
                  <span>Dashboard</span>
                </Button>
              </Link>
              <Button 
                variant="outline" 
                onClick={handleSignOut}
                className="flex items-center space-x-2 border-slate-300 bg-white text-slate-900 hover:bg-slate-100"
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
                <Button variant="outline" className="border-slate-300 bg-white text-slate-900 hover:bg-slate-100">
                  Sign In
                </Button>
              </Link>
            </div>
          )}
        </nav>
        
        <div className="lg:hidden">
          {user ? (
            <Link href="/dashboard" onClick={scrollToTop}>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center space-x-2 border-slate-300 bg-white text-slate-900 hover:bg-slate-100"
              >
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
              <Link href="/auth" onClick={scrollToTop} className="hidden sm:block">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-slate-300 bg-white text-slate-900 hover:bg-slate-100"
                >
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
