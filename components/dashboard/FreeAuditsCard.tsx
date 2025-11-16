"use client";


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Search, PartyPopper, CheckCircle } from 'lucide-react';
import { User } from '@supabase/supabase-js';

interface FreeAuditsCardProps {
  user: User;
  userAudits: any[];
  onAuditAdded: () => void;
  justFetchedAudit: string | null;
  setJustFetchedAudit: (value: string | null) => void;
}

const FreeAuditsCard = ({ 
  user, 
  userAudits, 
  onAuditAdded, 
  justFetchedAudit, 
  setJustFetchedAudit 
}: FreeAuditsCardProps) => {
  const [auditCode, setAuditCode] = useState('');
  const [fetchingAudit, setFetchingAudit] = useState(false);
  const { toast } = useToast();

  const handleFetchAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auditCode.trim() || !user) return;

    setFetchingAudit(true);
    try {
      console.log('Searching for audit code:', auditCode.trim().toUpperCase());
      
      // Find audit report by audit_code
      const { data: auditReport, error: auditError } = await supabase
        .from('audit_reports')
        .select('*')
        .eq('audit_code', auditCode.trim().toUpperCase())
        .maybeSingle();

      console.log('Audit search result:', { auditReport, auditError });

      if (auditError) {
        console.error('Error searching for audit:', auditError);
        toast({
          title: "Error searching for audit",
          description: auditError.message,
          variant: "destructive",
        });
        return;
      }

      if (!auditReport) {
        toast({
          title: "Audit not found",
          description: "Please check your audit code and try again.",
          variant: "destructive",
        });
        return;
      }

      // Check if user already has this audit
      const { data: existingCode } = await supabase
        .from('user_audit_codes')
        .select('*')
        .eq('user_id', user.id)
        .eq('audit_code', auditCode.trim().toUpperCase())
        .maybeSingle();

      if (existingCode) {
        toast({
          title: "Audit already added",
          description: "This audit is already in your dashboard.",
          variant: "destructive",
        });
        return;
      }

      // Add audit to user's collection
      const { error: insertError } = await supabase
        .from('user_audit_codes')
        .insert({
          user_id: user.id,
          audit_code: auditCode.trim().toUpperCase(),
          audit_report_id: auditReport.id,
          used_at: new Date().toISOString(),
        });

      if (insertError) throw insertError;

      // Set celebration state
      setJustFetchedAudit(auditCode.trim().toUpperCase());
      
      toast({
        title: "🎉 Audit added successfully!",
        description: "Your free audit has been added to your dashboard.",
      });

      setAuditCode('');
      onAuditAdded();

      // Clear celebration state after animation
      setTimeout(() => {
        setJustFetchedAudit(null);
      }, 3000);

    } catch (error: any) {
      console.error('Error in handleFetchAudit:', error);
      toast({
        title: "Error adding audit",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setFetchingAudit(false);
    }
  };

  const isCardInCelebrationMode = justFetchedAudit !== null;

  return (
    <Card className={`shadow-lg border-0 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${
      isCardInCelebrationMode 
        ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 animate-pulse' 
        : 'bg-white'
    }`}>
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${
            isCardInCelebrationMode ? 'bg-green-200' : 'bg-green-100'
          }`}>
            {isCardInCelebrationMode ? (
              <PartyPopper className="w-5 h-5 text-green-700 animate-bounce" />
            ) : (
              <Search className="w-5 h-5 text-green-600" />
            )}
          </div>
          <div>
            <CardTitle className={`text-lg ${
              isCardInCelebrationMode ? 'text-green-800' : ''
            }`}>Mini Audits</CardTitle>
            <CardDescription className={
              isCardInCelebrationMode ? 'text-green-600' : ''
            }>
              {isCardInCelebrationMode ? '🎉 Audit Successfully Added!' : 'Access your audit reports'}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isCardInCelebrationMode && (
          <form onSubmit={handleFetchAudit} className="space-y-3">
            <Input
              placeholder="Enter audit code"
              value={auditCode}
              onChange={(e) => setAuditCode(e.target.value)}
              className="text-sm"
            />
            <Button
              type="submit"
              disabled={fetchingAudit || !auditCode.trim()}
              className="w-full bg-green-600 hover:bg-green-700 text-sm"
            >
              {fetchingAudit ? 'Adding...' : 'Fetch Audit'}
            </Button>
          </form>
        )}
        
        {isCardInCelebrationMode && (
          <div className="text-center py-4">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2 animate-bounce" />
            <p className="text-green-800 font-semibold">Audit Added Successfully!</p>
            <p className="text-green-600 text-sm">Check your audits below</p>
          </div>
        )}

        <div className="pt-2 border-t">
          <p className="text-xs text-slate-500 mb-2">Your Audits ({userAudits.length})</p>
          {userAudits.length > 0 ? (
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {userAudits.slice(0, 3).map((audit) => (
                <div key={audit.id} className="flex items-center justify-between p-2 bg-slate-50 rounded text-xs">
                  <span className="truncate">{audit.audit_reports?.client_name}</span>
                  <Link to={`/audit/${audit.audit_reports?.share_url_slug}`}>
                    <Button size="sm" variant="outline" className="h-6 px-2 text-xs">
                      View Audit
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400">No audits yet</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FreeAuditsCard;
