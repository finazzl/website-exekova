/**
 * Every use case on the site, generated from the exekova.com content layer by
 * scripts/import-site-content.py: the cases each industry page names, the three
 * cases each function names, and the two cross-industry problems. Content
 * only; regenerate rather than hand-edit.
 */
export type CaseSlug = string;
export type CaseOrigin = { kind: 'industry' | 'function' | 'cross'; key: string; name: string; icon: string; href: string };
export type RunStep = { stage: string | null; text: string };
export type Case = {
  id: string; slug: CaseSlug; name: string; problem: string; why: string; pressure: string; arrives: string;
  runs: RunStep[]; returns: string[]; keeps: string[]; keepsLabel: string; origin: CaseOrigin; title: string; description: string;
};
export type FeaturedScenario = { slug: string | null; href: string; tone: string; icon: string; eyebrow: string; title: string; body: string; watch: string[]; cta: string };
export type CasesIndex = {
  title: string; description: string; intro: { title: string; body: string };
  hero: { headline: [string, string]; lede: string };
  lens: { title: string; body: string };
  note: string;
  chairs: { role: string; icon: string; question: string }[];
  byIndustry: { label: string; headline: [string, string]; body: string };
  pipeline: { label: string; note: string; stages: string[] };
  featured: FeaturedScenario[];
  featuredByIndustry: CaseSlug[];
};

