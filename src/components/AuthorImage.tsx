"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Author } from '@/types';

interface AuthorImageProps {
  author: Author;
  size?: 'small' | 'medium' | 'large' | 'xl';
  className?: string;
  showFallback?: boolean;
  priority?: boolean;
}

const sizeClasses = {
  small: 'w-12 h-12',
  medium: 'w-24 h-24',
  large: 'w-32 h-32',
  xl: 'w-48 h-48'
};

const sizeDimensions = {
  small: { width: 48, height: 48 },
  medium: { width: 96, height: 96 },
  large: { width: 128, height: 128 },
  xl: { width: 192, height: 192 }
};

export default function AuthorImage({
  author,
  size = 'medium',
  className = '',
  showFallback = true,
  priority = false
}: AuthorImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Determine the best image source based on size
  const getImageSrc = () => {
    if (imageError) return null;
    
    // Use size-specific image if available
    if (author.imageSources) {
      switch (size) {
        case 'small':
          return author.imageSources.thumbnail || author.image;
        case 'medium':
          return author.imageSources.medium || author.image;
        case 'large':
        case 'xl':
          return author.imageSources.large || author.image;
        default:
          return author.image;
      }
    }
    
    return author.image;
  };

  const imageSrc = getImageSrc();
  const dimensions = sizeDimensions[size];

  // Generate initials for fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {imageSrc && !imageError ? (
        <>
          {/* Loading placeholder */}
          {isLoading && (
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
          )}
          
          {/* Author image */}
          <Image
            src={imageSrc}
            alt={author.imageAlt || `Portrait of ${author.name}`}
            width={dimensions.width}
            height={dimensions.height}
            className={`rounded-full object-cover transition-opacity duration-300 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            priority={priority}
          />
        </>
      ) : showFallback ? (
        /* Fallback with initials */
        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
          <span className={`${
            size === 'small' ? 'text-xs' : 
            size === 'medium' ? 'text-sm' : 
            size === 'large' ? 'text-lg' : 'text-xl'
          }`}>
            {getInitials(author.name)}
          </span>
        </div>
      ) : null}
    </div>
  );
}
