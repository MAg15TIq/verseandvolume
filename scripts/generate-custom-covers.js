#!/usr/bin/env node

/**
 * Custom Book Cover Generator Script
 * 
 * This script generates professional-looking custom covers for books
 * that don't have existing cover images.
 */

const fs = require('fs');
const path = require('path');

class CustomCoverGenerator {
  constructor() {
    this.coversDir = path.join(process.cwd(), 'public', 'images', 'covers');
    this.generatedCount = 0;
    
    // Ensure covers directory exists
    if (!fs.existsSync(this.coversDir)) {
      fs.mkdirSync(this.coversDir, { recursive: true });
    }
    
    // Color schemes for different genres
    this.colorSchemes = {
      romance: [
        { primary: '#e91e63', secondary: '#f8bbd9', accent: '#ad1457' },
        { primary: '#ff6b9d', secondary: '#ffeaa7', accent: '#fd79a8' },
        { primary: '#a29bfe', secondary: '#fd79a8', accent: '#6c5ce7' }
      ],
      classic: [
        { primary: '#2c3e50', secondary: '#ecf0f1', accent: '#34495e' },
        { primary: '#8b4513', secondary: '#deb887', accent: '#a0522d' },
        { primary: '#2f4f4f', secondary: '#f5f5dc', accent: '#708090' }
      ],
      contemporary: [
        { primary: '#3498db', secondary: '#ecf0f1', accent: '#2980b9' },
        { primary: '#e74c3c', secondary: '#fadbd8', accent: '#c0392b' },
        { primary: '#27ae60', secondary: '#d5f4e6', accent: '#229954' }
      ],
      spiritual: [
        { primary: '#9b59b6', secondary: '#f4ecf7', accent: '#8e44ad' },
        { primary: '#f39c12', secondary: '#fef9e7', accent: '#e67e22' },
        { primary: '#16a085', secondary: '#e8f8f5', accent: '#138d75' }
      ]
    };
  }

  async generateCovers() {
    console.log('🎨 Starting Custom Cover Generation...\n');
    
    const booksNeedingCovers = this.getBooksNeedingCovers();
    
    console.log(`📚 Found ${booksNeedingCovers.length} books needing custom covers\n`);
    
    for (const book of booksNeedingCovers) {
      await this.generateSingleCover(book);
    }
    
    this.generateSummary();
  }

  getBooksNeedingCovers() {
    // Books that need custom covers (no external URL available)
    return [
      {
        id: 'mere-humdam-mere-dost',
        title: 'میرے ہمدم میرے دوست',
        author: 'Effat Sehar',
        language: 'ur',
        genre: 'romance'
      },
      {
        id: 'kuch-ishq-tha-kuch-majazi',
        title: 'کچھ عشق تھا کچھ مجازی',
        author: 'Effat Sehar',
        language: 'ur',
        genre: 'spiritual'
      },
      {
        id: 'dil-se-dil-tak',
        title: 'دل سے دل تک',
        author: 'Amna Riaz',
        language: 'ur',
        genre: 'romance'
      },
      {
        id: 'raja-gidh',
        title: 'راجہ گدھ',
        author: 'Bano Qudsia',
        language: 'ur',
        genre: 'classic'
      },
      {
        id: 'aag-ka-darya',
        title: 'آگ کا دریا',
        author: 'Qurratulain Hyder',
        language: 'ur',
        genre: 'classic'
      },
      {
        id: 'peer-e-kamil',
        title: 'پیر کامل',
        author: 'Umera Ahmed',
        language: 'ur',
        genre: 'spiritual'
      }
    ];
  }

  async generateSingleCover(book) {
    const filename = `${book.id}.svg`;
    const localPath = path.join(this.coversDir, filename);
    
    // Skip if file already exists
    if (fs.existsSync(localPath)) {
      console.log(`⏭️  ${book.title}: Cover already exists, skipping`);
      return;
    }
    
    try {
      console.log(`🎨 Generating cover for: ${book.title}...`);
      
      const svg = this.createSVGCover(book);
      fs.writeFileSync(localPath, svg);
      
      console.log(`✅ ${book.title}: Custom cover generated`);
      this.generatedCount++;
      
    } catch (error) {
      console.log(`❌ ${book.title}: Error - ${error.message}`);
    }
  }

