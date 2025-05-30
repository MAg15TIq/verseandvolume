#!/usr/bin/env node

/**
 * Comprehensive Google AdSense Integration Test
 * 
 * This script performs a complete verification of AdSense integration:
 * 1. Tests all template and layout files
 * 2. Verifies script syntax and attributes
 * 3. Checks for proper implementation patterns
 * 4. Generates detailed reports
 */

const fs = require('fs');
const path = require('path');

class ComprehensiveAdSenseTest {
  constructor() {
    this.results = {
      templateFiles: [],
      staticFiles: [],
      scriptValidation: [],
      summary: {
        totalFiles: 0,
        passedFiles: 0,
        failedFiles: 0,
        issues: []
      }
    };
    
    this.adSensePattern = /pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js\?client=ca-pub-5754219619080083/;
    this.expectedClientId = 'ca-pub-5754219619080083';
  }

  /**
   * Test template and layout files
   */
  testTemplateFiles() {
    console.log('🔍 Testing Template and Layout Files...\n');

    const templateFiles = [
      {
        path: 'src/app/layout.tsx',
        type: 'Next.js App Router Layout',
        expectedPattern: 'Script component with strategy="afterInteractive"'
      },
      {
        path: 'src/pages/_document.tsx',
        type: 'Next.js Pages Router Document',
        expectedPattern: 'Standard HTML script tag in Head component'
      }
    ];

    templateFiles.forEach(fileInfo => {
      const result = this.analyzeFile(fileInfo.path, fileInfo.type);
      result.expectedPattern = fileInfo.expectedPattern;
      
      // Additional checks for template files
      if (result.exists && result.content) {
        result.usesNextScript = result.content.includes('Script') && result.content.includes('strategy=');
        result.usesStandardScript = result.content.includes('<script') && !result.usesNextScript;
        result.hasAsyncAttribute = result.content.includes('async');
        result.hasCrossOrigin = result.content.includes('crossOrigin') || result.content.includes('crossorigin');
      }

      this.results.templateFiles.push(result);
      this.logFileResult(result);
    });
  }

  /**
   * Test static HTML files
   */
  testStaticFiles() {
    console.log('\n🔍 Testing Static HTML Files...\n');

    const staticFiles = [
      {
        path: 'public/demo-audiobook-test.html',
        type: 'Demo Audiobook Test Page',
        expectedPattern: 'Standard HTML script tag in head section'
      },
      {
        path: 'public/test-audio.html',
        type: 'Audio Test Page',
        expectedPattern: 'Standard HTML script tag in head section'
      }
    ];

    staticFiles.forEach(fileInfo => {
      const result = this.analyzeFile(fileInfo.path, fileInfo.type);
      result.expectedPattern = fileInfo.expectedPattern;
      
      // Additional checks for static files
      if (result.exists && result.content) {
        result.inHeadSection = this.isScriptInHeadSection(result.content);
        result.hasAsyncAttribute = result.content.includes('async');
        result.hasCrossOrigin = result.content.includes('crossorigin');
      }

      this.results.staticFiles.push(result);
      this.logFileResult(result);
    });
  }

  /**
   * Analyze individual file
   */
  analyzeFile(filePath, fileType) {
    const result = {
      file: filePath,
      type: fileType,
      exists: false,
      hasAdSenseScript: false,
      correctClientId: false,
      content: null,
      issues: [],
      recommendations: []
    };

    const fullPath = path.join(process.cwd(), filePath);
    
    if (!fs.existsSync(fullPath)) {
      result.issues.push('File does not exist');
      return result;
    }

    result.exists = true;
    result.content = fs.readFileSync(fullPath, 'utf8');

    // Check for AdSense script
    if (this.adSensePattern.test(result.content)) {
      result.hasAdSenseScript = true;
      
      // Verify client ID
      if (result.content.includes(this.expectedClientId)) {
        result.correctClientId = true;
      } else {
        result.issues.push('Incorrect or missing client ID');
      }
    } else {
      result.issues.push('AdSense script not found');
    }

    // Check for common issues
    this.validateScriptImplementation(result);

    return result;
  }

  /**
   * Validate script implementation
   */
  validateScriptImplementation(result) {
    if (!result.content) return;

    const content = result.content;

    // Check for async attribute
    if (content.includes('pagead2.googlesyndication.com') && !content.includes('async')) {
      result.issues.push('Missing async attribute');
      result.recommendations.push('Add async attribute for better performance');
    }

    // Check for crossOrigin
    if (content.includes('pagead2.googlesyndication.com') && 
        !content.includes('crossOrigin') && !content.includes('crossorigin')) {
      result.issues.push('Missing crossOrigin attribute');
      result.recommendations.push('Add crossOrigin="anonymous" for security');
    }

    // Check for duplicate scripts
    const scriptMatches = content.match(/pagead2\.googlesyndication\.com/g);
    if (scriptMatches && scriptMatches.length > 1) {
      result.issues.push('Duplicate AdSense scripts detected');
      result.recommendations.push('Remove duplicate script tags');
    }
  }

  /**
   * Check if script is in head section (for static HTML files)
   */
  isScriptInHeadSection(content) {
    const headMatch = content.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
    if (headMatch) {
      return headMatch[1].includes('pagead2.googlesyndication.com');
    }
    return false;
  }

