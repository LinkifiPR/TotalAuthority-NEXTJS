"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';

interface FooterProps {
  onOpenForm: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenForm }) => {
  const pathname = usePathname();
  const router = useRouter();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSectionLink = (sectionId: string) => {
    if (pathname === '/') {
      // We're on homepage, scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // We're on another page, navigate to homepage then scroll to section
      router.push('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleBlogClick = () => {
    router.push('/blog');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 150);
  };

  const handleAboutClick = () => {
    router.push('/about');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 150);
  };

  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              {/* Robot Face Logo */}
              <div className="relative w-10 h-10 flex items-center justify-center">
                {/* Outer decorative circle */}
                <div className="absolute inset-0 rounded-full border-2 border-orange-400/30"></div>
                
                {/* Inner circle background */}
                <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
                  {/* Robot eyes */}
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                  
                  {/* Robot mouth - small line */}
                  <div className="absolute bottom-1.5 w-2 h-0.5 bg-white/80 rounded-full"></div>
                </div>
                
                {/* Subtle glow effect */}
                <div className="absolute inset-0 rounded-full bg-orange-400/20 blur-sm"></div>
              </div>
              <span className="text-xl font-bold text-white">TotalAuthority</span>
            </div>
            <p className="text-slate-300 mb-6 max-w-md">
              Get a comprehensive AI visibility audit to boost your online presence and outrank competitors with data-driven insights.
            </p>
            
            {/* Social Icons */}
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/totalauthority" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-orange-400 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://x.com/totalauthority_" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-orange-400 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/company/total-authority/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-orange-400 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://www.youtube.com/@Total-Authority" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-orange-400 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={handleAboutClick}
                  className="text-slate-300 hover:text-orange-400 transition-colors cursor-pointer"
                >
                  About
                </button>
              </li>
              <li>
                <button 
                  onClick={handleBlogClick}
                  className="text-slate-300 hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Blog
                </button>
              </li>
              <li>
                <a 
                  href="https://totalauthority.com/llm-visibility-gap-calculator"
                  className="text-slate-300 hover:text-orange-400 transition-colors"
                >
                  Visibility Gap Calculator
                </a>
              </li>
              <li>
                <a 
                  href="https://totalauthority.com/llm-visibility-audit"
                  className="text-slate-300 hover:text-orange-400 transition-colors"
                >
                  Visibility Mini Audit
                </a>
              </li>
              <li>
                <a 
                  href="https://totalauthority.com/strategy-blueprint"
                  className="text-slate-300 hover:text-orange-400 transition-colors"
                >
                  Strategy Blueprint
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/privacy-policy" 
                  onClick={scrollToTop}
                  className="text-slate-300 hover:text-orange-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms-of-service" 
                  onClick={scrollToTop}
                  className="text-slate-300 hover:text-orange-400 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link 
                  href="/cookie-policy" 
                  onClick={scrollToTop}
                  className="text-slate-300 hover:text-orange-400 transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} TotalAuthority. All rights reserved.
          </p>
          <button
            onClick={onOpenForm}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Get Your Free AI Audit
          </button>
        </div>
      </div>
    </footer>
  );
};
