"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import BookmarkButton from './BookmarkButton';
import BookCover from './BookCover';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { Book } from '@/types';

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  authorId: string;
  coverImage: string;
  description: string;
  publishYear?: number;
  genre?: string[];
  language: 'en' | 'ur' | 'both';
  rating?: number;
  excerpt?: string[];
  showExpandableContent?: boolean;
  contentType?: 'prose' | 'novels' | 'stories';
}

export default function BookCard({
  id,
  title,
  author,
  authorId,
  coverImage,
  description,
  publishYear,
  genre,
  language,
  rating,
  excerpt,
  showExpandableContent = false,
  contentType = 'prose'
}: BookCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const locale = useLocale();
  const t = useTranslations();
  const { addToReadingHistory } = useUserPreferences();

  // Helper function to create localized paths
  const localizedPath = (path: string) => {
    return `/${locale}${path}`;
  };

  // Truncate description if it's too long
  const truncatedDescription = description.length > 150
    ? `${description.substring(0, 150)}...`
    : description;

  // Generate star rating
  const renderStars = () => {
    if (!rating) return null;

    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`full-${i}`} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="halfGradient">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#D1D5DB" />
            </linearGradient>
          </defs>
          <path fill="url(#halfGradient)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    // Empty stars
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300 dark:text-gray-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    return (
      <div className="flex items-center mt-1">
        {stars}
        <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">{rating.toFixed(1)}</span>
      </div>
    );
  };

  // Handle click to add to reading history
  const handleClick = (e: React.MouseEvent) => {
    // Don't prevent default - let the link navigate normally
    addToReadingHistory('books', id);
  };

  // Handle card hover without interfering with links
  const handleCardMouseEnter = () => {
    setIsHovered(true);
  };

  const handleCardMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`block h-full transition-all duration-300 ${
        isHovered ? 'transform -translate-y-1 shadow-lg' : 'shadow'
      }`}
      onMouseEnter={handleCardMouseEnter}
      onMouseLeave={handleCardMouseLeave}
    >
      <div className="flex flex-col h-full overflow-hidden bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
        <div className="relative h-64 overflow-hidden flex items-center justify-center">
          <BookCover
            book={{
              id,
              title,
              author,
              authorId,
              coverImage,
              language,
              genre: genre || [],
              description: description || '',
              excerpt: excerpt || []
            } as Book}
            size="large"
            className={`transition-transform duration-500 ${
              isHovered ? 'scale-105' : 'scale-100'
            }`}
            priority={false}
          />

          {language && (
            <div className="absolute top-2 right-2 px-2 py-1 text-xs rounded bg-black/60 text-white">
              {language === 'en' ? 'English' : language === 'ur' ? 'اردو' : 'Bilingual'}
            </div>
          )}

          <div className="absolute top-2 left-2">
            <BookmarkButton
              id={id}
              type="books"
              className="bg-black/60 p-1 rounded hover:bg-black/80 transition-colors"
            />
          </div>
        </div>

        <div className="flex-1 p-4">
          <h3 className={`text-xl font-semibold mb-1 ${language === 'ur' ? 'font-urdu' : ''}`}>
            <Link
              href={localizedPath(`/${contentType}/${id}`)}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={handleClick}
            >
              {title}
            </Link>
          </h3>

          <div className="flex items-center mb-2">
            <Link
              href={localizedPath(`/authors/${authorId}`)}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {author}
            </Link>
            {publishYear && (
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                ({publishYear})
              </span>
            )}
          </div>

          {renderStars()}

          {genre && genre.length > 0 && (
            <div className="flex flex-wrap gap-1 my-2">
              {genre.slice(0, 3).map((g) => (
                <span
                  key={g}
                  className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                >
                  {g}
                </span>
              ))}
            </div>
          )}

          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {truncatedDescription}
          </p>

          {/* Expandable excerpt content */}
          {showExpandableContent && excerpt && excerpt.length > 0 && (
            <div className="mt-4">
              <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
                isExpanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h4 className="text-sm font-semibold mb-2 text-gray-800 dark:text-gray-200">
                    {t('book.excerpt')} Preview
                  </h4>
                  <div className={`text-sm text-gray-700 dark:text-gray-300 leading-relaxed ${
                    language === 'ur' ? 'text-right font-urdu' : 'text-left'
                  }`}>
                    {excerpt.slice(0, 5).map((line, index) => (
                      <p key={index} className="mb-2">
                        {line}
                      </p>
                    ))}
                    {excerpt.length > 5 && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 italic mt-3">
                        ...{t('book.excerpt')} continues
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={(e) => {
                  // Prevent event bubbling to avoid triggering card navigation
                  e.preventDefault();
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
                className="mt-2 read-more-button"
                type="button"
                aria-expanded={isExpanded}
                aria-label={isExpanded ? t('book.showLess') : 'Show excerpt preview'}
              >
                {isExpanded ? t('book.showLess') : 'Show Preview'}
              </button>
            </div>
          )}
        </div>

        <div className="p-4 pt-0">
          <Link
            href={localizedPath(`/${contentType}/${id}`)}
            className="inline-block text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded px-1 py-1 transition-colors duration-200"
            onClick={handleClick}
            aria-label={`Read full ${contentType.slice(0, -1)}: ${title}`}
          >
            {showExpandableContent ? t('prose.readFull') : 'Read more'} →
          </Link>
        </div>
      </div>
    </div>
  );
}
