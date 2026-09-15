import Image from 'next/image';
import type { CSSProperties } from 'react';
import BrandLogo from '@/components/BrandLogo';
import Icon from '@/components/Icon';
import { EXAMPLES } from '../data/heroDemoStages';
import backdrop from '../assets/workspace-flow.png';

const task=EXAMPLES[0];
export const WORK_EVIDENCE=['Independent review passed','Required checks passed','Acceptance criteria met'];

export function WorkBackdrop({showcase=false}:{showcase?:boolean}) {
  return <><Image className="work-backdrop" src={backdrop} alt="" fill sizes={showcase ? '(max-width: 700px) 100vw, 1160px' : '(max-width: 700px) 100vw, 400px'}/><div className="work-shade"/></>;
}

/** The same product story on the wide comparison and the portrait walkthrough. */
export default function WorkTransformation({step,complete=true,showcase=false,showBackdrop=true}:{step:number;complete?:boolean;showcase?:boolean;showBackdrop?:boolean}) {
  return <div className="work-transformation" data-step={step} data-complete={complete} data-showcase={showcase}>
    {showBackdrop && <WorkBackdrop showcase={showcase}/>}
    <div className="work-scene-content">
      <div className="work-intent"><span><BrandLogo name="Jira" size={16}/>Jira · ENG-142</span><p>The postcode still looks valid after I <mark>change the billing country.</mark> Recheck it, <mark>block invalid submissions,</mark> and <mark>add a regression test.</mark></p></div>
      <div className="work-document" key={step}>
        <div className="work-document-bar"><Image src="/brand/exekova-mark.png" width={24} height={24} alt=""/><span>{step===0 ? 'Task received' : step===1 ? 'Repository selected' : complete ? 'Verified outcome' : 'Checking the outcome'}</span>{step===2 && complete && <Icon name="check" size={16}/>}</div>
        {step===0 ? <><h3>{task.title}</h3><ul>{task.criteria.map((criterion,index)=><li key={criterion} style={{'--line':index} as CSSProperties}><Icon name="check" size={14}/>{criterion}</li>)}</ul></> : step===1 ? <><div className="work-repository"><BrandLogo name="GitHub" size={27}/><h3>acme / checkout</h3><span className="beta-badge" data-status="available">Available</span></div><p>Checkout validation · approved scope</p><div className="work-branch"><Icon name="branch" size={16}/>Isolated task branch</div></> : <><h3>{complete ? 'Checkout validation fixed.' : 'Reviewing the change…'}</h3><ul className="work-evidence">{WORK_EVIDENCE.map((item,index)=><li key={item} data-passed={complete} style={{'--line':index} as CSSProperties}><Icon name={complete?'check':'clock'} size={14}/>{complete ? item : item.replace(' passed','').replace(' met','')+' · Pending'}</li>)}</ul><div className="work-branch"><Icon name="branch" size={16}/>{complete ? 'Pull request ready for your team' : 'Review and checks must pass'}</div></>}
      </div>
    </div>
    <div className="work-status-sticker" key={`${step}-${complete}`}><Icon name={step===2 && complete ? 'check' : step===1 ? 'lock' : 'file'} size={14}/>{step===0 ? 'Acceptance criteria captured' : step===1 ? 'Approved repo. Defined scope.' : complete ? 'Reviewed. Verified. Ready.' : 'Independent review + checks'}</div>
    <div className="work-brand-pill"><Image src="/brand/exekova-mark.png" width={28} height={28} alt=""/><span>exekova</span><i/><i/><i/></div>
    <span className="work-illustration-note">Task workflow</span>
  </div>;
}
