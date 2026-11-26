// 말캉 스티커(A) 3D 변형 시안 A1~A6 → brand/logo-ppo3.png
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

// 공통: 젤리 알약 (광택 하이라이트 + 아래 두께 + 그림자)
const pill = (txt, top, bot, edge, fg, s, extra = '') => `<span class="pill" style="--s:${s};font-size:calc(62px*var(--s));color:${fg};
  background:linear-gradient(180deg, ${top} 0%, ${bot} 100%);
  padding:calc(14px*var(--s)) calc(30px*var(--s)) calc(8px*var(--s));border-radius:999px;
  box-shadow:inset 0 calc(-8px*var(--s)) calc(10px*var(--s)) rgba(0,0,0,.08), inset 0 calc(6px*var(--s)) calc(8px*var(--s)) rgba(255,255,255,.8),
    0 calc(10px*var(--s)) 0 ${edge}, 0 calc(18px*var(--s)) calc(22px*var(--s)) rgba(91,63,66,.25);${extra}">${txt}<i class="gl"></i></span>`;

const css = `
.pill{position:relative;display:inline-block;font-family:'Jua';line-height:1;letter-spacing:-0.01em}
.pill .gl{position:absolute;left:14%;top:14%;width:46%;height:22%;border-radius:999px;background:linear-gradient(180deg,rgba(255,255,255,.95),rgba(255,255,255,0));pointer-events:none}
.puffy{font-family:'Jua';line-height:1;letter-spacing:-0.01em;display:inline-block}
.sheet{width:2400px;background:${P.milk};padding:60px;font-family:'Pretendard';color:${C};display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:36px}
.col{background:#fff;border-radius:36px;padding:36px;display:flex;flex-direction:column;gap:22px;border:4px dashed ${P.pink}}
.col h2{font-family:'Jua';font-size:44px;margin:0}
.col p{font-size:23px;line-height:1.5;margin:0;color:#7a6266;min-height:70px}
.circ{width:360px;height:360px;border-radius:50%;overflow:hidden;align-self:center;box-shadow:0 0 0 8px #fff,0 0 0 12px ${P.pink}}
.circ img,.sm img{width:100%;height:100%}
.tile{border-radius:24px;padding:46px 20px 56px;display:flex;align-items:center;justify-content:center;min-height:230px}
.sm{display:flex;gap:16px;justify-content:center;align-items:center}
.sm span{width:96px;height:96px;border-radius:50%;overflow:hidden;display:block}
.sm span.s{width:56px;height:56px}
`;

// A1. 젤리 알약: 광택 + 두께
const A1 = (s = 1) => `<span style="display:inline-flex;align-items:center">
  ${pill('know', '#E6F3FF', '#B9DBFF', '#8FC0F2', C, s)}
  ${pill('ish♡', '#FFC4DC', '#FF8DB8', '#E8689A', '#fff', s * 0.85, `margin-left:calc(-12px*${s});transform:rotate(-9deg) translateY(calc(-14px*${s}))`)}</span>`;

// A2. 풍선 글자: 글자 자체가 부풀어 오른 입체 (겹 text-shadow)
const puffText = (t, fill, edge, s) => `<span class="puffy" style="font-size:${110 * s}px;color:${fill};
  -webkit-text-stroke:${5 * s}px ${C};paint-order:stroke fill;
  text-shadow:0 ${2 * s}px 0 ${edge},0 ${4 * s}px 0 ${edge},0 ${6 * s}px 0 ${edge},0 ${8 * s}px 0 ${edge},0 ${10 * s}px 0 ${C},0 ${18 * s}px ${18 * s}px rgba(91,63,66,.3)">${t}</span>`;
const A2 = (s = 1) => `<span style="display:inline-flex;align-items:baseline;gap:${8 * s}px;position:relative">${puffText('know', '#CFE6FF', '#8FC0F2', s)}${puffText('ish', '#FFB3D1', '#E8689A', s)}<span class="puffy" style="position:absolute;right:${-30 * s}px;top:${-30 * s}px;font-size:${54 * s}px;color:#fff;-webkit-text-stroke:${4 * s}px ${C};paint-order:stroke fill">♡</span></span>`;

// A3. 마시멜로 블록: 두툼한 측면(익스트루전) 블록 2개
const block = (t, face, side, fg, s, rot) => `<span style="display:inline-block;font-family:'Jua';font-size:${64 * s}px;line-height:1;color:${fg};background:${face};padding:${16 * s}px ${30 * s}px ${10 * s}px;border-radius:${30 * s}px;border:${4 * s}px solid ${C};transform:rotate(${rot}deg);
  box-shadow:${4 * s}px ${4 * s}px 0 ${side},${8 * s}px ${8 * s}px 0 ${side},${12 * s}px ${12 * s}px 0 ${side},${12 * s}px ${12 * s}px 0 ${4 * s}px ${C},${20 * s}px ${24 * s}px ${20 * s}px rgba(91,63,66,.2)">${t}</span>`;
const A3 = (s = 1) => `<span style="display:inline-flex;align-items:center;gap:${6 * s}px">${block('know', '#E4F1FF', '#A9D0FA', C, s, -3)}${block('ish', '#FFD0E2', '#F49BC0', C, s, 5)}</span>`;

