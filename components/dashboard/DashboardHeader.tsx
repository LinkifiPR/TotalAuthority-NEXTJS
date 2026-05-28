"use client";


import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { User, LogOut } from 'lucide-react';
import { User as UserType } from '@supabase/supabase-js';

interface DashboardHeaderProps {
  user: UserType;
  onSignOut: () => void;
}

const DashboardHeader = ({ user, onSignOut }: DashboardHeaderProps) => {
  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <img
            src="/total-authority-logo.png"
            alt="TotalAuthority AI Visibility"
            className="h-10 w-auto sm:h-12 md:h-14"
          />
        </Link>
        
        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="hidden md:flex items-center space-x-2 text-sm text-slate-600">
            <User className="w-4 h-4" />
            <span className="truncate max-w-40">{user.email}</span>
          </div>
          <div className="flex md:hidden items-center">
            <User className="w-4 h-4 text-slate-600" />
          </div>
          <Button 
            variant="outline" 
            onClick={onSignOut}
            className="flex items-center space-x-1 md:space-x-2 text-xs md:text-sm px-2 md:px-4 py-1 md:py-2"
            size="sm"
          >
            <LogOut className="w-3 h-3 md:w-4 md:h-4" />
            <span className="hidden sm:inline">Sign Out</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
