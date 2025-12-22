import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/integrations/supabase/server';
import { BlogPostClient } from '@/components/blog/BlogPostClient';

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

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const supabase = createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error || !data) {
    return null;
  }

  return data as BlogPost;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found | Total Authority',
      description: 'The blog post you are looking for could not be found.',
    };
  }

  const title = post.meta_title || post.title;
  const description = post.meta_description || post.excerpt;
  const canonicalUrl = post.canonical_url || `https://totalauthority.co/blog/${post.slug}`;
  const ogImage = post.og_image_url || post.featured_image_url || '/placeholder.svg';

  return {
    title: `${title} | Total Authority`,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'article',
      publishedTime: post.published_at,
      images: [
        {
          url: ogImage,
          alt: post.og_image_alt || post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: post.is_indexed ? 'index, follow' : 'noindex, nofollow',
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}
