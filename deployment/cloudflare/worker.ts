import { handleContact, type ContactEnv } from '../../src/site/server/contact';

type Env = ContactEnv & { ASSETS: { fetch(request: Request): Promise<Response> } };

const primaryHost = 'exekova.com';
const publicHosts = new Set([primaryHost, 'www.exekova.com', 'exekova.sanjay-singh-597.workers.dev']);

function withSecurityHeaders(response: Response) {
  const secured = new Response(response.body, response);
  secured.headers.set('Strict-Transport-Security', 'max-age=31536000');
  secured.headers.set('X-Content-Type-Options', 'nosniff');
  secured.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  return secured;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    try {
      const url = new URL(request.url);
      const canonicalPath = url.pathname.replace(/\/index(?:\.html)?$/, '/').replace(/\.html$/, '').replace(/\/+$/, '') || '/';
      if (publicHosts.has(url.hostname) && (url.hostname !== primaryHost || url.protocol !== 'https:' || url.pathname !== canonicalPath)) {
        url.protocol = 'https:';
        url.hostname = primaryHost;
        url.port = '';
        url.pathname = canonicalPath;
        return withSecurityHeaders(Response.redirect(url.href, 308));
      }
      const response = url.pathname.replace(/\/$/, '') === '/api/contact'
        ? await handleContact(request, env)
        : await env.ASSETS.fetch(request);
      return withSecurityHeaders(response);
    } catch {
      // An uncaught throw here surfaces as Cloudflare error 1101, an HTTP 500 that
      // Search Console records as "Server error (5xx)" and that drops the page from
      // the index. Serving the asset unwrapped keeps every static route crawlable.
      try {
        return await env.ASSETS.fetch(request);
      } catch {
        return new Response('Temporarily unavailable', { status: 503, headers: { 'Retry-After': '120', 'Cache-Control': 'no-store' } });
      }
    }
  },
};
