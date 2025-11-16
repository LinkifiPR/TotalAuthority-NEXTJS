"use client";


import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight } from 'lucide-react';

interface RecentAuditsSectionProps {
  userAudits: any[];
}

const RecentAuditsSection = ({ userAudits }: RecentAuditsSectionProps) => {
  if (userAudits.length === 0) {
    return null;
  }

  return (
    <Card className="bg-white shadow-lg border-0">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <span>Recent Audits</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {userAudits.map((audit) => (
            <div key={audit.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-slate-900">{audit.audit_reports?.client_name}</p>
                  <p className="text-sm text-slate-500">
                    Added {new Date(audit.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <Link to={`/audit/${audit.audit_reports?.share_url_slug}`}>
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <span>View Report</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentAuditsSection;
