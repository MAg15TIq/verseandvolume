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
      },

      // Additional classic novels
      '1984.jpg': {
        bookId: '1984',
        filePath: 'src/data/novels/authors/george-orwell/1984.ts'
      },
      'jane-eyre.jpg': {
        bookId: 'jane-eyre',
        filePath: 'src/data/novels/authors/charlotte-bronte/jane-eyre.ts'
      },
      'to-kill-a-mockingbird.jpg': {
        bookId: 'to-kill-a-mockingbird',
        filePath: 'src/data/novels/authors/harper-lee/to-kill-a-mockingbird.ts'
      },
      'the-great-gatsby.jpg': {
        bookId: 'the-great-gatsby',
        filePath: 'src/data/novels/authors/f-scott-fitzgerald/the-great-gatsby.ts'
      },
      'wuthering-heights.jpg': {
        bookId: 'wuthering-heights',
        filePath: 'src/data/novels/authors/emily-bronte/wuthering-heights.ts'
      },
      'the-bell-jar.jpg': {
        bookId: 'the-bell-jar',
        filePath: 'src/data/novels/authors/sylvia-plath/the-bell-jar.ts'
      },

      // Urdu novels - individual files
      'khuda-aur-mohabbat.webp': {
        bookId: 'khuda-aur-mohabbat',
        filePath: 'src/data/novels/authors/hashim-nadeem/khuda-aur-mohabbat.ts'
      },
      'bachpan-ka-december.jpg': {
        bookId: 'bachpan-ka-december',
        filePath: 'src/data/novels/authors/hashim-nadeem/bachpan-ka-december.ts'
      },
      'jannat-ke-pattay.jpg': {
        bookId: 'jannat-ke-pattay',
        filePath: 'src/data/novels/authors/nimra-ahmad/jannat-ke-pattay.ts'
      },
      'namal.jpg': {
        bookId: 'namal',
        filePath: 'src/data/novels/authors/nimra-ahmad/namal.ts'
      },
      'humsafar.png': {
        bookId: 'humsafar',
        filePath: 'src/data/novels/authors/farhat-ishtiaq/humsafar.ts'
      },
      'mushaf.jpg': {
        bookId: 'mushaf',
        filePath: 'src/data/novels/authors/nimra-ahmad/mushaf.ts'
      },
      'peer-e-kamil.jpg': {
        bookId: 'peer-e-kamil',
        filePath: 'src/data/novels/authors/umera-ahmed/peer-e-kamil.ts'
      },
      'raja-gidh.jpg': {
        bookId: 'raja-gidh',
        filePath: 'src/data/novels/authors/bano-qudsia/raja-gidh.ts'
      },
      'aag-ka-darya.jpg': {
        bookId: 'aag-ka-darya',
        filePath: 'src/data/novels/authors/qurratulain-hyder/aag-ka-darya.ts'
      },
      'haalim.jpg': {
        bookId: 'haalim',
        filePath: 'src/data/novels/authors/nimra-ahmad/haalim.ts'
      },
      'diyar-e-dil.jpeg': {
        bookId: 'diyar-e-dil',
        filePath: 'src/data/novels/authors/farhat-ishtiaq/diyar-e-dil.ts'
      },
      'pani-da-rang.webp': {
        bookId: 'pani-da-rang',
        filePath: 'src/data/novels/authors/nimra-ahmad/pani-da-rang.ts'
      },
      'roshan-sitara.webp': {
        bookId: 'roshan-sitara',
        filePath: 'src/data/novels/authors/nimra-ahmad/roshan-sitara.ts'
      },
      'yaqeen-e-mohabbat.jpg': {
        bookId: 'yaqeen-e-mohabbat',
        filePath: 'src/data/novels/authors/urdu-love-novels.ts'
      },
      'ishq-ka-sheen.jpg': {
        bookId: 'ishq-ka-sheen',
        filePath: 'src/data/novels/authors/urdu-love-novels.ts'
      },
      'mere-humdam-mere-dost.webp': {
        bookId: 'mere-humdam-mere-dost',
        filePath: 'src/data/novels/authors/urdu-love-novels.ts'
      },

      // Additional Urdu love novels from urdu-love-novels.ts
      'dil-ki-rani.jpg': {
        bookId: 'dil-ki-rani',
        filePath: 'src/data/novels/authors/urdu-love-novels.ts'
      },
      'mohabbat-ka-jadoo.jpg': {
        bookId: 'mohabbat-ka-jadoo',
        filePath: 'src/data/novels/authors/urdu-love-novels.ts'
      },
      'dil-ki-duniya.jpg': {
        bookId: 'dil-ki-dunya',
        filePath: 'src/data/novels/authors/urdu-love-novels.ts'
      },
      'mohabbat-ki-khushbu-story.jpeg': {
        bookId: 'mohabbat-ki-khushbu',
        filePath: 'src/data/novels/authors/urdu-love-novels.ts'
      },
      'dil-ki-khushbu-story.jpg': {
        bookId: 'dil-ki-khushbu',
        filePath: 'src/data/novels/authors/urdu-love-novels.ts'
      },
      'mohabbat-ka-imtihan.jpg': {
        bookId: 'mohabbat-ka-imtihan',
        filePath: 'src/data/novels/authors/urdu-love-novels.ts'
      },
      'mohabbat-ka-imtihan-story.webp': {
        bookId: 'mohabbat-ka-imtihan',
        filePath: 'src/data/novels/authors/urdu-love-novels.ts'
      },
      'ishq-ki-inteha.jpg': {
        bookId: 'ishq-ki-inteha',
        filePath: 'src/data/novels/authors/urdu-love-novels.ts'
      },
      'mohabbat-ki-yaad.webp': {
        bookId: 'mohabbat-ki-yaad',
        filePath: 'src/data/novels/authors/urdu-love-novels.ts'
      },
      'dil-ki-awaaz.jpg': {
        bookId: 'dil-ki-awaaz',
        filePath: 'src/data/novels/authors/urdu-love-novels.ts'
      },
      'dil-ki-awaz.jpg': {
        bookId: 'dil-ki-awaz',
        filePath: 'src/data/novels/authors/urdu-love-novels.ts'
      },
      'mohabbat-ki-dhup.jpg': {
        bookId: 'mohabbat-ki-dhup',
        filePath: 'src/data/novels/authors/urdu-love-novels.ts'
      },
      'ishq-ki-khushi.jpg': {
        bookId: 'ishq-ki-khushi',
        filePath: 'src/data/novels/authors/urdu-love-novels.ts'
      },
      'mohabbat-ki-raah.jpg': {
        bookId: 'mohabbat-ki-raah',
        filePath: 'src/data/novels/authors/urdu-love-novels.ts'
      },
      'dil-ki-dastan.jpg': {
        bookId: 'dil-ki-dastan',
        filePath: 'src/data/novels/authors/urdu-love-novels.ts'
      },
      'mohabbat-ki-geet.jpg': {
        bookId: 'mohabbat-ki-geet',
        filePath: 'src/data/novels/authors/urdu-love-novels.ts'
      },
      'ishq-ki-baarsh.jpg': {
        bookId: 'ishq-ki-baarsh',
        filePath: 'src/data/novels/authors/urdu-love-novels.ts'
      },
      'mohabbat-ki-shaam.jpg': {
        bookId: 'mohabbat-ki-shaam',
        filePath: 'src/data/novels/authors/urdu-love-novels.ts'
      },
      'dil-ki-tasveen.jpg': {
        bookId: 'dil-ki-tasveen',
        filePath: 'src/data/novels/authors/urdu-love-novels.ts'
      },
      'mohabbat-ki-raat.jpg': {
        bookId: 'mohabbat-ki-raat',
        filePath: 'src/data/novels/authors/urdu-love-novels.ts'
      },
      'ishq-ki-umang.jpg': {
        bookId: 'ishq-ki-umang',
        filePath: 'src/data/novels/authors/urdu-love-novels.ts'
      },
      'mohabbat-ki-sada.jpg': {
        bookId: 'mohabbat-ki-sada',
        filePath: 'src/data/novels/authors/urdu-love-novels.ts'
      },
      'dil-ki-rahat.jpg': {
        bookId: 'dil-ki-rahat',
        filePath: 'src/data/novels/authors/urdu-love-novels.ts'
      },
      'mohabbat-ki-hawa.jpg': {
        bookId: 'mohabbat-ki-hawa',
        filePath: 'src/data/novels/authors/urdu-love-novels.ts'
      },
      'ishq-ki-kitab.jpg': {
        bookId: 'ishq-ki-kitab',
        filePath: 'src/data/novels/authors/urdu-love-novels.ts'
      },
      'mohabbat-ki-chay.jpg': {
        bookId: 'mohabbat-ki-chay',
        filePath: 'src/data/novels/authors/urdu-love-novels.ts'
      },
      'dil-ki-thandak.jpg': {
        bookId: 'dil-ki-thandak',
        filePath: 'src/data/novels/authors/urdu-love-novels.ts'
      },
      'mohabbat-ki-aasha.jpg': {
        bookId: 'mohabbat-ki-aasha',
        filePath: 'src/data/novels/authors/urdu-love-novels.ts'
      },
      'ishq-ki-subah.webp': {
        bookId: 'ishq-ki-subah',
        filePath: 'src/data/novels/authors/urdu-love-novels.ts'
      },
      'mohabbat-ki-jeet.jpg': {
        bookId: 'mohabbat-ki-jeet',
        filePath: 'src/data/novels/authors/urdu-love-novels.ts'
      },
      'dil-se-dil-tak.jpg': {
        bookId: 'dil-se-dil-tak',
        filePath: 'src/data/novels/authors/urdu-love-novels.ts'
      },
      'mohabbat-ka-qarz.jpg': {
        bookId: 'mohabbat-ka-qarz',
        filePath: 'src/data/novels/authors/urdu-love-novels.ts'
      },
      'ishq-ki-manzil.webp': {
        bookId: 'ishq-ki-manzil',
        filePath: 'src/data/novels/authors/urdu-love-novels.ts'
      },
      'mohabbat-ki-pehli-nishani.jpg': {
        bookId: 'mohabbat-ki-pehli-nishani',
        filePath: 'src/data/novels/authors/urdu-love-novels.ts'
      },
      'dil-ki-mithaasi.png': {
        bookId: 'dil-ki-mithaasi',
        filePath: 'src/data/novels/authors/urdu-love-novels.ts'
      },
      'dil-ki-khwahish.webp': {
        bookId: 'dil-ki-khwahish',
        filePath: 'src/data/novels/authors/urdu-love-novels.ts'
      },
      'ishq-e-haqeeqi.jpg': {
        bookId: 'ishq-e-haqeeqi',
        filePath: 'src/data/novels/authors/urdu-love-novels.ts'
      },
      'ishq-mein-terey.webp': {
        bookId: 'ishq-mein-terey',
        filePath: 'src/data/novels/authors/urdu-love-novels.ts'
      },
      'ishq-zahe-naseeb.jpg': {
        bookId: 'ishq-zahe-naseeb',
        filePath: 'src/data/novels/authors/urdu-love-novels.ts'
      },
      'mohabbat-subh-ka-sitara-hai.webp': {
        bookId: 'mohabbat-subh-ka-sitara-hai',
        filePath: 'src/data/novels/authors/urdu-love-novels.ts'
      },
      'kuch-ishq-tha-kuch-majazi.jpg': {
        bookId: 'kuch-ishq-tha-kuch-majazi',
        filePath: 'src/data/novels/authors/urdu-love-novels.ts'
      },
      'mata-e-jaan-hai-tu.jpg': {
        bookId: 'mata-e-jaan-hai-tu',
        filePath: 'src/data/novels/authors/urdu-love-novels.ts'
      },
      'khwabon-ka-raja.jpg': {
        bookId: 'khwabon-ka-raja',
        filePath: 'src/data/novels/authors/urdu-love-novels.ts'
      },
      'gumshuda-caravan.jpg': {
        bookId: 'gumshuda-caravan',
        filePath: 'src/data/novels/authors/urdu-love-novels.ts'
      },
      'chand-sitaron-ka-mela.jpg': {
        bookId: 'chand-sitaron-ka-mela',
        filePath: 'src/data/novels/authors/urdu-love-novels.ts'
      },
      'sitaron-ki-malka.webp': {
        bookId: 'sitaron-ki-malka',
        filePath: 'src/data/novels/authors/urdu-love-novels.ts'
      },

      // Prose and excerpt covers
      'emerson-self-reliance.jpg': {
        bookId: 'emerson-self-reliance',
        filePath: 'src/data/prose/authors/ralph-waldo-emerson/self-reliance.ts'
      },
      'thoreau-walden-excerpts.jpg': {
        bookId: 'thoreau-walden-excerpts',
        filePath: 'src/data/prose/authors/henry-david-thoreau/walden-excerpts.ts'
      },
      'wilde-picture-dorian-gray-excerpts.jpg': {
        bookId: 'wilde-picture-dorian-gray-excerpts',
        filePath: 'src/data/prose/authors/oscar-wilde/picture-dorian-gray-excerpts.ts'
      },
      'manto-khol-do.jpg': {
        bookId: 'manto-khol-do',
        filePath: 'src/data/prose/authors/saadat-hasan-manto/khol-do.ts'
      },
      'ashfaq-zavia-excerpts.jpg': {
        bookId: 'ashfaq-zavia-excerpts',
        filePath: 'src/data/prose/authors/ashfaq-ahmed/zavia-excerpts.ts'
      },
      'qudsia-amar-bail.webp': {
        bookId: 'qudsia-amar-bail',
        filePath: 'src/data/prose/authors/bano-qudsia/amar-bail.ts'
      },
      'qudsia-footpath-ki-ghaa.jpg': {
        bookId: 'qudsia-footpath-ki-ghaa',
        filePath: 'src/data/prose/authors/bano-qudsia/footpath-ki-ghaa.ts'
      },

      // Additional English novels
      'the-invisible-bridge.jpg': {
        bookId: 'the-invisible-bridge',
        filePath: 'src/data/novels/authors/english-love-novels.ts'
      },
      'the-paris-library.jpg': {
        bookId: 'the-paris-library',
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

      // Additional classic novels
      { id: '1984', title: '1984', category: 'Classic English Literature' },
      { id: 'jane-eyre', title: 'Jane Eyre', category: 'Classic English Literature' },
      { id: 'to-kill-a-mockingbird', title: 'To Kill a Mockingbird', category: 'Classic English Literature' },
      { id: 'the-great-gatsby', title: 'The Great Gatsby', category: 'Classic English Literature' },
      { id: 'wuthering-heights', title: 'Wuthering Heights', category: 'Classic English Literature' },
      { id: 'the-bell-jar', title: 'The Bell Jar', category: 'Classic English Literature' },

      // Urdu novels - individual files
      { id: 'khuda-aur-mohabbat', title: 'خدا اور محبت', category: 'Urdu Love Novels' },
      { id: 'bachpan-ka-december', title: 'بچپن کا دسمبر', category: 'Urdu Love Novels' },
      { id: 'jannat-ke-pattay', title: 'جنت کے پتے', category: 'Urdu Love Novels' },
      { id: 'namal', title: 'نمل', category: 'Urdu Love Novels' },
      { id: 'humsafar', title: 'ہمسفر', category: 'Urdu Love Novels' },
      { id: 'mushaf', title: 'مصحف', category: 'Urdu Love Novels' },
      { id: 'peer-e-kamil', title: 'پیر کامل', category: 'Urdu Classic Literature' },
      { id: 'raja-gidh', title: 'راجہ گدھ', category: 'Urdu Classic Literature' },
      { id: 'aag-ka-darya', title: 'آگ کا دریا', category: 'Urdu Classic Literature' },
      { id: 'haalim', title: 'حالم', category: 'Urdu Love Novels' },
      { id: 'diyar-e-dil', title: 'دیار دل', category: 'Urdu Love Novels' },
      { id: 'pani-da-rang', title: 'پانی دا رنگ', category: 'Urdu Love Novels' },
      { id: 'roshan-sitara', title: 'روشن ستارہ', category: 'Urdu Love Novels' },

      // Urdu love novels from urdu-love-novels.ts
      { id: 'yaqeen-e-mohabbat', title: 'یقین محبت', category: 'Urdu Love Novels' },
      { id: 'ishq-ka-sheen', title: 'عشق کا شین', category: 'Urdu Love Novels' },
      { id: 'mere-humdam-mere-dost', title: 'میرے ہمدم میرے دوست', category: 'Urdu Love Novels' },
      { id: 'dil-ki-rani', title: 'دل کی رانی', category: 'Urdu Love Novels' },
      { id: 'mohabbat-ka-jadoo', title: 'محبت کا جادو', category: 'Urdu Love Novels' },
      { id: 'dil-ki-dunya', title: 'دل کی دنیا', category: 'Urdu Love Novels' },
      { id: 'mohabbat-ki-khushbu', title: 'محبت کی خوشبو', category: 'Urdu Love Novels' },
      { id: 'dil-ki-khushbu', title: 'دل کی خوشبو', category: 'Urdu Love Novels' },
      { id: 'mohabbat-ka-imtihan', title: 'محبت کا امتحان', category: 'Urdu Love Novels' },
      { id: 'ishq-ki-inteha', title: 'عشق کی انتہا', category: 'Urdu Love Novels' },
      { id: 'mohabbat-ki-yaad', title: 'محبت کی یاد', category: 'Urdu Love Novels' },
      { id: 'dil-ki-awaaz', title: 'دل کی آواز', category: 'Urdu Love Novels' },
      { id: 'dil-ki-awaz', title: 'دل کی آواز', category: 'Urdu Love Novels' },
      { id: 'mohabbat-ki-dhup', title: 'محبت کی دھوپ', category: 'Urdu Love Novels' },
      { id: 'ishq-ki-khushi', title: 'عشق کی خوشی', category: 'Urdu Love Novels' },
      { id: 'mohabbat-ki-raah', title: 'محبت کی راہ', category: 'Urdu Love Novels' },
      { id: 'dil-ki-dastan', title: 'دل کی داستان', category: 'Urdu Love Novels' },
      { id: 'mohabbat-ki-geet', title: 'محبت کی گیت', category: 'Urdu Love Novels' },
      { id: 'ishq-ki-baarsh', title: 'عشق کی بارش', category: 'Urdu Love Novels' },
      { id: 'mohabbat-ki-shaam', title: 'محبت کی شام', category: 'Urdu Love Novels' },
      { id: 'dil-ki-tasveen', title: 'دل کی تصویر', category: 'Urdu Love Novels' },
      { id: 'mohabbat-ki-raat', title: 'محبت کی رات', category: 'Urdu Love Novels' },
      { id: 'ishq-ki-umang', title: 'عشق کی امنگ', category: 'Urdu Love Novels' },
      { id: 'mohabbat-ki-sada', title: 'محبت کی صدا', category: 'Urdu Love Novels' },
      { id: 'dil-ki-rahat', title: 'دل کی راحت', category: 'Urdu Love Novels' },
      { id: 'mohabbat-ki-hawa', title: 'محبت کی ہوا', category: 'Urdu Love Novels' },
      { id: 'ishq-ki-kitab', title: 'عشق کی کتاب', category: 'Urdu Love Novels' },
      { id: 'mohabbat-ki-chay', title: 'محبت کی چائے', category: 'Urdu Love Novels' },
      { id: 'dil-ki-thandak', title: 'دل کی ٹھنڈک', category: 'Urdu Love Novels' },
      { id: 'mohabbat-ki-aasha', title: 'محبت کی آشا', category: 'Urdu Love Novels' },
      { id: 'ishq-ki-subah', title: 'عشق کی صبح', category: 'Urdu Love Novels' },
      { id: 'mohabbat-ki-jeet', title: 'محبت کی جیت', category: 'Urdu Love Novels' },
      { id: 'dil-se-dil-tak', title: 'دل سے دل تک', category: 'Urdu Love Novels' },
      { id: 'mohabbat-ka-qarz', title: 'محبت کا قرض', category: 'Urdu Love Novels' },
      { id: 'ishq-ki-manzil', title: 'عشق کی منزل', category: 'Urdu Love Novels' },
      { id: 'mohabbat-ki-pehli-nishani', title: 'محبت کی پہلی نشانی', category: 'Urdu Love Novels' },
      { id: 'dil-ki-mithaasi', title: 'دل کی مٹھاس', category: 'Urdu Love Novels' },
      { id: 'dil-ki-khwahish', title: 'دل کی خواہش', category: 'Urdu Love Novels' },
      { id: 'ishq-e-haqeeqi', title: 'عشق حقیقی', category: 'Urdu Love Novels' },
      { id: 'ishq-mein-terey', title: 'عشق میں تیرے', category: 'Urdu Love Novels' },
      { id: 'ishq-zahe-naseeb', title: 'عشق ظاہر نصیب', category: 'Urdu Love Novels' },
      { id: 'mohabbat-subh-ka-sitara-hai', title: 'محبت صبح کا ستارہ ہے', category: 'Urdu Love Novels' },
      { id: 'kuch-ishq-tha-kuch-majazi', title: 'کچھ عشق تھا کچھ مجازی', category: 'Urdu Love Novels' },
      { id: 'mata-e-jaan-hai-tu', title: 'متاع جان ہے تو', category: 'Urdu Love Novels' },
      { id: 'khwabon-ka-raja', title: 'خوابوں کا راجا', category: 'Urdu Love Novels' },
      { id: 'gumshuda-caravan', title: 'گمشدہ کارواں', category: 'Urdu Love Novels' },
      { id: 'chand-sitaron-ka-mela', title: 'چاند ستاروں کا میلہ', category: 'Urdu Love Novels' },
      { id: 'sitaron-ki-malka', title: 'ستاروں کی ملکہ', category: 'Urdu Love Novels' },

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
      { id: 'outlander', title: 'Outlander', category: 'Historical Romance' },
      { id: 'the-invisible-bridge', title: 'The Invisible Bridge', category: 'Contemporary Fiction' },
      { id: 'the-paris-library', title: 'The Paris Library', category: 'Historical Fiction' },

      // Prose and excerpts
      { id: 'emerson-self-reliance', title: 'Self-Reliance by Emerson', category: 'Prose' },
      { id: 'thoreau-walden-excerpts', title: 'Walden Excerpts by Thoreau', category: 'Prose' },
      { id: 'wilde-picture-dorian-gray-excerpts', title: 'Picture of Dorian Gray Excerpts', category: 'Prose' },
      { id: 'manto-khol-do', title: 'کھول دو by Manto', category: 'Urdu Prose' },
      { id: 'ashfaq-zavia-excerpts', title: 'زاویہ Excerpts by Ashfaq Ahmed', category: 'Urdu Prose' },
      { id: 'qudsia-amar-bail', title: 'امر بیل by Bano Qudsia', category: 'Urdu Prose' },
      { id: 'qudsia-footpath-ki-ghaa', title: 'فٹ پاتھ کی گھاس by Bano Qudsia', category: 'Urdu Prose' }
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

      if (filePath.includes('english-love-novels.ts') || filePath.includes('urdu-love-novels.ts')) {
        // Handle multiple book exports in english-love-novels.ts and urdu-love-novels.ts
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
