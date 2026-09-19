import type { Metadata } from 'next';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { schemaForPage } from '@/lib/seo';
import { caseBySlug, cases, casesFor, casesIndex } from '@/site/data/cases';
import { functions, functionsIndex } from '@/site/data/functions';
import { insuranceBackOfficeCases, insuranceCasesFor, insuranceSuites } from '@/site/data/insuranceBackOffice';
import { remittanceReconciliationCase, remittanceReconciliationPost } from '@/site/data/remittanceReconciliation';
import { industries, industriesIndex } from '@/site/data/industries';
import { scenarios } from '@/site/data/scenarios';
import { useCases } from '@/site/data/useCases';
import { contentPage, metadataFor } from '@/site/lib/meta';
import { REQUEST_ACCESS } from '@/site/nav';
import JsonLd from '@/site/components/JsonLd';
import PageHero from '@/site/components/PageHero';
import Heading from '@/site/components/Heading';
import Cards from '@/site/components/Cards';
import CtaBand from '@/site/components/CtaBand';
import QuestionsSection from '@/site/components/QuestionsSection';
import { plain } from '@/site/lib/inline';

const useCasesFaq = [
  { q: 'What makes a good first task?', a: 'A bug fix, a small feature or focused test coverage in one repository, with acceptance criteria your team can verify. Broad projects become a sequence of scoped tasks, each accepted on its own.' },
  { q: 'Are these use cases customer case studies?', a: 'These pages describe workflows and illustrative scenarios. The UK remittance reconciliation workflow keeps the company anonymous and labels its sample figures as illustrative. The two long-form runs use synthetic artefacts. No measured customer results are claimed.' },
  { q: 'How many use cases are there?', a: `${cases.length + insuranceBackOfficeCases.length + scenarios.length + useCases.length + 1} in total: ${cases.length} problems across the industries and functions, ${insuranceBackOfficeCases.length} in the insurance back office, one UK remittance reconciliation workflow, two long-form runs and three kinds of first task.` },
];

export const metadata: Metadata = metadataFor('/use-cases');

