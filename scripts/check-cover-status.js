#!/usr/bin/env node

/**
 * Check Cover Status Script
 * 
 * Quick script to check which cover images are already available
 * and which ones still need to be downloaded.
 */

const fs = require('fs');
const path = require('path');

class CoverStatusChecker {
  constructor() {
    this.coversDir = path.join(process.cwd(), 'public', 'images', 'covers');
  }

  checkStatus() {
    console.log('🔍 Checking current cover image status...\n');

    const availableCovers = this.getAvailableCovers();
    const priorityBooks = this.getPriorityBooks();

    console.log(`📁 Found ${availableCovers.length} cover images in directory:`);
    availableCovers.forEach(cover => {
      const stats = fs.statSync(path.join(this.coversDir, cover));
      const sizeKB = (stats.size / 1024).toFixed(1);
      console.log(`   ✅ ${cover} (${sizeKB} KB)`);
    });

    console.log(`\n📚 Priority books status:`);
    priorityBooks.forEach(book => {
      const hasCover = availableCovers.some(cover => 
        cover.startsWith(book.id + '.')
      );
      const status = hasCover ? '✅' : '❌';
      console.log(`   ${status} ${book.title} (${book.id})`);
    });

    const foundCount = priorityBooks.filter(book => 
      availableCovers.some(cover => cover.startsWith(book.id + '.'))
    ).length;

    console.log(`\n📊 Summary:`);
    console.log(`   Priority books with covers: ${foundCount}/${priorityBooks.length}`);
    console.log(`   Coverage: ${((foundCount / priorityBooks.length) * 100).toFixed(1)}%`);

    if (foundCount < priorityBooks.length) {
      console.log(`\n📝 Still need to download covers for:`);
      priorityBooks.forEach(book => {
        const hasCover = availableCovers.some(cover => 
          cover.startsWith(book.id + '.')
        );
        if (!hasCover) {
          console.log(`   - ${book.title} (${book.id}.jpg)`);
        }
      });
    }
  }

  getAvailableCovers() {
    try {
      const files = fs.readdirSync(this.coversDir);
      return files.filter(file => 
        file.endsWith('.jpg') || 
        file.endsWith('.png') || 
        file.endsWith('.webp') ||
        file.endsWith('.jpeg')
      );
    } catch (error) {
      console.log('❌ Error reading covers directory:', error.message);
      return [];
    }
  }

  getPriorityBooks() {
    // Priority books that should have covers first
    return [
      { id: 'pride-and-prejudice', title: 'Pride and Prejudice' },
      { id: 'alice-adventures-in-wonderland', title: "Alice's Adventures in Wonderland" },
      { id: 'crime-and-punishment-dostoevsky', title: 'Crime and Punishment' },
      { id: 'the-notebook', title: 'The Notebook' },
      { id: 'a-walk-to-remember', title: 'A Walk to Remember' },
      { id: 'me-before-you', title: 'Me Before You' },
      { id: 'khuda-aur-mohabbat', title: 'خدا اور محبت' },
      { id: 'bachpan-ka-december', title: 'بچپن کا دسمبر' },
      { id: 'raja-gidh', title: 'راجہ گدھ' },
      { id: 'aag-ka-darya', title: 'آگ کا دریا' },
      { id: 'peer-e-kamil', title: 'پیر کامل' },
      { id: 'jannat-ke-pattay', title: 'جنت کے پتے' },
      { id: 'namal', title: 'نمل' },
      { id: 'humsafar', title: 'ہمسفر' },
      { id: 'mushaf', title: 'مصحف' }
    ];
  }
}

// Run the checker
if (require.main === module) {
  const checker = new CoverStatusChecker();
  checker.checkStatus();
}

module.exports = CoverStatusChecker;
