import Link from 'next/link';
import Icon from '@/components/Icon';
import type { Comparison } from '../../data/compare';
import { REQUEST_ACCESS } from '../../nav';
import PageHero from '../PageHero';
import Heading from '../Heading';
import Cards from '../Cards';
import FaqAccordion from '../FaqAccordion';
import CtaBand from '../CtaBand';

/** A comparison page: definitions, side by side, what the page is not, how to judge fairly, questions. */
export default function ComparisonArticle({ item }: { item: Comparison }) {
  return <>
    <PageHero eyebrow="COMPARISON" title={item.headline[0]} accent={item.headline[1]} lede={item.lede}
      trail={[{ label: 'Platform', href: '/platform' }, { label: item.title, href: `/compare/${item.slug}` }]}
      actions={<><a href={REQUEST_ACCESS} className="beta-button">Start with one task<Icon name="arrow" size={18}/></a><Link href="/platform" className="beta-secondary">How the platform works<Icon name="arrow" size={15}/></Link></>}
      note={item.note ?? `${item.name} is described from its own public material, read on ${item.checked}.`}/>

    <section className="site-section is-tight" aria-labelledby="definitions-title"><div className="shell site-faq">
      <Heading id="definitions-title" label="DEFINITIONS" title="What each one is," accent="and why it matters." body="Three questions a buyer asks first."/>
      <FaqAccordion groups={[{ title: 'Definitions', items: item.definitions }]} name="compare-definitions"/>
    </div></section>

    <section className="site-section is-lilac" aria-labelledby="side-title"><div className="shell">
      <Heading id="side-title" centered wide label={item.sideBySide.label.toUpperCase()} title={item.sideBySide.headline[0]} accent={item.sideBySide.headline[1]} body={item.sideBySide.body}/>
      <Cards columns={2} items={[
        { icon: 'users', title: item.sideBySide.left.title, body: 'As described on its own page.', points: item.sideBySide.left.items },
        { icon: 'check', title: item.sideBySide.right.title, body: 'What you get today.', points: item.sideBySide.right.items, badge: 'Available' },
      ]}/>
    </div></section>

    <section className="site-section" aria-labelledby="fairness-title"><div className="shell">
      <Heading id="fairness-title" label={item.fairness.label.toUpperCase()} title={item.fairness.headline[0]} accent={item.fairness.headline[1]} body={item.fairness.body}/>
      <Cards items={item.fairness.items.map(entry => ({ icon: 'check', title: entry.title, body: entry.body }))}/>
    </div></section>

    <section className="site-section is-mint" aria-labelledby="pilot-title"><div className="shell">
      <Heading id="pilot-title" centered wide label={item.pilot.label.toUpperCase()} title={item.pilot.headline[0]} accent={item.pilot.headline[1]} body={item.pilot.body}/>
      <ol className="site-steps is-five" aria-label="A fair pilot">{item.pilot.steps.map((step, index) => <li className="site-step" key={index}><span>{String(index + 1).padStart(2, '0')}</span><p>{step}</p></li>)}</ol>
    </div></section>

    <section className="site-section is-tight" aria-labelledby="compare-faq-title"><div className="shell site-faq">
      <Heading id="compare-faq-title" label="QUESTIONS" title="Common" accent="questions.">{item.sources.length > 0 && <div className="site-sources" style={{ marginTop: 26 }}><span className="site-chips-label">Sources · read {item.checked}</span>{item.sources.map(source => <p key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label}</a><span>{source.detail}</span></p>)}</div>}<Link href="/faq" className="site-inline-link">All questions and answers<Icon name="arrow" size={15}/></Link></Heading>
      <FaqAccordion groups={[{ title: item.title, items: item.faq }]} name="compare-faq"/>
    </div></section>

    <CtaBand title={item.cta.headline[0]} accent={item.cta.headline[1]} body={item.cta.body} note={item.cta.note} secondary={{ href: '/contact', label: 'Talk to the team' }}/>
  </>;
}
