import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { createChart } from './chartBase';
const props = defineProps();
const chartRef = ref(null);
let chart = null;
const render = () => {
    if (!chartRef.value)
        return;
    chart = chart ?? createChart(chartRef.value);
    chart.setOption(props.option, true);
};
onMounted(render);
watch(() => props.option, render, { deep: true });
onBeforeUnmount(() => chart?.dispose());
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ref: "chartRef",
    ...{ class: "chart-box" },
});
/** @type {typeof __VLS_ctx.chartRef} */ ;
/** @type {__VLS_StyleScopedClasses['chart-box']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            chartRef: chartRef,
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
