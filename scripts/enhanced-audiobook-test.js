#!/usr/bin/env node

/**
 * Enhanced Audiobook Testing Script
 */

const fs = require('fs');
const path = require('path');

async function testAudiobookImplementation() {
  console.log('🧪 Testing audiobook implementation...');

  const results = {
    filesExist: [],
    filesAccessible: [],
    configurationValid: [],
    playerFunctional: []
  };

  // Test file existence
  const booksToTest = ['crime-and-punishment-dostoevsky', 'pride-and-prejudice', 'alice-adventures-wonderland'];

  for (const bookId of booksToTest) {
    const bookDir = path.join(__dirname, '..', 'public', 'audio', 'books', bookId, 'en');

    if (fs.existsSync(bookDir)) {
      const files = fs.readdirSync(bookDir).filter(f => f.endsWith('.mp3'));
      results.filesExist.push({
        bookId,
        fileCount: files.length,
        status: files.length > 0 ? 'PASS' : 'FAIL'
      });

      // Test file accessibility
      let accessibleCount = 0;
      for (const file of files) {
        const filePath = path.join(bookDir, file);
        const stats = fs.statSync(filePath);
        if (stats.size > 1024 * 1024) { // More than 1MB indicates real content
          accessibleCount++;
        }
      }

      results.filesAccessible.push({
        bookId,
        accessibleFiles: accessibleCount,
        totalFiles: files.length,
        status: accessibleCount > 0 ? 'PASS' : 'FAIL'
      });
    } else {
      results.filesExist.push({
        bookId,
        fileCount: 0,
        status: 'FAIL'
      });
    }
  }

  // Generate report
  console.log('\n📊 Test Results:');
  console.log('================');

  results.filesExist.forEach(result => {
    console.log(`${result.status === 'PASS' ? '✅' : '❌'} ${result.bookId}: ${result.fileCount} files`);
  });

  console.log('\n📁 File Accessibility:');
  results.filesAccessible.forEach(result => {
    console.log(`${result.status === 'PASS' ? '✅' : '❌'} ${result.bookId}: ${result.accessibleFiles}/${result.totalFiles} accessible`);
  });

  return results;
}

if (require.main === module) {
  testAudiobookImplementation().catch(console.error);
}

module.exports = { testAudiobookImplementation };