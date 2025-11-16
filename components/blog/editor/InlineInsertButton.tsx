
import React, { useState } from 'react';
import { Plus, Image, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ImageEditor, ImageData } from './ImageEditor';

interface InlineInsertButtonProps {
  onInsertImage: (imageData: ImageData) => void;
  onImageUpload: () => void;
  uploading: boolean;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  position: { top: number; left: number };
  visible: boolean;
  setIsHoveringButton: (hovering: boolean) => void;
}

export const InlineInsertButton: React.FC<InlineInsertButtonProps> = ({
  onInsertImage,
  onImageUpload,
  uploading,
  isOpen,
  onOpenChange,
  position,
  visible,
  setIsHoveringButton
}) => {
  const [showImageEditor, setShowImageEditor] = useState(false);

  const handleImageUpload = () => {
    onImageUpload();
    onOpenChange(false);
  };

  const handleImageUrl = () => {
    setShowImageEditor(true);
    onOpenChange(false);
  };

  const handleImageInsert = (imageData: ImageData) => {
    onInsertImage(imageData);
    setShowImageEditor(false);
  };

  if (!visible) return null;

  return (
    <>
      <div 
        className="absolute z-50 pointer-events-auto"
        style={{ 
          top: position.top, 
          left: position.left,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.2s ease-in-out'
        }}
        onMouseEnter={() => {
          console.log('Button container mouse enter - setting hover true');
          setIsHoveringButton(true);
        }}
        onMouseLeave={() => {
          console.log('Button container mouse leave - setting hover false');
          setIsHoveringButton(false);
        }}
      >
        <Popover open={isOpen} onOpenChange={onOpenChange}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="w-8 h-8 p-0 rounded-full border-gray-300 bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl"
              onMouseEnter={() => {
                console.log('Button mouse enter - setting hover true');
                setIsHoveringButton(true);
              }}
              onMouseLeave={() => {
                console.log('Button mouse leave - setting hover false');
                setIsHoveringButton(false);
              }}
              onClick={(e) => {
                console.log('Button clicked');
                e.stopPropagation();
              }}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-2" align="start">
            <div className="space-y-1">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
                onClick={handleImageUpload}
                disabled={uploading}
              >
                <Upload className="w-4 h-4 mr-2" />
                {uploading ? 'Uploading...' : 'Upload Image'}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
                onClick={handleImageUrl}
              >
                <Image className="w-4 h-4 mr-2" />
                Image URL
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <ImageEditor
        isOpen={showImageEditor}
        onClose={() => setShowImageEditor(false)}
        onInsert={handleImageInsert}
        initialData={undefined}
      />
    </>
  );
};
