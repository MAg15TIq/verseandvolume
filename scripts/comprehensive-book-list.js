#!/usr/bin/env node

/**
 * Comprehensive Book List Generator
 *
 * This script generates a complete list of all books and novels in the website
 * for manual cover image download and organization.
 */

const fs = require('fs');
const path = require('path');

class ComprehensiveBookList {
  constructor() {
    this.allBooks = [];
    this.outputFile = path.join(process.cwd(), 'ALL_BOOKS_FOR_COVERS.md');
  }

  generateCompleteList() {
    console.log('📚 Generating comprehensive book list for cover downloads...\n');

    // Add all books from different categories
    this.addClassicEnglishNovels();
    this.addContemporaryRomanceNovels();
    this.addUrduClassicNovels();
    this.addUrduLoveNovels();
    this.addAdditionalUrduNovels();
    this.addLoveStories();
    this.addProseWorks();
    this.addLegacyBooks();

    // Generate markdown file
    this.generateMarkdownFile();

    console.log(`✅ Generated complete list with ${this.allBooks.length} books`);
    console.log(`📄 Saved to: ${this.outputFile}`);
  }

  addClassicEnglishNovels() {
    const classics = [
      {
        id: 'pride-and-prejudice',
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        language: 'en',
        category: 'Classic English Literature'
      },
      {
        id: 'alice-adventures-in-wonderland',
        title: "Alice's Adventures in Wonderland",
        author: 'Lewis Carroll',
        language: 'en',
        category: 'Classic English Literature'
      },
      {
        id: 'crime-and-punishment-dostoevsky',
        title: 'Crime and Punishment',
        author: 'Fyodor Dostoevsky',
        language: 'en',
        category: 'Classic English Literature'
      }
    ];

    this.allBooks.push(...classics);
  }

