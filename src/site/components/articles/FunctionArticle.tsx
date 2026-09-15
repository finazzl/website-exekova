import Link from 'next/link';
import Icon from '@/components/Icon';
import { caseBySlug } from '../../data/cases';
import { functions, type Fn } from '../../data/functions';
import { REQUEST_ACCESS } from '../../nav';
import PageHero from '../PageHero';
import Heading from '../Heading';
import RecordCard from '../RecordCard';
import Cards from '../Cards';
import Chips from '../Chips';
import StageArtifact from '../StageArtifact';
import CtaBand from '../CtaBand';
import QuestionsSection from '../QuestionsSection';
import { functionFaq } from '../../lib/pageFaq';

/** A solution by function: the work, a run stage by stage, live problems, the definition of done, measures. */
export default function FunctionArticle({ item }: { item: Fn }) {
  const cases = item.cases.ids.map(slug => caseBySlug(slug)).filter(Boolean);
  const others = functions.filter(entry => entry.slug !== item.slug);
  return <>
    <PageHero layout="split" eyebrow={`SOLUTIONS · ${item.name.toUpperCase()}`} title={item.headline[0]} accent={item.headline[1]} lede={item.lede}
      trail={[{ label: 'Solutions', href: '/solutions' }, { label: item.name, href: `/solutions/${item.slug}` }]}
      actions={<><a href={REQUEST_ACCESS} className="beta-button">Start with one task<Icon name="arrow" size={18}/></a><Link href="/platform" className="beta-secondary">How the platform works<Icon name="arrow" size={15}/></Link></>}
      aside={<RecordCard label={`${item.acceptance.sourceTool} · ${item.id}`} title={item.request} body={`Standard: ${item.standard}`} checks={item.checks} foot={item.deliverable} badge="Example"/>}/>

    <section className="site-section is-tight" aria-labelledby="work-title"><div className="shell">
      <Heading id="work-title" label={`WHAT EXEKOVA RUNS FOR ${item.name.toUpperCase()}`} title={item.workTitle[0]} accent={item.workTitle[1]} body={item.summary}>
        {item.tools.length > 0 && <Chips label="Works with" items={item.tools}/>}
      </Heading>
      <Cards items={item.work.map(entry => ({ icon: item.icon, title: entry.title, body: entry.body }))}/>
    </div></section>

    <section className="site-section is-lilac" aria-labelledby="stages-title"><div className="shell">
      <Heading id="stages-title" centered label="A RUN, STAGE BY STAGE" title={item.request} accent="from request to verified outcome." body={`${item.acceptance.sourceTool} ${item.id}. Standard: ${item.standard}`}/>
      <ol className="site-steps is-four" aria-label="Run stages">{item.stages.map((stage, index) => <li className="site-step" key={stage.name}>
        <span>{String(index + 1).padStart(2, '0')}</span>
        <h3>{stage.name}<small>{stage.status}</small></h3>
        <p><strong>{stage.title}</strong> {stage.body}</p>
        <StageArtifact file={stage.file} lines={stage.lines}/>
        <ul>{stage.checks.map(check => <li key={check}><Icon name="check" size={14}/>{check}</li>)}</ul>
      </li>)}</ol>
      {item.recovery && <p className="site-note"><Icon name="reset" size={15}/>{item.recovery.summary} {item.recovery.repaired}</p>}
    </div></section>

    <section className="site-section" aria-labelledby="cases-title"><div className="shell">
      <Heading id="cases-title" centered label={item.cases.label.toUpperCase()} title={item.cases.headline[0]} accent={item.cases.headline[1]} body={item.cases.body}/>
      <Cards items={cases.map(entry => ({ icon: item.icon, kicker: item.name, title: entry!.name, body: entry!.problem, points: entry!.keeps, href: `/use-cases/${entry!.slug}`, linkLabel: 'Open the use case' }))}/>
      {item.cases.note && <p className="site-note"><Icon name="shield" size={15}/>{item.cases.note}</p>}
    </div></section>

    <section className="site-section is-ink" aria-labelledby="done-title"><div className="shell site-price">
      <Heading id="done-title" label="DEFINITION OF DONE" title="Generated" accent="isn't done." body={item.policy}/>
      <RecordCard label={`${item.acceptance.sourceTool} · ${item.acceptance.workId}`} title={item.acceptance.workRequest} body={`Standard: ${item.acceptance.standard}`} checks={item.acceptance.checks} foot={item.acceptance.deliverable}/>
    </div></section>

    <section className="site-section is-tight" aria-labelledby="metrics-title"><div className="shell">
      <Heading id="metrics-title" label={item.metrics.label.toUpperCase()} title={item.metrics.headline[0]} accent={item.metrics.headline[1]} body={item.metrics.body}/>
      <Cards columns={item.metrics.items.length >= 5 ? 5 : 4} items={item.metrics.items.map(metric => ({ icon: metric.icon, title: metric.label, body: metric.hint }))}/>
    </div></section>

    <section className="site-section is-lilac" aria-labelledby="others-title"><div className="shell">
      <Heading id="others-title" centered label="OTHER FUNCTIONS" title="Each function sets" accent="its own definition of done."/>
      <Cards columns={3} items={others.map(entry => ({ icon: entry.icon, kicker: entry.group, title: entry.name, body: entry.summary, href: `/solutions/${entry.slug}`, linkLabel: `exekova for ${entry.name}` }))}/>
    </div></section>

    <QuestionsSection title={`About exekova for ${item.name === 'QA' ? 'QA' : item.name.toLowerCase()}.`} body="What the function lead asks before the first run." group={item.name} items={functionFaq(item)}/>

    <CtaBand title={item.cta.headline[0]} accent={item.cta.headline[1]} body={item.cta.body} secondary={{ href: '/solutions', label: 'All solutions' }}/>
  </>;
}
