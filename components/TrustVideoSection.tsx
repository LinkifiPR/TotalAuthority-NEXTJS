"use client";

import React from 'react';
import { Shield, Star, Award, CheckCircle, Trophy, Target } from 'lucide-react';
import { EnhancedVideoPlayer } from './EnhancedVideoPlayer';

interface TrustVideoSectionProps {
  onOpenScheduleCall?: () => void;
}

export const TrustVideoSection: React.FC<TrustVideoSectionProps> = ({ onOpenScheduleCall }) => {
  return (
    <section className="py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-secondary/10 rounded-full blur-lg animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-accent/5 rounded-full blur-2xl animate-pulse animation-delay-2000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20">
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 mb-8">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground text-center md:text-left">
              Why Should You
            </h2>
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary via-secondary to-accent rounded-lg blur opacity-75 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-primary to-secondary text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-bold text-3xl md:text-5xl shadow-xl transform hover:scale-105 transition-all duration-300">
                <Shield className="inline-block w-6 md:w-8 h-6 md:h-8 mr-2 animate-bounce" />
                TRUST
                <div className="absolute -top-1 md:-top-2 -right-1 md:-right-2">
                  <Star className="w-4 md:w-6 h-4 md:h-6 text-yellow-400 animate-spin" fill="currentColor" />
                </div>
              </div>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground text-center md:text-left">Us?</h2>
          </div>
          
          <div className="max-w-4xl mx-auto px-4">
            <p className="text-lg md:text-2xl text-foreground leading-relaxed mb-4 font-medium text-center">
              <span className="font-bold text-primary bg-primary/10 px-2 py-1 rounded">Chris Panteli</span>, our co-founder, is an internationally recognized speaker.
            </p>
            <p className="text-base md:text-xl text-foreground font-medium text-center">
              This is him speaking at <span className="font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 px-2 md:px-3 py-1 rounded-lg shadow-lg">SEO Estonia</span> on building authority through digital PR.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Enhanced video container with glow effect */}
          <div className="relative group">
            {/* Outer glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            {/* Main video frame */}
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200/50 backdrop-blur-sm transform hover:scale-[1.02] transition-all duration-500">
              
              {/* Video container with enhanced styling */}
              <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-8">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200/80">
                  <EnhancedVideoPlayer 
                    vimeoId="1121564015"
                    title="Chris Panteli - SEO Estonia Conference"
                  />
                </div>
              </div>

              {/* Enhanced info section */}
              <div className="bg-white p-8 border-t border-gray-100">
                <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between text-center md:text-left gap-6">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-4">
                      <Award className="w-6 h-6 text-primary" />
                        <h3 className="text-2xl font-bold text-gray-900 text-center md:text-left">
                          Building Authority Through Digital PR
                        </h3>
                    </div>
                        <p className="text-gray-800 text-lg leading-relaxed mb-4 font-medium text-center md:text-left">
                          Watch <span className="font-bold text-white bg-primary px-2 py-1 rounded">Chris Panteli</span> share cutting-edge insights on building digital authority at <span className="font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 px-2 py-1 rounded">SEO Estonia</span>, 
                          one of Europe's most prestigious search marketing conferences.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-base font-medium">
                          <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-lg border border-green-200">
                            <CheckCircle className="w-5 h-5 text-green-600" fill="currentColor" />
                            <span className="text-green-800 font-semibold">Internationally Recognized Speaker</span>
                          </div>
                          <div className="flex items-center space-x-2 bg-yellow-50 px-3 py-2 rounded-lg border border-yellow-200">
                            <Star className="w-5 h-5 text-yellow-600" fill="currentColor" />
                            <span className="text-yellow-800 font-semibold">Digital PR Expert</span>
                          </div>
                        </div>
                  </div>
                  
                  <div className="md:ml-8 mt-6 md:mt-0 w-full md:w-auto mx-auto md:mx-0">
                    <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-4 border border-primary/20">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary mb-1">500+</div>
                        <div className="text-xs text-gray-600 uppercase tracking-wide">Businesses Helped</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced trust indicators */}
          <div className="mt-16 flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8">
            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-4 md:p-6 rounded-2xl shadow-lg mb-3 group-hover:shadow-xl transition-shadow duration-300 border border-orange-300">
                <Shield className="w-10 md:w-12 h-10 md:h-12 text-white mx-auto" strokeWidth={2} />
              </div>
              <div className="text-base md:text-lg font-bold text-foreground">Trusted Expert</div>
            </div>
            <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-gray-400 to-transparent"></div>
            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 md:p-6 rounded-2xl shadow-lg mb-3 group-hover:shadow-xl transition-shadow duration-300 border border-blue-300">
                <Trophy className="w-10 md:w-12 h-10 md:h-12 text-white mx-auto" strokeWidth={2} />
              </div>
              <div className="text-base md:text-lg font-bold text-foreground">Industry Leader</div>
            </div>
            <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-gray-400 to-transparent"></div>
            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 md:p-6 rounded-2xl shadow-lg mb-3 group-hover:shadow-xl transition-shadow duration-300 border border-green-300">
                <Target className="w-10 md:w-12 h-10 md:h-12 text-white mx-auto" strokeWidth={2} />
              </div>
              <div className="text-base md:text-lg font-bold text-foreground">Proven Results</div>
            </div>
          </div>
          
          {/* AI Impact News Section */}
          <div className="mt-32">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-600 font-bold text-lg uppercase tracking-wider">Breaking News</span>
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </div>
              <h3 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                The <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent animate-pulse">AI Hype</span> is Real
              </h3>
              <p className="text-xl lg:text-2xl text-foreground/80 max-w-4xl mx-auto leading-relaxed">
                Understanding the change in search and how you can be discovered is one of the most 
                <span className="font-bold text-primary"> significant factors</span> determining your business success in 2024.
              </p>
            </div>

            {/* Enhanced News Articles Grid */}
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-3 gap-8 mb-8">
                <article className="group relative bg-gradient-to-br from-white to-gray-50/50 rounded-2xl shadow-2xl border-2 border-primary/20 overflow-hidden hover:border-primary/40 transition-all duration-500 hover:shadow-3xl hover:scale-[1.02] hover:-rotate-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <img 
                    src="/lovable-uploads/389badc7-1f14-44dc-8e85-469f50464cca.png" 
                    alt="Press Gazette - Google AI Overviews"
                    className="w-full h-auto relative z-10 transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </article>
                <article className="group relative bg-gradient-to-br from-white to-gray-50/50 rounded-2xl shadow-2xl border-2 border-secondary/20 overflow-hidden hover:border-secondary/40 transition-all duration-500 hover:shadow-3xl hover:scale-[1.02] hover:rotate-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <img 
                    src="/lovable-uploads/c6bfa99c-4268-4369-9ce2-50a754736d14.png" 
                    alt="Startups - AI search pushing brands out"
                    className="w-full h-auto relative z-10 transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </article>
                <article className="group relative bg-gradient-to-br from-white to-gray-50/50 rounded-2xl shadow-2xl border-2 border-accent/20 overflow-hidden hover:border-accent/40 transition-all duration-500 hover:shadow-3xl hover:scale-[1.02] hover:-rotate-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <img 
                    src="/lovable-uploads/d2638782-3923-4a94-bc23-6b0d382614f9.png" 
                    alt="BBC Future - Is Google destroying the web"
                    className="w-full h-auto relative z-10 transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </article>
              </div>
              <div className="grid grid-cols-3 gap-8">
                <article className="group relative bg-gradient-to-br from-white to-gray-50/50 rounded-2xl shadow-2xl border-2 border-accent/20 overflow-hidden hover:border-accent/40 transition-all duration-500 hover:shadow-3xl hover:scale-[1.02] hover:rotate-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <img 
                    src="/lovable-uploads/785ba351-c48f-458e-8ad6-3ec5a0ca1716.png" 
                    alt="Business Wire - Semrush AI Visibility Index"
                    className="w-full h-auto relative z-10 transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </article>
                <article className="group relative bg-gradient-to-br from-white to-gray-50/50 rounded-2xl shadow-2xl border-2 border-primary/20 overflow-hidden hover:border-primary/40 transition-all duration-500 hover:shadow-3xl hover:scale-[1.02] hover:-rotate-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <img 
                    src="/lovable-uploads/d6257f0e-9786-4840-86ab-95aaa10a8738.png" 
                    alt="BBC News - AI challenges Google dominance"
                    className="w-full h-auto relative z-10 transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </article>
                <article className="group relative bg-gradient-to-br from-white to-gray-50/50 rounded-2xl shadow-2xl border-2 border-secondary/20 overflow-hidden hover:border-secondary/40 transition-all duration-500 hover:shadow-3xl hover:scale-[1.02] hover:rotate-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <img 
                    src="/lovable-uploads/3ff5095e-02f5-4711-8cee-245cb237e7f8.png" 
                    alt="The Drum - Brand AI-ready"
                    className="w-full h-auto relative z-10 transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </article>
              </div>
            </div>
            <div className="text-center mt-20">
              <p className="text-2xl font-bold text-foreground mb-4">
                The writing is on the wall. AI is changing everything.
              </p>
              <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
                Major publications worldwide are reporting the same story: 
                <span className="font-bold text-red-600"> traditional search is dying</span>, 
                and businesses that don't adapt will be invisible.
              </p>
            </div>
          </div>
          
          {/* Schedule Call Section */}
          <div className="mt-32 text-center">
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-orange-50 via-white to-red-50 rounded-3xl p-12 border-2 border-orange-200 shadow-2xl backdrop-blur-sm relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-100/30 via-transparent to-red-100/30 opacity-50"></div>
              <div className="absolute top-4 right-4 w-32 h-32 bg-orange-200/20 rounded-full blur-2xl"></div>
              <div className="absolute bottom-4 left-4 w-24 h-24 bg-red-200/20 rounded-full blur-xl"></div>
              
              <div className="relative z-10">
                <div className="mb-8">
                  <h3 className="text-4xl font-bold text-gray-900 mb-4">
                    Want to talk to one of our team?
                  </h3>
                  <p className="text-xl text-gray-700 leading-relaxed">
                    Let's discuss your AI visibility strategy and how we can help you dominate search results.
                  </p>
                </div>
                
                <button 
                  onClick={onOpenScheduleCall}
                  className="group bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white px-12 py-5 rounded-full font-bold text-xl shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 border-2 border-orange-400 hover:border-orange-300 relative overflow-hidden"
                >
                  {/* Button background animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <span className="relative flex items-center gap-4">
                    <span>📞</span>
                    <span>Schedule a Call</span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                  </span>
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-red-500 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
                </button>
                
                <div className="mt-8 flex justify-center items-center space-x-8 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" fill="currentColor" />
                    <span>Free 30-min Strategy Call</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-blue-500" />
                    <span>No Obligation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                    <span>Expert AI Insights</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};