"use client";

import React from 'react';
import { Check, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

export const ComparisonTableSection: React.FC = () => {
  const isMobile = useIsMobile();
  const features = [
    {
      name: 'Real-time AI recommendation testing',
      diy: false,
      seo: false,
      expert: true,
    },
    {
      name: 'Research across multiple AI platforms',
      diy: false,
      seo: false,
      expert: true,
    },
    {
      name: 'Analyst benchmarks vs. competitors',
      diy: false,
      seo: false,
      expert: true,
    },
    {
      name: 'Human-identified citation sources',
      diy: false,
      seo: false,
      expert: true,
    },
    {
      name: 'Analyst-crafted strategic action plan',
      diy: false,
      seo: false,
      expert: true,
    },
    {
      name: 'Standardized testing methodology',
      diy: false,
      seo: 'partial',
      expert: true,
    },
    {
      name: 'Tracks traditional search rankings',
      diy: false,
      seo: true,
      expert: true,
    },
  ];

  if (isMobile) {
    return (
      <section className="py-12 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              DIY Tools vs{' '}
              <span className="relative inline-block text-orange-500">
                Expert Audit
                <svg className="absolute -bottom-1 left-0 w-full h-2" viewBox="0 0 400 15" preserveAspectRatio="none">
                  <path d="M5,10 Q50,3 95,8 Q140,13 185,7 Q230,4 275,9 Q320,12 365,8" 
                        stroke="#F97316" 
                        strokeWidth="4" 
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"/>
                </svg>
              </span>
            </h2>
          </div>

          {/* Mobile Card Layout */}
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg border border-slate-200 p-4">
                <h3 className="font-semibold text-slate-900 mb-3 text-sm">{feature.name}</h3>
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center">
                    <div className="text-xs text-slate-600 mb-1 font-medium">DIY</div>
                    {feature.diy ? (
                      <Check className="w-5 h-5 text-green-600 mx-auto" strokeWidth={3} />
                    ) : (
                      <X className="w-5 h-5 text-slate-400 mx-auto" strokeWidth={2} />
                    )}
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-slate-600 mb-1 font-medium">SEO</div>
                    {feature.seo === 'partial' ? (
                      <span className="text-xs text-slate-700 font-medium">Partial</span>
                    ) : feature.seo ? (
                      <Check className="w-5 h-5 text-green-600 mx-auto" strokeWidth={3} />
                    ) : (
                      <X className="w-5 h-5 text-slate-400 mx-auto" strokeWidth={2} />
                    )}
                  </div>
                  <div className="text-center bg-orange-500 rounded-lg py-2 -m-1">
                    <div className="text-xs text-white mb-1 font-medium">Us</div>
                    {feature.expert ? (
                      <Check className="w-5 h-5 text-white mx-auto" strokeWidth={3} />
                    ) : (
                      <X className="w-5 h-5 text-orange-200 mx-auto" strokeWidth={2} />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-8 md:px-16 lg:px-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
            DIY Tools vs{' '}
            <span className="relative inline-block text-orange-500">
              Expert Analyst Audit
              <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 400 15" preserveAspectRatio="none">
                <path d="M5,10 Q50,3 95,8 Q140,13 185,7 Q230,4 275,9 Q320,12 365,8" 
                      stroke="#F97316" 
                      strokeWidth="4" 
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"/>
              </svg>
            </span>
          </h2>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-8 py-6 text-left text-slate-900 font-semibold text-lg w-2/5"></th>
                  <th className="px-8 py-6 text-center text-slate-900 font-semibold text-lg border-l border-slate-200">
                    DIY Testing
                  </th>
                  <th className="px-8 py-6 text-center text-slate-900 font-semibold text-lg border-l border-slate-200">
                    SEO Tools
                  </th>
                  <th className="px-8 py-6 text-center text-white font-semibold text-lg bg-orange-500 border-l border-orange-600">
                    TotalAuthority
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr key={index} className="border-b border-slate-100 last:border-b-0">
                    <td className="px-8 py-6 text-slate-900 font-medium">
                      {feature.name}
                    </td>
                    <td className="px-8 py-6 text-center border-l border-slate-100">
                      {feature.diy ? (
                        <Check className="w-6 h-6 text-green-600 mx-auto" strokeWidth={3} />
                      ) : (
                        <X className="w-6 h-6 text-slate-400 mx-auto" strokeWidth={2} />
                      )}
                    </td>
                    <td className="px-8 py-6 text-center border-l border-slate-100">
                      {feature.seo === 'partial' ? (
                        <span className="text-slate-700 font-medium">Partial</span>
                      ) : feature.seo ? (
                        <Check className="w-6 h-6 text-green-600 mx-auto" strokeWidth={3} />
                      ) : (
                        <X className="w-6 h-6 text-slate-400 mx-auto" strokeWidth={2} />
                      )}
                    </td>
                    <td className="px-8 py-6 text-center bg-orange-500 border-l border-orange-600">
                      {feature.expert ? (
                        <Check className="w-6 h-6 text-white mx-auto" strokeWidth={3} />
                      ) : (
                        <X className="w-6 h-6 text-orange-200 mx-auto" strokeWidth={2} />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
