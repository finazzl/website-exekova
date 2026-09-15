import { EXAMPLES } from '@/beta/data/heroDemoStages';

/**
 * The three kinds of work the site offers today, exactly as the homepage
 * states them: a small bug fix, a small feature, or focused test coverage.
 * Each use case reuses the homepage demo example so every page tells one story.
 */
export type UseCaseSlug = 'bug-fixes' | 'small-features' | 'test-coverage';

export type UseCase = {
  slug: UseCaseSlug;
  name: string;
  icon: string;
  headline: [string, string];
  summary: string;
  lede: string;
  /** What a good task looks like. */
  fit: string[];
  /** What needs a smaller scope first. */
  stretch: string[];
  example: { title: string; brief: string; criteria: string[]; outcome: string; files: string };
  /** Get, Set, Done in this use case's words. */
  steps: [string, string, string];
  evidence: string[];
  faq: { q: string; a: string }[];
};

const [bug, feature, tests] = EXAMPLES;

export const useCases: UseCase[] = [
  {
    slug: 'bug-fixes',
    name: 'Bug fixes',
    icon: 'bug',
    headline: ['Fix the defect.', 'Keep the proof.'],
    summary: 'A defect your team can describe becomes a reviewed fix with a regression test and check evidence.',
    lede: 'Bring a bug with clear acceptance criteria. exekova returns a pull request with the fix, a regression test, an independent review and passing checks. Your team decides the merge.',
    fit: ['A defect you can reproduce or describe precisely', 'A clear statement of the correct behaviour', 'One repository and one area of the code', 'Room for a regression test that proves the fix'],
    stretch: ['“Something is slow somewhere”', 'A defect that needs production data to reproduce', 'A fix that spans several systems at once'],
    example: { title: bug.title, brief: bug.brief, criteria: [...bug.criteria], outcome: bug.outcome, files: bug.files },
    steps: ['Describe the defect and what correct looks like, in Jira or the Work Intent form.', 'Choose the approved GitHub repository where the defect lives.', 'Receive a pull request with the fix, a regression test, review and check evidence.'],
    evidence: ['The code change on an isolated task branch', 'A regression test that fails before the fix and passes after', 'The independent review result', 'Required test and check results', 'The acceptance record for the reviewed revision'],
    faq: [
      { q: 'What if the defect cannot be reproduced?', a: 'Eligibility is confirmed before work starts. If the defect cannot be reproduced from the description and the repository, the task is returned with what was tried, and no accepted task is invoiced.' },
      { q: 'Does every fix include a test?', a: 'A regression test is part of the acceptance criteria whenever the codebase can carry one. If the affected area has no test harness, the review evidence says so and your team decides whether that is acceptable.' },
      { q: 'Who merges the fix?', a: 'Your team. The pull request arrives on an isolated branch with its evidence. exekova never merges or deploys.' },
    ],
  },
  {
    slug: 'small-features',
    name: 'Small features',
    icon: 'plus',
    headline: ['A small feature.', 'A complete outcome.'],
    summary: 'A contained addition with defined behaviour, delivered with tests, review and check evidence.',
    lede: 'Describe a feature small enough to define in a few sentences. exekova delivers the change, its tests and the evidence your team needs to approve it.',
    fit: ['Behaviour you can describe in a few sentences', 'A clear definition of done, including the edge cases', 'One repository and one bounded area of the product', 'Existing patterns the change can follow'],
    stretch: ['A new product area with open design questions', 'Changes that need several teams to agree first', 'Work that depends on infrastructure that does not exist yet'],
    example: { title: feature.title, brief: feature.brief, criteria: [...feature.criteria], outcome: feature.outcome, files: feature.files },
    steps: ['Write the feature brief and what done means, in Jira or the Work Intent form.', 'Choose the approved GitHub repository and confirm the scope.', 'Receive a pull request with the feature, its tests, review and check evidence.'],
    evidence: ['The feature on an isolated task branch', 'Tests covering the defined behaviour and its limits', 'The independent review result', 'Required check results', 'The acceptance record for the reviewed revision'],
    faq: [
      { q: 'How small is small?', a: 'Small enough to describe in a few sentences and verify against a short list of acceptance criteria. The pricing section shows a good first task next to one that needs a smaller scope.' },
      { q: 'Can a feature touch the user interface?', a: 'Yes, when the expected behaviour is defined. Visual polish without acceptance criteria cannot be verified, so it is clarified with you before work starts.' },
      { q: 'What if the feature needs a design decision?', a: 'Open questions are raised before execution. A task starts only when the definition of done is clear enough to verify.' },
    ],
  },
  {
    slug: 'test-coverage',
    name: 'Test coverage',
    icon: 'flask',
    headline: ['Cover the gap.', 'Keep the confidence.'],
    summary: 'Focused regression coverage for behaviour your team relies on but has not locked down yet.',
    lede: 'Point at the behaviour that matters and what it must keep doing. exekova adds the tests, runs them and returns the evidence.',
    fit: ['Behaviour you can state as expected outcomes', 'A component, flow or module with a clear boundary', 'A repository with a working test harness', 'A defined list of cases to cover'],
    stretch: ['“Improve coverage across the whole codebase”', 'Tests that need production systems or live credentials', 'Behaviour nobody can describe yet'],
    example: { title: tests.title, brief: tests.brief, criteria: [...tests.criteria], outcome: tests.outcome, files: tests.files },
    steps: ['List the behaviour to protect and the cases to cover, in Jira or the Work Intent form.', 'Choose the approved GitHub repository where the behaviour lives.', 'Receive a pull request with the tests, their results, review and check evidence.'],
    evidence: ['New tests on an isolated task branch', 'Passing results for every listed case', 'The independent review result', 'Required check results', 'The acceptance record for the reviewed revision'],
    faq: [
      { q: 'Which test frameworks are supported?', a: 'The tests follow the framework and conventions already in your repository. A repository without a runnable test harness is discussed with you before work starts.' },
      { q: 'What stops the new tests being flaky?', a: 'Tests must pass in the required checks before the outcome is accepted. A test that cannot pass reliably is not accepted.' },
      { q: 'Can the task also fix what the tests find?', a: 'A test task is scoped to coverage. If a new test exposes a defect, that becomes a separate bug-fix task with its own acceptance criteria.' },
    ],
  },
];

export function useCaseBySlug(slug: string) {
  return useCases.find(item => item.slug === slug);
}
