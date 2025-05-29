/**
 * AUDIOBOOK IMPLEMENTATION TEMPLATE
 * 
 * This template shows how to add authentic audiobook support to any book or novel.
 * Copy the relevant sections to your book data files when you have real audiobook files.
 */

import { Book, AudioChapter } from '@/types';

// BASIC AUDIOBOOK SETUP (Single audio file)
export const basicAudiobookExample: Book = {
  id: 'your-book-id',
  title: 'Your Book Title',
  author: 'Author Name',
  authorId: 'author-id',
  coverImage: '/images/covers/your-book-id.jpg',
  language: 'en', // or 'ur' or 'both'
  genre: ['Fiction'], // Your book's genres
  description: 'Your book description',
  excerpt: ['Your book excerpt...'],
  
  // BASIC AUDIOBOOK PROPERTIES
  hasAudio: true,
  isAudiobook: true,
  audioUrl: '/audio/books/your-book-id/en/full.mp3', // Path to your audio file
  audioDuration: 0, // Duration in seconds (e.g., 43200 for 12 hours)
  narrator: 'Professional Narrator Name',
  audioQuality: 'premium', // 'standard' | 'high' | 'premium'
  
  hasFullContent: true
};

// MULTILINGUAL AUDIOBOOK SETUP (English and Urdu)
export const multilingualAudiobookExample: Book = {
  id: 'multilingual-book-id',
  title: 'Multilingual Book Title',
  author: 'Author Name',
  authorId: 'author-id',
  coverImage: '/images/covers/multilingual-book-id.jpg',
  language: 'both', // Supports both languages
  genre: ['Fiction'],
  description: 'Book description',
  excerpt: {
    en: ['English excerpt...'],
    ur: ['اردو اقتباس...']
  },
  
  // MULTILINGUAL AUDIOBOOK PROPERTIES
  hasAudio: true,
  isAudiobook: true,
  audioUrl: {
    en: '/audio/books/multilingual-book-id/en/full.mp3',
    ur: '/audio/books/multilingual-book-id/ur/full.mp3'
  },
  audioDuration: 0, // Duration in seconds
  narrator: 'English: John Smith, Urdu: احمد علی',
  audioQuality: 'high',
  
  hasFullContent: true
};

// CHAPTER-BASED AUDIOBOOK SETUP (Individual chapter files)
export const chapterBasedAudiobookExample: Book = {
  id: 'chapter-book-id',
  title: 'Chapter-Based Book Title',
  author: 'Author Name',
  authorId: 'author-id',
  coverImage: '/images/covers/chapter-book-id.jpg',
  language: 'en',
  genre: ['Fiction'],
  description: 'Book description',
  excerpt: ['Book excerpt...'],
  
  // CHAPTER-BASED AUDIOBOOK PROPERTIES
  hasAudio: true,
  isAudiobook: true,
  audioUrl: '/audio/books/chapter-book-id/en/full.mp3', // Optional: full audiobook file
  audioDuration: 0, // Total duration in seconds
  narrator: 'Professional Narrator Name',
  audioQuality: 'premium',
  
  // INDIVIDUAL CHAPTER AUDIO FILES
  audioChapters: [
    {
      id: 'chapter-1',
      title: 'Chapter 1: Opening Chapter Title',
      audioUrl: '/audio/books/chapter-book-id/en/chapter-01.mp3',
      duration: 1080, // Chapter duration in seconds (18 minutes)
      startTime: 0 // Start time in full audiobook (if using single file)
    },
    {
      id: 'chapter-2',
      title: 'Chapter 2: Second Chapter Title',
      audioUrl: '/audio/books/chapter-book-id/en/chapter-02.mp3',
      duration: 900, // 15 minutes
      startTime: 1080 // Starts at 18 minutes in full file
    },
    {
      id: 'chapter-3',
      title: 'Chapter 3: Third Chapter Title',
      audioUrl: '/audio/books/chapter-book-id/en/chapter-03.mp3',
      duration: 1200, // 20 minutes
      startTime: 1980 // Starts at 33 minutes in full file
    }
    // Add more chapters as needed...
  ],
  
  hasFullContent: true
};

// POETRY COLLECTION WITH AUDIO
export const poetryAudioExample: Book = {
  id: 'poetry-collection-id',
  title: 'Poetry Collection Title',
  author: 'Poet Name',
  authorId: 'poet-id',
  coverImage: '/images/covers/poetry-collection-id.jpg',
  language: 'both',
  genre: ['Poetry'],
  description: 'Poetry collection description',
  excerpt: {
    en: ['English poem excerpt...'],
    ur: ['اردو شاعری کا اقتباس...']
  },
  
  // POETRY AUDIO PROPERTIES
  hasAudio: true,
  isAudiobook: false, // Not a traditional audiobook
  audioUrl: {
    en: '/audio/poems/poet-id/en/collection-full.mp3',
    ur: '/audio/poems/poet-id/ur/collection-full.mp3'
  },
  audioDuration: 0, // Duration in seconds
  narrator: 'Poet Name (self-narrated)', // Or professional narrator
  audioQuality: 'high',
  
  hasFullContent: true
};

/**
 * IMPLEMENTATION STEPS:
 * 
 * 1. PREPARE YOUR AUDIO FILES
 *    - Obtain authentic audiobook recordings
 *    - Ensure proper audio quality (128+ kbps MP3 recommended)
 *    - Organize files in the directory structure shown below
 * 
 * 2. FILE ORGANIZATION
 *    public/audio/books/your-book-id/
 *    ├── en/
 *    │   ├── full.mp3          # Complete audiobook
 *    │   ├── chapter-01.mp3    # Individual chapters (optional)
 *    │   ├── chapter-02.mp3
 *    │   └── ...
 *    └── ur/                   # Urdu version (if available)
 *        ├── full.mp3
 *        └── chapter-01.mp3
 * 
 * 3. UPDATE YOUR BOOK DATA
 *    - Copy the appropriate template above
 *    - Replace placeholder values with your actual data
 *    - Set correct file paths, durations, and narrator information
 *    - Test the implementation on your book's page
 * 
 * 4. AUDIO QUALITY GUIDELINES
 *    - standard: 128 kbps MP3 (good for most content)
 *    - high: 256 kbps MP3 (better for music/poetry)
 *    - premium: 320 kbps MP3 (highest quality)
 * 
 * 5. DURATION CALCULATION
 *    - Use seconds for all duration values
 *    - Example: 1 hour = 3600 seconds, 12 hours = 43200 seconds
 *    - You can use online tools to get exact audio file durations
 * 
 * 6. TESTING
 *    - Visit your book's page (/novels/your-book-id)
 *    - Verify the AudiobookPlayer appears
 *    - Test play/pause, volume, speed controls
 *    - Test chapter navigation (if using chapters)
 *    - Check on mobile devices
 */

/**
 * LEGAL CONSIDERATIONS:
 * 
 * - Ensure you have proper rights to distribute the audiobook content
 * - Public domain works (pre-1928) are generally safe to use
 * - For copyrighted works, obtain proper licensing
 * - Credit narrators and original sources appropriately
 * - Consider using LibriVox or Internet Archive for public domain audiobooks
 */

/**
 * PERFORMANCE TIPS:
 * 
 * - Use MP3 format for best browser compatibility
 * - Keep file sizes reasonable (consider chapter-based files for long books)
 * - Use a CDN for better global performance
 * - Implement proper caching headers for audio files
 * - Test loading times on slower connections
 */

export default {
  basicAudiobookExample,
  multilingualAudiobookExample,
  chapterBasedAudiobookExample,
  poetryAudioExample
};
