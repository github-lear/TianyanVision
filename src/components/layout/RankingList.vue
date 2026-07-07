<template>
  <div class="ranking-list">
    <div v-for="(item, index) in items" :key="item.name" class="ranking-row">
      <span class="ranking-row__index">{{ String(index + 1).padStart(2, '0') }}</span>
      <div class="ranking-row__info">
        <strong>{{ item.name }}</strong>
        <small>{{ item.tag }}</small>
      </div>
      <span class="ranking-row__count">{{ item.count }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RankingItem } from '@/types/dashboard';

defineProps<{ items: RankingItem[] }>();
</script>