import type { Metadata } from 'next';
import Link from 'next/link';
import Icon from '@/components/Icon';
import content from '@/beta/content/beta.json';
import { taskOffer } from '@/beta/data/offer';
import { schemaForPage } from '@/lib/seo';
import { faqGroups } from '@/site/data/faq';
import { plain } from '@/site/lib/inline';
import { contentPage, metadataFor } from '@/site/lib/meta';
import { REQUEST_ACCESS } from '@/site/nav';
import JsonLd from '@/site/components/JsonLd';
import PageHero from '@/site/components/PageHero';
import Heading from '@/site/components/Heading';
import Cards from '@/site/components/Cards';
import RecordCard from '@/site/components/RecordCard';
import StepsBand from '@/site/components/StepsBand';
import FaqAccordion from '@/site/components/FaqAccordion';
import CtaBand from '@/site/components/CtaBand';

export const metadata: Metadata = metadataFor('/pricing');

/** The pricing page. The price is stated once, in the card; every other section explains what it covers and how acceptance is decided. */
export default function PricingPage() {
  const c = content.pricing;
  const pricingFaq = faqGroups.filter(group => group.title === 'Pricing');
  return <>
    <PageHero eyebrow="PRICING" title="Pay for accepted work." accent="Nothing else." lede="One price per accepted engineering task. Nothing for rejected attempts, no subscription, no seat licence, and no payment on this website."
      trail={[{ label: 'Pricing', href: '/pricing' }]}
      actions={<><a href={REQUEST_ACCESS} className="beta-button">{c.cta}<Icon name="arrow" size={18}/></a><Link href="/platform" className="beta-secondary">How the platform works<Icon name="arrow" size={15}/></Link></>}/>

    <section className="site-section is-tight" aria-labelledby="price-title"><div className="shell site-price">
      <Heading id="price-title" label="THE PRICE" title={c.headline[0]} accent={c.headline[1]} body="Accepted tasks are invoiced against the acceptance record. The price agreed for your task stays with that task, whatever the standard price becomes later."/>
      <div className="site-price-card">
        <span className="beta-label">{c.label}</span>
        <div className="site-price-amount"><span>$</span>{taskOffer.current}<small>{c.unit}</small></div>
        <p>{c.standard}: ${taskOffer.standard} / task</p>
        <ul>{c.features.map(item => <li key={item}><Icon name="check" size={16}/>{item}</li>)}</ul>
        <a href={REQUEST_ACCESS} className="beta-button">{c.cta}<Icon name="arrow" size={17}/></a>
        <small><Icon name="shield" size={14}/>{c.rejected}</small>
      </div>
    </div></section>

    <section className="site-section is-lilac" aria-labelledby="accepted-title"><div className="shell site-price">
      <Heading id="accepted-title" label="WHAT COUNTS AS ACCEPTED" title="Reviewed. Verified." accent="Then accepted." body="An attempt becomes an accepted task only when the reviewed revision meets your acceptance criteria, passes independent review and passes the required checks. Anything short of that is returned for correction and is not invoiced."/>
      <RecordCard label="ACCEPTANCE RECORD" title="One accepted task." body="What has to be true before an outcome reaches your invoice." checks={['Acceptance criteria met', 'Independent review passed', 'Required checks passed', 'Delivered as a pull request with its evidence']} foot="Your team owns the merge"/>
    </div></section>

    <section className="site-section" aria-labelledby="included-title"><div className="shell">
      <Heading id="included-title" centered label="WHAT THE PRICE COVERS" title="Everything an accepted task" accent="comes with." body="Every accepted outcome carries the same work and the same record, whatever the task."/>
      <Cards items={[
        { icon: 'code', title: 'The code change', body: 'Implemented on an isolated task branch in the GitHub repository you approve, within the scope you set.' },
        { icon: 'eye', title: 'Independent review and verification', body: 'A capability that did not write the change reviews it, and the required tests and checks must pass before the outcome is offered to you.' },
        { icon: 'file', title: 'A pull request with evidence', body: 'The review result, the check results and the acceptance record travel with the pull request. Your team owns the merge and the release.' },
      ]}/>
    </div></section>

    <section className="site-section is-tight" aria-labelledby="never-title"><div className="shell">
      <Heading id="never-title" centered label="WHAT IS NEVER CHARGED" title="Nothing for rejected attempts." accent="Nothing for looking." body="The risk of a task being harder than expected sits with exekova, not on your invoice."/>
      <Cards items={[
        { icon: 'reset', title: 'Rejected attempts', body: 'An attempt that fails independent review or the required checks is returned for correction and adds nothing to your invoice.' },
        { icon: 'coins', title: 'No subscription', body: 'No subscription, no seat licence and no token meter. You pay per accepted task, and nothing while you evaluate.' },
        { icon: 'lock', title: 'Nothing on this website', body: 'This site takes no payment details. Accepted tasks are invoiced against the acceptance record after your team has the outcome.' },
      ]}/>
    </div></section>

    <section className="site-section is-lilac" aria-labelledby="fit-title"><div className="shell">
      <Heading id="fit-title" centered label="A GOOD FIRST TASK" title="Start with a task" accent="that has a finish line." body={c.body}/>
      <Cards columns={2} items={[
        { icon: 'coins', title: c.exampleTitle, body: c.exampleBody, points: ['One repository, one bounded change', 'Acceptance criteria you can verify', 'Room for a regression test'] },
        { icon: 'layers', title: 'A full provider migration', body: 'Split the migration into scoped endpoint changes, each reviewed, verified and accepted on its own.', points: ['Becomes a sequence of scoped tasks', 'Each with its own criteria and outcome', 'Each accepted and invoiced on its own'] },
      ]}/>
      <div style={{ marginTop: 40 }}><StepsBand/></div>
    </div></section>

    <section className="site-section is-tight" aria-labelledby="pricing-faq-title"><div className="shell site-faq">
      <Heading id="pricing-faq-title" label="QUESTIONS" title="About the" accent="price." body="The questions teams ask before the first invoice."><Link href="/faq" className="site-inline-link">All questions and answers<Icon name="arrow" size={15}/></Link></Heading>
      <FaqAccordion groups={pricingFaq} name="pricing-faq"/>
    </div></section>

    <CtaBand title="One task." accent="One clear price." body="Bring one task you would otherwise have staffed. You pay only if it is accepted." secondary={{ href: '/contact', label: 'Talk to the team' }}/>
    <JsonLd data={schemaForPage(contentPage('/pricing'), pricingFaq.flatMap(group => group.items).map(item => ({ q: item.q, a: plain(item.a) })))}/>
  </>;
}
