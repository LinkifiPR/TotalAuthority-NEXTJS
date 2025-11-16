"use client";

import React, { useEffect, useMemo, useState } from 'react';

interface MonochromeLogoProps {
  src: string;
  alt: string;
  className?: string;
  /** If true, attempt to key out near-white backgrounds to transparent */
  removeWhiteBackground?: boolean;
}

// Small, dependency-free canvas processor to unify logo appearance.
// - Optionally removes white backgrounds
// - Returns a data URL that we can style consistently
export const MonochromeLogo: React.FC<MonochromeLogoProps> = ({ src, alt, className, removeWhiteBackground }) => {
  const [processedSrc, setProcessedSrc] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      if (cancelled) return;
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return setProcessedSrc(src);

        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0);

        if (removeWhiteBackground) {
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          // Remove near-white backgrounds (tolerance threshold)
          const T = 242; // 0-255
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            // If pixel is near-white, make transparent
            if (r >= T && g >= T && b >= T) {
              data[i + 3] = 0;
            }
          }
          ctx.putImageData(imageData, 0, 0);
        }

        const url = canvas.toDataURL('image/png');
        setProcessedSrc(url);
      } catch (e) {
        setProcessedSrc(src);
      }
    };
    img.onerror = () => setProcessedSrc(src);
    img.src = src;

    return () => { cancelled = true; };
  }, [src, removeWhiteBackground]);

  // Force a single-color look via CSS filter to black; parent can control opacity
  const style = useMemo<React.CSSProperties>(() => ({
    filter: 'grayscale(1) brightness(0) saturate(100%)',
  }), []);

  return (
    <img
      src={processedSrc ?? src}
      alt={alt}
      className={className}
      style={style}
      loading="lazy"
      decoding="async"
    />
  );
};

export default MonochromeLogo;
