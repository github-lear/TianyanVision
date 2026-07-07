<template>
  <div class="datahub">
    <!-- 雷达扫描区域 -->
    <div class="datahub__radar">
      <!-- 同心圆环 -->
      <div class="datahub__ring datahub__ring--r1"></div>
      <div class="datahub__ring datahub__ring--r2"></div>
      <div class="datahub__ring datahub__ring--r3"></div>

      <!-- 十字准线 -->
      <div class="datahub__cross datahub__cross--h"></div>
      <div class="datahub__cross datahub__cross--v"></div>

      <!-- 扫描扇形 -->
      <div class="datahub__scan">
        <div class="datahub__scan-blade"></div>
      </div>

      <!-- 中心内核 -->
      <div class="datahub__core">
        <div class="datahub__core-outer"></div>
        <div class="datahub__core-inner"></div>
        <span class="datahub__core-text">天眼态势图</span>
      </div>

      <!-- 外围节点 -->
      <div
        v-for="node in perimeterNodes"
        :key="node.name"
        class="datahub__node"
        :style="{ left: node.x + '%', top: node.y + '%' }"
      >
        <div class="datahub__node-pulse"></div>
        <div class="datahub__node-dot"></div>
        <span class="datahub__node-name">{{ node.name }}</span>
      </div>
    </div>

    <!-- 底部指标条 -->
    <div class="datahub__bar">
      <div class="datahub__bar-item">
        <span class="datahub__bar-label">在线设备</span>
        <span class="datahub__bar-value">{{ stats.devices.toLocaleString() }}</span>
      </div>
      <div class="datahub__bar-divider"></div>
      <div class="datahub__bar-item">
        <span class="datahub__bar-label">巡检任务</span>
        <span class="datahub__bar-value">{{ stats.tasks }}</span>
      </div>
      <div class="datahub__bar-divider"></div>
      <div class="datahub__bar-item">
        <span class="datahub__bar-label">拥堵指数</span>
        <span class="datahub__bar-value">{{ stats.congestion }}<small>%</small></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { DashboardOverview } from '@/types/dashboard';

const props = defineProps<{ overview?: DashboardOverview | null }>();

const stats = computed(() => props.overview?.middleStats ?? { devices: 0, tasks: 0, congestion: 0 });

/**
 * 围绕中心的 5 个外围节点
 * 扇形分布在雷达上方 220°，避免与底部指标条重叠
 */
const perimeterNodes = computed(() => {
  const names = ['滨江新区', '科创园区', '中央商务区', '东部枢纽', '港区联动带'];
  const total = names.length;
  const radiusX = 35; // 水平半径 (%)
  const radiusY = 30; // 垂直半径 (%)
  const centerX = 50;
  const centerY = 48; // 略偏上，给底部指标条留空间
  const startAngle = -110; // 从左侧偏上开始
  const spreadAngle = 220; // 总扇形角度

  return names.map((name, i) => {
    const angle = startAngle + (spreadAngle / (total - 1)) * i;
    const rad = (angle * Math.PI) / 180;
    return {
      name,
      x: centerX + radiusX * Math.cos(rad),
      y: centerY + radiusY * Math.sin(rad),
    };
  });
});
</script>

<style scoped lang="scss">
/* ============================================
   DataHub — 如意数据中枢 · 雷达态势图
   ============================================ */

