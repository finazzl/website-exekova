import { describe, expect, it } from 'vitest';
import { STAGES, FINAL, DEMO_DURATION, next, checkState } from '../data/heroDemoStages';

describe('product demonstration', () => {
  it('shows only the three customer steps and reaches the outcome within ten seconds', () => {
    expect(STAGES.map(stage => stage.label)).toEqual(['Get', 'Set', 'Done']);
    expect(DEMO_DURATION).toBeLessThanOrEqual(10000);
    let stage = 0;
    const seen = [stage];
    while (stage < FINAL) { stage = next(stage); seen.push(stage); }
    expect(seen).toEqual([0, 1, 2]);
    expect(next(FINAL)).toBe(FINAL);
  });
  it('includes passed evidence only in the verified outcome', () => {
    expect(checkState(0)).toBe('pending');
    expect(checkState(1)).toBe('pending');
    expect(checkState(FINAL)).toBe('passed');
  });
});
