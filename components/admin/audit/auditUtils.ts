
export const convertLoomUrl = (url: string): string => {
  // If it's already an embed URL, return as is
  if (url.includes('/embed/')) {
    return url;
  }
  
  // Convert share URL to embed URL
  const shareMatch = url.match(/loom\.com\/share\/([a-zA-Z0-9]+)/);
  if (shareMatch) {
    return `https://www.loom.com/embed/${shareMatch[1]}`;
  }
  
  // If it's HTML embed code, extract the src
  const embedMatch = url.match(/src="([^"]*loom\.com\/embed\/[^"]*)"/);
  if (embedMatch) {
    return embedMatch[1];
  }
  
  return url; // Return original if no pattern matches
};