// A4. 스퀴시 하트: ish 가 광택 하트 쿠션
const heart3d = (s) => `<span style="position:relative;display:inline-block;width:${150 * s}px;height:${136 * s}px;margin-left:${-20 * s}px;transform:rotate(-10deg) translateY(${-10 * s}px)">
  <svg width="${150 * s}" height="${136 * s}" viewBox="0 0 150 136" style="filter:drop-shadow(0 ${10 * s}px 0 #E8689A) drop-shadow(0 ${16 * s}px ${14 * s}px rgba(91,63,66,.3))"><defs><radialGradient id="hg" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#FFE1EE"/><stop offset=".55" stop-color="#FF9EC4"/><stop offset="1" stop-color="#FF7AAE"/></radialGradient></defs><path d="M75 128 C22 92 4 66 4 40 A34 34 0 0 1 75 26 A34 34 0 0 1 146 40 C146 66 128 92 75 128Z" fill="url(#hg)" stroke="${C}" stroke-width="5"/><ellipse cx="42" cy="38" rx="16" ry="9" fill="#fff" opacity=".9" transform="rotate(-25 42 38)"/></svg>
  <span style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:'Jua';font-size:${44 * s}px;color:#fff;-webkit-text-stroke:${3 * s}px ${C};paint-order:stroke fill;padding-bottom:${12 * s}px">ish</span></span>`;
const A4 = (s = 1) => `<span style="display:inline-flex;align-items:center">${pill('know', '#E6F3FF', '#B9DBFF', '#8FC0F2', C, s)}${heart3d(s)}</span>`;

// A5. 투명 젤리: 반투명 + 테두리 광
const glass = (t, tint, fg, s, rot = 0) => `<span class="pill" style="--s:${s};font-size:calc(62px*var(--s));color:${fg};background:linear-gradient(160deg, rgba(255,255,255,.85), ${tint});
  padding:calc(14px*var(--s)) calc(30px*var(--s)) calc(8px*var(--s));border-radius:999px;border:calc(3px*var(--s)) solid rgba(255,255,255,.9);transform:rotate(${rot}deg);
  box-shadow:inset 0 0 calc(18px*var(--s)) rgba(255,255,255,.9), 0 calc(14px*var(--s)) calc(24px*var(--s)) ${tint}, 0 calc(4px*var(--s)) 0 rgba(91,63,66,.15)">${t}<i class="gl" style="top:10%;height:26%"></i></span>`;
const A5 = (s = 1) => `<span style="display:inline-flex;align-items:center;gap:${4 * s}px">${glass('know', 'rgba(150,200,255,.75)', C, s, -2)}${glass('ish♡', 'rgba(255,140,190,.75)', C, s * 0.9, 7)}</span>`;

// A6. 다이컷 쿠키 스티커: 두꺼운 흰 테두리 + 살짝 들뜬 그림자, 반짝이
const A6 = (s = 1) => `<span style="display:inline-flex;align-items:center;padding:${16 * s}px ${20 * s}px;background:#fff;border-radius:${80 * s}px;transform:rotate(-4deg);
  box-shadow:0 0 0 ${4 * s}px ${C},0 ${8 * s}px 0 ${4 * s}px ${C},0 ${22 * s}px ${22 * s}px rgba(91,63,66,.25)">
  ${pill('know', '#E6F3FF', '#B9DBFF', '#8FC0F2', C, s * 0.95)}
  ${pill('ish', '#FFC4DC', '#FF8DB8', '#E8689A', '#fff', s * 0.95, `margin-left:${10 * s}px`)}
  <span style="font-family:'Noto Color Emoji';font-size:${44 * s}px;margin-left:${8 * s}px">✨</span></span>`;

const V = [
  ['A1. 젤리 알약', '원래 말캉 스티커에 광택 하이라이트 + 아래 두께. 가장 무난하게 업그레이드', P.milk, A1],
  ['A2. 풍선 글자', '글자 자체가 빵빵하게 부푼 입체 레터링. 가장 3D 느낌 강함', '#FFE9F2', A2],
  ['A3. 마시멜로 블록', '두툼한 옆면이 보이는 말랑 블록. 장난감·스퀴시 느낌', P.lilac, A3],
  ['A4. 스퀴시 하트', 'ish 를 광택 하트 쿠션으로. 핑크 하트가 시그니처가 됨', P.blue, A4],
  ['A5. 투명 젤리', '반투명 유리알 같은 젤리. 가장 뽀얗고 몽글몽글', '#F3EEFF', A5],
  ['A6. 쿠키 다이컷', '두꺼운 흰 테두리로 오려 붙인 스티커가 살짝 들뜬 느낌', P.mint, A6],
];
const out = path.join(ROOT, 'brand');
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 2400, height: 1400 } });
async function shot(name, html, sel) {
  const f = path.join(out, `_${name}.html`);
  await fs.writeFile(f, page(fonts + html, css));
  await p.goto('file://' + f); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
  await p.locator(sel).screenshot({ path: path.join(out, `${name}.png`) }); await fs.rm(f);
}
for (const [i, v] of V.entries()) await shot(`profile-ppo-a${i + 1}`, `<div class="pf" style="width:1080px;height:1080px;background:radial-gradient(circle at 35% 30%, #fff 0%, ${v[2]} 60%);display:flex;align-items:center;justify-content:center">${v[3](i === 1 ? 2.3 : 2.6)}</div>`, '.pf');
await shot('logo-ppo3', `<div class="sheet">${V.map((v, i) => `<div class="col"><h2>${v[0]}</h2><p>${v[1]}</p><div class="circ"><img src="profile-ppo-a${i + 1}.png"></div><div class="tile" style="background:${P.cream}">${v[3](i === 1 ? 0.9 : 1.05)}</div><div class="tile" style="background:${C}">${v[3](i === 1 ? 0.9 : 1.05)}</div><div class="sm"><span><img src="profile-ppo-a${i + 1}.png"></span><span class="s"><img src="profile-ppo-a${i + 1}.png"></span></div></div>`).join('')}</div>`, '.sheet');
await b.close();
console.log('ok');
