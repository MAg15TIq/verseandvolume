"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import AudioPlayer from './AudioPlayer';

interface GhazalReaderProps {
  title: string;
  author: string;
  content: string[];
  translation?: {
    en?: string[];
    ur?: string[];
  };
  explanation?: string;
  language: 'en' | 'ur';
  audioUrl?: string | null;
  hasAudio?: boolean;
}

export default function GhazalReader({
  title,
  author,
  content,
  translation,
  explanation,
  language,
  audioUrl = null,
  hasAudio = false
}: GhazalReaderProps) {
  const t = useTranslations();
  const [fontSize, setFontSize] = useState(18);
  const [lineHeight, setLineHeight] = useState(1.8);
  const [showTranslation, setShowTranslation] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const increaseFontSize = () => setFontSize(prev => Math.min(prev + 2, 28));
  const decreaseFontSize = () => setFontSize(prev => Math.max(prev - 2, 14));

  const increaseLineHeight = () => setLineHeight(prev => Math.min(prev + 0.2, 3));
  const decreaseLineHeight = () => setLineHeight(prev => Math.max(prev - 0.2, 1));

  // Group content into couplets (pairs of lines)
  const couplets: string[][] = [];
  for (let i = 0; i < content.length; i += 2) {
    if (content[i] === "") {
      // Skip empty lines
      continue;
    }
    const couplet = [content[i]];
    if (i + 1 < content.length) {
      couplet.push(content[i + 1]);
    }
    couplets.push(couplet);
  }

  // Group translation into couplets if available
  const translationCouplets: string[][] = [];
  if (translation) {
    const translationContent = language === 'ur' ? translation.en : translation.ur;
    if (translationContent) {
      for (let i = 0; i < translationContent.length; i += 2) {
        if (translationContent[i] === "") {
          // Skip empty lines
          continue;
        }
        const couplet = [translationContent[i]];
        if (i + 1 < translationContent.length) {
          couplet.push(translationContent[i + 1]);
        }
        translationCouplets.push(couplet);
      }
    }
  }

  return (
    <div className="max-w-3xl mx-auto my-8">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">{author}</p>
      </div>

      <div className="mb-6 flex flex-wrap justify-between items-center">
        <div className="typography-controls flex space-x-4 mb-4 sm:mb-0">
          <div className="control-group">
            <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Font Size</span>
            <button
              onClick={decreaseFontSize}
              className="px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded-l"
              aria-label={t('reader.decreaseFontSize')}
            >
              -
            </button>
            <button
              onClick={increaseFontSize}
              className="px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded-r"
              aria-label={t('reader.increaseFontSize')}
            >
              +
            </button>
          </div>

          <div className="control-group">
            <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Line Height</span>
            <button
              onClick={decreaseLineHeight}
              className="px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded-l"
              aria-label={t('reader.decreaseLineHeight')}
            >
              -
            </button>
            <button
              onClick={increaseLineHeight}
              className="px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded-r"
              aria-label={t('reader.increaseLineHeight')}
            >
              +
            </button>
          </div>
        </div>

        <div className="display-controls flex space-x-4">
          {translation && (
            <button
              onClick={() => setShowTranslation(!showTranslation)}
              className={`px-3 py-1 rounded text-sm ${
                showTranslation
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
              }`}
            >
              {showTranslation ? t('poetry.hideTranslation') : t('poetry.showTranslation')}
            </button>
          )}

          {explanation && (
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className={`px-3 py-1 rounded text-sm ${
                showExplanation
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
              }`}
            >
              {showExplanation ? t('poetry.hideExplanation') : t('poetry.showExplanation')}
            </button>
          )}
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
          fontFamily: language === 'ur' ? 'Noto Nastaliq Urdu, serif' : 'inherit',
          direction: language === 'ur' ? 'rtl' : 'ltr'
        }}
      >
        {couplets.map((couplet, index) => (
          <div key={index} className="mb-10 couplet-container">
            <div className="couplet">
              {couplet.map((line, lineIndex) => (
                <div key={lineIndex} className="mb-1">
                  {line}
                </div>
              ))}
            </div>

            {showTranslation && translationCouplets[index] && (
              <div
                className={`mt-2 text-sm text-gray-600 dark:text-gray-400 ${language === 'ur' ? 'text-left' : 'text-right'}`}
                style={{
                  direction: language === 'ur' ? 'ltr' : 'rtl',
                  fontFamily: language === 'ur' ? 'inherit' : 'Noto Nastaliq Urdu, serif',
                }}
              >
                {translationCouplets[index].map((line, lineIndex) => (
                  <div key={lineIndex} className="mb-1">
                    {line}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {showExplanation && explanation && (
        <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
          <h3 className="text-xl font-semibold mb-4">{t('poetry.explanation')}</h3>
          <div className="prose dark:prose-invert max-w-none">
            {explanation}
          </div>
        </div>
      )}
    </div>
  );
}
