export const COOKIE_PREFERENCES_KEY = 'exekova-cookie-preferences';
export const CONSENT_EVENT = 'exekova:cookie-preferences';
// Public tag ID, included in the browser bundle. An explicit empty override disables Analytics.
const configuredId = (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? 'G-R33H6YFCH2').trim();
export const GA_MEASUREMENT_ID = /^G-[A-Z0-9]+$/.test(configuredId) ? configuredId : '';
export const GA_CONFIG = { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false, cookie_expires: 31536000 };
export const GA_DENIED_CONSENT = { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' };

export function analyticsConsent(): boolean | null {
  try {
    const raw = localStorage.getItem(COOKIE_PREFERENCES_KEY);
    return raw ? JSON.parse(raw).analytics === true : null;
  } catch { return null; }
}
