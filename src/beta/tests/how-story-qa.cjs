const { chromium } = require('playwright-core');
const assert = require('node:assert/strict');
const fs = require('node:fs');

const url = process.argv.find(arg => arg.startsWith('--url='))?.slice(6) || 'http://localhost:3203';
const out = '/tmp/exekova-how-story';
fs.mkdirSync(out, { recursive: true });

(async () => {
  const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
  const errors = [], results = [];
  try {
    for (const width of [1440, 1024, 768]) {
      const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'no-preference' });
      page.on('pageerror', error => errors.push(error.message));
      assert.equal((await page.goto(url, { waitUntil: 'domcontentloaded' })).status(), 200);
      await page.evaluate(() => document.fonts.ready);
      await page.locator('.how-story').scrollIntoViewIfNeeded();
      await page.locator('.how-story-canvas > .work-backdrop').evaluate(img => img.decode());
      await page.evaluate(() => {
        window.howBackdrop = document.querySelector('.how-story-canvas > .work-backdrop');
        window.howDocuments = [...document.querySelectorAll('.how-step-layer .work-document')];
      });

      const transitions = [];
      for (const target of [2, 0, 1, 2]) {
        // Record every rendered frame after the click, including the frames
        // where scrolling passes through the other steps' positions.
        await page.evaluate(target => {
          window.howTransition = new Promise(resolve => {
            document.querySelectorAll('.how-story-tabs button')[target].addEventListener('click', () => {
              const start = performance.now(), frames = [];
              const sample = () => {
                const stage = document.querySelector('.how-story .how-story-stage');
                frames.push({ step: stage.dataset.step, scrollY, height: stage.getBoundingClientRect().height, copyHeight: document.querySelector('.how-story-descriptions').getBoundingClientRect().height });
                if (performance.now() - start < 900) requestAnimationFrame(sample);
                else resolve(frames);
              };
              requestAnimationFrame(sample);
            }, { once: true });
          });
        }, target);
        await page.locator('.how-story-tabs button').nth(target).click();
        const frames = await page.evaluate(() => window.howTransition);
        assert(frames.length > 5, 'Observe intermediate animation frames');
        assert(frames.every(frame => frame.step === String(target)), `Click ${target} must not flash another step`);
        assert(Math.max(...frames.map(frame => frame.height)) - Math.min(...frames.map(frame => frame.height)) < 1, 'The illustration keeps its height');
        assert(Math.max(...frames.map(frame => frame.copyHeight)) - Math.min(...frames.map(frame => frame.copyHeight)) < 1, 'The description keeps its height');
        const direction = Math.sign(frames.at(-1).scrollY - frames[0].scrollY);
        assert(frames.slice(1).every((frame, index) => (frame.scrollY - frames[index].scrollY) * direction >= -1), 'Tab scrolling never reverses direction');
        assert(await page.evaluate(() => window.howBackdrop === document.querySelector('.how-story-canvas > .work-backdrop') && window.howDocuments.every((node, index) => node === document.querySelectorAll('.how-step-layer .work-document')[index])), 'The background and scene content stay mounted');
        transitions.push({ target, frames });
      }

      // Rapid clicks replace an unfinished move with the latest request.
      await page.locator('.how-story-tabs button').nth(0).click();
      await page.waitForTimeout(70);
      await page.locator('.how-story-tabs button').nth(1).click();
      await page.waitForTimeout(70);
      await page.locator('.how-story-tabs button').nth(2).click();
      await page.waitForTimeout(750);
      assert.equal(await page.locator('.how-story .how-story-stage').getAttribute('data-step'), '2');

      if (width > 900) {
        // Real scrolling still selects each step after a tab animation ends.
        for (const [target, progress] of [[0, .12], [1, .5], [2, .88]]) {
          await page.locator('.how-story-scroll').evaluate((el, progress) => {
            const start = scrollY + el.getBoundingClientRect().top - 120;
            scrollTo({ top: start + (el.offsetHeight - innerHeight + 120) * progress, behavior: 'instant' });
          }, progress);
          await page.waitForFunction(target => document.querySelector('.how-story .how-story-stage').dataset.step === String(target), target);
        }
        await page.locator('.how-story-tabs button').nth(0).click();
        await page.waitForTimeout(80);
        await page.evaluate(() => dispatchEvent(new WheelEvent('wheel')));
        const interruptedAt = await page.evaluate(() => scrollY);
        await page.waitForTimeout(200);
        assert.equal(await page.evaluate(() => scrollY), interruptedAt, 'User scrolling interrupts the tab animation');
      }

      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.locator('.how-story').scrollIntoViewIfNeeded();
      for (const target of [0, 1, 2]) {
        const top = await page.evaluate(() => scrollY);
        await page.locator('.how-story-tabs button').nth(target).click();
        assert.equal(await page.locator('.how-story .how-story-stage').getAttribute('data-step'), String(target));
        assert.equal(await page.evaluate(() => scrollY), top, 'Reduced motion never animates the page');
      }
      await page.locator('.how-story').screenshot({ path: `${out}/how-${width}.png` });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), width);
      results.push({ width, transitions });
      console.log('PASS fluid how-it-works', width);
      await page.close();
    }

    for (const width of [390, 320]) {
      const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      await page.evaluate(() => document.fonts.ready);
      assert.deepEqual(await page.locator('.how-mobile-scene .how-story-description h3').allTextContents(), ['Get', 'Set', 'Done']);
      for (const scene of await page.locator('.how-mobile-scene').all()) {
        await scene.scrollIntoViewIfNeeded();
        assert(await scene.isVisible());
      }
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), width);
      results.push({ width, mobileScenes: 'pass' });
      console.log('PASS mobile how-it-works', width);
      await page.close();
    }
    assert.deepEqual(errors, []);
    fs.writeFileSync(`${out}/results.json`, JSON.stringify({ results, errors }, null, 2));
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
