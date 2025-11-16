
import { useState } from 'react';

export const useLinkEditor = () => {
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [linkNofollow, setLinkNofollow] = useState(false);
  const [linkSponsored, setLinkSponsored] = useState(false);
  const [linkNewTab, setLinkNewTab] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [selectedRange, setSelectedRange] = useState<Range | null>(null);

  const resetLinkForm = () => {
    setLinkUrl('');
    setLinkText('');
    setLinkNofollow(false);
    setLinkSponsored(false);
    setLinkNewTab(false);
    setSelectedRange(null);
    setShowLinkDialog(false);
  };

  const handleLinkClick = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0).cloneRange();
      setSelectedRange(range);
      
      const selectedText = selection.toString().trim();
      if (selectedText) {
        setLinkText(selectedText);
      } else {
        setLinkText('');
      }
    } else {
      setSelectedRange(null);
      setLinkText('');
    }
    
    setLinkUrl('');
    setLinkNofollow(false);
    setLinkSponsored(false);
    setLinkNewTab(false);
    setShowLinkDialog(true);
  };

  const insertLink = (editorRef: React.RefObject<HTMLDivElement>, onChange: () => void) => {
    if (!linkUrl) return;
    
    if (selectedRange && editorRef.current) {
      editorRef.current.focus();
      
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(selectedRange);
        
        const selectedText = selection.toString().trim();
        const displayText = selectedText || linkText || linkUrl;
        
        // Build rel attribute
        const relParts = [];
        if (linkNofollow) relParts.push('nofollow');
        if (linkSponsored) relParts.push('sponsored');
        const relAttr = relParts.length > 0 ? ` rel="${relParts.join(' ')}"` : '';
        
        // Build target attribute
        const targetAttr = linkNewTab ? ' target="_blank"' : '';
        
        const linkHtml = `<a href="${linkUrl}"${relAttr}${targetAttr} style="color: hsl(22 90% 52%); font-weight: 600; text-decoration: underline;">${displayText}</a>`;
        
        if (selectedText) {
          selectedRange.deleteContents();
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = linkHtml;
          const linkNode = tempDiv.firstChild;
          if (linkNode) {
            selectedRange.insertNode(linkNode);
          }
        } else {
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = linkHtml + '&nbsp;';
          const linkNode = tempDiv.firstChild;
          if (linkNode) {
            selectedRange.insertNode(linkNode);
          }
        }
        
        selection.removeAllRanges();
        onChange();
      }
    }
    
    resetLinkForm();
  };

  return {
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
    showLinkDialog,
    setShowLinkDialog,
    handleLinkClick,
    insertLink
  };
};
