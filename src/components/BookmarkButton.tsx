'use client';

import { useUserPreferences } from '@/hooks/useUserPreferences';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';

interface BookmarkButtonProps {
  id: string;
  type: 'books' | 'poems' | 'authors';
  className?: string;
  showLabel?: boolean;
}

export default function BookmarkButton({ 
  id, 
  type, 
  className = '',
  showLabel = false
}: BookmarkButtonProps) {
  const t = useTranslations();
  const { isBookmarked, toggleBookmark, isLoaded } = useUserPreferences();
  const [isMarked, setIsMarked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Update local state when preferences are loaded
  useEffect(() => {
    if (isLoaded) {
      setIsMarked(isBookmarked(type, id));
    }
  }, [isLoaded, isBookmarked, type, id]);

  const handleToggleBookmark = () => {
    toggleBookmark(type, id);
    setIsMarked(!isMarked);
    
    // Add animation
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  if (!isLoaded) {
    return null; // Don't render until preferences are loaded
  }

  return (
    <button
      onClick={handleToggleBookmark}
      className={`bookmark-button flex items-center gap-1 transition-all ${
        isAnimating ? 'scale-125' : ''
      } ${className}`}
      aria-label={isMarked ? t('bookmark.remove') : t('bookmark.add')}
    >
      <svg 
        className={`w-5 h-5 transition-colors ${
          isMarked 
            ? 'text-yellow-500 fill-yellow-500' 
            : 'text-gray-400 dark:text-gray-600 hover:text-yellow-500 dark:hover:text-yellow-500'
        }`}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        fill={isMarked ? 'currentColor' : 'none'}
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
        />
      </svg>
      
      {showLabel && (
        <span className="text-sm">
          {isMarked ? t('bookmark.saved') : t('bookmark.save')}
        </span>
      )}
    </button>
  );
}