export default function UseCasesPage() {
  const byIndustry = industries.map(industry => ({ industry, cases: casesFor('industry', industry.slug) }));
  const total = byIndustry.reduce((sum, entry) => sum + entry.cases.length, 0);
  const cross = industriesIndex.cross.ids.map(slug => caseBySlug(slug)).filter(Boolean);
  const lede = casesIndex.hero.lede.replace('{total}', String(total)).replace('{industries}', String(industries.length));
  return <>
    <PageHero eyebrow="USE CASES · ENTERPRISE" title={casesIndex.hero.headline[0]} accent={casesIndex.hero.headline[1]} lede={lede}
      trail={[{ label: 'Use cases', href: '/use-cases' }]}
      actions={<><a href={REQUEST_ACCESS} className="beta-button">Start with one task<Icon name="arrow" size={18}/></a><Link prefetch={false} href="#by-industry" className="beta-secondary">{total} live problems, by industry<Icon name="arrow" size={15}/></Link></>}/>

    <section className="site-section is-mint" aria-labelledby="remittance-reconciliation-title"><div className="shell">
      <Heading id="remittance-reconciliation-title" centered label="UK REMITTANCE" title="Reconciliation," accent="run by AI agents." body="An anonymous workflow for a major UK remittance provider, from transfer records to a finance-reviewed close."/>
      <Cards columns={2} items={[
        { icon: 'coins', kicker: 'Use case', title: remittanceReconciliationCase.name, body: remittanceReconciliationCase.problem, href: `/use-cases/${remittanceReconciliationCase.slug}`, linkLabel: 'Explore the workflow' },
        { icon: 'file', kicker: 'From the blog', title: remittanceReconciliationPost.title, body: remittanceReconciliationPost.dek, href: `/blogs/${remittanceReconciliationPost.slug}`, linkLabel: 'Read the full approach' },
      ]}/>
    </div></section>

    <section className="site-section is-tight" aria-labelledby="lens-title"><div className="shell">
      <Heading id="lens-title" centered label="ONE RUN. ONE RECORD." title={casesIndex.lens.title} body={casesIndex.lens.body}/>
      <Cards columns={5} items={casesIndex.chairs.map(chair => ({ icon: chair.icon, kicker: chair.role, title: chair.question, body: '' }))}/>
    </div></section>

    <section className="site-section is-lilac" id="by-industry" aria-labelledby="industry-title"><div className="shell">
      <Heading id="industry-title" centered wide label={casesIndex.byIndustry.label.toUpperCase()} title={casesIndex.byIndustry.headline[0]} accent={casesIndex.byIndustry.headline[1]} body={casesIndex.byIndustry.body}/>
      <p className="site-note" style={{ marginTop: 0, marginBottom: 40 }}><Icon name="layers" size={15}/><span><strong>{casesIndex.pipeline.label}</strong> {casesIndex.pipeline.stages.join(' → ')}. {casesIndex.pipeline.note}</span></p>
      {byIndustry.map((entry, index) => <section className="site-group" key={entry.industry.slug} aria-labelledby={`industry-${entry.industry.slug}`}>
        <h3 id={`industry-${entry.industry.slug}`}><span>{String(index + 1).padStart(2, '0')}</span><Link prefetch={false} href={`/industries/${entry.industry.slug}`}>{entry.industry.name}</Link></h3>
        <Cards columns={entry.cases.length >= 4 ? 4 : entry.cases.length === 3 ? 3 : 2} items={entry.cases.map(item => ({ icon: entry.industry.icon, kicker: entry.industry.name, title: item.name, body: item.problem, href: `/use-cases/${item.slug}`, linkLabel: 'Open the use case' }))}/>
      </section>)}
      <p className="site-note"><Icon name="shield" size={15}/>{casesIndex.note}</p>
    </div></section>

    <section className="site-section" aria-labelledby="cross-title"><div className="shell">
      <Heading id="cross-title" centered wide label={industriesIndex.cross.label.toUpperCase()} title={industriesIndex.cross.headline[0]} accent={industriesIndex.cross.headline[1]} body={industriesIndex.cross.body}/>
      <Cards columns={2} items={cross.map(item => ({ icon: 'layers', kicker: 'Cross-industry', title: item!.name, body: item!.problem, points: item!.keeps, href: `/use-cases/${item!.slug}`, linkLabel: 'Open the use case' }))}/>
    </div></section>

    <section className="site-section is-mint" id="insurance-back-office" aria-labelledby="backoffice-title"><div className="shell">
      <Heading id="backoffice-title" centered wide label="INSURANCE BACK OFFICE" title="Six problems." accent="One back office, run by agents." body="Reconciliation, statements, bordereaux, payouts, onboarding and leakage checks. exekova builds and changes the software underneath each one."/>
      {insuranceSuites.map(suite => <section className="site-group" key={suite.key} aria-labelledby={`backoffice-${suite.key}`}>
        <h3 id={`backoffice-${suite.key}`}><span>{suite.tagline}</span><Link prefetch={false} href="/insurance-back-office">{suite.name}</Link></h3>
        <Cards columns={2} items={insuranceCasesFor(suite).map(item => ({ icon: suite.icon, kicker: suite.name, title: item.name, body: item.problem, href: `/use-cases/${item.slug}`, linkLabel: 'Open the use case' }))}/>
      </section>)}
      <p className="site-note"><Icon name="umbrella" size={15}/><span>The whole suite is laid out on <Link prefetch={false} href="/insurance-back-office">the insurance back office page</Link>, and the thinking behind it is on <Link prefetch={false} href="/blogs">the blog</Link>.</span></p>
    </div></section>

    <section className="site-section is-lilac" id="by-function" aria-labelledby="function-title"><div className="shell">
      <Heading id="function-title" centered wide label="BY FUNCTION" title="Every function." accent="Its own definition of done." body={functionsIndex.description}/>
      {functions.map(fn => <section className="site-group" key={fn.slug} aria-labelledby={`function-${fn.slug}`}>
        <h3 id={`function-${fn.slug}`}><span>{fn.group}</span><Link prefetch={false} href={`/solutions/${fn.slug}`}>{fn.name}</Link></h3>
        <Cards items={fn.cases.ids.map(slug => caseBySlug(slug)).filter(Boolean).map(item => ({ icon: fn.icon, kicker: fn.name, title: item!.name, body: item!.problem, href: `/use-cases/${item!.slug}`, linkLabel: 'Open the use case' }))}/>
      </section>)}
    </div></section>

    <section className="site-section is-mint" id="featured" aria-labelledby="featured-title"><div className="shell">
      <Heading id="featured-title" centered label="FEATURED" title="Four featured cases." accent="Two runs to follow end to end, two to read." body="Both long-form runs are presentations built on synthetic artefacts. Each page says so."/>
      <Cards columns={2} items={casesIndex.featured.map(entry => ({ icon: entry.icon, kicker: entry.eyebrow, title: entry.title, body: entry.body, points: entry.watch, href: entry.href, linkLabel: entry.cta }))}/>
    </div></section>

    <section className="site-section is-tight" aria-labelledby="first-title"><div className="shell">
      <Heading id="first-title" centered label="A FIRST TASK" title="Where a first task" accent="usually starts." body="Three kinds of scoped engineering work, each delivered as a reviewed pull request with test and check evidence."/>
      <Cards items={useCases.map(item => ({ icon: item.icon, title: item.name, body: item.summary, points: item.fit.slice(0, 3), href: `/use-cases/${item.slug}`, linkLabel: `Explore ${item.name.toLowerCase()}` }))}/>
    </div></section>

    <QuestionsSection title="Before you pick" accent="a use case." body="What the pages in this section are, and are not." group="Use cases" items={useCasesFaq}/>

    <CtaBand title="Which system is" accent="waiting the longest?" body="That is usually where the execution constraint is most expensive." secondary={{ href: '/contact', label: 'Talk to the team' }}/>
    <JsonLd data={schemaForPage(contentPage('/use-cases'), useCasesFaq.map(item => ({ q: item.q, a: plain(item.a) })))}/>
  </>;
}
