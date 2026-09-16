'use client';

import Link from 'next/link';
import Icon from '../Icon';
import { ACCENT_HEX, ACCENT_TEXT_HEX } from '../sections/primitives';
import './executive-lens.css';

/**
 * One piece of work, read from five chairs.
 *
 * This replaces the rubric section that used to close each use case. That
 * section mapped the page against an internal marketing checklist and linked to
 * `homepager.html` by name - working material, not something a buyer asked for.
 * An executive reading a use case wants to know what this particular run answers
 * for them, so each card states that chair's question and points at the part of
 * the record that settles it.
 */

type Role = {
  role: string;
  icon: string;
  accent?: string;
  question: string;
  answer: string;
  href?: string;
  hrefLabel?: string;
};

export default function ExecutiveLens({ data, idPrefix }: { data: any; idPrefix: string }) {
  if (!data?.roles?.length) return null;
  return (
    <section className="xl-lens" id={`${idPrefix}-lens`} aria-labelledby={`${idPrefix}-lens-title`}>
      <div className="shell">
        <div className="xl-head">
          <span className="xl-kicker">{data.label}</span>
          <h2 id={`${idPrefix}-lens-title`}><span>{data.title}</span><em>{data.accent}</em></h2>
          {data.body && <p>{data.body}</p>}
        </div>

        <ul className="xl-grid">
          {data.roles.map((r: Role) => {
            const hue = ACCENT_HEX[r.accent ?? 'violet'] ?? ACCENT_HEX.violet;
            const ink = ACCENT_TEXT_HEX[r.accent ?? 'violet'] ?? ACCENT_TEXT_HEX.violet;
            return (
              <li key={r.role} style={{ '--role-hue': hue, '--role-ink': ink } as React.CSSProperties}>
                <div className="xl-role">
                  <span className="xl-role-icon"><Icon name={r.icon} size={17} /></span>
                  <strong>{r.role}</strong>
                </div>
                <p className="xl-question">{r.question}</p>
                <p className="xl-answer">{r.answer}</p>
                {r.href && <Link prefetch={false} href={r.href} className="xl-link">{r.hrefLabel ?? 'See the record'}<Icon name="arrow" size={13} /></Link>}
              </li>
            );
          })}
        </ul>

        {data.note && <p className="xl-note"><Icon name="shield" size={13} />{data.note}</p>}
      </div>
    </section>
  );
}
