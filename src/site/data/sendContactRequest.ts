import { contactDelivery } from './contactDelivery';
import { contactSubject, type ContactRequest } from './contactRequest';

/** Shared delivery contract for contact messages and qualified access requests. */
export async function sendContactRequest(
  fields: ContactRequest,
  delivery: Exclude<ReturnType<typeof contactDelivery>, { kind: 'mailto' }>,
  { token = '', page = '/contact', subject = contactSubject(fields), source = '', provider = '' } = {},
) {
  const values = Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, value.trim()]));
  const tools = source && provider ? { source, provider } : {};
  const response = await fetch(delivery.url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    signal: AbortSignal.timeout(30000),
    body: JSON.stringify(delivery.kind === 'web3forms' ? {
      ...values, ...tools, access_key: delivery.accessKey, subject, from_name: 'exekova website', page, botcheck: '',
      // The free-tier provider uses the widget as a browser gate only.
    } : { ...values, ...tools, page, company_url: '', turnstileToken: token }),
  });
  const result = await response.json() as { success?: boolean; ok?: boolean } | null;
  if (!response.ok || !result || result.success === false || result.ok === false
    || (delivery.kind === 'web3forms' ? result.success !== true : result.ok !== true && result.success !== true)) {
    throw new Error('Submission rejected');
  }
}
