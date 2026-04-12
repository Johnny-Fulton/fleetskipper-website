const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  
  console.log('\n📸 Opening homepage with updated client logo section...\n');
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
  
  await page.waitForTimeout(2000);
  
  // Scroll to testimonials section
  console.log('📍 Scrolling to testimonials & client logos...');
  await page.evaluate(() => {
    const elements = Array.from(document.querySelectorAll('section'));
    const testimonialSection = elements.find(el => el.textContent.includes('Trusted by UK Workboat Operators'));
    if (testimonialSection) {
      testimonialSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
  
  await page.waitForTimeout(1500);
  
  console.log('📸 Taking screenshot...');
  await page.screenshot({
    path: '/Users/jonathanfulton/Desktop/fleetskipper-testimonials-with-logos.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  
  console.log('\n✅ Screenshot saved to Desktop as fleetskipper-testimonials-with-logos.jpg\n');
  console.log('💡 Browser will stay open for 30 seconds for you to review...\n');
  await page.waitForTimeout(30000);
  
  await browser.close();
})();
