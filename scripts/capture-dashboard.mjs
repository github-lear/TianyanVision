/**
 * capture-dashboard.mjs
 *
 * 数据大屏自动化截图脚本
 * 使用 Playwright 打开大屏页面，等待渲染完成后截图保存。
 *
 * 用法：
 *   npm run screenshot
 *   npm run screenshot:dashboard
 *
 * 前置条件：
 *   开发服务必须已在 10001 端口启动：
 *     npm run dev -- --host 127.0.0.1 --port 10001
 */

import { chromium } from 'playwright';
import { existsSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// ---- 路径配置 ----
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SCREENSHOT_DIR = resolve(ROOT, 'docs', 'screenshots');
const SCREENSHOT_PATH = resolve(SCREENSHOT_DIR, 'dashboard-1920x1080.png');

// ---- 截图参数 ----
const TARGET_URL = process.env.SCREENSHOT_URL || 'http://127.0.0.1:10001/';
const VIEWPORT = { width: 1920, height: 1080 };

/**
 * 收集浏览器 console error 与未捕获异常
 */
function collectErrors(page) {
  const errors = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(`[console] ${msg.text()}`);
    }
  });

  page.on('pageerror', (err) => {
    errors.push(`[page] ${err.message}`);
  });

  return errors;
}

/**
 * 等待页面关键元素渲染
 */
async function waitForDashboard(page) {
  // 1. 页面标题（<title> 包含 "天眼视觉"）
  await page.waitForFunction(
    () => document.title.includes('天眼视觉'),
    { timeout: 10000 },
  );
  console.log('  ✓ 页面标题已加载');

  // 2. 大屏头部（h1 标题）
  await page.waitForSelector('.dashboard__header h1', { timeout: 10000 });
  console.log('  ✓ 仪表板头部已渲染');

  // 3. KPI 指标卡片
  await page.waitForSelector('.kpi-grid', { timeout: 10000 });
  console.log('  ✓ KPI 指标卡片已渲染');

  // 4. 中心数据中枢
  await page.waitForSelector('.datahub', { timeout: 10000 });
  console.log('  ✓ 数据中枢已渲染');

  // 5. 图表网格区域
  await page.waitForSelector('.dashboard__grid', { timeout: 10000 });
  console.log('  ✓ 图表网格区域已渲染');

  // 6. ECharts 图表容器（至少有一个 .chart-box 可见）
  await page.waitForSelector('.chart-box', { timeout: 10000 });
  console.log('  ✓ 图表容器已渲染');

  // 7. 等待 ECharts 实例化并绘制 canvas
  await page.waitForFunction(
    () => document.querySelectorAll('.chart-box canvas').length >= 4,
    { timeout: 15000 },
  );
  console.log('  ✓ ECharts 图表已初始化并绘制');
}

async function capture() {
  // ---- 确保截图目录存在 ----
  if (!existsSync(SCREENSHOT_DIR)) {
    mkdirSync(SCREENSHOT_DIR, { recursive: true });
    console.log(`📁 已创建目录：${SCREENSHOT_DIR}`);
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: VIEWPORT });
  const page = await context.newPage();

  // 收集 console error
  const errors = collectErrors(page);

  try {
    // ---- 导航到目标页面 ----
    console.log(`🌐 正在访问：${TARGET_URL}`);
    await page.goto(TARGET_URL, {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    });

    // ---- 等待页面核心内容渲染 ----
    console.log('⏳ 等待页面核心内容渲染…');
    await waitForDashboard(page);

    // ---- 等待实时数据刷新至少一轮（store 每 2 秒轮询一次） ----
    console.log('⏳ 等待实时数据刷新一轮（5 秒）…');
    await page.waitForTimeout(5000);

    // ---- 检查页面是否有明显加载失败状态 ----
    const canvasCount = await page.evaluate(
      () => document.querySelectorAll('canvas').length,
    );
    console.log(`📊 检测到 ${canvasCount} 个 canvas 元素（ECharts 图表）`);

    if (canvasCount === 0) {
      console.warn('⚠️  警告：未检测到 canvas 元素，图表可能未渲染');
    }

    // ---- 截图 ----
    await page.screenshot({
      path: SCREENSHOT_PATH,
      fullPage: false,
    });
    console.log(`\n✅ 截图已保存：${SCREENSHOT_PATH}`);

    // ---- 报告 console error ----
    if (errors.length > 0) {
      console.error('\n❌ 检测到浏览器控制台错误：');
      errors.forEach((err, i) => console.error(`  [${i + 1}] ${err}`));
      console.error(`\n共 ${errors.length} 条错误。截图已保留，但命令以失败退出。`);
      console.error(`截图文件：${SCREENSHOT_PATH}`);
      process.exitCode = 1;
    } else {
      console.log('✅ 未检测到浏览器控制台错误');
    }
  } catch (err) {
    console.error(`\n❌ 截图失败：${err.message}`);

    // 连接失败 → 友好提示
    if (
      err.message.includes('ERR_CONNECTION_REFUSED') ||
      err.message.includes('net::ERR_')
    ) {
      console.error('\n无法连接到开发服务器。');
      console.error('请先启动开发服务：');
      console.error('  npm run dev -- --host 127.0.0.1 --port 10001\n');
    }

    process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

capture();
