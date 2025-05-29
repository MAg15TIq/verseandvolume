"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import BookmarkButton from './BookmarkButton';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import {
  BookOpenIcon,
  HeartIcon,
  EyeIcon,
  ClockIcon,
  TagIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

interface PoemCardProps {
  id: string;
  title: string;
  author: string;
  authorId: string;
  year?: number;
  themes?: string[];
  language: 'en' | 'ur' | 'both';
  content: string[] | { en?: string[]; ur?: string[] };
  type?: string;
  showExpandableContent?: boolean;
  featured?: boolean;
  readingTime?: number;
}

export default function PoemCard({
  id,
  title,
  author,
  authorId,
  year,
  themes,
  language,
  content,
  type = 'poem',
  showExpandableContent = false,
  featured = false,
  readingTime
}: PoemCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const locale = useLocale();
  const t = useTranslations();
  const { addToReadingHistory } = useUserPreferences();

  // Helper function to create localized paths
  const localizedPath = (path: string) => {
    return `/${locale}${path}`;
  };

  // Get content for preview
  const getContentArray = (): string[] => {
    if (Array.isArray(content)) {
      return content;
    } else if (typeof content === 'object') {
      // Prefer content in the current locale, fallback to available content
      if (locale === 'ur' && content.ur) {
        return content.ur;
      } else if (locale === 'en' && content.en) {
        return content.en;
      } else if (content.en) {
        return content.en;
      } else if (content.ur) {
        return content.ur;
      }
    }
    return [];
  };

  // Get preview content (first few lines)
  const getPreviewContent = () => {
    const contentArray = getContentArray();
    if (contentArray.length === 0) return 'No preview available';

    // For ghazals, take first 2 lines (first couplet)
    // For other poems, take first 3-4 lines
    const linesToShow = type === 'ghazal' ? 2 : 3;
    const preview = contentArray.slice(0, linesToShow).join(' ').trim();
    return preview.length > 120 ? preview.substring(0, 120) + '...' : preview;
  };

  // Helper functions for enhanced design
  const getTypeIcon = () => {
    switch (type) {
      case 'ghazal':
        return <HeartIcon className="w-4 h-4" />;
      case 'sonnet':
        return <SparklesIcon className="w-4 h-4" />;
      default:
        return <BookOpenIcon className="w-4 h-4" />;
    }
  };

  const getLanguageLabel = () => {
    switch (language) {
      case 'en':
        return 'English';
      case 'ur':
        return 'اردو';
      case 'both':
        return 'Bilingual';
      default:
        return '';
    }
  };

  const estimatedReadTime = readingTime || Math.ceil(getContentArray().join(' ').split(' ').length / 200);

  // Get expandable content (more lines for preview)
  const getExpandableContent = () => {
    const contentArray = getContentArray();
    const linesToShow = type === 'ghazal' ? 6 : 8; // Show more lines when expanded
    return contentArray.slice(0, linesToShow);
  };

  const handleClick = (e: React.MouseEvent) => {
    // Don't prevent default - let the link navigate normally
    addToReadingHistory('poems', id);
  };

  // Get the correct route based on content type
  const getContentRoute = () => {
    if (type === 'ghazal') {
      return `/ghazals/${id}`;
    }
    return `/poetry/${id}`;
  };

  return (
    <div
      className={`content-card group relative ${featured ? 'ring-2 ring-literary-gold/30' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute -top-2 -right-2 bg-literary-gold text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg z-10">
          <SparklesIcon className="w-3 h-3 inline mr-1" />
          Featured
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {getTypeIcon()}
            <span className="text-xs font-medium text-accent-600 dark:text-accent-400 uppercase tracking-wide">
              {type}
            </span>
            <span className="text-xs text-paper-500 dark:text-paper-400">•</span>
            <span className="text-xs text-paper-600 dark:text-paper-400">
              {getLanguageLabel()}
            </span>
          </div>

          <h3 className={`text-xl font-semibold mb-2 text-paper-900 dark:text-paper-100 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors duration-300 ${language === 'ur' ? 'font-urdu text-right' : ''}`}>
            <Link
              href={localizedPath(getContentRoute())}
              className="hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
              onClick={handleClick}
            >
              {title}
            </Link>
          </h3>

          <div className="flex items-center gap-4 text-sm text-paper-600 dark:text-paper-400 mb-3">
            <Link
              href={localizedPath(`/authors/${authorId}`)}
              className="hover:text-accent-600 dark:hover:text-accent-400 transition-colors font-medium"
            >
              {author}
            </Link>
            {year && (
              <>
                <span>•</span>
                <span>{year}</span>
              </>
            )}
            <span>•</span>
            <div className="flex items-center gap-1">
              <ClockIcon className="w-3 h-3" />
              <span>{estimatedReadTime} min read</span>
            </div>
          </div>
        </div>

        <BookmarkButton
          id={id}
          type="poems"
          className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>

      {/* Themes */}
      {themes && themes.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          <TagIcon className="w-4 h-4 text-paper-500 dark:text-paper-400 mt-0.5" />
          <div className="flex flex-wrap gap-1">
            {themes.slice(0, 3).map(theme => (
              <span
                key={theme}
                className="px-2 py-1 text-xs rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 font-medium"
              >
                {theme}
              </span>
            ))}
            {themes.length > 3 && (
              <span className="px-2 py-1 text-xs rounded-full bg-paper-200 dark:bg-paper-700 text-paper-600 dark:text-paper-400 font-medium">
                +{themes.length - 3}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Content Preview */}
      <div className="mb-4">
        <p className={`text-sm text-paper-700 dark:text-paper-300 line-clamp-3 leading-relaxed ${language === 'ur' ? 'font-urdu text-right' : ''}`}>
          {getPreviewContent()}
        </p>
      </div>

        {/* Expandable content */}
        {showExpandableContent && (
          <div className="mb-4">
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
              isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h4 className="text-sm font-semibold mb-2 text-gray-800 dark:text-gray-200">
                  {type === 'ghazal' ? t('poetry.ghazal') : t('poetry.poem')} Preview
                </h4>
                <div className={`text-sm text-gray-700 dark:text-gray-300 leading-relaxed ${
                  language === 'ur' ? 'text-right font-urdu' : 'text-left'
                }`}>
                  {getExpandableContent().map((line, index) => (
                    <p key={index} className="mb-2">
                      {line}
                    </p>
                  ))}
                  <p className="text-xs text-gray-500 dark:text-gray-400 italic mt-3">
                    ...{t('book.excerpt')}
                  </p>
                </div>
              </div>
            </div>

            {error && (
              <div className="mt-2 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-sm text-red-700 dark:text-red-300">
                {error}
              </div>
            )}

            <button
              onClick={async (e) => {
                // Prevent event bubbling to avoid triggering card navigation
                e.preventDefault();
                e.stopPropagation();

                if (!isExpanded) {
                  setIsLoading(true);
                  setError(null);

                  try {
                    // Simulate content loading (in real app, this might fetch additional content)
                    await new Promise(resolve => setTimeout(resolve, 300));
                    setIsExpanded(true);
                  } catch (err) {
                    setError('Failed to load preview content');
                  } finally {
                    setIsLoading(false);
                  }
                } else {
                  setIsExpanded(false);
                  setError(null);
                }
              }}
              className="mt-2 read-more-button"
              type="button"
              aria-expanded={isExpanded}
              aria-label={isExpanded ? t('book.showLess') : 'Show preview lines'}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : (isExpanded ? t('book.showLess') : 'Show Preview')}
            </button>
          </div>
        )}

      {/* Footer */}
      <div className="flex justify-between items-center pt-4 border-t border-paper-200/50 dark:border-paper-700/50">
        <Link
          href={localizedPath(getContentRoute())}
          className="inline-flex items-center gap-2 text-accent-600 dark:text-accent-400 text-sm font-medium hover:text-accent-700 dark:hover:text-accent-300 transition-colors duration-200 group/link"
          onClick={handleClick}
          aria-label={`Read full ${type === 'ghazal' ? 'ghazal' : 'poem'}: ${title}`}
        >
          <EyeIcon className="w-4 h-4" />
          {type === 'ghazal' ? 'Read Full Ghazal' : t('poetry.readFull')}
          <span className="transform group-hover/link:translate-x-1 transition-transform duration-200">→</span>
        </Link>

        <div className="flex items-center gap-2 text-xs text-paper-500 dark:text-paper-400">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Click to read
          </span>
        </div>
      </div>
    </div>
  );
}
