'use client';
import ResponsivePhoto from '@/components/ResponsivePhoto';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { teamRoles } from '../content/chapters';
import { leaders } from '@/site/data/leaders';
import { useMotionPreference } from './useMotionPreference';
const backdrop = 'team-room' as const;

function OutcomeVisual({ index }: { index: number }) {
  const current = teamRoles[index];
  return <div className="team-outcome-visual">
    <ResponsivePhoto name={backdrop} alt="" sizes="(max-width: 700px) 100vw, 620px" className="chapter-photo"/>
    <div className="team-photo-shade"/>
    <div className="team-question" key={`question-${index}`}>{current.title}</div>
    <div className="team-outcome-record" key={index}>
      <div><Image src="/brand/exekova-mark.webp" width={28} height={28} alt=""/><span>exekova</span><span className="beta-badge" data-status="available">Engineering</span></div>
      <span className="beta-label">FOR THE {current.role}</span>
      <h3>{current.example}</h3>
      <ul>{current.evidence.map(item => <li key={item}><Icon name="check" size={17}/>{item}</li>)}</ul>
      <span className="team-record-note">Example outcome summary</span>
    </div>
    <div className="team-delivery-pill"><Icon name="branch" size={17}/>Ready for your team’s decision.</div>
  </div>;
}

export default function TeamValue() {
  const [selected, setSelected] = useState(0);
  const story = useRef<HTMLDivElement>(null);
  const manualUntil = useRef(0);
  const reduced = useMotionPreference();
  useEffect(() => {
    if (reduced !== false) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      if (innerWidth <= 900 || performance.now() < manualUntil.current || !story.current) return;
      const rows = [...story.current.querySelectorAll<HTMLElement>('.team-role-story')];
      const bounds = story.current.getBoundingClientRect();
      if (bounds.top > innerHeight || bounds.bottom < 0) return;
      const middle = innerHeight / 2;
      let nearest = 0, distance = Infinity;
      rows.forEach((row, index) => { const r = row.getBoundingClientRect(); const d = Math.abs(r.top + r.height / 2 - middle); if (d < distance) { nearest = index; distance = d; } });
      setSelected(nearest);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener('scroll', schedule, { passive: true });
    schedule();
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); };
  }, [reduced]);
  function select(index: number) {
    manualUntil.current = reduced ? 0 : performance.now() + 700;
    setSelected(index);
    if (innerWidth > 900) story.current?.querySelectorAll('.team-role-story')[index]?.scrollIntoView({ block: 'center', behavior: reduced ? 'instant' : 'smooth' });
  }
  return <section className="beta-section beta-team team-reference-story" id="leadership" aria-labelledby="team-title"><div className="shell">
    <div className="beta-heading is-centered"><span className="beta-label">BUILT FOR YOUR TEAM</span><h2 id="team-title">Different responsibilities.<br/><em>One clear outcome.</em></h2><p>For the people setting direction, building software, and keeping work moving.</p><a href="#request-access" className="beta-button">Bring your team’s first task<Icon name="arrow" size={18}/></a></div>
    <div className="team-story-layout" ref={story}>
      <div className="team-value-panel" id="team-value-panel" data-role={teamRoles[selected].role} aria-live="polite"><OutcomeVisual index={selected}/></div>
      <div className="team-role-buttons" aria-label="Explore value for your role">{teamRoles.map((item, index) => <article className="team-role-story" data-active={selected === index} key={item.role}>
        <div className="team-mobile-visual"><OutcomeVisual index={index}/></div>
        <div className="team-value-copy"><button type="button" aria-label={item.role} aria-pressed={selected === index} aria-controls="team-value-panel" onClick={() => select(index)}><Icon name={item.icon} size={17}/>{item.role}</button><h3>{item.title}</h3><p className="team-pain">{item.pain}</p><p>{item.value}</p>{leaders.find(entry => entry.role === item.role) && <Link prefetch={false} href={`/solutions/${leaders.find(entry => entry.role === item.role)!.slug}`}>For the {item.role}: read the full picture<Icon name="arrow" size={15}/></Link>}</div>
      </article>)}</div>
    </div>
  </div></section>;
}