  /**
   * Log file result
   */
  logFileResult(result) {
    const status = result.hasAdSenseScript && result.correctClientId ? '✅' : '❌';
    console.log(`${status} ${result.file}`);
    console.log(`   📝 Type: ${result.type}`);
    
    if (result.hasAdSenseScript) {
      console.log(`   ✅ AdSense script found`);
      if (result.correctClientId) {
        console.log(`   ✅ Correct client ID: ${this.expectedClientId}`);
      }
    }

    // Log additional details for template files
    if (result.usesNextScript !== undefined) {
      console.log(`   📋 Uses Next.js Script component: ${result.usesNextScript ? 'Yes' : 'No'}`);
    }
    if (result.usesStandardScript !== undefined) {
      console.log(`   📋 Uses standard HTML script: ${result.usesStandardScript ? 'Yes' : 'No'}`);
    }
    if (result.hasAsyncAttribute !== undefined) {
      console.log(`   📋 Has async attribute: ${result.hasAsyncAttribute ? 'Yes' : 'No'}`);
    }
    if (result.hasCrossOrigin !== undefined) {
      console.log(`   📋 Has crossOrigin attribute: ${result.hasCrossOrigin ? 'Yes' : 'No'}`);
    }
    if (result.inHeadSection !== undefined) {
      console.log(`   📋 Script in head section: ${result.inHeadSection ? 'Yes' : 'No'}`);
    }

    if (result.issues.length > 0) {
      console.log(`   ⚠️  Issues: ${result.issues.join(', ')}`);
    }
    if (result.recommendations.length > 0) {
      console.log(`   💡 Recommendations: ${result.recommendations.join(', ')}`);
    }
    console.log();
  }

  /**
   * Generate comprehensive summary
   */
  generateSummary() {
    console.log('📊 COMPREHENSIVE ADSENSE INTEGRATION REPORT\n');
    console.log('='.repeat(60));

    const allFiles = [...this.results.templateFiles, ...this.results.staticFiles];
    
    this.results.summary.totalFiles = allFiles.length;
    this.results.summary.passedFiles = allFiles.filter(f => f.hasAdSenseScript && f.correctClientId).length;
    this.results.summary.failedFiles = this.results.summary.totalFiles - this.results.summary.passedFiles;

    // Collect all issues
    allFiles.forEach(file => {
      if (file.issues.length > 0) {
        this.results.summary.issues.push(`${file.file}: ${file.issues.join(', ')}`);
      }
    });

    console.log('\n📁 FILE SUMMARY:');
    console.log(`   📄 Total files tested: ${this.results.summary.totalFiles}`);
    console.log(`   ✅ Files with correct AdSense integration: ${this.results.summary.passedFiles}`);
    console.log(`   ❌ Files with issues: ${this.results.summary.failedFiles}`);

    console.log('\n🔧 TEMPLATE FILES:');
    this.results.templateFiles.forEach(file => {
      const status = file.hasAdSenseScript && file.correctClientId ? '✅' : '❌';
      console.log(`   ${status} ${file.file} (${file.type})`);
    });

    console.log('\n📄 STATIC FILES:');
    this.results.staticFiles.forEach(file => {
      const status = file.hasAdSenseScript && file.correctClientId ? '✅' : '❌';
      console.log(`   ${status} ${file.file} (${file.type})`);
    });

    if (this.results.summary.issues.length > 0) {
      console.log('\n⚠️  ISSUES FOUND:');
      this.results.summary.issues.forEach(issue => {
        console.log(`   • ${issue}`);
      });
    }

    console.log('\n🎯 OVERALL STATUS:');
    if (this.results.summary.failedFiles === 0) {
      console.log('   ✅ ALL TESTS PASSED - AdSense integration is perfect!');
      console.log('   🚀 Ready for production deployment');
    } else {
      console.log(`   ⚠️  ${this.results.summary.failedFiles} file(s) need attention`);
      console.log('   🔧 Please review and fix the issues above');
    }

    console.log('\n📋 NEXT STEPS:');
    console.log('1. 🌐 Test in browser: http://localhost:3000');
    console.log('2. 🔍 Check browser DevTools for script loading');
    console.log('3. 📱 Test responsive design and mobile compatibility');
    console.log('4. 🚀 Deploy to production when all tests pass');
    console.log('5. 📈 Monitor AdSense dashboard for ad serving');

    return this.results.summary.failedFiles === 0;
  }

  /**
   * Run all tests
   */
  runAllTests() {
    console.log('🚀 Starting Comprehensive AdSense Integration Test...\n');
    
    this.testTemplateFiles();
    this.testStaticFiles();
    
    const success = this.generateSummary();
    
    console.log('\n' + '='.repeat(60));
    console.log(success ? '🎉 ALL TESTS PASSED!' : '⚠️  SOME TESTS FAILED');
    
    return success;
  }
}

// Run tests if this script is executed directly
if (require.main === module) {
  const tester = new ComprehensiveAdSenseTest();
  const success = tester.runAllTests();
  process.exit(success ? 0 : 1);
}

module.exports = ComprehensiveAdSenseTest;
