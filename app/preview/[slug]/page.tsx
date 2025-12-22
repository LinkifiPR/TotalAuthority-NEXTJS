"use client";


import React, { useState, useEffect } from 'react';
import { useParams, usePathname } from 'next/navigation';
import { supabase } from '@/lib/integrations/supabase/client';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BlogPostContent } from '@/components/blog/BlogPostContent';
import { BlogPostSidebar } from '@/components/blog/BlogPostSidebar';
import { FormPopup } from '@/components/FormPopup';
import { useFormPopup } from '@/hooks/useFormPopup';
import { useToast } from '@/hooks/use-toast';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  status: string;
  published_at: string;
  meta_title?: string;
  meta_description?: string;
  og_image_url?: string;
  og_image_alt?: string;
  featured_image_url?: string;
  featured_image_alt?: string;
  canonical_url?: string;
  is_indexed: boolean;
  view_count: number;
  reading_time?: number;
  tags: string[];
}

const BlogPost = () => {
  const params = useParams();
  const slug = params?.slug as string;
  const pathname = usePathname();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [headings, setHeadings] = useState<Array<{id: string, text: string, level: number}>>([]);
  const { toast } = useToast();
  const { isOpen, openForm, closeForm } = useFormPopup();

  // Check if this is a preview URL
  const isPreview = pathname?.startsWith('/preview/') ?? true;

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      try {
        console.log('Fetching blog post with slug:', slug, 'isPreview:', isPreview);
        
        let query = supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug);

        // If not preview, only get published posts
        if (!isPreview) {
          query = query.eq('status', 'published');
        }

        const { data, error } = await query.single();

        if (error) {
          console.error('Error fetching blog post:', error);
          if (error.code === 'PGRST116') {
            // Post not found
            setPost(null);
          } else {
            throw error;
          }
          return;
        }

        console.log('Blog post found:', data);
        setPost(data);
        
        // Only increment view count for published posts (not previews)
        if (!isPreview && data.status === 'published') {
          await supabase
            .from('blog_posts')
            .update({ view_count: (data.view_count || 0) + 1 })
            .eq('id', data.id);
        }

      } catch (error: any) {
        console.error('Error fetching blog post:', error);
        toast({
          title: "Error",
          description: "Failed to load blog post",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, toast, isPreview]);

  // Listen for CTA button clicks from blog content
  useEffect(() => {
    const handlePostMessage = (event: MessageEvent) => {
      if (event.data.type === 'OPEN_FORM') {
        openForm();
      }
    };

    window.addEventListener('message', handlePostMessage);
    return () => window.removeEventListener('message', handlePostMessage);
  }, [openForm]);

  // Extract headings from the actual DOM after content is rendered
  useEffect(() => {
    if (post?.content) {
      // Wait for the content to be fully rendered
      const extractHeadings = () => {
        const headingElements = document.querySelectorAll('.blog-content h1, .blog-content h2, .blog-content h3, .blog-content h4');
        
        const extractedHeadings = Array.from(headingElements)
          .filter((heading) => {
            // Exclude headings that are inside code blocks or other special containers
            const isInCodeBlock = heading.closest('.code-block, .code-content');
            const isInCTABlock = heading.closest('.cta-block');
            return !isInCodeBlock && !isInCTABlock;
          })
          .map((heading, index) => {
            let id = heading.id;
            
            // If heading doesn't have an ID, generate one
            if (!id) {
              const text = heading.textContent || '';
              id = text
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '') || `heading-${index}`;
              heading.id = id;
            }
            
            return {
              id,
              text: heading.textContent || '',
              level: parseInt(heading.tagName.charAt(1))
            };
          });
        
        console.log('Extracted headings:', extractedHeadings);
        setHeadings(extractedHeadings);
      };

      // Use multiple timeouts to ensure content is fully rendered
      const timeouts = [100, 500, 1000];
      timeouts.forEach(delay => {
        setTimeout(extractHeadings, delay);
      });
      
      // Also extract immediately
      extractHeadings();
    }
  }, [post?.content]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header onOpenForm={openForm} />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
        <Footer onOpenForm={openForm} />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-gray-600">The blog post preview you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header onOpenForm={openForm} />
      
      {/* Preview banner */}
      {isPreview && (
        <div className="bg-yellow-100 border-b border-yellow-200 py-2 px-4">
          <div className="container mx-auto text-center">
            <span className="text-yellow-800 font-medium">
              🔍 Preview Mode - This is how your post will look when published
            </span>
          </div>
        </div>
      )}
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation - Now on the left */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <BlogPostSidebar headings={headings} />
          </div>
          
          {/* Main Content */}
          <div className="flex-1 max-w-4xl min-w-0">
            <BlogPostContent post={post} />
          </div>
        </div>
      </div>
      
      <Footer onOpenForm={openForm} />
      <FormPopup isOpen={isOpen} onClose={closeForm} />
    </div>
  );
};

export default BlogPost;
