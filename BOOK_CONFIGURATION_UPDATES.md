# Book Configuration Updates

## 📝 Instructions
Copy the relevant configuration blocks below into your book data files.


## crime-and-punishment-dostoevsky
```typescript
// Update for Crime and Punishment
// Add these properties to the book data file:

hasAudio: true,
isAudiobook: true,
audioUrl: '/audio/books/crime-and-punishment-dostoevsky/en/full.mp3', // Optional: if you have a complete file
audioDuration: 72000, // 20 hours
narrator: 'LibriVox Community', // Update with actual narrator name
audioQuality: 'high', // 'standard' | 'high' | 'premium'

// Chapter configuration (update with actual chapter titles)
audioChapters: [
  // Generate 41 chapters
  
  {
    id: 'chapter-01',
    title: 'Chapter 1', // Update with actual chapter title
    audioUrl: '/audio/books/crime-and-punishment-dostoevsky/en/chapter-01.mp3',
    duration: 1756, // Estimated duration - update with actual
    startTime: 0 // Update with actual start time
  },
  {
    id: 'chapter-02',
    title: 'Chapter 2', // Update with actual chapter title
    audioUrl: '/audio/books/crime-and-punishment-dostoevsky/en/chapter-02.mp3',
    duration: 1756, // Estimated duration - update with actual
    startTime: 1756 // Update with actual start time
  },
  {
    id: 'chapter-03',
    title: 'Chapter 3', // Update with actual chapter title
    audioUrl: '/audio/books/crime-and-punishment-dostoevsky/en/chapter-03.mp3',
    duration: 1756, // Estimated duration - update with actual
    startTime: 3512 // Update with actual start time
  },
  {
    id: 'chapter-04',
    title: 'Chapter 4', // Update with actual chapter title
    audioUrl: '/audio/books/crime-and-punishment-dostoevsky/en/chapter-04.mp3',
    duration: 1756, // Estimated duration - update with actual
    startTime: 5268 // Update with actual start time
  },
  {
    id: 'chapter-05',
    title: 'Chapter 5', // Update with actual chapter title
    audioUrl: '/audio/books/crime-and-punishment-dostoevsky/en/chapter-05.mp3',
    duration: 1756, // Estimated duration - update with actual
    startTime: 7024 // Update with actual start time
  },
  // ... continue for all 41 chapters
]
```

## pride-and-prejudice
```typescript
// Update for Pride and Prejudice
// Add these properties to the book data file:

hasAudio: true,
isAudiobook: true,
audioUrl: '/audio/books/pride-and-prejudice/en/full.mp3', // Optional: if you have a complete file
audioDuration: 43200, // 12 hours
narrator: 'LibriVox Community', // Update with actual narrator name
audioQuality: 'high', // 'standard' | 'high' | 'premium'

// Chapter configuration (update with actual chapter titles)
audioChapters: [
  // Generate 61 chapters
  
  {
    id: 'chapter-01',
    title: 'Chapter 1', // Update with actual chapter title
    audioUrl: '/audio/books/pride-and-prejudice/en/chapter-01.mp3',
    duration: 708, // Estimated duration - update with actual
    startTime: 0 // Update with actual start time
  },
  {
    id: 'chapter-02',
    title: 'Chapter 2', // Update with actual chapter title
    audioUrl: '/audio/books/pride-and-prejudice/en/chapter-02.mp3',
    duration: 708, // Estimated duration - update with actual
    startTime: 708 // Update with actual start time
  },
  {
    id: 'chapter-03',
    title: 'Chapter 3', // Update with actual chapter title
    audioUrl: '/audio/books/pride-and-prejudice/en/chapter-03.mp3',
    duration: 708, // Estimated duration - update with actual
    startTime: 1416 // Update with actual start time
  },
  {
    id: 'chapter-04',
    title: 'Chapter 4', // Update with actual chapter title
    audioUrl: '/audio/books/pride-and-prejudice/en/chapter-04.mp3',
    duration: 708, // Estimated duration - update with actual
    startTime: 2125 // Update with actual start time
  },
  {
    id: 'chapter-05',
    title: 'Chapter 5', // Update with actual chapter title
    audioUrl: '/audio/books/pride-and-prejudice/en/chapter-05.mp3',
    duration: 708, // Estimated duration - update with actual
    startTime: 2833 // Update with actual start time
  },
  // ... continue for all 61 chapters
]
```

## alice-adventures-wonderland
```typescript
// Update for Alice's Adventures in Wonderland
// Add these properties to the book data file:

hasAudio: true,
isAudiobook: true,
audioUrl: '/audio/books/alice-adventures-wonderland/en/full.mp3', // Optional: if you have a complete file
audioDuration: 10800, // 3 hours
narrator: 'LibriVox Community', // Update with actual narrator name
audioQuality: 'high', // 'standard' | 'high' | 'premium'

// Chapter configuration (update with actual chapter titles)
audioChapters: [
  // Generate 12 chapters
  
  {
    id: 'chapter-01',
    title: 'Chapter 1', // Update with actual chapter title
    audioUrl: '/audio/books/alice-adventures-wonderland/en/chapter-01.mp3',
    duration: 900, // Estimated duration - update with actual
    startTime: 0 // Update with actual start time
  },
  {
    id: 'chapter-02',
    title: 'Chapter 2', // Update with actual chapter title
    audioUrl: '/audio/books/alice-adventures-wonderland/en/chapter-02.mp3',
    duration: 900, // Estimated duration - update with actual
    startTime: 900 // Update with actual start time
  },
  {
    id: 'chapter-03',
    title: 'Chapter 3', // Update with actual chapter title
    audioUrl: '/audio/books/alice-adventures-wonderland/en/chapter-03.mp3',
    duration: 900, // Estimated duration - update with actual
    startTime: 1800 // Update with actual start time
  },
  {
    id: 'chapter-04',
    title: 'Chapter 4', // Update with actual chapter title
    audioUrl: '/audio/books/alice-adventures-wonderland/en/chapter-04.mp3',
    duration: 900, // Estimated duration - update with actual
    startTime: 2700 // Update with actual start time
  },
  {
    id: 'chapter-05',
    title: 'Chapter 5', // Update with actual chapter title
    audioUrl: '/audio/books/alice-adventures-wonderland/en/chapter-05.mp3',
    duration: 900, // Estimated duration - update with actual
    startTime: 3600 // Update with actual start time
  },
  // ... continue for all 12 chapters
]
```


## 📍 File Locations
Update the following files:
- Crime and Punishment: `src/data/novels/authors/fyodor-dostoevsky/crime-and-punishment.ts`
- Pride and Prejudice: `src/data/novels/authors/jane-austen/pride-and-prejudice.ts`
- Alice's Adventures: `src/data/novels/authors/lewis-carroll/alice-adventures-wonderland.ts`
