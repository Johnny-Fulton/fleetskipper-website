#!/usr/bin/env node
/**
 * Process Curated Workboat Images
 *
 * Processes only the hand-selected best images for the SeaReady website
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SOURCE_DIR = path.join(__dirname, '..', 'workboat pics');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'workboats');
const CURATION = require('./curated-images.json');

// Target dimensions for different uses
const SIZES = {
  hero: { width: 1920, height: 1080, quality: 85, suffix: '' },
  large: { width: 1200, height: 800, quality: 85, suffix: '-large' },
  card: { width: 800, height: 600, quality: 80, suffix: '-card' },
  thumbnail: { width: 400, height: 300, quality: 75, suffix: '-thumb' }
};

async function processImage(sourcePath, outputBaseName, sizeConfig) {
  const outputFilename = `${outputBaseName}${sizeConfig.suffix}.jpg`;
  const outputPath = path.join(OUTPUT_DIR, outputFilename);

  try {
    await sharp(sourcePath)
      .resize(sizeConfig.width, sizeConfig.height, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality: sizeConfig.quality, mozjpeg: true })
      .toFile(outputPath);

    const stats = fs.statSync(outputPath);
    const sizeKB = Math.round(stats.size / 1024);

    return {
      filename: outputFilename,
      sizeKB: sizeKB,
      success: true
    };
  } catch (error) {
    console.error(`❌ Error processing ${outputBaseName}:`, error.message);
    return {
      filename: outputFilename,
      error: error.message,
      success: false
    };
  }
}

async function main() {
  console.log('🚢 SeaReady Curated Image Processor\n');

  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const results = {
    timestamp: new Date().toISOString(),
    processed: [],
    summary: {}
  };

  // Process hero images
  console.log('📸 Processing Hero Images...\n');
  for (const img of CURATION.hero_images) {
    const sourcePath = path.join(SOURCE_DIR, img.filename);

    if (!fs.existsSync(sourcePath)) {
      console.log(`⚠️  File not found: ${img.filename}`);
      continue;
    }

    console.log(`Processing: ${img.name}`);
    console.log(`  Source: ${img.filename}`);
    console.log(`  Use: ${img.use}`);

    const imageResults = [];

    // Generate all sizes for hero images
    for (const [sizeName, sizeConfig] of Object.entries(SIZES)) {
      const result = await processImage(sourcePath, img.name, sizeConfig);
      imageResults.push(result);

      if (result.success) {
        console.log(`  ✅ ${sizeName}: ${result.filename} (${result.sizeKB} KB)`);
      }
    }

    results.processed.push({
      type: 'hero',
      name: img.name,
      source: img.filename,
      description: img.description,
      sizes: imageResults
    });

    console.log('');
  }

  // Process feature images
  console.log('🎯 Processing Feature Images...\n');
  for (const img of CURATION.feature_images) {
    const sourcePath = path.join(SOURCE_DIR, img.filename);

    if (!fs.existsSync(sourcePath)) {
      console.log(`⚠️  File not found: ${img.filename}`);
      continue;
    }

    console.log(`Processing: ${img.name}`);
    console.log(`  Source: ${img.filename}`);
    console.log(`  Use: ${img.use}`);

    const imageResults = [];

    // Feature images get large and card sizes
    for (const [sizeName, sizeConfig] of Object.entries(SIZES)) {
      if (sizeName === 'hero') continue; // Skip hero size for features

      const result = await processImage(sourcePath, img.name, sizeConfig);
      imageResults.push(result);

      if (result.success) {
        console.log(`  ✅ ${sizeName}: ${result.filename} (${result.sizeKB} KB)`);
      }
    }

    results.processed.push({
      type: 'feature',
      name: img.name,
      source: img.filename,
      description: img.description,
      sizes: imageResults
    });

    console.log('');
  }

  // Calculate summary
  const totalImages = results.processed.length;
  const totalSizes = results.processed.reduce((sum, img) => sum + img.sizes.length, 0);
  const successfulSizes = results.processed.reduce(
    (sum, img) => sum + img.sizes.filter(s => s.success).length,
    0
  );

  results.summary = {
    totalImages,
    totalSizes,
    successfulSizes,
    heroImages: CURATION.hero_images.length,
    featureImages: CURATION.feature_images.length
  };

  console.log('\n✨ Processing Complete!\n');
  console.log('📊 Summary:');
  console.log(`  Images processed: ${totalImages}`);
  console.log(`  Total files created: ${successfulSizes}/${totalSizes}`);
  console.log(`  Output directory: ${OUTPUT_DIR}\n`);

  // Save processing report
  const reportPath = path.join(__dirname, '..', 'logs', 'image-processing-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`✅ Report saved: ${reportPath}\n`);

  // Generate image manifest for developers
  const manifest = {
    timestamp: new Date().toISOString(),
    images: {}
  };

  for (const img of results.processed) {
    manifest.images[img.name] = {
      description: img.description,
      type: img.type,
      files: {}
    };

    for (const size of img.sizes) {
      if (size.success) {
        const sizeName = size.filename.includes('-hero') ? 'hero' :
                        size.filename.includes('-large') ? 'large' :
                        size.filename.includes('-card') ? 'card' : 'thumbnail';
        manifest.images[img.name].files[sizeName] = `/images/workboats/${size.filename}`;
      }
    }
  }

  const manifestPath = path.join(OUTPUT_DIR, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`✅ Image manifest: ${manifestPath}\n`);
}

main().catch(console.error);
