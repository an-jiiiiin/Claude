import { createRequire } from 'node:module'; const { chromium } = createRequire(import.meta.url)('playwright');
import path from 'node:path';
const css = 'file://' + path.resolve('node_modules/pretendard/dist/web/static/pretendard.css');
const jua = 'file://' + path.resolve('node_modules/@fontsource/jua/index.css');
const head = `<style>@import url("${css}");@import url("${jua}");body{margin:0;background:#FFF6FA;font-family:Pretendard,'Noto Sans CJK KR',sans-serif;color:#4A3428;letter-spacing:-0.02em}.j{font-family:Jua,Pretendard,sans-serif;font-weight:800}</style>`;
// 1) 야간 시간대 바: 18시~08시
const hours = []; for (let h = 18; h <= 32; h++) hours.push(h % 24);
const X = (h) => 60 + (h - 18) * 68; // h in 18..32
const g1 = `<html><head>${head}</head><body style="width:1080px;height:760px">
<div class="j" style="position:absolute;left:60px;top:50px;font-size:52px">밤 근무, 어디부터 ‘초심야’?</div>
<div style="position:absolute;left:60px;top:120px;font-size:26px;color:#9b8478">근로기준법상 야간근로 = 오후 10시 ~ 오전 6시</div>
<svg width="1080" height="560" style="position:absolute;top:200px;left:0">
 <rect x="${X(18)}" y="150" width="${X(32)-X(18)}" height="110" rx="20" fill="#EFE6E0"/>
 <rect x="${X(22)}" y="150" width="${X(30)-X(22)}" height="110" rx="20" fill="#8FCBF0"/>
 <rect x="${X(24)}" y="150" width="${X(28)-X(24)}" height="110" fill="#FF7FB0"/>
 <text x="${(X(24)+X(28))/2}" y="218" text-anchor="middle" font-size="40" fill="#fff" font-family="Jua, sans-serif">초심야 0~4시</text>
 <text x="${(X(22)+X(24))/2}" y="218" text-anchor="middle" font-size="30" fill="#fff" font-family="Jua, sans-serif">야간</text>
 <text x="${(X(28)+X(30))/2}" y="218" text-anchor="middle" font-size="30" fill="#fff" font-family="Jua, sans-serif">야간</text>
 ${hours.map((h,i)=> (i%2===0)?`<text x="${X(18+i)}" y="310" text-anchor="middle" font-size="28" fill="#7a6458">${h}시</text><line x1="${X(18+i)}" x2="${X(18+i)}" y1="265" y2="282" stroke="#cbb8ad" stroke-width="3"/>`:'').join('')}
 <text x="${(X(24)+X(28))/2}" y="110" text-anchor="middle" font-size="34" fill="#E2477F" font-family="Jua, sans-serif">↓ 처음으로 따로 관리</text>
</svg>
<div style="position:absolute;left:60px;bottom:40px;font-size:20px;color:#b09a8e">KNOW-ISH 그래픽 · 자료: 고용노동부 권고안 보도(세계일보·경기일보 11/27)</div></body></html>`;
// 2) 연속 야간 3일
const days = ['월','화','수','목','금','토','일'];
const cell = (d,i) => { const night = i < 3, rest = i === 3; return `<div style="width:128px;height:190px;border-radius:24px;background:${night?'#3E4A7A':rest?'#FFE3A8':'#fff'};border:3px solid #E6D7CF;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px"><div class="j" style="font-size:40px;color:${night?'#fff':'#4A3428'}">${d}</div><div style="font-size:46px">${night?'🌙':rest?'😴':'☀️'}</div><div style="font-size:22px;color:${night?'#cfd6ff':'#7a6458'}">${night?`야간 ${i+1}일`:rest?'회복·휴식':'주간'}</div></div>`; };
const g2 = `<html><head>${head}</head><body style="width:1080px;height:640px">
<div class="j" style="position:absolute;left:60px;top:50px;font-size:52px">연속 야간은 3일까지 (권고)</div>
<div style="position:absolute;left:60px;top:120px;font-size:26px;color:#9b8478">이후엔 충분한 연속 휴식·회복 시간 보장 — 예시 배치</div>
<div style="position:absolute;left:52px;top:220px;display:flex;gap:14px">${days.map(cell).join('')}</div>
<div style="position:absolute;left:60px;bottom:40px;font-size:20px;color:#b09a8e">KNOW-ISH 그래픽(예시) · 자료: 고용노동부 권고안 보도(11/27)</div></body></html>`;
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 760 } });
await p.setContent(g1, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(400); await p.screenshot({ path: 'posts/2026-11-28-am/images/01-night.png' });
await p.setViewportSize({ width: 1080, height: 640 }); await p.setContent(g2, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(400); await p.screenshot({ path: 'posts/2026-11-28-am/images/02-3days.png' });
await b.close();
