<template>
  <section class="kpi-card glass-panel">
    <div class="kpi-card__label">{{ item.label }}</div>
    <div class="kpi-card__value">
      <strong>{{ formattedValue }}</strong>
      <span>{{ item.unit }}</span>
    </div>
    <div class="kpi-card__trend">{{ item.trend }}</div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { KpiItem } from '@/types/dashboard';

const props = defineProps<{ item: KpiItem }>();

const formattedValue = computed(() => {
  if (props.item.value >= 1000) return props.item.value.toLocaleString();
  return Number.isInteger(props.item.value) ? String(props.item.value) : props.item.value.toFixed(1);
});
</script>