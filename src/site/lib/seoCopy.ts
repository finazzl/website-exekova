import { taskOffer } from '@/beta/data/offer';

/**
 * Copy helpers for titles, descriptions and the entity statement that every
 * page carries. The limits match what search result pages show in full:
 * titles of 30 to 65 characters, descriptions of 90 to 165.
 */
export const TITLE = { min: 30, max: 65 };
export const DESCRIPTION = { min: 90, max: 165 };

/** The one-sentence definition every page repeats, for people and answer engines alike. */
export const DEFINITION = 'exekova is an autonomous work execution platform.';
export const DEFINITION_LONG = `${DEFINITION} One scoped engineering task in, one independently reviewed and verified pull request out, and your team owns the merge.`;
export const PRICE_ANSWER = `$${taskOffer.current} per accepted task. An attempt that fails independent review or the required checks is returned for correction and costs $0. There is no subscription and no seat licence.`;

/** The first candidate that fits the title window, otherwise the last one. */
export function fitTitle(...candidates: string[]) {
  return candidates.find(text => text.length >= TITLE.min && text.length <= TITLE.max) ?? candidates[candidates.length - 1];
}

/** Grows a short description sentence by sentence, then trims a long one back to a sentence boundary. */
export function fitDescription(primary: string, ...extras: string[]) {
  let text = primary.trim();
  for (const extra of extras) {
    if (text.length >= DESCRIPTION.min) break;
    text = `${text} ${extra.trim()}`.trim();
  }
  if (text.length <= DESCRIPTION.max) return text;
  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g) ?? [text];
  let kept = '';
  for (const sentence of sentences) {
    if ((kept + sentence).trim().length > DESCRIPTION.max) break;
    kept += sentence;
  }
  kept = kept.trim();
  if (kept.length >= DESCRIPTION.min) return kept;
  const cut = text.slice(0, DESCRIPTION.max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
}

/** "a, b and c" */
export function list(items: string[]) {
  const clean = items.map(item => item.trim()).filter(Boolean);
  if (clean.length <= 1) return clean.join('');
  return `${clean.slice(0, -1).join(', ')} and ${clean[clean.length - 1]}`;
}

/** Lowercases a leading capital unless the word is an acronym or a proper noun that stays capitalised. */
export function lowerFirst(text: string) {
  const trimmed = text.trim();
  if (!trimmed) return trimmed;
  const second = trimmed[1] ?? '';
  if (second && second === second.toUpperCase() && /[A-Z]/.test(second)) return trimmed;
  if (/^(Jira|GitHub|GitLab|Bitbucket|Slack|Microsoft|Excel|Linear|Claude|Codex|Sentry|Notion|Confluence|Zendesk|ServiceNow|Google|AWS|Azure|Salesforce|SAP|Stripe|Adyen)\b/.test(trimmed)) return trimmed;
  return trimmed[0].toLowerCase() + trimmed.slice(1);
}

/** Joins items that already read as sentences. */
export function sentences(items: string[]) {
  return items.map(item => item.trim().replace(/[.!?]$/, '')).filter(Boolean).map(item => `${item}.`).join(' ');
}
