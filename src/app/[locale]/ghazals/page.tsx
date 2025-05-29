'use client';

import { useTranslations } from 'next-intl';
import { useState, useMemo, useCallback } from 'react';
import { poems } from '@/data/poems';
import { useLocale } from 'next-intl';
import QuoteDisplay from '@/components/QuoteDisplay';
import FilterControls from '@/components/FilterControls';
import PoemCard from '@/components/PoemCard';

export default function GhazalsPage() {
  const t = useTranslations();
  const locale = useLocale();
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
    language: [],
    theme: [],
    author: []
  });

  // Filter ghazals only
  const ghazals = useMemo(() => {
    return poems.filter(poem => poem.type === 'ghazal');
  }, []);

  // Extract all unique themes and authors for filter options
  const themes = useMemo(() => {
    const allThemes = ghazals.flatMap(ghazal => ghazal.themes || []);
    return Array.from(new Set(allThemes)).filter(Boolean).sort();
  }, [ghazals]);

  const authors = useMemo(() => {
    const allAuthors = ghazals.map(ghazal => ({ id: ghazal.authorId, name: ghazal.author }));
    // Remove duplicates by authorId
    return Array.from(
      new Map(allAuthors.map(author => [author.id, author])).values()
    ).sort((a, b) => a.name.localeCompare(b.name));
  }, [ghazals]);

  // Handle filter changes
  const handleFilterChange = useCallback((filterName: string, values: string[]) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterName]: values
    }));
  }, []);

  // Apply filters to ghazals
  const filteredGhazals = useMemo(() => {
    return ghazals.filter(ghazal => {
      // Language filter
      if (activeFilters.language.length > 0 && !activeFilters.language.includes(ghazal.language)) {
        return false;
      }

      // Theme filter
      if (activeFilters.theme.length > 0 && !ghazal.themes?.some(theme => activeFilters.theme.includes(theme))) {
        return false;
      }

      // Author filter
      if (activeFilters.author.length > 0 && !activeFilters.author.includes(ghazal.authorId)) {
        return false;
      }

      return true;
    });
  }, [ghazals, activeFilters]);

  // Separate ghazals by language for display
  const englishGhazals = useMemo(() => {
    return filteredGhazals.filter(ghazal => ghazal.language === 'en');
  }, [filteredGhazals]);

  const urduGhazals = useMemo(() => {
    return filteredGhazals.filter(ghazal => ghazal.language === 'ur');
  }, [filteredGhazals]);

  const bilingualGhazals = useMemo(() => {
    return filteredGhazals.filter(ghazal => ghazal.language === 'both');
  }, [filteredGhazals]);

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
        count: ghazals.filter(ghazal => ghazal.themes?.includes(theme)).length
      }))
    },
    {
      name: 'author',
      label: t('book.author'),
      multiSelect: true,
      options: authors.map(author => ({
        value: author.id,
        label: author.name,
        count: ghazals.filter(ghazal => ghazal.authorId === author.id).length
      }))
    }
  ];



  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl mb-12 text-center" style={{ fontWeight: 700 }}>{t('poetry.ghazal')}</h1>

      {/* Featured Quote */}
      <div className="mb-8">
        <QuoteDisplay
          quote="The ghazal is a poetic expression of both the pain of loss or separation and the beauty of love in spite of that pain."
          author="Agha Shahid Ali"
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
          {filteredGhazals.length === ghazals.length
            ? t('poetry.showingAll', { count: ghazals.length })
            : t('poetry.showingFiltered', { filtered: filteredGhazals.length, total: ghazals.length })
          }
        </p>
      </div>

      {/* English Ghazals */}
      {englishGhazals.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl mb-6">{t('poetry.englishPoems')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {englishGhazals.map((ghazal, index) => (
              <PoemCard
                key={ghazal.id}
                id={ghazal.id}
                title={ghazal.title}
                author={ghazal.author}
                authorId={ghazal.authorId}
                year={ghazal.year}
                themes={ghazal.themes}
                language={ghazal.language}
                content={ghazal.content}
                type="ghazal"
                showExpandableContent={true}
                featured={index < 1} // Mark first one as featured
                readingTime={Math.ceil((Array.isArray(ghazal.content) ? ghazal.content.join(' ') : '').split(' ').length / 200)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Urdu Ghazals */}
      {urduGhazals.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl mb-6">{t('poetry.urduPoems')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {urduGhazals.map(ghazal => (
              <PoemCard
                key={ghazal.id}
                id={ghazal.id}
                title={ghazal.title}
                author={ghazal.author}
                authorId={ghazal.authorId}
                year={ghazal.year}
                themes={ghazal.themes}
                language={ghazal.language}
                content={ghazal.content}
                type="ghazal"
                showExpandableContent={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* Bilingual Ghazals */}
      {bilingualGhazals.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl mb-6">{t('poetry.bilingualPoems')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bilingualGhazals.map(ghazal => (
              <PoemCard
                key={ghazal.id}
                id={ghazal.id}
                title={ghazal.title}
                author={ghazal.author}
                authorId={ghazal.authorId}
                year={ghazal.year}
                themes={ghazal.themes}
                language={ghazal.language}
                content={ghazal.content}
                type="ghazal"
                showExpandableContent={true}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
