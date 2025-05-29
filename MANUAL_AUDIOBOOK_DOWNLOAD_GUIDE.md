# Manual Audiobook Download Guide

## 🎯 Overview
Due to server restrictions on automated downloads, audiobooks need to be downloaded manually from LibriVox and Internet Archive.

## 📥 Download Instructions

### Method 1: Internet Archive (Recommended)
1. Visit the Internet Archive page for each book
2. Click "DOWNLOAD OPTIONS" on the right side
3. Select "MP3" or "MP3 64Kbps" for smaller files
4. Download individual chapter files or the complete ZIP

### Method 2: LibriVox Direct
1. Visit the LibriVox page for each book
2. Right-click on chapter links and "Save As"
3. Download each chapter individually

## 📚 Priority Books to Download


### Crime and Punishment by Fyodor Dostoevsky
- **Book ID**: crime-and-punishment-dostoevsky
- **LibriVox**: https://librivox.org/crime-and-punishment-version-3-by-fyodor-dostoyevsky/
- **Internet Archive**: https://archive.org/details/crime_punishment_3_1708_librivox
- **Chapters**: 41
- **Estimated Duration**: 20 hours
- **Target Directory**: `public/audio/books/crime-and-punishment-dostoevsky/en/`

**Download Steps**:
1. Visit: https://archive.org/details/crime_punishment_3_1708_librivox
2. Click "DOWNLOAD OPTIONS" → "MP3"
3. Download all chapter files
4. Rename files to: chapter-01.mp3, chapter-02.mp3, etc.
5. Place in: `public/audio/books/crime-and-punishment-dostoevsky/en/`

### Pride and Prejudice by Jane Austen
- **Book ID**: pride-and-prejudice
- **LibriVox**: https://librivox.org/pride-and-prejudice-by-jane-austen/
- **Internet Archive**: https://archive.org/details/pride_prejudice_0711_librivox
- **Chapters**: 61
- **Estimated Duration**: 12 hours
- **Target Directory**: `public/audio/books/pride-and-prejudice/en/`

**Download Steps**:
1. Visit: https://archive.org/details/pride_prejudice_0711_librivox
2. Click "DOWNLOAD OPTIONS" → "MP3"
3. Download all chapter files
4. Rename files to: chapter-01.mp3, chapter-02.mp3, etc.
5. Place in: `public/audio/books/pride-and-prejudice/en/`

### Alice's Adventures in Wonderland by Lewis Carroll
- **Book ID**: alice-adventures-wonderland
- **LibriVox**: https://librivox.org/alices-adventures-in-wonderland-by-lewis-carroll/
- **Internet Archive**: https://archive.org/details/alices_adventures_wonderland_0711_librivox
- **Chapters**: 12
- **Estimated Duration**: 3 hours
- **Target Directory**: `public/audio/books/alice-adventures-wonderland/en/`

**Download Steps**:
1. Visit: https://archive.org/details/alices_adventures_wonderland_0711_librivox
2. Click "DOWNLOAD OPTIONS" → "MP3"
3. Download all chapter files
4. Rename files to: chapter-01.mp3, chapter-02.mp3, etc.
5. Place in: `public/audio/books/alice-adventures-wonderland/en/`


## 📁 File Organization
After downloading, organize files as follows:
```
public/audio/books/
├── crime-and-punishment-dostoevsky/
│   └── en/
│       ├── chapter-01.mp3
│       ├── chapter-02.mp3
│       └── ... (41 chapters)
├── pride-and-prejudice/
│   └── en/
│       ├── chapter-01.mp3
│       ├── chapter-02.mp3
│       └── ... (61 chapters)
└── alice-adventures-wonderland/
    └── en/
        ├── chapter-01.mp3
        ├── chapter-02.mp3
        └── ... (12 chapters)
```

## ✅ Verification
After downloading, run: `node scripts/test-audiobook-functionality.js`
