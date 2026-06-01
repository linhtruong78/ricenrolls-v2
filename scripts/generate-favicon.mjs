import sharp from 'sharp';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input  = path.join(__dirname, '../public/images/ricenroll.png');
const appDir = path.join(__dirname, '../src/app');

// icon.png — used by Next.js App Router as the tab favicon
await sharp(input)
  .resize(256, 256, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile(path.join(appDir, 'icon.png'));

console.log('✅ icon.png generated in src/app/');
