#!/usr/bin/env node
/**
 * Process "To Convert 2" folder images
 * Continues numbering from workboat-26
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SOURCE_DIR = path.join(__dirname, '..', 'Workboat Pics', 'To Convert 2');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'workboats');

const SIZES = {
  hero: { width: 1920, height: 1080, quality: 85 },
  large: { width: 1200, height: 800, quality: 85 },
  card: { width: 800, height: 600, quality: 80 },
  thumb: { width: 400, height: 300, quality: 75 }
};

async function processImage(inputPath, baseName) {
  const results = [];

  for (const [sizeName, config] of Object.entries(SIZES)) {
    const outputPath = path.join(OUTPUT_DIR, `${baseName}-${sizeName}.jpg`);

    try {
      await sharp(inputPath)
        .resize(config.width, config.height, {
          fit: 'cover',
          position: 'center'
        })
        .jpeg({ quality: config.quality, mozjpeg: true })
        .toFile(outputPath);

      const stats = fs.statSync(outputPath);
      results.push({
        size: sizeName,
        path: outputPath,
        sizeKB: Math.round(stats.size / 1024)
      });

      console.log(`  ✓ ${sizeName}: ${Math.round(stats.size / 1024)}KB`);
    } catch (error) {
      console.error(`  ✗ ${sizeName}: ${error.message}`);
    }
  }

  return results;
}

async function main() {
  console.log('🚢 SeaReady Image Processor - "To Convert 2" folder\n');

  // Create output directory if needed
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Get all images
  const files = fs.readdirSync(SOURCE_DIR)
    .filter(f => f.toLowerCase().match(/\.(jpg|jpeg|png)$/))
    .sort();

  console.log(`Found ${files.length} images to process\n`);

  let imageNum = 26; // Continue from workboat-26
  let totalOutputSize = 0;

  for (const file of files) {
    const inputPath = path.join(SOURCE_DIR, file);
    const baseName = `workboat-${String(imageNum).padStart(2, '0')}`;

    console.log(`[${imageNum - 25}/${files.length}] ${file} → ${baseName}`);

    const results = await processImage(inputPath, baseName);

    for (const r of results) {
      totalOutputSize += r.sizeKB;
    }

    imageNum++;
    console.log('');
  }

  console.log('═'.repeat(50));
  console.log(`\n✅ Complete!`);
  console.log(`   Images processed: ${files.length}`);
  console.log(`   Files created: ${files.length * Object.keys(SIZES).length}`);
  console.log(`   Total size: ${(totalOutputSize / 1024).toFixed(2)} MB`);
  console.log(`   Output: ${OUTPUT_DIR}\n`);
}

main().catch(console.error);
