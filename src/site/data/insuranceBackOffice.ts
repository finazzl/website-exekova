import type { Case, CaseOrigin, CaseSlug } from './cases';

/**
 * The insurance back-office suite: the engineering work behind a back office
 * that agents run day to day. Hand written, unlike cases.ts, so the content
 * importer never regenerates it. Every entry uses the shared Case shape, so it
 * renders through CaseArticle and resolves at /use-cases/<slug>.
 */
const ORIGIN: CaseOrigin = { kind: 'industry', key: 'insurance', name: 'Insurance', icon: 'umbrella', href: '/industries/insurance' };

export type AgentSuite = { key: string; name: string; icon: string; tagline: string; body: string; slugs: CaseSlug[] };

export const insuranceBackOfficeCases: Case[] = [
  {
    id: 'commission-reconciliation',
    slug: 'insurance-commission-reconciliation',
    name: 'Commission reconciliation',
    problem: 'Carrier commission statements never quite match the book, and the difference is found by hand.',
    why: 'A commission statement arrives per carrier, per month, in a layout nobody agreed on. Matching it against policies, endorsements and producer contracts is arithmetic a machine should do, and it usually falls to a person with a spreadsheet and a deadline. The matching logic is not the hard part. Proving the match held for every exception class, month after month, is. exekova builds the matching, the exception classes and the regression evidence as one run, so an agent can run the close without a person re-checking it.',
    pressure: 'Every unmatched line is either revenue the business never collected or revenue it will be asked to give back.',
    arrives: 'One statement format with a redacted sample set, the matching rules in force, and the expected treatment for each exception class.',
    runs: [
      { stage: 'Plan', text: 'the statement format, the matching rules and each exception class are stated as testable expectations against the redacted sample set.' },
      { stage: 'Assemble', text: 'matching, exception handling and the regression set are one unit of work, not three tickets that land in different sprints.' },
      { stage: 'Execute', text: 'the matching and exception logic is implemented on an isolated branch, with tolerances and rounding rules made explicit rather than implied.' },
      { stage: 'Review', text: 'an independent capability reviews the diff with the sample reconciliation attached, never the capability that wrote it.' },
      { stage: 'Accept', text: 'the sample month is re-run end to end, and every exception class has to land in its expected bucket before the work is accepted.' },
    ],
    returns: [
      'A reviewed pull request with the matching rules and tolerances readable in the code.',
      'A regression case per exception class, named after the class it protects.',
      'The reconciled sample month kept with the run, so the next change has a baseline to move against.',
      'Statement lines that stay unmatched by design, listed rather than quietly absorbed.',
    ],
    keeps: ['Accounting treatment', 'Carrier dispute decisions', 'Producer communication'],
    keepsLabel: 'What stays your decision',
    origin: ORIGIN,
    title: 'Commission reconciliation for insurers and brokers',
    description: 'Carrier commission statements never quite match the book, and the difference is found by hand.',
  },
  {
    id: 'statement-extraction',
    slug: 'insurance-statement-extraction',
    name: 'Carrier statement extraction',
    problem: 'Every carrier sends a different file, and each new format breaks the loader.',
    why: 'Statements arrive as spreadsheets, delimited files, portal exports and scanned PDFs, and a carrier changes its layout without telling anyone. Each change is a small parsing job and a large interruption, because the month cannot close until the file loads. The work is repetitive enough to look trivial and frequent enough to eat a week. exekova takes one format at a time, builds the extraction with its sample set attached, and proves the formats already working did not move.',
    pressure: 'A format nobody can load stops the close, and the close does not move for a parsing defect.',
    arrives: 'A failing or new statement format with redacted samples and the field mapping the business expects from it.',
    runs: [
      { stage: 'Plan', text: 'the expected field mapping is written against the redacted samples, including the rows that should be rejected rather than guessed at.' },
      { stage: 'Assemble', text: 'extraction, validation and regression cases for the formats already in production are held as one unit.' },
      { stage: 'Execute', text: 'the parser or mapping is implemented on an isolated branch, with header drift and column reordering handled explicitly.' },
      { stage: 'Review', text: 'an independent capability reviews the change with the before and after extraction attached.' },
      { stage: 'Accept', text: 'the new format loads, every previously supported format re-loads unchanged, and rejected rows carry a stated reason.' },
    ],
    returns: [
      'A reviewed pull request with the field mapping explicit rather than inferred.',
      'Extraction results for the new format and every format already supported, in one record.',
      'Rows the extractor refuses to guess at, routed to review with the reason recorded.',
    ],
    keeps: ['Which carriers are in scope', 'Data retention policy', 'How disputed rows are resolved'],
    keepsLabel: 'What stays your decision',
    origin: ORIGIN,
    title: 'Carrier statement extraction that survives format drift',
    description: 'Every carrier sends a different file, and each new format breaks the loader.',
  },
  {
    id: 'payout-calculation',
    slug: 'insurance-payout-calculation',
    name: 'Producer payout calculation',
    problem: 'Splits, overrides and clawbacks are right in the contract and wrong in the payout.',
    why: 'Producer compensation is a small rules engine wearing a spreadsheet. Splits change mid term, overrides run up a hierarchy, clawbacks reverse across periods, and the effective date decides which version applies. Every one of those is describable, and describing them is exactly what nobody has time for. exekova implements the rules with the effective dates explicit and holds the change at review until an unchanged control cohort still pays the same.',
    pressure: 'An incorrect payout is not a bug report. It is a conversation with the producer and a correction in the next cycle.',
    arrives: 'The compensation rules with their effective dates, a cohort of producers to test against, and the payouts the business expects for them.',
    runs: [
      { stage: 'Plan', text: 'splits, overrides, clawbacks and effective dating are decomposed into rules that can each be stated and tested on their own.' },
      { stage: 'Assemble', text: 'the target cohort and an unchanged control cohort are prepared together, so movement shows up inside the run rather than after it.' },
      { stage: 'Execute', text: 'the rules are implemented on an isolated branch with the effective-date logic written down rather than assumed.' },
      { stage: 'Review', text: 'the change is held at review until the control cohort still pays exactly what it paid before.' },
      { stage: 'Accept', text: 'calculated payouts are compared across both cohorts, and any unexplained movement blocks acceptance.' },
    ],
    returns: [
      'A reviewed pull request with each compensation rule testable on its own.',
      'Payout comparison across the target and control cohorts, kept as one record.',
      'Producers whose payout moved, named before release rather than discovered in the cycle.',
    ],
    keeps: ['Compensation policy', 'Contract terms', 'Payment approval and release'],
    keepsLabel: 'What stays your decision',
    origin: ORIGIN,
    title: 'Producer payout calculation, proven before release',
    description: 'Splits, overrides and clawbacks are right in the contract and wrong in the payout.',
  },
  {
    id: 'producer-onboarding',
    slug: 'insurance-producer-onboarding',
    name: 'Producer and agency onboarding',
    problem: 'A producer is ready to sell while the licence, appointment and hierarchy checks sit in an inbox.',
    why: 'Onboarding a producer is a sequence of verifications: licence status, lines of authority, appointments per carrier and state, hierarchy placement, banking details and the compensation plan that follows from all of it. Each step is checkable against a source, and the sequence is where the days go. exekova builds the verification steps, the routing for the checks that fail, and the audit trail the sequence has to leave behind, so an agent can carry a producer from application to active.',
    pressure: 'Every day a licensed producer cannot write business is distribution capacity the business already paid for.',
    arrives: 'The onboarding sequence with the source for each verification, the rules for routing a failure, and what an activated producer must have on record.',
    runs: [
      { stage: 'Plan', text: 'each verification is mapped to the source that answers it and the evidence that records the answer.' },
      { stage: 'Assemble', text: 'the checks, the exception routing and the audit trail are one unit, because a check with no trail is not a check.' },
      { stage: 'Execute', text: 'the sequence is implemented on an isolated branch with failures routed to a named owner rather than a shared queue.' },
      { stage: 'Review', text: 'an independent capability reviews the change against the verification sources it claims to read.' },
      { stage: 'Accept', text: 'a sample producer runs application to active, and every step has to leave the evidence the sequence promised.' },
    ],
    returns: [
      'A reviewed pull request with each verification traceable to its source.',
      'An audit trail per onboarding step, retained against the run.',
      'Checks that still need a person, named explicitly rather than left implied.',
    ],
    keeps: ['Appointment decisions', 'Licensing and regulatory filings', 'Which producers are approved'],
    keepsLabel: 'What stays your decision',
    origin: ORIGIN,
    title: 'Producer and agency onboarding, verified end to end',
    description: 'A producer is ready to sell while the licence, appointment and hierarchy checks sit in an inbox.',
  },
  {
    id: 'bordereaux-processing',
    slug: 'insurance-bordereaux-processing',
    name: 'Bordereaux processing',
    problem: 'Bordereaux arrive late, in columns that shift, and the month closes around them.',
    why: 'Delegated authority runs on bordereaux, and bordereaux run on whatever the coverholder exported that month. Columns move, currencies mix, risk codes drift and the same policy appears twice under two references. Cleaning that by hand is a monthly tax on the same people every time. exekova builds the ingestion, the validation rules and the duplicate handling with a sample month attached, so the next close runs on rules rather than memory.',
    pressure: 'A bordereau that cannot be trusted delays the close and weakens every figure downstream of it.',
    arrives: 'A bordereau format with a redacted sample month, the validation rules it must satisfy, and how duplicates and currency mixes should be treated.',
    runs: [
      { stage: 'Plan', text: 'the validation rules, risk-code mapping and duplicate policy are written as expectations against the sample month.' },
      { stage: 'Assemble', text: 'ingestion, validation and the regression set for coverholders already onboarded are one unit of work.' },
      { stage: 'Execute', text: 'ingestion and validation are implemented on an isolated branch, with currency and reference handling explicit.' },
      { stage: 'Review', text: 'an independent capability reviews the change with the validated sample month attached.' },
      { stage: 'Accept', text: 'the sample month validates, the coverholders already live re-validate unchanged, and every rejected row carries its reason.' },
    ],
    returns: [
      'A reviewed pull request with the validation rules readable rather than buried.',
      'A validated sample month kept with the run as the baseline for the next change.',
      'Rows held back for review, with the rule that held them back named.',
    ],
    keeps: ['Coverholder relationships', 'Underwriting acceptance', 'Regulatory reporting'],
    keepsLabel: 'What stays your decision',
    origin: ORIGIN,
    title: 'Bordereaux processing for delegated authority',
    description: 'Bordereaux arrive late, in columns that shift, and the month closes around them.',
  },
  {
    id: 'revenue-leakage',
    slug: 'insurance-revenue-leakage',
    name: 'Revenue leakage detection',
    problem: 'The book leaks quietly, in rounding, lapsed appointments and unbilled endorsements.',
    why: 'Leakage is rarely one large error. It is a rounding rule applied at the wrong level, an endorsement that never reached billing, a commission paid on a cancelled policy, an appointment that lapsed while the producer kept writing. Each is small enough to survive a review and regular enough to matter over a year. exekova builds the detection rules as testable checks with the evidence attached, so the finding is a case a person can act on rather than a number in a dashboard.',
    pressure: 'Leakage found in an audit is a restatement. Leakage found by a check is a correction.',
    arrives: 'The leakage classes to detect, the data they can be detected from, and what a credible finding has to show before anyone acts on it.',
    runs: [
      { stage: 'Plan', text: 'each leakage class becomes a detection rule with a stated threshold and the evidence a finding must carry.' },
      { stage: 'Assemble', text: 'detection, evidence assembly and the false-positive cases are one unit, so precision is measured rather than hoped for.' },
      { stage: 'Execute', text: 'the checks are implemented on an isolated branch against a redacted extract, with thresholds explicit.' },
      { stage: 'Review', text: 'an independent capability reviews the rules and the findings they produced on the sample extract.' },
      { stage: 'Accept', text: 'known leakage in the sample is found, known clean records stay clean, and every finding carries its evidence.' },
    ],
    returns: [
      'A reviewed pull request with each detection rule and threshold stated in the code.',
      'Findings on the sample extract with the evidence each one rests on.',
      'Leakage classes the data cannot yet support, named rather than approximated.',
    ],
    keeps: ['Whether to pursue a finding', 'Customer and producer remediation', 'Financial restatement'],
    keepsLabel: 'What stays your decision',
    origin: ORIGIN,
    title: 'Revenue leakage detection across an insurance book',
    description: 'The book leaks quietly, in rounding, lapsed appointments and unbilled endorsements.',
  },
];

