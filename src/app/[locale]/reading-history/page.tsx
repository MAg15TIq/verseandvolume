'use client';

import { useTranslations } from 'next-intl';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { useState, useEffect } from 'react';
import { books } from '@/data/books';
import { poems } from '@/data/poems';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import BookmarkButton from '@/components/BookmarkButton';

type HistoryType = 'books' | 'poems' | 'all';

interface HistoryItem {
  id: string;
  timestamp: number;
  data: any;
  type: 'books' | 'poems';
}

export default function ReadingHistoryPage() {
  const t = useTranslations();
  const locale = useLocale();
  const { getReadingHistory, isLoaded } = useUserPreferences();
  const [activeTab, setActiveTab] = useState<HistoryType>('all');
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);

  // Helper function to create localized paths
  const localizedPath = (path: string) => {
    return `/${locale}${path}`;
  };

  // Format date for display
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Load history items when preferences are loaded
  useEffect(() => {
    if (isLoaded) {
      const bookHistory = getReadingHistory('books').map(item => {
        const bookData = books.find(book => book.id === item.id);
        return {
          ...item,
          data: bookData,
          type: 'books' as const
        };
      }).filter(item => item.data); // Filter out items that no longer exist in the data

      const poemHistory = getReadingHistory('poems').map(item => {
        const poemData = poems.find(poem => poem.id === item.id);
        return {
          ...item,
          data: poemData,
          type: 'poems' as const
        };
      }).filter(item => item.data); // Filter out items that no longer exist in the data

      // Combine and sort by timestamp (newest first)
      const allHistory = [...bookHistory, ...poemHistory]
        .sort((a, b) => b.timestamp - a.timestamp);

      setHistoryItems(allHistory);
    }
  }, [isLoaded, getReadingHistory]);

  // Get the currently visible items based on active tab
  const visibleItems = activeTab === 'all'
    ? historyItems
    : historyItems.filter(item => item.type === activeTab);

  // Get the path for an item based on its type
  const getItemPath = (item: HistoryItem) => {
    if (item.type === 'books') {
      return `/prose/${item.id}`;
    }

    // For poems, check if it's a ghazal to route correctly
    if (item.type === 'poems') {
      // Find the poem to check its type
      const poem = poems.find(p => p.id === item.id);
      if (poem && poem.type === 'ghazal') {
        return `/ghazals/${item.id}`;
      }
      return `/poetry/${item.id}`;
    }

    return `/poetry/${item.id}`;
  };

  // Loading state
  if (!isLoaded) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p>Loading your reading history...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center">{t('history.title')}</h1>

      {/* Tabs */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {['all', 'books', 'poems'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as HistoryType)}
            className={`px-4 py-2 rounded-full transition-colors ${
              activeTab === tab
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {tab === 'all'
              ? t('history.allItems')
              : tab === 'books'
                ? t('history.books')
                : t('history.poems')
            }
            {tab === 'all'
              ? ` (${historyItems.length})`
              : tab === 'books'
                ? ` (${historyItems.filter(item => item.type === 'books').length})`
                : ` (${historyItems.filter(item => item.type === 'poems').length})`
            }
          </button>
        ))}
      </div>

      {/* No history state */}
      {visibleItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl mb-4">{t('history.noHistory')}</p>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {t('history.startReading')}
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href={localizedPath('/prose')}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {t('navigation.prose')}
            </Link>
            <Link
              href={localizedPath('/poetry')}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {t('navigation.poetry')}
            </Link>
          </div>
        </div>
      )}

      {/* History items */}
      {visibleItems.length > 0 && (
        <div className="space-y-4">
          {visibleItems.map((item) => (
            <div
              key={`${item.type}-${item.id}-${item.timestamp}`}
              className="flex flex-col sm:flex-row gap-4 p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 group"
            >
              {item.data.coverImage ? (
                <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded">
                  <Image
                    src={item.data.coverImage}
                    alt={item.data.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex-shrink-0 h-24 w-20 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded text-3xl">
                  {item.type === 'books' ? '📚' : '📝'}
                </div>
              )}

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 mb-2">
                    {item.type === 'books'
                      ? t('history.book')
                      : t('history.poem')
                    }
                  </div>

                  <BookmarkButton
                    id={item.id}
                    type={item.type}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </div>

                <Link href={localizedPath(getItemPath(item))}>
                  <h3 className="text-lg font-semibold mb-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {item.data.title}
                  </h3>
                </Link>

                {item.data.author && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {t('history.by')} {item.data.author}
                  </p>
                )}

                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                  {t('history.readOn')} {formatDate(item.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
