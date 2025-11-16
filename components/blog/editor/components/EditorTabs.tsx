
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EditorToolbar } from '../EditorToolbar';
import { EditorContent } from '../EditorContent';
import { EditorPreview } from '../EditorPreview';
import { ImageData } from '../ImageEditor';

interface EditorTabsProps {
  activeTab: 'edit' | 'preview' | 'html';
  setActiveTab: (tab: 'edit' | 'preview' | 'html') => void;
  content: string;
  editorLogic: any;
  youtubeManager: any;
  handleImageUploadClick: () => void;
  handleImageInsert: (imageData: ImageData) => void;
  handleEditorInput: (e: React.FormEvent<HTMLDivElement>) => void;
  handlePaste: (e: React.ClipboardEvent) => void;
  htmlContent?: string;
  handleHtmlChange?: (html: string) => void;
}

export const EditorTabs: React.FC<EditorTabsProps> = ({
  activeTab,
  setActiveTab,
  content,
  editorLogic,
  youtubeManager,
  handleImageUploadClick,
  handleImageInsert,
  handleEditorInput,
  handlePaste,
  htmlContent,
  handleHtmlChange
}) => {
  return (
    <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'edit' | 'preview' | 'html')}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="edit">Edit</TabsTrigger>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="html">HTML</TabsTrigger>
      </TabsList>
      
      <TabsContent value="edit" className="space-y-4">
        <EditorToolbar
          onFormatText={editorLogic.formatText}
          onInsertHeading={editorLogic.insertHeading}
          onInsertList={editorLogic.insertList}
          onInsertQuote={editorLogic.insertQuote}
          onLinkClick={editorLogic.handleLinkClick}
          onImageUpload={handleImageUploadClick}
          onYouTubeClick={youtubeManager.handleYouTubeClick}
          uploading={editorLogic.uploading}
          showLinkDialog={editorLogic.showLinkDialog}
          setShowLinkDialog={editorLogic.setShowLinkDialog}
          linkUrl={editorLogic.linkUrl}
          setLinkUrl={editorLogic.setLinkUrl}
          linkText={editorLogic.linkText}
          setLinkText={editorLogic.setLinkText}
          linkNofollow={editorLogic.linkNofollow}
          setLinkNofollow={editorLogic.setLinkNofollow}
          linkSponsored={editorLogic.linkSponsored}
          setLinkSponsored={editorLogic.setLinkSponsored}
          linkNewTab={editorLogic.linkNewTab}
          setLinkNewTab={editorLogic.setLinkNewTab}
          onInsertLink={editorLogic.insertLink}
          showImageDialog={editorLogic.showImageDialog}
          setShowImageDialog={editorLogic.setShowImageDialog}
          showImageEditor={editorLogic.showImageEditor}
          setShowImageEditor={editorLogic.setShowImageEditor}
          imageUrl={editorLogic.imageUrl}
          setImageUrl={editorLogic.setImageUrl}
          imageAlt={editorLogic.imageAlt}
          setImageAlt={editorLogic.setImageAlt}
          onInsertImageUrl={editorLogic.insertImageUrl}
          onInsertImage={handleImageInsert}
          imageToEdit={editorLogic.imageToEdit}
        />

        <EditorContent
          editorRef={editorLogic.editorRef}
          onInput={handleEditorInput}
          onPaste={handlePaste}
        />
        
        <div className="text-sm text-gray-500 mt-2">
          Use the toolbar buttons above to format your content and insert elements like images and YouTube videos.
        </div>
      </TabsContent>
      
      <TabsContent value="preview" className="space-y-4">
        <EditorPreview content={content} />
      </TabsContent>
      
      <TabsContent value="html" className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Raw HTML</label>
          <textarea
            value={htmlContent || content}
            onChange={(e) => handleHtmlChange?.(e.target.value)}
            className="w-full min-h-[400px] p-4 border rounded-lg bg-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter raw HTML content..."
          />
          <div className="text-sm text-gray-500">
            Edit the raw HTML directly. Changes will sync with the visual editor.
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};