  addContemporaryRomanceNovels() {
    const romance = [
      // Nicholas Sparks novels
      {
        id: 'the-notebook',
        title: 'The Notebook',
        author: 'Nicholas Sparks',
        language: 'en',
        category: 'Contemporary Romance'
      },
      {
        id: 'a-walk-to-remember',
        title: 'A Walk to Remember',
        author: 'Nicholas Sparks',
        language: 'en',
        category: 'Contemporary Romance'
      },
      // Other popular romance
      {
        id: 'me-before-you',
        title: 'Me Before You',
        author: 'Jojo Moyes',
        language: 'en',
        category: 'Contemporary Romance'
      },
      {
        id: 'outlander',
        title: 'Outlander',
        author: 'Diana Gabaldon',
        language: 'en',
        category: 'Contemporary Romance'
      },
      {
        id: 'the-time-travelers-wife',
        title: "The Time Traveler's Wife",
        author: 'Audrey Niffenegger',
        language: 'en',
        category: 'Contemporary Romance'
      },
      {
        id: 'it-ends-with-us',
        title: 'It Ends with Us',
        author: 'Colleen Hoover',
        language: 'en',
        category: 'Contemporary Romance'
      },
      {
        id: 'the-kiss-quotient',
        title: 'The Kiss Quotient',
        author: 'Helen Hoang',
        language: 'en',
        category: 'Contemporary Romance'
      },
      {
        id: 'red-white-and-royal-blue',
        title: 'Red, White & Royal Blue',
        author: 'Casey McQuiston',
        language: 'en',
        category: 'Contemporary Romance'
      },
      {
        id: 'the-seven-husbands-of-evelyn-hugo',
        title: 'The Seven Husbands of Evelyn Hugo',
        author: 'Taylor Jenkins Reid',
        language: 'en',
        category: 'Contemporary Romance'
      },
      {
        id: 'beach-read',
        title: 'Beach Read',
        author: 'Emily Henry',
        language: 'en',
        category: 'Contemporary Romance'
      },
      {
        id: 'the-hating-game',
        title: 'The Hating Game',
        author: 'Sally Thorne',
        language: 'en',
        category: 'Contemporary Romance'
      },
      {
        id: 'eleanor-oliphant-is-completely-fine',
        title: 'Eleanor Oliphant Is Completely Fine',
        author: 'Gail Honeyman',
        language: 'en',
        category: 'Contemporary Romance'
      },
      {
        id: 'the-unhoneymooners',
        title: 'The Unhoneymooners',
        author: 'Christina Lauren',
        language: 'en',
        category: 'Contemporary Romance'
      },
      {
        id: 'the-spanish-love-deception',
        title: 'The Spanish Love Deception',
        author: 'Elena Armas',
        language: 'en',
        category: 'Contemporary Romance'
      },
      {
        id: 'people-we-meet-on-vacation',
        title: 'People We Meet on Vacation',
        author: 'Emily Henry',
        language: 'en',
        category: 'Contemporary Romance'
      },
      {
        id: 'the-flatshare',
        title: 'The Flatshare',
        author: 'Beth O\'Leary',
        language: 'en',
        category: 'Contemporary Romance'
      },
      {
        id: 'the-kiss-of-deception',
        title: 'The Kiss of Deception',
        author: 'Mary E. Pearson',
        language: 'en',
        category: 'Contemporary Romance'
      },
      {
        id: 'the-wall-of-winnipeg-and-me',
        title: 'The Wall of Winnipeg and Me',
        author: 'Mariana Zapata',
        language: 'en',
        category: 'Contemporary Romance'
      },
      {
        id: 'the-simple-wild',
        title: 'The Simple Wild',
        author: 'K.A. Tucker',
        language: 'en',
        category: 'Contemporary Romance'
      },
      {
        id: 'the-kiss-thief',
        title: 'The Kiss Thief',
        author: 'L.J. Shen',
        language: 'en',
        category: 'Contemporary Romance'
      },
      {
        id: 'the-seven-moons-of-maali-almeida',
        title: 'The Seven Moons of Maali Almeida',
        author: 'Shehan Karunatilaka',
        language: 'en',
        category: 'Contemporary Romance'
      },
      {
        id: 'the-invisible-life-of-addie-larue',
        title: 'The Invisible Life of Addie LaRue',
        author: 'V.E. Schwab',
        language: 'en',
        category: 'Contemporary Romance'
      },
      {
        id: 'the-house-in-the-cerulean-sea',
        title: 'The House in the Cerulean Sea',
        author: 'TJ Klune',
        language: 'en',
        category: 'Contemporary Romance'
      },
      {
        id: 'book-lovers',
        title: 'Book Lovers',
        author: 'Emily Henry',
        language: 'en',
        category: 'Contemporary Romance'
      },
      {
        id: 'the-seven-year-slip',
        title: 'The Seven Year Slip',
        author: 'Ashley Poston',
        language: 'en',
        category: 'Contemporary Romance'
      },
      {
        id: 'the-atlas-of-us',
        title: 'The Atlas of Us',
        author: 'Kristen Zimmer',
        language: 'en',
        category: 'Contemporary Romance'
      },
      {
        id: 'the-romance-recipe',
        title: 'The Romance Recipe',
        author: 'Ruby Barrett',
        language: 'en',
        category: 'Contemporary Romance'
      },
      {
        id: 'the-very-secret-society-of-irregular-witches',
        title: 'The Very Secret Society of Irregular Witches',
        author: 'Sangu Mandanna',
        language: 'en',
        category: 'Contemporary Romance'
      },
      {
        id: 'the-star-crossed-sisters-of-tuscany',
        title: 'The Star-Crossed Sisters of Tuscany',
        author: 'Lori Nelson Spielman',
        language: 'en',
        category: 'Contemporary Romance'
      },
      {
        id: 'the-unlikely-pilgrimage-of-harold-fry',
        title: 'The Unlikely Pilgrimage of Harold Fry',
        author: 'Rachel Joyce',
        language: 'en',
        category: 'Contemporary Romance'
      },
      {
        id: 'the-guest-list',
        title: 'The Guest List',
        author: 'Lucy Foley',
        language: 'en',
        category: 'Contemporary Romance'
      },
      {
        id: 'the-paris-library',
        title: 'The Paris Library',
        author: 'Janet Skeslien Charles',
        language: 'en',
        category: 'Contemporary Romance'
      },
      {
        id: 'the-invisible-bridge',
        title: 'The Invisible Bridge',
        author: 'Julie Orringer',
        language: 'en',
        category: 'Contemporary Romance'
      }
    ];

    this.allBooks.push(...romance);
  }

