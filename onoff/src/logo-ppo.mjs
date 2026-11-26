// 뽀용 로고 시안 3종 → brand/logo-ppo.png (+ 각 프로필 png)
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { page } from './templates.mjs';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const nm = (p) => pathToFileURL(path.join(ROOT, 'node_modules', p)).href;
export const PPO = { milk: '#FFF5F8', cream: '#FFFDF7', pink: '#FFC9DE', pinkD: '#FF8FB7', blue: '#CFE6FF', blueD: '#7DB8F5', lilac: '#E3D7FF', butter: '#FFF0A8', mint: '#CDF3E1', cocoa: '#5B3F42' };
const P = PPO;
const fonts = `<style>@import url('${nm('@fontsource/jua/index.css')}');@import url('${nm('@fontsource/gaegu/700.css')}');</style>`;

const spark = (c, s) => `<svg width="${s}" height="${s}" viewBox="0 0 40 40"><path d="M20 2 C22 14 26 18 38 20 C26 22 22 26 20 38 C18 26 14 22 2 20 C14 18 18 14 20 2Z" fill="${c}"/></svg>`;
const heart = (c, s) => `<svg width="${s}" height="${s}" viewBox="0 0 40 36"><path d="M20 34 C6 24 1 17 1 10 A9 9 0 0 1 20 7 A9 9 0 0 1 39 10 C39 17 34 24 20 34Z" fill="${c}"/></svg>`;
const glasses = (s, c = P.cocoa) => `<svg width="${s * 2.2}" height="${s}" viewBox="0 0 110 50"><circle cx="27" cy="25" r="20" fill="#fff" stroke="${c}" stroke-width="6"/><circle cx="83" cy="25" r="20" fill="#fff" stroke="${c}" stroke-width="6"/><path d="M47 22 Q55 15 63 22" stroke="${c}" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="31" cy="27" r="6" fill="${c}"/><circle cx="87" cy="27" r="6" fill="${c}"/><circle cx="34" cy="24" r="2" fill="#fff"/><circle cx="90" cy="24" r="2" fill="#fff"/></svg>`;

// A. 말캉 스티커: KNOW(하늘 젤리) + -ish(핑크 하트 스티커), 흰 테두리 다이컷
export const logoA = (s = 1) => `<span style="display:inline-flex;align-items:center;position:relative;--s:${s}">
  <span style="font-family:'Jua';font-size:calc(60px*var(--s));color:${P.cocoa};background:${P.blue};padding:calc(10px*var(--s)) calc(26px*var(--s)) calc(4px*var(--s));border-radius:999px;border:calc(5px*var(--s)) solid #fff;box-shadow:0 0 0 calc(3px*var(--s)) ${P.cocoa},0 calc(6px*var(--s)) 0 calc(3px*var(--s)) ${P.cocoa}">know</span>
  <span style="font-family:'Jua';font-size:calc(50px*var(--s));color:#fff;background:${P.pinkD};padding:calc(8px*var(--s)) calc(20px*var(--s)) calc(3px*var(--s));border-radius:999px;margin-left:calc(-14px*var(--s));transform:rotate(-8deg) translateY(calc(-10px*var(--s)));border:calc(5px*var(--s)) solid #fff;box-shadow:0 0 0 calc(3px*var(--s)) ${P.cocoa},0 calc(6px*var(--s)) 0 calc(3px*var(--s)) ${P.cocoa}">ish♡</span>
</span>`;
// B. 안경 캐릭터: 동글 안경(아는 척) + 손글씨 know-ish
export const logoB = (s = 1) => `<span style="display:inline-flex;flex-direction:column;align-items:center;gap:calc(4px*var(--s));--s:${s}">
  ${glasses(54 * s)}
  <span style="font-family:'Jua';font-size:calc(58px*var(--s));color:${P.cocoa};letter-spacing:-0.02em;line-height:1">know<span style="color:${P.pinkD}">-ish</span></span>
</span>`;
// C. 말풍선: “아는 척?” 버블 안에 know-ish
export const logoC = (s = 1) => `<span style="display:inline-block;position:relative;--s:${s};background:#fff;border:calc(5px*var(--s)) solid ${P.cocoa};border-radius:calc(48px*var(--s));padding:calc(14px*var(--s)) calc(30px*var(--s)) calc(8px*var(--s));box-shadow:calc(7px*var(--s)) calc(7px*var(--s)) 0 ${P.pink}">
  <span style="font-family:'Jua';font-size:calc(58px*var(--s));color:${P.cocoa};line-height:1">know<span style="color:${P.blueD}">·</span>ish</span>
  <span style="position:absolute;left:calc(40px*var(--s));bottom:calc(-26px*var(--s));width:0;height:0;border-left:calc(14px*var(--s)) solid transparent;border-right:calc(14px*var(--s)) solid transparent;border-top:calc(24px*var(--s)) solid ${P.cocoa}"></span>
  <span style="position:absolute;right:calc(-26px*var(--s));top:calc(-30px*var(--s))">${spark(P.butter, 46 * s)}</span>
</span>`;

