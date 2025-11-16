
import React from 'react';
import { Button } from '@/components/ui/button';
import { Bold, Italic, Quote } from 'lucide-react';

interface TextFormattingButtonsProps {
  onFormatText: (command: string) => void;
  onInsertQuote: () => void;
}

export const TextFormattingButtons: React.FC<TextFormattingButtonsProps> = ({
  onFormatText,
  onInsertQuote
}) => {
  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onFormatText('bold')}
        className="flex items-center gap-2 bg-white hover:bg-gray-100"
        type="button"
      >
        <Bold className="w-4 h-4" />
        <span className="hidden sm:inline">Bold</span>
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => onFormatText('italic')}
        className="flex items-center gap-2 bg-white hover:bg-gray-100"
        type="button"
      >
        <Italic className="w-4 h-4" />
        <span className="hidden sm:inline">Italic</span>
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={onInsertQuote}
        className="flex items-center gap-2 bg-white hover:bg-gray-100"
        type="button"
      >
        <Quote className="w-4 h-4" />
        <span className="hidden sm:inline">Quote</span>
      </Button>
    </>
  );
};
