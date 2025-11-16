"use client";


import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ThankYouAnimation } from '@/components/ThankYouAnimation';
import { EmailWarningBox } from '@/components/EmailWarningBox';
import { useFormPopup } from '@/hooks/useFormPopup';

const ThankYou = () => {
  const { openForm } = useFormPopup();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-orange-50">
      <Header onOpenForm={openForm} />
      
      <div className="container mx-auto px-4 py-16">
        <ThankYouAnimation />
        
        {/* Email Warning Box */}
        <div className="max-w-4xl mx-auto mt-8">
          <EmailWarningBox />
        </div>
        
        {/* Additional content section */}
        <div className="max-w-4xl mx-auto mt-16 text-center">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">
              What Happens Next?
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <h4 className="font-semibold text-slate-700">Deep Analysis</h4>
                <p className="text-sm text-slate-600">
                  Our AI algorithms analyze your website's visibility across all major search platforms
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <h4 className="font-semibold text-slate-700">Expert Review</h4>
                <p className="text-sm text-slate-600">
                  Our LLM scientists review the findings and craft personalized recommendations
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
                <h4 className="font-semibold text-slate-700">Delivery</h4>
                <p className="text-sm text-slate-600">
                  Receive your comprehensive AI Visibility Report with actionable insights
                </p>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
              <p className="text-green-800 font-medium">
                📧 Check your email for confirmation and updates
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer onOpenForm={openForm} />
    </div>
  );
};

export default ThankYou;
