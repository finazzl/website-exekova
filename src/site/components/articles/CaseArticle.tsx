import Link from 'next/link';
import Icon from '@/components/Icon';
import { casesFor, casesIndex, type Case } from '../../data/cases';
import { insuranceBackOfficeCases, insuranceCaseBySlug } from '../../data/insuranceBackOffice';
import { REQUEST_ACCESS } from '../../nav';
import PageHero from '../PageHero';
import Heading from '../Heading';
import RecordCard from '../RecordCard';
import Cards from '../Cards';
import RunSteps from '../RunSteps';
import CtaBand from '../CtaBand';
import QuestionsSection from '../QuestionsSection';
import { caseFaq } from '../../lib/pageFaq';

/** One use case: the problem, why it matters, the five stages, what comes back, what stays yours. */
export default function CaseArticle({ item }: { item: Case }) {
  // Back-office cases relate to each other; everything else relates within its own origin.
  const backOffice = Boolean(insuranceCaseBySlug(item.slug));
  const siblings = backOffice ? insuranceBackOfficeCases : casesFor(item.origin.kind, item.origin.key);
  const related = siblings.filter(entry => entry.slug !== item.slug).slice(0, backOffice ? 3 : undefined);
  return <>
    <PageHero layout="split" eyebrow={`${item.origin.name.toUpperCase()} · USE CASE`} title={item.name} lede={item.problem}
      trail={[{ label: 'Use cases', href: '/use-cases' }, { label: item.origin.name, href: item.origin.href }, { label: item.name, href: `/use-cases/${item.slug}` }]}
      actions={<><a href={REQUEST_ACCESS} className="beta-button">Bring a problem like this<Icon name="arrow" size={18}/></a><Link prefetch={false} href={item.origin.href} className="beta-secondary">More in {item.origin.name.toLowerCase()}<Icon name="arrow" size={15}/></Link></>}
      aside={<RecordCard label="WHAT ARRIVES" title={item.name} body={item.arrives} checks={item.returns} foot={item.origin.name} footIcon={item.origin.icon} badge="Use case"/>}/>

    <section className="site-section is-tight" aria-labelledby="why-title"><div className="shell">
      <Heading id="why-title" label="WHY IT MATTERS" title="The work is not hard." accent="It is losing to something louder."/>
      <p className="site-prose">{item.why}</p>
      <p className="site-quote" style={{ marginTop: 40 }}>{item.pressure}</p>
    </div></section>

    <section className="site-section is-lilac" aria-labelledby="runs-title"><div className="shell">
      <Heading id="runs-title" centered label="HOW EXEKOVA RUNS IT" title="One piece of work." accent={`${item.runs.length} stages.`} body={casesIndex.pipeline.note}/>
      <RunSteps steps={item.runs}/>
    </div></section>

    <section className="site-section" aria-labelledby="record-title"><div className="shell">
      <Heading id="record-title" centered label="THE RECORD" title="What comes back." accent="What stays with you." body="Every case returns the same kind of record and leaves the same kind of decision where it belongs."/>
      <Cards columns={2} items={[
        { icon: 'file', title: 'What comes back', body: 'Delivered with its evidence, against the standard you set.', points: item.returns },
        { icon: 'users', title: item.keepsLabel, body: 'Decisions the platform will not make for you.', points: item.keeps },
      ]}/>
    </div></section>

    {related.length > 0 && <section className="site-section is-tight" aria-labelledby="related-title"><div className="shell">
      <Heading id="related-title" label={`MORE IN ${item.origin.name.toUpperCase()}`} title="Related problems," accent="same discipline." body={related.length === 1 ? `One more problem in ${item.origin.name.toLowerCase()} that runs the same way: scoped, executed, reviewed by a capability that did not write it, and returned with its evidence.` : undefined}/>
      <Cards items={related.map(entry => ({ icon: entry.origin.icon, kicker: entry.origin.name, title: entry.name, body: entry.problem, href: `/use-cases/${entry.slug}`, linkLabel: 'Open the use case' }))}/>
    </div></section>}

    <QuestionsSection tone="lilac" title="About this" accent="use case." body="Answered from the record above, not from a sales deck." group={item.name} items={caseFaq(item)}/>

    <CtaBand secondary={{ href: '/use-cases', label: 'All use cases' }}/>
  </>;
}
