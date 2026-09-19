import type { Post } from './blog';
import type { Case } from './cases';
import type { Faq } from '../lib/pageFaq';

/** Hand-authored content, kept outside the generated industry case catalogue. */
export const remittanceReconciliationCase: Case = {
  id: 'uk-remittance-reconciliation',
  slug: 'uk-remittance-ai-reconciliation',
  name: 'AI-agent reconciliation for UK remittance',
  title: 'AI reconciliation for a UK remittance provider',
  description: 'An AI-agent reconciliation workflow for a major UK remittance provider: match ledgers, partner settlements and bank records, investigate breaks and retain evidence.',
  problem: 'For a major UK remittance provider, every transfer needs a traceable path from customer funding to partner payout and bank settlement. AI agents carry that reconciliation through to a reviewable close.',
  why: 'At remittance scale, a transfer appears in several systems with different references, currencies and settlement dates. Finance teams spend the close collecting files, rebuilding batches and chasing the same exceptions. This workflow gives agents responsibility for collecting the evidence, running approved matching rules and preparing each unresolved break for its owner.',
  pressure: 'A payout marked successful is only one part of the record. The ledger, partner settlement and cash movement still need to agree.',
  arrives: 'One corridor, one payout partner and one settlement account, with representative records and finance-approved matching rules.',
  runs: [
    { stage: 'Ingest', text: 'The intake agent collects authorised ledger extracts, partner files and bank statements. It checks file identity, period, record counts and control totals, and flags missing sources.' },
    { stage: 'Match', text: 'The matching agent runs versioned rules across transfer references, batch membership, amounts, currencies and dates. Financial calculations use a deterministic engine with explicit rounding and tolerances.' },
    { stage: 'Investigate', text: 'The investigation agent retrieves the supporting payout events, fee schedules and settlement records. It proposes a cause, cites its evidence and routes ambiguous items to the right owner.' },
    { stage: 'Review', text: 'The control agent checks that evidence supports each proposed resolution. Finance reviews adjustments, write-offs and disputed differences; approval is recorded against the exact proposal.' },
    { stage: 'Close', text: 'The reporting agent prepares balances by account and currency, accepted matches and aged exceptions. Re-runs preserve the earlier record, and a named finance owner approves the close.' },
  ],
  returns: [
    'A reconciliation record linking each match to the source rows and rule version.',
    'An exception queue with amount, currency, age, evidence, owner and next action.',
    'A close pack with source completeness, balances and unresolved differences.',
  ],
  keeps: ['Accounting policy and matching tolerances', 'Journal entries, write-offs and payment release', 'Partner disputes and final close approval'],
  keepsLabel: 'Decisions owned by finance',
  origin: { kind: 'industry', key: 'fintech', name: 'Fintech', icon: 'coins', href: '/industries/fintech' },
};

export const reconciliationProvenance = 'Anonymous workflow for a major UK remittance provider. The design and worked example are illustrative; no customer performance results are claimed.';

export const reconciliationInputs = [
  { icon: 'file', title: 'Transfer and ledger records', body: 'Customer funding, transfer references, quoted FX, fees, payouts, refunds and reversals. Preserve the original amount, currency and event time at every step.' },
  { icon: 'layers', title: 'Payout-partner settlements', body: 'Partner references, transaction status, batch membership, deductions and settlement dates. Separate a payout confirmation from the statement that explains the cash.' },
  { icon: 'coins', title: 'Bank statements', body: 'Actual debits and credits by account, currency and value date. Link the cash movement to the settlement batch, then to its constituent transfers.' },
];

export const reconciliationExample = [
  { label: 'Gross settlement', value: '£100,000', detail: 'Transfers in the same GBP settlement batch.' },
  { label: 'Agreed partner fees', value: '−£750', detail: 'Deductions supported by the applicable fee schedule.' },
  { label: 'Expected bank credit', value: '£99,250', detail: 'Gross amount less the documented fees.' },
  { label: 'Observed bank credit', value: '£99,000', detail: 'The credit recorded on the bank statement.' },
  { label: 'Unresolved difference', value: '£250', detail: 'Remains open with an owner and source evidence.' },
];

export const reconciliationRollout = [
  { kicker: '01 · Define', title: 'Make the scope checkable', body: 'Agree the corridor, partner, settlement account, cut-off and currency rules. Finance labels representative matches and breaks before the build starts.' },
  { kicker: '02 · Build', title: 'Deliver one connected workflow', body: 'exekova scopes connectors, parsing, matching rules, exception routing and evidence capture into reviewed changes. Each change carries replayable examples.' },
  { kicker: '03 · Compare', title: 'Run alongside the existing close', body: 'Replay completed periods, then compare live read-only results with the finance team. Include missing files, duplicate events, reversals and late settlement.' },
  { kicker: '04 · Expand', title: 'Earn each additional permission', body: 'Enable approved reconciliation actions after review, then add corridors and partners one at a time. Track reopened matches, exception age and close preparation time.' },
];

