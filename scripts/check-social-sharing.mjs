import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

const base = new URL(process.argv.find(arg => arg.startsWith('--url='))?.slice(6) || 'http://127.0.0.1:3211');
// WhatsApp documents separate A (Android), I (iOS), and N (Web) identifiers.
const agents = ['WhatsApp/2.22.20.72 A', 'WhatsApp/2.22.19.78 I', 'WhatsApp/2.2236.3 N', 'facebookexternalhit/1.1', 'Twitterbot/1.0', 'LinkedInBot/1.0'];
const routes = ['/', '/pricing', '/use-cases/fintech-psp-deprecation'];
const images = new Set();
const icons = new Set();

async function request(url, userAgent) {
  const response = await fetch(url, { headers: { 'User-Agent': userAgent, 'Accept-Language': 'en' }, signal: AbortSignal.timeout(20000) });
  assert.equal(response.status, 200, `${url}: crawler must receive HTTP 200`);
  assert(!response.headers.get('cf-mitigated'), `${url}: crawler must not receive a challenge`);
  return response;
}

for (const route of routes) {
  for (const userAgent of agents) {
    const response = await request(new URL(route, base), userAgent);
    assert.match(response.headers.get('content-type') || '', /^text\/html/);
    const html = await response.text();
    const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1];
    assert(head, `${route}: metadata must be in the initial HTML head without JavaScript`);
    const dom = new JSDOM(`<html><head>${head}</head></html>`);
    const document = dom.window.document;
    const meta = name => {
      const tags = document.head.querySelectorAll(`meta[property="${name}"],meta[name="${name}"]`);
      assert.equal(tags.length, 1, `${route}: exactly one ${name} tag`);
      const value = tags[0].getAttribute('content');
      assert(value?.trim(), `${route}: ${name} must not be empty`);
      return value;
    };
    assert.equal(meta('og:title'), document.title);
    assert(html.indexOf('<title>') < 16384 && html.indexOf('property="og:image"') < 16384, 'Sharing metadata must be near the start of the response');
    assert.equal(meta('og:description'), meta('description'));
    assert.equal(meta('og:type'), 'website');
    const canonical = new URL(document.head.querySelector('link[rel="canonical"]').href);
    assert.equal(new URL(meta('og:url')).href, canonical.href);
    assert.equal(canonical.pathname, route);
    assert.equal(canonical.protocol, 'https:');
    meta('og:site_name');
    meta('og:locale');
    const image = new URL(meta('og:image'));
    assert.equal(image.protocol, 'https:');
    assert.equal(meta('og:image:secure_url'), image.href);
    assert.equal(meta('og:image:type'), 'image/png');
    assert.equal(meta('og:image:width'), '1200');
    assert.equal(meta('og:image:height'), '630');
    meta('og:image:alt');
    assert.equal(meta('twitter:card'), 'summary_large_image');
    assert.equal(meta('twitter:title'), meta('og:title'));
    assert.equal(meta('twitter:description'), meta('og:description'));
    assert.equal(meta('twitter:image'), image.href);
    assert.equal(meta('twitter:image:alt'), meta('og:image:alt'));
    const iconLinks = [...document.head.querySelectorAll('link[rel="icon"],link[rel="apple-touch-icon"]')];
    assert(iconLinks.some(link => new URL(link.href, base).pathname === '/favicon.ico'), 'A favicon must be declared');
    assert(iconLinks.some(link => link.rel === 'apple-touch-icon'), 'An Apple touch icon must be declared');
    for (const link of iconLinks) {
      const iconUrl = new URL(link.href, base);
      const iconKey = `${userAgent} ${iconUrl.href}`;
      if (icons.has(iconKey)) continue;
      const iconResponse = await request(iconUrl, userAgent);
      const iconBytes = Buffer.from(await iconResponse.arrayBuffer());
      if (iconUrl.pathname.endsWith('.ico')) {
        assert.match(iconResponse.headers.get('content-type') || '', /^image\/(?:x-icon|vnd\.microsoft\.icon)/);
        assert.equal(iconBytes.readUInt32LE(0), 0x00010000, 'favicon.ico must contain a real ICO header, not a renamed PNG');
        const count = iconBytes.readUInt16LE(4);
        assert(count > 0 && iconBytes.length >= 6 + count * 16, 'ICO directory must be complete');
        for (let i = 0; i < count; i++) {
          const entry = 6 + i * 16;
          const length = iconBytes.readUInt32LE(entry + 8), offset = iconBytes.readUInt32LE(entry + 12);
          assert(length > 0 && offset >= 6 + count * 16 && offset + length <= iconBytes.length, 'ICO image data must be present');
        }
      } else {
        assert.match(iconResponse.headers.get('content-type') || '', /^image\/png/);
        assert.equal(iconBytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
        const sizes = `${iconBytes.readUInt32BE(16)}x${iconBytes.readUInt32BE(20)}`;
        assert.equal(link.getAttribute('sizes'), sizes, 'Declared icon size must match the image');
      }
      icons.add(iconKey);
    }
    // Local previews retain production metadata; fetch their matching local asset.
    const imageUrl = image.origin === canonical.origin ? new URL(image.pathname + image.search, base) : image;
    const key = `${userAgent} ${imageUrl.href}`;
    if (!images.has(key)) {
      const asset = await request(imageUrl, userAgent);
      assert.match(asset.headers.get('content-type') || '', /^image\/png/);
      const bytes = Buffer.from(await asset.arrayBuffer());
      assert(bytes.length < 300 * 1024, 'Keep the sharing image below the project budget of 300 KiB');
      assert.equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', 'Preview must be a real PNG');
      assert.equal(bytes.readUInt32BE(16), 1200);
      assert.equal(bytes.readUInt32BE(20), 630);
      images.add(key);
    }
    dom.window.close();
  }
  console.log(`PASS ${route}: initial HTML title, sharing image and valid icons for all ${agents.length} crawler user agents`);
}
console.log(`Social sharing checks passed at ${base.origin}. Client preview settings and platform caches require a separate in-app check.`);
