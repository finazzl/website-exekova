import { act, cleanup, render } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import TaskRibbon from '../components/TaskRibbon';

const preference = vi.hoisted(() => ({ reduced: true }));
vi.mock('../components/useMotionPreference', () => ({ useMotionPreference: () => preference.reduced }));
vi.mock('framer-motion', () => ({ useInView: () => true }));

afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.restoreAllMocks(); preference.reduced = true; });

it('resumes from reduced motion when the queued frame predates the effect', () => {
  let tick: FrameRequestCallback = () => {};
  vi.stubGlobal('ResizeObserver', class { observe() {} disconnect() {} });
  vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => { tick = callback; return 1; });
  vi.stubGlobal('cancelAnimationFrame', vi.fn());
  Object.defineProperty(document, 'fonts', { configurable: true, value: { ready: Promise.resolve() } });
  Object.defineProperty(SVGElement.prototype, 'getNumberOfChars', { configurable: true, value: () => 0 });
  vi.spyOn(performance, 'now').mockReturnValue(100);

  const { container, rerender } = render(<TaskRibbon/>);
  expect(container.querySelector('.task-ribbon')?.getAttribute('data-step')).toBe('2');
  preference.reduced = false;
  rerender(<TaskRibbon/>);
  act(() => tick(99));
  expect(container.querySelector('.task-ribbon')?.getAttribute('data-step')).toBe('0');
  expect(container.querySelector('.task-ribbon')?.getAttribute('data-playing')).toBe('true');
  act(() => tick(115));
  expect(container.querySelector('.ribbon-result')?.textContent).toBe('Get');
});
