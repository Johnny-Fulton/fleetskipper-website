# Workboat Images Documentation

## Overview

This document describes the authentic workboat imagery processed and integrated into the SeaReady website on 2025-12-04.

## Source Material

- **Total images received**: 50 photos
- **Source**: UK workboat operator (friend of founder)
- **Original total size**: 44.16 MB
- **Original location**: `/workboat pics/`

## Image Analysis

### Breakdown
- **Landscape orientation**: 32 images
- **Portrait orientation**: 17 images
- **Average original size**: 923 KB
- **Resolution range**: 775x446 to 5120x2789 pixels

### Quality Assessment
- High-quality iPhone photos (4032x3024 typical)
- Authentic UK maritime operations
- Mix of vessel types: RIBs, workboats, crew operations
- Real working conditions captured

## Curated Selection

We hand-selected **7 premium images** for the website:

### Hero Images (3)
1. **sunset-workboat** - Primary hero image
   - Stunning golden hour sunset from workboat bow
   - Navigation lights visible
   - Evokes professionalism and UK maritime atmosphere
   - Source: `c1407034-7948-4830-88ee-0b4965478894.jpg`

2. **crew-operations** - Hero alternative
   - Blue workboat with crane and crew working
   - Coastal UK backdrop
   - Shows real work being done
   - Source: `IMG_3209.jpg`

3. **sunset-helm** - Hero alternative
   - Vessel helm at sunset
   - Professional maritime lighting
   - Source: `4286b234-6efc-422d-9c32-83689b21555a.jpg`

### Feature Images (4)
4. **navigation-sunrise**
   - Workboat at sunrise with navigation display
   - Construction work visible
   - Perfect for technology/navigation features
   - Source: `84ba383e-f7a1-45ba-8680-4bf3e7d74bfc.jpg`

5. **crew-safety**
   - Crew member in full hi-vis PPE
   - Operating at construction site
   - Ideal for safety/compliance features
   - Source: `6ffc61c2-be58-4498-8c72-a89f7f3c68ad.jpg`

6. **ribs-glasgow**
   - Orange Humber RIBs at Glasgow waterfront
   - Shows vessel diversity
   - UK operations context
   - Source: `015601b7-3a2e-4482-95af-3032d089dc8d.jpg`

7. **rib-construction**
   - View from RIB of Glasgow construction
   - Cranes and infrastructure visible
   - UK workboat environment
   - Source: `45124968-44ac-4bdb-bdbb-f8043e6b3694.JPG`

## Excluded Images

Several images were excluded as unsuitable:
- **c1b5135f...JPG** - Monaco superyachts (wrong market)
- **9bd6d199...JPG** - Sailing yacht (not workboats)
- **150eace2...jpg** - Superyacht interior (wrong vessel type)

## Processing Specifications

### Output Sizes

Each curated image was processed into multiple sizes:

| Size | Dimensions | Quality | Use Case | Suffix |
|------|------------|---------|----------|--------|
| **Hero** | 1920x1080 | 85% | Hero sections | (none) |
| **Large** | 1200x800 | 85% | Feature sections | -large |
| **Card** | 800x600 | 80% | Grid cards | -card |
| **Thumbnail** | 400x300 | 75% | Previews | -thumb |

### Technical Details
- **Format**: JPEG with mozjpeg compression
- **Fit method**: Cover with center positioning
- **Total files created**: 24 optimized images
- **Output directory**: `/public/images/workboats/`

### File Size Results

**Hero Images:**
- sunset-workboat: 315 KB (hero), 155 KB (large), 70 KB (card), 17 KB (thumb)
- crew-operations: 251 KB (hero), 156 KB (large), 77 KB (card), 22 KB (thumb)
- sunset-helm: 276 KB (hero), 137 KB (large), 62 KB (card), 16 KB (thumb)

