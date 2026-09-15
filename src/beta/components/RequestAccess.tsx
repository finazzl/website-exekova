'use client';
import Link from 'next/link';
import { useRef, useState } from 'react';
import Icon from '@/components/Icon';
import content from '../content/beta.json';
import { CONNECTORS } from '../data/connectors';
import { buildAccessRequest, includesPlannedIntegration, validRequest, type AccessRequest } from '../data/accessRequest';

type Copy = typeof content.request;
export default function RequestAccess({ email, signInHref, copy: c }: { email: string; signInHref: string; copy: Copy }) {
  const [fields, setFields] = useState<AccessRequest>({ email: '', company: '', source: 'Jira', provider: 'GitHub', task: '', criteria: '', repo: '' });
  const [status, setStatus] = useState('');
  const form = useRef<HTMLFormElement>(null);
  const planned = includesPlannedIntegration(fields);
  function update(key: keyof AccessRequest, value: string) { setFields(current => ({...current, [key]: value})); setStatus(''); }
  function validate() {
    if (!validRequest(fields)) { setStatus(c.invalid); form.current?.reportValidity(); return false; }
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
  return <form ref={form} className="beta-request-form" aria-label="Access request" onSubmit={event => {
    event.preventDefault();
    if (!validate()) return;
    const subject = planned ? 'exekova planned integration interest' : 'exekova access request';
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildAccessRequest(fields))}`;
    setStatus(c.prepared);
  }}>
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
    <div className="request-actions"><button type="submit" className="beta-button">{c.submit}<Icon name="arrow" size={17}/></button><button type="button" className="beta-text-button" onClick={download}>{c.download}<Icon name="file" size={15}/></button></div>
    <p className="beta-fine">{c.fine} <Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link></p>
    <p className="request-status" role="status">{status}</p>
    <p className="request-contact">{c.contactHint} <a href={`mailto:${email}`}>{email}</a>.</p>
    <Link className="request-signin" href={signInHref}>{c.signin}<Icon name="arrow" size={14}/></Link>
  </form>;
}
