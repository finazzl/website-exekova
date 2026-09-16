import sharp from 'sharp';
import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const photos = ['workspace-flow', 'team-room', 'operations-room'];
await mkdir(path.join(root, 'public/images'), { recursive: true });
for (const name of photos) {
  for (const width of [320, 640, 960, 1280]) {
    await sharp(path.join(root, `src/beta/assets/${name}.png`))
      .resize({ width }).webp({ quality: 78, effort: 6 })
      .toFile(path.join(root, `public/images/${name}-${width}.webp`));
  }
}
for (const directory of ['public/brand', 'public/brand/integrations']) {
  for (const file of await readdir(path.join(root, directory))) {
    if (!file.endsWith('.png') || /social|og-default|claude-code|codex/.test(file)) continue;
    const width = file === 'big-xkova.png' ? 400 : file === 'small-xkova.png' ? 260 : file === 'exekova-mark.png' ? 128 : 96;
    await sharp(path.join(root, directory, file))
      .resize({ width, height: directory.endsWith('integrations') ? 96 : undefined, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 90, effort: 6 })
      .toFile(path.join(root, directory, file.replace('.png', '.webp')));
  }
}
console.log('Generated responsive WebP photos and compact brand images. Original artwork is preserved.');
