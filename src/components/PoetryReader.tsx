"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import AudioPlayer from './AudioPlayer';

interface PoetryReaderProps {
  title: string;
  author: string;
  content: string[];
  language: 'en' | 'ur';
  showLineNumbers?: boolean;
  audioUrl?: string | null;
  hasAudio?: boolean;
}

export default function PoetryReader({
  title,
  author,
  content,
  language,
  showLineNumbers = false,
  audioUrl = null,
  hasAudio = false
}: PoetryReaderProps) {
  const t = useTranslations();
  const [fontSize, setFontSize] = useState(18);
  const [lineHeight, setLineHeight] = useState(1.8);

  const increaseFontSize = () => setFontSize(prev => Math.min(prev + 2, 28));
  const decreaseFontSize = () => setFontSize(prev => Math.max(prev - 2, 14));

  const increaseLineHeight = () => setLineHeight(prev => Math.min(prev + 0.2, 3));
  const decreaseLineHeight = () => setLineHeight(prev => Math.max(prev - 0.2, 1));

  return (
    <div className="max-w-3xl mx-auto my-8">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">{author}</p>
      </div>

      <div className="mb-6 flex justify-center space-x-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={decreaseFontSize}
            className="p-2 rounded bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
            aria-label={t('reader.decreaseFontSize')}
          >
            A-
          </button>
          <button
            onClick={increaseFontSize}
            className="p-2 rounded bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
            aria-label={t('reader.increaseFontSize')}
          >
            A+
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={decreaseLineHeight}
            className="p-2 rounded bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
            aria-label={t('reader.decreaseLineHeight')}
          >
            ↕-
          </button>
          <button
            onClick={increaseLineHeight}
            className="p-2 rounded bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
            aria-label={t('reader.increaseLineHeight')}
          >
            ↕+
          </button>
        </div>
      </div>

      {/* Audio Player */}
      {(hasAudio || audioUrl) && (
        <div className="mb-6">
          <AudioPlayer
            audioUrl={audioUrl}
            language={language}
            className="mb-4"
          />
        </div>
      )}

      <div
        className={`p-8 bg-white dark:bg-gray-900 rounded-lg shadow-sm ${language === 'ur' ? 'text-right' : 'text-left'}`}
        style={{
          fontSize: `${fontSize}px`,
          lineHeight: lineHeight,
          fontFamily: language === 'ur' ? 'Noto Nastaliq Urdu, serif' : 'inherit'
        }}
      >
        {content.map((line, index) => (
          <div key={index} className="flex">
            {showLineNumbers && (
              <span className="text-gray-400 dark:text-gray-600 mr-4 select-none">
                {index + 1}
              </span>
            )}
            <div className="flex-1">
              {line || <br />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
