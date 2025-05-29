'use client';

import { useTranslations } from 'next-intl';
import { useState, useMemo, useCallback } from 'react';
import { poems } from '@/data/poems';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import QuoteDisplay from '@/components/QuoteDisplay';
import FilterControls from '@/components/FilterControls';
import PoemCard from '@/components/PoemCard';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import BookmarkButton from '@/components/BookmarkButton';

export default function PoetryPage() {
  const t = useTranslations();
  const locale = useLocale();
  const { addToReadingHistory } = useUserPreferences();
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
    language: [],
    theme: [],
    author: []
  });

  // Helper function to create localized paths
  const localizedPath = (path: string) => {
    return `/${locale}${path}`;
  };

  // Extract all unique themes and authors for filter options
  const themes = useMemo(() => {
    const allThemes = poems.flatMap(poem => poem.themes || []);
    return Array.from(new Set(allThemes)).filter(Boolean).sort();
  }, []);

  const authors = useMemo(() => {
    const allAuthors = poems.map(poem => ({ id: poem.authorId, name: poem.author }));
    // Remove duplicates by authorId
    return Array.from(
      new Map(allAuthors.map(author => [author.id, author])).values()
    ).sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  // Filter poems based on active filters
  const filteredPoems = useMemo(() => {
    return poems.filter(poem => {
      // Language filter
      if (activeFilters.language.length > 0 && !activeFilters.language.includes(poem.language)) {
        return false;
      }

      // Theme filter
      if (activeFilters.theme.length > 0 &&
          (!poem.themes || !poem.themes.some(theme => activeFilters.theme.includes(theme)))) {
        return false;
      }

      // Author filter
      if (activeFilters.author.length > 0 && !activeFilters.author.includes(poem.authorId)) {
        return false;
      }

      return true;
    });
  }, [activeFilters]);

  // Group filtered poems by language
  const englishPoems = filteredPoems.filter(poem => poem.language === 'en');
  const urduPoems = filteredPoems.filter(poem => poem.language === 'ur');
  const bilingualPoems = filteredPoems.filter(poem => poem.language === 'both');

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
      name: 'theme',
      label: t('poetry.theme'),
      multiSelect: true,
      options: themes.map(theme => ({
        value: theme,
        label: theme,
        count: poems.filter(poem => poem.themes?.includes(theme)).length
      }))
    },
    {
      name: 'author',
      label: t('navigation.authors'),
      multiSelect: true,
      options: authors.map(author => ({
        value: author.id,
        label: author.name,
        count: poems.filter(poem => poem.authorId === author.id).length
      }))
    }
  ];



  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl mb-12 text-center" style={{ fontWeight: 700 }}>{t('navigation.poetry')}</h1>

      {/* Featured Quote */}
      <div className="mb-8">
        <QuoteDisplay
          quote="Poetry is the spontaneous overflow of powerful feelings: it takes its origin from emotion recollected in tranquility."
          author="William Wordsworth"
          language="en"
        />
      </div>

      {/* Filters */}
      <div className="mb-8 content-card">
        <FilterControls
          filters={filterOptions}
          onFilterChange={handleFilterChange}
          title={t('poetry.filterPoems')}
          collapsible={true}
          defaultExpanded={false}
        />
      </div>

      {/* Results summary */}
      <div className="mb-8 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          {filteredPoems.length === poems.length
            ? t('poetry.showingAll', { count: poems.length })
            : t('poetry.showingFiltered', { filtered: filteredPoems.length, total: poems.length })
          }
        </p>
      </div>

      {/* English Poems */}
      {englishPoems.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl mb-6">{t('poetry.englishPoems')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {englishPoems.map((poem, index) => (
              <PoemCard
                key={poem.id}
                id={poem.id}
                title={poem.title}
                author={poem.author}
                authorId={poem.authorId}
                year={poem.year}
                themes={poem.themes}
                language={poem.language}
                content={poem.content}
                type={poem.type}
                showExpandableContent={true}
                featured={index < 2} // Mark first 2 as featured
                readingTime={Math.ceil((Array.isArray(poem.content) ? poem.content.join(' ') : '').split(' ').length / 200)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Urdu Poems */}
      {urduPoems.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl mb-6">{t('poetry.urduPoems')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {urduPoems.map((poem, index) => (
              <PoemCard
                key={poem.id}
                id={poem.id}
                title={poem.title}
                author={poem.author}
                authorId={poem.authorId}
                year={poem.year}
                themes={poem.themes}
                language={poem.language}
                content={poem.content}
                type={poem.type}
                showExpandableContent={true}
                featured={index < 1} // Mark first one as featured
                readingTime={Math.ceil((Array.isArray(poem.content) ? poem.content.join(' ') : '').split(' ').length / 200)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Bilingual Poems */}
      {bilingualPoems.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl mb-6">{t('poetry.bilingualPoems')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bilingualPoems.map((poem, index) => (
              <PoemCard
                key={poem.id}
                id={poem.id}
                title={poem.title}
                author={poem.author}
                authorId={poem.authorId}
                year={poem.year}
                themes={poem.themes}
                language={poem.language}
                content={poem.content}
                type={poem.type}
                showExpandableContent={true}
                featured={index < 1} // Mark first one as featured
                readingTime={Math.ceil((Array.isArray(poem.content) ? poem.content.join(' ') : '').split(' ').length / 200)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
