'use client';

import { useState } from 'react';
import Image from 'next/image';
import Icon from '@/components/Icon';
import { taskOffer } from '../data/offer';
import backdrop from '../assets/workspace-flow.png';

export default function AcceptedWorkMeter() {
  const [accepted, setAccepted] = useState(true);
  const units = accepted ? 1 : 0;
  return <div className="accepted-work-story" id="accepted-work">
    <div className="acceptance-comparison" aria-label="Compare accepted and rejected work">
      <button type="button" className="acceptance-card" data-outcome="accepted" aria-pressed={accepted} onClick={() => setAccepted(true)}><strong>${taskOffer.current}</strong><span className="acceptance-card-label">Accepted task</span><span className="acceptance-unit">1 accepted task</span><span className="acceptance-card-action">View accepted<Icon name="arrow" size={15}/></span></button>
      <div className="accepted-work-meter" id="accepted-work-meter" data-outcome={accepted ? 'accepted' : 'rejected'}>
        <Image src={backdrop} alt="" fill sizes="296px" className="chapter-photo"/>
        <div className="meter-heading"><Image src="/brand/exekova-mark.png" width={27} height={27} alt=""/><span>exekova</span></div>
        <div className="meter-receipt" role="status" aria-live="polite" aria-atomic="true">
          <span className="beta-label">ACCEPTED-WORK METER</span>
          <div className="meter-reading"><strong data-meter-units>{units}</strong><span>accepted {units === 1 ? 'task' : 'tasks'}</span><strong data-meter-amount>${units * taskOffer.current}<small>USD</small></strong></div>
          <div className="meter-receipt-status"><Icon name={accepted ? 'check' : 'reset'} size={14}/>{accepted ? 'Reviewed. Verified. Accepted.' : 'Review or checks need correction.'}</div>
        </div>
        <button type="button" className="meter-play" onClick={() => setAccepted(value => !value)} aria-label={accepted ? 'Show rejected attempt' : 'Show accepted task'}><Icon name="reset" size={18}/></button>
        <span className="meter-illustration">Example acceptance record</span>
      </div>
      <button type="button" className="acceptance-card" data-outcome="rejected" aria-pressed={!accepted} onClick={() => setAccepted(false)}><strong>$0</strong><span className="acceptance-card-label">Rejected attempt</span><span className="acceptance-unit">0 accepted tasks</span><span className="acceptance-card-action">View rejected<Icon name="arrow" size={15}/></span></button>
    </div>
    <p className="meter-explanation">{accepted ? `An accepted outcome adds one task to the meter. Amount: $${taskOffer.current} USD.` : 'A rejected attempt adds zero accepted tasks. Amount: $0 USD.'} No charge is made by this demonstration.</p>
  </div>;
}
