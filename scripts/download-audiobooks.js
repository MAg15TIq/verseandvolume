#!/usr/bin/env node

/**
 * Audiobook Download Script for Verse and Volume
 *
 * This script helps download authentic audiobooks from public domain sources
 * like LibriVox and Internet Archive for integration into the website.
 *
 * Usage:
 * node scripts/download-audiobooks.js [book-id]
 *
 * Example:
 * node scripts/download-audiobooks.js crime-and-punishment-dostoevsky
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { URL } = require('url');

// Configuration for public domain audiobook sources
const AUDIOBOOK_SOURCES = {
  'crime-and-punishment-dostoevsky': {
    title: 'Crime and Punishment',
    author: 'Fyodor Dostoevsky',
    source: 'librivox',
    librivoxUrl: 'https://librivox.org/crime-and-punishment-version-3-by-fyodor-dostoyevsky/',
    archiveUrl: 'https://archive.org/details/crime_punishment_3_1708_librivox',
    baseUrl: 'https://archive.org/download/crime_punishment_3_1708_librivox',
    files: [
      // LibriVox Crime and Punishment files - Version 3 (Mark Nelson)
      { name: 'crimepunishment_01_dostoyevsky_64kb.mp3', chapter: 'part-1-chapter-1', title: 'Part I - Chapter I' },
      { name: 'crimepunishment_02_dostoyevsky_64kb.mp3', chapter: 'part-1-chapter-2', title: 'Part I - Chapter II' },
      { name: 'crimepunishment_03_dostoyevsky_64kb.mp3', chapter: 'part-1-chapter-3', title: 'Part I - Chapter III' },
      { name: 'crimepunishment_04_dostoyevsky_64kb.mp3', chapter: 'part-1-chapter-4', title: 'Part I - Chapter IV' },
      { name: 'crimepunishment_05_dostoyevsky_64kb.mp3', chapter: 'part-1-chapter-5', title: 'Part I - Chapter V' },
      { name: 'crimepunishment_06_dostoyevsky_64kb.mp3', chapter: 'part-1-chapter-6', title: 'Part I - Chapter VI' },
      { name: 'crimepunishment_07_dostoyevsky_64kb.mp3', chapter: 'part-1-chapter-7', title: 'Part I - Chapter VII' },
      { name: 'crimepunishment_08_dostoyevsky_64kb.mp3', chapter: 'part-2-chapter-1', title: 'Part II - Chapter I' },
      { name: 'crimepunishment_09_dostoyevsky_64kb.mp3', chapter: 'part-2-chapter-2', title: 'Part II - Chapter II' },
      { name: 'crimepunishment_10_dostoyevsky_64kb.mp3', chapter: 'part-2-chapter-3', title: 'Part II - Chapter III' },
      { name: 'crimepunishment_11_dostoyevsky_64kb.mp3', chapter: 'part-2-chapter-4', title: 'Part II - Chapter IV' },
      { name: 'crimepunishment_12_dostoyevsky_64kb.mp3', chapter: 'part-2-chapter-5', title: 'Part II - Chapter V' },
      { name: 'crimepunishment_13_dostoyevsky_64kb.mp3', chapter: 'part-2-chapter-6', title: 'Part II - Chapter VI' },
      { name: 'crimepunishment_14_dostoyevsky_64kb.mp3', chapter: 'part-2-chapter-7', title: 'Part II - Chapter VII' },
      { name: 'crimepunishment_15_dostoyevsky_64kb.mp3', chapter: 'part-3-chapter-1', title: 'Part III - Chapter I' },
      { name: 'crimepunishment_16_dostoyevsky_64kb.mp3', chapter: 'part-3-chapter-2', title: 'Part III - Chapter II' },
      { name: 'crimepunishment_17_dostoyevsky_64kb.mp3', chapter: 'part-3-chapter-3', title: 'Part III - Chapter III' },
      { name: 'crimepunishment_18_dostoyevsky_64kb.mp3', chapter: 'part-3-chapter-4', title: 'Part III - Chapter IV' },
      { name: 'crimepunishment_19_dostoyevsky_64kb.mp3', chapter: 'part-3-chapter-5', title: 'Part III - Chapter V' },
      { name: 'crimepunishment_20_dostoyevsky_64kb.mp3', chapter: 'part-3-chapter-6', title: 'Part III - Chapter VI' },
      { name: 'crimepunishment_21_dostoyevsky_64kb.mp3', chapter: 'part-4-chapter-1', title: 'Part IV - Chapter I' },
      { name: 'crimepunishment_22_dostoyevsky_64kb.mp3', chapter: 'part-4-chapter-2', title: 'Part IV - Chapter II' },
      { name: 'crimepunishment_23_dostoyevsky_64kb.mp3', chapter: 'part-4-chapter-3', title: 'Part IV - Chapter III' },
      { name: 'crimepunishment_24_dostoyevsky_64kb.mp3', chapter: 'part-4-chapter-4', title: 'Part IV - Chapter IV' },
      { name: 'crimepunishment_25_dostoyevsky_64kb.mp3', chapter: 'part-4-chapter-5', title: 'Part IV - Chapter V' },
      { name: 'crimepunishment_26_dostoyevsky_64kb.mp3', chapter: 'part-4-chapter-6', title: 'Part IV - Chapter VI' },
      { name: 'crimepunishment_27_dostoyevsky_64kb.mp3', chapter: 'part-5-chapter-1', title: 'Part V - Chapter I' },
      { name: 'crimepunishment_28_dostoyevsky_64kb.mp3', chapter: 'part-5-chapter-2', title: 'Part V - Chapter II' },
      { name: 'crimepunishment_29_dostoyevsky_64kb.mp3', chapter: 'part-5-chapter-3', title: 'Part V - Chapter III' },
      { name: 'crimepunishment_30_dostoyevsky_64kb.mp3', chapter: 'part-5-chapter-4', title: 'Part V - Chapter IV' },
      { name: 'crimepunishment_31_dostoyevsky_64kb.mp3', chapter: 'part-5-chapter-5', title: 'Part V - Chapter V' },
      { name: 'crimepunishment_32_dostoyevsky_64kb.mp3', chapter: 'part-6-chapter-1', title: 'Part VI - Chapter I' },
      { name: 'crimepunishment_33_dostoyevsky_64kb.mp3', chapter: 'part-6-chapter-2', title: 'Part VI - Chapter II' },
      { name: 'crimepunishment_34_dostoyevsky_64kb.mp3', chapter: 'part-6-chapter-3', title: 'Part VI - Chapter III' },
      { name: 'crimepunishment_35_dostoyevsky_64kb.mp3', chapter: 'part-6-chapter-4', title: 'Part VI - Chapter IV' },
      { name: 'crimepunishment_36_dostoyevsky_64kb.mp3', chapter: 'part-6-chapter-5', title: 'Part VI - Chapter V' },
      { name: 'crimepunishment_37_dostoyevsky_64kb.mp3', chapter: 'part-6-chapter-6', title: 'Part VI - Chapter VI' },
      { name: 'crimepunishment_38_dostoyevsky_64kb.mp3', chapter: 'part-6-chapter-7', title: 'Part VI - Chapter VII' },
      { name: 'crimepunishment_39_dostoyevsky_64kb.mp3', chapter: 'part-6-chapter-8', title: 'Part VI - Chapter VIII' },
      { name: 'crimepunishment_40_dostoyevsky_64kb.mp3', chapter: 'epilogue', title: 'Epilogue' }
    ],
    narrator: 'Mark Nelson',
    license: 'Public Domain',
    estimatedDuration: 82800, // ~23 hours
    quality: 'high'
  },

  'pride-and-prejudice': {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    source: 'librivox',
    librivoxUrl: 'https://librivox.org/pride-and-prejudice-by-jane-austen/',
    archiveUrl: 'https://archive.org/details/pride_prejudice_krs_librivox',
    baseUrl: 'https://archive.org/download/pride_prejudice_krs_librivox',
    files: [
      // LibriVox Pride and Prejudice files - Version 3 (Karen Savage)
      { name: 'pride_and_prejudice_01_austen_64kb.mp3', chapter: 'chapter-01', title: 'Chapter 1' },
      { name: 'pride_and_prejudice_02_austen_64kb.mp3', chapter: 'chapter-02', title: 'Chapter 2' },
      { name: 'pride_and_prejudice_03_austen_64kb.mp3', chapter: 'chapter-03', title: 'Chapter 3' },
      { name: 'pride_and_prejudice_04_austen_64kb.mp3', chapter: 'chapter-04', title: 'Chapter 4' },
      { name: 'pride_and_prejudice_05_austen_64kb.mp3', chapter: 'chapter-05', title: 'Chapter 5' },
      { name: 'pride_and_prejudice_06_austen_64kb.mp3', chapter: 'chapter-06', title: 'Chapter 6' },
      { name: 'pride_and_prejudice_07_austen_64kb.mp3', chapter: 'chapter-07', title: 'Chapter 7' },
      { name: 'pride_and_prejudice_08_austen_64kb.mp3', chapter: 'chapter-08', title: 'Chapter 8' },
      { name: 'pride_and_prejudice_09_austen_64kb.mp3', chapter: 'chapter-09', title: 'Chapter 9' },
      { name: 'pride_and_prejudice_10_austen_64kb.mp3', chapter: 'chapter-10', title: 'Chapter 10' },
      { name: 'pride_and_prejudice_11_austen_64kb.mp3', chapter: 'chapter-11', title: 'Chapter 11' },
      { name: 'pride_and_prejudice_12_austen_64kb.mp3', chapter: 'chapter-12', title: 'Chapter 12' },
      { name: 'pride_and_prejudice_13_austen_64kb.mp3', chapter: 'chapter-13', title: 'Chapter 13' },
      { name: 'pride_and_prejudice_14_austen_64kb.mp3', chapter: 'chapter-14', title: 'Chapter 14' },
      { name: 'pride_and_prejudice_15_austen_64kb.mp3', chapter: 'chapter-15', title: 'Chapter 15' },
      { name: 'pride_and_prejudice_16_austen_64kb.mp3', chapter: 'chapter-16', title: 'Chapter 16' },
      { name: 'pride_and_prejudice_17_austen_64kb.mp3', chapter: 'chapter-17', title: 'Chapter 17' },
      { name: 'pride_and_prejudice_18_austen_64kb.mp3', chapter: 'chapter-18', title: 'Chapter 18' },
      { name: 'pride_and_prejudice_19_austen_64kb.mp3', chapter: 'chapter-19', title: 'Chapter 19' },
      { name: 'pride_and_prejudice_20_austen_64kb.mp3', chapter: 'chapter-20', title: 'Chapter 20' },
      { name: 'pride_and_prejudice_21_austen_64kb.mp3', chapter: 'chapter-21', title: 'Chapter 21' },
      { name: 'pride_and_prejudice_22_austen_64kb.mp3', chapter: 'chapter-22', title: 'Chapter 22' },
      { name: 'pride_and_prejudice_23_austen_64kb.mp3', chapter: 'chapter-23', title: 'Chapter 23' },
      { name: 'pride_and_prejudice_24_austen_64kb.mp3', chapter: 'chapter-24', title: 'Chapter 24' },
      { name: 'pride_and_prejudice_25_austen_64kb.mp3', chapter: 'chapter-25', title: 'Chapter 25' },
      { name: 'pride_and_prejudice_26_austen_64kb.mp3', chapter: 'chapter-26', title: 'Chapter 26' },
      { name: 'pride_and_prejudice_27_austen_64kb.mp3', chapter: 'chapter-27', title: 'Chapter 27' },
      { name: 'pride_and_prejudice_28_austen_64kb.mp3', chapter: 'chapter-28', title: 'Chapter 28' },
      { name: 'pride_and_prejudice_29_austen_64kb.mp3', chapter: 'chapter-29', title: 'Chapter 29' },
      { name: 'pride_and_prejudice_30_austen_64kb.mp3', chapter: 'chapter-30', title: 'Chapter 30' },
      { name: 'pride_and_prejudice_31_austen_64kb.mp3', chapter: 'chapter-31', title: 'Chapter 31' },
      { name: 'pride_and_prejudice_32_austen_64kb.mp3', chapter: 'chapter-32', title: 'Chapter 32' },
      { name: 'pride_and_prejudice_33_austen_64kb.mp3', chapter: 'chapter-33', title: 'Chapter 33' },
      { name: 'pride_and_prejudice_34_austen_64kb.mp3', chapter: 'chapter-34', title: 'Chapter 34' },
      { name: 'pride_and_prejudice_35_austen_64kb.mp3', chapter: 'chapter-35', title: 'Chapter 35' },
      { name: 'pride_and_prejudice_36_austen_64kb.mp3', chapter: 'chapter-36', title: 'Chapter 36' },
      { name: 'pride_and_prejudice_37_austen_64kb.mp3', chapter: 'chapter-37', title: 'Chapter 37' },
      { name: 'pride_and_prejudice_38_austen_64kb.mp3', chapter: 'chapter-38', title: 'Chapter 38' },
      { name: 'pride_and_prejudice_39_austen_64kb.mp3', chapter: 'chapter-39', title: 'Chapter 39' },
      { name: 'pride_and_prejudice_40_austen_64kb.mp3', chapter: 'chapter-40', title: 'Chapter 40' },
      { name: 'pride_and_prejudice_41_austen_64kb.mp3', chapter: 'chapter-41', title: 'Chapter 41' },
      { name: 'pride_and_prejudice_42_austen_64kb.mp3', chapter: 'chapter-42', title: 'Chapter 42' },
      { name: 'pride_and_prejudice_43_austen_64kb.mp3', chapter: 'chapter-43', title: 'Chapter 43' },
      { name: 'pride_and_prejudice_44_austen_64kb.mp3', chapter: 'chapter-44', title: 'Chapter 44' },
      { name: 'pride_and_prejudice_45_austen_64kb.mp3', chapter: 'chapter-45', title: 'Chapter 45' },
      { name: 'pride_and_prejudice_46_austen_64kb.mp3', chapter: 'chapter-46', title: 'Chapter 46' },
      { name: 'pride_and_prejudice_47_austen_64kb.mp3', chapter: 'chapter-47', title: 'Chapter 47' },
      { name: 'pride_and_prejudice_48_austen_64kb.mp3', chapter: 'chapter-48', title: 'Chapter 48' },
      { name: 'pride_and_prejudice_49_austen_64kb.mp3', chapter: 'chapter-49', title: 'Chapter 49' },
      { name: 'pride_and_prejudice_50_austen_64kb.mp3', chapter: 'chapter-50', title: 'Chapter 50' },
      { name: 'pride_and_prejudice_51_austen_64kb.mp3', chapter: 'chapter-51', title: 'Chapter 51' },
      { name: 'pride_and_prejudice_52_austen_64kb.mp3', chapter: 'chapter-52', title: 'Chapter 52' },
      { name: 'pride_and_prejudice_53_austen_64kb.mp3', chapter: 'chapter-53', title: 'Chapter 53' },
      { name: 'pride_and_prejudice_54_austen_64kb.mp3', chapter: 'chapter-54', title: 'Chapter 54' },
      { name: 'pride_and_prejudice_55_austen_64kb.mp3', chapter: 'chapter-55', title: 'Chapter 55' },
      { name: 'pride_and_prejudice_56_austen_64kb.mp3', chapter: 'chapter-56', title: 'Chapter 56' },
      { name: 'pride_and_prejudice_57_austen_64kb.mp3', chapter: 'chapter-57', title: 'Chapter 57' },
      { name: 'pride_and_prejudice_58_austen_64kb.mp3', chapter: 'chapter-58', title: 'Chapter 58' },
      { name: 'pride_and_prejudice_59_austen_64kb.mp3', chapter: 'chapter-59', title: 'Chapter 59' },
      { name: 'pride_and_prejudice_60_austen_64kb.mp3', chapter: 'chapter-60', title: 'Chapter 60' },
      { name: 'pride_and_prejudice_61_austen_64kb.mp3', chapter: 'chapter-61', title: 'Chapter 61' }
    ],
    narrator: 'Karen Savage',
    license: 'Public Domain',
    estimatedDuration: 43200, // ~12 hours
    quality: 'high'
  },

  'alice-adventures-wonderland': {
    title: 'Alice\'s Adventures in Wonderland',
    author: 'Lewis Carroll',
    source: 'librivox',
    librivoxUrl: 'https://librivox.org/alices-adventures-in-wonderland-by-lewis-carroll/',
    archiveUrl: 'https://archive.org/details/alices_adventures_wonderland_0711_librivox',
    baseUrl: 'https://archive.org/download/alices_adventures_wonderland_0711_librivox',
    files: [
      // LibriVox Alice's Adventures in Wonderland files
      { name: 'alicesadventures_01_carroll_64kb.mp3', chapter: 'chapter-01', title: 'Chapter 1: Down the Rabbit-Hole' },
      { name: 'alicesadventures_02_carroll_64kb.mp3', chapter: 'chapter-02', title: 'Chapter 2: The Pool of Tears' },
      { name: 'alicesadventures_03_carroll_64kb.mp3', chapter: 'chapter-03', title: 'Chapter 3: A Caucus-Race and a Long Tale' },
      { name: 'alicesadventures_04_carroll_64kb.mp3', chapter: 'chapter-04', title: 'Chapter 4: The Rabbit Sends in a Little Bill' },
      { name: 'alicesadventures_05_carroll_64kb.mp3', chapter: 'chapter-05', title: 'Chapter 5: Advice from a Caterpillar' },
      { name: 'alicesadventures_06_carroll_64kb.mp3', chapter: 'chapter-06', title: 'Chapter 6: Pig and Pepper' },
      { name: 'alicesadventures_07_carroll_64kb.mp3', chapter: 'chapter-07', title: 'Chapter 7: A Mad Tea-Party' },
      { name: 'alicesadventures_08_carroll_64kb.mp3', chapter: 'chapter-08', title: 'Chapter 8: The Queen\'s Croquet-Ground' },
      { name: 'alicesadventures_09_carroll_64kb.mp3', chapter: 'chapter-09', title: 'Chapter 9: The Mock Turtle\'s Story' },
      { name: 'alicesadventures_10_carroll_64kb.mp3', chapter: 'chapter-10', title: 'Chapter 10: The Lobster Quadrille' },
      { name: 'alicesadventures_11_carroll_64kb.mp3', chapter: 'chapter-11', title: 'Chapter 11: Who Stole the Tarts?' },
      { name: 'alicesadventures_12_carroll_64kb.mp3', chapter: 'chapter-12', title: 'Chapter 12: Alice\'s Evidence' }
    ],
    narrator: 'Kristin Hughes',
    license: 'Public Domain',
    estimatedDuration: 10800, // ~3 hours
    quality: 'high'
  },

  'shakespeare-sonnets': {
    title: 'Shakespeare\'s Sonnets',
    author: 'William Shakespeare',
    source: 'librivox',
    librivoxUrl: 'https://librivox.org/sonnets-by-william-shakespeare/',
    archiveUrl: 'https://archive.org/details/sonnets_shakespeare_0711_librivox',
    baseUrl: 'https://archive.org/download/sonnets_shakespeare_0711_librivox',
    files: [
      // LibriVox Shakespeare's Sonnets files (selection of most famous sonnets)
      { name: 'sonnet_018_shakespeare_64kb.mp3', chapter: 'sonnet-18', title: 'Sonnet 18: Shall I compare thee to a summer\'s day?' },
      { name: 'sonnet_029_shakespeare_64kb.mp3', chapter: 'sonnet-29', title: 'Sonnet 29: When, in disgrace with fortune and men\'s eyes' },
      { name: 'sonnet_073_shakespeare_64kb.mp3', chapter: 'sonnet-73', title: 'Sonnet 73: That time of year thou mayst in me behold' },
      { name: 'sonnet_116_shakespeare_64kb.mp3', chapter: 'sonnet-116', title: 'Sonnet 116: Let me not to the marriage of true minds' },
      { name: 'sonnet_130_shakespeare_64kb.mp3', chapter: 'sonnet-130', title: 'Sonnet 130: My mistress\' eyes are nothing like the sun' },
      { name: 'sonnet_154_shakespeare_64kb.mp3', chapter: 'sonnet-154', title: 'Sonnet 154: The little Love-god lying once asleep' }
    ],
    narrator: 'LibriVox Community',
    license: 'Public Domain',
    estimatedDuration: 1800, // ~30 minutes
    quality: 'high'
  },

  'frankenstein': {
    title: 'Frankenstein, or The Modern Prometheus',
    author: 'Mary Shelley',
    source: 'librivox',
    librivoxUrl: 'https://librivox.org/frankenstein-or-modern-prometheus-by-mary-w-shelley/',
    archiveUrl: 'https://archive.org/details/frankenstein_shelley',
    baseUrl: 'https://archive.org/download/frankenstein_shelley',
    files: [
      // LibriVox Frankenstein files
      { name: 'frankenstein_01_shelley_64kb.mp3', chapter: 'chapter-01', title: 'Chapter 1' },
      { name: 'frankenstein_02_shelley_64kb.mp3', chapter: 'chapter-02', title: 'Chapter 2' },
      { name: 'frankenstein_03_shelley_64kb.mp3', chapter: 'chapter-03', title: 'Chapter 3' },
      { name: 'frankenstein_04_shelley_64kb.mp3', chapter: 'chapter-04', title: 'Chapter 4' },
      { name: 'frankenstein_05_shelley_64kb.mp3', chapter: 'chapter-05', title: 'Chapter 5' },
      { name: 'frankenstein_06_shelley_64kb.mp3', chapter: 'chapter-06', title: 'Chapter 6' },
      { name: 'frankenstein_07_shelley_64kb.mp3', chapter: 'chapter-07', title: 'Chapter 7' },
      { name: 'frankenstein_08_shelley_64kb.mp3', chapter: 'chapter-08', title: 'Chapter 8' },
      { name: 'frankenstein_09_shelley_64kb.mp3', chapter: 'chapter-09', title: 'Chapter 9' },
      { name: 'frankenstein_10_shelley_64kb.mp3', chapter: 'chapter-10', title: 'Chapter 10' },
      { name: 'frankenstein_11_shelley_64kb.mp3', chapter: 'chapter-11', title: 'Chapter 11' },
      { name: 'frankenstein_12_shelley_64kb.mp3', chapter: 'chapter-12', title: 'Chapter 12' },
      { name: 'frankenstein_13_shelley_64kb.mp3', chapter: 'chapter-13', title: 'Chapter 13' },
      { name: 'frankenstein_14_shelley_64kb.mp3', chapter: 'chapter-14', title: 'Chapter 14' },
      { name: 'frankenstein_15_shelley_64kb.mp3', chapter: 'chapter-15', title: 'Chapter 15' },
      { name: 'frankenstein_16_shelley_64kb.mp3', chapter: 'chapter-16', title: 'Chapter 16' },
      { name: 'frankenstein_17_shelley_64kb.mp3', chapter: 'chapter-17', title: 'Chapter 17' },
      { name: 'frankenstein_18_shelley_64kb.mp3', chapter: 'chapter-18', title: 'Chapter 18' },
      { name: 'frankenstein_19_shelley_64kb.mp3', chapter: 'chapter-19', title: 'Chapter 19' },
      { name: 'frankenstein_20_shelley_64kb.mp3', chapter: 'chapter-20', title: 'Chapter 20' },
      { name: 'frankenstein_21_shelley_64kb.mp3', chapter: 'chapter-21', title: 'Chapter 21' },
      { name: 'frankenstein_22_shelley_64kb.mp3', chapter: 'chapter-22', title: 'Chapter 22' },
      { name: 'frankenstein_23_shelley_64kb.mp3', chapter: 'chapter-23', title: 'Chapter 23' },
      { name: 'frankenstein_24_shelley_64kb.mp3', chapter: 'chapter-24', title: 'Chapter 24' }
    ],
    narrator: 'Kristin Hughes',
    license: 'Public Domain',
    estimatedDuration: 28800, // ~8 hours
    quality: 'high'
  }
};

/**
 * Download a file from URL to local path
 */
