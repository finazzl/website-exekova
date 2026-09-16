import type { Metadata } from 'next';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { schemaForPage } from '@/lib/seo';
import { faqGroups, faqItems } from '@/site/data/faq';
import { plain } from '@/site/lib/inline';
import { contentPage, metadataFor } from '@/site/lib/meta';
import { REQUEST_ACCESS } from '@/site/nav';
import JsonLd from '@/site/components/JsonLd';
import PageHero from '@/site/components/PageHero';
import Heading from '@/site/components/Heading';
import FaqAccordion, { groupId } from '@/site/components/FaqAccordion';
import CtaBand from '@/site/components/CtaBand';

export const metadata: Metadata = metadataFor('/faq');

export default function FaqPage() {
  return <>
    <PageHero eyebrow="QUESTIONS & ANSWERS" title="Clear before" accent="you start." lede="Getting started, scope, review and verification, pricing, integrations and data. If a question is missing, ask it and we will add the answer here."
      actions={<><a href={REQUEST_ACCESS} className="beta-button">Request access<Icon name="arrow" size={18}/></a><Link prefetch={false} href="/contact" className="beta-secondary">Ask a question<Icon name="arrow" size={15}/></Link></>}/>

    <section className="site-section is-tight" aria-labelledby="faq-list-title"><div className="shell site-faq">
      <Heading id="faq-list-title" label="A FEW GOOD QUESTIONS" title="Everything" accent="we get asked." body="Every answer stays inside what the product does today. Planned integrations are labelled planned.">
        <nav className="legal-toc-links" aria-label="Question groups">{faqGroups.map(group => <a key={group.title} href={`#${groupId(group.title)}`}>{group.title}</a>)}</nav>
      </Heading>
      <FaqAccordion groups={faqGroups} name="faq-page"/>
    </div></section>

    <CtaBand title="Still have a question?" accent="Ask the team." body="Every message is an email you review and send yourself. We reply from the same address." primary={{ href: '/contact', label: 'Contact exekova' }} secondary={{ href: REQUEST_ACCESS, label: 'Request access' }} note={undefined} tone="lilac"/>
    <JsonLd data={schemaForPage(contentPage('/faq'), faqItems.map(item => ({ q: item.q, a: plain(item.a) })))}/>
  </>;
}