  addUrduClassicNovels() {
    const urduClassics = [
      {
        id: 'raja-gidh',
        title: 'راجہ گدھ',
        author: 'Bano Qudsia',
        language: 'ur',
        category: 'Urdu Classic Literature'
      },
      {
        id: 'aag-ka-darya',
        title: 'آگ کا دریا',
        author: 'Qurratulain Hyder',
        language: 'ur',
        category: 'Urdu Classic Literature'
      },
      {
        id: 'peer-e-kamil',
        title: 'پیر کامل',
        author: 'Umera Ahmed',
        language: 'ur',
        category: 'Urdu Classic Literature'
      }
    ];

    this.allBooks.push(...urduClassics);
  }

  addUrduLoveNovels() {
    const urduLove = [
      {
        id: 'khuda-aur-mohabbat',
        title: 'خدا اور محبت',
        author: 'Hashim Nadeem',
        language: 'ur',
        category: 'Urdu Love Novels'
      },
      {
        id: 'bachpan-ka-december',
        title: 'بچپن کا دسمبر',
        author: 'Hashim Nadeem',
        language: 'ur',
        category: 'Urdu Love Novels'
      },
      {
        id: 'jannat-ke-pattay',
        title: 'جنت کے پتے',
        author: 'Nimra Ahmed',
        language: 'ur',
        category: 'Urdu Love Novels'
      },
      {
        id: 'namal',
        title: 'نمل',
        author: 'Nimra Ahmed',
        language: 'ur',
        category: 'Urdu Love Novels'
      },
      {
        id: 'humsafar',
        title: 'ہمسفر',
        author: 'Farhat Ishtiaq',
        language: 'ur',
        category: 'Urdu Love Novels'
      },
      {
        id: 'mushaf',
        title: 'مصحف',
        author: 'Nimra Ahmed',
        language: 'ur',
        category: 'Urdu Love Novels'
      },
      {
        id: 'pani-da-rang',
        title: 'پانی دا رنگ',
        author: 'Hashim Nadeem',
        language: 'ur',
        category: 'Urdu Love Novels'
      },
      {
        id: 'roshan-sitara',
        title: 'روشن ستارہ',
        author: 'Hashim Nadeem',
        language: 'ur',
        category: 'Urdu Love Novels'
      },
      {
        id: 'haalim',
        title: 'حالم',
        author: 'Nimra Ahmed',
        language: 'ur',
        category: 'Urdu Love Novels'
      },
      {
        id: 'diyar-e-dil',
        title: 'دیار دل',
        author: 'Farhat Ishtiaq',
        language: 'ur',
        category: 'Urdu Love Novels'
      }
    ];

    this.allBooks.push(...urduLove);
  }

