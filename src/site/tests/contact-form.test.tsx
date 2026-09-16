import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import ContactForm from '../components/ContactForm';
import { buildContactRequest, contactSubject, CONTACT_TOPICS, validContact, type ContactRequest } from '../data/contactRequest';
import { contactDelivery } from '../data/contactDelivery';

vi.mock('../components/Turnstile', () => ({
  Turnstile: ({ onVerify, onExpire, resetKey }: { onVerify: (token: string) => void; onExpire: () => void; resetKey: number }) =>
    <div data-testid="verification" data-reset={resetKey}><button type="button" onClick={() => onVerify('verified-token')}>Verify</button><button type="button" onClick={onExpire}>Expire</button></div>,
}));
const request: ContactRequest = { name: 'Sam', email: 'lead@example.test', company: 'Example team', topic: 'Pricing and invoicing', message: 'How are accepted tasks invoiced?' };
let now: number;
let fetchMock: ReturnType<typeof vi.fn>;
beforeEach(() => {
  now = 10000;
  vi.spyOn(Date, 'now').mockImplementation(() => now);
  vi.stubEnv('NEXT_PUBLIC_CONTACT_ENDPOINT', '');
  vi.stubEnv('NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY', '');
  vi.stubEnv('NEXT_PUBLIC_TURNSTILE_SITE_KEY', '');
  fetchMock = vi.fn().mockResolvedValue(Response.json({ ok: true }));
  vi.stubGlobal('fetch', fetchMock);
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); vi.unstubAllEnvs(); });
function fill() {
  fireEvent.change(screen.getByLabelText('Name (optional)'), { target: { value: request.name } });
  fireEvent.change(screen.getByLabelText('Work email'), { target: { value: request.email } });
  fireEvent.change(screen.getByLabelText('Company or team'), { target: { value: request.company } });
  fireEvent.change(screen.getByLabelText('Topic'), { target: { value: request.topic } });
  fireEvent.change(screen.getByLabelText('Message'), { target: { value: request.message } });
  now += 3000;
}
function submit() { fireEvent.submit(screen.getByRole('form', { name: 'Contact request' })); }

