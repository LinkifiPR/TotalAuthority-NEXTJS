import type { Metadata } from 'next';
import { PodcastPageClient } from './PodcastPageClient';
import { getPodcastVideoSelection, getTotalAuthorityYouTubeVideos } from '@/lib/youtube-feed';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Podcast | Total Authority',
  description: 'Watch the latest TotalAuthority videos on AI visibility, LLM search, digital PR, and brand authority.',
  alternates: {
    canonical: '/podcast',
  },
  openGraph: {
    title: 'Podcast | Total Authority',
    description: 'Latest TotalAuthority YouTube videos on AI visibility, LLM search, digital PR, and brand authority.',
    url: '/podcast',
    type: 'website',
  },
};

export default async function PodcastPage() {
  try {
    const videos = await getTotalAuthorityYouTubeVideos();
    const { featuredVideo, episodeVideos } = getPodcastVideoSelection(videos);
    const selectedVideos = featuredVideo ? [featuredVideo, ...episodeVideos] : [];

    return <PodcastPageClient videos={selectedVideos} />;
  } catch (error) {
    console.error('Failed to load podcast videos:', error);
    return <PodcastPageClient videos={[]} feedError />;
  }
}
