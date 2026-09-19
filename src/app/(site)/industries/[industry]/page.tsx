import type { Metadata } from 'next';
import path from 'node:path';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Icon from '@/components/Icon';
import { buildMetadata, schemaForPage } from '@/lib/seo';
import { casesFor } from '@/site/data/cases';
import { industries, industryBySlug } from '@/site/data/industries';
import { insuranceBackOfficeCases } from '@/site/data/insuranceBackOffice';
import { remittanceReconciliationCase } from '@/site/data/remittanceReconciliation';
import { virtualPage } from '@/site/lib/meta';
import { industryFaq } from '@/site/lib/pageFaq';
import { fitDescription } from '@/site/lib/seoCopy';
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

const SOURCE = path.join(process.cwd(), 'src/site/data/industries.ts');

function pageFor(slug: string) {
  const industry = industryBySlug(slug);
  if (!industry) return null;
  return { industry, page: virtualPage({ slug: `/industries/${slug}`, title: `${industry.name} | Industries | exekova`, description: fitDescription(industry.summary, `An autonomous work execution platform for ${industry.name} engineering and QA.`), schema: ['WebPage', 'FAQPage'], sourceFile: SOURCE }) };
}

export function generateStaticParams() {
  return industries.map(item => ({ industry: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ industry: string }> }): Promise<Metadata> {
  const found = pageFor((await params).industry);
  return found ? buildMetadata(found.page) : {};
}

export default async function IndustryPage({ params }: { params: Promise<{ industry: string }> }) {
  const found = pageFor((await params).industry);
  if (!found) notFound();
  const { industry, page } = found;
  const cases = [...(industry.slug === 'fintech' ? [remittanceReconciliationCase] : []), ...casesFor('industry', industry.slug)];
  const siblings = industries.filter(item => item.group === industry.group && item.slug !== industry.slug);
  return <>
    <PageHero layout="split" eyebrow={`INDUSTRIES · ${industry.name.toUpperCase()}`} title={industry.headline[0]} accent={industry.headline[1]} lede={industry.lede}
      trail={[{ label: 'Industries', href: '/industries' }, { label: industry.name, href: `/industries/${industry.slug}` }]}
      actions={<><a href={REQUEST_ACCESS} className="beta-button">Start with one task<Icon name="arrow" size={18}/></a><Link prefetch={false} href="#use-cases" className="beta-secondary">Explore the use cases<Icon name="arrow" size={15}/></Link></>}
      aside={<RecordCard label={`${industry.source} · ${industry.sample.id}`} title={industry.sample.title} body={industry.sample.body} checks={[`Standard: ${industry.sample.criterion}`, ...industry.phases.map(phase => `${phase.label}: ${phase.title}`)]} foot="Ready for your team’s decision" badge="Example"/>}/>

    <section className="site-section is-tight" aria-labelledby="workloads-title"><div className="shell">
      <Heading id="workloads-title" label={industry.workloads.label.toUpperCase()} title={industry.workloads.headline[0]} accent={industry.workloads.headline[1]} body={industry.workloads.body}>
        <Chips label="What arrives" items={industry.arrives}/>
      </Heading>
      <Cards items={industry.workloads.items.map(item => ({ icon: industry.icon, kicker: item.kind, title: item.title, body: item.body }))}/>
    </div></section>

    <section className="site-section is-lilac" id="use-cases" aria-labelledby="cases-title"><div className="shell">
      <Heading id="cases-title" centered wide label={industry.cases.label.toUpperCase()} title={industry.cases.headline[0]} accent={industry.cases.headline[1]} body={industry.cases.body}/>
      <Cards columns={cases.length >= 4 ? 4 : cases.length === 3 ? 3 : 2} items={cases.map(item => ({ icon: industry.icon, kicker: item.keepsLabel, title: item.name, body: item.problem, points: item.keeps, href: `/use-cases/${item.slug}`, linkLabel: 'Open the use case' }))}/>
    </div></section>

    {industry.slug === 'insurance' && <section className="site-section is-mint" id="back-office" aria-labelledby="backoffice-title"><div className="shell">
      <Heading id="backoffice-title" centered wide label="THE BACK OFFICE" title="Six more problems," accent="one back office run by agents." body="Rating and claims are the front of the book. Behind them sits the work that closes the month: reconciliation, statements, bordereaux, payouts, onboarding and leakage checks."/>
      <Cards columns={3} items={insuranceBackOfficeCases.map(item => ({ icon: industry.icon, kicker: item.keepsLabel, title: item.name, body: item.problem, href: `/use-cases/${item.slug}`, linkLabel: 'Open the use case' }))}/>
      <p className="site-note"><Icon name="umbrella" size={15}/><span>The whole suite, with the stages and the boundary, is on <Link prefetch={false} href="/insurance-back-office">the insurance back office page</Link>.</span></p>
    </div></section>}

    <section className="site-section" aria-labelledby="controls-title"><div className="shell">
      <Heading id="controls-title" label={industry.controls.label.toUpperCase()} title={industry.controls.headline[0]} accent={industry.controls.headline[1]} body={industry.controls.body}/>
      <Cards items={industry.controls.rail.map(rail => ({ kicker: rail.key, title: rail.title, body: '', points: rail.items }))}/>
      <div style={{ marginTop: 18 }}><Cards columns={2} items={[{ icon: 'bolt', title: 'What exekova owns', body: 'The execution, inside the boundaries you set.', points: industry.controls.owns }, { icon: 'users', title: 'What stays with you', body: 'The controls your industry expects do not move.', points: industry.controls.keeps }]}/></div>
    </div></section>

    <section className="site-section is-tight" aria-labelledby="metrics-title"><div className="shell">
      <Heading id="metrics-title" label={industry.metrics.label.toUpperCase()} title={industry.metrics.headline[0]} accent={industry.metrics.headline[1]} body={industry.metrics.body}/>
      <Cards columns={industry.metrics.items.length >= 5 ? 5 : 4} items={industry.metrics.items.slice(0, 10).map(metric => ({ icon: metric.icon, title: metric.label, body: metric.hint }))}/>
    </div></section>

    {siblings.length > 0 && <section className="site-section is-lilac" aria-labelledby="others-title"><div className="shell">
      <Heading id="others-title" centered label={industry.group.toUpperCase()} title="Same discipline," accent="different systems."/>
      <Cards columns={siblings.length >= 4 ? 4 : 3} items={siblings.map(item => ({ icon: item.icon, title: item.name, body: item.summary, href: `/industries/${item.slug}`, linkLabel: `Explore ${item.name.toLowerCase()}` }))}/>
    </div></section>}

    <QuestionsSection title={`About exekova in ${industry.name.toLowerCase().replace('saas', 'SaaS')}.`} body="Answered from the division of responsibility above." group={industry.name} items={industryFaq(industry)}/>

    <CtaBand title={industry.cta.headline[0]} accent={industry.cta.headline[1]} body={industry.cta.body} secondary={{ href: '/industries', label: 'All industries' }}/>
    <JsonLd data={schemaForPage(page, industryFaq(industry).map(entry => ({ q: entry.q, a: plain(entry.a) })))}/>
  </>;
}
