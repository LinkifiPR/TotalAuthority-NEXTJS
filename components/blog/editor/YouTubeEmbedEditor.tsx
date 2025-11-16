import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Youtube } from 'lucide-react';

export interface YouTubeEmbedData {
  id: string;
  url: string;
  videoId: string;
  caption?: string;
}

interface YouTubeEmbedEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (data: YouTubeEmbedData) => void;
  initialData?: YouTubeEmbedData;
}

const extractVideoId = (url: string): string | null => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export const YouTubeEmbedEditor: React.FC<YouTubeEmbedEditorProps> = ({
  isOpen,
  onClose,
  onInsert,
  initialData
}) => {
  const [url, setUrl] = useState(initialData?.url || '');
  const [caption, setCaption] = useState(initialData?.caption || '');
  const [videoId, setVideoId] = useState(initialData?.videoId || '');

  useEffect(() => {
    if (url) {
      const id = extractVideoId(url);
      setVideoId(id || '');
    } else {
      setVideoId('');
    }
  }, [url]);

  const handleInsert = () => {
    if (!url.trim() || !videoId) return;

    const embedData: YouTubeEmbedData = {
      id: initialData?.id || `youtube-${Date.now()}`,
      url: url.trim(),
      videoId,
      caption: caption.trim()
    };

    onInsert(embedData);
    onClose();
  };

  const handleClose = () => {
    setUrl(initialData?.url || '');
    setCaption(initialData?.caption || '');
    setVideoId(initialData?.videoId || '');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Youtube className="w-5 h-5" />
            {initialData ? 'Edit YouTube Video' : 'Embed YouTube Video'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="youtube-url">YouTube URL</Label>
            <Input
              id="youtube-url"
              type="url"
              placeholder="https://www.youtube.com/watch?v=..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            {url && !videoId && (
              <p className="text-sm text-red-600 mt-1">Invalid YouTube URL</p>
            )}
          </div>

          <div>
            <Label htmlFor="youtube-caption">Caption (Optional)</Label>
            <Textarea
              id="youtube-caption"
              placeholder="Add a caption to describe this video..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={2}
            />
          </div>

          {videoId && (
            <div>
              <Label>Preview</Label>
              <div className="border rounded-lg overflow-hidden">
                <div className="relative w-full h-0 pb-[56.25%]">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube video preview"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                {caption && (
                  <div className="p-3 bg-gray-50">
                    <p className="text-sm text-gray-600 italic">{caption}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleInsert} disabled={!videoId}>
              {initialData ? 'Update' : 'Insert'} Video
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};