'use client';
import { useState } from 'react';
import Icon from '@/components/Icon';
import content from '../content/beta.json';

export default function ReviewDemo() {
  const [corrected, setCorrected] = useState(true);
  const c = content.proof;
  return <div className="review-demo" data-corrected={corrected}>
    <span className="beta-label">{c.label}</span>
    <div className="review-tabs" aria-label="Review example">
      {c.tabs.map((tab, index) => <button type="button" key={tab} aria-pressed={corrected === Boolean(index)} onClick={() => setCorrected(Boolean(index))}>{tab}</button>)}
    </div>
    <div className="review-content" aria-live="polite">
      <div className="review-verdict"><span><Icon name={corrected ? 'shield' : 'eye'} size={24} /></span><div><h3>{corrected ? c.accepted : c.rejected}</h3><p>{corrected ? c.corrected : c.finding}</p></div></div>
      <ul>{c.rows.map(row => <li key={row}><span>{row}</span><strong><Icon name={corrected ? 'check' : 'close'} size={15} />{corrected ? 'Passed' : 'Needs correction'}</strong></li>)}</ul>
      <div className="review-result"><Icon name={corrected ? 'branch' : 'reset'} size={17} />{corrected ? c.ready : c.retry}<span>{corrected ? 'Evidence attached' : '$0 accepted work'}</span></div>
    </div>
    <p className="beta-fine">{c.foot}</p>
  </div>;
}
