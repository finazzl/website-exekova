'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useReducedMotion } from 'framer-motion';
import Icon from '@/components/Icon';
import { REQUEST_ACCESS } from '../nav';
import { WHATSAPP_ACCESS_MESSAGE, WHATSAPP_DISPLAY, whatsappHref } from '../whatsapp';
import SignInRun, { type SignInRunData } from './SignInRun';

const SLIDES = [
  { title: 'Every system you already run.', body: 'Work stays in the tools your team already uses, wired through the integrations you approve.' },
  { title: 'Work arrives with its evidence.', body: 'Each run carries the acceptance record that shows what was done and how it was checked.' },
  { title: 'Ownership stays with you.', body: 'Outcomes, pull requests and the audit trail belong to your workspace, not to ours.' },
];

/**
 * The sign-in page. There is no password, social sign-in or self-service
 * sign-up: access is arranged with a person over WhatsApp. The right-hand
 * panel is the same example run exekova.com shows while signing in.
 */
export default function SignIn({ wordmark, mark, run }: { wordmark: string; mark: string; run: SignInRunData }) {
  const [slide, setSlide] = useState(0);
  const [pinned, setPinned] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || pinned) return;
    const timer = setInterval(() => setSlide(current => (current + 1) % SLIDES.length), 7000);
    return () => clearInterval(timer);
  }, [reduced, pinned]);

  return <section className="signin-section signin-fullscreen" aria-labelledby="signin-title"><div className="shell"><div className="signin-card">
    <div className="signin-form-col">
      <Link prefetch={false} href="/" className="signin-brand signin-brand-wordmark" aria-label="exekova home"><Image src={wordmark} alt="exekova" width={667} height={167} sizes="168px" priority/></Link>
      <h1 id="signin-title" className="brand-section-heading">Sign in to your <em>workspace.</em></h1>
      <p className="signin-lede">Access is arranged personally, not by a form. Message the team on WhatsApp and a person sets up your workspace.</p>

      <div className="signin-access" role="group" aria-labelledby="signin-access-title">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/integrations/whatsapp.webp" alt="" width={44} height={44}/>
        <div>
          <strong id="signin-access-title">Connect via WhatsApp to access</strong>
          <a className="signin-number" href={whatsappHref(WHATSAPP_ACCESS_MESSAGE)} target="_blank" rel="noopener noreferrer">{WHATSAPP_DISPLAY}</a>
          <p>A person replies from this number. No bot, no automated flow.</p>
        </div>
      </div>
      <a className="signin-cta" href={whatsappHref(WHATSAPP_ACCESS_MESSAGE)} target="_blank" rel="noopener noreferrer">Open WhatsApp<Icon name="arrow" size={16}/></a>

      <p className="signin-consent">By requesting access you agree to exekova’s <Link prefetch={false} href="/terms">terms</Link>, <Link prefetch={false} href="/privacy">privacy policy</Link> and <Link prefetch={false} href="/cookies">cookie policy</Link>.</p>
      <p className="signin-switch">New here? <a href={REQUEST_ACCESS}>Request access with a task<Icon name="arrow" size={14}/></a></p>
      <p className="signin-switch signin-switch-quiet">Prefer email? <Link prefetch={false} href="/contact">Contact the team<Icon name="arrow" size={14}/></Link></p>
    </div>

    <div className="signin-panel">
      <SignInRun mark={mark} run={run}/>
      <div className="signin-panel-copy">
        <h2>{SLIDES[slide].title}</h2>
        <p>{SLIDES[slide].body}</p>
        <div className="signin-dots">{SLIDES.map((item, index) => <button key={item.title} type="button" aria-current={index === slide} aria-label={item.title} onClick={() => { setPinned(true); setSlide(index); }}><span/></button>)}</div>
      </div>
    </div>
  </div></div></section>;
}
