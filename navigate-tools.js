const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ 
    viewport: { width: 1024, height: 768 }
  });
  const page = await context.newPage();
  
  await page.goto('http://localhost:3002/tools', { waitUntil: 'networkidle', timeout: 15000 });
  
  await page.screenshot({
    path: '/tmp/fleetskipper-tools.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  
  console.log('✅ Tools page loaded!');
  await new Promise(() => {});
})();
