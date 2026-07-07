<template>
  <div class="datahub">
    <div class="datahub__center">
      <div class="datahub__circle"></div>
      <div class="datahub__title">城市运行总览 · 天眼态势图</div>
    </div>
    <div class="datahub__stats">
      <div class="datahub__stat">
        <small>在线设备</small>
        <strong>{{ stats.devices.toLocaleString() }}</strong>
      </div>
      <div class="datahub__stat">
        <small>巡检任务</small>
        <strong>{{ stats.tasks }}</strong>
      </div>
      <div class="datahub__stat">
        <small>拥堵指数</small>
        <strong>{{ stats.congestion }}%</strong>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { DashboardOverview } from '@/types/dashboard';

const props = defineProps<{ overview?: DashboardOverview | null }>();

const stats = computed(() => props.overview?.middleStats ?? { devices: 0, tasks: 0, congestion: 0 });
</script>

<style scoped lang="scss">
.datahub { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; width: 100%; color: #e8f0ff; }
.datahub__center { position: relative; display:flex; align-items:center; justify-content:center; height: 60%; }
.datahub__circle { width: 220px; height: 220px; border-radius: 50%; border: 2px solid rgba(78,194,255,0.24); box-shadow: 0 0 40px rgba(78,194,255,0.06), inset 0 0 36px rgba(78,194,255,0.04); }
.datahub__title { position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%); background: rgba(6,14,26,0.6); padding: 6px 10px; border-radius: 999px; border:1px solid rgba(255,255,255,0.06); font-size: 13px; }
.datahub__stats { display: flex; gap: 12px; margin-top: 8px; }
.datahub__stat { background: rgba(6,14,26,0.48); padding: 10px 12px; border-radius: 12px; border:1px solid rgba(255,255,255,0.04); text-align:center; min-width: 100px; }
.datahub__stat small { display:block; color: rgba(230,240,255,0.72); }
.datahub__stat strong { display:block; font-size: 20px; margin-top:6px; }
</style>
