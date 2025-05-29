#!/usr/bin/env node

/**
 * Book Reference Updater Script
 * 
 * This script updates book TypeScript files to reference local cover images
 * instead of external URLs for better performance and reliability.
 */

const fs = require('fs');
const path = require('path');

class BookReferenceUpdater {
  constructor() {
    this.coversDir = path.join(process.cwd(), 'public', 'images', 'covers');
    this.updatedCount = 0;
    this.skippedCount = 0;
    this.errorCount = 0;
    
    // Map of book IDs to their TypeScript file paths
    this.bookFiles = {
      'pride-and-prejudice': 'src/data/novels/authors/jane-austen/pride-and-prejudice.ts',
      'the-notebook': 'src/data/novels/authors/nicholas-sparks/the-notebook.ts',
      'crime-and-punishment-dostoevsky': 'src/data/novels/authors/fyodor-dostoevsky/crime-and-punishment.ts',
      'alice-adventures-in-wonderland': 'src/data/novels/authors/lewis-carroll/alice-adventures-in-wonderland.ts',
      'khuda-aur-mohabbat': 'src/data/novels/authors/hashim-nadeem/khuda-aur-mohabbat.ts',
      'bachpan-ka-december': 'src/data/novels/authors/hashim-nadeem/bachpan-ka-december.ts'
    };
  }

  async updateReferences() {
    console.log('🔄 Starting Book Reference Update...\n');
    
    // Get list of available cover files
    const availableCovers = this.getAvailableCovers();
    console.log(`📁 Found ${availableCovers.length} cover files in directory\n`);
    
    for (const [bookId, filePath] of Object.entries(this.bookFiles)) {
      await this.updateSingleBookFile(bookId, filePath, availableCovers);
    }
    
    this.generateSummary();
  }

  getAvailableCovers() {
    try {
      const files = fs.readdirSync(this.coversDir);
      return files.filter(file => 
        file.endsWith('.jpg') || 
        file.endsWith('.png') || 
        file.endsWith('.webp') ||
        file.endsWith('.jpeg') ||
        file.endsWith('.svg')
      );
    } catch (error) {
      console.log('❌ Error reading covers directory:', error.message);
      return [];
    }
  }

  async updateSingleBookFile(bookId, filePath, availableCovers) {
    const fullPath = path.join(process.cwd(), filePath);
    
    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  ${bookId}: File not found - ${filePath}`);
      this.errorCount++;
      return;
    }
    
    // Find matching cover file
    const coverFile = availableCovers.find(file => 
      file.startsWith(bookId) && (file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.svg'))
    );
    
    if (!coverFile) {
      console.log(`📷 ${bookId}: No local cover found, skipping`);
      this.skippedCount++;
      return;
    }
    
    try {
      // Read the file content
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Check if already using local path
      if (content.includes(`'/images/covers/${coverFile}'`)) {
        console.log(`✅ ${bookId}: Already using local cover`);
        this.skippedCount++;
        return;
      }
      
      // Find and replace the coverImage line
      const coverImageRegex = /coverImage:\s*['"`]([^'"`]+)['"`]/;
      const match = content.match(coverImageRegex);
      
      if (match) {
        const oldCoverImage = match[1];
        const newCoverImage = `/images/covers/${coverFile}`;
        
        // Replace the cover image URL
        content = content.replace(
          coverImageRegex,
          `coverImage: '${newCoverImage}'`
        );
        
        // Write the updated content back to file
        fs.writeFileSync(fullPath, content, 'utf8');
        
        console.log(`🔄 ${bookId}: Updated cover reference`);
        console.log(`   📤 Old: ${oldCoverImage}`);
        console.log(`   📥 New: ${newCoverImage}`);
        
        this.updatedCount++;
      } else {
        console.log(`⚠️  ${bookId}: Could not find coverImage property`);
        this.errorCount++;
      }
      
    } catch (error) {
      console.log(`❌ ${bookId}: Error updating file - ${error.message}`);
      this.errorCount++;
    }
  }

  generateSummary() {
    console.log('\n📊 UPDATE SUMMARY');
    console.log('=' .repeat(40));
    console.log(`🔄 Updated: ${this.updatedCount}`);
    console.log(`⏭️  Skipped: ${this.skippedCount}`);
    console.log(`❌ Errors: ${this.errorCount}`);
    
    if (this.updatedCount > 0) {
      console.log('\n🎉 Book references updated successfully!');
      console.log('📝 Next steps:');
      console.log('1. Test the website to ensure covers display correctly');
      console.log('2. Check that all updated books show their covers');
      console.log('3. Consider running the audit script again to verify');
      console.log('4. Commit the changes to version control');
    }
    
    if (this.errorCount > 0) {
      console.log('\n⚠️  Some updates failed. You may need to:');
      console.log('1. Check file paths and permissions');
      console.log('2. Verify TypeScript file structure');
      console.log('3. Manually update problematic files');
    }
    
    console.log('\n💡 Additional recommendations:');
    console.log('- Run: npm run build - to check for TypeScript errors');
    console.log('- Run: npm run dev - to test the website locally');
    console.log('- Run: node scripts/book-cover-audit.js - to verify changes');
  }
}

// Additional utility function to create a backup
class BookFileBackup {
  static createBackup(filePath) {
    const backupPath = `${filePath}.backup.${Date.now()}`;
    try {
      fs.copyFileSync(filePath, backupPath);
      return backupPath;
    } catch (error) {
      console.log(`⚠️  Could not create backup for ${filePath}`);
      return null;
    }
  }
  
  static restoreBackup(backupPath, originalPath) {
    try {
      fs.copyFileSync(backupPath, originalPath);
      fs.unlinkSync(backupPath);
      return true;
    } catch (error) {
      console.log(`❌ Could not restore backup: ${error.message}`);
      return false;
    }
  }
}

// Run the updater
if (require.main === module) {
  const updater = new BookReferenceUpdater();
  updater.updateReferences().catch(console.error);
}

module.exports = { BookReferenceUpdater, BookFileBackup };
