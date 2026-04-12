const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  
  console.log('\n🧪 Testing Clickable WBC3 Reference Feature...\n');
  
  // Navigate to WBC3 checker results page (assuming user has localStorage data)
  console.log('1. Opening WBC3 results page...');
  await page.goto('http://localhost:3002/tools/wbc3-checker/results', { waitUntil: 'networkidle' });
  
  await page.waitForTimeout(2000);
  
  // Check if page loaded results or shows "No Results"
  const hasResults = await page.evaluate(() => {
    return !document.body.textContent.includes('No Results Found');
  });
  
  if (!hasResults) {
    console.log('\n⚠️  No WBC3 results found in localStorage.');
    console.log('Please run the WBC3 checker first to generate results.\n');
    await browser.close();
    return;
  }
  
  console.log('✅ Results page loaded successfully');
  
  // Wait a moment for the page to fully render
  await page.waitForTimeout(1000);
  
  // Find the first clickable reference badge
  console.log('\n2. Looking for clickable reference badges...');
  
  const clickableRefFound = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const refButtons = buttons.filter(btn => btn.textContent.includes('📘'));
    return refButtons.length > 0;
  });
  
  if (!clickableRefFound) {
    console.log('❌ No clickable reference badges found on page');
    await browser.close();
    return;
  }
  
  console.log('✅ Found clickable reference badges!');
  
  // Click the first reference badge
  console.log('\n3. Clicking on first WBC3 reference...');
  
  await page.click('button:has-text("📘")');
  
  // Wait for modal to appear
  await page.waitForTimeout(1000);
  
  // Check if modal opened
  const modalOpen = await page.evaluate(() => {
    const modalTitle = document.querySelector('[role="dialog"]');
    return modalTitle !== null;
  });
  
  if (modalOpen) {
    console.log('✅ Modal opened successfully!');
    
    // Get modal content
    const modalContent = await page.evaluate(() => {
      const title = document.querySelector('[role="dialog"] h2')?.textContent || '';
      const text = document.querySelector('[role="dialog"] p')?.textContent || '';
      return { title, text: text.substring(0, 100) + '...' };
    });
    
    console.log('\n📘 Modal Content:');
    console.log(`   Title: ${modalContent.title}`);
    console.log(`   Text: ${modalContent.text}`);
    
    console.log('\n4. Taking screenshot of modal...');
    await page.screenshot({
      path: '/Users/jonathanfulton/Desktop/wbc3-reference-modal.jpg',
      type: 'jpeg',
      quality: 50,
      scale: 'css'
    });
    console.log('✅ Screenshot saved to Desktop as wbc3-reference-modal.jpg');
    
    console.log('\n✅ SUCCESS! Clickable WBC3 reference feature is working!\n');
  } else {
    console.log('❌ Modal did not open');
  }
  
  console.log('Browser will stay open for 30 seconds for you to test...\n');
  await page.waitForTimeout(30000);
  
  await browser.close();
})();
