import * as echarts from 'echarts';

export function createChart(el: HTMLElement) {
  return echarts.init(el, 'dark', { renderer: 'canvas' });
}