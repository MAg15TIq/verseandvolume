'use client';

import React, { createContext, useState, useRef, useEffect, useCallback } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  currentAudioUrl: string | null;
  currentTime: number;
  duration: number;
  volume: number;
  playbackRate: number;
  isLoading: boolean;
  error: string | null;
  play: (audioUrl: string) => void;
  pause: () => void;
  toggle: (audioUrl: string) => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  setPlaybackRate: (rate: number) => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

export const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.7);
  const [playbackRate, setPlaybackRateState] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Update current time as audio plays
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleDurationChange = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      setIsLoading(false);
    };

    const handleLoadStart = () => {
      setIsLoading(true);
      setError(null);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
      setError(null);
    };

    const handleError = (e: Event) => {
      setIsLoading(false);
      setIsPlaying(false);
      const target = e.target as HTMLAudioElement;
      const errorMessage = target.error ?
        `Audio error: ${target.error.message}` :
        'Failed to load audio file';
      setError(errorMessage);
      console.error('Audio playback error:', errorMessage);
    };

    const handleWaiting = () => {
      setIsLoading(true);
    };

    const handlePlaying = () => {
      setIsLoading(false);
      setError(null);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('playing', handlePlaying);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('playing', handlePlaying);
    };
  }, []);

  // Play audio
  const play = useCallback((audioUrl: string) => {
    const audio = audioRef.current;
    if (!audio) {
      console.error('Audio element not available');
      return;
    }

    console.log('Attempting to play audio:', audioUrl);
    setError(null);

    // If it's a new audio file
    if (audioUrl !== currentAudioUrl) {
      setCurrentAudioUrl(audioUrl);
      setIsLoading(true);

      // Clear any existing event handlers
      audio.oncanplaythrough = null;
      audio.onerror = null;

      audio.src = audioUrl;
      audio.load();

      // Set up one-time event handlers for this load
      const handleCanPlayThrough = () => {
        console.log('Audio can play through, starting playback');
        audio.play()
          .then(() => {
            setIsPlaying(true);
            setIsLoading(false);
            console.log('Audio playback started successfully');
          })
          .catch(error => {
            console.error('Error playing audio:', error);
            setError(`Playback failed: ${error.message}`);
            setIsLoading(false);
          });

        // Clean up event handlers
        audio.removeEventListener('canplaythrough', handleCanPlayThrough);
        audio.removeEventListener('error', handleLoadError);
      };

      const handleLoadError = (e: Event) => {
        const target = e.target as HTMLAudioElement;
        const errorMessage = target.error ?
          `Failed to load audio: ${target.error.message}` :
          'Failed to load audio file';
        console.error('Audio load error:', errorMessage);
        setError(errorMessage);
        setIsLoading(false);

        // Clean up event handlers
        audio.removeEventListener('canplaythrough', handleCanPlayThrough);
        audio.removeEventListener('error', handleLoadError);
      };

      audio.addEventListener('canplaythrough', handleCanPlayThrough);
      audio.addEventListener('error', handleLoadError);
    } else {
      // Resume current audio
      console.log('Resuming current audio');
      audio.play()
        .then(() => {
          setIsPlaying(true);
          console.log('Audio resumed successfully');
        })
        .catch(error => {
          console.error('Error resuming audio:', error);
          setError(`Resume failed: ${error.message}`);
        });
    }
  }, [currentAudioUrl]);

  // Pause audio
  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    setIsPlaying(false);
  }, []);

  // Toggle play/pause
  const toggle = useCallback((audioUrl: string) => {
    if (isPlaying && audioUrl === currentAudioUrl) {
      pause();
    } else {
      play(audioUrl);
    }
  }, [isPlaying, currentAudioUrl, play, pause]);

  // Seek to a specific time
  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = time;
    setCurrentTime(time);
  }, []);

  // Set volume
  const setVolume = useCallback((newVolume: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    audio.volume = clampedVolume;
    setVolumeState(clampedVolume);
  }, []);

  // Set playback rate
  const setPlaybackRate = useCallback((rate: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.playbackRate = rate;
    setPlaybackRateState(rate);
  }, []);

  // Update volume and playback rate when they change
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
    audio.playbackRate = playbackRate;
  }, [volume, playbackRate]);

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        currentAudioUrl,
        currentTime,
        duration,
        volume,
        playbackRate,
        isLoading,
        error,
        play,
        pause,
        toggle,
        seek,
        setVolume,
        setPlaybackRate,
        audioRef,
      }}
    >
      {children}
      <audio ref={audioRef} />
    </AudioContext.Provider>
  );
};
