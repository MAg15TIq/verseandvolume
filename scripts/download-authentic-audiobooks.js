#!/usr/bin/env node

/**
 * Download Authentic Audiobooks Script
 * 
 * This script downloads authentic professionally recorded audiobooks from LibriVox
 * and other public domain sources for the books configured on the website.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { URL } = require('url');

// Configuration for authentic audiobook sources
const AUDIOBOOK_SOURCES = {
  'crime-and-punishment-dostoevsky': {
    title: 'Crime and Punishment',
    author: 'Fyodor Dostoevsky',
    source: 'LibriVox',
    baseUrl: 'https://archive.org/download/crime_punishment_1011_librivox',
    chapters: [
      { id: 'part-1-chapter-1', file: 'crimeandpunishment_01_dostoyevsky_64kb.mp3' },
      { id: 'part-1-chapter-2', file: 'crimeandpunishment_02_dostoyevsky_64kb.mp3' },
      { id: 'part-1-chapter-3', file: 'crimeandpunishment_03_dostoyevsky_64kb.mp3' },
      { id: 'part-1-chapter-4', file: 'crimeandpunishment_04_dostoyevsky_64kb.mp3' },
      { id: 'part-1-chapter-5', file: 'crimeandpunishment_05_dostoyevsky_64kb.mp3' },
      { id: 'part-1-chapter-6', file: 'crimeandpunishment_06_dostoyevsky_64kb.mp3' },
      { id: 'part-1-chapter-7', file: 'crimeandpunishment_07_dostoyevsky_64kb.mp3' },
      { id: 'part-2-chapter-1', file: 'crimeandpunishment_08_dostoyevsky_64kb.mp3' },
      { id: 'part-2-chapter-2', file: 'crimeandpunishment_09_dostoyevsky_64kb.mp3' },
      { id: 'part-2-chapter-3', file: 'crimeandpunishment_10_dostoyevsky_64kb.mp3' },
      { id: 'part-2-chapter-4', file: 'crimeandpunishment_11_dostoyevsky_64kb.mp3' },
      { id: 'part-2-chapter-5', file: 'crimeandpunishment_12_dostoyevsky_64kb.mp3' },
      { id: 'part-2-chapter-6', file: 'crimeandpunishment_13_dostoyevsky_64kb.mp3' },
      { id: 'part-2-chapter-7', file: 'crimeandpunishment_14_dostoyevsky_64kb.mp3' },
      { id: 'part-3-chapter-1', file: 'crimeandpunishment_15_dostoyevsky_64kb.mp3' },
      { id: 'part-3-chapter-2', file: 'crimeandpunishment_16_dostoyevsky_64kb.mp3' },
      { id: 'part-3-chapter-3', file: 'crimeandpunishment_17_dostoyevsky_64kb.mp3' },
      { id: 'part-3-chapter-4', file: 'crimeandpunishment_18_dostoyevsky_64kb.mp3' },
      { id: 'part-3-chapter-5', file: 'crimeandpunishment_19_dostoyevsky_64kb.mp3' },
      { id: 'part-3-chapter-6', file: 'crimeandpunishment_20_dostoyevsky_64kb.mp3' },
      { id: 'part-4-chapter-1', file: 'crimeandpunishment_21_dostoyevsky_64kb.mp3' },
      { id: 'part-4-chapter-2', file: 'crimeandpunishment_22_dostoyevsky_64kb.mp3' },
      { id: 'part-4-chapter-3', file: 'crimeandpunishment_23_dostoyevsky_64kb.mp3' },
      { id: 'part-4-chapter-4', file: 'crimeandpunishment_24_dostoyevsky_64kb.mp3' },
      { id: 'part-4-chapter-5', file: 'crimeandpunishment_25_dostoyevsky_64kb.mp3' },
      { id: 'part-4-chapter-6', file: 'crimeandpunishment_26_dostoyevsky_64kb.mp3' },
      { id: 'part-5-chapter-1', file: 'crimeandpunishment_27_dostoyevsky_64kb.mp3' },
      { id: 'part-5-chapter-2', file: 'crimeandpunishment_28_dostoyevsky_64kb.mp3' },
      { id: 'part-5-chapter-3', file: 'crimeandpunishment_29_dostoyevsky_64kb.mp3' },
      { id: 'part-5-chapter-4', file: 'crimeandpunishment_30_dostoyevsky_64kb.mp3' },
      { id: 'part-5-chapter-5', file: 'crimeandpunishment_31_dostoyevsky_64kb.mp3' },
      { id: 'part-6-chapter-1', file: 'crimeandpunishment_32_dostoyevsky_64kb.mp3' },
      { id: 'part-6-chapter-2', file: 'crimeandpunishment_33_dostoyevsky_64kb.mp3' },
      { id: 'part-6-chapter-3', file: 'crimeandpunishment_34_dostoyevsky_64kb.mp3' },
      { id: 'part-6-chapter-4', file: 'crimeandpunishment_35_dostoyevsky_64kb.mp3' },
      { id: 'part-6-chapter-5', file: 'crimeandpunishment_36_dostoyevsky_64kb.mp3' },
      { id: 'part-6-chapter-6', file: 'crimeandpunishment_37_dostoyevsky_64kb.mp3' },
      { id: 'part-6-chapter-7', file: 'crimeandpunishment_38_dostoyevsky_64kb.mp3' },
      { id: 'part-6-chapter-8', file: 'crimeandpunishment_39_dostoyevsky_64kb.mp3' },
      { id: 'epilogue-chapter-1', file: 'crimeandpunishment_40_dostoyevsky_64kb.mp3' },
      { id: 'epilogue-chapter-2', file: 'crimeandpunishment_41_dostoyevsky_64kb.mp3' }
    ]
  },
  
  'pride-and-prejudice': {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    source: 'LibriVox',
    baseUrl: 'https://archive.org/download/pride_prejudice_0711_librivox',
    chapters: [
      { id: 'chapter-01', file: 'prideandprejudice_01_austen_64kb.mp3' },
      { id: 'chapter-02', file: 'prideandprejudice_02_austen_64kb.mp3' },
      { id: 'chapter-03', file: 'prideandprejudice_03_austen_64kb.mp3' },
      { id: 'chapter-04', file: 'prideandprejudice_04_austen_64kb.mp3' },
      { id: 'chapter-05', file: 'prideandprejudice_05_austen_64kb.mp3' },
      { id: 'chapter-06', file: 'prideandprejudice_06_austen_64kb.mp3' },
      { id: 'chapter-07', file: 'prideandprejudice_07_austen_64kb.mp3' },
      { id: 'chapter-08', file: 'prideandprejudice_08_austen_64kb.mp3' },
      { id: 'chapter-09', file: 'prideandprejudice_09_austen_64kb.mp3' },
      { id: 'chapter-10', file: 'prideandprejudice_10_austen_64kb.mp3' },
      { id: 'chapter-11', file: 'prideandprejudice_11_austen_64kb.mp3' },
      { id: 'chapter-12', file: 'prideandprejudice_12_austen_64kb.mp3' },
      { id: 'chapter-13', file: 'prideandprejudice_13_austen_64kb.mp3' },
      { id: 'chapter-14', file: 'prideandprejudice_14_austen_64kb.mp3' },
      { id: 'chapter-15', file: 'prideandprejudice_15_austen_64kb.mp3' },
      { id: 'chapter-16', file: 'prideandprejudice_16_austen_64kb.mp3' },
      { id: 'chapter-17', file: 'prideandprejudice_17_austen_64kb.mp3' },
      { id: 'chapter-18', file: 'prideandprejudice_18_austen_64kb.mp3' },
      { id: 'chapter-19', file: 'prideandprejudice_19_austen_64kb.mp3' },
      { id: 'chapter-20', file: 'prideandprejudice_20_austen_64kb.mp3' },
      { id: 'chapter-21', file: 'prideandprejudice_21_austen_64kb.mp3' },
      { id: 'chapter-22', file: 'prideandprejudice_22_austen_64kb.mp3' },
      { id: 'chapter-23', file: 'prideandprejudice_23_austen_64kb.mp3' },
      { id: 'chapter-24', file: 'prideandprejudice_24_austen_64kb.mp3' },
      { id: 'chapter-25', file: 'prideandprejudice_25_austen_64kb.mp3' },
      { id: 'chapter-26', file: 'prideandprejudice_26_austen_64kb.mp3' },
      { id: 'chapter-27', file: 'prideandprejudice_27_austen_64kb.mp3' },
      { id: 'chapter-28', file: 'prideandprejudice_28_austen_64kb.mp3' },
      { id: 'chapter-29', file: 'prideandprejudice_29_austen_64kb.mp3' },
      { id: 'chapter-30', file: 'prideandprejudice_30_austen_64kb.mp3' },
      { id: 'chapter-31', file: 'prideandprejudice_31_austen_64kb.mp3' },
      { id: 'chapter-32', file: 'prideandprejudice_32_austen_64kb.mp3' },
      { id: 'chapter-33', file: 'prideandprejudice_33_austen_64kb.mp3' },
      { id: 'chapter-34', file: 'prideandprejudice_34_austen_64kb.mp3' },
      { id: 'chapter-35', file: 'prideandprejudice_35_austen_64kb.mp3' },
      { id: 'chapter-36', file: 'prideandprejudice_36_austen_64kb.mp3' },
      { id: 'chapter-37', file: 'prideandprejudice_37_austen_64kb.mp3' },
      { id: 'chapter-38', file: 'prideandprejudice_38_austen_64kb.mp3' },
      { id: 'chapter-39', file: 'prideandprejudice_39_austen_64kb.mp3' },
      { id: 'chapter-40', file: 'prideandprejudice_40_austen_64kb.mp3' },
      { id: 'chapter-41', file: 'prideandprejudice_41_austen_64kb.mp3' },
      { id: 'chapter-42', file: 'prideandprejudice_42_austen_64kb.mp3' },
      { id: 'chapter-43', file: 'prideandprejudice_43_austen_64kb.mp3' },
      { id: 'chapter-44', file: 'prideandprejudice_44_austen_64kb.mp3' },
      { id: 'chapter-45', file: 'prideandprejudice_45_austen_64kb.mp3' },
      { id: 'chapter-46', file: 'prideandprejudice_46_austen_64kb.mp3' },
      { id: 'chapter-47', file: 'prideandprejudice_47_austen_64kb.mp3' },
      { id: 'chapter-48', file: 'prideandprejudice_48_austen_64kb.mp3' },
      { id: 'chapter-49', file: 'prideandprejudice_49_austen_64kb.mp3' },
      { id: 'chapter-50', file: 'prideandprejudice_50_austen_64kb.mp3' },
      { id: 'chapter-51', file: 'prideandprejudice_51_austen_64kb.mp3' },
      { id: 'chapter-52', file: 'prideandprejudice_52_austen_64kb.mp3' },
      { id: 'chapter-53', file: 'prideandprejudice_53_austen_64kb.mp3' },
      { id: 'chapter-54', file: 'prideandprejudice_54_austen_64kb.mp3' },
      { id: 'chapter-55', file: 'prideandprejudice_55_austen_64kb.mp3' },
      { id: 'chapter-56', file: 'prideandprejudice_56_austen_64kb.mp3' },
      { id: 'chapter-57', file: 'prideandprejudice_57_austen_64kb.mp3' },
      { id: 'chapter-58', file: 'prideandprejudice_58_austen_64kb.mp3' },
      { id: 'chapter-59', file: 'prideandprejudice_59_austen_64kb.mp3' },
      { id: 'chapter-60', file: 'prideandprejudice_60_austen_64kb.mp3' },
      { id: 'chapter-61', file: 'prideandprejudice_61_austen_64kb.mp3' }
    ]
  }
};

/**
 * Download audiobook files for a specific book
 */
