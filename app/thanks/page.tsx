"use client";

import React, { useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { EmailWarningBox } from '@/components/EmailWarningBox';
import { useFormPopup } from '@/hooks/useFormPopup';

const Thanks = () => {
  const { openForm } = useFormPopup();

  useEffect(() => {
    // Load the GHL form embed script
    const script = document.createElement('script');
    script.src = 'https://go.totalauthority.com/js/form_embed.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[src="https://go.totalauthority.com/js/form_embed.js"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-orange-50">
      <Header onOpenForm={openForm} />
      
      <div className="container mx-auto px-4 py-16">
        {/* Mission Received Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-500 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-6 animate-fade-in">
            Mission Received! 🚀
          </h1>
          <p className="text-xl text-gray-800 font-medium mb-8 animate-fade-in">
            All we need now is for you to complete this onboarding form.
          </p>
        </div>

        {/* Animated Arrows */}
        <div className="flex justify-center gap-8 mb-6">
          <svg 
            className="w-12 h-12 text-orange-500 animate-bounce" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            style={{ animationDelay: '0s' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <svg 
            className="w-12 h-12 text-orange-500 animate-bounce" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            style={{ animationDelay: '0.2s' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <svg 
            className="w-12 h-12 text-orange-500 animate-bounce" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            style={{ animationDelay: '0.4s' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>

        {/* Onboarding Form Embed */}
        <div className="max-w-4xl mx-auto mb-12 relative">
          {/* Glowing orange border container */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 rounded-xl blur-sm opacity-75 animate-pulse"></div>
          <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden border-4 border-orange-500">
            <iframe
              src="https://go.totalauthority.com/widget/form/S3eVlLOU3bmsJERNzJa9"
              style={{
                width: '100%',
                height: '1920px',
                border: 'none',
                borderRadius: '8px'
              }}
              id="inline-S3eVlLOU3bmsJERNzJa9"
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="AI Visibility Audit Onboarding Form"
              data-height="1920"
              data-layout-iframe-id="inline-S3eVlLOU3bmsJERNzJa9"
              data-form-id="S3eVlLOU3bmsJERNzJa9"
              title="AI Visibility Audit Onboarding Form"
            >
            </iframe>
          </div>
        </div>
        
        {/* Email Warning Box */}
        <div className="max-w-4xl mx-auto mt-8 animate-fade-in">
          <EmailWarningBox />
        </div>
        
      </div>
      
      <Footer onOpenForm={openForm} />
    </div>
  );
};

export default Thanks;
