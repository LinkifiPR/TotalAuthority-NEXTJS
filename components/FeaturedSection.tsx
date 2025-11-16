"use client";

import React from 'react';
import MonochromeLogo from './MonochromeLogo';

const FeaturedSection = () => {
  const mediaLogos = [
    {
      name: 'Link Building Mastery',
      src: '/lovable-uploads/6f7e1d22-43c1-41ec-bf8e-3456e529ef50.png',
      alt: 'Link Building Mastery logo',
      removeBg: false,
    },
    {
      name: 'CMSWire',
      src: '/lovable-uploads/b106b599-d413-4fd2-aaec-597d49c0a043.png',
      alt: 'CMSWire logo',
      removeBg: false,
    },
    {
      name: 'BuzzStream',
      src: '/lovable-uploads/5b0237c8-edf2-4e8d-8261-ee493ba5d214.png',
      alt: 'BuzzStream logo',
      removeBg: true, // key out white
    },
    {
      name: 'The New York Times',
      src: '/lovable-uploads/33e2dca2-51b9-4f9b-9992-91bf2b695ddb.png',
      alt: 'The New York Times logo',
      removeBg: true,
    },
    {
      name: 'Business Insider',
      src: '/lovable-uploads/096af39c-a9c6-4705-83ae-21dcbc3cf363.png',
      alt: 'Business Insider logo',
      removeBg: false,
    },
  ];

  return (
    <section className="py-14 md:py-16 bg-gradient-to-br from-slate-50 via-orange-50/30 to-blue-50/30">
      <div className="max-w-6xl mx-auto px-4">
        {/* Handwriting style title */}
        <div className="text-center mb-8 md:mb-10 animate-fade-in">
          <h2
            className="text-3xl md:text-4xl text-slate-700"
            style={{
              fontFamily: '"Caveat", "Kalam", "Dancing Script", cursive',
              fontWeight: 600,
              transform: 'rotate(-1deg)',
              letterSpacing: '0.5px',
            }}
          >
            Where we've been featured
          </h2>
        </div>

        {/* Logos row */}
        <div className="flex items-center justify-center gap-x-6 md:gap-x-10 overflow-x-auto pb-2">
          {mediaLogos.map((logo) => (
            <div
              key={logo.name}
              className="hover-scale animate-fade-in"
              aria-label={logo.name}
            >
              <div className="h-10 md:h-12 flex items-center">
                <MonochromeLogo
                  src={logo.src}
                  alt={logo.alt}
                  removeWhiteBackground={logo.removeBg}
                  className="h-10 md:h-12 w-auto object-contain opacity-80"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
