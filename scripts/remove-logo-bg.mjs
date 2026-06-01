import sharp from 'sharp';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputPath  = path.join(__dirname, '../public/images/ricenroll.png');
const outputPath = path.join(__dirname, '../public/images/ricenroll.png');

const image = sharp(inputPath);
const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

const { width, height } = info;
const channels = 4;
const buf = Buffer.from(data);

const visited = new Uint8Array(width * height);

function isWhitish(x, y) {
  const i = (y * width + x) * channels;
  return buf[i] > 220 && buf[i+1] > 220 && buf[i+2] > 220;
}

// BFS flood-fill from all 4 corners
const queue = [];
function enqueue(x, y) {
  const idx = y * width + x;
  if (x >= 0 && x < width && y >= 0 && y < height && !visited[idx] && isWhitish(x, y)) {
    visited[idx] = 1;
    queue.push(x, y);
  }
}
enqueue(0, 0); enqueue(width-1, 0); enqueue(0, height-1); enqueue(width-1, height-1);

let head = 0;
while (head < queue.length) {
  const x = queue[head++], y = queue[head++];
  const i = (y * width + x) * channels;
  buf[i+3] = 0; // make transparent
  enqueue(x-1, y); enqueue(x+1, y); enqueue(x, y-1); enqueue(x, y+1);
}

await sharp(buf, { raw: { width, height, channels } }).png().toFile(outputPath + '.tmp');
fs.renameSync(outputPath + '.tmp', outputPath);
console.log('✅ Background removed from ricenroll.png');
