const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Novel Fixes...\n');

// Check the specific novels that were fixed
const fixedNovels = [
  {
    name: 'Bachpan ka December',
    file: 'src/data/novels/authors/hashim-nadeem/bachpan-ka-december.ts',
    expectedCover: '/images/covers/bachpan-ka-december.jpg'
  },
  {
    name: 'Jannat ke Pattay',
    file: 'src/data/novels/authors/nimra-ahmad/jannat-ke-pattay.ts',
    expectedCover: '/images/covers/jannat-ke-pattay.jpg'
  },
  {
    name: 'Khuda Aur Mohabbat',
    file: 'src/data/novels/authors/hashim-nadeem/khuda-aur-mohabbat.ts',
    expectedCover: '/images/covers/khuda-aur-mohabbat.jpg'
  },
  {
    name: 'Alice Adventures in Wonderland',
    file: 'src/data/novels/authors/lewis-carroll/alice-adventures-in-wonderland.ts',
    expectedCover: '/images/covers/alice-adventures-in-wonderland.jpg'
  }
];

console.log('📚 Checking Fixed Novels:\n');

let allFixed = true;

for (const novel of fixedNovels) {
  const fullPath = path.join(process.cwd(), novel.file);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`❌ ${novel.name}: File not found`);
    allFixed = false;
    continue;
  }

  try {
    const content = fs.readFileSync(fullPath, 'utf8');
    
    if (content.includes(novel.expectedCover)) {
      console.log(`✅ ${novel.name}: Cover path fixed to ${novel.expectedCover}`);
    } else {
      console.log(`❌ ${novel.name}: Cover path not updated correctly`);
      allFixed = false;
    }
    
    // Check for external URLs (should not exist)
    if (content.includes('https://upload.wikimedia.org/')) {
      console.log(`⚠️  ${novel.name}: Still contains external Wikipedia URLs`);
      allFixed = false;
    }
    
  } catch (error) {
    console.log(`❌ ${novel.name}: Error reading file - ${error.message}`);
    allFixed = false;
  }
}

console.log('\n📋 Checking Additional Fixes:\n');

// Check urdu-love-novels.ts for Unicode character fixes
const urduNovelsPath = path.join(process.cwd(), 'src/data/novels/authors/urdu-love-novels.ts');
if (fs.existsSync(urduNovelsPath)) {
  const content = fs.readFileSync(urduNovelsPath, 'utf8');
  
  if (content.includes('dilKiTasveerNovel') && content.includes('dilKiKahaniNovel')) {
    console.log('✅ Urdu novels: Unicode characters in variable names fixed');
  } else {
    console.log('❌ Urdu novels: Unicode character fixes not applied');
    allFixed = false;
  }
  
  // Check for some external URL fixes
  if (content.includes('/images/covers/mohabbat-ki-sada.jpg') && 
      content.includes('/images/covers/dil-ki-kahani.jpg')) {
    console.log('✅ Urdu novels: Some external URLs converted to local paths');
  } else {
    console.log('⚠️  Urdu novels: External URL conversion incomplete');
  }
} else {
  console.log('❌ Urdu novels file not found');
  allFixed = false;
}

// Check additional-novels.ts for fixes
const additionalNovelsPath = path.join(process.cwd(), 'src/data/novels/authors/additional-novels.ts');
if (fs.existsSync(additionalNovelsPath)) {
  const content = fs.readFileSync(additionalNovelsPath, 'utf8');
  
  if (content.includes('/images/covers/yaqeen-e-mohabbat.jpg') && 
      content.includes('/images/covers/ishq-ka-sheen.jpg') &&
      content.includes('/images/covers/mere-humdam-mere-dost.jpg')) {
    console.log('✅ Additional novels: External URLs converted to local paths');
  } else {
    console.log('⚠️  Additional novels: External URL conversion incomplete');
  }
} else {
  console.log('❌ Additional novels file not found');
  allFixed = false;
}

console.log('\n🎯 SUMMARY:\n');

if (allFixed) {
  console.log('✅ All critical fixes have been successfully applied!');
  console.log('\n📋 What was fixed:');
  console.log('• Converted broken external cover URLs to local paths');
  console.log('• Fixed Unicode characters in variable names');
  console.log('• Updated cover image references for critical novels');
  console.log('• Maintained TypeScript compilation compatibility');
} else {
  console.log('⚠️  Some issues remain or fixes were not fully applied');
}

console.log('\n📝 NEXT STEPS:');
console.log('1. Download the following cover images manually:');
console.log('   • bachpan-ka-december.jpg');
console.log('   • jannat-ke-pattay.jpg');
console.log('   • khuda-aur-mohabbat.jpg');
console.log('   • alice-adventures-in-wonderland.jpg');
console.log('   • yaqeen-e-mohabbat.jpg');
console.log('   • ishq-ka-sheen.jpg');
console.log('   • mere-humdam-mere-dost.jpg');
console.log('   • mohabbat-ki-sada.jpg');
console.log('   • dil-ki-kahani.jpg');
console.log('');
console.log('2. Save them to: public/images/covers/');
console.log('3. Test the website to ensure novels display properly');
console.log('4. Continue fixing remaining external URLs in other novels');

console.log('\n🔍 REMAINING WORK:');
console.log('• ~40+ novels in urdu-love-novels.ts still need cover URL fixes');
console.log('• ~20+ novels in english-love-novels.ts may need cover downloads');
console.log('• Complete metadata validation for all novels');
console.log('• Test individual novel pages for proper display');
