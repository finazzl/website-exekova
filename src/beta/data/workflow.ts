/** The complete customer-facing journey. Review and checks belong to the outcome. */
export const WORKFLOW_STEPS = [
  { id: 'task', action: 'Get', label: 'Get', icon: 'file', detail: 'Choose a task with clear acceptance criteria.', body: 'Bring a task from Jira or our Work Intent form. Slack, Teams, and Excel intake are planned.' },
  { id: 'repo', action: 'Set', label: 'Set', icon: 'branch', detail: 'Confirm your GitHub repository and scope.', body: 'Select an approved GitHub repository and confirm the scope.' },
  { id: 'outcome', action: 'Done', label: 'Done', icon: 'check', detail: 'Your verified pull request, with evidence.', body: 'Receive a verified pull request with the code change, independent review, and check results. Your team owns the merge.' },
] as const;

/** Three-word homepage expression of the journey: "Get. Set. Done." Step labels keep the subject for context. */
export const WORKFLOW_SUMMARY = WORKFLOW_STEPS.map(step => `${step.action}.`).join(' ');
