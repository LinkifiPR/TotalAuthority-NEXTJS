"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App error boundary caught:', error);
  }, [error]);

  const isChunkLoadError =
    error.name === 'ChunkLoadError' ||
    /Loading chunk [\w-]+ failed/i.test(error.message) ||
    /Loading CSS chunk [\w-]+ failed/i.test(error.message);

  const handleRetry = () => {
    if (isChunkLoadError && typeof window !== 'undefined') {
      window.location.reload();
      return;
    }
    reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-slate-900 mb-3">
          Something went wrong
        </h1>
        <p className="text-slate-600 mb-6">
          {isChunkLoadError
            ? 'The site has been updated. Please reload to get the latest version.'
            : 'An unexpected error occurred while loading this page.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={handleRetry}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            {isChunkLoadError ? 'Reload page' : 'Try again'}
          </Button>
          <Link href="/">
            <Button variant="outline">Go to homepage</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
