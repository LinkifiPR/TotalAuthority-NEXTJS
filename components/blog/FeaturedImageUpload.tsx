"use client";


import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface FeaturedImageUploadProps {
  imageUrl?: string;
  imageAlt?: string;
  onImageChange: (url: string, alt: string) => void;
  onImageRemove: () => void;
}

export const FeaturedImageUpload: React.FC<FeaturedImageUploadProps> = ({
  imageUrl,
  imageAlt,
  onImageChange,
  onImageRemove
}) => {
  const [uploading, setUploading] = useState(false);
  const [altText, setAltText] = useState(imageAlt || '');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log('Starting featured image upload...', file.name, file.size);
    setUploading(true);
    
    try {
      // Get current session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('Session error:', sessionError);
        throw new Error('Authentication session error');
      }

      if (!session || !session.user) {
        console.error('No active session or user');
        throw new Error('You must be logged in to upload images. Please refresh the page and try again.');
      }

      console.log('User authenticated:', session.user.id);

      const fileExt = file.name.split('.').pop();
      const fileName = `featured-${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `featured-images/${fileName}`;

      console.log('Uploading to path:', filePath);

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('blog-media')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      console.log('Upload successful:', uploadData);

      const { data: urlData } = supabase.storage
        .from('blog-media')
        .getPublicUrl(filePath);

      console.log('Public URL:', urlData.publicUrl);

      const finalAltText = altText || file.name.split('.')[0];
      onImageChange(urlData.publicUrl, finalAltText);

      toast({
        title: "Success",
        description: "Featured image uploaded successfully",
      });
    } catch (error: any) {
      console.error('Error uploading featured image:', error);
      toast({
        title: "Upload Error", 
        description: error.message || "Failed to upload featured image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      // Clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleAltTextChange = (newAltText: string) => {
    setAltText(newAltText);
    if (imageUrl) {
      onImageChange(imageUrl, newAltText);
    }
  };

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardContent className="p-4">
        <div className="space-y-4">
          <Label className="text-sm font-medium text-gray-900">Featured Image</Label>
          
          {imageUrl ? (
            <div className="space-y-3">
              <div className="relative">
                <img
                  src={imageUrl}
                  alt={altText}
                  className="w-full h-48 object-cover rounded-lg border"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={onImageRemove}
                  className="absolute top-2 right-2 h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div>
                <Label htmlFor="altText" className="text-sm font-medium text-gray-700">Alt Text</Label>
                <Input
                  id="altText"
                  value={altText}
                  onChange={(e) => handleAltTextChange(e.target.value)}
                  placeholder="Describe the image for accessibility"
                  className="mt-1"
                />
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50 hover:bg-gray-100 transition-colors">
              <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <div className="space-y-3">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="w-full bg-orange-500 hover:bg-orange-600"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {uploading ? 'Uploading...' : 'Upload Featured Image'}
                </Button>
                <p className="text-xs text-gray-500 leading-tight">
                  Recommended size: 1200x630px for optimal social sharing
                </p>
              </div>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
      </CardContent>
    </Card>
  );
};
