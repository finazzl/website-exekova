import type { ReactNode } from 'react';
import Breadcrumbs, { type Crumb } from './Breadcrumbs';

type Props = {
  eyebrow: string;
  /** The first line of the title. */
  title: string;
  /** The italic serif second line, in violet. */
  accent?: string;
  lede?: string;
  actions?: ReactNode;
  note?: string;
  trail?: Crumb[];
  /** centered: like the homepage hero. split: copy left, `aside` right. document: compact, for legal pages. */
  layout?: 'centered' | 'split' | 'document';
  aside?: ReactNode;
};

/** The opening of every page outside the homepage, sharing its hero typography. */
export default function PageHero({ eyebrow, title, accent, lede, actions, note, trail, layout = 'centered', aside }: Props) {
  return <section className={`site-hero is-${layout}`} aria-labelledby="page-title"><div className="shell">
    <div className="site-hero-copy">
      {trail && <Breadcrumbs trail={trail}/>}
      <span className="beta-label">{eyebrow}</span>
      <h1 id="page-title"><span>{title}</span>{accent && <em>{accent}</em>}</h1>
      {lede && <p className="site-lede">{lede}</p>}
      {actions && <div className="site-actions">{actions}</div>}
      {note && <p className="site-note">{note}</p>}
    </div>
    {aside && <div className="site-hero-aside">{aside}</div>}
  </div></section>;
}
