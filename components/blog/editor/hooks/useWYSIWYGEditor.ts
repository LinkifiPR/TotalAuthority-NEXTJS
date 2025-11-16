
import { useEffect, useState } from 'react';
import { useEditorLogic } from '../useEditorLogic';
import { useYouTubeManager } from './useYouTubeManager';
import { ImageData } from '../ImageEditor';

interface UseWYSIWYGEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export const useWYSIWYGEditor = ({ content, onChange }: UseWYSIWYGEditorProps) => {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview' | 'html'>('edit');
  const [htmlContent, setHtmlContent] = useState(content);
  
  const editorLogic = useEditorLogic(onChange);

  const youtubeManager = useYouTubeManager({
    editorRef: editorLogic.editorRef,
    onChange,
    handleContentChange: editorLogic.handleContentChange,
    saveSelection: editorLogic.saveSelection
  });

  // Sync content with editor and HTML
  useEffect(() => {
    setHtmlContent(content);
    if (editorLogic.editorRef.current && content !== editorLogic.editorRef.current.innerHTML) {
      editorLogic.editorRef.current.innerHTML = content;
      setTimeout(() => {
        editorLogic.addRemoveButtonsToImages();
        youtubeManager.addRemoveButtonsToEmbeds();
      }, 100);
    }
  }, [content, editorLogic.addRemoveButtonsToImages, youtubeManager.addRemoveButtonsToEmbeds]);

  // Handle image editing
  useEffect(() => {
    const handleImageEdit = (event: any) => {
      const imageData = event.detail;
      const imageElement = imageData.sourceContainer || event.target?.closest?.('.image-container') || event.target;
      
      if (imageData && imageElement) {
        const { sourceContainer, ...cleanImageData } = imageData;
        editorLogic.startImageEdit(cleanImageData, imageElement);
      }
    };

    if (editorLogic.editorRef.current) {
      editorLogic.editorRef.current.addEventListener('editImage', handleImageEdit);
      return () => {
        if (editorLogic.editorRef.current) {
          editorLogic.editorRef.current.removeEventListener('editImage', handleImageEdit);
        }
      };
    }
  }, [editorLogic.startImageEdit]);

  const handleImageUploadClick = () => {
    editorLogic.saveSelection?.();
    editorLogic.fileInputRef.current?.click();
  };

  const handleImageInsert = (imageData: ImageData) => {
    editorLogic.insertImage(imageData);
  };

  // Enhanced content change handler to ensure proper syncing
  const handleEditorInput = (e: React.FormEvent<HTMLDivElement>) => {
    const newContent = editorLogic.editorRef.current?.innerHTML || '';
    setHtmlContent(newContent);
    onChange(newContent);
    
    // Debounced re-render to avoid excessive calls
    setTimeout(() => {
      if (editorLogic.editorRef.current) {
        editorLogic.addRemoveButtonsToImages();
        youtubeManager.addRemoveButtonsToEmbeds();
      }
    }, 100);
  };

  // Handle paste events to trigger content sync
  const handlePaste = (e: React.ClipboardEvent) => {
    setTimeout(() => {
      const newContent = editorLogic.editorRef.current?.innerHTML || '';
      setHtmlContent(newContent);
      onChange(newContent);
      editorLogic.addRemoveButtonsToImages();
      youtubeManager.addRemoveButtonsToEmbeds();
    }, 100);
  };

  const handleHtmlChange = (newHtml: string) => {
    setHtmlContent(newHtml);
    onChange(newHtml);
  };

  // Handle tab changes to preserve content
  const handleTabChange = (newTab: 'edit' | 'preview' | 'html') => {
    // If switching away from edit tab, save current content
    if (activeTab === 'edit' && editorLogic.editorRef.current) {
      const currentContent = editorLogic.editorRef.current.innerHTML;
      setHtmlContent(currentContent);
      onChange(currentContent);
    }
    
    setActiveTab(newTab);
    
    // If switching to edit tab, restore content
    if (newTab === 'edit') {
      setTimeout(() => {
        if (editorLogic.editorRef.current) {
          editorLogic.editorRef.current.innerHTML = htmlContent;
          editorLogic.addRemoveButtonsToImages();
          youtubeManager.addRemoveButtonsToEmbeds();
        }
      }, 50);
    }
  };

  return {
    activeTab,
    setActiveTab: handleTabChange,
    editorLogic,
    youtubeManager,
    handleImageUploadClick,
    handleImageInsert,
    handleEditorInput,
    handlePaste,
    htmlContent,
    handleHtmlChange
  };
};
