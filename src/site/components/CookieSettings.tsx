'use client';
import { useEffect, useState } from 'react';
import Icon from '@/components/Icon';
import { CONSENT_EVENT, COOKIE_PREFERENCES_KEY, GA_MEASUREMENT_ID } from '../data/analytics';

type Optional = 'functional' | 'analytics' | 'marketing';
type Preferences = Record<Optional, boolean> & { savedAt?: string };

const DEFAULTS: Preferences = { functional: false, analytics: Boolean(GA_MEASUREMENT_ID), marketing: false };

const CATEGORIES: { key: Optional | 'necessary'; title: string; body: string; items: string[] }[] = [
  { key: 'necessary', title: 'Strictly necessary', body: 'Remembers the choices you save on this page. It cannot be switched off because it is what records your choice. Optional analytics is controlled separately.', items: [`${COOKIE_PREFERENCES_KEY} · local storage`] },
  { key: 'functional', title: 'Functional', body: 'Storage that would remember conveniences such as a dismissed panel. Not currently used: nothing loads if you turn this on. Your choice is recorded for when it is.', items: ['Not currently used'] },
  { key: 'analytics', title: 'Analytics', body: GA_MEASUREMENT_ID ? 'Google Analytics measures page visits and traffic sources by default. Turn this off and save your preferences to stop measurement. Form entries are not sent to Analytics.' : 'Google Analytics is not configured. Nothing loads if you turn this on.', items: GA_MEASUREMENT_ID ? ['_ga and _ga_* cookies, up to one year'] : ['Not currently used'] },
  { key: 'marketing', title: 'Marketing', body: 'Storage that would support advertising. Not used and not planned: nothing loads if you turn this on.', items: ['Not currently used'] },
];

function read(): { preferences: Preferences; available: boolean } {
  try {
    const raw = window.localStorage.getItem(COOKIE_PREFERENCES_KEY);
    if (!raw) return { preferences: DEFAULTS, available: true };
    const parsed = JSON.parse(raw) as Partial<Preferences>;
    return { preferences: { functional: parsed.functional === true, analytics: parsed.analytics === true, marketing: parsed.marketing === true, savedAt: typeof parsed.savedAt === 'string' ? parsed.savedAt : undefined }, available: true };
  } catch {
    return { preferences: DEFAULTS, available: false };
  }
}

/** The visitor's storage choices, kept only in their own browser. */
export default function CookieSettings() {
  const [preferences, setPreferences] = useState<Preferences>(DEFAULTS);
  const [available, setAvailable] = useState(true);
  const [status, setStatus] = useState('');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = read();
    setPreferences(stored.preferences);
    setAvailable(stored.available);
    setHydrated(true);
  }, []);

  function persist(next: Record<Optional, boolean>, message: string) {
    const record: Preferences = { ...next, savedAt: new Date().toISOString() };
    try {
      window.localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(record));
      setPreferences(record);
      setAvailable(true);
      setStatus(message);
    } catch {
      setPreferences(record);
      setAvailable(false);
      setStatus('Your browser did not allow the preference to be stored. Your choices apply for this visit only.');
    }
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: next.analytics }));
    if (!next.analytics) {
      for (const entry of document.cookie.split(';')) {
        const name = entry.trim().split('=')[0];
        if (!/^_ga(?:_|$)/.test(name)) continue;
        for (const domain of ['', `; Domain=${location.hostname}`, '; Domain=.exekova.com']) {
          document.cookie = `${name}=; Max-Age=0; Path=/${domain}; SameSite=Lax`;
        }
      }
    }
  }

  function toggle(key: Optional) {
    setPreferences(current => ({ ...current, [key]: !current[key] }));
    setStatus('');
  }

  const saved = preferences.savedAt ? new Date(preferences.savedAt) : null;
  return <div className="cookie-settings">
    {!available && hydrated && <p className="legal-notice"><Icon name="clock" size={16}/>Storage is not available in this browser, so choices cannot be remembered between visits. Your choices will apply to this visit.</p>}
    <div role="group" aria-label="Storage categories">{CATEGORIES.map(category => {
      const optional = category.key === 'necessary' ? null : category.key;
      const necessary = optional === null;
      const on = optional === null ? true : preferences[optional];
      return <div className="cookie-category" key={category.key}>
        <div>
          <h3 id={`cookie-${category.key}`}>{category.title}{necessary && <small>Always on</small>}</h3>
          <p>{category.body}</p>
          <ul aria-label={`${category.title} storage items`}>{category.items.map(item => <li key={item}>{item}</li>)}</ul>
        </div>
        <button type="button" role="switch" className="cookie-switch" aria-checked={on} aria-labelledby={`cookie-${category.key}`} disabled={necessary} onClick={() => { if (optional !== null) toggle(optional); }}><span className="sr-only">{on ? 'On' : 'Off'}</span></button>
      </div>;
    })}</div>
    <div className="cookie-actions">
      <button type="button" className="beta-button" onClick={() => persist({ functional: preferences.functional, analytics: preferences.analytics, marketing: preferences.marketing }, 'Preferences saved on this device.')}>Save preferences<Icon name="check" size={16}/></button>
      <button type="button" className="beta-secondary" onClick={() => persist({ functional: false, analytics: false, marketing: false }, 'Non-essential storage rejected. Only your preference is stored.')}>Reject non-essential</button>
      <button type="button" className="beta-secondary" onClick={() => persist({ functional: true, analytics: true, marketing: true }, 'Preferences saved. Configured analytics may now load.')}>Accept all</button>
    </div>
    <p className="cookie-status" role="status" aria-live="polite">{status}</p>
    {saved && !status && <p className="beta-fine">Last saved {saved.toLocaleString()}.</p>}
  </div>;
}
