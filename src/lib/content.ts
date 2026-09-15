import fs from 'node:fs';
import path from 'node:path';

/**
 * The slice of the monorepo's content layer the beta page uses: the site
 * config and the page JSON that carries the route's metadata. Read from disk
 * on the server only, exactly as apps/site/src/lib/content.ts does.
 */
const CONTENT_DIR = path.join(process.cwd(), 'content');

export type PageMeta = {
  title: string;
  description: string;
  keywords?: string[];
  schema?: string[];
  noindex?: boolean;
  ogImage?: string;
  canonicalPath?: string;
};

export type Page = {
  slug: string;
  meta: PageMeta;
  sections: unknown[];
  sourceFile: string;
};

function readJson<T>(rel: string): T {
  return JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, rel), 'utf8')) as T;
}

let siteCache: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getSite(): any {
  return (siteCache ??= readJson('site.json'));
}

export function getAllPages(): Page[] {
  const dir = path.join(CONTENT_DIR, 'pages');
  return fs
    .readdirSync(dir)
    .filter(file => file.endsWith('.json'))
    .map(file => {
      const full = path.join(dir, file);
      return { ...(JSON.parse(fs.readFileSync(full, 'utf8')) as Omit<Page, 'sourceFile'>), sourceFile: full };
    });
}

export function getPageBySlug(slug: string): Page | null {
  const normalised = slug !== '/' && slug.endsWith('/') ? slug.slice(0, -1) : slug;
  return getAllPages().find(page => page.slug === normalised) ?? null;
}

/** File mtime stands in for the monorepo's git-derived date. */
export function lastModifiedOf(file: string): Date {
  return fs.statSync(file).mtime;
}
