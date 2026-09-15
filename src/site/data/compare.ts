import { taskOffer } from '@/beta/data/offer';

/**
 * Comparison pages. The other product is described from its own public
 * material, with the date it was read stated on the page. Every difference is
 * then made in Exekova's favour: what an accountable, verified outcome gives a
 * team that a finished-looking result does not.
 */
export type Comparison = {
  slug: string;
  name: string;
  title: string;
  description: string;
  headline: [string, string];
  lede: string;
  definitions: { q: string; a: string }[];
  sideBySide: { label: string; headline: [string, string]; body: string; left: { title: string; items: string[] }; right: { title: string; items: string[] } };
  fairness: { label: string; headline: [string, string]; body: string; items: { title: string; body: string }[] };
  pilot: { label: string; headline: [string, string]; body: string; steps: string[] };
  faq: { q: string; a: string }[];
  sources: { label: string; url: string; detail: string }[];
  checked: string;
  /** Replaces the default hero note about the other product's own material. */
  note?: string;
  cta: { headline: [string, string]; body: string; note: string };
};

export const comparisons: Comparison[] = [
  {
    slug: 'grokbot',
    name: 'Grok Bot',
    title: 'Exekova vs Grok Bot',
    description: 'Grok Bot gives you AI teammates that report back. Exekova gives you an accountable outcome: one scoped task in, one verified pull request out, paid on acceptance.',
    headline: ['Exekova', 'vs Grok Bot.'],
    lede: 'Grok Bot gives you AI teammates that sign in to your tools and come back saying the work is done. Exekova gives you something a team can stand behind: one scoped task in, one independently reviewed, verified pull request out, in a repository you approve, paid for only when it is accepted. When the work has to be right, provable and yours, that is the difference that matters.',
    definitions: [
      { q: 'What is Grok Bot?', a: 'Grok Bot, from xAI, is a set of AI teammates you message from your desktop or iOS. Each Bot runs on a persistent cloud computer that holds your files, browser and logins, signs in to your apps and uses them the way you would, learns a routine by following you through it once, works in parallel with other Bots, and comes back when it wants your approval. At the time of writing it is included with eligible Cursor and SuperGrok subscriptions, with extra usage billed by tokens, and enterprise access is on a waitlist.' },
      { q: 'How is Exekova different from Grok Bot?', a: `Exekova separates producing work from accepting it. You bring one scoped engineering task with acceptance criteria, from Jira or the Work Intent form. The change is made only in the GitHub repositories you approve, on an isolated branch. Then a capability that did not write it reviews it, the required tests and checks must pass, and only then is the outcome accepted and delivered as a pull request with its evidence. Exekova never merges or deploys, and you pay $${taskOffer.current} per accepted task, nothing for rejected attempts, and no subscription.` },
      { q: 'Why choose Exekova over a general AI teammate?', a: 'Because a finished-looking result is not the same as an accepted one. A Bot succeeds when it reports done; the checking is then yours. Exekova succeeds only when an independent review and the required checks agree that the exact revision meets your criteria, and that record is what you can take to a release board, an auditor or a CFO. Exekova is available to enterprises today, starting with a single task.' },
    ],
    sideBySide: {
      label: 'Side by side',
      headline: ['Grok Bot.', 'Exekova.'],
      body: 'The left column is Grok Bot as its own page describes it. The right column is what you get from Exekova today, and why each point is the safer place to put engineering work.',
      left: { title: 'Grok Bot', items: [
        'You message a Bot like a teammate and it decides how to get there',
        'Runs on a shared persistent cloud computer that holds your files, browser and logins',
        'Learns routines by watching you; the result depends on what it picked up',
        'Several Bots pass work between themselves; you watch rather than approve every step',
        'Reports done; checking the finished work in your tools is your job',
        'Included with eligible Cursor and SuperGrok plans; extra usage billed by tokens',
        'Enterprise access on a waitlist at the time of writing',
      ] },
      right: { title: 'Exekova', items: [
        'You state the task and what done means; nothing starts until both are clear',
        'Works only in the GitHub repositories you approve, on an isolated branch, under scoped access you grant',
        'Nothing to teach and nothing that drifts: the acceptance criteria travel with the task and are verified every time',
        'One task, one outcome, one record your team can inspect end to end',
        'Done means independent review passed and required checks passed, before you ever see it',
        `$${taskOffer.current} per accepted task; rejected attempts cost $0; no subscription and no token meter`,
        'Available today for scoped engineering work; enterprises start with one task',
      ] },
    },
    fairness: {
      label: 'Why the difference matters',
      headline: ['Finished-looking', 'is not accepted.'],
      body: 'Three things Exekova does that a general AI teammate leaves to you.',
      items: [
        { title: 'Done is decided by evidence, not by the model', body: 'A Bot decides for itself when it is finished. With Exekova, the capability that writes the change never accepts it: an independent review and the required checks decide, against the criteria you set. A completion claim on its own is never enough, so what reaches your team is already reviewed.' },
        { title: 'The work stays in your repository', body: 'Grok Bot works from a shared cloud computer signed in to your tools. Exekova works inside the GitHub repositories you approve, on an isolated branch, with access scoped to the task. The change, the review and the check results land where your engineers already look, and your team owns the merge and the release.' },
        { title: 'You pay for outcomes, not for capacity', body: `A subscription with usage billing charges for effort whether or not the result passes. Exekova charges $${taskOffer.current} per accepted task and nothing for a rejected attempt, so the cost of getting it wrong sits with Exekova rather than on your invoice.` },
      ],
    },
    pilot: {
      label: 'See it on your own work',
      headline: ['Run the same task', 'both ways.'],
      body: 'The fastest way to see the difference is one real task, handed to Exekova and to whatever you use today, judged on what comes back.',
      steps: [
        'Pick one task you would otherwise have staffed: a bug fix, a small feature or a coverage gap with a clear finish line.',
        'Write down what done means. Exekova will hold the outcome to exactly that.',
        'Hand the same task to Exekova and to your current approach, with the same repository and the same permissions.',
        'Compare what comes back: the reviewed revision, the independent review result, the check results and the acceptance record.',
        'Count the cost of each accepted result, including rework and the time your people spent checking. Then decide.',
      ],
    },
    faq: [
      { q: 'Can a team use both?', a: 'Yes. Many teams will keep a general AI teammate for research, outreach and cross-app chores. When the work is a change to production software, send it to Exekova: it comes back reviewed, checked and recorded, ready for your release decision, and it is only invoiced once it is accepted.' },
      { q: 'Is Exekova cheaper?', a: `For accepted engineering work the model is simpler and the risk sits with Exekova: $${taskOffer.current} per accepted task, $0 for rejected attempts, no subscription and no token meter. A subscription that bills extra usage charges for effort whether or not the result passes. Exekova charges only for outcomes that did.` },
      { q: 'Who is accountable for the result?', a: 'Exekova is, until your team accepts it. A change becomes an outcome only after independent review and the required checks pass against your criteria, and a rejected attempt is not invoiced. With a general Bot, the Bot reports done and the checking is yours.' },
      { q: 'Does Exekova need to learn my workflows?', a: 'No, and that is a strength. There is nothing to teach, nothing that drifts as your tools change, and nothing that depends on what a Bot happened to observe. The acceptance criteria travel with each task and are verified every time, so the record is explicit from the first task onwards.' },
      { q: 'Is Exekova available for enterprises now?', a: 'Yes. Exekova is available today for scoped engineering work. Enterprises start with one task; eligibility and repository access are confirmed before work begins. Grok Bot’s own page lists enterprise access as coming, with a waitlist.' },
    ],
    sources: [
      { label: 'Grok Bot: AI teammates that finish the work', url: 'https://x.ai/bot', detail: 'Product page: teammates, cloud computer, routines, parallel Bots, pricing, availability and FAQs.' },
    ],
    checked: '15 September 2026',
    cta: { headline: ['Judge it against', 'your own work.'], body: 'Bring one task you would otherwise have staffed. Compare the record that comes back.', note: 'Humans set direction. Exekova drives execution.' },
  },
  {
    slug: 'rpa',
    name: 'RPA',
    title: 'Exekova vs RPA',
    description: 'RPA replays recorded steps against fixed interfaces. Exekova takes an objective and a standard, verifies the result independently and is paid only for accepted work.',
    headline: ['Exekova', 'vs RPA.'],
    lede: 'Robotic process automation replays a procedure a person scripted in advance, and it breaks the moment an interface, a field or an assumption changes. Exekova is given the objective and the definition of done, plans the path itself, verifies the result independently and recovers inside the run. One automates a procedure. The other is accountable for an outcome.',
    note: 'RPA is described as the category is generally understood. No vendor is named.',
    definitions: [
      { q: 'What is RPA?', a: 'Robotic process automation executes a procedure a person recorded or scripted in advance, driving applications through their user interface or API exactly as instructed. It is deterministic by design: the same input produces the same steps every time. That is what makes it cheap to run at volume, and also why it breaks whenever the world it was recorded against changes.' },
      { q: 'How is Exekova different from RPA?', a: 'RPA replays fixed steps against fixed interfaces. Exekova plans against an objective, adapts when what it finds differs from what it expected, has the result reviewed by a capability that did not produce it, runs the required checks, and recovers from failure inside the run. RPA automates a procedure and hands every exception to a person. Exekova executes a piece of work and hands back an accepted outcome with its evidence.' },
      { q: 'Why choose Exekova over RPA?', a: `Because the work that hurts is the work RPA cannot hold: the bot that breaks when a screen changes, the exception queue that grows faster than anyone clears it, and the process that was never automated because the path varies. Exekova takes that work as it is, decides the path per run, and returns a reviewed, verified outcome. A rejected attempt costs $0, so the risk of the path being harder than expected sits with Exekova, not with your team.` },
    ],
    sideBySide: {
      label: 'Side by side',
      headline: ['RPA.', 'Exekova.'],
      body: 'RPA is a script with a maintenance owner. Exekova is an outcome with an acceptance record. The left column is RPA as the category is generally understood; the right is what Exekova delivers today.',
      left: { title: 'RPA', items: [
        'A person records or scripts the steps, then maintains them',
        'Deterministic: the same steps every run, whatever it finds',
        'Breaks when an interface, a field or an assumption changes',
        'Exceptions leave the bot and join a human queue',
        'Succeeds by completing the script, right or wrong',
        'Licensed per bot, plus the engineers who keep the bots running',
        'Accountable for executing the procedure, not for the result',
      ] },
      right: { title: 'Exekova', items: [
        'You state the objective and what done means; nothing else to script',
        'Adaptive: the path is planned per run against your criteria',
        'Re-plans when the situation changes instead of breaking',
        'Diagnoses, repairs and retries inside the run, with the evidence kept',
        'Succeeds only when independent review and required checks pass',
        `$${taskOffer.current} per accepted task; rejected attempts cost $0; no bots to maintain`,
        'Accountable for reaching the outcome, until your team accepts it',
      ] },
    },
    fairness: {
      label: 'Why the difference matters',
      headline: ['A script completes.', 'An outcome is accepted.'],
      body: 'Three things Exekova carries that an RPA estate leaves with your team.',
      items: [
        { title: 'The path is decided per run, not recorded once', body: 'A recorded procedure is only ever as current as the day it was recorded. Exekova reads the task and the repository as they are now, plans the change against your acceptance criteria, and adapts when what it finds differs from what it expected. A changed field is a situation to handle, not a break to investigate.' },
        { title: 'Exceptions are handled inside the run', body: 'When an RPA bot meets something unexpected, the work stops and a person picks it up from a queue. When Exekova meets a failure, it captures the evidence, diagnoses, repairs, retests and re-enters review, within a retry ceiling. People are brought in with the diagnosis attached, only when policy or judgement requires it.' },
        { title: 'You pay for accepted outcomes, not for bot upkeep', body: `Bot licences and the engineers who keep bots alive are a cost whether the bots work or not. Exekova charges $${taskOffer.current} per accepted task and nothing for a rejected attempt, so spend maps to outcomes your team accepted.` },
      ],
    },
    pilot: {
      label: 'See it on your own work',
      headline: ['Start with the bot', 'that breaks most.'],
      body: 'The fastest way to see the difference is the process your RPA estate handles worst.',
      steps: [
        'Pick the process that breaks most often, carries the longest exception queue, or was never automated because the path varies.',
        'Write down what done means for it. Exekova will hold the outcome to exactly that.',
        'Hand one instance to Exekova as a scoped task, with the same repository and permissions your team would use.',
        'Compare what comes back: the reviewed change, the independent review result, the check results and the acceptance record.',
        'Count the cost per accepted outcome against the bot licence, its maintenance and the queue it left behind.',
      ],
    },
    faq: [
      { q: 'Can Exekova replace an existing RPA estate?', a: 'Start where the estate hurts: the bots that break often, the exception queue nobody clears, and the processes that were never automated because the path varies. Every candidate you move stops needing a maintenance owner and starts returning an accepted outcome with evidence. Stable bots can stay until they break; when they do, you already have somewhere better to send the work.' },
      { q: 'Does Exekova need stable interfaces?', a: 'No. Exekova works through the integrations you configure, with access scoped to what you granted, and re-plans when what it finds differs from what it expected. A changed field is a situation to handle rather than a break to investigate.' },
      { q: 'Who is accountable when the work is wrong?', a: 'Exekova is, until your team accepts it. Output that has not passed independent review and the required checks is not an outcome, and a rejected attempt is not invoiced. With RPA, a completed script is treated as done whether or not the result was right.' },
      { q: 'What does a first move look like?', a: 'One process, one scoped task, one acceptance record. Bring the task from Jira or the Work Intent form, approve the repository, and judge the pull request that comes back against the criteria you wrote.' },
    ],
    sources: [],
    checked: '15 September 2026',
    cta: { headline: ['Judge it against', 'your own work.'], body: 'Bring one process your bots cannot hold. Compare the record that comes back.', note: 'Humans set direction. Exekova drives execution.' },
  },
  {
    slug: 'ai-agent-platforms',
    name: 'AI agent platforms',
    title: 'Exekova vs AI agent platforms',
    description: 'Agent platforms give you the means to build and supervise agents. Exekova takes the work, verifies the outcome independently and is accountable for it.',
    headline: ['Exekova vs', 'AI agent platforms.'],
    lede: 'An agent platform gives you the building blocks to construct and supervise agents. You choose the models, write the prompts, design the hand-offs and judge the output, and when an agent gets something wrong the result is yours to own. Exekova takes the work instead. You state the objective and the standard; Exekova coordinates the capabilities the work needs, verifies the result independently and is accountable for the outcome.',
    note: 'AI agent platforms are described as the category is generally understood. No vendor is named.',
    definitions: [
      { q: 'What is an AI agent platform?', a: 'An agent platform provides the building blocks for constructing and running AI agents: model access, tool and function calling, memory, and the orchestration primitives for passing work between agents. You configure the agents, choose the models, write the prompts and supervise what they produce. The agents are the product you are building.' },
      { q: 'How is Exekova different from an AI agent platform?', a: 'Agent platforms are organised around agents: you configure them, connect them and supervise them. Exekova is organised around work. You define the objective, the boundaries and the quality bar. Exekova decides which capabilities and engines the work requires, coordinates them, has the result reviewed independently and is accountable for the outcome rather than for any individual agent’s output.' },
      { q: 'Why choose Exekova over building on an agent platform?', a: 'Because building agents is a second job, and owning their mistakes is a third. With an agent platform, every prompt, hand-off and judgement call is engineering your team has to write and keep working, and there is nobody but you to say whether the output is good enough. With Exekova there is nothing to build: you hand over the task, an independent review and the required checks decide whether it is done, and a rejected attempt costs $0.' },
    ],
    sideBySide: {
      label: 'Side by side',
      headline: ['AI agent platform.', 'Exekova.'],
      body: 'One gives you the means to build agents. The other takes the work. The distinction decides who owns the result when something goes wrong.',
      left: { title: 'AI agent platform', items: [
        'You build, configure and supervise the agents',
        'You choose the models and write the prompts, then keep them working',
        'You design how agents hand off to one another',
        'Context lives inside a model session and is lost when it ends',
        'You judge whether the output is good enough',
        'Billed for the platform and the tokens, whatever the result',
        'You own the result, including the mistakes',
      ] },
      right: { title: 'Exekova', items: [
        'You hand over the work, not the configuration',
        'Engine and model selection happen inside the constraints you set',
        'Coordination between capabilities is the platform’s job',
        'Context lives in Execution State, outside any session, so work can pause, resume and be inspected',
        'Acceptance is an independent step with its own evidence',
        `$${taskOffer.current} per accepted task; rejected attempts cost $0`,
        'The platform is accountable for the outcome, until your team accepts it',
      ] },
    },
    fairness: {
      label: 'Why the difference matters',
      headline: ['Configuring agents', 'is not finishing work.'],
      body: 'Three things Exekova takes off your team that an agent platform leaves on it.',
      items: [
        { title: 'You hand over the work, not the configuration', body: 'On an agent platform the choreography is yours to design: which agent runs when, what context it gets, how outputs combine. Exekova performs that coordination against the objective and boundaries you set. Nothing to prompt, wire or babysit.' },
        { title: 'Context outlives the session', body: 'Agent context lives inside a model session and disappears with it. Exekova keeps the plan, the actions, the evidence and the decisions in Execution State, so a piece of work can be paused, inspected, resumed and handed between capabilities without losing its history, and engines can change without the work starting over.' },
        { title: 'Acceptance is independent, with its own evidence', body: 'An agent platform lets an agent declare itself finished, and leaves you to judge. Exekova never lets the capability that produced the work accept it: an independent review and the required checks decide, and the record travels with the outcome.' },
      ],
    },
    pilot: {
      label: 'See it on your own work',
      headline: ['Compare finishing', 'against building.'],
      body: 'The honest comparison is the same task done both ways, with the time spent building and supervising counted.',
      steps: [
        'Pick one scoped engineering task with a clear finish line.',
        'Write down what done means, including the tests and checks that must pass.',
        'Hand it to Exekova. In parallel, note what it would take to build and supervise an agent to do it.',
        'Compare what comes back: the reviewed revision, the independent review result, the check results and the acceptance record.',
        'Count the cost per accepted outcome, including the engineering time an agent build would need. Then decide.',
      ],
    },
    faq: [
      { q: 'Can Exekova coordinate multiple AI agents?', a: 'Yes. A single piece of work routinely involves more than one capability, and Exekova assigns them, sequences them, passes context between them and reconciles their output against the acceptance criteria. You do not configure or supervise the individual agents.' },
      { q: 'Can Exekova use different AI models?', a: 'Yes. Engine and model selection is Exekova’s decision inside the boundaries you set, and you can constrain which engines are permitted for a given piece of work. Because the plan, the context and the evidence live in Execution State rather than inside a model session, engines can change without the work losing its history.' },
      { q: 'Can both be used together?', a: 'Yes. Agents your team has already built can be capabilities Exekova routes work to, under the same boundaries, gates and evidence requirements as anything else it coordinates. You keep what you built; Exekova owns the outcome.' },
      { q: 'Who owns the result?', a: 'Exekova, until your team accepts it. A change becomes an outcome only after independent review and the required checks pass against your criteria, and a rejected attempt is not invoiced. On an agent platform, the result and its mistakes are yours from the first prompt.' },
    ],
    sources: [],
    checked: '15 September 2026',
    cta: { headline: ['Judge it against', 'your own work.'], body: 'Bring one task you would otherwise have built an agent for. Compare the record that comes back.', note: 'Humans set direction. Exekova drives execution.' },
  },
  {
    slug: 'chatgpt-and-assistants',
    name: 'ChatGPT and AI assistants',
    title: 'Exekova vs ChatGPT and AI assistants',
    description: 'An assistant answers a prompt and hands the result back to be judged. Exekova carries a piece of work to a verified outcome and is accountable for it.',
    headline: ['Exekova vs ChatGPT', 'and AI assistants.'],
    lede: 'With an assistant, the person holds the loop: prompt, read, judge, correct, re-prompt, and finally put the result where it belongs. With Exekova, the platform holds the loop. You set the objective and the standard; the work is implemented, reviewed independently, checked and delivered into your repository as a pull request, and it is only invoiced once your team accepts it.',
    note: 'ChatGPT is named as the best-known assistant. The comparison applies to general AI assistants; no product claim is made about any of them.',
    definitions: [
      { q: 'How is Exekova different from ChatGPT or an AI assistant?', a: 'An assistant responds to a prompt and hands the result back to you. Exekova takes a unit of work through to completion: implementation on an isolated branch, independent review, required tests and checks, failure diagnosis and retry, and delivery as a pull request in your repository. The person asking is not responsible for operating the loop, and nothing is invoiced until the outcome is accepted.' },
      { q: 'What does operating the loop mean?', a: 'It is the work around the work: deciding what to ask for, reading what came back, judging whether it is good enough, spotting what is wrong, asking again, and finally putting the result where it belongs. With an assistant that all sits with the person. With Exekova it sits with the platform, bounded by the acceptance criteria and approvals you defined.' },
      { q: 'Why choose Exekova over an assistant for real work?', a: 'Because a fluent answer is not a finished change. An assistant’s output arrives unreviewed and unplaced, and the person reading it becomes the reviewer, the tester and the integrator. Exekova returns work that has already passed an independent review and the required checks, in the repository where it belongs, with the record to prove it. Your people keep the decisions; Exekova carries the execution between them.' },
    ],
    sideBySide: {
      label: 'Side by side',
      headline: ['ChatGPT and assistants.', 'Exekova.'],
      body: 'The difference is where the loop sits, and who owns the result when it is wrong.',
      left: { title: 'ChatGPT and AI assistants', items: [
        'Responds to a prompt with a plausible first version',
        'The person holds the loop: judge, correct, re-prompt',
        'Output comes back to a person to place in the right system',
        'Quality is whatever the person reading it notices',
        'Context lives in the conversation and fades with it',
        'A subscription or usage bill, whatever the result',
        'The person owns the result, including what they missed',
      ] },
      right: { title: 'Exekova', items: [
        'Takes an objective and a definition of done',
        'The platform holds the loop, within the ceilings you set',
        'Work lands in your repository as a pull request, with its evidence',
        'Quality is judged against your criteria by an independent review and required checks',
        'Context lives in Execution State and the acceptance record',
        `$${taskOffer.current} per accepted task; rejected attempts cost $0`,
        'The platform is accountable for the outcome, until your team accepts it',
      ] },
    },
    fairness: {
      label: 'Why the difference matters',
      headline: ['A good answer', 'is not a finished change.'],
      body: 'Three things Exekova does that an assistant leaves to the person who asked.',
      items: [
        { title: 'The platform holds the loop', body: 'Reading, judging, correcting and re-asking is where the time actually goes. Exekova carries that loop itself: implementation, independent review, checks, diagnosis and retry all happen inside the run, and a person is brought in only where policy or judgement requires it.' },
        { title: 'The work lands where it belongs', body: 'An assistant hands text back to a chat window. Exekova delivers a pull request on an isolated branch in the repository you approve, with the review and check results attached, ready for your release decision.' },
        { title: 'Quality is decided by your gates, not by what a reader notices', body: 'With an assistant, quality is whatever the person spots. With Exekova, the reviewed revision must pass an independent review and the required checks against the criteria you set before it is offered to you at all, and a rejected attempt costs $0.' },
      ],
    },
    pilot: {
      label: 'See it on your own work',
      headline: ['Ask both.', 'Compare what arrives.'],
      body: 'The clearest test is a task you would normally take to an assistant, sent to Exekova instead.',
      steps: [
        'Pick one task you would otherwise have prompted an assistant for, with a clear finish line.',
        'Write down what done means, including the tests and checks that must pass.',
        'Hand the task to Exekova and, if you like, ask your assistant for the same thing.',
        'Compare what arrives: a chat answer to review and place, or a reviewed pull request with its evidence.',
        'Count the time your people spent reading, correcting and integrating each one. Then decide.',
      ],
    },
    faq: [
      { q: 'Does Exekova replace employees?', a: 'No. It changes what people spend their time on. People keep the decisions that carry judgement: what to pursue, what the standard is, what is acceptable and what ships. The execution between those decisions, including the review loop an assistant leaves with the person, is what Exekova carries.' },
      { q: 'Is Exekova built on a single model?', a: 'No. Engine and model selection is the platform’s decision inside the boundaries you set, and you can constrain which engines are permitted for a given piece of work. The outcome does not depend on one vendor’s model.' },
      { q: 'Who validates the output?', a: 'Not the capability that produced it, and not the person who asked. Validation is performed independently against the acceptance criteria you set, with the required checks run and the results kept. Final acceptance stays with your team.' },
      { q: 'Can I keep using an assistant?', a: 'Of course, for thinking, drafting and exploring. When the thinking is done and the work has to be finished, reviewed and placed in your repository, send it to Exekova and get back an accepted outcome instead of a draft.' },
    ],
    sources: [],
    checked: '15 September 2026',
    cta: { headline: ['Judge it against', 'your own work.'], body: 'Bring one task you would otherwise have prompted for. Compare the record that comes back.', note: 'Humans set direction. Exekova drives execution.' },
  },
];

export function comparisonBySlug(slug: string) {
  return comparisons.find(item => item.slug === slug);
}