export const cases: Case[] = [
  {
    "id": "psp-deprecation",
    "slug": "fintech-psp-deprecation",
    "name": "Provider API deprecations",
    "problem": "A payment provider deprecates an endpoint on their calendar, not yours.",
    "why": "Every provider ships breaking changes with a fixed sunset date, landing across quote, capture, refund and webhooks at once. The work is rarely hard; finding every call site and keeping sandbox evidence per path is. exekova holds the whole migration as one run, so no path is missed and no evidence is assembled afterwards.",
    "pressure": "The deadline is set by someone outside your business, and missing it stops transactions rather than degrading them.",
    "arrives": "The deprecation notice and the affected endpoints, with sandbox credentials and your definition of done for a migrated path.",
    "runs": [
      {
        "stage": "Plan",
        "text": "every call site touching the deprecated endpoints is mapped, including retries and webhooks, and each becomes a unit of the same run."
      },
      {
        "stage": "Assemble",
        "text": "the platform sequences the paths and runs independent ones together, rather than one engineer working through a list."
      },
      {
        "stage": "Execute",
        "text": "each path is implemented against the new contract on its own isolated branch."
      },
      {
        "stage": "Review",
        "text": "an independent capability reviews the diff, never the one that wrote it."
      },
      {
        "stage": "Accept",
        "text": "the provider sandbox runs across success, decline, timeout and refund, and acceptance requires evidence for each response case."
      }
    ],
    "returns": [
      "A reviewed pull request per migrated path, not one large change nobody can review.",
      "Sandbox evidence for each response case, retained against the run as one record.",
      "Call sites deliberately left on the old version, with the reason recorded."
    ],
    "keeps": [
      "Provider contract terms",
      "Cutover window",
      "Production deploy approval"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "industry",
      "key": "fintech",
      "name": "Fintech",
      "icon": "coins",
      "href": "/industries/fintech"
    },
    "title": "Provider API deprecations - Fintech use case",
    "description": "A payment provider deprecates an endpoint on their calendar, not yours."
  },
  {
    "id": "recon-exceptions",
    "slug": "fintech-recon-exceptions",
    "name": "Reconciliation exceptions",
    "problem": "Reconciliation breaks pile up faster than anyone can reproduce them.",
    "why": "A mismatch between your ledger, the processor file and the bank statement is usually a small logic gap, but each needs reproducing from real settlement data before it can be fixed. That reproduction is the bottleneck. exekova reproduces, corrects, guards and reviews inside one run, so the queue drains instead of ageing.",
    "pressure": "Unreconciled items age into finance escalations and, in regulated entities, into reportable control findings.",
    "arrives": "An exception class from the reconciliation queue with sample identifiers and the expected ledger behaviour.",
    "runs": [
      {
        "stage": "Plan",
        "text": "the exception is reproduced against a redacted sample set in a sandbox, and the expected ledger behaviour becomes the standard."
      },
      {
        "stage": "Assemble",
        "text": "reproduction, correction and the regression case are one unit rather than three separate tickets."
      },
      {
        "stage": "Execute",
        "text": "the cause is traced to mapping, rounding, timing or a duplicate event, and the correction implemented on an isolated branch."
      },
      {
        "stage": "Review",
        "text": "an independent capability reviews the change with the reproduction attached."
      },
      {
        "stage": "Accept",
        "text": "the reconciliation sample is re-run and a regression case named after the exception class must pass."
      }
    ],
    "returns": [
      "A reviewed change with a regression test named after the exception class.",
      "The reproduction and the corrected position, kept with the run rather than in a spreadsheet.",
      "Exception classes that could not be reproduced, stated rather than quietly closed."
    ],
    "keeps": [
      "Accounting treatment",
      "Restatement decisions",
      "Customer remediation"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "industry",
      "key": "fintech",
      "name": "Fintech",
      "icon": "coins",
      "href": "/industries/fintech"
    },
    "title": "Reconciliation exceptions - Fintech use case",
    "description": "Reconciliation breaks pile up faster than anyone can reproduce them. See how exekova runs it: plan, execute, independent review, accepted result."
  },
  {
    "id": "api-authorisation",
    "slug": "fintech-api-authorisation",
    "name": "API authorisation and secrets",
    "problem": "The most serious defects in a fintech API are authorisation defects, and they pass every test.",
    "why": "Broken object-level authorisation is the most common serious API flaw and it passes every functional test, because the request is well-formed. Proving it means negative tests per boundary, which is work nobody schedules. exekova schedules it, runs it and routes every failure to a reviewed fix in the same platform.",
    "pressure": "An authorisation defect is account data disclosure. That is a regulator notification and a public one, not a patch note.",
    "arrives": "The endpoints in scope, the ownership model each must enforce, and test identities spanning tenants and roles.",
    "runs": [
      {
        "stage": "Plan",
        "text": "every endpoint accepting an object identifier is enumerated, and the entitlement it must enforce becomes its acceptance criterion."
      },
      {
        "stage": "Assemble",
        "text": "the platform generates and runs the negative suite across identities itself, rather than a person writing them one at a time."
      },
      {
        "stage": "Execute",
        "text": "negative tests attempt cross-account and cross-tenant access, and code, CI output and client bundles are swept for secrets."
      },
      {
        "stage": "Review",
        "text": "every finding goes to a fix and an independent review before anything is staged."
      },
      {
        "stage": "Accept",
        "text": "the boundary must fail closed on re-run before the item is accepted."
      }
    ],
    "returns": [
      "A negative-test suite tied to each endpoint and the entitlement it enforces.",
      "Reviewed fixes for every boundary that failed, each with the test that caught it.",
      "Entitlements enforced only in the interface, reported as risk rather than patched over."
    ],
    "keeps": [
      "Risk acceptance",
      "Disclosure and regulator notification",
      "Production release approval"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "industry",
      "key": "fintech",
      "name": "Fintech",
      "icon": "coins",
      "href": "/industries/fintech"
    },
    "title": "API authorisation and secrets - Fintech use case",
    "description": "The most serious defects in a fintech API are authorisation defects, and they pass every test. Plan, execute, independent review, accepted result."
  },
  {
    "id": "pci-client-side",
    "slug": "fintech-pci-client-side",
    "name": "PCI DSS 4.0 payment page controls",
    "problem": "PCI DSS 4.0 made your payment page a controlled surface, and the date has already passed.",
    "why": "Requirements 6.4.3 and 11.6.1 mean every script reaching a payment page has to be inventoried, authorised and integrity-assured, with tamper detection you can show working. Assembling that for an assessor is the cost. exekova produces the inventory, the detection and the evidence as one run, in the shape an assessor asks for.",
    "pressure": "These requirements are no longer future-dated. The assessor asks for the inventory and for evidence the detection actually fires.",
    "arrives": "The pages in scope, the current script inventory and your assessor's evidence expectations.",
    "runs": [
      {
        "stage": "Plan",
        "text": "every script reaching a payment page is inventoried, including those loaded by other scripts, and each needs an owner and a justification."
      },
      {
        "stage": "Assemble",
        "text": "inventory, detection, alerting and the evidence pack are one unit of work rather than four workstreams."
      },
      {
        "stage": "Execute",
        "text": "integrity and change detection are implemented with alerting, on an isolated branch."
      },
      {
        "stage": "Review",
        "text": "the change and the evidence pack are held at an independent review."
      },
      {
        "stage": "Accept",
        "text": "a seeded change must actually fire the detection, and acceptance requires that proof to exist."
      }
    ],
    "returns": [
      "A script inventory with an owner and a justification against each entry.",
      "Detection shown to fire, with the seeded-change evidence retained in the same record.",
      "Scripts that cannot be justified, raised as a decision for you rather than removed."
    ],
    "keeps": [
      "Assessor relationship and scope",
      "Risk acceptance",
      "Which third parties you allow"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "industry",
      "key": "fintech",
      "name": "Fintech",
      "icon": "coins",
      "href": "/industries/fintech"
    },
    "title": "PCI DSS 4.0 payment page controls - Fintech use case",
    "description": "PCI DSS 4.0 made your payment page a controlled surface, and the date has already passed. Plan, execute, independent review, accepted result."
  },
  {
    "id": "reg-reporting",
    "slug": "banking-reg-reporting",
    "name": "Regulatory reporting changes",
    "problem": "A reporting schema changes and the deadline does not move.",
    "why": "Reporting updates arrive as a specification change with a fixed go-live. The engineering is field mapping, validation rules and edge cases across submissions that already pass. What makes it expensive is not the code, it is the coordination: an analyst reading the specification, a developer changing the mapping, someone else running historical submissions, and a reviewer at the end. exekova runs all four inside one platform, against one record.",
    "pressure": "The submission date is externally fixed, and a late or rejected filing is a supervisory matter, not a sprint slip.",
    "arrives": "The specification change and the affected report. You hand over the objective and the standard for a passing submission, not a task breakdown.",
    "runs": [
      {
        "stage": "Plan",
        "text": "the specification is diffed against the current mapping and validation rules, and the work is decomposed with the passing standard attached to it."
      },
      {
        "stage": "Assemble",
        "text": "the platform selects the capability each unit needs and sequences them. Nobody assigns an analyst, a developer and a tester separately."
      },
      {
        "stage": "Execute",
        "text": "mapping and rule changes are implemented on an isolated branch, inside the systems and permissions you granted."
      },
      {
        "stage": "Review",
        "text": "a separate capability, never the one that wrote the change, reviews it against the exact revision produced."
      },
      {
        "stage": "Accept",
        "text": "the validation suite runs over representative historical submissions, and the platform accepts only when that evidence meets your standard."
      }
    ],
    "returns": [
      "A reviewed change with the mapping diff and the reviewing capability recorded against it.",
      "Validation output over historical submissions, captured as the run happened rather than assembled afterwards.",
      "Specification ambiguities raised as a decision for you, not resolved by a guess."
    ],
    "keeps": [
      "Interpretation of the regulation",
      "Sign-off with the regulator",
      "Submission timing"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "industry",
      "key": "banking",
      "name": "Banking",
      "icon": "landmark",
      "href": "/industries/banking"
    },
    "title": "Regulatory reporting changes - Banking use case",
    "description": "A reporting schema changes and the deadline does not move. See how exekova takes the change through analysis, execution, testing and retained evidence."
  },
  {
    "id": "core-adapters",
    "slug": "banking-core-adapters",
    "name": "Core integration adapters",
    "problem": "A core banking change ripples through every adapter that touches it.",
    "why": "Message formats, field lengths and batch windows change on the core system's schedule, and every connected adapter needs the change applied and contract-tested. The real cost is tracking which adapters are affected and keeping each one's evidence straight. exekova holds the whole fan-out as one piece of work, so no adapter is discovered late.",
    "pressure": "Adapters fail quietly. A field truncation surfaces days later as a customer-facing defect or a broken batch.",
    "arrives": "The core change notice and the contract tests that define correct behaviour. The platform finds the affected surface itself.",
    "runs": [
      {
        "stage": "Plan",
        "text": "every adapter, message and batch job that reads the changed structure is identified, and each becomes a unit of the same run."
      },
      {
        "stage": "Assemble",
        "text": "the platform sequences the adapters, runs independent ones in parallel and holds dependent ones until their predecessor is accepted."
      },
      {
        "stage": "Execute",
        "text": "the change is applied against each existing interface contract on its own branch."
      },
      {
        "stage": "Review",
        "text": "each adapter change is reviewed separately by a capability that did not implement it."
      },
      {
        "stage": "Accept",
        "text": "contract and integration tests run across real-time and batch paths, and acceptance is computed per adapter from that evidence."
      }
    ],
    "returns": [
      "One reviewed change per adapter, each carrying its own contract test result.",
      "A dependency map of what the change actually reached, produced by the run rather than drawn by hand.",
      "Interfaces deliberately left unchanged, with the reasoning recorded against the run."
    ],
    "keeps": [
      "Core release window",
      "Change advisory approval",
      "Production cutover"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "industry",
      "key": "banking",
      "name": "Banking",
      "icon": "landmark",
      "href": "/industries/banking"
    },
    "title": "Core integration adapters - Banking use case",
    "description": "A core banking change ripples through every adapter that touches it. See how exekova runs it: plan, execute, independent review, accepted result."
  },
  {
    "id": "rating-rules",
    "slug": "insurance-rating-rules",
    "name": "Rating and product rule changes",
    "problem": "A rating change has to land across quote, bind and renewal without repricing the back book by accident.",
    "why": "Pricing and eligibility changes touch quote, bind, endorsement and renewal at once. The risk is not writing the rule, it is proving the back book did not move. That proof needs a control cohort run alongside the target one, every time. exekova runs both and will not accept the change until the control is clean.",
    "pressure": "An incorrect rate reaching production is a remediation exercise with regulatory reporting attached, not a hotfix.",
    "arrives": "The rule change, effective dates and the regression set that defines acceptable behaviour.",
    "runs": [
      {
        "stage": "Plan",
        "text": "the rule is decomposed across quote, bind, endorsement and renewal, with the regression set attached as the standard."
      },
      {
        "stage": "Assemble",
        "text": "the target cohort and an unchanged control cohort are run together, not as a follow-up exercise."
      },
      {
        "stage": "Execute",
        "text": "the rule is implemented against the rating engine on an isolated branch with effective-date logic explicit."
      },
      {
        "stage": "Review",
        "text": "the change is held at review until the control cohort is clean."
      },
      {
        "stage": "Accept",
        "text": "rated output is compared across both cohorts, and any unexpected movement blocks acceptance."
      }
    ],
    "returns": [
      "A reviewed change with the effective-date logic explicit.",
      "Rated-output comparison for both target and control cohorts, in one record.",
      "Any cohort that moved unexpectedly, surfaced before release rather than after."
    ],
    "keeps": [
      "Actuarial sign-off",
      "Filing and approval",
      "Effective-date decision"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "industry",
      "key": "insurance",
      "name": "Insurance",
      "icon": "umbrella",
      "href": "/industries/insurance"
    },
    "title": "Rating and product rule changes - Insurance",
    "description": "A rating change has to land across quote, bind and renewal without repricing the back book by accident."
  },
  {
    "id": "claims-intake",
    "slug": "insurance-claims-intake",
    "name": "Claims intake and document handling",
    "problem": "Claims intake fails on the documents customers actually send.",
    "why": "Intake pipelines parse documents that arrive as photos, scans and forwarded email. Every parsing defect becomes a manual touch at the worst moment. Reproducing against redacted samples, correcting and guarding the class is one continuous job, and exekova runs it as one.",
    "pressure": "Every intake failure becomes a manual touch at the moment a customer is already dissatisfied.",
    "arrives": "A failing document class with redacted samples and the expected routing and extraction result.",
    "runs": [
      {
        "stage": "Plan",
        "text": "the failure is reproduced against redacted samples and the expected extraction and routing becomes the standard."
      },
      {
        "stage": "Assemble",
        "text": "reproduction, correction and regression cases for neighbouring classes are one unit of work."
      },
      {
        "stage": "Execute",
        "text": "the parsing, validation or routing logic is corrected on an isolated branch."
      },
      {
        "stage": "Review",
        "text": "an independent capability reviews the change with the samples attached."
      },
      {
        "stage": "Accept",
        "text": "regression cases covering that class and its near neighbours must pass before acceptance."
      }
    ],
    "returns": [
      "A reviewed change with regression cases per document class.",
      "Before and after extraction results on the sample set, in one record.",
      "Document classes still routed to manual handling, named explicitly rather than left implied."
    ],
    "keeps": [
      "Claims handling policy",
      "Customer communication",
      "Settlement decisions"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "industry",
      "key": "insurance",
      "name": "Insurance",
      "icon": "umbrella",
      "href": "/industries/insurance"
    },
    "title": "Claims intake and document handling - Insurance use case",
    "description": "Claims intake fails on the documents customers actually send. See how exekova runs it: plan, execute, independent review, accepted result."
  },
  {
    "id": "interop-conformance",
    "slug": "healthcare-interop-conformance",
    "name": "Interoperability conformance",
    "problem": "An integration has to conform to a standard, not just work.",
    "why": "Exchange work is judged against a specification and a conformance suite, not against whether a message got through. Running conformance after every change rather than in one batch is what keeps the failing set shrinking, and that cadence needs a system, not a person. exekova is that system.",
    "pressure": "Non-conformance blocks partner onboarding and, in many programmes, participation itself.",
    "arrives": "The profile version, the conformance suite and the definition of a passing result.",
    "runs": [
      {
        "stage": "Plan",
        "text": "the conformance suite is run to establish the current failing set, and each failure becomes a unit with its own standard."
      },
      {
        "stage": "Assemble",
        "text": "the platform sequences implementation and re-conformance so the suite runs after every change, not once at the end."
      },
      {
        "stage": "Execute",
        "text": "required elements, bindings and validation are implemented per requirement on isolated branches."
      },
      {
        "stage": "Review",
        "text": "every change is held at an independent review before it is staged."
      },
      {
        "stage": "Accept",
        "text": "conformance is re-run and acceptance requires the result to have moved in the right direction."
      }
    ],
    "returns": [
      "Reviewed changes with the conformance result each one moved, in one record.",
      "A conformance report kept as evidence against the profile version.",
      "Requirements needing a clinical or policy decision, escalated rather than interpreted."
    ],
    "keeps": [
      "Clinical safety case",
      "Information governance",
      "Partner go-live approval"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "industry",
      "key": "healthcare",
      "name": "Healthcare & life sciences",
      "icon": "heart",
      "href": "/industries/healthcare"
    },
    "title": "Interoperability conformance - Healthcare",
    "description": "An integration has to conform to a standard, not just work. See how exekova executes and evidences conformance testing against the specification."
  },
  {
    "id": "phi-boundaries",
    "slug": "healthcare-phi-boundaries",
    "name": "Test data without live records",
    "problem": "Teams cannot test properly because the only realistic data is the data they must not use.",
    "why": "Defects that only appear on real record shapes are the hardest to reproduce, and reproducing them with live records is not an option. Building and maintaining a synthetic set that is realistic and provably safe is continuous work. exekova builds it, validates it against the de-identification rules and uses it in the same run.",
    "pressure": "The alternative is either untested edge cases or an information governance incident.",
    "arrives": "The record shapes that cause failures, the de-identification rules and the environments the data may live in.",
    "runs": [
      {
        "stage": "Plan",
        "text": "the problematic shapes are identified and the de-identification and retention rules become the standard the set must meet."
      },
      {
        "stage": "Assemble",
        "text": "generation, validation and defect reproduction are one run rather than a data task followed by an engineering task."
      },
      {
        "stage": "Execute",
        "text": "synthetic records are generated that reproduce the shapes, and the open defects are reproduced against them."
      },
      {
        "stage": "Review",
        "text": "each fix is routed through an independent review."
      },
      {
        "stage": "Accept",
        "text": "the set must validate against the de-identification rules before it or anything built on it is accepted."
      }
    ],
    "returns": [
      "A maintained synthetic dataset with the rules it was built against recorded.",
      "Reproductions and fixes for the defects it exposed, in the same record.",
      "Shapes that could not be synthesised safely, stated explicitly rather than approximated."
    ],
    "keeps": [
      "Information governance policy",
      "What counts as de-identified",
      "Environment access"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "industry",
      "key": "healthcare",
      "name": "Healthcare & life sciences",
      "icon": "heart",
      "href": "/industries/healthcare"
    },
    "title": "Test data without live records - Healthcare & life sciences",
    "description": "Teams cannot test properly because the only realistic data is the data they must not use. Plan, execute, independent review, accepted result."
  },
  {
    "id": "accessibility-remediation",
    "slug": "public-sector-accessibility-remediation",
    "name": "Accessibility remediation",
    "problem": "An accessibility audit produces a long list and a statutory deadline.",
    "why": "Audit findings are specific, numerous and spread across every template and journey, and the statement is published with a statutory deadline. Fixing at the shared component and re-proving against the criterion is what makes the list shrink rather than rotate. exekova groups, fixes, reviews and re-tests in one run.",
    "pressure": "The accessibility statement is published, the deadline is statutory and the finding list is public.",
    "arrives": "The audit findings, the affected templates and the success criteria each fix must satisfy.",
    "runs": [
      {
        "stage": "Plan",
        "text": "findings are grouped by template and by success criterion, so a shared component is fixed once rather than per page."
      },
      {
        "stage": "Assemble",
        "text": "fixes, re-tests and assistive-technology checks are one run rather than a developer queue and a separate testing queue."
      },
      {
        "stage": "Execute",
        "text": "each group is fixed at the shared component wherever possible, on an isolated branch."
      },
      {
        "stage": "Review",
        "text": "every change goes through an independent review."
      },
      {
        "stage": "Accept",
        "text": "each fix is re-tested against the criterion it failed, including with assistive technology, and only that closes the finding."
      }
    ],
    "returns": [
      "Reviewed fixes grouped by component, with the criterion each one satisfies.",
      "Re-test evidence per finding, ready for the accessibility statement as one record.",
      "Findings needing a content or policy decision, listed separately for you."
    ],
    "keeps": [
      "The published accessibility statement",
      "Policy and content decisions",
      "Deadline commitments"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "industry",
      "key": "public-sector",
      "name": "Public sector",
      "icon": "building",
      "href": "/industries/public-sector"
    },
    "title": "Accessibility remediation - Public sector use case",
    "description": "An accessibility audit produces a long list and a statutory deadline. See how exekova works the list down with tested fixes and a full audit trail."
  },
  {
    "id": "legacy-increments",
    "slug": "public-sector-legacy-increments",
    "name": "Legacy modernisation in increments",
    "problem": "The legacy system cannot be replaced at once and cannot be left alone.",
    "why": "Modernisation proceeds service by service, and each increment needs proof that behaviour did not change. Building characterisation tests, implementing behind a boundary and comparing old against new is a discipline that slips under delivery pressure. exekova will not accept an increment without the comparison, so the discipline holds.",
    "pressure": "A behaviour change that reaches a statutory service is a public failure with a ministerial answer attached.",
    "arrives": "The increment in scope, the current behaviour to preserve and the characterisation tests that define no change.",
    "runs": [
      {
        "stage": "Plan",
        "text": "characterisation tests are built that capture current behaviour, and they become the acceptance standard for the increment."
      },
      {
        "stage": "Assemble",
        "text": "test construction, implementation and comparison are one run rather than three phases."
      },
      {
        "stage": "Execute",
        "text": "the increment is implemented behind the compatibility boundary on an isolated branch."
      },
      {
        "stage": "Review",
        "text": "the increment is held at an independent review before release."
      },
      {
        "stage": "Accept",
        "text": "the characterisation suite runs against old and new paths, and any unexplained difference blocks acceptance."
      }
    ],
    "returns": [
      "A characterisation suite that outlives the increment.",
      "A behaviour comparison between old and new paths, in one record.",
      "Differences that are intended, separated from the ones that are not."
    ],
    "keeps": [
      "Service design decisions",
      "Release and rollout approval",
      "Citizen communication"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "industry",
      "key": "public-sector",
      "name": "Public sector",
      "icon": "building",
      "href": "/industries/public-sector"
    },
    "title": "Legacy modernisation in increments - Public sector use case",
    "description": "The legacy system cannot be replaced at once and cannot be left alone. See how exekova runs it: plan, execute, independent review, accepted result."
  },
  {
    "id": "peak-readiness",
    "slug": "ecommerce-peak-readiness",
    "name": "Peak trading readiness",
    "problem": "Checkout has to survive peak on a date that was fixed months ago.",
    "why": "Peak readiness is a long list of unglamorous work: load scenarios that match real basket behaviour, payment fallbacks, inventory race conditions. It normally needs a performance engineer, a developer and a release manager moving in sequence. exekova runs that sequence itself, so the list shortens continuously instead of in a panic near the freeze.",
    "pressure": "The trading date does not move, and a checkout failure at peak is lost revenue that cannot be recovered later.",
    "arrives": "The peak scenarios, the freeze date and the pass standard for each journey. One objective, not a scheduled programme of work.",
    "runs": [
      {
        "stage": "Plan",
        "text": "scenarios are built from real basket and promotion behaviour, and each journey's pass standard becomes its acceptance criterion."
      },
      {
        "stage": "Assemble",
        "text": "the platform sequences scenario runs and fixes together, so a failure found in the morning is a reviewed change by the afternoon."
      },
      {
        "stage": "Execute",
        "text": "scenarios run against the staging estate, failures are captured with traces, and each defect is fixed as its own change."
      },
      {
        "stage": "Review",
        "text": "every fix goes to an independent capability before it can progress."
      },
      {
        "stage": "Accept",
        "text": "the affected scenario is re-run against the fixed revision, and only a passing re-run closes the item."
      }
    ],
    "returns": [
      "Reviewed fixes, each named by the scenario that caught it.",
      "Run evidence per journey, held against the readiness checklist as one record.",
      "Scenarios that still fail, reported before freeze rather than discovered at peak."
    ],
    "keeps": [
      "Code freeze date",
      "Go or no-go for peak",
      "Promotion design"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "industry",
      "key": "ecommerce",
      "name": "Ecommerce & retail",
      "icon": "cart",
      "href": "/industries/ecommerce"
    },
    "title": "Peak trading readiness - Ecommerce",
    "description": "Checkout has to survive peak on a date fixed months ago. See how exekova hardens the purchase path with tested changes and independent review."
  },
  {
    "id": "catalogue-integrity",
    "slug": "ecommerce-catalogue-integrity",
    "name": "Catalogue and feed integrity",
    "problem": "Product feeds break in ways that only show up as lost sales.",
    "why": "Every channel takes a slightly different feed, and attribute mismatches are found by a merchandiser noticing a product has gone missing. Each rejection needs reproducing, correcting and guarding. Because exekova owns reproduction through to the guard test in one run, the same rejection class does not come back.",
    "pressure": "Nothing alerts. The first signal is usually a merchandiser noticing a product has gone missing.",
    "arrives": "The rejection report from the channel and sample SKUs. The platform reproduces the failure itself rather than asking you to.",
    "runs": [
      {
        "stage": "Plan",
        "text": "the rejection is reproduced against live feed output for those SKUs, and the mapping that should satisfy the channel becomes the standard."
      },
      {
        "stage": "Assemble",
        "text": "reproduction, correction and the new validation case are treated as one unit of work rather than three tickets."
      },
      {
        "stage": "Execute",
        "text": "the mapping, transformation or validation that caused the rejection is corrected on an isolated branch."
      },
      {
        "stage": "Review",
        "text": "an independent capability checks the change against the before and after feed output."
      },
      {
        "stage": "Accept",
        "text": "a feed validation case is added so that rejection class fails loudly next time, and acceptance requires it to pass."
      }
    ],
    "returns": [
      "A reviewed change plus a validation rule for each rejection class.",
      "Feed output before and after, retained with the run rather than pasted into a ticket.",
      "Rejections that are the channel's own rule change, flagged rather than worked around."
    ],
    "keeps": [
      "Channel strategy",
      "Merchandising and pricing",
      "Which channels you serve"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "industry",
      "key": "ecommerce",
      "name": "Ecommerce & retail",
      "icon": "cart",
      "href": "/industries/ecommerce"
    },
    "title": "Catalogue and feed integrity - Ecommerce & retail use case",
    "description": "Product feeds break in ways that only show up as lost sales. See how exekova runs it: plan, execute, independent review, accepted result."
  },
  {
    "id": "version-support",
    "slug": "saas-version-support",
    "name": "Supporting versions you already shipped",
    "problem": "Every version you have ever shipped is still someone’s production.",
    "why": "Backporting fixes and keeping compatibility across supported versions is continuous work that never competes well against the roadmap, so it accumulates until a security fix forces the conversation. exekova runs every supported branch as parallel units of one piece of work, which is why the matrix stays current.",
    "pressure": "A security fix that cannot be backported turns into a forced upgrade conversation with your largest accounts.",
    "arrives": "The fix, the supported version matrix and the compatibility tests that define an acceptable backport.",
    "runs": [
      {
        "stage": "Plan",
        "text": "each supported branch becomes a separate unit of the same run, with the compatibility tests attached."
      },
      {
        "stage": "Assemble",
        "text": "the platform runs the branches in parallel rather than one engineer working down the matrix."
      },
      {
        "stage": "Execute",
        "text": "the fix is applied to each branch, adapted where the code has diverged, on its own isolated branch."
      },
      {
        "stage": "Review",
        "text": "each backport is reviewed separately, never as one cross-branch change."
      },
      {
        "stage": "Accept",
        "text": "compatibility and upgrade-path tests must pass per branch before that backport is accepted."
      }
    ],
    "returns": [
      "One reviewed backport per supported branch, each with its own test result.",
      "Upgrade-path evidence for the versions in the matrix, in one record.",
      "Branches deliberately excluded, named with the reason."
    ],
    "keeps": [
      "Support policy and end-of-life dates",
      "Customer release commitments",
      "Deploy approval"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "industry",
      "key": "saas",
      "name": "SaaS & software",
      "icon": "layers",
      "href": "/industries/saas"
    },
    "title": "Supporting versions you already shipped",
    "description": "Every version you shipped is still someone’s production. See how exekova maintains supported releases with regression evidence and independent review."
  },
  {
    "id": "tenant-isolation",
    "slug": "saas-tenant-isolation",
    "name": "Tenant isolation under change",
    "problem": "Multi-tenant isolation has to be re-proved every time the data model moves.",
    "why": "A new feature, report or index can quietly widen what one tenant can reach, and proving isolation means negative tests per boundary every time the model moves. That cadence is what nobody sustains. exekova re-proves it on every change because the negative suite is part of acceptance, not a separate project.",
    "pressure": "An isolation defect is not a bug report. It is a customer notification and, under most contracts, an audit finding.",
    "arrives": "The changed data model, the tenancy boundaries that must hold and the negative-test standard for each.",
    "runs": [
      {
        "stage": "Plan",
        "text": "the queries and endpoints the change exposes are enumerated, and each boundary becomes an acceptance criterion."
      },
      {
        "stage": "Assemble",
        "text": "test generation, execution and fixes are one run rather than a security review scheduled afterwards."
      },
      {
        "stage": "Execute",
        "text": "negative tests attempt cross-tenant reads and writes against a seeded multi-tenant environment."
      },
      {
        "stage": "Review",
        "text": "every failure is routed to a fix and an independent review before the change can progress."
      },
      {
        "stage": "Accept",
        "text": "the boundary must fail closed on re-run before acceptance."
      }
    ],
    "returns": [
      "A negative-test suite tied to each tenancy boundary.",
      "Reviewed fixes for every boundary the change had weakened, in one record.",
      "Boundaries enforced only by convention, reported as risk rather than assumed safe."
    ],
    "keeps": [
      "Tenancy architecture decisions",
      "Customer notification",
      "Production deploy approval"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "industry",
      "key": "saas",
      "name": "SaaS & software",
      "icon": "layers",
      "href": "/industries/saas"
    },
    "title": "Tenant isolation under change - SaaS & software use case",
    "description": "Multi-tenant isolation has to be re-proved every time the data model moves. See how exekova runs it: plan, execute, independent review, accepted result."
  },
  {
    "id": "oss-bss-changes",
    "slug": "telecom-oss-bss-changes",
    "name": "OSS and BSS change requests",
    "problem": "A tariff or product change has to land across ordering, provisioning and billing at once.",
    "why": "One commercial change touches the product catalogue, the order journey, provisioning and the rating and billing chain, each with its own team and release train. Coordinating that is the work. exekova holds all four hops in one run and tests end to end through to a rated bill, which is the only place the change is actually proven.",
    "pressure": "Billing errors are reportable to the regulator and remediated at your cost, long after the change shipped.",
    "arrives": "The catalogue change, the affected journeys and the end-to-end scenarios that define a correct order and a correct bill.",
    "runs": [
      {
        "stage": "Plan",
        "text": "the change is traced through catalogue, order, provisioning and billing, and each hop becomes a unit of the same run."
      },
      {
        "stage": "Assemble",
        "text": "the platform sequences the hops and holds dependent ones until their predecessor is accepted."
      },
      {
        "stage": "Execute",
        "text": "each hop is implemented as a separate working change on its own branch."
      },
      {
        "stage": "Review",
        "text": "every hop is held at an independent review before it is staged."
      },
      {
        "stage": "Accept",
        "text": "end-to-end scenarios run from order capture through to a rated bill, and acceptance requires the bill to be right."
      }
    ],
    "returns": [
      "One reviewed change per system, each with its end-to-end scenario result.",
      "Rated-bill output for each scenario, kept as evidence in one record.",
      "Scenarios where the commercial intent is ambiguous, raised rather than assumed."
    ],
    "keeps": [
      "Commercial terms and pricing",
      "Regulatory notification",
      "Launch date"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "industry",
      "key": "telecom",
      "name": "Telecommunications",
      "icon": "signal",
      "href": "/industries/telecom"
    },
    "title": "OSS and BSS change requests - Telecom",
    "description": "A tariff or product change has to land across ordering, provisioning and billing at once."
  },
  {
    "id": "network-automation",
    "slug": "telecom-network-automation",
    "name": "Network automation and config drift",
    "problem": "Device configurations drift away from the intended state between audits.",
    "why": "Manual changes, vendor differences and emergency fixes leave the running estate out of step with the templates, and drift is invisible until an incident. Writing detection and a safe remediation playbook per device class, and validating both in a lab, is work that never reaches the top of a queue. exekova runs it continuously.",
    "pressure": "Drift is invisible until an incident, and then it is the reason the incident lasted longer than it should have.",
    "arrives": "The intended configuration templates, the device classes in scope and a lab or emulated environment to validate against.",
    "runs": [
      {
        "stage": "Plan",
        "text": "drift detection is built for each device class against the intended template, and each class becomes a unit."
      },
      {
        "stage": "Assemble",
        "text": "detection, playbook and lab validation are one run rather than a detection project and a remediation project."
      },
      {
        "stage": "Execute",
        "text": "remediation playbooks are written for the drift patterns found, on an isolated branch."
      },
      {
        "stage": "Review",
        "text": "each playbook goes to an independent review before it is allowed anywhere near the estate."
      },
      {
        "stage": "Accept",
        "text": "detection and remediation are validated in the lab including the rollback path, and acceptance requires that rollback to work."
      }
    ],
    "returns": [
      "Reviewed drift checks and playbooks, one per device class.",
      "Lab evidence including the rollback path for each playbook, in one record.",
      "Drift that is deliberate, separated from drift that is not."
    ],
    "keeps": [
      "Change window approval",
      "What runs against production network",
      "Rollback authority"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "industry",
      "key": "telecom",
      "name": "Telecommunications",
      "icon": "signal",
      "href": "/industries/telecom"
    },
    "title": "Network automation and config drift - Telecommunications",
    "description": "Device configurations drift away from the intended state between audits. See how exekova runs it: plan, execute, independent review, accepted result."
  },
  {
    "id": "distribution-changes",
    "slug": "travel-distribution-changes",
    "name": "Distribution and content changes",
    "problem": "A supplier changes their distribution contract and every booking path has to keep working.",
    "why": "Fares, ancillaries, rules and servicing flows come from suppliers who version on their own schedule, and a change means reworking search, booking and post-booking together. Testing only the happy path is how servicing breaks quietly. exekova runs change, cancel, refund and partial-failure scenarios as part of acceptance, not as a later phase.",
    "pressure": "A broken servicing path becomes a manual agent task at the moment the traveller is already disrupted.",
    "arrives": "The supplier change, the affected booking paths and the scenarios that define a correct end-to-end booking and servicing flow.",
    "runs": [
      {
        "stage": "Plan",
        "text": "the change is mapped across search, booking and servicing, and each path becomes a unit with its scenarios attached."
      },
      {
        "stage": "Assemble",
        "text": "the platform sequences paths and runs independent ones together against the supplier test environment."
      },
      {
        "stage": "Execute",
        "text": "each path is implemented on its own isolated branch."
      },
      {
        "stage": "Review",
        "text": "each path is held at an independent review before it is staged."
      },
      {
        "stage": "Accept",
        "text": "change, cancel, refund and partial-failure scenarios must all pass, not only the booking path."
      }
    ],
    "returns": [
      "Reviewed changes per booking path with their scenario results attached.",
      "Supplier test evidence for the disruption scenarios, not only the happy path, in one record.",
      "Paths left on manual servicing, named with the reason."
    ],
    "keeps": [
      "Supplier commercial terms",
      "Fare and ancillary strategy",
      "Launch approval"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "industry",
      "key": "travel",
      "name": "Travel & hospitality",
      "icon": "plane",
      "href": "/industries/travel"
    },
    "title": "Distribution and content changes - Travel",
    "description": "A supplier changes their distribution contract and every booking path has to keep working."
  },
  {
    "id": "peak-and-disruption",
    "slug": "travel-peak-and-disruption",
    "name": "Disruption handling under load",
    "problem": "The system is tested for booking and exercised most during disruption.",
    "why": "Weather, cancellations and schedule changes generate rebooking, refunds and notifications all at once, and those paths have the least regression coverage precisely because they are hardest to exercise. exekova builds the scenarios, runs them at concurrency, fixes what breaks and re-runs, inside one platform and one record.",
    "pressure": "Disruption load arrives without notice and lands on the paths with the least regression coverage.",
    "arrives": "The disruption scenarios, realistic volumes and the pass standard for rebooking, refund and notification journeys.",
    "runs": [
      {
        "stage": "Plan",
        "text": "disruption scenarios are built at realistic concurrency rather than single-user, with each journey's standard attached."
      },
      {
        "stage": "Assemble",
        "text": "scenario runs, fixes and re-runs are one continuous loop rather than a test cycle followed by a fix cycle."
      },
      {
        "stage": "Execute",
        "text": "scenarios run against staging, failures are captured with traces, and each defect is fixed as its own change."
      },
      {
        "stage": "Review",
        "text": "every fix passes an independent review."
      },
      {
        "stage": "Accept",
        "text": "the affected scenario is re-run and only a passing result closes the item."
      }
    ],
    "returns": [
      "Reviewed fixes with the disruption scenario that found each one.",
      "Load evidence per journey, kept against the readiness record as one artefact.",
      "Journeys that still degrade under load, reported before the season rather than during it."
    ],
    "keeps": [
      "Disruption policy",
      "Compensation decisions",
      "Customer communication"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "industry",
      "key": "travel",
      "name": "Travel & hospitality",
      "icon": "plane",
      "href": "/industries/travel"
    },
    "title": "Disruption handling under load - Travel & hospitality",
    "description": "The system is tested for booking and exercised most during disruption. See how exekova runs it: plan, execute, independent review, accepted result."
  },
  {
    "id": "admission-merit-list",
    "slug": "education-admission-merit-list",
    "name": "Admission screening and merit lists",
    "problem": "A merit list has to be defensible, not just computed.",
    "why": "Screening a cohort applies rules that each come from a different authority, and every one must be defensible under appeal. Coordinating regulation reading, implementation, reconciliation and review across a fixed publication date is the hard part. exekova keeps all four inside one run, so each rule can be traced to the clause that mandates it.",
    "pressure": "The list is published, the date is fixed, and every candidate excluded by a rule can contest it through appeals or the courts.",
    "arrives": "The admission regulations for this cycle, the seat matrix and the exam result schema. You state what a defensible list means; the platform decomposes it.",
    "runs": [
      {
        "stage": "Plan",
        "text": "each clause is translated into a separately testable rule, recorded against the clause that mandates it."
      },
      {
        "stage": "Assemble",
        "text": "rule implementation, historical reconciliation and review are sequenced as one run rather than handed between teams."
      },
      {
        "stage": "Execute",
        "text": "screening and merit generation are implemented with the seat matrix and tie-break order applied."
      },
      {
        "stage": "Review",
        "text": "the rule set and a generated sample list are held at an independent review before anything is published."
      },
      {
        "stage": "Accept",
        "text": "the rules are run over a previous cycle and every difference is reconciled, and acceptance requires that reconciliation to be clean or explained."
      }
    ],
    "returns": [
      "A reviewed rule set where each rule cites the clause that mandates it.",
      "A reconciliation against a previous cycle, difference by difference, kept as one record.",
      "Candidates the rules cannot separate, raised for a ruling rather than decided by the platform."
    ],
    "keeps": [
      "Interpretation of the regulations",
      "Seat matrix and cut-offs",
      "Publication and appeals"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "industry",
      "key": "education",
      "name": "Education",
      "icon": "graduation",
      "href": "/industries/education"
    },
    "title": "Admission screening and merit lists - Education use case",
    "description": "A merit list has to be defensible, not just computed. See how exekova runs it: plan, execute, independent review, accepted result."
  },
  {
    "id": "sis-integrations",
    "slug": "education-sis-integrations",
    "name": "Student system integrations",
    "problem": "Student data has to stay consistent across systems that each think they are the source of truth.",
    "why": "The student record, the learning platform, the library, finance and identity all hold overlapping data and synchronise on different schedules. Tracing an inconsistency means touching every one of them, which is why it is usually deferred. exekova traces across all of them in a single run because it holds the connections, not a person with five logins.",
    "pressure": "Every inconsistency is a student blocked from something they are entitled to, during a term that does not pause.",
    "arrives": "The inconsistency class and sample records. The platform traces them across the chain itself.",
    "runs": [
      {
        "stage": "Plan",
        "text": "the sample records are traced across every system in the chain and the synchronisation rules that should hold become the standard."
      },
      {
        "stage": "Assemble",
        "text": "the platform reaches each system through its own connection, with the scope you granted, rather than a person collecting screenshots."
      },
      {
        "stage": "Execute",
        "text": "the timing, mapping or ownership gap is identified and the correction implemented on an isolated branch."
      },
      {
        "stage": "Review",
        "text": "an independent capability reviews the change with the traced records attached."
      },
      {
        "stage": "Accept",
        "text": "a reconciliation check for that inconsistency class is added, and acceptance requires it to pass."
      }
    ],
    "returns": [
      "A reviewed change plus a reconciliation check per inconsistency class.",
      "Record-level before and after across every system involved, in one record.",
      "Cases where two systems both claim ownership, escalated as a decision rather than resolved silently."
    ],
    "keeps": [
      "Which system owns which field",
      "Student-facing remediation",
      "Data sharing policy"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "industry",
      "key": "education",
      "name": "Education",
      "icon": "graduation",
      "href": "/industries/education"
    },
    "title": "Student system integrations - Education use case",
    "description": "Student data has to stay consistent across systems that each think they are the source of truth. Plan, execute, independent review, accepted result."
  },
  {
    "id": "enrolment-peaks",
    "slug": "education-enrolment-peaks",
    "name": "Enrolment and results peaks",
    "problem": "The year has two dates when everything is used at once.",
    "why": "Enrolment and results concentrate a year of load into a few hours across identity, payments, timetabling and notification at once. Testing that needs four teams in a room. exekova runs the whole cross-system exercise as one piece of work, so the failures are found and fixed in the same loop.",
    "pressure": "Both dates are fixed in the academic calendar and both are experienced by every student simultaneously.",
    "arrives": "The peak journeys, expected concurrency and the freeze date. One objective covering all four systems.",
    "runs": [
      {
        "stage": "Plan",
        "text": "load scenarios are built for enrolment and results at realistic concurrency, with each journey's pass standard attached."
      },
      {
        "stage": "Assemble",
        "text": "the platform runs across identity, payment, timetabling and notification together rather than one system at a time."
      },
      {
        "stage": "Execute",
        "text": "each failure becomes its own change, fixed on an isolated branch."
      },
      {
        "stage": "Review",
        "text": "every fix passes an independent review before it counts."
      },
      {
        "stage": "Accept",
        "text": "the affected journey is re-run and only a passing result closes the item."
      }
    ],
    "returns": [
      "Reviewed fixes with the scenario that found each one.",
      "Load evidence per journey, held against the readiness record as one artefact.",
      "Journeys that still degrade, reported before the calendar date rather than during it."
    ],
    "keeps": [
      "The academic calendar",
      "Go or no-go for the peak",
      "Student communication"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "industry",
      "key": "education",
      "name": "Education",
      "icon": "graduation",
      "href": "/industries/education"
    },
    "title": "Enrolment and results peaks - Education use case",
    "description": "The year has two dates when everything is used at once. See how exekova prepares enrolment and results systems with load-tested, reviewed changes."
  },
  {
    "id": "online-exam-integrity",
    "slug": "education-online-exam-integrity",
    "name": "Online examination integrity",
    "problem": "An online exam has to be fair under conditions you do not control.",
    "why": "The attempt is the unit that matters and it runs on the student's device and network. Disconnection, resume, and accommodation paths are the least tested and the most consequential. Building attempt-level scenarios, running them at concurrency and fixing what breaks normally spans three teams; exekova runs it as one.",
    "pressure": "An exam runs once. A defect found inside the window is a disrupted sitting and an appeals process, not a bug to schedule.",
    "arrives": "The assessment types in scope, the proctoring and accommodation rules, and what counts as a valid attempt.",
    "runs": [
      {
        "stage": "Plan",
        "text": "attempt-level scenarios are built - disconnection mid-answer, resume on another device, accommodation paths - each with its pass standard."
      },
      {
        "stage": "Assemble",
        "text": "the platform sequences scenario execution, defect fixes and re-runs without a handover between them."
      },
      {
        "stage": "Execute",
        "text": "scenarios run at realistic concurrency against autosave, resume and submission, and each defect is fixed as its own change."
      },
      {
        "stage": "Review",
        "text": "an independent capability reviews each fix against the attempt scenario that caught it."
      },
      {
        "stage": "Accept",
        "text": "integrity signals must be written as reviewable evidence, and the scenario must pass on re-run before the item closes."
      }
    ],
    "returns": [
      "Reviewed fixes with the attempt scenario that caught each one.",
      "Evidence per assessment type, retained against the exam window as one record.",
      "Scenarios that can still lose an attempt, reported before the window opens."
    ],
    "keeps": [
      "Academic integrity decisions",
      "Accommodation policy",
      "What invalidates an attempt"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "industry",
      "key": "education",
      "name": "Education",
      "icon": "graduation",
      "href": "/industries/education"
    },
    "title": "Online examination integrity - Education use case",
    "description": "An online exam has to be fair under conditions you do not control. See how exekova runs it: plan, execute, independent review, accepted result."
  },
  {
    "id": "lms-interoperability",
    "slug": "education-lms-interoperability",
    "name": "LMS content and tool interoperability",
    "problem": "The LMS works until every course is actually built in it.",
    "why": "Course packages, tool launches, roster provisioning and grade passback each follow a standard that every vendor reads slightly differently. Faculty find the gaps at the start of term, at scale. exekova reproduces against the actual package and platform and carries the fix through review in the same run, so the workaround does not become the process.",
    "pressure": "Faculty find these at the start of term, at scale, and the workaround is always manual.",
    "arrives": "The platform version, the standards in scope and sample packages that fail. The platform reproduces rather than asking for a reproduction.",
    "runs": [
      {
        "stage": "Plan",
        "text": "the failure is reproduced against the actual course package and platform version, and the expected launch, roster and grade behaviour becomes the standard."
      },
      {
        "stage": "Assemble",
        "text": "tracing, correction and the regression case are one unit of work rather than a ticket per team."
      },
      {
        "stage": "Execute",
        "text": "the cause is traced to packaging, tool launch, roster provisioning or grade passback and corrected on an isolated branch."
      },
      {
        "stage": "Review",
        "text": "an independent capability reviews the change before the course launch is re-run."
      },
      {
        "stage": "Accept",
        "text": "the affected launches are re-run and a regression case for that package or tool must pass."
      }
    ],
    "returns": [
      "A reviewed change with a regression case per package or tool that failed.",
      "Launch, roster and grade-passback results for the sample courses, in one record.",
      "Behaviour that belongs to the vendor, reported rather than worked around in your code."
    ],
    "keeps": [
      "Which tools are approved",
      "Academic content decisions",
      "Term rollout"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "industry",
      "key": "education",
      "name": "Education",
      "icon": "graduation",
      "href": "/industries/education"
    },
    "title": "LMS content and tool interoperability - Education use case",
    "description": "The LMS works until every course is actually built in it. See how exekova runs it: plan, execute, independent review, accepted result."
  },
  {
    "id": "partner-onboarding",
    "slug": "logistics-partner-onboarding",
    "name": "Carrier and partner onboarding",
    "problem": "Every new carrier is a new integration with its own idea of a standard.",
    "why": "Each partner brings a different file format, field set, status vocabulary and error behaviour, and the commercial deal is already done. Onboarding is mapping, transformation and exception handling that has to be tested against messy real data. exekova runs the whole onboarding as one piece of work, so a lane starts when the deal says it should.",
    "pressure": "The commercial deal is already done. Every week of integration is a week the lane is not running.",
    "arrives": "The partner specification, sample files or endpoints, and the acceptance standard for a completed onboarding.",
    "runs": [
      {
        "stage": "Plan",
        "text": "the partner's fields and status vocabulary are mapped onto your canonical model, and the acceptance standard is attached."
      },
      {
        "stage": "Assemble",
        "text": "mapping, exception handling and testing are one run rather than a sequence of handovers."
      },
      {
        "stage": "Execute",
        "text": "the transformation and exception handling are implemented on an isolated branch."
      },
      {
        "stage": "Review",
        "text": "the integration is routed to an independent review before any partner test."
      },
      {
        "stage": "Accept",
        "text": "it is tested against real sample data including malformed and late messages, and acceptance requires those cases to hold."
      }
    ],
    "returns": [
      "A reviewed integration with its mapping documented alongside it.",
      "Test results across well-formed, malformed and late messages, in one record.",
      "Partner behaviours needing a commercial decision, escalated rather than absorbed."
    ],
    "keeps": [
      "Commercial terms",
      "Which partners you onboard",
      "Go-live with the partner"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "industry",
      "key": "logistics",
      "name": "Logistics & supply chain",
      "icon": "truck",
      "href": "/industries/logistics"
    },
    "title": "Carrier and partner onboarding - Logistics",
    "description": "Every new carrier is a new integration with its own idea of a standard."
  },
  {
    "id": "event-accuracy",
    "slug": "logistics-event-accuracy",
    "name": "Tracking event accuracy",
    "problem": "Tracking says one thing and the shipment is doing another.",
    "why": "Milestone events arrive late, out of order or duplicated from dozens of sources, and each mismatch class needs replaying against real streams. That replay is what nobody has time for. exekova replays, diagnoses, corrects and guards inside one run, which is how a class stops recurring.",
    "pressure": "Inaccurate tracking drives support volume and erodes exactly the service promise the lane was sold on.",
    "arrives": "A mismatch class with sample shipment identifiers and the expected milestone sequence.",
    "runs": [
      {
        "stage": "Plan",
        "text": "the raw event stream is replayed for the sample shipments and the expected sequence becomes the standard."
      },
      {
        "stage": "Assemble",
        "text": "diagnosis, correction and the regression case are treated as one unit."
      },
      {
        "stage": "Execute",
        "text": "whether the cause is ordering, duplication or mapping, the logic is corrected on an isolated branch."
      },
      {
        "stage": "Review",
        "text": "an independent capability reviews the change against the replayed stream."
      },
      {
        "stage": "Accept",
        "text": "the replay is re-run and a regression case named for that mismatch class must pass."
      }
    ],
    "returns": [
      "A reviewed change with a regression case named per mismatch class.",
      "Before and after milestone sequences for the sample shipments, in one record.",
      "Mismatches caused by the source partner, reported rather than corrected downstream."
    ],
    "keeps": [
      "Customer communication",
      "Service-level commitments",
      "Partner escalation"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "industry",
      "key": "logistics",
      "name": "Logistics & supply chain",
      "icon": "truck",
      "href": "/industries/logistics"
    },
    "title": "Tracking event accuracy - Logistics & supply chain use case",
    "description": "Tracking says one thing and the shipment is doing another. See how exekova runs it: plan, execute, independent review, accepted result."
  },
  {
    "id": "market-messaging",
    "slug": "energy-market-messaging",
    "name": "Market and settlement messaging",
    "problem": "Market message formats change on the market operator’s timetable.",
    "why": "Registration, switching and settlement messaging is governed by published formats with mandated go-live dates. The work is mapping and validation across many message types, each with its own operator test pack result to keep. exekova runs every message type through the same platform and holds one evidence record for the whole change window.",
    "pressure": "Missing a market change window means failed messages and exception handling that lands on operations, not engineering.",
    "arrives": "The market change specification and the operator test pack. You state what a passing message set looks like.",
    "runs": [
      {
        "stage": "Plan",
        "text": "the new format is diffed against current mapping and validation, and each message type becomes a unit with its own standard."
      },
      {
        "stage": "Assemble",
        "text": "the platform sequences message types, running independent ones together rather than serially through one engineer."
      },
      {
        "stage": "Execute",
        "text": "changes are implemented message type by message type on isolated branches."
      },
      {
        "stage": "Review",
        "text": "each change passes an independent review before the market window."
      },
      {
        "stage": "Accept",
        "text": "the operator test pack runs and every rejection is captured, and acceptance requires a passing result for that message type."
      }
    ],
    "returns": [
      "Reviewed changes with the operator test-pack results attached to each.",
      "Rejection analysis for any message type that did not pass, kept in the same record.",
      "Specification ambiguities raised with the operator rather than assumed."
    ],
    "keeps": [
      "Market entry decisions",
      "Regulatory correspondence",
      "Go-live timing"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "industry",
      "key": "energy",
      "name": "Energy & utilities",
      "icon": "bolt",
      "href": "/industries/energy"
    },
    "title": "Market and settlement messaging - Energy",
    "description": "Market message formats change on the operator’s timetable. See how exekova delivers conformant changes with retained test evidence before the cutover."
  },
  {
    "id": "telemetry-quality",
    "slug": "energy-telemetry-quality",
    "name": "Telemetry and meter data quality",
    "problem": "Field data arrives incomplete and the downstream processes assume it did not.",
    "why": "Gaps, duplicates, clock drift and out-of-range readings flow straight into billing, forecasting and reporting. Each quality class needs a rule, a historical replay and a review before it can touch billing. exekova owns that chain end to end, which is what makes a rule safe to apply to money.",
    "pressure": "Bad readings become incorrect bills or incorrect settlement positions, both of which are corrected in public.",
    "arrives": "The data-quality class and sample device streams. The platform reproduces the class against them itself.",
    "runs": [
      {
        "stage": "Plan",
        "text": "the quality class is reproduced against the sample streams and the validation or estimation rule that should apply becomes the standard."
      },
      {
        "stage": "Assemble",
        "text": "rule implementation, historical replay and review are sequenced as one run."
      },
      {
        "stage": "Execute",
        "text": "the validation, estimation or rejection rule is implemented on an isolated branch."
      },
      {
        "stage": "Review",
        "text": "the change is held at an independent review before it can reach billing."
      },
      {
        "stage": "Accept",
        "text": "the rule is tested against historical streams including known bad periods, and acceptance requires that replay to hold."
      }
    ],
    "returns": [
      "A reviewed rule per data-quality class, with its test evidence attached.",
      "Historical replay showing the effect on a known bad period, in one record.",
      "Classes that need a commercial or regulatory rule, escalated rather than decided."
    ],
    "keeps": [
      "Estimation policy",
      "Billing and settlement treatment",
      "Customer remediation"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "industry",
      "key": "energy",
      "name": "Energy & utilities",
      "icon": "bolt",
      "href": "/industries/energy"
    },
    "title": "Telemetry and meter data quality - Energy & utilities",
    "description": "Field data arrives incomplete and the downstream processes assume it did not. See how exekova runs it: plan, execute, independent review, accepted result."
  },
  {
    "id": "line-integration",
    "slug": "manufacturing-line-integration",
    "name": "Line and system integration",
    "problem": "A new line or machine has to talk to systems that were never designed for it.",
    "why": "Protocol differences, tag mappings and unit mismatches between equipment, historian and planning systems are each small and together substantial, and commissioning time is scheduled production time. exekova runs mapping, implementation, fault testing and review as one piece of work against the rig, so the line starts when the schedule says.",
    "pressure": "Commissioning time is scheduled production time. Integration work that slips pushes the line start, not the sprint.",
    "arrives": "The equipment interface documentation, tag lists and a test rig or emulation, with the acceptance standard for each mapping.",
    "runs": [
      {
        "stage": "Plan",
        "text": "equipment tags, units and states are mapped onto the plant model, and each interface becomes a unit with its own standard."
      },
      {
        "stage": "Assemble",
        "text": "the platform sequences interfaces and runs independent ones together rather than serially through commissioning."
      },
      {
        "stage": "Execute",
        "text": "the integration is implemented against the rig or emulated equipment on an isolated branch."
      },
      {
        "stage": "Review",
        "text": "each integration passes an independent review before commissioning."
      },
      {
        "stage": "Accept",
        "text": "normal running, fault states, restarts and loss of connection are all tested, and acceptance requires the fault paths to hold, not just the happy one."
      }
    ],
    "returns": [
      "A reviewed integration per interface with its tag mapping recorded.",
      "Test evidence including fault and reconnection behaviour, in one record.",
      "Behaviour that differs from the vendor document, reported rather than accommodated silently."
    ],
    "keeps": [
      "Commissioning sign-off",
      "Safety approvals",
      "Production schedule"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "industry",
      "key": "manufacturing",
      "name": "Manufacturing",
      "icon": "factory",
      "href": "/industries/manufacturing"
    },
    "title": "Line and system integration - Manufacturing",
    "description": "A new line or machine has to talk to systems that were never designed for it."
  },
  {
    "id": "traceability",
    "slug": "manufacturing-traceability",
    "name": "Traceability and genealogy records",
    "problem": "Traceability has to hold across every system a part passes through.",
    "why": "Lot, batch and serial genealogy is assembled from several systems with their own identifiers and timing, and gaps only surface during a recall investigation. Reconstructing a chain means touching every system at once. exekova does that in one run, which is the only way to find a break before a recall does.",
    "pressure": "A traceability gap found during a recall widens the recall. That is the whole cost of the gap.",
    "arrives": "The genealogy chain in scope, sample lots that break it and the completeness standard the audit applies.",
    "runs": [
      {
        "stage": "Plan",
        "text": "the chain is reconstructed for the sample lots across every system, and the audit's completeness standard is attached."
      },
      {
        "stage": "Assemble",
        "text": "the platform reaches each system through its own connection rather than a person exporting from each in turn."
      },
      {
        "stage": "Execute",
        "text": "where identifiers, timing or transformations break the chain, the reconciliation is implemented on an isolated branch."
      },
      {
        "stage": "Review",
        "text": "the change is held at an independent review with the reconstruction attached."
      },
      {
        "stage": "Accept",
        "text": "regression cases for each break class must pass before the item is accepted."
      }
    ],
    "returns": [
      "Reviewed changes with a regression case per break class.",
      "Reconstructed genealogy for the sample lots, before and after, in one record.",
      "Breaks that are a process gap rather than a system gap, named as such."
    ],
    "keeps": [
      "Recall decisions",
      "Quality system ownership",
      "Audit response"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "industry",
      "key": "manufacturing",
      "name": "Manufacturing",
      "icon": "factory",
      "href": "/industries/manufacturing"
    },
    "title": "Traceability and genealogy records - Manufacturing use case",
    "description": "Traceability has to hold across every system a part passes through. See how exekova runs it: plan, execute, independent review, accepted result."
  },
  {
    "id": "regression-debt",
    "slug": "regression-debt",
    "name": "Regression coverage that decays",
    "problem": "The regression suite is trusted more than it deserves.",
    "why": "Test suites drift away from what the product now does: cases that pass without asserting anything, cases that test a behaviour that changed, and gaps nobody has mapped. Auditing the suite, rewriting it and proving the rewrite is honest work that never wins against a roadmap. exekova runs the audit and the rewrite as one piece of work, so the suite catches up instead of decaying.",
    "pressure": "A suite nobody trusts gets overridden at release time, which is the moment it exists for.",
    "arrives": "The suite in scope and the current acceptance criteria it is meant to enforce. You state what the tests should prove; the platform finds where they do not.",
    "runs": [
      {
        "stage": "Plan",
        "text": "existing cases are mapped against current acceptance criteria and every gap is recorded as its own unit of work."
      },
      {
        "stage": "Assemble",
        "text": "audit, rewrite and verification are sequenced as one run rather than a review followed by a separate rewrite project."
      },
      {
        "stage": "Execute",
        "text": "cases that no longer test what they claim are rewritten or retired on an isolated branch."
      },
      {
        "stage": "Review",
        "text": "an independent capability reviews the changes, never the one that wrote them."
      },
      {
        "stage": "Accept",
        "text": "the rewritten cases must fail against a deliberately broken build before they are accepted, because a test that cannot fail proves nothing."
      }
    ],
    "returns": [
      "A reviewed suite where each case states the criterion it enforces.",
      "The gap list, with cases retired and the reason recorded, in one record.",
      "Criteria that no test can express, raised as a decision rather than left uncovered."
    ],
    "keeps": [
      "Release go or no-go",
      "What the acceptance criteria are",
      "Environment access"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "cross",
      "key": "cross-industry",
      "name": "Cross-industry",
      "icon": "layers",
      "href": "/industries"
    },
    "title": "Regression coverage that decays - Cross-industry use case",
    "description": "The regression suite is trusted more than it deserves. See how exekova runs it: plan, execute, independent review, accepted result."
  },
  {
    "id": "dependency-remediation",
    "slug": "dependency-remediation",
    "name": "Dependency and CVE remediation",
    "problem": "The advisory list grows faster than anyone upgrades.",
    "why": "Advisories arrive faster than they are cleared, and each upgrade risks a breaking change somewhere in the estate. Grouping them, upgrading service by service and proving nothing regressed needs someone holding the whole picture. exekova holds it, running each service as a unit of the same piece of work.",
    "pressure": "The backlog is visible to your auditors, your customers and anyone scanning your estate.",
    "arrives": "The advisories in scope and the services they affect. The platform groups them by the upgrade each one requires.",
    "runs": [
      {
        "stage": "Plan",
        "text": "advisories are grouped by service and by the upgrade each one requires, so one upgrade closes several at once."
      },
      {
        "stage": "Assemble",
        "text": "the platform sequences services, running independent ones together and holding dependent ones until their predecessor is accepted."
      },
      {
        "stage": "Execute",
        "text": "upgrades are applied service by service on isolated branches, with breaking changes fixed as they appear."
      },
      {
        "stage": "Review",
        "text": "each service's change is reviewed independently rather than as one estate-wide commit."
      },
      {
        "stage": "Accept",
        "text": "the regression suite must pass per service, and the advisory must no longer apply, before that service is accepted."
      }
    ],
    "returns": [
      "One reviewed change per service, each with its regression result attached.",
      "The advisories closed by each upgrade, recorded against the run.",
      "Upgrades that cannot be applied without a decision, escalated rather than forced."
    ],
    "keeps": [
      "Risk acceptance",
      "Upgrade policy",
      "Production deploy approval"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "cross",
      "key": "cross-industry",
      "name": "Cross-industry",
      "icon": "layers",
      "href": "/industries"
    },
    "title": "Dependency and CVE remediation - Cross-industry use case",
    "description": "The advisory list grows faster than anyone upgrades. See how exekova runs it: plan, execute, independent review, accepted result."
  },
  {
    "id": "ready-tickets",
    "slug": "engineering-ready-tickets",
    "name": "Specified work that never starts",
    "problem": "Tickets are well specified, agreed and sitting untouched behind whatever is louder.",
    "why": "The work is not blocked on thinking. It is blocked on nobody having a clear week to pick it up, and every week the tracker gains more of it. Estimating it again does not move it. exekova takes the ticket as it stands and returns a reviewed change, so the queue drains on its own rather than waiting for capacity that never appears.",
    "pressure": "A ticket that has been ready for a quarter is not a backlog item any more. It is a commitment somebody made to someone outside the team.",
    "arrives": "The ticket and the repository it belongs to, with the acceptance criteria already on it. You hand over the objective and the standard for a passing change, not a task breakdown.",
    "runs": [
      {
        "stage": "Plan",
        "text": "the ticket is read against the repository it targets, and its acceptance criteria become the bar the change is measured against."
      },
      {
        "stage": "Assemble",
        "text": "implementation, tests and review are sequenced as one unit of work rather than three tickets waiting on each other."
      },
      {
        "stage": "Execute",
        "text": "the change is implemented on an isolated branch, inside the systems and permissions you granted."
      },
      {
        "stage": "Review",
        "text": "a separate capability, never the one that wrote the change, reviews it against the criteria on the ticket."
      },
      {
        "stage": "Accept",
        "text": "the required tests must pass against the exact revision produced before the change is offered for your release decision."
      }
    ],
    "returns": [
      "A reviewable pull request with its test results attached.",
      "The reviewing capability recorded against the change, separate from the one that wrote it.",
      "Tickets whose criteria turn out to be ambiguous, raised as a question rather than guessed at."
    ],
    "keeps": [
      "Merge and release timing",
      "Which tickets enter the queue",
      "Architectural direction"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "function",
      "key": "engineering",
      "name": "Engineering",
      "icon": "code",
      "href": "/solutions/engineering"
    },
    "title": "Specified work that never starts - Engineering use case",
    "description": "Tickets are well specified, agreed and sitting untouched behind whatever is louder. Plan, execute, independent review, accepted result."
  },
  {
    "id": "flaky-pipeline",
    "slug": "engineering-flaky-pipeline",
    "name": "A pipeline the team re-runs",
    "problem": "The build fails often enough that a red result no longer stops anyone.",
    "why": "Each failure is individually cheap to re-run and collectively expensive: the signal is gone, and a real regression now looks like the usual noise. Finding which tests are actually unstable, and why, is a week nobody has. exekova runs that investigation as work, isolating the unstable cases and proving the fix instead of muting them.",
    "pressure": "A suite nobody trusts is a gate that is already open. The next real defect passes through it unremarked.",
    "arrives": "The pipeline and its recent run history. The platform identifies which failures are order-dependent, timing-dependent or environment-dependent itself.",
    "runs": [
      {
        "stage": "Plan",
        "text": "recent failures are grouped by cause rather than by test, so one fix can close a whole class of them."
      },
      {
        "stage": "Assemble",
        "text": "diagnosis, fix and proof are one run, rather than an investigation ticket that hands off to a fix ticket."
      },
      {
        "stage": "Execute",
        "text": "each cause is fixed on an isolated branch and the affected cases are run repeatedly to show the instability is gone."
      },
      {
        "stage": "Review",
        "text": "an independent capability reviews the fix, because a test quietened rather than fixed looks identical from the outside."
      },
      {
        "stage": "Accept",
        "text": "a fixed case must pass repeatedly and still fail against a deliberately broken build, or it is not accepted."
      }
    ],
    "returns": [
      "A reviewed fix per cause, with the repeated run results attached.",
      "Cases retired or quarantined, each with the reason recorded in the same record.",
      "Instability that comes from the environment rather than the test, raised as a decision for you."
    ],
    "keeps": [
      "Which tests are allowed to gate a release",
      "Environment and runner budget",
      "Quarantine policy"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "function",
      "key": "engineering",
      "name": "Engineering",
      "icon": "code",
      "href": "/solutions/engineering"
    },
    "title": "A pipeline the team re-runs - Engineering use case",
    "description": "The build fails often enough that a red result no longer stops anyone. See how exekova runs it: plan, execute, independent review, accepted result."
  },
  {
    "id": "api-migration",
    "slug": "engineering-api-migration",
    "name": "An internal change every caller must follow",
    "problem": "An internal interface has to change, and every caller across the estate has to move with it.",
    "why": "The change itself is small. Finding every caller, updating each one in its own repository and proving none of them broke is the part that spans months and never finishes, so the old interface stays alive beside the new one. exekova runs each caller as its own unit of the same piece of work, so the migration completes rather than stalls halfway.",
    "pressure": "A half-finished migration is worse than neither version: two paths to maintain, and the deprecation date already passed.",
    "arrives": "The interface change and the repositories in scope. The platform finds the callers itself rather than working from a list that is already out of date.",
    "runs": [
      {
        "stage": "Plan",
        "text": "callers are found across the repositories in scope and grouped by the kind of change each one needs."
      },
      {
        "stage": "Assemble",
        "text": "the platform sequences them, running independent callers together and holding dependent ones until their predecessor is accepted."
      },
      {
        "stage": "Execute",
        "text": "each caller is updated on its own isolated branch, with the breakages that surface fixed as they appear."
      },
      {
        "stage": "Review",
        "text": "each change is reviewed independently rather than as one estate-wide commit nobody can read."
      },
      {
        "stage": "Accept",
        "text": "each caller's own tests must pass, and the old interface must no longer be referenced, before that caller is accepted."
      }
    ],
    "returns": [
      "One reviewed change per caller, each with its own test result.",
      "The callers still on the old interface, named rather than estimated.",
      "Callers that cannot move without a decision you have not delegated, escalated rather than forced."
    ],
    "keeps": [
      "The deprecation date",
      "Which callers are in scope",
      "Rollout and merge order"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "function",
      "key": "engineering",
      "name": "Engineering",
      "icon": "code",
      "href": "/solutions/engineering"
    },
    "title": "An internal change every caller must follow - Engineering",
    "description": "An internal interface has to change, and every caller across the estate has to move with it. Plan, execute, independent review, accepted result."
  },
  {
    "id": "thin-tickets",
    "slug": "product-thin-tickets",
    "name": "Tickets too thin to start",
    "problem": "Tickets reach the team without the context needed to pick them up.",
    "why": "The information exists, spread across the tracker, the documents and the systems the feature touches, and gathering it is an hour per ticket that competes with writing the next one. So tickets bounce back, or worse, get started on an assumption. exekova gathers that context against your connected systems and returns the ticket enriched and ready for your review.",
    "pressure": "A ticket that bounces back has already cost a planning session, and it bounces at the point where the team had capacity for it.",
    "arrives": "The thin ticket and the systems the platform may read for context. You set the template a ready ticket has to meet.",
    "runs": [
      {
        "stage": "Plan",
        "text": "the ticket is read against your connected systems and the gaps between it and your template are listed."
      },
      {
        "stage": "Assemble",
        "text": "context gathering, drafting and review are one run rather than a question thread that waits on replies."
      },
      {
        "stage": "Execute",
        "text": "the missing context is gathered and the ticket is drafted up to your template, with sources retained."
      },
      {
        "stage": "Review",
        "text": "an independent capability checks the enriched ticket against the template, never the one that drafted it."
      },
      {
        "stage": "Accept",
        "text": "the ticket is only offered for product review once it meets the template; where it cannot, the gap is named."
      }
    ],
    "returns": [
      "A ticket enriched to your template, with the source of each addition attached.",
      "The questions that context could not answer, raised as questions rather than filled in.",
      "Acceptance criteria drafted for your approval, never treated as agreed."
    ],
    "keeps": [
      "Whether the ticket becomes committed scope",
      "Priority and sequencing",
      "The acceptance criteria themselves"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "function",
      "key": "product",
      "name": "Product",
      "icon": "file",
      "href": "/solutions/product"
    },
    "title": "Tickets too thin to start - Product use case",
    "description": "Tickets reach the team without the context needed to pick them up. See how exekova runs it: plan, execute, independent review, accepted result."
  },
  {
    "id": "competitive-scan",
    "slug": "product-competitive-scan",
    "name": "A market scan that is always out of date",
    "problem": "The competitive picture is refreshed when someone finds the time, which is to say rarely.",
    "why": "Each scan is a day of gathering and a day of structuring, and because the structure differs each time, this quarter's cannot be compared with last quarter's. The result is a document read once. exekova runs the scan on a cadence against one structure, so the output is comparable over time rather than a fresh impression each round.",
    "pressure": "Pricing and positioning decisions get made against whatever the last scan said, however old that is.",
    "arrives": "The brief, the sources the platform may use, and the structure the output has to follow. The cadence is yours to set.",
    "runs": [
      {
        "stage": "Plan",
        "text": "the brief becomes the structure the scan must fill, so successive runs stay comparable."
      },
      {
        "stage": "Assemble",
        "text": "gathering, synthesis and review run as one scheduled unit rather than a task somebody remembers."
      },
      {
        "stage": "Execute",
        "text": "material is collected from the sources you permitted, with provenance retained against each claim."
      },
      {
        "stage": "Review",
        "text": "an independent capability checks each material claim against the retained source before the scan advances."
      },
      {
        "stage": "Accept",
        "text": "a scan is accepted only when every material claim traces to a source and the uncertain ones are still marked uncertain."
      }
    ],
    "returns": [
      "A synthesis in your structure, with each claim traceable to its source.",
      "What changed since the previous run, rather than a document to re-read in full.",
      "Claims the sources do not support, marked as uncertain rather than smoothed over."
    ],
    "keeps": [
      "Which sources are permitted",
      "What the findings mean for strategy",
      "The cadence"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "function",
      "key": "product",
      "name": "Product",
      "icon": "file",
      "href": "/solutions/product"
    },
    "title": "A market scan that is always out of date - Product use case",
    "description": "The competitive picture is refreshed when someone finds the time, which is to say rarely. Plan, execute, independent review, accepted result."
  },
  {
    "id": "spec-backlog",
    "slug": "product-spec-backlog",
    "name": "Decisions waiting on a spec",
    "problem": "A decision cannot be taken because the specification behind it has not been written.",
    "why": "Writing it means reconciling what the systems do now with what was agreed in three different places, and the person who can do that is the person whose week is already committed. So the decision slips, quietly, to the next review. exekova drafts against your template and routes it through review, so what reaches the decision is a draft rather than an empty slot.",
    "pressure": "The decision has a date. The specification not existing does not move it; it just means the decision is taken on less.",
    "arrives": "The open question, your specification template and the systems the platform may read. You keep sign-off on scope.",
    "runs": [
      {
        "stage": "Plan",
        "text": "the question is mapped against what the connected systems currently do, and the gaps become the spec's open points."
      },
      {
        "stage": "Assemble",
        "text": "research, drafting and review are one run rather than a draft that waits in someone's queue."
      },
      {
        "stage": "Execute",
        "text": "the specification is drafted against your template, with the evidence behind each statement retained."
      },
      {
        "stage": "Review",
        "text": "an independent capability reviews the draft against the template and the evidence, never the one that wrote it."
      },
      {
        "stage": "Accept",
        "text": "the draft is only offered for product review when scope, evidence and acceptance criteria are all present."
      }
    ],
    "returns": [
      "A decision-ready specification against your template.",
      "The open points the evidence cannot settle, listed as decisions rather than assumptions.",
      "The evidence behind each statement, kept with the draft."
    ],
    "keeps": [
      "The decision itself",
      "What becomes committed scope",
      "Trade-offs between options"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "function",
      "key": "product",
      "name": "Product",
      "icon": "file",
      "href": "/solutions/product"
    },
    "title": "Decisions waiting on a spec - Product use case",
    "description": "A decision cannot be taken because the specification behind it has not been written. Plan, execute, independent review, accepted result."
  },
  {
    "id": "untested-releases",
    "slug": "qa-untested-releases",
    "name": "Work shipped without a stated verdict",
    "problem": "Changes reach release with testing that was compressed rather than completed.",
    "why": "Testing is the stage nearest the deadline, so it absorbs every slip upstream, and what gets cut is invisible until something breaks. Nobody records what was not tested. exekova makes the verdict part of the run rather than a phase at the end, so a change carries either evidence or an explicit gap.",
    "pressure": "Compression is only free until the release where it was not. By then nobody can say what was skipped.",
    "arrives": "The change and the acceptance criteria attached to it. The platform derives the cases from the criteria rather than from a separate plan.",
    "runs": [
      {
        "stage": "Plan",
        "text": "test cases are derived from the acceptance criteria on the work itself, not invented alongside it."
      },
      {
        "stage": "Assemble",
        "text": "design, execution and triage are one run, so a verdict is never separated from the evidence behind it."
      },
      {
        "stage": "Execute",
        "text": "the cases run against your connected environments, with the results captured as evidence rather than summarised."
      },
      {
        "stage": "Review",
        "text": "the capability that tests is never the one that built the thing tested, and the review checks the verdict against the artefacts."
      },
      {
        "stage": "Accept",
        "text": "a pass must carry the artefact that justifies it; a criterion with no case is reported as uncovered rather than passed."
      }
    ],
    "returns": [
      "A verdict backed by the test evidence that produced it.",
      "Criteria that carried no test, named rather than left to be assumed covered.",
      "Failures diagnosed and routed, rather than queued for someone to investigate."
    ],
    "keeps": [
      "Whether to release",
      "Which criteria gate the release",
      "Environment access"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "function",
      "key": "qa",
      "name": "QA",
      "icon": "flask",
      "href": "/solutions/qa"
    },
    "title": "Work shipped without a stated verdict - QA use case",
    "description": "Changes reach release with testing that was compressed rather than completed. See how exekova runs it: plan, execute, independent review, accepted result."
  },
  {
    "id": "manual-regression-pass",
    "slug": "qa-manual-regression-pass",
    "name": "A regression pass done by hand",
    "problem": "A person walks the same paths by hand before every release.",
    "why": "It is the same route each time, it takes most of a day, and it is the first thing shortened when the release moves. Automating it has been on the list for as long as the list has existed. exekova converts the pass into executable cases and runs it as a gate, with the cases proved honest before they are trusted.",
    "pressure": "The manual pass is the only thing standing between a compressed release and the paths nobody else checks.",
    "arrives": "The manual script and the environments it is walked against. You state what a passing run has to show.",
    "runs": [
      {
        "stage": "Plan",
        "text": "the manual script is mapped into cases, each tied to the behaviour it is meant to prove."
      },
      {
        "stage": "Assemble",
        "text": "conversion, execution and verification are one run rather than an automation project that outlives the need for it."
      },
      {
        "stage": "Execute",
        "text": "the cases are implemented and run against your connected environments, with results captured as evidence."
      },
      {
        "stage": "Review",
        "text": "an independent capability reviews the cases against the original script, never the one that wrote them."
      },
      {
        "stage": "Accept",
        "text": "each case must fail against a deliberately broken build before it is accepted, because a case that cannot fail proves nothing."
      }
    ],
    "returns": [
      "An executable pass with each case tied to the behaviour it proves.",
      "Steps in the manual script that no case can express, raised rather than dropped.",
      "The evidence from the first full automated run, kept beside the manual one it replaces."
    ],
    "keeps": [
      "Whether the automated pass replaces the manual one",
      "Which paths must stay manual",
      "Release gating"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "function",
      "key": "qa",
      "name": "QA",
      "icon": "flask",
      "href": "/solutions/qa"
    },
    "title": "A regression pass done by hand - QA use case",
    "description": "A person walks the same paths by hand before every release. See how exekova runs it: plan, execute, independent review, accepted result."
  },
  {
    "id": "defect-reproduction",
    "slug": "qa-defect-reproduction",
    "name": "Defects nobody can reproduce",
    "problem": "A defect is reported, cannot be reproduced on demand, and goes back to the reporter.",
    "why": "Reproduction needs the data, the sequence and the environment lined up at once, and reconstructing that is slower than the next ticket, so the report is closed as unreproducible and arrives again next month. exekova runs the reconstruction as work, and a defect is only closed when the reproduction it was reported with no longer succeeds.",
    "pressure": "A defect closed as unreproducible has not gone anywhere. It is still in the product, and it returns with an angrier reporter.",
    "arrives": "The report as it was filed and access to an environment the platform may reconstruct state in. You set the boundaries it works inside.",
    "runs": [
      {
        "stage": "Plan",
        "text": "the report is turned into a candidate sequence, with the data and environment conditions it depends on."
      },
      {
        "stage": "Assemble",
        "text": "reconstruction, fix and proof are one run, so the reproduction is never lost between tickets."
      },
      {
        "stage": "Execute",
        "text": "the sequence is executed against a reconstructed environment until the defect reproduces or the candidates are exhausted."
      },
      {
        "stage": "Review",
        "text": "an independent capability reviews the reproduction and the fix, never the one that produced them."
      },
      {
        "stage": "Accept",
        "text": "the defect is closed only when the recorded reproduction no longer succeeds against the fixed revision."
      }
    ],
    "returns": [
      "A recorded reproduction, or a statement of what was tried and ruled out.",
      "The fix with the reproduction re-run against it in the same record.",
      "Reports the environment cannot reconstruct, named so the gap can be closed."
    ],
    "keeps": [
      "Environment and data access",
      "Severity and priority",
      "What is communicated to the reporter"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "function",
      "key": "qa",
      "name": "QA",
      "icon": "flask",
      "href": "/solutions/qa"
    },
    "title": "Defects nobody can reproduce - QA use case",
    "description": "A defect is reported, cannot be reproduced on demand, and goes back to the reporter. Plan, execute, independent review, accepted result."
  },
  {
    "id": "unsourced-synthesis",
    "slug": "research-unsourced-synthesis",
    "name": "A summary nobody can check",
    "problem": "A synthesis reads well and no reader can tell which parts are supported.",
    "why": "Output is easy to produce and expensive to verify, so verification does not happen and the confident sentence and the guess look identical on the page. exekova retains the material behind each claim and has a separate capability check the claims against it, so a reader can verify rather than trust.",
    "pressure": "An unsupported claim is only free until it reaches a slide someone acts on.",
    "arrives": "The brief, the sources the platform may use and the structure the output must follow. You set what counts as a supported claim.",
    "runs": [
      {
        "stage": "Plan",
        "text": "the brief becomes the structure and the standard of evidence each claim in it must meet."
      },
      {
        "stage": "Assemble",
        "text": "gathering, synthesis and the claim check are one run rather than a draft that is verified later, or never."
      },
      {
        "stage": "Execute",
        "text": "material is gathered from the permitted sources with provenance retained against every claim it supports."
      },
      {
        "stage": "Review",
        "text": "a separate capability, never the one that wrote the synthesis, checks each claim against the retained material."
      },
      {
        "stage": "Accept",
        "text": "a synthesis is accepted only when every material claim traces to a source and the unsupported ones are marked as uncertain."
      }
    ],
    "returns": [
      "A synthesis with the material behind each claim attached.",
      "Claims the sources did not support, marked uncertain rather than removed quietly.",
      "The questions the permitted sources cannot answer, stated as gaps."
    ],
    "keeps": [
      "Which sources are permitted",
      "What the findings mean",
      "Whether a finding is treated as settled"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "function",
      "key": "research",
      "name": "Research",
      "icon": "search",
      "href": "/solutions/research"
    },
    "title": "A summary nobody can check - Research use case",
    "description": "A synthesis reads well and no reader can tell which parts are supported. See how exekova runs it: plan, execute, independent review, accepted result."
  },
  {
    "id": "recurring-scan",
    "slug": "research-recurring-scan",
    "name": "A scan that happens when someone has an afternoon",
    "problem": "A landscape needs watching, and it is watched whenever somebody happens to have the time.",
    "why": "Irregular scans cannot be compared, so each one starts from scratch and reads as an impression rather than a trend. The value was in the series, and the series never forms. exekova runs it on your cadence against one structure, so successive runs answer the same questions the same way.",
    "pressure": "By the time an irregular scan notices a change, the change has usually already been priced in by somebody else.",
    "arrives": "The brief, the cadence and the permitted sources. The structure stays fixed so runs stay comparable.",
    "runs": [
      {
        "stage": "Plan",
        "text": "the brief fixes the questions every run must answer, so this run can be set against the last."
      },
      {
        "stage": "Assemble",
        "text": "gathering, synthesis and review run as one scheduled unit rather than a reminder somebody snoozes."
      },
      {
        "stage": "Execute",
        "text": "material is gathered from the permitted sources on your cadence, with provenance retained."
      },
      {
        "stage": "Review",
        "text": "an independent capability checks the claims against the retained material before the run advances."
      },
      {
        "stage": "Accept",
        "text": "a run is accepted only when it answers every question in the brief, including the ones whose answer is unchanged."
      }
    ],
    "returns": [
      "A run in the same structure as the last, so the two can be read together.",
      "What changed since the previous run, separated from what did not.",
      "Questions the sources could not answer this time, named rather than skipped."
    ],
    "keeps": [
      "The cadence and the brief",
      "Which sources are permitted",
      "What the trend means for strategy"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "function",
      "key": "research",
      "name": "Research",
      "icon": "search",
      "href": "/solutions/research"
    },
    "title": "A scan that happens when someone has an afternoon - Research",
    "description": "A landscape needs watching, and it is watched whenever somebody happens to have the time. Plan, execute, independent review, accepted result."
  },
  {
    "id": "evidence-for-a-decision",
    "slug": "research-evidence-for-a-decision",
    "name": "A decision waiting on evidence",
    "problem": "A decision has a date, and the evidence it needs has not been gathered.",
    "why": "Gathering it properly means going to the sources rather than to the first summary, and that is days of work landing in the week the decision is due. So the decision gets made on what is already to hand. exekova gathers against the brief and has the claims checked, so what reaches the meeting is evidence rather than recollection.",
    "pressure": "The date does not move. Thin evidence does not delay the decision, it just lowers the quality of it.",
    "arrives": "The decision to be taken, the brief, and the sources the platform may use. You set the standard of evidence you will act on.",
    "runs": [
      {
        "stage": "Plan",
        "text": "the decision is broken into the questions that have to be answered before it can be taken."
      },
      {
        "stage": "Assemble",
        "text": "gathering, synthesis and the claim check are one run, sized against the date rather than against spare time."
      },
      {
        "stage": "Execute",
        "text": "material is gathered from the permitted sources, with provenance retained against each answer."
      },
      {
        "stage": "Review",
        "text": "an independent capability checks every material claim against its source before the pack advances."
      },
      {
        "stage": "Accept",
        "text": "the pack is accepted only when each question is answered or explicitly marked unanswerable within the sources allowed."
      }
    ],
    "returns": [
      "An evidence pack organised by the questions the decision turns on.",
      "The questions the evidence cannot settle, stated plainly rather than hedged.",
      "The material behind each answer, kept with the pack for anyone who wants to check."
    ],
    "keeps": [
      "The decision itself",
      "The standard of evidence you act on",
      "Which sources are permitted"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "function",
      "key": "research",
      "name": "Research",
      "icon": "search",
      "href": "/solutions/research"
    },
    "title": "A decision waiting on evidence - Research use case",
    "description": "A decision has a date, and the evidence it needs has not been gathered. See how exekova runs it: plan, execute, independent review, accepted result."
  },
  {
    "id": "exception-queues",
    "slug": "operations-exception-queues",
    "name": "An exception queue that only grows",
    "problem": "Exceptions arrive faster than anyone works through them, and the oldest are never reached.",
    "why": "Most exceptions are the same handful of causes wearing different reference numbers, and each one still needs a person to open it, work out which, and act. The queue is not hard, it is relentless. exekova diagnoses each exception against your systems and resolves the ones your policy allows, so what reaches a person is the part that genuinely needs judgement.",
    "pressure": "An exception ageing in a queue is usually a customer waiting, and the clock on it is theirs rather than yours.",
    "arrives": "The queue and the rules that say what may be resolved automatically and what must escalate. You set the boundary; the platform works inside it.",
    "runs": [
      {
        "stage": "Plan",
        "text": "exceptions are grouped by diagnosed cause rather than by arrival order, so a single resolution can clear many at once."
      },
      {
        "stage": "Assemble",
        "text": "diagnosis, resolution and the write-back to every affected system are one run rather than three queues."
      },
      {
        "stage": "Execute",
        "text": "eligible exceptions are resolved inside the systems and permissions you granted, and the record updated in each."
      },
      {
        "stage": "Review",
        "text": "an independent capability checks the resolution against your rules before the record is closed."
      },
      {
        "stage": "Accept",
        "text": "an exception is only closed when the underlying condition no longer holds; anything else escalates with its diagnosis attached."
      }
    ],
    "returns": [
      "A reconciled record per exception, with the cause and the action taken on it.",
      "Escalations that arrive with the investigation already done rather than as a fresh ticket.",
      "Causes that keep recurring, named so the fix can be scheduled rather than absorbed."
    ],
    "keeps": [
      "What may be resolved without a person",
      "Customer-facing communication",
      "Escalation thresholds"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "function",
      "key": "operations",
      "name": "Operations",
      "icon": "layers",
      "href": "/solutions/operations"
    },
    "title": "An exception queue that only grows - Operations use case",
    "description": "Exceptions arrive faster than anyone works through them, and the oldest are never reached. Plan, execute, independent review, accepted result."
  },
  {
    "id": "manual-reconciliation",
    "slug": "operations-manual-reconciliation",
    "name": "Two systems that have to agree",
    "problem": "Two systems hold the same facts, they disagree, and someone reconciles them by hand.",
    "why": "The comparison is mechanical and the exceptions are not: each difference needs tracing back to the event that caused it before it can be corrected in the right place. Doing it properly takes longer than the window allows, so it gets done partially. exekova runs the comparison and the tracing as one piece of work, and corrects only where your rules say it may.",
    "pressure": "A reconciliation that slips does not stay a data problem. It becomes a reported figure somebody signs.",
    "arrives": "The two records and the rule that decides which one is authoritative when they differ. The platform finds the differences rather than being handed them.",
    "runs": [
      {
        "stage": "Plan",
        "text": "the two records are compared in full and each difference is traced to the event that produced it."
      },
      {
        "stage": "Assemble",
        "text": "comparison, tracing and correction are one run, so a difference is never closed before its cause is known."
      },
      {
        "stage": "Execute",
        "text": "corrections are applied in whichever system your rule makes wrong, inside the permissions you granted."
      },
      {
        "stage": "Review",
        "text": "an independent capability reviews the corrections against the authority rule before anything is written back."
      },
      {
        "stage": "Accept",
        "text": "the two records must reconcile after the corrections are applied, or the run reports the remainder rather than closing."
      }
    ],
    "returns": [
      "A reconciled operational record with each correction traced to its cause.",
      "Differences that your rules do not cover, raised rather than decided.",
      "The recurring causes behind the differences, named in the same record."
    ],
    "keeps": [
      "Which system is authoritative",
      "Correction limits and thresholds",
      "Sign-off on reported figures"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "function",
      "key": "operations",
      "name": "Operations",
      "icon": "layers",
      "href": "/solutions/operations"
    },
    "title": "Two systems that have to agree - Operations use case",
    "description": "Two systems hold the same facts, they disagree, and someone reconciles them by hand. Plan, execute, independent review, accepted result."
  },
  {
    "id": "recurring-runbook",
    "slug": "operations-recurring-runbook",
    "name": "A runbook someone runs by hand",
    "problem": "A documented process runs on a schedule, and it runs because a person remembers to run it.",
    "why": "It is too varied to script and too routine to hold anyone's attention, so it is done slightly differently each time and the steps that only matter occasionally are the ones that get skipped. exekova runs it against your written standard every time, with the variations handled inside the run rather than improvised.",
    "pressure": "The day the person who knows it is away is the day the skipped step turns out to have mattered.",
    "arrives": "The runbook and the standard a completed run has to meet. You hand over the process, not a script.",
    "runs": [
      {
        "stage": "Plan",
        "text": "the runbook is read into steps with the conditions that decide which ones apply on this run."
      },
      {
        "stage": "Assemble",
        "text": "every step is sequenced as one run, including the ones that only apply occasionally."
      },
      {
        "stage": "Execute",
        "text": "the steps execute against your connected systems, inside the permissions you granted."
      },
      {
        "stage": "Review",
        "text": "an independent capability checks the completed run against the written standard, never the capability that performed it."
      },
      {
        "stage": "Accept",
        "text": "a run is accepted only when every applicable step has completed or named why it did not."
      }
    ],
    "returns": [
      "A completed run recorded step by step against the standard.",
      "Steps that could not complete, with what blocked them rather than a silent omission.",
      "Places where the runbook and the systems no longer agree, raised for you to settle."
    ],
    "keeps": [
      "The schedule and the standard",
      "Which steps require a person",
      "Access the run is given"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "function",
      "key": "operations",
      "name": "Operations",
      "icon": "layers",
      "href": "/solutions/operations"
    },
    "title": "A runbook someone runs by hand - Operations use case",
    "description": "A documented process runs on a schedule, and it runs because a person remembers to run it. Plan, execute, independent review, accepted result."
  },
  {
    "id": "ticket-investigation",
    "slug": "support-ticket-investigation",
    "name": "Tickets answered without being investigated",
    "problem": "A ticket is answered from the knowledge base rather than from what the systems actually show.",
    "why": "Investigating means looking across several systems for one customer, which is slower than replying, and the reply closes the ticket either way. The customer comes back. exekova investigates against your connected systems first, so the reply is built on what happened rather than on what usually happens.",
    "pressure": "A ticket answered without investigation is not resolved, it is deferred, and it returns with the customer's patience already spent.",
    "arrives": "The ticket and the systems the platform may read for that customer. You set what it may act on as opposed to only read.",
    "runs": [
      {
        "stage": "Plan",
        "text": "the ticket is read against the customer's actual state in your connected systems, not against the general case."
      },
      {
        "stage": "Assemble",
        "text": "investigation, resolution and the reply are one run rather than three queues the customer waits behind."
      },
      {
        "stage": "Execute",
        "text": "the cause is established from the systems, and where your policy allows, the resolution is applied inside them."
      },
      {
        "stage": "Review",
        "text": "an independent capability reviews the cause and the customer-facing reply before it is sent, where your policy requires it."
      },
      {
        "stage": "Accept",
        "text": "a ticket is resolved only when the cause is evidenced and the next action is clear; anything else escalates with the investigation attached."
      }
    ],
    "returns": [
      "A reviewed resolution, with the evidence for the cause attached to it.",
      "Escalations that arrive investigated rather than as a fresh ticket for someone else.",
      "Replies held for approval where your policy requires a person to send them."
    ],
    "keeps": [
      "What may be actioned without a person",
      "Refunds, credits and commitments",
      "Tone and what is said to the customer"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "function",
      "key": "support",
      "name": "Support",
      "icon": "users",
      "href": "/solutions/support"
    },
    "title": "Tickets answered without being investigated - Support",
    "description": "A ticket is answered from the knowledge base rather than from what the systems actually show. Plan, execute, independent review, accepted result."
  },
  {
    "id": "defect-handoff",
    "slug": "support-defect-handoff",
    "name": "A support ticket that is really a defect",
    "problem": "Support finds a defect, and the handoff to engineering loses everything that made it reproducible.",
    "why": "The investigation lives in the ticket thread, the bug report is written from memory, and engineering closes it as unreproducible. The loop runs several times before the defect is fixed, if it is. exekova carries the investigation into the engineering work as the same record, so nothing is retyped and nothing is lost.",
    "pressure": "Every round trip is another week the defect is live and another set of customers who hit it.",
    "arrives": "The support ticket with its investigation, and the repository the defect belongs to. The handoff is a routing decision, not a retyping exercise.",
    "runs": [
      {
        "stage": "Plan",
        "text": "the investigation is turned into a reproduction and mapped to the component that owns the behaviour."
      },
      {
        "stage": "Assemble",
        "text": "the support record and the engineering work are assembled as one record rather than two tickets referencing each other."
      },
      {
        "stage": "Execute",
        "text": "the fix is implemented on an isolated branch, with the reproduction from support run against it."
      },
      {
        "stage": "Review",
        "text": "an independent capability reviews the fix against the original reproduction, never the one that wrote the fix."
      },
      {
        "stage": "Accept",
        "text": "the defect is closed only when the reproduction that support recorded no longer succeeds."
      }
    ],
    "returns": [
      "One record spanning the ticket and the fix, with the reproduction in both.",
      "The affected customers identified from the same investigation rather than guessed at.",
      "Defects that need a product decision before they can be fixed, raised rather than sat on."
    ],
    "keeps": [
      "Priority against the roadmap",
      "What affected customers are told",
      "Release timing for the fix"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "function",
      "key": "support",
      "name": "Support",
      "icon": "users",
      "href": "/solutions/support"
    },
    "title": "A support ticket that is really a defect - Support use case",
    "description": "Support finds a defect, and the handoff to engineering loses everything that made it reproducible. Plan, execute, independent review, accepted result."
  },
  {
    "id": "knowledge-decay",
    "slug": "support-knowledge-decay",
    "name": "The same issue investigated from scratch",
    "problem": "A recurring issue is investigated fully each time because the last resolution was never written down.",
    "why": "Writing it up happens after the ticket is closed, which is to say after the pressure is off and the next ticket has arrived, so it does not happen. The tenth investigation costs what the first did. exekova writes the resolution back as part of the run rather than after it, and has it reviewed before it becomes the answer everyone reuses.",
    "pressure": "A wrong article is worse than no article: it is reused confidently by everybody who finds it.",
    "arrives": "The resolved ticket and the knowledge source it should be written back to. You keep approval over what becomes the published answer.",
    "runs": [
      {
        "stage": "Plan",
        "text": "the resolution is compared against what the knowledge source already says, so the run either corrects an article or writes a new one."
      },
      {
        "stage": "Assemble",
        "text": "the resolution and the write-back are one run rather than a follow-up task that never gets picked up."
      },
      {
        "stage": "Execute",
        "text": "the article is drafted from the evidence the investigation actually produced, not from the reply that was sent."
      },
      {
        "stage": "Review",
        "text": "an independent capability reviews the draft against that evidence before it can become the published answer."
      },
      {
        "stage": "Accept",
        "text": "an article is accepted only when it matches the evidence from the run; where they diverge, the divergence is raised rather than smoothed."
      }
    ],
    "returns": [
      "A reviewed article tied to the evidence from the investigation behind it.",
      "Existing articles the new evidence contradicts, flagged rather than left standing.",
      "Issues recurring often enough to deserve a fix rather than an article, named as such."
    ],
    "keeps": [
      "What gets published",
      "The voice of customer-facing content",
      "Whether a fix is scheduled instead"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "function",
      "key": "support",
      "name": "Support",
      "icon": "users",
      "href": "/solutions/support"
    },
    "title": "The same issue investigated from scratch - Support use case",
    "description": "A recurring issue is investigated fully each time because the last resolution was never written down. Plan, execute, independent review, accepted result."
  },
  {
    "id": "pentest-findings",
    "slug": "compliance-pentest-findings",
    "name": "Penetration test findings",
    "problem": "A penetration test lands with a list of findings and a retest date.",
    "why": "The report is the straightforward part. Each finding needs an owner, a fix, a reviewer who did not write that fix, and a retest proving the original reproduction no longer works. Four handovers, four queues, and a retest date that does not move. exekova runs all four inside one platform, so the finding list shrinks between tests rather than in the week before one.",
    "pressure": "The retest date is set by the assessor, not by your sprint, and an unclosed high finding stays visible in a report your own customers will read.",
    "arrives": "The findings with severity and affected component, plus the reproduction steps. You hand over the report and what your assessor accepts as closed, not a remediation plan.",
    "runs": [
      {
        "stage": "Plan",
        "text": "each finding becomes scoped work with its own reproduction attached as the acceptance criterion, so closure is defined before anything is changed."
      },
      {
        "stage": "Assemble",
        "text": "fix, independent review and retest are one unit of work rather than three tickets in three queues."
      },
      {
        "stage": "Execute",
        "text": "the fix is implemented on an isolated branch, inside the systems and permissions you granted."
      },
      {
        "stage": "Review",
        "text": "a separate capability, never the one that wrote the fix, reviews it against the exact revision produced."
      },
      {
        "stage": "Accept",
        "text": "the original reproduction is re-run against the fixed revision, and only a reproduction that no longer succeeds closes the finding."
      }
    ],
    "returns": [
      "A reviewed change per finding, with the reviewing capability recorded against it.",
      "The retest result showing whether the original reproduction still succeeds, in the same record as the fix.",
      "Findings whose fix needs a decision you have not delegated, raised rather than guessed."
    ],
    "keeps": [
      "Which findings you accept as risk",
      "Sign-off with the assessor",
      "Merge and release timing"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "function",
      "key": "compliance",
      "name": "Compliance",
      "icon": "shield",
      "href": "/solutions/compliance"
    },
    "title": "Penetration test findings - Compliance use case",
    "description": "A penetration test lands with a list of findings and a retest date. See how exekova runs it: plan, execute, independent review, accepted result."
  },
  {
    "id": "audit-finding-closure",
    "slug": "compliance-audit-finding-closure",
    "name": "Audit finding closure",
    "problem": "An assessor raises a finding, and the evidence of closure has to satisfy them rather than you.",
    "why": "A finding is closed when the assessor accepts it, which means the record has to carry the treatment decision, the change, the independent review and the retest. Most teams have the change and reconstruct the rest months later from tickets and chat. exekova assembles the chain as the work runs, because one platform held every step of it.",
    "pressure": "The audit window is fixed, and evidence assembled after the fact is exactly the evidence that gets challenged.",
    "arrives": "The finding and its control reference, the treatment decision your risk owner made, and the standard of evidence your assessor expects.",
    "runs": [
      {
        "stage": "Plan",
        "text": "the treatment decision becomes the work, with the finding reference attached so the chain starts at the finding rather than at a commit."
      },
      {
        "stage": "Assemble",
        "text": "change, review, retest and the closure record are sequenced as one run rather than gathered afterwards."
      },
      {
        "stage": "Execute",
        "text": "the change is implemented on an isolated branch within the boundaries you granted."
      },
      {
        "stage": "Review",
        "text": "an independent capability reviews it against the exact revision, and that reviewer is recorded."
      },
      {
        "stage": "Accept",
        "text": "the retest runs against the criterion the finding named, and acceptance is computed from that evidence rather than declared."
      }
    ],
    "returns": [
      "A closure record per finding, built while the work ran rather than reassembled later.",
      "The independent review recorded against the exact revision it examined.",
      "Places where the evidence your assessor wants does not exist yet, named early enough to act on."
    ],
    "keeps": [
      "The risk treatment decision",
      "Whether a finding is mitigated, accepted or deferred",
      "The assessor relationship and the closure judgement"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "function",
      "key": "compliance",
      "name": "Compliance",
      "icon": "shield",
      "href": "/solutions/compliance"
    },
    "title": "Audit finding closure - Compliance use case",
    "description": "An assessor raises a finding, and the evidence of closure has to satisfy them rather than you. Plan, execute, independent review, accepted result."
  },
  {
    "id": "vulnerability-sla",
    "slug": "compliance-vulnerability-sla",
    "name": "Vulnerabilities past their window",
    "problem": "The vulnerability list is longer than the team, and the remediation clock is contractual.",
    "why": "Vulnerabilities arrive continuously from scanners, dependency alerts and disclosures, and each needs triage, a change, a review and proof it is gone. The volume is routine and the coordination is what fails. exekova runs the whole loop per item on one platform, which is how a remediation window stays met rather than reported on.",
    "pressure": "Remediation windows are written into customer contracts and into your own control descriptions, so drift is reportable rather than internal.",
    "arrives": "The vulnerability, the affected component and version, and the window it falls into. The platform triages against your boundaries itself.",
    "runs": [
      {
        "stage": "Plan",
        "text": "the item is triaged against your boundaries and its window, and anything outside them pauses for a decision rather than proceeding."
      },
      {
        "stage": "Assemble",
        "text": "the change, its regression suite and the re-detection are one unit of work rather than a patch followed by a separate verification task."
      },
      {
        "stage": "Execute",
        "text": "the change is applied on an isolated branch with the regression suite attached."
      },
      {
        "stage": "Review",
        "text": "an independent capability reviews it before it can progress."
      },
      {
        "stage": "Accept",
        "text": "the detection that raised the item is re-run, and acceptance requires it to stop firing."
      }
    ],
    "returns": [
      "Reviewed changes with the originating alert attached to each.",
      "Dated proof that the detection no longer fires, or that it still does, in one record.",
      "Items needing a judgement call, such as a breaking upgrade or an unmaintained dependency, escalated rather than forced through."
    ],
    "keeps": [
      "Risk acceptance and deferral",
      "Release windows",
      "Whether a compensating control is sufficient"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "function",
      "key": "compliance",
      "name": "Compliance",
      "icon": "shield",
      "href": "/solutions/compliance"
    },
    "title": "Vulnerabilities past their window - Compliance use case",
    "description": "The vulnerability list is longer than the team, and the remediation clock is contractual. Plan, execute, independent review, accepted result."
  },
  {
    "id": "evidence-window",
    "slug": "compliance-evidence-window",
    "name": "Evidence for an audit window",
    "problem": "The work was done. Proving it to an assessor is the part nobody has time for.",
    "why": "Evidence is a by-product of work that already happened, and it is usually reassembled by hand once the window has closed. Gaps surface during the audit, which is the one moment they cannot honestly be filled. Because a single platform ran the work, the record exists already: nobody reconciles four tools to reconstruct what happened.",
    "pressure": "Once an observation period has closed, missing evidence cannot be created after the fact without misrepresenting when the work occurred.",
    "arrives": "The control or finding reference, the period in scope, and what your assessor accepts as evidence for it.",
    "runs": [
      {
        "stage": "Plan",
        "text": "what the assessor accepts becomes the standard the record is captured against, before the work starts rather than after."
      },
      {
        "stage": "Assemble",
        "text": "request, change, reviewer, checks and approval are captured by the same platform that performs them, not collected from separate systems."
      },
      {
        "stage": "Execute",
        "text": "every record is bound to the exact revision it describes as the work runs."
      },
      {
        "stage": "Review",
        "text": "the independent review is part of the record, including the attempts that were rejected."
      },
      {
        "stage": "Accept",
        "text": "acceptance is computed from that evidence, so the closure record and the decision come from the same source."
      }
    ],
    "returns": [
      "An evidence package built from records made at the time, not from reconstruction.",
      "A visible gap list where evidence does not exist, surfaced while the period is still open.",
      "The rejection history, which is what demonstrates the review was real rather than procedural."
    ],
    "keeps": [
      "What your assessor accepts as evidence",
      "Which controls are in scope",
      "The attestation or certification decision itself"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "function",
      "key": "compliance",
      "name": "Compliance",
      "icon": "shield",
      "href": "/solutions/compliance"
    },
    "title": "Evidence for an audit window - Compliance use case",
    "description": "The work was done. Proving it to an assessor is the part nobody has time for. See how exekova runs it: plan, execute, independent review, accepted result."
  },
  {
    "id": "customer-security-review",
    "slug": "compliance-customer-security-review",
    "name": "A customer's security review",
    "problem": "A customer's security review is holding the contract, and the findings are yours to close.",
    "why": "A buyer's security review produces findings against your product, and closing them is a revenue problem that lands on the engineers already shipping the roadmap. Scoping, fixing, reviewing and packaging the response is four jobs. exekova runs them as one, so the contract is not waiting on a coordination problem.",
    "pressure": "The finding sits between a signed intent and a signed contract, and the buyer's security team sets the pace.",
    "arrives": "The buyer's findings or questionnaire responses, the affected part of your product, and the closure evidence their team has said they will accept.",
    "runs": [
      {
        "stage": "Plan",
        "text": "each finding is scoped against what the buyer actually asked for, rather than the broadest reading of it, with their criterion attached."
      },
      {
        "stage": "Assemble",
        "text": "fix, review, retest and the closure pack are one run rather than an engineering task followed by a document exercise."
      },
      {
        "stage": "Execute",
        "text": "the change is implemented on an isolated branch within the boundaries you granted."
      },
      {
        "stage": "Review",
        "text": "an independent capability reviews it against the exact revision."
      },
      {
        "stage": "Accept",
        "text": "the retest runs against the buyer's stated criterion, and anything you are declining to change is recorded as a position rather than left silent."
      }
    ],
    "returns": [
      "A reviewed change and a retest result per finding, in one record.",
      "A written position on anything not being changed, so the buyer can accept or push back explicitly.",
      "One pack per review, reusable as the starting point for the next buyer who asks."
    ],
    "keeps": [
      "What you commit to the customer",
      "Which findings you decline and why",
      "Contract and disclosure decisions"
    ],
    "keepsLabel": "What stays your decision",
    "origin": {
      "kind": "function",
      "key": "compliance",
      "name": "Compliance",
      "icon": "shield",
      "href": "/solutions/compliance"
    },
    "title": "A customer's security review - Compliance use case",
    "description": "A customer's security review is holding the contract, and the findings are yours to close. Plan, execute, independent review, accepted result."
  }
];

