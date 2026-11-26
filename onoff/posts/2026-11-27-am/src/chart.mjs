import { createRequire } from 'node:module'; const { chromium } = createRequire(import.meta.url)('playwright');
import path from 'node:path';
const css = 'file://' + path.resolve('node_modules/pretendard/dist/web/static/pretendard.css');
const F = "font-family:Pretendard,'Noto Sans CJK KR',sans-serif";
const base = (body, h) => `<html><head><link rel="stylesheet" href="${css}"><style>body{margin:0;width:1080px;height:${h}px;background:#FFF6FA;${F};color:#4A3428;letter-spacing:-0.02em}.w{padding:50px 60px}.h{font-size:36px;font-weight:800}.s{font-size:22px;color:#9b8478;margin-top:6px}.f{position:absolute;bottom:22px;left:60px;font-size:18px;color:#b09a8e}</style></head><body>${body}</body></html>`;
// 1) 기준금리 계단
const steps = [['상반기', 2.50], ['7월', 2.75], ['8월', 3.00], ['10월', 3.00], ['11월', 3.25]];
const W = 150, X0 = 120, base0 = 560, sc = 520; // y = base0 - (v-2.3)*sc
const y = (v) => base0 - (v - 2.3) * sc;
const bars = steps.map(([k, v], i) => { const x = X0 + i * 180; const last = i === steps.length - 1; return `<rect x="${x}" y="${y(v)}" width="${W}" height="${base0 - y(v)}" rx="14" fill="${last ? '#FF7FB0' : v > (steps[i-1]||[0,0])[1] ? '#8FCBF0' : '#D9CFC8'}"/><text x="${x + W/2}" y="${y(v) - 18}" text-anchor="middle" font-size="40" font-weight="800" fill="${last ? '#E2477F' : '#4A3428'}">${v.toFixed(2)}%</text><text x="${x + W/2}" y="${base0 + 44}" text-anchor="middle" font-size="28" fill="#7a6458">${k}</text>`; }).join('');
const svg1 = `<svg width="1080" height="640" viewBox="0 0 1080 640" style="position:absolute;top:120px;left:0">${bars}<line x1="100" x2="1000" y1="${base0}" y2="${base0}" stroke="#cbb8ad" stroke-width="3"/></svg>`;
const html1 = base(`<div class="w"><div class="h">2026 기준금리, 세 번 올랐다</div><div class="s">연 %, 각 회의 결정 기준</div></div>${svg1}<div class="f">자료: 한국은행 금융통화위원회(11/26), 언론 보도 종합</div>`, 800);
// 2) 성장률 전망
const g = [['올해(2026)', 3.3, 3.9], ['내년(2027)', 2.9, 4.1]];
const gx = (v) => v * 170;
const rows = g.map(([k, a, b], i) => `<div style="position:absolute;left:60px;top:${170 + i * 260}px"><div style="font-size:34px;font-weight:800;margin-bottom:14px">${k}</div>
<div style="display:flex;align-items:center;gap:16px;margin-bottom:12px"><span style="width:130px;font-size:24px;color:#7a6458">8월 전망</span><div style="height:56px;width:${gx(a)}px;background:#D9CFC8;border-radius:10px"></div><b style="font-size:34px">${a}%</b></div>
<div style="display:flex;align-items:center;gap:16px"><span style="width:130px;font-size:24px;color:#7a6458">11월 전망</span><div style="height:56px;width:${gx(b)}px;background:#8FCBF0;border-radius:10px"></div><b style="font-size:34px;color:#1E7FC0">${b}%</b></div></div>`).join('');
const html2 = base(`<div class="w"><div class="h">성장률 전망, 크게 올렸다</div><div class="s">실질 GDP 성장률, 한국은행 수정경제전망</div></div>${rows}<div class="f">자료: 한국은행 수정경제전망(11/26)</div>`, 760);
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 800 } });
await p.setContent(html1, { waitUntil: 'networkidle' }); await p.waitForTimeout(300); await p.screenshot({ path: 'posts/2026-11-27-am/images/03-rate.png', clip: { x: 0, y: 0, width: 1080, height: 800 } });
await p.setViewportSize({ width: 1080, height: 760 }); await p.setContent(html2, { waitUntil: 'networkidle' }); await p.waitForTimeout(300); await p.screenshot({ path: 'posts/2026-11-27-am/images/04-growth.png' });
await b.close();