function downloadFile(url, localPath, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    console.log(`📥 Downloading: ${path.basename(localPath)}`);

    const file = fs.createWriteStream(localPath);

    const makeRequest = (requestUrl, redirectCount = 0) => {
      https.get(requestUrl, (response) => {
        // Handle redirects
        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
          if (redirectCount >= maxRedirects) {
            reject(new Error(`Too many redirects (${redirectCount})`));
            return;
          }

          const redirectUrl = response.headers.location;
          console.log(`🔄 Redirecting to: ${redirectUrl}`);
          makeRequest(redirectUrl, redirectCount + 1);
          return;
        }

        if (response.statusCode !== 200) {
          reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
          return;
        }

        response.pipe(file);

        file.on('finish', () => {
          file.close();
          console.log(`✅ Downloaded: ${path.basename(localPath)}`);
          resolve();
        });

        file.on('error', (err) => {
          fs.unlink(localPath, () => {}); // Delete partial file
          reject(err);
        });
      }).on('error', (err) => {
        reject(err);
      });
    };

    makeRequest(url);
  });
}

/**
 * Create directory if it doesn't exist
 */
function ensureDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`📁 Created directory: ${dirPath}`);
  }
}

/**
 * Download audiobook files for a specific book
 */
async function downloadAudiobook(bookId) {
  const bookConfig = AUDIOBOOK_SOURCES[bookId];

  if (!bookConfig) {
    console.error(`❌ No configuration found for book: ${bookId}`);
    console.log('Available books:');
    Object.keys(AUDIOBOOK_SOURCES).forEach(id => {
      console.log(`  - ${id}`);
    });
    return;
  }

  console.log(`🎧 Downloading audiobook: ${bookConfig.title}`);
  console.log(`📚 Author: ${bookConfig.author}`);
  console.log(`🎙️ Narrator: ${bookConfig.narrator}`);
  console.log(`📜 License: ${bookConfig.license}`);
  console.log('');

  // Create target directory
  const targetDir = path.join(__dirname, '..', 'public', 'audio', 'books', bookId, 'en');
  ensureDirectory(targetDir);

  // Download each file
  let downloadedCount = 0;
  let failedCount = 0;

  for (const file of bookConfig.files) {
    const sourceUrl = `${bookConfig.baseUrl}/${file.name}`;
    const targetPath = path.join(targetDir, `${file.chapter}.mp3`);

    try {
      await downloadFile(sourceUrl, targetPath);
      downloadedCount++;
    } catch (error) {
      console.error(`❌ Failed to download ${file.name}: ${error.message}`);
      failedCount++;
    }
  }

  console.log('');
  console.log(`📊 Download Summary:`);
  console.log(`✅ Successfully downloaded: ${downloadedCount} files`);
  console.log(`❌ Failed downloads: ${failedCount} files`);

  if (downloadedCount > 0) {
    console.log('');
    console.log('🎉 Audiobook download completed!');
    console.log('');
    console.log('📋 Next Steps:');
    console.log('1. Verify audio quality and playback');
    console.log('2. Update chapter durations in the book data file');
    console.log('3. Test the AudiobookPlayer component');
    console.log('4. Optimize file sizes if needed');

    // Generate update instructions
    generateUpdateInstructions(bookId, bookConfig, targetDir);
  }
}

