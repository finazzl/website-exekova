import { getAllPages, getSite } from '@/lib/content';
import { cases } from '@/site/data/cases';
import { comparisons } from '@/site/data/compare';
import { functions } from '@/site/data/functions';
import { industries } from '@/site/data/industries';
import { integrationDetails, integrationsIndex } from '@/site/data/integrations';
import { leaders } from '@/site/data/leaders';
import { platformPages } from '@/site/data/platform';
import { scenarios } from '@/site/data/scenarios';
import { taskOffer, taskFaq } from '@/beta/data/offer';

/** A plain-text map of the site for answer engines and crawlers that read llms.txt. Generated at build time. */
export const dynamic = 'force-static';

export async function GET() {
  const site = getSite();
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? site.brand.url) as string;
  const pages = new Map(getAllPages().filter(page => !page.meta.noindex).map(page => [page.slug, page]));
  const row = (slug: string, title: string, description: string) => `- [${title}](${base}${slug}): ${description}`;
  const known = (slug: string) => {
    const page = pages.get(slug);
    if (page) return row(slug, page.meta.title.replace(/ \| exekova$/i, ''), page.meta.description);
    const platform = platformPages.find(item => `/${item.slug}` === slug);
    return platform ? row(slug, platform.title, platform.description) : null;
  };
  const out: string[] = [
    '# exekova',
    '',
    `> ${site.seo.defaultDescription}`,
    '',
    `exekova is an autonomous work execution platform. You give it one scoped engineering task with acceptance criteria, from Jira or the exekova Work Intent form. It makes the change on an isolated branch in a GitHub repository you approve, has the change reviewed by a capability that did not write it, runs the required tests and checks, and delivers a pull request with the review result, the check results and an acceptance record. exekova never merges or deploys; your team owns the merge and the release. The price is $${taskOffer.current} per accepted task, rejected attempts cost $0, and there is no subscription.`,
    '',
    '## Start here',
    '',
    row('/', 'exekova', site.seo.defaultDescription as string),
    ...['/platform', '/autonomous-work-execution', '/pricing', '/faq', '/quality', '/security'].map(known).filter(Boolean) as string[],
    row('/integrations', 'Integrations', integrationsIndex.description),
    '',
    '## Platform',
    '',
    ...platformPages.filter(page => !['autonomous-work-execution', 'quality', 'security'].includes(page.slug)).map(page => row(`/${page.slug}`, page.title, page.description)),
    ...comparisons.map(item => row(`/compare/${item.slug}`, item.title, item.description)),
    '',
    '## Solutions by function',
    '',
    ...functions.map(item => row(`/solutions/${item.slug}`, item.title, item.description)),
    '',
    '## For leaders',
    '',
    ...leaders.map(item => row(`/solutions/${item.slug}`, item.title, item.description)),
    '',
    '## Industries',
    '',
    ...industries.map(item => row(`/industries/${item.slug}`, `${item.name} | Industries`, item.summary)),
    '',
    '## Use cases',
    '',
    ...scenarios.map(item => row(`/use-cases/${item.slug}`, item.title, item.description)),
    ...cases.map(item => row(`/use-cases/${item.slug}`, item.title, item.description)),
    '',
    '## Integrations',
    '',
    ...integrationDetails.map(item => row(`/integrations/${item.slug}`, `${item.name} integration`, item.description)),
    '',
    '## Company and policies',
    '',
    ...['/about', '/contact', '/privacy', '/terms', '/cookies', '/dpa', '/subprocessors', '/acceptable-use'].map(known).filter(Boolean) as string[],
    '',
    '## Frequently asked',
    '',
    ...taskFaq.map(item => `- ${item.q} ${item.a}`),
    '',
  ];
  return new Response(out.join('\n'), { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}
