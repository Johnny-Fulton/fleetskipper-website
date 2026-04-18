const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ 
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();
  
  console.log('Loading FleetSkipper homepage...');
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle', timeout: 30000 });
  
  console.log('Taking hero screenshot...');
  
  // Get the hero section element
  const heroSection = await page.locator('section').first();
  
  await heroSection.screenshot({
    path: '/Users/jonathanfulton/Desktop/fleetskipper-hero-gradient.jpg',
    type: 'jpeg',
    quality: 90
  });
  
  console.log('✅ Hero section with gradient saved to Desktop!');
  await browser.close();
})();
