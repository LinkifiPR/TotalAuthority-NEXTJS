
import React from 'react';

interface CTABlock {
  id: string;
  type: string;
  content: string;
}

interface CTABlockManagerProps {
  content: string;
  onChange: (content: string) => void;
}

export const CTABlockManager: React.FC<CTABlockManagerProps> = ({ content, onChange }) => {
  const removeBlock = (blockId: string) => {
    // Create a temporary div to parse the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    
    // Find and remove the block with the matching ID
    const blockToRemove = tempDiv.querySelector(`[data-block-id="${blockId}"]`);
    if (blockToRemove) {
      blockToRemove.remove();
      onChange(tempDiv.innerHTML);
    }
  };

  // Add event listeners for remove buttons when content changes
  React.useEffect(() => {
    const handleRemoveClick = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('cta-remove-btn')) {
        event.preventDefault();
        event.stopPropagation();
        
        const blockId = target.getAttribute('data-block-id');
        if (blockId) {
          removeBlock(blockId);
        }
      }
    };

    // Add event listener to document
    document.addEventListener('click', handleRemoveClick);
    
    return () => {
      document.removeEventListener('click', handleRemoveClick);
    };
  }, [content]);

  return null; // This component only manages events, doesn't render anything
};
