'use client';

import { useState, useEffect, useRef } from 'react';

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
  id?: string;
}

export default function CollapsibleSection({
  title,
  children,
  defaultExpanded,
  className = '',
  titleClassName = '',
  contentClassName = '',
  id
}: CollapsibleSectionProps) {
  // Determine default state - collapsed by default across all devices
  const [isExpanded, setIsExpanded] = useState(() => {
    if (defaultExpanded !== undefined) {
      return defaultExpanded;
    }
    // Default to collapsed on all devices for cleaner initial view
    return false;
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number>(0);

  // Update height when content changes or expansion state changes
  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isExpanded ? contentRef.current.scrollHeight : 0);
    }
  }, [isExpanded, children]);

  // No responsive behavior needed - consistent collapsed default across all devices

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleExpanded();
    }
  };

  const sectionId = id || `collapsible-${title.toLowerCase().replace(/\s+/g, '-')}`;
  const contentId = `${sectionId}-content`;

  return (
    <div className={`collapsible-section ${className}`}>
      {/* Header with toggle button */}
      <button
        onClick={toggleExpanded}
        onKeyDown={handleKeyDown}
        className={`w-full flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md p-2 -m-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 ${titleClassName}`}
        aria-expanded={isExpanded}
        aria-controls={contentId}
        type="button"
      >
        <h3 className="text-xl font-semibold">{title}</h3>

        {/* Chevron icon */}
        <svg
          className={`w-5 h-5 transition-transform duration-300 ease-in-out ${
            isExpanded ? 'rotate-180' : 'rotate-0'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Collapsible content */}
      <div
        id={contentId}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          height: `${contentHeight}px`,
          opacity: isExpanded ? 1 : 0
        }}
        aria-hidden={!isExpanded}
      >
        <div
          ref={contentRef}
          className={`pt-4 ${contentClassName}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
