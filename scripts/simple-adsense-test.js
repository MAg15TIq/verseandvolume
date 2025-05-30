const fs = require('fs');

console.log('🔍 Testing AdSense integration...\n');

// Test layout files
const layoutFiles = ['src/app/layout.tsx', 'src/pages/_document.tsx'];
layoutFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const hasAdSense = content.includes('pagead2.googlesyndication.com');
  console.log(`${hasAdSense ? '✅' : '❌'} ${file}: ${hasAdSense ? 'AdSense script found' : 'AdSense script missing'}`);
});

// Test static files
const staticFiles = ['public/demo-audiobook-test.html', 'public/test-audio.html'];
staticFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const hasAdSense = content.includes('pagead2.googlesyndication.com');
  console.log(`${hasAdSense ? '✅' : '❌'} ${file}: ${hasAdSense ? 'AdSense script found' : 'AdSense script missing'}`);
});

console.log('\n✅ AdSense integration test completed!');
