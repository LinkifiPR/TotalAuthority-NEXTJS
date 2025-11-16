
export const addRemoveButtonsToImages = (editorRef: React.RefObject<HTMLDivElement>, onChange: () => void) => {
  console.log('addRemoveButtonsToImages called, editor exists:', !!editorRef.current);
  
  if (!editorRef.current) return;
  
  // Look for images in image-container divs first, then fallback to standalone images
  const imageContainers = editorRef.current.querySelectorAll('.image-container');
  const standaloneImages = editorRef.current.querySelectorAll('img[data-image-id]:not([data-has-remove-btn])');
  const allImages = editorRef.current.querySelectorAll('img');
  
  console.log('Found image containers:', imageContainers.length);
  console.log('Found standalone images:', standaloneImages.length);
  console.log('Found all images:', allImages.length);
  console.log('Editor innerHTML length:', editorRef.current.innerHTML.length);
  console.log('Editor innerHTML preview:', editorRef.current.innerHTML.substring(editorRef.current.innerHTML.length - 500));
  
  // Handle images in containers
  imageContainers.forEach((container) => {
    const img = container.querySelector('img[data-image-id]') as HTMLImageElement;
    if (!img || img.getAttribute('data-has-remove-btn')) return;
    
    img.setAttribute('data-has-remove-btn', 'true');
    
    // Check if buttons already exist
    if (container.querySelector('.editor-edit-btn')) return;
    
    // Remove button
    const removeBtn = document.createElement('button');
    removeBtn.innerHTML = '×';
    removeBtn.className = 'editor-remove-btn';
    removeBtn.style.cssText = 'position: absolute; top: 8px; right: 8px; width: 24px; height: 24px; background: #ef4444; border: none; border-radius: 50%; cursor: pointer; font-size: 16px; line-height: 1; display: flex; align-items: center; justify-content: center; font-weight: bold; z-index: 1000; opacity: 0; transition: opacity 0.2s; color: white;';
    removeBtn.title = 'Remove image';
    removeBtn.type = 'button';
    removeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      container.remove();
      onChange();
    });
    
    // Edit button
    const editBtn = document.createElement('button');
    editBtn.innerHTML = '✏️';
    editBtn.className = 'editor-edit-btn';
    editBtn.style.cssText = 'position: absolute; top: 8px; right: 36px; width: 24px; height: 24px; background: #3b82f6; border: none; border-radius: 50%; cursor: pointer; font-size: 12px; line-height: 1; display: flex; align-items: center; justify-content: center; font-weight: bold; z-index: 1000; opacity: 0; transition: opacity 0.2s; color: white;';
    editBtn.title = 'Edit image';
    editBtn.type = 'button';
    editBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const imageData = img.getAttribute('data-image-data');
      if (imageData && editorRef.current) {
        try {
          const parsedData = JSON.parse(imageData);
          console.log('Triggering edit event with data:', parsedData);
          const editEvent = new CustomEvent('editImage', { 
            detail: { ...parsedData, sourceContainer: container },
            bubbles: true 
          });
          editorRef.current.dispatchEvent(editEvent);
        } catch (error) {
          console.error('Error parsing image data:', error);
        }
      }
    });
    
    container.appendChild(removeBtn);
    container.appendChild(editBtn);
    
    // Show/hide buttons on hover
    container.addEventListener('mouseenter', () => {
      removeBtn.style.opacity = '1';
      editBtn.style.opacity = '1';
    });
    container.addEventListener('mouseleave', () => {
      removeBtn.style.opacity = '0';
      editBtn.style.opacity = '0';
    });
    
    console.log('Added buttons to image container');
  });
  
  // Handle standalone images (legacy) - only if they're not already in containers
  standaloneImages.forEach((img) => {
    const imageElement = img as HTMLImageElement;
    
    // Skip if this image is already in an image-container
    if (imageElement.closest('.image-container')) {
      console.log('Skipping standalone image processing - already in container');
      return;
    }
    
    imageElement.setAttribute('data-has-remove-btn', 'true');
    
    if (!imageElement.parentElement?.classList.contains('editor-image-container')) {
      const container = document.createElement('div');
      container.className = 'editor-image-container';
      container.style.cssText = 'position: relative; display: inline-block; margin: 16px 0;';
      
      imageElement.parentNode?.insertBefore(container, imageElement);
      container.appendChild(imageElement);
      
      // Remove button
      const removeBtn = document.createElement('button');
      removeBtn.innerHTML = '×';
      removeBtn.className = 'editor-remove-btn';
      removeBtn.style.cssText = 'position: absolute; top: 8px; right: 8px; width: 24px; height: 24px; background: #ef4444; border: none; border-radius: 50%; cursor: pointer; font-size: 16px; line-height: 1; display: flex; align-items: center; justify-content: center; font-weight: bold; z-index: 1000; color: white;';
      removeBtn.title = 'Remove image';
      removeBtn.type = 'button';
      removeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        container.remove();
        onChange();
      });
      
      // Edit button
      const editBtn = document.createElement('button');
      editBtn.innerHTML = '✏️';
      editBtn.className = 'editor-edit-btn';
      editBtn.style.cssText = 'position: absolute; top: 8px; right: 36px; width: 24px; height: 24px; background: #3b82f6; border: none; border-radius: 50%; cursor: pointer; font-size: 12px; line-height: 1; display: flex; align-items: center; justify-content: center; font-weight: bold; z-index: 1000; color: white;';
      editBtn.title = 'Edit image';
      editBtn.type = 'button';
      editBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const imageData = imageElement.getAttribute('data-image-data');
        if (imageData && editorRef.current) {
          try {
            const parsedData = JSON.parse(imageData);
            console.log('Triggering edit event with data:', parsedData);
            const editEvent = new CustomEvent('editImage', { 
              detail: { ...parsedData, sourceContainer: container },
              bubbles: true 
            });
            editorRef.current.dispatchEvent(editEvent);
          } catch (error) {
            console.error('Error parsing image data:', error);
          }
        }
      });
      
      container.appendChild(removeBtn);
      container.appendChild(editBtn);
      console.log('Added buttons to standalone image container');
    }
  });
};
