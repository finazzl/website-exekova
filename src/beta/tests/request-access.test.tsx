import { describe, expect, it, vi, afterEach } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import RequestAccess from '../components/RequestAccess';
import { buildAccessRequest, includesPlannedIntegration, validRequest, type AccessRequest } from '../data/accessRequest';
import content from '../content/beta.json';

afterEach(() => { cleanup(); vi.restoreAllMocks(); });
const request: AccessRequest = { email: 'lead@example.test', company: 'Example team', source: 'Jira', provider: 'GitHub', task: 'Keep the selected filters.', criteria: 'Filters persist. Add regression coverage.', repo: 'example/web' };
const props = { email: 'connect@example.test', signInHref: '/signin', copy: content.request };
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
    render(<RequestAccess {...props}/>);
    expect(screen.getByText(/does not start work or take payment/i)).toBeTruthy();
    fireEvent.change(screen.getByLabelText('What needs to get done?'), {target:{value:request.task}});
    fireEvent.change(screen.getByLabelText('Task source'), {target:{value:'Work Intent form'}});
    expect(validRequest({...request, source:'Work Intent form'})).toBe(true);
    expect(includesPlannedIntegration({...request, source:'Work Intent form'})).toBe(false);
    expect((screen.getByLabelText('What needs to get done?') as HTMLTextAreaElement).value).toBe(request.task);
  });
});
