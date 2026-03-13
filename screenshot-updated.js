const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
  
  // Take updated hero screenshot
  await page.screenshot({
    path: 'hero-updated.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  
  console.log('✅ Updated hero screenshot saved');
  
  // Scroll to "How We Help" section
  await page.evaluate(() => window.scrollTo(0, 1000));
  await page.waitForTimeout(500);
  
  await page.screenshot({
    path: 'how-we-help-updated.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  
  console.log('✅ Updated How We Help screenshot saved');
  
  await browser.close();
})();
