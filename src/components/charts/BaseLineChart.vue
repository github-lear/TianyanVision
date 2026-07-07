<template><div ref="chartRef" class="chart-box"></div></template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { EChartsOption } from 'echarts';
import { createChart } from './chartBase';

const props = defineProps<{ option: EChartsOption }>();
const chartRef = ref<HTMLDivElement | null>(null);
let chart: ReturnType<typeof createChart> | null = null;

const render = () => {
  if (!chartRef.value) return;
  chart = chart ?? createChart(chartRef.value);
  chart.setOption(props.option, true);
};

onMounted(render);
watch(() => props.option, render, { deep: true });
onBeforeUnmount(() => chart?.dispose());
</script>