"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Book } from '@/types';

interface BookCoverProps {
  book: Book;
  size?: 'small' | 'medium' | 'large' | 'xl';
  className?: string;
  showFallback?: boolean;
  priority?: boolean;
  aspectRatio?: 'portrait' | 'square';
}

const sizeClasses = {
  small: 'w-16 h-24',
  medium: 'w-32 h-48',
  large: 'w-48 h-72',
  xl: 'w-64 h-96'
};

const sizeDimensions = {
  small: { width: 64, height: 96 },
  medium: { width: 128, height: 192 },
  large: { width: 192, height: 288 },
  xl: { width: 256, height: 384 }
};

const squareSizeClasses = {
  small: 'w-16 h-16',
  medium: 'w-32 h-32',
  large: 'w-48 h-48',
  xl: 'w-64 h-64'
};

const squareSizeDimensions = {
  small: { width: 64, height: 64 },
  medium: { width: 128, height: 128 },
  large: { width: 192, height: 192 },
  xl: { width: 256, height: 256 }
};

export default function BookCover({
  book,
  size = 'medium',
  className = '',
  showFallback = true,
  priority = false,
  aspectRatio = 'portrait'
}: BookCoverProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const isSquare = aspectRatio === 'square';
  const currentSizeClasses = isSquare ? squareSizeClasses : sizeClasses;
  const currentDimensions = isSquare ? squareSizeDimensions : sizeDimensions;
  const dimensions = currentDimensions[size];

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  // Generate a color based on book title for consistent fallback colors
  const getBookColor = (title: string) => {
    const colors = [
      'from-red-500 to-pink-600',
      'from-blue-500 to-indigo-600',
      'from-green-500 to-teal-600',
      'from-yellow-500 to-orange-600',
      'from-purple-500 to-violet-600',
      'from-gray-500 to-slate-600'
    ];
    
    const hash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  return (
    <div className={`relative ${currentSizeClasses[size]} ${className}`}>
      {book.coverImage && !imageError ? (
        <>
          {/* Loading placeholder */}
          {isLoading && (
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
          )}
          
          {/* Book cover image */}
          <Image
            src={book.coverImage}
            alt={`Cover of ${book.title}`}
            width={dimensions.width}
            height={dimensions.height}
            className={`rounded-lg object-cover shadow-md transition-opacity duration-300 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            priority={priority}
          />
        </>
      ) : showFallback ? (
        /* Fallback cover design */
        <div className={`w-full h-full bg-gradient-to-br ${getBookColor(book.title)} rounded-lg shadow-md flex flex-col items-center justify-center text-white p-2`}>
          <div className="text-center">
            <div className={`font-bold leading-tight mb-1 ${
              size === 'small' ? 'text-xs' : 
              size === 'medium' ? 'text-sm' : 
              size === 'large' ? 'text-base' : 'text-lg'
            }`}>
              {book.title.length > 30 ? `${book.title.substring(0, 30)}...` : book.title}
            </div>
            <div className={`opacity-80 ${
              size === 'small' ? 'text-xs' : 
              size === 'medium' ? 'text-xs' : 
              size === 'large' ? 'text-sm' : 'text-base'
            }`}>
              {book.author}
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-2 right-2 opacity-20">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
          </div>
        </div>
      ) : null}
      
      {/* Audio indicator */}
      {book.hasAudio && (
        <div className="absolute top-1 left-1 bg-blue-600 text-white rounded-full p-1">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          </svg>
        </div>
      )}
    </div>
  );
}
