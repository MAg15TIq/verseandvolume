const fs = require('fs');
const path = require('path');

class ComprehensiveNovelAudit {
  constructor() {
    this.results = {
      totalNovels: 0,
      issuesFound: 0,
      novels: [],
      summary: {
        missingCovers: 0,
        brokenExternalCovers: 0,
        incompleteMetadata: 0,
        structuralIssues: 0,
        importExportIssues: 0,
        routingIssues: 0
      }
    };
    this.coversDir = path.join(process.cwd(), 'public', 'images', 'covers');
  }

  async auditAllNovels() {
    console.log('🔍 Starting Comprehensive Novel Audit...\n');

    try {
      // Get all novel files
      const novels = await this.getAllNovels();
      this.results.totalNovels = novels.length;

      console.log(`📚 Found ${novels.length} novels to audit\n`);

      for (const novel of novels) {
        await this.auditSingleNovel(novel);
      }

      this.generateReport();
      this.generateActionPlan();

    } catch (error) {
      console.error('❌ Error during audit:', error.message);
    }
  }

  async getAllNovels() {
    const novels = [];

    // Read from the main index file
    const indexPath = path.join(process.cwd(), 'src', 'data', 'novels', 'authors', 'index.ts');
    if (fs.existsSync(indexPath)) {
      const indexContent = fs.readFileSync(indexPath, 'utf8');

      // Extract import statements to find novel files
      const importMatches = indexContent.match(/import\s+{[^}]+}\s+from\s+['"][^'"]+['"];/g);

      if (importMatches) {
        for (const importMatch of importMatches) {
          const pathMatch = importMatch.match(/from\s+['"]([^'"]+)['"]/);
          if (pathMatch) {
            const relativePath = pathMatch[1];
            const fullPath = path.join(process.cwd(), 'src', 'data', 'novels', 'authors', relativePath + '.ts');

            if (fs.existsSync(fullPath)) {
              try {
                const content = fs.readFileSync(fullPath, 'utf8');
                const novelData = this.extractNovelData(content, fullPath);
                if (novelData) {
                  novels.push(novelData);
                }
              } catch (error) {
                console.warn(`⚠️  Could not read ${fullPath}: ${error.message}`);
              }
            }
          }
        }
      }
    }

    // Also check additional novel files
    const additionalFiles = [
      'src/data/novels/authors/additional-novels.ts',
      'src/data/novels/authors/english-love-novels.ts',
      'src/data/novels/authors/urdu-love-novels.ts'
    ];

