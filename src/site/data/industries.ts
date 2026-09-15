import type { CaseSlug } from './cases';

/**
 * Industries, generated from the exekova.com content layer (apps/site/content
 * in the workinzo monorepo) by scripts/import-site-content.py. Content only: the
 * page designs are this site's own. Regenerate rather than hand-edit.
 */
export type IndustryPhase = { label: string; status: string; title: string; lines: string[] };
export type Industry = {
  slug: string; name: string; group: string; groupIndex: number; icon: string; accent: string;
  tagline: string; headline: [string, string]; lede: string; summary: string;
  arrives: string[]; source: string; sample: { id: string; title: string; body: string; criterion: string };
  phases: IndustryPhase[];
  workloads: { label: string; headline: [string, string]; body: string; items: { title: string; body: string; kind: string }[] };
  cases: { label: string; headline: [string, string]; body: string; ids: CaseSlug[] };
  controls: { label: string; headline: [string, string]; body: string; rail: { key: string; title: string; items: string[] }[]; owns: string[]; keeps: string[] };
  metrics: { label: string; headline: [string, string]; body: string; items: { label: string; hint: string; icon: string }[] };
  cta: { headline: [string, string]; body: string };
};
export type IndustriesIndex = {
  eyebrow: string; headline: [string, string]; lede: string;
  explorer: { label: string; headline: [string, string]; body: string };
  cross: { label: string; headline: [string, string]; body: string; ids: CaseSlug[] };
};

