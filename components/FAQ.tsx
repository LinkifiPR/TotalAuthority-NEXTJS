"use client";


import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Is the audit really free?",
      answer: "Yes—no credit card and no calls. Just insights."
    },
    {
      question: "Will this affect my SEO?",
      answer: "The audit is read‑only; nothing on your site is changed."
    },
    {
      question: "How accurate are the results?",
      answer: "Every answer is double‑checked by a human analyst to prevent AI hallucinations."
    },
    {
      question: "What happens after the mini audit?",
      answer: "Implement the quick wins yourself—or request a deeper audit when you're ready."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-40 h-40 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-56 h-56 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-purple-500 rounded-full blur-2xl"></div>
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/20 to-blue-500/20 rounded-full border border-orange-400/30 backdrop-blur-sm mb-6">
            <HelpCircle className="w-4 h-4 text-orange-400" />
            <span className="text-slate-300 text-sm font-medium">Common questions</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
            FAQ
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Everything you need to know about our AI visibility audit
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden transition-all duration-300 hover:border-orange-400/30 hover:shadow-lg hover:shadow-orange-500/10"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left focus:outline-none focus:ring-2 focus:ring-orange-400/50 rounded-2xl transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white pr-8 leading-relaxed">
                    {faq.question}
                  </h3>
                  <div className={`flex-shrink-0 w-8 h-8 bg-gradient-to-br from-orange-500 to-blue-600 rounded-full flex items-center justify-center transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4 text-white" />
                  </div>
                </div>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-8 pb-6">
                  <div className="w-full h-px bg-gradient-to-r from-orange-400/20 to-blue-400/20 mb-4"></div>
                  <p className="text-slate-300 leading-relaxed text-lg">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom accent */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500/20 to-blue-500/20 rounded-full border border-orange-400/30 backdrop-blur-sm">
            <span className="text-slate-300 text-sm font-medium">Still have questions? We're here to help.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
