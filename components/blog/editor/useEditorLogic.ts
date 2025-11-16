
import { useRef, useState } from 'react';
import { useLinkEditor } from './hooks/useLinkEditor';
import { useImageEditor } from './hooks/useImageEditor';
import { useTextEditor } from './hooks/useTextEditor';
import { addRemoveButtonsToImages } from './utils/imageUtils';
import { ImageData } from './ImageEditor';

export const useEditorLogic = (onChange: (content: string) => void) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [savedRange, setSavedRange] = useState<Range | null>(null);
  
  const linkEditor = useLinkEditor();
  const imageEditor = useImageEditor();
  const textEditor = useTextEditor();

  const handleContentChange = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      setSavedRange(selection.getRangeAt(0).cloneRange());
    }
  };

  const restoreSelection = () => {
    if (savedRange) {
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(savedRange);
      }
    }
  };

  const addRemoveButtonsWrapper = () => {
    addRemoveButtonsToImages(editorRef, handleContentChange);
  };

  return {
    // Editor ref
    editorRef,
    
    // Content handling
    handleContentChange,
    
    // Selection management
    saveSelection,
    restoreSelection,
    
    // Text editor functions
    formatText: (command: string) => textEditor.formatText(command, handleContentChange),
    insertHeading: (level: number) => textEditor.insertHeading(level, editorRef, handleContentChange),
    insertList: (ordered: boolean) => textEditor.insertList(ordered, editorRef, handleContentChange),
    insertQuote: () => textEditor.insertQuote(editorRef, handleContentChange),
    
    // Link editor
    ...linkEditor,
    insertLink: () => linkEditor.insertLink(editorRef, handleContentChange),
    
    // Image editor
    ...imageEditor,
    insertImage: (imageData: ImageData) => imageEditor.insertImage(imageData, editorRef, handleContentChange, addRemoveButtonsWrapper),
    
    // Image utilities
    addRemoveButtonsToImages: addRemoveButtonsWrapper
  };
};
