import { taskFaq, taskOffer } from '@/beta/data/offer';
import type { FaqGroup } from '../components/FaqAccordion';

/**
 * The FAQ page: the homepage's eight questions, sorted into groups, plus the
 * questions the homepage has no room for. Answers stay inside what the site
 * already claims about availability, pricing and boundaries.
 */
const home = (q: string) => {
  const item = taskFaq.find(entry => entry.q === q);
  if (!item) throw new Error(`Homepage FAQ no longer has "${q}"`);
  return item;
};

export const faqGroups: FaqGroup[] = [
  {
    title: 'Getting started',
    items: [
      home('What is exekova?'),
      home('How do I request access?'),
      { q: 'How soon can the first task start?', a: 'After you send the access request, exekova confirms task eligibility and repository access by email. Work starts only once both are confirmed, so the first task begins as soon as your team has approved the scope and the repository.' },
      { q: 'Do we need to install anything?', a: 'No. Tasks come from Jira or the Work Intent form, and outcomes arrive as GitHub pull requests in the repository you approve. Your team keeps working in the tools it already uses.' },
    ],
  },
  {
    title: 'Scope and work',
    items: [
      home('What work can I give exekova?'),
      { q: 'What makes a task a good fit?', a: 'A good first task reads like “Keep selected filters when moving to the next page. Add a regression test.” It has one repository, a short list of acceptance criteria and room for a test. “Rebuild our entire application” needs a smaller scope first.' },
      { q: 'Can exekova take on a large project?', a: 'Broad projects need smaller tasks. Each task carries its own acceptance criteria and its own outcome, so a large piece of work becomes a sequence of verified steps your team approves one at a time.' },
      { q: 'Who decides whether a task is eligible?', a: 'exekova confirms eligibility and repository access before any execution starts. If a task is too broad or cannot be verified as written, it is returned with what would make it eligible.' },
    ],
  },
  {
    title: 'Review and verification',
    items: [
      home('What does a verified outcome include?'),
      home('What happens if review or verification fails?'),
      home('Will exekova merge or deploy my code?'),
      { q: 'What does “independent review” mean?', a: 'The reviewed revision is checked by a reviewer that did not produce it, against the acceptance criteria and the repository’s standards. Its result is part of the record your team receives.' },
    ],
  },
  {
    title: 'Pricing',
    items: [
      home('What does it cost?'),
      { q: 'Is there a subscription?', a: `No. There is no subscription, no seat licence and no payment on this website. Accepted tasks are invoiced against the acceptance record at $${taskOffer.current} each.` },
      { q: 'What happens to the price when a task is rejected?', a: 'A rejected attempt counts as zero accepted tasks and costs $0. Only outcomes that pass review and verification against the agreed criteria are accepted.' },
    ],
  },
  {
    title: 'Integrations',
    items: [
      home('Which integrations can I use today?'),
      { q: 'Can we bring tasks from Slack, Microsoft Teams or Excel?', a: 'Task intake from Slack, Microsoft Teams and Excel is planned. The access request form lets you register interest so you hear when a combination is supported; it cannot start a task on a planned integration.' },
      { q: 'Do you support GitLab or Bitbucket?', a: 'GitLab merge requests and Bitbucket pull requests are planned, with no committed availability date. GitHub is available today.' },
    ],
  },
  {
    title: 'Security and data',
    items: [
      { q: 'What access does exekova need?', a: 'Access to the task source you choose and to the approved GitHub repository, limited to the projects and repositories you approve. Work happens on an isolated task branch, and your team decides what to merge.' },
      { q: 'What happens to our code?', a: 'The code change is delivered into your repository as a pull request. Your team decides what to merge and deploy. The [Terms](/terms) and the [Data Processing Addendum](/dpa) set out the full position on ownership, confidentiality and processing.' },
      { q: 'Where can I read the legal documents?', a: 'The [Privacy Policy](/privacy), [Terms](/terms), [Cookie Policy](/cookies), [Data Processing Addendum](/dpa), [Subprocessors](/subprocessors) and [Acceptable Use Policy](/acceptable-use) are all linked in the footer of every page.' },
    ],
  },
];

/** Every question on the page, flattened for the FAQPage schema. */
export const faqItems = faqGroups.flatMap(group => group.items);
