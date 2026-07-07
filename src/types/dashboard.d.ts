import type { EChartsOption } from 'echarts';
export interface KpiItem {
    label: string;
    value: number;
    unit?: string;
    trend?: string;
    accent?: string;
}
export interface RankingItem {
    name: string;
    count: number;
    tag: string;
}
export interface TimelineItem {
    time: string;
    title: string;
    desc: string;
}
export interface DashboardOverview {
    title: string;
    kpis: KpiItem[];
    middleStats: {
        devices: number;
        tasks: number;
        congestion: number;
    };
    ranking: RankingItem[];
    timeline: TimelineItem[];
    charts: {
        trend: EChartsOption;
        structure: EChartsOption;
        regionCompare: EChartsOption;
        healthRadar: EChartsOption;
    };
}
