
import { useState, useRef } from 'react';
import { supabase } from '@/lib/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ImageData } from '../ImageEditor';

export const useImageEditor = () => {
  const [uploading, setUploading] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [showImageEditor, setShowImageEditor] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [imageToEdit, setImageToEdit] = useState<ImageData | null>(null);
  const [editingImageElement, setEditingImageElement] = useState<Element | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const savedRange = useRef<Range | null>(null);
  const { toast } = useToast();

  // Save current cursor position before opening dialog
  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      savedRange.current = selection.getRangeAt(0).cloneRange();
      console.log('Cursor position saved');
    }
  };

  // Restore cursor position before inserting
  const restoreSelection = () => {
    if (savedRange.current) {
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(savedRange.current);
        console.log('Cursor position restored');
        return true;
      }
    }
    return false;
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        throw new Error('You must be logged in to upload images');
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `blog-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('blog-media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('blog-media')
        .getPublicUrl(filePath);

      // Open the image editor with the uploaded URL and auto-generated alt text
      setImageUrl(data.publicUrl);
      setImageAlt(file.name.split('.')[0].replace(/[-_]/g, ' '));
      setImageToEdit(null); // Clear any existing edit data
      setEditingImageElement(null);
      setShowImageEditor(true);

      toast({
        title: "Success",
        description: "Image uploaded successfully. Configure your image settings.",
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
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const insertImage = (imageData: ImageData, editorRef: React.RefObject<HTMLDivElement>, onChange: () => void, addRemoveButtonsToImages: () => void) => {
    console.log('insertImage called with:', { imageData, editorRef: !!editorRef.current, isEditing: !!editingImageElement });
    
    if (!imageData.url || !editorRef.current) {
      console.error('Missing required data for image insertion:', { url: imageData.url, editor: !!editorRef.current });
      return;
    }

    // Focus the editor to ensure it's active
    editorRef.current.focus();

    // Build image styles
    const styles = [
      'border-radius: 8px',
      'max-width: 100%',
      'height: auto',
      'display: block'
    ];

    if (imageData.width) styles.push(`width: ${imageData.width}`);
    if (imageData.height) styles.push(`height: ${imageData.height}`);
    
    // Add alignment styles
    const alignmentStyles = {
      left: 'margin-right: auto; margin-left: 0',
      center: 'margin-left: auto; margin-right: auto',
      right: 'margin-left: auto; margin-right: 0'
    };
    styles.push(alignmentStyles[imageData.alignment]);

    // Create a unique data attribute for editing
    const imageId = `img-${Date.now()}-${Math.random().toString(36).substring(2)}`;
    
    // Create image element using DOM API
    const img = document.createElement('img');
    img.src = imageData.url;
    img.alt = imageData.alt;
    if (imageData.title) img.title = imageData.title;
    img.style.cssText = styles.join('; ');
    img.setAttribute('data-image-id', imageId);
    img.setAttribute('data-image-data', JSON.stringify(imageData));
    
    // Wrap in link if specified
    let imageElement: HTMLElement = img;
    if (imageData.linkUrl) {
      const link = document.createElement('a');
      link.href = imageData.linkUrl;
      
      const relParts = [];
      if (imageData.linkNofollow) relParts.push('nofollow');
      if (imageData.linkSponsored) relParts.push('sponsored');
      if (relParts.length > 0) link.rel = relParts.join(' ');
      if (imageData.linkNewTab) link.target = '_blank';
      
      link.appendChild(img);
      imageElement = link;
    }

    // Create container div
    const container = document.createElement('div');
    container.className = 'image-container';
    container.style.cssText = 'margin: 16px 0; display: block; position: relative;';
    container.appendChild(imageElement);

    try {
      if (editingImageElement) {
        // Replace existing image
        console.log('Replacing existing image');
        editingImageElement.replaceWith(container);
        setEditingImageElement(null);
      } else {
        // Insert new image at cursor position
        const selection = window.getSelection();
        let insertionSuccessful = false;

        // Try to restore saved cursor position first
        if (restoreSelection()) {
          const range = selection?.getRangeAt(0);
          if (range) {
            console.log('Inserting at restored cursor position');
            range.deleteContents();
            range.insertNode(container);
            
            // Move cursor after the inserted image
            range.setStartAfter(container);
            range.collapse(true);
            selection?.removeAllRanges();
            selection?.addRange(range);
            insertionSuccessful = true;
          }
        }

        // Fallback: if no saved position or restoration failed
        if (!insertionSuccessful) {
          if (selection && selection.rangeCount > 0) {
            console.log('Inserting at current cursor position');
            const range = selection.getRangeAt(0);
            range.deleteContents();
            range.insertNode(container);
            
            // Move cursor after the inserted image
            range.setStartAfter(container);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
          } else {
            console.log('No cursor position, appending to end');
            editorRef.current.appendChild(container);
          }
        }
      }
      
      console.log('Image inserted using DOM selection');
      
    } catch (error) {
      console.error('Error inserting image:', error);
      // Final fallback
      editorRef.current.appendChild(container);
    }
    
    // Clear saved range after use
    savedRange.current = null;
    
    // Trigger onChange to sync with React state
    onChange();
    
    // Add management buttons after a delay
    setTimeout(() => addRemoveButtonsToImages(), 200);

    // Clear form
    setImageUrl('');
    setImageAlt('');
    setImageToEdit(null);
    setShowImageEditor(false);
    
    console.log('Image insertion completed');
  };

  const insertImageUrl = () => {
    if (!imageUrl) return;
    setImageToEdit(null); // Clear any existing edit data
    setEditingImageElement(null);
    setShowImageEditor(true);
  };

  const startImageEdit = (imageData: ImageData, imageElement: Element) => {
    console.log('Starting image edit with data:', imageData);
    setImageToEdit(imageData);
    setEditingImageElement(imageElement);
    setImageUrl(imageData.url);
    setImageAlt(imageData.alt);
    setShowImageEditor(true);
  };

  return {
    uploading,
    showImageDialog,
    setShowImageDialog,
    showImageEditor,
    setShowImageEditor,
    imageUrl,
    setImageUrl,
    imageAlt,
    setImageAlt,
    imageToEdit,
    fileInputRef,
    handleImageUpload,
    insertImageUrl,
    insertImage,
    saveSelection,
    startImageEdit
  };
};
