import { supabase } from '@/integrations/supabase/client';

export const captureHTMLSnapshot = async (auditId: string): Promise<string> => {
  try {
    console.log('Starting HTML snapshot capture for audit:', auditId);
    
    // Get the current audit page content by finding the audit container
    const auditContainer = document.querySelector('[data-audit-container]');
    if (!auditContainer) {
      throw new Error('Audit container not found for HTML snapshot');
    }

    // Clone the container to avoid modifying the original
    const clonedContainer = auditContainer.cloneNode(true) as HTMLElement;
    
    // Inline all computed styles to make the snapshot self-contained
    await inlineStyles(clonedContainer);
    
    // Create a complete HTML document with embedded styles
    const completeHTML = createCompleteHTMLDocument(clonedContainer);
    
    console.log('HTML snapshot captured successfully, size:', completeHTML.length);
    return completeHTML;
  } catch (error) {
    console.error('Error capturing HTML snapshot:', error);
    throw error;
  }
};

const inlineStyles = async (element: HTMLElement): Promise<void> => {
  // Get all elements including the root
  const allElements = [element, ...element.querySelectorAll('*')] as HTMLElement[];
  
  for (const el of allElements) {
    try {
      // Get computed styles for this element
      const computedStyles = window.getComputedStyle(el);
      const inlineStylesArray: string[] = [];
      
      // Copy important computed styles to inline styles
      const importantStyles = [
        'display', 'position', 'top', 'left', 'right', 'bottom',
        'width', 'height', 'margin', 'padding', 'border',
        'background', 'color', 'font-family', 'font-size', 'font-weight',
        'text-align', 'line-height', 'opacity', 'visibility',
        'z-index', 'transform', 'box-shadow', 'border-radius',
        'flex', 'grid', 'align-items', 'justify-content'
      ];
      
      for (const property of importantStyles) {
        const value = computedStyles.getPropertyValue(property);
        if (value && value !== 'initial' && value !== 'normal') {
          inlineStylesArray.push(`${property}: ${value}`);
        }
      }
      
      // Set the inline styles
      if (inlineStylesArray.length > 0) {
        el.style.cssText = inlineStylesArray.join('; ');
      }
    } catch (error) {
      console.warn('Could not inline styles for element:', el, error);
    }
  }
};

const createCompleteHTMLDocument = (content: HTMLElement): string => {
  // Create a complete, self-contained HTML document
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Locked Audit Report</title>
  <style>
    /* Reset and base styles */
    * { box-sizing: border-box; }
    body { 
      margin: 0; 
      padding: 0; 
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif;
      background: #f8fafc;
    }
    .locked-audit-notice {
      background: #f3f4f6;
      border: 1px solid #d1d5db;
      padding: 12px;
      margin: 16px;
      border-radius: 8px;
      text-align: center;
      color: #374151;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="locked-audit-notice">
    🔒 This is a locked audit report, captured and preserved as it appeared at the time of locking.
  </div>
  ${content.outerHTML}
</body>
</html>`;
};

export const lockAuditWithSnapshot = async (auditId: string): Promise<void> => {
  try {
    console.log('Starting complete lock process with HTML snapshot for audit:', auditId);
    
    // First, capture the HTML snapshot
    const htmlSnapshot = await captureHTMLSnapshot(auditId);
    
    // Then get the current audit data for JSON snapshot
    const { data: audit, error: fetchError } = await supabase
      .from('audit_reports')
      .select('*')
      .eq('id', auditId)
      .single();

    if (fetchError) throw fetchError;

    // Generate the JSON snapshot (keeping existing functionality)
    const currentDate = new Date();
    const jsonSnapshot = {
      id: audit.id,
      client_name: audit.client_name,
      share_url_slug: audit.share_url_slug,
      audit_code: audit.audit_code,
      created_at: audit.created_at,
      status: audit.status,
      reviewer_name: audit.reviewer_name,
      loom_video_url: audit.loom_video_url,
      key_strengths: audit.key_strengths,
      priority_actions: audit.priority_actions,
      strategic_insights: audit.strategic_insights,
      review_status: audit.review_status,
      audit_data: audit.audit_data,
      ai_feedback: audit.ai_feedback,
      snapshot_created_at: currentDate.toISOString(),
      snapshot_version: '2.0.0', // Updated version for HTML snapshots
      header_template: {
        title: "🔍 Free LLM Visibility Mini‑Audit 🔥 ✨",
        display_date: currentDate.toLocaleDateString(),
        display_time: currentDate.toLocaleTimeString(),
        locked_at: currentDate.toISOString()
      },
      ui_template: {
        show_live_insights_badge: false,
        show_time_badge: true
      }
    };

    // Update the audit with both HTML and JSON snapshots
    const { error: updateError } = await supabase
      .from('audit_reports')
      .update({
        is_locked: true,
        html_snapshot: htmlSnapshot,
        snapshot_data: jsonSnapshot,
        snapshot_generated_at: currentDate.toISOString(),
        snapshot_version: '2.0.0'
      })
      .eq('id', auditId);

    if (updateError) throw updateError;

    console.log('Successfully locked audit with complete HTML snapshot');
  } catch (error) {
    console.error('Error locking audit with snapshot:', error);
    throw error;
  }
};
