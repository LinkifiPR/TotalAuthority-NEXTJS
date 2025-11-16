"use client";


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export const NewsletterSignup = () => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName || !email) {
      toast({
        title: "Missing Information",
        description: "Please fill in both your name and email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate newsletter signup
    setTimeout(() => {
      setIsLoading(false);
      setFirstName('');
      setEmail('');
      toast({
        title: "Success!",
        description: "You've been added to our newsletter. Check your inbox for a welcome email.",
      });
    }, 1000);
  };

  return (
    <section className="py-20 px-4 bg-slate-900">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          Get Smarter at LLM SEO in 5 Minutes a Week
        </h2>
        <p className="text-xl text-slate-300 mb-8">
          Join 2,300+ marketers on the LLM visibility edge.
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
          <Input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="bg-white border-0 text-slate-900 placeholder-slate-500"
          />
          <Input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white border-0 text-slate-900 placeholder-slate-500"
          />
          <Button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3"
          >
            {isLoading ? 'Subscribing...' : 'Subscribe Now'}
          </Button>
        </form>
        
        <p className="text-sm text-slate-400 mt-4">
          No spam, just weekly insights on AI visibility and LLM optimization.
        </p>
      </div>
    </section>
  );
};
