"use client";


import React from 'react';

export const AuditToolPreview = () => {
  return (
    <section id="audit" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">See Your Visibility in Action</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Get instant insights into how AI sees your brand
          </p>
        </div>
        
        <div className="bg-slate-100 rounded-2xl p-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-slate-800 p-4 flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-white text-sm font-mono">TotalAuthority Visibility Scorecard</span>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="font-semibold text-red-700 mb-2">❌ ChatGPT doesn't mention you? Here's why.</h4>
                <p className="text-sm text-slate-600">Your brand appears in 0/10 AI-generated responses for industry queries</p>
                <div className="mt-2 bg-red-50 rounded p-2 text-xs text-red-600">
                  Visibility Score: 2/100
                </div>
              </div>
              
              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-semibold text-orange-700 mb-2">⚠️ Competitor beats you in Perplexity? We show the gaps.</h4>
                <p className="text-sm text-slate-600">Competitor X appears 8x more frequently in AI recommendations</p>
                <div className="mt-2 bg-orange-50 rounded p-2 text-xs text-orange-600">
                  Gap Analysis: 73% behind market leader
                </div>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-blue-700 mb-2">📈 Quick Win Opportunities</h4>
                <p className="text-sm text-slate-600">3 immediate actions to boost your AI visibility by 40%</p>
                <div className="mt-2 bg-blue-50 rounded p-2 text-xs text-blue-600">
                  Estimated impact: +40% visibility in 30 days
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-slate-600 mb-4">This is just a preview. Your actual scorecard includes:</p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-orange-50 rounded-lg p-3">
                <div className="font-medium text-orange-900">Platform Analysis</div>
                <div className="text-orange-700">ChatGPT, Claude, Perplexity, Gemini</div>
              </div>
              <div className="bg-orange-50 rounded-lg p-3">
                <div className="font-medium text-orange-900">Competitor Benchmarks</div>
                <div className="text-orange-700">Top 5 industry leaders</div>
              </div>
              <div className="bg-orange-50 rounded-lg p-3">
                <div className="font-medium text-orange-900">Action Items</div>
                <div className="text-orange-700">Prioritized improvement plan</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