export const industries: Industry[] = [
  {
    "slug": "fintech",
    "name": "Fintech",
    "group": "Financial & regulated",
    "groupIndex": 0,
    "icon": "coins",
    "accent": "violet",
    "tagline": "Ship payment and ledger changes with the evidence regulators expect",
    "headline": [
      "Ship faster in fintech,",
      "without loosening control."
    ],
    "lede": "Payments, ledgers and onboarding flows change every week, and every change has to prove it did not break money movement. exekova runs the engineering and QA work from ticket to reviewed, tested change, with the evidence attached.",
    "summary": "Ship payment and ledger changes with the evidence regulators expect.",
    "arrives": [
      "Payment defect",
      "Ledger discrepancy",
      "Partner API request",
      "Onboarding rule change",
      "Release regression run",
      "Incident action"
    ],
    "source": "Jira",
    "sample": {
      "id": "PAY-231",
      "title": "Settlement retry posts twice",
      "body": "A retried settlement callback can post the same transfer twice. Make repeated callbacks safe.",
      "criterion": "The same transfer must never post twice."
    },
    "phases": [
      {
        "label": "Understand",
        "status": "Understanding",
        "title": "Context before code.",
        "lines": [
          "Scope: settlement callback handler",
          "Standard: Money movement paths verified",
          "Standard: Public API preserved"
        ]
      },
      {
        "label": "Implement",
        "status": "Implementing",
        "title": "A scoped change on a working branch.",
        "lines": [
          "Idempotency key added to callback processing",
          "Existing behaviour preserved",
          "Working branch recorded"
        ]
      },
      {
        "label": "Verify",
        "status": "Verifying",
        "title": "Reviewed independently. Tested in your environment.",
        "lines": [
          "Independent review passed",
          "Replayed callbacks post once in regression",
          "Acceptance criteria verified"
        ]
      },
      {
        "label": "Deliver",
        "status": "Accepted",
        "title": "Returned with its evidence.",
        "lines": [
          "Reviewed pull request",
          "Tracker updated",
          "Cost and time recorded"
        ]
      }
    ],
    "workloads": {
      "label": "Engineering and QA workloads",
      "headline": [
        "The work exekova",
        "runs in fintech."
      ],
      "body": "Engineering and QA are where exekova starts. Each item is a run from ticket to reviewed, tested change, with the evidence attached.",
      "items": [
        {
          "title": "Payment flow changes",
          "body": "Gateway, retry and settlement changes implemented against the existing contract, with the money-movement paths regression tested before review.",
          "kind": "Engineering"
        },
        {
          "title": "Ledger and reconciliation fixes",
          "body": "Double-entry, rounding and reconciliation defects reproduced first, then fixed with tests that lock the corrected behaviour in place.",
          "kind": "Engineering"
        },
        {
          "title": "KYC and onboarding logic",
          "body": "Rule changes to identity, limits and onboarding steps delivered with the decision paths tested end to end.",
          "kind": "Engineering"
        },
        {
          "title": "API versioning and compatibility",
          "body": "Public and partner APIs changed without breaking existing integrations, verified by contract tests.",
          "kind": "Engineering"
        },
        {
          "title": "Regression suites for releases",
          "body": "Test cases derived from the acceptance criteria of each change, run in your environments, results retained as evidence.",
          "kind": "QA"
        },
        {
          "title": "Incident follow-ups",
          "body": "Post-incident engineering actions picked up from the tracker and closed with a reviewed change and a linked test.",
          "kind": "Engineering"
        }
      ]
    },
    "cases": {
      "label": "Four live problems",
      "headline": [
        "The four that",
        "someone outside your team is timing."
      ],
      "body": "Two are scheduled by a provider or a regulator. One is the defect class that passes every test you have. One is a control your assessor will ask to see. All four are engineering and QA work.",
      "ids": [
        "fintech-psp-deprecation",
        "fintech-recon-exceptions",
        "fintech-api-authorisation",
        "fintech-pci-client-side"
      ]
    },
    "controls": {
      "label": "Division of responsibility",
      "headline": [
        "What exekova owns.",
        "What stays with you."
      ],
      "body": "The controls your industry expects do not move. exekova executes inside them.",
      "rail": [
        {
          "key": "Arrives",
          "title": "The work that arrives",
          "items": [
            "Payment defect",
            "Ledger discrepancy",
            "Partner API request",
            "Onboarding rule change",
            "Release regression run",
            "Incident action"
          ]
        },
        {
          "key": "Must meet",
          "title": "The standard it must meet",
          "items": [
            "Money movement paths verified",
            "Public API preserved",
            "Audit trail on every change",
            "Segregation of duties",
            "Approval before production",
            "Retry budget"
          ]
        },
        {
          "key": "Comes back",
          "title": "What comes back",
          "items": [
            "Reviewed pull request",
            "Regression evidence",
            "Review record",
            "Tracker updated",
            "Cost and time recorded"
          ]
        }
      ],
      "owns": [
        "Understanding the ticket and repository context",
        "Implementation on a working branch",
        "Independent code review",
        "Regression and contract tests",
        "Failure diagnosis and retry",
        "Delivery with evidence"
      ],
      "keeps": [
        "Acceptance criteria and risk limits",
        "Production deployment approval",
        "Regulatory sign-off",
        "Access scope per repository",
        "Which work is eligible"
      ]
    },
    "metrics": {
      "label": "How you'd measure it",
      "headline": [
        "What to watch in",
        "the first quarter."
      ],
      "body": "Every figure comes from your own runs. exekova records quality, time, cost and intervention for each accepted outcome, so the first quarter measures the work, not the demo.",
      "items": [
        {
          "label": "Time from ticket to reviewed change",
          "hint": "Elapsed time from intake to a change ready for your review.",
          "icon": "clock"
        },
        {
          "label": "Regression coverage on delivered change",
          "hint": "Which delivered changes carried regression evidence, and which did not.",
          "icon": "shield"
        },
        {
          "label": "Escaped defects in money movement",
          "hint": "Defects found after delivery in payment or ledger paths.",
          "icon": "bug"
        },
        {
          "label": "Cost per accepted change",
          "hint": "Spend per accepted outcome, including retries and repairs.",
          "icon": "coins"
        },
        {
          "label": "Human intervention rate",
          "hint": "How often a person had to step in, and why.",
          "icon": "users"
        }
      ]
    },
    "cta": {
      "headline": [
        "Start with one",
        "repeating task."
      ],
      "body": "Pick something in fintech engineering or QA that recurs weekly. It makes the measurement honest."
    }
  },
  {
    "slug": "banking",
    "name": "Banking",
    "group": "Financial & regulated",
    "groupIndex": 0,
    "icon": "landmark",
    "accent": "azure",
    "tagline": "Modernise core and channel systems at a pace risk teams can sign off",
    "headline": [
      "Banking engineering,",
      "at an auditable pace."
    ],
    "lede": "Core, channel and integration work in a bank has to move through review, testing and approval every time. exekova carries that path for engineering and QA, so the backlog moves without the controls moving.",
    "summary": "Modernise core and channel systems at a pace risk teams can sign off.",
    "arrives": [
      "Channel defect",
      "Adapter change",
      "Reporting fix",
      "Audit finding",
      "Release regression run",
      "Legacy maintenance task"
    ],
    "source": "Jira",
    "sample": {
      "id": "CHN-118",
      "title": "Statement export fails for joint accounts",
      "body": "Joint-account statements time out on export. Fix it without changing the export format.",
      "criterion": "Export format unchanged; joint accounts export within limits."
    },
    "phases": [
      {
        "label": "Understand",
        "status": "Understanding",
        "title": "Context before code.",
        "lines": [
          "Scope: statement export service",
          "Standard: Existing interfaces preserved",
          "Standard: Characterisation tests first"
        ]
      },
      {
        "label": "Implement",
        "status": "Implementing",
        "title": "A scoped change on a working branch.",
        "lines": [
          "Joint-account query batched and indexed",
          "Existing behaviour preserved",
          "Working branch recorded"
        ]
      },
      {
        "label": "Verify",
        "status": "Verifying",
        "title": "Reviewed independently. Tested in your environment.",
        "lines": [
          "Independent review passed",
          "Export contract and timing tests pass",
          "Acceptance criteria verified"
        ]
      },
      {
        "label": "Deliver",
        "status": "Accepted",
        "title": "Returned with its evidence.",
        "lines": [
          "Reviewed pull request",
          "Tracker updated",
          "Cost and time recorded"
        ]
      }
    ],
    "workloads": {
      "label": "Engineering and QA workloads",
      "headline": [
        "The work exekova",
        "runs in banking."
      ],
      "body": "Engineering and QA are where exekova starts. Each item is a run from ticket to reviewed, tested change, with the evidence attached.",
      "items": [
        {
          "title": "Channel and mobile changes",
          "body": "Feature and defect work across web and mobile channels delivered as reviewed changes with the customer journeys tested.",
          "kind": "Engineering"
        },
        {
          "title": "Core and integration adapters",
          "body": "Changes to adapters, message formats and batch jobs implemented against the existing interfaces and verified by contract tests.",
          "kind": "Engineering"
        },
        {
          "title": "Regulatory reporting fixes",
          "body": "Report logic and data mapping defects reproduced, corrected and locked in with tests before review.",
          "kind": "Engineering"
        },
        {
          "title": "Legacy code maintenance",
          "body": "Bounded changes in older services made with characterisation tests written first, so behaviour is preserved.",
          "kind": "Engineering"
        },
        {
          "title": "Release regression runs",
          "body": "Test cases derived from acceptance criteria, run in your environments, with results retained per release.",
          "kind": "QA"
        },
        {
          "title": "Audit findings closed",
          "body": "Engineering actions from audit and control findings picked up, implemented and closed with linked evidence.",
          "kind": "Engineering"
        }
      ]
    },
    "cases": {
      "label": "Two live problems",
      "headline": [
        "The two that",
        "arrive with a deadline attached."
      ],
      "body": "Neither is technically difficult. Both are large, externally timed and unforgiving about being late, which is why they land on the teams with the least slack.",
      "ids": [
        "banking-reg-reporting",
        "banking-core-adapters"
      ]
    },
    "controls": {
      "label": "Division of responsibility",
      "headline": [
        "What exekova owns.",
        "What stays with you."
      ],
      "body": "The controls your industry expects do not move. exekova executes inside them.",
      "rail": [
        {
          "key": "Arrives",
          "title": "The work that arrives",
          "items": [
            "Channel defect",
            "Adapter change",
            "Reporting fix",
            "Audit finding",
            "Release regression run",
            "Legacy maintenance task"
          ]
        },
        {
          "key": "Must meet",
          "title": "The standard it must meet",
          "items": [
            "Existing interfaces preserved",
            "Characterisation tests first",
            "Audit trail on every change",
            "Segregation of duties",
            "Approval before production",
            "Scoped repository access"
          ]
        },
        {
          "key": "Comes back",
          "title": "What comes back",
          "items": [
            "Reviewed pull request",
            "Test evidence per release",
            "Review record",
            "Tracker updated",
            "Cost and time recorded"
          ]
        }
      ],
      "owns": [
        "Understanding the change and its blast radius",
        "Implementation on a working branch",
        "Independent code review",
        "Regression and contract tests",
        "Failure diagnosis and retry",
        "Delivery with evidence"
      ],
      "keeps": [
        "Change approval boards",
        "Production deployment",
        "Risk and compliance sign-off",
        "Access scope per system",
        "Which work is eligible"
      ]
    },
    "metrics": {
      "label": "How you'd measure it",
      "headline": [
        "Measure the first quarter",
        "the way an auditor would."
      ],
      "body": "Not everything is readable on day one. Some measures are true from the first run, some need a sample, and some only mean anything once there are enough runs to trend. Here is what becomes trustworthy, and when.",
      "items": [
        {
          "label": "Segregation of duties held",
          "hint": "Every change reviewed by a capability that did not write it, with the implementer unable to approve its own work.",
          "icon": "shield"
        },
        {
          "label": "Evidence attached per change",
          "hint": "Plan, diff, test results, review record and approval retained together against the originating ticket.",
          "icon": "file"
        },
        {
          "label": "Time from ticket to reviewed change",
          "hint": "Elapsed time from intake to a change sitting ready for your review.",
          "icon": "clock"
        },
        {
          "label": "Blocked time waiting on people",
          "hint": "The share of that elapsed time spent queueing on an approval, an access grant or an answer.",
          "icon": "lock"
        },
        {
          "label": "Acceptance rate on first submission",
          "hint": "Share of work that met your standard without a second pass.",
          "icon": "check"
        },
        {
          "label": "Change failure rate",
          "hint": "Delivered changes that needed a follow-up fix, counted against changes delivered.",
          "icon": "bug"
        },
        {
          "label": "Cost per accepted change",
          "hint": "Execution, review, retries and human time over the changes that met your standard.",
          "icon": "coins"
        },
        {
          "label": "Audit pack completeness",
          "hint": "Share of delivered changes with a complete record at the moment an auditor asks, not after a reconstruction exercise.",
          "icon": "grid"
        }
      ]
    },
    "cta": {
      "headline": [
        "Start with one",
        "repeating task."
      ],
      "body": "Pick something in banking engineering or QA that recurs weekly. It makes the measurement honest."
    }
  },
  {
    "slug": "insurance",
    "name": "Insurance",
    "group": "Financial & regulated",
    "groupIndex": 0,
    "icon": "umbrella",
    "accent": "leaf",
    "tagline": "Change rating, claims and policy systems with every rule tested",
    "headline": [
      "Insurance systems,",
      "changed with proof."
    ],
    "lede": "Rating rules, claims workflows and policy administration change constantly, and a wrong rule costs money quietly. exekova runs the engineering and QA work with the rule paths tested and the evidence retained.",
    "summary": "Change rating, claims and policy systems with every rule tested.",
    "arrives": [
      "Rating rule change",
      "Claims workflow defect",
      "Policy admin fix",
      "Partner integration request",
      "Release regression run",
      "Migration check"
    ],
    "source": "Jira",
    "sample": {
      "id": "RTG-402",
      "title": "Multi-vehicle discount misapplied",
      "body": "The discount applies once per policy instead of per eligible vehicle. Correct the rating rule.",
      "criterion": "Quotes match the rating table for every vehicle count."
    },
    "phases": [
      {
        "label": "Understand",
        "status": "Understanding",
        "title": "Context before code.",
        "lines": [
          "Scope: rating engine discount rule",
          "Standard: Quote outputs match expectations",
          "Standard: Existing partner contracts preserved"
        ]
      },
      {
        "label": "Implement",
        "status": "Implementing",
        "title": "A scoped change on a working branch.",
        "lines": [
          "Discount evaluated per eligible vehicle",
          "Existing behaviour preserved",
          "Working branch recorded"
        ]
      },
      {
        "label": "Verify",
        "status": "Verifying",
        "title": "Reviewed independently. Tested in your environment.",
        "lines": [
          "Independent review passed",
          "Quote outputs match the expected table",
          "Acceptance criteria verified"
        ]
      },
      {
        "label": "Deliver",
        "status": "Accepted",
        "title": "Returned with its evidence.",
        "lines": [
          "Reviewed pull request",
          "Tracker updated",
          "Cost and time recorded"
        ]
      }
    ],
    "workloads": {
      "label": "Engineering and QA workloads",
      "headline": [
        "The work exekova",
        "runs in insurance."
      ],
      "body": "Engineering and QA are where exekova starts. Each item is a run from ticket to reviewed, tested change, with the evidence attached.",
      "items": [
        {
          "title": "Rating and pricing rule changes",
          "body": "Rule and factor changes implemented with the affected quote paths tested against expected outputs.",
          "kind": "Engineering"
        },
        {
          "title": "Claims workflow updates",
          "body": "Status, routing and document handling changes delivered as reviewed changes with the workflow tested end to end.",
          "kind": "Engineering"
        },
        {
          "title": "Policy administration fixes",
          "body": "Endorsement, renewal and cancellation defects reproduced and fixed with tests that hold the corrected behaviour.",
          "kind": "Engineering"
        },
        {
          "title": "Broker and partner integrations",
          "body": "API and file-based integrations changed without breaking existing partners, verified by contract tests.",
          "kind": "Engineering"
        },
        {
          "title": "Regression suites for releases",
          "body": "Cases derived from acceptance criteria, executed in your environments, results retained as evidence.",
          "kind": "QA"
        },
        {
          "title": "Data migration checks",
          "body": "Verification scripts and reconciliation tests written and run for migrations, with discrepancies reported.",
          "kind": "QA"
        }
      ]
    },
    "cases": {
      "label": "Two live problems",
      "headline": [
        "The two that",
        "decide the quarter."
      ],
      "body": "One changes what you charge. The other decides how a claim feels. Both are steady, provable engineering work that competes badly against the roadmap.",
      "ids": [
        "insurance-rating-rules",
        "insurance-claims-intake"
      ]
    },
    "controls": {
      "label": "Division of responsibility",
      "headline": [
        "What exekova owns.",
        "What stays with you."
      ],
      "body": "The controls your industry expects do not move. exekova executes inside them.",
      "rail": [
        {
          "key": "Arrives",
          "title": "The work that arrives",
          "items": [
            "Rating rule change",
            "Claims workflow defect",
            "Policy admin fix",
            "Partner integration request",
            "Release regression run",
            "Migration check"
          ]
        },
        {
          "key": "Must meet",
          "title": "The standard it must meet",
          "items": [
            "Quote outputs match expectations",
            "Existing partner contracts preserved",
            "Audit trail on every change",
            "Independent review",
            "Approval before production",
            "Retry budget"
          ]
        },
        {
          "key": "Comes back",
          "title": "What comes back",
          "items": [
            "Reviewed pull request",
            "Rule and regression evidence",
            "Review record",
            "Tracker updated",
            "Cost and time recorded"
          ]
        }
      ],
      "owns": [
        "Understanding the rule change and its scope",
        "Implementation on a working branch",
        "Independent code review",
        "Rule, regression and contract tests",
        "Failure diagnosis and retry",
        "Delivery with evidence"
      ],
      "keeps": [
        "Actuarial and product sign-off",
        "Production deployment approval",
        "Regulatory filings",
        "Access scope per system",
        "Which work is eligible"
      ]
    },
    "metrics": {
      "label": "How you'd measure it",
      "headline": [
        "What to watch in",
        "the first quarter."
      ],
      "body": "Every figure comes from your own runs. exekova records quality, time, cost and intervention for each accepted outcome, so the first quarter measures the work, not the demo.",
      "items": [
        {
          "label": "Time from ticket to reviewed change",
          "hint": "Elapsed time from intake to a change ready for your review.",
          "icon": "clock"
        },
        {
          "label": "Rule coverage on delivered change",
          "hint": "Which rule changes carried tests against expected outputs.",
          "icon": "shield"
        },
        {
          "label": "Defects found after release",
          "hint": "Defects reported after delivery, traced to their run.",
          "icon": "bug"
        },
        {
          "label": "Cost per accepted change",
          "hint": "Spend per accepted outcome, including retries and repairs.",
          "icon": "coins"
        },
        {
          "label": "Human intervention rate",
          "hint": "How often a person had to step in, and why.",
          "icon": "users"
        }
      ]
    },
    "cta": {
      "headline": [
        "Start with one",
        "repeating task."
      ],
      "body": "Pick something in insurance engineering or QA that recurs weekly. It makes the measurement honest."
    }
  },
  {
    "slug": "healthcare",
    "name": "Healthcare & life sciences",
    "group": "Financial & regulated",
    "groupIndex": 0,
    "icon": "heart",
    "accent": "violet",
    "tagline": "Change clinical and patient systems with validation evidence attached",
    "headline": [
      "Healthcare software,",
      "validated as it changes."
    ],
    "lede": "Patient-facing and clinical systems need every change reviewed, tested and traceable. exekova runs the engineering and QA work inside the boundaries your validation programme sets, and keeps the evidence with the change.",
    "summary": "Change clinical and patient systems with validation evidence attached.",
    "arrives": [
      "Portal defect",
      "Interface change",
      "Data pipeline fix",
      "Validation regression run",
      "Legacy maintenance task",
      "Compliance action"
    ],
    "source": "Jira",
    "sample": {
      "id": "PRT-56",
      "title": "Appointment reminders sent twice",
      "body": "Rescheduled appointments trigger reminders for both slots. Send one reminder for the active slot.",
      "criterion": "One reminder per active appointment."
    },
    "phases": [
      {
        "label": "Understand",
        "status": "Understanding",
        "title": "Context before code.",
        "lines": [
          "Scope: reminder scheduler",
          "Standard: Requirement linked to every change",
          "Standard: Existing interfaces preserved"
        ]
      },
      {
        "label": "Implement",
        "status": "Implementing",
        "title": "A scoped change on a working branch.",
        "lines": [
          "Old reminder cancelled before the new slot is booked",
          "Existing behaviour preserved",
          "Working branch recorded"
        ]
      },
      {
        "label": "Verify",
        "status": "Verifying",
        "title": "Reviewed independently. Tested in your environment.",
        "lines": [
          "Independent review passed",
          "Reschedule scenarios verified end to end",
          "Acceptance criteria verified"
        ]
      },
      {
        "label": "Deliver",
        "status": "Accepted",
        "title": "Returned with its evidence.",
        "lines": [
          "Reviewed pull request",
          "Tracker updated",
          "Cost and time recorded"
        ]
      }
    ],
    "workloads": {
      "label": "Engineering and QA workloads",
      "headline": [
        "The work exekova",
        "runs in healthcare."
      ],
      "body": "Engineering and QA are where exekova starts. Each item is a run from ticket to reviewed, tested change, with the evidence attached.",
      "items": [
        {
          "title": "Patient portal and scheduling changes",
          "body": "Feature and defect work delivered as reviewed changes with the patient journeys tested end to end.",
          "kind": "Engineering"
        },
        {
          "title": "Integration and interface work",
          "body": "HL7, FHIR and vendor interface changes implemented against existing contracts and verified by contract tests.",
          "kind": "Engineering"
        },
        {
          "title": "Data pipeline fixes",
          "body": "Reporting and data quality defects reproduced, corrected and locked in with tests.",
          "kind": "Engineering"
        },
        {
          "title": "Traceability for every change",
          "body": "Requirement, implementation, review and test linked in the run record so validation can be reviewed after the fact.",
          "kind": "Engineering"
        },
        {
          "title": "Regression suites for releases",
          "body": "Cases derived from acceptance criteria, run in your environments, results retained per release.",
          "kind": "QA"
        },
        {
          "title": "Legacy system maintenance",
          "body": "Bounded changes in older services made with characterisation tests written first.",
          "kind": "Engineering"
        }
      ]
    },
    "cases": {
      "label": "Two live problems",
      "headline": [
        "The two that",
        "sit between you and go-live."
      ],
      "body": "One is judged against a specification you do not control. The other is the reason defects stay unreproduced. Both are detailed, bounded and provable.",
      "ids": [
        "healthcare-interop-conformance",
        "healthcare-phi-boundaries"
      ]
    },
    "controls": {
      "label": "Division of responsibility",
      "headline": [
        "What exekova owns.",
        "What stays with you."
      ],
      "body": "The controls your industry expects do not move. exekova executes inside them.",
      "rail": [
        {
          "key": "Arrives",
          "title": "The work that arrives",
          "items": [
            "Portal defect",
            "Interface change",
            "Data pipeline fix",
            "Validation regression run",
            "Legacy maintenance task",
            "Compliance action"
          ]
        },
        {
          "key": "Must meet",
          "title": "The standard it must meet",
          "items": [
            "Requirement linked to every change",
            "Existing interfaces preserved",
            "Independent review",
            "Test evidence retained",
            "Approval before production",
            "Scoped data access"
          ]
        },
        {
          "key": "Comes back",
          "title": "What comes back",
          "items": [
            "Reviewed pull request",
            "Traceable test evidence",
            "Review record",
            "Tracker updated",
            "Cost and time recorded"
          ]
        }
      ],
      "owns": [
        "Understanding the requirement and system context",
        "Implementation on a working branch",
        "Independent code review",
        "Regression and interface tests",
        "Failure diagnosis and retry",
        "Delivery with evidence"
      ],
      "keeps": [
        "Validation and quality sign-off",
        "Production deployment approval",
        "Clinical and privacy review",
        "Access scope per system",
        "Which work is eligible"
      ]
    },
    "metrics": {
      "label": "How you'd measure it",
      "headline": [
        "What to watch in",
        "the first quarter."
      ],
      "body": "Every figure comes from your own runs. exekova records quality, time, cost and intervention for each accepted outcome, so the first quarter measures the work, not the demo.",
      "items": [
        {
          "label": "Time from ticket to reviewed change",
          "hint": "Elapsed time from intake to a change ready for your review.",
          "icon": "clock"
        },
        {
          "label": "Traceability coverage on delivered change",
          "hint": "Changes with requirement, review and test linked in the record.",
          "icon": "file"
        },
        {
          "label": "Defects found in validation",
          "hint": "Defects caught by the acceptance gate before delivery.",
          "icon": "flask"
        },
        {
          "label": "Cost per accepted change",
          "hint": "Spend per accepted outcome, including retries and repairs.",
          "icon": "coins"
        },
        {
          "label": "Human intervention rate",
          "hint": "How often a person had to step in, and why.",
          "icon": "users"
        }
      ]
    },
    "cta": {
      "headline": [
        "Start with one",
        "repeating task."
      ],
      "body": "Pick something in healthcare engineering or QA that recurs weekly. It makes the measurement honest."
    }
  },
  {
    "slug": "public-sector",
    "name": "Public sector",
    "group": "Financial & regulated",
    "groupIndex": 0,
    "icon": "building",
    "accent": "teal",
    "tagline": "Deliver citizen services and case systems with a full audit trail",
    "headline": [
      "Public services software,",
      "delivered with a record."
    ],
    "lede": "Citizen-facing services and case management systems need every change reviewed, tested and accountable. exekova runs the engineering and QA work inside your governance, with an audit trail for every change.",
    "summary": "Deliver citizen services and case systems with a full audit trail.",
    "arrives": [
      "Service defect",
      "Eligibility rule change",
      "Integration change",
      "Accessibility finding",
      "Release regression run",
      "Legacy maintenance task"
    ],
    "source": "Jira",
    "sample": {
      "id": "CSV-61",
      "title": "Eligibility check ignores updated income",
      "body": "Reassessed income is not used by the eligibility check. Use the latest verified figure.",
      "criterion": "Eligibility uses the latest verified income."
    },
    "phases": [
      {
        "label": "Understand",
        "status": "Understanding",
        "title": "Context before code.",
        "lines": [
          "Scope: eligibility rules service",
          "Standard: Journey outputs match expectations",
          "Standard: Existing interfaces preserved"
        ]
      },
      {
        "label": "Implement",
        "status": "Implementing",
        "title": "A scoped change on a working branch.",
        "lines": [
          "Rules read the latest verified income record",
          "Existing behaviour preserved",
          "Working branch recorded"
        ]
      },
      {
        "label": "Verify",
        "status": "Verifying",
        "title": "Reviewed independently. Tested in your environment.",
        "lines": [
          "Independent review passed",
          "Eligibility journeys verified with reassessment cases",
          "Acceptance criteria verified"
        ]
      },
      {
        "label": "Deliver",
        "status": "Accepted",
        "title": "Returned with its evidence.",
        "lines": [
          "Reviewed pull request",
          "Tracker updated",
          "Cost and time recorded"
        ]
      }
    ],
    "workloads": {
      "label": "Engineering and QA workloads",
      "headline": [
        "The work exekova",
        "runs in public sector."
      ],
      "body": "Engineering and QA are where exekova starts. Each item is a run from ticket to reviewed, tested change, with the evidence attached.",
      "items": [
        {
          "title": "Citizen service changes",
          "body": "Form, eligibility and application flow changes delivered as reviewed changes with the journeys tested.",
          "kind": "Engineering"
        },
        {
          "title": "Case management fixes",
          "body": "Status, routing and document handling defects reproduced, fixed and locked in with tests.",
          "kind": "Engineering"
        },
        {
          "title": "Interdepartmental integrations",
          "body": "Interface and data exchange changes verified by contract tests before review.",
          "kind": "Engineering"
        },
        {
          "title": "Accessibility and compliance actions",
          "body": "Accessibility and policy findings picked up from the tracker and closed with reviewed changes and linked tests.",
          "kind": "Engineering"
        },
        {
          "title": "Regression suites for releases",
          "body": "Cases derived from acceptance criteria, run in your environments, results retained per release.",
          "kind": "QA"
        },
        {
          "title": "Legacy system maintenance",
          "body": "Bounded changes in older systems made with characterisation tests written first.",
          "kind": "Engineering"
        }
      ]
    },
    "cases": {
      "label": "Two live problems",
      "headline": [
        "The two that",
        "are already public commitments."
      ],
      "body": "One has a statutory deadline and a published finding list. The other cannot be done in one move and cannot be left alone. Both need evidence, not assurances.",
      "ids": [
        "public-sector-accessibility-remediation",
        "public-sector-legacy-increments"
      ]
    },
    "controls": {
      "label": "Division of responsibility",
      "headline": [
        "What exekova owns.",
        "What stays with you."
      ],
      "body": "The controls your industry expects do not move. exekova executes inside them.",
      "rail": [
        {
          "key": "Arrives",
          "title": "The work that arrives",
          "items": [
            "Service defect",
            "Eligibility rule change",
            "Integration change",
            "Accessibility finding",
            "Release regression run",
            "Legacy maintenance task"
          ]
        },
        {
          "key": "Must meet",
          "title": "The standard it must meet",
          "items": [
            "Journey outputs match expectations",
            "Existing interfaces preserved",
            "Independent review",
            "Audit trail on every change",
            "Approval before production",
            "Scoped data access"
          ]
        },
        {
          "key": "Comes back",
          "title": "What comes back",
          "items": [
            "Reviewed pull request",
            "Regression evidence",
            "Review record",
            "Tracker updated",
            "Cost and time recorded"
          ]
        }
      ],
      "owns": [
        "Understanding the change and its policy context",
        "Implementation on a working branch",
        "Independent code review",
        "Regression and interface tests",
        "Failure diagnosis and retry",
        "Delivery with evidence"
      ],
      "keeps": [
        "Governance and change approval",
        "Production deployment",
        "Policy and privacy sign-off",
        "Access scope per system",
        "Which work is eligible"
      ]
    },
    "metrics": {
      "label": "How you'd measure it",
      "headline": [
        "What to watch in",
        "the first quarter."
      ],
      "body": "Every figure comes from your own runs. exekova records quality, time, cost and intervention for each accepted outcome, so the first quarter measures the work, not the demo.",
      "items": [
        {
          "label": "Time from ticket to reviewed change",
          "hint": "Elapsed time from intake to a change ready for your review.",
          "icon": "clock"
        },
        {
          "label": "Test evidence coverage per release",
          "hint": "Share of each release backed by retained test results.",
          "icon": "shield"
        },
        {
          "label": "Defects found after release",
          "hint": "Defects reported after delivery, traced to their run.",
          "icon": "bug"
        },
        {
          "label": "Cost per accepted change",
          "hint": "Spend per accepted outcome, including retries and repairs.",
          "icon": "coins"
        },
        {
          "label": "Human intervention rate",
          "hint": "How often a person had to step in, and why.",
          "icon": "users"
        }
      ]
    },
    "cta": {
      "headline": [
        "Start with one",
        "repeating task."
      ],
      "body": "Pick something in public sector engineering or QA that recurs weekly. It makes the measurement honest."
    }
  },
  {
    "slug": "ecommerce",
    "name": "Ecommerce & retail",
    "group": "Digital & service businesses",
    "groupIndex": 1,
    "icon": "cart",
    "accent": "teal",
    "tagline": "Keep checkout, catalogue and fulfilment moving through every peak",
    "headline": [
      "Ecommerce engineering",
      "that survives peak season."
    ],
    "lede": "Checkout, catalogue, promotions and fulfilment change weekly, and every release lands in front of customers. exekova runs the engineering and QA work with the purchase paths tested before anything ships.",
    "summary": "Keep checkout, catalogue and fulfilment moving through every peak.",
    "arrives": [
      "Checkout defect",
      "Catalogue fix",
      "Promotion rule change",
      "Integration request",
      "Performance task",
      "Peak regression run"
    ],
    "source": "Jira",
    "sample": {
      "id": "CHK-77",
      "title": "Promo code drops on address change",
      "body": "Applied promotions are lost when the shipping address changes at checkout.",
      "criterion": "Promotions persist across address edits; totals stay correct."
    },
    "phases": [
      {
        "label": "Understand",
        "status": "Understanding",
        "title": "Context before code.",
        "lines": [
          "Scope: checkout session state",
          "Standard: Purchase paths verified",
          "Standard: Public API preserved"
        ]
      },
      {
        "label": "Implement",
        "status": "Implementing",
        "title": "A scoped change on a working branch.",
        "lines": [
          "Promotion state preserved on address update",
          "Existing behaviour preserved",
          "Working branch recorded"
        ]
      },
      {
        "label": "Verify",
        "status": "Verifying",
        "title": "Reviewed independently. Tested in your environment.",
        "lines": [
          "Independent review passed",
          "Checkout regression covers address edits",
          "Acceptance criteria verified"
        ]
      },
      {
        "label": "Deliver",
        "status": "Accepted",
        "title": "Returned with its evidence.",
        "lines": [
          "Reviewed pull request",
          "Tracker updated",
          "Cost and time recorded"
        ]
      }
    ],
    "workloads": {
      "label": "Engineering and QA workloads",
      "headline": [
        "The work exekova",
        "runs in ecommerce."
      ],
      "body": "Engineering and QA are where exekova starts. Each item is a run from ticket to reviewed, tested change, with the evidence attached.",
      "items": [
        {
          "title": "Checkout and payment changes",
          "body": "Cart, checkout and payment method changes delivered with the purchase paths regression tested before review.",
          "kind": "QA"
        },
        {
          "title": "Catalogue and search fixes",
          "body": "Product data, pricing and search defects reproduced, fixed and locked in with tests.",
          "kind": "Engineering"
        },
        {
          "title": "Promotions and pricing rules",
          "body": "Discount, bundle and campaign logic implemented with the rule paths tested against expected totals.",
          "kind": "Engineering"
        },
        {
          "title": "Storefront performance work",
          "body": "Bounded performance changes made with measurements captured before and after as evidence.",
          "kind": "Engineering"
        },
        {
          "title": "Order and fulfilment integrations",
          "body": "OMS, WMS and carrier integrations changed without breaking existing flows, verified by contract tests.",
          "kind": "Engineering"
        },
        {
          "title": "Peak readiness regression",
          "body": "Regression suites derived from acceptance criteria, run ahead of campaigns, with results retained.",
          "kind": "QA"
        }
      ]
    },
    "cases": {
      "label": "Two live problems",
      "headline": [
        "The two that",
        "show up as lost revenue."
      ],
      "body": "Neither one pages anybody. They surface as a checkout that buckled or a product that quietly stopped appearing, and by then the trading window has moved on.",
      "ids": [
        "ecommerce-peak-readiness",
        "ecommerce-catalogue-integrity"
      ]
    },
    "controls": {
      "label": "Division of responsibility",
      "headline": [
        "What exekova owns.",
        "What stays with you."
      ],
      "body": "The controls your industry expects do not move. exekova executes inside them.",
      "rail": [
        {
          "key": "Arrives",
          "title": "The work that arrives",
          "items": [
            "Checkout defect",
            "Catalogue fix",
            "Promotion rule change",
            "Integration request",
            "Performance task",
            "Peak regression run"
          ]
        },
        {
          "key": "Must meet",
          "title": "The standard it must meet",
          "items": [
            "Purchase paths verified",
            "Public API preserved",
            "Order totals match expectations",
            "Independent review",
            "Approval before production",
            "Retry budget"
          ]
        },
        {
          "key": "Comes back",
          "title": "What comes back",
          "items": [
            "Reviewed pull request",
            "Regression evidence",
            "Review record",
            "Tracker updated",
            "Cost and time recorded"
          ]
        }
      ],
      "owns": [
        "Understanding the ticket and storefront context",
        "Implementation on a working branch",
        "Independent code review",
        "Regression and contract tests",
        "Failure diagnosis and retry",
        "Delivery with evidence"
      ],
      "keeps": [
        "Acceptance criteria per change",
        "Release timing and deployment",
        "Campaign and pricing sign-off",
        "Access scope per repository",
        "Which work is eligible"
      ]
    },
    "metrics": {
      "label": "How you'd measure it",
      "headline": [
        "What to watch in",
        "the first quarter."
      ],
      "body": "Every figure comes from your own runs. exekova records quality, time, cost and intervention for each accepted outcome, so the first quarter measures the work, not the demo.",
      "items": [
        {
          "label": "Time from ticket to reviewed change",
          "hint": "Elapsed time from intake to a change ready for your review.",
          "icon": "clock"
        },
        {
          "label": "Regression coverage on checkout paths",
          "hint": "Which checkout changes carried purchase-path regression evidence.",
          "icon": "shield"
        },
        {
          "label": "Incidents after release",
          "hint": "Production incidents traced back to a delivered change.",
          "icon": "bug"
        },
        {
          "label": "Cost per accepted change",
          "hint": "Spend per accepted outcome, including retries and repairs.",
          "icon": "coins"
        },
        {
          "label": "Backlog reduction ahead of peak",
          "hint": "Accepted work against incoming demand before the peak.",
          "icon": "chart"
        }
      ]
    },
    "cta": {
      "headline": [
        "Start with one",
        "repeating task."
      ],
      "body": "Pick something in ecommerce engineering or QA that recurs weekly. It makes the measurement honest."
    }
  },
  {
    "slug": "saas",
    "name": "SaaS & software",
    "group": "Digital & service businesses",
    "groupIndex": 1,
    "icon": "layers",
    "accent": "azure",
    "tagline": "Turn a growing backlog into reviewed, tested releases every week",
    "headline": [
      "More of the backlog,",
      "shipped and verified."
    ],
    "lede": "Software companies rarely lack ideas. They lack the review, testing and follow-through capacity to ship them safely. exekova runs engineering and QA work from ticket to reviewed change, with the evidence attached.",
    "summary": "Turn a growing backlog into reviewed, tested releases every week.",
    "arrives": [
      "Backlog feature",
      "Customer bug",
      "API change",
      "Dependency upgrade",
      "Release regression run",
      "Tech debt task"
    ],
    "source": "Jira",
    "sample": {
      "id": "API-310",
      "title": "Webhook retries exceed rate limits",
      "body": "Retry bursts trip customer rate limits. Add backoff without changing the webhook payload.",
      "criterion": "Payload unchanged; retries respect customer limits."
    },
    "phases": [
      {
        "label": "Understand",
        "status": "Understanding",
        "title": "Context before code.",
        "lines": [
          "Scope: webhook delivery worker",
          "Standard: Public API preserved",
          "Standard: Tenant isolation verified"
        ]
      },
      {
        "label": "Implement",
        "status": "Implementing",
        "title": "A scoped change on a working branch.",
        "lines": [
          "Exponential backoff with jitter on retries",
          "Existing behaviour preserved",
          "Working branch recorded"
        ]
      },
      {
        "label": "Verify",
        "status": "Verifying",
        "title": "Reviewed independently. Tested in your environment.",
        "lines": [
          "Independent review passed",
          "Contract and retry-timing tests pass",
          "Acceptance criteria verified"
        ]
      },
      {
        "label": "Deliver",
        "status": "Accepted",
        "title": "Returned with its evidence.",
        "lines": [
          "Reviewed pull request",
          "Tracker updated",
          "Cost and time recorded"
        ]
      }
    ],
    "workloads": {
      "label": "Engineering and QA workloads",
      "headline": [
        "The work exekova",
        "runs in SaaS."
      ],
      "body": "Engineering and QA are where exekova starts. Each item is a run from ticket to reviewed, tested change, with the evidence attached.",
      "items": [
        {
          "title": "Feature work from the backlog",
          "body": "Scoped features implemented on a working branch, reviewed independently and delivered with tests.",
          "kind": "Engineering"
        },
        {
          "title": "Bug fixes with reproduction first",
          "body": "Defects reproduced, fixed and locked in with a regression test before review.",
          "kind": "Engineering"
        },
        {
          "title": "API and SDK changes",
          "body": "Public surface changed without breaking customers, verified by contract tests and compatibility checks.",
          "kind": "Engineering"
        },
        {
          "title": "Dependency and framework upgrades",
          "body": "Upgrades made in bounded steps, with the test suite run and failures diagnosed inside the run.",
          "kind": "Engineering"
        },
        {
          "title": "Test design and execution",
          "body": "Cases derived from acceptance criteria, executed in your environments, results retained as evidence.",
          "kind": "QA"
        },
        {
          "title": "Multi-tenant safety checks",
          "body": "Changes touching tenant boundaries verified with isolation tests before delivery.",
          "kind": "QA"
        }
      ]
    },
    "cases": {
      "label": "Two live problems",
      "headline": [
        "The two that",
        "never win a roadmap argument."
      ],
      "body": "Both protect customers you already have rather than customers you want. That is exactly why they are deferred until an escalation makes them urgent.",
      "ids": [
        "saas-version-support",
        "saas-tenant-isolation"
      ]
    },
    "controls": {
      "label": "Division of responsibility",
      "headline": [
        "What exekova owns.",
        "What stays with you."
      ],
      "body": "The controls your industry expects do not move. exekova executes inside them.",
      "rail": [
        {
          "key": "Arrives",
          "title": "The work that arrives",
          "items": [
            "Backlog feature",
            "Customer bug",
            "API change",
            "Dependency upgrade",
            "Release regression run",
            "Tech debt task"
          ]
        },
        {
          "key": "Must meet",
          "title": "The standard it must meet",
          "items": [
            "Public API preserved",
            "Tenant isolation verified",
            "Independent review",
            "Regression tests pass",
            "Approval before production",
            "Retry budget"
          ]
        },
        {
          "key": "Comes back",
          "title": "What comes back",
          "items": [
            "Reviewed pull request",
            "Regression evidence",
            "Review record",
            "Tracker updated",
            "Cost and time recorded"
          ]
        }
      ],
      "owns": [
        "Understanding the ticket and repository context",
        "Implementation on a working branch",
        "Independent code review",
        "Regression and contract tests",
        "Failure diagnosis and retry",
        "Delivery with evidence"
      ],
      "keeps": [
        "Acceptance criteria per change",
        "Merge and release approval",
        "Roadmap priority",
        "Access scope per repository",
        "Which work is eligible"
      ]
    },
    "metrics": {
      "label": "How you'd measure it",
      "headline": [
        "What to watch in",
        "the first quarter."
      ],
      "body": "Every figure comes from your own runs. exekova records quality, time, cost and intervention for each accepted outcome, so the first quarter measures the work, not the demo.",
      "items": [
        {
          "label": "Backlog reduction",
          "hint": "Accepted work against incoming demand.",
          "icon": "chart"
        },
        {
          "label": "Review turnaround",
          "hint": "Time changes waited for independent review.",
          "icon": "eye"
        },
        {
          "label": "Test coverage on delivered change",
          "hint": "Which delivered changes carried tests, and which did not.",
          "icon": "shield"
        },
        {
          "label": "Cost per accepted change",
          "hint": "Spend per accepted outcome, including retries and repairs.",
          "icon": "coins"
        },
        {
          "label": "Time to merged",
          "hint": "Elapsed time from intake to merge.",
          "icon": "clock"
        }
      ]
    },
    "cta": {
      "headline": [
        "Start with one",
        "repeating task."
      ],
      "body": "Pick something in SaaS engineering or QA that recurs weekly. It makes the measurement honest."
    }
  },
  {
    "slug": "telecom",
    "name": "Telecommunications",
    "group": "Digital & service businesses",
    "groupIndex": 1,
    "icon": "signal",
    "accent": "leaf",
    "tagline": "Change provisioning, billing and network tooling with the flows tested",
    "headline": [
      "Telecom systems,",
      "changed without outages."
    ],
    "lede": "Provisioning, billing and network operations tooling sit on long integration chains where one change can ripple. exekova runs the engineering and QA work with the affected flows tested and the evidence retained.",
    "summary": "Change provisioning, billing and network tooling with the flows tested.",
    "arrives": [
      "Provisioning defect",
      "Billing fix",
      "Integration change",
      "Care tooling request",
      "Release regression run",
      "Legacy maintenance task"
    ],
    "source": "Jira",
    "sample": {
      "id": "PRV-209",
      "title": "Plan change leaves add-ons active",
      "body": "Downgrading a plan keeps incompatible add-ons provisioned. Remove them in the same order.",
      "criterion": "No incompatible add-ons remain after a plan change."
    },
    "phases": [
      {
        "label": "Understand",
        "status": "Understanding",
        "title": "Context before code.",
        "lines": [
          "Scope: provisioning order flow",
          "Standard: Existing integrations preserved",
          "Standard: Charging outputs match expectations"
        ]
      },
      {
        "label": "Implement",
        "status": "Implementing",
        "title": "A scoped change on a working branch.",
        "lines": [
          "Add-on reconciliation step added to plan change",
          "Existing behaviour preserved",
          "Working branch recorded"
        ]
      },
      {
        "label": "Verify",
        "status": "Verifying",
        "title": "Reviewed independently. Tested in your environment.",
        "lines": [
          "Independent review passed",
          "Provisioning flow verified against the catalogue",
          "Acceptance criteria verified"
        ]
      },
      {
        "label": "Deliver",
        "status": "Accepted",
        "title": "Returned with its evidence.",
        "lines": [
          "Reviewed pull request",
          "Tracker updated",
          "Cost and time recorded"
        ]
      }
    ],
    "workloads": {
      "label": "Engineering and QA workloads",
      "headline": [
        "The work exekova",
        "runs in telecom."
      ],
      "body": "Engineering and QA are where exekova starts. Each item is a run from ticket to reviewed, tested change, with the evidence attached.",
      "items": [
        {
          "title": "Provisioning and order flows",
          "body": "Order, activation and change flows implemented against existing integrations and tested end to end.",
          "kind": "Engineering"
        },
        {
          "title": "Billing and rating fixes",
          "body": "Charging, rating and invoice defects reproduced, corrected and locked in with tests.",
          "kind": "Engineering"
        },
        {
          "title": "OSS and BSS integrations",
          "body": "Adapter and message format changes verified by contract tests before review.",
          "kind": "Engineering"
        },
        {
          "title": "Self-service and care tooling",
          "body": "Customer and agent tooling changes delivered as reviewed changes with the journeys tested.",
          "kind": "Engineering"
        },
        {
          "title": "Regression suites for releases",
          "body": "Cases derived from acceptance criteria, run in your environments, results retained per release.",
          "kind": "QA"
        },
        {
          "title": "Legacy platform maintenance",
          "body": "Bounded changes in older systems made with characterisation tests written first.",
          "kind": "Engineering"
        }
      ]
    },
    "cases": {
      "label": "Two live problems",
      "headline": [
        "The two that",
        "surface weeks after they break."
      ],
      "body": "One shows up on a bill. The other shows up in an incident review. Both are traceable, testable work that spans more systems than the change request suggests.",
      "ids": [
        "telecom-oss-bss-changes",
        "telecom-network-automation"
      ]
    },
    "controls": {
      "label": "Division of responsibility",
      "headline": [
        "What exekova owns.",
        "What stays with you."
      ],
      "body": "The controls your industry expects do not move. exekova executes inside them.",
      "rail": [
        {
          "key": "Arrives",
          "title": "The work that arrives",
          "items": [
            "Provisioning defect",
            "Billing fix",
            "Integration change",
            "Care tooling request",
            "Release regression run",
            "Legacy maintenance task"
          ]
        },
        {
          "key": "Must meet",
          "title": "The standard it must meet",
          "items": [
            "Existing integrations preserved",
            "Charging outputs match expectations",
            "Independent review",
            "Test evidence retained",
            "Approval before production",
            "Scoped system access"
          ]
        },
        {
          "key": "Comes back",
          "title": "What comes back",
          "items": [
            "Reviewed pull request",
            "Flow and regression evidence",
            "Review record",
            "Tracker updated",
            "Cost and time recorded"
          ]
        }
      ],
      "owns": [
        "Understanding the change and the integration chain",
        "Implementation on a working branch",
        "Independent code review",
        "Regression and contract tests",
        "Failure diagnosis and retry",
        "Delivery with evidence"
      ],
      "keeps": [
        "Change approval and maintenance windows",
        "Production deployment",
        "Network and service sign-off",
        "Access scope per system",
        "Which work is eligible"
      ]
    },
    "metrics": {
      "label": "How you'd measure it",
      "headline": [
        "What to watch in",
        "the first quarter."
      ],
      "body": "Every figure comes from your own runs. exekova records quality, time, cost and intervention for each accepted outcome, so the first quarter measures the work, not the demo.",
      "items": [
        {
          "label": "Time from ticket to reviewed change",
          "hint": "Elapsed time from intake to a change ready for your review.",
          "icon": "clock"
        },
        {
          "label": "Flow coverage on delivered change",
          "hint": "Which changes carried end-to-end flow tests.",
          "icon": "shield"
        },
        {
          "label": "Change failure rate",
          "hint": "Delivered changes that needed a follow-up fix.",
          "icon": "bug"
        },
        {
          "label": "Cost per accepted change",
          "hint": "Spend per accepted outcome, including retries and repairs.",
          "icon": "coins"
        },
        {
          "label": "Blocked time waiting for people",
          "hint": "Time work sat waiting for an approval or an answer.",
          "icon": "clock"
        }
      ]
    },
    "cta": {
      "headline": [
        "Start with one",
        "repeating task."
      ],
      "body": "Pick something in telecom engineering or QA that recurs weekly. It makes the measurement honest."
    }
  },
  {
    "slug": "travel",
    "name": "Travel & hospitality",
    "group": "Digital & service businesses",
    "groupIndex": 1,
    "icon": "plane",
    "accent": "violet",
    "tagline": "Change booking, pricing and loyalty systems with the journeys tested",
    "headline": [
      "Booking systems,",
      "changed with confidence."
    ],
    "lede": "Booking, pricing, inventory and loyalty systems connect to dozens of partners and change with every season. exekova runs the engineering and QA work with the guest journeys tested before review.",
    "summary": "Change booking, pricing and loyalty systems with the journeys tested.",
    "arrives": [
      "Booking defect",
      "Fare rule change",
      "Partner integration request",
      "Loyalty fix",
      "Release regression run",
      "Peak readiness task"
    ],
    "source": "Jira",
    "sample": {
      "id": "BKG-88",
      "title": "Package price changes after room selection",
      "body": "Selecting a room requotes the flight leg at a new fare. Hold the quoted package price.",
      "criterion": "The quoted package total holds until booking completes."
    },
    "phases": [
      {
        "label": "Understand",
        "status": "Understanding",
        "title": "Context before code.",
        "lines": [
          "Scope: package pricing service",
          "Standard: Journey outputs match expectations",
          "Standard: Existing partner contracts preserved"
        ]
      },
      {
        "label": "Implement",
        "status": "Implementing",
        "title": "A scoped change on a working branch.",
        "lines": [
          "Fare held for the quote window on room selection",
          "Existing behaviour preserved",
          "Working branch recorded"
        ]
      },
      {
        "label": "Verify",
        "status": "Verifying",
        "title": "Reviewed independently. Tested in your environment.",
        "lines": [
          "Independent review passed",
          "Journey tests cover room changes within the window",
          "Acceptance criteria verified"
        ]
      },
      {
        "label": "Deliver",
        "status": "Accepted",
        "title": "Returned with its evidence.",
        "lines": [
          "Reviewed pull request",
          "Tracker updated",
          "Cost and time recorded"
        ]
      }
    ],
    "workloads": {
      "label": "Engineering and QA workloads",
      "headline": [
        "The work exekova",
        "runs in travel."
      ],
      "body": "Engineering and QA are where exekova starts. Each item is a run from ticket to reviewed, tested change, with the evidence attached.",
      "items": [
        {
          "title": "Booking and availability changes",
          "body": "Search, availability and booking flow changes delivered with the journeys regression tested.",
          "kind": "Engineering"
        },
        {
          "title": "Pricing and fare rules",
          "body": "Rate, fare and package logic implemented with the rule paths tested against expected totals.",
          "kind": "Engineering"
        },
        {
          "title": "Partner and distribution integrations",
          "body": "GDS, channel manager and partner API changes verified by contract tests.",
          "kind": "Engineering"
        },
        {
          "title": "Loyalty and account fixes",
          "body": "Points, tier and account defects reproduced, fixed and locked in with tests.",
          "kind": "Engineering"
        },
        {
          "title": "Regression suites for releases",
          "body": "Cases derived from acceptance criteria, run in your environments, results retained per release.",
          "kind": "QA"
        },
        {
          "title": "Peak readiness work",
          "body": "Bounded performance and resilience changes made with measurements captured as evidence.",
          "kind": "Engineering"
        }
      ]
    },
    "cases": {
      "label": "Two live problems",
      "headline": [
        "The two that",
        "break when travel does."
      ],
      "body": "The happy path is well covered. The paths that matter during disruption are the least tested and the most load-sensitive, and they run at the worst moment.",
      "ids": [
        "travel-distribution-changes",
        "travel-peak-and-disruption"
      ]
    },
    "controls": {
      "label": "Division of responsibility",
      "headline": [
        "What exekova owns.",
        "What stays with you."
      ],
      "body": "The controls your industry expects do not move. exekova executes inside them.",
      "rail": [
        {
          "key": "Arrives",
          "title": "The work that arrives",
          "items": [
            "Booking defect",
            "Fare rule change",
            "Partner integration request",
            "Loyalty fix",
            "Release regression run",
            "Peak readiness task"
          ]
        },
        {
          "key": "Must meet",
          "title": "The standard it must meet",
          "items": [
            "Journey outputs match expectations",
            "Existing partner contracts preserved",
            "Independent review",
            "Test evidence retained",
            "Approval before production",
            "Retry budget"
          ]
        },
        {
          "key": "Comes back",
          "title": "What comes back",
          "items": [
            "Reviewed pull request",
            "Regression evidence",
            "Review record",
            "Tracker updated",
            "Cost and time recorded"
          ]
        }
      ],
      "owns": [
        "Understanding the ticket and journey context",
        "Implementation on a working branch",
        "Independent code review",
        "Regression and contract tests",
        "Failure diagnosis and retry",
        "Delivery with evidence"
      ],
      "keeps": [
        "Acceptance criteria per change",
        "Release timing and deployment",
        "Commercial and pricing sign-off",
        "Access scope per system",
        "Which work is eligible"
      ]
    },
    "metrics": {
      "label": "How you'd measure it",
      "headline": [
        "What to watch in",
        "the first quarter."
      ],
      "body": "Every figure comes from your own runs. exekova records quality, time, cost and intervention for each accepted outcome, so the first quarter measures the work, not the demo.",
      "items": [
        {
          "label": "Time from ticket to reviewed change",
          "hint": "Elapsed time from intake to a change ready for your review.",
          "icon": "clock"
        },
        {
          "label": "Journey coverage on delivered change",
          "hint": "Which changes carried journey tests before delivery.",
          "icon": "shield"
        },
        {
          "label": "Incidents after release",
          "hint": "Production incidents traced back to a delivered change.",
          "icon": "bug"
        },
        {
          "label": "Cost per accepted change",
          "hint": "Spend per accepted outcome, including retries and repairs.",
          "icon": "coins"
        },
        {
          "label": "Human intervention rate",
          "hint": "How often a person had to step in, and why.",
          "icon": "users"
        }
      ]
    },
    "cta": {
      "headline": [
        "Start with one",
        "repeating task."
      ],
      "body": "Pick something in travel engineering or QA that recurs weekly. It makes the measurement honest."
    }
  },
  {
    "slug": "education",
    "name": "Education",
    "group": "Digital & service businesses",
    "groupIndex": 1,
    "icon": "graduation",
    "accent": "violet",
    "tagline": "Ship better learning and campus experiences with every change verified",
    "headline": [
      "Better learning experiences.",
      "Ready for the next term."
    ],
    "lede": "Keep learning platforms, student portals and campus systems moving. exekova implements, reviews and tests the work, with access boundaries and release approval set by your institution.",
    "summary": "Ship better learning and campus experiences with every change verified.",
    "arrives": [
      "Course registration feature",
      "LMS integration update",
      "Accessibility defect",
      "Enrollment regression run",
      "Student portal feature",
      "Campus API change"
    ],
    "source": "Jira",
    "sample": {
      "id": "EDU-142",
      "title": "Add a course waitlist that holds its place",
      "body": "Let students join a full course’s waitlist and view their position. Keep enrollment rules and student records protected.",
      "criterion": "Queue order preserved; role access and enrollment paths tested."
    },
    "phases": [
      {
        "label": "Understand",
        "status": "Understanding",
        "title": "Map the rules before the work.",
        "lines": [
          "Scope: course registration and waitlist",
          "Use approved test data in staging",
          "Keep seat limits and role boundaries intact"
        ]
      },
      {
        "label": "Implement",
        "status": "Implementing",
        "title": "Build the feature inside the agreed scope.",
        "lines": [
          "Waitlist entry and position in the student portal",
          "Queue handling and duplicate requests covered",
          "Working branch linked to EDU-142"
        ]
      },
      {
        "label": "Verify",
        "status": "Verifying",
        "title": "Check the journeys students depend on.",
        "lines": [
          "Independent review and regression tests",
          "Keyboard access and role permissions checked",
          "Waitlist order and seat limits verified"
        ]
      },
      {
        "label": "Deliver",
        "status": "Accepted",
        "title": "A feature ready for your release decision.",
        "lines": [
          "Reviewed change and test evidence attached",
          "Enrollment rules and decisions retained",
          "Release approval stays with your institution"
        ]
      }
    ],
    "workloads": {
      "label": "Engineering and QA workloads",
      "headline": [
        "Keep the campus backlog",
        "moving toward done."
      ],
      "body": "For schools, universities and education technology teams. Start with a scoped software task and a clear acceptance standard.",
      "items": [
        {
          "title": "Course and enrollment features",
          "body": "Build course discovery, registration and waitlist changes with the student journeys tested before review.",
          "kind": "Engineering"
        },
        {
          "title": "Learning platform integrations",
          "body": "Update LMS and student information system interfaces with contract tests, scoped access and retained evidence.",
          "kind": "Engineering"
        },
        {
          "title": "Student and staff portal fixes",
          "body": "Reproduce account, timetable and notification defects, then deliver reviewed fixes with regression tests.",
          "kind": "Engineering"
        },
        {
          "title": "Campus data and API changes",
          "body": "Update mappings and scheduled syncs using approved test data. Verify contracts and role permissions before delivery.",
          "kind": "Engineering"
        },
        {
          "title": "Accessibility and release checks",
          "body": "Test keyboard access, enrollment paths and role permissions against your acceptance criteria.",
          "kind": "QA"
        },
        {
          "title": "Term-start readiness",
          "body": "Run agreed registration, sign-in and course-access checks in staging. Diagnose failures and retain the retest record.",
          "kind": "QA"
        }
      ]
    },
    "cases": {
      "label": "Five live problems",
      "headline": [
        "The five that",
        "the whole institution feels at once."
      ],
      "body": "Admission that has to survive an appeal. Student data that has to stay consistent. Two fixed dates in the calendar. An exam that runs once. And a platform that only breaks once every course is actually in it.",
      "ids": [
        "education-admission-merit-list",
        "education-sis-integrations",
        "education-enrolment-peaks",
        "education-online-exam-integrity",
        "education-lms-interoperability"
      ]
    },
    "controls": {
      "label": "Division of responsibility",
      "headline": [
        "What exekova owns.",
        "What stays with you."
      ],
      "body": "Your institution sets the data boundaries, educational policies and release decisions. exekova carries the software work through those controls.",
      "rail": [
        {
          "key": "Arrives",
          "title": "The work that arrives",
          "items": [
            "Course registration feature",
            "LMS integration update",
            "Accessibility defect",
            "Enrollment regression run",
            "Student portal feature",
            "Campus API change"
          ]
        },
        {
          "key": "Must meet",
          "title": "The standard it must meet",
          "items": [
            "Approved test data",
            "Student and staff role boundaries",
            "Enrollment rules preserved",
            "Accessibility checks",
            "Independent review",
            "Release approval"
          ]
        },
        {
          "key": "Comes back",
          "title": "What comes back",
          "items": [
            "Reviewed change",
            "Regression and accessibility results",
            "Acceptance record",
            "Updated work item",
            "Time and cost recorded"
          ]
        }
      ],
      "owns": [
        "Understanding the request and system context",
        "Implementation on a working branch",
        "Independent review of the change",
        "Agreed regression and accessibility checks",
        "Failure diagnosis, repair and retesting",
        "Delivery with the evidence attached"
      ],
      "keeps": [
        "Student data access",
        "Release approval",
        "Academic and admissions decisions",
        "Accessibility acceptance criteria",
        "Data retention and deployment requirements"
      ]
    },
    "metrics": {
      "label": "How you'd measure it",
      "headline": [
        "Measure what moved",
        "before the next term."
      ],
      "body": "Use your own runs to measure completed work, release readiness and the effort behind each accepted outcome.",
      "items": [
        {
          "label": "Accepted backlog items",
          "hint": "Features and fixes accepted against the criteria you set.",
          "icon": "chart"
        },
        {
          "label": "Request to release-ready",
          "hint": "Elapsed time from intake to a verified change ready for approval.",
          "icon": "clock"
        },
        {
          "label": "Critical journeys checked",
          "hint": "Registration, course access and portal paths covered by retained test results.",
          "icon": "shield"
        },
        {
          "label": "Cost per accepted task",
          "hint": "Execution cost including review, retries and repair.",
          "icon": "coins"
        },
        {
          "label": "Human intervention",
          "hint": "Approval wait, exceptions and assistance needed to finish the work.",
          "icon": "users"
        }
      ]
    },
    "cta": {
      "headline": [
        "One campus task.",
        "A better next term."
      ],
      "body": "Bring a portal feature, an integration fix or a recurring regression run. Define done, then measure what exekova delivers."
    }
  },
  {
    "slug": "logistics",
    "name": "Logistics & supply chain",
    "group": "Industrial operations",
    "groupIndex": 2,
    "icon": "truck",
    "accent": "teal",
    "tagline": "Keep tracking, routing and warehouse systems changing safely",
    "headline": [
      "Supply chain software,",
      "shipped with evidence."
    ],
    "lede": "Tracking, routing, warehouse and carrier integrations change with every new lane and partner. exekova runs the engineering and QA work with the operational flows tested before review.",
    "summary": "Keep tracking, routing and warehouse systems changing safely.",
    "arrives": [
      "Carrier integration request",
      "Tracking defect",
      "Routing rule change",
      "Inventory fix",
      "Release regression run",
      "Reporting task"
    ],
    "source": "Jira",
    "sample": {
      "id": "TRK-144",
      "title": "Delivered status shown before dispatch",
      "body": "Out-of-order carrier events show the wrong status to customers. Order events by carrier timestamp.",
      "criterion": "Displayed status matches the latest carrier event."
    },
    "phases": [
      {
        "label": "Understand",
        "status": "Understanding",
        "title": "Context before code.",
        "lines": [
          "Scope: carrier event processor",
          "Standard: Existing partner contracts preserved",
          "Standard: Scenario outputs match expectations"
        ]
      },
      {
        "label": "Implement",
        "status": "Implementing",
        "title": "A scoped change on a working branch.",
        "lines": [
          "Events ordered by carrier timestamp before status update",
          "Existing behaviour preserved",
          "Working branch recorded"
        ]
      },
      {
        "label": "Verify",
        "status": "Verifying",
        "title": "Reviewed independently. Tested in your environment.",
        "lines": [
          "Independent review passed",
          "Out-of-order event scenarios pass",
          "Acceptance criteria verified"
        ]
      },
      {
        "label": "Deliver",
        "status": "Accepted",
        "title": "Returned with its evidence.",
        "lines": [
          "Reviewed pull request",
          "Tracker updated",
          "Cost and time recorded"
        ]
      }
    ],
    "workloads": {
      "label": "Engineering and QA workloads",
      "headline": [
        "The work exekova",
        "runs in logistics."
      ],
      "body": "Engineering and QA are where exekova starts. Each item is a run from ticket to reviewed, tested change, with the evidence attached.",
      "items": [
        {
          "title": "Carrier and partner integrations",
          "body": "API and EDI integrations changed without breaking existing partners, verified by contract tests.",
          "kind": "Engineering"
        },
        {
          "title": "Tracking and event processing",
          "body": "Event handling, status and notification defects reproduced, fixed and locked in with tests.",
          "kind": "Engineering"
        },
        {
          "title": "Routing and allocation logic",
          "body": "Rule changes implemented with the affected scenarios tested against expected outputs.",
          "kind": "Engineering"
        },
        {
          "title": "Warehouse and inventory fixes",
          "body": "WMS and inventory defects corrected with reconciliation tests that hold the corrected behaviour.",
          "kind": "Engineering"
        },
        {
          "title": "Regression suites for releases",
          "body": "Cases derived from acceptance criteria, run in your environments, results retained per release.",
          "kind": "QA"
        },
        {
          "title": "Reporting and data pipeline work",
          "body": "Operational reporting and data quality changes delivered as reviewed changes with tests.",
          "kind": "Engineering"
        }
      ]
    },
    "cases": {
      "label": "Two live problems",
      "headline": [
        "The two that",
        "stand between contract and volume."
      ],
      "body": "One is the integration nobody costed. The other is the accuracy the lane was sold on. Both are steady mapping and reconciliation work under a running clock.",
      "ids": [
        "logistics-partner-onboarding",
        "logistics-event-accuracy"
      ]
    },
    "controls": {
      "label": "Division of responsibility",
      "headline": [
        "What exekova owns.",
        "What stays with you."
      ],
      "body": "The controls your industry expects do not move. exekova executes inside them.",
      "rail": [
        {
          "key": "Arrives",
          "title": "The work that arrives",
          "items": [
            "Carrier integration request",
            "Tracking defect",
            "Routing rule change",
            "Inventory fix",
            "Release regression run",
            "Reporting task"
          ]
        },
        {
          "key": "Must meet",
          "title": "The standard it must meet",
          "items": [
            "Existing partner contracts preserved",
            "Scenario outputs match expectations",
            "Independent review",
            "Test evidence retained",
            "Approval before production",
            "Retry budget"
          ]
        },
        {
          "key": "Comes back",
          "title": "What comes back",
          "items": [
            "Reviewed pull request",
            "Regression evidence",
            "Review record",
            "Tracker updated",
            "Cost and time recorded"
          ]
        }
      ],
      "owns": [
        "Understanding the change and its operational context",
        "Implementation on a working branch",
        "Independent code review",
        "Regression and contract tests",
        "Failure diagnosis and retry",
        "Delivery with evidence"
      ],
      "keeps": [
        "Acceptance criteria per change",
        "Production deployment approval",
        "Operational sign-off",
        "Access scope per system",
        "Which work is eligible"
      ]
    },
    "metrics": {
      "label": "How you'd measure it",
      "headline": [
        "What to watch in",
        "the first quarter."
      ],
      "body": "Every figure comes from your own runs. exekova records quality, time, cost and intervention for each accepted outcome, so the first quarter measures the work, not the demo.",
      "items": [
        {
          "label": "Time from ticket to reviewed change",
          "hint": "Elapsed time from intake to a change ready for your review.",
          "icon": "clock"
        },
        {
          "label": "Integration coverage on delivered change",
          "hint": "Which integration changes carried contract tests.",
          "icon": "shield"
        },
        {
          "label": "Incidents after release",
          "hint": "Production incidents traced back to a delivered change.",
          "icon": "bug"
        },
        {
          "label": "Cost per accepted change",
          "hint": "Spend per accepted outcome, including retries and repairs.",
          "icon": "coins"
        },
        {
          "label": "Backlog reduction",
          "hint": "Accepted work against incoming demand.",
          "icon": "chart"
        }
      ]
    },
    "cta": {
      "headline": [
        "Start with one",
        "repeating task."
      ],
      "body": "Pick something in logistics engineering or QA that recurs weekly. It makes the measurement honest."
    }
  },
  {
    "slug": "energy",
    "name": "Energy & utilities",
    "group": "Industrial operations",
    "groupIndex": 2,
    "icon": "bolt",
    "accent": "azure",
    "tagline": "Change metering, billing and grid tooling inside your control framework",
    "headline": [
      "Utility systems,",
      "changed under control."
    ],
    "lede": "Metering, billing, outage and asset systems carry regulatory and safety obligations with every change. exekova runs the engineering and QA work inside the boundaries you define, with the evidence retained.",
    "summary": "Change metering, billing and grid tooling inside your control framework.",
    "arrives": [
      "Billing defect",
      "Tariff change",
      "Field tooling request",
      "Integration change",
      "Reporting fix",
      "Release regression run"
    ],
    "source": "Jira",
    "sample": {
      "id": "BIL-512",
      "title": "Estimated read billed after actual read",
      "body": "A late actual meter read is billed after an estimate. Reconcile before invoicing.",
      "criterion": "Invoices use the latest actual read when one exists."
    },
    "phases": [
      {
        "label": "Understand",
        "status": "Understanding",
        "title": "Context before code.",
        "lines": [
          "Scope: read processing pipeline",
          "Standard: Billing outputs match expectations",
          "Standard: Existing interfaces preserved"
        ]
      },
      {
        "label": "Implement",
        "status": "Implementing",
        "title": "A scoped change on a working branch.",
        "lines": [
          "Late actual reads supersede estimates before invoicing",
          "Existing behaviour preserved",
          "Working branch recorded"
        ]
      },
      {
        "label": "Verify",
        "status": "Verifying",
        "title": "Reviewed independently. Tested in your environment.",
        "lines": [
          "Independent review passed",
          "Billing outputs match expected values",
          "Acceptance criteria verified"
        ]
      },
      {
        "label": "Deliver",
        "status": "Accepted",
        "title": "Returned with its evidence.",
        "lines": [
          "Reviewed pull request",
          "Tracker updated",
          "Cost and time recorded"
        ]
      }
    ],
    "workloads": {
      "label": "Engineering and QA workloads",
      "headline": [
        "The work exekova",
        "runs in energy."
      ],
      "body": "Engineering and QA are where exekova starts. Each item is a run from ticket to reviewed, tested change, with the evidence attached.",
      "items": [
        {
          "title": "Metering and billing changes",
          "body": "Read processing, tariff and invoice logic implemented with outputs tested against expected values.",
          "kind": "Engineering"
        },
        {
          "title": "Outage and field tooling",
          "body": "Dispatch, outage and field application changes delivered as reviewed changes with the workflows tested.",
          "kind": "Engineering"
        },
        {
          "title": "Asset and GIS integrations",
          "body": "Interface and data mapping changes verified by contract tests before review.",
          "kind": "Engineering"
        },
        {
          "title": "Regulatory reporting fixes",
          "body": "Report logic and data defects reproduced, corrected and locked in with tests.",
          "kind": "Engineering"
        },
        {
          "title": "Regression suites for releases",
          "body": "Cases derived from acceptance criteria, run in your environments, results retained per release.",
          "kind": "QA"
        },
        {
          "title": "Legacy platform maintenance",
          "body": "Bounded changes in older systems made with characterisation tests written first.",
          "kind": "Engineering"
        }
      ]
    },
    "cases": {
      "label": "Two live problems",
      "headline": [
        "The two that",
        "are timed by somebody else."
      ],
      "body": "One is the market operator's calendar. The other is data arriving from the field in worse shape than the downstream processes assume. Both end up in a bill.",
      "ids": [
        "energy-market-messaging",
        "energy-telemetry-quality"
      ]
    },
    "controls": {
      "label": "Division of responsibility",
      "headline": [
        "What exekova owns.",
        "What stays with you."
      ],
      "body": "The controls your industry expects do not move. exekova executes inside them.",
      "rail": [
        {
          "key": "Arrives",
          "title": "The work that arrives",
          "items": [
            "Billing defect",
            "Tariff change",
            "Field tooling request",
            "Integration change",
            "Reporting fix",
            "Release regression run"
          ]
        },
        {
          "key": "Must meet",
          "title": "The standard it must meet",
          "items": [
            "Billing outputs match expectations",
            "Existing interfaces preserved",
            "Independent review",
            "Test evidence retained",
            "Approval before production",
            "Scoped system access"
          ]
        },
        {
          "key": "Comes back",
          "title": "What comes back",
          "items": [
            "Reviewed pull request",
            "Regression evidence",
            "Review record",
            "Tracker updated",
            "Cost and time recorded"
          ]
        }
      ],
      "owns": [
        "Understanding the change and its obligations",
        "Implementation on a working branch",
        "Independent code review",
        "Regression and contract tests",
        "Failure diagnosis and retry",
        "Delivery with evidence"
      ],
      "keeps": [
        "Change approval and safety review",
        "Production deployment",
        "Regulatory sign-off",
        "Access scope per system",
        "Which work is eligible"
      ]
    },
    "metrics": {
      "label": "How you'd measure it",
      "headline": [
        "What to watch in",
        "the first quarter."
      ],
      "body": "Every figure comes from your own runs. exekova records quality, time, cost and intervention for each accepted outcome, so the first quarter measures the work, not the demo.",
      "items": [
        {
          "label": "Time from ticket to reviewed change",
          "hint": "Elapsed time from intake to a change ready for your review.",
          "icon": "clock"
        },
        {
          "label": "Test evidence coverage per release",
          "hint": "Share of each release backed by retained test results.",
          "icon": "shield"
        },
        {
          "label": "Change failure rate",
          "hint": "Delivered changes that needed a follow-up fix.",
          "icon": "bug"
        },
        {
          "label": "Cost per accepted change",
          "hint": "Spend per accepted outcome, including retries and repairs.",
          "icon": "coins"
        },
        {
          "label": "Blocked time waiting for people",
          "hint": "Time work sat waiting for an approval or an answer.",
          "icon": "clock"
        }
      ]
    },
    "cta": {
      "headline": [
        "Start with one",
        "repeating task."
      ],
      "body": "Pick something in energy engineering or QA that recurs weekly. It makes the measurement honest."
    }
  },
  {
    "slug": "manufacturing",
    "name": "Manufacturing",
    "group": "Industrial operations",
    "groupIndex": 2,
    "icon": "factory",
    "accent": "leaf",
    "tagline": "Change MES, quality and planning software with the shop floor protected",
    "headline": [
      "Manufacturing software,",
      "changed without stopping the line."
    ],
    "lede": "MES, quality, planning and supplier systems change alongside the plants they run. exekova runs the engineering and QA work with the production-critical flows tested before review and the evidence retained.",
    "summary": "Change MES, quality and planning software with the shop floor protected.",
    "arrives": [
      "MES defect",
      "Inspection rule change",
      "ERP integration change",
      "Portal fix",
      "Release regression run",
      "Legacy maintenance task"
    ],
    "source": "Jira",
    "sample": {
      "id": "MES-133",
      "title": "Work order closes with open inspection",
      "body": "Work orders can close while an inspection is pending. Block closure until the inspection resolves.",
      "criterion": "No work order closes with a pending inspection."
    },
    "phases": [
      {
        "label": "Understand",
        "status": "Understanding",
        "title": "Context before code.",
        "lines": [
          "Scope: work order closure rules",
          "Standard: Production flows verified",
          "Standard: Existing interfaces preserved"
        ]
      },
      {
        "label": "Implement",
        "status": "Implementing",
        "title": "A scoped change on a working branch.",
        "lines": [
          "Closure gated on inspection status",
          "Existing behaviour preserved",
          "Working branch recorded"
        ]
      },
      {
        "label": "Verify",
        "status": "Verifying",
        "title": "Reviewed independently. Tested in your environment.",
        "lines": [
          "Independent review passed",
          "Shop floor flow verified across inspection states",
          "Acceptance criteria verified"
        ]
      },
      {
        "label": "Deliver",
        "status": "Accepted",
        "title": "Returned with its evidence.",
        "lines": [
          "Reviewed pull request",
          "Tracker updated",
          "Cost and time recorded"
        ]
      }
    ],
    "workloads": {
      "label": "Engineering and QA workloads",
      "headline": [
        "The work exekova",
        "runs in manufacturing."
      ],
      "body": "Engineering and QA are where exekova starts. Each item is a run from ticket to reviewed, tested change, with the evidence attached.",
      "items": [
        {
          "title": "MES and shop floor tooling",
          "body": "Work order, traceability and operator tooling changes delivered as reviewed changes with the flows tested.",
          "kind": "Engineering"
        },
        {
          "title": "Quality and inspection systems",
          "body": "Inspection rule and non-conformance workflow changes implemented with outputs tested against expected results.",
          "kind": "Engineering"
        },
        {
          "title": "Planning and ERP integrations",
          "body": "Interface and data mapping changes verified by contract tests before review.",
          "kind": "Engineering"
        },
        {
          "title": "Supplier and procurement portals",
          "body": "Portal and integration defects reproduced, fixed and locked in with tests.",
          "kind": "Engineering"
        },
        {
          "title": "Regression suites for releases",
          "body": "Cases derived from acceptance criteria, run in your environments, results retained per release.",
          "kind": "QA"
        },
        {
          "title": "Legacy system maintenance",
          "body": "Bounded changes in older systems made with characterisation tests written first.",
          "kind": "Engineering"
        }
      ]
    },
    "cases": {
      "label": "Two live problems",
      "headline": [
        "The two that",
        "cost production time."
      ],
      "body": "One is scheduled against the commissioning window. The other is only discovered during a recall or an audit, when it is most expensive to close.",
      "ids": [
        "manufacturing-line-integration",
        "manufacturing-traceability"
      ]
    },
    "controls": {
      "label": "Division of responsibility",
      "headline": [
        "What exekova owns.",
        "What stays with you."
      ],
      "body": "The controls your industry expects do not move. exekova executes inside them.",
      "rail": [
        {
          "key": "Arrives",
          "title": "The work that arrives",
          "items": [
            "MES defect",
            "Inspection rule change",
            "ERP integration change",
            "Portal fix",
            "Release regression run",
            "Legacy maintenance task"
          ]
        },
        {
          "key": "Must meet",
          "title": "The standard it must meet",
          "items": [
            "Production flows verified",
            "Existing interfaces preserved",
            "Independent review",
            "Test evidence retained",
            "Approval before production",
            "Scoped system access"
          ]
        },
        {
          "key": "Comes back",
          "title": "What comes back",
          "items": [
            "Reviewed pull request",
            "Regression evidence",
            "Review record",
            "Tracker updated",
            "Cost and time recorded"
          ]
        }
      ],
      "owns": [
        "Understanding the change and the plant context",
        "Implementation on a working branch",
        "Independent code review",
        "Regression and contract tests",
        "Failure diagnosis and retry",
        "Delivery with evidence"
      ],
      "keeps": [
        "Change approval and maintenance windows",
        "Production deployment",
        "Quality and safety sign-off",
        "Access scope per system",
        "Which work is eligible"
      ]
    },
    "metrics": {
      "label": "How you'd measure it",
      "headline": [
        "What to watch in",
        "the first quarter."
      ],
      "body": "Every figure comes from your own runs. exekova records quality, time, cost and intervention for each accepted outcome, so the first quarter measures the work, not the demo.",
      "items": [
        {
          "label": "Time from ticket to reviewed change",
          "hint": "Elapsed time from intake to a change ready for your review.",
          "icon": "clock"
        },
        {
          "label": "Flow coverage on delivered change",
          "hint": "Which changes carried end-to-end flow tests.",
          "icon": "shield"
        },
        {
          "label": "Incidents after release",
          "hint": "Production incidents traced back to a delivered change.",
          "icon": "bug"
        },
        {
          "label": "Cost per accepted change",
          "hint": "Spend per accepted outcome, including retries and repairs.",
          "icon": "coins"
        },
        {
          "label": "Backlog reduction",
          "hint": "Accepted work against incoming demand.",
          "icon": "chart"
        }
      ]
    },
    "cta": {
      "headline": [
        "Start with one",
        "repeating task."
      ],
      "body": "Pick something in manufacturing engineering or QA that recurs weekly. It makes the measurement honest."
    }
  }
];

export const industriesIndex: IndustriesIndex = {
  "eyebrow": "Industries",
  "headline": [
    "Engineering and QA,",
    "inside your industry's controls."
  ],
  "lede": "The platform is the same everywhere. What changes is the systems the work touches, the evidence your industry expects, and who has to sign off before anything reaches production.",
  "explorer": {
    "label": "By industry",
    "headline": [
      "Every industry.",
      "One acceptance path."
    ],
    "body": "Pick an industry to see the engineering and QA work exekova runs there, what stays under your control, and what typically arrives."
  },
  "cross": {
    "label": "Two live problems",
    "headline": [
      "The two that",
      "every sector has in common."
    ],
    "body": "Before the industry-specific work, there are two backlogs that look the same in a bank, a retailer and a university. Both are known, bounded and provable. Both lose to whatever is on the roadmap.",
    "ids": [
      "regression-debt",
      "dependency-remediation"
    ]
  }
};

export const industryGroupsOrdered = [...new Set(industries.map(item => item.group))].map(name => ({ name, industries: industries.filter(item => item.group === name) }));

export function industryBySlug(slug: string) {
  return industries.find(item => item.slug === slug);
}
