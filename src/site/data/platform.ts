/**
 * The platform pages that live only on exekova.com (the category definition,
 * Workforce, Live Floor, Quality, Recovery, Performance, Security), imported
 * from the content layer by scripts/import-site-content.py and rendered here
 * by PlatformArticle. Sections keep the main site's shapes; the renderer maps
 * each type onto this site's components. Off-site links are localised.
 */
export type Section = { type: string } & Record<string, any>;
export type PlatformPage = { slug: string; title: string; description: string; keywords: string[]; sections: Section[] };
export type FaqGroupData = { title: string; items: { q: string; a: string }[] };
export type EcosystemGroup = { id: string; label: string; items: string[] };

export const platformPages: PlatformPage[] = [
  {
    "slug": "autonomous-work-execution",
    "title": "Autonomous Work Execution Platform - the category, defined",
    "description": "The Autonomous Work Execution Platform defined, with the terms it depends on: Work Graph, Execution State, Quality Gates, verified outcomes and Outcome History.",
    "keywords": [
      "autonomous work execution platform",
      "work graph",
      "execution state",
      "quality gates",
      "verified outcome",
      "human-in-the-loop execution",
      "AI work orchestration"
    ],
    "sections": [
      {
        "type": "pageHero",
        "eyebrow": "The category",
        "headline": [
          {
            "text": "Autonomous Work"
          },
          {
            "text": "Execution, defined.",
            "accent": true
          }
        ],
        "lede": "An Autonomous Work Execution Platform coordinates and executes work across people, AI agents, tools and enterprise systems until a defined outcome is verified and delivered. It differs from task automation in its unit: the unit is the outcome, not the step. This page is the canonical definition of the category and of the terms it depends on.",
        "ctas": [
          {
            "label": "Execute the Work",
            "href": "/contact",
            "variant": "primary"
          },
          {
            "label": "See the platform",
            "href": "/platform",
            "variant": "ghost"
          }
        ]
      },
      {
        "type": "definition",
        "items": [
          {
            "q": "What does an Autonomous Work Execution Platform do?",
            "a": "An Autonomous Work Execution Platform coordinates and executes work across people, AI agents, tools and enterprise systems until a defined outcome is verified and delivered. The work carries its own plan, boundaries, acceptance criteria and evidence, and it is not complete until that evidence satisfies the standard you set. Automation executes steps someone specified in advance; an Autonomous Work Execution Platform is given an objective and is accountable for reaching it."
          },
          {
            "q": "What is an Autonomous Work Execution Platform?",
            "a": "An Autonomous Work Execution Platform coordinates the planning, execution, validation, recovery and completion of work using AI-powered capabilities and connected enterprise systems, inside defined policies, permissions and approval boundaries. The customer sets the objective and the standard; the platform owns the path between them. exekova is an Autonomous Work Execution Platform."
          },
          {
            "q": "What is the Work Graph?",
            "a": "The Work Graph is the structured representation of a piece of work: the tasks it breaks into, the people and capabilities assigned to them, the systems they touch, the dependencies between them, the policies that constrain them and the evidence they produce. Because the work is a graph rather than a script, it can be inspected while it is still running, resumed after a failure, and re-planned when a dependency changes."
          },
          {
            "q": "What is Execution State?",
            "a": "Execution State is the persistent record of where a piece of work has reached: what has been planned, assigned, executed, reviewed, retried, recovered, verified and delivered. It is held by the platform rather than inside any single agent or model session, which is what lets work be paused, inspected, resumed and handed between capabilities without losing its context."
          },
          {
            "q": "What is a Quality Gate?",
            "a": "A Quality Gate is a requirement work must satisfy before it can progress or be treated as complete: a required test, an independent review, a policy check or a human approval. You define the gates as part of the definition of done. Work advances by passing the next gate, not by the capability that produced it declaring itself finished."
          },
          {
            "q": "What is a verified outcome?",
            "a": "A verified outcome is completed work that has satisfied the evidence, testing, review, policy and acceptance criteria attached to it. Output that has not passed those checks is not an outcome. Verification is a separate act from production: the capability that produced the work is never the one that accepts it."
          },
          {
            "q": "What is Outcome History?",
            "a": "Outcome History is the retained record of what a run produced: the plan, the actions taken, the decisions made, the evidence collected, the failures and recoveries, the verification result and the final outcome. It is what lets completed work be audited later, and what lets a new run start from what an earlier one established rather than from nothing."
          },
          {
            "q": "What is human-in-the-loop execution?",
            "a": "Human-in-the-loop execution means people keep the decisions that carry judgement while the platform carries the execution. You set the objective, the boundaries, the permitted tools, the quality bar and the definition of done, and approval can be required at any gate, including final acceptance. Escalation to a person is triggered when work exceeds its retry ceiling or falls outside the boundaries it was given."
          }
        ]
      },
      {
        "type": "steps",
        "label": "The lifecycle",
        "headline": [
          {
            "text": "Plan, orchestrate, execute,"
          },
          {
            "text": "verify, deliver.",
            "accent": true
          }
        ],
        "body": "Orchestration is the step that separates this category from task automation. A workflow tool runs a sequence you designed; an execution platform decides which capabilities the objective requires, sequences them, and reconciles what they produce.",
        "steps": [
          {
            "key": "Plan",
            "title": "Turn intent into a Work Graph",
            "body": "The objective is interpreted, context is gathered from your systems, and the work is decomposed into tasks with dependencies, boundaries and acceptance criteria attached.",
            "items": [
              "Objective",
              "Context",
              "Decomposition",
              "Dependencies",
              "Definition of done"
            ],
            "accent": "azure"
          },
          {
            "key": "Orchestrate",
            "title": "Assemble the capability the work needs",
            "body": "The platform selects which people, AI agents, engines and tools the work requires, sequences them, decides what runs in parallel and passes context between them.",
            "items": [
              "Capability selection",
              "Sequencing",
              "Parallelism",
              "Context handoff"
            ],
            "accent": "violet"
          },
          {
            "key": "Execute",
            "title": "Do the work inside your boundaries",
            "body": "Capabilities act across connected systems using credentials scoped to the permissions you granted, within the budget, priority and retry ceilings set for that work.",
            "items": [
              "Connected systems",
              "Scoped permissions",
              "Budget",
              "Retry ceiling"
            ],
            "accent": "teal"
          },
          {
            "key": "Verify",
            "title": "Hold the work at the Quality Gates",
            "body": "Results route through independent review, testing and policy checks. Failures are diagnosed and repaired inside the run, or escalated when policy or risk requires a person.",
            "items": [
              "Independent review",
              "Tests",
              "Policy checks",
              "Recovery",
              "Escalation"
            ],
            "accent": "leaf"
          },
          {
            "key": "Deliver",
            "title": "Return a verified outcome with its evidence",
            "body": "Accepted work is delivered with the record that justifies acceptance, and that record is retained as Outcome History for audit and for the runs that follow.",
            "items": [
              "Outcome",
              "Evidence",
              "Audit trail",
              "Outcome History"
            ],
            "accent": "azure"
          }
        ]
      },
      {
        "type": "compareColumns",
        "label": "Comparison",
        "headline": [
          {
            "text": "Workflow automation."
          },
          {
            "text": "Autonomous Work Execution Platform.",
            "accent": true
          }
        ],
        "body": "The difference is who decides the path. A workflow tool executes a route a person designed in advance. An execution platform is given the objective, the boundaries and the definition of done, and determines the route itself.",
        "left": {
          "title": "Workflow automation",
          "tone": "muted",
          "items": [
            "A person designs the steps, order and branches",
            "The unit of work is the step",
            "Succeeds by completing the sequence",
            "Breaks when an interface or assumption changes",
            "Exceptions leave the system for a human queue",
            "Produces logs of what ran",
            "Accountable for executing the design"
          ]
        },
        "right": {
          "title": "Autonomous Work Execution Platform",
          "tone": "brand",
          "items": [
            "You state the objective and the standard",
            "The unit of work is the outcome",
            "Succeeds by passing the Quality Gates",
            "Re-plans when the situation changes",
            "Diagnoses, repairs and retries inside the run",
            "Produces evidence that justifies acceptance",
            "Accountable for reaching the outcome"
          ]
        }
      },
      {
        "type": "compareColumns",
        "label": "Comparison",
        "headline": [
          {
            "text": "An AI agent platform."
          },
          {
            "text": "An execution platform.",
            "accent": true
          }
        ],
        "body": "Agent platforms give you the means to build and run agents. An execution platform takes the work. The distinction matters because it decides who owns the result when an agent gets something wrong.",
        "left": {
          "title": "AI agent platform",
          "tone": "muted",
          "items": [
            "You build, configure and supervise the agents",
            "You choose the models and write the prompts",
            "You design how agents hand off to one another",
            "Context lives inside a model session",
            "You judge whether the output is good enough",
            "You own the result"
          ]
        },
        "right": {
          "title": "Autonomous Work Execution Platform",
          "tone": "brand",
          "items": [
            "You hand over the work, not the configuration",
            "Engine and model selection happen inside your constraints",
            "Coordination between capabilities is the platform's job",
            "Context lives in Execution State, outside any session",
            "Acceptance is an independent step with its own evidence",
            "The platform is accountable for the outcome"
          ]
        }
      },
      {
        "type": "faq",
        "label": "Questions",
        "headline": [
          {
            "text": "Category"
          },
          {
            "text": "questions.",
            "accent": true
          }
        ],
        "cta": {
          "label": "All FAQs",
          "href": "/faq"
        },
        "items": [
          {
            "q": "How is an Autonomous Work Execution Platform different from workflow automation?",
            "a": "Workflow automation executes a path you designed in advance. An execution platform plans the path for an objective you state. In a workflow tool a person decides the steps, the order and the branches, and the tool follows them. An execution platform is given the objective, the boundaries and the definition of done, then determines which capabilities are required, coordinates them, validates the result, and is accountable for the outcome rather than for completing a predefined sequence."
          },
          {
            "q": "How is it different from RPA?",
            "a": "RPA replays deterministic steps against fixed interfaces and breaks when either changes. An Autonomous Work Execution Platform plans against an objective, adapts the approach to the situation, validates the result and recovers from failure. RPA automates a procedure; an execution platform executes a piece of work."
          },
          {
            "q": "Can it coordinate multiple AI agents?",
            "a": "Yes. A single piece of work routinely involves more than one capability, and the platform assigns them, sequences them, passes context between them and reconciles their output against the acceptance criteria. You do not configure or supervise the individual agents."
          },
          {
            "q": "Can it use different AI models?",
            "a": "Yes. Engine and model selection is the platform's decision inside the boundaries you set, and you can constrain which engines are permitted for a given piece of work. Because the plan, the context and the evidence live in Execution State rather than inside a model session, engines can change without the work losing its history."
          },
          {
            "q": "Does it replace employees?",
            "a": "No. It changes what people spend their time on. People keep the decisions that carry judgement: what to pursue, what the standard is, what is acceptable and what ships. The execution between those decisions is what the platform carries."
          },
          {
            "q": "Who validates the output?",
            "a": "Validation is performed independently of the capability that produced the work, against the Quality Gates and the definition of done you set. Final acceptance can be reserved for a person on any piece of work."
          }
        ]
      },
      {
        "type": "featureGrid",
        "label": "Compare",
        "tone": "warm",
        "headline": [
          {
            "text": "How the category differs"
          },
          {
            "text": "from its neighbours.",
            "accent": true
          }
        ],
        "body": "Each comparison is its own page.",
        "items": [
          {
            "title": "exekova vs RPA",
            "href": "/compare/rpa",
            "linkLabel": "Compare with RPA",
            "body": "RPA replays a recorded procedure against interfaces that must not change. An Autonomous Work Execution Platform plans against an objective, adapts and recovers from failure."
          },
          {
            "title": "exekova vs AI agent platforms",
            "href": "/compare/ai-agent-platforms",
            "linkLabel": "Compare with agent platforms",
            "body": "Agent platforms give you the means to build and supervise agents. An execution platform takes the work and is accountable for the outcome."
          },
          {
            "title": "exekova vs ChatGPT and assistants",
            "href": "/compare/chatgpt-and-assistants",
            "linkLabel": "Compare with assistants",
            "body": "An assistant answers a prompt and hands the result back, leaving the person holding the loop. An execution platform holds the loop itself."
          }
        ]
      },
      {
        "type": "finalCta",
        "headline": [
          {
            "text": "Bring one real"
          },
          {
            "text": "piece of work."
          }
        ],
        "body": "The category is easiest to judge against something you would otherwise have staffed.",
        "ctas": [
          {
            "label": "Start with one task",
            "href": "/contact",
            "variant": "primary"
          },
          {
            "label": "Talk to enterprise",
            "href": "/contact",
            "variant": "ghost"
          }
        ],
        "note": "Humans set direction. exekova drives execution."
      }
    ]
  },
  {
    "slug": "workforce",
    "title": "Workforce - the work decides the team",
    "description": "exekova forms the execution team from the work itself. Buy capability - engineering, QA, research, review, operations - not artificial AI headcount.",
    "keywords": [
      "AI workforce platform",
      "digital workforce",
      "execution capacity",
      "AI capability not headcount"
    ],
    "sections": [
      {
        "type": "workforceHero",
        "label": "WORKFORCE",
        "headline": [
          "The work decides",
          "the team."
        ],
        "body": "You do not pick which model plans, which implements, which reviews, which tests or which debugs. You describe the work and the standard. exekova forms the execution team the work requires, then dissolves it.",
        "scenarios": [
          {
            "label": "A focused fix",
            "request": "Resolve the checkout timeout",
            "scope": "One service · one acceptance standard",
            "roles": [
              {
                "name": "Implementation",
                "icon": "code",
                "task": "Diagnose and repair the timeout",
                "engine": "Claude Code"
              },
              {
                "name": "Independent review",
                "icon": "eye",
                "task": "Review the change against the brief",
                "engine": "Codex"
              },
              {
                "name": "QA",
                "icon": "flask",
                "task": "Run required regression checks",
                "engine": "GitHub"
              }
            ],
            "tools": [
              "Jira",
              "Claude Code",
              "Codex",
              "GitHub"
            ],
            "evidence": "Reviewed change · test results · acceptance record"
          },
          {
            "label": "A product brief",
            "request": "Prepare a feature for the next planning cycle",
            "scope": "Connected research · defined scope · product approval",
            "roles": [
              {
                "name": "Research",
                "icon": "search",
                "task": "Gather and retain the relevant sources",
                "engine": "Notion"
              },
              {
                "name": "Definition",
                "icon": "file",
                "task": "Draft scope and acceptance criteria",
                "engine": "Confluence"
              },
              {
                "name": "Independent review",
                "icon": "eye",
                "task": "Check the specification and its evidence",
                "engine": "Linear"
              }
            ],
            "tools": [
              "Notion",
              "Confluence",
              "Linear",
              "Jira"
            ],
            "evidence": "Source register · reviewed specification · approval record"
          },
          {
            "label": "A service migration",
            "request": "Prepare a change across dependent services",
            "scope": "Multiple work units · parallel execution · staged validation",
            "roles": [
              {
                "name": "Planning",
                "icon": "branch",
                "task": "Map dependencies and sequence the work",
                "engine": "Jira"
              },
              {
                "name": "Implementation",
                "icon": "code",
                "task": "Execute independent units in parallel",
                "engine": "Claude Code"
              },
              {
                "name": "Independent review",
                "icon": "eye",
                "task": "Review changes before they advance",
                "engine": "Codex"
              },
              {
                "name": "QA",
                "icon": "flask",
                "task": "Validate the dependent service paths",
                "engine": "GitHub"
              }
            ],
            "tools": [
              "Jira",
              "Claude Code",
              "Codex",
              "GitHub"
            ],
            "evidence": "Dependency plan · reviewed changes · validation evidence"
          }
        ]
      },
      {
        "type": "definition",
        "items": [
          {
            "q": "What is exekova?",
            "a": "exekova is an Autonomous Work Execution Platform. It takes a stated objective, plans the work, selects and assembles the capabilities needed to do it, executes across your connected systems, validates the result against the standard you defined, handles eligible failures, and delivers a measurable outcome with supporting evidence."
          },
          {
            "q": "What is an Autonomous Work Execution Platform?",
            "a": "An Autonomous Work Execution Platform coordinates the planning, execution, validation, recovery and completion of work using AI-powered capabilities and connected enterprise systems, inside defined policies, permissions and approval boundaries. The customer sets the objective and the standard; the platform owns the path between them."
          },
          {
            "q": "How is exekova different from an AI agent platform?",
            "a": "Agent platforms are organised around agents: you configure them, connect them and supervise them. exekova is organised around work. You define the objective, the boundaries and the quality bar. exekova decides which capabilities, models and tools are required, coordinates them, and is accountable for the outcome rather than for any individual agent's output."
          }
        ]
      },
      {
        "type": "logoMarquee",
        "source": "ecosystem",
        "label": "WITH YOUR TOOLS AND STANDARDS",
        "footnoteHref": "/integrations",
        "categories": [
          "engineering",
          "work",
          "business",
          "automation"
        ]
      },
      {
        "type": "workforceModel",
        "label": "CAPABILITY, FOR THE WORK",
        "headline": [
          "Execution capacity.",
          "Without another management layer."
        ],
        "body": "Pricing and staffing a roster of named AI workers recreates the management problem you were trying to remove. Capacity is the useful unit.",
        "capabilities": [
          "Engineering capacity",
          "QA capacity",
          "Research capacity",
          "Review capacity",
          "Operations capacity",
          "Execution capacity you can measure"
        ],
        "features": [
          {
            "title": "Dynamic assembly",
            "body": "Team shape is derived from the decomposed plan: how many units, what kind, how they depend on each other.",
            "visual": "assembly"
          },
          {
            "title": "Independent review",
            "body": "The reviewing capability is never the implementing capability. Separation of duties is structural, not a setting.",
            "visual": "routing"
          },
          {
            "title": "Model abstraction",
            "body": "Execution engines will keep changing. Your work definitions, standards and approvals do not have to change with them.",
            "visual": "constellation"
          },
          {
            "title": "Parallel where safe",
            "body": "Independent units run concurrently. Dependent units hold until their predecessor reaches the required state.",
            "visual": "parallel"
          }
        ],
        "principle": "exekova adds the capacity without the layer."
      },
      {
        "type": "solutionRelated",
        "current": "workforce"
      },
      {
        "type": "finalCta",
        "headline": [
          {
            "text": "What would you ship"
          },
          {
            "text": "with more capacity?"
          }
        ],
        "body": "Start with the work that is currently waiting on someone's availability.",
        "ctas": [
          {
            "label": "Start with one task",
            "href": "/contact",
            "variant": "primary"
          },
          {
            "label": "Talk to enterprise",
            "href": "/contact",
            "variant": "ghost"
          }
        ]
      }
    ]
  },
  {
    "slug": "live-floor",
    "title": "Live Floor - see execution happening",
    "description": "A live view of your execution capacity: what is planning, executing, in review, verified and blocked, with the reason attached.",
    "keywords": [
      "AI execution visibility",
      "live work monitoring",
      "AI agent observability",
      "execution capacity dashboard"
    ],
    "sections": [
      {
        "type": "pageHero",
        "eyebrow": "Live Floor",
        "headline": [
          {
            "text": "See execution"
          },
          {
            "text": "happening.",
            "accent": true
          }
        ],
        "lede": "Autonomy without visibility is just an unaccountable black box with a nicer name. The Live Floor is the operational view: what is moving, what is waiting, what is stuck and what has already cleared your standard."
      },
      {
        "type": "executionDemo"
      },
      {
        "type": "featureGrid",
        "label": "What it shows",
        "headline": [
          {
            "text": "Enough to intervene,"
          },
          {
            "text": "without having to.",
            "accent": true
          }
        ],
        "tone": "warm",
        "items": [
          {
            "title": "Active work",
            "body": "What is running right now, at which stage, against which objective."
          },
          {
            "title": "Waiting and blocked",
            "body": "Work held on a dependency, an approval or missing access - with the blocking reason named, not just a status colour."
          },
          {
            "title": "Review and testing",
            "body": "Which outputs are in validation and which gate they are sitting at."
          },
          {
            "title": "Retries and handoffs",
            "body": "Recovery loops in progress, with the diagnosis that triggered them."
          },
          {
            "title": "Completed outcomes",
            "body": "Work that passed your standard, with its evidence reachable from the card."
          },
          {
            "title": "Capacity and performance",
            "body": "How much execution capacity is in use and what it is producing."
          }
        ]
      },
      {
        "type": "bigStatement",
        "headline": [
          {
            "text": "Humans set direction."
          },
          {
            "text": "exekova drives execution.",
            "accent": true
          }
        ],
        "body": "The Live Floor exists so a leader can confirm that in thirty seconds rather than requesting a status update from three teams.",
        "kicker": "Work waiting is business waiting."
      },
      {
        "type": "finalCta",
        "headline": [
          {
            "text": "Watch one run"
          },
          {
            "text": "end to end."
          }
        ],
        "body": "The clearest demonstration is a real piece of your work moving across the board.",
        "ctas": [
          {
            "label": "Start with one task",
            "href": "/contact",
            "variant": "primary"
          },
          {
            "label": "Talk to enterprise",
            "href": "/contact",
            "variant": "ghost"
          }
        ]
      }
    ]
  },
  {
    "slug": "quality",
    "title": "Quality, validation and acceptance",
    "description": "Execution and acceptance stay separate. Work passes independent review, testing and your definition of done before it counts as complete.",
    "keywords": [
      "AI quality assurance",
      "who validates AI generated work",
      "AI output validation",
      "AI acceptance criteria"
    ],
    "sections": [
      {
        "type": "pageHero",
        "eyebrow": "Quality",
        "headline": [
          {
            "text": "Generated"
          },
          {
            "text": "isn't done.",
            "accent": true
          }
        ],
        "lede": "The most common failure in AI-assisted work is not a bad output. It is a plausible output that nobody checked, accepted because it was produced fluently. exekova makes acceptance a separate act from production."
      },
      {
        "type": "pipeline",
        "label": "Acceptance path",
        "headline": [
          {
            "text": "Seven states."
          },
          {
            "text": "Only one is done.",
            "accent": true
          }
        ],
        "body": "Work advances by passing the next gate, not by the producing capability declaring itself finished.",
        "stages": [
          {
            "label": "Generated",
            "tone": "neutral"
          },
          {
            "label": "Implemented",
            "tone": "exec"
          },
          {
            "label": "Reviewed",
            "tone": "review"
          },
          {
            "label": "Tested",
            "tone": "review"
          },
          {
            "label": "Verified",
            "tone": "verified"
          },
          {
            "label": "Accepted",
            "tone": "verified"
          },
          {
            "label": "Done",
            "tone": "done"
          }
        ],
        "cta": {
          "label": "What happens when a gate fails",
          "href": "/recovery"
        }
      },
      {
        "type": "featureGrid",
        "label": "Mechanisms",
        "headline": [
          {
            "text": "How the standard"
          },
          {
            "text": "gets enforced.",
            "accent": true
          }
        ],
        "tone": "warm",
        "body": "Quality is a set of mechanisms with evidence attached, not a claim on a marketing page.",
        "items": [
          {
            "title": "Independent review",
            "body": "Review is performed by a capability separate from the one that produced the work, so nothing is self-certified."
          },
          {
            "title": "Testing as a stage",
            "body": "Where the work and environment support it, your required tests run inside the pipeline and results are captured as evidence."
          },
          {
            "title": "Acceptance criteria",
            "body": "Your definition of done is attached to the work and evaluated explicitly, rather than inferred from the output."
          },
          {
            "title": "Security checks",
            "body": "Where configured, security review runs before work can reach a verified state."
          },
          {
            "title": "Human approval",
            "body": "Any gate can require a named approver. Work waits rather than proceeding on an assumption."
          },
          {
            "title": "Evidence collection",
            "body": "Plan, actions, test results, review notes, retries and approvals are retained so completed work can be audited later."
          }
        ]
      },
      {
        "type": "definition",
        "items": [
          {
            "q": "Who validates exekova's output?",
            "a": "Not the capability that produced it. Completed work is routed through independent review, testing and validation against the acceptance criteria you defined, with evidence collected at each stage. Human approval can be required at any gate."
          },
          {
            "q": "How does exekova define done?",
            "a": "You define it. Done is the definition of done attached to the work - acceptance criteria, required tests, review requirements and approvals. exekova treats that as the completion condition rather than assessing its own output."
          }
        ]
      },
      {
        "type": "faq",
        "label": "Questions",
        "headline": [
          {
            "text": "Quality"
          },
          {
            "text": "questions.",
            "accent": true
          }
        ],
        "group": "quality",
        "cta": {
          "label": "All FAQs",
          "href": "/faq"
        }
      },
      {
        "type": "finalCta",
        "headline": [
          {
            "text": "Define the standard."
          },
          {
            "text": "exekova owns the path to it."
          }
        ],
        "body": "Bring your acceptance criteria and see what clears them.",
        "ctas": [
          {
            "label": "Start with one task",
            "href": "/contact",
            "variant": "primary"
          },
          {
            "label": "Talk to enterprise",
            "href": "/contact",
            "variant": "ghost"
          }
        ]
      }
    ]
  },
  {
    "slug": "recovery",
    "title": "Recovery - debugging, retry and failure handling",
    "description": "When work fails, exekova captures evidence, diagnoses the cause, fixes, retests and re-verifies inside the run. People step in when policy says so.",
    "keywords": [
      "AI debugging automation",
      "autonomous debugging",
      "AI retry handling",
      "AI failure recovery"
    ],
    "sections": [
      {
        "type": "pageHero",
        "eyebrow": "Recovery",
        "headline": [
          {
            "text": "Failure shouldn't create"
          },
          {
            "text": "another management task.",
            "accent": true
          }
        ],
        "lede": "Work will fail. What matters is whether the failure is absorbed inside the run or handed back to a person as a fresh ticket, a fresh investigation and a fresh place in someone's week."
      },
      {
        "type": "recoveryLoop",
        "label": "The loop",
        "headline": [
          {
            "text": "Who does the"
          },
          {
            "text": "second attempt?",
            "accent": true
          }
        ],
        "body": "In most AI-assisted workflows the answer is the person who asked. That is the cost that rarely appears in the business case.",
        "before": {
          "title": "Without an execution layer",
          "steps": [
            "AI generates",
            "Failure",
            "Human investigates",
            "Human reprompts",
            "Human reruns",
            "Human checks again"
          ]
        },
        "after": {
          "title": "With exekova",
          "steps": [
            "Execution",
            "Failure detected",
            "Evidence captured",
            "Diagnosis",
            "Capability routed",
            "Fix",
            "Retest",
            "Review",
            "Verify",
            "Outcome"
          ]
        },
        "escalation": {
          "title": "exekova escalates to a human when",
          "items": [
            "Policy requires it",
            "Retries are exhausted",
            "Requirements are ambiguous",
            "Risk exceeds your limits",
            "Access is unavailable",
            "Human judgement is required"
          ]
        },
        "kicker": "Don't become the debugging loop.",
        "cta": {
          "label": "See the quality gates",
          "href": "/quality"
        }
      },
      {
        "type": "featureGrid",
        "label": "Controls",
        "headline": [
          {
            "text": "Recovery has a"
          },
          {
            "text": "budget and a ceiling.",
            "accent": true
          }
        ],
        "tone": "warm",
        "body": "An unbounded retry loop is a cost problem wearing the costume of an autonomy feature.",
        "items": [
          {
            "title": "Diagnosis before retry",
            "body": "A retry runs against a diagnosis, not as a repetition of the same attempt. Repeating an identical failed action is not treated as recovery."
          },
          {
            "title": "Retry ceilings",
            "body": "A finite number of recovery attempts per unit of work, configurable per workspace and per run."
          },
          {
            "title": "Budget enforcement",
            "body": "Recovery consumes the same execution budget as the original attempt and stops when the cap is reached."
          },
          {
            "title": "Evidence capture",
            "body": "Logs, failing output, test results and environment state are captured at the moment of failure, not reconstructed afterwards."
          },
          {
            "title": "Re-entry into validation",
            "body": "A fix does not bypass review and testing. It re-enters the acceptance path from the appropriate stage."
          },
          {
            "title": "Escalation with context",
            "body": "When a human is needed, they receive the diagnosis and evidence rather than a notification that something failed."
          }
        ]
      },
      {
        "type": "featureGrid",
        "label": "Maintenance",
        "headline": [
          {
            "text": "Work should"
          },
          {
            "text": "remain done.",
            "accent": true
          }
        ],
        "body": "Where the connected systems support observation, exekova can carry a delivered outcome forward rather than treating delivery as the end.",
        "items": [
          {
            "title": "Deliver",
            "body": "The accepted outcome lands in your systems with its evidence attached."
          },
          {
            "title": "Observe",
            "body": "Where observability is connected, the delivered result stays in view rather than being forgotten at handover."
          },
          {
            "title": "Detect and diagnose",
            "body": "A regression is treated as a new failure against a known outcome, with its history available."
          },
          {
            "title": "Fix, review, verify",
            "body": "Maintenance work re-enters the same acceptance path as original work."
          }
        ],
        "cta": {
          "label": "See what's connected",
          "href": "/integrations"
        }
      },
      {
        "type": "faq",
        "label": "Questions",
        "headline": [
          {
            "text": "Recovery"
          },
          {
            "text": "questions.",
            "accent": true
          }
        ],
        "group": "recovery",
        "cta": {
          "label": "All FAQs",
          "href": "/faq"
        }
      },
      {
        "type": "finalCta",
        "headline": [
          {
            "text": "Give it something"
          },
          {
            "text": "that has already failed once."
          }
        ],
        "body": "Recovery behaviour is easiest to judge on work that has a history.",
        "ctas": [
          {
            "label": "Start with one task",
            "href": "/contact",
            "variant": "primary"
          },
          {
            "label": "Talk to enterprise",
            "href": "/contact",
            "variant": "ghost"
          }
        ]
      }
    ]
  },
  {
    "slug": "performance",
    "title": "Performance and outcome economics",
    "description": "Measure outcomes, not AI activity: acceptance rate, time to outcome, cost per accepted task, retry and intervention rate, all from your own runs.",
    "keywords": [
      "AI outcome economics",
      "cost per completed task",
      "AI performance measurement",
      "AI agent observability"
    ],
    "sections": [
      {
        "type": "pageHero",
        "eyebrow": "Performance",
        "headline": [
          {
            "text": "Measure outcomes,"
          },
          {
            "text": "not AI activity.",
            "accent": true
          }
        ],
        "lede": "Token counts, prompt counts and agent counts describe how a system behaved. They do not tell an operator whether the work got done or a finance team what it cost. exekova reports on the second kind of number and keeps the first as diagnostics."
      },
      {
        "type": "definition",
        "items": [
          {
            "q": "What is exekova?",
            "a": "exekova is an Autonomous Work Execution Platform. It takes a stated objective, plans the work, selects and assembles the capabilities needed to do it, executes across your connected systems, validates the result against the standard you defined, handles eligible failures, and delivers a measurable outcome with supporting evidence."
          },
          {
            "q": "What is an Autonomous Work Execution Platform?",
            "a": "An Autonomous Work Execution Platform coordinates the planning, execution, validation, recovery and completion of work using AI-powered capabilities and connected enterprise systems, inside defined policies, permissions and approval boundaries. The customer sets the objective and the standard; the platform owns the path between them."
          },
          {
            "q": "How is exekova different from an AI agent platform?",
            "a": "Agent platforms are organised around agents: you configure them, connect them and supervise them. exekova is organised around work. You define the objective, the boundaries and the quality bar. exekova decides which capabilities, models and tools are required, coordinates them, and is accountable for the outcome rather than for any individual agent's output."
          }
        ]
      },
      {
        "type": "metrics",
        "label": "Operating metrics",
        "headline": [
          {
            "text": "The numbers an operator"
          },
          {
            "text": "actually uses.",
            "accent": true
          }
        ],
        "body": "Reported per workspace, per team and per piece of work, from your own runs.",
        "metrics": [
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
            "label": "Throughput",
            "hint": "Completed work per period against capacity"
          },
          {
            "label": "Retry rate",
            "hint": "Share of runs entering a recovery loop"
          },
          {
            "label": "Intervention rate",
            "hint": "How often a human had to step in, and why"
          },
          {
            "label": "Blocked time",
            "hint": "Waiting on access, approval or a dependency"
          },
          {
            "label": "Evidence coverage",
            "hint": "Completed work carrying an auditable record"
          }
        ],
        "note": "exekova reports real telemetry. Figures shown in product are from your runs, not illustrative benchmarks."
      },
      {
        "type": "featureGrid",
        "label": "Outcome economics",
        "headline": [
          {
            "text": "The CFO view of"
          },
          {
            "text": "execution.",
            "accent": true
          }
        ],
        "tone": "warm",
        "body": "Execution has a unit cost. Once it is visible, capacity becomes a budget decision rather than a hiring decision.",
        "items": [
          {
            "title": "Cost per completed task",
            "hint": "",
            "body": "Total execution cost divided by work that reached completion, including the runs that needed recovery."
          },
          {
            "title": "Cost per accepted task",
            "body": "The more honest figure: cost over work that passed your standard, so rework is priced in rather than hidden."
          },
          {
            "title": "Retry overhead",
            "body": "The share of spend consumed by recovery, tracked against diagnosis so recurring causes are addressable."
          },
          {
            "title": "Intervention cost",
            "body": "Human time drawn into execution, which is the cost an autonomy claim most often conceals."
          },
          {
            "title": "Capacity utilisation",
            "body": "How much of the execution capacity you are paying for is actually being consumed."
          },
          {
            "title": "Maintenance burden",
            "body": "Ongoing cost attached to work already delivered, where observation is connected."
          }
        ]
      },
      {
        "type": "compareColumns",
        "label": "Metric discipline",
        "headline": [
          {
            "text": "Primary metrics"
          },
          {
            "text": "and diagnostics.",
            "accent": true
          }
        ],
        "body": "Both are available. Only one belongs on an executive dashboard.",
        "left": {
          "title": "Primary - reported by default",
          "tone": "brand",
          "items": [
            "Tasks completed",
            "Acceptance rate",
            "Time to outcome",
            "Cost per accepted task",
            "Retry rate",
            "Intervention rate",
            "Blocked time",
            "Evidence coverage"
          ]
        },
        "right": {
          "title": "Diagnostic - available on request",
          "tone": "muted",
          "items": [
            "Token consumption",
            "Prompt volume",
            "Number of capabilities engaged",
            "Engine-level latency",
            "Tool call counts",
            "Plan revision counts"
          ]
        }
      },
      {
        "type": "faq",
        "label": "Questions",
        "headline": [
          {
            "text": "Performance"
          },
          {
            "text": "questions.",
            "accent": true
          }
        ],
        "group": "performance",
        "cta": {
          "label": "All FAQs",
          "href": "/faq"
        }
      },
      {
        "type": "finalCta",
        "headline": [
          {
            "text": "Run a measured"
          },
          {
            "text": "pilot."
          }
        ],
        "body": "Pick a repeating category of work and measure cost per accepted task against how it runs today.",
        "ctas": [
          {
            "label": "Start with one task",
            "href": "/contact",
            "variant": "primary"
          },
          {
            "label": "Talk to enterprise",
            "href": "/contact",
            "variant": "ghost"
          }
        ]
      }
    ]
  },
  {
    "slug": "security",
    "title": "Security, governance and enterprise controls",
    "description": "Autonomous execution inside defined boundaries: secrets isolation, least privilege, approval gates, execution limits, auditability and deployment options.",
    "keywords": [
      "AI governance platform",
      "enterprise AI security",
      "AI execution controls",
      "on-prem AI platform"
    ],
    "sections": [
      {
        "type": "postureHero",
        "id": "privacy-security",
        "label": "Security",
        "headline": [
          {
            "text": "Autonomous execution."
          },
          {
            "text": "Defined boundaries.",
            "accent": true
          }
        ],
        "lede": "Autonomy without limits is not an enterprise product. Every run executes inside permissions, budgets, retry ceilings and approval gates that you configure - and produces a record of what it did.",
        "ctas": [
          {
            "label": "Talk to enterprise",
            "href": "/contact",
            "variant": "primary"
          },
          {
            "label": "Read the deployment options",
            "href": "#deployment",
            "variant": "ghost"
          }
        ],
        "boundary": {
          "label": "What the platform holds, per run",
          "rows": [
            {
              "k": "Credentials",
              "v": "Platform held, scoped",
              "icon": "lock"
            },
            {
              "k": "Tool authorisation",
              "v": "Per tool, least privilege",
              "icon": "shield"
            },
            {
              "k": "Environment",
              "v": "Separate grants",
              "icon": "layers"
            },
            {
              "k": "Production write",
              "v": "Human approval",
              "icon": "users",
              "tone": "human"
            },
            {
              "k": "Retry ceiling",
              "v": "Enforced in run",
              "icon": "reset",
              "tone": "pass"
            },
            {
              "k": "Run record",
              "v": "Retained and redacted",
              "icon": "file",
              "tone": "pass"
            }
          ],
          "foot": "Execution engines receive authorised actions, never your keys."
        }
      },
      {
        "type": "postureControls",
        "label": "Controls",
        "headline": [
          {
            "text": "Two boundaries."
          },
          {
            "text": "Both enforced in the run.",
            "accent": true
          }
        ],
        "body": "Access decides what a capability can reach. Oversight decides when it must stop and ask.",
        "groups": [
          {
            "title": "Execution engines get actions, not your keys",
            "icon": "lock",
            "body": "Credentials stay with the platform. A capability receives the ability to perform an authorised action, never the secret behind it.",
            "items": [
              {
                "title": "Secrets isolation",
                "body": "Credentials are held in isolated platform storage and scoped per integration. They are not passed to execution engines."
              },
              {
                "title": "Credential handling",
                "body": "Tools are invoked through the platform. A capability receives the ability to perform an authorised action, not the underlying secret."
              },
              {
                "title": "Authorization",
                "body": "Access is granted tool by tool. A capability can only reach the systems its work requires."
              },
              {
                "title": "Least privilege",
                "body": "Default posture is the narrowest grant that lets the work proceed, widened deliberately rather than by convenience."
              },
              {
                "title": "Environment separation",
                "body": "Development, staging and production execution run against separate boundaries and separate grants."
              },
              {
                "title": "Logging and redaction",
                "body": "Run records are retained for audit, with redaction applied to sensitive values in captured evidence."
              }
            ]
          },
          {
            "title": "Where a human stays in the loop",
            "icon": "users",
            "body": "Autonomy runs inside ceilings you set, and stops at the gates you name.",
            "items": [
              {
                "title": "Approval gates",
                "body": "Require named sign-off on specific actions, environments, risk levels or spend thresholds before work proceeds."
              },
              {
                "title": "Human escalation",
                "body": "Ambiguity, exhausted retries, unavailable access and risk above your limit all route to a person with the evidence attached."
              },
              {
                "title": "Execution limits",
                "body": "Runtime ceilings prevent work running indefinitely against an unreachable goal."
              },
              {
                "title": "Retry limits",
                "body": "A finite recovery budget per unit of work, set per workspace and overridable per run."
              },
              {
                "title": "Budget controls",
                "body": "Spend caps enforced during execution rather than reported after it."
              },
              {
                "title": "Auditability",
                "body": "Each run retains its plan, actions, tools used, test and review results, retries, escalations and approvals."
              }
            ]
          }
        ]
      },
      {
        "type": "postureClaims",
        "label": "What we claim",
        "headline": [
          {
            "text": "What we hold, and what"
          },
          {
            "text": "we will put in front of you.",
            "accent": true
          }
        ],
        "body": "Security pages often list badges without saying what sits behind them. Nothing below is asserted until an audit or agreement actually exists.",
        "cta": {
          "label": "Start a security review",
          "href": "/contact"
        },
        "items": [
          {
            "k": "SOC 2 Type II",
            "v": "Not yet certified. On the roadmap; timeline shared during a security review.",
            "state": "roadmap"
          },
          {
            "k": "ISO 27001",
            "v": "Not yet certified. On the roadmap; timeline shared during a security review.",
            "state": "roadmap"
          },
          {
            "k": "PCI DSS",
            "v": "Not yet certified. On the roadmap; timeline shared during a security review.",
            "state": "roadmap"
          },
          {
            "k": "HIPAA",
            "v": "No Business Associate Agreement is in place today. Available to discuss under an enterprise agreement.",
            "state": "roadmap"
          },
          {
            "k": "GDPR posture",
            "v": "Discussed against your data protection requirements, not asserted as a badge.",
            "state": "yes"
          },
          {
            "k": "Run-level audit record",
            "v": "Every run retains plan, actions, evidence, retries, escalations and approvals.",
            "state": "yes"
          },
          {
            "k": "On-premises deployment",
            "v": "Enterprise roadmap. Not available as a self-serve purchase.",
            "state": "roadmap"
          }
        ]
      },
      {
        "type": "deployment",
        "label": "Deployment",
        "headline": [
          {
            "text": "Choose where"
          },
          {
            "text": "exekova runs.",
            "accent": true
          }
        ],
        "body": "Deployment model is a security architecture decision as much as a commercial one.",
        "options": [
          {
            "title": "Your cloud",
            "body": "Single-tenant deployment inside your AWS, Azure or GCP environment, under your network and data controls.",
            "accent": "azure",
            "cta": {
              "label": "Talk to enterprise",
              "href": "/contact"
            }
          },
          {
            "title": "On-premises",
            "body": "Deployment inside infrastructure you control, for regulated and restricted-network environments.",
            "accent": "leaf",
            "badge": "Enterprise roadmap",
            "cta": {
              "label": "Discuss deployment",
              "href": "/contact"
            }
          }
        ],
        "cta": {
          "label": "See pricing and packaging",
          "href": "/pricing"
        },
        "id": "deployment"
      },
      {
        "type": "posturePractical",
        "label": "Practical",
        "headline": [
          {
            "text": "Three things your"
          },
          {
            "text": "security team will ask.",
            "accent": true
          }
        ],
        "items": [
          {
            "title": "Data residency",
            "icon": "cloud",
            "body": "Residency depends on the deployment model and the execution services involved. Confirm the deployment region and the data paths for your integrations during the enterprise discussion.",
            "cta": {
              "label": "Discuss deployment",
              "href": "/contact"
            }
          },
          {
            "title": "Security review",
            "icon": "shield",
            "body": "Bring your security team, data classification requirements and required agreements to the first call. Review happens against your criteria rather than a generic questionnaire.",
            "cta": {
              "label": "Book the review",
              "href": "/contact"
            }
          },
          {
            "title": "Reporting a vulnerability",
            "icon": "bug",
            "body": "Request the security reporting channel through the contact page. Describe the affected area without including credentials or customer data in the first message.",
            "cta": {
              "label": "Request the channel",
              "href": "/contact"
            }
          }
        ]
      },
      {
        "type": "faq",
        "label": "Questions",
        "headline": [
          {
            "text": "Security"
          },
          {
            "text": "questions.",
            "accent": true
          }
        ],
        "group": "security",
        "cta": {
          "label": "All FAQs",
          "href": "/faq"
        }
      },
      {
        "type": "finalCta",
        "headline": [
          {
            "text": "Bring your security"
          },
          {
            "text": "team to the first call."
          }
        ],
        "body": "Deployment model, credential handling and approval policy are easier to settle early than late.",
        "ctas": [
          {
            "label": "Start with one task",
            "href": "/contact",
            "variant": "primary"
          },
          {
            "label": "Talk to enterprise",
            "href": "/contact",
            "variant": "ghost"
          }
        ]
      }
    ]
  }
];

