"use client";


import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BOOKING_URL } from '@/config/links';
import { ArrowRight, CheckCircle, Star, Zap } from 'lucide-react';

export const PaidAuditCTA: React.FC = () => {
  return (
    <Card className="animate-fade-in hover:shadow-xl transition-all duration-500 border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-indigo-100/20 animate-pulse"></div>
      <CardContent className="p-6 sm:p-8 relative z-10">
        <div className="text-center space-y-6">
          {/* Header */}
          <div className="space-y-3">
            <div className="flex items-center justify-center space-x-2">
              <Star className="w-6 h-6 text-yellow-500 fill-current" />
              <span className="text-blue-800 font-semibold text-sm bg-blue-100 px-3 py-1 rounded-full">
                Premium Service
              </span>
              <Star className="w-6 h-6 text-yellow-500 fill-current" />
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Ready for a Complete AI Visibility Audit?
            </h3>
            
            <p className="text-gray-700 text-lg leading-relaxed max-w-2xl mx-auto">
              Get a comprehensive, personalized audit with actionable insights, 
              competitive analysis, and a custom roadmap to dominate AI search results.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
            <div className="flex items-start space-x-3 p-4 bg-white/50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <div className="text-left">
                <h4 className="font-semibold text-gray-900">Deep Analysis</h4>
                <p className="text-sm text-gray-600">Complete AI knowledge audit across all major platforms</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 bg-white/50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <div className="text-left">
                <h4 className="font-semibold text-gray-900">Custom Strategy</h4>
                <p className="text-sm text-gray-600">Tailored action plan with priority recommendations</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 bg-white/50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <div className="text-left">
                <h4 className="font-semibold text-gray-900">Expert Review</h4>
                <p className="text-sm text-gray-600">Personal consultation with AI visibility specialists</p>
              </div>
            </div>
          </div>

          {/* Pricing and CTA */}
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-4">
              <span className="text-3xl font-bold text-gray-900">$497</span>
              <span className="text-lg text-gray-500 line-through">$997</span>
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                50% OFF
              </span>
            </div>
            
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => window.open(BOOKING_URL, '_blank')}
            >
              <Zap className="w-5 h-5 mr-2" />
              <span>Book Your Full Audit Now</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <p className="text-sm text-gray-600">
              🔒 30-day money-back guarantee • ⚡ Results in 7 days • 🎯 Limited spots available
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
