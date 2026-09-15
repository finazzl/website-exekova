import Icon from '@/components/Icon';
import { WORKFLOW_SUMMARY } from '../data/workflow';

export default function ProductVision() {
  return <section className="beta-section beta-vision" id="vision" aria-labelledby="vision-title"><div className="shell">
    <div className="beta-heading is-centered"><span className="beta-label">AUTONOMOUS WORK EXECUTION PLATFORM</span><h2 id="vision-title">Engineering today.<br/><em>A bigger ambition tomorrow.</em></h2><p>exekova’s direction is to turn defined enterprise work into verified outcomes across teams and systems.</p></div>
    <div className="vision-panels"><article className="vision-today"><span className="beta-badge" data-status="available">Available today</span><Icon name="code" size={34}/><h3>Scoped engineering work.</h3><p>Jira or our Work Intent form. An approved GitHub repository. A verified pull request with evidence.</p><ul><li><Icon name="check" size={16}/>Bug fixes, small features, focused tests</li><li><Icon name="check" size={16}/>Independent review and required checks</li><li><Icon name="check" size={16}/>Your team owns the merge</li></ul></article>
      <article className="vision-tomorrow"><span className="vision-badge">Longer-term vision</span><Icon name="layers" size={34}/><h3>Broader enterprise work.</h3><p>Defined work across business tools, operational teams, and industry workflows, with clear acceptance criteria and accountable outcomes.</p><div className="vision-domains"><span>Business systems</span><span>Operations</span><span>Industry workflows</span></div><p className="vision-boundary">A product direction, not yet available. No availability date is committed.</p></article></div>
    <p className="vision-journey">{WORKFLOW_SUMMARY}</p><a href="#request-access" className="beta-button">Start with an engineering task<Icon name="arrow" size={18}/></a>
  </div></section>;
}
