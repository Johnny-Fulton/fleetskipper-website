const { chromium } = require('playwright');

(async () => {
  console.log('\n✅ VISUAL VERIFICATION - Engineering Requirements Display\n');
  console.log('===========================================================\n');

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1400, height: 1000 } });

  // Test with 1200kW vessel
  console.log('📝 Submitting 1200kW tug (should show engineering)...\n');
  
  await page.goto('http://localhost:3002/tools/crew-checker', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // Fill form
  await page.fill('input[name="vesselName"]', 'TEST - 1200kW TUG');
  await page.selectOption('select[name="vesselType"]', 'tug');
  await page.fill('input[name="lengthOverall"]', '24');
  await page.fill('input[name="grossTonnage"]', '150');
  await page.fill('input[name="maxPersons"]', '8');
  await page.fill('input[name="crewCount"]', '4');
  await page.selectOption('select[name="category"]', 'cat2');
  await page.selectOption('select[name="propulsionConfiguration"]', 'diesel_inboard_below');
  await page.fill('input[name="enginePowerKW"]', '1200');

  await page.click('button[type="submit"]');
  await page.waitForTimeout(3000);

  // Check if we're on results page
  if (page.url().includes('/results')) {
    console.log('✅ Redirected to results page\n');
    
    // Wait for results to render
    await page.waitForTimeout(2000);
    
    // Check if Engineering section exists (using the actual heading)
    const engineeringCard = await page.$('h2:text("ENGINEERING - Machinery Qualification")');
    
    if (engineeringCard) {
      console.log('🎉 SUCCESS! Engineering section IS DISPLAYED!\n');
      console.log('The fix is working - engineering requirements now show for high-power vessels.\n');
      
      // Scroll to engineering section
      await engineeringCard.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1000);
      
      // Get the content
      const content = await page.evaluate(() => {
        const h2 = document.querySelector('h2:text("ENGINEERING - Machinery Qualification")');
        if (h2) {
          const card = h2.closest('div.bg-white');
          return card ? card.textContent.substring(0, 300) : 'Content not found';
        }
        return 'Section not found';
      });
      
      console.log('Engineering Section Content (first 300 chars):');
      console.log('================================================');
      console.log(content);
      console.log('================================================\n');
      
    } else {
      console.log('❌ FAILED: Engineering section still not found!\n');
    }
    
    console.log('Browser will stay open for 30 seconds for you to review...\n');
    await page.waitForTimeout(30000);
    
  } else {
    console.log('❌ Did not redirect to results page\n');
  }

  await browser.close();
  console.log('✅ TEST COMPLETE\n');
})();
