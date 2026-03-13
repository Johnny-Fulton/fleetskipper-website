const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1024, height: 768 }
  });

  await page.goto('https://seaready-website.vercel.app/blog/mpx-clipboard-to-digital', {
    waitUntil: 'networkidle'
  });

  await page.waitForTimeout(2000);

  // Get the complete article content organized by sections
  const sections = await page.locator('article h2, article h3, article p').evaluateAll(elements => {
    return elements.map(el => ({
      tag: el.tagName.toLowerCase(),
      text: el.textContent.trim()
    }));
  });

  console.log('=== BLOG POST STRUCTURE ===\n');

  sections.forEach(section => {
    if (section.tag === 'h2') {
      console.log(`\n## ${section.text}`);
    } else if (section.tag === 'h3') {
      console.log(`\n### ${section.text}`);
    } else if (section.text && section.text.length > 10) {
      // Only show first 200 chars of paragraphs to keep output manageable
      const preview = section.text.length > 200 ? section.text.substring(0, 200) + '...' : section.text;
      console.log(`\n${preview}`);
    }
  });

  // Check metadata
  const author = await page.locator('[class*="author"]').first().textContent().catch(() => 'N/A');
  const category = await page.locator('[class*="category"]').first().textContent().catch(() => 'N/A');
  const date = await page.locator('[class*="date"]').first().textContent().catch(() => 'N/A');

  console.log('\n\n=== METADATA ===');
  console.log('Author:', author);
  console.log('Category:', category);
  console.log('Date:', date);

  await browser.close();
})();
