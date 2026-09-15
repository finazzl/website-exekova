import type { Metadata } from 'next';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { governanceRules } from '@/beta/content/chapters';
import { CONNECTORS } from '@/beta/data/connectors';
import { taskFaq, taskOffer } from '@/beta/data/offer';
import { schemaForPage } from '@/lib/seo';
import { contentPage, contactEmail, metadataFor } from '@/site/lib/meta';
import { REQUEST_ACCESS } from '@/site/nav';
import JsonLd from '@/site/components/JsonLd';
import PageHero from '@/site/components/PageHero';
import Heading from '@/site/components/Heading';
import StepsBand from '@/site/components/StepsBand';
import Cards from '@/site/components/Cards';
import FeatureRows from '@/site/components/FeatureRows';
import CtaBand from '@/site/components/CtaBand';
import QuestionsSection from '@/site/components/QuestionsSection';
import { plain } from '@/site/lib/inline';

const aboutFaq = taskFaq.filter(item => ['What is exekova?', 'Will exekova merge or deploy my code?', 'What does it cost?', 'What does a verified outcome include?'].includes(item.q));
import { COMPLIANCE_LINE } from '@/site/components/ComplianceLine';

export const metadata: Metadata = metadataFor('/about');

const available = (kind: 'source' | 'repo') => CONNECTORS.filter(item => item.kind === kind && item.status === 'available').map(item => item.name);
const planned = (kind: 'source' | 'repo') => CONNECTORS.filter(item => item.kind === kind && item.status === 'planned').map(item => item.name);

