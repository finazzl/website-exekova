/**
 * The contact form's message, built the same way the access request is: a
 * plain-text email the visitor reviews and sends from their own email app.
 */
export const CONTACT_TOPICS = ['Request access', 'A task I have in mind', 'Pricing and invoicing', 'Partnerships', 'Privacy or legal', 'Press', 'Something else'] as const;
export type ContactTopic = (typeof CONTACT_TOPICS)[number];

export type ContactRequest = { name: string; email: string; company: string; topic: string; message: string };

export function validContact(request: ContactRequest) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(request.email.trim())
    && [request.company, request.message].every(value => value.trim().length > 0)
    && (CONTACT_TOPICS as readonly string[]).includes(request.topic);
}

export function contactSubject(request: ContactRequest) {
  return `exekova contact · ${request.topic}`;
}

export function buildContactRequest(request: ContactRequest) {
  return [
    'exekova contact request', '',
    `Topic: ${request.topic}`,
    `Name: ${request.name.trim() || 'Not given'}`,
    `Work email: ${request.email.trim()}`,
    `Company or team: ${request.company.trim()}`, '',
    'Message', request.message.trim(), '',
    'Source: exekova contact page', '',
  ].join('\n');
}
