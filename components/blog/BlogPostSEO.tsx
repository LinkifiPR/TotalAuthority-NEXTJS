"use client";


import React from 'react';
import { Helmet } from 'react-helmet-async';
import { buildAbsoluteUrl } from '@/lib/siteConfig';

interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  meta_title?: string;
  meta_description?: string;
  og_image_url?: string;
  og_image_alt?: string;
  canonical_url?: string;
  is_indexed: boolean;
  published_at: string;
}

interface BlogPostSEOProps {
  post: BlogPost;
}

export const BlogPostSEO: React.FC<BlogPostSEOProps> = ({ post }) => {
  const pageTitle = post.meta_title || post.title;
  const description = post.meta_description || post.excerpt;
  const canonicalUrl = post.canonical_url || buildAbsoluteUrl(`/blog/${post.slug}`);
  const ogImage = post.og_image_url || '/placeholder.svg';
  const ogImageAlt = post.og_image_alt || post.title;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": description,
    "url": canonicalUrl,
    "datePublished": post.published_at,
    "author": {
      "@type": "Organization",
      "name": "Total Authority"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Total Authority",
      "logo": {
        "@type": "ImageObject",
        "url": buildAbsoluteUrl('/placeholder.svg')
      }
    },
    "image": ogImage
  };

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      
      {!post.is_indexed && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={ogImageAlt} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={ogImageAlt} />
      
      {/* Article specific meta */}
      <meta property="article:published_time" content={post.published_at} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};
