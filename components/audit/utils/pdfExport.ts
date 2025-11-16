import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const exportToPDF = async (element: HTMLElement, filename: string) => {
  try {
    // Hide any scrollbars and ensure full content is visible
    const originalStyle = {
      overflow: document.body.style.overflow,
      height: document.body.style.height,
    };
    
    document.body.style.overflow = 'visible';
    document.body.style.height = 'auto';
    
    // Configure html2canvas for high quality output
    const canvas = await html2canvas(element, {
      scale: 2, // Higher resolution
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: element.scrollWidth,
      height: element.scrollHeight,
      scrollX: 0,
      scrollY: 0,
    });
    
    // Restore original styles
    document.body.style.overflow = originalStyle.overflow;
    document.body.style.height = originalStyle.height;
    
    const imgData = canvas.toDataURL('image/png');
    
    // Calculate PDF dimensions
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    
    // A4 size in points (1 point = 1/72 inch)
    const pdfWidth = 595.28;
    const pdfHeight = 841.89;
    
    // Calculate scaling to fit content to page width with margins
    const margin = 40;
    const maxWidth = pdfWidth - (margin * 2);
    const scale = maxWidth / imgWidth;
    const scaledHeight = imgHeight * scale;
    
    // Create PDF
    const pdf = new jsPDF('p', 'pt', 'a4');
    
    // If content is longer than one page, we need to split it
    let remainingHeight = scaledHeight;
    let position = 0;
    let pageHeight = pdfHeight - (margin * 2);
    
    while (remainingHeight > 0) {
      // Add image to current page
      pdf.addImage(
        imgData,
        'PNG',
        margin,
        margin - position,
        maxWidth,
        scaledHeight
      );
      
      remainingHeight -= pageHeight;
      position += pageHeight;
      
      if (remainingHeight > 0) {
        pdf.addPage();
      }
    }
    
    // Save the PDF
    pdf.save(`${filename.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_audit_report.pdf`);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};