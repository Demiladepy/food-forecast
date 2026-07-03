const sharp = require('sharp')
const path = require('path')

const publicDir = path.join(__dirname, '../public')
const svgPath = path.join(publicDir, 'favicon.svg')
const out192 = path.join(publicDir, 'pwa-192x192.png')
const out512 = path.join(publicDir, 'pwa-512x512.png')

async function run() {
  console.log('Reading favicon.svg from:', svgPath)
  
  await sharp(svgPath)
    .resize(192, 192)
    .png()
    .toFile(out192)
  console.log('Successfully generated 192x192 PWA icon at:', out192)

  await sharp(svgPath)
    .resize(512, 512)
    .png()
    .toFile(out512)
  console.log('Successfully generated 512x512 PWA icon at:', out512)
}

run().catch(err => {
  console.error('Error generating PWA icons:', err)
  process.exit(1)
})