    for (const filePath of additionalFiles) {
      const fullPath = path.join(process.cwd(), filePath);
      if (fs.existsSync(fullPath)) {
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          const novelsInFile = this.extractMultipleNovels(content, fullPath);
          novels.push(...novelsInFile);
        } catch (error) {
          console.warn(`⚠️  Could not read ${fullPath}: ${error.message}`);
        }
      }
    }

    return novels;
  }

  extractNovelData(content, filePath) {
    try {
      // Extract the main export
      const exportMatch = content.match(/export\s+const\s+(\w+):\s*Book\s*=\s*{([^}]+(?:{[^}]*}[^}]*)*?)};/s);
      if (!exportMatch) return null;

      const novelName = exportMatch[1];
      const novelContent = exportMatch[2];

      // Extract basic properties
      const id = this.extractProperty(novelContent, 'id');
      const title = this.extractProperty(novelContent, 'title');
      const author = this.extractProperty(novelContent, 'author');
      const authorId = this.extractProperty(novelContent, 'authorId');
      const coverImage = this.extractProperty(novelContent, 'coverImage');
      const publishYear = this.extractProperty(novelContent, 'publishYear');
      const language = this.extractProperty(novelContent, 'language');
      const genre = this.extractProperty(novelContent, 'genre');
      const description = this.extractProperty(novelContent, 'description');
      const excerpt = this.extractProperty(novelContent, 'excerpt');

      return {
        id: id ? id.replace(/['"]/g, '') : null,
        title: title ? title.replace(/['"]/g, '') : null,
        author: author ? author.replace(/['"]/g, '') : null,
        authorId: authorId ? authorId.replace(/['"]/g, '') : null,
        coverImage: coverImage ? coverImage.replace(/['"]/g, '') : null,
        publishYear: publishYear ? parseInt(publishYear) : null,
        language: language ? language.replace(/['"]/g, '') : null,
        genre: genre,
        description: description ? description.replace(/['"]/g, '') : null,
        excerpt: excerpt,
        filePath: filePath,
        novelName: novelName,
        rawContent: content
      };
    } catch (error) {
      console.warn(`⚠️  Could not extract novel data from ${filePath}: ${error.message}`);
      return null;
    }
  }

  extractMultipleNovels(content, filePath) {
    const novels = [];

    // Find all novel exports
    const exportMatches = content.match(/export\s+const\s+(\w+):\s*Book\s*=\s*{([^}]+(?:{[^}]*}[^}]*)*?)};/gs);

    if (exportMatches) {
      for (const match of exportMatches) {
        const novel = this.extractNovelData(match, filePath);
        if (novel) {
          novels.push(novel);
        }
      }
    }

    return novels;
  }

  extractProperty(content, property) {
    const regex = new RegExp(`${property}:\\s*([^,\\n]+)`, 'i');
    const match = content.match(regex);
    return match ? match[1].trim() : null;
  }

  async auditSingleNovel(novel) {
    const issues = [];

    console.log(`📖 Auditing: ${novel.title || 'Unknown Title'}`);

    // 1. Check for missing or broken cover images
    const coverIssues = await this.checkCoverImage(novel);
    issues.push(...coverIssues);

    // 2. Check for incomplete metadata
    const metadataIssues = this.checkMetadata(novel);
    issues.push(...metadataIssues);

    // 3. Check structural data issues
    const structuralIssues = this.checkStructuralData(novel);
    issues.push(...structuralIssues);

    // 4. Check import/export issues
    const importExportIssues = this.checkImportExport(novel);
    issues.push(...importExportIssues);

    // 5. Check routing compatibility
    const routingIssues = this.checkRouting(novel);
    issues.push(...routingIssues);

    if (issues.length > 0) {
      this.results.issuesFound++;
    }

    this.results.novels.push({
      ...novel,
      issues: issues,
      hasIssues: issues.length > 0
    });

    if (issues.length > 0) {
      console.log(`   ❌ Found ${issues.length} issue(s)`);
      issues.forEach(issue => console.log(`      - ${issue}`));
    } else {
      console.log(`   ✅ No issues found`);
    }
  }

  async checkCoverImage(novel) {
    const issues = [];

    if (!novel.coverImage) {
      issues.push('Missing cover image');
      this.results.summary.missingCovers++;
      return issues;
    }

    if (novel.coverImage.startsWith('http')) {
      // External URL - check if accessible
      try {
        const https = require('https');
        const http = require('http');
        const client = novel.coverImage.startsWith('https') ? https : http;

        await new Promise((resolve, reject) => {
          const req = client.get(novel.coverImage, (res) => {
            if (res.statusCode >= 400) {
              issues.push(`Broken external cover image (${res.statusCode}): ${novel.coverImage}`);
              this.results.summary.brokenExternalCovers++;
            }
            resolve();
          });
          req.on('error', () => {
            issues.push(`Inaccessible external cover image: ${novel.coverImage}`);
            this.results.summary.brokenExternalCovers++;
            resolve();
          });
          req.setTimeout(5000, () => {
            req.destroy();
            issues.push(`Timeout accessing cover image: ${novel.coverImage}`);
            this.results.summary.brokenExternalCovers++;
            resolve();
          });
        });
      } catch (error) {
        issues.push(`Error checking external cover: ${error.message}`);
        this.results.summary.brokenExternalCovers++;
      }
    } else if (novel.coverImage.startsWith('/images/covers/')) {
      // Local path - check if file exists
      const localPath = path.join(process.cwd(), 'public', novel.coverImage);
      if (!fs.existsSync(localPath)) {
        issues.push(`Missing local cover file: ${novel.coverImage}`);
        this.results.summary.missingCovers++;
      }
    }

    return issues;
  }

  checkMetadata(novel) {
    const issues = [];

    // Check essential fields
    if (!novel.id) {
      issues.push('Missing ID');
      this.results.summary.incompleteMetadata++;
    }

    if (!novel.title) {
      issues.push('Missing title');
      this.results.summary.incompleteMetadata++;
    }

    if (!novel.author) {
      issues.push('Missing author');
      this.results.summary.incompleteMetadata++;
    }

    if (!novel.authorId) {
      issues.push('Missing authorId');
      this.results.summary.incompleteMetadata++;
    }

    if (!novel.description) {
      issues.push('Missing description');
      this.results.summary.incompleteMetadata++;
    }

    if (!novel.excerpt) {
      issues.push('Missing excerpt');
      this.results.summary.incompleteMetadata++;
    }

    if (!novel.language) {
      issues.push('Missing language specification');
      this.results.summary.incompleteMetadata++;
    }

    if (!novel.genre) {
      issues.push('Missing genre classification');
      this.results.summary.incompleteMetadata++;
    }

    if (!novel.publishYear) {
      issues.push('Missing publication year');
      this.results.summary.incompleteMetadata++;
    }

    // Check for invalid language codes
    if (novel.language && !['en', 'ur', 'both'].includes(novel.language)) {
      issues.push(`Invalid language code: ${novel.language}`);
      this.results.summary.incompleteMetadata++;
    }

    return issues;
  }

  checkStructuralData(novel) {
    const issues = [];

    // Check for malformed excerpt arrays
    if (novel.excerpt && novel.rawContent.includes('excerpt:')) {
      const excerptMatch = novel.rawContent.match(/excerpt:\s*(\[[^\]]*\])/s);
      if (excerptMatch) {
        try {
          // Try to parse as JSON-like structure
          const excerptStr = excerptMatch[1];
          if (excerptStr.includes('undefined') || excerptStr.includes('null')) {
            issues.push('Malformed excerpt array with undefined/null values');
            this.results.summary.structuralIssues++;
          }
        } catch (error) {
          issues.push('Invalid excerpt array structure');
          this.results.summary.structuralIssues++;
        }
      }
    }

    // Check for chapter structure issues
    if (novel.rawContent.includes('chapters:')) {
      const chaptersMatch = novel.rawContent.match(/chapters:\s*\[([^\]]*(?:\[[^\]]*\][^\]]*)*)\]/s);
      if (chaptersMatch) {
        const chaptersContent = chaptersMatch[1];
        if (chaptersContent.includes('content: [') && !chaptersContent.includes('content: {')) {
          // Check for mixed content structures
          if (chaptersContent.includes('en:') || chaptersContent.includes('ur:')) {
            issues.push('Inconsistent chapter content structure (mixed string arrays and object structures)');
            this.results.summary.structuralIssues++;
          }
        }
      }
    }

    // Check for invalid ISBN formats
    if (novel.rawContent.includes('isbn:')) {
      const isbnMatch = novel.rawContent.match(/isbn:\s*['"]([^'"]+)['"]/);
      if (isbnMatch) {
        const isbn = isbnMatch[1];
        if (!/^(978|979)-?\d{1,5}-?\d{1,7}-?\d{1,7}-?\d{1}$/.test(isbn.replace(/-/g, ''))) {
          issues.push(`Invalid ISBN format: ${isbn}`);
          this.results.summary.structuralIssues++;
        }
      }
    }

    return issues;
  }

  checkImportExport(novel) {
    const issues = [];

    // Check if novel is properly exported
    if (!novel.novelName) {
      issues.push('Novel export name not found');
      this.results.summary.importExportIssues++;
    }

    // Check if the file has proper import statements
    if (!novel.rawContent.includes("import { Book") && !novel.rawContent.includes("import { Chapter")) {
      issues.push('Missing proper type imports');
      this.results.summary.importExportIssues++;
    }

    return issues;
  }

  checkRouting(novel) {
    const issues = [];

    // Check if ID matches expected routing pattern
    if (novel.id) {
      if (novel.id.includes(' ') || novel.id.includes('_')) {
        issues.push('ID contains spaces or underscores (should use hyphens for routing)');
        this.results.summary.routingIssues++;
      }

      if (novel.id !== novel.id.toLowerCase()) {
        issues.push('ID contains uppercase characters (should be lowercase for routing)');
        this.results.summary.routingIssues++;
      }
    }

    return issues;
  }

  generateReport() {
    console.log('\n📊 COMPREHENSIVE NOVEL AUDIT REPORT');
    console.log('=' .repeat(50));
    console.log(`Total Novels Audited: ${this.results.totalNovels}`);
    console.log(`Novels with Issues: ${this.results.issuesFound}`);
    console.log(`Success Rate: ${((this.results.totalNovels - this.results.issuesFound) / this.results.totalNovels * 100).toFixed(1)}%`);

    console.log('\n📋 ISSUE BREAKDOWN:');
    console.log(`Missing/Broken Covers: ${this.results.summary.missingCovers + this.results.summary.brokenExternalCovers}`);
    console.log(`Incomplete Metadata: ${this.results.summary.incompleteMetadata}`);
    console.log(`Structural Issues: ${this.results.summary.structuralIssues}`);
    console.log(`Import/Export Issues: ${this.results.summary.importExportIssues}`);
    console.log(`Routing Issues: ${this.results.summary.routingIssues}`);

    // Save detailed report
    const reportPath = path.join(process.cwd(), 'comprehensive-novel-audit-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
    console.log(`\n📄 Detailed report saved to: ${reportPath}`);
  }

  generateActionPlan() {
    console.log('\n🎯 ACTION PLAN');
    console.log('=' .repeat(50));

    const problemNovels = this.results.novels.filter(n => n.hasIssues);

    if (problemNovels.length === 0) {
      console.log('✅ No issues found! All novels are properly configured.');
      return;
    }

    console.log('\n🔧 NOVELS REQUIRING FIXES:');
    problemNovels.forEach(novel => {
      console.log(`\n📖 ${novel.title || 'Unknown'} (${novel.id || 'No ID'})`);
      console.log(`   File: ${novel.filePath}`);
      novel.issues.forEach(issue => {
        console.log(`   ❌ ${issue}`);
      });
    });

    console.log('\n🛠️  RECOMMENDED ACTIONS:');
    console.log('1. Fix cover images:');
    console.log('   - Run: node scripts/download-book-covers.js');
    console.log('   - Manually download missing covers to public/images/covers/');
    console.log('2. Complete missing metadata in novel files');
    console.log('3. Fix structural issues in content arrays');
    console.log('4. Ensure proper imports and exports');
    console.log('5. Fix routing-incompatible IDs');
    console.log('6. Test website functionality after fixes');
  }
}

// Run the audit
const auditor = new ComprehensiveNovelAudit();
auditor.auditAllNovels().catch(console.error);
