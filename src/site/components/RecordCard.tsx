import Image from 'next/image';
import Icon from '@/components/Icon';

export type RecordCardProps = {
  label: string;
  title: string;
  body?: string;
  checks: string[];
  foot?: string;
  badge?: string;
  /** Icon on the foot line; defaults to the branch mark used for pull requests. */
  footIcon?: string;
};

/**
 * The outcome-record motif the homepage repeats: the exekova mark, a status
 * badge, a task title and the evidence the team receives. Used as the visual
 * on solution, use-case and industry pages so every page shares one artefact.
 */
export default function RecordCard({ label, title, body, checks, foot, badge = 'Example', footIcon = 'branch' }: RecordCardProps) {
  return <div className="site-record">
    <div className="site-record-brand"><Image src="/brand/exekova-mark.webp" width={26} height={26} alt=""/><span>exekova</span><span className="beta-badge" data-status="available">{badge}</span></div>
    <span className="beta-label">{label}</span>
    <h4>{title}</h4>
    {body && <p>{body}</p>}
    <ul>{checks.map(item => <li key={item}><Icon name="check" size={16}/>{item}</li>)}</ul>
    {foot && <div className="site-record-foot"><Icon name={footIcon} size={17}/>{foot}</div>}
  </div>;
}
