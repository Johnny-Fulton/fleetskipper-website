const sharp = require('sharp');
const fs = require('fs');

async function compressHero() {
  const input = './public/images/home-hero-ship.jpg';
  const output = './public/images/home-hero-ship-optimized.jpg';

  console.log('Compressing hero image...');

  const beforeSize = fs.statSync(input).size;
  console.log(`Before: ${(beforeSize / 1024).toFixed(2)} KB`);

  // Aggressive compression to target ~80KB
  await sharp(input)
    .resize(1920, 768, { // Slightly smaller but still high-res
      fit: 'cover',
      position: 'right'
    })
    .jpeg({
      quality: 65, // Lower quality for smaller size
      progressive: true,
      mozjpeg: true // Use mozjpeg for better compression
    })
    .toFile(output);

  const afterSize = fs.statSync(output).size;
  console.log(`After: ${(afterSize / 1024).toFixed(2)} KB`);
  console.log(`Savings: ${((beforeSize - afterSize) / 1024).toFixed(2)} KB (${(((beforeSize - afterSize) / beforeSize) * 100).toFixed(1)}%)`);

  // Replace original
  fs.renameSync(output, input);
  console.log('✅ Hero image optimized and replaced!');
}

compressHero().catch(console.error);
