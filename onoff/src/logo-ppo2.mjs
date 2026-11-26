// 뽀용 로고 시안 2차 (D~I) → brand/logo-ppo2.png
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { page } from './templates.mjs';
import { PPO as P } from './logo-ppo.mjs';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const nm = (p) => pathToFileURL(path.join(ROOT, 'node_modules', p)).href;
const fonts = `<style>@import url('${nm('@fontsource/jua/index.css')}');@import url('${nm('@fontsource/gaegu/700.css')}');</style>`;
const C = P.cocoa;
const spark = (c, s) => `<svg width="${s}" height="${s}" viewBox="0 0 40 40"><path d="M20 2 C22 14 26 18 38 20 C26 22 22 26 20 38 C18 26 14 22 2 20 C14 18 18 14 20 2Z" fill="${c}"/></svg>`;
const heart = (c, s) => `<svg width="${s}" height="${s * 0.9}" viewBox="0 0 40 36"><path d="M20 34 C6 24 1 17 1 10 A9 9 0 0 1 20 7 A9 9 0 0 1 39 10 C39 17 34 24 20 34Z" fill="${c}"/></svg>`;
const bow = (c, s) => `<svg width="${s}" height="${s * 0.62}" viewBox="0 0 100 62"><path d="M50 31 C30 5 6 4 6 24 C6 44 30 50 50 31Z" fill="${c}" stroke="${C}" stroke-width="4"/><path d="M50 31 C70 5 94 4 94 24 C94 44 70 50 50 31Z" fill="${c}" stroke="${C}" stroke-width="4"/><path d="M42 33 L30 60 M58 33 L70 60" stroke="${C}" stroke-width="4" stroke-linecap="round"/><circle cx="50" cy="31" r="10" fill="${c}" stroke="${C}" stroke-width="4"/></svg>`;

// D. 리본 손글씨: 손글씨 know-ish + 리본
const D = (s = 1) => `<span style="display:inline-flex;flex-direction:column;align-items:center;--s:${s}">
  <span style="margin-bottom:calc(-14px*var(--s))">${bow(P.pink, 110 * s)}</span>
  <span style="font-family:'Gaegu';font-weight:700;font-size:calc(92px*var(--s));color:${C};line-height:1;letter-spacing:-0.02em">know<span style="color:${P.pinkD}">-ish</span></span>
</span>`;
// E. 찹쌀떡 마스코트: 동글 얼굴 + 안경 + 볼터치
const mochi = (s, bg = '#fff') => `<svg width="${s}" height="${s * 0.86}" viewBox="0 0 140 120"><path d="M12 82 C6 40 40 10 70 10 C100 10 134 40 128 82 C124 108 96 114 70 114 C44 114 16 108 12 82Z" fill="${bg}" stroke="${C}" stroke-width="5"/><circle cx="48" cy="64" r="15" fill="none" stroke="${C}" stroke-width="5"/><circle cx="92" cy="64" r="15" fill="none" stroke="${C}" stroke-width="5"/><path d="M63 62 Q70 56 77 62" stroke="${C}" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="50" cy="66" r="5" fill="${C}"/><circle cx="94" cy="66" r="5" fill="${C}"/><ellipse cx="30" cy="88" rx="10" ry="6" fill="${P.pink}"/><ellipse cx="110" cy="88" rx="10" ry="6" fill="${P.pink}"/><path d="M64 90 Q70 96 76 90" stroke="${C}" stroke-width="4" fill="none" stroke-linecap="round"/></svg>`;
const E = (s = 1) => `<span style="display:inline-flex;align-items:center;gap:calc(14px*var(--s));--s:${s}">${mochi(110 * s)}<span style="font-family:'Jua';font-size:calc(62px*var(--s));color:${C};line-height:1">know<br><span style="color:${P.blueD}">ish</span></span></span>`;
// F. 우표 스탬프
const F = (s = 1) => `<span style="display:inline-block;--s:${s};padding:calc(10px*var(--s));background:#fff;border:calc(9px*var(--s)) dotted ${P.lilac};box-shadow:0 calc(5px*var(--s)) 0 ${P.pink};transform:rotate(-3deg)">
  <span style="display:flex;flex-direction:column;align-items:center;border:calc(3px*var(--s)) dashed ${P.pinkD};background:${P.butter};padding:calc(14px*var(--s)) calc(30px*var(--s)) calc(10px*var(--s))">
    ${heart(P.pinkD, 40 * s)}
    <span style="font-family:'Jua';font-size:calc(60px*var(--s));color:${C};line-height:1.05">know-ish</span>
    <span style="font-family:'Gaegu';font-weight:700;font-size:calc(26px*var(--s));color:${P.pinkD}">아는 척 우편 · 오늘 도착</span>
  </span></span>`;
