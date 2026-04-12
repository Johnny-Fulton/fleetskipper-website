const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 2000, height: 400 } });
  
  // Create an HTML page with just the logo on dark background
  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head><style>
        body { 
          margin: 0; 
          padding: 40px; 
          background: #1e293b; 
          display: flex;
          align-items: center;
        }
        img { 
          display: block; 
          height: 100px;
        }
      </style></head>
      <body>
        <img src="file:///Users/jonathanfulton/REGULATION APP/FleetSkipper/website/public/logos/Logo_FleetSkipper_White.png" />
      </body>
    </html>
  `);
  
  await page.waitForTimeout(500);
  
  // Get the actual logo bounding box
  const logoBounds = await page.evaluate(() => {
    const img = document.querySelector('img');
    const rect = img.getBoundingClientRect();
    return { x: rect.left, y: rect.top, width: rect.width, height: rect.height };
  });
  
  console.log('Logo bounds:', logoBounds);
  
  // Take a cropped screenshot of just the visible logo part (left 30%)
  const cropWidth = Math.ceil(logoBounds.width * 0.35); // Only take left 35% where logo actually is
  
  await page.screenshot({
    path: '/Users/jonathanfulton/REGULATION APP/FleetSkipper/website/public/logos/Logo_FleetSkipper_White_Cropped.png',
    clip: {
      x: logoBounds.x,
      y: logoBounds.y,
      width: cropWidth,
      height: logoBounds.height
    }
  });
  
  console.log(`✅ Cropped logo saved! (${cropWidth}x${logoBounds.height})`);
  
  await browser.close();
})();
