"use client";

import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FullAuditThankYouAnimation } from '@/components/FullAuditThankYouAnimation';
import { EmailWarningBox } from '@/components/EmailWarningBox';
import { useFormPopup } from '@/hooks/useFormPopup';
import { CheckCircle, Clock, Star, TrendingUp, Brain, Target } from 'lucide-react';

const FullAuditThankYou = () => {
  const { openForm } = useFormPopup();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-blue-50">
      <Header onOpenForm={openForm} />
      
      <div className="container mx-auto px-4 py-16">
        <FullAuditThankYouAnimation />
        
        {/* Email Warning Box */}
        <div className="max-w-5xl mx-auto mt-8">
          <EmailWarningBox />
        </div>
        
        {/* Full Audit specific content */}
        <div className="max-w-5xl mx-auto mt-16 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/30">
            <div className="mb-8">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-500/10 to-purple-500/10 border border-orange-500/20 rounded-full mb-6 backdrop-blur-sm">
                <Star className="w-5 h-5 text-orange-600" />
                <span className="text-lg font-bold bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent">
                  🎉 Full LLM Visibility Audit Purchased!
                </span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
                Your LLM Visibility Audit is Confirmed
              </h2>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
                You've just secured your complete teardown of how you appear across AI-powered tools — and a clear plan to dominate them.
              </p>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8">
              What Your Audit Will Uncover
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-slate-700">Real LLM Testing</h4>
                <p className="text-slate-600 leading-relaxed">
                  We run dozens of real prompts across ChatGPT, Claude, Gemini, and Perplexity to see how you show up when buyers ask AI for recommendations
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-slate-700">Discovery Journey Analysis</h4>
                <p className="text-slate-600 leading-relaxed">
                  We analyze the entire discovery journey — from first pain point to final vendor choice — to surface the exact prompts your prospects are asking
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-slate-700">Authority Assessment</h4>
                <p className="text-slate-600 leading-relaxed">
                  We check your entity status, knowledge panel, structured data, and digital authority to see if LLMs recognize you as credible and trustworthy
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-slate-700">Source Mapping</h4>
                <p className="text-slate-600 leading-relaxed">
                  We map the real sources shaping recommendations and show you exactly where competitors appear but you don't — so you can close the gap
                </p>
              </div>
            </div>

            {/* What You'll Walk Away With Section */}
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-6 md:p-8 mb-8">
              <h4 className="text-xl font-bold text-slate-800 mb-6">What You'll Walk Away With:</h4>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Full breakdown of how your brand appears across ChatGPT, Claude, Gemini, and Perplexity</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Clear understanding of the exact research your prospects are doing in LLMs</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">The exact sources the LLMs are citing, so you can target the domains that shape recommendations</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">The exact content types you should be creating to earn those citations</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">A prioritized action plan covering both quick wins and long-term plays</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">A prompt pack so you can track visibility and changes over time</span>
                </div>
                <div className="flex items-start gap-3 md:col-span-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Everything delivered in a polished PDF report with screenshots, scores, and source links</span>
                </div>
              </div>
            </div>

            {/* Action Plan Preview */}
            <div className="bg-gradient-to-r from-orange-50 to-purple-50 rounded-2xl p-6 md:p-8 mb-8">
              <h4 className="text-xl font-bold text-slate-800 mb-6">Your Personalized Action Plan Structure:</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h5 className="font-semibold text-orange-700 text-lg">Quick Wins (30 Days)</h5>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      Schema and boilerplate fixes
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      Review profile claims
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      Easy citation upgrades
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h5 className="font-semibold text-purple-700 text-lg">Long-Term Plays (90–180 Days)</h5>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500 mt-1">•</span>
                      PR and content placement strategy
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500 mt-1">•</span>
                      Entity creation and profile optimization
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500 mt-1">•</span>
                      Listicle outreach and AI-friendly content positioning
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-green-800 font-semibold text-lg">Payment Confirmed - $499</span>
                </div>
                <p className="text-green-800">
                  📧 Check your email for confirmation and next steps
                </p>
              </div>

              <div className="p-6 bg-gradient-to-r from-orange-50 to-purple-50 rounded-2xl border border-orange-200">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Star className="w-6 h-6 text-orange-600" />
                  <span className="text-orange-800 font-semibold text-lg">What Happens Next</span>
                </div>
                <p className="text-orange-800">
                  We'll begin your audit and deliver your comprehensive PDF report with all findings, scores, and your personalized action plan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer onOpenForm={openForm} />
    </div>
  );
};

export default FullAuditThankYou;