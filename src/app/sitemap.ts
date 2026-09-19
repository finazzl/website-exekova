import type { MetadataRoute } from 'next';
import lastmod from '../../content/lastmod.json';
import { postsByDate } from '@/site/data/blog';
import { cases } from '@/site/data/cases';
import { comparisons } from '@/site/data/compare';
import { functions } from '@/site/data/functions';
import { industries } from '@/site/data/industries';
import { insuranceBackOfficeCases } from '@/site/data/insuranceBackOffice';
import { remittanceReconciliationCase } from '@/site/data/remittanceReconciliation';
import { allIntegrationDetails } from '@/site/data/integrationIntake';
import { leaders } from '@/site/data/leaders';
import { platformPages } from '@/site/data/platform';
import { scenarios } from '@/site/data/scenarios';
import { useCases } from '@/site/data/useCases';
import { siteBase } from '@/site/lib/meta';

export const dynamic = 'force-static';

const stamps: Record<string, string> = lastmod;
const data = (name: string) => `src/site/data/${name}.ts`;
const page = (name: string) => `src/app/(site)/${name}/page.tsx`;
const text = (name: string) => `content/pages/${name}.json`;
const legal = (name: string) => `src/site/data/legal/${name}.ts`;

/** Every public route. Cookie settings is left out: it is a per-visitor page. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteBase();
  // Routes are dated from the last commit that touched their own source, recorded
  // by scripts/build-lastmod.mjs. A shared build timestamp would claim every page
  // changed on every deploy, which teaches Google to ignore lastmod altogether.
  // Files with no commit yet are genuinely new, so they take the build date.
  const built = new Date();
  const dateFor = (sources: string[]) => {
    const known = sources.map(file => stamps[file]).filter(Boolean).sort();
    return known.length ? new Date(known[known.length - 1]) : built;
  };
  const entry = (path: string, priority: number, sources: string[], changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] = 'monthly') =>
    ({ url: `${base}${path}`, lastModified: dateFor(sources), changeFrequency, priority });
  return [
    entry('/', 1, ['src/app/page.tsx'], 'weekly'),
    entry('/platform', 0.9, [text('platform'), page('platform')]),
    entry('/pricing', 0.9, [text('pricing'), page('pricing')]),
    ...platformPages.map(item => entry(`/${item.slug}`, 0.7, [data('platform')])),
    ...comparisons.map(item => entry(`/compare/${item.slug}`, 0.6, [data('compare')])),
    entry('/integrations', 0.8, [page('integrations')]),
    ...allIntegrationDetails.map(item => entry(`/integrations/${item.slug}`, 0.6, [data('integrationIntake'), data('integrations')])),
    entry('/solutions', 0.8, [text('solutions'), page('solutions')]),
    ...functions.map(item => entry(`/solutions/${item.slug}`, 0.7, [data('functions')])),
    ...leaders.map(item => entry(`/solutions/${item.slug}`, 0.7, [data('leaders')])),
    entry('/industries', 0.8, [text('industries'), page('industries')]),
    ...industries.map(item => entry(`/industries/${item.slug}`, 0.7, [data('industries')])),
    entry('/insurance-back-office', 0.9, [text('insurance-back-office'), page('insurance-back-office')]),
    ...insuranceBackOfficeCases.map(item => entry(`/use-cases/${item.slug}`, 0.7, [data('insuranceBackOffice')])),
    entry('/blogs', 0.8, [text('blogs'), page('blogs')], 'weekly'),
    // Posts carry their own publication date, which is finer than the file's.
    ...postsByDate.map(post => ({ ...entry(`/blogs/${post.slug}`, 0.6, [data('blog')]), lastModified: new Date(post.published) })),
    entry('/use-cases', 0.8, [text('use-cases'), page('use-cases')]),
    entry(`/use-cases/${remittanceReconciliationCase.slug}`, 0.7, [data('remittanceReconciliation')]),
    ...scenarios.map(item => entry(`/use-cases/${item.slug}`, 0.7, [data('scenarios')])),
    ...cases.map(item => entry(`/use-cases/${item.slug}`, 0.6, [data('cases')])),
    ...useCases.map(item => entry(`/use-cases/${item.slug}`, 0.6, [data('useCases')])),
    entry('/about', 0.6, [text('about'), page('about')]),
    entry('/contact', 0.6, [text('contact'), page('contact')]),
    entry('/faq', 0.6, [text('faq'), data('faq'), page('faq')]),
    entry('/privacy', 0.3, [text('privacy'), legal('privacy')], 'yearly'),
    entry('/terms', 0.3, [text('terms'), legal('terms')], 'yearly'),
    entry('/cookies', 0.3, [text('cookies'), legal('cookies')], 'yearly'),
    entry('/dpa', 0.3, [text('dpa'), legal('dpa')], 'yearly'),
    entry('/subprocessors', 0.3, [text('subprocessors'), legal('subprocessors')], 'yearly'),
    entry('/acceptable-use', 0.3, [text('acceptable-use'), legal('acceptableUse')], 'yearly'),
  ];
}
