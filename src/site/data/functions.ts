import type { CaseSlug } from './cases';

/**
 * Solutions by function, generated from the exekova.com content layer by
 * scripts/import-site-content.py. Content only; regenerate rather than hand-edit.
 */
export type RunStage = { name: string; title: string; body: string; file: string; lines: string[]; checks: string[]; status: string };
export type Fn = {
  slug: string; name: string; group: string; icon: string; accent: string; tagline: string;
  headline: [string, string]; summary: string; lede: string; title: string; description: string;
  request: string; id: string; standard: string; deliverable: string; tools: string[];
  workTitle: [string, string]; checks: string[]; policy: string;
  stages: RunStage[]; recovery: { summary: string; repaired: string; lines: string[] } | null;
  work: { title: string; body: string }[];
  cases: { label: string; headline: [string, string]; body: string; note: string; ids: CaseSlug[] };
  acceptance: { standard: string; checks: string[]; policy: string; deliverable: string; sourceTool: string; workRequest: string; workId: string };
  metrics: { label: string; headline: [string, string]; body: string; items: { label: string; hint: string; icon: string }[] };
  cta: { headline: [string, string]; body: string };
};
export type FunctionsIndex = { title: string; description: string; headline: [string, string]; lede: string; groups: { name: string; slugs: string[] }[]; cta: { headline: [string, string]; body: string } };

