import { readFile, readdir, stat, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

const root = path.resolve('dist/cloudflare/site');
async function walk(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(file)); else files.push(file);
  }
  return files;
}
const files = await walk(root);
const origin = 'https://exekova.com';
const sitemap = new JSDOM(await readFile(path.join(root, 'sitemap.xml'), 'utf8'), { contentType: 'application/xml' }).window.document;
assert.equal(sitemap.documentElement.namespaceURI, 'http://www.sitemaps.org/schemas/sitemap/0.9');
const urls = [...sitemap.querySelectorAll('loc')].map(node => node.textContent);
assert.equal(new Set(urls).size, urls.length, 'Sitemap URLs must be unique');
const robots = await readFile(path.join(root, 'robots.txt'), 'utf8');
assert(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
assert(!/^Host:/m.test(robots));
const pages = new Map(), incoming = new Map(), external = new Map();
for (const file of files.filter(file => file.endsWith('.html'))) {
  const route = '/' + path.relative(root, file).replace(/index\.html$/, '').replace(/\.html$/, '');
  const html = await readFile(file, 'utf8');
  const document = new JSDOM(html, { url: origin + route }).window.document;
  const noindex = document.querySelector('meta[name="robots"]')?.content.includes('noindex');
  pages.set(route, { bytes: Buffer.byteLength(html), nodes: document.querySelectorAll('*').length, words: document.querySelector('main')?.textContent.trim().split(/\s+/).length ?? 0, noindex });
  if (!noindex && !['/404', '/_not-found'].includes(route)) {
    assert.equal(document.querySelector('link[rel="canonical"]')?.href, origin + route, `Canonical mismatch: ${route}`);
    assert(urls.includes(origin + route), `Indexable page missing from sitemap: ${route}`);
  }
  assert(!/Claude Code|\bCodex\b/.test(document.body.textContent), `Implementation detail exposed: ${route}`);
  for (const script of document.querySelectorAll('script[type="application/ld+json"]')) JSON.parse(script.textContent);
  for (const use of document.querySelectorAll('use[href^="/brand/"]')) {
    const [file, id] = use.getAttribute('href').split('#');
    const sprite = await readFile(path.join(root, file), 'utf8');
    assert(sprite.includes(`id="${id}"`), `Missing icon ${id} on ${route}`);
  }
  for (const image of document.images) {
    const local = new URL(image.src);
    if (local.origin === origin) await stat(path.join(root, local.pathname));
    assert(!/\.png$/.test(local.pathname), `Unoptimized page image: ${route} ${local.pathname}`);
    for (const candidate of (image.srcset || '').split(',').filter(Boolean)) await stat(path.join(root, candidate.trim().split(/\s+/)[0]));
  }
  for (const anchor of document.querySelectorAll('a[href]')) {
    const url = new URL(anchor.href);
    if (!['https:', 'http:'].includes(url.protocol)) continue;
    const map = url.origin === origin ? incoming : external;
    const key = url.origin === origin ? url.pathname.replace(/\/$/, '') || '/' : url.href;
    if (key === route) continue;
    if (!map.has(key)) map.set(key, new Set());
    map.get(key).add(route);
  }
}
for (const url of urls) {
  const route = new URL(url).pathname;
  assert.equal(new URL(url).origin, origin);
  assert(pages.has(route) && !pages.get(route).noindex, `Sitemap target must be an indexable page: ${route}`);
  assert((incoming.get(route)?.size ?? 0) >= 2, `Fewer than two linking pages: ${route}`);
}
for (const [route] of incoming) {
  if (pages.has(route)) continue;
  await stat(path.join(root, route));
}
assert(!urls.some(url => /integrations\/(claude-code|codex)/.test(url)));
const report = { sitemapUrls: urls.length, pages: Object.fromEntries(pages), external: Object.fromEntries([...external].map(([url, refs]) => [url, [...refs]])) };
await mkdir('qa-output/seo', { recursive: true });
await writeFile('qa-output/seo/verified-static.json', JSON.stringify(report, null, 2));
console.log(`PASS ${urls.length} canonical sitemap URLs, internal links, at least two incoming links per indexable page, image files and structured data.`);
console.log(JSON.stringify({ homepage: report.pages['/'], contact: report.pages['/contact'], externalLinks: external.size }));
