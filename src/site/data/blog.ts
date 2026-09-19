import type { Faq } from '../lib/pageFaq';
import { remittanceReconciliationPost } from './remittanceReconciliation';

/**
 * The exekova blog: operator-led writing on the back-office work exekova runs.
 * Hand written, like insuranceBackOffice.ts, so the content importer leaves it
 * alone. Posts render through BlogArticle and resolve at /blogs/<slug>.
 */
export type PostBlock =
  | { type: 'p'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'note'; label: string; text: string };

export type PostSection = { id: string; heading: string; blocks: PostBlock[] };

export type Post = {
  slug: string;
  category: string;
  title: string;
  /** The title used in the document head, kept inside the 30 to 65 character window. */
  seoTitle: string;
  dek: string;
  description: string;
  keywords: string[];
  /** ISO date for structured data, and the same date as the page shows it. */
  published: string;
  displayDate: string;
  readMinutes: number;
  tags: string[];
  provenance?: string;
  contextLink?: { label: string; href: string };
  sections: PostSection[];
  faq: Faq[];
  /** Use cases this post sends the reader to next. */
  related: string[];
};

export const BLOG_AUTHOR = 'exekova research';

export const blogIndex = {
  eyebrow: 'BLOG',
  headline: ['Ideas for a back office', 'that runs itself.'] as [string, string],
  lede: 'Plain writing on remittance reconciliation, insurance operations, AI agents and the engineering behind finance workflows.',
  note: 'Every post is written by the team that runs the work. Where a post describes a pattern rather than a specific engagement, it says so.',
};