const prof = (bg, inner, deco) => `<div class="pf" style="width:1080px;height:1080px;background:${bg};display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden">${deco}${inner}</div>`;
const V = [
  ['A. 말캉 스티커', '젤리 같은 하늘 know + 핑크 하트 ish. 흰 테두리 다이컷 스티커라 어디 붙여도 귀여움', P.milk, logoA(2.6), `<div style="position:absolute;left:150px;top:200px">${spark(P.butter, 90)}</div><div style="position:absolute;right:160px;bottom:220px">${heart(P.pink, 80)}</div>`],
  ['B. 안경 캐릭터', '동글 안경 = “아는 척”. 캐릭터처럼 쓸 수 있어 스티커·이모지로 확장 쉬움', P.blue, logoB(3), `<div style="position:absolute;left:170px;top:190px">${heart(P.pinkD, 70)}</div><div style="position:absolute;right:170px;top:250px">${spark('#fff', 80)}</div>`],
  ['C. 말풍선', '“아는 척 한마디” 말풍선. 깔끔하고 카드뉴스 말풍선과 세트감', P.pink, logoC(2.6), `<div style="position:absolute;right:150px;bottom:200px">${heart('#fff', 90)}</div>`],
];

const css = `
.sheet{width:2100px;background:${P.milk};padding:70px;font-family:'Pretendard';color:${P.cocoa};display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:40px}
.col{background:#fff;border-radius:36px;padding:40px;display:flex;flex-direction:column;gap:26px;border:4px dashed ${P.pink}}
.col h2{font-family:'Jua';font-size:46px;margin:0}
.col p{font-size:24px;line-height:1.5;margin:0;color:#7a6266}
.circ{width:400px;height:400px;border-radius:50%;overflow:hidden;align-self:center;box-shadow:0 0 0 8px #fff,0 0 0 12px ${P.pink}}
.circ img,.sm img{width:100%;height:100%}
.tile{border-radius:24px;padding:50px 30px;display:flex;align-items:center;justify-content:center;min-height:230px}
.sm{display:flex;gap:16px;justify-content:center}
.sm span{width:96px;height:96px;border-radius:50%;overflow:hidden;display:block}
.sm span.s{width:56px;height:56px;align-self:center}
`;

if (import.meta.url === `file://${process.argv[1]}`) {
const out = path.join(ROOT, 'brand');
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 2100, height: 1400 } });
async function shot(name, html, sel) {
  const f = path.join(out, `_${name}.html`);
  await fs.writeFile(f, page(fonts + html, css));
  await p.goto('file://' + f); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
  await p.locator(sel).screenshot({ path: path.join(out, `${name}.png`) }); await fs.rm(f);
}
for (const [i, v] of V.entries()) await shot(`profile-ppo-${'abc'[i]}`, prof(v[2], v[3], v[4]), '.pf');
const fns = [logoA, logoB, logoC];
await shot('logo-ppo', `<div class="sheet">${V.map((v, i) => `<div class="col"><h2>${v[0]}</h2><p>${v[1]}</p><div class="circ"><img src="profile-ppo-${'abc'[i]}.png"></div><div class="tile" style="background:${P.cream}">${fns[i](1.2)}</div><div class="tile" style="background:${P.cocoa}">${fns[i](1.2)}</div><div class="sm"><span><img src="profile-ppo-${'abc'[i]}.png"></span><span class="s"><img src="profile-ppo-${'abc'[i]}.png"></span></div></div>`).join('')}</div>`, '.sheet');
await b.close();
console.log('ok');
}
