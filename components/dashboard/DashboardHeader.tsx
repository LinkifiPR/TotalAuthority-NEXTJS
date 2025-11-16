"use client";


import React from 'react';
import { Link } from 'react-router-dom';
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
        <Link to="/" className="flex items-center space-x-2 md:space-x-3">
          <div className="relative w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-orange-200 opacity-30"></div>
            <div className="absolute inset-1 rounded-full border border-orange-300 opacity-50"></div>
            <div className="relative w-5 h-5 md:w-6 md:h-6 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
              <div className="absolute top-1 md:top-1.5 left-0.5 md:left-1 w-0.5 md:w-1 h-0.5 md:h-1 bg-white rounded-full"></div>
              <div className="absolute top-1 md:top-1.5 right-0.5 md:right-1 w-0.5 md:w-1 h-0.5 md:h-1 bg-white rounded-full"></div>
              <div className="absolute bottom-1 md:bottom-1.5 left-1/2 transform -translate-x-1/2 w-1 md:w-1.5 h-0.5 bg-white rounded-full"></div>
              <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-0.5 h-0.5 bg-orange-400 rounded-full"></div>
            </div>
            <div className="absolute top-0.5 right-0.5 w-0.5 md:w-1 h-0.5 md:h-1 bg-blue-500 rounded-full"></div>
            <div className="absolute bottom-0.5 left-0.5 w-0.5 h-0.5 bg-purple-500 rounded-full"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-black text-slate-900 tracking-tight leading-none">
              Total<span className="text-orange-500">Authority</span>
            </span>
            <span className="text-xs text-slate-500 font-medium tracking-wider uppercase leading-none mt-0.5 hidden sm:block">
              AI Visibility
            </span>
          </div>
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
