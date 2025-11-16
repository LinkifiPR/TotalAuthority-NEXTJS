
import React from 'react';

export const EditorContentStyles: React.FC = () => {
  return (
    <style dangerouslySetInnerHTML={{
      __html: `
        .youtube-embed {
          margin: 16px 0;
          position: relative;
        }
        
        .youtube-caption {
          margin-top: 8px;
          text-align: center;
          font-size: 14px;
          color: #6b7280;
          font-style: italic;
        }
        
        .image-container {
          margin: 16px 0;
          display: block;
          position: relative;
        }
        
        .image-container img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
        }
      `
    }} />
  );
};
