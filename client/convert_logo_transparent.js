import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public');
const logoPath = path.join(publicDir, 'logo.png');
const outputPath = path.join(publicDir, 'logo_transparent.png');

async function makeLogoTransparent() {
  console.log('🎨 Converting Sofzenix logo to transparent background...\n');

  try {
    // Check if logo exists
    if (!fs.existsSync(logoPath)) {
      console.error('❌ Error: logo.png not found in public folder');
      return;
    }

    // Read the image and get metadata
    const image = sharp(logoPath);
    const metadata = await image.metadata();
    
    console.log(`📊 Original image: ${metadata.width}x${metadata.height}, format: ${metadata.format}`);

    // Remove white background (or near-white) and make it transparent
    await image
      .ensureAlpha() // Ensure image has alpha channel
      .raw()
      .toBuffer({ resolveWithObject: true })
      .then(({ data, info }) => {
        // Process pixels to make white/near-white pixels transparent
        const pixels = new Uint8ClampedArray(data);
        const threshold = 240; // Threshold for "white" (adjust if needed)
        
        for (let i = 0; i < pixels.length; i += info.channels) {
          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];
          
          // If pixel is white or near-white, make it transparent
          if (r > threshold && g > threshold && b > threshold) {
            pixels[i + 3] = 0; // Set alpha to 0 (transparent)
          }
        }
        
        return sharp(pixels, {
          raw: {
            width: info.width,
            height: info.height,
            channels: info.channels
          }
        })
        .png()
        .toFile(outputPath);
      });

    console.log(`✅ Transparent logo created: logo_transparent.png`);
    
    // Replace original logo with transparent version
    fs.copyFileSync(outputPath, logoPath);
    console.log(`✅ Original logo.png replaced with transparent version`);
    
    // Clean up temporary file
    fs.unlinkSync(outputPath);
    console.log(`🧹 Cleaned up temporary files`);

    console.log('\n🎉 Logo conversion complete!');
    console.log('💡 The logo now has a transparent background and will blend with any website background');
    
  } catch (error) {
    console.error('❌ Error converting logo:', error.message);
  }
}

makeLogoTransparent();
