"use client";


import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export const OfferLadder = () => {
  const offers = [
    {
      name: "Visibility Scorecard",
      description: "PDF + video, 24h delivery",
      price: "$27",
      features: ["5-minute audit", "Video walkthrough", "Quick wins list"],
      popular: false
    },
    {
      name: "Full Audit",
      description: "8-page teardown + debrief call",
      price: "$149",
      features: ["Complete AI visibility analysis", "30-min strategy call", "Competitor comparison"],
      popular: true
    },
    {
      name: "Visibility Blueprint",
      description: "Full 90-day plan",
      price: "$1,500+",
      features: ["Complete implementation roadmap", "Content optimization plan", "Monthly check-ins"],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Start Small, Scale Smart</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Start with a Scorecard, upgrade to a Full Audit, then execute with a Blueprint.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-200 ${
                offer.popular ? 'ring-2 ring-orange-500 relative' : ''
              }`}
            >
              {offer.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{offer.name}</h3>
                <p className="text-slate-600 mb-4">{offer.description}</p>
                <div className="text-4xl font-bold text-orange-500">{offer.price}</div>
              </div>
              
              <ul className="space-y-3 mb-8">
                {offer.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full py-3 font-semibold ${
                  offer.popular 
                    ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                    : 'bg-white border-2 border-orange-500 text-orange-500 hover:bg-orange-50'
                }`}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-orange-500 text-orange-500 hover:bg-orange-50">
            See What's Inside Each Package
          </Button>
        </div>
      </div>
    </section>
  );
};