/** The three suites the back office is organised into, in the order the hub page shows them. */
export const insuranceSuites: AgentSuite[] = [
  {
    key: 'finance',
    name: 'Finance operations',
    icon: 'coins',
    tagline: 'The close, without the spreadsheet',
    body: 'Matching carrier statements to the book and paying producers what their contracts actually say, with the rules readable and the exception classes tested.',
    slugs: ['insurance-commission-reconciliation', 'insurance-payout-calculation'],
  },
  {
    key: 'distribution',
    name: 'Distribution and delegated authority',
    icon: 'users',
    tagline: 'Capacity that activates on time',
    body: 'Carrying a producer from application to active, and taking in bordereaux that arrive in whatever shape the coverholder exported, with the audit trail each step owes.',
    slugs: ['insurance-producer-onboarding', 'insurance-bordereaux-processing'],
  },
  {
    key: 'intelligence',
    name: 'Data and intelligence',
    icon: 'chart',
    tagline: 'Findings with evidence attached',
    body: 'Loading every carrier format without a person rewriting the parser, and turning leakage from an annual audit finding into a check that runs with the close.',
    slugs: ['insurance-statement-extraction', 'insurance-revenue-leakage'],
  },
];

export function insuranceCaseBySlug(slug: string) {
  return insuranceBackOfficeCases.find(item => item.slug === slug);
}

export function insuranceCasesFor(suite: AgentSuite) {
  return suite.slugs.map(slug => insuranceCaseBySlug(slug)).filter(Boolean) as Case[];
}
