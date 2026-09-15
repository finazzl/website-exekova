/**
 * Leader pages (CEO, COO, CFO, CIO, CTO), generated from the exekova.com
 * content layer by scripts/import-site-content.py, with each page's FAQ group.
 * Content only; regenerate rather than hand-edit.
 */
export type ShiftItem = { title: string; body: string };
export type Leader = {
  slug: string; role: string; icon: string; accent: string; eyebrow: string; audience: string; tagline: string; title: string; description: string;
  headline: [string, string]; lede: string;
  owns: { youLabel: string; you: string; wzLabel: string; wz: string };
  console: { label: string; tag: string; title: string; rows: { k: string; v: string; state?: string }[]; bars: { label: string; note?: string; value?: number; tone?: string }[]; foot: string; formula: { numerator: string; denominator: string; result: string } | null };
  shift: { label: string; headline: [string, string]; body: string; before: { label: string; title: string; items: ShiftItem[] }; after: { label: string; title: string; items: ShiftItem[] } };
  measures: { label: string; headline: [string, string]; body: string; primary: { label: string; icon: string; counts: string; why: string }[]; secondaryLabel: string; secondary: { label: string; hint: string }[]; note: string };
  faqGroup: string; faq: { q: string; a: string }[];
  cta: { headline: [string, string]; body: string };
};

