import type { LegalDoc } from '../../components/LegalDocument';

/**
 * Privacy Policy. Written against what the site and service actually do: a
 * marketing site with optional consent-based analytics, an access request
 * sent through the website forms, a signed-in application on
 * exekova.com, and integrations the customer authorises (Jira, GitHub).
 */
export const privacy: LegalDoc = {
  slug: '/privacy',
  kicker: 'LEGAL',
  title: 'Privacy Policy',
  accent: 'Plain language. Full detail.',
  lede: 'How exekova collects, uses, shares and protects personal data when you visit this site, request access, or use the service.',
  effectiveDate: '16 September 2026',
  version: '1.2',
  status: 'final',
  summary: [
    'The Google tag library loads when you visit. Analytics measurement and cookies require your permission. Advertising cookies are not used.',
    'An access request is sent to our team through the website form. It contains what you type: work email, team, tools, task and acceptance criteria.',
    'When your organisation uses the service, exekova processes task data and repository content only within the projects and repositories you approve.',
    'exekova never merges, deploys or sells data. You can ask what we hold about you and have it corrected or deleted.',
  ],
  sections: [
    {
      id: 'scope',
      heading: 'Who we are and what this policy covers',
      blocks: [
        { type: 'p', text: 'exekova (“exekova”, “we”, “us”) operates exekova.com and the exekova service, an autonomous work execution platform that turns scoped engineering tasks into independently reviewed, verified pull requests.' },
        { type: 'p', text: 'This policy covers personal data we handle as a controller: visitors to this website, people who request access or contact us, and the people at customer organisations who administer or use the service. Where we process task content and repository data on a customer’s instructions, we act as a processor under the [Data Processing Addendum](/dpa), and the customer’s own privacy notice governs.' },
      ],
    },
    {
      id: 'data-we-collect',
      heading: 'The data we collect',
      blocks: [
        { type: 'h3', text: 'When you visit this website' },
        { type: 'p', text: 'Our hosting infrastructure records standard server logs: the IP address of the request, the page requested, the referring page, browser type and the time of the request. We use these logs to keep the site available and secure. Downloading the Google tag library sends standard connection information, including your IP address and browser information, to Google. Analytics measurement and cookies stay disabled until you allow analytics. When permitted, Analytics measures page visits and traffic sources. Our integration does not send form entries to Analytics. See the [Cookie Policy](/cookies).' },
        { type: 'h3', text: 'When you request access or contact us' },
        { type: 'p', text: 'When you submit the access request form, your work email address, company or team, task source and repository provider, optional repository name, task and acceptance criteria are sent to our delivery provider so our team can reply. This uses the same delivery and verification services described below for the contact form. If you download the request instead, the file stays on your device until you share it.' },
        { type: 'p', text: 'When you submit the contact form, your name (if provided), work email, company or team, selected topic and message are sent to our contact delivery provider so we can reply. Depending on the configured delivery path, this uses Web3Forms or our email receiver with Resend. If verification is enabled, Cloudflare Turnstile processes verification data to help prevent spam. Downloading a message keeps the file on your device until you share it.' },
        { type: 'p', text: 'When you email us directly, we keep the correspondence and the details you choose to include.' },
        { type: 'h3', text: 'When your organisation uses the service' },
        { type: 'ul', items: [
          'Account and contact details for the people who sign in or administer the service: name, work email, role and organisation.',
          'Task data from the sources you connect, such as Jira issues or Work Intent form entries, including the people named on those tasks.',
          'Repository data from the GitHub repositories you approve: code, commit history, branch names, check results and pull request activity needed to complete a task.',
          'Service records: the task scope, the isolated branch, review results, check results, the acceptance record and invoicing records for accepted tasks.',
          'Support and operational communications with your team.',
        ] },
        { type: 'note', text: 'Do not include credentials, secrets or private code in an access request or email. The service receives repository access only through the authorisation you grant.' },
      ],
    },
    {
      id: 'how-we-use-data',
      heading: 'How we use it',
      blocks: [
        { type: 'ul', items: [
          'To assess an access request, confirm task eligibility and repository access, and reply to you.',
          'To deliver the service: execute approved tasks, produce pull requests, run reviews and checks, and keep the acceptance record.',
          'To invoice accepted tasks against the acceptance record.',
          'To keep the website and service secure, prevent misuse and investigate incidents.',
          'To meet legal obligations, including accounting and tax requirements.',
          'To improve the service, using aggregated or de-identified information wherever possible.',
        ] },
        { type: 'p', text: 'We do not sell personal data, and we do not use customer task content or repository data to train models made available to other customers.' },
      ],
    },
    {
      id: 'legal-bases',
      heading: 'Legal bases',
      blocks: [
        { type: 'p', text: 'Where the UK GDPR or EU GDPR applies, we rely on the following bases.' },
        { type: 'table', head: ['Purpose', 'Basis'], rows: [
          ['Replying to an access request or enquiry', 'Steps taken at your request before entering a contract; our legitimate interest in responding to you'],
          ['Delivering the service to a customer', 'Performance of the contract with the customer'],
          ['Invoicing and accounting', 'Legal obligation; performance of the contract'],
          ['Security, fraud prevention and incident response', 'Legitimate interests in protecting the service and its users'],
          ['Service improvement with aggregated data', 'Legitimate interests, balanced against your rights'],
          ['Any optional cookies we may add in future', 'Consent, collected through [Cookie settings](/cookie-settings)'],
        ] },
      ],
    },
    {
      id: 'sharing',
      heading: 'Who we share data with',
      blocks: [
        { type: 'ul', items: [
          'Subprocessors that host or support the service, listed with their purpose and location on the [Subprocessors](/subprocessors) page.',
          'The integrations you connect. When you authorise Jira or GitHub, data flows between those services and exekova under your authorisation and their own terms.',
          'Professional advisers, such as accountants, auditors and lawyers, under confidentiality.',
          'Authorities and other parties where the law requires it, or to protect the rights, safety or property of exekova, our customers or others.',
          'A successor organisation if exekova is involved in a merger, acquisition or asset sale, with notice to affected customers.',
        ] },
      ],
    },
    {
      id: 'international-transfers',
      heading: 'International transfers',
      blocks: [
        { type: 'p', text: 'Where personal data is transferred outside the United Kingdom or the European Economic Area, we rely on adequacy decisions or on standard contractual clauses and the UK International Data Transfer Addendum, together with the safeguards described in the [Data Processing Addendum](/dpa). The location of each subprocessor is listed on the [Subprocessors](/subprocessors) page.' },
      ],
    },
    {
      id: 'retention',
      heading: 'How long we keep data',
      blocks: [
        { type: 'table', head: ['Data', 'Retention'], rows: [
          ['Website server logs', 'Up to 90 days, unless needed for a security investigation'],
          ['Access requests and enquiries', 'Up to 24 months after our last exchange, or until you ask us to delete them'],
          ['Customer account data', 'For the life of the customer agreement, then up to 90 days'],
          ['Task, review and acceptance records', 'For the life of the customer agreement, then as required for invoicing and disputes'],
          ['Invoicing and accounting records', 'As required by law, typically six to seven years'],
        ] },
        { type: 'p', text: 'Repository content is accessed to complete a task and is not retained beyond what the acceptance record and its evidence require.' },
      ],
    },
    {
      id: 'security',
      heading: 'Security',
      blocks: [
        { type: 'p', text: 'exekova works only in the projects and repositories you approve, on isolated task branches, and never merges or deploys. Access to systems is limited to the people and services that need it, protected with authentication and encryption in transit, and logged. Independent review and required checks are part of every outcome, so changes are inspected before your team sees them.' },
        { type: 'p', text: 'No method of transmission or storage is completely secure. If we become aware of a personal data breach affecting you, we will notify you and any relevant authority as the law requires.' },
      ],
    },
    {
      id: 'your-rights',
      heading: 'Your rights',
      blocks: [
        { type: 'p', text: 'Depending on where you live, you may have the right to access the personal data we hold about you, to have it corrected or deleted, to restrict or object to its processing, to receive it in a portable form, and to withdraw consent where we rely on it. You also have the right to complain to a supervisory authority, such as the UK Information Commissioner’s Office.' },
        { type: 'p', text: 'To exercise a right, email us at the address at the end of this policy. We may ask you to confirm your identity. Where we act as a processor for a customer, we will refer your request to that customer and help them respond.' },
      ],
    },
    {
      id: 'cookies',
      heading: 'Cookies and local storage',
      blocks: [
        { type: 'p', text: 'The website stores your preference when you save your choices. Google Analytics cookies are optional and are used only when configured and you allow analytics. Advertising cookies are not used. The [Cookie Policy](/cookies) lists what is stored, and [Cookie settings](/cookie-settings) lets you review your choices.' },
      ],
    },
    {
      id: 'children',
      heading: 'Children',
      blocks: [
        { type: 'p', text: 'exekova is a business service. This website and the service are not directed at children under 16, and we do not knowingly collect their personal data. If you believe a child has provided data to us, contact us and we will delete it.' },
      ],
    },
    {
      id: 'changes',
      heading: 'Changes to this policy',
      blocks: [
        { type: 'p', text: 'We may update this policy as the service and the law change. The effective date and version at the top of the page show the current edition. Material changes affecting customers are notified by email before they take effect.' },
      ],
    },
  ],
  contact: { email: 'connect@exekova.com', note: 'Privacy requests, questions about this policy and complaints can be sent to the address below. We reply from the same address.' },
};
