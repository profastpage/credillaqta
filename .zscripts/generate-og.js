const sharp = require('sharp');

async function createOgImage() {
  const width = 1200;
  const height = 630;
  
  const svgOverlay = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bgGlow" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stop-color="#CAA25E" stop-opacity="0.22" />
          <stop offset="50%" stop-color="#6E4F1F" stop-opacity="0.08" />
          <stop offset="100%" stop-color="#080604" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#A37834" stop-opacity="0.4" />
          <stop offset="50%" stop-color="#CAA25E" stop-opacity="0.8" />
          <stop offset="100%" stop-color="#6E4F1F" stop-opacity="0.3" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="#080604" />
      <rect width="100%" height="100%" fill="url(#bgGlow)" />
      <rect x="30" y="30" width="1140" height="570" rx="24" fill="none" stroke="url(#borderGrad)" stroke-width="2" />
      <text x="600" y="490" text-anchor="middle" fill="#F0D8AE" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="600" letter-spacing="3">PRESTAMOS PERSONALES • GARANTIA VEHICULAR</text>
      <text x="600" y="535" text-anchor="middle" fill="rgba(255,255,255,0.45)" font-family="system-ui, -apple-system, sans-serif" font-size="16" letter-spacing="2">RUC: 20615326926 • PERU</text>
    </svg>
  `);

  const logoResized = await sharp('public/logo-credillaqta.png')
    .resize(720, 228, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const baseImage = await sharp(svgOverlay)
    .composite([
      {
        input: logoResized,
        top: 170,
        left: 240,
      }
    ])
    .png()
    .toBuffer();

  await sharp(baseImage).png().toFile('src/app/opengraph-image.png');
  console.log('Saved src/app/opengraph-image.png');

  await sharp(baseImage).webp({ quality: 90 }).toFile('public/og-image.webp');
  console.log('Saved public/og-image.webp');

  await sharp(baseImage).jpeg({ quality: 90 }).toFile('public/og-image.jpg');
  console.log('Saved public/og-image.jpg');
}

createOgImage().catch(console.error);
