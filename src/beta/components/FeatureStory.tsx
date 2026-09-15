'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import BrandLogo from '@/components/BrandLogo';
import Icon from '@/components/Icon';
import ReviewDemo from './ReviewDemo';
import { FEATURED_TASK_SOURCES } from '../data/connectors';
import ConnectorMark from './ConnectorMark';

const features = [
  { title: 'Your task. Your tools.', copy: 'Jira, Slack, Teams, Excel, or our Work Intent form. Start with Jira or the Work Intent form today; Slack, Teams, and Excel intake are planned.', link: 'See integration status', href: '#sources' },
  { title: 'A repo you choose.', copy: 'Connect an approved GitHub repository. The code change takes shape on an isolated task branch, within the scope you set.', link: 'Explore the workflow', href: '#how-it-works' },
  { title: 'A second look, built in.', copy: 'Every attempt goes through independent review. If an issue is found, corrections must pass review and verification again.', link: 'How acceptance works', href: '#faq' },
  { title: 'Done comes with proof.', copy: 'A pull request with the reviewed code, required check results, and an acceptance record. Your team decides what to merge.', link: 'See pricing', href: '#pricing' },
];

function FeatureVisual({ index }: { index: number }) {
  return <div className="feature-visual" data-feature={index}>
    {index === 0 ? <div className="feature-task"><div className="feature-tool-pills">{FEATURED_TASK_SOURCES.map(source => <span key={source.name} role="img" aria-label={source.name}><ConnectorMark connector={source} size={28}/></span>)}</div><div className="feature-brief"><span className="beta-label">WORK INTENT / DONE MEANS</span><p>Recheck the postcode when the country changes.</p><span><Icon name="check" size={16}/>Add a regression test.</span></div></div> :
    index === 1 ? <div className="feature-repo"><BrandLogo name="GitHub" size={44}/><strong>acme / checkout</strong><span className="beta-badge" data-status="available">GitHub · Available</span><div><Icon name="branch" size={18}/>Isolated task branch</div><p><Icon name="lock" size={15}/>Approved scope</p></div> :
    index === 2 ? <ReviewDemo/> :
    <div className="feature-evidence"><div><Image src="/brand/exekova-mark.png" width={32} height={32} alt=""/><span>exekova</span><span className="feature-verified"><Icon name="check" size={14}/>Verified</span></div><h3>Checkout validation fixed.</h3><ul>{['Independent review passed', 'Required checks passed', 'Acceptance criteria met'].map(item => <li key={item}><Icon name="check" size={16}/>{item}</li>)}</ul><p><Icon name="branch" size={16}/>Pull request ready for your team</p></div>}
    <span className="feature-illustration-label">Task workflow</span>
  </div>;
}

export default function FeatureStory() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const items = ref.current?.querySelectorAll<HTMLElement>('.feature-story-item');
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
    }, { rootMargin: '-25% 0px -35% 0px', threshold: 0 });
    items?.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, []);
  return <section className="beta-features beta-section" id="features" aria-labelledby="features-title"><div className="shell">
    <div className="beta-heading is-centered"><span className="beta-label">BUILT AROUND YOUR WORK</span><h2 id="features-title">Your task. Your standards.<br/><em>Your kind of done.</em></h2></div>
    <div className="feature-story" ref={ref}>
      <div className="feature-sticky-visual"><FeatureVisual index={active}/></div>
      <div className="feature-story-items">{features.map((item, index) => <article key={item.title} className="feature-story-item" data-index={index} data-active={active === index} id={`feature-${index + 1}`}>
        <div className="feature-mobile-visual"><FeatureVisual index={index}/></div>
        <div className="feature-story-copy"><h3>{item.title}</h3><p>{item.copy}</p><a href={item.href}>{item.link}<Icon name="arrow" size={16}/></a></div>
      </article>)}</div>
    </div>
  </div></section>;
}
