import type { LegalDoc } from '../../components/LegalDocument';

/**
 * Acceptable Use Policy. What may and may not be done with the service and
 * this website. It forms part of the Terms of Service.
 */
export const acceptableUse: LegalDoc = {
  slug: '/acceptable-use',
  kicker: 'LEGAL',
  title: 'Acceptable Use Policy',
  accent: 'Clear rules. Fair enforcement.',
  lede: 'What may and may not be done with the exekova service and this website. This policy forms part of the Terms of Service and applies to everyone your organisation authorises to use the service.',
  effectiveDate: '15 September 2026',
  version: '1.0',
  status: 'final',
  summary: [
    'Use the service for engineering tasks in projects and repositories you are entitled to authorise.',
    'Keep credentials, tokens and secrets out of tasks, forms and emails. Access is granted through the integration’s own authorisation.',
    'Do not try to bypass review or verification, extract other customers’ data, or use the service to harm systems or people.',
    'If you find a security issue, tell us by email. We will investigate and respond.',
  ],
  sections: [
    {
      id: 'permitted-use',
      heading: 'Permitted use',
      blocks: [
        { type: 'p', text: 'The service exists to take scoped engineering tasks from the sources you connect and return verified pull requests in the repositories you approve. You may use it for lawful software development work in projects and repositories that you own or are authorised to change, in line with the [Terms of Service](/terms) and this policy.' },
        { type: 'p', text: 'This website may be used to learn about the service, request access, contact us and read our policies. The request and contact forms prepare an email in your own email application; use them for genuine enquiries.' },
      ],
    },
    {
      id: 'prohibited-conduct',
      heading: 'Prohibited content and conduct',
      blocks: [
        { type: 'p', text: 'You must not use the service or this website to do, or attempt to do, any of the following.' },
        { type: 'ul', items: [
          'Break the law, or infringe anyone’s intellectual property, privacy or other rights, including by providing tasks, repositories or content you are not entitled to provide.',
          'Provide tasks whose purpose is to create, distribute or hide malicious code, or to introduce backdoors, unauthorised data collection or deliberate vulnerabilities into any software.',
          'Authorise, connect or direct the service at projects, repositories or systems you are not authorised to change, or misrepresent your authority to do so.',
          'Bypass, weaken or interfere with independent review, required checks or the acceptance record, or present an unaccepted attempt as an accepted outcome.',
          'Access, probe or extract data belonging to exekova or to other customers, or interfere with the availability or security of the service or of the integrations it uses.',
          'Include credentials, access tokens, private keys or other secrets in a task, an acceptance criterion, a form or an email to us. Access must be granted through the integration’s own authorisation.',
          'Include special category personal data, or data about criminal convictions, in tasks or repositories provided to the service without a written agreement covering it.',
          'Use the service to harass, defame or deceive anyone, or to build products whose main purpose is unlawful discrimination or surveillance.',
          'Copy, scrape, reverse engineer or resell the service or this website, or use them to build a competing service, except where the law allows it regardless of this clause.',
          'Send unsolicited or deceptive communications to exekova or through any address, form or channel on this website.',
        ] },
      ],
    },
    {
      id: 'scope-rules',
      heading: 'Repository and task scope rules',
      blocks: [
        { type: 'ul', items: [
          'Authorise only the projects, task sources and repositories your organisation has decided the service may work in, and keep those authorisations current. Remove access when it is no longer needed.',
          'Give each task acceptance criteria that state what done means. A task without criteria cannot be verified and will not start.',
          'Keep each task to one repository and one bounded area of the code. Broad work becomes a sequence of smaller tasks.',
          'Do not ask the service to merge, deploy, release, alter your default branch, or change repository settings. It works on isolated task branches and never does these things.',
          'Do not direct the service at production systems, live customer data or credentials as part of a task. Tests that need live systems are out of scope.',
          'Review every delivered pull request before merging. The decision to merge or release is yours and carries its own responsibility.',
        ] },
      ],
    },
    {
      id: 'security-research',
      heading: 'Security research and reporting',
      blocks: [
        { type: 'p', text: 'If you find a vulnerability in the service or this website, tell us by email at the address at the end of this policy, with enough detail to reproduce it. We will acknowledge the report, investigate, and tell you when it is resolved. Please give us a reasonable time to fix an issue before disclosing it publicly.' },
        { type: 'p', text: 'Research must stay within your own accounts and data, must not degrade the service for others, and must not access, alter or exfiltrate data that is not yours. Do not use automated scanning against the service without agreeing it with us first. exekova does not operate a bug-bounty programme and makes no promise of payment for reports.' },
      ],
    },
    {
      id: 'enforcement',
      heading: 'Enforcement',
      blocks: [
        { type: 'p', text: 'If exekova reasonably believes that this policy has been breached, it may decline or stop a task, suspend access to the service, remove or refuse content, or end the agreement as the [Terms of Service](/terms) allow. We will tell you what happened and why, unless the law prevents it or telling you would harm an investigation, and we will restore access once the cause is resolved where that is appropriate.' },
        { type: 'p', text: 'Where a breach involves unlawful conduct or a threat to others, exekova may report it to the relevant authorities and cooperate with them, and may preserve evidence for that purpose.' },
        { type: 'p', text: 'You are responsible for the conduct of everyone your organisation authorises to use the service.' },
      ],
    },
    {
      id: 'reporting-misuse',
      heading: 'Reporting misuse',
      blocks: [
        { type: 'p', text: 'If you believe the service or this website is being used in breach of this policy, or that content delivered by the service infringes your rights, email the address at the end of this policy with the details and, where relevant, the repository, pull request or task concerned. We will review the report and respond.' },
      ],
    },
    {
      id: 'changes',
      heading: 'Changes to this policy',
      blocks: [
        { type: 'p', text: 'We may update this policy as the service changes. Material changes affecting existing customers are notified by email before they take effect. The effective date and version at the top show the current edition.' },
      ],
    },
  ],
  contact: { email: 'connect@exekova.com', note: 'Security reports, misuse reports and questions about this policy can be sent to the address below. We reply from the same address.' },
};
