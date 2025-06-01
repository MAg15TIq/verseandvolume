#!/usr/bin/env node

/**
 * Google AdSense Troubleshooting Script
 * 
 * This script performs comprehensive checks to identify why AdSense
 * might not be recognizing the Verse and Volume website
 */

const fs = require('fs');
const path = require('path');

class AdSenseTroubleshooter {
  constructor() {
    this.issues = [];
    this.recommendations = [];
    this.results = {
      adSenseIntegration: false,
      adsTextFile: false,
      robotsFile: false,
      sitemapFile: false,
      metaTags: false,
      structuredData: false,
      googleAnalytics: false
    };
  }

  /**
   * Run comprehensive AdSense troubleshooting
   */
  async runTroubleshooting() {
    console.log('🔍 Google AdSense Troubleshooting for Verse and Volume\n');
    console.log('=' .repeat(60));

    this.checkAdSenseIntegration();
    this.checkAdsTextFile();
    this.checkRobotsFile();
    this.checkSitemapFile();
    this.checkMetaTags();
    this.checkStructuredData();
    this.checkGoogleAnalytics();
    this.generateRecommendations();
    this.displayResults();
  }

  /**
   * Check AdSense script integration
   */
  checkAdSenseIntegration() {
    console.log('\n📋 Checking AdSense Integration...');
    
    const filesToCheck = [
      'src/app/layout.tsx',
      'src/pages/_document.tsx',
      'public/demo-audiobook-test.html',
      'public/test-audio.html'
    ];

    let hasAdSenseScript = false;
    let correctPublisherId = false;

    filesToCheck.forEach(filePath => {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        
        if (content.includes('pagead2.googlesyndication.com')) {
          hasAdSenseScript = true;
          console.log(`   ✅ AdSense script found in ${filePath}`);
          
          if (content.includes('ca-pub-5754219619080083')) {
            correctPublisherId = true;
          }
        } else {
          console.log(`   ❌ AdSense script missing in ${filePath}`);
        }
      }
    });