.datahub {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* ---- 雷达区域 ---- */
.datahub__radar {
  position: relative;
  width: 320px;
  height: 320px;
  flex-shrink: 0;
}

/* ---- 同心圆环 ---- */
.datahub__ring {
  position: absolute;
  inset: 50% auto auto 50%;
  border-radius: 50%;
  border: 1px solid rgba(78, 194, 255, 0.22);
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.datahub__ring--r1 {
  width: 280px;
  height: 280px;
  border-color: rgba(78, 194, 255, 0.14);
}

.datahub__ring--r2 {
  width: 200px;
  height: 200px;
  border-color: rgba(78, 194, 255, 0.28);
  box-shadow: 0 0 32px rgba(78, 194, 255, 0.06), inset 0 0 32px rgba(78, 194, 255, 0.04);
}

.datahub__ring--r3 {
  width: 120px;
  height: 120px;
  border-style: dashed;
  border-color: rgba(78, 194, 255, 0.35);
  animation: hub-ring-pulse 4s ease-in-out infinite;
}

@keyframes hub-ring-pulse {
  0%, 100% { border-color: rgba(78, 194, 255, 0.35); box-shadow: 0 0 16px rgba(78, 194, 255, 0.04); }
  50%      { border-color: rgba(78, 194, 255, 0.65); box-shadow: 0 0 32px rgba(78, 194, 255, 0.12); }
}

/* ---- 十字准线 ---- */
.datahub__cross {
  position: absolute;
  background: rgba(78, 194, 255, 0.08);
  pointer-events: none;
}

.datahub__cross--h {
  inset: 50% 10% auto 10%;
  height: 1px;
  transform: translateY(-50%);
}

.datahub__cross--v {
  inset: 10% 50% 10% auto;
  width: 1px;
  transform: translateX(-50%);
}

/* ---- 扫描扇形 ---- */
.datahub__scan {
  position: absolute;
  inset: 50% auto auto 50%;
  width: 280px;
  height: 280px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  overflow: hidden;
  pointer-events: none;
}

.datahub__scan-blade {
  position: absolute;
  inset: 0 auto auto 50%;
  width: 2px;
  height: 50%;
  background: linear-gradient(180deg, rgba(78, 194, 255, 0.7), rgba(78, 194, 255, 0.02));
  transform-origin: bottom center;
  animation: hub-scan 6s linear infinite;
  border-radius: 2px;
}

@keyframes hub-scan {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* ---- 中心内核 ---- */
.datahub__core {
  position: absolute;
  inset: 50% auto auto 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.datahub__core-outer {
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(78, 194, 255, 0.28) 0%, rgba(78, 194, 255, 0.06) 60%, transparent 100%);
  box-shadow: 0 0 48px rgba(78, 194, 255, 0.2);
  animation: hub-core-glow 3s ease-in-out infinite;
}

@keyframes hub-core-glow {
  0%, 100% { box-shadow: 0 0 36px rgba(78, 194, 255, 0.16); }
  50%      { box-shadow: 0 0 60px rgba(78, 194, 255, 0.32); }
}

.datahub__core-inner {
  position: absolute;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: radial-gradient(circle at 40% 35%, rgba(160, 220, 255, 0.8), rgba(30, 140, 220, 0.6));
  box-shadow: 0 0 24px rgba(78, 194, 255, 0.5), inset 0 0 12px rgba(255, 255, 255, 0.3);
}

.datahub__core-text {
  position: relative;
  z-index: 1;
  margin-top: 90px;
  font-size: 13px;
  letter-spacing: 0.12em;
  color: rgba(200, 225, 255, 0.85);
  white-space: nowrap;
  text-shadow: 0 0 12px rgba(78, 194, 255, 0.4);
}

/* ---- 外围节点 ---- */
.datahub__node {
  position: absolute;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.datahub__node-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #4ec2ff;
  box-shadow: 0 0 12px rgba(78, 194, 255, 0.7), 0 0 24px rgba(78, 194, 255, 0.3);
  animation: hub-node-blink 2.5s ease-in-out infinite;
}

/* 各节点错开闪烁节奏 */
.datahub__node:nth-child(2) .datahub__node-dot { animation-delay: 0s; }
.datahub__node:nth-child(3) .datahub__node-dot { animation-delay: 0.5s; }
.datahub__node:nth-child(4) .datahub__node-dot { animation-delay: 1.0s; }
.datahub__node:nth-child(5) .datahub__node-dot { animation-delay: 1.5s; }
.datahub__node:nth-child(6) .datahub__node-dot { animation-delay: 2.0s; }

@keyframes hub-node-blink {
  0%, 100% { opacity: 0.5; transform: scale(0.8); }
  50%      { opacity: 1;   transform: scale(1.4); }
}

.datahub__node-pulse {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: transparent;
  border: 1px solid rgba(78, 194, 255, 0.5);
  animation: hub-node-ripple 2s ease-out infinite;
}

@keyframes hub-node-ripple {
  0%   { transform: scale(1); opacity: 0.8; }
  100% { transform: scale(4); opacity: 0; }
}

.datahub__node-name {
  font-size: 11px;
  color: rgba(200, 225, 255, 0.72);
  white-space: nowrap;
  letter-spacing: 0.04em;
}

/* ---- 底部指标条 ---- */
.datahub__bar {
  position: absolute;
  bottom: 12px;
  left: 24px;
  right: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  padding: 12px 20px;
  background: rgba(8, 18, 36, 0.55);
  border: 1px solid rgba(78, 194, 255, 0.14);
  border-radius: 14px;
  backdrop-filter: blur(8px);
}

.datahub__bar-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.datahub__bar-label {
  font-size: 11px;
  color: rgba(180, 210, 240, 0.7);
  letter-spacing: 0.04em;
}

.datahub__bar-value {
  font-size: 22px;
  font-weight: 700;
  color: #e8f4ff;
  letter-spacing: 0.03em;

  small {
    font-size: 14px;
    font-weight: 400;
    color: rgba(200, 225, 255, 0.7);
    margin-left: 2px;
  }
}

.datahub__bar-divider {
  width: 1px;
  height: 32px;
  background: linear-gradient(180deg, transparent, rgba(78, 194, 255, 0.25), transparent);
}
</style>
