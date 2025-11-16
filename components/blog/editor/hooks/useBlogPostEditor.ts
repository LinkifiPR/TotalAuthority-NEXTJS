
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  status: 'draft' | 'published';
  published_at?: string;
  meta_title: string;
  meta_description: string;
  og_image_url: string;
  og_image_alt: string;
  featured_image_url: string;
  featured_image_alt: string;
  canonical_url: string;
  is_indexed: boolean;
  tags: string[];
  reading_time?: number;
  author_id?: string;
  author_name?: string;
}

interface UseBlogPostEditorProps {
  post?: BlogPost;
  onSave: (post: BlogPost) => void;
}

export const useBlogPostEditor = ({ post, onSave }: UseBlogPostEditorProps) => {
  const [formData, setFormData] = useState<BlogPost>({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    status: 'draft',
    meta_title: '',
    meta_description: '',
    og_image_url: '',
    og_image_alt: '',
    featured_image_url: '',
    featured_image_alt: '',
    canonical_url: '',
    is_indexed: true,
    tags: [],
    author_name: 'TotalAuthority Team',
    ...post
  });
  
  const [saving, setSaving] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();

  // Auto-generate slug from title
  useEffect(() => {
    if (formData.title && !post) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.title, post]);

  // Calculate reading time  
  useEffect(() => {
    if (formData.content) {
      const wordsPerMinute = 200;
      const wordCount = formData.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
      const readingTime = Math.ceil(wordCount / wordsPerMinute);
      setFormData(prev => ({ ...prev, reading_time: readingTime }));
    }
  }, [formData.content]);

  const handleInputChange = (field: keyof BlogPost, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTagsChange = (tags: string[]) => {
    setFormData(prev => ({ ...prev, tags }));
  };

  const handleFeaturedImageChange = (url: string, alt: string) => {
    setFormData(prev => ({
      ...prev,
      featured_image_url: url,
      featured_image_alt: alt
    }));
  };

  const handleFeaturedImageRemove = () => {
    setFormData(prev => ({
      ...prev,
      featured_image_url: '',
      featured_image_alt: ''
    }));
  };

  const handlePreview = () => {
    if (formData.slug) {
      const previewUrl = `/preview/${formData.slug}`;
      window.open(previewUrl, '_blank');
    } else {
      toast({
        title: "Preview Not Available",
        description: "Please enter a title/slug first to preview the post.",
        variant: "destructive",
      });
    }
  };

  const handleSave = async (status: 'draft' | 'published') => {
    setSaving(true);
    try {
      console.log('Starting save process...');
      console.log('Current user:', user?.id);
      console.log('Auth loading state:', authLoading);
      
      if (authLoading) {
        console.log('Auth still loading, waiting...');
        toast({
          title: "Loading",
          description: "Please wait while we verify your authentication...",
        });
        setSaving(false);
        return;
      }

      if (!user) {
        console.error('No authenticated user found');
        toast({
          title: "Authentication Required", 
          description: "You must be logged in to save posts. Please sign in and try again.",
          variant: "destructive",
        });
        setSaving(false);
        return;
      }

      const postData = {
        ...formData,
        status,
        author_id: user.id,
        published_at: status === 'published' ? new Date().toISOString() : formData.published_at
      };

      console.log('About to save post data:', postData);

      if (post?.id) {
        console.log('Updating existing post with ID:', post.id);
        const { error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', post.id);

        if (error) {
          console.error('Update error:', error);
          throw error;
        }
      } else {
        console.log('Creating new post...');
        const { data, error } = await supabase
          .from('blog_posts')
          .insert([postData])
          .select()
          .single();

        console.log('Insert result:', { data, error });

        if (error) {
          console.error('Insert error:', error);
          throw error;
        }
        postData.id = data.id;
      }

      // Update sitemap when publishing and is_indexed is true
      if (status === 'published' && postData.is_indexed) {
        console.log('Updating sitemap for published post...');
        try {
          const { updateSitemap } = await import('@/utils/sitemapGenerator');
          const sitemapUpdated = await updateSitemap();
          if (sitemapUpdated) {
            console.log('Sitemap updated successfully');
          } else {
            console.warn('Sitemap update failed');
          }
        } catch (sitemapError) {
          console.error('Error updating sitemap:', sitemapError);
        }
      }

      toast({
        title: "Success",
        description: `Post ${status === 'published' ? 'published' : 'saved as draft'} successfully`,
      });

      onSave(postData as BlogPost);
    } catch (error: any) {
      console.error('Error saving post:', error);
      toast({
        title: "Save Error",
        description: `Failed to save post: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return {
    formData,
    saving,
    handleInputChange,
    handleTagsChange,
    handleFeaturedImageChange,
    handleFeaturedImageRemove,
    handlePreview,
    handleSave
  };
};
