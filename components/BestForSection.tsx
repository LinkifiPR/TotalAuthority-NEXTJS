"use client";

import React from 'react';
import { Home, Wrench, Briefcase } from 'lucide-react';
import { Button } from './ui/button';

interface BestForSectionProps {
  onOpenForm?: () => void;
}

export const BestForSection: React.FC<BestForSectionProps> = ({ onOpenForm }) => {
  return (
    <section className="py-20 px-8 md:px-16 lg:px-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Best For: <span className="text-orange-500">Local Businesses</span>
          </h2>
          <p className="text-lg text-slate-700 max-w-2xl">
            We designed this audit for any business that relies on local discovery to find new customers and clients. 
            If you compete in a specific city or region, <span className="font-semibold">you need to know what AI is saying about you.</span>
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Real Estate Card */}
          <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="w-12 h-12 mb-6">
              <Home className="w-12 h-12 text-slate-800" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">Real Estate Professionals</h3>
            <p className="text-slate-700">
              Perfect for brokerages, teams, listing/buyer agents, and boutique firms looking to be seen as the market leaders.
            </p>
          </div>

          {/* Local Service Companies Card */}
          <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="w-12 h-12 mb-6">
              <Wrench className="w-12 h-12 text-slate-800" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">Local Service Companies</h3>
            <p className="text-slate-700">
              For roofers, HVAC techs, plumbers, solar installers, pest control experts, cleaners, landscapers, and other home service professionals.
            </p>
          </div>

          {/* Professional Firms Card */}
          <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="w-12 h-12 mb-6">
              <Briefcase className="w-12 h-12 text-slate-800" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">Professional Firms</h3>
            <p className="text-slate-700">
              Ideal for law firms, accountants, dentists, med-aesthetic clinics, and other local specialists who need to maintain a trusted reputation.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={() => window.location.href = 'https://app.totalauthority.com/ai-visibility-audit'}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Start Your Audit Now
          </Button>
        </div>
      </div>
    </section>
  );
};
