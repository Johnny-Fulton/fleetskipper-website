const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
  
  // Take homepage screenshot
  await page.screenshot({
    path: 'homepage-screenshot.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  
  console.log('✅ Homepage screenshot saved');
  
  // Scroll down to see "How We Help" section
  await page.evaluate(() => window.scrollTo(0, 800));
  await page.waitForTimeout(500);
  
  await page.screenshot({
    path: 'homepage-how-we-help.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  
  console.log('✅ How We Help section screenshot saved');
  
  await browser.close();
})();