  addAdditionalUrduNovels() {
    // Comprehensive list of additional Urdu novels from the website
    const additional = [
      // Effat Sehar novels
      {
        id: 'mere-humdam-mere-dost',
        title: 'میرے ہمدم میرے دوست',
        author: 'Effat Sehar',
        language: 'ur',
        category: 'Additional Urdu Novels'
      },
      {
        id: 'kuch-ishq-tha-kuch-majazi',
        title: 'کچھ عشق تھا کچھ مجازی',
        author: 'Effat Sehar',
        language: 'ur',
        category: 'Additional Urdu Novels'
      },
      // Amna Riaz novels
      {
        id: 'dil-se-dil-tak',
        title: 'دل سے دل تک',
        author: 'Amna Riaz',
        language: 'ur',
        category: 'Additional Urdu Novels'
      },
      // Additional Urdu love novels (from additional-novels.ts)
      {
        id: 'yaqeen-e-mohabbat',
        title: 'یقین محبت',
        author: 'Effat Sehar',
        language: 'ur',
        category: 'Additional Urdu Novels'
      },
      {
        id: 'ishq-ka-sheen',
        title: 'عشق کا شین',
        author: 'Amna Riaz',
        language: 'ur',
        category: 'Additional Urdu Novels'
      },
      {
        id: 'mohabbat-subh-ka-sitara-hai',
        title: 'محبت صبح کا ستارہ ہے',
        author: 'Nadia Hussain',
        language: 'ur',
        category: 'Additional Urdu Novels'
      },
      {
        id: 'ishq-zahe-naseeb',
        title: 'عشق ضاہے نصیب',
        author: 'Saba Qamar',
        language: 'ur',
        category: 'Additional Urdu Novels'
      },
      {
        id: 'ishq-mein-terey',
        title: 'عشق میں تیرے',
        author: 'Farah Khan',
        language: 'ur',
        category: 'Additional Urdu Novels'
      },
      {
        id: 'mata-e-jaan-hai-tu',
        title: 'متاع جان ہے تو',
        author: 'Zara Sheikh',
        language: 'ur',
        category: 'Additional Urdu Novels'
      },
      {
        id: 'mohabbat-ki-raah',
        title: 'محبت کی راہ',
        author: 'Ayesha Khan',
        language: 'ur',
        category: 'Additional Urdu Novels'
      },
      {
        id: 'ishq-e-haqeeqi',
        title: 'عشق حقیقی',
        author: 'Maryam Ali',
        language: 'ur',
        category: 'Additional Urdu Novels'
      },
      {
        id: 'dil-ki-dastan',
        title: 'دل کی داستان',
        author: 'Samina Ahmed',
        language: 'ur',
        category: 'Additional Urdu Novels'
      },
      {
        id: 'mohabbat-ka-imtihan',
        title: 'محبت کا امتحان',
        author: 'Rubina Ashraf',
        language: 'ur',
        category: 'Additional Urdu Novels'
      },
      {
        id: 'ishq-ki-inteha',
        title: 'عشق کی انتہا',
        author: 'Saira Khan',
        language: 'ur',
        category: 'Additional Urdu Novels'
      },
      {
        id: 'mohabbat-ki-jeet',
        title: 'محبت کی جیت',
        author: 'Hina Altaf',
        language: 'ur',
        category: 'Additional Urdu Novels'
      },
      {
        id: 'dil-ki-awaaz',
        title: 'دل کی آواز',
        author: 'Iqra Aziz',
        language: 'ur',
        category: 'Additional Urdu Novels'
      },
      {
        id: 'ishq-ki-manzil',
        title: 'عشق کی منزل',
        author: 'Yumna Zaidi',
        language: 'ur',
        category: 'Additional Urdu Novels'
      },
      {
        id: 'mohabbat-ka-qarz',
        title: 'محبت کا قرض',
        author: 'Sajal Aly',
        language: 'ur',
        category: 'Additional Urdu Novels'
      },
      {
        id: 'ishq-ki-khushi',
        title: 'عشق کی خوشی',
        author: 'Mahira Khan',
        language: 'ur',
        category: 'Additional Urdu Novels'
      },
      {
        id: 'mohabbat-ki-shaam',
        title: 'محبت کی شام',
        author: 'Saba Qamar',
        language: 'ur',
        category: 'Additional Urdu Novels'
      },
      {
        id: 'dil-ki-rahat',
        title: 'دل کی راحت',
        author: 'Ayeza Khan',
        language: 'ur',
        category: 'Additional Urdu Novels'
      },
      {
        id: 'ishq-ki-subah',
        title: 'عشق کی صبح',
        author: 'Maya Ali',
        language: 'ur',
        category: 'Additional Urdu Novels'
      },
      {
        id: 'mohabbat-ki-raat',
        title: 'محبت کی رات',
        author: 'Kinza Hashmi',
        language: 'ur',
        category: 'Additional Urdu Novels'
      }
    ];

    this.allBooks.push(...additional);
  }

