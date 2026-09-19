import type { Metadata } from 'next';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { schemaForPage } from '@/lib/seo';
import { postsByDate } from '@/site/data/blog';
import { insuranceBackOfficeCases, insuranceCasesFor, insuranceSuites } from '@/site/data/insuranceBackOffice';
import { industryBySlug } from '@/site/data/industries';
import { plain } from '@/site/lib/inline';
import { contentPage, metadataFor } from '@/site/lib/meta';
import { PRICE_ANSWER } from '@/site/lib/seoCopy';
import { REQUEST_ACCESS } from '@/site/nav';
import JsonLd from '@/site/components/JsonLd';
import PageHero from '@/site/components/PageHero';
import Heading from '@/site/components/Heading';
import Cards from '@/site/components/Cards';
import CtaBand from '@/site/components/CtaBand';
import QuestionsSection from '@/site/components/QuestionsSection';
import RecordCard from '@/site/components/RecordCard';
import RunSteps from '@/site/components/RunSteps';

const STAGES = [
  { stage: 'Plan', text: 'the process is written down as testable expectations against a redacted sample set, including the exception classes and who owns each one.' },
  { stage: 'Assemble', text: 'the logic, the exception handling and the regression evidence are held as one unit of work rather than three tickets in three sprints.' },
  { stage: 'Execute', text: 'the change is implemented on an isolated branch in a repository you approve, with tolerances, thresholds and effective dates made explicit.' },
  { stage: 'Review', text: 'an independent capability reviews the diff with the sample run attached. It is never the capability that wrote the change.' },
  { stage: 'Accept', text: 'the sample period is replayed, the periods already working have to replay unchanged, and anything short of that is returned for correction.' },
];

const faq = [
  { q: 'What does an insurance back office run by AI agents actually mean?', a: 'It means the recurring operational work, reconciling statements, loading bordereaux, calculating payouts, onboarding producers and running leakage checks, is carried out by agents against rules that are written down and tested, with a person deciding only the things that need a decision.' },
  { q: 'What does exekova build here?', a: 'The software underneath the agents: the parsers, the matching and validation rules, the exception routing and the regression evidence that keeps last period working while this period changes. Each change arrives as an independently reviewed pull request with its sample run attached.' },
  { q: 'Does this replace the policy administration system?', a: 'No. The agent layer connects through APIs and controlled integrations across the policy system, accounting stack, CRM and document store, so one workflow can improve at a time without a migration.' },
  { q: 'What stays with our team?', a: 'Accounting treatment, carrier and coverholder relationships, appointment decisions, regulatory filings, remediation and every merge and deployment. exekova executes inside those boundaries and never merges or deploys.' },
  { q: 'Where should we start?', a: 'With one statement format, one exception class or one leakage check. A scoped first task makes the measurement honest, and the [use cases](/use-cases) show what a good one looks like.' },
  { q: 'What does it cost?', a: PRICE_ANSWER },
];

export const metadata: Metadata = metadataFor('/insurance-back-office');

