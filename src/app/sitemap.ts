import type { MetadataRoute } from 'next';
import { cases } from '@/site/data/cases';
import { comparisons } from '@/site/data/compare';
import { functions } from '@/site/data/functions';
import { industries } from '@/site/data/industries';
import { allIntegrationDetails } from '@/site/data/integrationIntake';
import { leaders } from '@/site/data/leaders';
import { platformPages } from '@/site/data/platform';
import { scenarios } from '@/site/data/scenarios';
import { useCases } from '@/site/data/useCases';
import { siteBase } from '@/site/lib/meta';

export const dynamic = 'force-static';

/** Every public route. Cookie settings is left out: it is a per-visitor page. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteBase();
  const now = new Date();
  const entry = (path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] = 'monthly') => ({ url: `${base}${path}`, lastModified: now, changeFrequency, priority });
  return [
    entry('/', 1, 'weekly'),
    entry('/platform', 0.9),
    entry('/pricing', 0.9),
    ...platformPages.map(item => entry(`/${item.slug}`, 0.7)),
    ...comparisons.map(item => entry(`/compare/${item.slug}`, 0.6)),
    entry('/integrations', 0.8),
    ...allIntegrationDetails.map(item => entry(`/integrations/${item.slug}`, 0.6)),
    entry('/solutions', 0.8),
    ...functions.map(item => entry(`/solutions/${item.slug}`, 0.7)),
    ...leaders.map(item => entry(`/solutions/${item.slug}`, 0.7)),
    entry('/industries', 0.8),
    ...industries.map(item => entry(`/industries/${item.slug}`, 0.7)),
    entry('/use-cases', 0.8),
    ...scenarios.map(item => entry(`/use-cases/${item.slug}`, 0.7)),
    ...cases.map(item => entry(`/use-cases/${item.slug}`, 0.6)),
    ...useCases.map(item => entry(`/use-cases/${item.slug}`, 0.6)),
    entry('/about', 0.6),
    entry('/contact', 0.6),
    entry('/faq', 0.6),
    entry('/privacy', 0.3, 'yearly'),
    entry('/terms', 0.3, 'yearly'),
    entry('/cookies', 0.3, 'yearly'),
    entry('/dpa', 0.3, 'yearly'),
    entry('/subprocessors', 0.3, 'yearly'),
    entry('/acceptable-use', 0.3, 'yearly'),
  ];
}
