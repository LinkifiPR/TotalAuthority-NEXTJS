"use client";


import React, { useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Eye, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  published_at: string;
  featured_image_url?: string;
  featured_image_alt?: string;
  view_count: number;
  reading_time?: number;
  tags: string[];
  author_name?: string;
}

interface BlogPostContentProps {
  post: BlogPost;
}

export const BlogPostContent: React.FC<BlogPostContentProps> = ({ post }) => {
  const router = useRouter();
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleTagClick = (tag: string) => {
    router.push(`/insights?tag=${encodeURIComponent(tag)}`);
  };

  // Content processing - clean up editor elements (SSR-safe, no DOM APIs)
  const processContent = (content: string) => {
    if (!content) return '';
    
    let processed = content;
    
    // Remove editor buttons and controls using regex (SSR-safe)
    processed = processed.replace(/<button[^>]*class="[^"]*editor[^"]*"[^>]*>[\s\S]*?<\/button>/gi, '');
    processed = processed.replace(/<button[^>]*>[\s\S]*?remove[\s\S]*?<\/button>/gi, '');
    processed = processed.replace(/<div[^>]*class="[^"]*button-overlay[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');
    processed = processed.replace(/<div[^>]*class="[^"]*editor-overlay[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');
    
    // Remove data attributes related to editor functionality
    processed = processed.replace(/\s*data-has-buttons="[^"]*"/gi, '');
    processed = processed.replace(/\s*data-editor-active="[^"]*"/gi, '');
    processed = processed.replace(/\s*data-button-overlay="[^"]*"/gi, '');
    
    return processed;
  };

  // Function to inject MailerLite scripts when form is detected
  const injectMailerLiteScripts = (formId: string) => {
    console.log('Injecting MailerLite scripts for form:', formId);
    
    // Inject the external MailerLite script
    const externalScript = document.createElement('script');
    externalScript.src = 'https://groot.mailerlite.com/js/w/webforms.min.js?v2d8fb22bb5b3677f161552cd9e774127';
    externalScript.type = 'text/javascript';
    externalScript.onload = () => {
      console.log('MailerLite external script loaded successfully');
    };
    externalScript.onerror = () => {
      console.error('Failed to load MailerLite external script');
    };
    document.head.appendChild(externalScript);
    
    // Inject the success function and fetch script
    const inlineScript = document.createElement('script');
    inlineScript.innerHTML = `
      function ml_webform_success_${formId}() {
        var $ = ml_jQuery || jQuery;
        $('.ml-subscribe-form-${formId} .row-success').show();
        $('.ml-subscribe-form-${formId} .row-form').hide();
      }
      
      fetch("https://assets.mailerlite.com/jsonp/125485/forms/134607145966503167/takel");
    `;
    document.head.appendChild(inlineScript);
    
    console.log('MailerLite inline scripts injected for form:', formId);
  };

  // Function to inject and execute scripts from HTML content
  const injectScripts = (containerElement: HTMLElement) => {
    const scripts = containerElement.querySelectorAll('script');
    console.log('Found scripts to inject:', scripts.length);
    
    scripts.forEach((oldScript, index) => {
      console.log(`Injecting script ${index + 1}:`, {
        src: oldScript.getAttribute('src'),
        hasContent: !!oldScript.textContent,
        type: oldScript.getAttribute('type')
      });
      
      const newScript = document.createElement('script');
      
      // Copy all attributes
      Array.from(oldScript.attributes).forEach(attr => {
        newScript.setAttribute(attr.name, attr.value);
      });
      
      if (oldScript.src) {
        newScript.src = oldScript.src;
        newScript.onload = () => {
          console.log('External script loaded successfully:', oldScript.src);
        };
        newScript.onerror = () => {
          console.error('Failed to load external script:', oldScript.src);
        };
      } else {
        newScript.textContent = oldScript.textContent;
      }
      
      // Replace the old script with the new one
      oldScript.replaceWith(newScript);
      console.log('Script replaced and should now execute');
    });
  };

  // Check for MailerLite forms and inject required scripts
  const handleMailerLiteForms = (containerElement: HTMLElement) => {
    // Look for MailerLite forms
    const mlForms = containerElement.querySelectorAll('[id*="mlb2-"]');
    console.log('Found MailerLite forms:', mlForms.length);
    
    mlForms.forEach((form) => {
      const formElement = form as HTMLElement;
      const formId = formElement.id;
      console.log('Processing MailerLite form:', formId);
      
      // Extract the numeric ID from the form ID (e.g., "mlb2-18708577" -> "18708577")
      const numericId = formId.replace('mlb2-', '');
      
      // Check if scripts are already injected for this form
      if (!document.querySelector(`script[data-ml-form="${numericId}"]`)) {
        console.log('Injecting MailerLite scripts for form ID:', numericId);
        injectMailerLiteScripts(numericId);
        
        // Mark that we've injected scripts for this form
        const marker = document.createElement('script');
        marker.setAttribute('data-ml-form', numericId);
        marker.textContent = '// MailerLite scripts injected';
        document.head.appendChild(marker);
      } else {
        console.log('MailerLite scripts already injected for form:', numericId);
      }
    });
  };

  // Execute scripts after content is rendered
  useEffect(() => {
    if (post?.content) {
      console.log('Setting up script execution for post content...');
      
      // Wait for content to be rendered, then inject scripts
      const timer = setTimeout(() => {
        const blogContent = document.querySelector('.blog-content');
        if (!blogContent) {
          console.log('Blog content container not found');
          return;
        }
        
        console.log('Processing blog content for scripts...');
        
        // First, inject any regular scripts that might be in the content
        injectScripts(blogContent as HTMLElement);
        
        // Then, handle MailerLite forms specifically
        handleMailerLiteForms(blogContent as HTMLElement);
        
        // Additional check for MailerLite forms after a delay
        setTimeout(() => {
          const mlForms = document.querySelectorAll('[id*="mlb2-"]');
          if (mlForms.length > 0) {
            console.log('Final check - MailerLite forms after script injection:', mlForms.length);
            mlForms.forEach((form, index) => {
              const formElement = form as HTMLElement;
              console.log(`MailerLite form ${index + 1}:`, {
                id: formElement.id,
                visible: formElement.offsetHeight > 0 && formElement.offsetWidth > 0,
                display: window.getComputedStyle(formElement).display,
                hasContent: formElement.innerHTML.length > 0
              });
            });
          } else {
            console.log('No MailerLite forms found in final check');
          }
        }, 2000);
        
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [post?.content]);

  // Auto-generate IDs for headings that don't have them
  useEffect(() => {
    const generateHeadingIds = () => {
      const headings = document.querySelectorAll('.blog-content h1, .blog-content h2, .blog-content h3, .blog-content h4');
      headings.forEach((heading, index) => {
        if (!heading.id) {
          const text = heading.textContent || '';
          const id = text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '') || `heading-${index}`;
          heading.id = id;
        }
      });
    };

    // Run after content is rendered
    const timer = setTimeout(generateHeadingIds, 100);
    return () => clearTimeout(timer);
  }, [post.content]);

  return (
    <article className="blog-content w-full">
      {/* Featured Image - Standalone */}
      {post.featured_image_url && (
        <div className="relative mb-6 md:mb-8 px-4 md:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] w-full overflow-hidden rounded-xl md:rounded-2xl shadow-lg md:shadow-2xl">
            <img
              src={post.featured_image_url}
              alt={post.featured_image_alt || post.title}
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </div>
        </div>
      )}

      {/* Header Content - Below Image */}
      <div className="max-w-4xl mx-auto mb-12 px-4 md:px-6 lg:px-0">
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.slice(0, 3).map((tag, index) => (
              <Badge 
                key={index} 
                variant="secondary"
                className="bg-orange-100 text-orange-800 hover:bg-orange-200 cursor-pointer transition-colors"
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        {/* Title */}
        <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-black mb-6 leading-tight">
          {post.title}
        </h1>
        
        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl">
            {post.excerpt}
          </p>
        )}
        
        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 pb-8 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(post.published_at)}</span>
          </div>
          
          {post.reading_time && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.reading_time} min read</span>
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{post.author_name || 'TotalAuthority Team'}</span>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-0">
        <div 
          className="blog-content blog-prose w-full"
          dangerouslySetInnerHTML={{ __html: processContent(post.content) }}
        />
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          .blog-prose {
            font-size: 1.125rem;
            line-height: 1.75;
            color: #374151;
          }
          
          /* Heading styles for blog content - use !important to override inline styles */
          .blog-prose h1,
          .blog-prose h1 span {
            font-size: 2.25rem !important;
            font-weight: 700 !important;
            color: #111827 !important;
            margin-top: 2rem !important;
            margin-bottom: 1rem !important;
            line-height: 1.3 !important;
            font-family: inherit !important;
            background: none !important;
          }
          
          .blog-prose h2,
          .blog-prose h2 span {
            font-size: 1.875rem !important;
            font-weight: 700 !important;
            color: #111827 !important;
            margin-top: 1.75rem !important;
            margin-bottom: 0.75rem !important;
            line-height: 1.3 !important;
            font-family: inherit !important;
            background: none !important;
          }
          
          .blog-prose h3,
          .blog-prose h3 span {
            font-size: 1.5rem !important;
            font-weight: 600 !important;
            color: #1f2937 !important;
            margin-top: 1.5rem !important;
            margin-bottom: 0.5rem !important;
            line-height: 1.4 !important;
            font-family: inherit !important;
            background: none !important;
          }
          
          .blog-prose h4,
          .blog-prose h4 span {
            font-size: 1.25rem !important;
            font-weight: 600 !important;
            color: #374151 !important;
            margin-top: 1.25rem !important;
            margin-bottom: 0.5rem !important;
            line-height: 1.4 !important;
            font-family: inherit !important;
            background: none !important;
          }
          
          .blog-prose p { 
            margin: 1rem 0; 
            line-height: 1.75; 
          }
          
          .blog-prose ul { 
            margin: 1rem 0; 
            padding-left: 1.25rem;
            list-style: disc;
            list-style-position: outside;
          }
          
          .blog-prose ol { 
            margin: 1rem 0; 
            padding-left: 1.5rem; 
            list-style: decimal; 
            list-style-position: outside;
          }
          
          .blog-prose li { 
            margin: 0.5rem 0; 
          }
          
          .blog-prose a { 
            color: #f97316; 
            text-decoration: underline; 
            font-weight: 500;
          }
          
          .blog-prose strong { 
            font-weight: 600; 
          }
          
          .blog-prose em { 
            font-style: italic; 
          }
          
          .blog-prose blockquote { 
            border-left: 4px solid #e5e7eb; 
            padding-left: 1rem; 
            margin: 1.5rem 0; 
            font-style: italic; 
            color: #6b7280; 
          }
          
          /* Hide ALL editor buttons and controls in published content */
          .blog-content .editor-remove-btn,
          .blog-content .editor-edit-btn,
          .blog-content .cta-remove-btn,
          .blog-content .youtube-embed button,
          .blog-content .youtube-embed .editor-btn,
          .blog-content .youtube-embed .btn,
          .blog-content .youtube-embed .button-overlay,
          .blog-content .youtube-embed .editor-overlay,
          .blog-content .youtube-embed .button-container {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            pointer-events: none !important;
          }
          
          .blog-content .cta-block .editor-remove-btn,
          .blog-content .cta-block button[onclick*="remove"],
          .blog-content .cta-block .cta-remove-btn {
            display: none !important;
          }
          
          /* Image handling - use global styles */
          .blog-content .image-container {
            margin: 16px 0;
            display: block;
            position: relative;
          }
          
          /* YouTube embed styling - ensure proper display */
          .blog-content .youtube-embed {
            margin: 24px 0 !important;
            display: block !important;
            width: 100% !important;
            position: relative !important;
          }
          
          .blog-content .youtube-embed iframe {
            width: 100% !important;
            height: auto !important;
            aspect-ratio: 16/9 !important;
            border-radius: 8px !important;
            border: none !important;
          }
          
          .blog-content .youtube-embed .relative {
            position: relative !important;
            width: 100% !important;
            padding-bottom: 56.25% !important;
            height: 0 !important;
            overflow: hidden !important;
            border-radius: 8px !important;
          }
          
          .blog-content .youtube-embed .relative iframe {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
          }
          
          .blog-content .youtube-caption {
            margin-top: 8px;
            text-align: center;
            font-size: 14px;
            color: #6b7280;
            font-style: italic;
          }
        `
      }} />
    </article>
  );
};
