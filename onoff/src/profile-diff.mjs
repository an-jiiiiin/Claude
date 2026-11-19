// 경쟁 계정(검정+라임 / 검정+시안 프로필)과의 차별화 비교 → brand/profile-diff.png
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
import fs from 'node:fs/promises';
import path from 'node:path';
import { page } from './templates.mjs';

const ink = '#0E0E10', sky = '#5CD3FF', mag = '#FF1EC8';
const css = `
.L{position:relative;display:inline-flex;flex-direction:column;align-items:flex-start;white-space:nowrap;--s:1}
.L .k{display:inline-block;background:var(--kb);color:var(--kt);font-weight:900;letter-spacing:-0.05em;line-height:1;
  font-size:calc(64px*var(--s));padding:calc(10px*var(--s)) calc(18px*var(--s)) calc(6px*var(--s));transform:rotate(-3deg);
  box-shadow:calc(6px*var(--s)) calc(6px*var(--s)) 0 var(--sh), calc(6px*var(--s)) calc(6px*var(--s)) 0 calc(2px*var(--s)) #fff}
.L .i{position:relative;align-self:flex-end;margin-top:calc(-6px*var(--s));margin-right:calc(-24px*var(--s));
  background:var(--ib);color:var(--it);transform:rotate(8deg);border:calc(4px*var(--s)) solid #fff;border-radius:calc(10px*var(--s));
  box-shadow:calc(5px*var(--s)) calc(5px*var(--s)) 0 ${ink};font-weight:900;font-style:italic;letter-spacing:-0.03em;line-height:1;
  font-size:calc(58px*var(--s));padding:calc(8px*var(--s)) calc(20px*var(--s)) calc(6px*var(--s))}
.prof{width:1080px;height:1080px;display:flex;align-items:center;justify-content:center;font-family:'Pretendard'}
.wrap{width:1900px;background:#F5F3EE;padding:70px;font-family:'Pretendard';color:${ink};display:flex;flex-direction:column;gap:30px}
.row{display:flex;align-items:center;gap:40px;background:#fff;border-radius:24px;padding:30px 40px}
.row .t{width:520px;flex:none}
.row h2{font-size:34px;font-weight:900;letter-spacing:-0.03em;margin-bottom:8px}
.row p{font-size:21px;color:#555;line-height:1.5}
.feed{display:flex;gap:22px;align-items:center}
.c{width:120px;height:120px;border-radius:50%;overflow:hidden;flex:none;display:flex;align-items:center;justify-content:center;font-weight:900}
.c.s{width:64px;height:64px}
.c img{width:100%;height:100%}
.me{box-shadow:0 0 0 4px #fff,0 0 0 7px ${mag}}
.lbl{font-size:16px;color:#888;text-align:center;margin-top:8px}
.it{display:flex;flex-direction:column;align-items:center}
`;
const mk = (s, o) => `<span class="L" style="--s:${s};--kb:${o.kb};--kt:${o.kt};--sh:${o.sh};--ib:${o.ib};--it:${o.it}"><span class="k">KNOW</span><span class="i">-ish</span></span>`;
const V = {
  p1: { name: '① 검정 배경 + 하늘 로고', desc: '검정 원 + 형광 로고라는 구조가 BARK·2EZ와 같음. 작은 크기에서 셋이 비슷해 보임',
        bg: ink, o: { kb: sky, kt: ink, sh: ink, ib: mag, it: '#fff' } },
  p2: { name: '② 하늘 배경 + 검정 로고', desc: '원 자체를 하늘색으로 채움. 검정 원들 사이에서 바로 구분되고, 로고 글씨 대비도 최고',
        bg: sky, o: { kb: ink, kt: '#fff', sh: '#fff', ib: mag, it: '#fff' } },
  p3: { name: '③ 마젠타 배경 + 하늘 로고', desc: '배경만 마젠타(글씨 없음)라 가독성 문제 없음. 피드에서 가장 튀는 원',
        bg: mag, o: { kb: sky, kt: ink, sh: ink, ib: ink, it: '#fff' } },
};

const out = path.resolve('onoff/brand');
const browser = await chromium.launch();
const p = await browser.newPage({ viewport: { width: 1900, height: 1200 } });
async function shot(name, html, sel) {
  const f = path.join(out, `_${name}.html`);
  await fs.writeFile(f, page(html, css));
  await p.goto('file://' + f);
  await p.evaluate(() => document.fonts.ready);
  await p.locator(sel).screenshot({ path: path.join(out, `${name}.png`) });
  await fs.rm(f);
}
for (const [k, v] of Object.entries(V)) await shot(`diff-${k}`, `<div class="prof" style="background:${v.bg}">${mk(3.3, v.o)}</div>`, '.prof');
// 경쟁 계정은 로고를 그대로 쓰지 않고 '검정 원 + 형광 글자' 구조만 흉내낸 목업
const rival = (txt, col) => `<div class="it"><span class="c" style="background:${ink};color:${col};font-size:30px;letter-spacing:-0.03em">${txt}</span><span class="lbl">${txt === 'BARK' ? 'BARK 구조' : '2EZ 구조'}</span></div>`;
const rows = Object.entries(V).map(([k, v]) => `<div class="row"><div class="t"><h2>${v.name}</h2><p>${v.desc}</p></div>
  <div class="feed">${rival('BARK', '#D4FF3A')}${rival('2EZ', '#3FE0E8')}
  <div class="it"><span class="c me"><img src="diff-${k}.png"></span><span class="lbl">KNOW-ISH</span></div>
  <div class="it"><span class="c s"><img src="diff-${k}.png"></span><span class="lbl">작게</span></div></div></div>`).join('');
await shot('profile-diff', `<div class="wrap">${rows}</div>`, '.wrap');
await browser.close();
console.log('ok');
