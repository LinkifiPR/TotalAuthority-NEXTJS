
import { useState } from 'react';
import { YouTubeEmbedData } from '../YouTubeEmbedEditor';

interface UseYouTubeManagerProps {
  editorRef: React.RefObject<HTMLDivElement>;
  onChange: (content: string) => void;
  handleContentChange: () => void;
  saveSelection?: () => void;
}

export const useYouTubeManager = ({
  editorRef,
  onChange,
  handleContentChange,
  saveSelection
}: UseYouTubeManagerProps) => {
  const [showYouTubeEditor, setShowYouTubeEditor] = useState(false);
  const [youtubeToEdit, setYoutubeToEdit] = useState<YouTubeEmbedData | null>(null);
  const [savedRange, setSavedRange] = useState<Range | null>(null);

  const insertYouTubeEmbed = (data: YouTubeEmbedData) => {
    if (!editorRef.current) return;

    const embedHtml = `
      <div class="youtube-embed" data-youtube-id="${data.id}" data-youtube-data='${JSON.stringify(data)}'>
        <div class="relative w-full h-0 pb-[56.25%] mb-4">
          <iframe 
            class="absolute top-0 left-0 w-full h-full rounded-lg"
            src="https://www.youtube.com/embed/${data.videoId}" 
            title="YouTube video" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>
        </div>
        ${data.caption ? `<div class="youtube-caption text-center text-sm text-gray-600 italic mb-4">${data.caption}</div>` : ''}
      </div>
    `;
    
    // If we're editing an existing YouTube embed, replace it
    if (youtubeToEdit) {
      const existingEmbed = editorRef.current.querySelector(`[data-youtube-id="${youtubeToEdit.id}"]`);
      if (existingEmbed) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = embedHtml;
        const newEmbed = tempDiv.firstElementChild as HTMLElement;
        existingEmbed.parentNode?.replaceChild(newEmbed, existingEmbed);
        
        handleContentChange();
        setTimeout(() => addRemoveButtonsToEmbeds(), 100);
        setYoutubeToEdit(null);
        return;
      }
    }

    // For new embeds, try to use saved selection first
    let targetRange = savedRange;
    
    // If no saved range, try to get current selection
    if (!targetRange) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        targetRange = selection.getRangeAt(0);
      }
    }

    // If still no range, create one at the end of the editor
    if (!targetRange) {
      targetRange = document.createRange();
      targetRange.selectNodeContents(editorRef.current);
      targetRange.collapse(false); // Move to end
    }

    // Make sure the range is within our editor
    if (!editorRef.current.contains(targetRange.commonAncestorContainer)) {
      targetRange = document.createRange();
      targetRange.selectNodeContents(editorRef.current);
      targetRange.collapse(false);
    }

    // Insert the embed
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = embedHtml;
    const embedElement = tempDiv.firstElementChild as HTMLElement;
    
    try {
      targetRange.deleteContents();
      targetRange.insertNode(embedElement);
      
      // Move cursor after the embed
      targetRange.setStartAfter(embedElement);
      targetRange.collapse(true);
      
      // Update selection
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(targetRange);
      }
    } catch (error) {
      console.error('Error inserting YouTube embed:', error);
      // Fallback: append to end of editor
      editorRef.current.appendChild(embedElement);
    }
    
    // Clear saved range
    setSavedRange(null);
    
    handleContentChange();
    setTimeout(() => addRemoveButtonsToEmbeds(), 100);
  };

  const addRemoveButtonsToEmbeds = () => {
    if (!editorRef.current) return;
    
    const embeds = editorRef.current.querySelectorAll('.youtube-embed:not([data-has-buttons])');
    embeds.forEach((embed) => {
      const container = embed as HTMLElement;
      container.setAttribute('data-has-buttons', 'true');
      container.style.position = 'relative';
      
      // Remove button
      const removeBtn = document.createElement('button');
      removeBtn.innerHTML = '×';
      removeBtn.style.cssText = 'position: absolute; top: 8px; right: 8px; width: 24px; height: 24px; background: #ef4444; border: none; border-radius: 50%; cursor: pointer; font-size: 16px; color: white; z-index: 1000; opacity: 0; transition: opacity 0.2s;';
      removeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        container.remove();
        onChange(editorRef.current?.innerHTML || '');
      });
      
      // Edit button
      const editBtn = document.createElement('button');
      editBtn.innerHTML = '✏️';
      editBtn.style.cssText = 'position: absolute; top: 8px; right: 36px; width: 24px; height: 24px; background: #3b82f6; border: none; border-radius: 50%; cursor: pointer; font-size: 12px; color: white; z-index: 1000; opacity: 0; transition: opacity 0.2s;';
      editBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const youtubeData = container.getAttribute('data-youtube-data');
        if (youtubeData) {
          setYoutubeToEdit(JSON.parse(youtubeData));
          setShowYouTubeEditor(true);
        }
      });
      
      container.appendChild(removeBtn);
      container.appendChild(editBtn);
      
      container.addEventListener('mouseenter', () => {
        removeBtn.style.opacity = '1';
        editBtn.style.opacity = '1';
      });
      container.addEventListener('mouseleave', () => {
        removeBtn.style.opacity = '0';
        editBtn.style.opacity = '0';
      });
    });
  };

  const handleYouTubeClick = () => {
    // Save current selection
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      setSavedRange(selection.getRangeAt(0).cloneRange());
    }
    
    // Also try the parent's saveSelection if available
    saveSelection?.();
    
    setShowYouTubeEditor(true);
  };

  return {
    showYouTubeEditor,
    setShowYouTubeEditor,
    youtubeToEdit,
    setYoutubeToEdit,
    insertYouTubeEmbed,
    addRemoveButtonsToEmbeds,
    handleYouTubeClick
  };
};
