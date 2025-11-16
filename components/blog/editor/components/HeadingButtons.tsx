
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heading1, Heading2, Heading3 } from 'lucide-react';

interface HeadingButtonsProps {
  onInsertHeading: (level: number) => void;
}

export const HeadingButtons: React.FC<HeadingButtonsProps> = ({
  onInsertHeading
}) => {
  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onInsertHeading(1)}
        className="flex items-center gap-2 bg-white hover:bg-gray-100"
        type="button"
      >
        <Heading1 className="w-4 h-4" />
        <span className="hidden sm:inline">H1</span>
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => onInsertHeading(2)}
        className="flex items-center gap-2 bg-white hover:bg-gray-100"
        type="button"
      >
        <Heading2 className="w-4 h-4" />
        <span className="hidden sm:inline">H2</span>
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => onInsertHeading(3)}
        className="flex items-center gap-2 bg-white hover:bg-gray-100"
        type="button"
      >
        <Heading3 className="w-4 h-4" />
        <span className="hidden sm:inline">H3</span>
      </Button>
    </>
  );
};
