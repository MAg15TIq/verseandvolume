#!/usr/bin/env node

/**
 * Create Demo Audio Files Script
 * 
 * This script creates small demo audio files for testing audiobook functionality
 * when authentic audiobook files are not available.
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  audioDir: path.join(__dirname, '..', 'public', 'audio', 'books'),
  
  // Demo books to create audio files for
  demoBooks: [
    {
      id: 'crime-and-punishment-dostoevsky',
      chapters: [
        'part-1-chapter-1',
        'part-1-chapter-2', 
        'part-1-chapter-3',
        'part-2-chapter-1',
        'epilogue-chapter-1'
      ]
    },
    {
      id: 'pride-and-prejudice',
      chapters: [
        'chapter-01',
        'chapter-02',
        'chapter-03'
      ]
    },
    {
      id: 'the-notebook',
      chapters: [
        'chapter-01',
        'chapter-02'
      ]
    }
  ]
};

/**
 * Create a minimal MP3 file with silence
 * This creates a valid MP3 file that browsers can play
 */
function createDemoMP3(filePath, durationSeconds = 10) {
  // Create directory if it doesn't exist
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // Create a minimal MP3 header for a silent audio file
  // This is a very basic MP3 frame header for silence
  const mp3Header = Buffer.from([
    0xFF, 0xFB, 0x90, 0x00, // MP3 frame header
    0x00, 0x00, 0x00, 0x00, // Additional header data
    0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00
  ]);
  
  // Create silence data (zeros)
  const frameSize = 144; // Typical MP3 frame size
  const framesNeeded = Math.ceil(durationSeconds * 38.28); // Approximate frames per second
  const silenceData = Buffer.alloc(frameSize * framesNeeded, 0);
  
  // Combine header and silence
  const mp3Data = Buffer.concat([mp3Header, silenceData]);
  
  fs.writeFileSync(filePath, mp3Data);
  return mp3Data.length;
}

/**
 * Create demo audio files for all configured books
 */
async function createDemoAudioFiles() {
  console.log('🎵 Creating demo audio files for testing...\n');
  
  let totalFiles = 0;
  let totalSize = 0;
  
  for (const book of CONFIG.demoBooks) {
    console.log(`📚 Creating demo files for: ${book.id}`);
    
    const bookDir = path.join(CONFIG.audioDir, book.id, 'en');
    
    for (const chapter of book.chapters) {
      const filePath = path.join(bookDir, `${chapter}.mp3`);
      
      try {
        const fileSize = createDemoMP3(filePath, 30); // 30 seconds of silence
        console.log(`✅ Created: ${chapter}.mp3 (${fileSize} bytes)`);
        totalFiles++;
        totalSize += fileSize;
      } catch (error) {
        console.error(`❌ Failed to create ${chapter}.mp3:`, error.message);
      }
    }
    
    console.log(''); // Empty line between books
  }
  
  console.log(`🎉 Demo audio creation completed!`);
  console.log(`📊 Summary:`);
  console.log(`✅ Files created: ${totalFiles}`);
  console.log(`📁 Total size: ${(totalSize / 1024).toFixed(2)} KB`);
  console.log(`\n📝 Note: These are demo files with silence for testing purposes.`);
  console.log(`Replace with authentic audiobook files when available.`);
}

/**
 * Create a test HTML page for the demo files
 */
function createTestPage() {
  const testPageContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Demo Audiobook Test</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .book-section { margin: 20px 0; padding: 15px; border: 1px solid #ddd; }
        audio { width: 100%; margin: 5px 0; }
    </style>
</head>
<body>
    <h1>🎧 Demo Audiobook Test</h1>
    <p>Testing demo audio files (silent MP3s for functionality testing)</p>
    
    <div class="book-section">
        <h2>Crime and Punishment</h2>
        <audio controls>
            <source src="/audio/books/crime-and-punishment-dostoevsky/en/part-1-chapter-1.mp3" type="audio/mpeg">
        </audio>
        <audio controls>
            <source src="/audio/books/crime-and-punishment-dostoevsky/en/part-1-chapter-2.mp3" type="audio/mpeg">
        </audio>
    </div>
    
    <div class="book-section">
        <h2>Pride and Prejudice</h2>
        <audio controls>
            <source src="/audio/books/pride-and-prejudice/en/chapter-01.mp3" type="audio/mpeg">
        </audio>
    </div>
    
    <script>
        console.log('Demo audiobook test page loaded');
        
        // Test all audio elements
        document.querySelectorAll('audio').forEach((audio, index) => {
            audio.addEventListener('loadstart', () => {
                console.log(\`Audio \${index + 1}: Loading started\`);
            });
            
            audio.addEventListener('canplay', () => {
                console.log(\`Audio \${index + 1}: Can play\`);
            });
            
            audio.addEventListener('error', (e) => {
                console.error(\`Audio \${index + 1}: Error\`, e);
            });
        });
    </script>
</body>
</html>`;

  const testPagePath = path.join(__dirname, '..', 'public', 'demo-audiobook-test.html');
  fs.writeFileSync(testPagePath, testPageContent);
  console.log(`📄 Test page created: ${testPagePath}`);
}

// Run the script
if (require.main === module) {
  createDemoAudioFiles()
    .then(() => {
      createTestPage();
      console.log('\n🚀 Ready to test audiobook functionality!');
      console.log('Visit: http://localhost:3000/demo-audiobook-test.html');
    })
    .catch(console.error);
}

module.exports = { createDemoAudioFiles, createDemoMP3 };