/**
 * Generate instructions for updating book data
 */
function generateUpdateInstructions(bookId, bookConfig, audioDir) {
  const instructionsPath = path.join(audioDir, 'UPDATE_INSTRUCTIONS.md');

  const instructions = `# Update Instructions for ${bookConfig.title}

## Files Downloaded
Audio files have been downloaded to: \`${audioDir}\`

## Next Steps

### 1. Verify Audio Files
- Check that all files play correctly
- Verify audio quality (should be clear and audible)
- Ensure consistent volume levels across files

### 2. Update Book Data File
The book data file is located at:
\`src/data/novels/authors/fyodor-dostoevsky/crime-and-punishment.ts\`

Update the following properties with actual values:

\`\`\`typescript
// Update these properties after testing the audio files
audioDuration: 72000, // Replace with actual total duration in seconds
audioChapters: [
  // Update each chapter with actual duration
  {
    id: 'part-1-chapter-1',
    title: 'Part I - Chapter I',
    audioUrl: '/audio/books/${bookId}/en/part-1-chapter-1.mp3',
    duration: 2400, // Replace with actual duration in seconds
    startTime: 0
  },
  // ... continue for all chapters
]
\`\`\`

### 3. Test Implementation
1. Start the development server: \`npm run dev\`
2. Navigate to the book page: \`/novels/${bookId}\`
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
- **Source**: ${bookConfig.source}
- **Narrator**: ${bookConfig.narrator}
- **License**: ${bookConfig.license}
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
`;

  fs.writeFileSync(instructionsPath, instructions);
  console.log(`📝 Update instructions saved to: ${instructionsPath}`);
}

/**
 * List available audiobooks
 */
function listAvailableBooks() {
  console.log('📚 Available Audiobooks for Download:');
  console.log('');

  Object.entries(AUDIOBOOK_SOURCES).forEach(([id, config]) => {
    console.log(`🎧 ${id}`);
    console.log(`   Title: ${config.title}`);
    console.log(`   Author: ${config.author}`);
    console.log(`   Narrator: ${config.narrator}`);
    console.log(`   Source: ${config.source}`);
    console.log(`   Files: ${config.files.length} chapters`);
    console.log('');
  });

  console.log('Usage: node scripts/download-audiobooks.js [book-id]');
}

/**
 * Main execution function
 */
async function main() {
  const bookId = process.argv[2];

  console.log('🎧 Audiobook Download Script for Verse and Volume');
  console.log('================================================');
  console.log('');

  if (!bookId) {
    listAvailableBooks();
    return;
  }

  try {
    await downloadAudiobook(bookId);
  } catch (error) {
    console.error('❌ Error during download:', error.message);
    process.exit(1);
  }
}

// Run the script if called directly
if (require.main === module) {
  main();
}

module.exports = {
  downloadAudiobook,
  AUDIOBOOK_SOURCES
};
