// Records the last commit date of every tracked source file so the sitemap can
// date each route by its own content. Stamping `new Date()` on every URL tells
// Google all 117 pages changed on every rebuild, and it stops trusting lastmod.
import { execFile } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const run = promisify(execFile);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'content/lastmod.json');

// One walk over history, newest commit first: the first time a path appears is
// the last commit that touched it.
const { stdout } = await run('git', ['log', '--pretty=format:%cI', '--name-only', '--no-renames'], { cwd: root, maxBuffer: 64 * 1024 * 1024 });
const dates = {};
let commitDate = '';
for (const line of stdout.split('\n')) {
  if (!line.trim()) continue;
  if (/^\d{4}-\d{2}-\d{2}T/.test(line)) commitDate = line.trim();
  // This file is the record itself, so dating it would churn on every regeneration.
  else if (!(line in dates) && line !== 'content/lastmod.json' && (line.startsWith('src/') || line.startsWith('content/'))) dates[line] = commitDate;
}

const sorted = Object.fromEntries(Object.keys(dates).sort().map(file => [file, dates[file]]));
const next = JSON.stringify(sorted, null, 2) + '\n';
const current = await readFile(output, 'utf8').catch(() => '');
if (current === next) {
  console.log(`content/lastmod.json is current (${Object.keys(sorted).length} files).`);
} else {
  await writeFile(output, next);
  console.log(`Wrote content/lastmod.json for ${Object.keys(sorted).length} files.`);
}
