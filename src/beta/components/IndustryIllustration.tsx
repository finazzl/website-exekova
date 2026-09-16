import ResponsivePhoto from '@/components/ResponsivePhoto';
import Image from 'next/image';
import Icon from '@/components/Icon';
const teamRoom = 'team-room' as const;
const operationsRoom = 'operations-room' as const;

const examples = [
  { title: 'Make ledger rounding consistent.', brief: 'Apply the agreed rounding rule to payment totals. Cover the boundary cases with regression tests.', checks: ['Agreed calculation rules', 'Boundary cases covered', 'Review evidence attached'] },
  { title: 'Keep selected filters.', brief: 'Preserve the selected filters when moving to the next page. Add a regression test.', checks: ['Filters persist between pages', 'Regression test included', 'Required checks pass'] },
  { title: 'Keep tracking events in order.', brief: 'Handle duplicate tracking events without changing the latest shipment status.', checks: ['Duplicate events handled', 'Integration tests included', 'Outcome ready for review'] },
];

export default function IndustryIllustration({ index }: { index: number }) {
  const example = examples[index];
  return <div className="industry-story-visual" data-scene={index}>
    {index === 0 && <ResponsivePhoto name={teamRoom} alt="" sizes="(max-width: 700px) 100vw, 667px" className="chapter-photo"/>}
    <div className="industry-demo-sheet">
      <div className="industry-demo-brand"><Image src="/brand/exekova-mark.webp" width={30} height={30} alt=""/><span>exekova</span><span>Example task</span></div>
      <h4>{example.title}</h4><p>{example.brief}</p>
      <ul>{example.checks.map(item => <li key={item}><Icon name="check" size={16}/>{item}</li>)}</ul>
      <div className="industry-demo-outcome"><Icon name="branch" size={19}/><span>One scoped change.<br/>Evidence for your team.</span><Icon name="arrow" size={19}/></div>
    </div>
  </div>;
}

export function IndustryDelivery() {
  return <div className="industry-delivery">
    <h3>Your business context.<br/><em>Your standards, preserved.</em></h3>
    <div className="industry-delivery-grid">
      <div className="industry-delivery-copy"><div className="industry-control-chips"><span><Icon name="file" size={16}/>Scoped</span><span><Icon name="shield" size={16}/>Reviewed</span><span><Icon name="check" size={16}/>Verified</span></div><h4>Your work.<br/><em>Your team’s approval.</em></h4><p>Bring a scoped software task. Keep your existing risk, validation and release approvals.</p><a href="#request-access" className="beta-button">Discuss your use case<Icon name="arrow" size={18}/></a></div>
      <div className="industry-delivery-visual">
        <ResponsivePhoto name={operationsRoom} alt="" sizes="(max-width: 700px) 100vw, 708px" className="chapter-photo"/>
        <div className="industry-evidence-window"><div className="industry-window-sidebar"><Image src="/brand/exekova-mark.webp" width={34} height={34} alt=""/><span>exekova</span><span><Icon name="file" size={14}/>Task</span><span><Icon name="branch" size={14}/>Repository</span><span><Icon name="check" size={14}/>Outcome</span></div><div className="industry-window-main"><span className="beta-label">EXAMPLE OUTCOME</span><h4>Tracking events.<br/><em>Verified.</em></h4><p>A focused change, with the evidence to review it.</p><ul><li><Icon name="check" size={16}/>Independent review</li><li><Icon name="check" size={16}/>Required checks</li><li><Icon name="check" size={16}/>Acceptance criteria</li></ul><div className="industry-window-footer"><Icon name="branch" size={18}/>Your team owns the merge.</div></div></div>
        <div className="industry-acceptance-receipt"><span>Acceptance record</span><Icon name="check" size={40}/><h4>A verified<br/><em>outcome.</em></h4><p>Code change.<br/>Review evidence.<br/>Check results.</p><div><Image src="/brand/exekova-mark.webp" width={30} height={30} alt=""/>exekova</div></div>
      </div>
    </div>
  </div>;
}
