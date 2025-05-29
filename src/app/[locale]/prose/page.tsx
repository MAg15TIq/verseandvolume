'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState, useMemo, useCallback } from 'react';
import { books } from '@/data/books';
import BookCard from '@/components/BookCard';
import QuoteDisplay from '@/components/QuoteDisplay';
import FilterControls from '@/components/FilterControls';

export default function ProsePage() {
  const t = useTranslations();
  const locale = useLocale();
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
    language: [],
    genre: [],
    author: []
  });

  // Extract all unique genres and authors for filter options
  const genres = useMemo(() => {
    const allGenres = books.flatMap(book => book.genre);
    return Array.from(new Set(allGenres)).sort();
  }, []);

  const authors = useMemo(() => {
    const allAuthors = books.map(book => ({ id: book.authorId, name: book.author }));
    // Remove duplicates by authorId
    return Array.from(
      new Map(allAuthors.map(author => [author.id, author])).values()
    ).sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  // Filter books based on active filters
  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      // Language filter
      if (activeFilters.language.length > 0 && !activeFilters.language.includes(book.language)) {
        return false;
      }

      // Genre filter
      if (activeFilters.genre.length > 0 && !book.genre.some(g => activeFilters.genre.includes(g))) {
        return false;
      }

      // Author filter
      if (activeFilters.author.length > 0 && !activeFilters.author.includes(book.authorId)) {
        return false;
      }

      return true;
    });
  }, [activeFilters]);

  // Group filtered books by language
  const englishBooks = filteredBooks.filter(book => book.language === 'en');
  const urduBooks = filteredBooks.filter(book => book.language === 'ur');
  const bilingualBooks = filteredBooks.filter(book => book.language === 'both');

  // Handle filter changes
  const handleFilterChange = useCallback((filterName: string, selectedValues: string[]) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterName]: selectedValues
    }));
  }, []);

  // Prepare filter options
  const filterOptions = [
    {
      name: 'language',
      label: t('book.language'),
      options: [
        { value: 'en', label: t('book.english') },
        { value: 'ur', label: t('book.urdu') },
        { value: 'both', label: t('book.bilingual') }
      ]
    },
    {
      name: 'genre',
      label: t('prose.genre'),
      multiSelect: true,
      options: genres.map(genre => ({
        value: genre,
        label: genre,
        count: books.filter(book => book.genre.includes(genre)).length
      }))
    },
    {
      name: 'author',
      label: t('navigation.authors'),
      multiSelect: true,
      options: authors.map(author => ({
        value: author.id,
        label: author.name,
        count: books.filter(book => book.authorId === author.id).length
      }))
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl mb-12 text-center" style={{ fontWeight: 700 }}>{t('navigation.prose')}</h1>

      {/* Featured Quote */}
      <div className="mb-8">
        <QuoteDisplay
          quote="A reader lives a thousand lives before he dies. The man who never reads lives only one."
          author="George R.R. Martin"
          language="en"
        />
      </div>

      {/* Filters */}
      <div className="mb-8 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
        <FilterControls
          filters={filterOptions}
          onFilterChange={handleFilterChange}
          title={t('prose.filterBooks')}
          collapsible={true}
          defaultExpanded={false}
        />
      </div>

      {/* Results summary */}
      <div className="mb-8 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          {filteredBooks.length === books.length
            ? t('prose.showingAll', { count: books.length })
            : t('prose.showingFiltered', { filtered: filteredBooks.length, total: books.length })
          }
        </p>
      </div>

      {/* English Books */}
      {englishBooks.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl mb-6" style={{ fontWeight: 600 }}>English Books</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {englishBooks.map(book => (
              <BookCard
                key={book.id}
                id={book.id}
                title={book.title}
                author={book.author}
                authorId={book.authorId}
                coverImage={book.coverImage}
                description={book.description}
                publishYear={book.publishYear}
                genre={book.genre}
                language={book.language}
                rating={book.rating}
                excerpt={Array.isArray(book.content) ? book.content.slice(0, 5) : book.content?.en?.slice(0, 5) || []}
                showExpandableContent={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* Urdu Books */}
      {urduBooks.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl mb-6 text-right" style={{ fontWeight: 600 }}>اردو کتابیں</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {urduBooks.map(book => (
              <BookCard
                key={book.id}
                id={book.id}
                title={book.title}
                author={book.author}
                authorId={book.authorId}
                coverImage={book.coverImage}
                description={book.description}
                publishYear={book.publishYear}
                genre={book.genre}
                language={book.language}
                rating={book.rating}
                excerpt={Array.isArray(book.content) ? book.content.slice(0, 5) : book.content?.ur?.slice(0, 5) || []}
                showExpandableContent={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* Bilingual Books */}
      {bilingualBooks.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl mb-6" style={{ fontWeight: 600 }}>Bilingual Books / دو لسانی کتابیں</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bilingualBooks.map(book => (
              <BookCard
                key={book.id}
                id={book.id}
                title={book.title}
                author={book.author}
                authorId={book.authorId}
                coverImage={book.coverImage}
                description={book.description}
                publishYear={book.publishYear}
                genre={book.genre}
                language={book.language}
                rating={book.rating}
                excerpt={Array.isArray(book.content) ? book.content.slice(0, 5) : (locale === 'ur' ? book.content?.ur : book.content?.en)?.slice(0, 5) || []}
                showExpandableContent={true}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
