"use client";


import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Users, FileText } from 'lucide-react';

export const AdminSystemOverview: React.FC = () => {
  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-indigo-50">
      <CardHeader>
        <CardTitle className="text-gray-800">System Overview</CardTitle>
        <CardDescription>
          Navigate to different sections of the admin panel
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/60 border border-gray-100">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium text-gray-800">Audit Reports</p>
              <p className="text-sm text-gray-600">Create and manage client audit reports</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/60 border border-gray-100">
            <Users className="h-5 w-5 text-indigo-600" />
            <div>
              <p className="font-medium text-gray-800">User Management</p>
              <p className="text-sm text-gray-600">View and manage registered users</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/60 border border-gray-100">
            <FileText className="h-5 w-5 text-purple-600" />
            <div>
              <p className="font-medium text-gray-800">Content Management</p>
              <p className="text-sm text-gray-600">Create and manage blog content</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
