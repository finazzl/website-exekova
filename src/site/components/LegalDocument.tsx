import Link from 'next/link';
import Icon from '@/components/Icon';
import { inline } from '../lib/inline';
import { legalNav } from '../nav';
import { DEFINITION } from '../lib/seoCopy';
import { legalFaq } from '../lib/pageFaq';
import FaqAccordion from './FaqAccordion';
import PageHero from './PageHero';

export type LegalBlock =
  | { type: 'p'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'table'; head: string[]; rows: string[][] }
  | { type: 'note'; text: string };

export type LegalSection = { id: string; heading: string; blocks: LegalBlock[] };

export type LegalDoc = {
  slug: string;
  kicker: string;
  title: string;
  accent: string;
  lede: string;
  effectiveDate: string;
  version: string;
  /** 'final' renders as in force from the effective date; 'draft' shows a review notice. */
  status: 'draft' | 'final';
  summary?: string[];
  sections: LegalSection[];
  contact: { email: string; note: string };
};

function Block({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case 'p': return <p>{inline(block.text)}</p>;
    case 'h3': return <h3>{block.text}</h3>;
    case 'ul': return <ul>{block.items.map(item => <li key={item}>{inline(item)}</li>)}</ul>;
    case 'ol': return <ol>{block.items.map(item => <li key={item}>{inline(item)}</li>)}</ol>;
    case 'note': return <p className="legal-note"><Icon name="shield" size={14}/>{inline(block.text)}</p>;
    case 'table': return <div className="legal-table-wrap"><table className="legal-table"><thead><tr>{block.head.map(cell => <th key={cell} scope="col">{cell}</th>)}</tr></thead><tbody>{block.rows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => <td key={cellIndex}>{inline(cell)}</td>)}</tr>)}</tbody></table></div>;
  }
}

/** One layout for every legal document: hero, sticky contents, numbered sections, contact. */
export default function LegalDocument({ doc }: { doc: LegalDoc }) {
  return <>
    <PageHero layout="document" eyebrow={doc.kicker} title={doc.title} accent={doc.accent} lede={doc.lede} trail={doc.slug === '/privacy' ? [{ label: doc.title, href: doc.slug }] : [{ label: 'Legal', href: '/privacy' }, { label: doc.title, href: doc.slug }]}/>
    <div className="shell legal-layout">
      <aside className="legal-toc">
        <span>Contents</span>
        <ol>{doc.sections.map(section => <li key={section.id}><a href={`#${section.id}`}>{section.heading}</a></li>)}</ol>
        <nav className="legal-toc-links" aria-label="Other legal documents">{legalNav.filter(link => link.href !== doc.slug).map(link => <Link prefetch={false} href={link.href} key={link.href}>{link.label}</Link>)}</nav>
      </aside>
      <article className="legal-body">
        <dl className="legal-meta"><div><dt>Effective</dt><dd>{doc.effectiveDate}</dd></div><div><dt>Version</dt><dd>{doc.version}</dd></div><div><dt>Applies to</dt><dd>exekova.com and the exekova service</dd></div></dl>
        {doc.status === 'draft' && <p className="legal-notice"><Icon name="clock" size={16}/>This document is a working draft prepared for legal review. Its terms are not in force until the effective date above is confirmed and this notice is removed.</p>}
        {doc.summary && <section className="legal-summary" aria-labelledby={`${doc.slug.slice(1)}-summary`}><h2 id={`${doc.slug.slice(1)}-summary`}>In short</h2><ul>{doc.summary.map(item => <li key={item}><Icon name="check" size={15}/>{item}</li>)}</ul></section>}
        {doc.sections.map((section, index) => <section className="legal-section" id={section.id} key={section.id} aria-labelledby={`${section.id}-title`}>
          <h2 id={`${section.id}-title`}><small>Section {String(index + 1).padStart(2, '0')}</small>{section.heading}</h2>
          {section.blocks.map((block, blockIndex) => <Block block={block} key={blockIndex}/>)}
        </section>)}
        <section className="legal-contact" aria-labelledby="legal-questions-title"><h2 id="legal-questions-title">Questions about this document</h2><p className="legal-definition">{DEFINITION} This document applies to exekova.com and the exekova service.</p><div className="site-faq is-plain"><FaqAccordion groups={[{ title: doc.title, items: legalFaq(doc) }]} name="legal-faq"/></div><p>{doc.contact.note}</p><a href={`mailto:${doc.contact.email}`} className="beta-secondary"><Icon name="mail" size={16}/>{doc.contact.email}</a></section>
      </article>
    </div>
  </>;
}