**Feature Images:** (no hero size)
- navigation-sunrise: 132 KB (large), 59 KB (card), 14 KB (thumb)
- crew-safety: 222 KB (large), 108 KB (card), 27 KB (thumb)
- ribs-glasgow: 170 KB (large), 73 KB (card), 17 KB (thumb)
- rib-construction: 159 KB (large), 68 KB (card), 16 KB (thumb)

**Total optimized size**: ~2.6 MB (down from 44 MB original)
**Compression ratio**: ~94% reduction

## Implementation

### Current Usage

**Homepage Hero** (`/src/components/hero-with-nav.tsx`):
```tsx
style={{ backgroundImage: 'url(/images/workboats/sunset-workboat.jpg)' }}
```

### Image Manifest

A JSON manifest is available at `/public/images/workboats/manifest.json` containing:
- Image descriptions
- Type classifications (hero/feature)
- File paths for all sizes
- Timestamp of processing

### Usage in Components

To use these images in React components:

```tsx
// Hero background
<div style={{ backgroundImage: 'url(/images/workboats/sunset-workboat.jpg)' }} />

// Next.js Image component
import Image from 'next/image'
<Image
  src="/images/workboats/crew-operations-card.jpg"
  alt="Workboat crew operations"
  width={800}
  height={600}
/>

// Responsive image
<img
  src="/images/workboats/ribs-glasgow-large.jpg"
  srcSet="
    /images/workboats/ribs-glasgow-thumb.jpg 400w,
    /images/workboats/ribs-glasgow-card.jpg 800w,
    /images/workboats/ribs-glasgow-large.jpg 1200w
  "
  sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px"
  alt="UK workboat operations"
/>
```

## Scripts

### Analysis Script
**Location**: `/scripts/process-workboat-images.js`
**Purpose**: Analyze all 50 source images
**Output**: `/logs/workboat-images-analysis.json`

### Processing Script
**Location**: `/scripts/process-curated-images.js`
**Purpose**: Process only curated images
**Input**: `/scripts/curated-images.json` (curation list)
**Output**:
- Optimized images in `/public/images/workboats/`
- Processing report in `/logs/image-processing-report.json`
- Manifest in `/public/images/workboats/manifest.json`

### Curation List
**Location**: `/scripts/curated-images.json`
**Content**: Hand-selected images with descriptions and use cases

## Future Recommendations

### Additional Usage Opportunities

1. **About Page** - Use `crew-operations` to show real team at work
2. **Features Pages** - Use `navigation-sunrise` for tech features
3. **Safety/Compliance** - Use `crew-safety` for PPE/safety sections
4. **Testimonials** - Use workboat images as backgrounds
5. **Blog Posts** - Use as featured images for maritime content

### Remaining Images

43 additional images remain in `/workboat pics/` that could be processed for:
- Blog content
- Social media
- Case studies
- Additional page sections

To process more images, add them to `/scripts/curated-images.json` and run the processing script again.

## Performance

### Load Times
- Hero image (315 KB): ~0.5s on 4G
- Card images (60-80 KB): ~0.1s on 4G
- Thumbnails (14-27 KB): Near instant

### Optimization Status
✅ Compressed with mozjpeg
✅ Multiple sizes for responsive delivery
✅ Proper dimensions for use case
✅ WebP conversion ready (future enhancement)

## Accessibility

All images should include proper `alt` text describing:
- Vessel type
- Activity being performed
- Location context (if relevant)
- Compliance/safety aspects

Example:
```tsx
alt="UK workboat crew operating crane at coastal construction site"
```

## License & Attribution

- **Source**: Personal photos from UK workboat operator
- **Rights**: Assumed full usage rights for SeaReady marketing
- **No attribution required**: Personal friend contribution

## Changelog

### 2025-12-04
- Initial processing of 50 workboat images
- Curated 7 premium images for website use
- Generated 24 optimized variants
- Implemented sunset-workboat as homepage hero
- Created documentation and manifest

---

**Last Updated**: 2025-12-04
**Processed By**: Claude (AI Assistant)
**Total Processing Time**: ~2 minutes
