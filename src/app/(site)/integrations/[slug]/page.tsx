import type { Metadata } from 'next';
import path from 'node:path';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Icon from '@/components/Icon';
import { buildMetadata, schemaForPage } from '@/lib/seo';
import { allIntegrationDetails, anyIntegrationBySlug, featuredIntegrations } from '@/site/data/integrationIntake';
import { virtualPage } from '@/site/lib/meta';
import { integrationFaq } from '@/site/lib/pageFaq';
import { DEFINITION, fitDescription, fitTitle } from '@/site/lib/seoCopy';
import { plain } from '@/site/lib/inline';
import QuestionsSection from '@/site/components/QuestionsSection';
import { REQUEST_ACCESS } from '@/site/nav';
import JsonLd from '@/site/components/JsonLd';
import PageHero from '@/site/components/PageHero';
import Heading from '@/site/components/Heading';
import RecordCard from '@/site/components/RecordCard';
import Cards from '@/site/components/Cards';
import Chips from '@/site/components/Chips';
import CtaBand from '@/site/components/CtaBand';

const SOURCE = path.join(process.cwd(), 'src/site/data/integrations.ts');

function pageFor(slug: string) {
  const item = anyIntegrationBySlug(slug);
  if (!item) return null;
  return { item, page: virtualPage({ slug: `/integrations/${slug}`, title: fitTitle(`${item.name} integration | exekova autonomous work execution platform`, `${item.name} integration | exekova`), description: fitDescription(item.description, DEFINITION), schema: ['WebPage', 'FAQPage'], sourceFile: SOURCE }) };
}

export function generateStaticParams() {
  return allIntegrationDetails.map(item => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const found = pageFor((await params).slug);
  return found ? buildMetadata(found.page) : {};
}

/** One integration in full: what it receives, what it sends back, the run, setup and security. No connect actions. */
export default async function IntegrationPage({ params }: { params: Promise<{ slug: string }> }) {
  const found = pageFor((await params).slug);
  if (!found) notFound();
  const { item, page } = found;
  const others = featuredIntegrations.filter(entry => entry.slug !== item.slug);
  return <>
    <PageHero layout="split" eyebrow={`INTEGRATIONS · ${item.category.toUpperCase()}`} title={item.name} accent={`${item.status}.`} lede={item.summary}
      trail={[{ label: 'Integrations', href: '/integrations' }, { label: item.name, href: `/integrations/${item.slug}` }]}
      actions={<><a href={REQUEST_ACCESS} className="beta-button">Start with one task<Icon name="arrow" size={18}/></a><Link prefetch={false} href="/integrations" className="beta-secondary">All integrations<Icon name="arrow" size={15}/></Link></>}
      aside={<RecordCard label="WHAT EXEKOVA RECEIVES" title={item.name} checks={item.receives} foot={item.category} footIcon="grid" badge={item.status}/>}/>

    <section className="site-section is-tight" aria-labelledby="exchange-title"><div className="shell">
      <Heading id="exchange-title" label="THE EXCHANGE" title="What comes in." accent="What goes back.">
        <Chips label="Workflows" items={item.workflows}/>
      </Heading>
      <Cards columns={2} items={[{ icon: 'file', title: `What Exekova receives from ${item.name}`, body: 'Read within the scope you grant.', points: item.receives }, { icon: 'send', title: `What Exekova sends to ${item.name}`, body: 'Written back as the work moves through the acceptance path.', points: item.sends }]}/>
    </div></section>

    <section className="site-section is-lilac" aria-labelledby="flow-title"><div className="shell">
      <Heading id="flow-title" centered label="THE SHAPE OF A RUN" title={`A run through ${item.name},`} accent="step by step."/>
      <ol className="site-steps is-four" aria-label={`A run through ${item.name}`}>{item.flow.map((step, index) => <li className="site-step" key={index}><span>{String(index + 1).padStart(2, '0')}</span><p>{step}</p></li>)}</ol>
    </div></section>

    <section className="site-section" aria-labelledby="setup-title"><div className="shell">
      <Heading id="setup-title" label="SETUP" title="What setup involves." body="Configured with your team during onboarding. This page describes the steps; it does not perform them."/>
      <Cards columns={3} items={item.setup.map((step, index) => ({ kicker: `Step ${String(index + 1).padStart(2, '0')}`, title: step, body: '' }))}/>
    </div></section>

    <section className="site-section is-ink" aria-labelledby="security-title"><div className="shell site-price">
      <Heading id="security-title" label="SECURITY" title="Scoped access." accent="Recorded actions." body="The controls that follow from working through this integration."/>
      <RecordCard label="SECURITY CONSIDERATIONS" title={item.name} checks={item.security} foot="Approval gates available on write actions" footIcon="lock" badge={item.status}/>
    </div></section>

    <section className="site-section is-tight" aria-labelledby="others-title"><div className="shell">
      <Heading id="others-title" label="OTHER DETAIL PAGES" title="Where the work lands," accent="and where intent arrives."/>
      <Cards columns={others.length === 4 ? 4 : 3} items={others.map(entry => ({ icon: 'grid', kicker: entry.category, title: entry.name, body: entry.summary, badge: entry.status, href: `/integrations/${entry.slug}`, linkLabel: `How Exekova works with ${entry.name}` }))}/>
    </div></section>

    <QuestionsSection tone="lilac" title={`About the ${item.name}`} accent="integration." body="Answered from the exchange, setup and security records above." group={item.name} items={integrationFaq(item)}/>

    <CtaBand secondary={{ href: '/integrations', label: 'All integrations' }}/>
    <JsonLd data={schemaForPage(page, integrationFaq(item).map(entry => ({ q: entry.q, a: plain(entry.a) })))}/>
  </>;
}
