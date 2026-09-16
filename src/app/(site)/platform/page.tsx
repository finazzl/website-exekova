import type { Metadata } from 'next';
import Link from 'next/link';
import Icon from '@/components/Icon';
import content from '@/beta/content/beta.json';
import { governanceRules } from '@/beta/content/chapters';
import { schemaForPage } from '@/lib/seo';
import { faqGroups } from '@/site/data/faq';
import { featuredIntegrations } from '@/site/data/integrationIntake';
import { integrationsIndex } from '@/site/data/integrations';
import { contentPage, metadataFor } from '@/site/lib/meta';
import { REQUEST_ACCESS } from '@/site/nav';
import JsonLd from '@/site/components/JsonLd';
import PageHero from '@/site/components/PageHero';
import Heading from '@/site/components/Heading';
import RecordCard from '@/site/components/RecordCard';
import Cards from '@/site/components/Cards';
import StepsBand from '@/site/components/StepsBand';
import FeatureRows from '@/site/components/FeatureRows';
import FaqAccordion from '@/site/components/FaqAccordion';
import PricingBand from '@/site/components/PricingBand';
import CtaBand from '@/site/components/CtaBand';
import ComplianceLine from '@/site/components/ComplianceLine';

export const metadata: Metadata = metadataFor('/platform');

/** How many systems the catalogue lists, across every category. */
const catalogueSystems = integrationsIndex.categories.reduce((total, category) => total + category.integrations.length, 0);

/** The catalogue mark for a featured integration, by name. */
const logoFor = (name: string) => integrationsIndex.categories.flatMap(category => category.integrations).find(item => item.name === name)?.logo;