  addLoveStories() {
    // Comprehensive love stories collection (45 total from the website)
    const stories = [
      {
        id: 'mohabbat-ki-pehli-nishani',
        title: 'محبت کی پہلی نشانی',
        author: 'Amna Riaz',
        language: 'ur',
        category: 'Love Stories'
      },
      {
        id: 'dil-ki-awaz',
        title: 'دل کی آواز',
        author: 'Amna Riaz',
        language: 'ur',
        category: 'Love Stories'
      },
      {
        id: 'chand-sitaron-ka-mela',
        title: 'چاند ستاروں کا میلہ',
        author: 'Effat Sehar',
        language: 'ur',
        category: 'Love Stories'
      },
      {
        id: 'khwabon-ka-raja',
        title: 'خوابوں کا راجا',
        author: 'Nadia Hussain',
        language: 'ur',
        category: 'Love Stories'
      },
      {
        id: 'mohabbat-ka-imtihan-story',
        title: 'محبت کا امتحان',
        author: 'Saba Qamar',
        language: 'ur',
        category: 'Love Stories'
      },
      {
        id: 'dil-ki-rani',
        title: 'دل کی رانی',
        author: 'Farah Khan',
        language: 'ur',
        category: 'Love Stories'
      },
      {
        id: 'mohabbat-ki-sada',
        title: 'محبت کی صدا',
        author: 'Zara Sheikh',
        language: 'ur',
        category: 'Love Stories'
      },
      {
        id: 'gumshuda-caravan',
        title: 'گمشدہ کارواں',
        author: 'Ayesha Khan',
        language: 'ur',
        category: 'Love Stories'
      },
      {
        id: 'sitaron-ki-malka',
        title: 'ستاروں کی ملکہ',
        author: 'Effat Sehar',
        language: 'ur',
        category: 'Love Stories'
      },
      {
        id: 'mohabbat-ka-jadoo',
        title: 'محبت کا جادو',
        author: 'Maryam Ali',
        language: 'ur',
        category: 'Love Stories'
      },
      {
        id: 'dil-ki-duniya',
        title: 'دل کی دنیا',
        author: 'Samina Ahmed',
        language: 'ur',
        category: 'Love Stories'
      },
      {
        id: 'mohabbat-ki-khushbu-story',
        title: 'محبت کی خوشبو',
        author: 'Rubina Ashraf',
        language: 'ur',
        category: 'Love Stories'
      },
      {
        id: 'dil-ki-tasveen',
        title: 'دل کی تصویر',
        author: 'Saira Khan',
        language: 'ur',
        category: 'Love Stories'
      },
      {
        id: 'mohabbat-ki-geet',
        title: 'محبت کی گیت',
        author: 'Hina Altaf',
        language: 'ur',
        category: 'Love Stories'
      },
      {
        id: 'ishq-ki-kitab',
        title: 'عشق کی کتاب',
        author: 'Iqra Aziz',
        language: 'ur',
        category: 'Love Stories'
      },
      {
        id: 'mohabbat-ki-chay',
        title: 'محبت کی چائے',
        author: 'Yumna Zaidi',
        language: 'ur',
        category: 'Love Stories'
      },
      {
        id: 'dil-ki-mithaasi',
        title: 'دل کی مٹھاس',
        author: 'Sajal Aly',
        language: 'ur',
        category: 'Love Stories'
      },
      {
        id: 'mohabbat-ki-hawa',
        title: 'محبت کی ہوا',
        author: 'Mahira Khan',
        language: 'ur',
        category: 'Love Stories'
      },
      {
        id: 'ishq-ki-baarsh',
        title: 'عشق کی بارش',
        author: 'Saba Qamar',
        language: 'ur',
        category: 'Love Stories'
      },
      {
        id: 'mohabbat-ki-dhup',
        title: 'محبت کی دھوپ',
        author: 'Ayeza Khan',
        language: 'ur',
        category: 'Love Stories'
      },
      {
        id: 'dil-ki-khwahish',
        title: 'دل کی خواہش',
        author: 'Maya Ali',
        language: 'ur',
        category: 'Love Stories'
      },
      {
        id: 'mohabbat-ki-yaad',
        title: 'محبت کی یاد',
        author: 'Kinza Hashmi',
        language: 'ur',
        category: 'Love Stories'
      },
      {
        id: 'ishq-ki-umang',
        title: 'عشق کی امنگ',
        author: 'Neelam Muneer',
        language: 'ur',
        category: 'Love Stories'
      },
      {
        id: 'mohabbat-ki-aasha',
        title: 'محبت کی آشا',
        author: 'Aiman Khan',
        language: 'ur',
        category: 'Love Stories'
      },
      {
        id: 'dil-ki-thandak',
        title: 'دل کی ٹھنڈک',
        author: 'Minal Khan',
        language: 'ur',
        category: 'Love Stories'
      },
      {
        id: 'dil-ki-khushbu-story',
        title: 'دل کی خوشبو',
        author: 'Nadia Hussain',
        language: 'ur',
        category: 'Love Stories'
      }
    ];

    this.allBooks.push(...stories);
  }

