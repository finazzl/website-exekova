import Link from 'next/link';
import Icon from '@/components/Icon';
import type { Scenario } from '../../data/scenarios';
import { REQUEST_ACCESS } from '../../nav';
import PageHero from '../PageHero';
import Heading from '../Heading';
import RecordCard from '../RecordCard';
import Cards from '../Cards';
import FaqAccordion from '../FaqAccordion';
import CtaBand from '../CtaBand';

/** A long-form walkthrough, read as a document: brief, scope, plan, chapters, criteria, decisions, record. */
export default function ScenarioArticle({ item }: { item: Scenario }) {
  const remittance = item.slug === 'remittance';
  const briefChecks = remittance ? item.contract.map(entry => `${entry.label}: ${entry.body}`) : item.approvals.map(entry => entry.title);
  return <>
    <PageHero layout="split" eyebrow={item.label.toUpperCase()} title={item.headline[0]} accent={item.headline[1]} lede={item.body} note={item.provenance}
      trail={[{ label: 'Use cases', href: '/use-cases' }, { label: item.title, href: `/use-cases/${item.slug}` }]}
      actions={<><a href={REQUEST_ACCESS} className="beta-button">Bring your own brief<Icon name="arrow" size={18}/></a><Link href="/use-cases" className="beta-secondary">All use cases<Icon name="arrow" size={15}/></Link></>}
      aside={<RecordCard label={item.id} title={remittance ? 'The brief' : 'The epic'} body={item.problem} checks={briefChecks} foot={remittance ? 'Set by the CEO' : 'Filed by the CTO'} footIcon="file" badge="Scenario"/>}/>

    {(item.contract.length > 0 || item.brief.length > 0) && <section className="site-section is-tight" aria-labelledby="brief-title"><div className="shell">
      <Heading id="brief-title" label="THE STARTING POINT" title="What you bring." accent="What the customer needs."/>
      <Cards items={[...item.contract, ...item.brief].map(entry => ({ kicker: entry.label, title: entry.label, body: entry.body }))}/>
      {item.assumptions.length > 0 && <p className="site-note"><Icon name="grid" size={15}/>Assumptions: {item.assumptions.join(' · ')}</p>}
    </div></section>}

    {item.scope && <section className="site-section is-lilac" aria-labelledby="scope-title"><div className="shell">
      <Heading id="scope-title" centered label="SCOPE" title="In the first release." accent="And what waits."/>
      <Cards columns={2} items={[{ icon: 'check', title: 'In scope', body: 'What the first release must include.', points: item.scope.in }, { icon: 'clock', title: 'Later', body: 'Deliberately outside the first release.', points: item.scope.later }]}/>
    </div></section>}

    {item.plan.length > 0 && <section className="site-section" aria-labelledby="plan-title"><div className="shell">
      <Heading id="plan-title" label="THE PLAN" title="Twelve weeks," accent="four decisions."/>
      <Cards columns={4} items={item.plan.map(step => ({ kicker: step.time, title: step.title, body: step.body, points: [`Exit: ${step.exit}`] }))}/>
    </div></section>}

    <section className="site-section is-tight" aria-labelledby="chapters-title"><div className="shell">
      <Heading id="chapters-title" label="THE RUN" title="Follow the work" accent="from intent to decision." body="Each chapter names what the platform produced and who owned the decision."/>
      <Cards columns={2} items={item.chapters.map((chapter, index) => ({ kicker: `${String(index + 1).padStart(2, '0')} · ${chapter.label}${chapter.eyebrow ? ` · ${chapter.eyebrow}` : ''}`, title: chapter.title, body: chapter.body, points: [`Output: ${chapter.output}`, `Owner: ${chapter.owner}`] }))}/>
    </div></section>

    <section className="site-section is-lilac" aria-labelledby="criteria-title"><div className="shell">
      <Heading id="criteria-title" centered label={remittance ? 'ACCEPTANCE CRITERIA' : 'THE CHECKS'} title={remittance ? 'Six criteria.' : 'Six checks.'} accent="Each one provable."/>
      <Cards items={item.criteria.map(entry => ({ kicker: entry.id, title: entry.label, body: entry.detail, badge: entry.kind || undefined }))}/>
    </div></section>

    {item.changes.length > 0 && <section className="site-section" aria-labelledby="changes-title"><div className="shell">
      <Heading id="changes-title" label="CONTROLLED CHANGES" title="Changes that" accent="had to earn their retest."/>
      <Cards columns={2} items={item.changes.map(change => ({ kicker: `${change.id} · closes ${change.finding} · ${change.kind}`, title: change.title, body: `Before: ${change.before} After: ${change.after}`, points: [`Test: ${change.test}`, `Tool: ${change.tool}`] }))}/>
    </div></section>}

    <section className="site-section is-tight" aria-labelledby="decisions-title"><div className="shell">
      <Heading id="decisions-title" label="HUMAN-OWNED DECISIONS" title="What the platform" accent="refuses to decide."/>
      <Cards columns={2} items={item.approvals.map(entry => ({ icon: 'users', kicker: entry.id, title: entry.title, body: entry.detail, points: [`Owner: ${entry.owner}`, ...(entry.status ? [`Status: ${entry.status}`] : [])] }))}/>
    </div></section>

    {(item.metrics.length > 0 || item.economics) && <section className="site-section is-ink" aria-labelledby="metrics-title"><div className="shell site-price">
      <Heading id="metrics-title" label="WHAT THE RECORD SHOWS" title="Quality, time and cost," accent="read from one record." body="Every figure here is an illustrative result from a synthetic run. Your figures come from your own runs."/>
      <div>
        {item.metrics.length > 0 && <dl className="site-kv">{item.metrics.map(metric => <div key={metric.label}><dt>{metric.label}</dt><dd>{metric.value}<small>{metric.detail}</small></dd></div>)}</dl>}
        {item.economics && <dl className="site-rules" style={{ marginTop: 24 }}><div><dt>Time</dt><dd>{item.economics.time}</dd></div><div><dt>Cost</dt><dd>{item.economics.cost}</dd></div><div><dt>Business</dt><dd>{item.economics.business}</dd></div></dl>}
      </div>
    </div></section>}

    <section className="site-section" aria-labelledby="workers-title"><div className="shell">
      <Heading id="workers-title" label="WHO DID WHAT" title="The work decides" accent="the team."/>
      <Cards items={item.workers.map(worker => ({ icon: 'users', kicker: worker.tool, title: worker.role, body: worker.task, points: worker.output ? [worker.output] : undefined }))}/>
    </div></section>

    <section className="site-section is-lilac" aria-labelledby="lens-title"><div className="shell">
      <Heading id="lens-title" centered label={item.lens.label} title={item.lens.title} accent={item.lens.accent} body={item.lens.body || undefined}/>
      <Cards columns={5} items={item.lens.roles.map(role => ({ icon: role.icon, kicker: role.role, title: role.question, body: role.answer }))}/>
      {item.lens.note && <p className="site-note"><Icon name="shield" size={15}/>{item.lens.note}</p>}
    </div></section>

    <section className="site-section is-tight" aria-labelledby="scenario-faq-title"><div className="shell site-faq">
      <Heading id="scenario-faq-title" label="QUESTIONS" title="About this" accent="scenario."><div className="site-sources" style={{ marginTop: 26 }}><span className="site-chips-label">Sources</span>{item.sources.map(source => <p key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label}</a><span>{source.detail}</span></p>)}</div></Heading>
      <FaqAccordion groups={[{ title: item.title, items: item.faq }]} name="scenario-faq"/>
    </div></section>

    <CtaBand secondary={{ href: '/use-cases', label: 'All use cases' }}/>
  </>;
}
