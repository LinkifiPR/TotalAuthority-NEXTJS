"use client";


import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { useToast } from '@/hooks/use-toast';
import { AdminAuditForm } from '@/components/admin/AdminAuditForm';
import { AuditDashboard } from '@/components/admin/AuditDashboard';
import { AdminDashboardStats } from '@/components/admin/AdminDashboardStats';
import { AdminQuickActions } from '@/components/admin/AdminQuickActions';
import { AdminSystemOverview } from '@/components/admin/AdminSystemOverview';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/integrations/supabase/client';
import { BarChart3 } from 'lucide-react';

interface DashboardStats {
  completedAudits: number;
  pendingAudits: number;
  paidAudits: number;
  totalUsers: number;
  publishedPosts: number;
  draftPosts: number;
}

const Admin = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    completedAudits: 0,
    pendingAudits: 0,
    paidAudits: 0,
    totalUsers: 0,
    publishedPosts: 0,
    draftPosts: 0,
  });
  const [loadingStats, setLoadingStats] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();

  // Check user role when user changes
  useEffect(() => {
    const checkUserRole = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();
          
          if (error) {
            console.error('Error fetching user role:', error);
            return;
          }
          
          setUserRole(data?.role || null);
        } catch (error) {
          console.error('Error checking user role:', error);
        }
      } else {
        setUserRole(null);
      }
    };

    if (!authLoading) {
      checkUserRole();
    }
  }, [user, authLoading]);

  // Redirect non-authenticated users to auth page with admin context
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth?admin=true', { 
        state: { from: location.pathname },
        replace: true 
      });
    }
  }, [user, authLoading, navigate, location.pathname]);

  const fetchDashboardStats = async () => {
    setLoadingStats(true);
    try {
      console.log('Fetching admin dashboard stats...');
      
      // Use the admin-stats edge function to bypass RLS for user counting
      const { data, error } = await supabase.functions.invoke('admin-stats');
      
      if (error) {
        console.error('Error calling admin-stats function:', error);
        throw error;
      }

      if (data) {
        setDashboardStats({
          completedAudits: data.completedAudits || 0,
          pendingAudits: data.pendingAudits || 0,
          paidAudits: data.paidAudits || 0,
          totalUsers: data.totalUsers || 0,
          publishedPosts: data.publishedPosts || 0,
          draftPosts: data.draftPosts || 0,
        });
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      toast({
        title: "Error",
        description: "Failed to fetch dashboard statistics",
        variant: "destructive",
      });
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    if (user && userRole === 'admin' && location.pathname === '/admin') {
      fetchDashboardStats();
    }
  }, [user, userRole, location.pathname, refreshTrigger]);

  const handleAuditCreated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render anything while redirecting
  if (!user) {
    return null;
  }

  // Show access denied for non-admin users
  if (userRole !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Admin Access Required</h1>
            <p className="text-slate-600 mb-6">
              Your account does not have admin privileges. Please contact an administrator for access.
            </p>
          </div>
          <a 
            href="/dashboard" 
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-colors"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    );
  }

  // Show audit reports when on /admin/audits route
  if (location.pathname === '/admin/audits') {
    return (
      <SidebarProvider>
        <AdminSidebar />
        <SidebarInset>
          <AdminHeader />
          <div className="flex-1 space-y-4 p-8 pt-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
            <div className="flex items-center justify-between space-y-2">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Audit Reports
                </h2>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <AdminAuditForm onAuditCreated={handleAuditCreated} />
              </div>
              <div>
                <AuditDashboard refreshTrigger={refreshTrigger} />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  // Default dashboard view
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <AdminHeader />
        <div className="flex-1 space-y-6 p-8 pt-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
          <AdminDashboardStats 
            stats={dashboardStats}
            loading={loadingStats}
            onRefresh={fetchDashboardStats}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AdminQuickActions />
            <AdminSystemOverview />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Admin;
