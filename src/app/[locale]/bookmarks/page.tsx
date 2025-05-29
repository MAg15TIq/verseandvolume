'use client';

import { useTranslations } from 'next-intl';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { useState, useEffect } from 'react';
import { books } from '@/data/books';
import { poems } from '@/data/poems';
import { authors } from '@/data/authors';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import BookmarkButton from '@/components/BookmarkButton';

type BookmarkType = 'books' | 'poems' | 'authors' | 'all';

export default function BookmarksPage() {
  const t = useTranslations();
  const locale = useLocale();
  const { preferences, isLoaded } = useUserPreferences();
  const [activeTab, setActiveTab] = useState<BookmarkType>('all');
  const [bookmarkedBooks, setBookmarkedBooks] = useState<typeof books>([]);
  const [bookmarkedPoems, setBookmarkedPoems] = useState<typeof poems>([]);
  const [bookmarkedAuthors, setBookmarkedAuthors] = useState<typeof authors>([]);

  // Helper function to create localized paths
  const localizedPath = (path: string) => {
    return `/${locale}${path}`;
  };

  // Load bookmarked items when preferences are loaded
  useEffect(() => {
    if (isLoaded) {
      // Filter books
      const filteredBooks = books.filter(book =>
        preferences.bookmarks.books.includes(book.id)
      );
      setBookmarkedBooks(filteredBooks);

      // Filter poems
      const filteredPoems = poems.filter(poem =>
        preferences.bookmarks.poems.includes(poem.id)
      );
      setBookmarkedPoems(filteredPoems);

      // Filter authors
      const filteredAuthors = authors.filter(author =>
        preferences.bookmarks.authors.includes(author.id)
      );
      setBookmarkedAuthors(filteredAuthors);
    }
  }, [isLoaded, preferences.bookmarks]);

  // Get the currently visible items based on active tab
  const visibleItems = activeTab === 'all'
    ? [...bookmarkedBooks, ...bookmarkedPoems, ...bookmarkedAuthors]
    : activeTab === 'books'
      ? bookmarkedBooks
      : activeTab === 'poems'
        ? bookmarkedPoems
        : bookmarkedAuthors;

  // Get the path for an item based on its type
  const getItemPath = (item: any) => {
    if ('genre' in item) return `/prose/${item.id}`;
    if ('type' in item && item.type) return `/poetry/${item.id}`;
    return `/authors/${item.id}`;
  };

  // Get the type of an item
  const getItemType = (item: any): 'books' | 'poems' | 'authors' => {
    if ('genre' in item) return 'books';
    if ('type' in item && item.type) return 'poems';
    return 'authors';
  };

  // Loading state
  if (!isLoaded) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p>Loading your bookmarks...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center">{t('bookmark.title')}</h1>

      {/* Tabs */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {['all', 'books', 'poems', 'authors'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as BookmarkType)}
            className={`px-4 py-2 rounded-full transition-colors ${
              activeTab === tab
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {tab === 'all'
              ? t('bookmark.allItems')
              : tab === 'books'
                ? t('bookmark.books')
                : tab === 'poems'
                  ? t('bookmark.poems')
                  : t('bookmark.authors')
            }
            {tab === 'all'
              ? ` (${bookmarkedBooks.length + bookmarkedPoems.length + bookmarkedAuthors.length})`
              : tab === 'books'
                ? ` (${bookmarkedBooks.length})`
                : tab === 'poems'
                  ? ` (${bookmarkedPoems.length})`
                  : ` (${bookmarkedAuthors.length})`
            }
          </button>
        ))}
      </div>

      {/* No bookmarks state */}
      {visibleItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl mb-4">{t('bookmark.noBookmarks')}</p>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {t('bookmark.startBookmarking')}
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

      {/* Bookmarked items */}
      {visibleItems.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleItems.map((item: any) => {
            const itemType = getItemType(item);
            return (
              <div
                key={`${itemType}-${item.id}`}
                className="flex flex-col h-full overflow-hidden bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 group"
              >
                <div className="p-4 flex items-start gap-4">
                  {item.coverImage || item.image ? (
                    <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded">
                      <Image
                        src={item.coverImage || item.image}
                        alt={item.title || item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex-shrink-0 h-24 w-20 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded text-3xl">
                      {itemType === 'books' ? '📚' : itemType === 'poems' ? '📝' : '👤'}
                    </div>
                  )}

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 mb-2">
                        {itemType === 'books'
                          ? t('bookmark.book')
                          : itemType === 'poems'
                            ? t('bookmark.poem')
                            : t('bookmark.author')
                        }
                      </div>

                      <BookmarkButton
                        id={item.id}
                        type={itemType}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </div>

                    <Link href={localizedPath(getItemPath(item))}>
                      <h3 className="text-lg font-semibold mb-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {item.title || item.name}
                      </h3>
                    </Link>

                    {item.author && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {t('bookmark.by')} {item.author}
                      </p>
                    )}

                    {item.description && (
                      <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 mt-2">
                        {item.description.length > 100
                          ? `${item.description.substring(0, 100)}...`
                          : item.description
                        }
                      </p>
                    )}

                    {item.bio && (
                      <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 mt-2">
                        {item.bio.length > 100
                          ? `${item.bio.substring(0, 100)}...`
                          : item.bio
                        }
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
