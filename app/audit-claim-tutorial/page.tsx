"use client";

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FormPopup } from '@/components/FormPopup';
import { useFormPopup } from '@/hooks/useFormPopup';
import { Bot, Sparkles, Zap } from 'lucide-react';

const AuditClaimTutorial = () => {
  const { isOpen, openForm, closeForm } = useFormPopup();

  return (
    <>
      <Helmet>
        <title>AI Visibility Audit Quick Claim Tutorial | TotalAuthority</title>
        <meta 
          name="description" 
          content="Learn how to quickly claim your AI visibility audit with our step-by-step video tutorial. Get your free audit report in minutes." 
        />
        <meta name="keywords" content="AI visibility audit, tutorial, claim audit, SEO audit guide" />
        <link rel="canonical" href="https://totalauthority.io/audit-claim-tutorial" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50">
        <Header onOpenForm={openForm} />
        
        {/* Floating Robot Animations */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 animate-float">
            <Bot className="w-8 h-8 text-orange-400 robot-glow opacity-60" />
          </div>
          <div className="absolute top-32 right-16 animate-float" style={{ animationDelay: '2s' }}>
            <Sparkles className="w-6 h-6 text-blue-400 robot-glow opacity-50" />
          </div>
          <div className="absolute bottom-40 left-20 animate-float" style={{ animationDelay: '4s' }}>
            <Zap className="w-7 h-7 text-purple-400 robot-glow opacity-70" />
          </div>
          <div className="absolute top-1/2 right-8 animate-float" style={{ animationDelay: '1s' }}>
            <Bot className="w-5 h-5 text-green-400 robot-glow opacity-40" />
          </div>
          <div className="absolute bottom-60 right-1/4 animate-float" style={{ animationDelay: '3s' }}>
            <Sparkles className="w-9 h-9 text-orange-300 robot-glow opacity-60" />
          </div>
        </div>

        <main className="relative z-10">
          <div className="container mx-auto px-4 py-16">
            {/* Page Title */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                AI Visibility Audit 
                <span className="block mt-2 bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
                  Quick Claim Tutorial
                </span>
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Watch this quick video to learn how to claim your free AI visibility audit and start optimizing your online presence today.
              </p>
            </div>

            {/* Video Section */}
            <div className="max-w-4xl mx-auto mb-16">
              <div className="relative">
                {/* Orange background with gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 rounded-3xl shadow-2xl transform rotate-1"></div>
                <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                  <div className="p-8">
                    <div className="relative overflow-hidden rounded-2xl shadow-lg">
                      <div style={{ position: 'relative', paddingBottom: '64.98194945848375%', height: 0 }}>
                        <iframe 
                          src="https://www.loom.com/embed/11590aa9aef145faab53d62fe95e9f3a?sid=18165270-e678-4f9c-ba8c-298ca58317f7" 
                          frameBorder="0" 
                          allowFullScreen 
                          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                          title="AI Visibility Audit Quick Claim Tutorial"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer onOpenForm={openForm} />
        <FormPopup isOpen={isOpen} onClose={closeForm} />
      </div>
    </>
  );
};

export default AuditClaimTutorial;