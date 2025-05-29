"use client";

import { useState } from 'react';

interface TimelineEvent {
  year: number;
  event: string;
}

interface AuthorTimelineProps {
  timeline: TimelineEvent[];
  language?: 'en' | 'ur';
}

export default function AuthorTimeline({ timeline, language = 'en' }: AuthorTimelineProps) {
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);
  
  // Sort timeline events by year
  const sortedTimeline = [...timeline].sort((a, b) => a.year - b.year);

  return (
    <div className={`relative ${language === 'ur' ? 'text-right' : 'text-left'}`}>
      {/* Vertical line */}
      <div 
        className="absolute top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800" 
        style={{ 
          left: language === 'ur' ? 'auto' : '24px',
          right: language === 'ur' ? '24px' : 'auto'
        }}
      ></div>
      
      <div className="space-y-8">
        {sortedTimeline.map((item, index) => (
          <div 
            key={index}
            className={`relative flex items-start ${language === 'ur' ? 'flex-row-reverse' : ''}`}
          >
            {/* Year circle */}
            <div 
              className={`flex items-center justify-center w-12 h-12 rounded-full border-4 border-white dark:border-gray-900 bg-paper-200 dark:bg-paper-800 text-paper-900 dark:text-paper-100 font-bold z-10 ${
                language === 'ur' ? 'ml-6' : 'mr-6'
              }`}
            >
              <span className="text-sm">{item.year}</span>
            </div>
            
            {/* Event content */}
            <div 
              className={`flex-1 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 transition-all duration-300 ${
                expandedEvent === index ? 'transform scale-105' : ''
              }`}
              onClick={() => setExpandedEvent(expandedEvent === index ? null : index)}
              style={{
                cursor: 'pointer',
                fontFamily: language === 'ur' ? 'Noto Nastaliq Urdu, serif' : 'inherit',
                direction: language === 'ur' ? 'rtl' : 'ltr'
              }}
            >
              <div className="prose dark:prose-invert max-w-none">
                <p className="m-0">{item.event}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
