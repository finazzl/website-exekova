import { integrationDetails, type IntegrationDetail } from './integrations';

/**
 * Slack and Microsoft Teams as sources of human intent: a request written by
 * a person in a channel or thread becomes a scoped task with acceptance
 * criteria, and the outcome is reported back where the work was asked for.
 * Written here rather than imported; the catalogue rows come from the
 * content layer.
 */
export const intakeIntegrations: IntegrationDetail[] = [
  {
    slug: 'slack',
    name: 'Slack',
    status: 'Available',
    category: 'Communication & knowledge',
    accent: 'azure',
    summary: 'Slack is where a lot of work is first asked for. Exekova takes the request as a person states it in a channel or thread, turns it into a scoped task with acceptance criteria, and reports back in the same thread as the work moves through review, verification and acceptance.',
    receives: ['A request written by a person in a channel or thread you connect', 'The thread context around it: who asked, what was clarified, what was agreed', 'Acceptance criteria as the requester states them, or a prompt for them when they are missing', 'Approvals and answers to questions, posted in the thread'],
    sends: ['The task restated with its acceptance criteria, for the requester to confirm', 'Status as the work moves through review, verification and acceptance', 'A link to the delivered pull request with its evidence', 'Questions when a request is too thin to execute, and a blocked notice with the reason'],
    workflows: ['A request in a channel becomes a scoped task', 'Acceptance criteria clarified in the thread before work starts', 'Status and evidence posted back where the work was asked for', 'Approval of sensitive steps from the thread'],
    flow: ['A person asks for work in a connected channel or thread', 'Exekova restates it as a task with acceptance criteria and asks the requester to confirm', 'Eligibility and repository access are confirmed before anything starts', 'The change is implemented on an isolated branch in the approved repository', 'An independent reviewing capability assesses the change', 'Required tests and checks run and their results are captured', 'Progress, questions and blockers are posted in the same thread', 'The accepted outcome is delivered as a pull request, linked back in the thread'],
    setup: ['Connect the Slack workspace and choose the channels Exekova watches', 'Decide who may hand over work from those channels', 'Set the acceptance-criteria template requests are checked against', 'Map each channel to the repositories it may deliver into', 'Choose which steps need an approval in the thread', 'Set the retry ceiling and budget for work that arrives from Slack'],
    security: ['Access scoped to the channels you connect, not the whole workspace', 'Write actions limited to the threads where work was requested', 'Credentials held in platform secret storage', 'Every message Exekova posts is recorded in the run'],
    description: 'Slack as a source of human intent: a request in a thread becomes a scoped task with acceptance criteria, with status and evidence posted back where it was asked for.',
  },
  {
    slug: 'microsoft-teams',
    name: 'Microsoft Teams',
    status: 'Available',
    category: 'Communication & knowledge',
    accent: 'azure',
    summary: 'Microsoft Teams is where many teams decide what needs doing. Exekova takes the request as a person states it in a channel or chat, turns it into a scoped task with acceptance criteria, and keeps the conversation updated as the work moves through review, verification and acceptance.',
    receives: ['A request written by a person in a team channel or chat you connect', 'The conversation around it: who asked, what was clarified, what was agreed', 'Acceptance criteria as the requester states them, or a prompt for them when they are missing', 'Approvals and answers to questions, posted in the conversation'],
    sends: ['The task restated with its acceptance criteria, for the requester to confirm', 'Status as the work moves through review, verification and acceptance', 'A link to the delivered pull request with its evidence', 'Questions when a request is too thin to execute, and a blocked notice with the reason'],
    workflows: ['A request in a channel becomes a scoped task', 'Acceptance criteria clarified in the conversation before work starts', 'Status and evidence posted back where the work was asked for', 'Approval of sensitive steps from the conversation'],
    flow: ['A person asks for work in a connected channel or chat', 'Exekova restates it as a task with acceptance criteria and asks the requester to confirm', 'Eligibility and repository access are confirmed before anything starts', 'The change is implemented on an isolated branch in the approved repository', 'An independent reviewing capability assesses the change', 'Required tests and checks run and their results are captured', 'Progress, questions and blockers are posted in the same conversation', 'The accepted outcome is delivered as a pull request, linked back in the conversation'],
    setup: ['Connect the Microsoft 365 tenant and choose the teams and channels Exekova watches', 'Decide who may hand over work from those channels', 'Set the acceptance-criteria template requests are checked against', 'Map each channel to the repositories it may deliver into', 'Choose which steps need an approval in the conversation', 'Set the retry ceiling and budget for work that arrives from Teams'],
    security: ['Access scoped to the teams and channels you connect, not the whole tenant', 'Write actions limited to the conversations where work was requested', 'Credentials held in platform secret storage', 'Every message Exekova posts is recorded in the run'],
    description: 'Microsoft Teams as a source of human intent: a request in a chat becomes a scoped task, and status and evidence come back to the same place.',
  },
];

/** The detail pages featured on the catalogue: where the work lands, and where human intent arrives. */
export const featuredIntegrations: IntegrationDetail[] = [
  ...integrationDetails.filter(item => item.slug === 'github' || item.slug === 'jira'),
  ...intakeIntegrations,
];

/** Every integration with a detail page, imported or written here. */
export const allIntegrationDetails: IntegrationDetail[] = [...integrationDetails, ...intakeIntegrations];

export function anyIntegrationBySlug(slug: string) {
  return allIntegrationDetails.find(item => item.slug === slug);
}
