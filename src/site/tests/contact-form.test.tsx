import { describe, expect, it, vi, afterEach } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import ContactForm from '../components/ContactForm';
import { buildContactRequest, contactSubject, CONTACT_TOPICS, validContact, type ContactRequest } from '../data/contactRequest';

afterEach(() => { cleanup(); vi.restoreAllMocks(); });
const request: ContactRequest = { name: 'Sam', email: 'lead@example.test', company: 'Example team', topic: 'Pricing and invoicing', message: 'How are accepted tasks invoiced?' };

describe('contact requests', () => {
  it('refuses incomplete requests without sending data', () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    render(<ContactForm email="connect@example.test"/>);
    fireEvent.submit(screen.getByRole('form', { name: 'Contact request' }));
    expect(screen.getByRole('status').textContent).toMatch(/valid work email/i);
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(validContact({ ...request, message: '   ' })).toBe(false);
    expect(validContact({ ...request, email: 'invalid' })).toBe(false);
    expect(validContact({ ...request, topic: 'Unrecognised' })).toBe(false);
    expect(validContact({ ...request, name: '' })).toBe(true);
    expect(validContact(request)).toBe(true);
  });
  it('prepares the subject and plain-text body from what was typed', () => {
    expect(contactSubject(request)).toBe('exekova contact · Pricing and invoicing');
    const body = buildContactRequest(request);
    for (const value of ['Sam', 'lead@example.test', 'Example team', 'Pricing and invoicing', request.message, 'exekova contact page']) expect(body).toContain(value);
    expect(buildContactRequest({ ...request, name: '' })).toContain('Name: Not given');
  });
  it('offers every topic and keeps the draft on the page until it is sent', () => {
    render(<ContactForm email="connect@example.test"/>);
    const topic = screen.getByLabelText('Topic') as HTMLSelectElement;
    expect([...topic.options].map(option => option.value)).toEqual([...CONTACT_TOPICS]);
    fireEvent.change(screen.getByLabelText('Work email'), { target: { value: request.email } });
    fireEvent.change(screen.getByLabelText('Company or team'), { target: { value: request.company } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: request.message } });
    fireEvent.submit(screen.getByRole('form', { name: 'Contact request' }));
    expect(screen.getByRole('status').textContent).toMatch(/has not been sent yet/i);
  });
  it('does not download an incomplete message', () => {
    const createUrl = vi.fn(() => 'blob:test');
    vi.stubGlobal('URL', { ...URL, createObjectURL: createUrl, revokeObjectURL: vi.fn() });
    render(<ContactForm email="connect@example.test"/>);
    fireEvent.click(screen.getByRole('button', { name: 'Download message' }));
    expect(createUrl).not.toHaveBeenCalled();
    expect(screen.getByRole('status').textContent).toMatch(/valid work email/i);
    vi.unstubAllGlobals();
  });
});
