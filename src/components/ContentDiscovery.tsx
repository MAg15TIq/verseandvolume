"use client";

import { useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { MagnifyingGlassIcon, FunnelIcon, BookOpenIcon, HeartIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface ContentItem {
  id: string;
  title: string;
  author: string;
  type: 'poetry' | 'novel' | 'ghazal' | 'prose' | 'quote' | 'story';
  language: 'en' | 'ur' | 'both';
  themes?: string[];
  excerpt: string;
  category: string;
  featured?: boolean;
  trending?: boolean;
  new?: boolean;
}

interface ContentDiscoveryProps {
  items: ContentItem[];
  showFilters?: boolean;
  showSearch?: boolean;
  showTags?: boolean;
  maxItems?: number;
  title?: string;
}

export default function ContentDiscovery({
  items,
  showFilters = true,
  showSearch = true,
  showTags = true,
  maxItems = 12,
  title = "Discover Content"
}: ContentDiscoveryProps) {
  const t = useTranslations();
  const locale = useLocale();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);

  // Helper function to create localized paths
  const localizedPath = (path: string) => {
    return `/${locale}${path}`;
  };

  // Filter and search items
  const filteredItems = useMemo(() => {
    let filtered = items;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.author.toLowerCase().includes(query) ||
        item.excerpt.toLowerCase().includes(query)
      );
    }

    // Type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter(item => item.type === selectedType);
    }

    // Language filter
    if (selectedLanguage !== 'all') {
      filtered = filtered.filter(item => 
        item.language === selectedLanguage || item.language === 'both'
      );
    }

    // Tag filter
    if (selectedTag !== 'all') {
      if (selectedTag === 'featured') {
        filtered = filtered.filter(item => item.featured);
      } else if (selectedTag === 'trending') {
        filtered = filtered.filter(item => item.trending);
      } else if (selectedTag === 'new') {
        filtered = filtered.filter(item => item.new);
      } else {
        filtered = filtered.filter(item => 
          item.themes?.includes(selectedTag)
        );
      }
    }

    return filtered.slice(0, maxItems);
  }, [items, searchQuery, selectedType, selectedLanguage, selectedTag, maxItems]);

  // Get unique themes for tag filter
  const availableThemes = useMemo(() => {
    const themes = new Set<string>();
    items.forEach(item => {
      item.themes?.forEach(theme => themes.add(theme));
    });
    return Array.from(themes).sort();
  }, [items]);

  // Get content type icon
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'poetry':
      case 'ghazal':
        return '📝';
      case 'novel':
      case 'story':
        return '📚';
      case 'prose':
        return '📄';
      case 'quote':
        return '💭';
      default:
        return '📖';
    }
  };

  // Get content path
  const getContentPath = (item: ContentItem) => {
    switch (item.type) {
      case 'poetry':
        return `/poetry/${item.id}`;
      case 'ghazal':
        return `/ghazals/${item.id}`;
      case 'novel':
        return `/novels/${item.id}`;
      case 'story':
        return `/stories/${item.id}`;
      case 'prose':
        return `/prose/${item.id}`;
      case 'quote':
        return `/quotes#${item.id}`;
      default:
        return `/${item.category}/${item.id}`;
    }
  };

  return (
    <div className="content-discovery bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {title}
        </h2>
        
        {showFilters && (
          <button
            onClick={() => setShowFiltersPanel(!showFiltersPanel)}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <FunnelIcon className="w-4 h-4" />
            Filters
          </button>
        )}
      </div>

      {/* Search Bar */}
      {showSearch && (
        <div className="relative mb-4">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder={t('search.placeholder') || "Search content..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      )}

      {/* Filters Panel */}
      {showFilters && showFiltersPanel && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          {/* Content Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Content Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="all">All Types</option>
              <option value="poetry">Poetry</option>
              <option value="ghazal">Ghazals</option>
              <option value="novel">Novels</option>
              <option value="story">Stories</option>
              <option value="prose">Prose</option>
              <option value="quote">Quotes</option>
            </select>
          </div>

          {/* Language Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Language
            </label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="all">All Languages</option>
              <option value="en">English</option>
              <option value="ur">Urdu</option>
            </select>
          </div>

          {/* Tag Filter */}
          {showTags && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tags
              </label>
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="all">All Tags</option>
                <option value="featured">Featured</option>
                <option value="trending">Trending</option>
                <option value="new">New</option>
                {availableThemes.map(theme => (
                  <option key={theme} value={theme}>{theme}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} found
        </p>
        
        {/* Quick Filter Tags */}
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedTag('featured')}
            className={`flex items-center gap-1 px-2 py-1 text-xs rounded-full transition-colors ${
              selectedTag === 'featured'
                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <SparklesIcon className="w-3 h-3" />
            Featured
          </button>
          
          <button
            onClick={() => setSelectedTag('trending')}
            className={`flex items-center gap-1 px-2 py-1 text-xs rounded-full transition-colors ${
              selectedTag === 'trending'
                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <HeartIcon className="w-3 h-3" />
            Trending
          </button>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <Link
            key={item.id}
            href={localizedPath(getContentPath(item))}
            className="group block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{getTypeIcon(item.type)}</span>
                <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400">
                  {item.type}
                </span>
              </div>
              
              <div className="flex gap-1">
                {item.featured && (
                  <SparklesIcon className="w-4 h-4 text-yellow-500" title="Featured" />
                )}
                {item.trending && (
                  <HeartIcon className="w-4 h-4 text-red-500" title="Trending" />
                )}
                {item.new && (
                  <span className="text-xs px-1 py-0.5 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded">
                    New
                  </span>
                )}
              </div>
            </div>
            
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1 line-clamp-2">
              {item.title}
            </h3>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              by {item.author}
            </p>
            
            <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
              {item.excerpt}
            </p>
            
            {item.themes && item.themes.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {item.themes.slice(0, 3).map(theme => (
                  <span
                    key={theme}
                    className="text-xs px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full"
                  >
                    {theme}
                  </span>
                ))}
                {item.themes.length > 3 && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    +{item.themes.length - 3} more
                  </span>
                )}
              </div>
            )}
          </Link>
        ))}
      </div>

      {/* No Results */}
      {filteredItems.length === 0 && (
        <div className="text-center py-8">
          <BookOpenIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            No content found matching your criteria.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedType('all');
              setSelectedLanguage('all');
              setSelectedTag('all');
            }}
            className="mt-2 text-blue-600 dark:text-blue-400 hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
