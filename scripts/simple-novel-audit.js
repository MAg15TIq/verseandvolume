const fs = require('fs');
const path = require('path');

console.log('🔍 Starting Simple Novel Audit...\n');

// Check specific novel files
const novelFiles = [
  'src/data/novels/authors/hashim-nadeem/bachpan-ka-december.ts',
  'src/data/novels/authors/nimra-ahmad/jannat-ke-pattay.ts',
  'src/data/novels/authors/bano-qudsia/raja-gidh.ts',
  'src/data/novels/authors/qurratulain-hyder/aag-ka-darya.ts',
  'src/data/novels/authors/umera-ahmed/peer-e-kamil.ts',
  'src/data/novels/authors/jane-austen/pride-and-prejudice.ts',
  'src/data/novels/authors/nicholas-sparks/the-notebook.ts',
  'src/data/novels/authors/nicholas-sparks/a-walk-to-remember.ts',
  'src/data/novels/authors/jojo-moyes/me-before-you.ts',
  'src/data/novels/authors/fyodor-dostoevsky/crime-and-punishment.ts',
  'src/data/novels/authors/lewis-carroll/alice-adventures-in-wonderland.ts',
  'src/data/novels/authors/hashim-nadeem/khuda-aur-mohabbat.ts'
];

const issues = [];
const coversDir = path.join(process.cwd(), 'public', 'images', 'covers');

function extractCoverImage(content) {
  const match = content.match(/coverImage:\s*['"`]([^'"`]+)['"`]/);
  return match ? match[1] : null;
}

function extractBasicInfo(content) {
  const id = content.match(/id:\s*['"`]([^'"`]+)['"`]/);
  const title = content.match(/title:\s*['"`]([^'"`]+)['"`]/);
  const author = content.match(/author:\s*['"`]([^'"`]+)['"`]/);
  const description = content.match(/description:\s*['"`]([^'"`]+)['"`]/);
  
  return {
    id: id ? id[1] : null,
    title: title ? title[1] : null,
    author: author ? author[1] : null,
    description: description ? description[1] : null
  };
}

console.log('📚 Checking individual novel files...\n');

for (const filePath of novelFiles) {
  const fullPath = path.join(process.cwd(), filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`❌ File not found: ${filePath}`);
    issues.push({
      file: filePath,
      issue: 'File not found',
      type: 'missing-file'
    });
    continue;
  }

  try {
    const content = fs.readFileSync(fullPath, 'utf8');
    const info = extractBasicInfo(content);
    const coverImage = extractCoverImage(content);
    
    console.log(`📖 ${info.title || 'Unknown Title'} (${info.id || 'No ID'})`);
    
    // Check cover image
    if (!coverImage) {
      console.log(`   ❌ Missing cover image`);
      issues.push({
        file: filePath,
        novel: info.title,
        id: info.id,
        issue: 'Missing cover image',
        type: 'missing-cover'
      });
    } else if (coverImage.startsWith('/images/covers/')) {
      const localCoverPath = path.join(process.cwd(), 'public', coverImage);
      if (!fs.existsSync(localCoverPath)) {
        console.log(`   ❌ Missing local cover file: ${coverImage}`);
        issues.push({
          file: filePath,
          novel: info.title,
          id: info.id,
          issue: `Missing local cover file: ${coverImage}`,
          type: 'missing-local-cover',
          coverPath: coverImage
        });
      } else {
        console.log(`   ✅ Local cover exists: ${coverImage}`);
      }
    } else if (coverImage.startsWith('http')) {
      console.log(`   ⚠️  External cover URL: ${coverImage}`);
      issues.push({
        file: filePath,
        novel: info.title,
        id: info.id,
        issue: `External cover URL (should be local): ${coverImage}`,
        type: 'external-cover',
        coverUrl: coverImage
      });
    }
    
    // Check basic metadata
    if (!info.id) {
      console.log(`   ❌ Missing ID`);
      issues.push({
        file: filePath,
        novel: info.title,
        issue: 'Missing ID',
        type: 'missing-metadata'
      });
    }
    
    if (!info.title) {
      console.log(`   ❌ Missing title`);
      issues.push({
        file: filePath,
        novel: 'Unknown',
        issue: 'Missing title',
        type: 'missing-metadata'
      });
    }
    
    if (!info.author) {
      console.log(`   ❌ Missing author`);
      issues.push({
        file: filePath,
        novel: info.title,
        id: info.id,
        issue: 'Missing author',
        type: 'missing-metadata'
      });
    }
    
    if (!info.description) {
      console.log(`   ❌ Missing description`);
      issues.push({
        file: filePath,
        novel: info.title,
        id: info.id,
        issue: 'Missing description',
        type: 'missing-metadata'
      });
    }
    
    if (issues.filter(i => i.file === filePath).length === 0) {
      console.log(`   ✅ No major issues found`);
    }
    
  } catch (error) {
    console.log(`   ❌ Error reading file: ${error.message}`);
    issues.push({
      file: filePath,
      issue: `Error reading file: ${error.message}`,
      type: 'read-error'
    });
  }
  
  console.log('');
}

// Check additional novel files
console.log('📚 Checking additional novel collections...\n');

const additionalFiles = [
  'src/data/novels/authors/additional-novels.ts',
  'src/data/novels/authors/english-love-novels.ts',
  'src/data/novels/authors/urdu-love-novels.ts'
];

for (const filePath of additionalFiles) {
  const fullPath = path.join(process.cwd(), filePath);
  
  if (fs.existsSync(fullPath)) {
    console.log(`📁 Checking ${filePath}...`);
    
    try {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Count novels in file
      const novelMatches = content.match(/export const \w+Novel: Book = {/g);
      const novelCount = novelMatches ? novelMatches.length : 0;
      console.log(`   Found ${novelCount} novels in file`);
      
      // Check for external cover URLs
      const externalCovers = content.match(/coverImage: 'https?:\/\/[^']+'/g);
      if (externalCovers) {
        console.log(`   ⚠️  Found ${externalCovers.length} external cover URLs`);
        externalCovers.forEach(cover => {
          const url = cover.match(/'([^']+)'/)[1];
          issues.push({
            file: filePath,
            issue: `External cover URL: ${url}`,
            type: 'external-cover',
            coverUrl: url
          });
        });
      }
      
    } catch (error) {
      console.log(`   ❌ Error reading file: ${error.message}`);
    }
  } else {
    console.log(`❌ File not found: ${filePath}`);
  }
  
  console.log('');
}

// Generate summary
console.log('📊 AUDIT SUMMARY');
console.log('=' .repeat(50));
console.log(`Total Issues Found: ${issues.length}`);

const issueTypes = {};
issues.forEach(issue => {
  issueTypes[issue.type] = (issueTypes[issue.type] || 0) + 1;
});

console.log('\n📋 Issues by Type:');
Object.entries(issueTypes).forEach(([type, count]) => {
  console.log(`${type}: ${count}`);
});

// Save report
const reportPath = path.join(process.cwd(), 'simple-novel-audit-report.json');
fs.writeFileSync(reportPath, JSON.stringify({
  timestamp: new Date().toISOString(),
  totalIssues: issues.length,
  issueTypes: issueTypes,
  issues: issues
}, null, 2));

console.log(`\n📄 Report saved to: ${reportPath}`);

console.log('\n🎯 PRIORITY FIXES NEEDED:');
console.log('1. Fix missing/broken cover images');
console.log('2. Complete missing metadata fields');
console.log('3. Convert external cover URLs to local files');
console.log('4. Test novel pages for proper display');
