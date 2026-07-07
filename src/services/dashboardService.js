import { dashboardMock } from '@/mocks/dashboardMock';
import { nextDashboardFrame, getCurrentFrame } from '@/mocks/realtimeDashboardSimulator';
const useMock = import.meta.env.VITE_USE_MOCK !== 'false';
export async function getDashboardOverview() {
    if (useMock) {
        // return a generated next frame to simulate realtime
        return Promise.resolve(nextDashboardFrame());
    }
    return Promise.resolve(dashboardMock);
}
export async function getDashboardCurrent() {
    if (useMock)
        return Promise.resolve(getCurrentFrame());
    return Promise.resolve(dashboardMock);
}
