import { describe, it, expect } from 'vitest';
import { nextDashboardFrame } from '@/mocks/realtimeDashboardSimulator';
import { getDashboardOverview } from '@/services/dashboardService';

describe('realtime simulator', () => {
  it('service returns dashboard overview in mock mode', async () => {
    const data = await getDashboardOverview();
    expect(data).toBeTruthy();
    expect(data.charts).toBeTruthy();
  });

  it('consecutive frames change trend or timeline and maintain constraints', () => {
    const a = nextDashboardFrame();
    const b = nextDashboardFrame();
    const aSeries = (a.charts.trend.series && a.charts.trend.series[0]) as any;
    const bSeries = (b.charts.trend.series && b.charts.trend.series[0]) as any;
    expect(Array.isArray(aSeries.data)).toBe(true);
    expect(bSeries.data.length).toBeGreaterThanOrEqual(1);

    // timeline bounded
    expect(a.timeline.length).toBeLessThanOrEqual(8);
    expect(b.timeline.length).toBeLessThanOrEqual(8);

    // structure sum to 100
    const struct = (b.charts.structure.series && (b.charts.structure.series[0] as any).data) || [];
    const sum = struct.reduce((s: number, it: any) => s + Number(it.value), 0);
    expect(sum).toBe(100);
  });
});
