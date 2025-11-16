"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  CheckCircle, 
  Download, 
  Star, 
  Sparkles,
  Award 
} from 'lucide-react';
import { supabase } from '@/lib/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

interface PaidAuditCardProps {
  user: User;
}

interface PaidAudit {
  id: string;
  client_name: string;
  share_url_slug: string;
  audit_data: any; // Using any to handle JSON type from Supabase
  created_at: string;
}

const PaidAuditCard = ({ user }: PaidAuditCardProps) => {
  const [paidAudits, setPaidAudits] = useState<PaidAudit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPaidAudits();
  }, [user.id]);

  const fetchPaidAudits = async () => {
    try {
      // Fetch all paid audits for this user (including archived ones - users should always see their paid audits)
      const { data, error } = await supabase
        .from('audit_reports')
        .select('*')
        .contains('audit_data', { uploaded_for_user: user.id })
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Filter and type check the results
      const paidAuditsData = (data || []).filter(audit => {
        if (!audit.audit_data || typeof audit.audit_data !== 'object') return false;
        const auditData = audit.audit_data as any;
        return auditData.type === 'uploaded_pdf' && auditData.uploaded_for_user === user.id;
      });
      
      setPaidAudits(paidAuditsData);
    } catch (error) {
      console.error('Error fetching paid audits:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (filePath: string, fileName: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('blog-media')
        .download(filePath);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  if (loading) {
    return (
      <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-blue-100">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg">Full Audits</CardTitle>
              <CardDescription>Premium audit services</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (paidAudits.length === 0) {
    return (
      <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-blue-100">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg">Full Audits</CardTitle>
              <CardDescription>Premium audit services</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-slate-600 mb-4">Professional audit services with detailed insights</p>
            <Badge variant="secondary" className="text-xs">
              Advanced Analytics
            </Badge>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg border-0 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-2 border-blue-200">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
            <Award className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-lg flex items-center space-x-2">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Full Audits
              </span>
              <Sparkles className="w-4 h-4 text-yellow-500" />
            </CardTitle>
            <CardDescription className="text-blue-700">
              Premium audit services complete
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Compact Success Message */}
        <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-3 rounded-lg border-l-4 border-green-500">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
            <span className="font-semibold text-green-800 text-sm">
              Your Full Audit is Complete!
            </span>
          </div>
        </div>

        {/* Compact Audit List */}
        <div className="space-y-2">
          {paidAudits.slice(0, 2).map((audit) => (
            <div 
              key={audit.id} 
              className="bg-white p-3 rounded-lg shadow-sm border border-blue-100"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center space-x-2 flex-1 min-w-0">
                  <Star className="w-3 h-3 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-medium text-sm text-gray-900 truncate mb-1">
                      {audit.client_name}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {new Date((audit.audit_data as any)?.uploaded_at || audit.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <Button
                    size="sm"
                    onClick={() => handleDownload((audit.audit_data as any)?.file_path, `${audit.client_name}-audit-report.pdf`)}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs px-2 py-1 h-6 min-w-[70px]"
                  >
                    <Download className="w-3 h-3 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          ))}
          
          {/* Show count if more than 2 audits */}
          {paidAudits.length > 2 && (
            <div className="text-center py-2">
              <span className="text-xs text-blue-600 font-medium">
                +{paidAudits.length - 2} more audit{paidAudits.length - 2 > 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>

        {/* Compact Premium Badge */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-2 rounded-lg border border-yellow-200">
          <div className="flex items-center justify-center space-x-2">
            <Award className="w-3 h-3 text-yellow-600" />
            <span className="text-xs font-medium text-yellow-800">
              Premium Service Complete
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaidAuditCard;