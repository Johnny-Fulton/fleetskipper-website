const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1024, height: 768 }
  });

  console.log('Navigating to blog post...');
  await page.goto('https://seaready-website.vercel.app/blog/mpx-clipboard-to-digital', {
    waitUntil: 'networkidle'
  });

  console.log('Waiting for content to load...');
  await page.waitForTimeout(2000);

  // Scroll down to see more content
  console.log('Scrolling to show title and content...');
  await page.evaluate(() => window.scrollTo(0, 400));
  await page.waitForTimeout(500);

  console.log('Taking screenshot...');
  await page.screenshot({
    path: 'mpx-blog-live-content.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });

  // Get more detailed content
  const headings = await page.locator('h1, h2, h3').allTextContents();
  console.log('\n=== ALL HEADINGS ===');
  headings.forEach((h, i) => {
    console.log(`[${i + 1}] ${h}`);
  });

  // Get text content from article
  const articleText = await page.locator('article').textContent();
  console.log('\n=== ARTICLE PREVIEW (First 500 chars) ===');
  console.log(articleText.substring(0, 500));

  // Check for images
  const images = await page.locator('article img').count();
  console.log(`\n=== IMAGES IN ARTICLE: ${images} ===`);

  await browser.close();
  console.log('\n✓ Screenshot saved to mpx-blog-live-content.jpg');
})();
