const { chromium } = require('playwright-core');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const url = process.argv.find(a => a.startsWith('--url='))?.slice(6) || 'http://localhost:3201';
const selectedWidth = process.argv.find(a => a.startsWith('--width='))?.slice(8);
const widths = selectedWidth ? [Number(selectedWidth)] : [1440, 390, 320, 768, 1024, 1280, 1920];
const out = '/tmp/exekova-students-tools/current';
fs.mkdirSync(out, { recursive: true });

(async () => {
  const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
  const errors = [], results = [];
  try {
    for (const width of widths) {
      const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
      page.on('pageerror', e => errors.push(e.message));
      // Section hydration is the readiness condition; unrelated site prefetches
      // can continue after the page is ready for interaction.
      assert.equal((await page.goto(url, { waitUntil: 'domcontentloaded' })).status(), 200);
      await page.evaluate(() => document.fonts.ready);
      const section = page.locator('#sources');
      await section.evaluate(el => scrollTo({ top: scrollY + el.getBoundingClientRect().top - 100, behavior: 'instant' }));
      await section.locator('[data-tools-ribbon][data-ready=true]').waitFor();
      await section.locator('img').evaluateAll(imgs => Promise.all(imgs.map(img => { img.loading = 'eager'; return img.decode(); })));
      await page.screenshot({ path: `${out}/tools-${width}.png` });
      await section.screenshot({ path: `${out}/section-${width}.png` });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), width, 'No horizontal overflow');
      assert(!/illustrative/i.test(await page.locator('body').innerText()), 'Live copy omits Illustrative');
      const surfaces = await page.evaluate(() => {
        const root = getComputedStyle(document.documentElement);
        const probe = document.createElement('span'); probe.style.color = root.getPropertyValue('--wz-green'); document.body.append(probe);
        const brand = getComputedStyle(probe).color; probe.remove();
        const borders = [...document.querySelectorAll('.work-document,.feature-visual,.team-outcome-record,.accepted-work-meter,.meter-receipt,#sources,#sources article')].map(el => ({name: el.className, width: getComputedStyle(el).borderTopWidth}));
        return { brand, fill: getComputedStyle(document.querySelector('[data-tools-green-side]')).fill, borders };
      });
      assert.equal(surfaces.fill, surfaces.brand, 'Ribbon background uses the shared brand green');
      for (const border of surfaces.borders) assert.equal(border.width, '0px', `Added outline removed: ${border.name}`);
      assert.equal(await section.locator('article').count(), 3, 'Exactly three workflow steps');
      for (const [name, status] of Object.entries({ Jira: 'available', 'Work Intent form': 'available', GitHub: 'available', Slack: 'planned', Teams: 'planned', Excel: 'planned', Linear: 'planned', CSV: 'planned', GitLab: 'planned', Bitbucket: 'planned' })) {
        const entry = section.locator(`[data-connector="${name}"]`);
        assert.equal(await entry.count(), 1, 'One accessible entry per integration');
        assert.equal(await entry.getAttribute('data-status'), status);
        assert((await entry.innerText()).includes(status === 'available' ? 'Available' : 'Planned'));
      }
      assert(!/[\u2800-\u28ff]/u.test(await section.innerText()), 'No stray Braille characters');
      const collision = await section.evaluate(el => {
        const ribbon = el.querySelector('[data-tools-ribbon]'), path = ribbon.querySelector('[data-tools-curve]'), box = ribbon.getBoundingClientRect();
        const copy = el.querySelector('h2').parentElement;
        const textRects = [...copy.querySelectorAll('h2,p,a,li')].flatMap(node => {
          const range = document.createRange(); range.selectNodeContents(node);
          return [...range.getClientRects()].filter(r => r.width > 0);
        });
        const length = path.getTotalLength();
        for (let d = 0; d < length; d += 4) {
          const p = path.getPointAtLength(d), x = p.x + box.x, y = p.y + box.y;
          if (x < -60 || x > innerWidth + 60) continue;
          // Conservative footprint includes a rotated tile and its status label.
          const radius = innerWidth < 768 ? 48 : 56;
          if (textRects.some(r => x + radius > r.left && x - radius < r.right && y + radius > r.top && y - radius < r.bottom)) return { x, y };
        }
        return null;
      });
      assert.equal(collision, null, `No ribbon/copy overlap at any animation phase: ${JSON.stringify(collision)}`);
      const metrics = await section.evaluate(el => {
        const h2 = el.querySelector('h2'), r = h2.getBoundingClientRect(), s = getComputedStyle(h2), panel = el.getBoundingClientRect();
        return { width: panel.width, radius: getComputedStyle(el).borderRadius, padding: getComputedStyle(el).paddingTop, title: { x: r.x, width: r.width, height: r.height, font: s.fontSize, line: s.lineHeight, family: s.fontFamily } };
      });
      if (width === 1440 || width === 390) {
        assert.equal(metrics.title.font, width === 1440 ? '64px' : '40px');
        assert.equal(metrics.title.x, width === 1440 ? 100 : 20);
        assert.equal(metrics.padding, width === 1440 ? '112px' : '72px');
      }
      const tile = section.locator('[data-ribbon-tool]').nth(15);
      const frozen = await tile.getAttribute('style');
      await page.waitForTimeout(150);
      assert.equal(await tile.getAttribute('style'), frozen, 'Reduced motion stays still');
      await section.getByRole('link', { name: 'Get started with EXEKOVA' }).click();
      assert(await page.getByRole('dialog').isVisible(), 'CTA opens the shared access form');
      await page.keyboard.press('Escape');
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await section.locator('h2').scrollIntoViewIfNeeded();
      await section.getByRole('button', { name: 'Pause tools animation' }).waitFor();
      await page.waitForTimeout(120);
      const moving = await tile.getAttribute('style');
      await page.waitForTimeout(180);
      assert.notEqual(await tile.getAttribute('style'), moving, 'Ribbon moves while visible');
      await section.getByRole('button', { name: 'Pause tools animation' }).click();
      await page.waitForTimeout(100);
      const paused = await tile.getAttribute('style');
      await page.waitForTimeout(180);
      assert.equal(await tile.getAttribute('style'), paused, 'Pause freezes the ribbon');
      await section.getByRole('button', { name: 'Play tools animation' }).focus();
      await page.keyboard.press('Enter');
      assert.equal(await section.locator('[data-tools-ribbon]').getAttribute('data-playing'), 'true');
      results.push({ width, metrics });
      console.log('PASS tools', width);
      await page.close();
    }
    assert.deepEqual(errors, []);
    fs.writeFileSync(`${out}/${selectedWidth ? `results-${selectedWidth}` : 'results'}.json`, JSON.stringify({ results, errors }, null, 2));
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
