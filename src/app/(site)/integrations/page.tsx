import type { Metadata } from 'next';
import path from 'node:path';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { buildMetadata, schemaForPage } from '@/lib/seo';
import { integrationsIndex } from '@/site/data/integrations';
import { allIntegrationDetails, featuredIntegrations } from '@/site/data/integrationIntake';
import { plain } from '@/site/lib/inline';
import { virtualPage } from '@/site/lib/meta';
import { REQUEST_ACCESS } from '@/site/nav';
import JsonLd from '@/site/components/JsonLd';
import PageHero from '@/site/components/PageHero';
import Heading from '@/site/components/Heading';
import Cards from '@/site/components/Cards';
import FaqAccordion from '@/site/components/FaqAccordion';
import CtaBand from '@/site/components/CtaBand';

const page = virtualPage({ slug: '/integrations', title: `${integrationsIndex.title} | exekova`, description: integrationsIndex.description, schema: ['WebPage', 'FAQPage'], sourceFile: path.join(process.cwd(), 'src/site/data/integrations.ts') });

export const metadata: Metadata = buildMetadata(page);

/** The catalogue: every system by category with its status. Nothing here connects to anything. */
export default function IntegrationsPage() {
  const detailed = new Set(allIntegrationDetails.map(item => item.slug));
  const logoOf = (slug: string) => integrationsIndex.categories.flatMap(category => category.integrations).find(row => row.slug === slug)?.logo;
  return <>
    <PageHero eyebrow={integrationsIndex.eyebrow} title={integrationsIndex.headline[0]} accent={integrationsIndex.headline[1]} lede={integrationsIndex.lede}
      trail={[{ label: 'Platform', href: '/platform' }, { label: 'Integrations', href: '/integrations' }]}
      actions={<><a href={REQUEST_ACCESS} className="beta-button">Start with one task<Icon name="arrow" size={18}/></a><Link prefetch={false} href="/platform" className="beta-secondary">How the platform works<Icon name="arrow" size={15}/></Link></>}/>

    <section className="site-section is-tight" aria-labelledby="detail-title"><div className="shell">
      <Heading id="detail-title" centered wide label="DETAIL PAGES" title="Where the work lands." accent="Where human intent arrives." body="GitHub and Jira are where engineering work lives and lands. Slack and Microsoft Teams are where a person asks for it: the request becomes a scoped task with acceptance criteria, and the outcome is reported back in the same thread."/>
      <Cards columns={4} items={featuredIntegrations.map(item => ({ image: logoOf(item.slug), icon: 'grid', kicker: item.category, title: item.name, body: item.summary, badge: 'Active', href: `/integrations/${item.slug}`, linkLabel: `How Exekova works with ${item.name}` }))}/>
    </div></section>

    <section className="site-section is-lilac" aria-labelledby="catalogue-title"><div className="shell">
      <Heading id="catalogue-title" centered wide label="THE CATALOGUE" title="Every system," accent="active." body="Every system in the catalogue is active. Connector setup is confirmed with your team."/>
      {integrationsIndex.categories.map(category => <section className="site-group" key={category.id} aria-labelledby={`category-${category.id}`}>
        <h3 id={`category-${category.id}`}><span>{category.index}</span>{category.title}<small style={{ fontSize: 15, fontWeight: 400, color: 'var(--wz-ink-muted)' }}>{category.subhead}</small></h3>
        <ul className="site-integrations" style={{ justifyContent: 'flex-start' }} aria-label={category.title}>{category.integrations.map(item => {
          const inner = <>{item.logo ? <img src={item.logo} alt="" aria-hidden="true" width={18} height={18} loading="lazy" decoding="async" className="site-mark"/> : <Icon name="grid" size={16}/>}<span><strong>{item.name}<span className="site-dot" aria-hidden="true"/><span className="sr-only">Active</span></strong>{item.description && <small>{item.description}</small>}</span></>;
          return <li key={item.name} data-status="active">{detailed.has(item.slug) ? <Link prefetch={false} href={`/integrations/${item.slug}`}>{inner}</Link> : inner}</li>;
        })}</ul>
      </section>)}
      {integrationsIndex.logoPolicy && <p className="site-note"><Icon name="shield" size={15}/>{integrationsIndex.logoPolicy}</p>}
    </div></section>

    <section className="site-section is-tight" aria-labelledby="integration-faq-title"><div className="shell site-faq">
      <Heading id="integration-faq-title" label="QUESTIONS" title="Integration" accent="questions."><Link prefetch={false} href="/faq" className="site-inline-link">All questions and answers<Icon name="arrow" size={15}/></Link></Heading>
      <FaqAccordion groups={[{ title: 'Detail pages', items: integrationsIndex.definitions }, { title: integrationsIndex.faqGroup, items: integrationsIndex.faq }]} name="integration-faq"/>
    </div></section>

    <CtaBand title={integrationsIndex.cta.headline[0]} accent={integrationsIndex.cta.headline[1]} body={integrationsIndex.cta.body} secondary={{ href: '/contact', label: 'Talk to the team' }}/>
    <JsonLd data={schemaForPage(page, [...integrationsIndex.definitions, ...integrationsIndex.faq].map(entry => ({ q: entry.q, a: plain(entry.a) })))}/>
  </>;
}
