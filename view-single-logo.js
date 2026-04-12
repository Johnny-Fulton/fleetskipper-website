const { chromium } = require('playwright');

(async () => {
  console.log('\n📸 Viewing Updated Testimonials Section - Single Client Logo\n');
  
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  
  console.log('📍 Opening homepage...');
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
  
  await page.waitForTimeout(2000);
  
  // Scroll to testimonials section
  console.log('📜 Scrolling to testimonials section...');
  await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('section'));
    const testimonialSection = sections.find(s => s.textContent.includes('Trusted by UK Workboat Operators'));
    if (testimonialSection) {
      testimonialSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
  
  await page.waitForTimeout(1500);
  
  console.log('📸 Taking screenshot of single logo design...');
  await page.screenshot({
    path: '/Users/jonathanfulton/Desktop/fleetskipper-testimonial-single-logo.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  
  console.log('\n============================================');
  console.log('✅ SCREENSHOT SAVED!');
  console.log('============================================\n');
  console.log('Location: Desktop/fleetskipper-testimonial-single-logo.jpg\n');
  console.log('Changes made:');
  console.log('  ✓ Removed placeholder boxes');
  console.log('  ✓ Single Glasgow City Boats logo featured');
  console.log('  ✓ Larger logo size (h-16 vs h-12)');
  console.log('  ✓ More prominent white card with shadow-2xl');
  console.log('  ✓ Centered, intentional design\n');
  console.log('💡 Browser will stay open for 30 seconds to review...\n');
  
  await page.waitForTimeout(30000);
  
  await browser.close();
})();
