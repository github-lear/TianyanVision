import { computed } from 'vue';
const props = defineProps();
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
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['datahub__node']} */ ;
/** @type {__VLS_StyleScopedClasses['datahub__node-dot']} */ ;
/** @type {__VLS_StyleScopedClasses['datahub__node']} */ ;
/** @type {__VLS_StyleScopedClasses['datahub__node-dot']} */ ;
/** @type {__VLS_StyleScopedClasses['datahub__node']} */ ;
/** @type {__VLS_StyleScopedClasses['datahub__node-dot']} */ ;
/** @type {__VLS_StyleScopedClasses['datahub__node']} */ ;
/** @type {__VLS_StyleScopedClasses['datahub__node-dot']} */ ;
/** @type {__VLS_StyleScopedClasses['datahub__node']} */ ;
/** @type {__VLS_StyleScopedClasses['datahub__node-dot']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "datahub" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "datahub__radar" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "datahub__ring datahub__ring--r1" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "datahub__ring datahub__ring--r2" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "datahub__ring datahub__ring--r3" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "datahub__cross datahub__cross--h" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "datahub__cross datahub__cross--v" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "datahub__scan" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "datahub__scan-blade" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "datahub__core" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "datahub__core-outer" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "datahub__core-inner" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "datahub__core-text" },
});
for (const [node] of __VLS_getVForSourceType((__VLS_ctx.perimeterNodes))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (node.name),
        ...{ class: "datahub__node" },
        ...{ style: ({ left: node.x + '%', top: node.y + '%' }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "datahub__node-pulse" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "datahub__node-dot" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "datahub__node-name" },
    });
    (node.name);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "datahub__bar" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "datahub__bar-item" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "datahub__bar-label" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "datahub__bar-value" },
});
(__VLS_ctx.stats.devices.toLocaleString());
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "datahub__bar-divider" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "datahub__bar-item" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "datahub__bar-label" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "datahub__bar-value" },
});
(__VLS_ctx.stats.tasks);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "datahub__bar-divider" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "datahub__bar-item" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "datahub__bar-label" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "datahub__bar-value" },
});
(__VLS_ctx.stats.congestion);
__VLS_asFunctionalElement(__VLS_intrinsicElements.small, __VLS_intrinsicElements.small)({});
/** @type {__VLS_StyleScopedClasses['datahub']} */ ;
/** @type {__VLS_StyleScopedClasses['datahub__radar']} */ ;
/** @type {__VLS_StyleScopedClasses['datahub__ring']} */ ;
/** @type {__VLS_StyleScopedClasses['datahub__ring--r1']} */ ;
/** @type {__VLS_StyleScopedClasses['datahub__ring']} */ ;
/** @type {__VLS_StyleScopedClasses['datahub__ring--r2']} */ ;
/** @type {__VLS_StyleScopedClasses['datahub__ring']} */ ;
/** @type {__VLS_StyleScopedClasses['datahub__ring--r3']} */ ;
/** @type {__VLS_StyleScopedClasses['datahub__cross']} */ ;
/** @type {__VLS_StyleScopedClasses['datahub__cross--h']} */ ;
/** @type {__VLS_StyleScopedClasses['datahub__cross']} */ ;
/** @type {__VLS_StyleScopedClasses['datahub__cross--v']} */ ;
/** @type {__VLS_StyleScopedClasses['datahub__scan']} */ ;
/** @type {__VLS_StyleScopedClasses['datahub__scan-blade']} */ ;
/** @type {__VLS_StyleScopedClasses['datahub__core']} */ ;
/** @type {__VLS_StyleScopedClasses['datahub__core-outer']} */ ;
/** @type {__VLS_StyleScopedClasses['datahub__core-inner']} */ ;
/** @type {__VLS_StyleScopedClasses['datahub__core-text']} */ ;
/** @type {__VLS_StyleScopedClasses['datahub__node']} */ ;
/** @type {__VLS_StyleScopedClasses['datahub__node-pulse']} */ ;
/** @type {__VLS_StyleScopedClasses['datahub__node-dot']} */ ;
/** @type {__VLS_StyleScopedClasses['datahub__node-name']} */ ;
/** @type {__VLS_StyleScopedClasses['datahub__bar']} */ ;
/** @type {__VLS_StyleScopedClasses['datahub__bar-item']} */ ;
/** @type {__VLS_StyleScopedClasses['datahub__bar-label']} */ ;
/** @type {__VLS_StyleScopedClasses['datahub__bar-value']} */ ;
/** @type {__VLS_StyleScopedClasses['datahub__bar-divider']} */ ;
/** @type {__VLS_StyleScopedClasses['datahub__bar-item']} */ ;
/** @type {__VLS_StyleScopedClasses['datahub__bar-label']} */ ;
/** @type {__VLS_StyleScopedClasses['datahub__bar-value']} */ ;
/** @type {__VLS_StyleScopedClasses['datahub__bar-divider']} */ ;
/** @type {__VLS_StyleScopedClasses['datahub__bar-item']} */ ;
/** @type {__VLS_StyleScopedClasses['datahub__bar-label']} */ ;
/** @type {__VLS_StyleScopedClasses['datahub__bar-value']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            stats: stats,
            perimeterNodes: perimeterNodes,
        };
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
