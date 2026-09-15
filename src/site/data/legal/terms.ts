import { taskOffer } from '@/beta/data/offer';
import type { LegalDoc } from '../../components/LegalDocument';

/**
 * Terms of Service. Written against what the service does: scoped engineering
 * tasks executed only in approved projects and repositories, delivered as pull
 * requests on isolated branches, accepted only after independent review and
 * required checks, and invoiced per accepted task. Bracketed placeholders mark
 * the values counsel must confirm.
 */
export const terms: LegalDoc = {
  slug: '/terms',
  kicker: 'LEGAL',
  title: 'Terms of Service',
  accent: 'What we deliver. What you decide.',
  lede: 'The terms that govern access to and use of the exekova service and this website. They describe how a task becomes a verified outcome, what each side is responsible for, and what you pay.',
  effectiveDate: '15 September 2026',
  version: '1.0',
  status: 'final',
  summary: [
    'exekova delivers a scoped engineering task as a pull request on an isolated branch in a repository you approve. Your team owns the merge and the release.',
    'An outcome is accepted only after independent review and the required checks pass against the acceptance criteria you set.',
    `You pay $${taskOffer.current} per accepted task. Rejected attempts cost $0. Nothing is charged on this website.`,
    'Code changes delivered into your repository are yours. The exekova platform stays ours.',
  ],
  sections: [
    {
      id: 'agreement',
      heading: 'Agreement and acceptance',
      blocks: [
        { type: 'p', text: 'These Terms of Service (“Terms”) are an agreement between exekova (“exekova”, “we”, “us”) and the organisation that requests access to or uses the exekova service (“you”, the “Customer”). They cover the exekova service, the signed-in application, and this website.' },
        { type: 'p', text: 'You accept these Terms when you confirm an access request by email, when a person authorised by your organisation signs in to the service, or when you otherwise use the service. If you accept on behalf of an organisation, you confirm that you have authority to bind it. If you do not agree, do not use the service.' },
        { type: 'p', text: 'Where you and exekova have signed a separate written agreement covering the service, that agreement takes precedence over these Terms to the extent they conflict. The [Data Processing Addendum](/dpa) forms part of these Terms whenever exekova processes personal data on your behalf.' },
      ],
    },
    {
      id: 'the-service',
      heading: 'The service',
      blocks: [
        { type: 'p', text: 'exekova is an autonomous work execution platform. It takes a scoped engineering task and returns a verified outcome in three steps.' },
        { type: 'ol', items: [
          'Get. You provide a task with acceptance criteria, from Jira or the exekova Work Intent form.',
          'Set. You choose an approved GitHub repository and confirm the scope.',
          'Done. exekova delivers a pull request on an isolated task branch with the code change, an independent review result, the required check results and an acceptance record.',
        ] },
        { type: 'p', text: 'The service is available today for tasks from Jira and the Work Intent form delivered to GitHub repositories. Task intake from Slack, Microsoft Teams, Excel, Linear and CSV, and delivery to GitLab and Bitbucket, are planned. A planned integration is a roadmap item with no committed date and is not part of the service until we tell you in writing that it is available.' },
        { type: 'p', text: 'exekova never merges, deploys or releases code. Every pull request is delivered for your team’s review and decision.' },
      ],
    },
    {
      id: 'access-and-eligibility',
      heading: 'Access and task eligibility',
      blocks: [
        { type: 'p', text: 'Access to the service starts with an access request sent by email from this website or directly to us. Submitting a request does not guarantee admission. exekova confirms eligibility and repository access before any work starts, and may decline a request or a task at its discretion, for example where the task cannot be verified as written or the repository cannot be accessed as required.' },
        { type: 'p', text: 'A task is eligible when it is scoped to one repository, has clear acceptance criteria, and can be verified by independent review and the repository’s required checks. Broad projects are not eligible as single tasks and are broken into smaller tasks, each with its own acceptance criteria and outcome.' },
        { type: 'p', text: 'You are responsible for the people you authorise to use the service, for keeping sign-in credentials confidential, and for telling us promptly if you believe an account has been compromised.' },
      ],
    },
    {
      id: 'your-responsibilities',
      heading: 'Your responsibilities',
      blocks: [
        { type: 'ul', items: [
          'Authorise only the projects, task sources and repositories you are entitled to authorise, and keep those authorisations current.',
          'Grant repository access through the authorisation mechanisms of the integration (for example a GitHub App installation), never by sending credentials, tokens or secrets in a task, an email or a form.',
          'Provide acceptance criteria that state what done means, and keep them stable for the life of a task. Material changes to a task’s criteria create a new task.',
          'Review every pull request before merging. The decision to merge, deploy or release is yours alone.',
          'Ensure that the task, the repository and the content you provide do not infringe anyone’s rights and comply with the [Acceptable Use Policy](/acceptable-use).',
          'Keep your own backups and version history. exekova works on an isolated branch and does not alter your default branch.',
        ] },
      ],
    },
    {
      id: 'delivery-and-acceptance',
      heading: 'Delivery, review, verification and acceptance',
      blocks: [
        { type: 'p', text: 'For each eligible task, exekova produces a code change on an isolated task branch in the approved repository and opens a pull request. Before the outcome is offered as accepted, the revision is reviewed independently of its production and verified against the acceptance criteria and the repository’s required checks.' },
        { type: 'h3', text: 'Verified outcome' },
        { type: 'p', text: 'A verified outcome is a pull request whose reviewed revision met the acceptance criteria, passed independent review and passed the required checks. The acceptance record delivered with it states these results for the specific revision it covers. Later changes made by anyone to that branch are outside the record.' },
        { type: 'h3', text: 'Rejected attempt' },
        { type: 'p', text: 'If independent review or a required check fails, the attempt is rejected and returned for correction. Corrected work is reviewed and verified again. exekova makes a limited number of correction attempts per task. If no attempt passes, there is no accepted outcome for that task, no fee is due, and the evidence of the attempts is retained and made available to you.' },
        { type: 'h3', text: 'Your decision' },
        { type: 'p', text: 'Acceptance under these Terms means the outcome met its acceptance criteria, review and checks. It is not a decision to merge or release. Your team owns that decision, and exekova is not responsible for the consequences of merging, deploying or releasing any change.' },
      ],
    },
    {
      id: 'fees',
      heading: 'Fees and invoicing',
      blocks: [
        { type: 'p', text: `The current price is $${taskOffer.current} USD per accepted task. A rejected attempt counts as zero accepted tasks and costs $0. The planned standard price is $${taskOffer.standard} USD per accepted task; the price agreed for a task when it starts stays with that task.` },
        { type: 'ul', items: [
          'Accepted tasks are invoiced against the acceptance record. An invoice lists each accepted task and the record it relies on.',
          'Invoices are payable within 30 days of the invoice date, in USD, by the method stated on the invoice.',
          'Fees exclude taxes. You are responsible for any sales, use, VAT or similar taxes other than taxes on exekova’s income.',
          'No payment is taken on this website, and there is no subscription or seat licence.',
          'If you dispute an invoice in good faith, tell us before the due date with the reason. We will work with you to resolve it, and undisputed amounts remain payable.',
        ] },
      ],
    },
    {
      id: 'intellectual-property',
      heading: 'Intellectual property',
      blocks: [
        { type: 'h3', text: 'Your repository and your outcomes' },
        { type: 'p', text: 'You own your repositories, your tasks and the content you provide. On delivery, exekova assigns to you all rights it holds in the code changes delivered into your repository for an accepted task, and grants you a perpetual, irrevocable, royalty-free licence to any rejected attempt left on a task branch, to the extent exekova holds rights in it. Code may include open-source components that remain subject to their own licences.' },
        { type: 'h3', text: 'Your licence to exekova' },
        { type: 'p', text: 'You grant exekova a limited, non-exclusive licence to access and use your tasks, repositories and related content solely to perform the service for you, for the duration of the task and any dispute about it. exekova does not use your task content or repository data to train models made available to other customers.' },
        { type: 'h3', text: 'The exekova platform' },
        { type: 'p', text: 'exekova and its licensors retain all rights in the platform, its review and verification methods, its documentation and this website. Nothing in these Terms transfers those rights to you. You may not copy, reverse engineer or build a competing service from the platform, except where the law allows it regardless of this clause.' },
        { type: 'p', text: 'You may give us feedback about the service. We may use it without obligation to you.' },
      ],
    },
    {
      id: 'confidentiality',
      heading: 'Confidentiality',
      blocks: [
        { type: 'p', text: 'Each side will keep the other’s confidential information confidential, use it only to perform or receive the service, and share it only with people and advisers who need it and are bound by comparable obligations. Your tasks, acceptance criteria and repository content are your confidential information. The design and operation of the platform are ours.' },
        { type: 'p', text: 'These obligations do not apply to information that is public through no fault of the recipient, already known to the recipient, independently developed, or lawfully received from someone else. A side may disclose confidential information where the law requires it, giving the other side notice where permitted. The obligations last for five years after the agreement ends.' },
      ],
    },
    {
      id: 'data-protection',
      heading: 'Data protection',
      blocks: [
        { type: 'p', text: 'Where exekova processes personal data on your behalf in the course of the service, it does so as your processor under the [Data Processing Addendum](/dpa), which forms part of these Terms. Where exekova processes personal data for its own purposes, for example to reply to an access request or to invoice you, the [Privacy Policy](/privacy) applies.' },
        { type: 'p', text: 'You are responsible for ensuring that you have a lawful basis to share the task and repository data you provide, including any personal data it contains, and for telling the people concerned where the law requires it.' },
      ],
    },
    {
      id: 'acceptable-use',
      heading: 'Acceptable use',
      blocks: [
        { type: 'p', text: 'Your use of the service and this website must comply with the [Acceptable Use Policy](/acceptable-use), which forms part of these Terms. In short: authorise only what you are entitled to authorise, keep secrets out of tasks and emails, do not try to bypass review or verification, and do not use the service to harm anyone.' },
      ],
    },
    {
      id: 'warranties',
      heading: 'Warranties and disclaimers',
      blocks: [
        { type: 'p', text: 'exekova warrants that it will perform the service with reasonable skill and care and that an outcome offered as accepted will have passed independent review and the required checks against the acceptance criteria recorded for that revision. If an accepted outcome did not meet that warranty, tell us within 30 days of delivery and we will, at our option, correct the outcome or credit the fee for that task. This is your exclusive remedy for breach of this warranty.' },
        { type: 'p', text: 'Except as stated above, the service and this website are provided “as is”. exekova does not warrant that any outcome is free of defects, fit for a particular purpose, or suitable for release, or that the service will be uninterrupted. Review results and check results are evidence for your decision, not a substitute for it. exekova gives no warranty about integrations operated by third parties, such as GitHub or Jira.' },
      ],
    },
    {
      id: 'liability',
      heading: 'Limitation of liability',
      blocks: [
        { type: 'p', text: 'To the extent the law allows, neither side is liable to the other for any indirect or consequential loss, or for loss of profit, revenue, data, goodwill or business opportunity, however arising.' },
        { type: 'p', text: 'To the extent the law allows, each side’s total liability under or in connection with these Terms in any twelve-month period is limited to the fees paid or payable by you to exekova for accepted tasks in the twelve months before the event giving rise to the claim.' },
        { type: 'p', text: 'Nothing in these Terms limits liability for death or personal injury caused by negligence, for fraud, for breach of the confidentiality section, for your payment obligations, or for anything else that cannot be limited by law.' },
        { type: 'p', text: 'exekova is not liable for the consequences of your decision to merge, deploy or release any change, for changes made to a task branch after the acceptance record was produced, or for the acts or omissions of third-party integrations.' },
      ],
    },
    {
      id: 'term-and-termination',
      heading: 'Term and termination',
      blocks: [
        { type: 'p', text: 'These Terms apply from the moment you accept them and continue until ended. Either side may end the agreement for convenience on 30 days’ written notice, and either side may end it immediately if the other materially breaches these Terms and does not cure the breach within 30 days of notice, or becomes insolvent.' },
        { type: 'p', text: 'exekova may suspend access to the service where it reasonably believes that continued use would breach the [Acceptable Use Policy](/acceptable-use), threaten the security of the service or of others, or where fees are overdue after notice. We will tell you why and restore access when the cause is resolved.' },
        { type: 'p', text: 'On termination, tasks in progress stop, accepted tasks remain payable, pull requests already delivered stay in your repository, and the sections on fees, intellectual property, confidentiality, warranties, liability and governing law survive. Personal data is deleted or returned as the [Data Processing Addendum](/dpa) provides.' },
      ],
    },
    {
      id: 'changes',
      heading: 'Changes to the service and these Terms',
      blocks: [
        { type: 'p', text: 'The service changes as integrations become available and the platform improves. We may change these Terms by publishing a new version on this page with a new effective date. Material changes affecting existing customers are notified by email at least 30 days before they take effect, unless the change is required by law or is needed to address a security issue. Continued use after the effective date is acceptance of the new version.' },
      ],
    },
    {
      id: 'general',
      heading: 'General',
      blocks: [
        { type: 'ul', items: [
          'Governing law and courts: these Terms are governed by the laws of the jurisdiction in which exekova is established, and each side submits to the courts of that jurisdiction.',
          'Notices to exekova go to the email address at the end of these Terms. Notices to you go to the email address on your access request or account.',
          'Neither side may assign these Terms without the other’s consent, except to a successor in a merger, acquisition or sale of substantially all assets, with notice.',
          'Neither side is liable for delay caused by events outside its reasonable control, other than payment obligations.',
          'If any part of these Terms is unenforceable, the rest remains in force. A failure to enforce a right is not a waiver of it.',
          'These Terms, the Data Processing Addendum, the Acceptable Use Policy and the Privacy Policy are the entire agreement about the service and replace earlier discussions.',
        ] },
      ],
    },
  ],
  contact: { email: 'connect@exekova.com', note: 'Questions about these Terms, notices under them and invoice queries can be sent to the address below. We reply from the same address.' },
};
