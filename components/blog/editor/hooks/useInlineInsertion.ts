
import { useState, useEffect, useCallback, useRef } from 'react';

export const useInlineInsertion = (editorRef: React.RefObject<HTMLDivElement>) => {
  const [buttonVisible, setButtonVisible] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [currentLineElement, setCurrentLineElement] = useState<Element | null>(null);
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const hideTimeoutRef = useRef<NodeJS.Timeout>();
  const stablePositionRef = useRef({ top: 0, left: 0 });

  const updateButtonPosition = useCallback((lineElement: Element) => {
    if (!editorRef.current || !lineElement) return;

    const editorRect = editorRef.current.getBoundingClientRect();
    const lineRect = lineElement.getBoundingClientRect();
    
    const newPosition = {
      top: lineRect.top - editorRect.top + (lineRect.height / 2) - 16,
      left: -40
    };
    
    stablePositionRef.current = newPosition;
    setButtonPosition(newPosition);
    setCurrentLineElement(lineElement);
  }, [editorRef]);

  const showButton = useCallback((lineElement: Element) => {
    // Clear any pending hide timeout
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = undefined;
    }

    updateButtonPosition(lineElement);
    setButtonVisible(true);
  }, [updateButtonPosition]);

  const hideButton = useCallback(() => {
    if (isHoveringButton || isPopoverOpen) return;
    
    // Add a small delay to prevent flickering
    hideTimeoutRef.current = setTimeout(() => {
      if (!isHoveringButton && !isPopoverOpen) {
        setButtonVisible(false);
      }
    }, 150);
  }, [isHoveringButton, isPopoverOpen]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!editorRef.current) return;

    const editorRect = editorRef.current.getBoundingClientRect();
    
    // Check if mouse is in the editor area (including the button area)
    const isInEditorArea = 
      e.clientX >= editorRect.left - 50 && 
      e.clientX <= editorRect.right &&
      e.clientY >= editorRect.top && 
      e.clientY <= editorRect.bottom;

    if (isInEditorArea) {
      // Find the line element at the current mouse position
      const elementsAtPoint = document.elementsFromPoint(e.clientX, e.clientY);
      const lineElement = elementsAtPoint.find(el => {
        const tagName = el.tagName?.toLowerCase();
        return ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div'].includes(tagName) &&
               editorRef.current?.contains(el);
      });

      if (lineElement) {
        showButton(lineElement);
      } else {
        hideButton();
      }
    } else {
      hideButton();
    }
  }, [editorRef, showButton, hideButton]);

  const handleSelectionChange = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || !editorRef.current) {
      if (!isHoveringButton && !isPopoverOpen) {
        hideButton();
      }
      return;
    }

    const range = selection.getRangeAt(0);
    let lineElement = range.startContainer;
    
    // Find the containing block element
    while (lineElement && lineElement !== editorRef.current) {
      if (lineElement.nodeType === Node.ELEMENT_NODE) {
        const tagName = (lineElement as Element).tagName?.toLowerCase();
        if (['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div'].includes(tagName)) {
          break;
        }
      }
      lineElement = lineElement.parentNode;
    }

    if (lineElement && lineElement !== editorRef.current) {
      showButton(lineElement as Element);
    } else if (!isHoveringButton && !isPopoverOpen) {
      hideButton();
    }
  }, [editorRef, showButton, hideButton, isHoveringButton, isPopoverOpen]);

  useEffect(() => {
    document.addEventListener('selectionchange', handleSelectionChange);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
      document.removeEventListener('mousemove', handleMouseMove);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [handleSelectionChange, handleMouseMove]);

  const insertAtCurrentLine = useCallback((html: string) => {
    if (!currentLineElement || !editorRef.current) return;

    // Create a new element from the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const newElement = tempDiv.firstChild as Node;

    if (newElement) {
      // Insert after the current line
      currentLineElement.parentNode?.insertBefore(newElement, currentLineElement.nextSibling);
      
      // Move cursor after the inserted element
      const selection = window.getSelection();
      if (selection) {
        const range = document.createRange();
        range.setStartAfter(newElement);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }, [currentLineElement, editorRef]);

  return {
    buttonVisible,
    buttonPosition,
    isPopoverOpen,
    setIsPopoverOpen,
    insertAtCurrentLine,
    currentLineElement,
    setIsHoveringButton
  };
};
