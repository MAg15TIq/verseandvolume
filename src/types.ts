// Common type definitions for the application

export interface Poem {
  id: string;
  title: string;
  author: string;
  authorId: string;
  year?: number;
  language: 'en' | 'ur' | 'both';
  type: 'poem' | 'ghazal' | 'nazm' | 'sonnet' | 'haiku' | 'free verse';
  content: string[] | {
    en: string[];
    ur: string[];
  };
  translation?: {
    en?: string[];
    ur?: string[];
  };
  explanation?: string;
  themes?: string[];
  audioUrl?: string | {
    en?: string;
    ur?: string;
  };
  hasAudio?: boolean;
}

export interface Chapter {
  id: string;
  title: string;
  content: string[] | {
    en: string[];
    ur: string[];
  };
  audioUrl?: string | {
    en?: string;
    ur?: string;
  };
  hasAudio?: boolean;
}

export interface Quote {
  id: string;
  text: string;
  author: string;
  authorId: string;
  source?: string;
  year?: number;
  language: 'en' | 'ur' | 'both';
  category?: string[];
  themes?: string[];
  translation?: {
    en?: string;
    ur?: string;
  };
}

export interface Book {
  id: string;
  title: string;
  author: string;
  authorId: string;
  coverImage: string;
  publishYear?: number;
  language: 'en' | 'ur' | 'both';
  genre: string[];
  description: string;
  excerpt: string[] | {
    en: string[];
    ur: string[];
  };
  // Full content for complete reading
  content?: string[] | {
    en: string[];
    ur: string[];
  };
  chapters?: Chapter[];
  pages?: number;
  isbn?: string;
  awards?: string[];
  rating?: number;
  reviews?: {
    author: string;
    text: string;
    rating: number;
  }[];
  // Enhanced audio support for audiobooks
  audioUrl?: string | {
    en?: string;
    ur?: string;
  };
  hasAudio?: boolean;
  // Audiobook-specific properties
  isAudiobook?: boolean;
  audioDuration?: number; // in seconds
  narrator?: string;
  audioQuality?: 'standard' | 'high' | 'premium';
  audioChapters?: AudioChapter[];
  // Indicates if full content is available
  hasFullContent?: boolean;
}

export interface AudioChapter {
  id: string;
  title: string;
  audioUrl: string;
  duration: number; // in seconds
  startTime?: number; // start time in the full audiobook
}

export interface Author {
  id: string;
  name: string;
  // Enhanced image support
  image: string;
  imageAlt?: string;
  imageSources?: {
    thumbnail?: string;
    medium?: string;
    large?: string;
  };
  birthYear?: number;
  deathYear?: number;
  birthPlace?: string;
  bio: string;
  language: 'en' | 'ur' | 'both';
  works?: {
    id: string;
    title: string;
    year?: number;
    type: 'poetry' | 'prose' | 'essay' | 'other';
  }[];
  quote?: string;
  achievements?: string[];
  influences?: string[];
  timeline?: {
    year: number;
    event: string;
  }[];
}

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
