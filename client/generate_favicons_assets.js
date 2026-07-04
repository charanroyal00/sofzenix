import sharp from 'sharp';
import fs from 'fs';

async function main() {
  const symbolPath = 'src/assets/logo/symbol.png';
  const outDir = 'public';

  // Ensure output directory exists
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // 1. Rescale and output PNG files
  console.log('Generating PNG favicons...');
  
  await sharp(symbolPath).resize(16, 16).toFile(`${outDir}/favicon-16x16.png`);
  console.log('Generated favicon-16x16.png');

  await sharp(symbolPath).resize(32, 32).toFile(`${outDir}/favicon-32x32.png`);
  console.log('Generated favicon-32x32.png');

  await sharp(symbolPath).resize(180, 180).toFile(`${outDir}/apple-touch-icon.png`);
  console.log('Generated apple-touch-icon.png');

  await sharp(symbolPath).resize(192, 192).toFile(`${outDir}/android-chrome-192x192.png`);
  console.log('Generated android-chrome-192x192.png');

  await sharp(symbolPath).resize(512, 512).toFile(`${outDir}/android-chrome-512x512.png`);
  console.log('Generated android-chrome-512x512.png');

  // Also replace standard favicon.png
  await sharp(symbolPath).resize(32, 32).toFile(`${outDir}/favicon.png`);
  console.log('Generated favicon.png');

  // 2. Generate multi-resolution favicon.ico
  console.log('Compiling multi-resolution favicon.ico...');
  const icoSizes = [16, 32, 48, 64];
  const pngBuffers = [];

  for (const size of icoSizes) {
    const buf = await sharp(symbolPath).resize(size, size).png().toBuffer();
    pngBuffers.push({ size, buffer: buf });
  }

  // Build ICO header
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Type (1 = ICO)
  header.writeUInt16LE(icoSizes.length, 4); // Number of images

  const directories = [];
  let currentOffset = 6 + icoSizes.length * 16;

  for (const item of pngBuffers) {
    const dirEntry = Buffer.alloc(16);
    dirEntry.writeUInt8(item.size, 0); // Width
    dirEntry.writeUInt8(item.size, 1); // Height
    dirEntry.writeUInt8(0, 2); // Colors (0 = >256 colors)
    dirEntry.writeUInt8(0, 3); // Reserved
    dirEntry.writeUInt16LE(1, 4); // Color planes
    dirEntry.writeUInt16LE(32, 6); // Bits per pixel
    dirEntry.writeUInt32LE(item.buffer.length, 8); // Size of image data
    dirEntry.writeUInt32LE(currentOffset, 12); // Offset of image data
    
    directories.push(dirEntry);
    currentOffset += item.buffer.length;
  }

  const chunks = [header, ...directories, ...pngBuffers.map(p => p.buffer)];
  const icoBuffer = Buffer.concat(chunks);

  fs.writeFileSync(`${outDir}/favicon.ico`, icoBuffer);
  console.log('Successfully generated favicon.ico');
}

main().catch(console.error);