export const functions: Fn[] = [
  {
    "slug": "engineering",
    "name": "Engineering",
    "group": "Build & improve",
    "icon": "code",
    "accent": "violet",
    "tagline": "Backlog to features ready to ship",
    "headline": [
      "From backlog to",
      "features ready to ship."
    ],
    "summary": "Features built, reviewed and tested. Ready for your release decision.",
    "lede": "Turn the backlog into features your team can release with confidence. exekova handles implementation, independent review and testing, with the evidence attached and release approval in your hands.",
    "title": "exekova for Engineering",
    "description": "Reviewed changes, with the tests and history attached. exekova carries the work from the request through review, verification and a recorded outcome.",
    "request": "Fix duplicate webhook processing",
    "id": "ENG-248",
    "standard": "The same event must never run twice.",
    "deliverable": "A reviewable pull request",
    "tools": [],
    "workTitle": [
      "The work around the code.",
      "Taken care of, too."
    ],
    "checks": [
      "Independent review completed",
      "Required regression tests pass",
      "Pull request links to the original issue"
    ],
    "policy": "Merge and production changes wait for the approval your policy requires.",
    "stages": [
      {
        "name": "Understand",
        "title": "A clear plan before a code change.",
        "body": "Gather the issue and repository context. Define the scope and the checks that will prove the fix.",
        "file": "acceptance-plan.md",
        "lines": [
          "Scope: webhook delivery handler",
          "Keep existing response behavior",
          "Prevent duplicate side effects",
          "Test retries and concurrent delivery"
        ],
        "checks": [
          "Independent review planned",
          "Required tests defined",
          "Acceptance criteria retained"
        ],
        "status": "Planning"
      },
      {
        "name": "Implement",
        "title": "The right capability. A scoped change.",
        "body": "exekova selects an execution engine and carries out the plan on a working branch.",
        "file": "webhooks/handler.ts · illustrative diff",
        "lines": [
          "− await processEvent(event);",
          "+ await runOnce(event.id, async () => {",
          "+   await processEvent(event);",
          "+ });"
        ],
        "checks": [
          "Independent review queued",
          "Required tests queued",
          "Working branch recorded"
        ],
        "status": "Executing"
      },
      {
        "name": "Verify",
        "title": "A change is only as good as its checks.",
        "body": "Review the implementation independently. Run required tests and retain the evidence against the original criteria.",
        "file": "webhook.retry.test.ts · example results",
        "lines": [
          "✓ repeated delivery is ignored",
          "✓ concurrent retries run once",
          "✓ first delivery still succeeds",
          "✓ existing behavior is preserved"
        ],
        "checks": [
          "Independent review passed",
          "Required tests passed",
          "Acceptance criteria verified"
        ],
        "status": "Checks passed"
      },
      {
        "name": "Deliver",
        "title": "Ready for review. With the proof.",
        "body": "Deliver the pull request with its review record and test evidence. Keep merge approval where your policy requires it.",
        "file": "pull-request.md",
        "lines": [
          "Fix duplicate webhook processing",
          "Linked issue: ENG-248",
          "Evidence: review + required tests",
          "Merge: awaiting human approval"
        ],
        "checks": [
          "Review record attached",
          "Test evidence attached",
          "Jira update prepared"
        ],
        "status": "Awaiting review"
      }
    ],
    "recovery": {
      "summary": "A concurrent retry still reaches the handler twice. exekova keeps the failure evidence and routes the change back for repair.",
      "repaired": "The example resumes after repair and a successful retest. The original failure and retry evidence remain part of the run.",
      "lines": [
        "✓ repeated delivery is ignored",
        "− concurrent retries run once",
        "  Expected: 1 action. Received: 2.",
        "  Gate held → diagnose and repair"
      ]
    },
    "work": [
      {
        "title": "Ticket to pull request",
        "body": "Work is picked up from the tracker, run against the repository, and delivered as a reviewable change with tests where the environment supports them."
      },
      {
        "title": "Independent code review",
        "body": "The reviewing capability is separate from the implementing one, so nothing advances on a self-assessment."
      },
      {
        "title": "Test execution as a gate",
        "body": "Required tests run inside the pipeline and results are retained as evidence rather than summarised."
      },
      {
        "title": "Failure diagnosis",
        "body": "Build and test failures are diagnosed from captured evidence, fixed, and re-entered into review."
      },
      {
        "title": "Dependency-aware sequencing",
        "body": "Independent changes run in parallel; dependent ones wait on their predecessor reaching the required state."
      },
      {
        "title": "Engines you already use",
        "body": "Claude Code and Codex run as execution engines, with GitHub and Jira connected."
      }
    ],
    "cases": {
      "label": "Three live problems",
      "headline": [
        "The work that is ready",
        "and still not started."
      ],
      "body": "None of it is hard. All of it is bounded, specified and losing every week to whatever is louder, which is exactly the work a platform can own end to end.",
      "note": "Nothing advances on a self-assessment: the capability that writes the change is never the one that reviews it, and neither one decides when you release.",
      "ids": [
        "engineering-ready-tickets",
        "engineering-flaky-pipeline",
        "engineering-api-migration"
      ]
    },
    "acceptance": {
      "standard": "The same event must never run twice.",
      "checks": [
        "Independent review completed",
        "Required regression tests pass",
        "Pull request links to the original issue"
      ],
      "policy": "Merge and production changes wait for the approval your policy requires.",
      "deliverable": "A reviewable pull request",
      "sourceTool": "Jira",
      "workRequest": "Fix duplicate webhook processing",
      "workId": "ENG-248"
    },
    "metrics": {
      "label": "How you'd measure it",
      "headline": [
        "Measure the work.",
        "Not the amount of output."
      ],
      "body": "Start with one repeatable engineering workflow. Measure its outcomes using your own run history.",
      "items": [
        {
          "label": "Backlog reduction",
          "hint": "Track accepted work against incoming demand.",
          "icon": "chart"
        },
        {
          "label": "Review turnaround",
          "hint": "See where changes wait for review.",
          "icon": "eye"
        },
        {
          "label": "Test coverage on delivered change",
          "hint": "Check the evidence behind each delivered change.",
          "icon": "shield"
        },
        {
          "label": "Time to merged",
          "hint": "Follow elapsed time from issue intake to merge.",
          "icon": "clock"
        },
        {
          "label": "Cost per accepted change",
          "hint": "Understand spend, including repairs and retries.",
          "icon": "coins"
        }
      ]
    },
    "cta": {
      "headline": [
        "Start with one",
        "repeating task."
      ],
      "body": "Pick something in engineering that recurs weekly. It makes the measurement honest."
    }
  },
  {
    "slug": "product",
    "name": "Product",
    "group": "Build & improve",
    "icon": "file",
    "accent": "azure",
    "tagline": "Spec, research, definition",
    "headline": [
      "Turn the open question",
      "into a ready brief."
    ],
    "summary": "Context, research and specifications ready for a decision.",
    "lede": "Product work stalls on inputs: the competitive scan nobody ran, the spec nobody wrote up, the ticket that never got enough detail to be picked up.",
    "title": "exekova for Product",
    "description": "Context, research and specifications ready for a decision. exekova carries the work from the request through review, verification and a recorded outcome.",
    "request": "Prepare the subscription retry feature for planning",
    "id": "PRD-1042",
    "standard": "Scope, evidence and acceptance criteria are ready for product review.",
    "deliverable": "A decision-ready specification",
    "tools": [
      "Linear",
      "Notion",
      "Confluence",
      "Jira"
    ],
    "workTitle": [
      "The inputs behind",
      "your next product decision."
    ],
    "checks": [
      "Requirements trace to source context",
      "Acceptance criteria are explicit",
      "Scope routed for product approval"
    ],
    "policy": "Your product team keeps the decision on committed scope. exekova prepares the work for that decision.",
    "stages": [
      {
        "name": "Gather",
        "title": "Give the request its context.",
        "body": "Read the connected feedback, issues and existing documentation within the scope of the brief.",
        "file": "feature.context",
        "lines": [
          "Request → subscription retry flow",
          "Inputs → linked feedback and issues",
          "Decision → define the next planning brief"
        ],
        "checks": [
          "Source context linked",
          "Research scope set"
        ],
        "status": "In progress"
      },
      {
        "name": "Research",
        "title": "Turn the inputs into evidence.",
        "body": "Collect relevant findings and preserve the distinction between evidence and open questions.",
        "file": "research.notes",
        "lines": [
          "Need → recover interrupted payments",
          "Constraint → no duplicate charges",
          "Open question → retry policy owner"
        ],
        "checks": [
          "Findings linked to sources",
          "Open questions retained"
        ],
        "status": "In progress"
      },
      {
        "name": "Define",
        "title": "Make the scope reviewable.",
        "body": "Draft the specification and acceptance criteria using the structure your team expects.",
        "file": "retry-feature.spec",
        "lines": [
          "Scope → retry failed subscription payments",
          "Criterion → one charge per payment intent",
          "Exception → exhausted retries are visible"
        ],
        "checks": [
          "Acceptance criteria attached",
          "Dependencies made explicit"
        ],
        "status": "In progress"
      },
      {
        "name": "Review",
        "title": "Ready for the product decision.",
        "body": "Route the evidence and specification for review before anything becomes committed scope.",
        "file": "planning-brief.record",
        "lines": [
          "Specification → prepared",
          "Research evidence → attached",
          "Product approval → required"
        ],
        "checks": [
          "Definition ready for review",
          "Human scope decision retained"
        ],
        "status": "Awaiting review"
      }
    ],
    "recovery": null,
    "work": [
      {
        "title": "Requirement enrichment",
        "body": "Thin tickets are expanded against the context in your connected systems before they reach a team."
      },
      {
        "title": "Research synthesis",
        "body": "Evidence gathered and synthesised into a form a product decision can actually be made from."
      },
      {
        "title": "Specification drafting",
        "body": "Drafts produced against your template and acceptance criteria, then routed through review."
      },
      {
        "title": "Competitive and market scans",
        "body": "Repeating research tasks run on a cadence rather than when someone finds the afternoon."
      },
      {
        "title": "Backlog grooming",
        "body": "Items assessed, enriched and sequenced according to the priority rules you set."
      },
      {
        "title": "Human approval on definition",
        "body": "Nothing becomes committed scope without the sign-off you configure."
      }
    ],
    "cases": {
      "label": "Three live problems",
      "headline": [
        "The decision is due.",
        "The input is not ready."
      ],
      "body": "Product work stalls on inputs rather than on judgement: the scan nobody ran, the spec nobody wrote, the ticket that never got enough detail to be picked up. Each one is work a platform can run to a reviewed draft.",
      "note": "A draft reaches you reviewed, never approved: what becomes committed scope stays your decision at every stage.",
      "ids": [
        "product-thin-tickets",
        "product-competitive-scan",
        "product-spec-backlog"
      ]
    },
    "acceptance": {
      "standard": "Scope, evidence and acceptance criteria are ready for product review.",
      "checks": [
        "Requirements trace to source context",
        "Acceptance criteria are explicit",
        "Scope routed for product approval"
      ],
      "policy": "Your product team keeps the decision on committed scope. exekova prepares the work for that decision.",
      "deliverable": "A decision-ready specification",
      "sourceTool": "Linear",
      "workRequest": "Prepare the subscription retry feature for planning",
      "workId": "PRD-1042"
    },
    "metrics": {
      "label": "How you'd measure it",
      "headline": [
        "What to watch in",
        "the first quarter."
      ],
      "body": "Every figure comes from your own runs.",
      "items": [
        {
          "label": "Time from request to ready ticket",
          "hint": "Follow each request through definition and review.",
          "icon": "chart"
        },
        {
          "label": "Share of backlog enriched",
          "hint": "Measure how much work reaches your ready standard.",
          "icon": "chart"
        },
        {
          "label": "Research cycle time",
          "hint": "Track time from a research brief to reviewed findings.",
          "icon": "chart"
        },
        {
          "label": "Acceptance rate on drafts",
          "hint": "See which drafts meet the definition of done.",
          "icon": "chart"
        }
      ]
    },
    "cta": {
      "headline": [
        "Start with one",
        "repeating task."
      ],
      "body": "Pick something in product that recurs weekly. It makes the measurement honest."
    }
  },
  {
    "slug": "qa",
    "name": "QA",
    "group": "Build & improve",
    "icon": "flask",
    "accent": "leaf",
    "tagline": "Test design and execution",
    "headline": [
      "Make confidence",
      "part of every release."
    ],
    "summary": "Test design, execution and a verdict you can inspect.",
    "lede": "Testing is usually the first thing compressed when a deadline moves. Making it a pipeline stage rather than a phase changes what compression is possible.",
    "title": "exekova for QA",
    "description": "Test design, execution and a verdict you can inspect. exekova carries the work from the request through review, verification and a recorded outcome.",
    "request": "Validate checkout before the next release",
    "id": "QA-1042",
    "standard": "Checkout passes across the required payment and retry scenarios.",
    "deliverable": "A verdict backed by test evidence",
    "tools": [
      "Jira",
      "GitHub",
      "Sentry",
      "Codex"
    ],
    "workTitle": [
      "From acceptance criteria",
      "to evidence you can inspect."
    ],
    "checks": [
      "Required scenarios covered",
      "Failures diagnosed and retested",
      "Verdict linked to test evidence"
    ],
    "policy": "A failed required check holds acceptance. Eligible repairs return through testing and validation.",
    "stages": [
      {
        "name": "Define",
        "title": "Start with the standard.",
        "body": "Derive the test plan from the acceptance criteria attached to the work.",
        "file": "checkout.test-plan",
        "lines": [
          "Payment succeeds → order created",
          "Payment declined → no order created",
          "Retry received → no duplicate charge"
        ],
        "checks": [
          "Acceptance criteria linked",
          "Required scenarios identified"
        ],
        "status": "In progress"
      },
      {
        "name": "Test",
        "title": "Run the checks. Keep the results.",
        "body": "Execute the required cases in the connected environment and capture their evidence.",
        "file": "checkout.results",
        "lines": [
          "PASS  successful payment",
          "PASS  declined payment",
          "FAIL  concurrent retry"
        ],
        "checks": [
          "Test environment recorded",
          "Failure evidence retained"
        ],
        "status": "Check failed"
      },
      {
        "name": "Triage",
        "title": "A failure becomes the next task.",
        "body": "Route the captured failure for diagnosis and an eligible repair, then run the required checks again.",
        "file": "retry.diagnosis",
        "lines": [
          "Cause → concurrent retry handling",
          "Repair → enforce idempotency",
          "Retest → required suite"
        ],
        "checks": [
          "Diagnosis linked to failure",
          "Repair returns to the test gate"
        ],
        "status": "In progress"
      },
      {
        "name": "Verify",
        "title": "A verdict with the proof attached.",
        "body": "Validate the results against the original criteria before accepting the outcome.",
        "file": "validation.record",
        "lines": [
          "Required cases → passed",
          "Regression results → attached",
          "Acceptance criteria → satisfied"
        ],
        "checks": [
          "Independent verdict retained",
          "Issue updated with evidence"
        ],
        "status": "Verified"
      }
    ],
    "recovery": null,
    "work": [
      {
        "title": "Test design from acceptance criteria",
        "body": "Cases derived from the definition of done attached to the work, not invented separately."
      },
      {
        "title": "Execution against connected environments",
        "body": "Tests run where the work runs, with results captured as evidence."
      },
      {
        "title": "Regression triage",
        "body": "Failures diagnosed and routed rather than queued for a person to investigate."
      },
      {
        "title": "Evidence for every verdict",
        "body": "A pass carries the artefact that justifies it, so verification is reviewable after the fact."
      },
      {
        "title": "Independent from implementation",
        "body": "The capability that tests is never the capability that built the thing being tested."
      },
      {
        "title": "Coverage visibility",
        "body": "Which work carried tests, and which did not, is visible rather than assumed."
      }
    ],
    "cases": {
      "label": "Three live problems",
      "headline": [
        "Testing is what gets cut",
        "when the date moves."
      ],
      "body": "Each of these is the reason a release ships on assumption rather than on evidence. Making the verdict part of the run rather than a phase at the end is what changes that.",
      "note": "The capability that tests is never the capability that built the thing tested, and a pass carries the artefact that justifies it.",
      "ids": [
        "qa-untested-releases",
        "qa-manual-regression-pass",
        "qa-defect-reproduction"
      ]
    },
    "acceptance": {
      "standard": "Checkout passes across the required payment and retry scenarios.",
      "checks": [
        "Required scenarios covered",
        "Failures diagnosed and retested",
        "Verdict linked to test evidence"
      ],
      "policy": "A failed required check holds acceptance. Eligible repairs return through testing and validation.",
      "deliverable": "A verdict backed by test evidence",
      "sourceTool": "Jira",
      "workRequest": "Validate checkout before the next release",
      "workId": "QA-1042"
    },
    "metrics": {
      "label": "How you'd measure it",
      "headline": [
        "What to watch in",
        "the first quarter."
      ],
      "body": "Every figure comes from your own runs.",
      "items": [
        {
          "label": "Test coverage on delivered work",
          "hint": "Track required test evidence across accepted work.",
          "icon": "chart"
        },
        {
          "label": "Escaped defect rate",
          "hint": "Review defects discovered after delivery.",
          "icon": "chart"
        },
        {
          "label": "Time in validation",
          "hint": "Follow elapsed time through review and testing.",
          "icon": "chart"
        },
        {
          "label": "Retry rate after test failure",
          "hint": "See how often a failed check returns for repair.",
          "icon": "chart"
        }
      ]
    },
    "cta": {
      "headline": [
        "Start with one",
        "repeating task."
      ],
      "body": "Pick a QA workflow that recurs weekly. It makes the measurement honest."
    }
  },
  {
    "slug": "research",
    "name": "Research",
    "group": "Build & improve",
    "icon": "search",
    "accent": "violet",
    "tagline": "Evidence-backed synthesis",
    "headline": [
      "Answers worth using.",
      "Sources worth checking."
    ],
    "summary": "Repeatable research with the evidence still attached.",
    "lede": "Research output is easy to generate and hard to trust. The difference is whether the claims are traceable to something.",
    "title": "exekova for Research",
    "description": "Repeatable research with the evidence still attached. exekova carries the work from the request through review, verification and a recorded outcome.",
    "request": "Compare the options for our next integration",
    "id": "RES-1042",
    "standard": "Every material claim has a source; uncertainty stays visible.",
    "deliverable": "A synthesis with traceable sources",
    "tools": [
      "Notion",
      "Google Drive",
      "Confluence",
      "Slack"
    ],
    "workTitle": [
      "From the first source",
      "to a reviewable conclusion."
    ],
    "checks": [
      "Approved sources and provenance retained",
      "Claims checked against their sources",
      "Open questions and limitations visible"
    ],
    "policy": "Findings that inform a decision can require human sign-off before they are treated as settled.",
    "stages": [
      {
        "name": "Scope",
        "title": "Start with a question worth answering.",
        "body": "Turn the brief into explicit questions, permitted sources and an output structure.",
        "file": "integration-research.brief",
        "lines": [
          "Question → which integration fits the need?",
          "Sources → approved product documentation",
          "Output → comparison with cited findings"
        ],
        "checks": [
          "Research questions explicit",
          "Source permissions retained"
        ],
        "status": "In progress"
      },
      {
        "name": "Gather",
        "title": "Keep the source with the finding.",
        "body": "Collect relevant material and retain where each finding came from.",
        "file": "source-register",
        "lines": [
          "Authentication → source linked",
          "Capabilities → source linked",
          "Limitations → source linked"
        ],
        "checks": [
          "Provenance retained",
          "Source coverage visible"
        ],
        "status": "In progress"
      },
      {
        "name": "Review",
        "title": "Check the claims before the conclusion.",
        "body": "A separate reviewing capability checks material claims against the source record.",
        "file": "claim-review",
        "lines": [
          "Supported claims → source checked",
          "Conflicting findings → flagged",
          "Unverified claims → marked open"
        ],
        "checks": [
          "Claims checked independently",
          "Uncertainty stays visible"
        ],
        "status": "In progress"
      },
      {
        "name": "Deliver",
        "title": "A synthesis someone else can verify.",
        "body": "Deliver the structured findings together with the evidence and outstanding questions.",
        "file": "integration-comparison",
        "lines": [
          "Findings → structured to the brief",
          "Evidence → linked to each claim",
          "Open questions → retained"
        ],
        "checks": [
          "Source register attached",
          "Review history retained"
        ],
        "status": "Reviewed"
      }
    ],
    "recovery": null,
    "work": [
      {
        "title": "Source gathering",
        "body": "Material collected from the sources you permit, with provenance retained."
      },
      {
        "title": "Synthesis against a brief",
        "body": "Output structured to the brief and acceptance criteria you set rather than a generic summary shape."
      },
      {
        "title": "Independent review",
        "body": "A separate capability checks claims against the retained sources before the work advances."
      },
      {
        "title": "Evidence trail",
        "body": "Every synthesis carries the material it was built from, so a reader can verify rather than trust."
      },
      {
        "title": "Repeatable cadence",
        "body": "Recurring scans run on schedule with consistent structure, making outputs comparable over time."
      },
      {
        "title": "Human approval where it matters",
        "body": "Findings that inform a decision can require sign-off before they are treated as settled."
      }
    ],
    "cases": {
      "label": "Three live problems",
      "headline": [
        "Output is easy to produce",
        "and expensive to trust."
      ],
      "body": "Each of these turns on the same thing: whether a reader can check a claim rather than take it. The material stays attached to the work, and a separate capability checks it before the work advances.",
      "note": "Every material claim traces to a source, and the capability that checks the claims is never the one that wrote them.",
      "ids": [
        "research-unsourced-synthesis",
        "research-recurring-scan",
        "research-evidence-for-a-decision"
      ]
    },
    "acceptance": {
      "standard": "Every material claim has a source; uncertainty stays visible.",
      "checks": [
        "Approved sources and provenance retained",
        "Claims checked against their sources",
        "Open questions and limitations visible"
      ],
      "policy": "Findings that inform a decision can require human sign-off before they are treated as settled.",
      "deliverable": "A synthesis with traceable sources",
      "sourceTool": "Notion",
      "workRequest": "Compare the options for our next integration",
      "workId": "RES-1042"
    },
    "metrics": {
      "label": "How you'd measure it",
      "headline": [
        "What to watch in",
        "the first quarter."
      ],
      "body": "Every figure comes from your own runs.",
      "items": [
        {
          "label": "Time to synthesis",
          "hint": "Follow the brief through gathering, review and delivery.",
          "icon": "chart"
        },
        {
          "label": "Acceptance rate",
          "hint": "Measure outputs against the standard in the brief.",
          "icon": "chart"
        },
        {
          "label": "Evidence coverage",
          "hint": "Check how many material claims carry sources.",
          "icon": "chart"
        },
        {
          "label": "Rework rate",
          "hint": "Track work sent back after review.",
          "icon": "chart"
        }
      ]
    },
    "cta": {
      "headline": [
        "Start with one",
        "repeating task."
      ],
      "body": "Pick something in research that recurs weekly. It makes the measurement honest."
    }
  },
  {
    "slug": "operations",
    "name": "Operations",
    "group": "Operate & govern",
    "icon": "layers",
    "accent": "teal",
    "tagline": "Coordination off the critical path",
    "headline": [
      "Keep the work moving.",
      "Across every handoff."
    ],
    "summary": "Recurring processes that retain their owner and context.",
    "lede": "Operations work is mostly moving things between systems and people, and noticing when something stopped. Both are execution problems rather than judgement problems.",
    "title": "exekova for Operations",
    "description": "Recurring processes that retain their owner and context. exekova carries the work from the request through review, verification and a recorded outcome.",
    "request": "Reconcile this week’s service exceptions",
    "id": "OPS-1042",
    "standard": "Every exception has a resolution or a named escalation.",
    "deliverable": "A reconciled operational record",
    "tools": [
      "ServiceNow",
      "Slack",
      "Jira",
      "Microsoft Teams"
    ],
    "workTitle": [
      "Less chasing.",
      "More work through the queue."
    ],
    "checks": [
      "Connected records reconciled",
      "Unresolved exceptions carry context",
      "Required approvals retained"
    ],
    "policy": "Sensitive updates stay behind approval gates. Blocked work keeps its reason and next owner.",
    "stages": [
      {
        "name": "Collect",
        "title": "One brief. Connected context.",
        "body": "Gather the records in scope and identify the systems that need to agree.",
        "file": "weekly-exceptions.scope",
        "lines": [
          "Period → current review window",
          "Sources → service and issue records",
          "Scope → unresolved service exceptions"
        ],
        "checks": [
          "Source records linked",
          "Access scoped to the task"
        ],
        "status": "In progress"
      },
      {
        "name": "Reconcile",
        "title": "Move the state with the work.",
        "body": "Compare connected records and prepare the updates needed to reconcile them.",
        "file": "reconciliation.plan",
        "lines": [
          "Resolved cases → sync linked issues",
          "Missing owners → route for assignment",
          "Conflicting status → investigate"
        ],
        "checks": [
          "Updates mapped to source records",
          "Handoffs carry their context"
        ],
        "status": "In progress"
      },
      {
        "name": "Route",
        "title": "Make the exception explicit.",
        "body": "Resolve eligible exceptions and route the rest with evidence and a clear next action.",
        "file": "exception.record",
        "lines": [
          "Blocked → missing service owner",
          "Evidence → linked case history",
          "Next action → request owner decision"
        ],
        "checks": [
          "Block reason captured",
          "Escalation prepared with context"
        ],
        "status": "Needs approval"
      },
      {
        "name": "Deliver",
        "title": "Close the loop across systems.",
        "body": "Retain the reconciled record, completed updates and outstanding decisions in the run.",
        "file": "weekly-review.record",
        "lines": [
          "Resolved exceptions → recorded",
          "Open decisions → assigned",
          "Run history → retained"
        ],
        "checks": [
          "Reconciliation evidence attached",
          "Outstanding work stays visible"
        ],
        "status": "Recorded"
      }
    ],
    "recovery": null,
    "work": [
      {
        "title": "Cross-system updates",
        "body": "Work executed in one system lands as an update in the others, without a person copying state."
      },
      {
        "title": "Routing and handoffs",
        "body": "A handoff becomes a routing decision inside a run rather than a message waiting to be read."
      },
      {
        "title": "Exception handling",
        "body": "Exceptions are diagnosed and, where eligible, resolved inside the run; the rest escalate with context."
      },
      {
        "title": "Recurring process execution",
        "body": "Repeating operational work runs on a schedule against your standard."
      },
      {
        "title": "Blocked work with reasons",
        "body": "Items that cannot proceed name what is blocking them rather than sitting in an ambiguous state."
      },
      {
        "title": "Single operational view",
        "body": "The Live Floor shows planning, executing, review, verified and blocked work in one place."
      }
    ],
    "cases": {
      "label": "Three live problems",
      "headline": [
        "The queue does not move",
        "because nobody has the week."
      ],
      "body": "Operations work is mostly moving things between systems and noticing when something stopped. Both are execution problems, and both reward a platform that holds the whole path rather than one step of it.",
      "note": "Every exception ends with a resolution or a named escalation, and the capability that resolved it is never the one that signed it off.",
      "ids": [
        "operations-exception-queues",
        "operations-manual-reconciliation",
        "operations-recurring-runbook"
      ]
    },
    "acceptance": {
      "standard": "Every exception has a resolution or a named escalation.",
      "checks": [
        "Connected records reconciled",
        "Unresolved exceptions carry context",
        "Required approvals retained"
      ],
      "policy": "Sensitive updates stay behind approval gates. Blocked work keeps its reason and next owner.",
      "deliverable": "A reconciled operational record",
      "sourceTool": "ServiceNow",
      "workRequest": "Reconcile this week’s service exceptions",
      "workId": "OPS-1042"
    },
    "metrics": {
      "label": "How you'd measure it",
      "headline": [
        "What to watch in",
        "the first quarter."
      ],
      "body": "Every figure comes from your own runs.",
      "items": [
        {
          "label": "Cycle time",
          "hint": "Follow each request from intake to completion.",
          "icon": "chart"
        },
        {
          "label": "Queue and wait time",
          "hint": "See time spent waiting between stages.",
          "icon": "chart"
        },
        {
          "label": "Blocked time",
          "hint": "Understand where work stopped and why.",
          "icon": "chart"
        },
        {
          "label": "Intervention rate",
          "hint": "Track the points that needed a human decision.",
          "icon": "chart"
        },
        {
          "label": "Throughput per period",
          "hint": "Compare completed work over consistent periods.",
          "icon": "chart"
        }
      ]
    },
    "cta": {
      "headline": [
        "Start with one",
        "repeating task."
      ],
      "body": "Pick something in operations that recurs weekly. It makes the measurement honest."
    }
  },
  {
    "slug": "support",
    "name": "Support",
    "group": "Operate & govern",
    "icon": "users",
    "accent": "azure",
    "tagline": "Resolution, not deflection",
    "headline": [
      "Go beyond the reply.",
      "Get to the resolution."
    ],
    "summary": "Investigation, resolution and a complete handoff when needed.",
    "lede": "Deflection metrics improve when customers give up. Resolution metrics only improve when the underlying problem is actually fixed.",
    "title": "exekova for Support",
    "description": "Investigation, resolution and a complete handoff when needed. exekova carries the work from the request through review, verification and a recorded outcome.",
    "request": "Investigate a customer’s repeated billing failure",
    "id": "SUP-1042",
    "standard": "The cause is evidenced and the next action is clear.",
    "deliverable": "A reviewed resolution or escalation",
    "tools": [
      "Zendesk",
      "ServiceNow",
      "Slack",
      "Jira"
    ],
    "workTitle": [
      "Own the investigation.",
      "Carry it through to resolution."
    ],
    "checks": [
      "Investigation linked to the case",
      "Resolution checked against the issue",
      "Sensitive replies approved before sending"
    ],
    "policy": "Refunds, account changes and customer commitments can require approval. Escalations include the investigation.",
    "stages": [
      {
        "name": "Understand",
        "title": "Keep the case in context.",
        "body": "Gather the issue, relevant history and permitted system context before choosing an action.",
        "file": "customer-case.brief",
        "lines": [
          "Issue → repeated billing failure",
          "Context → linked case history",
          "Boundary → no unapproved account changes"
        ],
        "checks": [
          "Customer issue scoped",
          "Permitted context linked"
        ],
        "status": "In progress"
      },
      {
        "name": "Investigate",
        "title": "Find the cause behind the symptom.",
        "body": "Investigate the connected records and distinguish a service issue from a product defect.",
        "file": "investigation.notes",
        "lines": [
          "Observed → repeated payment failure",
          "Check → related service incident",
          "Next → route the evidenced cause"
        ],
        "checks": [
          "Investigation evidence captured",
          "Defect route available"
        ],
        "status": "In progress"
      },
      {
        "name": "Review",
        "title": "Review the action and the response.",
        "body": "Prepare the resolution or escalation with the approvals required by policy.",
        "file": "resolution.draft",
        "lines": [
          "Cause → linked investigation",
          "Action → reviewed next step",
          "Customer commitment → approval required"
        ],
        "checks": [
          "Sensitive action held for approval",
          "Reply prepared for review"
        ],
        "status": "Needs approval"
      },
      {
        "name": "Resolve",
        "title": "The whole case moves forward.",
        "body": "Retain the resolution evidence or route the complete investigation to the person who can decide.",
        "file": "case-outcome.record",
        "lines": [
          "Resolution or escalation → recorded",
          "Customer case → updated",
          "Knowledge follow-up → prepared"
        ],
        "checks": [
          "Case history retained",
          "Next owner has the context"
        ],
        "status": "Recorded"
      }
    ],
    "recovery": null,
    "work": [
      {
        "title": "Ticket to resolution",
        "body": "Issues investigated against your systems, not just answered from a knowledge base."
      },
      {
        "title": "Root-cause routing",
        "body": "Where a ticket reflects a defect, the work can route to the function that can fix it."
      },
      {
        "title": "Response drafting under review",
        "body": "Customer-facing responses routed through review before they are sent, where your policy requires it."
      },
      {
        "title": "Escalation with context",
        "body": "Cases needing a person arrive with the investigation already done."
      },
      {
        "title": "Knowledge updates",
        "body": "Resolutions can be written back so the same issue is cheaper next time."
      },
      {
        "title": "Approval on sensitive replies",
        "body": "Refunds, commitments and account actions can sit behind an approval gate."
      }
    ],
    "cases": {
      "label": "Three live problems",
      "headline": [
        "A reply is not",
        "a resolution."
      ],
      "body": "Deflection improves when customers give up. Each of these is what it takes to improve resolution instead, and each one runs across the systems support cannot reach on its own.",
      "note": "The cause is evidenced before a ticket closes, and anything customer-facing can sit behind the approval you configure.",
      "ids": [
        "support-ticket-investigation",
        "support-defect-handoff",
        "support-knowledge-decay"
      ]
    },
    "acceptance": {
      "standard": "The cause is evidenced and the next action is clear.",
      "checks": [
        "Investigation linked to the case",
        "Resolution checked against the issue",
        "Sensitive replies approved before sending"
      ],
      "policy": "Refunds, account changes and customer commitments can require approval. Escalations include the investigation.",
      "deliverable": "A reviewed resolution or escalation",
      "sourceTool": "Zendesk",
      "workRequest": "Investigate a customer’s repeated billing failure",
      "workId": "SUP-1042"
    },
    "metrics": {
      "label": "How you'd measure it",
      "headline": [
        "What to watch in",
        "the first quarter."
      ],
      "body": "Every figure comes from your own runs.",
      "items": [
        {
          "label": "Resolution rate",
          "hint": "Measure cases against their resolution criteria.",
          "icon": "chart"
        },
        {
          "label": "Time to resolution",
          "hint": "Follow the case from intake to a recorded outcome.",
          "icon": "chart"
        },
        {
          "label": "Reopen rate",
          "hint": "Track cases that need work after closure.",
          "icon": "chart"
        },
        {
          "label": "Escalation rate",
          "hint": "See when the work needed a human decision.",
          "icon": "chart"
        },
        {
          "label": "Cost per resolved ticket",
          "hint": "Include investigation, review and follow-up effort.",
          "icon": "chart"
        }
      ]
    },
    "cta": {
      "headline": [
        "Start with one",
        "repeating task."
      ],
      "body": "Pick something in support that recurs weekly. It makes the measurement honest."
    }
  },
  {
    "slug": "compliance",
    "name": "Compliance",
    "group": "Operate & govern",
    "icon": "shield",
    "accent": "leaf",
    "tagline": "Controlled, auditable work",
    "headline": [
      "Keep the evidence.",
      "Keep the control."
    ],
    "summary": "Execution records your reviewers can follow.",
    "lede": "Compliance functions are asked to trust automated work without being given anything to audit. Evidence is the part that makes autonomy acceptable.",
    "title": "exekova for Compliance",
    "description": "Execution records your reviewers can follow. exekova carries the work from the request through review, verification and a recorded outcome.",
    "request": "Prepare the evidence for a quarterly access review",
    "id": "CMP-1042",
    "standard": "Every in-scope access grant has evidence or an explicit exception.",
    "deliverable": "An evidence pack ready for review",
    "tools": [
      "ServiceNow",
      "Confluence",
      "AWS",
      "Jira"
    ],
    "workTitle": [
      "Controls that travel",
      "with the work."
    ],
    "checks": [
      "Evidence mapped to the review scope",
      "Exceptions identified and routed",
      "Required decisions and approvals retained"
    ],
    "policy": "Your reviewers retain the final compliance decision. exekova keeps the work and its evidence reviewable.",
    "stages": [
      {
        "name": "Scope",
        "title": "Define the review boundary.",
        "body": "Read the approved scope and identify the evidence required for each control.",
        "file": "access-review.scope",
        "lines": [
          "Period → quarterly review",
          "Scope → permitted system access grants",
          "Decision owner → designated reviewer"
        ],
        "checks": [
          "Scope retained with the run",
          "Permissions bounded by review"
        ],
        "status": "In progress"
      },
      {
        "name": "Collect",
        "title": "Gather the record behind the control.",
        "body": "Collect permitted evidence and map it to the review requirements.",
        "file": "evidence.register",
        "lines": [
          "Access grant → source record",
          "Approval → linked decision",
          "Execution history → retained evidence"
        ],
        "checks": [
          "Sources linked to controls",
          "Evidence gaps identified"
        ],
        "status": "In progress"
      },
      {
        "name": "Check",
        "title": "Surface the exceptions.",
        "body": "Check the evidence against the scope and route missing records or policy exceptions.",
        "file": "exception.register",
        "lines": [
          "Missing approval → flag for review",
          "Out-of-scope access → escalate",
          "Complete record → ready for reviewer"
        ],
        "checks": [
          "Exceptions carry their evidence",
          "Required decisions remain with people"
        ],
        "status": "Review required"
      },
      {
        "name": "Prepare",
        "title": "An audit trail ready to inspect.",
        "body": "Package the evidence and open decisions for the designated reviewer.",
        "file": "review-pack.index",
        "lines": [
          "Control map → attached",
          "Evidence register → retained",
          "Final reviewer sign-off → required"
        ],
        "checks": [
          "Open exceptions visible",
          "Approval history linked"
        ],
        "status": "Ready for review"
      }
    ],
    "recovery": null,
    "work": [
      {
        "title": "Evidence on every run",
        "body": "Plan, actions, tools used, review and test results, retries, escalations and approvals are retained per run."
      },
      {
        "title": "Approval gates by policy",
        "body": "Which actions require named sign-off is configuration, not convention."
      },
      {
        "title": "Least-privilege access",
        "body": "Tool-by-tool authorisation, so the reach of any capability matches the work it was given."
      },
      {
        "title": "Environment separation",
        "body": "Production execution runs on a boundary distinct from development and staging."
      },
      {
        "title": "Retention and redaction",
        "body": "Run records retained for audit, with sensitive values redacted in captured evidence."
      },
      {
        "title": "Deployment control",
        "body": "Execute in your private cloud with defined access and environment boundaries. On-premises deployment is on the enterprise roadmap."
      }
    ],
    "cases": {
      "label": "Findings to closure",
      "headline": [
        "A finding is not closed",
        "until your assessor says so."
      ],
      "body": "exekova is the remediation and evidence execution layer between a finding and assessor-accepted closure. It does not assess you and it does not certify anything. Your assessor stays the only authority on whether a finding is closed.",
      "note": "The finding, the fix, the reviewer, the retest and the approval end up in one record instead of four systems.",
      "ids": [
        "compliance-pentest-findings",
        "compliance-audit-finding-closure",
        "compliance-vulnerability-sla",
        "compliance-evidence-window",
        "compliance-customer-security-review"
      ]
    },
    "acceptance": {
      "standard": "Every in-scope access grant has evidence or an explicit exception.",
      "checks": [
        "Evidence mapped to the review scope",
        "Exceptions identified and routed",
        "Required decisions and approvals retained"
      ],
      "policy": "Your reviewers retain the final compliance decision. exekova keeps the work and its evidence reviewable.",
      "deliverable": "An evidence pack ready for review",
      "sourceTool": "ServiceNow",
      "workRequest": "Prepare the evidence for a quarterly access review",
      "workId": "CMP-1042"
    },
    "metrics": {
      "label": "How you'd measure it",
      "headline": [
        "What to watch in",
        "the first quarter."
      ],
      "body": "Every figure comes from your own runs.",
      "items": [
        {
          "label": "Evidence coverage",
          "hint": "Map required evidence to retained records.",
          "icon": "chart"
        },
        {
          "label": "Approval compliance rate",
          "hint": "Check required sign-offs against recorded decisions.",
          "icon": "chart"
        },
        {
          "label": "Access exceptions",
          "hint": "Review where access needed a policy decision.",
          "icon": "chart"
        },
        {
          "label": "Audit preparation time",
          "hint": "Track effort from request to a reviewable evidence pack.",
          "icon": "chart"
        }
      ]
    },
    "cta": {
      "headline": [
        "Start with one",
        "repeating task."
      ],
      "body": "Pick something in compliance that recurs weekly. It makes the measurement honest."
    }
  }
];

export const functionsIndex: FunctionsIndex = {
  "title": "Solutions by function",
  "description": "Execution capacity for engineering, product, QA, operations, research, support and compliance. Each function sets its own definition of done.",
  "headline": [
    "Find the right starting point for your team.",
    ""
  ],
  "lede": "Explore work by function, or see the outcomes and controls that matter in your leadership role.",
  "groups": [
    {
      "name": "Build & improve",
      "slugs": [
        "engineering",
        "product",
        "qa",
        "research"
      ]
    },
    {
      "name": "Operate & govern",
      "slugs": [
        "operations",
        "support",
        "compliance"
      ]
    }
  ],
  "cta": {
    "headline": [
      "Which function is",
      "waiting the longest?"
    ],
    "body": "That is usually where the execution constraint is most expensive."
  }
};

export function functionBySlug(slug: string) {
  return functions.find(item => item.slug === slug);
}