export const faqGroupsByKey: Record<string, FaqGroupData> = {
  "product": {
    "title": "Product",
    "items": [
      {
        "q": "What is exekova?",
        "a": "exekova is an Autonomous Work Execution Platform. It takes a stated objective, plans the work, selects and assembles the capabilities needed to do it, executes across your connected systems, validates the result against the standard you defined, handles eligible failures, and delivers a measurable outcome with supporting evidence."
      },
      {
        "q": "What is an Autonomous Work Execution Platform?",
        "a": "An Autonomous Work Execution Platform coordinates the planning, execution, validation, recovery and completion of work using AI-powered capabilities and connected enterprise systems, inside defined policies, permissions and approval boundaries. The customer sets the objective and the standard; the platform owns the path between them."
      },
      {
        "q": "How is exekova different from an AI agent platform?",
        "a": "Agent platforms are organised around agents: you configure them, connect them and supervise them. exekova is organised around work. You define the objective, the boundaries and the quality bar. exekova decides which capabilities, models and tools are required, coordinates them, and is accountable for the outcome rather than for any individual agent's output."
      },
      {
        "q": "How is exekova different from ChatGPT or an AI assistant?",
        "a": "An assistant responds to a prompt and hands the result back to you. exekova takes a unit of work through to completion - including review, testing, failure diagnosis, retry and updates to your systems of record. The person asking is not responsible for operating the loop."
      },
      {
        "q": "Does exekova replace employees?",
        "a": "No. exekova adds execution capacity. People continue to set direction, define standards, approve sensitive actions and handle judgement calls. What changes is how much coordination and rework sits on their calendar. The split is structural rather than cultural: you own the objective, the boundaries, the quality bar and the definition of done, and exekova owns the path between a stated intent and an outcome that satisfies them."
      },
      {
        "q": "Does the customer need to configure individual AI agents?",
        "a": "No. You configure the work - context, constraints, permissions, priority, budget, quality bar, definition of done and approval rules. Capability selection and team formation are exekova's responsibility. That means you do not choose which engine runs a task, write prompts for it, or design how one capability hands off to the next. Those decisions are made per run inside the boundaries you set, and the outcome is what you hold exekova to."
      },
      {
        "q": "How does exekova decide which capabilities are needed?",
        "a": "exekova decomposes the objective into the work it implies, then matches each piece to the capability profile required - implementation, review, testing, research, diagnosis. Routing takes account of the permissions, budget and quality bar attached to the request. A team is formed for that specific piece of work and dissolved when it completes, so the shape follows the work rather than a fixed roster, and review is always assigned separately from production."
      },
      {
        "q": "How is exekova different from RPA?",
        "a": "RPA replays deterministic steps against fixed interfaces and breaks when either changes. exekova plans against an objective, adapts the approach to the situation, validates the result and recovers from failure. RPA automates a procedure; exekova executes a piece of work."
      },
      {
        "q": "What does an Autonomous Work Execution Platform do?",
        "a": "An Autonomous Work Execution Platform coordinates and executes work across people, AI agents, tools and enterprise systems until a defined outcome is verified and delivered. It differs from task automation in its unit: the unit is the outcome, not the step. The work carries its own plan, boundaries, acceptance criteria and evidence, and it is not complete until that evidence satisfies the standard you set."
      },
      {
        "q": "What is the exekova Work Graph?",
        "a": "The Work Graph is exekova's representation of a piece of work: the tasks it breaks into, the people and capabilities assigned to them, the systems they touch, the dependencies between them, the policies that constrain them and the evidence they produce. It is what lets a run be inspected while it is still running and resumed after a failure, and it is why the work survives a change of engine or model."
      },
      {
        "q": "How is exekova different from workflow automation?",
        "a": "Workflow automation executes a path you designed in advance. exekova plans the path for an objective you state. In a workflow tool a person decides the steps, the order and the branches, and the tool follows them. exekova is given the objective, the boundaries and the definition of done, then determines which capabilities are required, coordinates them, validates the result, and is accountable for the outcome rather than for completing a predefined sequence."
      }
    ]
  },
  "execution": {
    "title": "Execution",
    "items": [
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
    ]
  },
  "quality": {
    "title": "Quality",
    "items": [
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
    ]
  },
  "recovery": {
    "title": "Failure and recovery",
    "items": [
      {
        "q": "What happens when a task fails?",
        "a": "The failure is detected inside the run. exekova captures evidence, diagnoses the cause, routes the fix to an appropriate capability, retests, re-reviews and re-verifies. A person is involved only when your policy requires it or the retry budget is exhausted."
      },
      {
        "q": "Can exekova debug failed work?",
        "a": "Where the failure is diagnosable from the captured evidence and the connected systems, yes. Diagnosis and fix are separate steps from the original implementation, and the fix goes back through review and testing. A retry runs against the diagnosis rather than repeating the original attempt, and the failure, the diagnosis and the repair all stay in the run's record, so a recurring cause is visible rather than absorbed silently."
      },
      {
        "q": "How are retries handled?",
        "a": "Retries run against a diagnosis rather than repeating the same attempt. Each retry consumes budget and is counted against the retry ceiling you set. When the ceiling is reached the work escalates to a person instead of continuing to consume capacity. The repaired work re-enters the same Quality Gates as the original, so a fix is never accepted on weaker evidence than the work it replaces."
      },
      {
        "q": "When does exekova escalate to a human?",
        "a": "When policy requires it, retries are exhausted, the requirements are ambiguous, risk exceeds your configured limits, required access is unavailable, or the decision needs human judgement. Escalation is a defined state rather than a failure mode: the run holds, the reason and the evidence gathered so far are attached, and the work resumes from that point once the person has decided, rather than restarting."
      },
      {
        "q": "Can retry limits be configured?",
        "a": "Yes. Retry ceilings, budget caps and runtime limits are set per workspace and can be overridden per piece of work. They are enforced during the run rather than reported afterwards, so work that exceeds them stops and escalates instead of continuing. Setting them is how you bound the cost of a failure: a piece of work that cannot be repaired within its ceiling becomes a person's decision."
      }
    ]
  },
  "security": {
    "title": "Security",
    "items": [
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
    ]
  },
  "deployment": {
    "title": "Deployment",
    "items": [
      {
        "q": "Can exekova run in my AWS account?",
        "a": "Private cloud deployment into a customer-controlled AWS environment is offered under enterprise agreement. Scope and supported configuration are confirmed during evaluation. What is being placed in your account, how it reaches the systems it must integrate with, and which execution engines are permitted are all settled at that point, because they determine what the deployment can actually do rather than being adjustable afterwards."
      },
      {
        "q": "Can exekova run in Azure?",
        "a": "Azure is a supported target for customer-cloud deployment under enterprise agreement, subject to configuration review. The review establishes which execution engines and integrations are available in your environment, since some depend on external services, and how credentials are held and scoped within your tenancy. The deployment shape follows from that rather than from a standard template applied to every customer."
      },
      {
        "q": "Can exekova run in Google Cloud?",
        "a": "GCP is a supported target for customer-cloud deployment under enterprise agreement, subject to configuration review. As with the other customer-cloud targets, the review settles which execution engines and integrations your environment permits, how credentials are stored and scoped, and what network access the work requires. Those answers determine the supported configuration, so they are agreed before deployment rather than discovered during it."
      },
      {
        "q": "Can exekova run on-premises?",
        "a": "On-premises deployment is on the enterprise roadmap. Requirements are scoped directly with the customer; it is not offered as a self-serve option. It is described as roadmap rather than available deliberately, and the same wording is used on the pricing and security pages. Which execution engines and integrations you require has a direct bearing on feasibility, because several depend on services reachable only outside a closed network."
      },
      {
        "q": "Can exekova run in an isolated environment?",
        "a": "Restricted-network deployment is scoped case by case and depends on which execution engines and integrations you require, since some rely on external services. The scoping establishes what can run entirely inside your boundary and what cannot, so the constraint is known before deployment rather than found afterwards. Where a required capability depends on an external service, that dependency is stated rather than worked around silently."
      }
    ]
  },
  "integrations": {
    "title": "Integrations",
    "items": [
      {
        "q": "Does exekova support Jira?",
        "a": "Yes. Jira Cloud is available today for receiving work and writing updates back. exekova picks up issues, executes against them, and writes progress and outcomes back, so the board reflects the state of the work without anyone updating it by hand. Writes use credentials held by the platform and scoped to the permissions you granted, and can be placed behind an approval gate."
      },
      {
        "q": "Does exekova support GitHub?",
        "a": "Yes. GitHub is available today for repository workflows, including branches and pull requests. exekova reads repository and issue context, executes on working branches, and delivers verified work as a pull request with its test evidence attached. Merge and production approval stay with your team: the integration delivers reviewed work to the point of decision rather than past it."
      },
      {
        "q": "Which integrations are available?",
        "a": "All integrations in Engineering & AI, Communication & knowledge, and Cloud & delivery are available, along with Stripe for billing workflows. Browse the integrations directory for the full list. Each tool in the directory carries its current status, so what is available today and what is on the roadmap are distinguishable at a glance rather than implied by the presence of a logo."
      },
      {
        "q": "Which integrations are planned?",
        "a": "The remaining business and operations integrations, apart from Stripe, and harnesses and automation integrations are on the roadmap. Each tool is labelled with its current status on the integrations page. Planned means exactly that: it is not connected today, and the label is not softened. Where a system has no dedicated integration yet, REST and webhook connectivity are also on the roadmap rather than available."
      },
      {
        "q": "Can exekova connect through APIs?",
        "a": "REST API and webhook connectivity are on the roadmap for systems without a dedicated integration. They are listed as Planned rather than Available, which means they cannot be relied on for work you are scoping today. Where a system already has a dedicated integration, that path is the supported one, and its status is shown alongside every other tool in the integrations directory."
      },
      {
        "q": "Will exekova support MCP?",
        "a": "MCP server support is planned. It is listed as Planned rather than Available, so it is not something to build a current deployment around. The status shown in the integrations directory is the authoritative one for every tool, and it is not softened for capabilities that are expected rather than shipped. When it moves, it will move in that directory first."
      }
    ]
  },
  "performance": {
    "title": "Performance",
    "items": [
      {
        "q": "How does exekova measure performance?",
        "a": "On outcomes: tasks completed, acceptance rate, time to outcome, cost per accepted task, retry rate, intervention rate, blocked time and evidence coverage. Token and agent counts are kept as secondary diagnostics. The distinction is deliberate - activity metrics describe how hard a system worked, not whether the work was accepted. Every figure reported comes from your own runs rather than from a published benchmark."
      },
      {
        "q": "Can I see cost per task?",
        "a": "Yes. Execution cost is attributed per run, and reported both per completed task and per accepted task. The two differ, and the difference is the point: work that failed your standard is not billed, so cost per accepted task is the number that describes what the outcome actually cost you. Both are drawn from your own runs rather than from any published figure."
      },
      {
        "q": "Can I see retry rate?",
        "a": "Yes, with the diagnosis attached, so recurring causes are visible rather than just the count. A retry rate on its own says how often something went wrong; the diagnosis says what, which is the part that can be acted on. Because every retry runs against a diagnosis rather than repeating the original attempt, the record distinguishes between a transient failure and a systematic one."
      },
      {
        "q": "Can I measure human intervention?",
        "a": "Yes. Intervention rate records how often work required a person, and what triggered it. The trigger matters more than the rate: policy-required approval, an exhausted retry ceiling, ambiguous requirements, unavailable access and risk beyond your configured limits are different signals with different remedies. Tracking them separately shows whether intervention reflects your governance working as intended or a gap in what the platform was given."
      },
      {
        "q": "Can I see which work is blocked?",
        "a": "Yes. Blocked work appears on the Live Floor with the blocking reason. Blocking is a recorded state rather than a silent stall: the predecessor or missing dependency that caused it is attached, so it is clear what has to change for the work to resume. Work that cannot resume within its configured limits escalates to a person rather than remaining blocked indefinitely."
      },
      {
        "q": "Can I audit completed work?",
        "a": "Yes. Each completed outcome carries its plan, actions, test and review results, retries, escalations and approvals. That record is captured during the run rather than assembled afterwards, and it is retained as Outcome History, so a completed outcome can be examined long after the run finished. It is also what a later run starts from, rather than beginning again from nothing."
      },
      {
        "q": "What is Outcome History?",
        "a": "Outcome History is the retained record of what a run produced: the plan, the actions taken, the decisions made, the evidence collected, the failures and recoveries, the verification result and the final outcome. It is what lets completed work be audited later, and what lets a new run start from what an earlier one established rather than from nothing."
      }
    ]
  },
  "commercial": {
    "title": "Commercial",
    "items": [
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
    ]
  }
};

