'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { analyticsConsent, CONSENT_EVENT, COOKIE_PREFERENCES_KEY, GA_CONFIG, GA_DENIED_CONSENT, GA_MEASUREMENT_ID } from '../data/analytics';

type AnalyticsWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void; [key: `ga-disable-${string}`]: boolean };

/** The library is discoverable in the head; measurement requires an explicit analytics choice. */
export default function GoogleAnalytics() {
  const pathname = usePathname();
  const [consent, setConsent] = useState<boolean | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => { setConsent(analyticsConsent()); setReady(true); };
    const changed = (event: Event) => setConsent((event as CustomEvent<boolean>).detail === true);
    sync();
    window.addEventListener('storage', sync);
    window.addEventListener(CONSENT_EVENT, changed);
    return () => { window.removeEventListener('storage', sync); window.removeEventListener(CONSENT_EVENT, changed); };
  }, []);

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || !ready) return;
    const target = window as unknown as AnalyticsWindow;
    target[`ga-disable-${GA_MEASUREMENT_ID}`] = consent !== true;
    target.gtag?.('consent', 'update', { ...GA_DENIED_CONSENT, analytics_storage: consent === true ? 'granted' : 'denied' });
    if (consent === true) target.gtag?.('config', GA_MEASUREMENT_ID, GA_CONFIG);
  }, [consent, ready]);

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || !ready || consent !== true) return;
    const target = window as unknown as AnalyticsWindow;
    // Query strings and fragments may contain form or referral data. Do not collect them.
    let referrer = '';
    try { const url = new URL(document.referrer); referrer = url.origin + url.pathname; } catch { /* Direct visit. */ }
    target.gtag?.('event', 'page_view', { page_location: window.location.origin + pathname, page_title: document.title, page_referrer: referrer });
  }, [consent, pathname, ready]);

  function choose(analytics: boolean) {
    try { localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify({ functional: false, marketing: false, analytics, savedAt: new Date().toISOString() })); } catch { /* Apply to this visit if storage is unavailable. */ }
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: analytics }));
  }

  if (!GA_MEASUREMENT_ID || !ready || consent !== null) return null;
  return <aside className="analytics-choice" aria-label="Analytics preference">
    <p>May we use Google Analytics to understand visits and improve the site? <a href="/cookies">Cookie details</a></p>
    <div><button type="button" onClick={() => choose(false)}>No thanks</button><button type="button" onClick={() => choose(true)}>Allow analytics</button></div>
  </aside>;
}
