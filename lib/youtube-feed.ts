import * as cheerio from 'cheerio';

export const TOTAL_AUTHORITY_YOUTUBE_CHANNEL_ID = 'UCVn4DAbIvM0huIvIBPeRVhQ';
export const TOTAL_AUTHORITY_YOUTUBE_FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${TOTAL_AUTHORITY_YOUTUBE_CHANNEL_ID}`;
export const TOTAL_AUTHORITY_YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@Total-Authority';

export interface YouTubeVideo {
  id: string;
  title: string;
  url: string;
  embedUrl: string;
  thumbnailUrl: string;
  publishedAt: string;
  description: string;
  views: number;
}

export function parseYouTubeFeed(feedXml: string): YouTubeVideo[] {
  const $ = cheerio.load(feedXml, { xmlMode: true });

  return $('entry')
    .map((_, entry) => {
      const videoId = $(entry).find('yt\\:videoId').first().text().trim();
      if (!videoId) {
        return null;
      }

      const title = $(entry).find('title').first().text().trim();
      const url = $(entry).find('link[rel="alternate"]').first().attr('href')?.trim() || `https://www.youtube.com/watch?v=${videoId}`;
      const thumbnailUrl =
        $(entry).find('media\\:thumbnail').first().attr('url')?.trim() || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
      const publishedAt = $(entry).find('published').first().text().trim();
      const description = $(entry).find('media\\:description').first().text().trim();
      const views = Number.parseInt($(entry).find('media\\:statistics').first().attr('views') || '0', 10);

      return {
        id: videoId,
        title,
        url,
        embedUrl: `https://www.youtube.com/embed/${videoId}`,
        thumbnailUrl,
        publishedAt,
        description,
        views: Number.isFinite(views) ? views : 0,
      };
    })
    .get()
    .filter((video): video is YouTubeVideo => Boolean(video));
}

export async function getTotalAuthorityYouTubeVideos(): Promise<YouTubeVideo[]> {
  const response = await fetch(TOTAL_AUTHORITY_YOUTUBE_FEED_URL, {
    next: { revalidate: 3600 },
    headers: {
      accept: 'application/atom+xml, application/xml;q=0.9, text/xml;q=0.8',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch YouTube feed: ${response.status}`);
  }

  return parseYouTubeFeed(await response.text());
}
