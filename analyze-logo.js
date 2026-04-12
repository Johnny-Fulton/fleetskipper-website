const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1750, height: 400 } });
  
  // Create an HTML page to load and analyze the logo
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { margin: 0; background: #000; }
        canvas { border: 1px solid red; }
      </style>
    </head>
    <body>
      <img id="logo" src="file:///Users/jonathanfulton/REGULATION%20APP/FleetSkipper/website/public/logos/Logo_FleetSkipper_White.png" />
      <canvas id="canvas"></canvas>
    </body>
    </html>
  `);
  
  await page.waitForTimeout(1000);
  
  // Analyze the logo to find where content actually ends
  const bounds = await page.evaluate(() => {
    const img = document.getElementById('logo');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    let minX = canvas.width;
    let maxX = 0;
    let minY = canvas.height;
    let maxY = 0;
    
    // Find bounds of non-transparent pixels
    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const idx = (y * canvas.width + x) * 4;
        const alpha = data[idx + 3];
        
        if (alpha > 10) { // Non-transparent pixel
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    
    return { minX, maxX, minY, maxY, width: maxX - minX, height: maxY - minY };
  });
  
  console.log('Logo content bounds:', bounds);
  console.log('Original size: 1750x400');
  console.log('Actual content width:', bounds.width);
  console.log('Empty space on right:', 1750 - bounds.maxX);
  console.log('Percentage used:', Math.round((bounds.width / 1750) * 100) + '%');
  
  await browser.close();
})();
