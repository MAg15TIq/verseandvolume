#!/usr/bin/env node

/**
 * Upload and Organize Cover Images Script
 *
 * This script helps organize manually downloaded cover images and updates
 * the book references to use local covers instead of external URLs.
 */

const fs = require('fs');
const path = require('path');

class CoverImageOrganizer {
  constructor() {
    this.coversDir = path.join(process.cwd(), 'public', 'images', 'covers');
    this.results = {
      totalBooks: 0,
      foundCovers: 0,
      missingCovers: 0,
      updatedReferences: 0,
      errors: 0
    };

    // Comprehensive mapping of cover files to book IDs and their file paths
    this.coverMappings = {
      // Main novels with exact matches
      'pride-and-prejudice.jpg': {
        bookId: 'pride-and-prejudice',
        filePath: 'src/data/novels/authors/jane-austen/pride-and-prejudice.ts'
      },
      'TheNotebook.jpg': {
        bookId: 'the-notebook',
        filePath: 'src/data/novels/authors/nicholas-sparks/the-notebook.ts'
      },
      'A-Walk-To-Remember.jpg': {
        bookId: 'a-walk-to-remember',
        filePath: 'src/data/novels/authors/nicholas-sparks/a-walk-to-remember.ts'
      },
      'me-before-you.jpg': {
        bookId: 'me-before-you',
        filePath: 'src/data/novels/authors/jojo-moyes/me-before-you.ts'
      },
      'alice_in_wonderland_cover.jpg': {
        bookId: 'alice-adventures-in-wonderland',
        filePath: 'src/data/novels/authors/lewis-carroll/alice-adventures-in-wonderland.ts'
      },
      'Crime and punishment cover.png': {
        bookId: 'crime-and-punishment-dostoevsky',
        filePath: 'src/data/novels/authors/fyodor-dostoevsky/crime-and-punishment.ts'
      },

      // Love novels from english-love-novels.ts
      'the-seven-husbands-of-evelyn-hugo.jpg': {
        bookId: 'the-seven-husbands-of-evelyn-hugo',
        filePath: 'src/data/novels/authors/english-love-novels.ts'
      },
      'the-seven-moons-of-maali-almeida.jpg': {
        bookId: 'the-seven-moons-of-maali-almeida',
        filePath: 'src/data/novels/authors/english-love-novels.ts'
      },
      'it-ends-with-us-collectors-copy.webp': {
        bookId: 'it-ends-with-us',
        filePath: 'src/data/novels/authors/english-love-novels.ts'
      },
      'the-hating-game.png': {
        bookId: 'the-hating-game',
        filePath: 'src/data/novels/authors/english-love-novels.ts'
      },
      'beach-read.webp': {
        bookId: 'beach-read',
        filePath: 'src/data/novels/authors/english-love-novels.ts'
      },
      'book-lovers.jpg': {
        bookId: 'book-lovers',
        filePath: 'src/data/novels/authors/english-love-novels.ts'
      },
      'people-we-meet-on-vacation.jpg': {
        bookId: 'people-we-meet-on-vacation',
        filePath: 'src/data/novels/authors/english-love-novels.ts'
      },
      'the-spanish-love-deception.jpg': {
        bookId: 'the-spanish-love-deception',
        filePath: 'src/data/novels/authors/english-love-novels.ts'
      },
      'red-white-and-royal-blue.jpg': {
        bookId: 'red-white-and-royal-blue',
        filePath: 'src/data/novels/authors/english-love-novels.ts'
      },
      'the-kiss-quotient.jpg': {
        bookId: 'the-kiss-quotient',
        filePath: 'src/data/novels/authors/english-love-novels.ts'
      },
      'the-flatshare.jpg': {
        bookId: 'the-flatshare',
        filePath: 'src/data/novels/authors/english-love-novels.ts'
      },
      'the-unhoneymooners.jpg': {
        bookId: 'the-unhoneymooners',
        filePath: 'src/data/novels/authors/english-love-novels.ts'
      },
      'the-kiss-thief.jpg': {
        bookId: 'the-kiss-thief',
        filePath: 'src/data/novels/authors/english-love-novels.ts'
      },
      'the-simple-wild.jpg': {
        bookId: 'the-simple-wild',
        filePath: 'src/data/novels/authors/english-love-novels.ts'
      },
      'the-wall-of-winnipeg-and-me.jpg': {
        bookId: 'the-wall-of-winnipeg-and-me',
        filePath: 'src/data/novels/authors/english-love-novels.ts'
      },
      'the-kiss-of-deception.jpg': {
        bookId: 'the-kiss-of-deception',
        filePath: 'src/data/novels/authors/english-love-novels.ts'
      },
      'the-romance-recipe.jpg': {
        bookId: 'the-romance-recipe',
        filePath: 'src/data/novels/authors/english-love-novels.ts'
      },
      'the-seven-year-slip.jpg': {
        bookId: 'the-seven-year-slip',
        filePath: 'src/data/novels/authors/english-love-novels.ts'
      },
      'the-atlas-of-us.jpg': {
        bookId: 'the-atlas-of-us',
        filePath: 'src/data/novels/authors/english-love-novels.ts'
      },
      'the-star-crossed-sisters-of-tuscany.jpg': {
        bookId: 'the-star-crossed-sisters-of-tuscany',
        filePath: 'src/data/novels/authors/english-love-novels.ts'
      },
      'the-time-travelers-wife.jpg': {
        bookId: 'the-time-travelers-wife',
        filePath: 'src/data/novels/authors/english-love-novels.ts'
      },
      'the-invisible-life-of-addie-larue.jpg': {
        bookId: 'the-invisible-life-of-addie-larue',
        filePath: 'src/data/novels/authors/english-love-novels.ts'
      },
      'the-house-in-the-cerulean-sea.jpg': {
        bookId: 'the-house-in-the-cerulean-sea',
        filePath: 'src/data/novels/authors/english-love-novels.ts'
      },
      'the-very-secret-society-of-irregular-witches.jpg': {
        bookId: 'the-very-secret-society-of-irregular-witches',
        filePath: 'src/data/novels/authors/english-love-novels.ts'
      },
      'eleanor-oliphant-is-completely-fine.jpg': {
        bookId: 'eleanor-oliphant-is-completely-fine',
        filePath: 'src/data/novels/authors/english-love-novels.ts'
      },
      'the-unlikely-pilgrimage-of-harold-fry.jpg': {
        bookId: 'the-unlikely-pilgrimage-of-harold-fry',
        filePath: 'src/data/novels/authors/english-love-novels.ts'
      },
      'the-guest-list.jpg': {
        bookId: 'the-guest-list',
        filePath: 'src/data/novels/authors/english-love-novels.ts'
      },
      'Outlander.jpg': {
        bookId: 'outlander',
        filePath: 'src/data/novels/authors/english-love-novels.ts'
      }
    };

    // Legacy book files mapping for backward compatibility
    this.bookFiles = {
      'pride-and-prejudice': 'src/data/novels/authors/jane-austen/pride-and-prejudice.ts',
      'alice-adventures-in-wonderland': 'src/data/novels/authors/lewis-carroll/alice-adventures-in-wonderland.ts',
      'crime-and-punishment-dostoevsky': 'src/data/novels/authors/fyodor-dostoevsky/crime-and-punishment.ts',
      'the-notebook': 'src/data/novels/authors/nicholas-sparks/the-notebook.ts',
      'a-walk-to-remember': 'src/data/novels/authors/nicholas-sparks/a-walk-to-remember.ts',
      'me-before-you': 'src/data/novels/authors/jojo-moyes/me-before-you.ts',
      'khuda-aur-mohabbat': 'src/data/novels/authors/hashim-nadeem/khuda-aur-mohabbat.ts',
      'bachpan-ka-december': 'src/data/novels/authors/hashim-nadeem/bachpan-ka-december.ts',
      'raja-gidh': 'src/data/novels/authors/bano-qudsia/raja-gidh.ts',
      'aag-ka-darya': 'src/data/novels/authors/qurratulain-hyder/aag-ka-darya.ts',
      'peer-e-kamil': 'src/data/novels/authors/umera-ahmed/peer-e-kamil.ts'
    };
  }

