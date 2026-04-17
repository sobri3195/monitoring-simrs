import { describe, expect, it } from 'vitest';
import { formatPercent, toTitleCase } from '../formatters';

describe('formatters', () => {
  it('formatPercent should return rounded percentage string', () => {
    expect(formatPercent(12.7)).toBe('13%');
  });

  it('toTitleCase should capitalize each word', () => {
    expect(toTitleCase('MONITORING simrs')).toBe('Monitoring Simrs');
  });
});
