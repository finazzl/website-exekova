import Link from 'next/link';
import Icon from '@/components/Icon';
import { WORKFLOW_SUMMARY } from '@/beta/data/workflow';
import { REQUEST_ACCESS } from '../nav';
import { DEFINITION_LONG } from '../lib/seoCopy';

type Props = {
  title?: string;
  accent?: string;
  body?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
  note?: string;
  tone?: 'mint' | 'violet' | 'lilac';
};

/** The closing band on every page outside the homepage. */
export default function CtaBand({ title = 'You have work to do.', accent = 'Give it exekova.', body = 'Start with one task. Make room for the next thing.', primary = { href: REQUEST_ACCESS, label: 'Request access' }, secondary, note = WORKFLOW_SUMMARY, tone = 'mint' }: Props) {
  return <section className={`site-cta is-${tone}`} aria-labelledby="cta-title"><div className="shell"><div>
    <h2 id="cta-title">{title}<br/><em>{accent}</em></h2>
    <p>{body}</p>
    <div className="site-actions">
      <a href={primary.href} className="beta-button">{primary.label}<Icon name="arrow" size={18}/></a>
      {secondary && <Link href={secondary.href} className="beta-secondary">{secondary.label}<Icon name="arrow" size={15}/></Link>}
    </div>
    {note && <small>{note}</small>}
    <p className="site-definition">{DEFINITION_LONG}</p>
  </div></div></section>;
}
