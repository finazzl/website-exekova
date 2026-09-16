import { cp, mkdir, mkdtemp, readFile, readdir, rename, stat, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { siteRedirects } from '../deployment/cloudflare/redirects.mjs';
import nextEnv from '@next/env';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// Load production public settings before building in a copy without .env files.
// Only public settings are forwarded from dotenv files to the isolated build.
const inheritedEnv = { ...process.env };
nextEnv.loadEnvConfig(root, false, { info() {}, error: console.error });
const publicEnv = Object.fromEntries(Object.entries(process.env).filter(([key]) => key.startsWith('NEXT_PUBLIC_')));
const destination = path.join(root, 'dist/cloudflare');
const configDirectory = path.join(root, 'deployment/cloudflare');
const siteConfig = JSON.parse(await readFile(path.join(root, 'content/site.json'), 'utf8'));
const publicUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || siteConfig.brand.url);
if (publicUrl.protocol !== 'https:' || publicUrl.pathname !== '/' || publicUrl.search || publicUrl.hash) {
  throw new Error('NEXT_PUBLIC_SITE_URL must be an HTTPS origin without a path, query or fragment.');
}
const siteUrl = publicUrl.origin;
const builtAt = new Date().toISOString();
const stamp = builtAt.replace(/[:.]/g, '-');

async function run(command, args, cwd, env = process.env) {
  await new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd, env, stdio: 'inherit' });
    child.on('error', reject);
    child.on('exit', code => code === 0 ? resolve() : reject(new Error(`${command} exited with ${code}`)));
  });
}

async function filesIn(directory, prefix = '') {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const relative = path.posix.join(prefix, entry.name);
    if (entry.isDirectory()) files.push(...await filesIn(path.join(directory, entry.name), relative));
    else if (entry.isFile()) files.push(relative);
  }
  return files.sort();
}

const work = await mkdtemp(path.join(tmpdir(), 'exekova-cloudflare-'));
console.log(`Production URL: ${siteUrl}\nLocal preview port: 3211\nCloudflare port/start command: none\nIsolated build: ${work}`);
await mkdir(destination, { recursive: true });
await writeFile(path.join(destination, 'deployment-settings.json'), JSON.stringify({
  recordedAt: builtAt, siteUrl, projectName: 'exekova', localPreviewPort: 3211,
  cloudflarePort: null, cloudflareStartCommand: null, output: 'site', zip: 'exekova-cloudflare.zip',
  htmlHandling: 'auto-trailing-slash', notFoundHandling: '404-page', spaFallback: false,
}, null, 2) + '\n');
await cp(path.join(configDirectory, 'README.md'), path.join(destination, 'UPLOAD-INSTRUCTIONS.md'));

// A fixed input list prevents credentials, Git metadata and unrelated local files
// from entering the isolated build. The running .next directory stays untouched.
for (const entry of ['src', 'content', 'public', 'deployment', 'next.config.mjs', 'package.json', 'package-lock.json', 'tsconfig.json']) {
  await cp(path.join(root, entry), path.join(work, entry), {
    recursive: true,
    // POST handlers cannot be statically exported; the Worker serves this route.
    filter: source => !path.basename(source).startsWith('.') && !source.endsWith('.md') && source !== path.join(root, 'src/app/api/contact'),
  });
}
if (process.platform === 'darwin') {
  await run('cp', ['-cR', path.join(root, 'node_modules'), path.join(work, 'node_modules')], root);
} else {
  await cp(path.join(root, 'node_modules'), path.join(work, 'node_modules'), { recursive: true });
}
await run(process.execPath, [path.join(work, 'node_modules/next/dist/bin/next'), 'build'], work, {
  ...inheritedEnv, ...publicEnv, NODE_ENV: 'production', EXEKOVA_STATIC_EXPORT: '1', NEXT_PUBLIC_SITE_URL: siteUrl,
});

const stage = path.join(destination, `.site-${stamp}`);
await cp(path.join(work, 'out'), stage, { recursive: true });
await cp(path.join(configDirectory, '_headers'), path.join(stage, '_headers'));

