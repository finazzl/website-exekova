import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist/cloudflare/site');
const port = Number(process.argv.find(arg => arg.startsWith('--port='))?.slice(7) || 3211);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Use --port= followed by a valid local port.');
await stat(path.join(root, 'index.html')).catch(() => { throw new Error('Build the upload first with npm run build:cloudflare.'); });
const redirects = (await readFile(path.join(root, '_redirects'), 'utf8')).split('\n').filter(line => line.trim() && !line.startsWith('#')).map(line => {
  const [source, destination, code] = line.trim().split(/\s+/);
  const names = [];
  const pattern = source.split('/').map(part => {
    if (part === '*') { names.push('splat'); return '(.*)'; }
    if (part.startsWith(':')) { names.push(part.slice(1)); return '([^/]+)'; }
    return part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }).join('/');
  return { regex: new RegExp(`^${pattern}$`), names, destination, code: Number(code) };
});
const types = { '.html': 'text/html; charset=utf-8', '.txt': 'text/plain; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.xml': 'application/xml', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf', '.mp4': 'video/mp4', '.webm': 'video/webm', '.pdf': 'application/pdf' };
async function isFile(file) { try { return (await stat(file)).isFile(); } catch { return false; } }

const server = createServer(async (request, response) => {
  try {
    if (!['GET', 'HEAD'].includes(request.method)) { response.writeHead(405, { Allow: 'GET, HEAD' }); response.end(); return; }
    const url = new URL(request.url, `http://127.0.0.1:${port}`);
    for (const rule of redirects) {
      const match = url.pathname.match(rule.regex);
      if (!match) continue;
      const parameters = Object.fromEntries(rule.names.map((name, index) => [name, match[index + 1]]));
      const destination = rule.destination.replace(/:([A-Za-z]\w*)/g, (_, name) => parameters[name]);
      response.writeHead(rule.code, { Location: destination + (destination.includes('?') ? '' : url.search) }); response.end(); return;
    }
    const pathname = decodeURIComponent(url.pathname);
    const filePath = path.resolve(root, `.${pathname}`);
    if (filePath !== root && !filePath.startsWith(root + path.sep)) { response.writeHead(403); response.end(); return; }
    if (['/_headers', '/_redirects'].includes(pathname)) { response.writeHead(404); response.end(); return; }
    let file, code = 200;
    if (pathname.endsWith('.html') && await isFile(filePath)) {
      const clean = pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
      response.writeHead(308, { Location: clean + url.search }); response.end(); return;
    }
    if (await isFile(filePath)) file = filePath;
    else if (pathname.endsWith('/') && await isFile(filePath + '.html')) {
      response.writeHead(308, { Location: pathname.slice(0, -1) + url.search }); response.end(); return;
    } else if (!pathname.endsWith('/') && await isFile(filePath + '.html')) file = filePath + '.html';
    else if (await isFile(path.join(filePath, 'index.html'))) {
      if (!pathname.endsWith('/')) { response.writeHead(308, { Location: pathname + '/' + url.search }); response.end(); return; }
      file = path.join(filePath, 'index.html');
    } else { file = path.join(root, '404.html'); code = 404; }
    const info = await stat(file);
    response.writeHead(code, {
      'Content-Type': types[path.extname(file)] || 'application/octet-stream',
      'Content-Length': info.size,
      'Cache-Control': pathname.startsWith('/_next/static/') ? 'public, max-age=31536000, immutable' : 'public, max-age=0, must-revalidate',
      'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'strict-origin-when-cross-origin',
    });
    if (request.method === 'HEAD') response.end();
    else createReadStream(file).on('error', () => response.destroy()).pipe(response);
  } catch (error) { response.writeHead(error instanceof URIError ? 400 : 500); response.end('Unable to serve this request.'); }
});
server.on('error', error => { console.error(error.message); process.exitCode = 1; });
server.listen(port, '127.0.0.1', () => console.log(`Cloudflare static preview: http://127.0.0.1:${port}\nServing ${root}\nThis local server is not included in the upload.`));
