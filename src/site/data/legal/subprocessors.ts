import type { LegalDoc } from '../../components/LegalDocument';

/**
 * Subprocessors. The integrations the customer authorises (GitHub, Jira) are
 * real data flows and are listed as such. Infrastructure and support vendors
 * are not named here because they have not been confirmed; the rows say so
 * plainly rather than guess.
 */
export const subprocessors: LegalDoc = {
  slug: '/subprocessors',
  kicker: 'LEGAL',
  title: 'Subprocessors',
  accent: 'Who touches the data. And why.',
  lede: 'The third parties involved when exekova delivers the service, with their purpose and location. This page is referenced by the Data Processing Addendum and is updated before any change takes effect.',
  effectiveDate: '15 September 2026',
  version: '1.0',
  status: 'final',
  summary: [
    'GitHub and Jira are the integrations you connect. Data flows to them under your own authorisation and their own terms.',
    'The infrastructure and support vendors exekova engages on your behalf are listed in the table below. Rows marked “to be confirmed” are completed before this page is published.',
    'You are told by email before a subprocessor is added or replaced, at least 30 days ahead where practicable, and you may object.',
    'This page is reviewed with every update to the Data Processing Addendum.',
  ],
  sections: [
    {
      id: 'how-to-read',
      heading: 'How to read this page',
      blocks: [
        { type: 'p', text: 'A subprocessor is a third party that exekova engages to process Customer Personal Data on your behalf, as defined in the [Data Processing Addendum](/dpa). The integrations you authorise are different: you connect them, you control the authorisation, and the data flows under their terms with you. Both kinds are listed here so that the full path of your data is visible on one page.' },
        { type: 'p', text: 'Each entry gives the party, what it does for the service, the categories of data involved and the location of processing. Location is stated as the country or region where the data is stored and processed.' },
      ],
    },
    {
      id: 'integrations',
      heading: 'Integrations you authorise',
      blocks: [
        { type: 'p', text: 'These services are connected by you and act under your authorisation. exekova reads from and writes to them only within the projects and repositories you approve. Their own privacy and security terms govern the data they hold.' },
        { type: 'table', head: ['Party', 'Role in the service', 'Data involved', 'Location'], rows: [
          ['GitHub (GitHub, Inc.)', 'Code hosting. exekova reads the repositories you approve, works on an isolated task branch and opens pull requests. Required checks run in your repository.', 'Repository content, commit metadata, branch and pull request activity, check results, usernames of people on commits and reviews.', 'As set by your GitHub plan and data residency settings.'],
          ['Jira (Atlassian Pty Ltd)', 'Task source. exekova reads the issues you bring as tasks, including their descriptions and acceptance criteria.', 'Issue content, issue keys, reporters and assignees, comments you include in the task.', 'As set by your Atlassian site and data residency settings.'],
        ] },
        { type: 'p', text: 'The exekova Work Intent form is part of the exekova service, not a third party. Task intake from Slack, Microsoft Teams, Excel, Linear and CSV, and delivery to GitLab and Bitbucket, are planned and will be added to this table before they become available.' },
      ],
    },
    {
      id: 'infrastructure',
      heading: 'Infrastructure and support subprocessors',
      blocks: [
        { type: 'p', text: 'These are the parties exekova engages on your behalf to run the service, send email and provide support. Each row is completed with the vendor, its purpose and its location before this page is published. A row marked “to be confirmed” means no vendor has been confirmed for that purpose yet, and no Customer Personal Data is shared with an unlisted vendor for that purpose.' },
        { type: 'table', head: ['Purpose', 'Party', 'Data involved', 'Location'], rows: [
          ['Application hosting and compute', 'To be confirmed before publication', 'Task data, repository content in transit, review and check results, acceptance records, account data.', 'To be confirmed'],
          ['Data storage and backups', 'To be confirmed before publication', 'Acceptance records and their evidence, account data, invoicing records.', 'To be confirmed'],
          ['Transactional email', 'To be confirmed before publication', 'Names and work email addresses of customer contacts; notification content.', 'To be confirmed'],
          ['Support and communications tooling', 'To be confirmed before publication', 'Support correspondence and the details you include in it.', 'To be confirmed'],
          ['Invoicing and accounting', 'To be confirmed before publication', 'Customer billing contacts, invoice line items referencing accepted tasks.', 'To be confirmed'],
        ] },
        { type: 'note', text: 'exekova does not use Customer Personal Data to train models made available to other customers. Any model or inference provider used in delivering the service will be listed in this table with its purpose and location before it is used.' },
      ],
    },
    {
      id: 'notice-of-changes',
      heading: 'Notice of changes',
      blocks: [
        { type: 'p', text: 'Before exekova adds or replaces a subprocessor, it emails the administrative contacts on each customer account, at least 30 days in advance where practicable. The notice names the party, its purpose and its location. You may object on reasonable data protection grounds within the notice period as the [Data Processing Addendum](/dpa) provides. This notice period is a draft commitment pending legal review.' },
        { type: 'p', text: 'Removing a subprocessor, or narrowing what it does, is reflected on this page without advance notice.' },
        { type: 'p', text: 'To receive subprocessor notices at an additional address, or to ask for the current version of this list in writing, email the address at the end of this page.' },
      ],
    },
    {
      id: 'review',
      heading: 'Review of this list',
      blocks: [
        { type: 'p', text: 'This list is reviewed with every update to the [Data Processing Addendum](/dpa) and whenever a subprocessor changes. The effective date and version at the top show the current edition.' },
      ],
    },
  ],
  contact: { email: 'connect@exekova.com', note: 'Subprocessor questions, objections and requests to be added to the notice list can be sent to the address below.' },
};
