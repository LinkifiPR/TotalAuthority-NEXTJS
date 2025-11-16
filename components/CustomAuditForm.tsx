"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { CustomAuditFormProps } from '@/types/form';

export const CustomAuditForm: React.FC<CustomAuditFormProps> = ({ onSuccess }) => {
  const [showThankYou, setShowThankYou] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Load the GHL form embed script
    const script = document.createElement('script');
    script.src = 'https://go.totalauthority.com/js/form_embed.js';
    script.async = true;
    document.head.appendChild(script);

    // Listen for form submission success
    const handleMessage = (event: MessageEvent) => {
      // Check if the message is from the GHL form
      if (event.origin === 'https://go.totalauthority.com' && event.data?.type === 'form_submitted') {
        console.log('Form submitted successfully via GHL iframe');
        // Redirect to thank you page instead of showing animation
        router.push('/thankyou');
        onSuccess?.();
      }
    };

    // Also listen for iframe load events and form submission indicators
    const checkForSubmission = () => {
      const iframe = document.getElementById('inline-rkqBkqXjnr1GDqyDGaDL') as HTMLIFrameElement;
      if (iframe) {
        try {
          // Try to detect if form was submitted by checking iframe content changes
          // This is a fallback method since GHL might not send the message event
          iframe.addEventListener('load', () => {
            setTimeout(() => {
              // Check if URL changed indicating submission
              if (iframe.contentWindow) {
                try {
                  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                  if (iframeDoc && iframeDoc.body.innerHTML.includes('thank')) {
                    router.push('/thankyou');
                    onSuccess?.();
                  }
                } catch (e) {
                  // Cross-origin restrictions, fall back to timeout detection
                  console.log('Cross-origin restrictions, using alternative detection');
                }
              }
            }, 1000);
          });
        } catch (e) {
          console.log('Could not set up iframe load listener');
        }
      }
    };

    window.addEventListener('message', handleMessage);
    
    // Set up iframe monitoring after a short delay
    setTimeout(checkForSubmission, 1000);

    return () => {
      window.removeEventListener('message', handleMessage);
      // Clean up script if needed
      const existingScript = document.querySelector('script[src="https://go.totalauthority.com/js/form_embed.js"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [router, onSuccess]);

  return (
    <div className="max-w-lg mx-auto">
      {/* Custom header to match our branding */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Get Your Free AI Visibility Audit</h3>
        <p className="text-slate-600">Fill out the form below and we'll analyze your website's AI visibility within 24 hours.</p>
      </div>

      {/* GHL Embedded Form wrapped in our styled container */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <iframe
          src="https://go.totalauthority.com/widget/form/rkqBkqXjnr1GDqyDGaDL"
          style={{
            width: '100%',
            height: '639px',
            border: 'none',
            borderRadius: '8px'
          }}
          id="inline-rkqBkqXjnr1GDqyDGaDL"
          data-layout="{'id':'INLINE'}"
          data-trigger-type="alwaysShow"
          data-trigger-value=""
          data-activation-type="alwaysActivated"
          data-activation-value=""
          data-deactivation-type="neverDeactivate"
          data-deactivation-value=""
          data-form-name="AI Visibility Audit"
          data-height="639"
          data-layout-iframe-id="inline-rkqBkqXjnr1GDqyDGaDL"
          data-form-id="rkqBkqXjnr1GDqyDGaDL"
          title="AI Visibility Audit"
        />
      </div>

      {/* Trust elements to match our original design */}
      <div className="text-center space-y-2 mt-4">
        <p className="text-xs text-gray-500">
          🔒 Your information is secure and will never be shared
        </p>
        <p className="text-xs text-gray-500">
          ⚡ Get your results within 24 hours
        </p>
      </div>
    </div>
  );
};
