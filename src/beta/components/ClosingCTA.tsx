import Image from 'next/image';
import Icon from '@/components/Icon';
import { WORKFLOW_SUMMARY } from '../data/workflow';

export default function ClosingCTA() {
  return <section className="beta-closing" aria-labelledby="closing-title">
    <div className="closing-art" aria-hidden="true"><div className="closing-orbit orbit-one"/><div className="closing-orbit orbit-two"/><div className="closing-task-paper"><Icon name="file" size={27}/><span>One well-scoped task</span><i/><i/><i/></div><div className="closing-done-paper"><Image src="/brand/exekova-mark.png" width={48} height={48} alt=""/><strong>Work, done.</strong><span><Icon name="check" size={18}/>Reviewed</span><span><Icon name="check" size={18}/>Verified</span><span><Icon name="branch" size={18}/>Ready for your team</span></div></div>
    <div className="closing-copy"><h2 id="closing-title">You have work to do.<br/><em>Give it exekova.</em></h2><p>Start with one task. Make room for the next thing.</p><a href="#request-access" className="beta-button">Request access<Icon name="arrow" size={18}/></a><span>{WORKFLOW_SUMMARY}</span></div>
  </section>;
}
