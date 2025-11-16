"use client";


import React from 'react';
import { Sparkles } from 'lucide-react';
import { User } from '@supabase/supabase-js';

interface WelcomeSectionProps {
  user: User;
}

const WelcomeSection = ({ user }: WelcomeSectionProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center space-x-3 mb-2">
        <Sparkles className="w-6 h-6 text-orange-500" />
        <h1 className="text-3xl font-bold text-slate-900">
          Welcome back, {user.user_metadata?.full_name || user.email?.split('@')[0]}!
        </h1>
      </div>
      <p className="text-slate-600">
        Access your audits, manage your packages, and explore AI visibility resources.
      </p>
    </div>
  );
};

export default WelcomeSection;
