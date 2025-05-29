# 📚 Adding New Audiobooks to Verse and Volume

This guide provides step-by-step instructions for adding new authentic audiobooks to the website.

## 🎯 Prerequisites

- Access to authentic professionally recorded audiobook files
- Basic knowledge of TypeScript/JavaScript
- Understanding of the project file structure

## 📋 Step-by-Step Process

### Step 1: Prepare Audio Files

#### 1.1 Source Requirements
- **Format**: MP3 (required for browser compatibility)
- **Quality**: Minimum 64kbps, recommended 128-256kbps
- **License**: Ensure you have rights to use the audiobook
- **Narrator**: Professional recording preferred

#### 1.2 File Organization
- Split into chapters if the audiobook has natural chapter breaks
- Name files consistently: `chapter-01.mp3`, `chapter-02.mp3`, etc.
- For books with parts: `part-1-chapter-1.mp3`, `part-1-chapter-2.mp3`

#### 1.3 Quality Check
```bash
# Check file format and quality
ffprobe your-audio-file.mp3

# Convert if needed (example)
ffmpeg -i input.m4a -codec:a mp3 -b:a 128k output.mp3
```

### Step 2: Upload Audio Files

#### 2.1 Directory Structure
Create the following directory structure:
```
public/audio/books/
└── [book-id]/
    └── [language]/
        ├── chapter-01.mp3
        ├── chapter-02.mp3
        ├── chapter-03.mp3
        └── ...
```

#### 2.2 File Placement
```bash
# Example for "great-gatsby" audiobook
mkdir -p public/audio/books/great-gatsby/en/
cp chapter-*.mp3 public/audio/books/great-gatsby/en/
```

#### 2.3 Verify File Access
- Ensure files are accessible via HTTP
- Check file permissions (readable by web server)
- Test a sample file: `http://localhost:3000/audio/books/[book-id]/en/chapter-01.mp3`

### Step 3: Update Book Data Configuration

#### 3.1 Locate Book Data File
Find the book's TypeScript file:
```
src/data/novels/authors/[author-name]/[book-name].ts
```

#### 3.2 Add Audiobook Properties
Add the following properties to the book object:

```typescript
export const yourBookNovel: Book = {
  // ... existing properties

  // Enable audiobook features
  hasAudio: true,
  isAudiobook: true,
  
  // Main audiobook file (optional if using chapters)
  audioUrl: '/audio/books/your-book-id/en/full.mp3',
  
  // Audiobook metadata
  audioDuration: 43200, // Total duration in seconds (12 hours = 43200)
  narrator: 'Professional Narrator Name',
  audioQuality: 'high', // 'standard' | 'high' | 'premium'
  
  // Chapter-based audio files
  audioChapters: [
    {
      id: 'chapter-01',
      title: 'Chapter 1: Opening',
      audioUrl: '/audio/books/your-book-id/en/chapter-01.mp3',
      duration: 1800, // Chapter duration in seconds (30 minutes = 1800)
      startTime: 0 // Start time in full audiobook (optional)
    },
    {
      id: 'chapter-02', 
      title: 'Chapter 2: Development',
      audioUrl: '/audio/books/your-book-id/en/chapter-02.mp3',
      duration: 2100, // 35 minutes
      startTime: 1800 // Starts after chapter 1
    },
    // ... add all chapters
  ]
};
```

#### 3.3 Calculate Durations
Use this helper script to get audio file durations:

```javascript
// scripts/get-audio-duration.js
const fs = require('fs');
const path = require('path');

function getAudioDuration(filePath) {
  // This is a simplified example
  // In practice, use a library like 'node-ffprobe' or 'music-metadata'
  const stats = fs.statSync(filePath);
  // Estimate: 1MB ≈ 60 seconds for 128kbps MP3
  return Math.round((stats.size / 1024 / 1024) * 60);
}

// Usage
const duration = getAudioDuration('public/audio/books/your-book/en/chapter-01.mp3');
console.log(`Duration: ${duration} seconds`);
```

