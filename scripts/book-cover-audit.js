#!/usr/bin/env node

/**
 * Book Cover Audit Script
 *
 * This script audits all books in the website to identify:
 * 1. Books with working external cover URLs
 * 2. Books with missing/broken cover images
 * 3. Books referencing non-existent local files
 * 4. Generates a report and action plan
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Import book data (we'll need to compile TypeScript or use a workaround)
const { execSync } = require('child_process');

class BookCoverAuditor {
  constructor() {
    this.results = {
      total: 0,
      withExternalUrls: 0,
      withLocalPaths: 0,
      withWorkingCovers: 0,
      withBrokenCovers: 0,
      missingCovers: 0,
      books: []
    };

    this.coversDir = path.join(process.cwd(), 'public', 'images', 'covers');
  }

  async auditBooks() {
    console.log('🔍 Starting Book Cover Audit...\n');

    try {
      // Get all book data by reading the TypeScript files
      const books = await this.getAllBooks();

      console.log(`📚 Found ${books.length} books to audit\n`);
      this.results.total = books.length;

      for (const book of books) {
        await this.auditSingleBook(book);
      }

      this.generateReport();
      this.generateActionPlan();

    } catch (error) {
      console.error('❌ Error during audit:', error.message);
    }
  }

  async getAllBooks() {
    // For now, we'll create a sample of books based on what we know exists
    // In a real implementation, we'd compile the TypeScript and import the data

    const sampleBooks = [
      {
        id: 'pride-and-prejudice',
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        coverImage: 'https://upload.wikimedia.org/wikipedia/commons/1/17/PrideAndPrejudiceTitlePage.jpg'
      },
      {
        id: 'the-notebook',
        title: 'The Notebook',
        author: 'Nicholas Sparks',
        coverImage: 'https://upload.wikimedia.org/wikipedia/en/8/86/Thenotebook.jpg'
      },
      {
        id: 'crime-and-punishment-dostoevsky',
        title: 'Crime and Punishment',
        author: 'Fyodor Dostoevsky',
        coverImage: 'https://upload.wikimedia.org/wikipedia/en/4/4b/Crimeandpunishmentcover.png'
      },
      {
        id: 'alice-adventures-in-wonderland',
        title: "Alice's Adventures in Wonderland",
        author: 'Lewis Carroll',
        coverImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Alice%27s_Adventures_in_Wonderland_-_Lewis_Carroll_-_John_Tenniel_-_1865.jpg/256px-Alice%27s_Adventures_in_Wonderland_-_Lewis_Carroll_-_John_Tenniel_-_1865.jpg'
      },
      {
        id: 'khuda-aur-mohabbat',
        title: 'خدا اور محبت',
        author: 'Hashim Nadeem',
        coverImage: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Khuda_Aur_Mohabbat_Cover.jpg'
      },
      {
        id: 'bachpan-ka-december',
        title: 'بچپن کا دسمبر',
        author: 'Hashim Nadeem',
        coverImage: 'https://upload.wikimedia.org/wikipedia/en/a/a5/Bachpan_Ka_December_Cover.jpg'
      },
      // Add books with local paths that don't exist
      {
        id: 'mere-humdam-mere-dost',
        title: 'میرے ہمدم میرے دوست',
        author: 'Effat Sehar',
        coverImage: '/images/covers/mere-humdam-mere-dost.jpg'
      },
      {
        id: 'kuch-ishq-tha-kuch-majazi',
        title: 'کچھ عشق تھا کچھ مجازی',
        author: 'Effat Sehar',
        coverImage: '/images/covers/kuch-ishq-tha-kuch-majazi.jpg'
      },
      {
        id: 'dil-se-dil-tak',
        title: 'دل سے دل تک',
        author: 'Amna Riaz',
        coverImage: '/images/covers/dil-se-dil-tak.jpg'
      }
    ];

    return sampleBooks;
  }

  async auditSingleBook(book) {
    const result = {
      id: book.id,
      title: book.title,
      author: book.author,
      coverImage: book.coverImage,
      status: 'unknown',
      type: 'unknown',
      exists: false,
      accessible: false,
      fileSize: null,
      error: null
    };

    try {
      if (!book.coverImage) {
        result.status = 'missing';
        result.error = 'No cover image specified';
        this.results.missingCovers++;
      } else if (book.coverImage.startsWith('http')) {
        result.type = 'external';
        this.results.withExternalUrls++;

        const accessible = await this.checkUrlAccessible(book.coverImage);
        result.accessible = accessible;
        result.status = accessible ? 'working' : 'broken';

        if (accessible) {
          this.results.withWorkingCovers++;
        } else {
          this.results.withBrokenCovers++;
        }
      } else if (book.coverImage.startsWith('/images/covers/')) {
        result.type = 'local';
        this.results.withLocalPaths++;

        const localPath = path.join(process.cwd(), 'public', book.coverImage);
        const exists = fs.existsSync(localPath);
        result.exists = exists;
        result.status = exists ? 'working' : 'missing';

        if (exists) {
          const stats = fs.statSync(localPath);
          result.fileSize = stats.size;
          this.results.withWorkingCovers++;
        } else {
          this.results.missingCovers++;
        }
      }

      console.log(`📖 ${book.title}: ${result.status} (${result.type})`);

    } catch (error) {
      result.status = 'error';
      result.error = error.message;
      console.log(`❌ ${book.title}: Error - ${error.message}`);
    }

    this.results.books.push(result);
  }

  async checkUrlAccessible(url) {
    return new Promise((resolve) => {
      const client = url.startsWith('https') ? https : http;

      const request = client.get(url, (response) => {
        resolve(response.statusCode === 200);
      });

      request.on('error', () => {
        resolve(false);
      });

      request.setTimeout(5000, () => {
        request.destroy();
        resolve(false);
      });
    });
  }

  generateReport() {
    console.log('\n📊 BOOK COVER AUDIT REPORT');
    console.log('=' .repeat(50));
    console.log(`Total Books: ${this.results.total}`);
    console.log(`Books with External URLs: ${this.results.withExternalUrls}`);
    console.log(`Books with Local Paths: ${this.results.withLocalPaths}`);
    console.log(`Working Covers: ${this.results.withWorkingCovers}`);
    console.log(`Broken Covers: ${this.results.withBrokenCovers}`);
    console.log(`Missing Covers: ${this.results.missingCovers}`);

    const workingPercentage = ((this.results.withWorkingCovers / this.results.total) * 100).toFixed(1);
    console.log(`\n✅ Working Coverage: ${workingPercentage}%`);

    // Save detailed report
    const reportPath = path.join(process.cwd(), 'book-cover-audit-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
    console.log(`\n📄 Detailed report saved to: ${reportPath}`);
  }

  generateActionPlan() {
    console.log('\n🎯 ACTION PLAN');
    console.log('=' .repeat(50));

    const brokenExternal = this.results.books.filter(b => b.type === 'external' && !b.accessible);
    const missingLocal = this.results.books.filter(b => b.type === 'local' && !b.exists);
    const noCovers = this.results.books.filter(b => b.status === 'missing');

    if (brokenExternal.length > 0) {
      console.log(`\n🔗 ${brokenExternal.length} books with broken external URLs:`);
      brokenExternal.forEach(book => {
        console.log(`   - ${book.title}: ${book.coverImage}`);
      });
    }

    if (missingLocal.length > 0) {
      console.log(`\n📁 ${missingLocal.length} books with missing local files:`);
      missingLocal.forEach(book => {
        console.log(`   - ${book.title}: ${book.coverImage}`);
      });
    }

    if (noCovers.length > 0) {
      console.log(`\n❌ ${noCovers.length} books with no cover specified:`);
      noCovers.forEach(book => {
        console.log(`   - ${book.title} by ${book.author}`);
      });
    }

    console.log('\n🛠️  RECOMMENDED ACTIONS:');
    console.log('1. Run: node scripts/download-book-covers.js');
    console.log('   - Downloads working external covers and saves locally');
    console.log('2. Run: node scripts/generate-custom-covers.js');
    console.log('   - Creates custom covers for books without any cover');
    console.log('3. Run: node scripts/update-book-references.js');
    console.log('   - Updates book data to reference local cover files');
    console.log('4. Test the website to ensure covers display correctly');
    console.log('5. Consider optimizing images for web performance');

    console.log('\n📋 QUICK FIX COMMANDS:');
    console.log('# Download all available covers:');
    console.log('node scripts/download-book-covers.js');
    console.log('');
    console.log('# Generate custom covers for missing ones:');
    console.log('node scripts/generate-custom-covers.js');
    console.log('');
    console.log('# Run audit again to check progress:');
    console.log('node scripts/book-cover-audit.js');
  }
}

// Run the audit
if (require.main === module) {
  const auditor = new BookCoverAuditor();
  auditor.auditBooks().catch(console.error);
}

module.exports = BookCoverAuditor;