// The old three-segment industry wildcard also matches the exported router's
// /industries/<industry>/__next.*.txt files. Expand actual legacy use-case URLs
// instead, so Cloudflare can serve those navigation assets without a redirect.
const cloudflareRedirects = siteRedirects.filter(rule => rule.source !== '/industries/:industry/:useCase');
const exportedFiles = await filesIn(stage);
const legacySources = new Set();
for (const file of exportedFiles.filter(file => /^industries\/[^/]+\.html$/.test(file))) {
  const industry = path.basename(file, '.html');
  const html = await readFile(path.join(stage, file), 'utf8');
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] || '';
  for (const match of main.matchAll(/href="\/use-cases\/([^"/#?]+)"/g)) {
    for (const slug of new Set([match[1], match[1].replace(new RegExp(`^${industry}-`), '')])) {
      const source = `/industries/${industry}/${slug}`;
      if (legacySources.has(source)) continue;
      legacySources.add(source);
      cloudflareRedirects.push({ source, destination: `/industries/${industry}`, permanent: false });
    }
  }
}
await writeFile(path.join(stage, '_redirects'), '# Generated from the shared site redirects and industry links.\n' + cloudflareRedirects.map(rule => `${rule.source} ${rule.destination} ${rule.permanent ? 308 : 307}`).join('\n') + '\n');

const files = await filesIn(stage);
const assets = await Promise.all(files.map(async file => ({ file, bytes: (await stat(path.join(stage, file))).size })));
const oversized = assets.filter(asset => asset.bytes > 25 * 1024 * 1024);
if (oversized.length) throw new Error(`Assets exceed Cloudflare's 25 MiB limit: ${oversized.map(asset => asset.file).join(', ')}`);
for (const required of ['index.html', '404.html', 'signin.html', 'pricing.html', 'sitemap.xml', 'robots.txt', 'llms.txt', '_headers', '_redirects']) {
  if (!files.includes(required)) throw new Error(`Missing exported file: ${required}`);
}
const leaked = files.filter(file => /(^|\/)(?:\.env|node_modules|\.git)(?:\/|$)|\.map$|\.(?:tsx?|md)$/.test(file));
if (leaked.length) throw new Error(`Unexpected source files in upload: ${leaked.join(', ')}`);
for (const file of files.filter(file => file.endsWith('.html'))) {
  const html = await readFile(path.join(stage, file), 'utf8');
  if (/https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?(?:[\/"'])/.test(html)) throw new Error(`Localhost URL in ${file}`);
  if (html.includes('/_next/image?')) throw new Error(`A Next.js image server is still required by ${file}`);
}

const archive = path.join(destination, 'archive', stamp);
for (const name of ['site', 'exekova-cloudflare.zip', 'build-report.json']) {
  const previous = path.join(destination, name);
  try { await stat(previous); } catch (error) { if (error.code === 'ENOENT') continue; throw error; }
  await mkdir(archive, { recursive: true });
  await rename(previous, path.join(archive, name));
}
await rename(stage, path.join(destination, 'site'));
const zip = path.join(destination, 'exekova-cloudflare.zip');
await run('zip', ['-q', '-r', zip, '.'], path.join(destination, 'site'));
const zipData = await readFile(zip);
const report = {
  builtAt, siteUrl, localPreviewPort: 3211, isolatedBuild: work, nodeVersion: process.version,
  nextVersion: JSON.parse(await readFile(path.join(work, 'node_modules/next/package.json'), 'utf8')).version,
  fileCount: files.length, htmlPages: files.filter(file => file.endsWith('.html')).length,
  uncompressedBytes: assets.reduce((sum, asset) => sum + asset.bytes, 0),
  largestAsset: assets.reduce((largest, asset) => asset.bytes > largest.bytes ? asset : largest, assets[0]),
  pagesDashboardFileLimit: 1000, withinPagesDashboardFileLimit: files.length <= 1000,
  zipBytes: zipData.length, zipSha256: createHash('sha256').update(zipData).digest('hex'),
  redirectCount: cloudflareRedirects.length, files,
};
await writeFile(path.join(destination, 'build-report.json'), JSON.stringify(report, null, 2) + '\n');
console.log(`\nUpload folder: ${path.join(destination, 'site')}\nUpload ZIP: ${zip}\n${report.htmlPages} HTML pages; ${report.fileCount} files; ${(report.zipBytes / 1024 / 1024).toFixed(1)} MiB ZIP.`);
if (!report.withinPagesDashboardFileLimit) console.warn('This exceeds the Pages dashboard 1,000-file limit. Review the upload method before deploying.');
