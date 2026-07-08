import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public');
const logoPath = path.join(publicDir, 'logo.png');

// Favicon sizes to generate
const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 }
];

async function generateFavicons() {
  console.log('🎨 Generating favicons from logo.png...\n');

  try {
    // Check if logo exists
    if (!fs.existsSync(logoPath)) {
      console.error('❌ Error: logo.png not found in public folder');
      return;
    }

    // Generate each size
    for (const { name, size } of sizes) {
      const outputPath = path.join(publicDir, name);
      
      await sharp(logoPath)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png()
        .toFile(outputPath);
      
      console.log(`✅ Generated ${name} (${size}x${size})`);
    }

    // Generate favicon.ico (32x32)
    const icoPath = path.join(publicDir, 'favicon.ico');
    await sharp(logoPath)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toFile(icoPath);
    
    console.log(`✅ Generated favicon.ico (32x32)`);

    console.log('\n🎉 All favicons generated successfully!');
    console.log('💡 Tip: Hard refresh your browser (Ctrl+Shift+R) to see the new favicon');
    
  } catch (error) {
    console.error('❌ Error generating favicons:', error.message);
  }
}

generateFavicons();
