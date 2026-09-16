'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMotionPreference } from './useMotionPreference';
import Link from 'next/link';
import Icon from '@/components/Icon';

type OutcomeCase = { slug: string; name: string; problem: string };

export default function OutcomeStories({ provider, reconciliation, controls }: { provider: OutcomeCase; reconciliation: OutcomeCase; controls: OutcomeCase }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const leftY = useTransform(scrollYProgress, [0, 1], [140, -70]);
  const rightY = useTransform(scrollYProgress, [0, 1], [220, -110]);
  const reduced = useMotionPreference();
  return <section className="beta-outcomes" id="task-examples" ref={ref} aria-labelledby="outcomes-title"><div className="shell">
    <div className="beta-heading is-centered"><span className="beta-label">THE BEST THREE IN FINTECH</span><h2 id="outcomes-title">Payment and ledger work,<br/><em>reviewed and verified.</em></h2><p>Three live problems fintech teams hand over first, each timed by someone outside the team.</p></div>
    <div className="outcome-card-field" id="fintech-use-cases">
      <article className="outcome-featured" id="example-bugs"><div className="outcome-featured-copy"><span className="beta-label"><Icon name="coins" size={19}/>FINTECH</span><h3>{provider.name}</h3><p>{provider.problem}</p><Link prefetch={false} href={`/use-cases/${provider.slug}`}>Open the use case<Icon name="arrow" size={17}/></Link></div><div className="outcome-product-art"><div className="sample-checkout"><span className="beta-label">MIGRATION / EXAMPLE</span><h4>Provider API</h4><span>Updated contract</span><div>Capture & refund<Icon name="check" size={14}/></div><span>Sandbox checks</span><div>Success & decline<Icon name="check" size={14}/></div><p><Icon name="check" size={15}/>Evidence attached</p></div><span className="outcome-art-status"><Icon name="shield" size={17}/>Independent review passed</span></div></article>
      <motion.article className="outcome-note outcome-note-right" id="example-features" style={{ y: reduced ? 0 : rightY }}><span className="beta-label"><Icon name="coins" size={18}/>FINTECH</span><h3>{reconciliation.name}</h3><div className="sample-note"><span>RECONCILIATION / EXAMPLE</span><p>Exception reproduced.<br/>Ledger correction tested.</p><small>Regression evidence attached</small></div><p>{reconciliation.problem}</p><Link prefetch={false} href={`/use-cases/${reconciliation.slug}`}>Open the use case<Icon name="arrow" size={16}/></Link></motion.article>
      <motion.article className="outcome-note outcome-note-left" id="example-tests" style={{ y: reduced ? 0 : leftY }}><span className="beta-label"><Icon name="shield" size={18}/>FINTECH</span><h3>{controls.name}</h3><p>{controls.problem}</p><div className="outcome-mini-checks"><span><Icon name="check" size={16}/>Script inventory</span><span><Icon name="check" size={16}/>Detection test evidence</span></div><Link prefetch={false} href={`/use-cases/${controls.slug}`}>Open the use case<Icon name="arrow" size={16}/></Link></motion.article>
    </div>
    <div className="outcomes-actions"><Link prefetch={false} href="/use-cases" className="outcomes-all-link">All Use Cases<Icon name="arrow" size={16}/></Link></div>
  </div></section>;
}