describe('contact requests', () => {
  it('refuses invalid or oversized requests without sending data', () => {
    render(<ContactForm email="connect@example.test"/>);
    submit();
    expect(screen.getByRole('status').textContent).toMatch(/valid work email/i);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(validContact({ ...request, message: '   ' })).toBe(false);
    expect(validContact({ ...request, email: 'invalid' })).toBe(false);
    expect(validContact({ ...request, topic: 'Unrecognised' })).toBe(false);
    expect(validContact({ ...request, message: 'x'.repeat(2001) })).toBe(false);
    expect(validContact({ ...request, name: '' })).toBe(true);
  });
  it('formats the subject and plain-text body', () => {
    expect(contactSubject(request)).toBe('exekova contact · Pricing and invoicing');
    const body = buildContactRequest(request);
    for (const value of Object.values(request)) expect(body).toContain(value);
    expect(buildContactRequest({ ...request, name: '' })).toContain('Name: Not given');
  });
  it('sends to the production receiver and clears fields only after acknowledgement', async () => {
    render(<ContactForm email="connect@example.test"/>);
    const topic = screen.getByLabelText('Topic') as HTMLSelectElement;
    expect([...topic.options].map(option => option.value)).toEqual([...CONTACT_TOPICS]);
    fill(); submit();
    await waitFor(() => expect(screen.getByRole('status').textContent).toMatch(/has been sent/i));
    expect(fetchMock.mock.calls[0][0]).toBe('/api/contact');
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toMatchObject({ ...request, company_url: '', page: '/contact' });
    expect((screen.getByLabelText('Message') as HTMLTextAreaElement).value).toBe('');
  });
  it.each([
    [502, { ok: false }], [200, { success: false }], [200, {}], [200, null],
  ])('retains the message after unconfirmed delivery (%s, %j)', async (status, body) => {
    fetchMock.mockResolvedValue(Response.json(body, { status }));
    render(<ContactForm email="connect@example.test"/>);
    fill(); submit();
    await waitFor(() => expect(screen.getByRole('status').textContent).toMatch(/could not send/i));
    expect((screen.getByLabelText('Message') as HTMLTextAreaElement).value).toBe(request.message);
  });
  it('allows retry after network failure', async () => {
    fetchMock.mockRejectedValueOnce(new Error('offline'));
    render(<ContactForm email="connect@example.test"/>);
    fill(); submit();
    await waitFor(() => expect(screen.getByRole('status').textContent).toMatch(/could not send/i));
    submit();
    await waitFor(() => expect(screen.getByRole('status').textContent).toMatch(/has been sent/i));
  });
  it('prevents double submission while delivery is pending', async () => {
    let finish!: (value: Response) => void;
    fetchMock.mockReturnValue(new Promise<Response>(resolve => { finish = resolve; }));
    render(<ContactForm email="connect@example.test"/>);
    fill(); submit(); submit();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect((screen.getByRole('button', { name: 'Sending…' }) as HTMLButtonElement).disabled).toBe(true);
    finish(Response.json({ ok: true }));
    await waitFor(() => expect(screen.getByRole('status').textContent).toMatch(/has been sent/i));
  });
  it('prioritizes a custom endpoint over Web3Forms', async () => {
    vi.stubEnv('NEXT_PUBLIC_CONTACT_ENDPOINT', 'https://receiver.example.test/contact');
    vi.stubEnv('NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY', 'public-key');
    render(<ContactForm email="connect@example.test"/>);
    fill(); submit();
    await waitFor(() => expect(screen.getByRole('status').textContent).toMatch(/has been sent/i));
    expect(fetchMock.mock.calls[0][0]).toBe('https://receiver.example.test/contact');
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).not.toHaveProperty('access_key');
  });
  it('uses the Web3Forms free-tier payload', async () => {
    vi.stubEnv('NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY', 'public-key');
    fetchMock.mockResolvedValue(Response.json({ success: true }));
    render(<ContactForm email="connect@example.test"/>);
    fill(); submit();
    await waitFor(() => expect(screen.getByRole('status').textContent).toMatch(/has been sent/i));
    expect(fetchMock.mock.calls[0][0]).toBe('https://api.web3forms.com/submit');
    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body).toMatchObject({ ...request, access_key: 'public-key', from_name: 'exekova website', botcheck: '' });
    expect(body).not.toHaveProperty('turnstileToken');
    expect(body).not.toHaveProperty('cf-turnstile-response');
  });
  it('requires verification, clears expired tokens, and resets after delivery', async () => {
    vi.stubEnv('NEXT_PUBLIC_TURNSTILE_SITE_KEY', 'site-key');
    render(<ContactForm email="connect@example.test"/>);
    fill(); submit();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.getByRole('status').textContent).toMatch(/complete the verification/i);
    fireEvent.click(screen.getByRole('button', { name: 'Verify' }));
    fireEvent.click(screen.getByRole('button', { name: 'Expire' }));
    expect((screen.getByRole('button', { name: 'Send message' }) as HTMLButtonElement).disabled).toBe(true);
    fireEvent.click(screen.getByRole('button', { name: 'Verify' }));
    submit();
    await waitFor(() => expect(screen.getByRole('status').textContent).toMatch(/has been sent/i));
    expect(JSON.parse(fetchMock.mock.calls[0][1].body).turnstileToken).toBe('verified-token');
    expect(screen.getByTestId('verification').getAttribute('data-reset')).toBe('1');
  });
  it('silently drops honeypots without delivery', () => {
    const { container } = render(<ContactForm email="connect@example.test"/>);
    fill();
    fireEvent.change(container.querySelector('input[name="company_url"]')!, { target: { value: 'spam' } });
    submit();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.getByRole('status').textContent).toMatch(/has been sent/i);
  });
  it('retains fast autofill submissions and asks the visitor to retry', () => {
    render(<ContactForm email="connect@example.test"/>);
    fill(); now -= 3000; submit();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.getByRole('status').textContent).toMatch(/wait a moment/i);
    expect((screen.getByLabelText('Message') as HTMLTextAreaElement).value).toBe(request.message);
  });
  it('reserves mailto fallback for unconfigured development', () => {
    vi.stubEnv('NODE_ENV', 'development');
    expect(contactDelivery().kind).toBe('mailto');
    vi.stubEnv('NODE_ENV', 'production');
    expect(contactDelivery()).toEqual({ kind: 'endpoint', url: '/api/contact' });
  });
  it('does not download an incomplete message', () => {
    const createUrl = vi.fn(() => 'blob:test');
    vi.stubGlobal('URL', { ...URL, createObjectURL: createUrl, revokeObjectURL: vi.fn() });
    render(<ContactForm email="connect@example.test"/>);
    fireEvent.click(screen.getByRole('button', { name: 'Download message' }));
    expect(createUrl).not.toHaveBeenCalled();
    expect(screen.getByRole('status').textContent).toMatch(/valid work email/i);
  });
});