export const reconciliationFaq: Faq[] = [
  { q: 'Who is this use case for?', a: 'A major UK remittance provider reconciling customer funding, payout partners and bank settlements. The company is unnamed. The workflow and worked example are illustrative, and this page does not claim a verified deployment or measured customer results.' },
  { q: 'What do the AI agents actually do?', a: 'They collect and validate inputs, run approved matching rules, investigate exceptions, assemble evidence and prepare the close pack. Financial calculations use deterministic rules. Missing records and ambiguous matches remain visible for review.' },
  { q: 'How are FX and net settlements handled?', a: 'Keep funding, payout and settlement currencies separate, and connect them using the recorded transaction rate and agreed settlement terms. Reconcile a net bank movement through documented batch membership, fees and adjustments. A current market rate or an inferred fee is not a substitute for that evidence.' },
  { q: 'Can agents move money or change the ledger?', a: 'This workflow starts with read-only access. Agents can propose resolutions, but payment release, journal entries, write-offs and final close approval stay with authorised people. A successful match does not grant permission to make a financial posting.' },
  { q: 'How do you measure whether it is working?', a: 'Compare the same accounts, currencies and periods with a labelled baseline. Track source completeness, match precision, the share of records matched under approved rules, reopened matches, exception age and close preparation time. Set targets with finance rather than borrowing another company’s figures.' },
  { q: 'Where can I read the full approach?', a: 'Read [Reconciliation, run by AI agents, for a UK remittance giant](/blogs/ai-agents-remittance-reconciliation) for the operating model, exception types and engineering behind this workflow.' },
];

