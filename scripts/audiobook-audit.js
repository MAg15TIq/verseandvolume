#!/usr/bin/env node

/**
 * Comprehensive Audiobook Audit Script
 * 
 * This script performs a complete audit of audiobook integration on the Verse and Volume website:
 * 1. Checks all novels for audiobook properties
 * 2. Verifies audio file existence and accessibility
 * 3. Tests audiobook player functionality
 * 4. Identifies missing audiobook files
 * 5. Generates integration reports
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration
const CONFIG = {
  audioBaseDir: path.join(__dirname, '..', 'public', 'audio'),
  booksDir: path.join(__dirname, '..', 'public', 'audio', 'books'),
  dataDir: path.join(__dirname, '..', 'src', 'data', 'novels', 'authors'),
  outputDir: path.join(__dirname, '..', 'audiobook-audit-reports'),
  
  // Expected audiobook properties
  requiredAudiobookProps: [
    'hasAudio',
    'isAudiobook',
    'audioUrl',
    'audioDuration',
    'narrator',
    'audioQuality'
  ],
  
  // Supported audio formats
  supportedFormats: ['.mp3', '.m4a', '.ogg', '.wav'],
  
  // Quality standards
  qualityStandards: {
    minBitrate: 64, // kbps
    maxFileSize: 100 * 1024 * 1024, // 100MB per chapter
    sampleRates: [22050, 44100, 48000]
  }
};

/**
 * Main audit function
 */
async function runAudiobookAudit() {
  console.log('🎧 Starting Comprehensive Audiobook Audit...\n');
  
  try {
    // Create output directory
    if (!fs.existsSync(CONFIG.outputDir)) {
      fs.mkdirSync(CONFIG.outputDir, { recursive: true });
    }
    
    // Step 1: Scan all novels for audiobook properties
    console.log('📚 Step 1: Scanning novels for audiobook properties...');
    const novelAudit = await auditNovelAudiobookProperties();
    
    // Step 2: Check audio file existence and accessibility
    console.log('🔍 Step 2: Checking audio file existence...');
    const fileAudit = await auditAudioFiles();
    
    // Step 3: Test audiobook player functionality
    console.log('🎮 Step 3: Testing audiobook player functionality...');
    const playerAudit = await auditPlayerFunctionality();
    
    // Step 4: Generate comprehensive report
    console.log('📊 Step 4: Generating comprehensive report...');
    const report = generateComprehensiveReport(novelAudit, fileAudit, playerAudit);
    
    // Step 5: Save reports
    await saveAuditReports(report);
    
    console.log('\n✅ Audiobook audit completed successfully!');
    console.log(`📁 Reports saved to: ${CONFIG.outputDir}`);
    
    return report;
    
  } catch (error) {
    console.error('❌ Audit failed:', error.message);
    throw error;
  }
}

/**
 * Audit novel data files for audiobook properties
 */
