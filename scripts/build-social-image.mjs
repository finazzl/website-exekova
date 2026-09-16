import { chromium } from 'playwright-core';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Render a precise typography-based card using the site's existing logo,
// design tokens and bundled fonts. Run after the first static site build.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const chunks = path.join(root, 'dist/cloudflare/site/_next/static/chunks');
const styles = (await Promise.all((await readdir(chunks)).filter(file => file.endsWith('.css')).map(file => readFile(path.join(chunks, file), 'utf8')))).join('\n');
const fonts = [...styles.matchAll(/@font-face\{[^}]+\}/g)].map(match => match[0]).filter(rule => /font-family:(?:Figtree|["']?EB Garamond)/.test(rule) && rule.includes('unicode-range:U+??,'));
if (!fonts.length) throw new Error('Build the static export first so the brand fonts are available.');
const embeddedFonts = await Promise.all(fonts.map(async rule => {
  const source = rule.match(/src:url\(([^)]+)\)/)?.[1];
  const bytes = await readFile(path.resolve(chunks, source));
  return rule.replace(source, `data:font/woff2;base64,${bytes.toString('base64')}`);
}));
const globals = await readFile(path.join(root, 'src/app/globals.css'), 'utf8');
const tokens = globals.match(/:root\s*\{[^}]+\}/)?.[0];
const logo = (await readFile(path.join(root, 'public/brand/big-xkova.png'))).toString('base64');
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><style>
${tokens}
${embeddedFonts.join('\n')}
*{box-sizing:border-box}body{margin:0}
.card{width:1200px;height:630px;position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;background:var(--wz-paper);color:var(--wz-ink);font-family:Figtree,sans-serif;text-align:center;border-bottom:10px solid var(--wz-green)}
.halo{position:absolute;width:900px;height:900px;border-radius:50%;background:radial-gradient(circle,var(--wz-lilac),transparent 68%);right:-500px;top:-390px}
.logo{position:relative;width:360px;height:auto;margin:0 0 29px}
.eyebrow{position:relative;font-size:17px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:var(--wz-ink-muted);margin:0 0 18px}
h1{position:relative;margin:0;font-size:100px;line-height:1;letter-spacing:-5px;font-weight:600}
h1 em{display:block;color:var(--wz-purple);font-family:'EB Garamond',serif;font-weight:400;font-size:112px;letter-spacing:-4px;margin-top:0}
.description{position:relative;font-size:25px;line-height:1.4;color:var(--wz-ink-muted);margin:26px 0 0}
.domain{position:relative;margin:19px 0 0;font-size:20px;font-weight:600;color:var(--wz-purple)}
</style></head><body><main class="card"><div class="halo"></div><img class="logo" src="data:image/png;base64,${logo}" alt="exekova"><p class="eyebrow">Autonomous Work Execution Platform</p><h1>Task. Repo.<em>Done.</em></h1><p class="description">Executed. Independently reviewed. Verified.</p><p class="domain">exekova.com</p></main></body></html>`;
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(html);
  await page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map(image => image.decode())); });
  const output = path.join(root, 'public/brand/exekova-social-v2.png');
  const bytes = await page.screenshot({ path: output });
  if (bytes.length > 300 * 1024) throw new Error('Social image exceeds the project size budget.');
  console.log(`Created ${output}: 1200 × 630, ${Math.round(bytes.length / 1024)} KiB`);
} finally {
  await browser.close();
}
