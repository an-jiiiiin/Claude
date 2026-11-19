// 메인 컬러 후보 비교 → brand/palette-variants.png
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
import fs from 'node:fs/promises';
import path from 'node:path';
import { page } from './templates.mjs';

const ink = '#0E0E10';
const P = {
  y: { name: '① Signal Yellow', main: '#FFE500', stk: '#2B4BFF', stkTx: '#fff', on: '#2B4BFF', off: '#FF4D8D',
       desc: '뉴스 속보 자막·경고 표지의 노랑. 시사 톤에 신뢰감, 검정과 대비 최강' },
  p: { name: '② Hot Pink', main: '#FF3D9A', stk: '#FFE500', stkTx: ink, on: '#2B4BFF', off: '#FF3D9A',
       desc: '마케팅·트렌드 계정 중 핑크 메인은 드묾. 가장 MZ스럽고 저장욕구 자극' },
  o: { name: '③ Blaze Orange', main: '#FF5A1F', stk: '#FFFFFF', stkTx: ink, on: '#2B4BFF', off: '#FF5A1F',
       desc: '에너지·속도감. 블루(KNOW)와 보색이라 오전/오후 대비가 가장 선명' },
  v: { name: '④ Electric Violet', main: '#A66BFF', stk: '#FFE500', stkTx: ink, on: '#3B5BFF', off: '#FF5A8A',
       desc: '경제·테크 느낌의 세련된 보라. 형광 감은 덜하지만 겹치는 브랜드가 적음' },
};

const css = `
.L{position:relative;display:inline-flex;flex-direction:column;align-items:flex-start;white-space:nowrap;--s:1}
.L .k{display:inline-block;background:var(--m);color:${ink};font-weight:900;letter-spacing:-0.05em;line-height:1;
  font-size:calc(64px*var(--s));padding:calc(10px*var(--s)) calc(18px*var(--s)) calc(6px*var(--s));transform:rotate(-3deg);
  box-shadow:calc(6px*var(--s)) calc(6px*var(--s)) 0 ${ink}, calc(6px*var(--s)) calc(6px*var(--s)) 0 calc(2px*var(--s)) #fff}
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
.cov{position:relative;height:560px;border-radius:14px;overflow:hidden;color:#fff;
  background:radial-gradient(120% 80% at 30% 20%, #5a5f6b 0%, #2a2d33 55%, #15161a 100%)}
.cov::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0) 40%,rgba(0,0,0,.9) 100%)}
.cov .stk{position:absolute;top:70px;right:24px;transform:rotate(4deg);font-family:'Black Han Sans';font-size:40px;padding:10px 14px 6px;
  background:var(--m);color:${ink};box-shadow:5px 5px 0 ${ink};z-index:1}
.cov .bd{position:absolute;left:24px;bottom:146px;z-index:1;font-weight:800;font-size:16px;padding:6px 12px;border-radius:99px}
.cov h3{position:absolute;left:24px;right:24px;bottom:30px;z-index:1;font-weight:900;font-size:36px;line-height:1.22;letter-spacing:-0.045em}
.cov h3 em{font-style:normal;color:var(--m)}
.cov .lg{position:absolute;top:22px;left:22px;z-index:1}
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
  <div class="cov"><span class="lg">${mk(k, 0.42)}</span><span class="stk">올릴까 말까</span><span class="bd" style="background:${v.on}">● KNOW · 경제</span>
    <h3>물가는 뜨겁고 증시는 차갑다<br>한은의 <em>11월 선택</em>은?</h3></div>
  <div class="feed"><span class="c lime"></span><span class="c"><img src="pal-profile-${k}.png"></span><span class="c s"><img src="pal-profile-${k}.png"></span><span class="c" style="background:#5865f2"></span></div>
</div>`).join('');
await shot('palette-variants', `<div class="cmp">${cols}</div>`, '.cmp');
for (const k of Object.keys(P)) await fs.rm(path.join(out, `pal-profile-${k}.png`)).catch(() => {});
await browser.close();
console.log('ok');
