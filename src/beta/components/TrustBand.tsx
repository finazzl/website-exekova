import Icon from '@/components/Icon';
import { governanceRules } from '../content/chapters';
import ComplianceLine from '@/site/components/ComplianceLine';

export default function TrustBand() {
  return <section className="beta-trust" id="boundaries" aria-labelledby="trust-title"><div className="shell"><span className="beta-label governance-eyebrow">TRUST, SAFETY & GOVERNANCE</span><div className="trust-panel">
    <h2 id="trust-title">Your code.<br/><em>Your control.</em></h2>
    <div><p>exekova works in the projects and repositories you approve. Your team owns the scope, merge, and release.</p><a href="#faq">Understand how it works<Icon name="arrow" size={16}/></a></div>
    <ul aria-label="Working boundaries">{[{ icon: 'lock', label: 'Approved scope' }, { icon: 'branch', label: 'Isolated branch' }, { icon: 'users', label: 'Human merge' }].map(item => <li key={item.label}><Icon name={item.icon} size={30}/><span>{item.label}</span></li>)}</ul>
  </div><div className="governance-detail"><div className="governance-record"><span className="beta-label">EVIDENCE WITH THE OUTCOME</span><h3>A record your team<br/><em>can inspect.</em></h3><ul>{['The reviewed code revision', 'The independent review result', 'Required test and check results', 'The acceptance decision'].map(item => <li key={item}><Icon name="file" size={18}/>{item}<Icon name="check" size={16}/></li>)}</ul><p>Review and verification evidence accompany the outcome.</p><div style={{ marginTop: 18 }}><ComplianceLine/></div></div><div className="governance-rules"><h3>Clear boundaries.<br/><em>Human-owned decisions.</em></h3><dl>{governanceRules.map(item => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl><a href="#faq">Read the details<Icon name="arrow" size={16}/></a></div></div></div></section>;
}
