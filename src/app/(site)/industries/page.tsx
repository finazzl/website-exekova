import type { Metadata } from 'next';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { schemaForPage } from '@/lib/seo';
import { caseBySlug, casesFor, casesIndex } from '@/site/data/cases';
import { industries, industriesIndex, industryGroupsOrdered } from '@/site/data/industries';
import { contentPage, metadataFor } from '@/site/lib/meta';
import { REQUEST_ACCESS } from '@/site/nav';
import JsonLd from '@/site/components/JsonLd';
import PageHero from '@/site/components/PageHero';
import Heading from '@/site/components/Heading';
import Cards from '@/site/components/Cards';
import StepsBand from '@/site/components/StepsBand';
import CtaBand from '@/site/components/CtaBand';
import QuestionsSection from '@/site/components/QuestionsSection';
import { plain } from '@/site/lib/inline';
import { list } from '@/site/lib/seoCopy';

const industriesFaq = [
  { q: 'Does exekova need industry-specific setup?', a: 'No. Every industry page describes the same run: a scoped task from Jira or the Work Intent form, an isolated branch in a repository you approve, independent review and verification, and a pull request with its evidence. The controls your industry expects stay with your team.' },
  { q: 'Which industries are covered?', a: `${list(industries.map(item => item.name))}. Cross-industry problems such as regression debt and dependency remediation have their own use cases.` },
  { q: 'What stays with your team?', a: 'Scope, the merge, the release and every regulatory sign-off. exekova executes inside the boundaries you set and never merges or deploys.' },
];

export const metadata: Metadata = metadataFor('/industries');

export default function IndustriesPage() {
  const cross = industriesIndex.cross.ids.map(slug => caseBySlug(slug)).filter(Boolean);
  return <>
    <PageHero eyebrow={industriesIndex.eyebrow.toUpperCase()} title={industriesIndex.headline[0]} accent={industriesIndex.headline[1]} lede={industriesIndex.lede}
      trail={[{ label: 'Industries', href: '/industries' }]}
      actions={<><a href={REQUEST_ACCESS} className="beta-button">Start with one task<Icon name="arrow" size={18}/></a><Link href="/solutions/engineering" className="beta-secondary">Engineering solution<Icon name="arrow" size={15}/></Link></>}/>

    <section className="site-section is-tight" aria-labelledby="explorer-title"><div className="shell">
      <Heading id="explorer-title" centered label={industriesIndex.explorer.label.toUpperCase()} title={industriesIndex.explorer.headline[0]} accent={industriesIndex.explorer.headline[1]} body={industriesIndex.explorer.body}/>
      {industryGroupsOrdered.map((group, index) => <section className="site-group" key={group.name} aria-labelledby={`group-${index}`}>
        <h3 id={`group-${index}`}><span>{String(index + 1).padStart(2, '0')}</span>{group.name}</h3>
        <Cards items={group.industries.map(item => ({ icon: item.icon, title: item.name, body: item.tagline, points: casesFor('industry', item.slug).map(entry => entry.name), href: `/industries/${item.slug}`, linkLabel: `Explore ${item.name.toLowerCase()}` }))}/>
      </section>)}
    </div></section>

    <section className="site-section is-lilac" aria-labelledby="cross-title"><div className="shell">
      <Heading id="cross-title" centered wide label={industriesIndex.cross.label.toUpperCase()} title={industriesIndex.cross.headline[0]} accent={industriesIndex.cross.headline[1]} body={industriesIndex.cross.body}/>
      <Cards columns={2} items={cross.map(item => ({ icon: 'layers', kicker: 'Cross-industry', title: item!.name, body: item!.problem, points: item!.keeps, href: `/use-cases/${item!.slug}`, linkLabel: 'Open the use case' }))}/>
    </div></section>

    <section className="site-section" aria-labelledby="path-title"><div className="shell">
      <Heading id="path-title" centered label="ONE ACCEPTANCE PATH" title="Get the task. Set the repo." accent="Come back to a verified outcome." body="The platform is the same everywhere. What changes is the systems the work touches and who has to sign off."/>
      <StepsBand/>
      <p className="site-note"><Icon name="shield" size={15}/>{casesIndex.note}</p>
    </div></section>

    <QuestionsSection title="Before you pick" accent="an industry." body="The same run, inside the controls each sector expects." group="Industries" items={industriesFaq}/>

    <CtaBand title="Which system is" accent="waiting the longest?" body="That is usually where the execution constraint is most expensive." secondary={{ href: '/use-cases', label: 'All use cases' }}/>
    <JsonLd data={schemaForPage(contentPage('/industries'), industriesFaq.map(item => ({ q: item.q, a: plain(item.a) })))}/>
  </>;
}
