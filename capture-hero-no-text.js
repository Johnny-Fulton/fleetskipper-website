const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ 
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();
  
  console.log('Loading FleetSkipper homepage...');
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle', timeout: 30000 });
  
  // Hide all text content on the hero section
  await page.evaluate(() => {
    const heroSection = document.querySelector('section');
    if (heroSection) {
      // Hide the content container (which has all the text)
      const contentContainer = heroSection.querySelector('div.relative.mx-auto');
      if (contentContainer) {
        contentContainer.style.display = 'none';
      }
    }
  });
  
  console.log('Taking hero screenshot without text...');
  
  const heroSection = await page.locator('section').first();
  
  await heroSection.screenshot({
    path: '/Users/jonathanfulton/Desktop/fleetskipper-hero-no-text.jpg',
    type: 'jpeg',
    quality: 90
  });
  
  console.log('✅ Hero image with gradient (no text) saved to Desktop!');
  await browser.close();
})();
