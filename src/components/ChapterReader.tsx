"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import AudioPlayer from './AudioPlayer';
import AudiobookPlayer from './AudiobookPlayer';
import { Chapter, Book, AudioChapter } from '@/types';

interface ChapterReaderProps {
  title: string;
  author: string;
  chapters: Chapter[];
  language: 'en' | 'ur';
  audioUrl?: string | null;
  hasAudio?: boolean;
  book?: Book; // Add book prop for enhanced audiobook integration
  audioChapters?: AudioChapter[]; // Add audioChapters prop
}

export default function ChapterReader({
  title,
  author,
  chapters,
  language,
  audioUrl = null,
  hasAudio = false,
  book,
  audioChapters
}: ChapterReaderProps) {
  const t = useTranslations();
  const [fontSize, setFontSize] = useState(18);
  const [lineHeight, setLineHeight] = useState(1.8);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [showChapterList, setShowChapterList] = useState(false);

  const increaseFontSize = () => setFontSize(prev => Math.min(prev + 2, 28));
  const decreaseFontSize = () => setFontSize(prev => Math.max(prev - 2, 14));

  const increaseLineHeight = () => setLineHeight(prev => Math.min(prev + 0.2, 3));
  const decreaseLineHeight = () => setLineHeight(prev => Math.max(prev - 0.2, 1));

  const currentChapter = chapters[currentChapterIndex];

  // Get chapter content based on language
  const getChapterContent = (chapter: Chapter): string[] => {
    if (Array.isArray(chapter.content)) {
      return chapter.content;
    }
    // For bilingual content, prefer current language
    if (language === 'ur' && chapter.content.ur) return chapter.content.ur;
    if (language === 'en' && chapter.content.en) return chapter.content.en;
    // Fallback to available content
    return chapter.content.en || chapter.content.ur || [];
  };

  const currentContent = getChapterContent(currentChapter);

  // Get current chapter's audio URL if available
  const getCurrentChapterAudioUrl = () => {
    if (audioChapters && audioChapters.length > currentChapterIndex) {
      return audioChapters[currentChapterIndex]?.audioUrl || null;
    }
    return audioUrl;
  };

  const currentChapterAudioUrl = getCurrentChapterAudioUrl();

  // Check if this is an audiobook with chapter-specific audio
  const isAudiobook = book?.isAudiobook && (book?.audioChapters?.length || 0) > 0;

  const handleNextChapter = () => {
    if (currentChapterIndex < chapters.length - 1) {
      setCurrentChapterIndex(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevChapter = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleChapterSelect = (index: number) => {
    setCurrentChapterIndex(index);
    setShowChapterList(false);
    window.scrollTo(0, 0);
  };

  // Handle audiobook chapter changes
  const handleAudiobookChapterChange = (chapterIndex: number) => {
    setCurrentChapterIndex(chapterIndex);
    window.scrollTo(0, 0);
  };

  return (
    <div className="max-w-4xl mx-auto my-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-gray-600 dark:text-gray-400">{author}</p>
      </div>

      {/* Chapter Navigation Header */}
      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">{currentChapter.title}</h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {currentChapterIndex + 1} of {chapters.length}
            </span>
          </div>

          <button
            onClick={() => setShowChapterList(!showChapterList)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            {showChapterList ? 'Hide Chapters' : 'Show Chapters'}
          </button>
        </div>

        {/* Chapter List */}
        {showChapterList && (
          <div className="mt-4 max-h-64 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
              {chapters.map((chapter, index) => (
                <button
                  key={chapter.id}
                  onClick={() => handleChapterSelect(index)}
                  className={`p-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                    index === currentChapterIndex
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="text-sm font-medium truncate">{chapter.title}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Reading Controls */}
      <div className="mb-6 flex flex-wrap justify-between items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Font Size:</label>
            <button
              onClick={decreaseFontSize}
              className="w-8 h-8 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center"
            >
              -
            </button>
            <span className="text-sm w-8 text-center">{fontSize}</span>
            <button
              onClick={increaseFontSize}
              className="w-8 h-8 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center"
            >
              +
            </button>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Line Height:</label>
            <button
              onClick={decreaseLineHeight}
              className="w-8 h-8 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center"
            >
              -
            </button>
            <span className="text-sm w-8 text-center">{lineHeight.toFixed(1)}</span>
            <button
              onClick={increaseLineHeight}
              className="w-8 h-8 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center"
            >
              +
            </button>
          </div>
        </div>

        {/* Enhanced Audio Integration */}
        {isAudiobook && book ? (
          <div className="flex-1">
            <AudiobookPlayer
              book={book}
              language={language}
              showChapterList={false}
              className="bg-transparent shadow-none p-0"
              currentChapterIndex={currentChapterIndex}
              onChapterChange={handleAudiobookChapterChange}
            />
          </div>
        ) : hasAudio && currentChapterAudioUrl && (
          <AudioPlayer
            audioUrl={currentChapterAudioUrl}
            language={language}
            compact={true}
          />
        )}
      </div>

      {/* Chapter Content */}
      <div
        className={`p-8 bg-white dark:bg-gray-900 rounded-lg shadow-sm ${language === 'ur' ? 'text-right' : 'text-left'} prose prose-lg dark:prose-invert max-w-none`}
        style={{
          fontSize: `${fontSize}px`,
          lineHeight: lineHeight,
          fontFamily: language === 'ur' ? 'Noto Nastaliq Urdu, serif' : 'inherit',
          direction: language === 'ur' ? 'rtl' : 'ltr'
        }}
      >
        {currentContent.map((paragraph, index) => (
          <div key={index} className="mb-6">
            {paragraph || <br />}
          </div>
        ))}
      </div>

      {/* Chapter Navigation Footer */}
      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={handlePrevChapter}
          disabled={currentChapterIndex === 0}
          className={`px-6 py-3 rounded flex items-center gap-2 ${
            currentChapterIndex === 0
              ? 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          <span>←</span>
          Previous Chapter
        </button>

        <div className="text-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Chapter {currentChapterIndex + 1} of {chapters.length}
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            {currentChapter.title}
          </div>
        </div>

        <button
          onClick={handleNextChapter}
          disabled={currentChapterIndex === chapters.length - 1}
          className={`px-6 py-3 rounded flex items-center gap-2 ${
            currentChapterIndex === chapters.length - 1
              ? 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Next Chapter
          <span>→</span>
        </button>
      </div>
    </div>
  );
}
