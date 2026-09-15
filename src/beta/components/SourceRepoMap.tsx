import Icon from '@/components/Icon';
import content from '../content/beta.json';
import { WORKFLOW_STEPS } from '../data/workflow';
import ToolsRibbon from './ToolsRibbon';
import ComplianceLine from '@/site/components/ComplianceLine';
import styles from '../styles/tools-workflow.module.css';

/** The three steps, as three cards. The tools live in the ribbon above; each card states what the step asks of you and what it guarantees. */
const STEPS = [
  { id: 'task', icon: 'file', subject: 'Task', body: 'Start with a scoped task and clear acceptance criteria.', points: ['One task, one finish line', 'Acceptance criteria travel with it', 'Eligibility confirmed before work starts'] },
  { id: 'repo', icon: 'branch', subject: 'Repo', body: 'Choose the repository where the code change belongs.', points: ['Approved repositories only', 'An isolated branch for every task', 'Access scoped to what you grant'] },
  { id: 'outcome', icon: 'shield', subject: 'Verified Outcome', body: 'Review a verified pull request. Your team owns the merge.', points: ['Code change included', 'Independent review', 'Required check evidence', 'Your team owns the merge'] },
];

export default function SourceRepoMap() {
  const c = content.map;
  return <section className={`beta-section beta-integrations ${styles.section}`} id="sources" aria-labelledby="integrations-title">
    <div className="shell">
      <div className={styles.intro}>
        <div className={styles.copy}>
          <span className={`beta-label ${styles.eyebrow}`}>{c.eyebrow}</span>
          <ol className={styles.chips} aria-label="Your three-step workflow">{WORKFLOW_STEPS.map((step, index) => <li key={step.id}><Icon name={STEPS[index].icon} size={18}/><span>{step.label}</span></li>)}</ol>
          <h2 id="integrations-title">{c.headline[0]}<br/><em>{c.headline[1]}</em></h2>
          <p>{c.body}</p>
          <a href="#request-access" className={`beta-button ${styles.cta}`}>{c.cta}<Icon name="arrow" size={18}/></a>
        </div>
        <ToolsRibbon/>
      </div>
      <ol className={styles.steps} aria-label="Get. Set. Done.">
        {WORKFLOW_STEPS.map((step, index) => {
          const detail = STEPS[index];
          return <li className={styles.step} key={step.id} aria-labelledby={`tools-${detail.id}-title`}>
            <span className={styles.stepIndex}>{String(index + 1).padStart(2, '0')}</span>
            <span className={styles.stepIcon}><Icon name={detail.icon} size={28}/></span>
            <h3 id={`tools-${detail.id}-title`}>{step.label}<em>{detail.subject}</em></h3>
            <p>{detail.body}</p>
            <ul className={styles.points}>{detail.points.map(point => <li key={point}><Icon name="check" size={16}/><span>{point}</span></li>)}</ul>
          </li>;
        })}
      </ol>
      <div className={styles.foot}>
        <ComplianceLine tone="dark"/>
      </div>
    </div>
  </section>;
}
