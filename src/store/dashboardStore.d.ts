import type { DashboardOverview } from '@/types/dashboard';
interface DashboardStoreState {
    overview: DashboardOverview | null;
    loading: boolean;
}
interface DashboardStoreActions {
    loadOverview(): Promise<void>;
    startRealtime(intervalMs?: number): void;
    stopRealtime(): void;
}
export declare const useDashboardStore: import("pinia").StoreDefinition<"dashboard", DashboardStoreState, {}, DashboardStoreActions>;
export {};
