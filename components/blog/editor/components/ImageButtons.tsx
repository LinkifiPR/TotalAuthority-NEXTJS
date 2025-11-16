import React from 'react';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

interface ImageButtonsProps {
  onImageUpload: () => void;
  uploading: boolean;
}

export const ImageButtons: React.FC<ImageButtonsProps> = ({
  onImageUpload,
  uploading
}) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onImageUpload}
      disabled={uploading}
      className="flex items-center gap-2 bg-white hover:bg-gray-100"
      type="button"
    >
      <Upload className="w-4 h-4" />
      <span className="hidden sm:inline">
        {uploading ? 'Uploading...' : 'Insert Image'}
      </span>
    </Button>
  );
};