export const dashboardMock = {
    title: 'TianyanVision · 天眼视觉',
    kpis: [
        { label: '在线设备', value: 12842, unit: '台', trend: '+8.4%' },
        { label: '今日事件', value: 426, unit: '起', trend: '-12.1%' },
        { label: '处置闭环', value: 97.8, unit: '%', trend: '+1.6%' },
        { label: '重点任务', value: 38, unit: '项', trend: '+5.0%' }
    ],
    middleStats: {
        devices: 12842,
        tasks: 38,
        congestion: 18
    },
    ranking: [
        { name: '滨江新区', count: 96, tag: '交通压力' },
        { name: '科创园区', count: 88, tag: '设备巡检' },
        { name: '中央商务区', count: 74, tag: '高峰拥堵' },
        { name: '东部枢纽', count: 66, tag: '能耗波动' },
        { name: '港区联动带', count: 59, tag: '告警处置' }
    ],
    timeline: [
        { time: '08:15', title: '晨高峰预警触发', desc: '系统自动下发 12 条疏导建议' },
        { time: '09:40', title: '园区能耗回落', desc: '联动调节后峰值下降 14%' },
        { time: '11:20', title: '设备巡检闭环', desc: '17 台终端完成健康复核' },
        { time: '14:05', title: '重点路口拥堵缓解', desc: '平均通行时长下降 9%' }
    ],
    charts: {
        trend: {
            grid: { left: 30, right: 20, top: 35, bottom: 25 },
            tooltip: { trigger: 'axis' },
            xAxis: {
                type: 'category',
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                axisLine: { lineStyle: { color: 'rgba(255,255,255,0.18)' } },
                axisLabel: { color: 'rgba(230,240,255,0.72)' }
            },
            yAxis: {
                type: 'value',
                axisLabel: { color: 'rgba(230,240,255,0.72)' },
                splitLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } }
            },
            series: [
                {
                    name: '事件量',
                    type: 'line',
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 10,
                    areaStyle: { color: 'rgba(78, 194, 255, 0.18)' },
                    lineStyle: { width: 3, color: '#4ec2ff' },
                    itemStyle: { color: '#4ec2ff' },
                    data: [112, 128, 118, 160, 142, 131, 97]
                }
            ]
        },
        structure: {
            tooltip: { trigger: 'item' },
            legend: {
                top: 0,
                textStyle: { color: 'rgba(230,240,255,0.75)' }
            },
            series: [
                {
                    type: 'pie',
                    radius: ['48%', '72%'],
                    center: ['50%', '54%'],
                    itemStyle: { borderRadius: 10, borderColor: 'rgba(8,14,26,0.9)', borderWidth: 4 },
                    label: { color: '#e8f0ff' },
                    data: [
                        { name: '人口流动', value: 38, itemStyle: { color: '#65d8ff' } },
                        { name: '企业服务', value: 24, itemStyle: { color: '#7f8cff' } },
                        { name: '园区资产', value: 21, itemStyle: { color: '#57e0b4' } },
                        { name: '道路设施', value: 17, itemStyle: { color: '#ffcc66' } }
                    ]
                }
            ]
        },
        regionCompare: {
            grid: { left: 20, right: 10, top: 30, bottom: 25, containLabel: true },
            tooltip: { trigger: 'axis' },
            xAxis: {
                type: 'category',
                data: ['滨江', '科创', 'CBD', '东枢纽', '港区'],
                axisLabel: { color: 'rgba(230,240,255,0.72)' },
                axisLine: { lineStyle: { color: 'rgba(255,255,255,0.18)' } }
            },
            yAxis: {
                type: 'value',
                axisLabel: { color: 'rgba(230,240,255,0.72)' },
                splitLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } }
            },
            series: [
                {
                    name: '综合评分',
                    type: 'bar',
                    barWidth: 24,
                    itemStyle: {
                        borderRadius: [10, 10, 0, 0],
                        color: 'linear-gradient(180deg, #4ec2ff 0%, #2f79ff 100%)'
                    },
                    data: [86, 79, 92, 71, 68]
                }
            ]
        },
        healthRadar: {
            radar: {
                indicator: [
                    { name: '设施', max: 100 },
                    { name: '响应', max: 100 },
                    { name: '效率', max: 100 },
                    { name: '稳定', max: 100 },
                    { name: '协同', max: 100 }
                ],
                axisName: { color: 'rgba(230,240,255,0.78)' },
                splitLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } },
                splitArea: { areaStyle: { color: ['rgba(255,255,255,0.02)', 'rgba(255,255,255,0.04)'] } }
            },
            series: [
                {
                    type: 'radar',
                    symbolSize: 6,
                    areaStyle: { color: 'rgba(87, 224, 180, 0.18)' },
                    lineStyle: { color: '#57e0b4', width: 3 },
                    itemStyle: { color: '#57e0b4' },
                    data: [{ value: [84, 91, 86, 89, 82], name: '健康指数' }]
                }
            ]
        }
    }
};
