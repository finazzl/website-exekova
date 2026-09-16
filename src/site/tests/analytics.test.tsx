import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server';
import GoogleAnalytics from '../components/GoogleAnalytics';
import GoogleTag from '../components/GoogleTag';
import { CONSENT_EVENT, COOKIE_PREFERENCES_KEY } from '../data/analytics';

vi.mock('next/navigation', () => ({ usePathname: () => '/contact' }));
vi.mock('../data/analytics', async importOriginal => ({ ...await importOriginal<object>(), GA_MEASUREMENT_ID: 'G-TEST123' }));

beforeEach(() => {
  const values = new Map<string, string>();
  vi.stubGlobal('localStorage', { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => values.set(key, value) });
  const head = document.createElement('div');
  head.innerHTML = renderToStaticMarkup(<GoogleTag/>);
  new Function('window', head.querySelector('#exekova-google-consent')!.textContent!)(window);
});
afterEach(() => {
  cleanup();
  document.getElementById('exekova-google-analytics')?.remove();
  delete (window as any).gtag;
  delete (window as any).dataLayer;
  delete (window as any)['ga-disable-G-TEST123'];
  vi.unstubAllGlobals();
});

describe('optional analytics', () => {
  it('includes a discoverable async tag after synchronous consent defaults in the initial HTML', () => {
    const html = renderToStaticMarkup(<GoogleTag/>);
    const head = document.createElement('div');
    head.innerHTML = html;
    const tag = head.querySelector('#exekova-google-analytics')!;
    expect(tag.getAttribute('src')).toBe('https://www.googletagmanager.com/gtag/js?id=G-TEST123');
    expect(tag.hasAttribute('async')).toBe(true);
    expect(html.indexOf('id="exekova-google-consent"')).toBeLessThan(html.indexOf('id="exekova-google-analytics"'));
    expect((window as any)['ga-disable-G-TEST123']).toBe(true);
    const commands = (window as any).dataLayer.map((args: IArguments) => Array.from(args));
    expect(commands[0]).toEqual(['consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' }]);
  });

  it('honors a saved opt-out without showing a popup', () => {
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify({ analytics: false }));
    const { container } = render(<GoogleAnalytics/>);
    expect(container.childElementCount).toBe(0);
    expect((window as any)['ga-disable-G-TEST123']).toBe(true);
    expect((window as any).dataLayer.some((args: IArguments) => args[0] === 'event')).toBe(false);
    expect(JSON.parse(localStorage.getItem(COOKIE_PREFERENCES_KEY)!).analytics).toBe(false);
  });

  it('starts automatically without UI, tracks a clean URL, and honors withdrawal', () => {
    window.history.replaceState({}, '', '/contact?email=private@example.com#message');
    const { container } = render(<GoogleAnalytics/>);
    expect(container.childElementCount).toBe(0);
    expect((window as any)['ga-disable-G-TEST123']).toBe(false);
    const events = (window as any).dataLayer.map((args: IArguments) => Array.from(args));
    const page = events.find((entry: unknown[]) => entry[1] === 'page_view');
    expect(page[2].page_location).toBe(window.location.origin + '/contact');
    expect(JSON.stringify(events)).not.toContain('private@example.com');
    expect(events).toContainEqual(['consent', 'update', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' }]);
    fireEvent(window, new CustomEvent(CONSENT_EVENT, { detail: false }));
    expect((window as any)['ga-disable-G-TEST123']).toBe(true);
  });
});
