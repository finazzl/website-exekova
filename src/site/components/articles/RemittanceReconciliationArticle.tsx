import Link from 'next/link';
import Icon from '@/components/Icon';
import {
  remittanceReconciliationCase as item,
  remittanceReconciliationPost as post,
  reconciliationProvenance,
  reconciliationInputs,
  reconciliationExample,
  reconciliationRollout,
  reconciliationFaq,
} from '../../data/remittanceReconciliation';
import { REQUEST_ACCESS } from '../../nav';
import PageHero from '../PageHero';
import Heading from '../Heading';
import RecordCard from '../RecordCard';
import Cards from '../Cards';
import RunSteps from '../RunSteps';
import QuestionsSection from '../QuestionsSection';
import CtaBand from '../CtaBand';

export default function RemittanceReconciliationArticle() {
  return <>
    <PageHero layout="split" eyebrow="UK REMITTANCE · AI RECONCILIATION"
      title="Reconciliation," accent="run by AI agents." lede={item.problem} note={reconciliationProvenance}
      trail={[{ label: 'Use cases', href: '/use-cases' }, { label: 'UK remittance reconciliation', href: `/use-cases/${item.slug}` }]}
      actions={<><a href={REQUEST_ACCESS} className="beta-button">Scope your reconciliation workflow<Icon name="arrow" size={18}/></a><Link prefetch={false} href={`/blogs/${post.slug}`} className="beta-secondary">Read the full approach<Icon name="arrow" size={15}/></Link></>}
      aside={<RecordCard label="THE RECONCILIATION RECORD" title="Every match has evidence." body="A reviewable position across the ledger, payout partner and bank." checks={['Source records and matching rules', 'Explained differences and named owners', 'Close pack ready for finance review']} badge="Workflow" foot="Major UK remittance provider" footIcon="coins"/>}/>

    <section className="site-section is-tight" aria-labelledby="reconciliation-problem-title"><div className="shell">
      <Heading id="reconciliation-problem-title" label="THE OPERATING PROBLEM" title="The money moves." accent="The records arrive separately."/>
      <p className="site-prose">{item.why}</p>
      <p className="site-prose">{item.pressure}</p>
    </div></section>

    <section className="site-section is-lilac" aria-labelledby="reconciliation-inputs-title"><div className="shell">
      <Heading id="reconciliation-inputs-title" centered label="THREE SOURCES" title="Connect the transfer" accent="to the cash." body="Preserve each source, then establish the references and rules that connect them."/>
      <Cards items={reconciliationInputs}/>
    </div></section>

    <section className="site-section" id="agent-workflow" aria-labelledby="reconciliation-agents-title"><div className="shell">
      <Heading id="reconciliation-agents-title" centered label="HOW THE AGENTS RUN IT" title="Five responsibilities." accent="One traceable close." body="Agents coordinate the work. Approved rules calculate the money. Every unresolved difference has an owner."/>
      <RunSteps steps={item.runs} label="AI-agent reconciliation workflow"/>
    </div></section>

    <section className="site-section is-mint" aria-labelledby="reconciliation-example-title"><div className="shell">
      <Heading id="reconciliation-example-title" label="ILLUSTRATIVE SETTLEMENT" title="Keep the £250" accent="in view." body="A synthetic example in GBP. These figures explain the workflow; they are not customer transaction data or performance results."/>
      <div className="legal-table-wrap" role="region" aria-label="Illustrative GBP settlement calculation" tabIndex={0}>
        <table className="legal-table">
          <caption className="sr-only">A £100,000 settlement batch with a £250 unresolved difference</caption>
          <thead><tr><th scope="col">Settlement record</th><th scope="col">Amount</th><th scope="col">Evidence and treatment</th></tr></thead>
          <tbody>{reconciliationExample.map(row => <tr key={row.label}><th scope="row">{row.label}</th><td>{row.value}</td><td>{row.detail}</td></tr>)}</tbody>
        </table>
      </div>
      <p className="site-prose" style={{ marginTop: 28 }}>The investigation agent checks the batch, fee schedule and adjustment notices. If nothing explains the £250, it stays open. Finance receives the source rows and a proposed next action; no fee or FX adjustment is invented to make the numbers agree.</p>
    </div></section>

    <section className="site-section" aria-labelledby="reconciliation-record-title"><div className="shell">
      <Heading id="reconciliation-record-title" centered label="OUTPUT AND OWNERSHIP" title="A close pack to inspect." accent="Clear decisions to make."/>
      <Cards columns={2} items={[
        { icon: 'file', title: 'What the agents prepare', body: 'The evidence stays attached to the work through every re-run.', points: item.returns },
        { icon: 'users', title: item.keepsLabel, body: 'The initial workflow uses read-only access. Matching a record does not authorise a financial posting.', points: item.keeps },
      ]}/>
    </div></section>

    <section className="site-section is-lilac" aria-labelledby="reconciliation-rollout-title"><div className="shell">
      <Heading id="reconciliation-rollout-title" centered label="THE FIRST BUILD" title="Start with one corridor." accent="Expand with evidence." body={item.arrives}/>
      <Cards columns={4} items={reconciliationRollout}/>
      <p className="site-note"><Icon name="file" size={15}/><span>Read the operating model in <Link prefetch={false} href={`/blogs/${post.slug}`}>{post.title}</Link>.</span></p>
    </div></section>

    <QuestionsSection title="About this" accent="reconciliation workflow." group={item.name} items={reconciliationFaq}/>
    <CtaBand title="Bring one settlement" accent="that needs explaining." body="Start with redacted sample records, the expected outcome and the rules your finance team uses to approve a match." secondary={{ href: `/blogs/${post.slug}`, label: 'Read the reconciliation blog' }}/>
  </>;
}
