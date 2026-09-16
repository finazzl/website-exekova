import Link from 'next/link';
import Icon from '@/components/Icon';
import { leaders, type Leader } from '../../data/leaders';
import { REQUEST_ACCESS } from '../../nav';
import PageHero from '../PageHero';
import Heading from '../Heading';
import RecordCard from '../RecordCard';
import Cards from '../Cards';
import FaqAccordion from '../FaqAccordion';
import CtaBand from '../CtaBand';

/** A leader page: the question this chair brings, the shift, the measures, the other chairs. */
export default function LeaderArticle({ item }: { item: Leader }) {
  const peers = leaders.filter(entry => entry.slug !== item.slug);
  const consoleChecks = item.console.rows.length > 0
    ? item.console.rows.map(row => `${row.k}: ${row.v}`)
    : item.console.bars.map(bar => `${bar.label}${bar.note ? `: ${bar.note}` : ''}`);
  return <>
    <PageHero layout="split" eyebrow={item.eyebrow.toUpperCase()} title={item.headline[0]} accent={item.headline[1]} lede={item.lede}
      trail={[{ label: 'Solutions', href: '/solutions' }, { label: item.eyebrow, href: `/solutions/${item.slug}` }]}
      actions={<><a href={REQUEST_ACCESS} className="beta-button">Start with one task<Icon name="arrow" size={18}/></a><Link prefetch={false} href="/platform" className="beta-secondary">See how it executes<Icon name="arrow" size={15}/></Link></>}
      aside={<RecordCard label={item.console.label.toUpperCase()} title={item.console.title} body={item.console.formula ? `${item.console.formula.numerator} ÷ ${item.console.formula.denominator} = ${item.console.formula.result}` : undefined} checks={consoleChecks} foot={item.console.foot} footIcon="chart" badge={item.console.tag || 'Example'}/>}/>

    <section className="site-section is-tight" aria-labelledby="owns-title"><div className="shell">
      <Heading id="owns-title" label="DIVISION OF RESPONSIBILITY" title={item.owns.youLabel + '.'} accent={item.owns.wzLabel + '.'}/>
      <Cards columns={2} items={[{ icon: 'users', title: item.owns.youLabel, body: item.owns.you }, { icon: 'bolt', title: item.owns.wzLabel, body: item.owns.wz }]}/>
    </div></section>

    <section className="site-section is-lilac" aria-labelledby="shift-title"><div className="shell">
      <Heading id="shift-title" centered label={item.shift.label} title={item.shift.headline[0]} accent={item.shift.headline[1]} body={item.shift.body}/>
      <Cards columns={2} items={[
        { kicker: item.shift.before.label, title: item.shift.before.title, body: '', points: item.shift.before.items },
        { kicker: item.shift.after.label, title: item.shift.after.title, body: '', points: item.shift.after.items, badge: 'exekova' },
      ]}/>
    </div></section>

    <section className="site-section" aria-labelledby="measures-title"><div className="shell">
      <Heading id="measures-title" label={item.measures.label} title={item.measures.headline[0]} accent={item.measures.headline[1]} body={item.measures.body}/>
      <Cards items={item.measures.primary.map(measure => ({ icon: measure.icon, title: measure.label, body: measure.counts, points: [measure.why] }))}/>
      {item.measures.secondary.length > 0 && <div style={{ marginTop: 28 }}><span className="site-chips-label">{item.measures.secondaryLabel}</span><dl className="site-rules">{item.measures.secondary.map(entry => <div key={entry.label}><dt>{entry.label}</dt><dd>{entry.hint}</dd></div>)}</dl></div>}
      {item.measures.note && <p className="site-note"><Icon name="shield" size={15}/>{item.measures.note}</p>}
    </div></section>

    <section className="site-section is-tight" aria-labelledby="peers-title"><div className="shell">
      <Heading id="peers-title" label="OTHER CHAIRS" title="Different chair," accent="different question."/>
      <Cards columns={4} items={peers.map(entry => ({ icon: entry.icon, kicker: entry.eyebrow, title: `${entry.headline[0]} ${entry.headline[1]}`, body: entry.tagline, href: `/solutions/${entry.slug}`, linkLabel: entry.eyebrow }))}/>
    </div></section>

    <section className="site-section is-lilac" aria-labelledby="leader-faq-title"><div className="shell site-faq">
      <Heading id="leader-faq-title" label="QUESTIONS" title={`${item.faqGroup}`} accent="questions." body="The questions this chair asks most often."><Link prefetch={false} href="/faq" className="site-inline-link">All questions and answers<Icon name="arrow" size={15}/></Link></Heading>
      <FaqAccordion groups={[{ title: item.faqGroup, items: item.faq }]} name="leader-faq"/>
    </div></section>

    <CtaBand title={item.cta.headline[0]} accent={item.cta.headline[1]} body={item.cta.body} secondary={{ href: '/solutions', label: 'All solutions' }}/>
  </>;
}
