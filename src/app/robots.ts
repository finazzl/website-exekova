import type { MetadataRoute } from 'next';
import { siteBase } from '@/site/lib/meta';

export const dynamic = 'force-static';

/** Crawling is open across the site; each page's own robots meta decides indexing.
 * Cookie settings is a per-visitor page, and /api/ answers requests rather than serving pages. */
export default function robots(): MetadataRoute.Robots {
  const base = siteBase();
  return { rules: { userAgent: '*', allow: '/', disallow: ['/cookie-settings', '/api/'] }, sitemap: `${base}/sitemap.xml` };
}
