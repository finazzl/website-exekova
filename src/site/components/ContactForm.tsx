'use client';
import Link from 'next/link';
import { useRef, useState, type FormEvent } from 'react';
import Icon from '@/components/Icon';
import { Turnstile } from './Turnstile';
import { contactDelivery } from '../data/contactDelivery';
import { buildContactRequest, contactSubject, CONTACT_TOPICS, validContact, type ContactRequest } from '../data/contactRequest';

const INVALID = 'Add a valid work email, your team, and your message.';
const PREPARED = 'Your message has not been sent yet. Review and send the draft in your email app.';
const DOWNLOADED = 'Message downloaded; it has not been sent.';
const SENT = 'Thanks — your message has been sent. Our team will reply by email.';
const EMPTY: ContactRequest = { name: '', email: '', company: '', topic: CONTACT_TOPICS[0], message: '' };

export default function ContactForm({ email }: { email: string }) {
  const [fields, setFields] = useState<ContactRequest>(EMPTY);
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [token, setToken] = useState('');
  const [resetKey, setResetKey] = useState(0);
  const pending = useRef(false);
  const mountedAt = useRef(Date.now());
  const honeypot = useRef<HTMLInputElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const delivery = contactDelivery();
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();
  function update(key: keyof ContactRequest, value: string) { setFields(current => ({ ...current, [key]: value })); setStatus(''); }
  function validate() {
    if (!validContact(fields)) { setStatus(INVALID); form.current?.reportValidity(); return false; }
    return true;
  }
  function download() {
    if (!validate()) return;
    const url = URL.createObjectURL(new Blob([buildContactRequest(fields)], { type: 'text/plain;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'exekova-contact-request.txt';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus(DOWNLOADED);
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;
    if (!validate()) return;
    if (honeypot.current?.value) { setFields(EMPTY); setStatus(SENT); return; }
    // Do not silently discard a legitimate fast submission (for example autofill).
    if (Date.now() - mountedAt.current < 2500) { setStatus('Please wait a moment, then send your message.'); return; }
    if (siteKey && !token) { setStatus('Please complete the verification check before sending.'); return; }
    if (delivery.kind === 'mailto') {
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(contactSubject(fields))}&body=${encodeURIComponent(buildContactRequest(fields))}`;
      setStatus(PREPARED);
      return;
    }
    pending.current = true;
    setSubmitting(true);
    setStatus('Sending your message…');
    const values = Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, value.trim()]));
    try {
      const response = await fetch(delivery.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        signal: AbortSignal.timeout(30000),
        body: JSON.stringify(delivery.kind === 'web3forms' ? {
          ...values, access_key: delivery.accessKey, subject: contactSubject(fields), from_name: 'exekova website', page: '/contact', botcheck: '',
          // Match Truvon's free-tier path: server-side Turnstile is a Web3Forms Pro feature.
        } : { ...values, page: '/contact', company_url: '', turnstileToken: token }),
      });
      const result = await response.json() as { success?: boolean; ok?: boolean } | null;
      if (!response.ok || !result || result.success === false || result.ok === false
        || (delivery.kind === 'web3forms' ? result.success !== true : result.ok !== true && result.success !== true)) {
        throw new Error('Submission rejected');
      }
      setFields(EMPTY);
      setStatus(SENT);
    } catch {
      setStatus(`We could not send your message. Please try again, or email ${email} directly.`);
    } finally {
      pending.current = false;
      setSubmitting(false);
      setToken('');
      setResetKey(value => value + 1);
    }
  }
  return <form ref={form} className="beta-request-form contact-form" aria-label="Contact request" aria-busy={submitting} onSubmit={submit}>
    <input ref={honeypot} type="text" name="company_url" tabIndex={-1} autoComplete="off" aria-hidden="true" className="contact-honeypot" defaultValue=""/>
    <fieldset disabled={submitting} className="contact-fields">
    <div className="request-row">
      <label htmlFor="contact-name">Name (optional)<input id="contact-name" name="name" maxLength={120} autoComplete="name" placeholder="Your name" value={fields.name} onChange={e => update('name', e.target.value)}/></label>
      <label htmlFor="contact-email">Work email<input id="contact-email" name="email" type="email" required maxLength={160} autoComplete="email" placeholder="you@company.com" value={fields.email} onChange={e => update('email', e.target.value)}/></label>
    </div>
    <div className="request-row">
      <label htmlFor="contact-company">Company or team<input id="contact-company" name="company" required maxLength={120} autoComplete="organization" placeholder="Your team" value={fields.company} onChange={e => update('company', e.target.value)}/></label>
      <label htmlFor="contact-topic">Topic<select id="contact-topic" name="topic" value={fields.topic} onChange={e => update('topic', e.target.value)}>{CONTACT_TOPICS.map(topic => <option key={topic} value={topic}>{topic}</option>)}</select></label>
    </div>
    <label htmlFor="contact-message">Message<textarea id="contact-message" name="message" required maxLength={2000} rows={5} placeholder="Tell us about your team, the task you have in mind, or the question you want answered." value={fields.message} onChange={e => update('message', e.target.value)}/></label>
    {siteKey && <Turnstile siteKey={siteKey} resetKey={resetKey} onVerify={setToken} onExpire={() => setToken('')} onError={() => { setToken(''); setStatus('Verification could not complete. Please retry the check or email us directly.'); }}/> }
    <div className="request-actions"><button type="submit" className="beta-button" disabled={submitting || Boolean(siteKey && !token)}>{submitting ? 'Sending…' : delivery.kind === 'mailto' ? 'Open email draft' : 'Send message'}<Icon name="arrow" size={17}/></button><button type="button" className="beta-text-button" onClick={download}>Download message<Icon name="file" size={15}/></button></div>
    </fieldset>
    <p className="beta-fine">{delivery.kind === 'mailto' ? 'Review and send the message in your email app. ' : 'Your message is sent to the exekova team. '}This page does not start work or take payment. Do not include credentials or private code. <Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link></p>
    <p className="request-status" role="status">{status}</p>
    <p className="request-contact">Prefer email? Write to <a href={`mailto:${email}`}>{email}</a>.</p>
  </form>;
}
