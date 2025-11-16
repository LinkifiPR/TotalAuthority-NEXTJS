
import React from 'react';
import { ImageEditor, ImageData } from './ImageEditor';
import { TextFormattingButtons } from './components/TextFormattingButtons';
import { HeadingButtons } from './components/HeadingButtons';
import { ListButtons } from './components/ListButtons';
import { LinkDialog } from './components/LinkDialog';
import { ImageButtons } from './components/ImageButtons';
import { Button } from '@/components/ui/button';
import { Youtube } from 'lucide-react';

interface EditorToolbarProps {
  onFormatText: (command: string) => void;
  onInsertHeading: (level: number) => void;
  onInsertList: (ordered: boolean) => void;
  onInsertQuote: () => void;
  onLinkClick: () => void;
  onImageUpload: () => void;
  onYouTubeClick: () => void;
  uploading: boolean;
  showLinkDialog: boolean;
  setShowLinkDialog: (show: boolean) => void;
  linkUrl: string;
  setLinkUrl: (url: string) => void;
  linkText: string;
  setLinkText: (text: string) => void;
  linkNofollow: boolean;
  setLinkNofollow: (nofollow: boolean) => void;
  linkSponsored: boolean;
  setLinkSponsored: (sponsored: boolean) => void;
  linkNewTab: boolean;
  setLinkNewTab: (newTab: boolean) => void;
  onInsertLink: () => void;
  showImageDialog: boolean;
  setShowImageDialog: (show: boolean) => void;
  showImageEditor: boolean;
  setShowImageEditor: (show: boolean) => void;
  imageUrl: string;
  setImageUrl: (url: string) => void;
  imageAlt: string;
  setImageAlt: (alt: string) => void;
  onInsertImageUrl: () => void;
  onInsertImage: (imageData: ImageData) => void;
  imageToEdit?: ImageData | null;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  onFormatText,
  onInsertHeading,
  onInsertList,
  onInsertQuote,
  onLinkClick,
  onImageUpload,
  onYouTubeClick,
  uploading,
  showLinkDialog,
  setShowLinkDialog,
  linkUrl,
  setLinkUrl,
  linkText,
  setLinkText,
  linkNofollow,
  setLinkNofollow,
  linkSponsored,
  setLinkSponsored,
  linkNewTab,
  setLinkNewTab,
  onInsertLink,
  showImageDialog,
  setShowImageDialog,
  showImageEditor,
  setShowImageEditor,
  imageUrl,
  setImageUrl,
  imageAlt,
  setImageAlt,
  onInsertImageUrl,
  onInsertImage,
  imageToEdit
}) => {
  return (
    <div className="border rounded-lg p-3 bg-gray-50">
      <div className="flex flex-wrap gap-2">
        <HeadingButtons onInsertHeading={onInsertHeading} />
        
        <TextFormattingButtons 
          onFormatText={onFormatText}
          onInsertQuote={onInsertQuote}
        />
        
        <ListButtons onInsertList={onInsertList} />
        
        <LinkDialog
          onLinkClick={onLinkClick}
          showLinkDialog={showLinkDialog}
          setShowLinkDialog={setShowLinkDialog}
          linkUrl={linkUrl}
          setLinkUrl={setLinkUrl}
          linkText={linkText}
          setLinkText={setLinkText}
          linkNofollow={linkNofollow}
          setLinkNofollow={setLinkNofollow}
          linkSponsored={linkSponsored}
          setLinkSponsored={setLinkSponsored}
          linkNewTab={linkNewTab}
          setLinkNewTab={setLinkNewTab}
          onInsertLink={onInsertLink}
        />

        <ImageButtons
          onImageUpload={onImageUpload}
          uploading={uploading}
        />

        <Button
          variant="outline"
          size="sm"
          onClick={onYouTubeClick}
          className="flex items-center gap-2 bg-white hover:bg-gray-100"
          type="button"
        >
          <Youtube className="w-4 h-4" />
          <span className="hidden sm:inline">YouTube</span>
        </Button>
      </div>

      <ImageEditor
        isOpen={showImageEditor}
        onClose={() => setShowImageEditor(false)}
        onInsert={onInsertImage}
        initialData={imageToEdit || (imageUrl ? { url: imageUrl, alt: imageAlt } : undefined)}
      />
    </div>
  );
};
