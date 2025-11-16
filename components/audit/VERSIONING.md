
# Audit Renderer Versioning System

## Overview
This system ensures that locked audits are completely frozen and never affected by template changes. Each audit is locked with a specific version of the renderer that it will use forever.

## Current Versions
- **V1**: Original audit template (SnapshotAuditRendererV1.tsx)
  - Contains all original sections: VideoReviewSection, VisibilityScoreChart, etc.
  - No CTA sections for locked audits
  - Used by all audits locked before the Mega Summary addition

- **V2**: Mega Summary template (SnapshotAuditRendererV2.tsx) 
  - All V1 sections PLUS new MegaSummarySection at the bottom
  - Shows key metrics summary with client name
  - Used by all audits locked during the Mega Summary period

- **V3**: Back to original template (SnapshotAuditRendererV3.tsx)
  - All original sections from V1 (no Mega Summary)
  - Same as V1 but represents the current template state
  - Used by all audits locked after Mega Summary removal

- **V4**: Original template with PDF export (SnapshotAuditRendererV4.tsx & LiveAuditRendererV4.tsx)
  - All original sections from V1/V3 (no Mega Summary)
  - PDF export functionality using html2canvas and jsPDF
  - Maintains exact visual appearance when exported
  - Available for both locked and unlocked audits

## How It Works

### When Locking an Audit
1. Current snapshot version is saved to `snapshot_version` field (currently 'v3')
2. Audit data is saved to `snapshot_data` field
3. `is_locked` is set to true

### When Rendering a Locked Audit  
1. `AuditContentRenderer` checks the `snapshot_version`
2. Uses a switch statement to render with the correct versioned renderer
3. Locked audits are completely isolated from live template changes

### When Creating New Versions

**To add a new version (e.g., V4):**

1. **Copy the latest renderer:**
   ```bash
   cp SnapshotAuditRendererV3.tsx SnapshotAuditRendererV4.tsx
   ```

2. **Make your changes in the V4 file:**
   - Update component name to `SnapshotAuditRendererV4`
   - Make your template modifications
   - Update console.log to show "V4 template"

3. **Update the version constant:**
   ```typescript
   // In snapshotUtils.ts
   const CURRENT_SNAPSHOT_VERSION = 'v4';
   ```

4. **Add the new case to the renderer:**
   ```typescript
   // In AuditContentRenderer.tsx
    case 'v4':
      return <SnapshotAuditRendererV4 snapshotData={...} auditData={...} />;
   ```

5. **Test the system:**
   - Lock a new audit (should use V4)
   - Verify old locked audits still use V1/V2/V3
   - Verify unlocked audits use live renderer

## Version History
- **V1**: Original template with all sections, no CTA
- **V2**: Added MegaSummarySection at bottom with metrics overview
- **V3**: Removed MegaSummarySection, back to original layout
- **V4**: Added PDF export functionality while maintaining original layout

## Benefits
- ✅ Locked audits never change appearance
- ✅ New audits get latest template improvements  
- ✅ Easy to track which version each audit uses
- ✅ No HTML capture complexity
- ✅ Full React component functionality preserved
- ✅ Perfect testing: V1 audits will never show Mega Summary, V2 will always show it, V3+ will not show it
