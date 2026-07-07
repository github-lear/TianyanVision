import { describe, expect, it } from 'vitest';
import { dashboardMock } from '@/mocks/dashboardMock';

describe('dashboard mock', () => {
  it('contains kpis and charts data', () => {
    expect(dashboardMock.kpis.length).toBeGreaterThan(0);
    expect(dashboardMock.charts.trend).toBeTruthy();
  });
});