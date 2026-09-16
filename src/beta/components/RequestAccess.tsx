'use client';
import Link from 'next/link';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import Icon from '@/components/Icon';
import content from '../content/beta.json';
import { CONNECTORS } from '../data/connectors';
import { accessContactRequest, accessRequestSubject, buildAccessRequest, includesPlannedIntegration, validRequest, type AccessRequest } from '../data/accessRequest';
import { contactDelivery } from '@/site/data/contactDelivery';
import { sendContactRequest } from '@/site/data/sendContactRequest';
import { Turnstile } from '@/site/components/Turnstile';
import FormFeedback, { type FeedbackTone } from '@/site/components/FormFeedback';

type Copy = typeof content.request;
const EMPTY: AccessRequest = { email: '', company: '', source: 'Jira', provider: 'GitHub', task: '', criteria: '', repo: '' };
const SENT = 'Thanks - your request has been sent. We’ll confirm fit and next steps by email.';
export default function RequestAccess({ email, signInHref, copy: c, active = true }: { email: string; signInHref: string; copy: Copy; active?: boolean }) {
  const [fields, setFields] = useState<AccessRequest>(EMPTY);
  const [feedback, setFeedback] = useState({ message: '', tone: 'info' as FeedbackTone });
  function setStatus(message: string, tone: FeedbackTone = 'info') { setFeedback({ message, tone }); }
  const [submitting, setSubmitting] = useState(false);
  const [token, setToken] = useState('');
  const [resetKey, setResetKey] = useState(0);
  const pending = useRef(false);
  const mountedAt = useRef(Date.now());
  const honeypot = useRef<HTMLInputElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const delivery = contactDelivery();
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();
  useEffect(() => { if (!active) setToken(''); }, [active]);
  const planned = includesPlannedIntegration(fields);
  function update(key: keyof AccessRequest, value: string) { setFields(current => ({...current, [key]: value})); setStatus(''); }
  function validate() {
    if (!validRequest(fields)) { setStatus(c.invalid, 'error'); form.current?.reportValidity(); return false; }
    return true;
  }
  function download() {
    if (!validate()) return;
    const url = URL.createObjectURL(new Blob([buildAccessRequest(fields)], {type: 'text/plain;charset=utf-8'}));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'exekova-access-request.txt';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus(c.downloaded);
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;
    if (!validate()) return;
    if (honeypot.current?.value) { setStatus('Your request was not sent. Please refresh this page and try again.', 'error'); return; }
    if (Date.now() - mountedAt.current < 2500) { setStatus('Please wait a moment, then send your request.'); return; }
    if (siteKey && !token) { setStatus('Please complete the verification check before sending.', 'error'); return; }
    const subject = accessRequestSubject(fields);
    if (delivery.kind === 'mailto') {
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildAccessRequest(fields))}`;
      setStatus(c.prepared);
      return;
    }
    pending.current = true;
    setSubmitting(true);
    setStatus('Sending your request…');
    try {
      await sendContactRequest(accessContactRequest(fields), delivery, { token, subject, page: '/#request-access', source: fields.source, provider: fields.provider });
      setFields(EMPTY);
      setStatus(planned ? 'Thanks - your interest has been registered. We’ll contact you when this combination is supported.' : SENT, 'success');
    } catch {
      setStatus(`We could not send your request. Please try again, or email ${email} directly.`, 'error');
    } finally {
      pending.current = false;
      setSubmitting(false);
      setToken('');
      setResetKey(value => value + 1);
    }
  }
  return <form ref={form} className="beta-request-form" aria-label="Access request" aria-busy={submitting} noValidate onSubmit={submit}>
    <input ref={honeypot} type="text" name="company_url" tabIndex={-1} autoComplete="off" aria-hidden="true" className="contact-honeypot" defaultValue=""/>
    <FormFeedback message={feedback.message} tone={feedback.tone}/>
    <fieldset disabled={submitting} className="contact-fields">
    <div className="request-row">
      <label htmlFor="request-email">{c.email}<input id="request-email" name="email" type="email" required maxLength={160} autoComplete="email" placeholder="you@company.com" value={fields.email} onChange={e=>update('email',e.target.value)}/></label>
      <label htmlFor="request-company">{c.company}<input id="request-company" name="company" required maxLength={120} autoComplete="organization" placeholder="Your team" value={fields.company} onChange={e=>update('company',e.target.value)}/></label>
    </div>
    <div className="request-row">
      <label htmlFor="request-source">{c.source}<select id="request-source" aria-label={c.source} name="source" value={fields.source} onChange={e=>update('source',e.target.value)}>{CONNECTORS.filter(item=>item.kind === 'source').map(item=><option key={item.name} value={item.name}>{item.name}</option>)}</select></label>
      <label htmlFor="request-provider">{c.provider}<select id="request-provider" aria-label={c.provider} name="provider" value={fields.provider} onChange={e=>update('provider',e.target.value)}>{CONNECTORS.filter(item=>item.kind === 'repo').map(item=><option key={item.name} value={item.name}>{item.name}</option>)}</select></label>
    </div>
    {planned && <p className="request-planned" role="status"><Icon name="clock" size={16}/>{c.planned}</p>}
    <label htmlFor="request-task">{c.task.label}<textarea id="request-task" name="task" required maxLength={650} rows={2} placeholder={c.task.placeholder} value={fields.task} onChange={e=>update('task',e.target.value)}/></label>
    <label htmlFor="request-criteria">{c.criteria.label}<textarea id="request-criteria" name="criteria" required maxLength={650} rows={2} placeholder={c.criteria.placeholder} value={fields.criteria} onChange={e=>update('criteria',e.target.value)}/></label>
    <label htmlFor="request-repo">{c.repo.label}<input id="request-repo" name="repo" maxLength={120} autoComplete="off" placeholder={c.repo.placeholder} value={fields.repo} onChange={e=>update('repo',e.target.value)}/></label>
    {active && siteKey && <Turnstile siteKey={siteKey} resetKey={resetKey} onVerify={setToken} onExpire={() => setToken('')} onError={() => { setToken(''); setStatus('Verification could not complete. Please retry the check or email us directly.', 'error'); }}/> }
    {siteKey && !token && <p className="verification-hint">Complete the verification checkbox before sending.</p>}
    <div className="request-actions"><button type="submit" className="beta-button" disabled={submitting}>{submitting ? 'Sending…' : delivery.kind === 'mailto' ? c.submit : 'Send request'}<Icon name="arrow" size={17}/></button><button type="button" className="beta-text-button" onClick={download}>{c.download}<Icon name="file" size={15}/></button></div>
    </fieldset>
    <p className="beta-fine">{delivery.kind === 'mailto' ? c.fine : 'Your request is sent to the exekova team. This page does not start work or take payment. Do not include credentials or private code.'} <Link prefetch={false} href="/privacy">Privacy</Link> · <Link prefetch={false} href="/terms">Terms</Link></p>
    <p className="request-contact">{delivery.kind === 'mailto' ? c.contactHint : 'Prefer email? Write to'} <a href={`mailto:${email}`}>{email}</a>.</p>
    <Link prefetch={false} className="request-signin" href={signInHref}>{c.signin}<Icon name="arrow" size={14}/></Link>
  </form>;
}
