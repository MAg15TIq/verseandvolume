"use client";

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { 
  AdjustmentsHorizontalIcon, 
  SpeakerWaveIcon, 
  BookmarkIcon,
  ShareIcon,
  PrinterIcon,
  EyeIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';

interface EnhancedReaderProps {
  title: string;
  author: string;
  content: string[];
  language: 'en' | 'ur';
  type: 'poetry' | 'prose' | 'ghazal' | 'novel';
  audioUrl?: string | null;
  hasAudio?: boolean;
  onBookmark?: (isBookmarked: boolean) => void;
  isBookmarked?: boolean;
}

export default function EnhancedReader({
  title,
  author,
  content,
  language,
  type,
  audioUrl = null,
  hasAudio = false,
  onBookmark,
  isBookmarked = false
}: EnhancedReaderProps) {
  const t = useTranslations();
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Reading preferences
  const [fontSize, setFontSize] = useState(18);
  const [lineHeight, setLineHeight] = useState(1.8);
  const [fontFamily, setFontFamily] = useState('default');
  const [theme, setTheme] = useState<'light' | 'dark' | 'sepia'>('light');
  const [showSettings, setShowSettings] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [estimatedReadTime, setEstimatedReadTime] = useState(0);
  const [isReading, setIsReading] = useState(false);

  // Font options
  const fontOptions = [
    { value: 'default', label: 'Default', family: language === 'ur' ? 'Noto Nastaliq Urdu' : 'Crimson Text' },
    { value: 'serif', label: 'Serif', family: language === 'ur' ? 'Noto Nastaliq Urdu' : 'Georgia' },
    { value: 'sans', label: 'Sans Serif', family: language === 'ur' ? 'Noto Sans Arabic' : 'Inter' },
    { value: 'mono', label: 'Monospace', family: language === 'ur' ? 'Noto Nastaliq Urdu' : 'JetBrains Mono' }
  ];

  // Theme configurations
  const themes = {
    light: {
      bg: 'bg-white',
      text: 'text-gray-900',
      secondary: 'text-gray-600'
    },
    dark: {
      bg: 'bg-gray-900',
      text: 'text-gray-100',
      secondary: 'text-gray-400'
    },
    sepia: {
      bg: 'bg-amber-50',
      text: 'text-amber-900',
      secondary: 'text-amber-700'
    }
  };

  // Calculate estimated reading time
  useEffect(() => {
    const wordCount = content.join(' ').split(' ').length;
    const wordsPerMinute = language === 'ur' ? 150 : 200; // Adjust for language
    setEstimatedReadTime(Math.ceil(wordCount / wordsPerMinute));
  }, [content, language]);

  // Track reading progress
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      
      const element = contentRef.current;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = element.scrollHeight - window.innerHeight;
      const progress = Math.min((scrollTop / scrollHeight) * 100, 100);
      
      setReadingProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Save reading preferences to localStorage
  useEffect(() => {
    const preferences = {
      fontSize,
      lineHeight,
      fontFamily,
      theme
    };
    localStorage.setItem('readingPreferences', JSON.stringify(preferences));
  }, [fontSize, lineHeight, fontFamily, theme]);

  // Load reading preferences from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('readingPreferences');
      if (saved) {
        const preferences = JSON.parse(saved);
        setFontSize(preferences.fontSize || 18);
        setLineHeight(preferences.lineHeight || 1.8);
        setFontFamily(preferences.fontFamily || 'default');
        setTheme(preferences.theme || 'light');
      }
    } catch (error) {
      console.error('Error loading reading preferences:', error);
    }
  }, []);

  // Handle bookmark toggle
  const handleBookmark = () => {
    const newBookmarkState = !isBookmarked;
    onBookmark?.(newBookmarkState);
  };

  // Handle share
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${title} by ${author}`,
          text: content[0].substring(0, 100) + '...',
          url: window.location.href
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  // Handle print
  const handlePrint = () => {
    window.print();
  };

  // Get current font family
  const getCurrentFont = () => {
    const selected = fontOptions.find(f => f.value === fontFamily);
    return selected?.family || fontOptions[0].family;
  };

  return (
    <div className={`enhanced-reader min-h-screen transition-colors duration-300 ${themes[theme].bg}`}>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-50">
        <div 
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Floating Action Bar */}
      <div className="fixed top-4 right-4 z-40 flex flex-col gap-2">
        {/* Settings Toggle */}
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 dark:border-gray-700"
          aria-label="Reading settings"
        >
          <AdjustmentsHorizontalIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>

        {/* Audio Toggle */}
        {(hasAudio || audioUrl) && (
          <button
            onClick={() => setIsReading(!isReading)}
            className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 dark:border-gray-700"
            aria-label={isReading ? "Stop reading" : "Start reading"}
          >
            <SpeakerWaveIcon className={`w-5 h-5 ${isReading ? 'text-blue-600' : 'text-gray-700 dark:text-gray-300'}`} />
          </button>
        )}

        {/* Bookmark */}
        <button
          onClick={handleBookmark}
          className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 dark:border-gray-700"
          aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
        >
          {isBookmarked ? (
            <BookmarkSolidIcon className="w-5 h-5 text-yellow-600" />
          ) : (
            <BookmarkIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          )}
        </button>

        {/* Share */}
        <button
          onClick={handleShare}
          className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 dark:border-gray-700"
          aria-label="Share"
        >
          <ShareIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>

        {/* Print */}
        <button
          onClick={handlePrint}
          className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 dark:border-gray-700"
          aria-label="Print"
        >
          <PrinterIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="fixed top-16 right-4 z-30 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Reading Settings
          </h3>

          {/* Font Size */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Font Size: {fontSize}px
            </label>
            <input
              type="range"
              min="14"
              max="32"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
          </div>

          {/* Line Height */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Line Height: {lineHeight}
            </label>
            <input
              type="range"
              min="1.2"
              max="3"
              step="0.1"
              value={lineHeight}
              onChange={(e) => setLineHeight(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
          </div>

          {/* Font Family */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Font Family
            </label>
            <select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              {fontOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Theme */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Theme
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setTheme('light')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                  theme === 'light' 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                }`}
              >
                <SunIcon className="w-4 h-4" />
                Light
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                  theme === 'dark' 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                }`}
              >
                <MoonIcon className="w-4 h-4" />
                Dark
              </button>
              <button
                onClick={() => setTheme('sepia')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                  theme === 'sepia' 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                }`}
              >
                <EyeIcon className="w-4 h-4" />
                Sepia
              </button>
            </div>
          </div>

          {/* Reading Stats */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Estimated reading time: {estimatedReadTime} min
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Progress: {Math.round(readingProgress)}%
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className={`text-4xl font-bold mb-2 ${themes[theme].text}`}>
            {title}
          </h1>
          <p className={`text-xl ${themes[theme].secondary}`}>
            by {author}
          </p>
          <div className="flex items-center justify-center gap-4 mt-4 text-sm">
            <span className={`px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 ${themes[theme].secondary}`}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
            <span className={`px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 ${themes[theme].secondary}`}>
              {language === 'ur' ? 'اردو' : 'English'}
            </span>
            <span className={`px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 ${themes[theme].secondary}`}>
              {estimatedReadTime} min read
            </span>
          </div>
        </header>

        {/* Content */}
        <div
          ref={contentRef}
          className={`prose prose-lg max-w-none ${themes[theme].text} ${
            language === 'ur' ? 'text-right' : 'text-left'
          }`}
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: lineHeight,
            fontFamily: getCurrentFont(),
            direction: language === 'ur' ? 'rtl' : 'ltr'
          }}
        >
          {content.map((paragraph, index) => (
            <div key={index} className="mb-6">
              {paragraph || <br />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
