"use client";

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { getDailyFeaturedArtwork, getRandomFeaturedArtwork, ArtworkItem } from '@/utils/featuredArtwork';

interface FeaturedImageItemProps {
  imageSrc?: string;
  altText?: string;
  useDaily?: boolean; // Whether to use daily rotation or random
  showArtworkInfo?: boolean; // Whether to show artwork title and artist
}

export default function FeaturedImageItem({
  imageSrc,
  altText = "Featured Artwork",
  useDaily = true,
  showArtworkInfo = true
}: FeaturedImageItemProps) {
  const t = useTranslations();
  const [artwork, setArtwork] = useState<ArtworkItem | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // If custom imageSrc is provided, don't use the artwork system
    if (imageSrc) return;

    // Get featured artwork
    const selectedArtwork = useDaily ? getDailyFeaturedArtwork() : getRandomFeaturedArtwork();
    setArtwork(selectedArtwork);
  }, [imageSrc, useDaily]);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  const displayImageSrc = imageSrc || artwork?.imagePath;
  const displayAltText = altText !== "Featured Artwork" ? altText : artwork?.altText || altText;

  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      {displayImageSrc && !imageError ? (
        <>
          <div className="relative w-full h-4/5 mb-2">
            <Image
              src={displayImageSrc}
              alt={displayAltText}
              fill
              className={`object-cover rounded-lg shadow-sm transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              priority
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-paper-200 dark:bg-paper-700 rounded-lg animate-pulse" />
            )}
          </div>

          {/* Artwork Information */}
          {showArtworkInfo && artwork && imageLoaded && (
            <div className="text-center w-full">
              <h3 className="text-sm font-medium text-paper-800 dark:text-paper-200 truncate">
                {artwork.title}
              </h3>
              <p className="text-xs text-paper-600 dark:text-paper-400 truncate">
                {artwork.artist}
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="w-full h-4/5 bg-paper-300 dark:bg-paper-700 border-2 border-paper-400 dark:border-paper-600 flex flex-col items-center justify-center font-sans text-sm text-paper-600 dark:text-paper-400 relative overflow-hidden rounded-lg">
          <div className="text-center">
            <div className="mb-2">🎨</div>
            <div>Featured Artwork</div>
            <div className="text-xs mt-1 opacity-70">Loading...</div>
          </div>
        </div>
      )}
    </div>
  );
}
