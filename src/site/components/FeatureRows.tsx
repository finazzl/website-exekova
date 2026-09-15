import type { ReactNode } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import RecordCard, { type RecordCardProps } from './RecordCard';

export type FeatureRow = {
  eyebrow: string;
  title: string;
  accent?: string;
  body: string;
  points?: string[];
  link?: { href: string; label: string };
  /** Either a ready-made visual or the props for the shared record card. */
  visual?: ReactNode;
  record?: RecordCardProps;
  tone?: 'lilac' | 'mint' | 'ink';
};

/** Alternating copy-and-visual rows, the pattern the reference site uses for audience pages. */
export default function FeatureRows({ rows }: { rows: FeatureRow[] }) {
  return <div className="site-rows">{rows.map(row => <article className="site-row" key={row.title}>
    <div className="site-row-copy">
      <span className="beta-label">{row.eyebrow}</span>
      <h3>{row.title}{row.accent && <> <em>{row.accent}</em></>}</h3>
      <p>{row.body}</p>
      {row.points && <ul>{row.points.map(point => <li key={point}><Icon name="check" size={16}/>{point}</li>)}</ul>}
      {row.link && <Link href={row.link.href}>{row.link.label}<Icon name="arrow" size={15}/></Link>}
    </div>
    <div className={`site-row-visual is-${row.tone ?? 'lilac'}`}>{row.visual ?? (row.record && <RecordCard {...row.record}/>)}</div>
  </article>)}</div>;
}
