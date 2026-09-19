import { industries } from './data/industries';
import { functions } from './data/functions';
import { leaders } from './data/leaders';
import { caseBySlug, casesIndex } from './data/cases';
import { scenarios } from './data/scenarios';
import { functionsIndex } from './data/functions';
import { industryGroupsOrdered } from './data/industries';
import { comparisons } from './data/compare';
import { insuranceBackOfficeCases } from './data/insuranceBackOffice';
import { postsByDate } from './data/blog';
import { remittanceReconciliationCase } from './data/remittanceReconciliation';

/**
 * Site-wide navigation for every route outside the homepage. Homepage anchors
 * are written as "/#id" so they resolve from any page; the access dialog on
 * the homepage still intercepts "/#request-access" when the visitor is
 * already there.
 */
export type NavLink = { label: string; href: string };
export type FooterColumn = { title: string; href: string; overview: string; links: NavLink[] };
export type MegaLink = { label: string; href: string; desc?: string };
export type MegaColumn = { title: string; links: MegaLink[] };
export type NavItem = { label: string; href: string; mega?: { intro: { title: string; body: string; href: string; linkLabel: string }; columns: MegaColumn[] } };

export const REQUEST_ACCESS = '/#request-access';

/** The header call to action. */
export const siteCta: NavLink = { label: 'Request access', href: REQUEST_ACCESS };

export const productNav: NavLink[] = [
  { label: 'Autonomous Work Execution Platform', href: '/autonomous-work-execution' },
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Workforce', href: '/workforce' },
  { label: 'Live Floor', href: '/live-floor' },
  { label: 'Integrations', href: '/integrations' },
  { label: 'Quality', href: '/quality' },
  { label: 'Recovery', href: '/recovery' },
  { label: 'Performance', href: '/performance' },
  { label: 'Security', href: '/security' },
  { label: 'Exekova vs RPA', href: '/compare/rpa' },
  { label: 'Exekova vs agent platforms', href: '/compare/ai-agent-platforms' },
  { label: 'Exekova vs ChatGPT', href: '/compare/chatgpt-and-assistants' },
  { label: 'Exekova vs Grok Bot', href: '/compare/grokbot' },
];

export const companyNav: NavLink[] = [
  { label: 'Blogs', href: '/blogs' },
  { label: 'Contact', href: '/contact' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Pricing', href: '/pricing' },
];

export const legalNav: NavLink[] = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Cookies', href: '/cookies' },
  { label: 'DPA', href: '/dpa' },
  { label: 'Subprocessors', href: '/subprocessors' },
  { label: 'Acceptable use', href: '/acceptable-use' },
  { label: 'Cookie settings', href: '/cookie-settings' },
];


