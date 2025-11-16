"use client";


import React from 'react';

interface StaticAuditRendererProps {
  htmlSnapshot: string;
  clientName: string;
}

export const StaticAuditRenderer: React.FC<StaticAuditRendererProps> = ({
  htmlSnapshot,
  clientName
}) => {
  console.log('StaticAuditRenderer: Rendering completely locked audit from HTML snapshot - NO live components');

  // Create a completely isolated rendering environment
  // This ensures NO live React components are rendered for locked audits
  return (
    <div className="static-audit-container w-full">
      <div 
        className="w-full static-audit-content"
        dangerouslySetInnerHTML={{ __html: htmlSnapshot }}
        style={{
          // Ensure the snapshot content takes full control
          minHeight: '100vh',
          width: '100%'
        }}
      />
      {/* NO React components should ever be rendered here - everything comes from the HTML snapshot */}
    </div>
  );
};
