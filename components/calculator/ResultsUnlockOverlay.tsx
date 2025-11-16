"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ResultsUnlockOverlayProps {
  onFormSubmitted: () => void;
}

export const ResultsUnlockOverlay = ({ onFormSubmitted }: ResultsUnlockOverlayProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    website: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log('Submitting to GHL:', formData);

      const { data, error } = await supabase.functions.invoke('submit-ghl-contact', {
        body: formData
      });

      if (error) {
        console.error('Edge function error:', error);
        toast.error('Submission failed. Please try again.');
        setIsLoading(false);
        return;
      }

      if (!data?.success) {
        console.error('GHL submission failed:', data);
        toast.error(data?.error || 'Submission failed. Please try again.');
        setIsLoading(false);
        return;
      }

      console.log('GHL submission successful:', data);
      toast.success('Success! Check your email for the access code.');
      onFormSubmitted();
    } catch (err) {
      console.error('Unexpected error:', err);
      toast.error('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl mx-4">
        {/* Decorative elements */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-orange-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="relative bg-gradient-to-br from-white via-orange-50/30 to-white dark:from-gray-900 dark:via-orange-950/20 dark:to-gray-900 rounded-2xl border-2 border-orange-300 dark:border-orange-700 shadow-2xl shadow-orange-500/20 overflow-hidden">
          {/* Orange accent bar at top */}
          <div className="h-2 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600"></div>
          
          <div className="p-8 sm:p-12">
            {/* Icon and Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl shadow-lg shadow-orange-500/30 mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-3">
                <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                  Unlock Your Results
                </span>
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                Enter your details to receive your full analysis and access code via email
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    First Name *
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                    className="h-12 border-2 border-orange-200 dark:border-orange-800 focus:border-orange-500 focus:ring-orange-500/20 bg-white dark:bg-gray-800"
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Last Name *
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                    className="h-12 border-2 border-orange-200 dark:border-orange-800 focus:border-orange-500 focus:ring-orange-500/20 bg-white dark:bg-gray-800"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  className="h-12 border-2 border-orange-200 dark:border-orange-800 focus:border-orange-500 focus:ring-orange-500/20 bg-white dark:bg-gray-800"
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Website URL *
                </Label>
                <Input
                  id="website"
                  name="website"
                  type="url"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="https://yourwebsite.com"
                  required
                  disabled={isLoading}
                  className="h-12 border-2 border-orange-200 dark:border-orange-800 focus:border-orange-500 focus:ring-orange-500/20 bg-white dark:bg-gray-800"
                />
              </div>

              <Button 
                type="submit"
                disabled={isLoading}
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-300 border-0"
              >
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                    <span>Submit & Unlock Results</span>
                  </div>
                )}
              </Button>

              <div className="pt-4 border-t border-orange-200 dark:border-orange-800">
                <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                  🔒 Your information is secure and will only be used to send you the access code and analysis
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
