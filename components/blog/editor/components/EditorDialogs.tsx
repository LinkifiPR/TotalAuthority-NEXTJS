
import React from 'react';
import { YouTubeEmbedEditor } from '../YouTubeEmbedEditor';

interface EditorDialogsProps {
  youtubeManager: any;
}

export const EditorDialogs: React.FC<EditorDialogsProps> = ({
  youtubeManager
}) => {
  return (
    <>
      <YouTubeEmbedEditor
        isOpen={youtubeManager.showYouTubeEditor}
        onClose={() => {
          youtubeManager.setShowYouTubeEditor(false);
          youtubeManager.setYoutubeToEdit(null);
        }}
        onInsert={youtubeManager.insertYouTubeEmbed}
        initialData={youtubeManager.youtubeToEdit || undefined}
      />
    </>
  );
};
