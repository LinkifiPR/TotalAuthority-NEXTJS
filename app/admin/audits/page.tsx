"use client";


import React, { useState } from 'react';
import { AdminAuditForm } from '@/components/admin/AdminAuditForm';
import { AuditDashboard } from '@/components/admin/AuditDashboard';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { BarChart3 } from 'lucide-react';

const AdminAudits = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleAuditCreated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <AdminHeader />
        <div className="flex-1 space-y-8 p-8 pt-6 bg-gray-50 min-h-screen">
          <div className="flex items-center justify-between space-y-2">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Audit Reports
              </h2>
            </div>
          </div>
          
          {/* Create New Audit Report Section - Now on top */}
          <div className="w-full">
            <AdminAuditForm onAuditCreated={handleAuditCreated} />
          </div>
          
          {/* Dashboard Section - Now underneath */}
          <div className="w-full">
            <AuditDashboard refreshTrigger={refreshTrigger} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminAudits;
