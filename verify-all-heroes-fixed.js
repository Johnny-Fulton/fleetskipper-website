const { chromium } = require('playwright');

(async () => {
  console.log('\n🧪 Verifying ALL Hero Sections Are Below Navigation\n');
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  
  const pages = [
    { name: 'Homepage', url: 'http://localhost:3002' },
    { name: 'About', url: 'http://localhost:3002/about' },
    { name: 'Contact', url: 'http://localhost:3002/contact' },
    { name: 'Consultancy', url: 'http://localhost:3002/consultancy' },
    { name: 'Tools', url: 'http://localhost:3002/tools' }
  ];
  
  console.log('Testing pages with mt-28 (margin-top: 112px) approach...\n');
  console.log('Navigation height: ~112px (fixed at top)');
  console.log('Requirement: Hero content must have 100px+ clearance\n');
  console.log('============================================\n');
  
  const results = [];
  
  for (const pageInfo of pages) {
    await page.goto(pageInfo.url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    
    // Measure navigation height
    const navHeight = await page.evaluate(() => {
      const nav = document.querySelector('header');
      return nav ? nav.offsetHeight : 0;
    });
    
    // Measure hero section position
    const heroData = await page.evaluate(() => {
      // Find hero section (first section or main's first section)
      const hero = document.querySelector('section') || document.querySelector('main section') || document.querySelector('div.relative');
      if (!hero) return null;
      
      const heroRect = hero.getBoundingClientRect();
      
      // Find first heading in hero
      const heading = hero.querySelector('h1');
      if (!heading) return null;
      
      const headingRect = heading.getBoundingClientRect();
      
      return {
        heroTop: heroRect.top,
        headingTop: headingRect.top
      };
    });
    
    if (!heroData) {
      results.push({
        page: pageInfo.name,
        status: '⚠️ ',
        message: 'Could not find hero section'
      });
      continue;
    }
    
    const clearance = heroData.headingTop - navHeight;
    const passed = clearance >= 100;
    
    results.push({
      page: pageInfo.name,
      navHeight: navHeight,
      heroTop: Math.round(heroData.heroTop),
      headingTop: Math.round(heroData.headingTop),
      clearance: Math.round(clearance),
      status: passed ? '✅' : '❌',
      message: passed ? 'PASS' : `FAIL (need ${100 - Math.round(clearance)}px more)`
    });
  }
  
  // Print results
  results.forEach(r => {
    console.log(`${r.status} ${r.page}`);
    if (r.navHeight !== undefined) {
      console.log(`   Navigation: ${r.navHeight}px`);
      console.log(`   Hero section starts at: ${r.heroTop}px`);
      console.log(`   Heading starts at: ${r.headingTop}px`);
      console.log(`   Clearance: ${r.clearance}px (${r.message})`);
    } else {
      console.log(`   ${r.message}`);
    }
    console.log('');
  });
  
  const allPassed = results.every(r => r.status === '✅');
  
  console.log('============================================');
  if (allPassed) {
    console.log('🎉 SUCCESS! All hero sections properly positioned!');
    console.log('\nThe mt-28 approach works perfectly:');
    console.log('- Hero sections start BELOW navigation');
    console.log('- All content is visible and has clearance');
  } else {
    console.log('⚠️  Some pages still need adjustment');
  }
  console.log('============================================\n');
  
  await browser.close();
})();
