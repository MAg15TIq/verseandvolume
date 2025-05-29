'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import CollapsibleSection from './CollapsibleSection';

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface FilterControlsProps {
  filters: {
    name: string;
    label: string;
    options: FilterOption[];
    multiSelect?: boolean;
  }[];
  onFilterChange: (filterName: string, selectedValues: string[]) => void;
  className?: string;
  title?: string;
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

export default function FilterControls({
  filters,
  onFilterChange,
  className = '',
  title,
  collapsible = true,
  defaultExpanded
}: FilterControlsProps) {
  const t = useTranslations();
  // Initialize selected filters state
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  // Initialize selected filters on component mount
  useEffect(() => {
    const initialFilters: Record<string, string[]> = {};
    filters.forEach(filter => {
      initialFilters[filter.name] = [];
    });
    setSelectedFilters(initialFilters);
  }, [filters]);

  // Handle filter selection
  const handleFilterChange = (filterName: string, value: string, multiSelect: boolean = false) => {
    setSelectedFilters(prev => {
      const currentSelected = [...(prev[filterName] || [])];

      if (multiSelect) {
        // For multi-select filters, toggle the selection
        const valueIndex = currentSelected.indexOf(value);
        if (valueIndex === -1) {
          currentSelected.push(value);
        } else {
          currentSelected.splice(valueIndex, 1);
        }
      } else {
        // For single-select filters, replace the selection
        if (currentSelected.includes(value)) {
          return { ...prev, [filterName]: [] }; // Deselect if already selected
        } else {
          return { ...prev, [filterName]: [value] };
        }
      }

      return { ...prev, [filterName]: currentSelected };
    });
  };

  // Call the parent's onFilterChange whenever selectedFilters changes
  useEffect(() => {
    Object.entries(selectedFilters).forEach(([filterName, values]) => {
      onFilterChange(filterName, values);
    });
  }, [selectedFilters, onFilterChange]);

  // Reset all filters
  const resetFilters = () => {
    const resetState: Record<string, string[]> = {};
    filters.forEach(filter => {
      resetState[filter.name] = [];
    });
    setSelectedFilters(resetState);
  };

  const filterContent = (
    <>
      <div className="flex flex-wrap gap-6 mb-4">
        {filters.map(filter => (
          <div key={filter.name} className="filter-group">
            <h3 className="text-sm font-medium mb-2">{filter.label}</h3>
            <div className="flex flex-wrap gap-2">
              {filter.options.map(option => (
                <button
                  key={option.value}
                  onClick={() => handleFilterChange(filter.name, option.value, filter.multiSelect)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${
                    selectedFilters[filter.name]?.includes(option.value)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  {option.label}
                  {option.count !== undefined && (
                    <span className="ml-1 text-xs opacity-80">({option.count})</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {Object.values(selectedFilters).some(values => values.length > 0) && (
        <button
          onClick={resetFilters}
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline mb-4 min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          {t('prose.resetFilters')}
        </button>
      )}
    </>
  );

  if (collapsible && title) {
    return (
      <div className={`filter-controls ${className}`}>
        <CollapsibleSection
          title={title}
          defaultExpanded={defaultExpanded}
          className="w-full"
        >
          {filterContent}
        </CollapsibleSection>
      </div>
    );
  }

  return (
    <div className={`filter-controls ${className}`}>
      {filterContent}
    </div>
  );
}
