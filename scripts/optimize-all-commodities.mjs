import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const userAssetsDir = 'C:/Users/Ebabhi Daniel/Websites/food-pricing-project-slop/Food Pricing Assets';
const publicImagesDir = './public/images';

const generatedImages = {
  'garri-yellow': 'C:/Users/Ebabhi Daniel/.gemini/antigravity-ide/brain/48101810-961b-4c1d-85cc-2da08e09108d/garri_yellow_1781848987189.png',
  'oil-palm': 'C:/Users/Ebabhi Daniel/.gemini/antigravity-ide/brain/48101810-961b-4c1d-85cc-2da08e09108d/oil_palm_1781849005898.png',
};

const mapping = {
  'hero-market': 'Hero Section.webp',
  'beans-brown': 'brown beans.webp',
  'beans-white-black-eye': 'white b eans.webp',
  'beef-bone-in': 'beef(bone and boneless).webp',
  'beef-boneless': 'beef(bone and boneless).webp',
  'bread-sliced': 'Bread (Sliced).webp',
  'bread-unsliced': 'Bread(Unsliced).webp',
  'chicken-feet': 'Chicken Feet.webp',
  'chicken-frozen': 'Frozen full chicken.webp',
  'chicken-wings': 'Chicken Wings.webp',
  'eggs-agric-1pcs': 'Eggs.webp',
  'eggs-agric-12pcs': 'Eggs.webp',
  'fish-catfish-smoked': 'Smoked fish.webp',
  'fish-fish': 'Fish.webp',
  'fish-mudfish': 'Fish.webp',
  'garri-white': 'Garri replacement.webp',
  'garri-yellow': 'garri-yellow',
  'milk-evaporated-tin': 'Evapourated milk.webp',
  'oil-groundnut': 'Vegetable oil (2).webp',
  'oil-palm': 'oil-palm',
  'oil-vegetable': 'Vegetable oil (2).webp',
  'potato-irish': 'Irish Potatoes.webp',
  'potato-sweet': 'Sweet Potato.webp',
  'rice-agric': 'Rice.webp',
  'rice-imported': 'Rice.webp',
  'rice-local': 'Rice.webp',
  'rice-medium-grained': 'Rice.webp',
  'rice-ofada': 'Rice.webp',
  'tomato-tomato': 'Tomatoes.webp',
  'yam-tuber': 'Yam.webp',
};

const COMMODITY_MAX_WIDTH = 600;
const HERO_MAX_WIDTH = 1200;
const QUALITY = 80;

async function run() {
  if (!fs.existsSync(publicImagesDir)) {
    fs.mkdirSync(publicImagesDir, { recursive: true });
  }

  for (const [id, filename] of Object.entries(mapping)) {
    let inputPath = '';
    if (id === 'garri-yellow' || id === 'oil-palm') {
      inputPath = generatedImages[id];
    } else {
      inputPath = path.join(userAssetsDir, filename);
    }

    if (!fs.existsSync(inputPath)) {
      console.warn(`File not found: ${inputPath}`);
      continue;
    }

    const isHero = id === 'hero-market';
    const maxWidth = isHero ? HERO_MAX_WIDTH : COMMODITY_MAX_WIDTH;
    const height = isHero ? Math.round(maxWidth * 0.56) : Math.round(maxWidth * 0.75);

    const webpOutput = path.join(publicImagesDir, `${id}.webp`);
    const pngOutput = path.join(publicImagesDir, `${id}.png`);

    // Output WebP
    await sharp(inputPath)
      .rotate()
      .resize(maxWidth, height, { fit: 'cover', withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(webpOutput);

    // Output PNG fallback
    await sharp(inputPath)
      .rotate()
      .resize(maxWidth, height, { fit: 'cover', withoutEnlargement: true })
      .png({ compressionLevel: 8 })
      .toFile(pngOutput);

    console.log(`Optimized and saved: ${id}.webp / .png`);
  }
  console.log('All images optimized successfully!');
}

run().catch(console.error);
