"use client";

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { allQuotes } from '@/data/quotes';
import QuoteDisplay from '@/components/QuoteDisplay';
import FilterControls from '@/components/FilterControls';

export default function QuotesPage() {
  const t = useTranslations();
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    author: [],
    theme: [],
    language: []
  });

  // Get unique values for filters
  const filterOptions = useMemo(() => {
    const authors = [...new Set(allQuotes.map(quote => quote.author))].sort();
    const themes = [...new Set(allQuotes.flatMap(quote => quote.themes || []))].sort();
    const languages = [...new Set(allQuotes.map(quote => quote.language))].sort();

    return [
      {
        name: 'author',
        label: 'Author',
        options: authors.map(author => ({ value: author, label: author })),
        multiSelect: true
      },
      {
        name: 'theme',
        label: 'Theme',
        options: themes.map(theme => ({ value: theme, label: theme })),
        multiSelect: true
      },
      {
        name: 'language',
        label: 'Language',
        options: languages.map(lang => ({
          value: lang,
          label: lang === 'en' ? 'English' : lang === 'ur' ? 'Urdu' : 'Bilingual'
        })),
        multiSelect: true
      }
    ];
  }, []);

  // Filter quotes based on selected filters
  const filteredQuotes = useMemo(() => {
    return allQuotes.filter(quote => {
      const authorMatch = selectedFilters.author.length === 0 ||
        selectedFilters.author.includes(quote.author);

      const themeMatch = selectedFilters.theme.length === 0 ||
        (quote.themes && quote.themes.some(theme => selectedFilters.theme.includes(theme)));

      const languageMatch = selectedFilters.language.length === 0 ||
        selectedFilters.language.includes(quote.language);

      return authorMatch && themeMatch && languageMatch;
    });
  }, [selectedFilters]);

  const handleFilterChange = (filterName: string, selectedValues: string[]) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterName]: selectedValues
    }));
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl mb-12 text-center" style={{ fontWeight: 700 }}>
        {t('navigation.quotes')}
      </h1>

      {/* Featured Quote */}
      <div className="mb-8">
        <QuoteDisplay
          quote="The only way to do great work is to love what you do."
          author="Steve Jobs"
          language="en"
        />
      </div>

      {/* Filters */}
      <div className="mb-8 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
        <FilterControls
          filters={filterOptions}
          onFilterChange={handleFilterChange}
          title="Filter Quotes"
          collapsible={true}
          defaultExpanded={false}
        />
      </div>

      {/* Results count */}
      <div className="mb-6">
        <p className="text-gray-600 dark:text-gray-400">
          Showing {filteredQuotes.length} of {allQuotes.length} quotes
        </p>
      </div>

      {/* Quotes grid */}
      <div className="grid gap-6 md:gap-8">
        {filteredQuotes.map((quote, index) => (
          <div key={index} className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
            <QuoteDisplay
              quote={quote.text}
              author={quote.author}
              language={quote.language === 'both' ? 'en' : quote.language}
              source={quote.source}
            />
            {quote.themes && quote.themes.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {quote.themes.map((theme, themeIndex) => (
                  <span
                    key={themeIndex}
                    className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
                  >
                    {theme}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredQuotes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            No quotes found matching your filters.
          </p>
          <p className="text-gray-500 dark:text-gray-500 mt-2">
            Try adjusting your filter criteria.
          </p>
        </div>
      )}
    </div>
  );
}
