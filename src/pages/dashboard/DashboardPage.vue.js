import { computed, onMounted, onBeforeUnmount, ref } from 'vue';
import dayjs from 'dayjs';
import { storeToRefs } from 'pinia';
import { useDashboardStore } from '@/store/dashboardStore';
import ChartCard from '@/components/layout/ChartCard.vue';
import KpiCard from '@/components/layout/KpiCard.vue';
import StatChip from '@/components/layout/StatChip.vue';
import FlowTimeline from '@/components/layout/FlowTimeline.vue';
import RankingList from '@/components/layout/RankingList.vue';
import BaseLineChart from '@/components/charts/BaseLineChart.vue';
import BasePieChart from '@/components/charts/BasePieChart.vue';
import BaseBarChart from '@/components/charts/BaseBarChart.vue';
import BaseRadarChart from '@/components/charts/BaseRadarChart.vue';
import DataHub from '@/components/layout/DataHub.vue';
const store = useDashboardStore();
const { overview } = storeToRefs(store);
const title = computed(() => overview.value?.title ?? 'TianyanVision · 天眼视觉');
const subtitle = '城市运营态势全景看板 / 统一数据驾驶舱';
const currentTime = ref(dayjs().format('YYYY-MM-DD HH:mm:ss'));
let timer;
const middleStats = computed(() => overview.value?.middleStats ?? { devices: 0, tasks: 0, congestion: 0 });
const kpis = computed(() => overview.value?.kpis ?? []);
const ranking = computed(() => overview.value?.ranking ?? []);
const timeline = computed(() => overview.value?.timeline ?? []);
const trendOption = computed(() => overview.value?.charts?.trend ?? {});
const structureOption = computed(() => overview.value?.charts?.structure ?? {});
const regionOption = computed(() => overview.value?.charts?.regionCompare ?? {});
const radarOption = computed(() => overview.value?.charts?.healthRadar ?? {});
onMounted(async () => {
    // start realtime updates (store manages polling and cleanup)
    store.startRealtime(2000);
    timer = window.setInterval(() => {
        currentTime.value = dayjs().format('YYYY-MM-DD HH:mm:ss');
    }, 1000);
});
onBeforeUnmount(() => {
    if (timer) {
        window.clearInterval(timer);
    }
    store.stopRealtime();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({
    ...{ class: "dashboard" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "dashboard__bg" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({
    ...{ class: "dashboard__header glass-panel" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "eyebrow" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
(__VLS_ctx.title);
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "subtitle" },
});
(__VLS_ctx.subtitle);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "time-block" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
(__VLS_ctx.currentTime);
__VLS_asFunctionalElement(__VLS_intrinsicElements.small, __VLS_intrinsicElements.small)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "kpi-grid" },
});
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.kpis))) {
    /** @type {[typeof KpiCard, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(KpiCard, new KpiCard({
        key: (item.label),
        item: (item),
    }));
    const __VLS_1 = __VLS_0({
        key: (item.label),
        item: (item),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "dashboard__grid" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "col col-left" },
});
/** @type {[typeof ChartCard, typeof ChartCard, ]} */ ;
// @ts-ignore
const __VLS_3 = __VLS_asFunctionalComponent(ChartCard, new ChartCard({
    title: "全天警情趋势",
    subtitle: "近 7 天事件与处置效率",
}));
const __VLS_4 = __VLS_3({
    title: "全天警情趋势",
    subtitle: "近 7 天事件与处置效率",
}, ...__VLS_functionalComponentArgsRest(__VLS_3));
__VLS_5.slots.default;
/** @type {[typeof BaseLineChart, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(BaseLineChart, new BaseLineChart({
    option: (__VLS_ctx.trendOption),
}));
const __VLS_7 = __VLS_6({
    option: (__VLS_ctx.trendOption),
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
var __VLS_5;
/** @type {[typeof ChartCard, typeof ChartCard, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(ChartCard, new ChartCard({
    title: "辖区结构占比",
    subtitle: "人口、企业、园区与路网结构",
}));
const __VLS_10 = __VLS_9({
    title: "辖区结构占比",
    subtitle: "人口、企业、园区与路网结构",
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
__VLS_11.slots.default;
/** @type {[typeof BasePieChart, ]} */ ;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent(BasePieChart, new BasePieChart({
    option: (__VLS_ctx.structureOption),
}));
const __VLS_13 = __VLS_12({
    option: (__VLS_ctx.structureOption),
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
var __VLS_11;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "col col-center" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "hero glass-panel" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "hero__map" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "radar-ring" },
});
/** @type {[typeof DataHub, ]} */ ;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent(DataHub, new DataHub({
    overview: (__VLS_ctx.overview),
}));
const __VLS_16 = __VLS_15({
    overview: (__VLS_ctx.overview),
}, ...__VLS_functionalComponentArgsRest(__VLS_15));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "hero__stats" },
});
/** @type {[typeof StatChip, ]} */ ;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent(StatChip, new StatChip({
    label: "在线设备",
    value: (__VLS_ctx.middleStats.devices),
}));
const __VLS_19 = __VLS_18({
    label: "在线设备",
    value: (__VLS_ctx.middleStats.devices),
}, ...__VLS_functionalComponentArgsRest(__VLS_18));
/** @type {[typeof StatChip, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(StatChip, new StatChip({
    label: "巡检任务",
    value: (__VLS_ctx.middleStats.tasks),
}));
const __VLS_22 = __VLS_21({
    label: "巡检任务",
    value: (__VLS_ctx.middleStats.tasks),
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
/** @type {[typeof StatChip, ]} */ ;
// @ts-ignore
const __VLS_24 = __VLS_asFunctionalComponent(StatChip, new StatChip({
    label: "拥堵指数",
    value: (__VLS_ctx.middleStats.congestion),
    suffix: "%",
}));
const __VLS_25 = __VLS_24({
    label: "拥堵指数",
    value: (__VLS_ctx.middleStats.congestion),
    suffix: "%",
}, ...__VLS_functionalComponentArgsRest(__VLS_24));
/** @type {[typeof ChartCard, typeof ChartCard, ]} */ ;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent(ChartCard, new ChartCard({
    title: "重点区域对比",
    subtitle: "交通、能耗、安防、服务一体化评分",
}));
const __VLS_28 = __VLS_27({
    title: "重点区域对比",
    subtitle: "交通、能耗、安防、服务一体化评分",
}, ...__VLS_functionalComponentArgsRest(__VLS_27));
__VLS_29.slots.default;
/** @type {[typeof BaseBarChart, ]} */ ;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent(BaseBarChart, new BaseBarChart({
    option: (__VLS_ctx.regionOption),
}));
const __VLS_31 = __VLS_30({
    option: (__VLS_ctx.regionOption),
}, ...__VLS_functionalComponentArgsRest(__VLS_30));
var __VLS_29;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "col col-right" },
});
/** @type {[typeof ChartCard, typeof ChartCard, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(ChartCard, new ChartCard({
    title: "告警与事件排行",
    subtitle: "高频问题区域 Top 5",
}));
const __VLS_34 = __VLS_33({
    title: "告警与事件排行",
    subtitle: "高频问题区域 Top 5",
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
__VLS_35.slots.default;
/** @type {[typeof RankingList, ]} */ ;
// @ts-ignore
const __VLS_36 = __VLS_asFunctionalComponent(RankingList, new RankingList({
    items: (__VLS_ctx.ranking),
}));
const __VLS_37 = __VLS_36({
    items: (__VLS_ctx.ranking),
}, ...__VLS_functionalComponentArgsRest(__VLS_36));
var __VLS_35;
/** @type {[typeof ChartCard, typeof ChartCard, ]} */ ;
// @ts-ignore
const __VLS_39 = __VLS_asFunctionalComponent(ChartCard, new ChartCard({
    title: "综合健康度",
    subtitle: "设施、响应、效率、稳定性",
}));
const __VLS_40 = __VLS_39({
    title: "综合健康度",
    subtitle: "设施、响应、效率、稳定性",
}, ...__VLS_functionalComponentArgsRest(__VLS_39));
__VLS_41.slots.default;
/** @type {[typeof BaseRadarChart, ]} */ ;
// @ts-ignore
const __VLS_42 = __VLS_asFunctionalComponent(BaseRadarChart, new BaseRadarChart({
    option: (__VLS_ctx.radarOption),
}));
const __VLS_43 = __VLS_42({
    option: (__VLS_ctx.radarOption),
}, ...__VLS_functionalComponentArgsRest(__VLS_42));
var __VLS_41;
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "dashboard__footer" },
});
/** @type {[typeof ChartCard, typeof ChartCard, ]} */ ;
// @ts-ignore
const __VLS_45 = __VLS_asFunctionalComponent(ChartCard, new ChartCard({
    title: "今日联动处置流",
    subtitle: "告警派发、接单、到场、闭环",
}));
const __VLS_46 = __VLS_45({
    title: "今日联动处置流",
    subtitle: "告警派发、接单、到场、闭环",
}, ...__VLS_functionalComponentArgsRest(__VLS_45));
__VLS_47.slots.default;
/** @type {[typeof FlowTimeline, ]} */ ;
// @ts-ignore
const __VLS_48 = __VLS_asFunctionalComponent(FlowTimeline, new FlowTimeline({
    items: (__VLS_ctx.timeline),
}));
const __VLS_49 = __VLS_48({
    items: (__VLS_ctx.timeline),
}, ...__VLS_functionalComponentArgsRest(__VLS_48));
var __VLS_47;
/** @type {__VLS_StyleScopedClasses['dashboard']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard__bg']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard__header']} */ ;
/** @type {__VLS_StyleScopedClasses['glass-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['eyebrow']} */ ;
/** @type {__VLS_StyleScopedClasses['subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['time-block']} */ ;
/** @type {__VLS_StyleScopedClasses['kpi-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard__grid']} */ ;
/** @type {__VLS_StyleScopedClasses['col']} */ ;
/** @type {__VLS_StyleScopedClasses['col-left']} */ ;
/** @type {__VLS_StyleScopedClasses['col']} */ ;
/** @type {__VLS_StyleScopedClasses['col-center']} */ ;
/** @type {__VLS_StyleScopedClasses['hero']} */ ;
/** @type {__VLS_StyleScopedClasses['glass-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['hero__map']} */ ;
/** @type {__VLS_StyleScopedClasses['radar-ring']} */ ;
/** @type {__VLS_StyleScopedClasses['hero__stats']} */ ;
/** @type {__VLS_StyleScopedClasses['col']} */ ;
/** @type {__VLS_StyleScopedClasses['col-right']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard__footer']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ChartCard: ChartCard,
            KpiCard: KpiCard,
            StatChip: StatChip,
            FlowTimeline: FlowTimeline,
            RankingList: RankingList,
            BaseLineChart: BaseLineChart,
            BasePieChart: BasePieChart,
            BaseBarChart: BaseBarChart,
            BaseRadarChart: BaseRadarChart,
            DataHub: DataHub,
            overview: overview,
            title: title,
            subtitle: subtitle,
            currentTime: currentTime,
            middleStats: middleStats,
            kpis: kpis,
            ranking: ranking,
            timeline: timeline,
            trendOption: trendOption,
            structureOption: structureOption,
            regionOption: regionOption,
            radarOption: radarOption,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
