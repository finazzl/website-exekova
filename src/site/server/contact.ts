import { buildContactRequest, contactSubject, validContact } from '../data/contactRequest';
import { accessRequestSubject } from '../../beta/data/accessRequest';
import { CONNECTORS } from '../../beta/data/connectors';

export type ContactEnv = {
  TURNSTILE_SECRET?: string;
  RESEND_API_KEY?: string;
  LEAD_TO?: string;
  LEAD_FROM?: string;
};

function json(data: object, status = 200) {
  return Response.json(data, { status, headers: { 'Cache-Control': 'no-store' } });
}

export async function handleContact(request: Request, env: ContactEnv): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response(null, { status: 405, headers: { Allow: 'POST' } });
  }
  if (!request.headers.get('content-type')?.includes('application/json')) {
    return json({ ok: false, error: 'Expected JSON.' }, 415);
  }
  let body: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > 16000) return json({ ok: false, error: 'Message too large.' }, 413);
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('Invalid body');
    body = parsed as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: 'Invalid JSON.' }, 400);
  }
  if (body.company_url) return json({ ok: false, error: 'Unable to submit this request.' }, 400);
  const field = (key: string) => typeof body[key] === 'string' ? body[key].trim() : '';
  const fields = { name: field('name'), email: field('email'), company: field('company'), topic: field('topic'), message: field('message') };
  const token = field('turnstileToken') || field('cf-turnstile-response');
  if (!validContact(fields) || !token || token.length > 2048) {
    return json({ ok: false, error: 'Missing or invalid fields.' }, 422);
  }
  let subject = contactSubject(fields);
  if (field('page') === '/#request-access') {
    const tools = { email: fields.email, source: field('source'), provider: field('provider') };
    if (fields.topic !== 'Request access'
      || !CONNECTORS.some(item => item.kind === 'source' && item.name === tools.source)
      || !CONNECTORS.some(item => item.kind === 'repo' && item.name === tools.provider)) {
      return json({ ok: false, error: 'Missing or invalid tools.' }, 422);
    }
    subject = accessRequestSubject(tools);
  }
  if (!env.TURNSTILE_SECRET || !env.RESEND_API_KEY) {
    return json({ ok: false, error: 'Contact delivery is not configured.' }, 503);
  }
  try {
    const verified = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: env.TURNSTILE_SECRET, response: token, remoteip: request.headers.get('CF-Connecting-IP') || undefined }),
      signal: AbortSignal.timeout(10000),
    });
    if (!verified.ok) return json({ ok: false, error: 'Verification unavailable.' }, 502);
    const verification = await verified.json() as { success?: boolean };
    if (verification?.success !== true) return json({ ok: false, error: 'Verification failed.' }, 403);

    const sent = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: env.LEAD_FROM || 'website@exekova.com',
        to: env.LEAD_TO || 'connect@exekova.com',
        reply_to: fields.email,
        subject,
        text: buildContactRequest(fields),
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!sent.ok) return json({ ok: false, error: 'Delivery failed.' }, 502);
    return json({ ok: true });
  } catch {
    return json({ ok: false, error: 'Unable to send your message. Please try again.' }, 502);
  }
}
