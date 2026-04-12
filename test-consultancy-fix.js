const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  
  console.log('Testing consultancy page hero positioning...\n');
  await page.goto('http://localhost:3002/consultancy', { waitUntil: 'networkidle' });
  
  await page.waitForTimeout(1000);
  
  // Measure navigation
  const navData = await page.evaluate(() => {
    const nav = document.querySelector('header') || document.querySelector('nav');
    if (!nav) return { error: 'No navigation found' };
    
    const navRect = nav.getBoundingClientRect();
    return {
      navHeight: navRect.height,
      navTop: navRect.top
    };
  });
  
  // Measure hero section
  const heroData = await page.evaluate(() => {
    const hero = document.querySelector('div.relative.mt-28') || document.querySelector('section') || document.querySelector('div[class*="hero"]');
    if (!hero) return { error: 'No hero found' };
    
    const heroRect = hero.getBoundingClientRect();
    
    // Find h1 in hero
    const h1 = hero.querySelector('h1');
    if (!h1) return { heroTop: heroRect.top, error: 'No h1 found' };
    
    const h1Rect = h1.getBoundingClientRect();
    
    return {
      heroTop: heroRect.top,
      h1Top: h1Rect.top,
      heroClasses: hero.className
    };
  });
  
  await browser.close();
  
  console.log('============================================');
  console.log('CONSULTANCY PAGE HERO TEST');
  console.log('============================================\n');
  
  if (navData.error) {
    console.log('❌ Navigation:', navData.error);
  } else {
    console.log('Navigation Height:', Math.round(navData.navHeight) + 'px');
    console.log('Navigation Top:', Math.round(navData.navTop) + 'px\n');
  }
  
  if (heroData.error) {
    console.log('⚠️  Hero issue:', heroData.error);
    console.log('Hero Top:', Math.round(heroData.heroTop) + 'px');
  } else {
    console.log('Hero Section Top:', Math.round(heroData.heroTop) + 'px');
    console.log('H1 Position:', Math.round(heroData.h1Top) + 'px');
    console.log('Hero Classes:', heroData.heroClasses);
    
    if (navData.navHeight) {
      const clearance = heroData.h1Top - navData.navHeight;
      console.log('\nClearance:', Math.round(clearance) + 'px');
      console.log('Status:', clearance >= 100 ? '✅ PASS' : '❌ FAIL');
    }
  }
  
  console.log('\n============================================\n');
})();
