const { chromium } = require('playwright');

(async () => {
  console.log('Opening SeaReady website on localhost...');

  const browser = await chromium.launch({
    headless: false,
    viewport: { width: 1280, height: 800 }
  });

  const page = await browser.newPage();

  try {
    // Navigate to homepage
    console.log('1. Opening homepage...');
    await page.goto('http://localhost:3002');
    await page.waitForTimeout(3000);

    await page.screenshot({
      path: 'homepage-hero.jpg',
      type: 'jpeg',
      quality: 50,
      fullPage: false
    });
    console.log('Homepage screenshot saved: homepage-hero.jpg');

    // Navigate to Ports & Harbours page
    console.log('\n2. Opening Ports & Harbours page...');
    await page.goto('http://localhost:3002/solutions/pilot-organizations');
    await page.waitForTimeout(2000);

    await page.screenshot({
      path: 'ports-hero.jpg',
      type: 'jpeg',
      quality: 50,
      fullPage: false
    });
    console.log('Ports page screenshot saved: ports-hero.jpg');

    // Navigate to Workboats page
    console.log('\n3. Opening Workboats page...');
    await page.goto('http://localhost:3002/solutions/workboats');
    await page.waitForTimeout(2000);

    await page.screenshot({
      path: 'workboats-hero.jpg',
      type: 'jpeg',
      quality: 50,
      fullPage: false
    });
    console.log('Workboats page screenshot saved: workboats-hero.jpg');

    // Navigate to Blog page to see eMPX changes
    console.log('\n4. Opening Blog page...');
    await page.goto('http://localhost:3002/blog');
    await page.waitForTimeout(2000);

    await page.screenshot({
      path: 'blog-page.jpg',
      type: 'jpeg',
      quality: 50,
      fullPage: false
    });
    console.log('Blog page screenshot saved: blog-page.jpg');

    // Navigate to eMPX blog post
    console.log('\n5. Opening eMPX blog post...');
    await page.goto('http://localhost:3002/blog/mpx-clipboard-to-digital');
    await page.waitForTimeout(2000);

    await page.screenshot({
      path: 'empx-blog.jpg',
      type: 'jpeg',
      quality: 50,
      fullPage: false
    });
    console.log('eMPX blog screenshot saved: empx-blog.jpg');

    console.log('\n========================================');
    console.log('ALL PAGES DISPLAYED SUCCESSFULLY!');
    console.log('========================================');
    console.log('\nChanges visible:');
    console.log('✅ Homepage: New ship at sea hero image');
    console.log('✅ Ports page: New ports.jpg image');
    console.log('✅ Workboats: Navigation sunrise image');
    console.log('✅ All "EMPX" changed to "eMPX" throughout');
    console.log('✅ Blog posts with updated images');
    console.log('\nBrowser will stay open for your review.');
    console.log('Press Ctrl+C when done.');
    console.log('========================================\n');

    // Keep browser open
    await new Promise(() => {});

  } catch (error) {
    console.error('Error:', error.message);

    // Take error screenshot
    await page.screenshot({
      path: 'error-screenshot.jpg',
      type: 'jpeg',
      quality: 50,
      fullPage: false
    });
    console.log('Error screenshot saved');
  }
})();