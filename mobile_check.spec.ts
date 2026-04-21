import { test, expect } from '@playwright/test';

test('check mobile layout order', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('https://fleetskipper.com/app');
  await page.waitForLoadState('networkidle');
  
  // Take hero screenshot
  await page.screenshot({ 
    path: '/tmp/mobile_hero.jpg',
    type: 'jpeg',
    quality: 50
  });
  
  console.log('Hero screenshot saved to /tmp/mobile_hero.jpg');
  
  // Scroll to crew section
  await page.evaluate(() => window.scrollTo(0, 1500));
  await page.waitForTimeout(500);
  
  await page.screenshot({ 
    path: '/tmp/mobile_crew_section.jpg',
    type: 'jpeg',
    quality: 50
  });
  
  console.log('Crew section screenshot saved to /tmp/mobile_crew_section.jpg');
});
