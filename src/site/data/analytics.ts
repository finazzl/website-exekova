export const COOKIE_PREFERENCES_KEY = 'exekova-cookie-preferences';
export const CONSENT_EVENT = 'exekova:cookie-preferences';
// Public tag ID, included in the browser bundle. An explicit empty override disables Analytics.
const configuredId = (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? 'G-R33H6YFCH2').trim();
export const GA_MEASUREMENT_ID = /^G-[A-Z0-9]+$/.test(configuredId) ? configuredId : '';

export function analyticsConsent(): boolean | null {
  try {
    const raw = localStorage.getItem(COOKIE_PREFERENCES_KEY);
    return raw ? JSON.parse(raw).analytics === true : null;
  } catch { return null; }
}
