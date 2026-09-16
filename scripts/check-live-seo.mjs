import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { JSDOM } from 'jsdom';

const base = 'https://exekova.com';
const report = { checkedAt: new Date().toISOString(), crawlerResponses: [], redirects: [], pages: [] };
async function get(url, options = {}) {
  return fetch(url, { ...options, signal: AbortSignal.timeout(20000) });
}
let sitemapText;
for (const userAgent of ['Mozilla/5.0 (compatible; Exekova SEO check)', 'Googlebot']) {
  for (const route of ['/sitemap.xml', '/robots.txt']) {
    const response = await get(base + route, { headers: { 'User-Agent': userAgent }, redirect: 'manual' });
    assert.equal(response.status, 200, `${userAgent}: ${route}`);
    assert.match(response.headers.get('strict-transport-security') || '', /max-age=31536000/);
    const body = await response.text();
    if (route.endsWith('.xml')) {
      assert.match(response.headers.get('content-type') || '', /xml/);
      if (sitemapText) assert.equal(body, sitemapText, 'Bots must receive the same sitemap');
      sitemapText = body;
    } else {
      assert.match(body, /Sitemap: https:\/\/exekova.com\/sitemap.xml/);
      assert(!/^Host:/m.test(body));
    }
    report.crawlerResponses.push({ userAgent, route, status: response.status, contentType: response.headers.get('content-type') });
  }
}
for (const [url, destination] of [
  ['http://exekova.com/', base + '/'],
  ['http://www.exekova.com/contact?from=seo', base + '/contact?from=seo'],
  ['https://www.exekova.com/contact/', base + '/contact'],
  ['https://exekova.sanjay-singh-597.workers.dev/', base + '/'],
  [base + '/index.html', base + '/'],
  [base + '/contact.html', base + '/contact'],
  [base + '/contact/', base + '/contact'],
  [base + '/integrations/claude-code', '/integrations'],
  [base + '/integrations/codex', '/integrations'],
]) {
  const response = await get(url, { redirect: 'manual' });
  assert.equal(response.status, 308, url);
  assert.equal(new URL(response.headers.get('location'), base).href, new URL(destination, base).href, url);
  assert(response.headers.has('strict-transport-security'));
  report.redirects.push({ url, status: response.status, location: response.headers.get('location') });
}
const document = new JSDOM(sitemapText, { contentType: 'application/xml' }).window.document;
const urls = [...document.querySelectorAll('loc')].map(node => node.textContent);
assert(!urls.some(url => /integrations\/(claude-code|codex)/.test(url)));
const queue = [...urls];
await Promise.all(Array.from({ length: 6 }, async () => {
  while (queue.length) {
    const url = queue.pop();
    const response = await get(url, { method: 'HEAD', redirect: 'manual', headers: { 'User-Agent': 'Googlebot' } });
    assert.equal(response.status, 200, url);
    assert.match(response.headers.get('content-type') || '', /text\/html/);
    assert(response.headers.has('strict-transport-security'));
    report.pages.push({ url, status: response.status });
  }
}));
assert.equal((await get(base + '/does-not-exist-seo-check')).status, 404);
assert.equal((await get(base + '/api/contact')).status, 405);
await mkdir('qa-output/seo', { recursive: true });
await writeFile('qa-output/seo/verified-live.json', JSON.stringify(report, null, 2));
console.log(`PASS ${urls.length} live sitemap pages, ${report.redirects.length} permanent redirects, normal and Googlebot sitemap/robots responses, HSTS, 404 and contact API routing.`);
