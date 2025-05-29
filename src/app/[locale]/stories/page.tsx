"use client";

import { useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import BookCard from '@/components/BookCard';
import FilterControls from '@/components/FilterControls';
import QuoteDisplay from '@/components/QuoteDisplay';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { allLoveStories } from '@/data/stories/love-stories';

export default function StoriesPage() {
  const t = useTranslations();
  const locale = useLocale();
  const { addToReadingHistory } = useUserPreferences();
  const [filters, setFilters] = useState<Record<string, string[]>>({});

  // Helper function to create localized paths
  const localizedPath = (path: string) => {
    return `/${locale}${path}`;
  };

  // All stories data
  const stories = allLoveStories;

  // Create filter options
  const filterOptions = useMemo(() => {
    const genres = new Set<string>();
    const languages = new Set<string>();
    const authors = new Set<string>();

    stories.forEach(story => {
      if (story.genre) {
        story.genre.forEach(g => genres.add(g));
      }
      languages.add(story.language);
      authors.add(story.author);
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
        label: t('stories.genre'),
        multiSelect: true,
        options: Array.from(genres).sort().map(genre => ({
          value: genre,
          label: genre,
          count: stories.filter(story => story.genre?.includes(genre)).length
        }))
      },
      {
        name: 'author',
        label: t('navigation.authors'),
        multiSelect: true,
        options: Array.from(authors).sort().map(author => ({
          value: author,
          label: author,
          count: stories.filter(story => story.author === author).length
        }))
      }
    ];
  }, [stories, t]);

  // Filter stories based on selected filters
  const filteredStories = useMemo(() => {
    return stories.filter(story => {
      return Object.entries(filters).every(([key, values]) => {
        if (values.length === 0) return true;

        switch (key) {
          case 'genre':
            return story.genre?.some(g => values.includes(g));
          case 'language':
            return values.includes(story.language);
          case 'author':
            return values.includes(story.author);
          default:
            return true;
        }
      });
    });
  }, [stories, filters]);

  // Group stories by language
  const englishStories = filteredStories.filter(story => story.language === 'en');
  const urduStories = filteredStories.filter(story => story.language === 'ur');
  const bilingualStories = filteredStories.filter(story => story.language === 'both');

  const handleFilterChange = (filterName: string, selectedValues: string[]) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: selectedValues
    }));
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl mb-12 text-center" style={{ fontWeight: 700 }}>
        {t('navigation.stories')}
      </h1>

      {/* Featured Quote */}
      <div className="mb-8">
        <QuoteDisplay
          quote="A story has no beginning or end: arbitrarily one chooses that moment of experience from which to look back or from which to look ahead."
          author="Graham Greene"
          language="en"
        />
      </div>

      {/* Filters */}
      <div className="mb-8 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
        <FilterControls
          filters={filterOptions}
          onFilterChange={handleFilterChange}
          title={t('stories.filterStories')}
          collapsible={true}
          defaultExpanded={false}
        />
      </div>

      {/* Results summary */}
      <div className="mb-8 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          {filteredStories.length === stories.length
            ? t('stories.showingAll', { count: stories.length })
            : t('stories.showingFiltered', { filtered: filteredStories.length, total: stories.length })
          }
        </p>
      </div>

      {/* English Stories */}
      {englishStories.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl mb-6">{t('stories.englishStories')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {englishStories.map(story => (
              <BookCard
                key={story.id}
                id={story.id}
                title={story.title}
                author={story.author}
                authorId={story.authorId}
                coverImage={story.coverImage}
                description={story.description}
                publishYear={story.publishYear}
                genre={story.genre}
                language={story.language}
                rating={story.rating}
                excerpt={Array.isArray(story.excerpt) ? story.excerpt : story.excerpt?.en || []}
                showExpandableContent={true}
                contentType="stories"
              />
            ))}
          </div>
        </div>
      )}

      {/* Urdu Stories */}
      {urduStories.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl mb-6">{t('stories.urduStories')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {urduStories.map(story => (
              <BookCard
                key={story.id}
                id={story.id}
                title={story.title}
                author={story.author}
                authorId={story.authorId}
                coverImage={story.coverImage}
                description={story.description}
                publishYear={story.publishYear}
                genre={story.genre}
                language={story.language}
                rating={story.rating}
                excerpt={Array.isArray(story.excerpt) ? story.excerpt : story.excerpt?.ur || []}
                showExpandableContent={true}
                contentType="stories"
              />
            ))}
          </div>
        </div>
      )}

      {/* Bilingual Stories */}
      {bilingualStories.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl mb-6">{t('stories.bilingualStories')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bilingualStories.map(story => (
              <BookCard
                key={story.id}
                id={story.id}
                title={story.title}
                author={story.author}
                authorId={story.authorId}
                coverImage={story.coverImage}
                description={story.description}
                publishYear={story.publishYear}
                genre={story.genre}
                language={story.language}
                rating={story.rating}
                excerpt={Array.isArray(story.excerpt) ? story.excerpt : (locale === 'ur' ? story.excerpt?.ur : story.excerpt?.en) || []}
                showExpandableContent={true}
                contentType="stories"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
