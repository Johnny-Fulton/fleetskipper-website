const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  
  // Navigate to localhost
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  // Screenshot 1: Current dark navbar with white logo
  await page.screenshot({
    path: 'screenshot-dark-navbar.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css',
    clip: { x: 0, y: 0, width: 1024, height: 120 }
  });
  
  console.log('✅ Screenshot 1: Current dark navbar captured');
  
  // Now inject CSS to simulate white navbar with colored logo
  await page.evaluate(() => {
    // Change navbar background to white
    const header = document.querySelector('header');
    if (header) {
      header.style.backgroundColor = '#ffffff';
      header.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
    }
    
    // Change logo to colored version
    const logo = document.querySelector('img[alt="SafeDeck Maritime"]');
    if (logo) {
      logo.src = '/logos/safedeck-maritime.png';
    }
    
    // Change text colors to dark
    const navLinks = document.querySelectorAll('nav a, nav button');
    navLinks.forEach(link => {
      link.style.color = '#111827';
    });
    
    // Change mobile menu button color
    const menuButton = document.querySelector('button[aria-label*="menu"] svg');
    if (menuButton) {
      menuButton.style.color = '#111827';
    }
  });
  
  await page.waitForTimeout(1000);
  
  // Screenshot 2: White navbar with colored logo
  await page.screenshot({
    path: 'screenshot-white-navbar.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css',
    clip: { x: 0, y: 0, width: 1024, height: 120 }
  });
  
  console.log('✅ Screenshot 2: White navbar with colored logo captured');
  
  await browser.close();
  console.log('✅ Comparison screenshots ready for review');
})();
