import { describe, expect, it, vi } from 'vitest';
import worker from '../../../deployment/cloudflare/worker';

describe('production URL and transport headers', () => {
  it.each(['http://exekova.com', 'http://www.exekova.com', 'https://www.exekova.com', 'https://exekova.sanjay-singh-597.workers.dev'])('redirects %s and preserves the requested path and query', async origin => {
    const fetch = vi.fn();
    const response = await worker.fetch(new Request(`${origin}/contact?from=search`), { ASSETS: { fetch } });
    expect(response.status).toBe(308);
    expect(response.headers.get('location')).toBe('https://exekova.com/contact?from=search');
    expect(response.headers.get('strict-transport-security')).toBe('max-age=31536000');
    expect(fetch).not.toHaveBeenCalled();
  });

  it('serves XML unchanged at the primary domain with security headers', async () => {
    const xml = '<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"/>';
    const fetch = vi.fn().mockResolvedValue(new Response(xml, { headers: { 'Content-Type': 'application/xml' } }));
    const response = await worker.fetch(new Request('https://exekova.com/sitemap.xml'), { ASSETS: { fetch } });
    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toBe('application/xml');
    expect(response.headers.get('strict-transport-security')).toBe('max-age=31536000');
    expect(await response.text()).toBe(xml);
  });

  it.each([['/contact/', '/contact'], ['/contact.html', '/contact'], ['/index.html', '/'], ['/index', '/']])('permanently normalizes %s', async (path, target) => {
    const response = await worker.fetch(new Request(`https://www.exekova.com${path}?ref=search`), { ASSETS: { fetch: vi.fn() } });
    expect(response.status).toBe(308);
    expect(response.headers.get('location')).toBe(`https://exekova.com${target}?ref=search`);
  });

  it('keeps the contact API reachable and secures its response', async () => {
    const response = await worker.fetch(new Request('https://exekova.com/api/contact'), { ASSETS: { fetch: vi.fn() } });
    expect(response.status).toBe(405);
    expect(response.headers.get('strict-transport-security')).toBe('max-age=31536000');
  });
});
