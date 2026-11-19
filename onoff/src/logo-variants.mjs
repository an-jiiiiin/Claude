// 로고 시안 비교 렌더: node src/logo-variants.mjs → brand/logo-variants.png
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
import fs from 'node:fs/promises';
import path from 'node:path';
import { page, BRAND } from './templates.mjs';

const { ink, lime, off, on, paper } = BRAND;

// 각 시안: mark(size) = 가로형 로고, prof = 프로필(원형 크롭 전 정사각)
const V = {
  A: {
    name: 'A. STICKER',
    desc: '라임 블록 + 코랄 스티커. 2EZ 썸네일 스티커와 같은 문법이라 피드에서 가장 튐',
    css: `
.vA{position:relative;display:inline-block;white-space:nowrap;--s:1}
.vA .k{display:inline-block;background:${lime};color:${ink};font-weight:900;letter-spacing:-0.05em;
  font-size:calc(64px*var(--s));line-height:1;padding:calc(10px*var(--s)) calc(18px*var(--s)) calc(6px*var(--s));
  transform:rotate(-3deg);box-shadow:calc(6px*var(--s)) calc(6px*var(--s)) 0 ${ink}, calc(6px*var(--s)) calc(6px*var(--s)) 0 calc(2px*var(--s)) #fff}
.vA .i{position:absolute;right:calc(-58px*var(--s));bottom:calc(-22px*var(--s));background:${off};color:#fff;
  font-family:'Permanent Marker';font-size:calc(36px*var(--s));line-height:1;padding:calc(8px*var(--s)) calc(12px*var(--s)) calc(4px*var(--s));
  border-radius:calc(8px*var(--s));transform:rotate(9deg);border:calc(3px*var(--s)) solid #fff}
`,
    mark: (s) => `<span class="vA" style="--s:${s}"><span class="k">KNOW</span><span class="i">-ish</span></span>`,
    prof: () => `<div class="prof" style="background:${ink}"><span class="vA" style="--s:3.2;margin:-40px 120px 0 0"><span class="k">KNOW</span><span class="i">-ish</span></span></div>`,
  },
  B: {
    name: 'B. BUBBLE',
    desc: '말풍선 = “아는 척 한마디”. 컨셉이 형태로 바로 읽히고 이모지·캐릭터와 잘 붙음',
    css: `
.vB{position:relative;display:inline-flex;white-space:nowrap;flex:none;align-items:baseline;gap:calc(4px*var(--s));--s:1;
  background:${lime};color:${ink};border-radius:calc(40px*var(--s));padding:calc(12px*var(--s)) calc(26px*var(--s)) calc(12px*var(--s)) calc(24px*var(--s))}
.vB::after{content:'';position:absolute;left:calc(26px*var(--s));bottom:calc(-20px*var(--s));
  border-left:calc(14px*var(--s)) solid transparent;border-right:calc(14px*var(--s)) solid transparent;border-top:calc(24px*var(--s)) solid ${lime};transform:skewX(-20deg)}
.vB .k{font-weight:900;letter-spacing:-0.05em;font-size:calc(54px*var(--s));line-height:1}
.vB .i{white-space:nowrap;font-family:'Permanent Marker';font-size:calc(40px*var(--s));color:${off};line-height:1;transform:rotate(-8deg);display:inline-block}
`,
    mark: (s) => `<span class="vB" style="--s:${s}"><span class="k">KNOW</span><span class="i">-ish</span></span>`,
    prof: () => `<div class="prof" style="background:${ink}"><span class="vB" style="--s:3.1;margin-top:-50px"><span class="k">KNOW</span><span class="i">-ish</span></span></div>`,
  },
  C: {
    name: 'C. FULL LIME',
    desc: '프로필 전체를 라임으로. 검정 계정들 사이에서 원 자체가 신호등처럼 보임',
    css: `
.vC{display:inline-flex;white-space:nowrap;flex:none;flex-direction:column;align-items:flex-start;line-height:.82;--s:1}
.vC .k{font-weight:900;letter-spacing:-0.06em;font-size:calc(70px*var(--s));color:currentColor}
.vC .i{white-space:nowrap;font-family:'Permanent Marker';font-size:calc(46px*var(--s));color:${off};transform:rotate(-7deg);
  margin:calc(-4px*var(--s)) 0 0 calc(70px*var(--s));display:inline-block;line-height:1}
.vC.inl{flex-direction:row;align-items:baseline;line-height:1}
.vC.inl .i{margin:0 0 0 calc(4px*var(--s))}
.vC .dot{display:inline-block;width:calc(16px*var(--s));height:calc(16px*var(--s));background:${off};border-radius:50%}
`,
    mark: (s, bg) => `<span class="vC inl" style="--s:${s};color:${bg === 'dark' ? lime : ink}"><span class="k">KNOW</span><span class="i">-ish</span></span>`,
    prof: () => `<div class="prof" style="background:${lime};color:${ink}"><span class="vC" style="--s:4.2;margin:-40px 30px 0 0"><span class="k">KNOW</span><span class="i">-ish</span></span></div>`,
  },
};

const css = Object.values(V).map((v) => v.css).join('') + `
.prof{width:1080px;height:1080px;display:flex;align-items:center;justify-content:center;font-family:'Pretendard'}
.cmp{width:2100px;background:${paper};padding:80px;font-family:'Pretendard';color:${ink};display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:40px}
.col{display:flex;flex-direction:column;gap:28px;background:#fff;border-radius:28px;padding:40px;min-width:0}
.col h2{font-size:44px;font-weight:900;letter-spacing:-0.03em}
.col .d{font-size:24px;line-height:1.5;color:#555;min-height:72px}
.circ{width:420px;height:420px;border-radius:50%;overflow:hidden;align-self:center;box-shadow:0 0 0 8px #fff,0 0 0 11px #ddd}
.circ img{width:100%;height:100%}
.tile{border-radius:20px;padding:60px 50px;display:flex;align-items:center;justify-content:center;min-height:200px;overflow:hidden}
.feed{display:flex;gap:16px;justify-content:center;align-items:center;background:#fff;border-radius:20px;padding:24px}
.feed .c{width:96px;height:96px;border-radius:50%;overflow:hidden;flex:none}
.feed .c img{width:100%;height:100%}
.feed .g{background:#222}
.cap{font-size:20px;color:#888;text-align:center;margin-top:-14px}
`;

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
for (const [k, v] of Object.entries(V)) await shot(`profile-${k}`, v.prof(), '.prof');

// 피드 속 가독성 비교용: 다른 계정 프로필(회색/검정) 사이에 작게
const others = (k) =>
  `<span class="c g"></span><span class="c" style="background:#3a3a3a"></span><span class="c"><img src="profile-${k}.png"></span><span class="c" style="background:#5865f2"></span><span class="c g"></span>`;
const cols = Object.entries(V)
  .map(
    ([k, v]) => `<div class="col"><h2>${v.name}</h2><div class="d">${v.desc}</div>
  <div class="circ"><img src="profile-${k}.png"></div>
  <div class="tile" style="background:${ink}">${v.mark(1.6, 'dark')}</div>
  <div class="tile" style="background:#fff">${v.mark(1.6, 'light')}</div>
  <div class="feed">${others(k)}</div><div class="cap">스토리·검색 결과 크기(약 100px)에서의 존재감</div></div>`
  )
  .join('');
await shot('logo-variants', `<div class="cmp">${cols}</div>`, '.cmp');
await browser.close();
console.log('ok');
