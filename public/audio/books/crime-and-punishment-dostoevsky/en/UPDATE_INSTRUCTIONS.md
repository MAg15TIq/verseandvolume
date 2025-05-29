# Update Instructions for Crime and Punishment

## Files Downloaded
Audio files have been downloaded to: `D:\verse-and-volume\public\audio\books\crime-and-punishment-dostoevsky\en`

## Next Steps

### 1. Verify Audio Files
- Check that all files play correctly
- Verify audio quality (should be clear and audible)
- Ensure consistent volume levels across files

### 2. Update Book Data File
The book data file is located at:
`src/data/novels/authors/fyodor-dostoevsky/crime-and-punishment.ts`

Update the following properties with actual values:

```typescript
// Update these properties after testing the audio files
audioDuration: 72000, // Replace with actual total duration in seconds
audioChapters: [
  // Update each chapter with actual duration
  {
    id: 'part-1-chapter-1',
    title: 'Part I - Chapter I',
    audioUrl: '/audio/books/crime-and-punishment-dostoevsky/en/part-1-chapter-1.mp3',
    duration: 2400, // Replace with actual duration in seconds
    startTime: 0
  },
  // ... continue for all chapters
]
```

### 3. Test Implementation
1. Start the development server: `npm run dev`
2. Navigate to the book page: `/novels/crime-and-punishment-dostoevsky`
3. Verify the AudiobookPlayer component appears
4. Test all playback controls:
   - Play/pause
   - Chapter navigation
   - Volume control
   - Playback speed
   - Progress seeking

### 4. Quality Assurance
- Test on different browsers (Chrome, Firefox, Safari, Edge)
- Test on mobile devices
- Verify responsive design
- Check loading times and performance

## Audio File Information
- **Source**: librivox
- **Narrator**: Mark Nelson
- **License**: Public Domain
- **Quality**: 64kbps MP3 (LibriVox standard)

## Troubleshooting
If any files failed to download:
1. Check your internet connection
2. Verify the source URLs are still valid
3. Try downloading individual files manually
4. Contact LibriVox if files are missing

## Legal Notes
These audiobooks are in the public domain and free to use.
Always verify licensing before using any audiobook content.
