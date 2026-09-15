import type { RunStep } from '../data/cases';

/** A case's stages (Plan, Assemble, Execute, Review, Accept) as numbered cards. */
export default function RunSteps({ steps, label = 'How the work runs' }: { steps: RunStep[]; label?: string }) {
  return <ol className={`site-steps ${steps.length === 4 ? 'is-four' : 'is-five'}`} aria-label={label}>{steps.map((step, index) => <li className="site-step" key={index}>
    <span>{String(index + 1).padStart(2, '0')}</span>
    <h3>{step.stage ?? `Step ${index + 1}`}</h3>
    <p>{step.text}</p>
  </li>)}</ol>;
}
