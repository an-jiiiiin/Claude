// 메인 컬러 후보 비교 → brand/palette-variants.png
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
import fs from 'node:fs/promises';
import path from 'node:path';
import { page } from './templates.mjs';

const ink = '#0E0E10';
const P = {
  mc: { name: '① 마젠타 × 시안', main: '#FF1EC8', stk: '#00F0FF', stkTx: ink, on: '#00C8F0', off: '#FF1EC8',
       desc: '메인 마젠타, 스티커 시안. 가장 쨍한 형광 보색 조합' },
  ms: { name: '② 마젠타 × 하늘', main: '#FF1EC8', stk: '#5CD3FF', stkTx: ink, on: '#3CB8FF', off: '#FF1EC8',
       desc: '시안보다 푸른 형광 하늘색. 같은 쨍함에 조금 더 부드럽고 세련됨' },
  sm: { name: '③ 하늘 × 마젠타', main: '#5CD3FF', stk: '#FF1EC8', stkTx: '#fff', on: '#3CB8FF', off: '#FF1EC8',
       desc: '메인 하늘색, 스티커 마젠타. 시원하고 깨끗한 인상, 시사 톤과도 잘 맞음' },
  cm: { name: '④ 시안 × 마젠타', main: '#00F0FF', stk: '#FF1EC8', stkTx: '#fff', on: '#00C8F0', off: '#FF1EC8',
       desc: '메인 시안. 가장 차갑고 강렬하지만 2EZ 메인색과 비슷함' },
};

const css = `
.L{position:relative;display:inline-flex;flex-direction:column;align-items:flex-start;white-space:nowrap;--s:1}
.L .k{display:inline-block;background:var(--m);color:${ink};font-weight:900;letter-spacing:-0.05em;line-height:1;
  font-size:calc(64px*var(--s));padding:calc(10px*var(--s)) calc(18px*var(--s)) calc(6px*var(--s));transform:rotate(-3deg);
  box-shadow:calc(6px*var(--s)) calc(6px*var(--s)) 0 ${ink}, calc(6px*var(--s)) calc(6px*var(--s)) 0 calc(2px*var(--s)) #fff, 0 0 calc(40px*var(--s)) color-mix(in srgb, var(--m) 55%, transparent)}
.L .i{position:relative;align-self:flex-end;margin-top:calc(-6px*var(--s));margin-right:calc(-24px*var(--s));
  background:var(--st);color:var(--stt);transform:rotate(8deg);border:calc(4px*var(--s)) solid #fff;border-radius:calc(10px*var(--s));
  box-shadow:calc(5px*var(--s)) calc(5px*var(--s)) 0 ${ink};font-weight:900;font-style:italic;letter-spacing:-0.03em;line-height:1;
  font-size:calc(58px*var(--s));padding:calc(8px*var(--s)) calc(20px*var(--s)) calc(6px*var(--s))}
.prof{width:1080px;height:1080px;display:flex;align-items:center;justify-content:center;background:${ink};font-family:'Pretendard'}
.cmp{width:2400px;background:#F5F3EE;padding:70px;font-family:'Pretendard';color:${ink};display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:34px}
.col{display:flex;flex-direction:column;gap:24px;background:#fff;border-radius:28px;padding:34px;min-width:0}
.col h2{font-size:38px;font-weight:900;letter-spacing:-0.03em}
.col .d{font-size:21px;line-height:1.5;color:#555;min-height:64px}
.sw{display:flex;gap:10px}
.sw span{flex:1;height:70px;border-radius:12px;font-size:15px;font-weight:700;display:flex;align-items:flex-end;padding:8px;color:#fff}
.circ{width:300px;height:300px;border-radius:50%;overflow:hidden;align-self:center}
.circ img,.feed img{width:100%;height:100%}
.covs{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.cov{position:relative;height:420px;border-radius:14px;overflow:hidden;color:#fff;
  background:radial-gradient(120% 80% at 30% 20%, #5a5f6b 0%, #2a2d33 55%, #15161a 100%)}
.cov::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0) 40%,rgba(0,0,0,.9) 100%)}
.cov .stk{position:absolute;top:100px;right:14px;transform:rotate(4deg);font-family:'Black Han Sans';font-size:26px;padding:10px 14px 6px;
  background:var(--m);color:${ink};box-shadow:5px 5px 0 ${ink},0 0 30px color-mix(in srgb, var(--m) 50%, transparent);z-index:1}
.cov .bd{position:absolute;left:16px;bottom:128px;z-index:1;font-weight:800;font-size:12px;padding:6px 12px;border-radius:99px}
.cov h3{position:absolute;left:16px;right:12px;bottom:20px;z-index:1;font-weight:900;font-size:26px;line-height:1.22;letter-spacing:-0.045em}
.cov h3 em{font-style:normal;color:var(--m);text-shadow:0 0 18px color-mix(in srgb, var(--m) 60%, transparent)}
.cov .lg{position:absolute;top:16px;left:14px;z-index:1}
.feed{display:flex;gap:14px;justify-content:center;align-items:center;background:#fff;border:1px solid #eee;border-radius:20px;padding:20px}
.feed .c{width:90px;height:90px;border-radius:50%;overflow:hidden;flex:none;background:#2a2a2a}
.feed .c.s{width:52px;height:52px}
.feed .c.lime{background:#C8F53C}
`;
const mk = (k, s) => { const v = P[k]; return `<span class="L" style="--s:${s};--m:${v.main};--st:${v.stk};--stt:${v.stkTx}"><span class="k">KNOW</span><span class="i">-ish</span></span>`; };

