import type { LegalDoc } from '../../components/LegalDocument';

/**
 * Data Processing Addendum. Applies whenever exekova processes personal data
 * on a customer's instructions in the course of the service: task data from
 * the sources the customer connects and repository content in the
 * repositories the customer approves. Bracketed placeholders mark the values
 * counsel must confirm.
 */
export const dpa: LegalDoc = {
  slug: '/dpa',
  kicker: 'LEGAL',
  title: 'Data Processing Addendum',
  accent: 'Your instructions. Our processing.',
  lede: 'The terms that apply when exekova processes personal data on your behalf while delivering the service. This addendum forms part of the Terms of Service.',
  effectiveDate: '15 September 2026',
  version: '1.0',
  status: 'final',
  summary: [
    'You are the controller of the task data and repository content you bring to the service. exekova is your processor and acts only on your documented instructions.',
    'Processing happens only in the projects and repositories you approve, on isolated branches, and never includes merging or deploying.',
    'Subprocessors are listed on a public page and you are told before one is added. Transfers outside the UK and EEA use recognised safeguards.',
    'At the end of the service, personal data is deleted or returned, apart from what the law or the acceptance record requires us to keep.',
  ],
  sections: [
    {
      id: 'definitions',
      heading: 'Definitions',
      blocks: [
        { type: 'p', text: 'Terms defined in the [Terms of Service](/terms) have the same meaning here. In addition:' },
        { type: 'ul', items: [
          '“Data Protection Law” means the UK GDPR, the Data Protection Act 2018, the EU GDPR and any other law that applies to the processing of personal data under this addendum.',
          '“Personal Data”, “controller”, “processor”, “data subject”, “processing” and “personal data breach” have the meanings given in Data Protection Law.',
          '“Customer Personal Data” means personal data that exekova processes on your behalf in the course of the service.',
          '“Subprocessor” means a third party engaged by exekova to process Customer Personal Data.',
          '“Standard Contractual Clauses” means the clauses approved by the European Commission for transfers to third countries, and “UK Addendum” means the International Data Transfer Addendum issued by the UK Information Commissioner.',
        ] },
      ],
    },
    {
      id: 'roles',
      heading: 'Roles and scope',
      blocks: [
        { type: 'p', text: 'For Customer Personal Data, you are the controller and exekova is the processor. Where you act as a processor for your own customers, you are exekova’s instructing party and exekova is your subprocessor, and you confirm that your instructions are authorised by the relevant controller.' },
        { type: 'p', text: 'This addendum does not cover personal data that exekova processes for its own purposes, such as the contact details it uses to reply to an access request, to administer accounts or to invoice you. The [Privacy Policy](/privacy) covers that processing, for which exekova is the controller.' },
        { type: 'p', text: 'If this addendum conflicts with the Terms of Service or any other agreement between us, this addendum prevails for the processing of Customer Personal Data.' },
      ],
    },
    {
      id: 'details-of-processing',
      heading: 'Details of the processing',
      blocks: [
        { type: 'table', head: ['Item', 'Description'], rows: [
          ['Subject matter', 'Execution of scoped engineering tasks that you provide, delivered as pull requests in repositories you approve.'],
          ['Duration', 'For the term of the agreement, plus the retention period in the deletion section below.'],
          ['Nature', 'Reading task data from the sources you connect, reading and writing code in the repositories you approve on isolated task branches, running review and checks, and keeping the acceptance record.'],
          ['Purpose', 'Delivering the service described in the Terms of Service and keeping evidence for the acceptance record and invoicing.'],
          ['Data subjects', 'Your staff and contractors named on tasks, commits, reviews and accounts; other people whose personal data appears in task descriptions or repository content you provide.'],
          ['Categories of personal data', 'Names, work email addresses, usernames and account identifiers; content of tasks and acceptance criteria; repository content, commit metadata and pull request activity; any other personal data you choose to include in tasks or repositories.'],
          ['Special categories', 'None intended. You must not include special category data, or data about criminal convictions, in tasks or repositories provided to exekova unless we have agreed to it in writing with appropriate safeguards.'],
        ] },
      ],
    },
    {
      id: 'instructions',
      heading: 'Processing on your instructions',
      blocks: [
        { type: 'p', text: 'exekova processes Customer Personal Data only on your documented instructions, unless the law requires otherwise, in which case we will tell you before processing where the law allows. Your instructions are: the Terms of Service, this addendum, each task and its acceptance criteria, the projects and repositories you approve, and any further written instruction you give us and we accept.' },
        { type: 'p', text: 'exekova will tell you if it believes an instruction infringes Data Protection Law, and may pause the affected processing until the instruction is clarified.' },
        { type: 'p', text: 'exekova does not use Customer Personal Data to train models made available to other customers, and does not sell or otherwise disclose it except as this addendum allows.' },
      ],
    },
    {
      id: 'confidentiality',
      heading: 'Confidentiality',
      blocks: [
        { type: 'p', text: 'exekova ensures that everyone it authorises to process Customer Personal Data is bound by a duty of confidentiality, whether by contract or by law, and processes it only as this addendum allows. Access is limited to the people and systems that need it to deliver the service.' },
      ],
    },
    {
      id: 'security',
      heading: 'Security measures',
      blocks: [
        { type: 'p', text: 'exekova implements appropriate technical and organisational measures to protect Customer Personal Data against accidental or unlawful destruction, loss, alteration, unauthorised disclosure or access. The measures include the following, which are also how the service works by design.' },
        { type: 'ul', items: [
          'Scope control: processing happens only in the projects, task sources and repositories you approve. Access is granted through the integration’s own authorisation, never through shared credentials.',
          'Isolation: every task is worked on an isolated task branch. The default branch is never altered, and nothing is merged, deployed or released by exekova.',
          'Independent review: every revision is reviewed independently of its production and verified against the acceptance criteria and required checks before it is offered as accepted.',
          'Access control: access to systems that hold Customer Personal Data is limited to the people and services that need it, protected by authentication, and logged.',
          'Encryption: data is encrypted in transit between your systems, the integrations you connect and exekova.',
          'Retention: repository content is accessed to complete a task and is not kept beyond what the acceptance record and its evidence require.',
          'Incident handling: security events are investigated, and personal data breaches are handled as the breach section of this addendum requires.',
        ] },
        { type: 'p', text: 'exekova may update these measures over time, provided the overall level of protection does not decrease. A description of the current measures is available on request.' },
      ],
    },
    {
      id: 'subprocessors',
      heading: 'Subprocessors',
      blocks: [
        { type: 'p', text: 'You authorise exekova to engage the subprocessors listed on the [Subprocessors](/subprocessors) page. exekova will give you notice by email before adding or replacing a subprocessor, at least 30 days in advance where practicable, and you may object on reasonable data protection grounds within that period. If we cannot resolve the objection, you may end the affected part of the service without penalty for that reason.' },
        { type: 'p', text: 'exekova imposes data protection obligations on each subprocessor that are no less protective than those in this addendum, and remains responsible to you for the subprocessor’s performance.' },
        { type: 'p', text: 'The integrations you connect, such as GitHub and Jira, act under your own authorisation and their own terms. They are listed on the Subprocessors page so that the data flows are visible, but they are not engaged by exekova on your behalf.' },
      ],
    },
    {
      id: 'international-transfers',
      heading: 'International transfers',
      blocks: [
        { type: 'p', text: 'exekova will not transfer Customer Personal Data outside the United Kingdom or the European Economic Area except to a country covered by an adequacy decision, or under the Standard Contractual Clauses and, for UK transfers, the UK Addendum, together with any supplementary measures needed for the transfer to be lawful. The location of each subprocessor is stated on the [Subprocessors](/subprocessors) page.' },
        { type: 'p', text: 'Where the Standard Contractual Clauses apply between you and exekova, they are incorporated into this addendum, with you as data exporter and exekova as data importer, Module Two (controller to processor) or Module Three (processor to processor) as applicable, and the details in this addendum completing the annexes. Optional clauses are selected in the signed copy.' },
      ],
    },
    {
      id: 'assistance',
      heading: 'Assistance with rights, assessments and authorities',
      blocks: [
        { type: 'ul', items: [
          'If a data subject contacts exekova about Customer Personal Data, we will refer the request to you without undue delay and will not respond except on your instruction or where the law requires.',
          'exekova will help you respond to data subject requests, taking into account the nature of the processing, by providing the information and access reasonably needed.',
          'exekova will help you with data protection impact assessments and consultations with supervisory authorities where they relate to the service, taking into account the information available to us.',
          'exekova may charge reasonable costs for assistance that goes beyond what the service ordinarily provides, and will tell you first.',
        ] },
      ],
    },
    {
      id: 'audit',
      heading: 'Records and audit',
      blocks: [
        { type: 'p', text: 'exekova will make available the information reasonably necessary to demonstrate compliance with this addendum. Once in any twelve-month period, or after a personal data breach affecting your data, you may audit exekova’s compliance, on at least 30 days’ written notice, during business hours, in a manner that does not unreasonably disrupt the service or expose other customers’ data, and subject to reasonable confidentiality obligations. Where a written response, a completed questionnaire or a report addresses your questions, the audit is satisfied by it.' },
      ],
    },
    {
      id: 'deletion-and-return',
      heading: 'Deletion or return',
      blocks: [
        { type: 'p', text: 'When the service ends, or earlier at your written request, exekova will delete Customer Personal Data or return it to you, and delete existing copies, within 30 days unless the law requires us to keep it. Pull requests and branches already delivered stay in your repository under your control.' },
        { type: 'p', text: 'exekova keeps the acceptance record and the review and check evidence for accepted tasks for as long as invoicing, dispute resolution and applicable law require, and keeps that data confidential and protected as this addendum provides.' },
      ],
    },
    {
      id: 'breach-notification',
      heading: 'Personal data breach',
      blocks: [
        { type: 'p', text: 'If exekova becomes aware of a personal data breach affecting Customer Personal Data, it will notify you without undue delay and within the time applicable law requires, with the information it has at that time and further information as it becomes available. The notice will describe the nature of the breach, the likely consequences, and the measures taken or proposed. exekova will cooperate with you in investigating, containing and remedying the breach and in any notifications you are required to make.' },
      ],
    },
    {
      id: 'liability-and-general',
      heading: 'Liability and general',
      blocks: [
        { type: 'p', text: 'Each side’s liability under this addendum is subject to the limitations and exclusions in the [Terms of Service](/terms), except where Data Protection Law does not permit those limitations to apply. Nothing in this addendum limits a data subject’s rights.' },
        { type: 'p', text: 'This addendum lasts as long as exekova processes Customer Personal Data. Changes to Data Protection Law that require changes to this addendum will be agreed in good faith, and exekova may publish an updated version with notice to you.' },
        { type: 'p', text: 'This addendum is accepted with the Terms of Service. Where you require a signed copy, request one at the address below. Signatories, dates and the completed annexes will be recorded in the signed copy. Governing law and jurisdiction follow the Terms of Service.' },
      ],
    },
  ],
  contact: { email: 'connect@exekova.com', note: 'Requests for a signed copy, subprocessor objections, data subject referrals and breach reports can be sent to the address below.' },
};
