"use client";

import React from 'react';
import { Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';
import { TestimonialCard } from './TestimonialCard';
import { EmailTestimonial } from './EmailTestimonial';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    { platform: 'linkedin', icon: Linkedin, name: 'Sarah Chen', title: 'Chief Marketing Officer', content: 'Zero AI mentions to industry leader in 30 days. The roadmap was spot-on.', color: 'from-blue-600 to-blue-700' },
    { platform: 'twitter', icon: Twitter, name: 'Mike Rodriguez', title: 'Founder', content: 'Found 3 quick wins that got us into ChatGPT responses within weeks. Game changer!', color: 'from-slate-800 to-black' },
    { platform: 'instagram', icon: Instagram, name: 'Emma Wilson', title: 'Marketing Director', content: 'Our MiniScore went from 3 to 7. Now we are getting mentioned by Claude and Perplexity regularly.', color: 'from-pink-500 to-purple-600' },
    { platform: 'linkedin', icon: Linkedin, name: 'James Foster', title: 'VP Marketing', content: 'From invisible to top 3 mentions in our category. The roadmap strategy actually works.', color: 'from-blue-600 to-blue-700' },
    { platform: 'twitter', icon: Twitter, name: 'Alex Thompson', title: 'Growth Lead', content: 'Claimed 15 new AI answer cards after following their quick wins. Visibility skyrocketed.', color: 'from-slate-800 to-black' },
    { platform: 'instagram', icon: Instagram, name: 'Rachel Green', title: 'Marketing Manager', content: 'Got our first ChatGPT mention within 2 weeks of implementing their suggestions. Incredible!', color: 'from-pink-500 to-purple-600' },
    { platform: 'linkedin', icon: Linkedin, name: 'Maria Santos', title: 'Chief Marketing Officer', content: 'MiniScore improved by 4.5 points in one month. Our AI visibility is now industry-leading.', color: 'from-blue-600 to-blue-700' },
    { platform: 'twitter', icon: Twitter, name: 'David Park', title: 'CEO', content: 'The Mention Matrix revealed exactly why our competitors were winning. Fixed it in a month.', color: 'from-slate-800 to-black' },
    { platform: 'facebook', icon: Facebook, name: 'Lisa Chang', title: 'Director of Digital Marketing', content: 'Went from zero AI mentions to featured in 4 different models. The quick wins delivered fast results.', color: 'from-blue-600 to-blue-800' }
  ];

  return (
    <div className="relative" id="testimonials-section">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold text-slate-900 mb-4 bg-gradient-to-r from-slate-800 to-slate-700 bg-clip-text">
          What Our Clients Are Saying
        </h3>
        <p className="text-lg text-slate-600">Real results from real businesses across all social platforms</p>
      </div>
      
      {/* Featured Email Testimonial */}
      <EmailTestimonial />
      
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
  );
};
