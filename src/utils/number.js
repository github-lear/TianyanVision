export function formatNumber(value) {
    return new Intl.NumberFormat('zh-CN').format(value);
}
