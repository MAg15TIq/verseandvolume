"use client";

import { useState } from 'react';

interface QuoteDisplayProps {
  quote: string;
  author: string;
  source?: string;
  language: 'en' | 'ur';
}

export default function QuoteDisplay({ quote, author, source, language }: QuoteDisplayProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`relative p-8 my-8 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-sm ${language === 'ur' ? 'text-right' : 'text-left'}`}>
      <div className="absolute top-0 left-0 transform -translate-x-4 -translate-y-4 text-6xl text-gray-300 dark:text-gray-700">
        &ldquo;
      </div>

      <blockquote className={`relative z-10 text-xl md:text-2xl font-serif italic transition-all duration-300 ${isExpanded ? '' : 'line-clamp-4'}`}>
        {quote}
      </blockquote>

      {quote.length > 200 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3 text-blue-600 dark:text-blue-400 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded px-1 py-1 transition-colors duration-200"
          aria-expanded={isExpanded}
          aria-label={isExpanded ? 'Show less of quote' : 'Show full quote'}
        >
          {isExpanded ? 'Show less' : 'Show full quote'}
        </button>
      )}

      <div className={`mt-4 flex ${language === 'ur' ? 'justify-start flex-row-reverse' : 'justify-end'}`}>
        <div className="text-right">
          <p className="font-semibold">{author}</p>
          {source && <p className="text-sm text-gray-600 dark:text-gray-400">{source}</p>}
        </div>
      </div>

      <div className="absolute bottom-0 right-0 transform translate-x-4 translate-y-4 text-6xl text-gray-300 dark:text-gray-700 rotate-180">
        &rdquo;
      </div>
    </div>
  );
}
