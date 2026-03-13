const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('http://localhost:3002');
  await page.waitForTimeout(2000);
  
  // Scroll to cards section
  const cardsSection = await page.$('.grid.grid-cols-1.gap-6.sm\\:grid-cols-2.lg\\:grid-cols-3');
  if (cardsSection) {
    await cardsSection.scrollIntoViewIfNeeded();
    await page.screenshot({ path: 'cards-section.png', clip: await cardsSection.boundingBox() });
    console.log('Screenshot saved to cards-section.png');
  }
  
  await page.screenshot({ path: 'full-homepage.png', fullPage: true });
  console.log('Full page saved to full-homepage.png');
  
  await browser.close();
})();
