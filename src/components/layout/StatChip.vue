<template>
  <div class="stat-chip glass-panel">
    <span>{{ label }}</span>
    <strong>{{ value }}{{ suffix }}</strong>
  </div>
</template>

<script setup lang="ts">
defineProps<{ label: string; value: number; suffix?: string }>();
</script>