/**
 * The two long-form walkthroughs (a remittance launch, a PCI readiness epic),
 * generated from the exekova.com content layer by scripts/import-site-content.py.
 * Both are presentations built on synthetic artefacts; their `provenance`
 * line says so and every page shows it. Content only.
 */
export type Scenario = {
  slug: string; id: string; label: string; title: string; description: string;
  headline: [string, string]; body: string; problem: string; provenance: string;
  assumptions: string[]; contract: { label: string; body: string }[]; brief: { label: string; body: string }[];
  scope: { in: string[]; later: string[] } | null;
  plan: { time: string; title: string; body: string; exit: string }[];
  chapters: { id: string; label: string; eyebrow: string; title: string; body: string; output: string; owner: string }[];
  criteria: { id: string; label: string; detail: string; kind: string }[];
  metrics: { label: string; value: string; detail: string }[];
  approvals: { id: string; title: string; owner: string; status: string; detail: string }[];
  workers: { role: string; task: string; tool: string; output: string }[];
  economics: { time: string; cost: string; business: string } | null;
  faq: { q: string; a: string }[];
  sources: { label: string; url: string; detail: string }[];
  lens: { label: string; title: string; accent: string; body: string; note: string; roles: { role: string; icon: string; question: string; answer: string }[] };
  changes: { id: string; finding: string; title: string; kind: string; before: string; after: string; test: string; tool: string }[];
};

