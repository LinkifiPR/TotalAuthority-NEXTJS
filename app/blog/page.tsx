import { Metadata } from 'next';
import { createServerSupabaseClient, isServerSupabaseConfigured } from '@/lib/integrations/supabase/server';
import { BlogListClient } from '@/components/blog/BlogListClient';

// ISR: serve a pre-rendered page instantly from cache and refresh it from the
// DB in the background every 5 minutes. The blog list has no per-request /
// cookie state, so it no longer needs to block on Supabase on every request.
export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Latest Articles | Total Authority',
  description: 'Explore our latest insights on AI visibility, PR strategies, and marketing best practices to help your brand get discovered by AI systems.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Latest Articles | Total Authority',
    description: 'Explore our latest insights on AI visibility, PR strategies, and marketing best practices.',
    url: '/blog',
    type: 'website',
  },
};

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  published_at: string;
  featured_image_url?: string;
  featured_image_alt?: string;
  view_count: number;
  reading_time?: number;
  tags: string[];
}

async function getBlogPosts(): Promise<BlogPost[]> {
  if (!isServerSupabaseConfigured()) {
    return [];
  }

  try {
    const supabase = createServerSupabaseClient();

    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, title, slug, excerpt, published_at, featured_image_url, featured_image_alt, view_count, reading_time, tags')
      .eq('status', 'published')
      .eq('is_indexed', true)
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }

    return (data || []) as BlogPost[];
  } catch (err) {
    // Never let a transient DB/network error fail the build or the page render.
    console.error('Error fetching blog posts:', err);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts();
  
  // Extract all unique tags for filtering
  const allTags = new Set<string>();
  posts.forEach(post => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach((tag: string) => allTags.add(tag));
    }
  });
  const availableTags = Array.from(allTags).sort();

  return <BlogListClient initialPosts={posts} availableTags={availableTags} basePath="/blog" />;
}
