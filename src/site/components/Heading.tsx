import type { ReactNode } from 'react';

type Props = { label?: string; title: string; accent?: string; body?: string; centered?: boolean; wide?: boolean; id: string; children?: ReactNode };

/** A section heading in the homepage's voice: label, two-line title, short body. */
export default function Heading({ label, title, accent, body, centered, wide, id, children }: Props) {
  return <div className={`beta-heading${centered ? ' is-centered' : ''}${wide ? ' is-wide' : ''}`}>
    {label && <span className="beta-label">{label}</span>}
    <h2 id={id}>{title}{accent && <><br/><em>{accent}</em></>}</h2>
    {body && <p>{body}</p>}
    {children}
  </div>;
}
