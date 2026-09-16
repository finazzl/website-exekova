import type { Metadata } from 'next';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { schemaForPage } from '@/lib/seo';
import { functions, functionsIndex } from '@/site/data/functions';
import { leaders } from '@/site/data/leaders';
import { contentPage, metadataFor } from '@/site/lib/meta';
import { REQUEST_ACCESS } from '@/site/nav';
import JsonLd from '@/site/components/JsonLd';
import PageHero from '@/site/components/PageHero';
import Heading from '@/site/components/Heading';
import Cards from '@/site/components/Cards';
import CtaBand from '@/site/components/CtaBand';
import QuestionsSection from '@/site/components/QuestionsSection';
import { plain } from '@/site/lib/inline';
import { PRICE_ANSWER } from '@/site/lib/seoCopy';

const solutionsFaq = [
  { q: 'Which solution should I start with?', a: 'Start where the backlog waits longest. Engineering and QA are where exekova starts; every function page describes one run from request to verified outcome, with that function’s own definition of done.' },
  { q: 'Do leaders get a different product?', a: 'No. The leader pages show what one verified outcome answers for the CEO, COO, CFO, CIO and CTO: the same run, read from a different chair.' },
  { q: 'Is the price the same for every function?', a: PRICE_ANSWER },
];

export const metadata: Metadata = metadataFor('/solutions');

export default function SolutionsPage() {
  return <>
    <PageHero eyebrow="SOLUTIONS" title="Find the right starting point" accent="for your team." lede={functionsIndex.lede}
      trail={[{ label: 'Solutions', href: '/solutions' }]}
      actions={<><a href={REQUEST_ACCESS} className="beta-button">Start with one task<Icon name="arrow" size={18}/></a><Link prefetch={false} href="/platform" className="beta-secondary">How the platform works<Icon name="arrow" size={15}/></Link></>}/>

    <section className="site-section is-tight" aria-labelledby="functions-title"><div className="shell">
      <Heading id="functions-title" centered wide label="BY FUNCTION" title="Execution capacity" accent="for every function." body={functionsIndex.description}/>
      {functionsIndex.groups.map((group, index) => <section className="site-group" key={group.name} aria-labelledby={`fn-group-${index}`}>
        <h3 id={`fn-group-${index}`}><span>{String(index + 1).padStart(2, '0')}</span>{group.name}</h3>
        <Cards columns={group.slugs.length === 4 ? 4 : 3} items={group.slugs.map(slug => functions.find(item => item.slug === slug)!).map(item => ({ icon: item.icon, kicker: item.tagline, title: item.name, body: item.summary, points: [`Deliverable: ${item.deliverable}`], href: `/solutions/${item.slug}`, linkLabel: `exekova for ${item.name}` }))}/>
      </section>)}
    </div></section>

    <section className="site-section is-lilac" aria-labelledby="leaders-title"><div className="shell">
      <Heading id="leaders-title" centered label="FOR LEADERS" title="Different chair," accent="different question." body="See the outcomes and controls that matter in your leadership role."/>
      <Cards columns={5} items={leaders.map(item => ({ icon: item.icon, kicker: item.eyebrow, title: `${item.headline[0]} ${item.headline[1]}`, body: item.tagline, href: `/solutions/${item.slug}`, linkLabel: item.eyebrow }))}/>
    </div></section>

    <QuestionsSection title="Choosing a" accent="starting point." body="The three questions teams ask before picking a function." group="Solutions" items={solutionsFaq}/>

    <CtaBand title={functionsIndex.cta.headline[0]} accent={functionsIndex.cta.headline[1]} body={functionsIndex.cta.body} secondary={{ href: '/contact', label: 'Talk to the team' }}/>
    <JsonLd data={schemaForPage(contentPage('/solutions'), solutionsFaq.map(item => ({ q: item.q, a: plain(item.a) })))}/>
  </>;
}
