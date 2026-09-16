import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import GoogleAnalytics from '../components/GoogleAnalytics';
import { CONSENT_EVENT, COOKIE_PREFERENCES_KEY } from '../data/analytics';

vi.mock('next/navigation', () => ({ usePathname: () => '/contact' }));
vi.mock('../data/analytics', async importOriginal => ({ ...await importOriginal<object>(), GA_MEASUREMENT_ID: 'G-TEST123' }));

beforeEach(() => {
  const values = new Map<string, string>();
  vi.stubGlobal('localStorage', { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => values.set(key, value) });
});
afterEach(() => {
  cleanup();
  document.getElementById('exekova-google-analytics')?.remove();
  delete (window as any).gtag;
  delete (window as any).dataLayer;
  vi.unstubAllGlobals();
});

describe('optional analytics', () => {
  it('makes no Google request before consent or after rejection', () => {
    render(<GoogleAnalytics/>);
    expect(document.getElementById('exekova-google-analytics')).toBeNull();
    fireEvent.click(screen.getByText('No thanks'));
    expect(document.getElementById('exekova-google-analytics')).toBeNull();
    expect(JSON.parse(localStorage.getItem(COOKIE_PREFERENCES_KEY)!).analytics).toBe(false);
  });

  it('loads asynchronously on opt-in, tracks a clean page URL, and honors withdrawal', () => {
    window.history.replaceState({}, '', '/contact?email=private@example.com#message');
    render(<GoogleAnalytics/>);
    fireEvent.click(screen.getByText('Allow analytics'));
    const script = document.getElementById('exekova-google-analytics') as HTMLScriptElement;
    expect(script.async).toBe(true);
    expect(script.src).toContain('id=G-TEST123');
    const events = (window as any).dataLayer.map((args: IArguments) => Array.from(args));
    const page = events.find((entry: unknown[]) => entry[1] === 'page_view');
    expect(page[2].page_location).toBe(window.location.origin + '/contact');
    expect(JSON.stringify(events)).not.toContain('private@example.com');
    fireEvent(window, new CustomEvent(CONSENT_EVENT, { detail: false }));
    expect((window as any)['ga-disable-G-TEST123']).toBe(true);
  });
});
