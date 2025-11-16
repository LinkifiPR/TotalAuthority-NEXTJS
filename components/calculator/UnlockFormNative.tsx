"use client";

import { useState } from 'react';
import { Lock, Sparkles, Mail, User, Building2, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface UnlockFormNativeProps {
  onFormSubmitted: () => void;
}

export const UnlockFormNative = ({ onFormSubmitted }: UnlockFormNativeProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    jobTitle: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.firstName) {
      toast.error('Please fill in at least your name and email');
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit to GHL form in the background
      const ghlFormUrl = 'https://go.totalauthority.com/widget/form/9ZDd7uV9J9gOgohudtNc';
      
      // Create a hidden iframe to submit to GHL without blocking the UI
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      
      const formElement = iframe.contentDocument?.createElement('form');
      if (formElement) {
        formElement.method = 'POST';
        formElement.action = ghlFormUrl;
        
        // Map our fields to GHL's expected field names
        const fields = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          company: formData.company,
          job_title: formData.jobTitle,
        };
        
        Object.entries(fields).forEach(([key, value]) => {
          if (value) {
            const input = iframe.contentDocument!.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = value;
            formElement.appendChild(input);
          }
        });
        
        iframe.contentDocument?.body.appendChild(formElement);
        formElement.submit();
      }
      
      // Clean up iframe after a delay
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 3000);

      // Immediately show the success dialog
      setTimeout(() => {
        setIsSubmitting(false);
        onFormSubmitted();
      }, 800);
      
    } catch (error) {
      console.error('Form submission error:', error);
      setIsSubmitting(false);
      // Even if GHL submission fails, still show the dialog
      onFormSubmitted();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in" role="dialog" aria-modal="true">
      {/* Backdrop with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-orange-600/15 to-purple-600/20 backdrop-blur-md z-0" />
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-orange-500/30 rounded-full blur-3xl animate-pulse z-0" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-600/25 rounded-full blur-3xl animate-pulse delay-1000 z-0" />
      
      {/* Main card */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border-2 border-orange-200 dark:border-orange-900/50 animate-scale-in z-10">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-orange-50 via-orange-100 to-orange-50 dark:from-orange-950 dark:via-orange-900 dark:to-orange-950 p-8 border-b-2 border-orange-200 dark:border-orange-800">
          <div className="flex items-center gap-4 mb-3">
            <div className="p-3 bg-orange-500 rounded-xl shadow-lg">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Unlock Your Results
            </h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 flex items-center gap-2 text-lg">
            <Sparkles className="w-5 h-5 text-orange-500" />
            Fill out the form below to receive your access code via email
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 bg-gradient-to-b from-white to-orange-50/30 dark:from-gray-900 dark:to-orange-950/20">
          <div className="space-y-6">
            {/* First Name */}
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-base font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <User className="w-4 h-4 text-orange-500" />
                First Name *
              </Label>
              <Input
                id="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="h-12 text-base border-2 border-orange-200 dark:border-orange-800 focus:border-orange-500 dark:focus:border-orange-500"
                placeholder="Enter your first name"
              />
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-base font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <User className="w-4 h-4 text-orange-500" />
                Last Name
              </Label>
              <Input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="h-12 text-base border-2 border-orange-200 dark:border-orange-800 focus:border-orange-500 dark:focus:border-orange-500"
                placeholder="Enter your last name"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-500" />
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-12 text-base border-2 border-orange-200 dark:border-orange-800 focus:border-orange-500 dark:focus:border-orange-500"
                placeholder="your.email@company.com"
              />
            </div>

            {/* Company */}
            <div className="space-y-2">
              <Label htmlFor="company" className="text-base font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-orange-500" />
                Company
              </Label>
              <Input
                id="company"
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="h-12 text-base border-2 border-orange-200 dark:border-orange-800 focus:border-orange-500 dark:focus:border-orange-500"
                placeholder="Your company name"
              />
            </div>

            {/* Job Title */}
            <div className="space-y-2">
              <Label htmlFor="jobTitle" className="text-base font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-orange-500" />
                Job Title
              </Label>
              <Input
                id="jobTitle"
                type="text"
                value={formData.jobTitle}
                onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                className="h-12 text-base border-2 border-orange-200 dark:border-orange-800 focus:border-orange-500 dark:focus:border-orange-500"
                placeholder="Your role"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 text-lg font-bold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                  Submitting...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Get My Access Code
                </>
              )}
            </Button>

            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
              * Required fields. Your information is secure and will never be shared.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
