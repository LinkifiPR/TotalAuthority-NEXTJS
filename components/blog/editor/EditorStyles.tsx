import React from 'react';

export const EditorStyles: React.FC = () => {
  return (
    <style dangerouslySetInnerHTML={{
      __html: `
        [contenteditable] ul {
          list-style-type: disc !important;
          margin-left: 1.5rem !important;
          padding-left: 1rem !important;
          margin-top: 0.5rem !important;
          margin-bottom: 0.5rem !important;
        }
        
        [contenteditable] ol {
          list-style-type: decimal !important;
          margin-left: 1.5rem !important;
          padding-left: 1rem !important;
          margin-top: 0.5rem !important;
          margin-bottom: 0.5rem !important;
        }
        
        [contenteditable] li {
          margin-bottom: 0.25rem !important;
          display: list-item !important;
          list-style-position: outside !important;
        }
        
        [contenteditable] ul ul,
        [contenteditable] ol ol {
          margin-left: 1rem !important;
        }
        
        [contenteditable] a {
          color: hsl(22 90% 52%) !important;
          font-weight: 600 !important;
          text-decoration: underline !important;
        }
        
        [contenteditable] a:hover {
          color: hsl(22 90% 45%) !important;
        }
        
        [contenteditable] h1 {
          font-size: 2.25rem !important;
          font-weight: bold !important;
          margin-bottom: 1rem !important;
          line-height: 1.2 !important;
        }
        
        [contenteditable] h2 {
          font-size: 1.875rem !important;
          font-weight: bold !important;
          margin-bottom: 0.75rem !important;
          line-height: 1.3 !important;
        }
        
        [contenteditable] h3 {
          font-size: 1.5rem !important;
          font-weight: bold !important;
          margin-bottom: 0.5rem !important;
          line-height: 1.4 !important;
        }
      `
    }} />
  );
};