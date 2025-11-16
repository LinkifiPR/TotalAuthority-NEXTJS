import React from 'react';

interface EditorPreviewProps {
  content: string;
}

export const EditorPreview: React.FC<EditorPreviewProps> = ({ content }) => {
  return (
    <div className="min-h-[400px] p-4 border rounded-lg bg-white">
      <style dangerouslySetInnerHTML={{
        __html: `
        `
      }} />
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};