/** The header, as exekova.com lays it out: five sections with mega menus, then Pricing. Every link resolves on this site. */
export function megaNav(): NavItem[] {
  const featured = [remittanceReconciliationCase, ...casesIndex.featuredByIndustry.map(slug => caseBySlug(slug)).filter(Boolean).map(item => item!)];
  const featuredBy = (groupName: string) => featured.filter(item => industries.find(entry => entry.slug === item.origin.key)?.group === groupName).map(item => ({ label: item.name, href: `/use-cases/${item.slug}`, desc: item.origin.name }));
  return [
    { label: 'Platform', href: '/platform', mega: {
      intro: { title: 'One platform from intent to outcome.', body: 'exekova plans the work, assembles the capability, runs it, validates it against your standard, and reports what it cost.', href: '/platform', linkLabel: 'Explore the platform' },
      columns: [
        { title: 'Explore the platform', links: [
          { label: 'Platform overview', href: '/platform', desc: 'From request to accepted outcome' },
          { label: 'Autonomous Work Execution Platform', href: '/autonomous-work-execution', desc: 'The category, defined' },
          { label: 'How it works', href: '/#how-it-works', desc: 'Get. Set. Done.' },
          { label: 'Workforce', href: '/workforce', desc: 'The work decides the team' },
          { label: 'Live Floor', href: '/live-floor', desc: 'See execution happening' },
          { label: 'Integrations', href: '/integrations', desc: 'Connect your tools, systems and agents' },
        ] },
        { title: 'Quality & control', links: [
          { label: 'Quality', href: '/quality', desc: 'Generated isn’t done' },
          { label: 'Recovery', href: '/recovery', desc: 'Failure, debugging and retry' },
          { label: 'Performance', href: '/performance', desc: 'Outcome economics' },
          { label: 'Security', href: '/security', desc: 'Defined boundaries' },
        ] },
        { title: 'Compare', links: comparisons.map(item => ({ label: item.title, href: `/compare/${item.slug}`, desc: item.slug === 'rpa' ? 'Procedure versus outcome' : item.slug === 'ai-agent-platforms' ? 'Who owns the result' : item.slug === 'chatgpt-and-assistants' ? 'Where the loop sits' : 'A teammate versus an accepted outcome' })) },
      ] } },
    { label: 'Solutions', href: '/solutions', mega: {
      intro: { title: functionsIndex.headline[0], body: functionsIndex.lede, href: '/solutions', linkLabel: 'All solutions' },
      columns: [
        ...functionsIndex.groups.map(group => ({ title: group.name, links: group.slugs.map(slug => functions.find(item => item.slug === slug)!).map(item => ({ label: item.name, href: `/solutions/${item.slug}`, desc: item.tagline })) })),
        { title: 'For leaders', links: leaders.map(item => ({ label: item.role, href: `/solutions/${item.slug}`, desc: item.tagline })) },
      ] } },
    { label: 'Industries', href: '/industries', mega: {
      intro: { title: 'Find your industry. Explore the work.', body: 'Choose your industry to explore its engineering and QA workflows, use cases, evidence and controls.', href: '/industries', linkLabel: 'All industries' },
      columns: industryGroupsOrdered.map(group => ({ title: group.name, links: group.industries.map(item => ({ label: item.name, href: `/industries/${item.slug}`, desc: item.summary })) })),
    } },
    { label: 'Use cases', href: '/use-cases', mega: {
      intro: { title: casesIndex.intro.title, body: casesIndex.intro.body, href: '/use-cases', linkLabel: 'All use cases' },
      columns: [
        { title: 'Insurance back office', links: [
          { label: 'The back office, run by agents', href: '/insurance-back-office', desc: 'Six problems, three suites' },
          ...insuranceBackOfficeCases.map(item => ({ label: item.name, href: `/use-cases/${item.slug}`, desc: item.origin.name })),
        ] },
        ...industryGroupsOrdered.map(group => ({ title: group.name, links: featuredBy(group.name) })),
      ],
    } },
    { label: 'Company', href: '/about', mega: {
      intro: { title: 'A company built around getting work done.', body: 'Meet exekova, explore our approach to trusted execution, and talk to the team about the work ahead.', href: '/about', linkLabel: 'About exekova' },
      columns: [
        { title: 'About & support', links: [
          { label: 'About exekova', href: '/about', desc: 'Why we built an execution system' },
          { label: 'Blogs', href: '/blogs', desc: `${postsByDate.length} posts on AI agents and finance operations` },
          { label: 'Contact', href: '/contact', desc: 'Bring us the work you want to move' },
          { label: 'FAQ', href: '/faq', desc: 'Answers about the platform and getting started' },
        ] },
        { title: 'Policies', links: [
          { label: 'Privacy', href: '/privacy', desc: 'How business data is handled' },
          { label: 'Terms', href: '/terms', desc: 'The terms behind the platform' },
        ] },
      ] } },
    { label: 'Pricing', href: '/pricing' },
  ];
}

/** The footer rows, one per site section, in the order exekova.com uses. */
export function footerColumns(): FooterColumn[] {
  return [
    { title: 'Platform', href: '/platform', overview: 'Explore the platform', links: productNav },
    { title: 'Solutions', href: '/solutions', overview: 'All solutions', links: [...functions.map(item => ({ label: item.name, href: `/solutions/${item.slug}` })), ...leaders.map(item => ({ label: item.role, href: `/solutions/${item.slug}` }))] },
    { title: 'Industries', href: '/industries', overview: 'All industries', links: industries.map(item => ({ label: item.name, href: `/industries/${item.slug}` })) },
    { title: 'Use cases', href: '/use-cases', overview: 'All use cases', links: [{ label: remittanceReconciliationCase.name, href: `/use-cases/${remittanceReconciliationCase.slug}` }, { label: 'Insurance back office', href: '/insurance-back-office' }, ...insuranceBackOfficeCases.map(item => ({ label: item.name, href: `/use-cases/${item.slug}` })), ...casesIndex.featuredByIndustry.map(slug => caseBySlug(slug)).filter(Boolean).map(item => ({ label: item!.name, href: `/use-cases/${item!.slug}` })), ...scenarios.map(item => ({ label: item.slug === 'remittance' ? 'Remittance app' : 'MostoBank PCI audit', href: `/use-cases/${item.slug}` }))] },
    { title: 'Company', href: '/about', overview: 'About Exekova', links: [...companyNav, ...postsByDate.map(post => ({ label: post.title, href: `/blogs/${post.slug}` }))] },
  ];
}

/** True when `href` is the current route or one of its children. */
export function isCurrent(pathname: string, href: string) {
  if (href.startsWith('/#') || href === '/') return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}
