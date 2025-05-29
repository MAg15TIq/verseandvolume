"use client";

import { useState } from 'react';

interface BilingualTextProps {
  title: {
    en: string;
    ur: string;
  };
  author: string;
  content: {
    en: string[];
    ur: string[];
  };
  displayMode?: 'side-by-side' | 'toggle';
}

export default function BilingualText({
  title,
  author,
  content,
  displayMode = 'toggle'
}: BilingualTextProps) {
  const [activeLanguage, setActiveLanguage] = useState<'en' | 'ur'>('en');

  return (
    <div className="max-w-4xl mx-auto my-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl mb-2" style={{ fontWeight: 700 }}>
          {activeLanguage === 'en' ? title.en : title.ur}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">{author}</p>
      </div>

      <div className="mb-6 flex justify-center space-x-4">
        <button
          onClick={() => setActiveLanguage('en')}
          className={`px-4 py-2 rounded ${activeLanguage === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200'}`}
        >
          English
        </button>
        <button
          onClick={() => setActiveLanguage('ur')}
          className={`px-4 py-2 rounded ${activeLanguage === 'ur' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200'}`}
        >
          اردو
        </button>

        {content.en.length === content.ur.length && (
          <button
            onClick={() => displayMode = displayMode === 'toggle' ? 'side-by-side' : 'toggle'}
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
          >
            {displayMode === 'toggle' ? 'Side by Side' : 'Toggle View'}
          </button>
        )}
      </div>

      {displayMode === 'toggle' ? (
        <div
          className={`p-8 bg-white dark:bg-gray-900 rounded-lg shadow-sm ${activeLanguage === 'ur' ? 'text-right' : 'text-left'}`}
          style={{
            fontFamily: activeLanguage === 'ur' ? 'Noto Nastaliq Urdu, serif' : 'inherit',
            direction: activeLanguage === 'ur' ? 'rtl' : 'ltr'
          }}
        >
          {(activeLanguage === 'en' ? content.en : content.ur).map((line, index) => (
            <div key={index} className="mb-4">
              {line || <br />}
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div
            className="p-8 bg-white dark:bg-gray-900 rounded-lg shadow-sm"
          >
            <h3 className="text-xl mb-4" style={{ fontWeight: 600 }}>English</h3>
            {content.en.map((line, index) => (
              <div key={index} className="mb-4">
                {line || <br />}
              </div>
            ))}
          </div>

          <div
            className="p-8 bg-white dark:bg-gray-900 rounded-lg shadow-sm text-right"
            style={{
              fontFamily: 'Noto Nastaliq Urdu, serif',
              direction: 'rtl'
            }}
          >
            <h3 className="text-xl mb-4" style={{ fontWeight: 600 }}>اردو</h3>
            {content.ur.map((line, index) => (
              <div key={index} className="mb-4">
                {line || <br />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
