const { chromium } = require('playwright');
const fs = require('fs');

async function takeScreenshots() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    console.log('Navigating to About page...');
    await page.goto('http://localhost:3001/about', { waitUntil: 'networkidle' });
    
    console.log('Waiting for page to fully load...');
    await page.waitForLoadState('load');
    await page.waitForTimeout(2000);

    // Screenshot 1: Full page
    console.log('Taking full page screenshot...');
    const fullPageBuffer = await page.screenshot({ fullPage: true });
    fs.writeFileSync('/tmp/about-page-enhanced.png', fullPageBuffer);
    console.log('Saved: /tmp/about-page-enhanced.png');

    // Screenshot 2: Stats section
    console.log('Scrolling to stats section...');
    const allHeadings = await page.locator('h2, h3').all();
    let found = false;
    for (const heading of allHeadings) {
      const text = await heading.textContent();
      if (text && text.toLowerCase().includes('stat')) {
        await heading.scrollIntoViewIfNeeded();
        found = true;
        break;
      }
    }
    
    if (found) {
      await page.waitForTimeout(500);
      const statsBuffer = await page.screenshot();
      fs.writeFileSync('/tmp/about-stats-section.png', statsBuffer);
      console.log('Saved: /tmp/about-stats-section.png');
    } else {
      console.log('Stats section not found, taking viewport screenshot');
      const statsBuffer = await page.screenshot();
      fs.writeFileSync('/tmp/about-stats-section.png', statsBuffer);
    }

    // Screenshot 3: Founder section
    console.log('Scrolling to founder section...');
    const founderHeadings = await page.locator('h2, h3').all();
    found = false;
    for (const heading of founderHeadings) {
      const text = await heading.textContent();
      if (text && text.toLowerCase().includes('found')) {
        await heading.scrollIntoViewIfNeeded();
        found = true;
        break;
      }
    }
    
    if (found) {
      await page.waitForTimeout(500);
      const founderBuffer = await page.screenshot();
      fs.writeFileSync('/tmp/about-founder-section.png', founderBuffer);
      console.log('Saved: /tmp/about-founder-section.png');
    } else {
      console.log('Founder section not found, scrolling to bottom...');
      await page.evaluate(() => window.scrollBy(0, window.innerHeight * 2));
      await page.waitForTimeout(500);
      const founderBuffer = await page.screenshot();
      fs.writeFileSync('/tmp/about-founder-section.png', founderBuffer);
    }

    console.log('\nAll screenshots completed successfully!');

  } catch (error) {
    console.error('Error taking screenshots:', error.message);
  } finally {
    await browser.close();
  }
}

takeScreenshots();
