import { createRequire } from 'node:module'; const { chromium } = createRequire(import.meta.url)('playwright');
import path from 'node:path';
const css = 'file://' + path.resolve('node_modules/pretendard/dist/web/static/pretendard.css');
const rows = [
  { k: '전용 43㎡', a: 11.05, b: 23.8, bl: '6월 실거래' },
  { k: '전용 59㎡', a: 15.79, b: 32.7, bl: '4월 실거래' },
];
const max = 34, W = 820;
const bar = (v, c, lab, val) => `<div class="r"><span class="l">${lab}</span><div class="b" style="width:${v / max * W}px;background:${c}"></div><span class="v">${val}</span></div>`;
const html = `<html><head><link rel="stylesheet" href="${css}"><style>
body{margin:0;width:1080px;height:760px;background:#fff;font-family:Pretendard,'Noto Sans CJK KR',sans-serif;color:#111;letter-spacing:-0.02em}
.w{padding:56px 60px}.h{font-size:34px;font-weight:800;margin-bottom:6px}.s{font-size:22px;color:#666;margin-bottom:40px}
.g{margin-bottom:46px}.k{font-size:30px;font-weight:800;margin-bottom:14px}
.r{display:flex;align-items:center;gap:16px;margin-bottom:12px}.l{width:120px;font-size:21px;color:#555;flex:none}
.b{height:58px;border-radius:8px}.v{font-size:28px;font-weight:800;white-space:nowrap}
.d{font-size:24px;font-weight:800;color:#1E8FE0;margin-left:136px}
.f{position:absolute;bottom:26px;left:60px;font-size:18px;color:#999}
</style></head><body><div class="w">
<div class="h">줍줍 분양가 vs 최근 실거래가</div><div class="s">단위: 억 원 · 잠실 래미안아이파크</div>
${rows.map(r => `<div class="g"><div class="k">${r.k}</div>
${bar(r.a, '#3CB8FF', '줍줍 분양가', r.a.toFixed(2).replace(/0$/, '') + '억')}
${bar(r.b, '#222', r.bl, r.b + '억')}
<div class="d">차이 약 ${(r.b - r.a).toFixed(1)}억</div></div>`).join('')}
</div><div class="f">자료: 한국부동산원 청약홈·국토교통부 실거래가 공개시스템(뉴시스 11/24 보도 인용)</div></body></html>`;
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 760 } });
await p.setContent(html, { waitUntil: 'networkidle' }); await p.waitForTimeout(300);
await p.screenshot({ path: 'posts/2026-11-25-am/images/02-price-gap.png' }); await b.close();
