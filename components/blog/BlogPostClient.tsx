"use client";

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BlogPostContent } from '@/components/blog/BlogPostContent';
import { BlogPostSidebar } from '@/components/blog/BlogPostSidebar';
import { FormPopup } from '@/components/FormPopup';
import { useFormPopup } from '@/hooks/useFormPopup';
import { supabase } from '@/lib/integrations/supabase/client';

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
  author_name?: string;
}

interface BlogPostClientProps {
  post: BlogPost;
  isPreview?: boolean;
}

export function BlogPostClient({ post, isPreview = false }: BlogPostClientProps) {
  const [headings, setHeadings] = useState<Array<{id: string, text: string, level: number}>>([]);
  const { isOpen, openForm, closeForm } = useFormPopup();

  // Increment view count on mount (client-side only)
  useEffect(() => {
    if (!isPreview && post.status === 'published') {
      supabase
        .from('blog_posts')
        .update({ view_count: (post.view_count || 0) + 1 })
        .eq('id', post.id)
        .then(() => {});
    }
  }, [post.id, post.status, post.view_count, isPreview]);

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

  // Extract headings from the rendered DOM, re-running on mutations until the
  // content stabilises. Handles async HTML rendering without racey setTimeouts.
  useEffect(() => {
    if (!post?.content) return;

    const extractHeadings = () => {
      const container = document.querySelector('.blog-content');
      if (!container) return;

      const headingElements = container.querySelectorAll('h1, h2, h3, h4');
      const extractedHeadings = Array.from(headingElements)
        .filter((heading) => {
          const isInCodeBlock = heading.closest('.code-block, .code-content');
          const isInCTABlock = heading.closest('.cta-block');
          return !isInCodeBlock && !isInCTABlock;
        })
        .map((heading, index) => {
          let id = heading.id;
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
            level: parseInt(heading.tagName.charAt(1)),
          };
        });

      setHeadings(prev => {
        if (prev.length !== extractedHeadings.length) return extractedHeadings;
        for (let i = 0; i < prev.length; i++) {
          if (prev[i].id !== extractedHeadings[i].id) return extractedHeadings;
        }
        return prev;
      });
    };

    extractHeadings();

    const container = document.querySelector('.blog-content');
    if (!container) return;

    const observer = new MutationObserver(extractHeadings);
    observer.observe(container, { childList: true, subtree: true });
    const stop = window.setTimeout(() => observer.disconnect(), 2000);

    return () => {
      observer.disconnect();
      window.clearTimeout(stop);
    };
  }, [post?.content]);

  return (
    <div className="min-h-screen bg-white">
      <Header onOpenForm={openForm} />
      
      {isPreview && (
        <div className="bg-yellow-100 border-b border-yellow-200 py-2 px-4">
          <div className="container mx-auto text-center">
            <span className="text-yellow-800 font-medium">
              Preview Mode - This is how your post will look when published
            </span>
          </div>
        </div>
      )}
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <div className="hidden lg:block w-80 flex-shrink-0">
            <BlogPostSidebar headings={headings} />
          </div>
          
          <div className="flex-1 max-w-4xl min-w-0">
            <BlogPostContent post={post} />
          </div>
        </div>
      </div>
      
      <Footer onOpenForm={openForm} />
      <FormPopup isOpen={isOpen} onClose={closeForm} />
    </div>
  );
}