const out = path.resolve('onoff/brand');
const browser = await chromium.launch();
const p = await browser.newPage({ viewport: { width: 2400, height: 1400 } });
async function shot(name, html, sel) {
  const f = path.join(out, `_${name}.html`);
  await fs.writeFile(f, page(html, css));
  await p.goto('file://' + f);
  await p.evaluate(() => document.fonts.ready);
  await p.locator(sel).screenshot({ path: path.join(out, `${name}.png`) });
  await fs.rm(f);
}
for (const k of Object.keys(P)) await shot(`pal-profile-${k}`, `<div class="prof">${mk(k, 3.3)}</div>`, '.prof');
const cols = Object.entries(P).map(([k, v]) => `<div class="col" style="--m:${v.main}"><h2>${v.name}</h2><div class="d">${v.desc}</div>
  <div class="sw"><span style="background:${v.main};color:${ink}">MAIN ${v.main}</span><span style="background:${v.on}">KNOW ${v.on}</span><span style="background:${v.off}">-ISH ${v.off}</span></div>
  <div class="circ"><img src="pal-profile-${k}.png"></div>
  <div class="covs">
  <div class="cov"><span class="lg">${mk(k, 0.36)}</span><span class="stk">올릴까 말까</span><span class="bd" style="background:${v.on};color:${ink}">● KNOW · 경제</span>
    <h3>물가는 뜨겁고<br>증시는 차갑다<br>한은의 <em>11월 선택</em>은?</h3></div>
  <div class="cov"><span class="lg">${mk(k, 0.36)}</span><span class="stk" style="background:${v.stk};color:${v.stkTx}">들어도 됨</span><span class="bd" style="background:${v.off};color:${v.off === '#FF1EC8' ? '#fff' : ink}">● -ISH · 마케팅</span>
    <h3>수능 금지곡 말고<br>이제는<br><em style="color:${v.stk}">수능 허용곡</em></h3></div>
  </div>
  <div class="feed"><span class="c lime"></span><span class="c"><img src="pal-profile-${k}.png"></span><span class="c s"><img src="pal-profile-${k}.png"></span><span class="c" style="background:#5865f2"></span></div>
</div>`).join('');
await shot('palette-variants', `<div class="cmp">${cols}</div>`, '.cmp');
for (const k of Object.keys(P)) await fs.rm(path.join(out, `pal-profile-${k}.png`)).catch(() => {});
await browser.close();
console.log('ok');
