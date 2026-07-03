import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const faviconPath = path.join(__dirname, '../public/favicon.svg')
const publicDir = path.join(__dirname, '../public')

async function generate() {
  const sizes = [192, 512]
  for (const size of sizes) {
    const output = path.join(publicDir, `pwa-${size}x${size}.png`)
    await sharp(faviconPath)
      .resize(size, size)
      .png()
      .toFile(output)
    console.log(`Generated public/pwa-${size}x${size}.png`)
  }
}

generate().catch((err) => {
  console.error(err)
  process.exit(1)
})
