const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });

  const pages = [
    { name: 'Homepage', url: 'http://localhost:3002' },
    { name: 'About', url: 'http://localhost:3002/about' },
    { name: 'Contact', url: 'http://localhost:3002/contact' },
    { name: 'Consultancy', url: 'http://localhost:3002/consultancy' },
    { name: 'Tools', url: 'http://localhost:3002/tools' }
  ];

  console.log('============================================');
  console.log('FLEETSKIPPER HERO SECTIONS - FULL TEST');
  console.log('============================================\n');
  console.log('Testing all pages for proper hero positioning below sticky navigation\n');
  console.log('Requirement: Hero H1 must have 100px+ clearance below navigation\n');
  console.log('============================================\n');

  const results = [];

  for (const pageInfo of pages) {
    await page.goto(pageInfo.url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    const data = await page.evaluate(() => {
      // Find navigation
      const nav = document.querySelector('header') || document.querySelector('nav');
      if (!nav) return { error: 'No navigation found' };
      const navRect = nav.getBoundingClientRect();

      // Find hero section
      const hero = document.querySelector('section') ||
                   document.querySelector('div.relative.mt-28') ||
                   document.querySelector('div[class*="hero"]') ||
                   document.querySelector('main > div:first-child');
      if (!hero) return { navHeight: navRect.height, error: 'No hero found' };
      const heroRect = hero.getBoundingClientRect();

      // Find h1 in hero
      const h1 = hero.querySelector('h1');
      if (!h1) return { navHeight: navRect.height, heroTop: heroRect.top, error: 'No h1 found' };
      const h1Rect = h1.getBoundingClientRect();

      return {
        navHeight: Math.round(navRect.height),
        heroTop: Math.round(heroRect.top),
        h1Top: Math.round(h1Rect.top),
        hasMarginTop: hero.className.includes('mt-'),
        heroClasses: hero.className.split(' ').filter(c => c.startsWith('mt-') || c.startsWith('pt-')).join(' ')
      };
    });

    if (data.error) {
      results.push({
        page: pageInfo.name,
        status: '⚠️  WARNING',
        message: data.error,
        navHeight: data.navHeight || 'N/A',
        heroTop: data.heroTop || 'N/A',
        h1Top: 'N/A',
        clearance: 'N/A'
      });
    } else {
      const clearance = data.h1Top - data.navHeight;
      const status = clearance >= 100 ? '✅ PASS' : '❌ FAIL';

      results.push({
        page: pageInfo.name,
        status,
        navHeight: data.navHeight + 'px',
        heroTop: data.heroTop + 'px',
        h1Top: data.h1Top + 'px',
        clearance: clearance + 'px',
        classes: data.heroClasses,
        hasMarginTop: data.hasMarginTop
      });
    }
  }

  await browser.close();

  // Print results
  results.forEach((result, index) => {
    console.log(`${index + 1}. ${result.page}`);
    console.log(`   Status: ${result.status}`);
    console.log(`   Navigation Height: ${result.navHeight}`);
    console.log(`   Hero Section Top: ${result.heroTop}`);
    console.log(`   H1 Position: ${result.h1Top}`);
    console.log(`   Clearance: ${result.clearance}`);
    if (result.classes) {
      console.log(`   Classes: ${result.classes}`);
    }
    if (result.message) {
      console.log(`   Note: ${result.message}`);
    }
    console.log('');
  });

  // Summary
  const passed = results.filter(r => r.status === '✅ PASS').length;
  const failed = results.filter(r => r.status === '❌ FAIL').length;
  const warnings = results.filter(r => r.status === '⚠️  WARNING').length;

  console.log('============================================');
  console.log('SUMMARY');
  console.log('============================================');
  console.log(`Total Pages: ${results.length}`);
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`⚠️  Warnings: ${warnings}`);
  console.log('============================================\n');

  if (failed === 0 && warnings === 0) {
    console.log('🎉 ALL HERO SECTIONS PROPERLY POSITIONED!\n');
  } else if (failed > 0) {
    console.log('❗ ACTION REQUIRED: Some pages need fixing\n');
  } else {
    console.log('⚠️  Review warnings above\n');
  }
})();
