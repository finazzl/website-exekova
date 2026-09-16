const { chromium } = require('playwright-core');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const base = process.argv.find(arg => arg.startsWith('--url='))?.slice(6) || 'http://127.0.0.1:3211';
const id = 'G-R33H6YFCH2';
const key = 'exekova-cookie-preferences';
const isGoogle = url => /https:\/\/[^/]*(?:google-analytics\.com|googletagmanager\.com)\//.test(url);
const isCollection = url => isGoogle(url) && new URL(url).pathname.endsWith('/collect');

async function waitForMeasurement(page, check, message) {
  const deadline = Date.now() + 20000;
  while (!check() && Date.now() < deadline) await page.waitForTimeout(100);
  assert(check(), message);
}

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
  const report = { base, id, requests: [], collections: [], errors: [] };
  await fs.mkdir('qa-output/analytics', { recursive: true });
  try {
    if (process.argv.includes('--delivery')) {
      assert.equal(new URL(base).origin, 'https://exekova.com', 'Delivery verification is for production');
      const page = await browser.newPage({ reducedMotion: 'reduce' });
      await page.goto(base, { waitUntil: 'networkidle' });
      const delivered = page.waitForResponse(response => {
        if (!isCollection(response.url())) return false;
        const params = new URL(response.url()).searchParams;
        const body = response.request().postData() || '';
        return params.get('tid') === id && (params.get('en') === 'page_view' || body.includes('en=page_view'));
      }, { timeout: 30000 });
      await page.getByRole('button', { name: 'Allow analytics' }).click();
      const response = await delivered;
      assert(response.ok(), `Google collection response: ${response.status()}`);
      report.delivery = { status: response.status(), endpoint: new URL(response.url()).origin, measurementId: id };
      console.log(`PASS production page view accepted by Google: HTTP ${response.status()}, ${id}`);
      return;
    }
    for (const width of [1440, 390]) {
      const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
      const requests = [], collections = [];
      report.requests.push({ width, requests });
      report.collections.push({ width, events: collections });
      // Run the real Google library; intercept measurement transport so QA does not pollute reports.
      await context.route('**/*', async route => {
        const request = route.request(), url = request.url();
        if (isGoogle(url)) requests.push(url);
        if (!isCollection(url)) return route.continue();
        const common = new URL(url).searchParams;
        for (const line of (request.postData() || '').split('\n')) {
          const event = Object.fromEntries([...common, ...new URLSearchParams(line)]);
          collections.push(event);
        }
        await route.fulfill({ status: 204, headers: { 'Access-Control-Allow-Origin': '*' } });
      });
      const page = await context.newPage();
      page.on('pageerror', error => report.errors.push(error.message));
      await page.goto(base + '/?qa_analytics=do-not-collect#qa', { waitUntil: 'networkidle' });
      const notice = page.getByRole('complementary', { name: 'Analytics preference' });
      await notice.waitFor();
      assert.equal(requests.length, 0, 'No Google request before consent');
      await notice.getByRole('button', { name: 'No thanks' }).click();
      await page.reload({ waitUntil: 'networkidle' });
      assert.equal(await notice.count(), 0, 'Rejection persists');
      assert.equal(requests.length, 0, 'No Google request after rejection');

      await page.evaluate(key => localStorage.removeItem(key), key);
      await page.reload({ waitUntil: 'networkidle' });
      const tagResponse = page.waitForResponse(response => response.url().startsWith('https://www.googletagmanager.com/gtag/js?id=' + id));
      await notice.getByRole('button', { name: 'Allow analytics' }).click();
      assert.equal((await tagResponse).status(), 200, 'Google tag loads successfully');
      const pageViews = () => collections.filter(event => event.en === 'page_view');
      await waitForMeasurement(page, () => pageViews().length > 0, 'Initial page view is emitted');
      await page.waitForTimeout(1500);
      assert.equal(pageViews().length, 1, 'One initial page view');
      assert.equal(pageViews()[0].tid, id);
      assert.equal(pageViews()[0].dl, base + '/');
      assert(!JSON.stringify(collections).includes('do-not-collect'), 'Measurement excludes query/fragment data');
      assert.equal(await page.locator('#exekova-google-analytics').count(), 1);
      assert((await context.cookies()).some(cookie => cookie.name.startsWith('_ga')), 'Analytics cookie exists after opt-in');

      if (width < 1100) await page.getByRole('button', { name: 'Open menu' }).click();
      await page.locator(width < 1100 ? '.navigation-mobile a[href="/pricing"]' : '.navigation-desktop a[href="/pricing"]').click();
      await page.waitForURL('**/pricing');
      await page.waitForLoadState('networkidle');
      await waitForMeasurement(page, () => pageViews().some(event => event.dl === base + '/pricing'), 'Navigation page view is emitted');
      await page.waitForTimeout(1500);
      assert.equal(pageViews().filter(event => event.dl === base + '/pricing').length, 1, 'One page view after navigation');

      await page.goto(base + '/cookie-settings', { waitUntil: 'networkidle' });
      await page.getByRole('button', { name: 'Reject non-essential' }).click();
      await page.waitForFunction(id => window['ga-disable-' + id] === true, id);
      assert(!(await context.cookies()).some(cookie => cookie.name.startsWith('_ga')), 'Analytics cookies removed after withdrawal');
      const count = collections.length;
      await page.locator('footer a[href="/pricing"]').first().click();
      await page.waitForURL('**/pricing');
      await page.waitForTimeout(1500);
      assert.equal(collections.length, count, 'No measurement after withdrawal');
      assert.equal(pageViews().filter(event => event.dl === base + '/pricing').length, 1, 'No delayed duplicate navigation page view');
      console.log(`PASS ${width}px: consent, rejection, real tag loading, page views, clean URL, withdrawal`);
      await context.close();
    }
    assert.deepEqual(report.errors, []);
  } finally {
    await fs.writeFile('qa-output/analytics/verification.json', JSON.stringify(report, null, 2));
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
