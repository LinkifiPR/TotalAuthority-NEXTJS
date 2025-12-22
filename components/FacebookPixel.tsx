"use client";

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef, Suspense } from 'react';

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    _fbq: unknown;
  }
}

function FacebookPixelTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);
  const previousUrl = useRef<string>('');

  useEffect(() => {
    const search = searchParams?.toString() ?? '';
    const currentUrl = `${pathname}${search ? `?${search}` : ''}`;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      previousUrl.current = currentUrl;
      return;
    }

    if (currentUrl !== previousUrl.current) {
      previousUrl.current = currentUrl;
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'PageView');
      }
    }
  }, [pathname, searchParams]);

  return null;
}

export function FacebookPixel() {
  return (
    <Suspense fallback={null}>
      <FacebookPixelTracker />
    </Suspense>
  );
}
