'use client';

import { useState, useEffect, useCallback } from 'react';

// Define the types for our user preferences
export interface UserPreferences {
  bookmarks: {
    books: string[];
    poems: string[];
    authors: string[];
  };
  readingHistory: {
    books: Array<{ id: string; timestamp: number }>;
    poems: Array<{ id: string; timestamp: number }>;
  };
  readingProgress: Record<string, number>; // itemId -> progress (0-100)
}

// Default preferences
const defaultPreferences: UserPreferences = {
  bookmarks: {
    books: [],
    poems: [],
    authors: []
  },
  readingHistory: {
    books: [],
    poems: []
  },
  readingProgress: {}
};

export function useUserPreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load preferences from localStorage on component mount
  useEffect(() => {
    try {
      const storedPreferences = localStorage.getItem('userPreferences');
      if (storedPreferences) {
        setPreferences(JSON.parse(storedPreferences));
      }
    } catch (error) {
      console.error('Error loading user preferences:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('userPreferences', JSON.stringify(preferences));
      } catch (error) {
        console.error('Error saving user preferences:', error);
      }
    }
  }, [preferences, isLoaded]);

  // Toggle bookmark for an item
  const toggleBookmark = useCallback((type: 'books' | 'poems' | 'authors', id: string) => {
    setPreferences(prev => {
      const bookmarks = [...prev.bookmarks[type]];
      const index = bookmarks.indexOf(id);
      
      if (index === -1) {
        // Add bookmark
        return {
          ...prev,
          bookmarks: {
            ...prev.bookmarks,
            [type]: [...bookmarks, id]
          }
        };
      } else {
        // Remove bookmark
        bookmarks.splice(index, 1);
        return {
          ...prev,
          bookmarks: {
            ...prev.bookmarks,
            [type]: bookmarks
          }
        };
      }
    });
  }, []);

  // Check if an item is bookmarked
  const isBookmarked = useCallback((type: 'books' | 'poems' | 'authors', id: string) => {
    return preferences.bookmarks[type].includes(id);
  }, [preferences.bookmarks]);

  // Add an item to reading history
  const addToReadingHistory = useCallback((type: 'books' | 'poems', id: string) => {
    setPreferences(prev => {
      // Remove the item if it already exists in history
      const filteredHistory = prev.readingHistory[type].filter(item => item.id !== id);
      
      // Add the item to the beginning of the history with current timestamp
      return {
        ...prev,
        readingHistory: {
          ...prev.readingHistory,
          [type]: [
            { id, timestamp: Date.now() },
            ...filteredHistory
          ].slice(0, 50) // Limit history to 50 items
        }
      };
    });
  }, []);

  // Get reading history
  const getReadingHistory = useCallback((type: 'books' | 'poems') => {
    return preferences.readingHistory[type];
  }, [preferences.readingHistory]);

  // Update reading progress for an item
  const updateReadingProgress = useCallback((itemId: string, progress: number) => {
    setPreferences(prev => ({
      ...prev,
      readingProgress: {
        ...prev.readingProgress,
        [itemId]: progress
      }
    }));
  }, []);

  // Get reading progress for an item
  const getReadingProgress = useCallback((itemId: string) => {
    return preferences.readingProgress[itemId] || 0;
  }, [preferences.readingProgress]);

  // Clear all user preferences
  const clearAllPreferences = useCallback(() => {
    setPreferences(defaultPreferences);
  }, []);

  return {
    preferences,
    isLoaded,
    toggleBookmark,
    isBookmarked,
    addToReadingHistory,
    getReadingHistory,
    updateReadingProgress,
    getReadingProgress,
    clearAllPreferences
  };
}
