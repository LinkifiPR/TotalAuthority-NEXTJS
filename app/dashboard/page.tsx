"use client";


import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/integrations/supabase/client';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import WelcomeSection from '@/components/dashboard/WelcomeSection';
import DashboardModules from '@/components/dashboard/DashboardModules';
import RecentAuditsSection from '@/components/dashboard/RecentAuditsSection';

const Dashboard = () => {
  const { user, signOut, loading } = useAuth();
  const router = useRouter();
  const [userAudits, setUserAudits] = useState<any[]>([]);
  const [justFetchedAudit, setJustFetchedAudit] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchUserAudits();
    }
  }, [user]);

  const fetchUserAudits = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_audit_codes')
        .select(`
          *,
          audit_reports (
            id,
            client_name,
            created_at,
            share_url_slug
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUserAudits(data || []);
    } catch (error: any) {
      console.error('Error fetching user audits:', error);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <DashboardHeader user={user} onSignOut={handleSignOut} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <WelcomeSection user={user} />

        <DashboardModules
          user={user}
          userAudits={userAudits}
          onAuditAdded={fetchUserAudits}
          justFetchedAudit={justFetchedAudit}
          setJustFetchedAudit={setJustFetchedAudit}
        />

        <RecentAuditsSection userAudits={userAudits} />
      </main>
    </div>
  );
};

export default Dashboard;
