"use client";

import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';
import { INDUSTRIES } from '@/lib/industries';

interface FooterProps {
  onOpenForm: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenForm }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <img
              src="/total-authority-logo.png"
              alt="TotalAuthority AI Visibility"
              width={601}
              height={200}
              loading="lazy"
              decoding="async"
              className="h-12 md:h-14 w-auto mb-5 brightness-0 invert"
            />
            <p className="text-slate-200 mb-6 max-w-md leading-relaxed">
              Get a comprehensive AI visibility audit to boost your online presence and outrank competitors with data-driven insights.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-1">
              <a
                href="https://www.facebook.com/totalauthority"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-slate-300 hover:text-orange-300 transition-colors p-2 -m-2"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/totalauthority_"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="text-slate-300 hover:text-orange-300 transition-colors p-2 -m-2"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/total-authority/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-slate-300 hover:text-orange-300 transition-colors p-2 -m-2"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com/@Total-Authority"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-slate-300 hover:text-orange-300 transition-colors p-2 -m-2"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-white mb-4 uppercase">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  onClick={scrollToTop}
                  className="text-slate-200 hover:text-orange-300 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  onClick={scrollToTop}
                  className="text-slate-200 hover:text-orange-300 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/podcast"
                  onClick={scrollToTop}
                  className="text-slate-200 hover:text-orange-300 transition-colors"
                >
                  Podcast
                </Link>
              </li>
              <li>
                <Link
                  href="/llm-visibility-gap-calculator"
                  onClick={scrollToTop}
                  className="text-slate-200 hover:text-orange-300 transition-colors"
                >
                  Visibility Gap Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/llm-visibility-audit"
                  onClick={scrollToTop}
                  className="text-slate-200 hover:text-orange-300 transition-colors"
                >
                  Visibility Mini Audit
                </Link>
              </li>
              <li>
                <Link
                  href="/strategy-blueprint"
                  onClick={scrollToTop}
                  className="text-slate-200 hover:text-orange-300 transition-colors"
                >
                  Strategy Blueprint
                </Link>
              </li>
            </ul>
          </div>

          {/* Industries */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold tracking-wide text-white mb-4 uppercase">Industries</h3>
            <ul className="columns-2 gap-x-6 [&>li]:mb-2.5 [&>li]:break-inside-avoid">
              {INDUSTRIES.map((ind) =>
                ind.status === 'live' ? (
                  <li key={ind.slug}>
                    <Link
                      href={`/${ind.slug}`}
                      onClick={scrollToTop}
                      className="text-slate-200 hover:text-orange-300 transition-colors text-sm leading-snug"
                    >
                      {ind.name}
                    </Link>
                  </li>
                ) : (
                  <li key={ind.slug}>
                    <span className="text-slate-400 text-sm leading-snug cursor-default">{ind.name}</span>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-white mb-4 uppercase">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy-policy"
                  onClick={scrollToTop}
                  className="text-slate-200 hover:text-orange-300 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  onClick={scrollToTop}
                  className="text-slate-200 hover:text-orange-300 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/cookie-policy"
                  onClick={scrollToTop}
                  className="text-slate-200 hover:text-orange-300 transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-300 text-sm">
            © {new Date().getFullYear()} TotalAuthority. All rights reserved.
          </p>
          <button
            onClick={onOpenForm}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-lg font-medium text-sm transition-colors"
          >
            Get Your Free AI Audit
          </button>
        </div>
      </div>
    </footer>
  );
};
