
import React from 'react';
import { Button } from '@/components/ui/button';
import { List, ListOrdered } from 'lucide-react';

interface ListButtonsProps {
  onInsertList: (ordered: boolean) => void;
}

export const ListButtons: React.FC<ListButtonsProps> = ({
  onInsertList
}) => {
  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onInsertList(false)}
        className="flex items-center gap-2 bg-white hover:bg-gray-100"
        type="button"
      >
        <List className="w-4 h-4" />
        <span className="hidden sm:inline">Bullets</span>
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => onInsertList(true)}
        className="flex items-center gap-2 bg-white hover:bg-gray-100"
        type="button"
      >
        <ListOrdered className="w-4 h-4" />
        <span className="hidden sm:inline">Numbers</span>
      </Button>
    </>
  );
};
