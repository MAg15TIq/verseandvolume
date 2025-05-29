"use client";

import { useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import BookCard from '@/components/BookCard';
import FilterControls from '@/components/FilterControls';
import QuoteDisplay from '@/components/QuoteDisplay';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { allNovels } from '@/data/novels/authors';

export default function NovelsPage() {
  const t = useTranslations();
  const locale = useLocale();
  const { addToReadingHistory } = useUserPreferences();
  const [filters, setFilters] = useState<Record<string, string[]>>({});

  // Helper function to create localized paths
  const localizedPath = (path: string) => {
    return `/${locale}${path}`;
  };

  // All novels data
  const novels = allNovels;

  // Create filter options
  const filterOptions = useMemo(() => {
    const genres = new Set<string>();
    const languages = new Set<string>();
    const authors = new Set<string>();

    novels.forEach(novel => {
      if (novel.genre) {
        novel.genre.forEach(g => genres.add(g));
      }
      languages.add(novel.language);
      authors.add(novel.author);
    });

    return [
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
        label: t('novels.genre'),
        multiSelect: true,
        options: Array.from(genres).sort().map(genre => ({
          value: genre,
          label: genre,
          count: novels.filter(novel => novel.genre?.includes(genre)).length
        }))
      },
      {
        name: 'author',
        label: t('navigation.authors'),
        multiSelect: true,
        options: Array.from(authors).sort().map(author => ({
          value: author,
          label: author,
          count: novels.filter(novel => novel.author === author).length
        }))
      }
    ];
  }, [novels, t]);

  // Filter novels based on selected filters
  const filteredNovels = useMemo(() => {
    return novels.filter(novel => {
      return Object.entries(filters).every(([key, values]) => {
        if (values.length === 0) return true;

        switch (key) {
          case 'genre':
            return novel.genre?.some(g => values.includes(g));
          case 'language':
            return values.includes(novel.language);
          case 'author':
            return values.includes(novel.author);
          default:
            return true;
        }
      });
    });
  }, [novels, filters]);

  // Group novels by language
  const englishNovels = filteredNovels.filter(novel => novel.language === 'en');
  const urduNovels = filteredNovels.filter(novel => novel.language === 'ur');
  const bilingualNovels = filteredNovels.filter(novel => novel.language === 'both');

  const handleFilterChange = (filterName: string, selectedValues: string[]) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: selectedValues
    }));
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl mb-12 text-center" style={{ fontWeight: 700 }}>
        {t('navigation.novels')}
      </h1>

      {/* Featured Quote */}
      <div className="mb-8">
        <QuoteDisplay
          quote="A novel is a mirror carried along a main road."
          author="Stendhal"
          language="en"
        />
      </div>

      {/* Filters */}
      <div className="mb-8 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
        <FilterControls
          filters={filterOptions}
          onFilterChange={handleFilterChange}
          title={t('novels.filterNovels')}
          collapsible={true}
          defaultExpanded={false}
        />
      </div>

      {/* Results summary */}
      <div className="mb-8 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          {filteredNovels.length === novels.length
            ? t('novels.showingAll', { count: novels.length })
            : t('novels.showingFiltered', { filtered: filteredNovels.length, total: novels.length })
          }
        </p>
      </div>

      {/* English Novels */}
      {englishNovels.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl mb-6">{t('novels.englishNovels')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {englishNovels.map(novel => (
              <BookCard
                key={novel.id}
                id={novel.id}
                title={novel.title}
                author={novel.author}
                authorId={novel.authorId}
                coverImage={novel.coverImage}
                description={novel.description}
                publishYear={novel.publishYear}
                genre={novel.genre}
                language={novel.language}
                rating={novel.rating}
                excerpt={Array.isArray(novel.excerpt) ? novel.excerpt : novel.excerpt?.en || []}
                showExpandableContent={true}
                contentType="novels"
              />
            ))}
          </div>
        </div>
      )}

      {/* Urdu Novels */}
      {urduNovels.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl mb-6">{t('novels.urduNovels')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {urduNovels.map(novel => (
              <BookCard
                key={novel.id}
                id={novel.id}
                title={novel.title}
                author={novel.author}
                authorId={novel.authorId}
                coverImage={novel.coverImage}
                description={novel.description}
                publishYear={novel.publishYear}
                genre={novel.genre}
                language={novel.language}
                rating={novel.rating}
                excerpt={Array.isArray(novel.excerpt) ? novel.excerpt : novel.excerpt?.ur || []}
                showExpandableContent={true}
                contentType="novels"
              />
            ))}
          </div>
        </div>
      )}

      {/* Bilingual Novels */}
      {bilingualNovels.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl mb-6">{t('novels.bilingualNovels')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bilingualNovels.map(novel => (
              <BookCard
                key={novel.id}
                id={novel.id}
                title={novel.title}
                author={novel.author}
                authorId={novel.authorId}
                coverImage={novel.coverImage}
                description={novel.description}
                publishYear={novel.publishYear}
                genre={novel.genre}
                language={novel.language}
                rating={novel.rating}
                excerpt={Array.isArray(novel.excerpt) ? novel.excerpt : (locale === 'ur' ? novel.excerpt?.ur : novel.excerpt?.en) || []}
                showExpandableContent={true}
                contentType="novels"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
