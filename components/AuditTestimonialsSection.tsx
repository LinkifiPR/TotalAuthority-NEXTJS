"use client";

import React from 'react';
import { Linkedin, Twitter, Instagram } from 'lucide-react';
import { TestimonialCard } from './TestimonialCard';

export const AuditTestimonialsSection: React.FC = () => {
  const testimonials = [
    { platform: 'linkedin', icon: Linkedin, name: 'Sarah Chen', title: 'Chief Marketing Officer', content: 'Zero AI mentions to industry leader in 30 days. The roadmap was spot-on.', color: 'from-blue-600 to-blue-700' },
    { platform: 'twitter', icon: Twitter, name: 'Mike Rodriguez', title: 'Founder', content: 'Found 3 quick wins that got us into ChatGPT responses within weeks. Game changer!', color: 'from-slate-800 to-black' },
    { platform: 'instagram', icon: Instagram, name: 'Emma Wilson', title: 'Marketing Director', content: 'Our MiniScore went from 3 to 7. Now we are getting mentioned by Claude and Perplexity regularly.', color: 'from-pink-500 to-purple-600' },
    { platform: 'linkedin', icon: Linkedin, name: 'James Foster', title: 'VP Marketing', content: 'From invisible to top 3 mentions in our category. The roadmap strategy actually works.', color: 'from-blue-600 to-blue-700' },
    { platform: 'twitter', icon: Twitter, name: 'Alex Thompson', title: 'Growth Lead', content: 'Claimed 15 new AI answer cards after following their quick wins. Visibility skyrocketed.', color: 'from-slate-800 to-black' },
    { platform: 'instagram', icon: Instagram, name: 'Rachel Green', title: 'Marketing Manager', content: 'Got our first ChatGPT mention within 2 weeks of implementing their suggestions. Incredible!', color: 'from-pink-500 to-purple-600' },
  ];

  return (
    <section className="py-20 px-8 md:px-16 lg:px-24 bg-gradient-to-b from-white via-orange-50/20 to-white relative">
      {/* Top Left Quotation Mark */}
      <div className="absolute top-8 left-4 md:left-12 text-orange-500 opacity-20 select-none pointer-events-none">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="currentColor">
          <path d="M0 60C0 40 10 25 30 15L40 25C30 30 25 40 25 50C25 58 30 65 40 65C50 65 55 58 55 50C55 38 45 30 30 30C13 30 0 43 0 60ZM65 60C65 40 75 25 95 15L105 25C95 30 90 40 90 50C90 58 95 65 105 65C115 65 120 58 120 50C120 38 110 30 95 30C78 30 65 43 65 60Z"/>
        </svg>
      </div>

      {/* Bottom Right Quotation Mark */}
      <div className="absolute bottom-8 right-4 md:right-12 text-orange-500 opacity-20 select-none pointer-events-none rotate-180">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="currentColor">
          <path d="M0 60C0 40 10 25 30 15L40 25C30 30 25 40 25 50C25 58 30 65 40 65C50 65 55 58 55 50C55 38 45 30 30 30C13 30 0 43 0 60ZM65 60C65 40 75 25 95 15L105 25C95 30 90 40 90 50C90 58 95 65 105 65C115 65 120 58 120 50C120 38 110 30 95 30C78 30 65 43 65 60Z"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              platform={testimonial.platform}
              icon={testimonial.icon}
              name={testimonial.name}
              title={testimonial.title}
              content={testimonial.content}
              color={testimonial.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
