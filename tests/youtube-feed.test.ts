import test from 'node:test';
import assert from 'node:assert/strict';
import { parseYouTubeFeed } from '../lib/youtube-feed';

const sampleFeed = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns:yt="http://www.youtube.com/xml/schemas/2015" xmlns:media="http://search.yahoo.com/mrss/" xmlns="http://www.w3.org/2005/Atom">
  <title>Total Authority</title>
  <entry>
    <yt:videoId>abc123XYZ_0</yt:videoId>
    <title>AI Search Changed the Buyer Journey</title>
    <link rel="alternate" href="https://www.youtube.com/watch?v=abc123XYZ_0"/>
    <published>2026-05-27T12:09:20+00:00</published>
    <updated>2026-05-27T12:30:53+00:00</updated>
    <media:group>
      <media:thumbnail url="https://i.ytimg.com/vi/abc123XYZ_0/hqdefault.jpg" width="480" height="360"/>
      <media:description>How AI answers reshape brand discovery.</media:description>
      <media:community>
        <media:statistics views="42"/>
      </media:community>
    </media:group>
  </entry>
</feed>`;

test('parseYouTubeFeed extracts video metadata from YouTube RSS', () => {
  const videos = parseYouTubeFeed(sampleFeed);

  assert.equal(videos.length, 1);
  assert.deepEqual(videos[0], {
    id: 'abc123XYZ_0',
    title: 'AI Search Changed the Buyer Journey',
    url: 'https://www.youtube.com/watch?v=abc123XYZ_0',
    embedUrl: 'https://www.youtube.com/embed/abc123XYZ_0',
    thumbnailUrl: 'https://i.ytimg.com/vi/abc123XYZ_0/hqdefault.jpg',
    publishedAt: '2026-05-27T12:09:20+00:00',
    description: 'How AI answers reshape brand discovery.',
    views: 42,
  });
});