    if (hasAdSenseScript && correctPublisherId) {
      this.results.adSenseIntegration = true;
      console.log('   ✅ AdSense integration: PASSED');
    } else {
      this.issues.push('AdSense script integration incomplete');
      console.log('   ❌ AdSense integration: FAILED');
    }
  }

  /**
   * Check ads.txt file
   */
  checkAdsTextFile() {
    console.log('\n📋 Checking ads.txt file...');
    
    const adsTextPath = 'public/ads.txt';
    if (fs.existsSync(adsTextPath)) {
      const content = fs.readFileSync(adsTextPath, 'utf8');
      
      if (content.includes('google.com, pub-5754219619080083, DIRECT')) {
        this.results.adsTextFile = true;
        console.log('   ✅ ads.txt file: PASSED');
      } else {
        this.issues.push('ads.txt file has incorrect content');
        console.log('   ❌ ads.txt content: FAILED');
      }
    } else {
      this.issues.push('ads.txt file missing');
      console.log('   ❌ ads.txt file: MISSING');
    }
  }

  /**
   * Check robots.txt file
   */
  checkRobotsFile() {
    console.log('\n📋 Checking robots.txt file...');
    
    const robotsPath = 'public/robots.txt';
    if (fs.existsSync(robotsPath)) {
      const content = fs.readFileSync(robotsPath, 'utf8');
      
      if (content.includes('Allow: /ads.txt') && content.includes('Sitemap:')) {
        this.results.robotsFile = true;
        console.log('   ✅ robots.txt file: PASSED');
      } else {
        this.issues.push('robots.txt file incomplete');
        console.log('   ❌ robots.txt content: INCOMPLETE');
      }
    } else {
      this.issues.push('robots.txt file missing');
      console.log('   ❌ robots.txt file: MISSING');
    }
  }

  /**
   * Check sitemap.xml file
   */
  checkSitemapFile() {
    console.log('\n📋 Checking sitemap.xml file...');
    
    const sitemapPath = 'public/sitemap.xml';
    if (fs.existsSync(sitemapPath)) {
      const content = fs.readFileSync(sitemapPath, 'utf8');
      
      if (content.includes('verseandvolume.online') && content.includes('<urlset')) {
        this.results.sitemapFile = true;
        console.log('   ✅ sitemap.xml file: PASSED');
      } else {
        this.issues.push('sitemap.xml file has incorrect content');
        console.log('   ❌ sitemap.xml content: FAILED');
      }
    } else {
      this.issues.push('sitemap.xml file missing');
      console.log('   ❌ sitemap.xml file: MISSING');
    }
  }

  /**
   * Check meta tags
   */
  checkMetaTags() {
    console.log('\n📋 Checking meta tags...');
    
    const layoutPath = 'src/app/layout.tsx';
    if (fs.existsSync(layoutPath)) {
      const content = fs.readFileSync(layoutPath, 'utf8');
      
      const hasDescription = content.includes('meta name="description"');
      const hasKeywords = content.includes('meta name="keywords"');
      const hasAdSenseMeta = content.includes('google-adsense-account');
      const hasOgTags = content.includes('property="og:');
      
      if (hasDescription && hasKeywords && hasAdSenseMeta && hasOgTags) {
        this.results.metaTags = true;
        console.log('   ✅ Meta tags: PASSED');
      } else {
        this.issues.push('Meta tags incomplete');
        console.log('   ❌ Meta tags: INCOMPLETE');
      }
    }
  }

  /**
   * Check structured data
   */
  checkStructuredData() {
    console.log('\n📋 Checking structured data...');
    
    const layoutPath = 'src/app/layout.tsx';
    if (fs.existsSync(layoutPath)) {
      const content = fs.readFileSync(layoutPath, 'utf8');
      
      if (content.includes('application/ld+json') && content.includes('@context')) {
        this.results.structuredData = true;
        console.log('   ✅ Structured data: PASSED');
      } else {
        this.issues.push('Structured data missing');
        console.log('   ❌ Structured data: MISSING');
      }
    }
  }

  /**
   * Check Google Analytics
   */
  checkGoogleAnalytics() {
    console.log('\n📋 Checking Google Analytics...');
    
    const layoutPath = 'src/app/layout.tsx';
    if (fs.existsSync(layoutPath)) {
      const content = fs.readFileSync(layoutPath, 'utf8');
      
      if (content.includes('googletagmanager.com/gtag/js') && content.includes('G-W3HVP0ELHK')) {
        this.results.googleAnalytics = true;
        console.log('   ✅ Google Analytics: PASSED');
      } else {
        this.issues.push('Google Analytics integration incomplete');
        console.log('   ❌ Google Analytics: FAILED');
      }
    }
  }

  /**
   * Generate recommendations
   */
  generateRecommendations() {
    console.log('\n💡 Generating Recommendations...');
    
    if (this.issues.length === 0) {
      this.recommendations.push('All technical requirements are met. The issue may be:');
      this.recommendations.push('1. Domain verification needed in Google Search Console');
      this.recommendations.push('2. Site needs time for Google to crawl and index');
      this.recommendations.push('3. Manual review required by Google AdSense team');
      this.recommendations.push('4. Content quality assessment pending');
    } else {
      this.recommendations.push('Fix the following issues:');
      this.issues.forEach(issue => {
        this.recommendations.push(`- ${issue}`);
      });
    }
    
    this.recommendations.push('\nNext steps:');
    this.recommendations.push('1. Submit sitemap to Google Search Console');
    this.recommendations.push('2. Verify domain ownership in Google Search Console');
    this.recommendations.push('3. Request indexing for key pages');
    this.recommendations.push('4. Wait 24-48 hours for Google to crawl the site');
    this.recommendations.push('5. Resubmit site to AdSense if needed');
  }

  /**
   * Display final results
   */
  displayResults() {
    console.log('\n' + '=' .repeat(60));
    console.log('📊 TROUBLESHOOTING RESULTS');
    console.log('=' .repeat(60));
    
    console.log('\n✅ PASSED CHECKS:');
    Object.entries(this.results).forEach(([check, passed]) => {
      if (passed) {
        console.log(`   ✅ ${check.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
      }
    });
    
    if (this.issues.length > 0) {
      console.log('\n❌ FAILED CHECKS:');
      this.issues.forEach(issue => {
        console.log(`   ❌ ${issue}`);
      });
    }
    
    console.log('\n💡 RECOMMENDATIONS:');
    this.recommendations.forEach(rec => {
      console.log(`   ${rec}`);
    });
    
    const passedCount = Object.values(this.results).filter(Boolean).length;
    const totalChecks = Object.keys(this.results).length;
    
    console.log(`\n📈 OVERALL SCORE: ${passedCount}/${totalChecks} checks passed`);
    
    if (passedCount === totalChecks) {
      console.log('🎉 All technical requirements met! Issue likely requires manual intervention.');
    } else {
      console.log('⚠️  Technical issues found. Fix these before resubmitting to AdSense.');
    }
  }
}

// Run the troubleshooting
const troubleshooter = new AdSenseTroubleshooter();
troubleshooter.runTroubleshooting();
