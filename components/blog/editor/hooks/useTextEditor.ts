
export const useTextEditor = () => {
  const formatText = (command: string, onChange: () => void) => {
    document.execCommand(command, false);
    onChange();
  };

  const insertHeading = (level: number, editorRef: React.RefObject<HTMLDivElement>, onChange: () => void) => {
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand('formatBlock', false, `h${level}`);
      onChange();
    }
  };

  const insertList = (ordered: boolean, editorRef: React.RefObject<HTMLDivElement>, onChange: () => void) => {
    if (editorRef.current) {
      editorRef.current.focus();
      const command = ordered ? 'insertOrderedList' : 'insertUnorderedList';
      document.execCommand(command, false);
      onChange();
    }
  };

  const insertQuote = (editorRef: React.RefObject<HTMLDivElement>, onChange: () => void) => {
    if (editorRef.current) {
      editorRef.current.focus();
      const quoteHtml = '<blockquote style="border-left: 4px solid hsl(22 90% 52%); padding-left: 1rem; margin: 1rem 0; font-style: italic; color: #6b7280;">Your quote here</blockquote>';
      document.execCommand('insertHTML', false, quoteHtml);
      onChange();
    }
  };

  return {
    formatText,
    insertHeading,
    insertList,
    insertQuote
  };
};
