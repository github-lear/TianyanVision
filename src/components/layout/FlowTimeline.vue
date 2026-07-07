<template>
  <div class="timeline">
    <article v-for="item in items" :key="item.time" class="timeline-item">
      <div class="timeline-item__time">{{ item.time }}</div>
      <div class="timeline-item__content">
        <strong>{{ item.title }}</strong>
        <p>{{ item.desc }}</p>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import type { TimelineItem } from '@/types/dashboard';

defineProps<{ items: TimelineItem[] }>();
</script>