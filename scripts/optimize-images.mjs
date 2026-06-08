/**
 * Resize PNGs in public/images to WebP for faster loads on mobile.
 * Run: node scripts/optimize-images.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const imagesDir = path.join(__dirname, '../public/images')

const COMMODITY_MAX_WIDTH = 720
const HERO_MAX_WIDTH = 1280
const WEBP_QUALITY = 78

async function optimize() {
  const files = fs.readdirSync(imagesDir).filter((f) => f.endsWith('.png'))

  for (const file of files) {
    const input = path.join(imagesDir, file)
    const base = file.replace(/\.png$/i, '')
    const isHero = base === 'hero-market'
    const maxWidth = isHero ? HERO_MAX_WIDTH : COMMODITY_MAX_WIDTH

    const output = path.join(imagesDir, `${base}.webp`)
    const before = fs.statSync(input).size

    await sharp(input)
      .rotate()
      .resize(maxWidth, isHero ? Math.round(maxWidth * 0.56) : Math.round(maxWidth * 0.75), {
        fit: 'cover',
        withoutEnlargement: true,
      })
      .webp({ quality: WEBP_QUALITY, effort: 4 })
      .toFile(output)

    const after = fs.statSync(output).size
    const saved = Math.round((1 - after / before) * 100)
    console.log(`${base}.webp  ${Math.round(before / 1024)}KB → ${Math.round(after / 1024)}KB (−${saved}%)`)
  }
}

optimize().catch((err) => {
  console.error(err)
  process.exit(1)
})
