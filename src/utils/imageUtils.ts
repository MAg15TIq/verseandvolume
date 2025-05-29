/**
 * Utility functions for handling images, covers, and audio files
 */

import { Author, Book } from '@/types';

// Base paths for different asset types
export const ASSET_PATHS = {
  AUTHORS: '/images/authors',
  COVERS: '/images/covers',
  AUDIO_BOOKS: '/audio/books',
  AUDIO_POEMS: '/audio/poems',
} as const;

// Image size configurations
export const IMAGE_SIZES = {
  AUTHOR: {
    small: { width: 48, height: 48 },
    medium: { width: 96, height: 96 },
    large: { width: 128, height: 128 },
    xl: { width: 192, height: 192 },
  },
  COVER: {
    small: { width: 64, height: 96 },
    medium: { width: 128, height: 192 },
    large: { width: 192, height: 288 },
    xl: { width: 256, height: 384 },
  },
} as const;

/**
 * Get the local author image path
 */
export function getAuthorImagePath(authorId: string, size?: 'thumb' | 'medium' | 'large'): string {
  const suffix = size ? `-${size}` : '';
  return `${ASSET_PATHS.AUTHORS}/${authorId}${suffix}.jpg`;
}

/**
 * Get the local book cover path
 */
export function getBookCoverPath(bookId: string, size?: 'thumb' | 'medium' | 'large'): string {
  const suffix = size ? `-${size}` : '';
  return `${ASSET_PATHS.COVERS}/${bookId}${suffix}.jpg`;
}

/**
 * Get the audio file path for a book
 */
export function getBookAudioPath(bookId: string, language: 'en' | 'ur' = 'en', chapter?: string): string {
  const fileName = chapter ? `chapter-${chapter}.mp3` : 'full.mp3';
  return `${ASSET_PATHS.AUDIO_BOOKS}/${bookId}/${language}/${fileName}`;
}

/**
 * Get the audio file path for a poem
 */
export function getPoemAudioPath(authorId: string, poemId: string, language: 'en' | 'ur' = 'en'): string {
  return `${ASSET_PATHS.AUDIO_POEMS}/${authorId}/${language}/${poemId}.mp3`;
}

/**
 * Check if an image exists (client-side)
 */
export function checkImageExists(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}

/**
 * Get optimized image sources for an author
 */
export function getAuthorImageSources(author: Author): {
  thumbnail?: string;
  medium?: string;
  large?: string;
} {
  // If author already has optimized sources, use them
  if (author.imageSources) {
    return author.imageSources;
  }

  // Generate local paths as fallback
  return {
    thumbnail: getAuthorImagePath(author.id, 'thumb'),
    medium: getAuthorImagePath(author.id, 'medium'),
    large: getAuthorImagePath(author.id, 'large'),
  };
}

/**
 * Get the best available author image
 */
export function getBestAuthorImage(author: Author, preferredSize?: 'small' | 'medium' | 'large'): string {
  // First try the main image
  if (author.image) {
    return author.image;
  }

  // Then try size-specific images
  const sources = getAuthorImageSources(author);

  switch (preferredSize) {
    case 'small':
      return sources.thumbnail || sources.medium || sources.large || '';
    case 'medium':
      return sources.medium || sources.large || sources.thumbnail || '';
    case 'large':
      return sources.large || sources.medium || sources.thumbnail || '';
    default:
      return sources.medium || sources.large || sources.thumbnail || '';
  }
}

/**
 * Get the best available book cover
 */
export function getBestBookCover(book: Book, preferredSize?: 'small' | 'medium' | 'large'): string {
  // First try the main cover image
  if (book.coverImage) {
    return book.coverImage;
  }

  // Then try local cover images - map 'small' to 'thumb'
  const mappedSize = preferredSize === 'small' ? 'thumb' : preferredSize;
  const localCover = getBookCoverPath(book.id, mappedSize);
  return localCover;
}

/**
 * Generate a placeholder image URL for authors
 */
export function getAuthorPlaceholder(author: Author): string {
  const initials = author.name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);

  // Using a service like UI Avatars for consistent placeholders
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=random&color=fff&size=200`;
}

/**
 * Generate a placeholder image URL for book covers
 */
export function getBookCoverPlaceholder(book: Book): string {
  // Create a simple placeholder with book title
  const title = encodeURIComponent(book.title.substring(0, 20));
  const author = encodeURIComponent(book.author.substring(0, 15));

  return `https://via.placeholder.com/300x450/4F46E5/FFFFFF?text=${title}+by+${author}`;
}

/**
 * Get audio URL with language support
 */
export function getAudioUrl(audioUrl: string | { en?: string; ur?: string } | undefined, language: 'en' | 'ur' = 'en'): string | null {
  if (!audioUrl) return null;

  if (typeof audioUrl === 'string') {
    return audioUrl;
  }

  return audioUrl[language] || audioUrl.en || audioUrl.ur || null;
}

/**
 * Format duration in seconds to readable format
 */
export function formatDuration(seconds: number): string {
  if (isNaN(seconds)) return '00:00';

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Check if a book has audio content
 */
export function hasAudioContent(book: Book): boolean {
  return !!(book.hasAudio || book.audioUrl || book.isAudiobook);
}

/**
 * Check if a book is an audiobook (vs just having some audio)
 */
export function isAudiobook(book: Book): boolean {
  return !!(book.isAudiobook || book.audioChapters?.length);
}