export const ecosystemGroups: EcosystemGroup[] = [
  {
    "id": "engineering",
    "label": "Engineering & AI",
    "items": [
      "Claude Code",
      "Codex",
      "GitHub",
      "GitLab",
      "Bitbucket",
      "Azure DevOps",
      "Cursor",
      "GitHub Copilot",
      "Gemini CLI",
      "Windsurf",
      "JetBrains Junie",
      "Tabnine",
      "OpenHands",
      "OpenCode",
      "Cline",
      "Aider"
    ]
  },
  {
    "id": "work",
    "label": "Work management",
    "items": [
      "Jira",
      "Linear",
      "Asana",
      "monday.com",
      "ClickUp",
      "Airtable",
      "Smartsheet"
    ]
  },
  {
    "id": "collaboration",
    "label": "Communication & knowledge",
    "items": [
      "Slack",
      "Microsoft Teams",
      "Notion",
      "Confluence",
      "Google Chat",
      "Zoom",
      "Gmail",
      "Microsoft Outlook",
      "Google Drive",
      "WhatsApp",
      "Coda",
      "Microsoft OneDrive",
      "Microsoft SharePoint",
      "Dropbox",
      "Box",
      "Proton Mail",
      "Zoho Mail",
      "Signal",
      "Telegram",
      "Viber"
    ]
  },
  {
    "id": "business",
    "label": "CRM, service & commerce",
    "items": [
      "Salesforce",
      "HubSpot",
      "Microsoft Dynamics 365",
      "Zoho CRM",
      "ServiceNow",
      "Jira Service Management",
      "Freshservice",
      "BMC Helix",
      "Zendesk",
      "Intercom",
      "Freshdesk",
      "Stripe",
      "Adyen",
      "PayPal",
      "Square",
      "Shopify",
      "BigCommerce",
      "WooCommerce",
      "Adobe Commerce"
    ]
  },
  {
    "id": "cloud",
    "label": "Cloud & delivery",
    "items": [
      "Cloudflare",
      "AWS",
      "Google Cloud",
      "Microsoft Azure",
      "Oracle Cloud",
      "Fastly",
      "Akamai",
      "Amazon CloudFront",
      "Docker",
      "Kubernetes",
      "Podman",
      "containerd",
      "CRI-O",
      "HashiCorp Nomad",
      "Amazon ECS",
      "Docker Swarm",
      "Vercel",
      "Netlify",
      "Render",
      "Cloudflare Pages"
    ]
  },
  {
    "id": "observability",
    "label": "Observability",
    "items": [
      "Elasticsearch",
      "Kibana",
      "Logstash",
      "Beats",
      "Elastic Agent",
      "Elastic APM",
      "Datadog",
      "Sentry",
      "PagerDuty",
      "Dynatrace",
      "New Relic",
      "Splunk",
      "Grafana",
      "Bugsnag",
      "Rollbar",
      "incident.io",
      "FireHydrant",
      "Rootly",
      "Fluentd",
      "Fluent Bit",
      "OpenTelemetry Collector",
      "Vector",
      "Cribl"
    ]
  },
  {
    "id": "data",
    "label": "Databases & streaming",
    "items": [
      "Apache Kafka",
      "MongoDB",
      "Oracle",
      "PostgreSQL",
      "MySQL",
      "Microsoft SQL Server",
      "MariaDB",
      "Couchbase",
      "Amazon DynamoDB",
      "Cloud Firestore",
      "Redpanda",
      "Apache Pulsar",
      "RabbitMQ",
      "OpenSearch",
      "Algolia",
      "Apache Solr"
    ]
  },
  {
    "id": "mobile",
    "label": "Mobile platforms",
    "items": [
      "Android",
      "iOS",
      "HarmonyOS",
      "KaiOS"
    ]
  },
  {
    "id": "automation",
    "label": "Automation & agents",
    "items": [
      "n8n",
      "Zapier",
      "Make",
      "Workato",
      "Activepieces",
      "LangGraph",
      "CrewAI",
      "AutoGen",
      "Semantic Kernel"
    ]
  }
];

export function platformPageBySlug(slug: string) {
  return platformPages.find(item => item.slug === slug);
}
