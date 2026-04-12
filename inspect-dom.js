const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

  console.log('Opening localhost:3002...');
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });

  await page.waitForTimeout(2000);

  // Check if specific text content exists
  const smsHeading = await page.textContent('body');
  console.log('\n=== CHECKING FOR CONTENT ===');
  console.log('Page contains "SMS Consultancy":', smsHeading.includes('SMS Consultancy'));
  console.log('Page contains "FleetSkipper App":', smsHeading.includes('FleetSkipper App'));
  console.log('Page contains "Complete SMS Documentation":', smsHeading.includes('Complete SMS Documentation'));

  // Count elements
  const cardCount = await page.$$eval('.rounded-3xl', cards => cards.length);
  const iconCount = await page.$$eval('svg', icons => icons.length);

  console.log('\n=== ELEMENT COUNTS ===');
  console.log('Rounded cards found:', cardCount);
  console.log('SVG icons found:', iconCount);

  // Get HTML of first card
  const firstCardHTML = await page.evaluate(() => {
    const cards = document.querySelectorAll('.rounded-3xl');
    if (cards.length > 0) {
      return cards[0].innerHTML.substring(0, 800);
    }
    return 'No cards found';
  });

  console.log('\n=== FIRST CARD INNER HTML ===');
  console.log(firstCardHTML);

  console.log('\nBrowser staying open for inspection...');
  await page.waitForTimeout(60000);

  await browser.close();
})();
