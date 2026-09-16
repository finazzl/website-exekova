import type { MetadataRoute } from 'next';
import { siteBase } from '@/site/lib/meta';

export const dynamic = 'force-static';

/** Crawling is open everywhere; each page's own robots meta decides indexing. Cookie settings is a per-visitor page. */
export default function robots(): MetadataRoute.Robots {
  const base = siteBase();
  return { rules: { userAgent: '*', allow: '/', disallow: ['/cookie-settings'] }, sitemap: `${base}/sitemap.xml` };
}