### Step 4: Test the Integration

#### 4.1 Run Automated Tests
```bash
# Test all audiobook functionality
node scripts/test-audiobook-functionality.js

# Test specific book
node scripts/test-audiobook-functionality.js --book your-book-id
```

#### 4.2 Manual Testing
1. Start the development server: `npm run dev`
2. Navigate to the book page: `http://localhost:3000/novels/your-book-id`
3. Verify the audiobook player appears
4. Test play/pause functionality
5. Test chapter navigation (if applicable)
6. Test volume and speed controls

#### 4.3 Cross-Device Testing
- **Desktop**: Chrome, Firefox, Safari, Edge
- **Mobile**: iOS Safari, Chrome Mobile, Samsung Internet
- **Tablet**: iPad Safari, Android Chrome

### Step 5: Quality Assurance

#### 5.1 Audio Quality Checklist
- [ ] Audio plays without errors
- [ ] Volume levels are consistent across chapters
- [ ] No audio artifacts or distortion
- [ ] Chapter transitions are smooth
- [ ] Loading times are acceptable

#### 5.2 User Experience Checklist
- [ ] Player controls are responsive
- [ ] Chapter list is accurate and functional
- [ ] Progress bar works correctly
- [ ] Time display is accurate
- [ ] Mobile interface is touch-friendly

#### 5.3 Performance Checklist
- [ ] Files load progressively (don't block page)
- [ ] Memory usage is reasonable
- [ ] No console errors
- [ ] Responsive design works on all screen sizes

## 🔧 Advanced Configuration

### Multiple Language Support
```typescript
// For books with multiple language audiobooks
audioUrl: {
  en: '/audio/books/book-id/en/full.mp3',
  ur: '/audio/books/book-id/ur/full.mp3'
},

audioChapters: [
  {
    id: 'chapter-01',
    title: 'Chapter 1',
    audioUrl: '/audio/books/book-id/en/chapter-01.mp3', // English
    duration: 1800
  }
  // Add separate chapters for other languages if needed
]
```

### Custom Player Configuration
```typescript
// In the component that renders the audiobook player
<AudiobookPlayer
  book={book}
  language="en"
  showChapterList={true}
  className="custom-player-styles"
/>
```

## 🚨 Common Issues & Solutions

### Issue: Audio files not loading
**Solution**: 
- Check file paths are correct
- Verify file permissions
- Ensure web server can serve MP3 files

### Issue: Player not appearing
**Solution**:
- Verify `isAudiobook: true` in book data
- Check that `hasAudio: true` is set
- Ensure book data is properly exported

### Issue: Chapter navigation not working
**Solution**:
- Verify `audioChapters` array is properly configured
- Check that chapter IDs are unique
- Ensure chapter audio URLs are correct

### Issue: Poor audio quality
**Solution**:
- Re-encode audio at higher bitrate (128kbps minimum)
- Normalize audio levels
- Check source audio quality

## 📊 File Size Guidelines

| Duration | 64kbps | 128kbps | 256kbps |
|----------|--------|---------|---------|
| 30 min   | ~14MB  | ~28MB   | ~56MB   |
| 1 hour   | ~28MB  | ~56MB   | ~112MB  |
| 2 hours  | ~56MB  | ~112MB  | ~224MB  |

**Recommendation**: Use 128kbps for good quality/size balance.

## 🎉 Completion Checklist

- [ ] Audio files uploaded and accessible
- [ ] Book data updated with audiobook properties
- [ ] Automated tests pass
- [ ] Manual testing completed
- [ ] Cross-device testing completed
- [ ] Audio quality verified
- [ ] User experience tested
- [ ] Performance verified
- [ ] Documentation updated

## 📞 Support

If you encounter issues:
1. Check the test reports in `/audiobook-audit-reports/`
2. Run the diagnostic scripts in `/scripts/`
3. Review browser console for error messages
4. Refer to the main integration documentation

---

**🎧 Your audiobook is now ready for users to enjoy!**
