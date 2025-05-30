#!/usr/bin/env node

/**
 * Verify Cover Integration Script
 * 
 * This script verifies that book covers are properly integrated and accessible
 */

const fs = require('fs');
const path = require('path');

class CoverVerifier {
  constructor() {
    this.coversDir = path.join(process.cwd(), 'public', 'images', 'covers');
    this.results = {
      totalBooks: 0,
      workingCovers: 0,
      brokenCovers: 0,
      missingCovers: 0
    };
  }

  async verifyCovers() {
    console.log('🔍 Starting Cover Integration Verification...\n');

    // Get all available cover files
    const availableCovers = this.getAvailableCovers();
    console.log(`📁 Found ${availableCovers.length} cover files\n`);

    // Check novels
    await this.checkNovels();

    // Generate report
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

  async checkNovels() {
    console.log('📚 Checking Novel Cover Integration...\n');

    // Check main novel files
    const novelFiles = [
      'src/data/novels/authors/jane-austen/pride-and-prejudice.ts',
      'src/data/novels/authors/nicholas-sparks/the-notebook.ts',
      'src/data/novels/authors/nicholas-sparks/a-walk-to-remember.ts',
      'src/data/novels/authors/jojo-moyes/me-before-you.ts',
      'src/data/novels/authors/lewis-carroll/alice-adventures-in-wonderland.ts',
      'src/data/novels/authors/fyodor-dostoevsky/crime-and-punishment.ts',
      'src/data/novels/authors/hashim-nadeem/khuda-aur-mohabbat.ts',
      'src/data/novels/authors/hashim-nadeem/bachpan-ka-december.ts',
      'src/data/novels/authors/bano-qudsia/raja-gidh.ts',
      'src/data/novels/authors/qurratulain-hyder/aag-ka-darya.ts',
      'src/data/novels/authors/umera-ahmed/peer-e-kamil.ts',
      'src/data/novels/authors/english-love-novels.ts',
      'src/data/novels/authors/urdu-love-novels.ts'
    ];

    for (const filePath of novelFiles) {
      await this.checkNovelFile(filePath);
    }
  }

  async checkNovelFile(filePath) {
    try {
      if (!fs.existsSync(filePath)) {
        console.log(`⚠️  File not found: ${filePath}`);
        return;
      }

      const content = fs.readFileSync(filePath, 'utf8');
      const coverMatches = content.match(/coverImage:\s*['"`]([^'"`]+)['"`]/g);

      if (coverMatches) {
        for (const match of coverMatches) {
          const coverPath = match.match(/['"`]([^'"`]+)['"`]/)[1];
          this.results.totalBooks++;
          
          if (coverPath.startsWith('/images/covers/')) {
            const fileName = coverPath.replace('/images/covers/', '');
            const fullPath = path.join(this.coversDir, fileName);
            
            if (fs.existsSync(fullPath)) {
              console.log(`✅ ${fileName}: Working local cover`);
              this.results.workingCovers++;
            } else {
              console.log(`❌ ${fileName}: Missing cover file`);
              this.results.missingCovers++;
            }
          } else if (coverPath.startsWith('http')) {
            console.log(`⚠️  ${coverPath}: Still using external URL`);
            this.results.brokenCovers++;
          } else {
            console.log(`❓ ${coverPath}: Unknown cover path`);
            this.results.brokenCovers++;
          }
        }
      }
    } catch (error) {
      console.log(`❌ Error checking ${filePath}:`, error.message);
    }
  }

  generateReport() {
    console.log('\n📊 COVER INTEGRATION VERIFICATION SUMMARY');
    console.log('=' .repeat(50));
    console.log(`📚 Total Books Checked: ${this.results.totalBooks}`);
    console.log(`✅ Working Local Covers: ${this.results.workingCovers}`);
    console.log(`❌ Missing Cover Files: ${this.results.missingCovers}`);
    console.log(`⚠️  Broken/External Covers: ${this.results.brokenCovers}`);

    const successRate = this.results.totalBooks > 0 
      ? ((this.results.workingCovers / this.results.totalBooks) * 100).toFixed(1)
      : 0;
    console.log(`📈 Success Rate: ${successRate}%`);

    if (this.results.workingCovers > 0) {
      console.log('\n🎉 Cover integration is working!');
      console.log('\n📝 Next steps:');
      console.log('1. Test the website in browser');
      console.log('2. Check responsive design on different devices');
      console.log('3. Verify covers load quickly');
      console.log('4. Consider image optimization if needed');
    }

    if (this.results.missingCovers > 0 || this.results.brokenCovers > 0) {
      console.log('\n⚠️  Issues found that need attention:');
      if (this.results.missingCovers > 0) {
        console.log(`- ${this.results.missingCovers} cover files are missing`);
      }
      if (this.results.brokenCovers > 0) {
        console.log(`- ${this.results.brokenCovers} books still use external/broken covers`);
      }
    }
  }
}

// Run the verifier
if (require.main === module) {
  const verifier = new CoverVerifier();
  verifier.verifyCovers().catch(console.error);
}

module.exports = CoverVerifier;
