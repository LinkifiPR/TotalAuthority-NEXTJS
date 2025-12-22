"use client";


import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/lib/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { User, Mail, Calendar, Shield, Search, Filter, Upload, FileText, Trash2, Plus, CheckCircle } from 'lucide-react';

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: string;
  created_at: string;
  last_sign_in_at?: string;
  paidAudits?: PaidAuditInfo[];
}

interface PaidAuditInfo {
  id: string;
  client_name: string;
  audit_data: any;
  created_at: string;
}

const AdminUsers = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [auditFilter, setAuditFilter] = useState('all'); // New filter for paid audits
  const [sortBy, setSortBy] = useState<'name' | 'email' | 'date' | 'role'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [actionType, setActionType] = useState<'upload' | 'manage'>('upload');
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterAndSortUsers();
  }, [users, searchTerm, roleFilter, auditFilter, sortBy, sortOrder]);

  const fetchUsers = async () => {
    try {
      console.log('Fetching user details via admin-stats function...');
      
      // Make a request for user details using the admin-stats function
      const response = await fetch(`https://pgbcixncaeyjunwxrsik.supabase.co/functions/v1/admin-stats?users=true`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnYmNpeG5jYWV5anVud3hyc2lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwOTgzMDMsImV4cCI6MjA2NTY3NDMwM30.TUsBYptM7RIcVWZ0IQiGGNViSnlxr8ruN_zwiAup5Fc`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const userData = await response.json();
      
      if (userData.error) {
        throw new Error(userData.error);
      }

      setUsers(userData.users || []);
      await fetchPaidAuditsForUsers(userData.users || []);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchPaidAuditsForUsers = async (usersList: UserProfile[]) => {
    try {
      // Fetch all paid audits (including archived ones - users should always see their paid audits)
      const { data: audits, error } = await supabase
        .from('audit_reports')
        .select('*')
        .contains('audit_data', { type: 'uploaded_pdf' });

      if (error) throw error;

      // Map audits to users
      const usersWithAudits = usersList.map(user => {
        const userAudits = (audits || []).filter(audit => {
          const auditData = audit.audit_data as any;
          return auditData?.uploaded_for_user === user.id;
        });
        
        return {
          ...user,
          paidAudits: userAudits
        };
      });

      setUsers(usersWithAudits);
    } catch (error) {
      console.error('Error fetching paid audits:', error);
    }
  };

  const filterAndSortUsers = () => {
    let filtered = users.filter(user => {
      const matchesSearch = user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      
      // New audit filter logic
      let matchesAudit = true;
      if (auditFilter === 'with-audits') {
        matchesAudit = !!(user.paidAudits && user.paidAudits.length > 0);
      } else if (auditFilter === 'without-audits') {
        matchesAudit = !user.paidAudits || user.paidAudits.length === 0;
      }
      
      return matchesSearch && matchesRole && matchesAudit;
    });

    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.full_name || '';
          bValue = b.full_name || '';
          break;
        case 'email':
          aValue = a.email || '';
          bValue = b.email || '';
          break;
        case 'role':
          aValue = a.role || '';
          bValue = b.role || '';
          break;
        case 'date':
        default:
          aValue = new Date(a.created_at).getTime();
          bValue = new Date(b.created_at).getTime();
          break;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredUsers(filtered);
  };

  const handlePdfUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !selectedUser) return;

    if (file.type !== 'application/pdf') {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file only.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      // Upload PDF to Supabase storage
      const fileName = `user-${selectedUser.id}-audit-${Date.now()}.pdf`;
      const { data, error: uploadError } = await supabase.storage
        .from('blog-media')
        .upload(`audit-reports/${fileName}`, file);

      if (uploadError) throw uploadError;

      // Create audit report entry for user
      const { error: insertError } = await supabase
        .from('audit_reports')
        .insert({
          client_name: selectedUser.full_name || selectedUser.email,
          share_url_slug: `user-${selectedUser.id}-${Date.now()}`,
          audit_data: {
            type: 'uploaded_pdf',
            file_path: data.path,
            uploaded_for_user: selectedUser.id,
            uploaded_at: new Date().toISOString()
          },
          status: 'active'
        });

      if (insertError) throw insertError;

      toast({
        title: "PDF uploaded successfully",
        description: `Audit report has been added to ${selectedUser.full_name || selectedUser.email}'s dashboard.`,
      });

      setUploadDialogOpen(false);
      setSelectedUser(null);
      // Refresh the users list to show updated audit status
      fetchUsers();
    } catch (error: any) {
      console.error('Error uploading PDF:', error);
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveAudit = async (auditId: string) => {
    try {
      const { error } = await supabase
        .from('audit_reports')
        .update({ status: 'archived' })
        .eq('id', auditId);

      if (error) throw error;

      toast({
        title: "Audit removed successfully",
        description: "The audit has been archived and removed from the user's dashboard.",
      });

      setUploadDialogOpen(false);
      setSelectedUser(null);
      fetchUsers();
    } catch (error: any) {
      console.error('Error removing audit:', error);
      toast({
        title: "Failed to remove audit",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const openUploadDialog = (user: UserProfile, type: 'upload' | 'manage') => {
    setSelectedUser(user);
    setActionType(type);
    setUploadDialogOpen(true);
  };

  if (loading) {
    return (
      <SidebarProvider>
        <AdminSidebar />
        <SidebarInset>
          <AdminHeader />
          <div className="flex-1 p-8 pt-6">
            <div className="text-center py-8">Loading users...</div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <AdminHeader />
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Users</h2>
          </div>

          {/* Filters and Search */}
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Search, filter, and manage all registered users ({filteredUsers.length} of {users.length} total)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search users by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={auditFilter} onValueChange={setAuditFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <FileText className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by audits" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="with-audits">With Paid Audits</SelectItem>
                    <SelectItem value="without-audits">Without Paid Audits</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={`${sortBy}-${sortOrder}`} onValueChange={(value) => {
                  const [field, order] = value.split('-');
                  setSortBy(field as any);
                  setSortOrder(order as any);
                }}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date-desc">Newest First</SelectItem>
                    <SelectItem value="date-asc">Oldest First</SelectItem>
                    <SelectItem value="name-asc">Name A-Z</SelectItem>
                    <SelectItem value="name-desc">Name Z-A</SelectItem>
                    <SelectItem value="email-asc">Email A-Z</SelectItem>
                    <SelectItem value="email-desc">Email Z-A</SelectItem>
                    <SelectItem value="role-asc">Role A-Z</SelectItem>
                    <SelectItem value="role-desc">Role Z-A</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Users Table */}
              {filteredUsers.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  {users.length === 0 ? 'No users found.' : 'No users match your search criteria.'}
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-blue-100 rounded-full">
                                <User className="w-4 h-4 text-blue-600" />
                              </div>
                              <div>
                                <div className="font-medium">
                                  {user.full_name || 'No name provided'}
                                </div>
                                <div className="text-sm text-gray-500">
                                  ID: {user.id.slice(0, 8)}...
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Mail className="w-3 h-3 text-gray-400" />
                              <span>{user.email}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={user.role === 'admin' ? 'default' : 'secondary'}
                              className="flex items-center space-x-1 w-fit"
                            >
                              <Shield className="w-3 h-3" />
                              <span>{user.role}</span>
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2 text-sm">
                              <Calendar className="w-3 h-3 text-gray-400" />
                              <span>{new Date(user.created_at).toLocaleDateString()}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col space-y-2">
                              {user.paidAudits && user.paidAudits.length > 0 ? (
                                <>
                                  <div className="flex items-center space-x-2 text-sm text-green-600">
                                    <CheckCircle className="w-4 h-4" />
                                    <span>{user.paidAudits.length} Paid Audit{user.paidAudits.length > 1 ? 's' : ''}</span>
                                  </div>
                                  <div className="flex space-x-1">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => openUploadDialog(user, 'manage')}
                                      className="flex items-center space-x-1 text-xs px-2 py-1"
                                    >
                                      <FileText className="w-3 h-3" />
                                      <span>Manage</span>
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => openUploadDialog(user, 'upload')}
                                      className="flex items-center space-x-1 text-xs px-2 py-1"
                                    >
                                      <Plus className="w-3 h-3" />
                                      <span>Add More</span>
                                    </Button>
                                  </div>
                                </>
                              ) : (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => openUploadDialog(user, 'upload')}
                                  className="flex items-center space-x-1"
                                >
                                  <Upload className="w-3 h-3" />
                                  <span>Upload to Paid Audit</span>
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {actionType === 'upload' ? 'Upload Paid Audit Report PDF' : 'Manage Paid Audits'}
                </DialogTitle>
                <DialogDescription>
                  {actionType === 'upload' 
                    ? `Upload a PDF audit report for ${selectedUser?.full_name || selectedUser?.email}. This will appear in their Paid Audit module on their dashboard.`
                    : `Manage existing paid audits for ${selectedUser?.full_name || selectedUser?.email}.`
                  }
                </DialogDescription>
              </DialogHeader>
              
              {actionType === 'manage' && selectedUser?.paidAudits && selectedUser.paidAudits.length > 0 && (
                <div className="space-y-4 mb-6">
                  <h4 className="font-medium text-sm text-gray-700">Existing Audits:</h4>
                  <div className="space-y-2">
                    {selectedUser.paidAudits.map((audit) => (
                      <div key={audit.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{audit.client_name}</p>
                          <p className="text-xs text-gray-500">
                            Uploaded: {new Date(audit.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleRemoveAudit(audit.id)}
                          className="flex items-center space-x-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Remove</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(actionType === 'upload' || actionType === 'manage') && (
                <div className="space-y-4">
                  <h4 className="font-medium text-sm text-gray-700">
                    {actionType === 'manage' ? 'Upload Additional Audit:' : 'Upload New Audit:'}
                  </h4>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <div className="text-sm text-gray-600 mb-4">
                      Click to select PDF file or drag and drop
                    </div>
                    <input
                      id="pdf-upload"
                      type="file"
                      accept=".pdf"
                      onChange={handlePdfUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                    <Button 
                      variant="outline" 
                      disabled={uploading}
                      onClick={() => document.getElementById('pdf-upload')?.click()}
                      className="hover:bg-blue-50"
                    >
                      {uploading ? 'Uploading...' : 'Choose PDF File'}
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminUsers;
