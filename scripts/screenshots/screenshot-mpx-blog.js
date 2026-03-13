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

  console.log('Taking screenshot...');
  await page.screenshot({
    path: 'mpx-blog-live.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });

  // Get page content info
  const title = await page.title();
  const h1 = await page.locator('h1').first().textContent().catch(() => 'No h1 found');
  const url = page.url();

  console.log('\n=== PAGE INFO ===');
  console.log('URL:', url);
  console.log('Title:', title);
  console.log('H1:', h1);

  // Check for main content
  const article = await page.locator('article').count();
  const mainContent = await page.locator('main').count();

  console.log('\nContent structure:');
  console.log('- Article elements:', article);
  console.log('- Main elements:', mainContent);

  // Try to get first few paragraphs
  const paragraphs = await page.locator('p').allTextContents();
  console.log('\nFirst 3 paragraphs:');
  for (let i = 0; i < Math.min(3, paragraphs.length); i++) {
    console.log(`\n[Paragraph ${i + 1}] ${paragraphs[i].substring(0, 150)}...`);
  }

  // Check metadata
  const metaDescription = await page.locator('meta[name="description"]').getAttribute('content').catch(() => 'No meta description');
  console.log('\nMeta description:', metaDescription);

  await browser.close();
  console.log('\n✓ Screenshot saved to mpx-blog-live.jpg');
})();
