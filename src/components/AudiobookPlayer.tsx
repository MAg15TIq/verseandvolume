"use client";

import { useState, useEffect } from 'react';
import { useAudio } from '@/hooks/useAudio';
import { useTranslations } from 'next-intl';
import { Book, AudioChapter } from '@/types';

interface AudiobookPlayerProps {
  book: Book;
  language?: 'en' | 'ur';
  className?: string;
  showChapterList?: boolean;
  currentChapterIndex?: number; // Allow external control of current chapter
  onChapterChange?: (chapterIndex: number) => void; // Callback for chapter changes
}

export default function AudiobookPlayer({
  book,
  language = 'en',
  className = '',
  showChapterList = true,
  currentChapterIndex: externalChapterIndex,
  onChapterChange
}: AudiobookPlayerProps) {
  const t = useTranslations();
  const {
    isPlaying,
    currentAudioUrl,
    currentTime,
    duration,
    volume,
    playbackRate,
    isLoading,
    error,
    toggle,
    seek,
    setVolume,
    setPlaybackRate
  } = useAudio();

  const [internalChapterIndex, setInternalChapterIndex] = useState(0);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showSpeedOptions, setShowSpeedOptions] = useState(false);

  // Use external chapter index if provided, otherwise use internal state
  const currentChapterIndex = externalChapterIndex !== undefined ? externalChapterIndex : internalChapterIndex;
  const [showChapters, setShowChapters] = useState(false);

  // Get audio URL based on language and current chapter
  const getAudioUrl = () => {
    // If we have chapters with individual audio files, use the current chapter's audio
    if (book.audioChapters && book.audioChapters.length > 0) {
      const currentChapter = book.audioChapters[currentChapterIndex];
      if (currentChapter?.audioUrl) {
        console.log('Using chapter audio URL:', currentChapter.audioUrl);
        return currentChapter.audioUrl;
      }
    }

    // Fall back to main audiobook URL
    if (!book.audioUrl) return null;

    if (typeof book.audioUrl === 'string') {
      console.log('Using main audio URL:', book.audioUrl);
      return book.audioUrl;
    }

    const url = book.audioUrl[language] || book.audioUrl.en || null;
    console.log('Using language-specific audio URL:', url);
    return url;
  };

  // Get current chapter if audiobook has chapters
  const getCurrentChapter = (): AudioChapter | null => {
    if (!book.audioChapters || book.audioChapters.length === 0) return null;
    return book.audioChapters[currentChapterIndex] || null;
  };

  const audioUrl = getAudioUrl();
  const currentChapter = getCurrentChapter();
  const isThisAudioPlaying = isPlaying && currentAudioUrl === audioUrl;

  // Format time in HH:MM:SS or MM:SS format
  const formatTime = (time: number) => {
    if (isNaN(time)) return '00:00';

    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Handle play/pause
  const handlePlayPause = () => {
    if (audioUrl) {
      console.log('Play/pause button clicked, audio URL:', audioUrl);
      toggle(audioUrl);
    } else {
      console.error('No audio URL available for playback');
    }
  };

  // Handle seek
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    seek(newTime);
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  // Handle playback rate change
  const handlePlaybackRateChange = (rate: number) => {
    setPlaybackRate(rate);
    setShowSpeedOptions(false);
  };

  // Handle chapter selection
  const handleChapterSelect = (chapterIndex: number) => {
    console.log('Selecting chapter:', chapterIndex);
    // Update internal state only if not externally controlled
    if (externalChapterIndex === undefined) {
      setInternalChapterIndex(chapterIndex);
    }

    // Notify parent component of chapter change
    if (onChapterChange) {
      onChapterChange(chapterIndex);
    }

    setShowChapters(false);

    // If chapters have individual audio files, switch to that chapter's audio
    if (book.audioChapters && book.audioChapters[chapterIndex]?.audioUrl) {
      const chapterAudio = book.audioChapters[chapterIndex].audioUrl;
      console.log('Switching to chapter audio:', chapterAudio);
      toggle(chapterAudio);
    } else if (book.audioChapters && book.audioChapters[chapterIndex]?.startTime !== undefined) {
      // If it's a single file with timestamps, seek to chapter start
      const startTime = book.audioChapters[chapterIndex].startTime!;
      console.log('Seeking to chapter start time:', startTime);
      seek(startTime);
    }
  };

  // Skip to next chapter
  const nextChapter = () => {
    if (book.audioChapters && currentChapterIndex < book.audioChapters.length - 1) {
      handleChapterSelect(currentChapterIndex + 1);
    }
  };

  // Skip to previous chapter
  const previousChapter = () => {
    if (book.audioChapters && currentChapterIndex > 0) {
      handleChapterSelect(currentChapterIndex - 1);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowVolumeSlider(false);
      setShowSpeedOptions(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Debug: Log the current state
  console.log('AudiobookPlayer render:', {
    audioUrl,
    currentChapter,
    currentChapterIndex,
    hasAudioChapters: !!book.audioChapters,
    audioChaptersLength: book.audioChapters?.length || 0,
    isPlaying,
    isLoading,
    error
  });

  if (!audioUrl) {
    return (
      <div className="audiobook-player bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <p className="text-yellow-800 dark:text-yellow-200">
          No audio URL available. Debug info:
        </p>
        <pre className="text-xs mt-2 text-yellow-700 dark:text-yellow-300">
          {JSON.stringify({
            hasAudioUrl: !!book.audioUrl,
            audioUrl: book.audioUrl,
            hasChapters: !!book.audioChapters,
            chaptersCount: book.audioChapters?.length || 0,
            currentChapterIndex,
            currentChapterAudioUrl: book.audioChapters?.[currentChapterIndex]?.audioUrl
          }, null, 2)}
        </pre>
      </div>
    );
  }

  return (
    <div
      className={`audiobook-player ${language === 'ur' ? 'rtl' : 'ltr'} ${className}
        bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Book info header */}
      <div className="flex items-center mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
            {book.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t('audiobook.by')} {book.author}
            {book.narrator && ` • ${t('audiobook.narratedBy')} ${book.narrator}`}
          </p>
          {currentChapter && (
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
              {currentChapter.title}
            </p>
          )}
          {/* Loading indicator */}
          {isLoading && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Loading audio...
            </p>
          )}
          {/* Error display */}
          {error && (
            <p className="text-xs text-red-600 dark:text-red-400 mt-1">
              {error}
            </p>
          )}
        </div>

        {/* Audio quality indicator */}
        {book.audioQuality && (
          <div className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
            {book.audioQuality.toUpperCase()}
          </div>
        )}
      </div>

      {/* Main controls */}
      <div className="flex items-center space-x-4 mb-4">
        {/* Previous chapter */}
        {book.audioChapters && (
          <button
            onClick={previousChapter}
            disabled={currentChapterIndex === 0}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={t('audiobook.previousChapter')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
            </svg>
          </button>
        )}

        {/* Play/Pause Button */}
        <button
          onClick={handlePlayPause}
          disabled={isLoading || !audioUrl}
          className={`play-pause-btn text-2xl p-3 rounded-full transition-colors ${
            isLoading || !audioUrl
              ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
              : 'bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-700 dark:hover:bg-blue-800'
          }`}
          aria-label={isThisAudioPlaying ? t('player.pause') : t('player.play')}
        >
          {isLoading ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="animate-spin">
              <path d="M12 2v4m0 12v4m10-10h-4M6 12H2m15.364-7.364l-2.828 2.828M9.464 9.464L6.636 6.636m12.728 12.728l-2.828-2.828M9.464 14.536l-2.828 2.828"/>
            </svg>
          ) : isThisAudioPlaying ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>

        {/* Next chapter */}
        {book.audioChapters && (
          <button
            onClick={nextChapter}
            disabled={currentChapterIndex === book.audioChapters.length - 1}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={t('audiobook.nextChapter')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
            </svg>
          </button>
        )}
      </div>

      {/* Progress Bar and Time */}
      <div className="progress-container mb-4">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
          aria-label={t('player.seekSlider')}
        />
      </div>

      {/* Secondary controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Volume Control */}
          <div className="volume-control relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowVolumeSlider(!showVolumeSlider);
              }}
              className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              aria-label={t('player.volume')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
              </svg>
            </button>

            {showVolumeSlider && (
              <div className="volume-slider absolute bottom-full left-0 mb-2 p-2 bg-white dark:bg-gray-800 rounded shadow-lg">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  aria-label={t('player.volumeSlider')}
                />
              </div>
            )}
          </div>

          {/* Playback Speed */}
          <div className="playback-speed relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowSpeedOptions(!showSpeedOptions);
              }}
              className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 text-sm"
              aria-label={t('player.speed')}
            >
              {playbackRate}x
            </button>

            {showSpeedOptions && (
              <div className="speed-options absolute bottom-full right-0 mb-2 p-2 bg-white dark:bg-gray-800 rounded shadow-lg">
                {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => handlePlaybackRateChange(rate)}
                    className={`block w-full text-left px-2 py-1 rounded text-sm ${
                      playbackRate === rate
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Chapter list toggle */}
        {showChapterList && book.audioChapters && book.audioChapters.length > 1 && (
          <button
            onClick={() => setShowChapters(!showChapters)}
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
          >
            {t('audiobook.chapters')} ({book.audioChapters.length})
          </button>
        )}

        {/* Debug test button */}
        <button
          onClick={() => {
            const testUrl = '/audio/books/crime-and-punishment-dostoevsky/en/part-1-chapter-1.mp3';
            console.log('Testing direct audio playback:', testUrl);
            const audio = new Audio(testUrl);
            audio.play()
              .then(() => console.log('Direct audio test: SUCCESS'))
              .catch(error => console.error('Direct audio test: FAILED', error));
          }}
          className="text-xs bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded"
        >
          Test Audio
        </button>
      </div>

      {/* Chapter list */}
      {showChapters && book.audioChapters && (
        <div className="mt-4 max-h-48 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded">
          {book.audioChapters.map((chapter, index) => (
            <button
              key={chapter.id}
              onClick={() => handleChapterSelect(index)}
              className={`w-full p-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${
                index === currentChapterIndex
                  ? 'bg-blue-50 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{chapter.title}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {formatTime(chapter.duration)}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