export const scenarios: Scenario[] = [
  {
    "slug": "remittance",
    "id": "WZ-RMT-001",
    "label": "Enterprise use case / CEO launch brief",
    "title": "A remittance brief to a verified release",
    "description": "A remittance-app ambition taken through planning, work graphs, execution, independent verification and an evidence-backed launch decision.",
    "headline": [
      "From a remittance ambition",
      "to a verified release."
    ],
    "body": "You set the market, the ambition and the standard. exekova turns them into coordinated work, checked software and a launch decision backed by evidence.",
    "problem": "“I want to launch a remittance app that competes with Remitly. Start with U.S. → India transfers. Show me what we can release, what proves it works and what still needs my approval.”",
    "provenance": "Illustrative enterprise scenario. The app, work records and results are synthetic; no money moves and no customer system is changed.",
    "assumptions": [
      "U.S. → India · USD / INR",
      "Consumer app · bank deposit",
      "12-week planning target",
      "Licensed partner model · subject to review"
    ],
    "contract": [
      {
        "label": "You bring",
        "body": "A launch goal, target corridor, budget, systems and definition of done."
      },
      {
        "label": "exekova owns",
        "body": "The plan, work graph, teams, execution state, checks and recovery."
      },
      {
        "label": "You receive",
        "body": "A release candidate, evidence pack and a clear launch decision."
      }
    ],
    "brief": [
      {
        "label": "The customer problem",
        "body": "People supporting family need to understand the total cost, what arrives and where a transfer stands. A failed payment must have a clear resolution."
      },
      {
        "label": "The business problem",
        "body": "A CEO can commission an app. Coordinating product, engineering, risk, payment partners and release decisions is the harder work."
      },
      {
        "label": "The first outcome",
        "body": "An accepted release candidate for one corridor, with every critical journey tested in a partner sandbox and remaining launch approvals made explicit."
      }
    ],
    "scope": {
      "in": [
        "Identity onboarding with a selected provider",
        "Transparent quote and confirmation",
        "Recipient and bank-detail validation",
        "Funding and payout sandbox adapters",
        "Transfer status, receipt and support journey",
        "Reconciliation, audit trail and rollback plan"
      ],
      "later": [
        "Additional corridors and payout methods",
        "Cash pickup, wallets and credit products",
        "Live funds or production credentials",
        "Public launch before partner and release approval"
      ]
    },
    "plan": [
      {
        "time": "Weeks 01-02",
        "title": "Decide the first release",
        "body": "Validate customer needs, corridor assumptions and partner fit. Freeze the brief, risk register and acceptance contract.",
        "exit": "Product + risk owners approve scope."
      },
      {
        "time": "Weeks 03-06",
        "title": "Build the connected journey",
        "body": "Deliver the app, quote service, ledger and partner adapters against versioned contracts and sandbox data.",
        "exit": "Critical paths run end to end in the sandbox."
      },
      {
        "time": "Weeks 07-10",
        "title": "Break it before launch",
        "body": "Exercise retries, duplicate events, failed payouts, reconciliation and access boundaries. Repair within the agreed limits.",
        "exit": "Required tests and independent review pass."
      },
      {
        "time": "Weeks 11-12",
        "title": "Make the launch decision",
        "body": "Deliver the signed-off candidate, evidence and operations playbook. Surface unresolved external approvals.",
        "exit": "Release owner decides whether to go live."
      }
    ],
    "chapters": [
      {
        "id": "intent",
        "label": "Intent",
        "eyebrow": "CEO → EXEKOVA",
        "title": "One goal. A testable finish line.",
        "body": "Capture the business ambition, audience, corridor and constraints. The output is an accepted software candidate and a launch decision pack.",
        "output": "CEO brief v1 · WZ-RMT-001",
        "owner": "CEO sets the outcome"
      },
      {
        "id": "understand",
        "label": "Understand",
        "eyebrow": "CONTEXT → CONSTRAINTS",
        "title": "Resolve the assumptions before they become code.",
        "body": "Separate customer needs, competitor expectations and corridor dependencies. Partner selection, legal operating model and launch authorization stay with named owners.",
        "output": "Scope, assumptions and decision register",
        "owner": "exekova structures; your owners decide"
      },
      {
        "id": "plan",
        "label": "Plan",
        "eyebrow": "INTENT → DELIVERY PLAN",
        "title": "Make the launch small enough to prove.",
        "body": "Sequence the release around one corridor and bank deposits. The 12-week target is a planning assumption, reviewed against partner readiness and your budget.",
        "output": "Four milestones with explicit exit criteria",
        "owner": "exekova coordinates dependencies"
      },
      {
        "id": "graph",
        "label": "Work graph",
        "eyebrow": "DEPENDENCIES → ACCOUNTABILITY",
        "title": "Every workstream joins the same acceptance path.",
        "body": "Product, payments and risk can progress in parallel. Integration verification waits for their contracts; release waits for the evidence and required approvals.",
        "output": "One graph · shared policy · retained state",
        "owner": "exekova owns the work graph"
      },
      {
        "id": "assemble",
        "label": "Assemble",
        "eyebrow": "CAPABILITIES → A WORKING TEAM",
        "title": "Assign the work. Keep authority in the platform.",
        "body": "Choose builders, a separate reviewer and verification workers for each task. Engines receive scoped work; exekova retains the graph, permissions and acceptance record.",
        "output": "Six responsibilities with named deliverables",
        "owner": "Author and reviewer remain separate"
      },
      {
        "id": "execute",
        "label": "Execute",
        "eyebrow": "PLAN → A CONNECTED CANDIDATE",
        "title": "Build the journey and the systems behind it.",
        "body": "The app, quote service, ledger, adapters and support flows converge in a sandbox candidate. An engine reporting “complete” creates a reviewable change, not a launch approval.",
        "output": "Release candidate rc.1 · sandbox only",
        "owner": "Workers execute; exekova tracks the run"
      },
      {
        "id": "gate",
        "label": "Gate",
        "eyebrow": "COMPLETION CLAIM → EVIDENCE",
        "title": "A duplicate event stops acceptance.",
        "body": "Replay testing delivers the same payout callback twice. The ledger posts twice in rc.1. exekova holds acceptance and routes a bounded repair to the payments worker.",
        "output": "PAY-04 failed · acceptance held",
        "owner": "Required evidence overrides the completion claim"
      },
      {
        "id": "verify",
        "label": "Verify",
        "eyebrow": "REPAIR → INDEPENDENT RETEST",
        "title": "Prove the repaired revision, not the old one.",
        "body": "The repair adds an idempotency guard. Replay and reconciliation checks run again, then a separate reviewer evaluates rc.2. The same run retains the failed evidence.",
        "output": "rc.2 · six software criteria pass",
        "owner": "Tests and independent review decide acceptance"
      },
      {
        "id": "deliver",
        "label": "Deliver",
        "eyebrow": "ACCEPTED WORK → YOUR SYSTEMS",
        "title": "Hand over a candidate your team can inspect.",
        "body": "Return the reviewed changes, check reports, operations playbook and unresolved launch decisions. No deployment or money movement is authorized by this demo.",
        "output": "Candidate + evidence + operations + approval register",
        "owner": "Your release owner authorizes production"
      },
      {
        "id": "outcome",
        "label": "Outcome",
        "eyebrow": "CEO VIEW → VERIFIED SCOPE",
        "title": "Know what is ready. Know what is still open.",
        "body": "The software acceptance record is complete in this sample. Partner/legal clearance and production authorization remain open. You have an evidence-backed launch decision, not a vague “done.”",
        "output": "Software accepted · public launch awaiting approval",
        "owner": "Business outcome remains accountable to your standard"
      }
    ],
    "criteria": [
      {
        "id": "UX-01",
        "label": "Quote and customer journey",
        "detail": "Fees, rate, recipient amount and quote expiry are shown before confirmation.",
        "kind": "Journey + contract tests"
      },
      {
        "id": "RISK-02",
        "label": "Identity and risk decision paths",
        "detail": "Sandbox pass, fail and manual-review responses route correctly.",
        "kind": "Provider contract tests"
      },
      {
        "id": "PAY-03",
        "label": "Funding, payout and failed-payment paths",
        "detail": "Success, failure and refund status map to a consistent transfer state.",
        "kind": "Integration tests"
      },
      {
        "id": "PAY-04",
        "label": "Duplicate events and reconciliation",
        "detail": "Repeated callbacks produce one ledger effect and a reconciled balance.",
        "kind": "Replay + ledger tests"
      },
      {
        "id": "OPS-05",
        "label": "Operations and access boundaries",
        "detail": "Alerts, denied actions and rollback steps are exercised in the sandbox.",
        "kind": "Runbook + policy tests"
      },
      {
        "id": "REV-06",
        "label": "Independent review of the current revision",
        "detail": "A reviewer separate from the author accepts rc.2 against the brief.",
        "kind": "Reviewer judgment"
      }
    ],
    "metrics": [
      {
        "label": "Quality",
        "value": "6 / 6",
        "detail": "Software acceptance criteria · illustrative result"
      },
      {
        "label": "Recovery",
        "value": "1 repair",
        "detail": "Duplicate callback failure → scoped repair → retest"
      },
      {
        "label": "Continuity",
        "value": "1 record",
        "detail": "The intent, changes, failures and decision stay linked"
      },
      {
        "label": "Launch authority",
        "value": "2 open",
        "detail": "External clearance and production authorization"
      }
    ],
    "approvals": [
      {
        "id": "EXT-01",
        "title": "Partner & legal clearance",
        "owner": "Legal / risk / payment partner",
        "status": "Pending",
        "detail": "Confirm the operating model, corridor coverage, agreements and customer-facing obligations."
      },
      {
        "id": "REL-02",
        "title": "Production authorization",
        "owner": "Your accountable release owner",
        "status": "Pending",
        "detail": "Approve credentials, deployment, exposure limits, monitoring and go-live timing."
      }
    ],
    "workers": [
      {
        "role": "Product lead",
        "task": "Turn the CEO brief into journeys, decisions and acceptance criteria.",
        "tool": "Jira",
        "output": "Versioned launch brief"
      },
      {
        "role": "Application builder",
        "task": "Build onboarding, quote, recipient and tracking screens.",
        "tool": "Claude Code",
        "output": "Reviewed application changes"
      },
      {
        "role": "Payments builder",
        "task": "Implement sandbox adapters, ledger posting and idempotency.",
        "tool": "Codex",
        "output": "Versioned service changes"
      },
      {
        "role": "Independent reviewer",
        "task": "Check the current revision against the approved scope and risks.",
        "tool": "GitHub",
        "output": "Separate review decision"
      },
      {
        "role": "Verification worker",
        "task": "Run contract, regression, reconciliation and failure-path checks.",
        "tool": "GitLab",
        "output": "Criterion-linked test evidence"
      },
      {
        "role": "Operations lead",
        "task": "Prepare alerts, incident response, support and rollback handoff.",
        "tool": "Datadog",
        "output": "Launch operations pack"
      }
    ],
    "economics": {
      "time": "Track request-to-accepted-candidate time and time waiting for partner decisions separately. The 12-week plan is a target, not measured execution time.",
      "cost": "Capture engine, compute and partner-sandbox usage per accepted work package. Add human review and platform fees when calculating total launch cost.",
      "business": "After authorized launch, measure completed-transfer rate, reconciliation exceptions, support contacts and cost per completed transfer against your baseline. No revenue or adoption has been measured here."
    },
    "faq": [
      {
        "q": "Is this a real app launch or a customer case study?",
        "a": "This is an interactive enterprise scenario. The app preview, work records, checks and acceptance results are synthetic. They demonstrate the intended exekova execution model without connected systems or money movement."
      },
      {
        "q": "Does “verified outcome” mean we can immediately send real money?",
        "a": "Here it means the software candidate meets the six sample acceptance criteria. Partner/legal clearance and production authorization remain pending. Real launch readiness must be established with your payment partners, accountable owners and the evidence from your environment."
      },
      {
        "q": "What remains with our team?",
        "a": "You set the market, budget and standard, select and contract with providers, make legal and risk decisions, and authorize production. exekova coordinates work within the approved scope and retains its state and evidence."
      },
      {
        "q": "How does Remitly inform the brief?",
        "a": "Remitly is the competitive reference for a consumer remittance experience. Published pricing visibility, delivery options and tracking inform baseline expectations. The proposed product position still needs customer validation; no claim of superiority or affiliation is made."
      },
      {
        "q": "What happens if the repair fails?",
        "a": "The example permits one repair attempt. A failed retest escalates the same record with its evidence and open decision. Selecting a later chapter cannot turn that failed branch into accepted software."
      },
      {
        "q": "How do we use this for our own launch?",
        "a": "Bring your target markets, customer problem, current systems, budget and definition of done. Scope a first work package and agree the acceptance evidence, permissions and human approval boundaries before execution."
      }
    ],
    "sources": [
      {
        "label": "Remitly · U.S. money transfers",
        "url": "https://www.remitly.com/us/en/money-transfer",
        "detail": "Competitive baseline: pricing visibility, destination-dependent delivery options and tracking."
      },
      {
        "label": "CFPB · Sending money to another country",
        "url": "https://www.consumerfinance.gov/consumer-tools/sending-money/",
        "detail": "Consumer-facing remittance guidance. Your legal team determines the requirements applicable to the actual launch."
      }
    ],
    "lens": {
      "label": "08 / WHAT EACH CHAIR GETS",
      "title": "One launch.",
      "accent": "Five different questions.",
      "body": "A launch is not read the same way by everyone who has to sign off on it. The same record answers each of them, without anyone waiting for a status meeting.",
      "note": "Illustrative scenario with synthetic artifacts. Every answer above points at a part of the record on this page, not at a measured customer result.",
      "roles": [
        {
          "role": "CEO",
          "icon": "chart",
          "question": "Did the ambition become something I can release?",
          "answer": "A software candidate that met all six acceptance criteria, and the two decisions still sitting with you: partner and legal clearance, and production authorization."
        },
        {
          "role": "COO",
          "icon": "grid",
          "question": "Where did the work wait, and on whom?",
          "answer": "Time spent waiting on partner decisions is tracked apart from execution time, so a delay is attributed to a queue rather than absorbed into one number."
        },
        {
          "role": "CFO",
          "icon": "coins",
          "question": "What did the accepted candidate cost?",
          "answer": "Engine, compute and partner-sandbox usage per accepted work package, with human review and platform fees added for the full launch figure. Revenue and adoption are not measured here."
        },
        {
          "role": "CIO",
          "icon": "lock",
          "question": "What reached which system, and on whose authority?",
          "answer": "Execution ran inside partner sandboxes against an explicit authority policy that names where autonomy ends. No connected production system was changed."
        },
        {
          "role": "CTO",
          "icon": "code",
          "question": "Did it pass without certifying itself?",
          "answer": "One criterion failed on duplicate callbacks. A bounded repair and retest followed, and the acceptance decision stayed separate from the capability that wrote the change."
        }
      ]
    },
    "changes": []
  },
  {
    "slug": "stablecoin-pci-audit",
    "id": "WZ-PCI-001",
    "label": "Assessment readiness / MB-PCI-101",
    "title": "MostoBank: a Jira epic to PCI readiness",
    "description": "A stablecoin-rails audit taken through sample pre-assessment, work graph, controlled changes and independent retesting, with a reviewable evidence pack.",
    "headline": [
      "From “run the audit”",
      "to “show me the proof.”"
    ],
    "body": "Run the PCI audit on our new stablecoin rails. Show me the gaps, make approved changes, and bring back evidence I can take into the assessment.",
    "problem": "Run the PCI audit on our new stablecoin rails. Show me the gaps, make approved changes, and bring back evidence I can take into the assessment.",
    "provenance": "Illustrative MostoBank scenario supplied by the user. MB-PCI-101 is a sample Jira key. Reports, findings, approvals, changes, tests and durations are synthetic; no systems have been inspected or changed.",
    "assumptions": [],
    "contract": [],
    "brief": [],
    "scope": null,
    "plan": [],
    "chapters": [
      {
        "id": "intent",
        "label": "Intent",
        "eyebrow": "",
        "title": "One epic. A clear owner.",
        "body": "Neeraj asks exekova to prepare MostoBank’s new stablecoin rails for a PCI assessment. The epic becomes a bounded work package, with evidence and approval requirements.",
        "output": "Jira epic → acceptance contract",
        "owner": "Neeraj / CTO"
      },
      {
        "id": "understand",
        "label": "Understand",
        "eyebrow": "",
        "title": "Find the boundary before the findings.",
        "body": "Trace card-data flows and services that can affect their security. In this scenario, a card-funded on-ramp and shared infrastructure make scoping the first workstream.",
        "output": "Scope map + pre-assessment report",
        "owner": "Scope analyst + MostoBank security owner"
      },
      {
        "id": "plan",
        "label": "Plan",
        "eyebrow": "",
        "title": "Turn gaps into owned work.",
        "body": "Group the four sample gaps by dependency. Collect network, logging and access evidence in parallel. Keep change approval, review and retesting on the critical path.",
        "output": "Dependency plan + six local checks",
        "owner": "exekova execution coordinator"
      },
      {
        "id": "graph",
        "label": "Work graph",
        "eyebrow": "",
        "title": "See what can move together.",
        "body": "The network, application and identity branches share one scope record. They converge before changes; a failed check sends only the affected work back for repair.",
        "output": "One graph · three parallel branches",
        "owner": "exekova retains state and dependencies"
      },
      {
        "id": "assemble",
        "label": "Assemble",
        "eyebrow": "",
        "title": "The right capability. A separate reviewer.",
        "body": "Assign scope analysis, network checks, code remediation and evidence review to distinct responsibilities. Limit write access to the approved staging change set.",
        "output": "Scoped worker assignments",
        "owner": "Security owner approves grants"
      },
      {
        "id": "execute",
        "label": "Execute",
        "eyebrow": "",
        "title": "Make the change. Keep the before.",
        "body": "After the sample approval, apply the network policy and logging changes in staging. Refresh the access evidence. Record the diff, author and rollback plan.",
        "output": "Four updates · candidate r1",
        "owner": "Change workers / approved sandbox scope"
      },
      {
        "id": "gate",
        "label": "Gate",
        "eyebrow": "",
        "title": "“Fixed” meets the retry path.",
        "body": "The first logging fix misses the retry handler. Five checks pass; LOG-03 fails. exekova holds acceptance, preserves the failed evidence and opens one bounded repair.",
        "output": "5 / 6 checks · acceptance held",
        "owner": "Independent reviewer"
      },
      {
        "id": "verify",
        "label": "Verify",
        "eyebrow": "",
        "title": "Repair once. Test the whole path.",
        "body": "Route the retry handler through the reviewed allowlist. Run fresh checks against r2, including allowed network traffic and current access evidence. A separate reviewer checks the result.",
        "output": "6 / 6 local checks · successful sample",
        "owner": "Independent reviewer / not the author"
      },
      {
        "id": "deliver",
        "label": "Deliver",
        "eyebrow": "",
        "title": "Give the assessor a coherent record.",
        "body": "Package the pre-report, change history, failed gate, current evidence and open decisions. Prepare the Jira update against the original epic, without closing the formal audit.",
        "output": "Review package + draft epic update",
        "owner": "Neeraj + assessment owner"
      },
      {
        "id": "outcome",
        "label": "Outcome",
        "eyebrow": "",
        "title": "A stronger review. A visible next decision.",
        "body": "Neeraj can see what changed, why it passed and what still needs external validation. The sample readiness work is complete; formal assessment and production approval remain open.",
        "output": "Evidence package ready for review",
        "owner": "Assessment and release authorities"
      }
    ],
    "criteria": [
      {
        "id": "SCOPE-01",
        "label": "Scope and dependency record",
        "detail": "Card-data paths and CDE-impacting services identified in the sample boundary record.",
        "kind": "Scope / applicability · Unresolved → Documented"
      },
      {
        "id": "NET-02",
        "label": "Settlement-to-CDE access",
        "detail": "The proposed settlement worker cannot reach the sample CDE administration endpoint.",
        "kind": "Network security · Failed → Passed"
      },
      {
        "id": "LOG-03",
        "label": "Payment-data logging",
        "detail": "Normal and retry-path fixtures both omit the prohibited sample payload fields.",
        "kind": "Data protection / logging · Failed → Passed"
      },
      {
        "id": "IAM-04",
        "label": "Privileged-access evidence",
        "detail": "The MFA and role-policy snapshot is bound to the current sample configuration.",
        "kind": "Access / authentication · Stale → Refreshed"
      },
      {
        "id": "TRACE-05",
        "label": "Change-to-evidence linkage",
        "detail": "Every finding resolves to a change, a configuration revision and a retest record.",
        "kind": "Evidence traceability · Passed → Passed"
      },
      {
        "id": "OWNER-06",
        "label": "Accountable review owner",
        "detail": "The remediation author and acceptance reviewer remain separate.",
        "kind": "Responsibilities · Passed → Passed"
      }
    ],
    "metrics": [],
    "approvals": [
      {
        "id": "EXT-01",
        "title": "Confirm scope and validation route",
        "owner": "MostoBank assessment owner + applicable acquirer / compliance program",
        "status": "",
        "detail": "Confirm applicability, final system boundaries and the required assessment method."
      },
      {
        "id": "EXT-02",
        "title": "Obtain required independent testing",
        "owner": "Assessment owner + qualified providers where required",
        "status": "",
        "detail": "Determine applicable scanning and testing obligations; obtain current evidence from the appropriate providers."
      },
      {
        "id": "EXT-03",
        "title": "Complete formal assessment and release approval",
        "owner": "Authorized assessment participants + MostoBank release authority",
        "status": "",
        "detail": "Complete the applicable official documentation and separately authorize any production changes."
      }
    ],
    "workers": [
      {
        "role": "Scope analyst",
        "task": "Connect data flows, assets and ownership.",
        "tool": "Confluence",
        "output": "Read-only"
      },
      {
        "role": "Network worker",
        "task": "Inspect the boundary; propose the narrow policy diff.",
        "tool": "Cloudflare",
        "output": "Scoped staging change"
      },
      {
        "role": "Code worker",
        "task": "Repair the logging paths and keep the rejected revision.",
        "tool": "GitHub",
        "output": "Approved source branch"
      },
      {
        "role": "Identity analyst",
        "task": "Collect current access evidence with secrets excluded.",
        "tool": "AWS",
        "output": "Redacted exports"
      },
      {
        "role": "Independent reviewer",
        "task": "Challenge the candidate against the six local checks.",
        "tool": "Codex",
        "output": "Evidence + test candidate"
      },
      {
        "role": "Accountable owner",
        "task": "Neeraj controls scope; authorized owners approve decisions.",
        "tool": "Jira",
        "output": "Human decisions"
      }
    ],
    "economics": null,
    "faq": [
      {
        "q": "Is this an actual MostoBank audit?",
        "a": "No. Neeraj and MostoBank define the requested scenario. The Jira key, infrastructure, findings, approvals, changes, results and timings are synthetic. Nothing has been read from Jira or changed in connected systems."
      },
      {
        "q": "Do stablecoin rails automatically fall under PCI DSS?",
        "a": "No. Scope depends on payment account data and systems that can affect the cardholder data environment. This scenario assumes a card-funded on-ramp with shared infrastructure. The real architecture and applicable compliance program must establish scope."
      },
      {
        "q": "Does “ready for review” mean PCI compliant?",
        "a": "No. It means the six selected checks in this synthetic readiness package passed. It does not establish that all PCI DSS requirements are met, complete an official assessment or authorize production changes."
      },
      {
        "q": "Where does the speed improvement come from?",
        "a": "Only the network, logging and access evidence work is parallelized in the model. Both schedules include the same 360 worker-minutes, one repair, all review gates and the approval wait you select. Real evidence collection and formal assessments can take substantially longer."
      },
      {
        "q": "What happens when a repair fails or approval is missing?",
        "a": "Missing change approval holds execution. Stale evidence cannot satisfy the current revision. If the single permitted repair still fails verification, the demo escalates and withholds an accepted delivery package."
      },
      {
        "q": "What remains outside this work package?",
        "a": "Final PCI scope and validation method, applicable independent testing and formal documentation remain external decisions. Stablecoin custody, smart-contract security, reserves, AML and other obligations require separate review streams."
      }
    ],
    "sources": [
      {
        "label": "PCI SSC · PCI DSS scope and assessment roles",
        "url": "https://www.pcisecuritystandards.org/standards/pci-dss/",
        "detail": "Payment-account-data scope and systems that can affect the CDE; compliance-program responsibilities."
      },
      {
        "label": "PCI SSC · current PCI DSS v4.0.1 reference",
        "url": "https://blog.pcisecuritystandards.org/request-for-comments-pci-data-security-standard-pci-dss-v4.0.1",
        "detail": "The Council’s June 2026 publication identifies v4.0.1 as the current version."
      },
      {
        "label": "PCI SSC · official validation documentation",
        "url": "https://www.pcisecuritystandards.org/faqs/1220/",
        "detail": "Recognized assessment documentation; this sample does not issue it."
      }
    ],
    "lens": {
      "label": "09 / WHAT EACH CHAIR GETS",
      "title": "One assessment.",
      "accent": "Five different questions.",
      "body": "Readiness work is reviewed by people who each need a different thing from it. The same retained record answers all five.",
      "note": "Illustrative MostoBank scenario with synthetic artifacts. No systems have been inspected or changed, and no formal PCI assessment has been performed.",
      "roles": [
        {
          "role": "CEO",
          "icon": "chart",
          "question": "Is this ready to hand to the assessor?",
          "answer": "Six local checks pass and the evidence is retained against the original epic. The formal assessment remains open, so this is readiness, not a certification."
        },
        {
          "role": "COO",
          "icon": "grid",
          "question": "Who is waiting on whom?",
          "answer": "Network, application and identity workstreams run against one record, so a control held at an approval names its reason instead of stalling quietly."
        },
        {
          "role": "CFO",
          "icon": "coins",
          "question": "What did readiness cost before the assessor arrives?",
          "answer": "Execution, independent review and one bounded repair are captured per accepted change, so remediation is priced rather than absorbed."
        },
        {
          "role": "CIO",
          "icon": "lock",
          "question": "What will an auditor actually receive?",
          "answer": "Plan, actions, evidence, retries and approvals retained per run, with credentials held by the platform rather than handed to an execution engine."
        },
        {
          "role": "CTO",
          "icon": "code",
          "question": "Did a separate reviewer clear the change?",
          "answer": "The reviewing capability is never the implementing one, and a failed check held the candidate at r1 until the repair was retested at r2."
        }
      ]
    },
    "changes": [
      {
        "id": "CH-01",
        "finding": "SCOPE-01",
        "title": "Make the boundary explicit.",
        "kind": "Scope record",
        "before": "Settlement described as separate; shared IAM and logging omitted.",
        "after": "Card-data path, shared services and unresolved external scope decisions recorded.",
        "test": "Dependency review confirms all three service groups are represented.",
        "tool": "Confluence"
      },
      {
        "id": "CH-02",
        "finding": "NET-02",
        "title": "Close the unnecessary access path.",
        "kind": "Staging policy change",
        "before": "Settlement worker can reach the sample CDE admin endpoint.",
        "after": "Explicit deny for that path; approved business API connectivity retained.",
        "test": "Negative reachability and permitted-path regression checks pass.",
        "tool": "Cloudflare"
      },
      {
        "id": "CH-03",
        "finding": "LOG-03",
        "title": "Fix the retry path, too.",
        "kind": "Code change + repair",
        "before": "Debug logs contain sample payment fields; the retry path has no proven redaction coverage.",
        "after": "Both paths use the reviewed field allowlist. Rejected r1 evidence stays in the record.",
        "test": "Normal + retry fixtures pass at r2 after one bounded repair.",
        "tool": "GitHub"
      },
      {
        "id": "CH-04",
        "finding": "IAM-04",
        "title": "Replace stale evidence.",
        "kind": "Evidence refresh",
        "before": "Privileged-access snapshot points to an earlier configuration revision.",
        "after": "Fresh MFA and role-policy evidence references the current candidate.",
        "test": "Revision binding and separate review succeed; no new policy is invented.",
        "tool": "AWS"
      }
    ]
  }
];

export function scenarioBySlug(slug: string) {
  return scenarios.find(item => item.slug === slug);
}