// G. 체리 모노그램 k
const G = (s = 1) => `<span style="display:inline-flex;align-items:center;gap:calc(16px*var(--s));--s:${s}">
  <span style="position:relative;width:calc(120px*var(--s));height:calc(120px*var(--s));border-radius:50%;background:${P.pinkD};border:calc(5px*var(--s)) solid ${C};display:flex;align-items:center;justify-content:center;font-family:'Jua';font-size:calc(82px*var(--s));color:#fff;line-height:1;padding-top:calc(8px*var(--s))">k<span style="position:absolute;right:calc(-10px*var(--s));top:calc(-16px*var(--s))">${spark(P.butter, 44 * s)}</span></span>
  <span style="font-family:'Jua';font-size:calc(58px*var(--s));color:${C};line-height:1">know-ish<br><span style="font-family:'Gaegu';font-weight:700;font-size:calc(32px*var(--s));color:${P.pinkD}">우리 아는 척 해요</span></span>
</span>`;
// H. 메모지 스티커
const H = (s = 1) => `<span style="display:inline-block;position:relative;--s:${s};background:${P.butter};padding:calc(30px*var(--s)) calc(40px*var(--s)) calc(20px*var(--s));transform:rotate(-3deg);box-shadow:calc(6px*var(--s)) calc(8px*var(--s)) 0 rgba(91,63,66,.18)">
  <span style="position:absolute;left:50%;top:calc(-16px*var(--s));width:calc(120px*var(--s));height:calc(34px*var(--s));margin-left:calc(-60px*var(--s));background:${P.blue};opacity:.9;transform:rotate(4deg)"></span>
  <span style="display:block;font-family:'Gaegu';font-weight:700;font-size:calc(30px*var(--s));color:${P.pinkD}">오늘의 아는 척 ✎</span>
  <span style="display:block;font-family:'Jua';font-size:calc(66px*var(--s));color:${C};line-height:1.05">know-ish</span>
</span>`;
// I. 한글 노이쉬
const I = (s = 1) => `<span style="display:inline-flex;align-items:center;position:relative;--s:${s};background:#fff;border:calc(5px*var(--s)) solid ${C};border-radius:calc(40px*var(--s));padding:calc(14px*var(--s)) calc(36px*var(--s)) calc(6px*var(--s));box-shadow:0 calc(8px*var(--s)) 0 ${P.lilac}">
  <span style="font-family:'Jua';font-size:calc(80px*var(--s));color:${C};line-height:1;letter-spacing:-0.02em">노<span style="color:${P.pinkD}">이</span>쉬</span>
  <span style="position:absolute;right:calc(-22px*var(--s));top:calc(-26px*var(--s))">${heart(P.pinkD, 48 * s)}</span>
  <span style="position:absolute;left:calc(-18px*var(--s));bottom:calc(-20px*var(--s))">${spark(P.blueD, 38 * s)}</span>
</span>`;

