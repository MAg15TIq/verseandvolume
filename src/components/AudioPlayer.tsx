'use client';

import { useState, useEffect } from 'react';
import { useAudio } from '@/hooks/useAudio';
import { useTranslations } from 'next-intl';

interface AudioPlayerProps {
  audioUrl: string | null;
  language?: 'en' | 'ur';
  className?: string;
  showPlaybackSpeed?: boolean;
  showVolumeControl?: boolean;
  compact?: boolean;
}

export default function AudioPlayer({
  audioUrl,
  language = 'en',
  className = '',
  showPlaybackSpeed = true,
  showVolumeControl = true,
  compact = false
}: AudioPlayerProps) {
  const t = useTranslations();
  const {
    isPlaying,
    currentAudioUrl,
    currentTime,
    duration,
    volume,
    playbackRate,
    toggle,
    seek,
    setVolume,
    setPlaybackRate
  } = useAudio();

  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showSpeedOptions, setShowSpeedOptions] = useState(false);

  // Format time in MM:SS format
  const formatTime = (time: number) => {
    if (isNaN(time)) return '00:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Check if this audio is currently playing
  const isThisAudioPlaying = isPlaying && currentAudioUrl === audioUrl;

  // Handle play/pause
  const handlePlayPause = () => {
    if (audioUrl) {
      toggle(audioUrl);
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

  // Toggle volume slider visibility
  const toggleVolumeSlider = () => {
    setShowVolumeSlider(!showVolumeSlider);
    if (showSpeedOptions) setShowSpeedOptions(false);
  };

  // Toggle speed options visibility
  const toggleSpeedOptions = () => {
    setShowSpeedOptions(!showSpeedOptions);
    if (showVolumeSlider) setShowVolumeSlider(false);
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

  // If no audio URL is provided, don't render the player
  if (!audioUrl) {
    return null;
  }

  return (
    <div 
      className={`audio-player ${language === 'ur' ? 'rtl' : 'ltr'} ${className} 
        bg-white dark:bg-gray-900 rounded-lg shadow-sm p-3 ${compact ? 'flex items-center' : ''}`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Play/Pause Button */}
      <button
        onClick={handlePlayPause}
        className="play-pause-btn text-xl p-2 rounded-full bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
        aria-label={isThisAudioPlaying ? t('player.pause') : t('player.play')}
      >
        {isThisAudioPlaying ? (
          <span>⏸️</span>
        ) : (
          <span>▶️</span>
        )}
      </button>

      {/* Progress Bar and Time */}
      <div className={`progress-container ${compact ? 'flex-1 mx-3' : 'my-3'}`}>
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
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

      {/* Controls */}
      <div className={`controls ${compact ? 'flex items-center' : 'flex justify-end mt-2'}`}>
        {/* Volume Control */}
        {showVolumeControl && (
          <div className="volume-control relative mr-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleVolumeSlider();
              }}
              className="volume-btn p-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              aria-label={t('player.volume')}
            >
              {volume === 0 ? (
                <span>🔇</span>
              ) : volume < 0.5 ? (
                <span>🔉</span>
              ) : (
                <span>🔊</span>
              )}
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
        )}

        {/* Playback Speed */}
        {showPlaybackSpeed && (
          <div className="playback-speed relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleSpeedOptions();
              }}
              className="speed-btn p-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              aria-label={t('player.speed')}
            >
              <span>{playbackRate}x</span>
            </button>

            {showSpeedOptions && (
              <div className="speed-options absolute bottom-full right-0 mb-2 p-2 bg-white dark:bg-gray-800 rounded shadow-lg">
                {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => handlePlaybackRateChange(rate)}
                    className={`block w-full text-left px-2 py-1 rounded ${
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
        )}
      </div>
    </div>
  );
}