export default function PlatformPage() {
  const demo = content.demo;
  const proof = content.proof;
  const map = content.map;
  const reviewFaq = faqGroups.filter(group => group.title === 'Review and verification' || group.title === 'Integrations');
  return <>
    <PageHero layout="split" eyebrow="THE PLATFORM" title="Get the task. Set the repo." accent="Done, verified." lede="exekova takes a scoped engineering task from Jira or the Work Intent form to a pull request in the GitHub repository you approve, with independent review and check evidence attached."
      actions={<><a href={REQUEST_ACCESS} className="beta-button">Request access<Icon name="arrow" size={18}/></a><Link prefetch={false} href="/#product-demo" className="beta-secondary">Try the interactive demo<Icon name="arrow" size={15}/></Link></>}
      note={demo.caption}
      aside={<RecordCard label={`${demo.repo} · ${demo.key}`} title="Checkout validation fixed." body="Recheck the postcode when the country changes. Block invalid submissions. Add a regression test." checks={demo.checks} foot={demo.ready}/>}/>

    <section className="site-section" aria-labelledby="steps-title"><div className="shell">
      <Heading id="steps-title" centered label={content.how.eyebrow} title={content.how.headline[0]} accent={content.how.headline[1]} body="Three steps your team can see from start to finish. Each one has a defined input and a defined output."/>
      <StepsBand/>
    </div></section>

    <section className="site-section is-lilac" aria-labelledby="evidence-title"><div className="shell">
      <Heading id="evidence-title" label={proof.eyebrow} title={proof.headline[0]} accent={proof.headline[1]} body={proof.body}/>
      <FeatureRows rows={[
        { eyebrow: 'THE OUTCOME', title: 'A pull request', accent: 'with its evidence.', body: 'The outcome is a GitHub pull request on an isolated task branch. It carries the code change, the independent review result, the required check results and the acceptance record for the reviewed revision.', points: ['Code change on an isolated branch', 'Independent review result', 'Required test and check results', 'Acceptance record'], record: { label: 'VERIFIED OUTCOME', title: 'Checkout validation fixed.', checks: ['Independent review passed', 'Required checks passed', 'Acceptance criteria met'], foot: 'Pull request ready for your team' }, tone: 'mint' },
        { eyebrow: proof.label, title: 'Review finds an issue.', accent: 'Then it is corrected.', body: `${proof.foot} The record keeps both the finding and the corrected revision, so your reviewers see how the outcome was reached.`, points: [`${proof.tabs[0]}: ${proof.finding}`, `${proof.tabs[1]}: ${proof.corrected}`, proof.note], record: { label: 'REVIEW · FIRST ATTEMPT', title: proof.finding, body: proof.retry, checks: [`${proof.rows[0]}: ${proof.rejected}`, `${proof.rows[1]}: pending`, `${proof.rows[2]}: pending`], foot: 'Returned for correction', footIcon: 'reset', badge: 'Rejected attempt' } },
        { eyebrow: 'LESS TO COORDINATE', title: content.compare.headline[0], accent: content.compare.headline[1], body: `${content.compare.afterNote} ${content.compare.boundary}`, points: [`${content.compare.beforeLabel}: ${content.compare.before.join(', ').toLowerCase()}`, `${content.compare.afterLabel}: ${content.compare.after.join(', ').toLowerCase()}`], link: { href: '/#product-demo', label: 'Compare both in the interactive demo' }, record: { label: content.compare.afterLabel.toUpperCase(), title: 'One scoped task. One reviewed outcome.', checks: content.compare.after, foot: content.compare.boundary, footIcon: 'users' }, tone: 'ink' },
      ]}/>
    </div></section>

    <section className="site-section" id="integrations" aria-labelledby="integrations-title"><div className="shell">
      <Heading id="integrations-title" centered label={map.eyebrow} title={map.headline[0]} accent={map.headline[1]} body={map.body}/>
      <Cards columns={2} items={[
        { icon: 'file', title: 'Where the task starts', body: 'Human intent arrives as one scoped task with acceptance criteria, from the tool your team already uses.', points: ['Jira issues with their acceptance criteria', 'The exekova Work Intent form', 'Requests raised in Slack or Microsoft Teams'] },
        { icon: 'branch', title: 'Where the outcome lands', body: 'A pull request on an isolated branch in the GitHub repository you approve, carrying everything a reviewer needs.', points: ['Independent review result', 'Required test and check results', 'Acceptance record for the reviewed revision'] },
      ]}/>
      <div style={{ marginTop: 18 }}><Cards columns={4} items={featuredIntegrations.map(item => ({ image: logoFor(item.name), kicker: item.category, title: item.name, body: item.description, href: `/integrations/${item.slug}`, linkLabel: `How exekova works with ${item.name}` }))}/></div>
      <aside className="site-callout" aria-labelledby="catalogue-callout-title">
        <div className="site-callout-copy">
          <span className="beta-label">THE CATALOGUE</span>
          <h3 id="catalogue-callout-title"><span className="site-nowrap">{catalogueSystems} systems.</span> <span className="site-nowrap">{integrationsIndex.categories.length} categories.</span> <em>One workflow.</em></h3>
          <p>Every tool exekova works with, from where a task starts to where the outcome lands, with a page for each. Connectors are switched on with your team, inside the scope you grant.</p>
        </div>
        <ul className="site-callout-chips" aria-label="Catalogue categories">{integrationsIndex.categories.map(category => <li key={category.id}>{category.title}<small>{category.integrations.length}</small></li>)}</ul>
        <Link prefetch={false} href="/integrations" className="beta-button">Browse the integrations catalogue<Icon name="arrow" size={17}/></Link>
      </aside>
    </div></section>

    <section className="site-section is-tight" id="boundaries" aria-labelledby="boundaries-title"><div className="shell">
      <Heading id="boundaries-title" label="TRUST, SAFETY & GOVERNANCE" title="Clear boundaries." accent="Human-owned decisions." body="exekova works in the projects and repositories you approve. Your team owns the scope, merge and release."/>
      <dl className="site-rules">{governanceRules.map(rule => <div key={rule.label}><dt>{rule.label}</dt><dd>{rule.value}</dd></div>)}</dl>
      <div style={{ marginTop: 24 }}><ComplianceLine/></div>
    </div></section>

    <PricingBand/>

    <section className="site-section" aria-labelledby="platform-faq-title"><div className="shell site-faq">
      <Heading id="platform-faq-title" label="QUESTIONS" title="Before the" accent="first task." body="The questions engineering teams ask about review, verification and integrations."><Link prefetch={false} href="/faq" className="site-inline-link">All questions and answers<Icon name="arrow" size={15}/></Link></Heading>
      <FaqAccordion groups={reviewFaq} name="platform-faq"/>
    </div></section>

    <CtaBand secondary={{ href: '/use-cases', label: 'See the use cases' }}/>
    <JsonLd data={schemaForPage(contentPage('/platform'))}/>
  </>;
}
