"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

interface Work {
  id: string;
  title: string;
  year?: number;
  type: 'poetry' | 'prose' | 'essay' | 'other';
}

interface WorksListProps {
  works: Work[];
  language?: 'en' | 'ur';
}

export default function WorksList({ works, language = 'en' }: WorksListProps) {
  const [filter, setFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'title' | 'year'>('year');
  const locale = useLocale();

  // Helper function to create localized paths
  const localizedPath = (path: string) => {
    return `/${locale}${path}`;
  };

  // Filter works by type
  const filteredWorks = filter === 'all'
    ? works
    : works.filter(work => work.type === filter);

  // Sort works
  const sortedWorks = [...filteredWorks].sort((a, b) => {
    if (sortBy === 'year') {
      // If year is missing, put at the end
      if (!a.year) return 1;
      if (!b.year) return -1;
      return b.year - a.year; // Newest first
    } else {
      // Sort by title
      return a.title.localeCompare(b.title);
    }
  });

  // Get unique work types for filter
  const workTypes = ['all', ...new Set(works.map(work => work.type))];

  // Get work type label
  const getWorkTypeLabel = (type: string) => {
    switch (type) {
      case 'all': return 'All Works';
      case 'poetry': return 'Poetry';
      case 'prose': return 'Prose';
      case 'essay': return 'Essays';
      case 'other': return 'Other';
      default: return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  // Get work type path
  const getWorkTypePath = (type: string) => {
    switch (type) {
      case 'poetry': return '/poetry/';
      case 'prose': return '/prose/';
      case 'essay': return '/essays/';
      default: return '/works/';
    }
  };

  return (
    <div className={language === 'ur' ? 'text-right' : 'text-left'}>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {workTypes.map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                filter === type
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {getWorkTypeLabel(type)}
            </button>
          ))}
        </div>
        
        {/* Sort options */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'title' | 'year')}
            className="px-2 py-1 text-sm rounded bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="year">Year</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>
      
      {/* Works list */}
      <div className="space-y-4">
        {sortedWorks.length > 0 ? (
          sortedWorks.map((work) => (
            <Link
              key={work.id}
              href={localizedPath(`${getWorkTypePath(work.type)}${work.id}`)}
              className={`block p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-colors ${
                language === 'ur' ? 'text-right' : ''
              }`}
              style={{
                fontFamily: language === 'ur' ? 'Noto Nastaliq Urdu, serif' : 'inherit',
                direction: language === 'ur' ? 'rtl' : 'ltr'
              }}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{work.title}</h3>
                {work.year && (
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {work.year}
                  </span>
                )}
              </div>
              <div className="mt-2">
                <span className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                  {getWorkTypeLabel(work.type)}
                </span>
              </div>
            </Link>
          ))
        ) : (
          <div className="p-4 text-center text-gray-600 dark:text-gray-400">
            No works found matching the selected filter.
          </div>
        )}
      </div>
    </div>
  );
}