export const remittanceReconciliationPost: Post = {
  slug: 'ai-agents-remittance-reconciliation',
  category: 'Remittance operations',
  title: 'Reconciliation, run by AI agents, for a UK remittance giant',
  seoTitle: 'AI-agent reconciliation for UK remittance',
  dek: 'How to build a reconciliation workflow that follows money across transfer ledgers, payout partners and bank accounts, investigates the differences and gives finance a close it can inspect.',
  description: 'How AI agents can run reconciliation for a major UK remittance provider: match transfers, investigate settlement breaks and prepare an evidence-backed close.',
  keywords: ['AI remittance reconciliation', 'UK remittance reconciliation', 'AI agents for finance operations', 'payment settlement reconciliation'],
  published: '2026-09-19',
  displayDate: '19 September 2026',
  readMinutes: 7,
  tags: ['remittance', 'AI agents', 'reconciliation'],
  provenance: reconciliationProvenance,
  contextLink: { label: 'Remittance use case', href: `/use-cases/${remittanceReconciliationCase.slug}` },
  sections: [
    {
      id: 'the-reconciliation-problem',
      heading: 'One transfer. Several records to reconcile.',
      blocks: [
        { type: 'p', text: 'A customer funds a transfer in pounds. A payout partner delivers money in the destination currency. The internal ledger records the obligation, fees and movement of funds. A bank statement records cash on its own timetable. Each system describes part of the same transfer, and finance needs to show how those parts fit together.' },
        { type: 'p', text: 'For a major UK remittance provider, the useful unit of automation is the whole reconciliation workflow: gather the records, validate them, match what can be proved, investigate what cannot and prepare the close. AI agents can coordinate those steps while the financial rules remain explicit and the decisions remain accountable.' },
        { type: 'note', label: 'About this workflow', text: reconciliationProvenance },
      ],
    },
    {
      id: 'where-the-work-accumulates',
      heading: 'Where the work accumulates',
      blocks: [
        { type: 'p', text: 'The straightforward matches are only part of the job. A bank credit might settle hundreds of transfers after fees. A payout may complete before the partner includes it in a settlement file. A refund can arrive after the original period closes. Similar amounts are not enough to establish that two records describe the same obligation.' },
        { type: 'ul', items: [
          'Reference differences: connect the customer transfer, internal ledger entry and partner identifier through a documented mapping.',
          'Timing differences: retain event time, processing date and bank value date, then apply the agreed cut-off for the account.',
          'Batch settlements: reconstruct the transactions, fees and adjustments behind one net cash movement.',
          'Currency differences: preserve funding, payout and settlement amounts in their original currencies, with the rate and terms that connect them.',
          'Reversals and duplicates: distinguish a repeated event from a second payment, and link each reversal to the original transfer.',
        ] },
        { type: 'p', text: 'Every unresolved item needs an amount, a currency, an age and an owner. Otherwise a queue can look smaller simply because a difference was hidden inside a tolerance or moved into another period.' },
      ],
    },
    {
      id: 'five-agent-responsibilities',
      heading: 'Five agent responsibilities, one reconciliation record',
      blocks: [
        { type: 'h3', text: '1. Collect and validate the inputs' },
        { type: 'p', text: 'The intake agent retrieves authorised exports or API records from the ledger, payout partners and banks. It checks which sources were expected, whether they arrived, their record counts and their control totals. An unreadable amount or missing file becomes an ingestion exception. Every extracted field retains a link to its source.' },
        { type: 'h3', text: '2. Match through approved rules' },
        { type: 'p', text: 'The matching agent calls a deterministic reconciliation engine. Exact identifiers come first, followed by approved composite keys and documented batch relationships. Amounts, currencies, fee treatment, rounding and date windows are rules with versions. The agent may propose a candidate when a reference is incomplete; that proposal remains unaccepted until the evidence meets the agreed criteria.' },
        { type: 'h3', text: '3. Investigate the exceptions' },
        { type: 'p', text: 'The investigation agent follows the transaction history, retrieves the applicable fee schedule and checks payout and settlement events. It assembles a likely explanation with source references: a late settlement, a duplicate callback, a fee variance or a missing partner entry. Where the evidence is incomplete, it records what is missing and assigns the next action.' },
        { type: 'h3', text: '4. Check the proposed resolution' },
        { type: 'p', text: 'A separate control step checks that the cited records exist, the calculation balances and the proposal uses an approved rule. Confidence in generated prose cannot authorise a ledger adjustment. Finance owns changes to accounting treatment, disputed fees, write-offs and financial postings, with approvals bound to the exact proposal reviewed.' },
        { type: 'h3', text: '5. Prepare the close' },
        { type: 'p', text: 'The reporting agent prepares matched positions, source completeness, balances by account and currency, and an aged exception list. A finance owner can follow an amount back to the input rows and see the rule version and decision history. Re-running a period preserves the earlier result so a late-arriving file explains a change rather than overwriting it.' },
      ],
    },
    {
      id: 'a-settlement-example',
      heading: 'A £250 difference should stay visible',
      blocks: [
        { type: 'p', text: 'Consider an illustrative GBP settlement batch. Its underlying transfers total £100,000. The agreed partner fees are £750, so the expected bank credit is £99,250. The bank statement shows £99,000. The reconciliation has a £250 difference.' },
        { type: 'p', text: 'The agent can reconstruct the batch, show the fee calculation and retrieve any adjustment notice. If no source explains the remaining £250, it leaves an open exception with the evidence attached. It must not invent an extra fee, widen the tolerance or label the difference as FX simply to complete the match.' },
        { type: 'p', text: 'A reviewer receives a specific question: what explains this £250 reduction against these settlement records? If a later document supplies the answer, the resolution cites that document and retains the original finding. The [companion use case](/use-cases/uk-remittance-ai-reconciliation) lays out the same example alongside the agent workflow.' },
      ],
    },
    {
      id: 'build-around-existing-systems',
      heading: 'Build around the systems already holding the money',
      blocks: [
        { type: 'p', text: 'Start with one corridor, one partner and one settlement account. Connect through approved APIs or controlled file delivery, map references and define the close boundary. The initial workflow reads the existing systems and prepares reconciliation records. It does not need permission to release funds to demonstrate value.' },
        { type: 'p', text: 'exekova can scope the engineering into reviewed changes: a connector with completeness checks, a parser with source references, a versioned matching rule, an exception route and a close report. Each change needs representative input and an expected result that finance can inspect. Credentials and access are limited to the sources and actions that step requires.' },
        { type: 'ul', items: [
          'Replay the same file or callback without counting the same money twice.',
          'Reject ambiguous currency fields and quarantine records that cannot be parsed reliably.',
          'Keep financial arithmetic reproducible, with exact decimal handling and explicit rounding.',
          'Retain source versions, matching rules, evidence and decisions under the organisation’s access and retention policies.',
        ] },
      ],
    },
    {
      id: 'prove-it-before-expanding',
      heading: 'Prove the workflow before expanding it',
      blocks: [
        { type: 'p', text: 'Replay completed periods against finance-labelled outcomes, including known bad matches. Then run alongside the existing close with read-only access. Test late files, partial settlements, duplicate callbacks, refunds and reversals. A match rate alone cannot show that the workflow is correct if the denominator excludes records that failed to load.' },
        { type: 'ul', items: [
          'Input completeness: expected files and records received, validated and accounted for.',
          'Match precision: accepted matches that agree with independently reviewed outcomes.',
          'Coverage: the share of the agreed population reconciled through approved rules.',
          'Exception age and reopened matches: whether unresolved work is shrinking and resolutions hold.',
          'Close preparation time: elapsed time from complete inputs to a reviewable pack, measured over comparable periods.',
        ] },
        { type: 'p', text: 'Expansion follows evidence: another partner format, another corridor or another approved action. The aim is a finance team that spends less time assembling the record and more time deciding the differences that need judgement. Begin with the [UK remittance reconciliation use case](/use-cases/uk-remittance-ai-reconciliation) to see the inputs, ownership and first build.' },
      ],
    },
  ],
  faq: reconciliationFaq.slice(1, 5),
  related: [remittanceReconciliationCase.slug, 'fintech-recon-exceptions', 'fintech-psp-deprecation'],
};
