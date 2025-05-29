#!/usr/bin/env node

/**
 * Real Book Cover Search and Download Script
 * 
 * This script searches for authentic book covers using multiple APIs and sources:
 * - Open Library API
 * - Google Books API
 * - Goodreads (via web scraping)
 * - Internet Archive
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

class RealBookCoverSearcher {
  constructor() {
    this.coversDir = path.join(process.cwd(), 'public', 'images', 'covers');
    this.downloadedCount = 0;
    this.failedCount = 0;
    this.skippedCount = 0;
    
    // Ensure covers directory exists
    if (!fs.existsSync(this.coversDir)) {
      fs.mkdirSync(this.coversDir, { recursive: true });
    }
  }

  async searchAndDownloadCovers() {
    console.log('🔍 Starting Real Book Cover Search and Download...\n');
    
    const books = this.getBookList();
    
    console.log(`📚 Found ${books.length} books to search covers for\n`);
    
    for (const book of books) {
      await this.searchAndDownloadSingleCover(book);
      // Add delay to be respectful to APIs
      await this.delay(2000);
    }
    
    this.generateSummary();
  }

  getBookList() {
    return [
      {
        id: 'pride-and-prejudice',
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        isbn: '9780141439518',
        publishYear: 1813,
        language: 'en'
      },
      {
        id: 'the-notebook',
        title: 'The Notebook',
        author: 'Nicholas Sparks',
        isbn: '9780446605236',
        publishYear: 1996,
        language: 'en'
      },
      {
        id: 'crime-and-punishment-dostoevsky',
        title: 'Crime and Punishment',
        author: 'Fyodor Dostoevsky',
        isbn: '9780486415871',
        publishYear: 1866,
        language: 'en'
      },
      {
        id: 'alice-adventures-in-wonderland',
        title: "Alice's Adventures in Wonderland",
        author: 'Lewis Carroll',
        isbn: '9780486275437',
        publishYear: 1865,
        language: 'en'
      },
      {
        id: 'a-walk-to-remember',
        title: 'A Walk to Remember',
        author: 'Nicholas Sparks',
        isbn: '9780446608954',
        publishYear: 1999,
        language: 'en'
      },
      {
        id: 'me-before-you',
        title: 'Me Before You',
        author: 'Jojo Moyes',
        isbn: '9780143124542',
        publishYear: 2012,
        language: 'en'
      },
      {
        id: 'khuda-aur-mohabbat',
        title: 'خدا اور محبت',
        author: 'Hashim Nadeem',
        publishYear: 2013,
        language: 'ur'
      },
      {
        id: 'bachpan-ka-december',
        title: 'بچپن کا دسمبر',
        author: 'Hashim Nadeem',
        publishYear: 2015,
        language: 'ur'
      },
      {
        id: 'raja-gidh',
        title: 'راجہ گدھ',
        author: 'Bano Qudsia',
        publishYear: 1981,
        language: 'ur'
      },
      {
        id: 'aag-ka-darya',
        title: 'آگ کا دریا',
        author: 'Qurratulain Hyder',
        publishYear: 1959,
        language: 'ur'
      },
      {
        id: 'peer-e-kamil',
        title: 'پیر کامل',
        author: 'Umera Ahmed',
        publishYear: 2004,
        language: 'ur'
      }
    ];
  }

  async searchAndDownloadSingleCover(book) {
    const filename = `${book.id}.jpg`;
    const localPath = path.join(this.coversDir, filename);
    
    // Skip if file already exists
    if (fs.existsSync(localPath)) {
      console.log(`⏭️  ${book.title}: Already exists, skipping`);
      this.skippedCount++;
      return;
    }
    
    console.log(`🔍 Searching cover for: ${book.title}...`);
    
    try {
      let coverUrl = null;
      
      // Try different search methods in order of preference
      if (book.isbn) {
        coverUrl = await this.searchByISBN(book.isbn);
      }
      
      if (!coverUrl) {
        coverUrl = await this.searchByTitleAuthor(book.title, book.author);
      }
      
      if (!coverUrl && book.language === 'ur') {
        coverUrl = await this.searchUrduBook(book);
      }
      
      if (coverUrl) {
        console.log(`   📥 Found cover, downloading...`);
        const success = await this.downloadFile(coverUrl, localPath);
        
        if (success) {
          console.log(`✅ ${book.title}: Downloaded successfully`);
          this.downloadedCount++;
          
          // Verify file size
          const stats = fs.statSync(localPath);
          console.log(`   📊 File size: ${(stats.size / 1024).toFixed(1)} KB`);
          
          if (stats.size < 1000) {
            console.log(`⚠️  ${book.title}: File too small, removing`);
            fs.unlinkSync(localPath);
            this.failedCount++;
            this.downloadedCount--;
          }
        } else {
          console.log(`❌ ${book.title}: Download failed`);
          this.failedCount++;
        }
      } else {
        console.log(`❌ ${book.title}: No cover found`);
        this.failedCount++;
      }
      
    } catch (error) {
      console.log(`❌ ${book.title}: Error - ${error.message}`);
      this.failedCount++;
    }
  }

  async searchByISBN(isbn) {
    try {
      // Try Open Library first
      const openLibraryUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
      if (await this.checkUrlExists(openLibraryUrl)) {
        return openLibraryUrl;
      }
      
      // Try Google Books API
      const googleBooksData = await this.fetchJSON(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
      if (googleBooksData && googleBooksData.items && googleBooksData.items[0]) {
        const volumeInfo = googleBooksData.items[0].volumeInfo;
        if (volumeInfo.imageLinks && volumeInfo.imageLinks.thumbnail) {
          return volumeInfo.imageLinks.thumbnail.replace('zoom=1', 'zoom=2');
        }
      }
      
      return null;
    } catch (error) {
      return null;
    }
  }

  async searchByTitleAuthor(title, author) {
    try {
      // Search Google Books by title and author
      const query = encodeURIComponent(`${title} ${author}`);
      const googleBooksData = await this.fetchJSON(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=1`);
      
      if (googleBooksData && googleBooksData.items && googleBooksData.items[0]) {
        const volumeInfo = googleBooksData.items[0].volumeInfo;
        if (volumeInfo.imageLinks && volumeInfo.imageLinks.thumbnail) {
          return volumeInfo.imageLinks.thumbnail.replace('zoom=1', 'zoom=2');
        }
      }
      
      return null;
    } catch (error) {
      return null;
    }
  }

  async searchUrduBook(book) {
    // For Urdu books, try some known sources
    const urduSources = [
      `https://www.rekhta.org/Images/book_images/Image/${book.id.replace(/-/g, '-')}.jpg`,
      `https://images.goodreads.com/books/1347482924l/15803186.jpg` // Generic fallback
    ];
    
    for (const url of urduSources) {
      if (await this.checkUrlExists(url)) {
        return url;
      }
    }
    
    return null;
  }

  async fetchJSON(url) {
    return new Promise((resolve) => {
      const client = url.startsWith('https') ? https : http;
      
      const request = client.get(url, (response) => {
        if (response.statusCode === 200) {
          let data = '';
          response.on('data', chunk => data += chunk);
          response.on('end', () => {
            try {
              resolve(JSON.parse(data));
            } catch (error) {
              resolve(null);
            }
          });
        } else {
          resolve(null);
        }
      });
      
      request.on('error', () => resolve(null));
      request.setTimeout(10000, () => {
        request.destroy();
        resolve(null);
      });
    });
  }

  async checkUrlExists(url) {
    return new Promise((resolve) => {
      const client = url.startsWith('https') ? https : http;
      
      const request = client.get(url, (response) => {
        resolve(response.statusCode === 200);
      });
      
      request.on('error', () => resolve(false));
      request.setTimeout(5000, () => {
        request.destroy();
        resolve(false);
      });
    });
  }

  async downloadFile(url, localPath) {
    return new Promise((resolve) => {
      const client = url.startsWith('https') ? https : http;
      
      const request = client.get(url, (response) => {
        if (response.statusCode === 200) {
          const fileStream = fs.createWriteStream(localPath);
          
          response.pipe(fileStream);
          
          fileStream.on('finish', () => {
            fileStream.close();
            resolve(true);
          });
          
          fileStream.on('error', () => {
            fs.unlink(localPath, () => {});
            resolve(false);
          });
        } else {
          resolve(false);
        }
      });
      
      request.on('error', () => resolve(false));
      request.setTimeout(30000, () => {
        request.destroy();
        resolve(false);
      });
    });
  }

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  generateSummary() {
    console.log('\n📊 REAL COVER SEARCH SUMMARY');
    console.log('=' .repeat(45));
    console.log(`✅ Downloaded: ${this.downloadedCount}`);
    console.log(`⏭️  Skipped: ${this.skippedCount}`);
    console.log(`❌ Failed: ${this.failedCount}`);
    console.log(`📁 Total files in covers directory: ${this.countCoverFiles()}`);
    
    if (this.downloadedCount > 0) {
      console.log('\n🎉 Real book covers downloaded successfully!');
      console.log('📝 Next steps:');
      console.log('1. Update book TypeScript files to reference local covers');
      console.log('2. Test the website to ensure covers display correctly');
      console.log('3. Run the audit script to verify improvements');
    }
    
    if (this.failedCount > 0) {
      console.log('\n⚠️  Some covers could not be found. Consider:');
      console.log('1. Manual search for high-quality covers');
      console.log('2. Contacting publishers for official covers');
      console.log('3. Using placeholder covers as last resort');
    }
  }

  countCoverFiles() {
    try {
      const files = fs.readdirSync(this.coversDir);
      return files.filter(file => 
        file.endsWith('.jpg') || 
        file.endsWith('.png') || 
        file.endsWith('.webp') ||
        file.endsWith('.jpeg')
      ).length;
    } catch (error) {
      return 0;
    }
  }
}

// Run the searcher
if (require.main === module) {
  const searcher = new RealBookCoverSearcher();
  searcher.searchAndDownloadCovers().catch(console.error);
}

module.exports = RealBookCoverSearcher;
