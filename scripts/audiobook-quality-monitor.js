#!/usr/bin/env node

/**
 * Audiobook Quality Monitoring Script
 */

const fs = require('fs');
const path = require('path');

async function monitorAudiobookQuality() {
  console.log('📈 Monitoring audiobook quality...');

  const report = {
    timestamp: new Date().toISOString(),
    books: [],
    issues: [],
    recommendations: []
  };

  const booksDir = path.join(__dirname, '..', 'public', 'audio', 'books');

  if (fs.existsSync(booksDir)) {
    const bookDirs = fs.readdirSync(booksDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    for (const bookDir of bookDirs) {
      const bookPath = path.join(booksDir, bookDir);
      const bookReport = await analyzeBookQuality(bookPath, bookDir);
      report.books.push(bookReport);

      // Collect issues
      if (bookReport.issues.length > 0) {
        report.issues.push(...bookReport.issues.map(issue => `${bookDir}: ${issue}`));
      }
    }
  }

  // Generate recommendations
  if (report.issues.length > 0) {
    report.recommendations.push('Review and fix identified issues');
  }

  if (report.books.some(book => book.avgFileSize < 1024 * 1024)) {
    report.recommendations.push('Replace demo files with authentic audiobooks');
  }

  // Save report
  const reportPath = path.join(__dirname, '..', 'audiobook-audit-reports', `quality-monitor-${Date.now()}.json`);
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  console.log(`📊 Quality report saved: ${reportPath}`);
  return report;
}

async function analyzeBookQuality(bookPath, bookId) {
  const analysis = {
    bookId,
    languages: [],
    totalFiles: 0,
    totalSize: 0,
    avgFileSize: 0,
    issues: []
  };

  try {
    const items = fs.readdirSync(bookPath, { withFileTypes: true });

    for (const item of items) {
      if (item.isDirectory()) {
        const langPath = path.join(bookPath, item.name);
        const files = fs.readdirSync(langPath).filter(f => f.endsWith('.mp3'));

        let langSize = 0;
        for (const file of files) {
          const filePath = path.join(langPath, file);
          const stats = fs.statSync(filePath);
          langSize += stats.size;

          // Check for demo files (small size)
          if (stats.size < 1024 * 1024) {
            analysis.issues.push(`Small file detected: ${file} (${Math.round(stats.size / 1024)}KB)`);
          }
        }

        analysis.languages.push({
          language: item.name,
          fileCount: files.length,
          totalSize: langSize
        });

        analysis.totalFiles += files.length;
        analysis.totalSize += langSize;
      }
    }

    analysis.avgFileSize = analysis.totalFiles > 0 ? analysis.totalSize / analysis.totalFiles : 0;

  } catch (error) {
    analysis.issues.push(`Error analyzing: ${error.message}`);
  }

  return analysis;
}

if (require.main === module) {
  monitorAudiobookQuality().catch(console.error);
}

module.exports = { monitorAudiobookQuality };