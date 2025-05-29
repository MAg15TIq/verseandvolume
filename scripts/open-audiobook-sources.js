#!/usr/bin/env node

/**
 * Open Audiobook Sources Script
 * 
 * This script opens the Internet Archive and LibriVox pages for manual audiobook downloads
 */

const { exec } = require('child_process');
const path = require('path');

// Audiobook sources for manual download
const AUDIOBOOK_SOURCES = {
  'crime-and-punishment-dostoevsky': {
    title: 'Crime and Punishment',
    author: 'Fyodor Dostoevsky',
    librivoxUrl: 'https://librivox.org/crime-and-punishment-version-3-by-fyodor-dostoyevsky/',
    internetArchive: 'https://archive.org/details/crime_punishment_3_1708_librivox',
    chapters: 41,
    targetDir: 'public/audio/books/crime-and-punishment-dostoevsky/en/'
  },
  'pride-and-prejudice': {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    librivoxUrl: 'https://librivox.org/pride-and-prejudice-by-jane-austen/',
    internetArchive: 'https://archive.org/details/pride_prejudice_0711_librivox',
    chapters: 61,
    targetDir: 'public/audio/books/pride-and-prejudice/en/'
  },
  'alice-adventures-wonderland': {
    title: 'Alice\'s Adventures in Wonderland',
    author: 'Lewis Carroll',
    librivoxUrl: 'https://librivox.org/alices-adventures-in-wonderland-by-lewis-carroll/',
    internetArchive: 'https://archive.org/details/alices_adventures_wonderland_0711_librivox',
    chapters: 12,
    targetDir: 'public/audio/books/alice-adventures-wonderland/en/'
  }
};

/**
 * Open URLs in default browser
 */
function openUrl(url) {
  const platform = process.platform;
  let command;
  
  if (platform === 'win32') {
    command = `start "${url}"`;
  } else if (platform === 'darwin') {
    command = `open "${url}"`;
  } else {
    command = `xdg-open "${url}"`;
  }
  
  exec(command, (error) => {
    if (error) {
      console.error(`Error opening ${url}:`, error.message);
    }
  });
}

/**
 * Open all audiobook source pages
 */
function openAllSources() {
  console.log('🌐 Opening audiobook source pages for manual download...\n');
  
  Object.entries(AUDIOBOOK_SOURCES).forEach(([bookId, book], index) => {
    console.log(`📚 ${book.title} by ${book.author}`);
    console.log(`   Internet Archive: ${book.internetArchive}`);
    console.log(`   LibriVox: ${book.librivoxUrl}`);
    console.log(`   Target Directory: ${book.targetDir}`);
    console.log(`   Chapters: ${book.chapters}\n`);
    
    // Open Internet Archive page (primary source)
    setTimeout(() => {
      openUrl(book.internetArchive);
    }, index * 2000); // Stagger opening to avoid overwhelming the browser
  });
  
  console.log('📝 Download Instructions:');
  console.log('1. On each Internet Archive page, click "DOWNLOAD OPTIONS"');
  console.log('2. Select "MP3" or "MP3 64Kbps" for smaller files');
  console.log('3. Download all chapter files');
  console.log('4. Rename files to: chapter-01.mp3, chapter-02.mp3, etc.');
  console.log('5. Place files in the target directories shown above');
  console.log('\n✅ After downloading, run: node scripts/enhanced-audiobook-test.js');
}

/**
 * Open specific book source
 */
function openBookSource(bookId) {
  const book = AUDIOBOOK_SOURCES[bookId];
  if (!book) {
    console.error(`❌ Book not found: ${bookId}`);
    console.log('Available books:');
    Object.keys(AUDIOBOOK_SOURCES).forEach(id => {
      console.log(`  - ${id}`);
    });
    return;
  }
  
  console.log(`🌐 Opening sources for: ${book.title} by ${book.author}\n`);
  console.log(`📁 Target Directory: ${book.targetDir}`);
  console.log(`📊 Chapters: ${book.chapters}\n`);
  
  console.log('Opening Internet Archive page...');
  openUrl(book.internetArchive);
  
  setTimeout(() => {
    console.log('Opening LibriVox page...');
    openUrl(book.librivoxUrl);
  }, 1000);
}

/**
 * Display help information
 */
function showHelp() {
  console.log('📚 Audiobook Sources Opener\n');
  console.log('Usage:');
  console.log('  node scripts/open-audiobook-sources.js                    # Open all sources');
  console.log('  node scripts/open-audiobook-sources.js --book <book-id>   # Open specific book');
  console.log('  node scripts/open-audiobook-sources.js --help             # Show this help\n');
  
  console.log('Available books:');
  Object.entries(AUDIOBOOK_SOURCES).forEach(([id, book]) => {
    console.log(`  ${id.padEnd(35)} - ${book.title} by ${book.author}`);
  });
  
  console.log('\n📝 After opening pages:');
  console.log('1. Download MP3 files from Internet Archive');
  console.log('2. Rename to chapter-01.mp3, chapter-02.mp3, etc.');
  console.log('3. Place in target directories');
  console.log('4. Run: node scripts/enhanced-audiobook-test.js');
}

// Command line interface
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
  } else if (args.includes('--book') || args.includes('-b')) {
    const bookIndex = args.findIndex(arg => arg === '--book' || arg === '-b');
    const bookId = args[bookIndex + 1];
    if (bookId) {
      openBookSource(bookId);
    } else {
      console.error('❌ Please specify a book ID');
      showHelp();
    }
  } else if (args.length === 0) {
    openAllSources();
  } else {
    console.error('❌ Invalid arguments');
    showHelp();
  }
}

module.exports = { openAllSources, openBookSource, AUDIOBOOK_SOURCES };
