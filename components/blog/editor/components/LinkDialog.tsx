
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Link } from 'lucide-react';

interface LinkDialogProps {
  onLinkClick: () => void;
  showLinkDialog: boolean;
  setShowLinkDialog: (show: boolean) => void;
  linkUrl: string;
  setLinkUrl: (url: string) => void;
  linkText: string;
  setLinkText: (text: string) => void;
  linkNofollow: boolean;
  setLinkNofollow: (nofollow: boolean) => void;
  linkSponsored: boolean;
  setLinkSponsored: (sponsored: boolean) => void;
  linkNewTab: boolean;
  setLinkNewTab: (newTab: boolean) => void;
  onInsertLink: () => void;
}

export const LinkDialog: React.FC<LinkDialogProps> = ({
  onLinkClick,
  showLinkDialog,
  setShowLinkDialog,
  linkUrl,
  setLinkUrl,
  linkText,
  setLinkText,
  linkNofollow,
  setLinkNofollow,
  linkSponsored,
  setLinkSponsored,
  linkNewTab,
  setLinkNewTab,
  onInsertLink
}) => {
  return (
    <Dialog open={showLinkDialog} onOpenChange={setShowLinkDialog}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2 bg-white hover:bg-gray-100" 
          type="button"
          onClick={onLinkClick}
        >
          <Link className="w-4 h-4" />
          <span className="hidden sm:inline">Link</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Insert Link</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="linkText">Link Text</Label>
            <Input
              id="linkText"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              placeholder="Click here"
            />
          </div>
          <div>
            <Label htmlFor="linkUrl">URL</Label>
            <Input
              id="linkUrl"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com"
            />
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="linkNewTab" className="text-sm font-medium">
                Open in new tab
              </Label>
              <Switch
                id="linkNewTab"
                checked={linkNewTab}
                onCheckedChange={setLinkNewTab}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="linkNofollow" className="text-sm font-medium">
                Add nofollow
              </Label>
              <Switch
                id="linkNofollow"
                checked={linkNofollow}
                onCheckedChange={setLinkNofollow}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="linkSponsored" className="text-sm font-medium">
                Mark as sponsored
              </Label>
              <Switch
                id="linkSponsored"
                checked={linkSponsored}
                onCheckedChange={setLinkSponsored}
              />
            </div>
          </div>
          
          <Button onClick={onInsertLink} className="w-full" type="button">
            Insert Link
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
