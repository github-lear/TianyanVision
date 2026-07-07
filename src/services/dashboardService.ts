import { dashboardMock } from '@/mocks/dashboardMock';
import { nextDashboardFrame, getCurrentFrame } from '@/mocks/realtimeDashboardSimulator';
import type { DashboardOverview } from '@/types/dashboard';

const useMock = import.meta.env.VITE_USE_MOCK !== 'false';

export async function getDashboardOverview(): Promise<DashboardOverview> {
  if (useMock) {
    // return a generated next frame to simulate realtime
    return Promise.resolve(nextDashboardFrame());
  }

  return Promise.resolve(dashboardMock);
}

export async function getDashboardCurrent(): Promise<DashboardOverview> {
  if (useMock) return Promise.resolve(getCurrentFrame());
  return Promise.resolve(dashboardMock);
}