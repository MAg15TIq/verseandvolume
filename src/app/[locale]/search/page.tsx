'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { books } from '@/data/books';
import { poems } from '@/data/poems';
import { authors } from '@/data/authors';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import Image from 'next/image';

// Define the search result types
type SearchResultType = 'book' | 'poem' | 'author';

interface SearchResult {
  id: string;
  title: string;
  type: SearchResultType;
  author?: string;
  authorId?: string;
  description?: string;
  coverImage?: string;
  language?: 'en' | 'ur' | 'both';
  year?: number;
  matchedField: string;
}

export default function SearchPage() {
  const t = useTranslations();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const query = searchParams?.get('q') || '';
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeFilter, setActiveFilter] = useState<SearchResultType | 'all'>('all');
  const [isLoading, setIsLoading] = useState(true);

  // Helper function to create localized paths
  const localizedPath = (path: string) => {
    return `/${locale}${path}`;
  };

  useEffect(() => {
    if (!query) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    // Perform search across all data
    const searchResults: SearchResult[] = [];
    const lowerQuery = query.toLowerCase();

    // Search in books
    books.forEach(book => {
      let matchedField = '';

      if (book.title.toLowerCase().includes(lowerQuery)) {
        matchedField = 'title';
      } else if (book.author.toLowerCase().includes(lowerQuery)) {
        matchedField = 'author';
      } else if (book.description.toLowerCase().includes(lowerQuery)) {
        matchedField = 'description';
      } else if (book.genre.some(g => g.toLowerCase().includes(lowerQuery))) {
        matchedField = 'genre';
      }

      if (matchedField) {
        searchResults.push({
          id: book.id,
          title: book.title,
          type: 'book',
          author: book.author,
          authorId: book.authorId,
          description: book.description,
          coverImage: book.coverImage,
          language: book.language,
          year: book.publishYear,
          matchedField
        });
      }
    });

    // Search in poems
    poems.forEach(poem => {
      let matchedField = '';

      if (poem.title.toLowerCase().includes(lowerQuery)) {
        matchedField = 'title';
      } else if (poem.author.toLowerCase().includes(lowerQuery)) {
        matchedField = 'author';
      } else if (poem.themes && poem.themes.some(theme => theme.toLowerCase().includes(lowerQuery))) {
        matchedField = 'theme';
      } else if (
        Array.isArray(poem.content) &&
        poem.content.some(line => line.toLowerCase().includes(lowerQuery))
      ) {
        matchedField = 'content';
      } else if (
        typeof poem.content === 'object' && poem.content !== null && !Array.isArray(poem.content) &&
        (('en' in poem.content && poem.content.en && poem.content.en.some(line => line.toLowerCase().includes(lowerQuery))) ||
         ('ur' in poem.content && poem.content.ur && poem.content.ur.some(line => line.toLowerCase().includes(lowerQuery))))
      ) {
        matchedField = 'content';
      }

      if (matchedField) {
        searchResults.push({
          id: poem.id,
          title: poem.title,
          type: 'poem',
          author: poem.author,
          authorId: poem.authorId,
          language: poem.language,
          year: poem.year,
          matchedField
        });
      }
    });

    // Search in authors
    authors.forEach(author => {
      let matchedField = '';

      if (author.name.toLowerCase().includes(lowerQuery)) {
        matchedField = 'name';
      } else if (author.bio.toLowerCase().includes(lowerQuery)) {
        matchedField = 'bio';
      } else if (author.birthPlace && author.birthPlace.toLowerCase().includes(lowerQuery)) {
        matchedField = 'birthPlace';
      }

      if (matchedField) {
        searchResults.push({
          id: author.id,
          title: author.name,
          type: 'author',
          description: author.bio,
          coverImage: author.image,
          language: author.language,
          matchedField
        });
      }
    });

    setResults(searchResults);
    setIsLoading(false);
  }, [query]);

  // Filter results based on active filter
  const filteredResults = activeFilter === 'all'
    ? results
    : results.filter(result => result.type === activeFilter);

  // Get the path for a result based on its type
  const getResultPath = (result: SearchResult) => {
    switch (result.type) {
      case 'book':
        return `/prose/${result.id}`;
      case 'poem':
        return `/poetry/${result.id}`;
      case 'author':
        return `/authors/${result.id}`;
      default:
        return '/';
    }
  };

  // Get the icon for a result type
  const getResultIcon = (type: SearchResultType) => {
    switch (type) {
      case 'book':
        return '📚';
      case 'poem':
        return '📝';
      case 'author':
        return '👤';
      default:
        return '🔍';
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center">
        {query
          ? `${t('search.resultsFor')} "${query}"`
          : t('search.title')
        }
      </h1>

      {/* Search filters */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {['all', 'book', 'poem', 'author'].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter as SearchResultType | 'all')}
            className={`px-4 py-2 rounded-full transition-colors ${
              activeFilter === filter
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {filter === 'all'
              ? t('search.filters.all')
              : filter === 'book'
                ? t('search.filters.books')
                : filter === 'poem'
                  ? t('search.filters.poems')
                  : t('search.filters.authors')
            }
          </button>
        ))}
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p>Searching...</p>
        </div>
      )}

      {/* No results state */}
      {!isLoading && query && filteredResults.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl mb-4">{t('search.noResults')} &ldquo;{query}&rdquo;</p>
          <p className="text-gray-600 dark:text-gray-400">
            {t('search.tryDifferent')}
          </p>
        </div>
      )}

      {/* Empty search state */}
      {!isLoading && !query && (
        <div className="text-center py-12">
          <p className="text-xl mb-4">{t('search.enterTerm')}</p>
        </div>
      )}

      {/* Results list */}
      {!isLoading && filteredResults.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResults.map((result) => (
            <Link
              key={`${result.type}-${result.id}`}
              href={localizedPath(getResultPath(result))}
              className="flex flex-col h-full overflow-hidden bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="p-4 flex items-start gap-4">
                {result.coverImage ? (
                  <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded">
                    <Image
                      src={result.coverImage}
                      alt={result.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex-shrink-0 h-24 w-20 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded text-3xl">
                    {getResultIcon(result.type)}
                  </div>
                )}

                <div className="flex-1">
                  <div className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 mb-2">
                    {result.type === 'book'
                      ? t('search.filters.books').slice(0, -1) // Remove 's' from "Books"
                      : result.type === 'poem'
                        ? t('search.filters.poems').slice(0, -1) // Remove 's' from "Poems"
                        : t('search.filters.authors').slice(0, -1) // Remove 's' from "Authors"
                    }
                    {result.matchedField && ` • ${t('search.matched')}: ${result.matchedField}`}
                  </div>

                  <h3 className="text-lg font-semibold mb-1">
                    {result.title}
                  </h3>

                  {result.author && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      by {result.author}
                    </p>
                  )}

                  {result.year && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {result.year}
                    </p>
                  )}

                  {result.description && (
                    <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 mt-2">
                      {result.description.length > 100
                        ? `${result.description.substring(0, 100)}...`
                        : result.description
                      }
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
