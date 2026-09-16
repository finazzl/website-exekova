// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { handleContact } from '../server/contact';
import worker from '../../../deployment/cloudflare/worker';

const env = { TURNSTILE_SECRET: 'test-secret', RESEND_API_KEY: 'test-api-key' };
const fields = { name: '', email: 'lead@example.test', company: 'Example team', topic: 'Pricing and invoicing', message: 'How does invoicing work?', turnstileToken: 'test-token' };
const request = (body: unknown = fields) => new Request('https://exekova.com/api/contact', {
  method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
});
let fetchMock: ReturnType<typeof vi.fn>;
beforeEach(() => { fetchMock = vi.fn(); vi.stubGlobal('fetch', fetchMock); });
afterEach(() => { vi.unstubAllGlobals(); });

describe('contact receiver', () => {
  it.each([null, [], 'invalid'])('rejects non-object bodies: %j', async body => {
    expect((await handleContact(request(body), env)).status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });
  it.each([
    { email: {} }, { message: 123 }, { topic: 'Unknown' }, { turnstileToken: '' }, { message: 'x'.repeat(2001) },
  ])('rejects invalid fields before contacting providers: %j', async values => {
    expect((await handleContact(request({ ...fields, ...values }), env)).status).toBe(422);
    expect(fetchMock).not.toHaveBeenCalled();
  });
  it('drops honeypots without contacting providers', async () => {
    const response = await handleContact(request({ company_url: 'spam' }), env);
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ ok: false, error: 'Unable to submit this request.' });
    expect(fetchMock).not.toHaveBeenCalled();
  });
  it('fails closed when credentials are absent', async () => {
    expect((await handleContact(request(), {})).status).toBe(503);
    expect(fetchMock).not.toHaveBeenCalled();
  });
  it('does not deliver when verification fails', async () => {
    fetchMock.mockResolvedValue(Response.json({ success: false }));
    expect((await handleContact(request(), env)).status).toBe(403);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
  it('verifies before emailing the intended inbox with reply-to', async () => {
    fetchMock.mockResolvedValueOnce(Response.json({ success: true })).mockResolvedValueOnce(Response.json({ id: 'message-id' }));
    const response = await handleContact(request(), { ...env, LEAD_TO: 'team@example.test', LEAD_FROM: 'website@example.test' });
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(fetchMock.mock.calls[0][0]).toContain('/turnstile/v0/siteverify');
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toMatchObject({ secret: env.TURNSTILE_SECRET, response: 'test-token' });
    expect(fetchMock.mock.calls[1][0]).toBe('https://api.resend.com/emails');
    expect(JSON.parse(fetchMock.mock.calls[1][1].body)).toMatchObject({ from: 'website@example.test', to: 'team@example.test', reply_to: fields.email, subject: 'exekova contact · Pricing and invoicing · lead@example.test' });
    expect(JSON.parse(fetchMock.mock.calls[1][1].body).text).toContain(fields.message);
  });
  it('reports provider rejection and network errors', async () => {
    fetchMock.mockResolvedValueOnce(Response.json({ success: true })).mockResolvedValueOnce(new Response('', { status: 500 }));
    expect((await handleContact(request(), env)).status).toBe(502);
    fetchMock.mockRejectedValueOnce(new Error('offline'));
    expect((await handleContact(request(), env)).status).toBe(502);
  });
  it('uses the access-request email and selected tools in the delivered subject', async () => {
    fetchMock.mockResolvedValueOnce(Response.json({ success: true })).mockResolvedValueOnce(Response.json({ id: 'message-id' }));
    const response = await handleContact(request({ ...fields, topic: 'Request access', page: '/#request-access', source: 'Jira', provider: 'GitHub' }), env);
    expect(response.status).toBe(200);
    expect(JSON.parse(fetchMock.mock.calls[1][1].body).subject).toBe('exekova access request - lead@example.test - Jira - GitHub');
  });
  it('rejects unrecognised access tools before contacting providers', async () => {
    const response = await handleContact(request({ ...fields, topic: 'Request access', page: '/#request-access', source: 'Unknown', provider: 'GitHub' }), env);
    expect(response.status).toBe(422);
    expect(fetchMock).not.toHaveBeenCalled();
  });
  it('routes API requests to the handler and pages to static assets', async () => {
    const ASSETS = { fetch: vi.fn().mockResolvedValue(new Response('page')) };
    expect((await worker.fetch(new Request('https://exekova.com/api/contact'), { ...env, ASSETS })).status).toBe(405);
    expect(ASSETS.fetch).not.toHaveBeenCalled();
    expect(await (await worker.fetch(new Request('https://exekova.com/contact'), { ...env, ASSETS })).text()).toBe('page');
  });
});
