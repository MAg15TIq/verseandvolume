#!/usr/bin/env node

/**
 * Google Analytics Integration Test Script
 * Tests that Google Analytics is properly integrated across all pages
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Testing Google Analytics Integration...\n');

// Test files to check
const testFiles = [
  {
    path: 'src/app/layout.tsx',
    type: 'Next.js App Router Layout',
    expectedPatterns: [
      'googletagmanager\\.com/gtag/js\\?id=G-W3HVP0ELHK',
      'G-W3HVP0ELHK'
    ]
  },
  {
    path: 'src/pages/_document.tsx',
    type: 'Next.js Pages Router Document',
    expectedPatterns: [
      'googletagmanager\\.com/gtag/js\\?id=G-W3HVP0ELHK',
      'G-W3HVP0ELHK'
    ]
  },

  {
    path: 'public/demo-audiobook-test.html',
    type: 'Static HTML - Demo Audiobook Test',
    expectedPatterns: [
      'googletagmanager\\.com/gtag/js\\?id=G-W3HVP0ELHK',
      'G-W3HVP0ELHK'
    ]
  },
  {
    path: 'public/test-audio.html',
    type: 'Static HTML - Audio Test',
    expectedPatterns: [
      'googletagmanager\\.com/gtag/js\\?id=G-W3HVP0ELHK',
      'G-W3HVP0ELHK'
    ]
  }
];

let allTestsPassed = true;
let totalTests = 0;
let passedTests = 0;

// Test each file
testFiles.forEach(testFile => {
  console.log(`📄 Testing: ${testFile.type}`);
  console.log(`   File: ${testFile.path}`);
  
  try {
    const filePath = path.join(process.cwd(), testFile.path);
    const content = fs.readFileSync(filePath, 'utf8');
    
    let fileTestsPassed = true;
    
    testFile.expectedPatterns.forEach(pattern => {
      totalTests++;
      const regex = new RegExp(pattern);
      
      if (regex.test(content)) {
        console.log(`   ✅ Found: ${pattern.replace(/\\\\/g, '\\')}`);
        passedTests++;
      } else {
        console.log(`   ❌ Missing: ${pattern.replace(/\\\\/g, '\\')}`);
        fileTestsPassed = false;
        allTestsPassed = false;
      }
    });
    
    // Check for duplicate Google Analytics scripts
    const gtmScriptMatches = content.match(/googletagmanager\.com\/gtag\/js\?id=G-W3HVP0ELHK/g);
    const configMatches = content.match(/gtag\('config', 'G-W3HVP0ELHK'\)/g);
    
    if (gtmScriptMatches && gtmScriptMatches.length > 1) {
      console.log(`   ⚠️  Warning: ${gtmScriptMatches.length} Google Analytics scripts found (should be 1)`);
    }
    
    if (configMatches && configMatches.length > 1) {
      console.log(`   ⚠️  Warning: ${configMatches.length} gtag config calls found (should be 1)`);
    }
    
    if (fileTestsPassed) {
      console.log(`   🎉 All tests passed for this file!`);
    }
    
  } catch (error) {
    console.log(`   ❌ Error reading file: ${error.message}`);
    allTestsPassed = false;
  }
  
  console.log('');
});

// Summary
console.log('📊 Test Summary:');
console.log(`   Total Tests: ${totalTests}`);
console.log(`   Passed: ${passedTests}`);
console.log(`   Failed: ${totalTests - passedTests}`);
console.log(`   Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);

if (allTestsPassed) {
  console.log('\n🎉 All Google Analytics integration tests passed!');
  console.log('✅ Google Analytics is properly integrated across all pages.');
  console.log('\n📋 Next Steps:');
  console.log('1. Deploy the website to production');
  console.log('2. Verify tracking in Google Analytics dashboard');
  console.log('3. Test page views and events are being recorded');
  console.log('4. Set up any custom events or goals as needed');
} else {
  console.log('\n❌ Some Google Analytics integration tests failed.');
  console.log('Please review the issues above and fix them before deploying.');
  process.exit(1);
}
