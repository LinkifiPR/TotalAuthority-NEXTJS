"use client";


import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Package, 
  BookOpen, 
  FileText
} from 'lucide-react';
import FreeAuditsCard from './FreeAuditsCard';
import PaidAuditCard from './PaidAuditCard';
import { User } from '@supabase/supabase-js';

interface DashboardModulesProps {
  user: User;
  userAudits: any[];
  onAuditAdded: () => void;
  justFetchedAudit: string | null;
  setJustFetchedAudit: (value: string | null) => void;
}

const DashboardModules = ({ 
  user, 
  userAudits, 
  onAuditAdded, 
  justFetchedAudit, 
  setJustFetchedAudit 
}: DashboardModulesProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Free Audits */}
      <FreeAuditsCard
        user={user}
        userAudits={userAudits}
        onAuditAdded={onAuditAdded}
        justFetchedAudit={justFetchedAudit}
        setJustFetchedAudit={setJustFetchedAudit}
      />

      {/* Paid Audits */}
      <PaidAuditCard user={user} />

      {/* Packages */}
      <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-purple-100">
              <Package className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <CardTitle className="text-lg">Packages</CardTitle>
              <CardDescription>Service bundles</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <Package className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-sm text-slate-600 mb-4">Comprehensive service bundles for your business</p>
            <Badge variant="secondary" className="text-xs">
              Custom Solutions
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Resources */}
      <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-orange-100">
              <BookOpen className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <CardTitle className="text-lg">Resources</CardTitle>
              <CardDescription>Learning materials</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <BookOpen className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <p className="text-sm text-slate-600 mb-4">Educational content and best practices</p>
            <Badge variant="secondary" className="text-xs">
              Guides & Tips
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardModules;
