
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

interface ImageEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (imageData: ImageData) => void;
  initialData?: Partial<ImageData>;
}

export interface ImageData {
  url: string;
  alt: string;
  title?: string;
  width?: string;
  height?: string;
  alignment: 'left' | 'center' | 'right';
  linkUrl?: string;
  linkNewTab: boolean;
  linkNofollow: boolean;
  linkSponsored: boolean;
}

export const ImageEditor: React.FC<ImageEditorProps> = ({
  isOpen,
  onClose,
  onInsert,
  initialData
}) => {
  const [imageData, setImageData] = useState<ImageData>({
    url: '',
    alt: '',
    title: '',
    width: '',
    height: '',
    alignment: 'center',
    linkUrl: '',
    linkNewTab: false,
    linkNofollow: false,
    linkSponsored: false
  });

  // Update form when initialData changes
  useEffect(() => {
    if (initialData) {
      setImageData({
        url: initialData.url || '',
        alt: initialData.alt || '',
        title: initialData.title || '',
        width: initialData.width || '',
        height: initialData.height || '',
        alignment: initialData.alignment || 'center',
        linkUrl: initialData.linkUrl || '',
        linkNewTab: initialData.linkNewTab || false,
        linkNofollow: initialData.linkNofollow || false,
        linkSponsored: initialData.linkSponsored || false
      });
    }
  }, [initialData]);

  const handleInsert = () => {
    if (!imageData.url || !imageData.alt) return;
    onInsert(imageData);
    handleClose();
  };

  const handleClose = () => {
    onClose();
    // Reset form
    setImageData({
      url: '',
      alt: '',
      title: '',
      width: '',
      height: '',
      alignment: 'center',
      linkUrl: '',
      linkNewTab: false,
      linkNofollow: false,
      linkSponsored: false
    });
  };

  const isUploadedImage = initialData?.url && initialData.url.includes('supabase');

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isUploadedImage ? 'Edit Image' : 'Insert/Edit Image'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Image URL - only show if not an uploaded image */}
          {!isUploadedImage && (
            <div>
              <Label htmlFor="imageUrl">Image URL *</Label>
              <Input
                id="imageUrl"
                value={imageData.url}
                onChange={(e) => setImageData({ ...imageData, url: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          )}

          {/* Show uploaded image info */}
          {isUploadedImage && imageData.url && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <Label className="text-sm font-medium mb-2 block">Uploaded Image</Label>
              <img
                src={imageData.url}
                alt={imageData.alt || 'Uploaded image'}
                className="max-w-full max-h-32 object-contain border rounded"
              />
            </div>
          )}

          {/* Alt Text */}
          <div>
            <Label htmlFor="altText">Alt Text (SEO & Accessibility) *</Label>
            <Textarea
              id="altText"
              value={imageData.alt}
              onChange={(e) => setImageData({ ...imageData, alt: e.target.value })}
              placeholder="Describe the image for accessibility and SEO"
              rows={2}
            />
          </div>

          {/* Title */}
          <div>
            <Label htmlFor="titleText">Title (Tooltip on hover)</Label>
            <Input
              id="titleText"
              value={imageData.title}
              onChange={(e) => setImageData({ ...imageData, title: e.target.value })}
              placeholder="Optional tooltip text"
            />
          </div>

          {/* Size Options */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                value={imageData.width}
                onChange={(e) => setImageData({ ...imageData, width: e.target.value })}
                placeholder="e.g., 300px, 50%, auto"
              />
            </div>
            <div>
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                value={imageData.height}
                onChange={(e) => setImageData({ ...imageData, height: e.target.value })}
                placeholder="e.g., 200px, auto"
              />
            </div>
          </div>

          {/* Alignment */}
          <div>
            <Label htmlFor="alignment">Alignment</Label>
            <Select value={imageData.alignment} onValueChange={(value: 'left' | 'center' | 'right') => setImageData({ ...imageData, alignment: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="center">Center</SelectItem>
                <SelectItem value="right">Right</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Link Options */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="linkUrl">Link URL (Make image clickable)</Label>
              <Input
                id="linkUrl"
                value={imageData.linkUrl}
                onChange={(e) => setImageData({ ...imageData, linkUrl: e.target.value })}
                placeholder="https://example.com (optional)"
              />
            </div>

            {imageData.linkUrl && (
              <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-sm">Link Options</h4>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="linkNewTab" className="text-sm font-medium">
                    Open in new tab
                  </Label>
                  <Switch
                    id="linkNewTab"
                    checked={imageData.linkNewTab}
                    onCheckedChange={(checked) => setImageData({ ...imageData, linkNewTab: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="linkNofollow" className="text-sm font-medium">
                    Add nofollow
                  </Label>
                  <Switch
                    id="linkNofollow"
                    checked={imageData.linkNofollow}
                    onCheckedChange={(checked) => setImageData({ ...imageData, linkNofollow: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="linkSponsored" className="text-sm font-medium">
                    Mark as sponsored
                  </Label>
                  <Switch
                    id="linkSponsored"
                    checked={imageData.linkSponsored}
                    onCheckedChange={(checked) => setImageData({ ...imageData, linkSponsored: checked })}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Preview */}
          {imageData.url && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <Label className="text-sm font-medium mb-2 block">Preview</Label>
              <div className={`flex ${imageData.alignment === 'left' ? 'justify-start' : imageData.alignment === 'right' ? 'justify-end' : 'justify-center'}`}>
                <img
                  src={imageData.url}
                  alt={imageData.alt}
                  title={imageData.title}
                  style={{
                    width: imageData.width || 'auto',
                    height: imageData.height || 'auto',
                    maxWidth: '300px',
                    maxHeight: '200px'
                  }}
                  className="border rounded"
                />
              </div>
            </div>
          )}

          <Button onClick={handleInsert} className="w-full" disabled={!imageData.url || !imageData.alt}>
            {isUploadedImage ? 'Update Image' : 'Insert Image'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
