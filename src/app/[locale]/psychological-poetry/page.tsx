'use client';

import { useTranslations } from 'next-intl';
import { useState, useMemo, useCallback } from 'react';
import { allPsychologicalPoems } from '@/data/poems/psychological';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import QuoteDisplay from '@/components/QuoteDisplay';
import FilterControls from '@/components/FilterControls';
import PoemCard from '@/components/PoemCard';
import { useUserPreferences } from '@/hooks/useUserPreferences';

export default function PsychologicalPoetryPage() {
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
    const allThemes = allPsychologicalPoems.flatMap(poem => poem.themes || []);
    return Array.from(new Set(allThemes)).filter(Boolean).sort();
  }, []);

  const authors = useMemo(() => {
    const allAuthors = allPsychologicalPoems.map(poem => ({ id: poem.authorId, name: poem.author }));
    // Remove duplicates by authorId
    return Array.from(
      new Map(allAuthors.map(author => [author.id, author])).values()
    ).sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  // Filter poems based on active filters
  const filteredPoems = useMemo(() => {
    return allPsychologicalPoems.filter(poem => {
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
        count: allPsychologicalPoems.filter(poem => poem.themes?.includes(theme)).length
      }))
    },
    {
      name: 'author',
      label: t('navigation.authors'),
      multiSelect: true,
      options: authors.map(author => ({
        value: author.id,
        label: author.name,
        count: allPsychologicalPoems.filter(poem => poem.authorId === author.id).length
      }))
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl mb-4" style={{ fontWeight: 700 }}>
          {t('psychologicalPoetry.title')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          {t('psychologicalPoetry.subtitle')}
        </p>
      </div>

      {/* Featured Quote */}
      <div className="mb-8">
        <QuoteDisplay
          quote="The mind is its own place, and in itself can make a heaven of hell, a hell of heaven."
          author="John Milton"
          language="en"
        />
      </div>

      {/* About Section */}
      <div className="mb-8 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
        <h2 className="text-xl mb-4 font-semibold">{t('psychologicalPoetry.aboutSection')}</h2>
        <p className="text-gray-700 dark:text-gray-300">
          {t('psychologicalPoetry.aboutText')}
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
        <FilterControls
          filters={filterOptions}
          onFilterChange={handleFilterChange}
          title={t('psychologicalPoetry.filterPoems')}
          collapsible={true}
          defaultExpanded={false}
        />
      </div>

      {/* Results summary */}
      <div className="mb-8 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          {filteredPoems.length === allPsychologicalPoems.length
            ? t('psychologicalPoetry.showingAll', { count: allPsychologicalPoems.length })
            : t('psychologicalPoetry.showingFiltered', { filtered: filteredPoems.length, total: allPsychologicalPoems.length })
          }
        </p>
      </div>

      {/* English Poems */}
      {englishPoems.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl mb-6">{t('psychologicalPoetry.englishPoems')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {englishPoems.map(poem => (
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
              />
            ))}
          </div>
        </div>
      )}

      {/* Urdu Poems */}
      {urduPoems.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl mb-6">{t('psychologicalPoetry.urduPoems')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {urduPoems.map(poem => (
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
              />
            ))}
          </div>
        </div>
      )}

      {/* Bilingual Poems */}
      {bilingualPoems.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl mb-6">{t('psychologicalPoetry.bilingualPoems')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bilingualPoems.map(poem => (
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
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
