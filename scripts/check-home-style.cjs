const { chromium } = require('playwright-core');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const base = process.argv.find(arg => arg.startsWith('--url='))?.slice(6) || 'http://localhost:3210';

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
  const results = [], errors = [];
  await fs.mkdir('qa-output/home-style', { recursive: true });
  try {
    for (const width of [1440, 1920, 2560, 390, 320]) {
      const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(base, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator('.ribbon-result').count(), 0, 'The changing hero chip stays removed');
      const geometry = await page.evaluate(() => {
        const svg = document.querySelector('.task-ribbon-svg');
        const box = svg.getBoundingClientRect();
        const center = new DOMPoint(720, 510).matrixTransform(svg.getScreenCTM());
        return { left: box.left, right: box.right, center: center.x, pageWidth: document.documentElement.scrollWidth };
      });
      assert(geometry.left <= 1 && geometry.right >= width - 1, 'Ribbon must reach both viewport edges');
      assert(Math.abs(geometry.center - width / 2) < 1, 'Ribbon passes through the centered logo');
      assert.equal(geometry.pageWidth, width, 'No horizontal page overflow');
      await page.screenshot({ path: `qa-output/home-style/ribbon-${width}.png` });
      await page.locator('#pricing').scrollIntoViewIfNeeded();
      await page.waitForFunction(() => [...document.querySelectorAll('#pricing img')].every(img => img.complete && img.naturalWidth > 0));
      const theme = await page.evaluate(() => Object.fromEntries([
        ['background', '#pricing', 'backgroundColor'],
        ['heading', '#pricing h2', 'color'],
        ['accent', '#pricing h2 em', 'color'],
        ['copy', '#pricing .beta-heading>p', 'color'],
        ['button', '#pricing .beta-button', 'backgroundColor'],
        ['buttonText', '#pricing .beta-button', 'color'],
      ].map(([name, selector, property]) => [name, getComputedStyle(document.querySelector(selector))[property]])));
      assert.deepEqual(theme, {
        background: 'rgb(20, 17, 45)', heading: 'rgb(250, 249, 252)', accent: 'rgb(5, 204, 131)',
        copy: 'rgb(224, 217, 237)', button: 'rgb(81, 60, 236)', buttonText: 'rgb(255, 255, 255)',
      }, 'Approved pricing palette must survive CSS optimization');
      await page.locator('#pricing').screenshot({ path: `qa-output/home-style/pricing-${width}.png` });
      results.push({ width, geometry, theme });
      await page.close();
      console.log(`PASS ${width}px: full viewport ribbon, centered logo, no changing chip, original pricing palette`);
    }
    assert.deepEqual(errors, []);
    await fs.writeFile('qa-output/home-style/verification.json', JSON.stringify({ base, results, errors }, null, 2));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
