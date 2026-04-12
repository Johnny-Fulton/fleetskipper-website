import { chromium } from 'playwright';

(async () => {
  console.log('\n🧪 Testing Hero Section Fix...\n');
  
  const browser = await chromium.launch();
  const page = await browser.newPage({ 
    viewport: { width: 1024, height: 768 } 
  });
  
  // Test Tools Page
  console.log('📍 Testing /tools page...');
  await page.goto('http://localhost:3002/tools');
  await page.waitForLoadState('networkidle');
  
  // Take screenshot with correct settings
  await page.screenshot({
    path: '/Users/jonathanfulton/Desktop/tools-hero-fix.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  
  // Check if hero content is visible
  const heroHeading = await page.locator('h1').first();
  const heroBox = await heroHeading.boundingBox();
  
  console.log('Hero Heading Position:', {
    top: heroBox?.y,
    height: heroBox?.height
  });
  
  // Check navigation position
  const nav = await page.locator('nav').first();
  const navBox = await nav.boundingBox();
  
  console.log('Navigation Position:', {
    top: navBox?.y,
    height: navBox?.height,
    bottom: navBox ? navBox.y + navBox.height : 0
  });
  
  // Verify hero is below navigation
  if (heroBox && navBox) {
    const navBottom = navBox.y + navBox.height;
    const heroTop = heroBox.y;
    const clearance = heroTop - navBottom;
    
    console.log('\n✅ Clearance between nav and hero:', clearance + 'px');
    
    if (clearance >= 0) {
      console.log('✅ SUCCESS: Hero heading is fully visible below navigation!');
    } else {
      console.log('❌ ISSUE: Hero heading is still behind navigation by', Math.abs(clearance) + 'px');
    }
  }
  
  console.log('\n📸 Screenshot saved to: /Users/jonathanfulton/Desktop/tools-hero-fix.jpg');
  console.log('✅ Test complete\n');
  
  await browser.close();
})();
