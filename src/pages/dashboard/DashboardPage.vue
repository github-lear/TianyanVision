<template>
  <main class="dashboard">
    <div class="dashboard__bg"></div>
    <header class="dashboard__header glass-panel">
      <div>
        <p class="eyebrow">Urban Operations Command Center</p>
        <h1>{{ title }}</h1>
        <p class="subtitle">{{ subtitle }}</p>
      </div>
      <div class="time-block">
        <span>{{ currentTime }}</span>
        <small>实时态势更新中</small>
      </div>
    </header>

    <section class="kpi-grid">
      <KpiCard v-for="item in kpis" :key="item.label" :item="item" />
    </section>

    <section class="dashboard__grid">
      <div class="col col-left">
        <ChartCard title="全天警情趋势" subtitle="近 7 天事件与处置效率">
          <BaseLineChart :option="trendOption" />
        </ChartCard>
        <ChartCard title="辖区结构占比" subtitle="人口、企业、园区与路网结构">
          <BasePieChart :option="structureOption" />
        </ChartCard>
      </div>

      <div class="col col-center">
        <div class="hero glass-panel">
          <div class="hero__map">
            <DataHub :overview="overview" />
          </div>
        </div>

        <ChartCard title="重点区域对比" subtitle="交通、能耗、安防、服务一体化评分">
          <BaseBarChart :option="regionOption" />
        </ChartCard>
      </div>

      <div class="col col-right">
        <ChartCard title="告警与事件排行" subtitle="高频问题区域 Top 5">
          <RankingList :items="ranking" />
        </ChartCard>
        <ChartCard title="综合健康度" subtitle="设施、响应、效率、稳定性">
          <BaseRadarChart :option="radarOption" />
        </ChartCard>
      </div>
    </section>

    <section class="dashboard__footer">
      <ChartCard title="今日联动处置流" subtitle="告警派发、接单、到场、闭环">
        <FlowTimeline :items="timeline" />
      </ChartCard>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from 'vue';
import dayjs from 'dayjs';
import { storeToRefs } from 'pinia';
import { useDashboardStore } from '@/store/dashboardStore';
import ChartCard from '@/components/layout/ChartCard.vue';
import KpiCard from '@/components/layout/KpiCard.vue';

import FlowTimeline from '@/components/layout/FlowTimeline.vue';
import RankingList from '@/components/layout/RankingList.vue';
import BaseLineChart from '@/components/charts/BaseLineChart.vue';
import BasePieChart from '@/components/charts/BasePieChart.vue';
import BaseBarChart from '@/components/charts/BaseBarChart.vue';
import BaseRadarChart from '@/components/charts/BaseRadarChart.vue';
import DataHub from '@/components/layout/DataHub.vue';

const store = useDashboardStore();
const { overview } = storeToRefs(store);
const title = computed(() => (overview.value as any)?.title ?? 'TianyanVision · 天眼视觉');
const subtitle = '城市运营态势全景看板 / 统一数据驾驶舱';
const currentTime = ref(dayjs().format('YYYY-MM-DD HH:mm:ss'));
let timer: number | undefined;

const kpis = computed(() => (overview.value as any)?.kpis ?? []);
const ranking = computed(() => (overview.value as any)?.ranking ?? []);
const timeline = computed(() => (overview.value as any)?.timeline ?? []);
const trendOption = computed(() => (overview.value as any)?.charts?.trend ?? {});
const structureOption = computed(() => (overview.value as any)?.charts?.structure ?? {});
const regionOption = computed(() => (overview.value as any)?.charts?.regionCompare ?? {});
const radarOption = computed(() => (overview.value as any)?.charts?.healthRadar ?? {});

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
</script>