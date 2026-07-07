import * as echarts from 'echarts';
export function createChart(el) {
    return echarts.init(el, 'dark', { renderer: 'canvas' });
}
