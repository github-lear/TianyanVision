import { dashboardMock } from './dashboardMock';
function clamp(v, a, b) {
    return Math.max(a, Math.min(b, v));
}
function randInt(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
}
function randFloat(a, b, d = 1) {
    const p = Math.pow(10, d);
    return Math.round((Math.random() * (b - a) + a) * p) / p;
}
// Internal mutable state copied from dashboardMock
const state = JSON.parse(JSON.stringify(dashboardMock));
let tick = 0;
function updateSummary() {
    // daily visits / 今日事件 - do not decrease
    const visitKpi = state.kpis.find((k) => k.label.includes('今日'));
    if (visitKpi) {
        const inc = randInt(20, 300);
        visitKpi.value = (visitKpi.value ?? 0) + inc;
        visitKpi.trend = `+${randFloat(0.2, 8.0, 1)}%`;
    }
    // realtime orders: use kpi containing '任务' or '订单'
    const orderKpi = state.kpis.find((k) => /任务|订单/.test(k.label));
    if (orderKpi) {
        const inc = randInt(0, 80);
        orderKpi.value = Math.max(0, (orderKpi.value ?? 0) + (Math.random() < 0.8 ? inc : -randInt(0, 5)));
        orderKpi.trend = `${Math.random() < 0.6 ? '+' : '-'}${randFloat(0.1, 3.0, 1)}%`;
    }
    // active users: find '在线' or '活跃'
    const activeKpi = state.kpis.find((k) => /在线|活跃/.test(k.label));
    if (activeKpi) {
        const cur = activeKpi.value ?? 0;
        const pct = randFloat(0.01, 0.03, 3);
        const change = Math.round(cur * pct * (Math.random() < 0.5 ? -1 : 1));
        activeKpi.value = Math.max(0, cur + change);
        activeKpi.trend = `${change >= 0 ? '+' : ''}${(change / Math.max(1, cur) * 100).toFixed(1)}%`;
    }
    // system health: keep between 95 and 99.9
    const healthKpi = state.kpis.find((k) => /健康|健康度|健康指数/.test(k.label));
    if (healthKpi) {
        const cur = typeof healthKpi.value === 'number' ? Number(healthKpi.value) : 98.6;
        const jitter = randFloat(-0.5, 0.5, 1);
        let next = clamp(cur + jitter, 95, 99.9);
        // occasionally dip
        if (Math.random() < 0.05)
            next = clamp(next - randFloat(0.5, 3, 1), 92, 99.9);
        healthKpi.value = Number(next.toFixed(1));
        healthKpi.trend = next >= 97 ? 'good' : next >= 95 ? 'warning' : 'danger';
    }
    // middleStats adjustments
    state.middleStats.devices = clamp(state.middleStats.devices + randInt(-2, 3), 1000, 20000);
    state.middleStats.tasks = Math.max(0, state.middleStats.tasks + randInt(0, 2));
    state.middleStats.congestion = clamp(state.middleStats.congestion + randInt(-1, 2), 0, 100);
}
function updateTrend() {
    // shift sliding window, append new point
    const chart = state.charts.trend;
    const xAxis = chart.xAxis = chart.xAxis || {};
    const series = (chart.series && chart.series[0]);
    const now = new Date();
    const label = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
    const visits = series.data.slice();
    const last = visits[visits.length - 1] ?? 100;
    const visInc = randInt(5, 60);
    const newVisits = Math.max(0, last + Math.round(visInc * (Math.random() < 0.9 ? 1 : -0.2)));
    visits.push(newVisits);
    if (visits.length > 10)
        visits.shift();
    series.data = visits;
    const labels = xAxis.data ?? [];
    labels.push(label);
    if (labels.length > 10)
        labels.shift();
    xAxis.data = labels;
}
function updateTimeline() {
    // every 2-3 ticks (~4-6s) add
    if (tick % randInt(2, 3) !== 0)
        return;
    const messages = [
        '北京学习中心完成新一轮访问数据同步',
        '可视化案例库同步 12 条练习记录',
        '学员端新增一批项目实战提交',
        '教师端发布新的课堂任务',
        '数据质量巡检通过，异常值已自动标记',
        '华东节点接口延迟轻微升高，已切换备用通道',
        '告警中心发现轻微波动，正在持续观察',
        '问答互动区新增高频问题聚类结果'
    ];
    const level = Math.random() < 0.2 ? 'warning' : Math.random() < 0.6 ? 'info' : 'success';
    const msg = messages[randInt(0, messages.length - 1)];
    const item = {
        time: new Date().toTimeString().slice(0, 5),
        title: msg ?? '',
        desc: level === 'warning' ? '已触发告警，请关注' : '同步完成'
    };
    state.timeline.unshift(item);
    if (state.timeline.length > 8)
        state.timeline.pop();
}
function updateRanking() {
    // change every 4-5 ticks (~8-10s)
    if (tick % randInt(4, 5) !== 0)
        return;
    state.ranking.forEach((r) => {
        r.count = Math.max(0, r.count + randInt(0, 5));
    });
    state.ranking.sort((a, b) => b.count - a.count);
}
function updateStructure() {
    // categories change low frequency every 5-8 ticks (~10-16s)
    if (tick % randInt(5, 8) !== 0)
        return;
    const series = (state.charts.structure.series && state.charts.structure.series[0]);
    const data = ((series && series.data) || []).map((d) => Number(d.value));
    const deltas = data.map(() => randInt(-3, 3));
    let next = data.map((v, i) => clamp(v + (deltas[i] ?? 0), 1, 80));
    const sum = next.reduce((s, x) => s + x, 0);
    next = next.map((v) => Math.round((v / Math.max(1, sum)) * 100));
    let fix = 100 - next.reduce((s, x) => s + x, 0);
    next[0] = (next[0] ?? 0) + fix;
    series.data = series.data.map((d, i) => ({ ...d, value: next[i] }));
}
function updateRadar() {
    // low frequency: every ~15 ticks (~30s)
    if (tick % 15 !== 0)
        return;
    const series = (state.charts.healthRadar.series && state.charts.healthRadar.series[0]);
    const vals = ((series && series.data && series.data[0] && series.data[0].value) || []).slice();
    for (let i = 0; i < vals.length; i++) {
        vals[i] = clamp(vals[i] + randInt(-3, 3), 10, 100);
    }
    series.data[0].value = vals;
}
export function nextDashboardFrame() {
    tick++;
    updateSummary();
    updateTrend();
    updateTimeline();
    updateRanking();
    updateStructure();
    updateRadar();
    return JSON.parse(JSON.stringify(state));
}
export function getCurrentFrame() {
    return JSON.parse(JSON.stringify(state));
}
export default { nextDashboardFrame, getCurrentFrame };
