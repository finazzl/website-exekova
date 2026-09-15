import { WORKFLOW_STEPS } from '@/beta/data/workflow';

/**
 * Get. Set. Done. as three cards. Pass `details` to replace the generic step
 * copy with page-specific wording (what "Get" means for a fintech bug fix, say).
 */
export default function StepsBand({ details }: { details?: [string, string, string] }) {
  const subjects = ['The task', 'The repository', 'The verified outcome'];
  return <ol className="site-steps" aria-label="The three steps">{WORKFLOW_STEPS.map((step, index) => <li className="site-step" key={step.id}>
    <span>0{index + 1}</span>
    <h3>{step.label}<small>{subjects[index]}</small></h3>
    <p>{details?.[index] ?? step.body}</p>
  </li>)}</ol>;
}
