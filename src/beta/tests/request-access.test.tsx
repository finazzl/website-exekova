import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import RequestAccess from '../components/RequestAccess';
import { accessContactRequest, accessRequestSubject, buildAccessRequest, includesPlannedIntegration, validRequest, type AccessRequest } from '../data/accessRequest';
import { validContact } from '@/site/data/contactRequest';
import content from '../content/beta.json';

vi.mock('@/site/components/Turnstile', () => ({
  Turnstile: ({ onVerify, onExpire, resetKey }: { onVerify: (token: string) => void; onExpire: () => void; resetKey: number }) =>
    <div data-testid="verification" data-reset={resetKey}><button type="button" onClick={() => onVerify('verified-token')}>Verify</button><button type="button" onClick={onExpire}>Expire</button></div>,
}));
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
const request: AccessRequest = { email: 'lead@example.test', company: 'Example team', source: 'Jira', provider: 'GitHub', task: 'Keep the selected filters.', criteria: 'Filters persist. Add regression coverage.', repo: 'example/web' };
const props = { email: 'connect@example.test', signInHref: '/signin', copy: content.request };
function fill() {
  for (const [label, value] of [['Work email', request.email], ['Company or team', request.company], ['What needs to get done?', request.task], ['What does done look like?', request.criteria], ['Repository name (optional)', request.repo]]) {
    fireEvent.change(screen.getByLabelText(label), { target: { value } });
  }
  now += 3000;
}
function submit() { fireEvent.submit(screen.getByRole('form', { name: 'Access request' })); }
describe('qualified requests', () => {
  it('refuses incomplete and whitespace-only requests without sending data', () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    render(<RequestAccess {...props}/>);
    fireEvent.submit(screen.getByRole('form', {name:'Access request'}));
    expect(screen.getByRole('status').textContent).toMatch(/valid work email/i);
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(validRequest({...request, task:'   '})).toBe(false);
    expect(validRequest({...request, email:'invalid'})).toBe(false);
    expect(validRequest({...request, source:'Unrecognised'})).toBe(false);
    expect(validRequest(request)).toBe(true);
  });
  it('prepares the full request with status labels and agreed pricing', () => {
    const body = buildAccessRequest(request);
    for (const value of ['lead@example.test','Example team','Jira (Available)','GitHub (Available)','example/web',request.task,request.criteria,'$19 USD','$29 planned']) expect(body).toContain(value);
    expect(body).toContain('confirm eligibility');
    expect(accessRequestSubject(request)).toBe('exekova access request - lead@example.test - Jira - GitHub');
  });
  it('labels planned combinations as interest instead of access', () => {
    for (const source of ['Slack', 'Teams', 'Excel']) {
      const interest = {...request, source};
      expect(validRequest(interest)).toBe(true);
      expect(includesPlannedIntegration(interest)).toBe(true);
      expect(buildAccessRequest(interest)).toContain(`${source} (Planned)`);
      expect(buildAccessRequest(interest)).toContain('Planned integration interest');
    }
    const planned = {...request, source:'Linear', provider:'GitLab'};
    expect(includesPlannedIntegration(planned)).toBe(true);
    expect(buildAccessRequest(planned)).toContain('Planned integration interest');
    expect(buildAccessRequest(planned)).toContain('GitLab (Planned)');
    render(<RequestAccess {...props}/>);
    fireEvent.change(screen.getByLabelText('Task source'), {target:{value:'Linear'}});
    expect(screen.getByText(/cannot start a task yet/i)).toBeTruthy();
  });
  it('does not download an incomplete lead', () => {
    render(<RequestAccess {...props}/>);
    fireEvent.click(screen.getByRole('button', {name:'Download request'}));
    expect(screen.getByRole('status').textContent).toMatch(/acceptance criteria/i);
  });
  it('states the email handoff and keeps the request draft on the page', () => {
    vi.stubEnv('NODE_ENV', 'development');
    render(<RequestAccess {...props}/>);
    expect(screen.getByText(/does not start work or take payment/i)).toBeTruthy();
    fireEvent.change(screen.getByLabelText('What needs to get done?'), {target:{value:request.task}});
    fireEvent.change(screen.getByLabelText('Task source'), {target:{value:'Work Intent form'}});
    expect(validRequest({...request, source:'Work Intent form'})).toBe(true);
    expect(includesPlannedIntegration({...request, source:'Work Intent form'})).toBe(false);
    expect((screen.getByLabelText('What needs to get done?') as HTMLTextAreaElement).value).toBe(request.task);
  });
  it('sends all task details through the contact receiver and clears only after acknowledgement', async () => {
    render(<RequestAccess {...props}/>);
    fill(); submit();
    await waitFor(() => expect(screen.getByRole('status').textContent).toMatch(/request has been sent/));
    expect(screen.getByRole('status').getAttribute('data-tone')).toBe('success');
    expect(screen.getByRole('status').compareDocumentPosition(screen.getByLabelText('Work email')) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(fetchMock.mock.calls[0][0]).toBe('/api/contact');
    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body).toMatchObject({ email: request.email, company: request.company, topic: 'Request access', page: '/#request-access', source: 'Jira', provider: 'GitHub' });
    for (const value of [request.task, request.criteria, request.repo, 'Jira (Available)', 'GitHub (Available)']) expect(body.message).toContain(value);
    expect(validContact(body)).toBe(true);
    expect((screen.getByLabelText('What needs to get done?') as HTMLTextAreaElement).value).toBe('');
  });
  it('keeps the largest valid access request within the receiver message limit', () => {
    const large = { ...request, email: 'a'.repeat(146) + '@example.test', company: 'c'.repeat(120), repo: 'r'.repeat(120), task: 't'.repeat(650), criteria: 'a'.repeat(650), source: 'Work Intent form' };
    expect(validRequest(large)).toBe(true);
    expect(validContact(accessContactRequest(large))).toBe(true);
    expect(validRequest({ ...large, task: 't'.repeat(651) })).toBe(false);
  });
  it('delivers planned integration interest through Web3Forms', async () => {
    vi.stubEnv('NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY', 'public-test-key');
    fetchMock.mockResolvedValue(Response.json({ success: true }));
    render(<RequestAccess {...props}/>);
    fill();
    fireEvent.change(screen.getByLabelText('Task source'), { target: { value: 'Linear' } });
    submit();
    await waitFor(() => expect(screen.getByText(/interest has been registered/)).toBeTruthy());
    expect(fetchMock.mock.calls[0][0]).toBe('https://api.web3forms.com/submit');
    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body).toMatchObject({ access_key: 'public-test-key', subject: 'exekova access request - lead@example.test - Linear - GitHub (planned integration interest)', source: 'Linear', provider: 'GitHub', botcheck: '' });
    expect(body.message).toContain('Linear (Planned)');
    expect(body).not.toHaveProperty('turnstileToken');
  });
  it.each([[502, { ok: false }], [200, {}], [200, { success: false }]])('retains the request and allows retry after unconfirmed delivery (%s)', async (status, body) => {
    fetchMock.mockResolvedValueOnce(Response.json(body, { status }));
    render(<RequestAccess {...props}/>);
    fill(); submit();
    await waitFor(() => expect(screen.getByRole('status').textContent).toMatch(/could not send/));
    expect((screen.getByLabelText('What needs to get done?') as HTMLTextAreaElement).value).toBe(request.task);
    submit();
    await waitFor(() => expect(screen.getByRole('status').textContent).toMatch(/request has been sent/));
  });
  it('prevents duplicate submissions while delivery is pending', async () => {
    let finish!: (value: Response) => void;
    fetchMock.mockReturnValue(new Promise<Response>(resolve => { finish = resolve; }));
    render(<RequestAccess {...props}/>);
    fill(); submit(); submit();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect((screen.getByRole('button', { name: 'Sending…' }) as HTMLButtonElement).disabled).toBe(true);
    finish(Response.json({ ok: true }));
    await waitFor(() => expect(screen.getByRole('status').textContent).toMatch(/request has been sent/));
  });
  it('does not show success or clear the draft when the hidden field blocks delivery', () => {
    const { container } = render(<RequestAccess {...props}/>);
    fill();
    fireEvent.change(container.querySelector('input[name="company_url"]')!, { target: { value: 'autofilled.example' } });
    submit();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.getByRole('status').textContent).toMatch(/was not sent/);
    expect(screen.getByRole('status').getAttribute('data-tone')).toBe('error');
    expect((screen.getByLabelText('What needs to get done?') as HTMLTextAreaElement).value).toBe(request.task);
  });
  it('requires fresh verification after expiry or closing the dialog', async () => {
    vi.stubEnv('NEXT_PUBLIC_TURNSTILE_SITE_KEY', 'site-key');
    const view = render(<RequestAccess {...props}/>);
    fill(); fireEvent.click(screen.getByRole('button', { name: 'Send request' }));
    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.getByRole('status').textContent).toMatch(/complete the verification/);
    fireEvent.click(screen.getByRole('button', { name: 'Verify' }));
    fireEvent.click(screen.getByRole('button', { name: 'Expire' }));
    fireEvent.click(screen.getByRole('button', { name: 'Send request' }));
    expect(fetchMock).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Verify' }));
    view.rerender(<RequestAccess {...props} active={false}/>);
    expect(screen.queryByTestId('verification')).toBeNull();
    view.rerender(<RequestAccess {...props} active/>);
    fireEvent.click(screen.getByRole('button', { name: 'Send request' }));
    expect(fetchMock).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Verify' }));
    submit();
    await waitFor(() => expect(screen.getByRole('status').textContent).toMatch(/request has been sent/));
    expect(JSON.parse(fetchMock.mock.calls[0][1].body).turnstileToken).toBe('verified-token');
    expect(screen.getByTestId('verification').getAttribute('data-reset')).toBe('1');
  });
});
