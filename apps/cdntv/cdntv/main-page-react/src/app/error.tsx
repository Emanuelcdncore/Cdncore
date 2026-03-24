'use client'

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-2xl w-full space-y-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="text-xl font-semibold">
            Something went wrong
          </AlertTitle>
          <AlertDescription className="mt-2">
            <p className="mb-4">
              An unexpected error occurred. Please try refreshing the page or return to the home page.
            </p>
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-4 p-4 bg-destructive/10 rounded-md border border-destructive/20">
                <summary className="cursor-pointer font-medium mb-2">
                  Error Details (Development Only)
                </summary>
                <pre className="text-xs overflow-auto mt-2">
                  {error.message}
                  {error.stack && (
                    <>
                      {'\n\nStack Trace:'}
                      {error.stack}
                    </>
                  )}
                  {error.digest && (
                    <>
                      {'\n\nError Digest:'}
                      {error.digest}
                    </>
                  )}
                </pre>
              </details>
            )}
          </AlertDescription>
        </Alert>

        <div className="flex gap-4 justify-center">
          <Button
            onClick={reset}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
          <Button asChild variant="default">
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Go Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

