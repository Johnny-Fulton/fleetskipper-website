const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ 
    viewport: { width: 1024, height: 768 }
  });
  
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  
  await page.screenshot({
    path: 'final-navigation.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  
  console.log('Final navigation screenshot saved!');
  await browser.close();
})();
