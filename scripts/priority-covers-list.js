#!/usr/bin/env node

/**
 * Priority Cover Images List Generator
 * Generates a prioritized list of cover images that need to be downloaded
 */

const fs = require('fs');
const path = require('path');

// Priority categories
const priorityCategories = {
  'URGENT - Urdu Love Novels': [
    'mohabbat-ki-sargam.jpg',
    'ishq-ki-dastan.jpg', 
    'dil-ki-rani.jpg',
    'mohabbat-ka-jadoo.jpg',
    'ishq-ki-manzil-new.jpg',
    'mohabbat-ki-khushbu-new.jpg',
    'dil-ki-dunya.jpg',
    'mohabbat-ki-reet.jpg',
    'ishq-ki-aag.jpg',
    'mohabbat-ki-khwahish-new.jpg',
    'dil-ki-tasveer.jpg',
    'mohabbat-ki-gali.jpg',
    'ishq-ki-mehfil-new.jpg'
  ],
  
  'HIGH - Urdu Classics': [
    'raja-gidh.jpg',
    'aag-ka-darya.jpg', 
    'peer-e-kamil.jpg'
  ],
  
  'MEDIUM - Popular Urdu Novels': [
    'khuda-aur-mohabbat.jpg',
    'bachpan-ka-december.jpg',
    'jannat-ke-pattay.jpg',
    'namal.jpg',
    'humsafar.jpg',
    'mushaf.jpg',
    'pani-da-rang.jpg',
    'haalim.jpg',
    'diyar-e-dil.jpg'
  ],
  
  'LOWER - Additional Content': [
    'mere-humdam-mere-dost.jpg',
    'kuch-ishq-tha-kuch-majazi.jpg',
    'dil-se-dil-tak.jpg',
    'the-bell-jar.jpg',
    'to-kill-a-mockingbird.jpg',
    'the-great-gatsby.jpg',
    '1984.jpg'
  ]
};

function checkCoverExists(filename) {
  const coverPath = path.join(__dirname, '..', 'public', 'images', 'covers', filename);
  return fs.existsSync(coverPath);
}

function generatePriorityList() {
  console.log('🎯 PRIORITY COVER IMAGES TO DOWNLOAD\n');
  console.log('Generated on:', new Date().toISOString());
  console.log('=' .repeat(60));
  
  let totalNeeded = 0;
  let totalChecked = 0;
  
  Object.entries(priorityCategories).forEach(([category, covers]) => {
    console.log(`\n📋 ${category} (${covers.length} images)`);
    console.log('-'.repeat(50));
    
    let categoryNeeded = 0;
    
    covers.forEach((cover, index) => {
      totalChecked++;
      const exists = checkCoverExists(cover);
      const status = exists ? '✅ Available' : '❌ NEEDED';
      
      if (!exists) {
        categoryNeeded++;
        totalNeeded++;
      }
      
      console.log(`${index + 1}. ${cover.padEnd(35)} ${status}`);
    });
    
    console.log(`\nCategory Summary: ${categoryNeeded}/${covers.length} needed`);
  });
  
  console.log('\n' + '='.repeat(60));
  console.log(`📊 OVERALL SUMMARY`);
  console.log(`Total Images Checked: ${totalChecked}`);
  console.log(`Images Available: ${totalChecked - totalNeeded}`);
  console.log(`Images Needed: ${totalNeeded}`);
  console.log(`Completion Rate: ${Math.round(((totalChecked - totalNeeded) / totalChecked) * 100)}%`);
  
  console.log('\n🚀 RECOMMENDED DOWNLOAD ORDER:');
  console.log('1. Start with URGENT category (13 images)');
  console.log('2. Then HIGH priority (3 images)'); 
  console.log('3. Follow with MEDIUM priority (9 images)');
  console.log('4. Complete with LOWER priority as needed');
  
  console.log('\n💡 TIP: Focus on categories with highest user impact first!');
}

// Run the script
try {
  generatePriorityList();
} catch (error) {
  console.error('Error generating priority list:', error);
  process.exit(1);
}