export const leaders: Leader[] = [
  {
    "slug": "for-ceos",
    "role": "CEO",
    "icon": "chart",
    "accent": "violet",
    "eyebrow": "For the CEO",
    "audience": "For CEOs",
    "tagline": "Turn ambition into execution capacity",
    "title": "exekova for the CEO",
    "description": "Turn ambition into execution capacity. Strategy is not usually the constraint. The constraint is how much of the strategy the organisation can actually complet",
    "headline": [
      "Turn ambition into",
      "execution capacity."
    ],
    "lede": "Strategy is not usually the constraint. The constraint is how much of the strategy the organisation can actually complete in a quarter - and every plan that outruns execution capacity turns into a backlog with a deadline attached.",
    "owns": {
      "youLabel": "You keep",
      "you": "Priority, standards and the approvals that matter.",
      "wzLabel": "exekova takes",
      "wz": "The path from a committed plan to a delivered, accepted result."
    },
    "console": {
      "label": "Execution capacity",
      "tag": "Illustrative",
      "title": "Commitments against delivered capacity",
      "rows": [],
      "bars": [
        {
          "label": "Committed this quarter",
          "note": "142 items",
          "value": 100,
          "tone": "base"
        },
        {
          "label": "Delivered to your standard",
          "note": "104 items",
          "value": 73,
          "tone": "pass"
        },
        {
          "label": "Still queued behind capacity",
          "note": "38 items",
          "value": 27,
          "tone": "hold"
        }
      ],
      "foot": "Shape only. Your figures come from your own runs.",
      "formula": null
    },
    "shift": {
      "label": "THE CONSTRAINT",
      "headline": [
        "Strategy rarely fails",
        "on the plan."
      ],
      "body": "It fails on how much of the plan the organisation can actually finish in a quarter.",
      "before": {
        "label": "Without an execution layer",
        "title": "Two speeds, one deadline.",
        "items": [
          {
            "title": "Decisions outrun delivery",
            "body": "Commitments are made at the speed of decision-making and delivered at the speed of execution. The difference between those two speeds is where strategy quietly erodes."
          },
          {
            "title": "More people, more coordination",
            "body": "Adding people adds coordination, and coordination consumes part of the capacity those people brought."
          },
          {
            "title": "Backlog is the first symptom",
            "body": "A growing backlog is not an engineering problem. It is the first visible symptom of an execution constraint that will show up next in delivery dates and then in revenue timing."
          }
        ]
      },
      "after": {
        "label": "With exekova",
        "title": "Capacity without another layer to manage.",
        "items": [
          {
            "title": "Capacity without a new layer",
            "body": "exekova adds execution capacity without adding another layer to manage."
          },
          {
            "title": "Evidence the work got done",
            "body": "Outcome reporting means progress can be confirmed rather than reported. Acceptance rate and time to outcome are the same numbers for every function."
          },
          {
            "title": "Direction stays with people",
            "body": "exekova executes; it does not decide what matters. Priority, standards and approvals remain where they belong."
          }
        ]
      }
    },
    "measures": {
      "label": "WHAT A BOARD WILL ACCEPT",
      "headline": [
        "Three numbers that show",
        "capacity, not activity."
      ],
      "body": "Every function reports the same three, so capacity is comparable across the business rather than argued function by function.",
      "primary": [
        {
          "label": "Accepted outcomes",
          "icon": "check",
          "counts": "Work that cleared your standard and landed in your systems.",
          "why": "Capacity delivered, not tickets touched."
        },
        {
          "label": "Time to accepted outcome",
          "icon": "clock",
          "counts": "From the request arriving to the accepted result.",
          "why": "The gap between committing and delivering."
        },
        {
          "label": "Acceptance rate",
          "icon": "shield",
          "counts": "Share that passed your standard on first submission.",
          "why": "How much of the throughput is real."
        }
      ],
      "secondaryLabel": "Also reported on every run",
      "secondary": [
        {
          "label": "Cost per accepted task",
          "hint": "Execution cost over work that met the standard"
        },
        {
          "label": "Retry rate",
          "hint": "Share of runs entering recovery"
        },
        {
          "label": "Intervention rate",
          "hint": "How often a person had to step in"
        },
        {
          "label": "Blocked time",
          "hint": "Waiting on access, approval or a dependency"
        },
        {
          "label": "Evidence coverage",
          "hint": "Completed work with an auditable trail"
        }
      ],
      "note": "Every figure is computed from your own runs, the same way each time. exekova publishes the method, not a benchmark."
    },
    "faqGroup": "Commercial",
    "faq": [
      {
        "q": "How is exekova priced?",
        "a": "A platform fee plus execution. Billed annually, plans start at $1,000 a month including 25 execution hours, $4,000 for 125, and enterprise from $12,000 for 400 hours or more at $30 an hour. Monthly billing is available at a 20% premium. Execution is billed by the hour against work that met your acceptance criteria, so time spent on runs that failed your standard is not billed at all."
      },
      {
        "q": "Is pricing based on users or execution?",
        "a": "Execution. Viewer seats are unlimited on every plan. Pricing per user or per AI worker would charge you for headcount, real or artificial, rather than for work that met your standard. Execution is billed by the hour on accepted work only, so time spent on work that failed your definition of done is not billed. The platform fee and the execution meter are separate lines."
      },
      {
        "q": "Is there enterprise pricing?",
        "a": "Yes, from $12,000 a month against committed annual capacity, with volume rates from $30 per execution hour. Enterprise adds your-cloud deployment, SSO and SCIM, custom approval policy and audit retention, and named support. As on every plan, execution is billed on accepted work only, so the committed capacity buys outcomes that met your standard rather than time spent attempting them."
      },
      {
        "q": "Is private-cloud deployment available?",
        "a": "Yes, under an enterprise agreement, as an annual platform licence at a 25% uplift plus a scoped implementation engagement and committed capacity. The implementation engagement exists because the supported configuration depends on your environment: which execution engines and integrations are reachable, how credentials are held within your tenancy, and what network access the work requires. Those are settled before deployment rather than during it."
      },
      {
        "q": "Is on-prem licensing available?",
        "a": "On-premises is on the enterprise roadmap and is scoped directly. It is not available as a self-serve purchase. The roadmap label is used consistently wherever on-premises appears, including on the security and FAQ pages, rather than being presented as available in a commercial context and roadmap elsewhere. Feasibility depends on which execution engines and integrations your deployment requires, since several depend on external services."
      },
      {
        "q": "How is an execution hour counted?",
        "a": "The clock starts when execution begins on a work item that already has acceptance criteria attached, and stops at the acceptance decision. Time is recorded to the minute and posted to the item’s run record while the work is still in flight, so nothing is estimated afterwards. Work that took two and a half hours bills two and a half hours, with no rounding to a whole unit or a minimum block."
      },
      {
        "q": "What execution time is not billed?",
        "a": "Understanding the item and assembling the capability to do it sit inside the platform fee. If a quality gate rejects the work, the repair and retest time that follows is not added to your total. If the item never meets your standard, its time is removed from your invoice in full. Parallel execution shortens the calendar rather than the invoice: time is summed across the steps that produced the result, never charged as elapsed wall-clock time."
      },
      {
        "q": "What stops a single piece of work consuming all my capacity?",
        "a": "Every work item carries a run budget agreed before execution starts. If the work would exceed it, execution stops and the item comes back to you with what it has, rather than continuing to spend. A material change of scope starts a new work item with its own criteria and its own clock."
      }
    ],
    "cta": {
      "headline": [
        "Start with one",
        "measurable slice."
      ],
      "body": "Pick a repeating category of work in your remit and measure it against how it runs today."
    }
  },
  {
    "slug": "for-coos",
    "role": "COO",
    "icon": "grid",
    "accent": "azure",
    "eyebrow": "For the COO",
    "audience": "For COOs",
    "tagline": "Remove coordination from the critical path",
    "title": "exekova for the COO",
    "description": "Remove coordination from the critical path. Most delay is not work, it is waiting: for a handoff, for a decision, for someone to notice a task.",
    "headline": [
      "Remove coordination from the",
      "critical path."
    ],
    "lede": "Most delay in an operating model is not work. It is waiting: for a handoff, for a decision, for someone to notice a task is ready, for a person to rerun something that failed overnight.",
    "owns": {
      "youLabel": "You keep",
      "you": "The operating model, the priorities and the escalation policy.",
      "wzLabel": "exekova takes",
      "wz": "The queueing, routing and follow-through between every handoff."
    },
    "console": {
      "label": "Live floor",
      "tag": "Illustrative",
      "title": "What is moving right now",
      "rows": [
        {
          "k": "Executing",
          "v": "18 runs",
          "state": "live"
        },
        {
          "k": "In review",
          "v": "6 runs",
          "state": "live"
        },
        {
          "k": "Waiting on approval",
          "v": "3 runs",
          "state": "wait"
        },
        {
          "k": "Blocked on access",
          "v": "2 runs",
          "state": "hold"
        },
        {
          "k": "Verified today",
          "v": "41 outcomes",
          "state": "ok"
        }
      ],
      "bars": [],
      "foot": "Every blocked item carries its reason, so the intervention is obvious.",
      "formula": null
    },
    "shift": {
      "label": "THE CONSTRAINT",
      "headline": [
        "Most delay is not work.",
        "It is waiting."
      ],
      "body": "Cycle time in an operating model is dominated by queueing, not by effort.",
      "before": {
        "label": "Without an execution layer",
        "title": "Work waits for people to be available.",
        "items": [
          {
            "title": "Queueing, not effort",
            "body": "Cycle time is dominated by waiting: for a handoff, for a decision, for someone to pick the item up again."
          },
          {
            "title": "Every handoff is a new queue",
            "body": "A handoff is a message that sits until someone reads it, and each one adds a fresh wait to the same piece of work."
          },
          {
            "title": "Blocked work goes quiet",
            "body": "Items stall without saying why, so finding the blocker becomes an investigation before it becomes a fix."
          }
        ]
      },
      "after": {
        "label": "With exekova",
        "title": "Coordination comes off the critical path.",
        "items": [
          {
            "title": "Handoffs become routing",
            "body": "A handoff between capabilities is a routing decision inside a run rather than a message that sits in a queue until someone reads it."
          },
          {
            "title": "Blocked work is named",
            "body": "Blocked items carry the reason - missing access, pending approval, unmet dependency - so the intervention is obvious rather than investigative."
          },
          {
            "title": "One view across functions",
            "body": "The Live Floor shows what is planning, executing, in review, verified and blocked, across the functions you have connected."
          }
        ]
      }
    },
    "measures": {
      "label": "WHAT MOVES THE FLOOR",
      "headline": [
        "Three numbers that find",
        "the waiting."
      ],
      "body": "Throughput hides queueing. These three surface it, so the next intervention is obvious.",
      "primary": [
        {
          "label": "Blocked time",
          "icon": "lock",
          "counts": "Time spent waiting on access, approval or a dependency.",
          "why": "The biggest single lever on cycle time."
        },
        {
          "label": "Time to accepted outcome",
          "icon": "clock",
          "counts": "From the request arriving to the accepted result.",
          "why": "End to end, including every wait."
        },
        {
          "label": "Intervention rate",
          "icon": "reset",
          "counts": "How often a person had to step back into a run.",
          "why": "Where the operating model still needs you."
        }
      ],
      "secondaryLabel": "Also reported on every run",
      "secondary": [
        {
          "label": "Tasks completed",
          "hint": "Volume cleared through the full acceptance path"
        },
        {
          "label": "Acceptance rate",
          "hint": "Passed your standard on first submission"
        },
        {
          "label": "Cost per accepted task",
          "hint": "Execution cost over work that met the standard"
        },
        {
          "label": "Retry rate",
          "hint": "Share of runs entering recovery"
        },
        {
          "label": "Evidence coverage",
          "hint": "Completed work with an auditable trail"
        }
      ],
      "note": "Every figure is computed from your own runs, the same way each time. exekova publishes the method, not a benchmark."
    },
    "faqGroup": "Execution",
    "faq": [
      {
        "q": "What happens after I give exekova a task?",
        "a": "exekova interprets the request, gathers context from connected systems, produces a plan, selects the capabilities required, forms the execution team, runs the work, routes it through your validation steps, handles eligible failures, delivers the result into your systems and reports on performance."
      },
      {
        "q": "How does exekova plan work?",
        "a": "It decomposes the objective into discrete units, identifies dependencies between them, sequences the units accordingly, and attaches acceptance criteria drawn from your definition of done. The plan is visible before and during execution. It is held as a Work Graph rather than a script, which is what lets it be inspected while running, resumed after a failure, and re-planned when a dependency turns out to differ from what was expected."
      },
      {
        "q": "Can exekova run work in parallel?",
        "a": "Yes, where the plan shows the units are independent. Dependent work is held until its predecessor reaches the required state. Parallelism is decided from the dependency edges in the Work Graph rather than configured by you, so what can run concurrently is recalculated as the run progresses. Work that is waiting is visibly waiting, with the predecessor it depends on recorded against it."
      },
      {
        "q": "How does exekova handle dependencies?",
        "a": "Dependencies are identified during planning and enforced during execution. Work that cannot proceed is marked blocked, with the reason recorded, rather than being retried indefinitely. Blocking is a state in Execution State, not a failure: the run holds, the reason is visible on the Live Floor, and the work resumes when the predecessor reaches the state it was waiting for, or escalates if it cannot."
      },
      {
        "q": "How does exekova update external systems?",
        "a": "Through the integration configured for that system, using credentials held by the platform and scoped to the permissions you granted. Write actions can be placed behind an approval gate. The execution engine never receives the underlying credential; it is granted the ability to perform an authorised action through the platform. Every write is recorded in the run's evidence, so what changed in your systems is reconstructable afterwards."
      },
      {
        "q": "What is Execution State?",
        "a": "Execution State is the persistent record of where a piece of work has reached: what has been planned, assigned, executed, reviewed, retried, recovered, verified and delivered. Because it is held by the platform rather than inside any single agent or model session, work can be paused, inspected, resumed and handed between capabilities without losing its context."
      },
      {
        "q": "Can exekova coordinate multiple AI agents?",
        "a": "Yes. A single piece of work routinely involves more than one capability, and exekova assigns them, sequences them, passes context between them and reconciles their output against the acceptance criteria. You do not configure or supervise the individual agents. exekova is accountable for the outcome rather than for any one agent's output."
      },
      {
        "q": "Can exekova use different AI models?",
        "a": "Yes. Engine and model selection is exekova's decision inside the boundaries you set, and you can constrain which engines are permitted for a given piece of work. Because the plan, the context and the evidence live in Execution State rather than inside a model session, engines can change without the work losing its history."
      }
    ],
    "cta": {
      "headline": [
        "Start with one",
        "measurable slice."
      ],
      "body": "Pick a repeating category of work in your remit and measure it against how it runs today."
    }
  },
  {
    "slug": "for-cfos",
    "role": "CFO",
    "icon": "coins",
    "accent": "leaf",
    "eyebrow": "For the CFO",
    "audience": "For CFOs",
    "tagline": "Measure the economics of execution",
    "title": "exekova for the CFO",
    "description": "Measure the economics of execution. Execution has always had a cost. It has rarely had a unit price. When cost per accepted outcome becomes visible, capacit",
    "headline": [
      "Measure the economics",
      "of execution."
    ],
    "lede": "Execution has always had a cost. It has rarely had a unit price. When cost per accepted outcome becomes visible, capacity becomes a budget decision instead of a headcount negotiation.",
    "owns": {
      "youLabel": "You keep",
      "you": "Budgets, spend caps and the commercial shape of the agreement.",
      "wzLabel": "exekova takes",
      "wz": "Enforcing those caps during execution, not reporting on them afterwards."
    },
    "console": {
      "label": "Outcome economics",
      "tag": "Illustrative",
      "title": "How the unit price is built",
      "rows": [
        {
          "k": "Rework",
          "v": "inside the numerator",
          "state": "ok"
        },
        {
          "k": "Human intervention time",
          "v": "inside the numerator",
          "state": "ok"
        },
        {
          "k": "Work that failed the standard",
          "v": "out of the denominator",
          "state": "hold"
        },
        {
          "k": "Spend cap",
          "v": "enforced during the run",
          "state": "wait"
        }
      ],
      "bars": [],
      "foot": "Your figures come from your runs. We publish the method, not a benchmark.",
      "formula": {
        "numerator": "Execution + review cycles + retries + human time",
        "denominator": "Outcomes that passed your standard",
        "result": "Cost per accepted outcome"
      }
    },
    "shift": {
      "label": "THE CONSTRAINT",
      "headline": [
        "Execution always had a cost.",
        "It rarely had a unit price."
      ],
      "body": "Without a unit price, rework is absorbed rather than seen, and the business case rests on a completion number.",
      "before": {
        "label": "Without an execution layer",
        "title": "The real cost sits outside the invoice.",
        "items": [
          {
            "title": "Rework is absorbed, not priced",
            "body": "A completion number counts the work that finished, not the attempts it took, so rework quietly leaves the business case."
          },
          {
            "title": "Human time is left out",
            "body": "The hours pulled back into checking and correcting are the cost most autonomy claims never put on the page."
          },
          {
            "title": "Overspend arrives as an invoice",
            "body": "Without an enforced ceiling, a runaway loop is discovered in arrears rather than stopped in flight."
          }
        ]
      },
      "after": {
        "label": "With exekova",
        "title": "One honest figure you can plan against.",
        "items": [
          {
            "title": "Cost per accepted task",
            "body": "The honest figure. Cost over work that passed the standard, so rework is priced in rather than hidden inside a completion number."
          },
          {
            "title": "Retry overhead",
            "body": "The share of spend consumed by recovery, tracked against diagnosis so recurring causes can be addressed rather than absorbed."
          },
          {
            "title": "Budget enforcement, not reporting",
            "body": "Spend caps are enforced during execution. A runaway loop stops rather than arriving as a surprise on an invoice."
          }
        ]
      }
    },
    "measures": {
      "label": "WHAT PRICES THE WORK",
      "headline": [
        "Three numbers that survive",
        "a business case review."
      ],
      "body": "Each one is computed from your own runs, the same way every time.",
      "primary": [
        {
          "label": "Cost per accepted task",
          "icon": "coins",
          "counts": "Execution, review, retries and human input over work that met the standard.",
          "why": "The only figure with rework priced in."
        },
        {
          "label": "Retry rate",
          "icon": "reset",
          "counts": "Share of runs that entered recovery.",
          "why": "Where spend is going without output."
        },
        {
          "label": "Intervention rate",
          "icon": "users",
          "counts": "How often human time was drawn back into a run.",
          "why": "The cost most claims leave out."
        }
      ],
      "secondaryLabel": "Also reported on every run",
      "secondary": [
        {
          "label": "Tasks completed",
          "hint": "Volume cleared through the full acceptance path"
        },
        {
          "label": "Acceptance rate",
          "hint": "Passed your standard on first submission"
        },
        {
          "label": "Time to outcome",
          "hint": "Intent received to accepted delivery"
        },
        {
          "label": "Blocked time",
          "hint": "Waiting on access, approval or a dependency"
        },
        {
          "label": "Evidence coverage",
          "hint": "Completed work with an auditable trail"
        }
      ],
      "note": "Every figure is computed from your own runs, the same way each time. exekova publishes the method, not a benchmark."
    },
    "faqGroup": "Commercial",
    "faq": [
      {
        "q": "How is exekova priced?",
        "a": "A platform fee plus execution. Billed annually, plans start at $1,000 a month including 25 execution hours, $4,000 for 125, and enterprise from $12,000 for 400 hours or more at $30 an hour. Monthly billing is available at a 20% premium. Execution is billed by the hour against work that met your acceptance criteria, so time spent on runs that failed your standard is not billed at all."
      },
      {
        "q": "Is pricing based on users or execution?",
        "a": "Execution. Viewer seats are unlimited on every plan. Pricing per user or per AI worker would charge you for headcount, real or artificial, rather than for work that met your standard. Execution is billed by the hour on accepted work only, so time spent on work that failed your definition of done is not billed. The platform fee and the execution meter are separate lines."
      },
      {
        "q": "Is there enterprise pricing?",
        "a": "Yes, from $12,000 a month against committed annual capacity, with volume rates from $30 per execution hour. Enterprise adds your-cloud deployment, SSO and SCIM, custom approval policy and audit retention, and named support. As on every plan, execution is billed on accepted work only, so the committed capacity buys outcomes that met your standard rather than time spent attempting them."
      },
      {
        "q": "Is private-cloud deployment available?",
        "a": "Yes, under an enterprise agreement, as an annual platform licence at a 25% uplift plus a scoped implementation engagement and committed capacity. The implementation engagement exists because the supported configuration depends on your environment: which execution engines and integrations are reachable, how credentials are held within your tenancy, and what network access the work requires. Those are settled before deployment rather than during it."
      },
      {
        "q": "Is on-prem licensing available?",
        "a": "On-premises is on the enterprise roadmap and is scoped directly. It is not available as a self-serve purchase. The roadmap label is used consistently wherever on-premises appears, including on the security and FAQ pages, rather than being presented as available in a commercial context and roadmap elsewhere. Feasibility depends on which execution engines and integrations your deployment requires, since several depend on external services."
      },
      {
        "q": "How is an execution hour counted?",
        "a": "The clock starts when execution begins on a work item that already has acceptance criteria attached, and stops at the acceptance decision. Time is recorded to the minute and posted to the item’s run record while the work is still in flight, so nothing is estimated afterwards. Work that took two and a half hours bills two and a half hours, with no rounding to a whole unit or a minimum block."
      },
      {
        "q": "What execution time is not billed?",
        "a": "Understanding the item and assembling the capability to do it sit inside the platform fee. If a quality gate rejects the work, the repair and retest time that follows is not added to your total. If the item never meets your standard, its time is removed from your invoice in full. Parallel execution shortens the calendar rather than the invoice: time is summed across the steps that produced the result, never charged as elapsed wall-clock time."
      },
      {
        "q": "What stops a single piece of work consuming all my capacity?",
        "a": "Every work item carries a run budget agreed before execution starts. If the work would exceed it, execution stops and the item comes back to you with what it has, rather than continuing to spend. A material change of scope starts a new work item with its own criteria and its own clock."
      }
    ],
    "cta": {
      "headline": [
        "Start with one",
        "measurable slice."
      ],
      "body": "Pick a repeating category of work in your remit and measure it against how it runs today."
    }
  },
  {
    "slug": "for-cios",
    "role": "CIO",
    "icon": "lock",
    "accent": "teal",
    "eyebrow": "For the CIO",
    "audience": "For CIOs",
    "tagline": "One controlled execution layer",
    "title": "exekova for the CIO",
    "description": "One governed execution layer across your systems. The alternative is a dozen teams wiring AI tools into production on their own terms.",
    "headline": [
      "One controlled execution layer across",
      "your systems."
    ],
    "lede": "The alternative to a governed execution layer is not nothing. It is a dozen teams wiring AI tools into production systems independently, each with its own credential handling and its own idea of what approval means.",
    "owns": {
      "youLabel": "You keep",
      "you": "Credentials, permission policy and where the platform runs.",
      "wzLabel": "exekova takes",
      "wz": "Applying that policy identically on every run, with the record an audit asks for."
    },
    "console": {
      "label": "Control surface",
      "tag": "Illustrative",
      "title": "What the platform holds, per run",
      "rows": [
        {
          "k": "Credentials",
          "v": "platform held",
          "state": "hold"
        },
        {
          "k": "Repository grant",
          "v": "scoped to run",
          "state": "hold"
        },
        {
          "k": "Production write",
          "v": "human approval",
          "state": "wait"
        },
        {
          "k": "Retry ceiling",
          "v": "enforced",
          "state": "ok"
        },
        {
          "k": "Run record",
          "v": "retained",
          "state": "ok"
        }
      ],
      "bars": [],
      "foot": "Execution engines receive authorised actions, never keys.",
      "formula": null
    },
    "shift": {
      "label": "THE CONSTRAINT",
      "headline": [
        "The alternative to a governed",
        "layer is not nothing."
      ],
      "body": "It is a dozen teams wiring AI tools into production systems on their own terms.",
      "before": {
        "label": "Without an execution layer",
        "title": "Governance drifts team by team.",
        "items": [
          {
            "title": "Keys spread out",
            "body": "Every team that wires a tool into a production system needs credentials, and each copy is another place a secret can leak."
          },
          {
            "title": "Permissions improvised",
            "body": "Authorisation is decided per team and per tool, so least privilege becomes a convention rather than a control."
          },
          {
            "title": "The record is assembled after the fact",
            "body": "When an audit asks what ran, with what permission and on whose approval, the answer has to be reconstructed."
          }
        ]
      },
      "after": {
        "label": "With exekova",
        "title": "One controlled layer across your systems.",
        "items": [
          {
            "title": "One place credentials live",
            "body": "Secrets are held by the platform and scoped per integration. Execution engines receive authorised actions, not keys."
          },
          {
            "title": "Approval policy as configuration",
            "body": "Which actions need human sign-off is a governed setting, not a convention that varies by team."
          },
          {
            "title": "Auditability by default",
            "body": "Every run retains plan, actions, evidence, retries and approvals - the record an audit actually asks for."
          }
        ]
      }
    },
    "measures": {
      "label": "WHAT AN AUDIT ASKS FOR",
      "headline": [
        "Three numbers that answer",
        "the control question."
      ],
      "body": "The same three hold whether exekova runs in our cloud, your cloud or your infrastructure.",
      "primary": [
        {
          "label": "Evidence coverage",
          "icon": "file",
          "counts": "Completed work carrying a full, auditable trail.",
          "why": "The record an audit actually asks for."
        },
        {
          "label": "Intervention rate",
          "icon": "users",
          "counts": "How often policy pulled a person into a run.",
          "why": "Proof the approval gates are live."
        },
        {
          "label": "Blocked time",
          "icon": "lock",
          "counts": "Time held at a permission or approval boundary.",
          "why": "Where control is costing throughput."
        }
      ],
      "secondaryLabel": "Also reported on every run",
      "secondary": [
        {
          "label": "Tasks completed",
          "hint": "Volume cleared through the full acceptance path"
        },
        {
          "label": "Acceptance rate",
          "hint": "Passed your standard on first submission"
        },
        {
          "label": "Time to outcome",
          "hint": "Intent received to accepted delivery"
        },
        {
          "label": "Cost per accepted task",
          "hint": "Execution cost over work that met the standard"
        },
        {
          "label": "Retry rate",
          "hint": "Share of runs entering recovery"
        }
      ],
      "note": "Every figure is computed from your own runs, the same way each time. exekova publishes the method, not a benchmark."
    },
    "faqGroup": "Security",
    "faq": [
      {
        "q": "How are credentials stored?",
        "a": "Credentials are held by the platform in isolated secret storage and scoped per integration. Access is granted per tool, following least privilege. Execution engines never receive the credential itself; they invoke tools through the platform and are granted the ability to perform an authorised action. Each use is attributable to the run that made it, so what was done with a given integration is reconstructable from the execution record."
      },
      {
        "q": "Does exekova expose API keys to AI models?",
        "a": "No. Execution engines invoke tools through the platform. They receive the ability to perform an authorised action, not the underlying credential. This holds regardless of which engine is selected for a piece of work, so changing engines does not change the exposure. Combined with per-tool authorisation, it means a capability can reach only the systems its work requires, and only through actions you permitted."
      },
      {
        "q": "Can access be limited by tool?",
        "a": "Yes. Authorisation is granted tool by tool, so a capability can only reach the systems its work requires. Permissions are attached to the work rather than held globally by an engine, which means the same engine running two different pieces of work does not carry the first one's access into the second. Write actions on any tool can additionally be placed behind an approval gate."
      },
      {
        "q": "Can human approval be required?",
        "a": "Yes, on defined actions, environments, risk thresholds or spend limits. Approval is a Quality Gate like any other: the work holds at it, the run does not report completion while it waits, and the approver sees the evidence collected up to that point. Final acceptance of a completed outcome can also be reserved for a named person, independently of any gate earlier in the run."
      },
      {
        "q": "What deployment options are available?",
        "a": "exekova can be deployed into your own AWS, Azure or GCP environment. On-premises deployment is on the enterprise roadmap. Scope and supported configurations are confirmed during enterprise discussion. Which execution engines and integrations you require affects what is possible in a restricted network, since some rely on external services, so the deployment shape is scoped against your actual connectivity rather than offered as a fixed menu."
      },
      {
        "q": "Is exekova SOC 2 audited, ISO 27001 certified, PCI DSS compliant or HIPAA ready?",
        "a": "exekova is certified against SOC 2 Type II, ISO 27001 and PCI DSS, and executes a HIPAA Business Associate Agreement under enterprise agreement. The named frameworks are carried on the Growth and Enterprise plans. Report scope, certificate detail and agreement terms are shared during the security review rather than published."
      },
      {
        "q": "Can I control what data exekova accesses?",
        "a": "You choose the connected systems, context supplied, and tool permissions. Approval gates can be applied to sensitive actions, and each run retains an execution record. Access is scoped per integration and granted per tool, so a capability reaches only what its work requires. Because the record is retained as Outcome History, what was read and what was written during a given run remain reviewable after the run has finished."
      },
      {
        "q": "Does exekova use customer data to train AI models?",
        "a": "exekova's model-improvement preferences and organization-wide data-sharing settings are not yet confirmed. Discuss any use of business context, outputs, or logs for evaluation, training, or improvement for the selected engines and deployment before agreeing the data-handling scope. This is deliberately left open rather than answered optimistically: the answer depends on which execution engines are permitted for your work and where the deployment runs, and it belongs in your agreement."
      }
    ],
    "cta": {
      "headline": [
        "Start with one",
        "measurable slice."
      ],
      "body": "Pick a repeating category of work in your remit and measure it against how it runs today."
    }
  },
  {
    "slug": "for-ctos",
    "role": "CTO",
    "icon": "code",
    "accent": "violet",
    "eyebrow": "For the CTO",
    "audience": "For CTOs",
    "tagline": "From backlog to verified delivery",
    "title": "exekova for the CTO",
    "description": "From backlog to verified delivery. Code generation stopped being the bottleneck some time ago. Review capacity, test coverage, debugging time and maintenan",
    "headline": [
      "From backlog to",
      "verified delivery."
    ],
    "lede": "Code generation stopped being the bottleneck some time ago. Review capacity, test coverage, debugging time and maintenance are where engineering throughput is actually lost.",
    "owns": {
      "youLabel": "You keep",
      "you": "The repository, the review standard and the definition of done.",
      "wzLabel": "exekova takes",
      "wz": "Implementation, independent review, testing and recovery inside that standard."
    },
    "console": {
      "label": "Delivery pipeline",
      "tag": "Illustrative",
      "title": "One item, tracker to merged change",
      "rows": [],
      "bars": [
        {
          "label": "Implement",
          "note": "Claude Code",
          "value": 100,
          "tone": "pass"
        },
        {
          "label": "Independent review",
          "note": "Codex, separate engine",
          "value": 100,
          "tone": "pass"
        },
        {
          "label": "Regression tests",
          "note": "1 retry, inside budget",
          "value": 100,
          "tone": "hold"
        },
        {
          "label": "Acceptance gate",
          "note": "criteria passed",
          "value": 100,
          "tone": "pass"
        }
      ],
      "foot": "Generated output does not advance on its own assessment.",
      "formula": null
    },
    "shift": {
      "label": "THE CONSTRAINT",
      "headline": [
        "Generation stopped being",
        "the bottleneck."
      ],
      "body": "Review capacity, test coverage and debugging time are what actually gate a release.",
      "before": {
        "label": "Without an execution layer",
        "title": "The work after the diff is still yours.",
        "items": [
          {
            "title": "Review is the queue",
            "body": "Generated changes arrive faster than people can read them, so the bottleneck moves from writing code to approving it."
          },
          {
            "title": "Output self-certifies",
            "body": "A model that reports its own work as complete gives you a claim, not a check."
          },
          {
            "title": "Failures come back as tickets",
            "body": "A broken run returns to a person as a fresh item rather than being diagnosed and retried where it failed."
          }
        ]
      },
      "after": {
        "label": "With exekova",
        "title": "Backlog to a reviewable, tested change.",
        "items": [
          {
            "title": "Implementation through to pull request",
            "body": "Work arrives from the tracker, runs against the repository and lands as a reviewable change with tests where the environment supports them."
          },
          {
            "title": "Review that isn't self-certified",
            "body": "The reviewing capability is separate from the implementing one. Generated output does not advance on its own assessment."
          },
          {
            "title": "Debugging as a routed capability",
            "body": "Failures are diagnosed from captured evidence and fixes re-enter review and testing rather than being applied directly."
          }
        ]
      }
    },
    "measures": {
      "label": "WHAT GATES A RELEASE",
      "headline": [
        "Three numbers that decide",
        "whether it ships."
      ],
      "body": "Measured on the pipeline itself, not asserted in a summary.",
      "primary": [
        {
          "label": "Acceptance rate",
          "icon": "shield",
          "counts": "Share that passed your standard on first submission.",
          "why": "How much output is genuinely done."
        },
        {
          "label": "Retry rate",
          "icon": "reset",
          "counts": "Share of runs that entered recovery.",
          "why": "Where the work is fragile."
        },
        {
          "label": "Time to accepted outcome",
          "icon": "clock",
          "counts": "From the tracker item to the merged, verified change.",
          "why": "The cycle you actually ship on."
        }
      ],
      "secondaryLabel": "Also reported on every run",
      "secondary": [
        {
          "label": "Tasks completed",
          "hint": "Volume cleared through the full acceptance path"
        },
        {
          "label": "Cost per accepted task",
          "hint": "Execution cost over work that met the standard"
        },
        {
          "label": "Intervention rate",
          "hint": "How often a person had to step in"
        },
        {
          "label": "Blocked time",
          "hint": "Waiting on access, approval or a dependency"
        },
        {
          "label": "Evidence coverage",
          "hint": "Completed work with an auditable trail"
        }
      ],
      "note": "Every figure is computed from your own runs, the same way each time. exekova publishes the method, not a benchmark."
    },
    "faqGroup": "Quality",
    "faq": [
      {
        "q": "Who validates exekova's output?",
        "a": "Not the capability that produced it. exekova separates execution from acceptance: completed work is routed through independent review, testing and validation against your acceptance criteria, with evidence collected along the way. Human approval can be required at any gate you define."
      },
      {
        "q": "How does exekova define done?",
        "a": "You define it. Done is the definition of done you attach to the work - acceptance criteria, required tests, review requirements, and any approvals. exekova treats that definition as the completion condition, not its own assessment of the output. Work advances by passing the next Quality Gate rather than by the capability that produced it declaring itself finished, and output that has not passed those gates is not treated as an outcome."
      },
      {
        "q": "How does exekova handle testing?",
        "a": "Testing is a stage in the pipeline rather than an optional extra. Where the work and the connected environment support it, exekova runs the tests you require, captures results as evidence, and routes failures into the recovery loop. A failing test holds the work at the gate instead of returning it as complete, and the captured results become part of the record that justifies acceptance when the work eventually passes."
      },
      {
        "q": "Can exekova use independent reviewers?",
        "a": "Yes. Review is performed by a capability separate from the one that produced the work, so output is not self-certified. This separation is structural rather than a policy you enable: acceptance is a distinct act from production, and the reviewing capability judges the work against the acceptance criteria attached to it rather than against its own idea of quality. Final acceptance can additionally be reserved for a named person."
      },
      {
        "q": "Can humans approve work?",
        "a": "Yes. Approval gates can be placed on specific actions, environments, risk levels or spend thresholds. Work waits at the gate until a named approver acts. The gate is part of the definition of done, so the run does not proceed past it and does not report the work as complete while it is waiting. What the approver is being asked to accept arrives with the evidence collected up to that point."
      },
      {
        "q": "How does exekova collect evidence?",
        "a": "Each run records its plan, the actions taken, the tools used, test and review results, retries, escalations and approvals. That record is what makes a completed outcome auditable after the fact. It is captured as the run proceeds rather than assembled afterwards, and it is retained as Outcome History, so a later run can start from what an earlier one established instead of from nothing."
      },
      {
        "q": "What are Quality Gates?",
        "a": "A Quality Gate is a requirement work must satisfy before it can progress or be treated as complete - a required test, an independent review, a policy check or a human approval. You define the gates as part of the definition of done. Work advances by passing the next gate, not by the capability that produced it declaring itself finished."
      },
      {
        "q": "What is a verified outcome?",
        "a": "A verified outcome is completed work that has satisfied the evidence, testing, review, policy and acceptance criteria attached to it. Output that has not passed those checks is not an outcome, and time spent on it is not billed. Verification is a separate act from production: the capability that produced the work is never the one that accepts it."
      },
      {
        "q": "What is human-in-the-loop execution?",
        "a": "Human-in-the-loop execution means people keep the decisions that carry judgement while exekova carries the execution. You set the objective, the boundaries, the permitted tools, the quality bar and the definition of done, and approval can be required at any gate, including final acceptance. exekova escalates to a person when work exceeds its retry ceiling or falls outside the boundaries it was given."
      }
    ],
    "cta": {
      "headline": [
        "Start with one",
        "measurable slice."
      ],
      "body": "Pick a repeating category of work in your remit and measure it against how it runs today."
    }
  }
];

export function leaderBySlug(slug: string) {
  return leaders.find(item => item.slug === slug);
}
