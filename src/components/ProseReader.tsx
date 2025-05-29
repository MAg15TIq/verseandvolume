"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import AudioPlayer from './AudioPlayer';

interface ProseReaderProps {
  title: string;
  author: string;
  content: string[];
  language: 'en' | 'ur';
  showPageNumbers?: boolean;
  audioUrl?: string | null;
  hasAudio?: boolean;
  isNovel?: boolean; // New prop to indicate if this is a novel
  defaultFullContent?: boolean; // New prop to control default view mode
}

export default function ProseReader({
  title,
  author,
  content,
  language,
  showPageNumbers = false,
  audioUrl = null,
  hasAudio = false,
  isNovel = false,
  defaultFullContent = false
}: ProseReaderProps) {
  const t = useTranslations();
  const [fontSize, setFontSize] = useState(18);
  const [lineHeight, setLineHeight] = useState(1.8);
  const [pageSize, setPageSize] = useState(10); // Number of paragraphs per page
  const [currentPage, setCurrentPage] = useState(1);
  const [showFullContent, setShowFullContent] = useState(isNovel || defaultFullContent); // Show full content by default for novels

  const increaseFontSize = () => setFontSize(prev => Math.min(prev + 2, 28));
  const decreaseFontSize = () => setFontSize(prev => Math.max(prev - 2, 14));

  const increaseLineHeight = () => setLineHeight(prev => Math.min(prev + 0.2, 3));
  const decreaseLineHeight = () => setLineHeight(prev => Math.max(prev - 0.2, 1));

  const totalPages = Math.ceil(content.length / pageSize);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const toggleViewMode = () => {
    setShowFullContent(prev => !prev);
    setCurrentPage(1); // Reset to first page when switching modes
    window.scrollTo(0, 0);
  };

  // Get current content based on view mode
  const currentContent = showFullContent
    ? content // Show all content
    : content.slice((currentPage - 1) * pageSize, currentPage * pageSize); // Show paginated content

  return (
    <div className="max-w-3xl mx-auto my-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-gray-600 dark:text-gray-400">{author}</p>
      </div>

      <div className="mb-6 flex flex-wrap justify-between items-center gap-4">
        <div className="typography-controls flex flex-wrap space-x-4">
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

          {/* View Mode Toggle */}
          <div className="control-group">
            <button
              onClick={toggleViewMode}
              className={`px-4 py-1 rounded text-sm font-medium transition-colors ${
                showFullContent
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
              }`}
              aria-label={showFullContent ? 'Switch to paginated view' : 'Switch to full content view'}
            >
              {showFullContent ? 'Full Content' : 'Paginated'}
            </button>
          </div>
        </div>

        {/* Page controls - only show when not in full content mode */}
        {!showFullContent && (
          <div className="page-controls">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Page {currentPage} of {totalPages}
            </span>
          </div>
        )}

        {/* Content info - show when in full content mode */}
        {showFullContent && (
          <div className="content-info">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {content.length} paragraphs • Full Content
            </span>
          </div>
        )}
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

      {/* Pagination controls - only show when not in full content mode */}
      {!showFullContent && (
        <div className="mt-6 flex justify-between">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${
              currentPage === 1
                ? 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Previous
          </button>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${
              currentPage === totalPages
                ? 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Next
          </button>
        </div>
      )}

      {/* Full content mode info */}
      {showFullContent && (
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            You are viewing the complete content. Use the &ldquo;Paginated&rdquo; button above to switch to page-by-page reading.
          </p>
        </div>
      )}
    </div>
  );
}
