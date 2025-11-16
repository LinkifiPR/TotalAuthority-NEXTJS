"use client";


import React from 'react';

export const SocialProof = () => {
  const logos = [{
    name: "Apify",
    url: "/lovable-uploads/bfc84afd-ba51-48c3-a273-591697c19716.png",
    height: "h-8"
  }, {
    name: "Holafly",
    url: "/lovable-uploads/b7b8f0a8-274a-4a13-ba2e-0a22ea86bb34.png",
    height: "h-10"
  }, {
    name: "OmniConvert",
    url: "/lovable-uploads/e8f6f5cd-4586-49be-991b-899806a4a40c.png",
    height: "h-8"
  }, {
    name: "Gammill Law",
    url: "/lovable-uploads/56d3baf3-0ba0-4e88-8de2-436ef47195b0.png",
    height: "h-10"
  }, {
    name: "Vera Clinic",
    url: "/lovable-uploads/87563e18-45b1-4231-9fe0-774a5a3fb19a.png",
    height: "h-10"
  }];

  // Triple the logos for ultra-smooth seamless scrolling
  const triplicatedLogos = [...logos, ...logos, ...logos];
  
  return (
    <section className="py-20 px-4 bg-slate-50 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-slate-900 mb-8">
            Trusted by...
          </h2>
          
          {/* Scrolling container */}
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll space-x-8 md:space-x-12 mb-16">
              {triplicatedLogos.map((logo, index) => (
                <div key={index} className="flex-shrink-0 flex items-center justify-center px-6 md:px-8 py-4 bg-white rounded-lg shadow-sm w-32 md:w-auto">
                  <img 
                    src={logo.url} 
                    alt={logo.name} 
                    className={`${logo.height} w-auto object-contain max-w-24 md:max-w-none`} 
                    loading="lazy" 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes scroll {
            0% {
              transform: translate3d(0, 0, 0);
            }
            100% {
              transform: translate3d(-33.333%, 0, 0);
            }
          }
          
          .animate-scroll {
            animation: scroll 45s linear infinite;
            transform: translate3d(0, 0, 0);
            will-change: transform;
          }
          
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `
      }} />
    </section>
  );
};
