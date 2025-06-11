#!/usr/bin/env node

/**
 * Grow by MediaVine Integration Test Script
 * 
 * This script verifies that the Grow by MediaVine script is properly integrated
 * across all relevant files in the Verse and Volume website.
 */

const fs = require('fs');
const path = require('path');

class GrowMediaVineTest {
  constructor() {
    this.results = {
      files: [],
      summary: {
        totalFiles: 0,
        passedFiles: 0,
        failedFiles: 0,
        issues: []
      }
    };
    
    // Pattern to match Grow by MediaVine script
    this.growPattern = /faves\.grow\.me\/main\.js/;
    this.siteIdPattern = /U2l0ZTpkMWNiMjgxMC1iNmFjLTRiNGItOTUwMC01NTgxNDMwMzY3NjI=/;
  }

  /**
   * Test all relevant files for Grow by MediaVine integration
   */
  async runTests() {
    console.log('🧪 Testing Grow by MediaVine Integration\n');
    console.log('=' .repeat(50));

    const filesToTest = [
      {
        path: 'src/app/layout.tsx',
        type: 'Next.js App Router Layout',
        description: 'Main layout file for App Router'
      },
      {
        path: 'src/pages/_document.tsx',
        type: 'Next.js Pages Router Document',
        description: 'Document file for Pages Router'
      },
      {
        path: 'src/components/GrowByMediaVine.tsx',
        type: 'React Component',
        description: 'Dedicated Grow by MediaVine component'
      }
    ];

    for (const fileInfo of filesToTest) {
      const result = this.testFile(fileInfo);
      this.results.files.push(result);
      this.logFileResult(result);
    }

    this.generateSummary();
    this.logSummary();
  }

  /**
   * Test individual file for Grow by MediaVine integration
   */
  testFile(fileInfo) {
    const result = {
      ...fileInfo,
      exists: false,
      hasGrowScript: false,
      hasSiteId: false,
      hasDataAttribute: false,
      implementationDetails: '',
      issues: [],
      recommendations: []
    };

    const fullPath = path.join(process.cwd(), fileInfo.path);
    
    if (!fs.existsSync(fullPath)) {
      result.issues.push('File does not exist');
      return result;
    }

    result.exists = true;
    const content = fs.readFileSync(fullPath, 'utf8');

    // Check for Grow script
    if (this.growPattern.test(content)) {
      result.hasGrowScript = true;
    } else {
      result.issues.push('Grow by MediaVine script not found');
    }

    // Check for site ID
    if (this.siteIdPattern.test(content)) {
      result.hasSiteId = true;
    } else if (result.hasGrowScript) {
      result.issues.push('Site ID not found or incorrect');
    }

    // Check for data-grow-initializer attribute
    if (content.includes('data-grow-initializer')) {
      result.hasDataAttribute = true;
    } else if (result.hasGrowScript) {
      result.issues.push('data-grow-initializer attribute not found');
    }

    // Determine implementation type
    if (content.includes('Script') && content.includes('strategy=')) {
      result.implementationDetails = 'Next.js Script component';
    } else if (content.includes('<script')) {
      result.implementationDetails = 'Standard HTML script tag';
    } else if (content.includes('dangerouslySetInnerHTML')) {
      result.implementationDetails = 'React dangerouslySetInnerHTML';
    }

    // Add strategy information
    if (content.includes('afterInteractive')) {
      result.implementationDetails += ' (afterInteractive strategy)';
    }

    // Validate implementation
    this.validateImplementation(result, content);

    return result;
  }

  /**
   * Validate script implementation
   */
  validateImplementation(result, content) {
    // Check for proper defer attribute in the script
    if (result.hasGrowScript && !content.includes('defer')) {
      result.recommendations.push('Consider adding defer attribute for better performance');
    }

    // Check for proper error handling
    if (result.hasGrowScript && !content.includes('window.growMe')) {
      result.issues.push('Missing window.growMe initialization check');
    }

    // Validate site ID format
    if (result.hasSiteId) {
      const siteIdMatch = content.match(/data-grow-faves-site-id['"]=["']([^"']+)["']/);
      if (siteIdMatch && siteIdMatch[1] !== 'U2l0ZTpkMWNiMjgxMC1iNmFjLTRiNGItOTUwMC01NTgxNDMwMzY3NjI=') {
        result.issues.push('Site ID does not match expected value');
      }
    }
  }

  /**
   * Log individual file test result
   */
  logFileResult(result) {
    console.log(`\n📄 ${result.type}: ${result.path}`);
    console.log(`   ${result.description}`);
    
    if (!result.exists) {
      console.log('   ❌ File not found');
      return;
    }

    if (result.hasGrowScript && result.hasSiteId && result.hasDataAttribute) {
      console.log('   ✅ Grow by MediaVine integration: PASSED');
      console.log(`   📋 Implementation: ${result.implementationDetails}`);
    } else {
      console.log('   ❌ Grow by MediaVine integration: FAILED');
    }

    if (result.issues.length > 0) {
      console.log('   🚨 Issues:');
      result.issues.forEach(issue => console.log(`      • ${issue}`));
    }

    if (result.recommendations.length > 0) {
      console.log('   💡 Recommendations:');
      result.recommendations.forEach(rec => console.log(`      • ${rec}`));
    }
  }

  /**
   * Generate test summary
   */
  generateSummary() {
    this.results.summary.totalFiles = this.results.files.length;
    this.results.summary.passedFiles = this.results.files.filter(f => 
      f.exists && f.hasGrowScript && f.hasSiteId && f.hasDataAttribute
    ).length;
    this.results.summary.failedFiles = this.results.summary.totalFiles - this.results.summary.passedFiles;

    // Collect all issues
    this.results.files.forEach(file => {
      if (file.issues.length > 0) {
        this.results.summary.issues.push(`${file.path}: ${file.issues.join(', ')}`);
      }
    });
  }

  /**
   * Log test summary
   */
  logSummary() {
    console.log('\n' + '=' .repeat(50));
    console.log('📊 TEST SUMMARY');
    console.log('=' .repeat(50));
    
    console.log(`Total Files Tested: ${this.results.summary.totalFiles}`);
    console.log(`✅ Passed: ${this.results.summary.passedFiles}`);
    console.log(`❌ Failed: ${this.results.summary.failedFiles}`);
    
    if (this.results.summary.failedFiles === 0) {
      console.log('\n🎉 All tests passed! Grow by MediaVine is properly integrated.');
    } else {
      console.log('\n⚠️  Some tests failed. Please review the issues above.');
      
      if (this.results.summary.issues.length > 0) {
        console.log('\n🚨 Issues Summary:');
        this.results.summary.issues.forEach(issue => console.log(`   • ${issue}`));
      }
    }

    console.log('\n📝 Next Steps:');
    console.log('   1. Fix any issues identified above');
    console.log('   2. Test the website in a browser to verify script loading');
    console.log('   3. Check browser console for any JavaScript errors');
    console.log('   4. Monitor Grow by MediaVine dashboard for analytics');
  }
}

// Run the test
if (require.main === module) {
  const test = new GrowMediaVineTest();
  test.runTests().catch(console.error);
}

module.exports = GrowMediaVineTest;
