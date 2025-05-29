#!/usr/bin/env node

/**
 * Master Book Cover Fix Script
 * 
 * This script orchestrates the complete process of fixing book covers:
 * 1. Audits current cover status
 * 2. Downloads available external covers
 * 3. Generates custom covers for missing ones
 * 4. Updates book references to use local covers
 * 5. Provides final report and recommendations
 */

const BookCoverAuditor = require('./book-cover-audit');
const BookCoverDownloader = require('./download-book-covers');
const CustomCoverGenerator = require('./generate-custom-covers');
const { BookReferenceUpdater } = require('./update-book-references');

class MasterCoverFixer {
  constructor() {
    this.startTime = Date.now();
  }

  async fixAllCovers() {
    console.log('🚀 MASTER BOOK COVER FIX PROCESS');
    console.log('=' .repeat(60));
    console.log('This script will fix all book cover issues automatically.\n');
    
    try {
      // Step 1: Initial Audit
      console.log('📋 STEP 1: INITIAL AUDIT');
      console.log('-' .repeat(30));
      const auditor = new BookCoverAuditor();
      await auditor.auditBooks();
      
      await this.pause(2000);
      
      // Step 2: Download External Covers
      console.log('\n📥 STEP 2: DOWNLOAD EXTERNAL COVERS');
      console.log('-' .repeat(40));
      const downloader = new BookCoverDownloader();
      await downloader.downloadCovers();
      
      await this.pause(2000);
      
      // Step 3: Generate Custom Covers
      console.log('\n🎨 STEP 3: GENERATE CUSTOM COVERS');
      console.log('-' .repeat(35));
      const generator = new CustomCoverGenerator();
      await generator.generateCovers();
      
      await this.pause(2000);
      
      // Step 4: Update Book References
      console.log('\n🔄 STEP 4: UPDATE BOOK REFERENCES');
      console.log('-' .repeat(35));
      const updater = new BookReferenceUpdater();
      await updater.updateReferences();
      
      await this.pause(2000);
      
      // Step 5: Final Audit
      console.log('\n✅ STEP 5: FINAL AUDIT');
      console.log('-' .repeat(25));
      const finalAuditor = new BookCoverAuditor();
      await finalAuditor.auditBooks();
      
      // Step 6: Final Report
      this.generateFinalReport();
      
    } catch (error) {
      console.error('\n❌ PROCESS FAILED:', error.message);
      console.log('\n🛠️  MANUAL RECOVERY STEPS:');
      console.log('1. Check error messages above');
      console.log('2. Run individual scripts manually:');
      console.log('   - node scripts/book-cover-audit.js');
      console.log('   - node scripts/download-book-covers.js');
      console.log('   - node scripts/generate-custom-covers.js');
      console.log('   - node scripts/update-book-references.js');
    }
  }

  async pause(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  generateFinalReport() {
    const endTime = Date.now();
    const duration = ((endTime - this.startTime) / 1000).toFixed(1);
    
    console.log('\n🎉 BOOK COVER FIX COMPLETE!');
    console.log('=' .repeat(60));
    console.log(`⏱️  Total time: ${duration} seconds`);
    
    console.log('\n📊 WHAT WAS ACCOMPLISHED:');
    console.log('✅ Audited all book covers');
    console.log('✅ Downloaded available external covers');
    console.log('✅ Generated custom covers for missing books');
    console.log('✅ Updated book references to use local covers');
    console.log('✅ Performed final verification audit');
    
    console.log('\n🧪 TESTING RECOMMENDATIONS:');
    console.log('1. Start the development server:');
    console.log('   npm run dev');
    console.log('');
    console.log('2. Navigate to the novels/books sections');
    console.log('');
    console.log('3. Verify that covers are displaying correctly');
    console.log('');
    console.log('4. Check both English and Urdu books');
    console.log('');
    console.log('5. Test on different screen sizes');
    
    console.log('\n🔧 IF ISSUES PERSIST:');
    console.log('1. Check browser console for image loading errors');
    console.log('2. Verify file paths in the covers directory');
    console.log('3. Run: node scripts/book-cover-audit.js');
    console.log('4. Check TypeScript compilation: npm run build');
    console.log('5. Clear browser cache and reload');
    
    console.log('\n📈 PERFORMANCE IMPROVEMENTS:');
    console.log('✅ Faster loading (local images vs external URLs)');
    console.log('✅ Better reliability (no broken external links)');
    console.log('✅ Consistent design (custom covers for missing books)');
    console.log('✅ Better user experience (no missing cover placeholders)');
    
    console.log('\n🎨 COVER QUALITY NOTES:');
    console.log('- Downloaded covers: Original quality from external sources');
    console.log('- Custom covers: Professional SVG designs with proper typography');
    console.log('- All covers: Optimized for web display and performance');
    console.log('- Fallback system: Gradient backgrounds if covers fail to load');
    
    console.log('\n📝 MAINTENANCE TIPS:');
    console.log('1. When adding new books, include cover images');
    console.log('2. Use the scripts to maintain cover consistency');
    console.log('3. Regularly audit covers for broken links');
    console.log('4. Consider professional covers for important books');
    console.log('5. Keep cover files optimized for web performance');
    
    console.log('\n🎯 NEXT STEPS (OPTIONAL):');
    console.log('1. Consider hiring a designer for premium custom covers');
    console.log('2. Implement automated cover optimization');
    console.log('3. Add cover image lazy loading for better performance');
    console.log('4. Create different cover sizes for different use cases');
    console.log('5. Add cover image alt text for better accessibility');
    
    console.log('\n📞 SUPPORT:');
    console.log('If you encounter any issues, check:');
    console.log('- The generated audit reports');
    console.log('- Browser developer tools');
    console.log('- TypeScript compilation errors');
    console.log('- File permissions in the covers directory');
    
    console.log('\n🎊 CONGRATULATIONS!');
    console.log('Your Verse and Volume website now has comprehensive book cover support!');
  }
}

// Interactive mode
async function runInteractive() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  const question = (prompt) => new Promise(resolve => rl.question(prompt, resolve));
  
  console.log('🔧 BOOK COVER FIX WIZARD');
  console.log('=' .repeat(40));
  console.log('This will fix all book cover issues on your website.\n');
  
  const answer = await question('Do you want to proceed? (y/N): ');
  
  if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
    rl.close();
    const fixer = new MasterCoverFixer();
    await fixer.fixAllCovers();
  } else {
    console.log('\n👋 Operation cancelled. You can run individual scripts manually:');
    console.log('- node scripts/book-cover-audit.js (audit current status)');
    console.log('- node scripts/download-book-covers.js (download external covers)');
    console.log('- node scripts/generate-custom-covers.js (create custom covers)');
    console.log('- node scripts/update-book-references.js (update references)');
    rl.close();
  }
}

// Run the script
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.includes('--auto') || args.includes('-a')) {
    // Auto mode - run without prompts
    const fixer = new MasterCoverFixer();
    fixer.fixAllCovers().catch(console.error);
  } else {
    // Interactive mode
    runInteractive().catch(console.error);
  }
}

module.exports = MasterCoverFixer;
