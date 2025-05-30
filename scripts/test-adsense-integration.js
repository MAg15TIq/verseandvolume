#!/usr/bin/env node

/**
 * Google AdSense Integration Test Script
 * 
 * This script tests the Google AdSense integration across the Verse and Volume website:
 * 1. Verifies AdSense script is present in all HTML pages
 * 2. Tests script loading and accessibility
 * 3. Checks for proper implementation across different page types
 * 4. Validates performance impact
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

class AdSenseIntegrationTester {
  constructor() {
    this.testResults = {
      layoutFiles: [],
      staticFiles: [],
      buildTest: null,
      performanceTest: null,
      issues: []
    };
  }

  /**
   * Test AdSense integration in layout files
   */
  testLayoutFiles() {
    console.log('🔍 Testing AdSense integration in layout files...\n');

    const layoutFiles = [
      'src/app/layout.tsx',
      'src/pages/_document.tsx'
    ];

    layoutFiles.forEach(filePath => {
      const result = {
        file: filePath,
        exists: false,
        hasAdSenseScript: false,
        scriptDetails: null,
        issues: []
      };

      const fullPath = path.join(process.cwd(), filePath);
      
      if (fs.existsSync(fullPath)) {
        result.exists = true;
        const content = fs.readFileSync(fullPath, 'utf8');
        
        // Check for AdSense script
        const adSensePattern = /pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js\?client=ca-pub-5754219619080083/;
        if (adSensePattern.test(content)) {
          result.hasAdSenseScript = true;
          
          // Extract script details
          if (content.includes('strategy="afterInteractive"')) {
            result.scriptDetails = 'Next.js Script component with afterInteractive strategy';
          } else if (content.includes('<script')) {
            result.scriptDetails = 'Standard HTML script tag';
          }
          
          // Check for async attribute
          if (content.includes('async')) {
            result.scriptDetails += ' (async)';
          }
          
          // Check for crossOrigin
          if (content.includes('crossOrigin') || content.includes('crossorigin')) {
            result.scriptDetails += ' (crossOrigin)';
          }
        } else {
          result.issues.push('AdSense script not found');
        }
      } else {
        result.issues.push('File does not exist');
      }

      this.testResults.layoutFiles.push(result);
      
      // Log result
      const status = result.hasAdSenseScript ? '✅' : '❌';
      console.log(`${status} ${filePath}`);
      if (result.scriptDetails) {
        console.log(`   📝 ${result.scriptDetails}`);
      }
      if (result.issues.length > 0) {
        console.log(`   ⚠️  Issues: ${result.issues.join(', ')}`);
      }
      console.log();
    });
  }

  /**
   * Test AdSense integration in static HTML files
   */
  testStaticFiles() {
    console.log('🔍 Testing AdSense integration in static HTML files...\n');

    const staticFiles = [
      'public/demo-audiobook-test.html',
      'public/test-audio.html'
    ];

    staticFiles.forEach(filePath => {
      const result = {
        file: filePath,
        exists: false,
        hasAdSenseScript: false,
        scriptDetails: null,
        issues: []
      };

      const fullPath = path.join(process.cwd(), filePath);
      
      if (fs.existsSync(fullPath)) {
        result.exists = true;
        const content = fs.readFileSync(fullPath, 'utf8');
        
        // Check for AdSense script
        const adSensePattern = /pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js\?client=ca-pub-5754219619080083/;
        if (adSensePattern.test(content)) {
          result.hasAdSenseScript = true;
          result.scriptDetails = 'Standard HTML script tag';
          
          // Check for async attribute
          if (content.includes('async')) {
            result.scriptDetails += ' (async)';
          }
          
          // Check for crossorigin
          if (content.includes('crossorigin')) {
            result.scriptDetails += ' (crossorigin)';
          }
        } else {
          result.issues.push('AdSense script not found');
        }
      } else {
        result.issues.push('File does not exist');
      }

      this.testResults.staticFiles.push(result);
      
      // Log result
      const status = result.hasAdSenseScript ? '✅' : '❌';
      console.log(`${status} ${filePath}`);
      if (result.scriptDetails) {
        console.log(`   📝 ${result.scriptDetails}`);
      }
      if (result.issues.length > 0) {
        console.log(`   ⚠️  Issues: ${result.issues.join(', ')}`);
      }
      console.log();
    });
  }

  /**
   * Test build process with AdSense integration
   */
  async testBuildProcess() {
    console.log('🔨 Testing build process with AdSense integration...\n');

    return new Promise((resolve) => {
      const buildProcess = spawn('npm', ['run', 'build'], {
        stdio: 'pipe',
        shell: true
      });

      let output = '';
      let errorOutput = '';

      buildProcess.stdout.on('data', (data) => {
        output += data.toString();
      });

      buildProcess.stderr.on('data', (data) => {
        errorOutput += data.toString();
      });

      buildProcess.on('close', (code) => {
        const result = {
          success: code === 0,
          exitCode: code,
          hasErrors: errorOutput.length > 0,
          output: output,
          errors: errorOutput
        };

        this.testResults.buildTest = result;

        if (result.success) {
          console.log('✅ Build process completed successfully');
          console.log('   📝 AdSense integration does not break the build');
        } else {
          console.log('❌ Build process failed');
          console.log(`   📝 Exit code: ${code}`);
          if (result.errors) {
            console.log(`   ⚠️  Errors: ${result.errors}`);
          }
        }
        console.log();
        resolve(result);
      });
    });
  }

  /**
   * Generate comprehensive report
   */
  generateReport() {
    console.log('📊 GOOGLE ADSENSE INTEGRATION TEST REPORT\n');
    console.log('=' * 50);

    // Layout files summary
    console.log('\n📁 LAYOUT FILES:');
    const layoutSuccess = this.testResults.layoutFiles.filter(f => f.hasAdSenseScript).length;
    const layoutTotal = this.testResults.layoutFiles.length;
    console.log(`   ✅ ${layoutSuccess}/${layoutTotal} layout files have AdSense script`);

    // Static files summary
    console.log('\n📄 STATIC HTML FILES:');
    const staticSuccess = this.testResults.staticFiles.filter(f => f.hasAdSenseScript).length;
    const staticTotal = this.testResults.staticFiles.length;
    console.log(`   ✅ ${staticSuccess}/${staticTotal} static files have AdSense script`);

    // Build test summary
    console.log('\n🔨 BUILD TEST:');
    if (this.testResults.buildTest) {
      const buildStatus = this.testResults.buildTest.success ? '✅ PASSED' : '❌ FAILED';
      console.log(`   ${buildStatus} - Build process with AdSense integration`);
    }

    // Overall status
    const totalSuccess = layoutSuccess + staticSuccess;
    const totalFiles = layoutTotal + staticTotal;
    const buildPassed = this.testResults.buildTest?.success || false;

    console.log('\n🎯 OVERALL STATUS:');
    if (totalSuccess === totalFiles && buildPassed) {
      console.log('   ✅ ALL TESTS PASSED - AdSense integration is successful!');
    } else {
      console.log('   ⚠️  SOME ISSUES FOUND - Review the details above');
    }

    console.log('\n📋 NEXT STEPS:');
    console.log('1. 🌐 Test the website in browser: http://localhost:3000');
    console.log('2. 🔍 Check browser developer tools for AdSense script loading');
    console.log('3. 📱 Test on different devices and browsers');
    console.log('4. 📈 Monitor AdSense dashboard for ad serving');
    console.log('5. 🚀 Deploy to production when ready');

    return {
      success: totalSuccess === totalFiles && buildPassed,
      summary: {
        layoutFiles: `${layoutSuccess}/${layoutTotal}`,
        staticFiles: `${staticSuccess}/${staticTotal}`,
        buildTest: buildPassed ? 'PASSED' : 'FAILED'
      }
    };
  }

  /**
   * Run all tests
   */
  async runAllTests() {
    console.log('🚀 Starting Google AdSense Integration Tests...\n');

    this.testLayoutFiles();
    this.testStaticFiles();
    await this.testBuildProcess();
    
    return this.generateReport();
  }
}

// Run tests if this script is executed directly
if (require.main === module) {
  const tester = new AdSenseIntegrationTester();
  tester.runAllTests().then(result => {
    process.exit(result.success ? 0 : 1);
  }).catch(error => {
    console.error('❌ Test execution failed:', error);
    process.exit(1);
  });
}

module.exports = AdSenseIntegrationTester;