async function downloadAudiobook(bookId) {
  const bookConfig = AUDIOBOOK_SOURCES[bookId];
  if (!bookConfig) {
    console.error(`❌ No configuration found for book: ${bookId}`);
    return false;
  }
  
  console.log(`🎧 Downloading audiobook: ${bookConfig.title} by ${bookConfig.author}`);
  console.log(`📚 Source: ${bookConfig.source}`);
  
  const outputDir = path.join(__dirname, '..', 'public', 'audio', 'books', bookId, 'en');
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  let successCount = 0;
  let failCount = 0;
  
  for (const chapter of bookConfig.chapters) {
    const sourceUrl = `${bookConfig.baseUrl}/${chapter.file}`;
    const outputPath = path.join(outputDir, `${chapter.id}.mp3`);
    
    console.log(`⬇️  Downloading: ${chapter.id}...`);
    
    try {
      const success = await downloadFile(sourceUrl, outputPath);
      if (success) {
        successCount++;
        console.log(`✅ Downloaded: ${chapter.id}`);
      } else {
        failCount++;
        console.log(`❌ Failed: ${chapter.id}`);
      }
    } catch (error) {
      failCount++;
      console.error(`❌ Error downloading ${chapter.id}:`, error.message);
    }
  }
  
  console.log(`\n📊 Download Summary for ${bookConfig.title}:`);
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log(`📁 Files saved to: ${outputDir}`);
  
  return successCount > 0;
}