  addProseWorks() {
    const prose = [
      // Urdu prose works
      {
        id: 'qudsia-amar-bail',
        title: 'امر بیل',
        author: 'Bano Qudsia',
        language: 'ur',
        category: 'Prose Works'
      },
      {
        id: 'ashfaq-zavia-excerpts',
        title: 'زاویہ (منتخبات)',
        author: 'Ashfaq Ahmad',
        language: 'ur',
        category: 'Prose Works'
      },
      {
        id: 'manto-khol-do',
        title: 'کھول دو',
        author: 'Saadat Hasan Manto',
        language: 'ur',
        category: 'Prose Works'
      },
      {
        id: 'qudsia-footpath-ki-ghaas',
        title: 'فٹ پاتھ کی گھاس',
        author: 'Bano Qudsia',
        language: 'ur',
        category: 'Prose Works'
      },
      // English prose works
      {
        id: 'emerson-self-reliance',
        title: 'Self-Reliance',
        author: 'Ralph Waldo Emerson',
        language: 'en',
        category: 'Prose Works'
      },
      {
        id: 'thoreau-walden-excerpts',
        title: 'Walden (Excerpts)',
        author: 'Henry David Thoreau',
        language: 'en',
        category: 'Prose Works'
      },
      {
        id: 'wilde-picture-dorian-gray-excerpts',
        title: 'The Picture of Dorian Gray (Excerpts)',
        author: 'Oscar Wilde',
        language: 'en',
        category: 'Prose Works'
      }
    ];

    this.allBooks.push(...prose);
  }

  addLegacyBooks() {
    const legacy = [
      {
        id: 'the-bell-jar',
        title: 'The Bell Jar',
        author: 'Sylvia Plath',
        language: 'en',
        category: 'Legacy Books'
      },
      {
        id: 'to-kill-a-mockingbird',
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        language: 'en',
        category: 'Legacy Books'
      },
      {
        id: 'the-great-gatsby',
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        language: 'en',
        category: 'Legacy Books'
      },
      {
        id: '1984',
        title: '1984',
        author: 'George Orwell',
        language: 'en',
        category: 'Legacy Books'
      },
      {
        id: 'wuthering-heights',
        title: 'Wuthering Heights',
        author: 'Emily Brontë',
        language: 'en',
        category: 'Legacy Books'
      },
      {
        id: 'jane-eyre',
        title: 'Jane Eyre',
        author: 'Charlotte Brontë',
        language: 'en',
        category: 'Legacy Books'
      }
    ];

    this.allBooks.push(...legacy);
  }

  generateMarkdownFile() {
    let content = `# Complete Book List for Cover Images\n\n`;
    content += `Generated on: ${new Date().toISOString()}\n`;
    content += `Total Books: ${this.allBooks.length}\n\n`;

    // Group by category
    const categories = [...new Set(this.allBooks.map(book => book.category))];

    categories.forEach(category => {
      const booksInCategory = this.allBooks.filter(book => book.category === category);
      content += `## ${category} (${booksInCategory.length} books)\n\n`;

      booksInCategory.forEach(book => {
        content += `### ${book.title}\n`;
        content += `- **ID**: \`${book.id}\`\n`;
        content += `- **Author**: ${book.author}\n`;
        content += `- **Language**: ${book.language}\n`;
        content += `- **Cover File**: \`${book.id}.jpg\`\n`;
        content += `- **Status**: ❌ Need to download\n\n`;
      });
    });

    // Add download instructions
    content += `\n## Download Instructions\n\n`;
    content += `1. For each book, search for high-quality cover images\n`;
    content += `2. Download and save as: \`public/images/covers/{book-id}.jpg\`\n`;
    content += `3. Recommended size: 400x600px or similar aspect ratio\n`;
    content += `4. Use JPG format for photos, PNG for graphics\n`;
    content += `5. After downloading all covers, run the update script\n\n`;

    fs.writeFileSync(this.outputFile, content);
  }
}

// Run the generator
if (require.main === module) {
  const generator = new ComprehensiveBookList();
  generator.generateCompleteList();
}

module.exports = ComprehensiveBookList;
