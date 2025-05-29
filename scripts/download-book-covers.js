#!/usr/bin/env node

/**
 * Book Cover Downloader Script
 *
 * This script downloads book covers from external URLs and saves them locally
 * for better performance and reliability.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

class BookCoverDownloader {
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

  async downloadCovers() {
    console.log('📥 Starting Book Cover Download...\n');

    const booksWithExternalCovers = this.getBooksWithExternalCovers();

    console.log(`🔗 Found ${booksWithExternalCovers.length} books with external cover URLs\n`);

    for (const book of booksWithExternalCovers) {
      await this.downloadSingleCover(book);
      // Add delay to be respectful to servers
      await this.delay(1000);
    }

    this.generateSummary();
  }

  getBooksWithExternalCovers() {
    // Enhanced book covers from reliable sources with better quality URLs
    return [
      // Classic English Literature
      {
        id: 'pride-and-prejudice',
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        coverUrl: 'https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg',
        filename: 'pride-and-prejudice.jpg',
        alternativeUrls: [
          'https://covers.openlibrary.org/b/isbn/9780486284736-L.jpg',
          'https://covers.openlibrary.org/b/id/8739161-L.jpg',
          'https://covers.openlibrary.org/b/isbn/9780141040349-L.jpg'
        ]
      },
      {
        id: 'alice-adventures-in-wonderland',
        title: "Alice's Adventures in Wonderland",
        author: 'Lewis Carroll',
        coverUrl: 'https://covers.openlibrary.org/b/isbn/9780486275437-L.jpg',
        filename: 'alice-adventures-in-wonderland.jpg',
        alternativeUrls: [
          'https://covers.openlibrary.org/b/isbn/9780141439761-L.jpg',
          'https://covers.openlibrary.org/b/id/8739163-L.jpg',
          'https://covers.openlibrary.org/b/isbn/9780486416588-L.jpg'
        ]
      },
      {
        id: 'crime-and-punishment-dostoevsky',
        title: 'Crime and Punishment',
        author: 'Fyodor Dostoevsky',
        coverUrl: 'https://covers.openlibrary.org/b/isbn/9780486415871-L.jpg',
        filename: 'crime-and-punishment-dostoevsky.jpg',
        alternativeUrls: [
          'https://covers.openlibrary.org/b/isbn/9780140449136-L.jpg',
          'https://covers.openlibrary.org/b/isbn/9780679734505-L.jpg',
          'https://covers.openlibrary.org/b/id/8739162-L.jpg'
        ]
      },

      // Contemporary Romance/Love Novels
      {
        id: 'the-notebook',
        title: 'The Notebook',
        author: 'Nicholas Sparks',
        coverUrl: 'https://covers.openlibrary.org/b/isbn/9780446605236-L.jpg',
        filename: 'the-notebook.jpg',
        alternativeUrls: [
          'https://covers.openlibrary.org/b/isbn/9780446676090-L.jpg',
          'https://covers.openlibrary.org/b/id/295577-L.jpg',
          'https://covers.openlibrary.org/b/isbn/9780446365031-L.jpg'
        ]
      },
      {
        id: 'a-walk-to-remember',
        title: 'A Walk to Remember',
        author: 'Nicholas Sparks',
        coverUrl: 'https://covers.openlibrary.org/b/isbn/9780446608954-L.jpg',
        filename: 'a-walk-to-remember.jpg',
        alternativeUrls: [
          'https://covers.openlibrary.org/b/isbn/9780446676083-L.jpg',
          'https://covers.openlibrary.org/b/isbn/9780446365024-L.jpg'
        ]
      },
      {
        id: 'me-before-you',
        title: 'Me Before You',
        author: 'Jojo Moyes',
        coverUrl: 'https://covers.openlibrary.org/b/isbn/9780143124542-L.jpg',
        filename: 'me-before-you.jpg',
        alternativeUrls: [
          'https://covers.openlibrary.org/b/isbn/9780670026609-L.jpg',
          'https://covers.openlibrary.org/b/isbn/9780718157838-L.jpg'
        ]
      },

      // Popular Contemporary Romance
      {
        id: 'outlander',
        title: 'Outlander',
        author: 'Diana Gabaldon',
        coverUrl: 'https://covers.openlibrary.org/b/isbn/9780440212560-L.jpg',
        filename: 'outlander.jpg',
        alternativeUrls: [
          'https://covers.openlibrary.org/b/isbn/9780385319959-L.jpg',
          'https://covers.openlibrary.org/b/isbn/9780440423201-L.jpg'
        ]
      },
      {
        id: 'the-time-travelers-wife',
        title: "The Time Traveler's Wife",
        author: 'Audrey Niffenegger',
        coverUrl: 'https://covers.openlibrary.org/b/isbn/9780156029438-L.jpg',
        filename: 'the-time-travelers-wife.jpg',
        alternativeUrls: [
          'https://covers.openlibrary.org/b/isbn/9780151011308-L.jpg',
          'https://covers.openlibrary.org/b/isbn/9780099464464-L.jpg'
        ]
      },
      {
        id: 'it-ends-with-us',
        title: 'It Ends with Us',
        author: 'Colleen Hoover',
        coverUrl: 'https://covers.openlibrary.org/b/isbn/9781501110368-L.jpg',
        filename: 'it-ends-with-us.jpg',
        alternativeUrls: [
          'https://covers.openlibrary.org/b/isbn/9781471156267-L.jpg',
          'https://covers.openlibrary.org/b/isbn/9781501110375-L.jpg'
        ]
      },

      // Urdu Literature
      {
        id: 'khuda-aur-mohabbat',
        title: 'خدا اور محبت',
        author: 'Hashim Nadeem',
        coverUrl: 'https://www.rekhta.org/Images/book_images/Image/khuda-aur-mohabbat-hashim-nadeem.jpg',
        filename: 'khuda-aur-mohabbat.jpg',
        alternativeUrls: [
          'https://images.goodreads.com/books/1347482924l/15803186.jpg',
          'https://www.urdupoint.com/images/books/khuda-aur-mohabbat.jpg'
        ]
      },
      {
        id: 'bachpan-ka-december',
        title: 'بچپن کا دسمبر',
        author: 'Hashim Nadeem',
        coverUrl: 'https://www.rekhta.org/Images/book_images/Image/bachpan-ka-december-hashim-nadeem.jpg',
        filename: 'bachpan-ka-december.jpg',
        alternativeUrls: [
          'https://images.goodreads.com/books/1420684924l/24372186.jpg',
          'https://www.urdupoint.com/images/books/bachpan-ka-december.jpg'
        ]
      },
      {
        id: 'raja-gidh',
        title: 'راجہ گدھ',
        author: 'Bano Qudsia',
        coverUrl: 'https://www.rekhta.org/Images/book_images/Image/raja-gidh-bano-qudsia.jpg',
        filename: 'raja-gidh.jpg',
        alternativeUrls: [
          'https://images.goodreads.com/books/1347482924l/15803187.jpg',
          'https://www.urdupoint.com/images/books/raja-gidh.jpg'
        ]
      },
      {
        id: 'aag-ka-darya',
        title: 'آگ کا دریا',
        author: 'Qurratulain Hyder',
        coverUrl: 'https://www.rekhta.org/Images/book_images/Image/aag-ka-darya-qurratulain-hyder.jpg',
        filename: 'aag-ka-darya.jpg',
        alternativeUrls: [
          'https://images.goodreads.com/books/1347482924l/15803188.jpg',
          'https://www.urdupoint.com/images/books/aag-ka-darya.jpg'
        ]
      },
      {
        id: 'peer-e-kamil',
        title: 'پیر کامل',
        author: 'Umera Ahmed',
        coverUrl: 'https://www.rekhta.org/Images/book_images/Image/peer-e-kamil-umera-ahmed.jpg',
        filename: 'peer-e-kamil.jpg',
        alternativeUrls: [
          'https://images.goodreads.com/books/1347482924l/15803189.jpg',
          'https://www.urdupoint.com/images/books/peer-e-kamil.jpg'
        ]
      },

      // Additional Popular Urdu Novels
      {
        id: 'jannat-ke-pattay',
        title: 'جنت کے پتے',
        author: 'Nimra Ahmed',
        coverUrl: 'https://www.rekhta.org/Images/book_images/Image/jannat-ke-pattay-nimra-ahmed.jpg',
        filename: 'jannat-ke-pattay.jpg',
        alternativeUrls: [
          'https://images.goodreads.com/books/1420684924l/24372187.jpg',
          'https://www.urdupoint.com/images/books/jannat-ke-pattay.jpg'
        ]
      },
      {
        id: 'namal',
        title: 'نمل',
        author: 'Nimra Ahmed',
        coverUrl: 'https://www.rekhta.org/Images/book_images/Image/namal-nimra-ahmed.jpg',
        filename: 'namal.jpg',
        alternativeUrls: [
          'https://images.goodreads.com/books/1420684924l/24372188.jpg',
          'https://www.urdupoint.com/images/books/namal.jpg'
        ]
      },
      {
        id: 'humsafar',
        title: 'ہمسفر',
        author: 'Farhat Ishtiaq',
        coverUrl: 'https://www.rekhta.org/Images/book_images/Image/humsafar-farhat-ishtiaq.jpg',
        filename: 'humsafar.jpg',
        alternativeUrls: [
          'https://images.goodreads.com/books/1420684924l/24372189.jpg',
          'https://www.urdupoint.com/images/books/humsafar.jpg'
        ]
      },
      {
        id: 'mushaf',
        title: 'مصحف',
        author: 'Nimra Ahmed',
        coverUrl: 'https://www.rekhta.org/Images/book_images/Image/mushaf-nimra-ahmed.jpg',
        filename: 'mushaf.jpg',
        alternativeUrls: [
          'https://images.goodreads.com/books/1420684924l/24372190.jpg',
          'https://www.urdupoint.com/images/books/mushaf.jpg'
        ]
      }
    ];
  }

  async downloadSingleCover(book) {
    const localPath = path.join(this.coversDir, book.filename);

    // Skip if file already exists
    if (fs.existsSync(localPath)) {
      console.log(`⏭️  ${book.title}: Already exists, skipping`);
      this.skippedCount++;
      return;
    }

    try {
      console.log(`📥 Downloading: ${book.title}...`);

      // Try primary URL first
      let success = await this.downloadFile(book.coverUrl, localPath);

      // If primary fails, try alternative URLs
      if (!success && book.alternativeUrls) {
        console.log(`   🔄 Primary URL failed, trying alternatives...`);

        for (let i = 0; i < book.alternativeUrls.length && !success; i++) {
          const altUrl = book.alternativeUrls[i];
          console.log(`   📥 Trying alternative ${i + 1}...`);
          success = await this.downloadFile(altUrl, localPath);

          if (success) {
            console.log(`   ✅ Alternative ${i + 1} worked!`);
            break;
          }
        }
      }

      if (success) {
        console.log(`✅ ${book.title}: Downloaded successfully`);
        this.downloadedCount++;

        // Verify file size
        const stats = fs.statSync(localPath);
        console.log(`   📊 File size: ${(stats.size / 1024).toFixed(1)} KB`);

        // If file is too small, it might be an error page
        if (stats.size < 1000) {
          console.log(`⚠️  ${book.title}: File seems too small, might be an error`);
          // Delete the small file as it's likely an error page
          fs.unlinkSync(localPath);
          this.failedCount++;
          this.downloadedCount--;
        }
      } else {
        console.log(`❌ ${book.title}: All download attempts failed`);
        this.failedCount++;
      }

    } catch (error) {
      console.log(`❌ ${book.title}: Error - ${error.message}`);
      this.failedCount++;
    }
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

          fileStream.on('error', (error) => {
            fs.unlink(localPath, () => {}); // Delete partial file
            resolve(false);
          });
        } else {
          resolve(false);
        }
      });

      request.on('error', () => {
        resolve(false);
      });

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
    console.log('\n📊 DOWNLOAD SUMMARY');
    console.log('=' .repeat(40));
    console.log(`✅ Downloaded: ${this.downloadedCount}`);
    console.log(`⏭️  Skipped: ${this.skippedCount}`);
    console.log(`❌ Failed: ${this.failedCount}`);
    console.log(`📁 Total files in covers directory: ${this.countCoverFiles()}`);

    if (this.downloadedCount > 0) {
      console.log('\n🎉 Cover images downloaded successfully!');
      console.log('📝 Next steps:');
      console.log('1. Update book TypeScript files to reference local covers');
      console.log('2. Test the website to ensure covers display correctly');
      console.log('3. Optimize images if needed (compress, resize)');
    }

    if (this.failedCount > 0) {
      console.log('\n⚠️  Some downloads failed. You may need to:');
      console.log('1. Check if URLs are still valid');
      console.log('2. Find alternative cover sources');
      console.log('3. Create custom covers for missing books');
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

// Run the downloader
if (require.main === module) {
  const downloader = new BookCoverDownloader();
  downloader.downloadCovers().catch(console.error);
}

module.exports = BookCoverDownloader;
