"use client";

import { useState, useEffect } from 'react';

interface ContentLoadingStateProps {
  isLoading?: boolean;
  error?: string | null;
  children: React.ReactNode;
  loadingMessage?: string;
  errorMessage?: string;
  retryAction?: () => void;
}

export default function ContentLoadingState({
  isLoading = false,
  error = null,
  children,
  loadingMessage = "Loading content...",
  errorMessage = "Failed to load content",
  retryAction
}: ContentLoadingStateProps) {
  const [showRetry, setShowRetry] = useState(false);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setShowRetry(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">{loadingMessage}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{errorMessage}</p>
          {showRetry && retryAction && (
            <button
              onClick={retryAction}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
