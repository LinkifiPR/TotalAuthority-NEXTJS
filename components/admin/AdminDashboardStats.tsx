"use client";


import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, Users, FileText, RefreshCw } from 'lucide-react';

interface DashboardStats {
  completedAudits: number;
  pendingAudits: number;
  paidAudits: number;
  totalUsers: number;
  publishedPosts: number;
  draftPosts: number;
}

interface AdminDashboardStatsProps {
  stats: DashboardStats;
  loading: boolean;
  onRefresh: () => void;
}

export const AdminDashboardStats: React.FC<AdminDashboardStatsProps> = ({ 
  stats, 
  loading, 
  onRefresh 
}) => {
  return (
    <>
      {/* Dashboard Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening.</p>
          </div>
        </div>
        <Button 
          onClick={onRefresh} 
          variant="outline" 
          disabled={loading}
          className="border-blue-200 hover:bg-blue-50 hover:border-blue-300"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Refreshing...' : 'Refresh Stats'}
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
        <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Completed Audits</p>
                <p className="text-3xl font-bold">
                  {loading ? '...' : stats.completedAudits}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-200" />
            </div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-100 text-sm font-medium">Pending Audits</p>
                <p className="text-3xl font-bold">
                  {loading ? '...' : stats.pendingAudits}
                </p>
              </div>
              <Clock className="h-8 w-8 text-amber-200" />
            </div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-teal-500 to-cyan-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-teal-100 text-sm font-medium">Paid Audits</p>
                <p className="text-3xl font-bold">
                  {loading ? '...' : stats.paidAudits}
                </p>
              </div>
              <FileText className="h-8 w-8 text-teal-200" />
            </div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Users</p>
                <p className="text-3xl font-bold">
                  {loading ? '...' : stats.totalUsers}
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-200" />
            </div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-purple-500 to-violet-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Published Posts</p>
                <p className="text-3xl font-bold">
                  {loading ? '...' : stats.publishedPosts}
                </p>
              </div>
              <FileText className="h-8 w-8 text-purple-200" />
            </div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-pink-500 to-rose-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-pink-100 text-sm font-medium">Draft Posts</p>
                <p className="text-3xl font-bold">
                  {loading ? '...' : stats.draftPosts}
                </p>
              </div>
              <FileText className="h-8 w-8 text-pink-200" />
            </div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