export const casesIndex: CasesIndex = {
  "title": "Enterprise use cases - one platform, end to end",
  "description": "Thirty-one problems across thirteen industries, each run on one platform: planned, executed, independently reviewed and accepted against your standard.",
  "intro": {
    "title": "Explore 13 featured use cases.",
    "body": "One starting workflow for every industry. Open a dedicated page to see the inputs, execution, evidence and decisions that stay with your team."
  },
  "chairs": [
    {
      "role": "CEO",
      "icon": "chart",
      "question": "Did the ambition become something releasable, and what still needs me?"
    },
    {
      "role": "COO",
      "icon": "grid",
      "question": "Where did the work wait, and on whom?"
    },
    {
      "role": "CFO",
      "icon": "coins",
      "question": "What did the accepted result cost, including rework?"
    },
    {
      "role": "CIO",
      "icon": "lock",
      "question": "What reached which system, and on whose authority?"
    },
    {
      "role": "CTO",
      "icon": "code",
      "question": "Did it pass without certifying itself?"
    }
  ],
  "hero": {
    "headline": [
      "One platform runs the work.",
      "Start to accepted outcome."
    ],
    "lede": "{total} problems across {industries} industries, each one timed by someone outside the team. Every one runs the same way: exekova plans the work, assembles the capability it needs, executes inside the boundaries you set, has the result independently reviewed, and only then accepts it. Not a tool your team coordinates between: one platform that owns the path from the objective to the outcome."
  },
  "lens": {
    "title": "One run. One record. Five chairs.",
    "body": "Because a single platform ran the whole thing, one record answers all five. Nobody reconciles four tools to find out what happened."
  },
  "note": "No figures are quoted on these pages. Each industry publishes the measurement method instead, so the numbers you judge exekova on come from your own runs.",
  "byIndustry": {
    "label": "By industry",
    "headline": [
      "Executed end to end,",
      "sector by sector."
    ],
    "body": "These are not illustrations. Each one is engineering and QA work already queued in that industry, timed by someone outside the team, and provable when it is done. What differs between them is the domain, not how much of it you still have to coordinate. Open one to see what arrives, what exekova runs, what comes back and what stays your decision."
  },
  "pipeline": {
    "label": "One platform. Every case runs the same stages.",
    "note": "Whatever the sector, the work moves through the same pipeline, and the capability that executes it is never the one that reviews it.",
    "stages": [
      "Plan",
      "Assemble",
      "Execute",
      "Review",
      "Accept"
    ]
  },
  "featured": [
    {
      "slug": "remittance",
      "href": "/use-cases/remittance",
      "tone": "violet",
      "icon": "coins",
      "eyebrow": "Product launch / Remittance",
      "title": "Enter the remittance market.",
      "body": "A CEO sets the market, the ambition and the standard. Follow it through planning, implementation, verification and a launch decision that stays with the business.",
      "watch": [
        "Work crossing four teams without a status meeting",
        "A quality gate that rejects the first candidate",
        "The two decisions the platform refuses to make"
      ],
      "cta": "Follow the launch"
    },
    {
      "slug": "stablecoin-pci-audit",
      "href": "/use-cases/stablecoin-pci-audit",
      "tone": "leaf",
      "icon": "shield",
      "eyebrow": "Assessment readiness / Stablecoin rails",
      "title": "Turn an audit epic into evidence.",
      "body": "A CTO files one Jira epic for PCI readiness. Follow it through scope, a pre-report, controlled changes and independent retesting, with the evidence kept as it is produced.",
      "watch": [
        "Parallel workstreams against one scope",
        "Changes that have to earn their retest",
        "Speed and quality read from the same record"
      ],
      "cta": "Follow the assessment"
    },
    {
      "slug": null,
      "href": "/use-cases/education-online-exam-integrity",
      "tone": "azure",
      "icon": "graduation",
      "eyebrow": "Assessment integrity / Education",
      "title": "Keep an online exam fair.",
      "body": "The attempt runs on the student’s device and the student’s network. Follow the paths that are rarely tested and always exercised: a dropped connection, a resume elsewhere, approved extra time, a forced submit.",
      "watch": [
        "Attempt scenarios run at exam concurrency",
        "Integrity signals kept as reviewable evidence",
        "What invalidates an attempt stays an academic decision"
      ],
      "cta": "See the use case"
    },
    {
      "slug": null,
      "href": "/use-cases/education-lms-interoperability",
      "tone": "teal",
      "icon": "layers",
      "eyebrow": "Learning platform / Education",
      "title": "Make every course actually launch.",
      "body": "Course packages, tool launches, roster provisioning and grade passback each follow a standard that every vendor reads slightly differently. The defects are per course, so they surface in week one of term.",
      "watch": [
        "Failures reproduced against the real package",
        "A regression case per package and tool type",
        "Vendor behaviour reported, not worked around"
      ],
      "cta": "See the use case"
    }
  ],
  "featuredByIndustry": [
    "fintech-psp-deprecation",
    "banking-reg-reporting",
    "insurance-rating-rules",
    "healthcare-interop-conformance",
    "public-sector-accessibility-remediation",
    "ecommerce-peak-readiness",
    "saas-version-support",
    "telecom-oss-bss-changes",
    "travel-distribution-changes",
    "education-enrolment-peaks",
    "logistics-partner-onboarding",
    "energy-market-messaging",
    "manufacturing-line-integration"
  ]
};

export function caseBySlug(slug: string) {
  return cases.find(item => item.slug === slug);
}

export function casesFor(origin: CaseOrigin['kind'], key: string) {
  return cases.filter(item => item.origin.kind === origin && item.origin.key === key);
}
