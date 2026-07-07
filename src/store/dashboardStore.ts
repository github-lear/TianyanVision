import { defineStore } from 'pinia';
import { getDashboardOverview } from '@/services/dashboardService';
import type { DashboardOverview } from '@/types/dashboard';

interface DashboardStoreState {
  overview: DashboardOverview | null;
  loading: boolean;
}

interface DashboardStoreGetters {
  [key: string]: any;
}

interface DashboardStoreActions {
  loadOverview(): Promise<void>;
  startRealtime(intervalMs?: number): void;
  stopRealtime(): void;
}

export const useDashboardStore = defineStore<'dashboard', DashboardStoreState, {}, DashboardStoreActions>('dashboard', {
  state: (): DashboardStoreState => ({
    overview: null,
    loading: false
  }),
  // no explicit getters to keep typings simple; components can derive values from state
  actions: {
    async loadOverview() {
      this.loading = true;
      try {
        this.overview = await getDashboardOverview();
      } finally {
        this.loading = false;
      }
    },
    startRealtime(intervalMs = 2000) {
      // ensure only one timer
      if ((this as any)._realtimeTimer) return;
      // initial load
      this.loadOverview();
      const id = window.setInterval(async () => {
        try {
          this.overview = await getDashboardOverview();
        } catch (e) {
          // ignore errors to keep timer alive
          // eslint-disable-next-line no-console
          console.error('realtime update error', e);
        }
      }, intervalMs);
      (this as any)._realtimeTimer = id;
    },
    stopRealtime() {
      const id = (this as any)._realtimeTimer;
      if (id) {
        window.clearInterval(id);
        (this as any)._realtimeTimer = undefined;
      }
    }
  }
});