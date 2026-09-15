import Link from 'next/link';
import Icon from '@/components/Icon';
import type { Faq } from '../lib/pageFaq';
import Heading from './Heading';
import FaqAccordion from './FaqAccordion';

type Props = { id?: string; label?: string; title: string; accent?: string; body?: string; group: string; items: Faq[]; tone?: 'tight' | 'lilac' | 'mint' };

/** A page's own questions, rendered as native disclosures and mirrored in its FAQPage schema. */
export default function QuestionsSection({ id = 'questions-title', label = 'QUESTIONS', title, accent, body, group, items, tone = 'tight' }: Props) {
  if (!items.length) return null;
  return <section className={`site-section is-${tone}`} aria-labelledby={id}><div className="shell site-faq">
    <Heading id={id} label={label} title={title} accent={accent} body={body}><Link href="/faq" className="site-inline-link">All questions and answers<Icon name="arrow" size={15}/></Link></Heading>
    <FaqAccordion groups={[{ title: group, items }]} name={id}/>
  </div></section>;
}
