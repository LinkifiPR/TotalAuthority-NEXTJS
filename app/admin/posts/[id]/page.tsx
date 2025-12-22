"use client";


import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/integrations/supabase/client';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { BlogPostEditor } from '@/components/blog/BlogPostEditor';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { BarChart3 } from 'lucide-react';

const AdminPostEditor = () => {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();

  // Redirect to auth if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (id && id !== 'new') {
      fetchPost();
    } else {
      setLoading(false);
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setPost(data);
    } catch (error: any) {
      console.error('Error fetching post:', error);
      toast({
        title: "Error",
        description: "Failed to load blog post",
        variant: "destructive",
      });
      router.push('/admin/posts');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    toast({
      title: "Success",
      description: "Blog post saved successfully",
    });
    router.push('/admin/posts');
  };

  const handleCancel = () => {
    router.push('/admin/posts');
  };

  if (authLoading || loading) {
    return (
      <SidebarProvider>
        <AdminSidebar />
        <SidebarInset>
          <AdminHeader />
          <div className="flex-1 p-8 pt-6">
            <div className="text-center py-8">Loading...</div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  // Don't render if not authenticated (will redirect)
  if (!user) {
    return null;
  }

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <AdminHeader />
        <div className="flex-1 p-8 pt-6">
          <BlogPostEditor
            post={post}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminPostEditor;
