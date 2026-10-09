import fs from 'fs';
import sharp from 'sharp';

const srcPath = 'C:/Users/MOKSH/.gemini/antigravity-ide/brain/79641eab-0a79-4a3f-99a2-a62fca5a00e0/.user_uploaded/media_1791539692253.jpg';

async function generate() {
  const img = sharp(srcPath);

  // 1. Generate 512x512 PNG
  await img.clone().resize(512, 512).png().toFile('public/icon.png');
  await img.clone().resize(512, 512).png().toFile('src/app/icon.png');

  // 2. Generate 180x180 Apple touch icon
  await img.clone().resize(180, 180).png().toFile('public/apple-touch-icon.png');
  await img.clone().resize(180, 180).png().toFile('src/app/apple-icon.png');

  // 3. Generate 32x32 and 16x16 PNGs
  const b32 = await img.clone().resize(32, 32).png().toBuffer();
  const b16 = await img.clone().resize(16, 16).png().toBuffer();
  fs.writeFileSync('public/favicon.png', b32);
  fs.writeFileSync('public/favicon-32x32.png', b32);
  fs.writeFileSync('public/favicon-16x16.png', b16);

  // 4. Create multi-size ICO file (16x16, 32x32)
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(2, 4); // 2 images

  const offset1 = 6 + 16 * 2;
  const offset2 = offset1 + b16.length;

  const entry1 = Buffer.alloc(16);
  entry1.writeUInt8(16, 0); // width
  entry1.writeUInt8(16, 1); // height
  entry1.writeUInt8(0, 2);  // color count
  entry1.writeUInt8(0, 3);  // reserved
  entry1.writeUInt16LE(1, 4); // planes
  entry1.writeUInt16LE(32, 6); // bpp
  entry1.writeUInt32LE(b16.length, 8);
  entry1.writeUInt32LE(offset1, 12);

  const entry2 = Buffer.alloc(16);
  entry2.writeUInt8(32, 0); // width
  entry2.writeUInt8(32, 1); // height
  entry2.writeUInt8(0, 2);  // color count
  entry2.writeUInt8(0, 3);  // reserved
  entry2.writeUInt16LE(1, 4); // planes
  entry2.writeUInt16LE(32, 6); // bpp
  entry2.writeUInt32LE(b32.length, 8);
  entry2.writeUInt32LE(offset2, 12);

  const icoBuffer = Buffer.concat([header, entry1, entry2, b16, b32]);
  fs.writeFileSync('public/favicon.ico', icoBuffer);
  fs.writeFileSync('src/app/favicon.ico', icoBuffer);

  // 5. Create SVG wrapper for favicon.svg
  const b512 = await img.clone().resize(512, 512).png().toBuffer();
  const base64Png = b512.toString('base64');
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <image width="512" height="512" href="data:image/png;base64,${base64Png}"/>
</svg>
`;
  fs.writeFileSync('public/favicon.svg', svgContent);

  console.log('Successfully generated all favicons and icons!');
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
