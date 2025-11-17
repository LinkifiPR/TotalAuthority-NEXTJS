"use client";


import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, BarChart3, Users, Activity } from 'lucide-react';

export const AdminQuickActions: React.FC = () => {
  const router = useRouter();

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-gray-800">
          <TrendingUp className="h-6 w-6 text-blue-600" />
          <span>Quick Actions</span>
        </CardTitle>
        <CardDescription>
          Common administrative tasks
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={() => router.push('/admin/audits')} 
          className="w-full justify-start bg-blue-600 hover:bg-blue-700"
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          Create New Audit Report
        </Button>
        <Button 
          variant="outline" 
          onClick={() => router.push('/admin/users')} 
          className="w-full justify-start border-blue-200 hover:bg-blue-50"
        >
          <Users className="h-4 w-4 mr-2" />
          Manage Users
        </Button>
        <Button 
          variant="outline" 
          onClick={() => router.push('/admin/settings')} 
          className="w-full justify-start border-blue-200 hover:bg-blue-50"
        >
          <Activity className="h-4 w-4 mr-2" />
          System Settings
        </Button>
      </CardContent>
    </Card>
  );
};