const V = [
  ['D. 리본 손글씨', '말랑 손글씨 + 리본. 가장 아기자기하고 굿즈·팝업 주제랑 찰떡', P.milk, D(2.4)],
  ['E. 찹쌀떡 마스코트', '안경 쓴 찹쌀떡 = 아는 척하는 친구. 캐릭터로 카드 곳곳에 등장 가능', P.blue, `<span style="display:flex;flex-direction:column;align-items:center;gap:10px">${mochi(640)}<span style="font-family:'Jua';font-size:120px;color:${C}">know<span style="color:${P.pinkD}">-ish</span></span></span>`],
  ['F. 우표 스탬프', '편지·우표 감성. “오늘의 아는 척이 도착했어요” 콘셉트', P.lilac, F(2.2)],
  ['G. 체리 모노그램', '동글 k 하나로 작게 줄여도 또렷. 프로필 아이콘에 강함', P.butter, `<span style="display:flex;flex-direction:column;align-items:center;gap:20px"><span style="width:460px;height:460px;border-radius:50%;background:${P.pinkD};border:12px solid ${C};display:flex;align-items:center;justify-content:center;font-family:'Jua';font-size:340px;color:#fff;line-height:1;padding-top:40px;position:relative">k<span style="position:absolute;right:10px;top:0">${spark('#fff', 110)}</span></span></span>`],
  ['H. 메모지 스티커', '포스트잇에 쓴 “오늘의 아는 척”. 노트·다이어리 톤', P.mint, H(2.3)],
  ['I. 한글 노이쉬', '읽는 법을 그대로 로고로. 한글이라 친근하고 검색에도 도움', P.pink, I(2.6)],
];
const SM = [D, E, F, G, H, I];

const css = `
.sheet{width:2400px;background:${P.milk};padding:60px;font-family:'Pretendard';color:${C};display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:36px}
.col{background:#fff;border-radius:36px;padding:36px;display:flex;flex-direction:column;gap:22px;border:4px dashed ${P.pink}}
.col h2{font-family:'Jua';font-size:44px;margin:0}
.col p{font-size:23px;line-height:1.5;margin:0;color:#7a6266;min-height:70px}
.circ{width:360px;height:360px;border-radius:50%;overflow:hidden;align-self:center;box-shadow:0 0 0 8px #fff,0 0 0 12px ${P.pink}}
.circ img,.sm img{width:100%;height:100%}
.tile{border-radius:24px;padding:40px 20px;display:flex;align-items:center;justify-content:center;min-height:220px;background:${P.cream}}
.sm{display:flex;gap:16px;justify-content:center;align-items:center}
.sm span{width:96px;height:96px;border-radius:50%;overflow:hidden;display:block}
.sm span.s{width:56px;height:56px}
`;
const out = path.join(ROOT, 'brand');
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 2400, height: 1400 } });
async function shot(name, html, sel) {
  const f = path.join(out, `_${name}.html`);
  await fs.writeFile(f, page(fonts + html, css));
  await p.goto('file://' + f); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
  await p.locator(sel).screenshot({ path: path.join(out, `${name}.png`) }); await fs.rm(f);
}
for (const [i, v] of V.entries()) await shot(`profile-ppo-${'defghi'[i]}`, `<div class="pf" style="width:1080px;height:1080px;background:${v[2]};display:flex;align-items:center;justify-content:center">${v[3]}</div>`, '.pf');
await shot('logo-ppo2', `<div class="sheet">${V.map((v, i) => `<div class="col"><h2>${v[0]}</h2><p>${v[1]}</p><div class="circ"><img src="profile-ppo-${'defghi'[i]}.png"></div><div class="tile">${SM[i](1)}</div><div class="sm"><span><img src="profile-ppo-${'defghi'[i]}.png"></span><span class="s"><img src="profile-ppo-${'defghi'[i]}.png"></span></div></div>`).join('')}</div>`, '.sheet');
await b.close();
console.log('ok');
