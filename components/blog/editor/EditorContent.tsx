import React from 'react';

interface EditorContentProps {
  editorRef: React.RefObject<HTMLDivElement>;
  onInput: (e: React.FormEvent<HTMLDivElement>) => void;
  onPaste: (e: React.ClipboardEvent) => void;
}

export const EditorContent: React.FC<EditorContentProps> = ({
  editorRef,
  onInput,
  onPaste
}) => {
  return (
    <div className="relative">
      <div
        ref={editorRef}
        contentEditable
        onInput={onInput}
        onPaste={onPaste}
        className="min-h-[400px] p-4 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
        style={{
          lineHeight: '1.6',
          fontSize: '16px',
          color: '#374151'
        }}
      />
    </div>
  );
};