export default function InsuranceBackOfficePage() {
  const insurance = industryBySlug('insurance');
  return <>
    <PageHero layout="split" eyebrow="INSURANCE · BACK OFFICE" title="The insurance back office," accent="run by agents." 
      lede="Reconciliation, statements, bordereaux, payouts, onboarding and leakage checks, carried out against rules that are written down and tested. exekova builds and changes the software underneath, one scoped task at a time."
      trail={[{ label: 'Insurance back office', href: '/insurance-back-office' }]}
      actions={<><a href={REQUEST_ACCESS} className="beta-button">Start with one task<Icon name="arrow" size={18}/></a><Link prefetch={false} href="/blogs" className="beta-secondary">Read the blog<Icon name="arrow" size={15}/></Link></>}
      aside={<RecordCard label="WHAT ARRIVES" title="Commission statement will not match" body="One carrier format, a redacted sample month, and the expected treatment for each exception class." checks={['Matching rules and tolerances explicit', 'A regression case per exception class', 'The reconciled sample month retained']} foot="Insurance" footIcon="umbrella" badge="Example"/>}/>

    <section className="site-section is-tight" aria-labelledby="suites-title"><div className="shell">
      <Heading id="suites-title" centered label="THREE SUITES" title="Three suites of work." accent="One back office." body="Six recurring problems, grouped the way the back office is actually organised. Each one is a run from scoped task to reviewed pull request, with the evidence attached."/>
      {insuranceSuites.map((suite, index) => <section className="site-group" key={suite.key} aria-labelledby={`suite-${suite.key}`}>
        <h3 id={`suite-${suite.key}`}><span>{String(index + 1).padStart(2, '0')}</span>{suite.name}<small>{suite.tagline}</small></h3>
        <p className="site-prose" style={{ marginBottom: 20 }}>{suite.body}</p>
        <Cards columns={2} items={insuranceCasesFor(suite).map(item => ({ icon: suite.icon, kicker: suite.name, title: item.name, body: item.problem, points: item.keeps, href: `/use-cases/${item.slug}`, linkLabel: 'Open the use case' }))}/>
      </section>)}
      <p className="site-note"><Icon name="shield" size={15}/>Every demonstration on this site uses example data. exekova does not connect to customer systems or run tasks from these pages.</p>
    </div></section>

    <section className="site-section is-lilac" aria-labelledby="how-title"><div className="shell">
      <Heading id="how-title" centered label="HOW EXEKOVA BUILDS IT" title="One piece of work." accent="Five stages." body="The same path for every problem above. A process an agent can run is a process that was written down first, and writing it down is where the run begins."/>
      <RunSteps steps={STAGES}/>
    </div></section>

    <section className="site-section" aria-labelledby="boundary-title"><div className="shell">
      <Heading id="boundary-title" centered label="THE BOUNDARY" title="What exekova owns." accent="What stays with you." body="An agent earns more freedom as the evidence supports it. Anything touching a customer, a regulator or a payment stays with a named person."/>
      <Cards columns={2} items={[
        { icon: 'branch', title: 'What exekova owns', body: 'The engineering that makes the process dependable enough to hand over.', points: insurance?.controls.owns ?? [] },
        { icon: 'users', title: 'What stays your decision', body: 'The judgement calls the platform will not make for you.', points: ['Accounting treatment and restatement', 'Carrier and coverholder relationships', 'Appointment and licensing decisions', 'Regulatory filings and reporting', 'Customer and producer remediation', 'Every merge and deployment'] },
      ]}/>
    </div></section>

    <section className="site-section is-mint" aria-labelledby="measure-title"><div className="shell">
      <Heading id="measure-title" centered label="HOW YOU WOULD MEASURE IT" title="Measure the close," accent="not the demo." body="Every figure comes from your own runs. exekova records quality, time, cost and intervention for each accepted outcome."/>
      <Cards columns={4} items={[
        { icon: 'clock', title: 'Days to close', body: 'Elapsed time from the last statement landing to a reconciled, explained book.' },
        { icon: 'check', title: 'Exceptions per period', body: 'How many lines still need a person, and which classes they fall into.' },
        { icon: 'coins', title: 'Cost per accepted change', body: 'Spend per accepted outcome, including retries and repairs.' },
        { icon: 'users', title: 'Intervention rate', body: 'How often a person had to step in, and the reason it was needed.' },
      ]}/>
    </div></section>

    <section className="site-section is-tight" aria-labelledby="reading-title"><div className="shell">
      <Heading id="reading-title" centered label="FURTHER READING" title="The thinking" accent="behind the work." body="Plain writing on each of these problems, from the team that runs them."/>
      <Cards columns={3} items={postsByDate.slice(0, 3).map(post => ({ icon: 'file', kicker: post.category, title: post.title, body: post.dek, href: `/blogs/${post.slug}`, linkLabel: 'Read the post' }))}/>
      <p className="site-note"><Icon name="layers" size={15}/><span>All {postsByDate.length} posts are on the <Link prefetch={false} href="/blogs">exekova blog</Link>, and every problem above has its own <Link prefetch={false} href="/use-cases">use case</Link>.</span></p>
    </div></section>

    <QuestionsSection tone="lilac" title="Before the first" accent="close." body="Answered from the runs above, not from a sales deck." group="Insurance back office" items={faq}/>

    <CtaBand title="Pick the process" accent="that closes last." body={`That is usually where the constraint is most expensive. There are ${insuranceBackOfficeCases.length} places to start.`} secondary={{ href: '/industries/insurance', label: 'All insurance work' }}/>
    <JsonLd data={schemaForPage(contentPage('/insurance-back-office'), faq.map(item => ({ q: item.q, a: plain(item.a) })))}/>
  </>;
}
