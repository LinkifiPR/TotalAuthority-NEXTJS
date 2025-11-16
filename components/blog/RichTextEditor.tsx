"use client";


import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/lib/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Bold, 
  Italic, 
  Link, 
  Image, 
  Code, 
  List, 
  ListOrdered, 
  Table, 
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Upload
} from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  onImageUpload?: (url: string) => void;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content,
  onChange,
  onImageUpload
}) => {
  const [uploading, setUploading] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const insertText = (before: string, after: string = '', placeholder: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const textToInsert = selectedText || placeholder;
    
    const newContent = 
      content.substring(0, start) + 
      before + textToInsert + after + 
      content.substring(end);
    
    onChange(newContent);
    
    // Reset cursor position
    setTimeout(() => {
      if (selectedText) {
        textarea.setSelectionRange(start + before.length, start + before.length + textToInsert.length);
      } else {
        textarea.setSelectionRange(start + before.length, start + before.length + placeholder.length);
      }
      textarea.focus();
    }, 0);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `blog-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('blog-media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('blog-media')
        .getPublicUrl(filePath);

      const imageHtml = `<img src="${data.publicUrl}" alt="${imageAlt || file.name}" class="w-full rounded-lg my-4" />`;
      insertText(imageHtml);
      
      if (onImageUpload) {
        onImageUpload(data.publicUrl);
      }

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      setImageAlt('');
    }
  };

  const insertLink = () => {
    if (linkUrl && linkText) {
      insertText(`<a href="${linkUrl}" class="text-orange-500 hover:text-orange-600 underline">${linkText}</a>`);
      setLinkUrl('');
      setLinkText('');
      setShowLinkDialog(false);
    }
  };

  const insertImageUrl = () => {
    if (imageUrl) {
      const imageHtml = `<img src="${imageUrl}" alt="${imageAlt}" class="w-full rounded-lg my-4" />`;
      insertText(imageHtml);
      setImageUrl('');
      setImageAlt('');
      setShowImageDialog(false);
    }
  };

  const toolbarButtons = [
    { icon: Heading1, label: 'H1', action: () => insertText('<h1 id="', '" class="text-4xl font-bold text-gray-900 mb-4">', 'Heading 1') },
    { icon: Heading2, label: 'H2', action: () => insertText('<h2 id="', '" class="text-3xl font-bold text-gray-900 mb-3">', 'Heading 2') },
    { icon: Heading3, label: 'H3', action: () => insertText('<h3 id="', '" class="text-2xl font-bold text-gray-900 mb-2">', 'Heading 3') },
    { icon: Bold, label: 'Bold', action: () => insertText('<strong>', '</strong>', 'bold text') },
    { icon: Italic, label: 'Italic', action: () => insertText('<em>', '</em>', 'italic text') },
    { icon: Code, label: 'Code', action: () => insertText('<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">', '</code>', 'code') },
    { icon: List, label: 'Bullet List', action: () => insertText('<ul class="list-disc list-inside my-4">\n  <li>', '</li>\n  <li>Item 2</li>\n</ul>', 'Item 1') },
    { icon: ListOrdered, label: 'Numbered List', action: () => insertText('<ol class="list-decimal list-inside my-4">\n  <li>', '</li>\n  <li>Item 2</li>\n</ol>', 'Item 1') },
    { icon: Quote, label: 'Quote', action: () => insertText('<blockquote class="border-l-4 border-orange-500 pl-4 my-4 italic text-gray-700">', '</blockquote>', 'Quote text') },
  ];

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="border rounded-lg p-2">
        <div className="flex flex-wrap gap-2">
          {toolbarButtons.map((button, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={button.action}
              className="flex items-center gap-1"
            >
              <button.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{button.label}</span>
            </Button>
          ))}
          
          <Dialog open={showLinkDialog} onOpenChange={setShowLinkDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Link className="w-4 h-4" />
                <span className="hidden sm:inline">Link</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Insert Link</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="linkText">Link Text</Label>
                  <Input
                    id="linkText"
                    value={linkText}
                    onChange={(e) => setLinkText(e.target.value)}
                    placeholder="Click here"
                  />
                </div>
                <div>
                  <Label htmlFor="linkUrl">URL</Label>
                  <Input
                    id="linkUrl"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    placeholder="https://example.com"
                  />
                </div>
                <Button onClick={insertLink} className="w-full">
                  Insert Link
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Image className="w-4 h-4" />
                <span className="hidden sm:inline">Image URL</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Insert Image from URL</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input
                    id="imageUrl"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div>
                  <Label htmlFor="imageAlt">Alt Text</Label>
                  <Input
                    id="imageAlt"
                    value={imageAlt}
                    onChange={(e) => setImageAlt(e.target.value)}
                    placeholder="Description of the image"
                  />
                </div>
                <Button onClick={insertImageUrl} className="w-full">
                  Insert Image
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-1"
          >
            <Upload className="w-4 h-4" />
            <span className="hidden sm:inline">
              {uploading ? 'Uploading...' : 'Upload'}
            </span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => insertText('<table class="w-full border-collapse border border-gray-300 my-4">\n  <thead>\n    <tr class="bg-gray-50">\n      <th class="border border-gray-300 px-4 py-2 text-left">Header 1</th>\n      <th class="border border-gray-300 px-4 py-2 text-left">Header 2</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td class="border border-gray-300 px-4 py-2">Cell 1</td>\n      <td class="border border-gray-300 px-4 py-2">Cell 2</td>\n    </tr>\n  </tbody>\n</table>')}
            className="flex items-center gap-1"
          >
            <Table className="w-4 h-4" />
            <span className="hidden sm:inline">Table</span>
          </Button>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Content editor with visual preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="content">Content (HTML)</Label>
          <Textarea
            ref={textareaRef}
            id="content"
            value={content}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Start writing your content here..."
            rows={20}
            className="font-mono text-sm"
          />
        </div>
        
        <div>
          <Label>Live Preview</Label>
          <div className="border rounded-lg p-4 h-[500px] overflow-y-auto bg-white">
            <div 
              className="blog-content prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