/**
 * Download a single file
 */
function downloadFile(url, outputPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outputPath);
    
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        
        file.on('finish', () => {
          file.close();
          resolve(true);
        });
        
        file.on('error', (err) => {
          fs.unlink(outputPath, () => {}); // Delete the file on error
          reject(err);
        });
      } else {
        file.close();
        fs.unlink(outputPath, () => {}); // Delete the file on error
        reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
      }
    }).on('error', (err) => {
      file.close();
      fs.unlink(outputPath, () => {}); // Delete the file on error
      reject(err);
    });
  });
}

/**
 * Download all available audiobooks
 */
async function downloadAllAudiobooks() {
  console.log('🎧 Starting download of all authentic audiobooks...\n');
  
  const bookIds = Object.keys(AUDIOBOOK_SOURCES);
  let totalSuccess = 0;
  let totalFail = 0;
  
  for (const bookId of bookIds) {
    console.log(`\n${'='.repeat(60)}`);
    const success = await downloadAudiobook(bookId);
    if (success) {
      totalSuccess++;
    } else {
      totalFail++;
    }
    
    // Add delay between downloads to be respectful to servers
    if (bookId !== bookIds[bookIds.length - 1]) {
      console.log('\n⏳ Waiting 5 seconds before next download...');
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
  
  console.log(`\n${'='.repeat(60)}`);
  console.log('🎉 All downloads completed!');
  console.log(`📊 Summary:`);
  console.log(`✅ Successful books: ${totalSuccess}`);
  console.log(`❌ Failed books: ${totalFail}`);
  console.log(`\n📝 Next steps:`);
  console.log('1. Test audiobook playback on the website');
  console.log('2. Update book data files with actual audio durations');
  console.log('3. Add chapter-based audio configuration');
}

// Command line interface
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    downloadAllAudiobooks().catch(console.error);
  } else if (args[0] === '--book' && args[1]) {
    downloadAudiobook(args[1]).catch(console.error);
  } else {
    console.log('Usage:');
    console.log('  node download-authentic-audiobooks.js                    # Download all audiobooks');
    console.log('  node download-authentic-audiobooks.js --book <book-id>   # Download specific book');
    console.log('\nAvailable books:');
    Object.keys(AUDIOBOOK_SOURCES).forEach(id => {
      const book = AUDIOBOOK_SOURCES[id];
      console.log(`  ${id} - ${book.title} by ${book.author}`);
    });
  }
}

module.exports = { downloadAudiobook, downloadAllAudiobooks };