export const posts: Post[] = [
  remittanceReconciliationPost,
  {
    slug: 'insurance-commission-reconciliation-guide',
    category: 'Finance operations',
    title: 'A plain guide to insurance commission reconciliation',
    seoTitle: 'A plain guide to commission reconciliation',
    dek: 'What commission reconciliation actually involves, where it breaks, and what has to be true before an agent can run it without a person re-checking every line.',
    description: 'Commission reconciliation explained plainly: the inputs, the exception classes that cause most of the work, and what must be true before an agent can run the close.',
    keywords: ['insurance commission reconciliation', 'carrier statement matching', 'insurance finance operations'],
    published: '2026-09-02',
    displayDate: '2 September 2026',
    readMinutes: 8,
    tags: ['commission reconciliation', 'finance operations', 'carrier statements'],
    sections: [
      {
        id: 'what-it-is',
        heading: 'What commission reconciliation actually is',
        blocks: [
          { type: 'p', text: 'Commission reconciliation is the monthly act of proving that what a carrier paid matches what the book says it owed, and that what the business then pays its producers follows from the same figures. It sounds like a single task. In practice it is three: load the statement, match it to policies, and explain what did not match.' },
          { type: 'p', text: 'Most teams are fine at the first two. The third is where the month goes. A statement line that will not match is not an error message, it is a question, and the answer usually lives in a policy endorsement, a mid-term cancellation, a producer contract that changed in March, or a carrier that applied a rate the business did not expect.' },
          { type: 'ul', items: [
            'Carrier statements, one per carrier per period, in layouts nobody standardised.',
            'The policy book, including endorsements, cancellations and reinstatements in the period.',
            'Producer contracts, with splits, overrides and clawback terms and their effective dates.',
            'The tolerance rules that decide when a difference is rounding and when it is a finding.',
          ] },
        ],
      },
      {
        id: 'where-it-breaks',
        heading: 'Where it breaks, in the order it usually breaks',
        blocks: [
          { type: 'p', text: 'Reconciliation failures cluster. Once you name the clusters, the work stops feeling infinite and starts looking like a list of rules, which is the point at which it can be automated honestly.' },
          { type: 'ol', items: [
            'Format drift. A carrier moves a column, renames a header or adds a currency, and the loader fails before matching even starts.',
            'Identity mismatch. The same policy carries a different reference on the statement than in the system of record.',
            'Timing. The statement covers a period the book closed differently, so the difference is real but temporary.',
            'Rate and rounding. The carrier applied a rate at a different level, or rounded per line where the book rounds per policy.',
            'Contract change. A producer split changed mid term, and the effective date decides which version should have applied.',
            'Genuine underpayment or overpayment, which is what all of the above is hiding.',
          ] },
          { type: 'p', text: 'The last one is the only class that should end in a carrier conversation. The other five are engineering problems wearing a finance costume, and they consume most of the hours.' },
        ],
      },
      {
        id: 'ready-for-an-agent',
        heading: 'What has to be true before an agent can run it',
        blocks: [
          { type: 'p', text: 'An agent can run a close when the close is describable. That is a higher bar than it sounds, and it is worth being blunt about, because a process that only exists in one person’s head cannot be handed to anything, human or otherwise.' },
          { type: 'ul', items: [
            'Every exception class has a name and an expected destination.',
            'Tolerances are stated as numbers, not as judgement.',
            'Each statement format has a sample set that can be replayed.',
            'Unmatched lines that are unmatched by design are listed, not absorbed.',
            'Someone is named as the owner of each exception that needs a decision.',
          ] },
          { type: 'note', label: 'A better question to ask', text: 'Instead of asking whether AI can reconcile the book, ask which exception classes you can name, what evidence each one needs, and who decides when a difference becomes a carrier conversation.' },
        ],
      },
      {
        id: 'the-engineering',
        heading: 'The engineering underneath it',
        blocks: [
          { type: 'p', text: 'The agent is the visible part. Underneath it is ordinary engineering work: a parser per format, a matching routine with explicit tolerances, an exception router, and a regression suite that proves last month still reconciles after this month’s change. That work competes badly against the product roadmap, which is why it tends to be deferred until the close is late.' },
          { type: 'p', text: 'exekova runs that work as scoped tasks. One statement format, one exception class, one tolerance rule at a time, each returned as an independently reviewed pull request with the sample month attached. Your team keeps the accounting treatment, the carrier relationship and the decision to merge.' },
        ],
      },
    ],
    faq: [
      { q: 'What is insurance commission reconciliation?', a: 'It is the process of proving that the commission a carrier paid matches what the policy book says was owed, and that producer compensation follows from the same figures. It involves loading carrier statements, matching them to policies and endorsements, and explaining every line that does not match.' },
      { q: 'Why does commission reconciliation take so long?', a: 'Most of the time goes to explaining unmatched lines rather than matching the ones that fit. Format drift, identity mismatches, timing differences, rate and rounding rules and mid-term contract changes each produce exceptions that look like errors and are usually not.' },
      { q: 'Can an AI agent run commission reconciliation?', a: 'It can once the process is describable: named exception classes, stated tolerances, a replayable sample set per statement format and a named owner for each exception that needs a decision. Without those, no system can run the close reliably, and the review burden simply moves.' },
      { q: 'What does exekova do here?', a: 'exekova builds and changes the engineering underneath the close: parsers per format, matching with explicit tolerances, exception routing and the regression suite that proves earlier periods still reconcile. Each change arrives as an independently reviewed pull request with the sample month attached. See the [commission reconciliation use case](/use-cases/insurance-commission-reconciliation).' },
    ],
    related: ['insurance-commission-reconciliation', 'insurance-statement-extraction', 'insurance-payout-calculation'],
  },
  {
    slug: 'ai-agents-insurance-back-office',
    category: 'AI agents',
    title: 'What an AI agent changes in an insurance back office',
    seoTitle: 'What AI agents change in insurance operations',
    dek: 'The difference between a system that answers questions and one that finishes work, and why insurance back offices are where that difference shows up first.',
    description: 'A useful insurance AI agent finishes work rather than answering questions. Where agents fit in the back office, how to bound them, and what evidence they owe.',
    keywords: ['insurance AI agents', 'back office automation', 'insurance operations AI', 'human in the loop'],
    published: '2026-08-19',
    displayDate: '19 August 2026',
    readMinutes: 7,
    tags: ['insurance AI agents', 'back office automation', 'human in the loop'],
    sections: [
      {
        id: 'answers-versus-outcomes',
        heading: 'Answering is not finishing',
        blocks: [
          { type: 'p', text: 'A model that explains a commission statement is useful. A system that reconciles the statement, routes the six lines that did not match to the people who can decide on them, and leaves an audit trail behind is a different category of thing. The first saves a reader some time. The second closes a period.' },
          { type: 'p', text: 'Insurance back offices are where that distinction gets expensive, because almost nothing in them is finished by a sentence. A claim is not settled by a summary. A producer is not activated by a description of the licence check. The work has a definition of done, and the definition usually involves a record somebody can audit a year later.' },
        ],
      },
      {
        id: 'where-agents-fit',
        heading: 'Where agents fit first',
        blocks: [
          { type: 'p', text: 'The first workloads to hand over are the ones with a clear trigger, evidence that can be traced to a source, a small set of allowed actions and a result that is easy to check. Large insurance fintechs across the EU have converged on roughly the same shortlist, for the same reason: these are the processes where everyone already agrees what correct looks like.' },
          { type: 'ul', items: [
            'Commission reconciliation, where the expected result is a matched book and a named exception list.',
            'Carrier statement and bordereaux ingestion, where the expected result is a validated file and a stated rejection reason per row.',
            'Producer payout calculation, where a control cohort proves the change did not move anyone it should not have.',
            'Producer and agency onboarding, where each verification traces to a source and leaves evidence.',
            'Revenue leakage checks, where a finding has to carry the evidence it rests on.',
          ] },
          { type: 'p', text: 'What these have in common is not that they are simple. It is that they are checkable. A process nobody can check is not ready for an agent, and handing it over anyway just moves the uncertainty somewhere less visible.' },
        ],
      },
      {
        id: 'bounding-the-agent',
        heading: 'Bound the actions, not the ambition',
        blocks: [
          { type: 'p', text: 'Give an agent more freedom as the evidence earns it. Reading, classifying, calculating and recommending are safe starting points in almost every back office. Writing to a system of record is a decision that should be made per action, with confidence thresholds and a stated rollback. Anything that touches a customer, a regulator or a payment stays with a person until the record says otherwise.' },
          { type: 'note', label: 'A better question to ask', text: 'Instead of asking whether the agent can do the task, ask what evidence it needs, which actions it may take, and how a reviewer approves or undoes the result.' },
          { type: 'p', text: 'This is the same discipline good engineering teams apply to deployments. Nobody argues about whether the deploy is smart. They argue about whether it is reversible, observable and reviewed. Agents deserve the same three questions.' },
        ],
      },
      {
        id: 'work-with-what-exists',
        heading: 'Work with the systems already there',
        blocks: [
          { type: 'p', text: 'Most insurance teams do not need to replace the policy system to get value from agents. An agent layer connects through APIs and controlled integrations and works across the policy administration system, the accounting stack, the CRM and the document store. That keeps migration risk out of the conversation and lets one workflow improve at a time.' },
          { type: 'p', text: 'The part that is genuinely new is the engineering behind the layer, and that is the part exekova runs: the parsers, the rules, the routing and the regression evidence that keeps last month working while this month changes. exekova is an autonomous work execution platform, and the work it executes here is the software that lets an agent be trusted with the close.' },
        ],
      },
    ],
    faq: [
      { q: 'What is an insurance AI agent?', a: 'A system that observes operational work, applies stated business rules, takes a bounded set of actions and records what it did, across insurance workflows. The distinction that matters is that it finishes a unit of work rather than producing a description of it.' },
      { q: 'Where do AI agents fit best in the insurance back office?', a: 'In work with a clear trigger, traceable evidence, a small set of allowed actions and a result that is easy to check: commission reconciliation, statement and bordereaux ingestion, payout calculation, producer onboarding and leakage detection.' },
      { q: 'How should an insurance team govern AI agents?', a: 'Bound the actions rather than the ambition. Start with reading, classifying, calculating and recommending. Allow writes per action with a confidence threshold and a stated rollback. Keep anything touching a customer, a regulator or a payment with a named person.' },
      { q: 'Does this require replacing the policy system?', a: 'No. An agent layer connects through APIs and controlled integrations across the policy system, accounting stack, CRM and document store, which keeps migration risk out of the decision and lets one workflow improve at a time.' },
    ],
    related: ['insurance-commission-reconciliation', 'insurance-producer-onboarding', 'insurance-revenue-leakage'],
  },
  {
    slug: 'producer-onboarding-operating-model',
    category: 'Distribution',
    title: 'Producer onboarding, measured in days rather than weeks',
    seoTitle: 'Producer onboarding in days, not weeks',
    dek: 'Onboarding a producer is a sequence of checkable verifications. Here is how to lay the sequence out so the days go into selling instead of waiting.',
    description: 'Producer onboarding is a sequence of verifications, not a form. How to lay out licence, appointment and hierarchy checks so activation takes days rather than weeks.',
    keywords: ['producer onboarding', 'agency onboarding', 'insurance distribution', 'producer licensing'],
    published: '2026-08-12',
    displayDate: '12 August 2026',
    readMinutes: 6,
    tags: ['producer onboarding', 'distribution', 'licensing'],
    sections: [
      {
        id: 'a-sequence-not-a-form',
        heading: 'It is a sequence, not a form',
        blocks: [
          { type: 'p', text: 'Producer onboarding is usually described as paperwork. It is better understood as a sequence of verifications, each of which has a source that can answer it and an owner who can act when the answer is no.' },
          { type: 'ol', items: [
            'Identity and entity verification, including the agency the producer writes under.',
            'Licence status and lines of authority, per state or territory.',
            'Carrier appointments, which depend on the lines above and often on the carrier’s own queue.',
            'Hierarchy placement, which decides whose overrides apply.',
            'Banking and tax details, which decide whether the first payout can actually be made.',
            'Compensation plan assignment, which follows from the hierarchy and the contract.',
          ] },
          { type: 'p', text: 'Every one of those is checkable. None of them is ambiguous. The delay is almost never a hard question, it is a handoff waiting in an inbox.' },
        ],
      },
      {
        id: 'where-the-days-go',
        heading: 'Where the days actually go',
        blocks: [
          { type: 'p', text: 'Measure an onboarding and the elapsed time splits into three parts: time spent verifying, time spent waiting on an external party, and time spent waiting on an internal one. The first is usually minutes. The third is usually most of the total.' },
          { type: 'ul', items: [
            'A check completes and nobody is told, so the next check starts a day later.',
            'A failure lands in a shared queue rather than with a named owner.',
            'A step is done twice because the first result was not recorded anywhere durable.',
            'The compensation plan waits on a hierarchy decision that nobody realised was blocking.',
          ] },
          { type: 'note', label: 'What to measure first', text: 'Track elapsed time per step and the share of steps that end in a handoff. If handoffs dominate, the constraint is the operating model, not the verification work, and no amount of faster checking will fix it.' },
        ],
      },
      {
        id: 'what-agents-change',
        heading: 'What an agent changes here',
        blocks: [
          { type: 'p', text: 'An agent removes the third category almost entirely. It runs each verification against its source the moment the previous one clears, records the evidence, and routes only the failures to the named owner who can decide. The producer moves from application to active in the time the external parties actually take, which is the floor you cannot engineer away.' },
          { type: 'p', text: 'What it does not do is decide which producers to appoint, or file anything with a regulator. Those stay with your team, and an onboarding sequence that pretends otherwise is one you will have to unwind later.' },
        ],
      },
      {
        id: 'the-build',
        heading: 'What has to be built',
        blocks: [
          { type: 'p', text: 'The sequence is software: a verification step per source, an evidence record per step, a router for the failures and an audit trail that survives a review a year later. exekova builds that as scoped tasks, each one an independently reviewed pull request with a sample producer run from application to active. Your team keeps the appointment decisions, the filings and the merge.' },
        ],
      },
    ],
    faq: [
      { q: 'How long should producer onboarding take?', a: 'As long as the external parties take, and no longer. Licence and appointment queues set a floor you cannot engineer away. Everything above that floor is internal handoff time, which is the part worth attacking first.' },
      { q: 'What slows producer onboarding down most?', a: 'Internal waiting rather than verification. A check completes and nobody is told, a failure lands in a shared queue instead of with a named owner, or a step is repeated because the first result was never recorded durably.' },
      { q: 'What should stay with a person?', a: 'Appointment decisions, licensing and regulatory filings, and the decision about which producers are approved. The verification steps and their evidence trail are the part that can run without a person in the loop.' },
      { q: 'What does exekova build for onboarding?', a: 'The sequence itself: a verification step per source, an evidence record per step, routing for failures and an audit trail. Each change arrives as an independently reviewed pull request with a sample producer run end to end. See the [producer onboarding use case](/use-cases/insurance-producer-onboarding).' },
    ],
    related: ['insurance-producer-onboarding', 'insurance-payout-calculation', 'insurance-bordereaux-processing'],
  },
  {
    slug: 'insurance-revenue-leakage-signals',
    category: 'Intelligence',
    title: 'Seven signs of revenue leakage in an insurance book',
    seoTitle: 'Seven signs of insurance revenue leakage',
    dek: 'Leakage is rarely one large error. It is seven small ones, each regular enough to matter over a year and small enough to survive a review.',
    description: 'Seven recurring signs of revenue leakage in an insurance book, what evidence each one needs before anyone acts on it, and how to turn them into running checks.',
    keywords: ['insurance revenue leakage', 'premium leakage', 'commission leakage', 'insurance audit findings'],
    published: '2026-07-28',
    displayDate: '28 July 2026',
    readMinutes: 7,
    tags: ['revenue leakage', 'audit', 'finance operations'],
    sections: [
      {
        id: 'the-shape-of-leakage',
        heading: 'Leakage is small, regular and quiet',
        blocks: [
          { type: 'p', text: 'Nobody loses a book of business to one dramatic error. Leakage is a rounding rule applied at the wrong level, an endorsement that never reached billing, a commission paid on a policy that cancelled. Each is small enough to pass a review and regular enough to compound.' },
          { type: 'p', text: 'That is what makes it a detection problem rather than an audit problem. An audit finds it once a year and calls it a restatement. A check finds it in the close and calls it a correction.' },
        ],
      },
      {
        id: 'the-seven',
        heading: 'The seven that recur',
        blocks: [
          { type: 'ol', items: [
            'Rounding applied per line where the contract rounds per policy, or the other way round.',
            'Endorsements that changed exposure and never reached billing.',
            'Commission paid on policies that cancelled, lapsed or were never bound.',
            'Producers still writing under an appointment that lapsed.',
            'Overrides applied from a hierarchy position that changed mid period.',
            'Currency and rate handling on cross-border business, applied at the wrong date.',
            'Duplicate policies under two references, paid twice and counted once.',
          ] },
          { type: 'p', text: 'Six of the seven are detectable from data the business already holds. The seventh, duplicates, needs a matching rule that somebody has to agree to, which is usually why it survives longest.' },
        ],
      },
      {
        id: 'evidence-first',
        heading: 'A finding needs evidence, not a number',
        blocks: [
          { type: 'p', text: 'A leakage dashboard that reports a figure produces a meeting. A finding that carries the policy, the period, the rule that fired and the expected versus actual amount produces an action. The difference is entirely in the evidence, and it is worth deciding what counts as sufficient before building anything.' },
          { type: 'note', label: 'Set the bar before you build', text: 'Write down what a credible finding must show before anyone acts on it. If the check cannot produce that, the class is not ready to detect yet, and saying so is better than approximating it.' },
          { type: 'p', text: 'Precision matters as much as recall here. A check with a poor false-positive rate gets ignored within two cycles, and once it is ignored, the leakage it was built to catch is worse off than before, because everyone believes it is covered.' },
        ],
      },
      {
        id: 'turning-signs-into-checks',
        heading: 'Turning signs into running checks',
        blocks: [
          { type: 'p', text: 'Each of the seven becomes a rule with a stated threshold, a list of the evidence a finding carries, and a set of known-clean records it must not flag. Building them one at a time, with the false-positive cases tested alongside, is slower to start and the only version that survives contact with a finance team.' },
          { type: 'p', text: 'exekova runs that as scoped engineering tasks against a redacted extract, each returned as an independently reviewed pull request with its findings and its clean cases attached. Whether to pursue a finding, and any remediation or restatement, stays with your team.' },
        ],
      },
    ],
    faq: [
      { q: 'What is revenue leakage in insurance?', a: 'Income the business earned and did not collect, or paid out and should not have. It typically arrives as many small recurring errors rather than one large one: rounding applied at the wrong level, unbilled endorsements, commission on cancelled policies and lapsed appointments.' },
      { q: 'How is leakage detected?', a: 'As a set of rules, each with a stated threshold and a defined list of the evidence a finding must carry, run against the data the business already holds. Six of the seven common classes are detectable that way. Duplicate policies need a matching rule the business agrees to first.' },
      { q: 'Why do leakage dashboards get ignored?', a: 'Because a figure produces a meeting and a finding produces an action. A check with a poor false-positive rate is ignored within two cycles, and the leakage is then worse off than before because everyone believes it is covered.' },
      { q: 'What does exekova build for leakage detection?', a: 'The detection rules themselves, with thresholds stated in the code, the evidence each finding carries, and the known-clean cases the rule must not flag. See the [revenue leakage use case](/use-cases/insurance-revenue-leakage).' },
    ],
    related: ['insurance-revenue-leakage', 'insurance-commission-reconciliation', 'insurance-payout-calculation'],
  },
  {
    slug: 'bordereaux-processing-control-guide',
    category: 'Delegated authority',
    title: 'Bordereaux processing without the monthly scramble',
    seoTitle: 'Bordereaux processing without the scramble',
    dek: 'Delegated authority runs on bordereaux, and bordereaux run on whatever the coverholder exported. How to make the month close on rules instead of memory.',
    description: 'Bordereaux arrive late and in shifting columns. How to define validation rules, duplicate handling and rejection reasons so delegated authority closes on rules.',
    keywords: ['bordereaux processing', 'delegated authority', 'coverholder data', 'MGA operations'],
    published: '2026-07-15',
    displayDate: '15 July 2026',
    readMinutes: 6,
    tags: ['bordereaux', 'delegated authority', 'coverholders'],
    sections: [
      {
        id: 'why-it-hurts',
        heading: 'Why the same week hurts every month',
        blocks: [
          { type: 'p', text: 'A bordereau is a list of risks or premiums written under delegated authority, produced by a coverholder in whatever shape their system exports. Columns move. Currencies mix. Risk codes drift. The same policy shows up twice under two references. None of that is malicious and all of it lands in the same week.' },
          { type: 'p', text: 'The cost is not the cleaning. It is that the cleaning is done from memory by whoever did it last month, which means the rules are not written down, which means they cannot be tested, which means next month starts over.' },
        ],
      },
      {
        id: 'write-the-rules-down',
        heading: 'Write the rules down first',
        blocks: [
          { type: 'p', text: 'Before any automation, make the implicit explicit. Most teams find this takes an afternoon and immediately halves the argument surface at close.' },
          { type: 'ul', items: [
            'The required fields, and what happens when one is absent rather than empty.',
            'The risk code mapping per coverholder, including the codes you will refuse to guess at.',
            'The currency rule, and the date the rate is taken from.',
            'The duplicate policy, stated as a matching rule rather than a habit.',
            'The rejection reasons, so a held row explains itself without a phone call.',
          ] },
          { type: 'note', label: 'The test that matters', text: 'Keep one redacted sample month per coverholder and replay it after every change. A rule you cannot replay is a rule you will relearn.' },
        ],
      },
      {
        id: 'onboarding-a-coverholder',
        heading: 'Onboarding a coverholder without breaking the last one',
        blocks: [
          { type: 'p', text: 'The failure mode that costs most is not a new coverholder failing to load. It is a new coverholder loading and quietly changing the behaviour for three existing ones, because a validation rule was generalised to make the new file fit.' },
          { type: 'p', text: 'The discipline is the same as any regression problem: the coverholders already live have to re-validate unchanged before the new one counts as done. That is not extra work, it is the only evidence that the change was safe.' },
        ],
      },
      {
        id: 'the-build',
        heading: 'What gets built',
        blocks: [
          { type: 'p', text: 'Ingestion per format, validation rules that are readable rather than buried, duplicate handling that follows a stated rule, and a rejection reason attached to every held row. exekova runs each of those as a scoped task returned as an independently reviewed pull request, with the validated sample month kept as the baseline for the next change. Coverholder relationships, underwriting acceptance and regulatory reporting stay with your team.' },
        ],
      },
    ],
    faq: [
      { q: 'What is a bordereau in insurance?', a: 'A list of risks or premiums written under delegated authority and reported by a coverholder to the insurer or managing agent, usually monthly. It is the primary record of what was written on the insurer behalf.' },
      { q: 'Why is bordereaux processing so manual?', a: 'Because the cleaning rules are usually held in memory rather than written down. Columns move, currencies mix and risk codes drift, and if the handling rules are not explicit they cannot be tested, so each month starts from scratch.' },
      { q: 'How do you onboard a new coverholder safely?', a: 'By requiring that every coverholder already live re-validates unchanged before the new format counts as done. The expensive failure is not a new file failing to load, it is a generalised validation rule quietly changing behaviour for existing ones.' },
      { q: 'What does exekova build here?', a: 'Ingestion per format, readable validation rules, duplicate handling that follows a stated rule and a rejection reason on every held row, with a validated sample month kept as the baseline. See the [bordereaux processing use case](/use-cases/insurance-bordereaux-processing).' },
    ],
    related: ['insurance-bordereaux-processing', 'insurance-statement-extraction', 'insurance-commission-reconciliation'],
  },
];

/** Newest first, which is the order the index and the next-article link use. */
export const postsByDate = [...posts].sort((a, b) => b.published.localeCompare(a.published));

export function postBySlug(slug: string) {
  return posts.find(item => item.slug === slug);
}

/** The post after this one in date order, wrapping at the end. */
export function nextPost(slug: string) {
  const index = postsByDate.findIndex(item => item.slug === slug);
  if (index < 0) return undefined;
  return postsByDate[(index + 1) % postsByDate.length];
}

export function wordCount(post: Post) {
  const text = post.sections.flatMap(section => [section.heading, ...section.blocks.flatMap(block =>
    block.type === 'ul' || block.type === 'ol' ? block.items : block.type === 'note' ? [block.label, block.text] : [block.text])]).join(' ');
  return `${post.dek} ${text}`.trim().split(/\s+/).length;
}
