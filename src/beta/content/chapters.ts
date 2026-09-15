export const teamRoles = [
  { role: 'CEO', icon: 'chart', title: 'Know what the work delivered.', pain: 'More activity does not always mean a finished outcome.', value: 'Give a defined engineering task a clear finish line, an acceptance record, and a price tied to accepted work.', evidence: ['Defined scope', 'Verified outcome', 'Accepted-work pricing'], example: 'One approved task. One outcome you can account for.' },
  { role: 'CFO', icon: 'coins', title: 'Pay for outcomes, not activity.', pain: 'Engineering spend is hard to tie to what was actually delivered.', value: 'Every accepted task is invoiced against its acceptance record at one clear price. Rejected attempts cost nothing, so spend maps to verified outcomes.', evidence: ['One price per accepted task', 'Invoiced against the acceptance record', 'Rejected attempts cost $0'], example: 'One accepted task. One line on the invoice.' },
  { role: 'CTO', icon: 'code', title: 'Keep your engineering standards.', pain: 'A growing backlog still needs careful review and dependable checks.', value: 'Receive a pull request with independent review and verification evidence, ready for your team’s decision.', evidence: ['Isolated task branch', 'Review and check evidence', 'Your team owns the merge'], example: 'A focused code change with its review evidence attached.' },
  { role: 'CIO', icon: 'lock', title: 'Keep work within clear boundaries.', pain: 'Work crosses tools. Access and ownership still need to stay clear.', value: 'Start with approved projects and repositories. Keep the task scope, delivery boundary, and outcome record visible.', evidence: ['Approved projects and repos', 'Explicit task scope', 'Recorded acceptance'], example: 'The right task, in the right repository, with a record.' },
  { role: 'COO', icon: 'gear', title: 'Make the handoff smaller.', pain: 'Following up on each handoff takes attention away from the next priority.', value: 'Give the team one simple journey: get the task, set the repo, receive the verified outcome.', evidence: ['Clear acceptance criteria', 'Three-step handoff', 'Rejected attempts cost $0'], example: 'A clear request becomes a clear result.' },
] as const;

export const industryGroups = [
  { name: 'Financial & regulated', industries: [
    { name: 'Fintech', icon: 'coins', task: 'Payment and ledger changes with test evidence' },
    { name: 'Banking', icon: 'landmark', task: 'Core and channel changes inside risk controls' },
    { name: 'Insurance', icon: 'umbrella', task: 'Rating, claims and policy rules, tested' },
    { name: 'Healthcare & life sciences', icon: 'heart', task: 'Clinical and patient systems with validation' },
    { name: 'Public sector', icon: 'building', task: 'Citizen services with a traceable decision trail' },
  ] },
  { name: 'Digital & service businesses', industries: [
    { name: 'Ecommerce & retail', icon: 'cart', task: 'Checkout, catalogue and fulfilment changes' },
    { name: 'SaaS & software', icon: 'cloud', task: 'Backlog to reviewed, tested software' },
    { name: 'Telecommunications', icon: 'signal', task: 'Provisioning, billing and service integrations' },
    { name: 'Travel & hospitality', icon: 'plane', task: 'Booking, pricing and loyalty workflows' },
    { name: 'Education', icon: 'graduation', task: 'Learning platforms and campus services' },
  ] },
  { name: 'Industrial operations', industries: [
    { name: 'Logistics & supply chain', icon: 'truck', task: 'Tracking, routing and warehouse integrations' },
    { name: 'Energy & utilities', icon: 'bolt', task: 'Metering, billing and grid systems' },
    { name: 'Manufacturing', icon: 'factory', task: 'MES, quality and production planning' },
  ] },
] as const;

export const governanceRules = [
  { label: 'Scope', value: 'Projects and repositories you approve.' },
  { label: 'Delivery', value: 'A pull request on an isolated task branch.' },
  { label: 'Acceptance', value: 'Independent review and required checks must pass.' },
  { label: 'Corrections', value: 'Rejected attempts return for correction within a limited number of attempts.' },
  { label: 'Release', value: 'Your team decides what to merge and deploy.' },
] as const;
