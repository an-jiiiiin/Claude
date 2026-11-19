// A(스티커형) 세부 시안: -ISH 가독성 개선 비교 → brand/logo-a-variants.png
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
import fs from 'node:fs/promises';
import path from 'node:path';
import { page, BRAND } from './templates.mjs';

const { ink, lime, off, paper } = BRAND;

const css = `
.L{position:relative;display:inline-block;white-space:nowrap;--s:1}
.L .k{display:inline-block;background:${lime};color:${ink};font-weight:900;letter-spacing:-0.05em;line-height:1;
  font-size:calc(64px*var(--s));padding:calc(10px*var(--s)) calc(18px*var(--s)) calc(6px*var(--s));transform:rotate(-3deg);
  box-shadow:calc(6px*var(--s)) calc(6px*var(--s)) 0 ${ink}, calc(6px*var(--s)) calc(6px*var(--s)) 0 calc(2px*var(--s)) #fff}
.L .i{position:absolute;display:inline-block;line-height:1;background:${off};color:#fff;transform:rotate(8deg);
  border:calc(4px*var(--s)) solid #fff;border-radius:calc(10px*var(--s));box-shadow:calc(5px*var(--s)) calc(5px*var(--s)) 0 ${ink}}

/* A1: 같은 배치, 스티커 크게 + 마커체 굵게 */
.a1{margin-right:calc(70px*var(--s))}
.a1 .i{right:calc(-78px*var(--s));bottom:calc(-34px*var(--s));font-family:'Permanent Marker';
  font-size:calc(56px*var(--s));padding:calc(10px*var(--s)) calc(16px*var(--s)) calc(4px*var(--s))}

/* A2: 세로 스택 — KNOW 아래에 -ISH 를 같은 무게로 */
.a2{display:inline-flex;flex-direction:column;align-items:flex-start}
.a2 .i{position:relative;align-self:flex-end;margin-top:calc(-6px*var(--s));margin-right:calc(-24px*var(--s));
  font-family:'Pretendard';font-weight:900;font-style:italic;letter-spacing:-0.03em;
  font-size:calc(58px*var(--s));padding:calc(8px*var(--s)) calc(20px*var(--s)) calc(6px*var(--s))}

/* A3: 가로 연결 — -ISH 를 KNOW 와 같은 높이 블록으로 */
.a3{display:inline-flex;align-items:center}
.a3 .i{position:relative;margin-left:calc(-10px*var(--s));font-family:'Pretendard';font-weight:900;font-style:italic;
  letter-spacing:-0.03em;font-size:calc(56px*var(--s));padding:calc(10px*var(--s)) calc(18px*var(--s)) calc(8px*var(--s));transform:rotate(6deg) translateY(calc(8px*var(--s)))}

.prof{width:1080px;height:1080px;display:flex;align-items:center;justify-content:center;background:${ink};font-family:'Pretendard'}
.cmp{width:2100px;background:${paper};padding:80px;font-family:'Pretendard';color:${ink};display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:40px}
.col{display:flex;flex-direction:column;gap:28px;background:#fff;border-radius:28px;padding:40px;min-width:0}
.col h2{font-size:44px;font-weight:900;letter-spacing:-0.03em}
.col .d{font-size:24px;line-height:1.5;color:#555;min-height:72px}
.circ{width:420px;height:420px;border-radius:50%;overflow:hidden;align-self:center;box-shadow:0 0 0 8px #fff,0 0 0 11px #ddd}
.circ img,.feed img{width:100%;height:100%}
.tile{border-radius:20px;padding:60px 40px;display:flex;align-items:center;justify-content:center;min-height:240px;overflow:hidden}
.feed{display:flex;gap:16px;justify-content:center;align-items:center;background:#fff;border-radius:20px;padding:24px}
.feed .c{width:96px;height:96px;border-radius:50%;overflow:hidden;flex:none;background:#2a2a2a}
.feed .c.s{width:56px;height:56px}
.cap{font-size:20px;color:#888;text-align:center;margin-top:-14px}
`;

const mk = (cls, s, style = '') => `<span class="L ${cls}" style="--s:${s};${style}"><span class="k">KNOW</span><span class="i">-ish</span></span>`;
const V = {
  a1: { name: 'A1. 큰 스티커', desc: '지금 배치 그대로, -ISH 스티커를 2배 가까이 키우고 테두리·그림자 추가', prof: mk('a1', 3.0, 'margin:-60px 90px 0 0'), tile: 1.5 },
  a2: { name: 'A2. 세로 스택', desc: 'KNOW 아래 -ish 를 굵은 이탤릭 블록으로. 원형 프로필에 가장 꽉 차고 작은 크기에서도 두 단어가 다 읽힘', prof: mk('a2', 3.3, 'margin-right:40px'), tile: 1.4 },
  a3: { name: 'A3. 가로 연결', desc: 'KNOW 와 -ish 를 같은 크기 블록 두 개로. 가로 로고(카드 상단·하단)에 가장 깔끔', prof: mk('a3', 2.15), tile: 1.35 },
};

const out = path.resolve('brand');
const browser = await chromium.launch();
const p = await browser.newPage({ viewport: { width: 2100, height: 1400 } });
async function shot(name, html, sel) {
  const f = path.join(out, `_${name}.html`);
  await fs.writeFile(f, page(html, css));
  await p.goto('file://' + f);
  await p.evaluate(() => document.fonts.ready);
  await p.locator(sel).screenshot({ path: path.join(out, `${name}.png`) });
  await fs.rm(f);
}
for (const [k, v] of Object.entries(V)) await shot(`profile-${k}`, `<div class="prof">${v.prof}</div>`, '.prof');
const cols = Object.entries(V).map(([k, v]) => `<div class="col"><h2>${v.name}</h2><div class="d">${v.desc}</div>
  <div class="circ"><img src="profile-${k}.png"></div>
  <div class="tile" style="background:${ink}">${mk(k, v.tile)}</div>
  <div class="tile" style="background:#fff">${mk(k, v.tile)}</div>
  <div class="feed"><span class="c"></span><span class="c"><img src="profile-${k}.png"></span><span class="c s"><img src="profile-${k}.png"></span><span class="c" style="background:#5865f2"></span></div>
  <div class="cap">96px · 56px(댓글·알림 크기)</div></div>`).join('');
await shot('logo-a-variants', `<div class="cmp">${cols}</div>`, '.cmp');
await browser.close();
console.log('ok');
