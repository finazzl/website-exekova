import type { Metadata } from 'next';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { getSite } from '@/lib/content';
import { schemaForPage } from '@/lib/seo';
import { contactEmail, contentPage, metadataFor } from '@/site/lib/meta';
import { REQUEST_ACCESS } from '@/site/nav';
import JsonLd from '@/site/components/JsonLd';
import PageHero from '@/site/components/PageHero';
import ContactForm from '@/site/components/ContactForm';
import CtaBand from '@/site/components/CtaBand';
import QuestionsSection from '@/site/components/QuestionsSection';
import { plain } from '@/site/lib/inline';

const contactFaq = [
  { q: 'What happens when I send the form?', a: 'It opens a ready-to-send email in your own mail client, addressed to the team. Nothing is sent from this site and no message is stored here, so you can read and edit it before it goes.' },
  { q: 'What should a first task include?', a: 'The repository, the change you want and acceptance criteria your team can verify. A bug fix, a small feature or focused test coverage is the right size. Eligibility and repository access are confirmed before work starts.' },
  { q: 'Where do privacy requests go?', a: 'To the same address, with “exekova privacy request” as the subject. The Privacy Policy and the Data Processing Addendum describe how they are handled.' },
];

export const metadata: Metadata = metadataFor('/contact');

export default function ContactPage() {
  const email = contactEmail();
  const signInHref = getSite().nav.signIn.href as string;
  const privacyMail = `mailto:${email}?subject=${encodeURIComponent('exekova privacy request')}`;
  return <>
    <PageHero eyebrow="CONTACT" title="Talk to the team." accent="Start with one task." lede="Every message from this site is an email you review and send yourself. We reply from the same address."
      trail={[{ label: 'Contact', href: '/contact' }]}/>

    <section className="site-section is-tight" id="contact-channels" aria-label="Contact form and channels"><div className="shell contact-layout">
      <ContactForm email={email}/>
      <div className="contact-channels">
        <article className="contact-channel"><span><Icon name="send" size={20}/></span><div><h3>Request access</h3><p>Bring one well-scoped task with its acceptance criteria. Eligibility and repository access are confirmed before work starts.</p><a href={REQUEST_ACCESS}>Open the access request<Icon name="arrow" size={14}/></a></div></article>
        <article className="contact-channel"><span><Icon name="mail" size={20}/></span><div><h3>Email the team</h3><p>For anything the form does not cover, write to us directly.</p><a href={`mailto:${email}`}>{email}<Icon name="arrow" size={14}/></a></div></article>
        <article className="contact-channel"><span><Icon name="shield" size={20}/></span><div><h3>Privacy and legal</h3><p>Data requests, questions about a document, or anything for the people who look after them. See the <Link href="/privacy">Privacy Policy</Link> and the <Link href="/dpa">Data Processing Addendum</Link>.</p><a href={privacyMail}>Send a privacy request<Icon name="arrow" size={14}/></a></div></article>
        <article className="contact-channel"><span><Icon name="lock" size={20}/></span><div><h3>Already a customer?</h3><p>Sign in to the service to work on your tasks and outcomes.</p><Link href={signInHref}>Sign in<Icon name="arrow" size={14}/></Link></div></article>
        <article className="contact-channel"><span><Icon name="search" size={20}/></span><div><h3>Questions first?</h3><p>Getting started, scope, review and verification, pricing, integrations and data are all answered on one page.</p><Link href="/faq">Read the questions and answers<Icon name="arrow" size={14}/></Link></div></article>
      </div>
    </div></section>

    <QuestionsSection tone="lilac" title="Before you" accent="write." body="How messages from this site work." group="Contact" items={contactFaq}/>

    <CtaBand primary={{ href: REQUEST_ACCESS, label: 'Request access' }} secondary={{ href: '/platform', label: 'How the platform works' }}/>
    <JsonLd data={schemaForPage(contentPage('/contact'), contactFaq.map(item => ({ q: item.q, a: plain(item.a) })))}/>
  </>;
}
