/** Illustrative product states; no connection to customer systems. */
import { WORKFLOW_STEPS } from './workflow';
export const EXAMPLES = [
  { id: 'bug', label: 'Bug fix', title: 'Fix checkout validation', brief: 'Changing the billing country leaves the old postcode marked as valid.', criteria: ['Recheck postcode when country changes', 'Block invalid submissions', 'Add a regression test'], outcome: 'Checkout validation fixed', files: 'Validation updated · regression test added' },
  { id: 'feature', label: 'Small feature', title: 'Add a note character count', brief: 'Show how much space is left while someone writes an order note.', criteria: ['Show the remaining characters', 'Enforce the existing note limit', 'Cover the limit with a test'], outcome: 'Note character count added', files: 'Note field updated · boundary test added' },
  { id: 'tests', label: 'Test coverage', title: 'Cover empty search results', brief: 'The empty search state has no regression coverage.', criteria: ['Check the empty-state message', 'Keep the search input usable', 'Cover clearing the search'], outcome: 'Empty search state covered', files: 'Regression tests added · checks recorded' },
] as const;
export const STAGES = WORKFLOW_STEPS.map((step, index) => ({
  ...step,
  title: step.label,
  hold: index === WORKFLOW_STEPS.length - 1 ? 0 : 2400,
}));
export const FINAL = STAGES.length - 1;
export const DEMO_DURATION = STAGES.reduce((total, stage) => total + stage.hold, 0);
export function next(stage: number) { return Math.min(stage + 1, FINAL); }
export function checkState(stage: number): 'pending' | 'passed' {
  return stage === FINAL ? 'passed' : 'pending';
}
