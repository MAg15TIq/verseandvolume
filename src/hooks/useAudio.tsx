'use client';

import { useContext } from 'react';
import { AudioContext } from '@/contexts/AudioContext';

export function useAudio() {
  const context = useContext(AudioContext);
  
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  
  return context;
}
