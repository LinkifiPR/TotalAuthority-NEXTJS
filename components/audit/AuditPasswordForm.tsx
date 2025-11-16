"use client";


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AuditPasswordFormProps {
  password: string;
  setPassword: (password: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const AuditPasswordForm: React.FC<AuditPasswordFormProps> = ({
  password,
  setPassword,
  onSubmit
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <Card className="w-full max-w-md animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">🔒 Protected Audit Report</CardTitle>
          <CardDescription>
            This audit report is password protected. Please enter the password to view your results.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="transition-all duration-200 focus:scale-[1.02]"
              />
            </div>
            <Button type="submit" className="w-full hover:scale-[1.02] transition-transform duration-200">
              View Audit Report
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
