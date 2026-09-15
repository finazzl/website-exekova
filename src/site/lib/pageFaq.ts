import type { Case } from '../data/cases';
import type { Fn } from '../data/functions';
import type { Industry } from '../data/industries';
import type { IntegrationDetail } from '../data/integrations';
import type { LegalDoc } from '../components/LegalDocument';
import { legalNav } from '../nav';
import { DEFINITION, PRICE_ANSWER, list, lowerFirst, sentences } from './seoCopy';

export type Faq = { q: string; a: string };

/** The questions a reader of one use case asks, answered from that use case's own record. */
export function caseFaq(item: Case): Faq[] {
  const name = item.name.toLowerCase();
  return [
    { q: 'How does this work arrive at exekova?', a: `As one scoped task from Jira or the exekova Work Intent form: ${lowerFirst(item.arrives)}` },
    { q: `What does exekova return for ${name}?`, a: sentences(item.returns) },
    { q: 'What stays with your team?', a: `${list(item.keeps.map((keep, index) => index === 0 ? keep : lowerFirst(keep)))}. exekova executes inside those boundaries and never merges or deploys.` },
    { q: 'What does a task like this cost?', a: PRICE_ANSWER },
  ];
}

/** The questions a function lead asks before the first run. */
export function functionFaq(item: Fn): Faq[] {
  const name = item.name.toLowerCase();
  const items: Faq[] = [
    { q: `What does exekova deliver for ${item.name === 'QA' ? 'QA' : name}?`, a: `${item.deliverable}, produced on an isolated branch in a repository you approve, independently reviewed and verified against the acceptance criteria you set before it reaches you.` },
    { q: `How is ${item.name === 'QA' ? 'QA' : name} work checked before it reaches you?`, a: `Every run has to clear the same gates. ${sentences(item.checks)} Anything short of that is returned for correction and is not invoiced.` },
    { q: 'Who decides what ships?', a: `Your team. ${item.policy} exekova never merges or deploys.` },
  ];
  if (item.tools.length) items.push({ q: `Which tools does exekova work with for ${item.name === 'QA' ? 'QA' : name}?`, a: `${list(item.tools)}, within the scope you grant. Every system exekova works with is listed in the integrations catalogue.` });
  items.push({ q: 'What does it cost?', a: PRICE_ANSWER });
  return items;
}

/** The questions an industry reader asks, answered from that industry's own controls. */
export function industryFaq(item: Industry): Faq[] {
  return [
    { q: `What ${item.name} work does exekova take on?`, a: `Engineering and QA tasks such as ${list(item.workloads.items.map(entry => lowerFirst(entry.title)))}. Each is one run from ticket to reviewed, tested change, with the evidence attached.` },
    { q: 'How does the work arrive?', a: `As scoped tasks from ${item.source} or the exekova Work Intent form. Typical items: ${list(item.arrives.map(lowerFirst))}.` },
    { q: 'What does exekova own, and what stays with your team?', a: `exekova owns ${list(item.controls.owns.map(lowerFirst))}. ${list(item.controls.keeps.map((keep, index) => index === 0 ? keep : lowerFirst(keep)))} stay with your team.` },
    { q: `Is exekova certified for ${item.name}?`, a: 'exekova follows SOC 2, ISO 27001, PCI DSS and HIPAA practices. Certification status is stated plainly on the security page, and your own controls, approvals and sign-offs stay in place.' },
    { q: 'What does it cost?', a: PRICE_ANSWER },
  ];
}

/** The questions an integration owner asks, answered from the integration's own record. */
export function integrationFaq(item: IntegrationDetail): Faq[] {
  return [
    { q: `What does exekova receive from ${item.name}?`, a: `Within the scope you grant: ${item.receives.map(lowerFirst).join('; ')}.` },
    { q: `What does exekova send back to ${item.name}?`, a: `As the work moves through the acceptance path: ${item.sends.map(lowerFirst).join('; ')}.` },
    { q: `How is ${item.name} set up?`, a: `With your team during onboarding: ${item.setup.map(lowerFirst).join('; ')}. This page describes the steps; it does not perform them.` },
    { q: `How is access to ${item.name} secured?`, a: sentences(item.security) },
    { q: 'What does it cost?', a: PRICE_ANSWER },
  ];
}

/** The questions readers ask about a policy or agreement, answered from its own record. */
export function legalFaq(doc: LegalDoc): Faq[] {
  const others = legalNav.filter(link => link.href !== doc.slug && link.href !== '/cookie-settings').map(link => link.label);
  return [
    { q: `When does this ${doc.title.toLowerCase()} take effect?`, a: `Version ${doc.version} is effective from ${doc.effectiveDate} and applies to exekova.com and the exekova service.` },
    { q: 'Who do I contact about this document?', a: `${doc.contact.note} Write to ${doc.contact.email}.` },
    { q: 'Which other documents apply?', a: `${list(others)}. Together they set out how exekova handles personal data, cookies, subprocessors, acceptable use and the terms of service. ${DEFINITION}` },
  ];
}