export default function AboutPage() {
  const email = contactEmail();
  return <>
    <PageHero eyebrow="ABOUT EXEKOVA" title="An autonomous work execution platform." accent="Human-owned decisions." lede="exekova turns a scoped engineering task into an independently reviewed, verified pull request. Your team keeps every decision that matters: the scope, the merge and the release."
      actions={<><a href={REQUEST_ACCESS} className="beta-button">Request access<Icon name="arrow" size={18}/></a><Link href="/platform" className="beta-secondary">See how the platform works<Icon name="arrow" size={15}/></Link></>}/>

    <section className="site-section is-tight" aria-labelledby="mission-title"><div className="shell">
      <p className="site-quote" id="mission-title">A task in. <em>A verified outcome out.</em> Nothing in between for anyone to interpret.</p>
      <p>That is the whole product, stated once. Everything below explains how we keep it true.</p>
    </div></section>

    <section className="site-section is-lilac" aria-labelledby="how-title"><div className="shell">
      <Heading id="how-title" centered label="WHAT WE DO" title="Get the task. Set the repo." accent="Come back to a verified outcome." body="Three steps, defined once and used everywhere: on this site, in the service and on every acceptance record."/>
      <StepsBand/>
    </div></section>

    <section className="site-section" aria-labelledby="principles-title"><div className="shell">
      <Heading id="principles-title" centered label="WHAT WE BELIEVE" title="Four commitments." accent="Kept on every task." body="They shape the product, the price and the boundaries we work within."/>
      <Cards columns={4} items={[
        { icon: 'file', title: 'Done comes with evidence.', body: 'A completion claim alone cannot produce acceptance. Every outcome carries the reviewed code, the independent review result, the required check results and the acceptance decision.' },
        { icon: 'coins', title: 'Pay for accepted work.', body: `One price per accepted task: $${taskOffer.current}. Rejected attempts count as $0. Nothing is invoiced without an acceptance record behind it.` },
        { icon: 'lock', title: 'Your code. Your control.', body: 'Work happens only in the projects and repositories you approve, on isolated task branches. exekova never merges or deploys.' },
        { icon: 'layers', title: 'Small tasks. Clear finish lines.', body: 'A bug fix, a small feature or focused test coverage with clear acceptance criteria. Broad projects become sequences of verified steps.' },
      ]}/>
    </div></section>

    <section className="site-section is-tight" aria-labelledby="work-title"><div className="shell">
      <Heading id="work-title" label="HOW WE WORK" title="Independent review." accent="Stated boundaries." body="The two things that make an autonomous outcome something a team can trust."/>
      <FeatureRows rows={[
        { eyebrow: 'REVIEW, THEN VERIFICATION', title: 'The work is checked', accent: 'by someone who did not do it.', body: 'exekova checks each change independently, then verifies the reviewed revision against the agreed criteria. If required checks fail, the attempt is rejected and returned for correction.', points: ['Independent review of every revision', 'Required tests and checks must pass', 'Corrections are reviewed and verified again'], link: { href: '/platform', label: 'How the platform runs a task' }, record: { label: 'CHECKOUT VALIDATION · EXAMPLE REVIEW', title: 'Country changes now trigger postcode validation.', checks: ['Independent review passed', 'Regression tests passed', 'Acceptance criteria met'], foot: 'Pull request ready for your team' } },
        { eyebrow: 'GOVERNANCE', title: 'Boundaries', accent: 'set before work starts.', body: 'Scope, delivery, acceptance, corrections and release are defined up front, so the outcome is never a surprise to the people who own the system.', points: governanceRules.map(rule => `${rule.label}: ${rule.value}`), link: { href: '/#boundaries', label: 'Trust, safety and governance' }, record: { label: 'YOUR BOUNDARIES', title: 'Your code. Your control.', checks: ['Approved scope', 'Isolated branch', 'Human merge', 'Recorded acceptance'], foot: 'Human-owned decisions', footIcon: 'lock' }, tone: 'mint' },
        { eyebrow: 'DIRECTION', title: 'Engineering today.', accent: 'A bigger ambition tomorrow.', body: 'exekova’s direction is to turn defined enterprise work into verified outcomes across teams and systems. Today the product is scoped engineering work; the longer-term vision is broader, and it is published rather than promised.', points: ['Available now: scoped engineering tasks', 'Longer-term: defined work across business systems', 'No availability date is committed for the vision'], link: { href: '/#vision', label: 'Read the exekova vision' }, record: { label: 'AVAILABLE TODAY', title: 'Scoped engineering work.', checks: ['Jira or the Work Intent form', 'An approved GitHub repository', 'A verified pull request with evidence'], foot: 'Bug fixes, small features, focused tests', footIcon: 'code' }, tone: 'ink' },
      ]}/>
    </div></section>

    <section className="site-section is-lilac" aria-labelledby="facts-title"><div className="shell">
      <Heading id="facts-title" centered label="THE FACTS" title="What is true today." body="The claims on this site, in one place, kept in step with the product."/>
      <dl className="site-facts">
        <div><span className="site-fact-icon"><Icon name="layers" size={20}/></span><dt>Product</dt><dd>An autonomous work execution platform for scoped engineering tasks, delivered as verified GitHub pull requests.</dd></div>
        <div><span className="site-fact-icon"><Icon name="file" size={20}/></span><dt>Task sources</dt><dd>{available('source').join(' and the ')} today. {planned('source').join(', ')} intake is planned.</dd></div>
        <div><span className="site-fact-icon"><Icon name="branch" size={20}/></span><dt>Repositories</dt><dd>{available('repo').join(' and ')} today. {planned('repo').join(' and ')} are planned, with no committed date.</dd></div>
        <div><span className="site-fact-icon"><Icon name="grid" size={20}/></span><dt>Integrations</dt><dd>Every system exekova works with is listed in the <Link href="/integrations">integrations catalogue</Link>, by category.</dd></div>
        <div><span className="site-fact-icon"><Icon name="coins" size={20}/></span><dt>Price</dt><dd>${taskOffer.current} per accepted task. Rejected attempts cost nothing. The planned standard price is ${taskOffer.standard}. <Link href="/pricing">See pricing</Link>.</dd></div>
        <div><span className="site-fact-icon"><Icon name="shield" size={20}/></span><dt>Security practices</dt><dd>{COMPLIANCE_LINE} Certification status is stated plainly on the <Link href="/security">security page</Link>.</dd></div>
        <div><span className="site-fact-icon"><Icon name="mail" size={20}/></span><dt>Contact</dt><dd>Email <a href={`mailto:${email}`}>{email}</a>. Every request from this site is an email you review and send yourself.</dd></div>
      </dl>
    </div></section>

    <QuestionsSection title="About" accent="exekova." body="The four questions people ask first." group="About exekova" items={aboutFaq}/>

    <CtaBand/>
    <JsonLd data={schemaForPage(contentPage('/about'), aboutFaq.map(item => ({ q: item.q, a: plain(item.a) })))}/>
  </>;
}
