"use client";


import React from 'react';
import { Label } from '@/components/ui/label';
import { EditorStyles } from './editor/EditorStyles';
import { CTABlockManager } from './editor/CTABlockManager';
import { EditorContentStyles } from './editor/EditorContentStyles';
import { useWYSIWYGEditor } from './editor/hooks/useWYSIWYGEditor';
import { EditorTabs } from './editor/components/EditorTabs';
import { EditorDialogs } from './editor/components/EditorDialogs';

interface WYSIWYGEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export const WYSIWYGEditor: React.FC<WYSIWYGEditorProps> = ({
  content,
  onChange
}) => {
  const {
    activeTab,
    setActiveTab,
    editorLogic,
    youtubeManager,
    handleImageUploadClick,
    handleImageInsert,
    handleEditorInput,
    handlePaste,
    htmlContent,
    handleHtmlChange
  } = useWYSIWYGEditor({ content, onChange });

  return (
    <div className="space-y-4">
      <Label>Content</Label>
      
      <EditorTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        content={content}
        editorLogic={editorLogic}
        youtubeManager={youtubeManager}
        handleImageUploadClick={handleImageUploadClick}
        handleImageInsert={handleImageInsert}
        handleEditorInput={handleEditorInput}
        handlePaste={handlePaste}
        htmlContent={htmlContent}
        handleHtmlChange={handleHtmlChange}
      />
      
      <EditorStyles />
      <CTABlockManager content={content} onChange={onChange} />

      <EditorDialogs
        youtubeManager={youtubeManager}
      />

      <input
        ref={editorLogic.fileInputRef}
        type="file"
        accept="image/*"
        onChange={editorLogic.handleImageUpload}
        className="hidden"
      />
      
      <EditorContentStyles />
    </div>
  );
};