async function auditNovelAudiobookProperties() {
  const results = {
    totalNovels: 0,
    audiobooksConfigured: 0,
    partiallyConfigured: 0,
    missingConfiguration: 0,
    novels: []
  };
  
  // Scan all author directories
  const authorDirs = fs.readdirSync(CONFIG.dataDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  for (const authorDir of authorDirs) {
    const authorPath = path.join(CONFIG.dataDir, authorDir);
    const novelFiles = fs.readdirSync(authorPath)
      .filter(file => file.endsWith('.ts') && file !== 'index.ts');
    
    for (const novelFile of novelFiles) {
      const novelPath = path.join(authorPath, novelFile);
      const novelData = await analyzeNovelFile(novelPath);
      
      if (novelData) {
        results.totalNovels++;
        results.novels.push(novelData);
        
        if (novelData.audiobookStatus === 'fully-configured') {
          results.audiobooksConfigured++;
        } else if (novelData.audiobookStatus === 'partially-configured') {
          results.partiallyConfigured++;
        } else {
          results.missingConfiguration++;
        }
      }
    }
  }
  
  return results;
}

/**
 * Analyze individual novel file for audiobook properties
 */
async function analyzeNovelFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract novel ID and basic info
    const idMatch = content.match(/id:\s*['"`]([^'"`]+)['"`]/);
    const titleMatch = content.match(/title:\s*['"`]([^'"`]+)['"`]/);
    const authorMatch = content.match(/author:\s*['"`]([^'"`]+)['"`]/);
    
    if (!idMatch || !titleMatch || !authorMatch) {
      return null;
    }
    
    const novel = {
      id: idMatch[1],
      title: titleMatch[1],
      author: authorMatch[1],
      filePath: filePath,
      audioProperties: {},
      audiobookStatus: 'not-configured',
      issues: []
    };
    
    // Check for audiobook properties
    const audioProps = CONFIG.requiredAudiobookProps;
    let configuredProps = 0;
    
    for (const prop of audioProps) {
      const propRegex = new RegExp(`${prop}:\\s*([^,\\n]+)`);
      const match = content.match(propRegex);
      
      if (match) {
        novel.audioProperties[prop] = match[1].trim();
        configuredProps++;
      }
    }
    
    // Determine audiobook status
    if (configuredProps === audioProps.length) {
      novel.audiobookStatus = 'fully-configured';
    } else if (configuredProps > 0) {
      novel.audiobookStatus = 'partially-configured';
      novel.issues.push(`Missing ${audioProps.length - configuredProps} audiobook properties`);
    }
    
    // Check for audioChapters
    if (content.includes('audioChapters:')) {
      novel.audioProperties.hasChapters = true;
      const chaptersMatch = content.match(/audioChapters:\s*\[([\s\S]*?)\]/);
      if (chaptersMatch) {
        const chaptersContent = chaptersMatch[1];
        const chapterCount = (chaptersContent.match(/\{/g) || []).length;
        novel.audioProperties.chapterCount = chapterCount;
      }
    }
    
    return novel;
    
  } catch (error) {
    console.error(`Error analyzing ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Audit audio files existence and accessibility
 */
async function auditAudioFiles() {
  const results = {
    totalDirectories: 0,
    directoriesWithFiles: 0,
    emptyDirectories: 0,
    totalAudioFiles: 0,
    brokenFiles: 0,
    directories: []
  };
  
  if (!fs.existsSync(CONFIG.booksDir)) {
    console.warn('⚠️  Audio books directory does not exist:', CONFIG.booksDir);
    return results;
  }
  
  const bookDirs = fs.readdirSync(CONFIG.booksDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  for (const bookDir of bookDirs) {
    const bookPath = path.join(CONFIG.booksDir, bookDir);
    const dirAudit = await auditBookDirectory(bookPath, bookDir);
    
    results.totalDirectories++;
    results.directories.push(dirAudit);
    
    if (dirAudit.audioFiles.length > 0) {
      results.directoriesWithFiles++;
      results.totalAudioFiles += dirAudit.audioFiles.length;
      results.brokenFiles += dirAudit.brokenFiles;
    } else {
      results.emptyDirectories++;
    }
  }
  
  return results;
}

/**
 * Audit individual book directory
 */
async function auditBookDirectory(dirPath, bookId) {
  const audit = {
    bookId: bookId,
    path: dirPath,
    languages: [],
    audioFiles: [],
    brokenFiles: 0,
    issues: []
  };
  
  try {
    const items = fs.readdirSync(dirPath, { withFileTypes: true });
    
    for (const item of items) {
      if (item.isDirectory()) {
        const langPath = path.join(dirPath, item.name);
        const langAudit = await auditLanguageDirectory(langPath, item.name);
        audit.languages.push(langAudit);
        audit.audioFiles.push(...langAudit.files);
        audit.brokenFiles += langAudit.brokenFiles;
      }
    }
    
    if (audit.languages.length === 0) {
      audit.issues.push('No language directories found');
    }
    
  } catch (error) {
    audit.issues.push(`Error reading directory: ${error.message}`);
  }
  
  return audit;
}

/**
 * Audit language directory (en/ur)
 */
async function auditLanguageDirectory(dirPath, language) {
  const audit = {
    language: language,
    path: dirPath,
    files: [],
    brokenFiles: 0,
    totalSize: 0,
    issues: []
  };
  
  try {
    const files = fs.readdirSync(dirPath);
    
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const ext = path.extname(file).toLowerCase();
      
      if (CONFIG.supportedFormats.includes(ext)) {
        const fileAudit = await auditAudioFile(filePath, file);
        audit.files.push(fileAudit);
        audit.totalSize += fileAudit.size;
        
        if (fileAudit.issues.length > 0) {
          audit.brokenFiles++;
        }
      }
    }
    
  } catch (error) {
    audit.issues.push(`Error reading language directory: ${error.message}`);
  }
  
  return audit;
}

/**
 * Audit individual audio file
 */
async function auditAudioFile(filePath, fileName) {
  const audit = {
    name: fileName,
    path: filePath,
    size: 0,
    accessible: false,
    issues: []
  };
  
  try {
    const stats = fs.statSync(filePath);
    audit.size = stats.size;
    audit.accessible = true;
    
    // Check file size
    if (stats.size === 0) {
      audit.issues.push('File is empty');
    } else if (stats.size > CONFIG.qualityStandards.maxFileSize) {
      audit.issues.push('File size exceeds recommended maximum');
    }
    
  } catch (error) {
    audit.issues.push(`File not accessible: ${error.message}`);
  }
  
  return audit;
}

/**
 * Test audiobook player functionality
 */
async function auditPlayerFunctionality() {
  // This would typically involve browser automation testing
  // For now, we'll do basic component and configuration checks
  
  const results = {
    componentExists: false,
    configurationValid: false,
    issues: []
  };
  
  // Check if AudiobookPlayer component exists
  const playerPath = path.join(__dirname, '..', 'src', 'components', 'AudiobookPlayer.tsx');
  if (fs.existsSync(playerPath)) {
    results.componentExists = true;
  } else {
    results.issues.push('AudiobookPlayer component not found');
  }
  
  // Check if useAudio hook exists
  const hookPath = path.join(__dirname, '..', 'src', 'hooks', 'useAudio.tsx');
  if (fs.existsSync(hookPath)) {
    results.configurationValid = true;
  } else {
    results.issues.push('useAudio hook not found');
  }
  
  return results;
}

/**
 * Generate comprehensive report
 */
function generateComprehensiveReport(novelAudit, fileAudit, playerAudit) {
  const timestamp = new Date().toISOString();
  
  return {
    timestamp: timestamp,
    summary: {
      totalNovels: novelAudit.totalNovels,
      audiobooksConfigured: novelAudit.audiobooksConfigured,
      audiobooksWithFiles: fileAudit.directoriesWithFiles,
      totalAudioFiles: fileAudit.totalAudioFiles,
      playerFunctional: playerAudit.componentExists && playerAudit.configurationValid
    },
    novelAudit: novelAudit,
    fileAudit: fileAudit,
    playerAudit: playerAudit,
    recommendations: generateRecommendations(novelAudit, fileAudit, playerAudit)
  };
}

/**
 * Generate recommendations based on audit results
 */
function generateRecommendations(novelAudit, fileAudit, playerAudit) {
  const recommendations = [];
  
  // Novel configuration recommendations
  if (novelAudit.partiallyConfigured > 0) {
    recommendations.push({
      priority: 'high',
      category: 'configuration',
      issue: `${novelAudit.partiallyConfigured} novels have partial audiobook configuration`,
      action: 'Complete audiobook properties for partially configured novels'
    });
  }
  
  // Missing audio files recommendations
  if (fileAudit.emptyDirectories > 0) {
    recommendations.push({
      priority: 'high',
      category: 'files',
      issue: `${fileAudit.emptyDirectories} audiobook directories are empty`,
      action: 'Download and add authentic audiobook files'
    });
  }
  
  // Player functionality recommendations
  if (!playerAudit.componentExists) {
    recommendations.push({
      priority: 'critical',
      category: 'functionality',
      issue: 'AudiobookPlayer component missing',
      action: 'Restore or recreate AudiobookPlayer component'
    });
  }
  
  return recommendations;
}

/**
 * Save audit reports to files
 */
async function saveAuditReports(report) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  
  // Save comprehensive JSON report
  const jsonPath = path.join(CONFIG.outputDir, `audiobook-audit-${timestamp}.json`);
  fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));
  
  // Save human-readable summary
  const summaryPath = path.join(CONFIG.outputDir, `audiobook-summary-${timestamp}.md`);
  const summaryContent = generateMarkdownSummary(report);
  fs.writeFileSync(summaryPath, summaryContent);
  
  console.log(`📄 JSON Report: ${jsonPath}`);
  console.log(`📄 Summary Report: ${summaryPath}`);
}

/**
 * Generate markdown summary
 */
function generateMarkdownSummary(report) {
  return `# Audiobook Audit Summary

**Generated:** ${report.timestamp}

## Overview
- **Total Novels:** ${report.summary.totalNovels}
- **Audiobooks Configured:** ${report.summary.audiobooksConfigured}
- **Audiobooks with Files:** ${report.summary.audiobooksWithFiles}
- **Total Audio Files:** ${report.summary.totalAudioFiles}
- **Player Functional:** ${report.summary.playerFunctional ? '✅' : '❌'}

## Recommendations
${report.recommendations.map(rec => 
  `### ${rec.priority.toUpperCase()}: ${rec.category}
- **Issue:** ${rec.issue}
- **Action:** ${rec.action}
`).join('\n')}

## Detailed Results
See the JSON report for complete details.
`;
}

// Run audit if called directly
if (require.main === module) {
  runAudiobookAudit()
    .then(report => {
      console.log('\n📊 Audit Summary:');
      console.log(`- Total Novels: ${report.summary.totalNovels}`);
      console.log(`- Audiobooks Configured: ${report.summary.audiobooksConfigured}`);
      console.log(`- Audio Files Found: ${report.summary.totalAudioFiles}`);
      console.log(`- Player Functional: ${report.summary.playerFunctional ? '✅' : '❌'}`);
    })
    .catch(error => {
      console.error('Audit failed:', error);
      process.exit(1);
    });
}

module.exports = { runAudiobookAudit };
