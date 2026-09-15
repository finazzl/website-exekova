'use client';
import Link from 'next/link';
import { useRef, useState } from 'react';
import Icon from '@/components/Icon';
import { buildContactRequest, contactSubject, CONTACT_TOPICS, validContact, type ContactRequest } from '../data/contactRequest';

const INVALID = 'Add a valid work email, your team, and your message.';
const PREPARED = 'Your message has not been sent yet. Review and send the draft in your email app.';
const DOWNLOADED = 'Message downloaded; it has not been sent.';

/** Mirrors the access request form: nothing leaves the page until the visitor sends the email. */
export default function ContactForm({ email }: { email: string }) {
  const [fields, setFields] = useState<ContactRequest>({ name: '', email: '', company: '', topic: CONTACT_TOPICS[0], message: '' });
  const [status, setStatus] = useState('');
  const form = useRef<HTMLFormElement>(null);
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
  return <form ref={form} className="beta-request-form contact-form" aria-label="Contact request" onSubmit={event => {
    event.preventDefault();
    if (!validate()) return;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(contactSubject(fields))}&body=${encodeURIComponent(buildContactRequest(fields))}`;
    setStatus(PREPARED);
  }}>
    <div className="request-row">
      <label htmlFor="contact-name">Name (optional)<input id="contact-name" name="name" maxLength={120} autoComplete="name" placeholder="Your name" value={fields.name} onChange={e => update('name', e.target.value)}/></label>
      <label htmlFor="contact-email">Work email<input id="contact-email" name="email" type="email" required maxLength={160} autoComplete="email" placeholder="you@company.com" value={fields.email} onChange={e => update('email', e.target.value)}/></label>
    </div>
    <div className="request-row">
      <label htmlFor="contact-company">Company or team<input id="contact-company" name="company" required maxLength={120} autoComplete="organization" placeholder="Your team" value={fields.company} onChange={e => update('company', e.target.value)}/></label>
      <label htmlFor="contact-topic">Topic<select id="contact-topic" name="topic" value={fields.topic} onChange={e => update('topic', e.target.value)}>{CONTACT_TOPICS.map(topic => <option key={topic} value={topic}>{topic}</option>)}</select></label>
    </div>
    <label htmlFor="contact-message">Message<textarea id="contact-message" name="message" required maxLength={2000} rows={5} placeholder="Tell us about your team, the task you have in mind, or the question you want answered." value={fields.message} onChange={e => update('message', e.target.value)}/></label>
    <div className="request-actions"><button type="submit" className="beta-button">Open email draft<Icon name="arrow" size={17}/></button><button type="button" className="beta-text-button" onClick={download}>Download message<Icon name="file" size={15}/></button></div>
    <p className="beta-fine">Review and send the message in your email app. This page does not start work or take payment. Do not include credentials or private code. <Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link></p>
    <p className="request-status" role="status">{status}</p>
    <p className="request-contact">No email app? Download your message and send it to <a href={`mailto:${email}`}>{email}</a>.</p>
  </form>;
}
