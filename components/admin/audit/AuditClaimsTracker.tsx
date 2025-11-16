
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/integrations/supabase/client';
import { Users, Calendar, Eye, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';

interface AuditClaim {
  id: string;
  audit_report_id: string;
  user_id: string;
  assigned_at: string;
  client_name: string;
  audit_code: string;
  user_email?: string;
  user_full_name?: string;
}

interface AuditClaimsTrackerProps {
  refreshTrigger: number;
}

export const AuditClaimsTracker: React.FC<AuditClaimsTrackerProps> = ({ refreshTrigger }) => {
  const [claims, setClaims] = useState<AuditClaim[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchClaims();
  }, [refreshTrigger]);

  const fetchClaims = async (showRefreshing = false) => {
    if (showRefreshing) setRefreshing(true);
    try {
      console.log('Fetching audit claims...');
      
      // First, get all assignments
      const { data: assignments, error: assignmentsError } = await supabase
        .from('user_audit_assignments')
        .select('*')
        .order('assigned_at', { ascending: false });

      if (assignmentsError) {
        console.error('Error fetching assignments:', assignmentsError);
        throw assignmentsError;
      }

      console.log('Fetched assignments:', assignments);

      if (!assignments || assignments.length === 0) {
        console.log('No assignments found');
        setClaims([]);
        return;
      }

      // Get all unique audit report IDs and user IDs
      const auditReportIds = [...new Set(assignments.map(a => a.audit_report_id))];
      const userIds = [...new Set(assignments.map(a => a.user_id))];

      console.log('Fetching audit reports for IDs:', auditReportIds);
      console.log('Fetching user profiles for IDs:', userIds);

      // Fetch audit reports
      const { data: auditReports, error: auditError } = await supabase
        .from('audit_reports')
        .select('id, client_name, audit_code')
        .in('id', auditReportIds);

      if (auditError) {
        console.error('Error fetching audit reports:', auditError);
        throw auditError;
      }

      // Fetch user profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, email, full_name')
        .in('id', userIds);

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
        throw profilesError;
      }

      console.log('Fetched audit reports:', auditReports);
      console.log('Fetched profiles:', profiles);

      // Combine the data
      const formattedClaims = assignments.map(assignment => {
        const auditReport = auditReports?.find(ar => ar.id === assignment.audit_report_id);
        const profile = profiles?.find(p => p.id === assignment.user_id);

        console.log(`Processing assignment ${assignment.id}:`, {
          assignment,
          auditReport,
          profile
        });

        return {
          id: assignment.id,
          audit_report_id: assignment.audit_report_id,
          user_id: assignment.user_id,
          assigned_at: assignment.assigned_at,
          client_name: auditReport?.client_name || 'Unknown Client',
          audit_code: auditReport?.audit_code || 'N/A',
          user_email: profile?.email,
          user_full_name: profile?.full_name || profile?.email,
        };
      }).filter(claim => claim.client_name !== 'Unknown Client'); // Filter out invalid claims

      console.log('Final formatted claims:', formattedClaims);
      setClaims(formattedClaims);
    } catch (error: any) {
      console.error('Error fetching audit claims:', error);
      toast({
        title: "Error",
        description: `Failed to fetch audit claims: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    fetchClaims(true);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Audit Claims
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Users className="w-5 h-5 text-green-600" />
            Audit Claims
          </span>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-white">
              {claims.length} total
            </Badge>
            <Button
              size="sm"
              variant="outline"
              onClick={handleRefresh}
              disabled={refreshing}
              className="bg-white"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {claims.length === 0 ? (
          <div className="text-center py-8">
            <Eye className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Claims Yet</h3>
            <p className="text-gray-500">Audit claims will appear here when users claim audits.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {claims.map((claim) => (
              <div
                key={claim.id}
                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-green-100 text-green-700">
                    {claim.user_full_name?.charAt(0) || claim.user_email?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {claim.user_full_name || claim.user_email || 'Unknown User'}
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      claimed
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    <strong>{claim.client_name}</strong> - Code: <span className="font-mono text-blue-600">{claim.audit_code}</span>
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Calendar className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">
                      {format(new Date(claim.assigned_at), 'MMM d, yyyy h:mm a')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
