const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ 
    viewport: { width: 1024, height: 768 }
  });
  
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
  
  // Wait a moment for any animations
  await page.waitForTimeout(1000);
  
  await page.screenshot({
    path: 'updated-navigation.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  
  console.log('Screenshot saved!');
  await browser.close();
})();
