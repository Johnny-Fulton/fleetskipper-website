const { chromium } = require('playwright');

(async () => {
  console.log('\n🚀 Opening WBC3 Checker on localhost:3002 for you to test\n');
  
  const browser = await chromium.launch({ 
    headless: false,
    args: ['--start-maximized']
  });
  
  const context = await browser.newContext({ 
    viewport: null  // Use full screen
  });
  
  const page = await context.newPage();
  
  console.log('📍 Step 1: Opening WBC3 Checker form...');
  await page.goto('http://localhost:3002/tools/wbc3-checker', { waitUntil: 'networkidle' });
  
  await page.waitForTimeout(2000);
  
  console.log('\n✅ Browser is now open at: http://localhost:3002/tools/wbc3-checker');
  console.log('\n📝 TO SEE THE CLICKABLE REFERENCES:');
  console.log('   1. Fill in the form with ANY vessel data');
  console.log('   2. Click "Check Requirements"');
  console.log('   3. On results page, look for reference badges like 📘 WBC3 19.2.7');
  console.log('   4. Click any reference badge to see the modal popup\n');
  console.log('💡 The browser will stay open - test it yourself!\n');
  
  // Keep browser open indefinitely until user closes it
  await new Promise(() => {});
})();
