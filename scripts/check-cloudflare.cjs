const { chromium } = require('playwright-core');
const fs = require('node:fs/promises');
const path = require('node:path');
const assert = require('node:assert/strict');

const base = process.argv.find(arg => arg.startsWith('--url='))?.slice(6) || 'http://127.0.0.1:3211';
const root = path.resolve(__dirname, '../dist/cloudflare');
const screenshots = path.join(root, 'verification');
const sameOrigin = value => new URL(value, base).origin === new URL(base).origin;

(async () => {
  await fs.mkdir(screenshots, { recursive: true });
  const report = JSON.parse(await fs.readFile(path.join(root, 'build-report.json'), 'utf8'));
  const failures = [], runtimeErrors = [], failedRequests = [];
  const urls = new Set();
  for (const file of report.files) {
    if (['_headers', '_redirects', '404.html'].includes(file)) continue;
    urls.add(file === 'index.html' ? '/' : '/' + file.replace(/\.html$/, ''));
    if (!file.endsWith('.html')) continue;
    const html = await fs.readFile(path.join(root, 'site', file), 'utf8');
    for (const match of html.matchAll(/(?:href|src)="(\/[^"<>]*)"/g)) {
      const value = match[1].replace(/&amp;/g, '&');
      if (value.startsWith('//')) continue;
      const url = new URL(value, base); urls.add(url.pathname + url.search);
    }
  }
  const pending = [...urls];
  await Promise.all(Array.from({ length: 12 }, async () => {
    while (pending.length) {
      const route = pending.pop();
      try {
        const response = await fetch(base + route, { method: 'HEAD', signal: AbortSignal.timeout(15000) });
        if (response.status !== 200) failures.push({ route, status: response.status });
      } catch (error) { failures.push({ route, error: error.message }); }
    }
  }));
  assert.deepEqual(failures, [], 'Exported files and internal links must resolve');
  const redirectRules = (await fs.readFile(path.join(root, 'site/_redirects'), 'utf8')).split('\n').filter(line => line && !line.startsWith('#'));
  for (const line of redirectRules) {
    const [source, destination, status] = line.split(/\s+/);
    assert(!source.includes(':'), 'Static redirects must not shadow router assets');
    const response = await fetch(base + source + '?from=verification', { redirect: 'manual' });
    assert.equal(response.status, Number(status));
    assert.equal(response.headers.get('location'), destination + '?from=verification');
  }
  assert.equal((await fetch(base + '/does-not-exist-cloudflare-check')).status, 404);
  const index = await fs.readFile(path.join(root, 'site/index.html'), 'utf8');
  const canonical = index.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  assert.equal(new URL(canonical).href, report.siteUrl + '/');
  assert(!index.includes('content="noindex'));
  assert((await fs.readFile(path.join(root, 'site/signin.html'), 'utf8')).includes('content="noindex'));
  assert(!index.includes('/_next/image?'));
  // Deploys go through `wrangler deploy` (Workers Static Assets), which allows 20,000
  // files. The report's 1,000-file flag is the Pages dashboard upload limit, a warning
  // about that other upload path rather than a constraint on this one. 25 MiB per file
  // applies to both.
  assert(report.fileCount <= 20000); assert(report.largestAsset.bytes <= 25 * 1024 * 1024);
  console.log(`PASS ${urls.size} exported assets/internal URLs, ${redirectRules.length} redirects, 404 and production metadata`);

  const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
  const viewports = [];
  try {
    for (const width of [1440, 1024, 768, 390, 320]) {
      const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce', acceptDownloads: true });
      page.on('pageerror', error => runtimeErrors.push(error.message));
      page.on('response', response => { if (sameOrigin(response.url()) && response.status() >= 400) failedRequests.push({ url: response.url(), status: response.status() }); });
      assert.equal((await page.goto(base, { waitUntil: 'networkidle' })).status(), 200);
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), width);
      assert.equal(await page.locator('#beta-title').innerText().then(text => text.replace(/\s+/g, ' ')), 'Task. Repo. Done.');
      const brokenImages = await page.locator('img').evaluateAll(images => images.filter(img => img.complete && !img.naturalWidth).map(img => img.src));
      assert.deepEqual(brokenImages, []);
      if ([1440, 390].includes(width)) await page.screenshot({ path: path.join(screenshots, `home-${width}.png`) });

      await page.locator('.hero-actions a').click();
      await page.locator('dialog[open]').waitFor();
      const options = await page.locator('#request-source option,#request-provider option').evaluateAll(els => els.map(el => ({ text: el.textContent, value: el.value })));
      for (const option of options) assert.equal(option.text, option.value);
      await page.locator('#request-email').fill('static-check@example.com');
      await page.locator('#request-company').fill('Static export check');
      await page.locator('#request-task').fill('Update one deprecated endpoint.');
      await page.locator('#request-criteria').fill('Required checks pass and review evidence is attached.');
      const downloaded = page.waitForEvent('download');
      await page.locator('.request-actions .beta-text-button').click();
      const download = await downloaded;
      assert.equal(download.suggestedFilename(), 'exekova-access-request.txt');
      await page.getByRole('button', { name: 'Close access request', exact: true }).click();

      if (width < 1100) {
        await page.getByRole('button', { name: 'Open menu', exact: true }).click();
        await page.locator('.navigation-mobile-actions .navigation-signin').click();
      } else await page.locator('.navigation-actions .navigation-signin').click();
      await page.waitForURL('**/signin'); await page.locator('.signin-card').waitFor();
      assert.equal(await page.locator('.signin-card').evaluate(el => el.getBoundingClientRect().top), 0);
      assert.equal(await page.locator('.signin-section').evaluate(el => getComputedStyle(el).padding), '0px');
      if ([1440, 390].includes(width)) await page.screenshot({ path: path.join(screenshots, `signin-${width}.png`) });
      await page.locator('.signin-brand').click(); await page.waitForURL(base + '/');
      assert.equal(await page.locator('.beta-how').evaluate(el => getComputedStyle(el).paddingTop), width < 768 ? '72px' : '112px');

      if ([1440, 390].includes(width)) {
        await page.locator('.outcome-featured a').click(); await page.waitForURL('**/use-cases/fintech-psp-deprecation');
        assert(await page.locator('h1').isVisible());
        await page.goto(base + '/industries', { waitUntil: 'networkidle' });
        await page.locator('a[href="/industries/fintech"]').first().click(); await page.waitForURL('**/industries/fintech');
        assert(await page.locator('h1').isVisible());
        await page.goto(base + '/contact', { waitUntil: 'networkidle' });
        assert(await page.locator('form').isVisible());
        await page.goto(base + '/privacy', { waitUntil: 'networkidle' });
        assert(await page.locator('h1').isVisible());
      }
      viewports.push(width); await page.close(); console.log('PASS static browser interactions', width);
    }
    assert.deepEqual(runtimeErrors, []); assert.deepEqual(failedRequests, []);
  } finally { await browser.close(); }
  await fs.writeFile(path.join(root, 'verification-report.json'), JSON.stringify({ checkedAt: new Date().toISOString(), zipSha256: report.zipSha256, checkedUrls: urls.size, checkedRedirects: redirectRules.length, viewports, runtimeErrors, failedRequests, productionMetadata: 'pass', formDownload: 'pass', signinSpacing: 'pass' }, null, 2) + '\n');
})().catch(error => { console.error(error); process.exitCode = 1; });