  createSVGCover(book) {
    const colorScheme = this.getColorScheme(book.genre);
    const isUrdu = book.language === 'ur';
    
    // Adjust text for length
    const title = book.title.length > 25 ? book.title.substring(0, 25) + '...' : book.title;
    const author = book.author.length > 20 ? book.author.substring(0, 20) + '...' : book.author;
    
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="400" height="600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="backgroundGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${colorScheme.primary};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${colorScheme.accent};stop-opacity:1" />
    </linearGradient>
    <linearGradient id="overlayGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${colorScheme.secondary};stop-opacity:0.1" />
      <stop offset="100%" style="stop-color:${colorScheme.secondary};stop-opacity:0.3" />
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="rgba(0,0,0,0.3)"/>
    </filter>
  </defs>
  
  <!-- Background -->
  <rect width="400" height="600" fill="url(#backgroundGradient)"/>
  
  <!-- Overlay pattern -->
  <rect width="400" height="600" fill="url(#overlayGradient)"/>
  
  <!-- Decorative elements -->
  <circle cx="50" cy="50" r="30" fill="${colorScheme.secondary}" opacity="0.2"/>
  <circle cx="350" cy="550" r="40" fill="${colorScheme.secondary}" opacity="0.15"/>
  
  <!-- Border -->
  <rect x="20" y="20" width="360" height="560" fill="none" stroke="${colorScheme.secondary}" stroke-width="2" opacity="0.6"/>
  
  <!-- Title -->
  <text x="200" y="250" font-family="${isUrdu ? 'Noto Nastaliq Urdu, serif' : 'Georgia, serif'}" 
        font-size="${isUrdu ? '28' : '32'}" font-weight="bold" fill="white" text-anchor="middle" 
        filter="url(#shadow)" ${isUrdu ? 'direction="rtl"' : ''}>
    ${this.escapeXML(title)}
  </text>
  
  <!-- Author -->
  <text x="200" y="350" font-family="${isUrdu ? 'Noto Nastaliq Urdu, serif' : 'Georgia, serif'}" 
        font-size="${isUrdu ? '18' : '20'}" fill="${colorScheme.secondary}" text-anchor="middle" 
        opacity="0.9" ${isUrdu ? 'direction="rtl"' : ''}>
    ${this.escapeXML(author)}
  </text>
  
  <!-- Genre indicator -->
  <rect x="150" y="450" width="100" height="30" rx="15" fill="${colorScheme.secondary}" opacity="0.8"/>
  <text x="200" y="470" font-family="Arial, sans-serif" font-size="12" fill="${colorScheme.primary}" 
        text-anchor="middle" font-weight="bold">
    ${book.genre.toUpperCase()}
  </text>
  
  <!-- Decorative flourish -->
  <path d="M 100 400 Q 200 380 300 400" stroke="${colorScheme.secondary}" stroke-width="2" 
        fill="none" opacity="0.6"/>
  <path d="M 100 420 Q 200 440 300 420" stroke="${colorScheme.secondary}" stroke-width="2" 
        fill="none" opacity="0.4"/>
</svg>`;
  }

  getColorScheme(genre) {
    const schemes = this.colorSchemes[genre] || this.colorSchemes.contemporary;
    const randomIndex = Math.floor(Math.random() * schemes.length);
    return schemes[randomIndex];
  }

  escapeXML(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  generateSummary() {
    console.log('\n📊 COVER GENERATION SUMMARY');
    console.log('=' .repeat(40));
    console.log(`🎨 Generated: ${this.generatedCount} custom covers`);
    console.log(`📁 Total files in covers directory: ${this.countCoverFiles()}`);
    
    if (this.generatedCount > 0) {
      console.log('\n🎉 Custom covers generated successfully!');
      console.log('📝 Next steps:');
      console.log('1. Update book TypeScript files to reference the new covers');
      console.log('2. Test the website to ensure covers display correctly');
      console.log('3. Consider creating PNG versions for better browser support');
      console.log('4. Optimize SVG files if needed');
    }
    
    console.log('\n💡 Tips for better covers:');
    console.log('- Consider hiring a designer for professional covers');
    console.log('- Use tools like Canva or Adobe Illustrator for more complex designs');
    console.log('- Ensure text is readable at small sizes');
    console.log('- Test covers on different backgrounds');
  }

  countCoverFiles() {
    try {
      const files = fs.readdirSync(this.coversDir);
      return files.filter(file => 
        file.endsWith('.jpg') || 
        file.endsWith('.png') || 
        file.endsWith('.webp') ||
        file.endsWith('.jpeg') ||
        file.endsWith('.svg')
      ).length;
    } catch (error) {
      return 0;
    }
  }
}

// Run the generator
if (require.main === module) {
  const generator = new CustomCoverGenerator();
  generator.generateCovers().catch(console.error);
}

module.exports = CustomCoverGenerator;