  async organizeCovers() {
    console.log('🖼️  Starting Cover Image Organization...\n');

    // Check what covers are available
    const availableCovers = this.getAvailableCovers();
    console.log(`📁 Found ${availableCovers.length} cover images in directory\n`);

    // Get all books from the comprehensive list
    const allBooks = this.getAllBooksFromList();
    this.results.totalBooks = allBooks.length;

    console.log(`📚 Checking ${allBooks.length} books for cover images...\n`);

    // Check each book for covers
    for (const book of allBooks) {
      this.checkBookCover(book, availableCovers);
    }

    // Update book references for available covers
    await this.updateBookReferences(availableCovers);

    // Generate summary report
    this.generateReport();
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

  getAllBooksFromList() {
    // Return comprehensive list of all books that have covers available
    return [
      // Main novels
      { id: 'pride-and-prejudice', title: 'Pride and Prejudice', category: 'Classic English Literature' },
      { id: 'alice-adventures-in-wonderland', title: "Alice's Adventures in Wonderland", category: 'Classic English Literature' },
      { id: 'crime-and-punishment-dostoevsky', title: 'Crime and Punishment', category: 'Classic English Literature' },
      { id: 'the-notebook', title: 'The Notebook', category: 'Contemporary Romance' },
      { id: 'a-walk-to-remember', title: 'A Walk to Remember', category: 'Contemporary Romance' },
      { id: 'me-before-you', title: 'Me Before You', category: 'Contemporary Romance' },
      { id: 'khuda-aur-mohabbat', title: 'خدا اور محبت', category: 'Urdu Love Novels' },
      { id: 'bachpan-ka-december', title: 'بچپن کا دسمبر', category: 'Urdu Love Novels' },
      { id: 'raja-gidh', title: 'راجہ گدھ', category: 'Urdu Classic Literature' },
      { id: 'aag-ka-darya', title: 'آگ کا دریا', category: 'Urdu Classic Literature' },
      { id: 'peer-e-kamil', title: 'پیر کامل', category: 'Urdu Classic Literature' },

      // Love novels with covers
      { id: 'the-seven-husbands-of-evelyn-hugo', title: 'The Seven Husbands of Evelyn Hugo', category: 'Contemporary Romance' },
      { id: 'the-seven-moons-of-maali-almeida', title: 'The Seven Moons of Maali Almeida', category: 'Contemporary Fiction' },
      { id: 'it-ends-with-us', title: 'It Ends with Us', category: 'Contemporary Romance' },
      { id: 'the-hating-game', title: 'The Hating Game', category: 'Contemporary Romance' },
      { id: 'beach-read', title: 'Beach Read', category: 'Contemporary Romance' },
      { id: 'book-lovers', title: 'Book Lovers', category: 'Contemporary Romance' },
      { id: 'people-we-meet-on-vacation', title: 'People We Meet on Vacation', category: 'Contemporary Romance' },
      { id: 'the-spanish-love-deception', title: 'The Spanish Love Deception', category: 'Contemporary Romance' },
      { id: 'red-white-and-royal-blue', title: 'Red, White & Royal Blue', category: 'Contemporary Romance' },
      { id: 'the-kiss-quotient', title: 'The Kiss Quotient', category: 'Contemporary Romance' },
      { id: 'the-flatshare', title: 'The Flatshare', category: 'Contemporary Romance' },
      { id: 'the-unhoneymooners', title: 'The Unhoneymooners', category: 'Contemporary Romance' },
      { id: 'the-kiss-thief', title: 'The Kiss Thief', category: 'Contemporary Romance' },
      { id: 'the-simple-wild', title: 'The Simple Wild', category: 'Contemporary Romance' },
      { id: 'the-wall-of-winnipeg-and-me', title: 'The Wall of Winnipeg and Me', category: 'Contemporary Romance' },
      { id: 'the-kiss-of-deception', title: 'The Kiss of Deception', category: 'Fantasy Romance' },
      { id: 'the-romance-recipe', title: 'The Romance Recipe', category: 'Contemporary Romance' },
      { id: 'the-seven-year-slip', title: 'The Seven Year Slip', category: 'Contemporary Romance' },
      { id: 'the-atlas-of-us', title: 'The Atlas of Us', category: 'Contemporary Romance' },
      { id: 'the-star-crossed-sisters-of-tuscany', title: 'The Star-Crossed Sisters of Tuscany', category: 'Contemporary Fiction' },
      { id: 'the-time-travelers-wife', title: 'The Time Traveler\'s Wife', category: 'Science Fiction Romance' },
      { id: 'the-invisible-life-of-addie-larue', title: 'The Invisible Life of Addie LaRue', category: 'Fantasy Romance' },
      { id: 'the-house-in-the-cerulean-sea', title: 'The House in the Cerulean Sea', category: 'Fantasy Romance' },
      { id: 'the-very-secret-society-of-irregular-witches', title: 'The Very Secret Society of Irregular Witches', category: 'Fantasy Romance' },
      { id: 'eleanor-oliphant-is-completely-fine', title: 'Eleanor Oliphant Is Completely Fine', category: 'Contemporary Fiction' },
      { id: 'the-unlikely-pilgrimage-of-harold-fry', title: 'The Unlikely Pilgrimage of Harold Fry', category: 'Contemporary Fiction' },
      { id: 'the-guest-list', title: 'The Guest List', category: 'Mystery Thriller' },
      { id: 'outlander', title: 'Outlander', category: 'Historical Romance' }
    ];
  }

  checkBookCover(book, availableCovers) {
    const expectedFilenames = [
      `${book.id}.jpg`,
      `${book.id}.png`,
      `${book.id}.webp`,
      `${book.id}.jpeg`
    ];

    const foundCover = availableCovers.find(cover =>
      expectedFilenames.includes(cover)
    );

    if (foundCover) {
      console.log(`✅ ${book.title}: Found cover (${foundCover})`);
      this.results.foundCovers++;
    } else {
      console.log(`❌ ${book.title}: Missing cover`);
      this.results.missingCovers++;
    }
  }

  async updateBookReferences(availableCovers) {
    console.log('\n🔄 Updating book references to use local covers...\n');

    // First, process the comprehensive cover mappings
    await this.updateAllBookReferencesFromMappings(availableCovers);

    // Then process legacy book files for backward compatibility
    for (const [bookId, filePath] of Object.entries(this.bookFiles)) {
      // Skip if already processed in cover mappings
      const alreadyProcessed = Object.values(this.coverMappings).some(mapping =>
        mapping.bookId === bookId
      );

      if (!alreadyProcessed) {
        const coverFile = availableCovers.find(cover =>
          cover.startsWith(bookId + '.')
        );

        if (coverFile) {
          await this.updateSingleBookFile(bookId, filePath, coverFile);
        }
      }
    }
  }

  async updateAllBookReferencesFromMappings(availableCovers) {
    console.log('🔄 Processing comprehensive cover mappings...\n');

    // Process each cover mapping
    for (const [coverFile, mapping] of Object.entries(this.coverMappings)) {
      if (availableCovers.includes(coverFile)) {
        await this.updateBookWithCoverMapping(coverFile, mapping);
      } else {
        console.log(`⚠️  Cover file not found: ${coverFile}`);
        this.results.errors++;
      }
    }
  }

  async updateBookWithCoverMapping(coverFile, mapping) {
    const { bookId, filePath } = mapping;

    try {
      if (!fs.existsSync(filePath)) {
        console.log(`⚠️  ${bookId}: File not found - ${filePath}`);
        this.results.errors++;
        return;
      }

      const content = fs.readFileSync(filePath, 'utf8');
      const localCoverPath = `/images/covers/${coverFile}`;

      // For files with multiple book exports, we need to update the specific book
      let updatedContent;

      if (filePath.includes('english-love-novels.ts')) {
        // Handle multiple book exports in english-love-novels.ts
        updatedContent = this.updateSpecificBookInFile(content, bookId, localCoverPath);
      } else {
        // Handle single book export files
        updatedContent = content.replace(
          /coverImage:\s*['"`][^'"`]*['"`]/,
          `coverImage: '${localCoverPath}'`
        );
      }

      if (content !== updatedContent) {
        fs.writeFileSync(filePath, updatedContent);
        console.log(`✅ ${bookId}: Updated to use local cover (${coverFile})`);
        this.results.updatedReferences++;
      } else {
        console.log(`ℹ️  ${bookId}: Already using local cover or no change needed`);
      }

    } catch (error) {
      console.error(`❌ Error updating ${bookId}:`, error.message);
      this.results.errors++;
    }
  }

  updateSpecificBookInFile(content, bookId, localCoverPath) {
    // Convert book ID to variable name (e.g., 'the-hating-game' -> 'theHatingGame')
    const variableName = bookId.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());

    // Find the book export and update its coverImage
    const bookExportRegex = new RegExp(
      `(export const ${variableName}[^=]*=\\s*{[^}]*coverImage:\\s*)['"\`][^'"\`]*['"\`]`,
      'g'
    );

    let updatedContent = content.replace(bookExportRegex, `$1'${localCoverPath}'`);

    // If the above didn't work, try a more general approach
    if (updatedContent === content) {
      // Look for the book ID in the content and update the nearest coverImage
      const bookIdIndex = content.indexOf(`id: '${bookId}'`);
      if (bookIdIndex !== -1) {
        // Find the coverImage property after the book ID
        const afterBookId = content.substring(bookIdIndex);
        const coverImageMatch = afterBookId.match(/coverImage:\s*['"`][^'"`]*['"`]/);
        if (coverImageMatch) {
          const fullMatch = coverImageMatch[0];
          const replacement = `coverImage: '${localCoverPath}'`;
          updatedContent = content.replace(fullMatch, replacement);
        }
      }
    }

    return updatedContent;
  }

  async updateSingleBookFile(bookId, filePath, coverFile) {
    try {
      if (!fs.existsSync(filePath)) {
        console.log(`⚠️  ${bookId}: File not found - ${filePath}`);
        return;
      }

      const content = fs.readFileSync(filePath, 'utf8');
      const localCoverPath = `/images/covers/${coverFile}`;

      // Update coverImage property to use local path
      const updatedContent = content.replace(
        /coverImage:\s*['"`][^'"`]*['"`]/,
        `coverImage: '${localCoverPath}'`
      );

      if (content !== updatedContent) {
        fs.writeFileSync(filePath, updatedContent);
        console.log(`✅ ${bookId}: Updated to use local cover (${coverFile})`);
        this.results.updatedReferences++;
      } else {
        console.log(`ℹ️  ${bookId}: Already using local cover or no change needed`);
      }

    } catch (error) {
      console.log(`❌ ${bookId}: Error updating file - ${error.message}`);
      this.results.errors++;
    }
  }

  generateReport() {
    console.log('\n📊 COVER ORGANIZATION SUMMARY');
    console.log('=' .repeat(50));
    console.log(`📚 Total Books: ${this.results.totalBooks}`);
    console.log(`✅ Found Covers: ${this.results.foundCovers}`);
    console.log(`❌ Missing Covers: ${this.results.missingCovers}`);
    console.log(`🔄 Updated References: ${this.results.updatedReferences}`);
    console.log(`⚠️  Errors: ${this.results.errors}`);

    const coveragePercentage = ((this.results.foundCovers / this.results.totalBooks) * 100).toFixed(1);
    console.log(`📈 Coverage: ${coveragePercentage}%`);

    if (this.results.foundCovers > 0) {
      console.log('\n🎉 Great progress! Cover images are being organized.');
      console.log('\n📝 Next steps:');
      console.log('1. Test the website to ensure covers display correctly');
      console.log('2. Download remaining missing covers');
      console.log('3. Run this script again after adding more covers');
      console.log('4. Consider optimizing images for web performance');
    }

    if (this.results.missingCovers > 0) {
      console.log(`\n⚠️  ${this.results.missingCovers} covers still need to be downloaded.`);
      console.log('📄 Check ALL_BOOKS_FOR_COVERS.md for the complete list.');
    }
  }
}

// Run the organizer
if (require.main === module) {
  const organizer = new CoverImageOrganizer();
  organizer.organizeCovers().catch(console.error);
}

module.exports = CoverImageOrganizer;
