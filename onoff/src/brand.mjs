// 브랜드 에셋 렌더: 프로필 이미지(1080), 로고, 브랜드 시트
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
import fs from 'node:fs/promises';
import path from 'node:path';
import { page, logo, BRAND } from './templates.mjs';

const extra = `
.profile{width:1080px;height:1080px;border-radius:0;background:${BRAND.ink};display:flex;flex-direction:column;
  align-items:center;justify-content:center;gap:34px;font-family:'Pretendard'}
.profile .tg{display:flex;align-items:center;gap:34px;background:${BRAND.lime};border-radius:999px;padding:30px 34px 30px 70px;
  font-weight:900;font-size:190px;letter-spacing:-0.04em;line-height:1;color:${BRAND.ink}}
.profile .tg i{width:170px;height:170px;border-radius:50%;background:${BRAND.ink}}
.profile .off{font-weight:900;font-size:190px;color:#fff;letter-spacing:-0.04em;line-height:1}
.logoBox{padding:60px 70px;display:inline-block}
.sheet{width:1600px;background:${BRAND.paper};padding:90px;font-family:'Pretendard';color:${BRAND.ink};letter-spacing:-0.02em}
.sheet h1{font-size:28px;font-weight:800;letter-spacing:.12em;color:${BRAND.gray};margin-bottom:26px}
.sheet .row{display:flex;gap:40px;align-items:stretch;margin-bottom:80px}
.sheet .hero{flex:1.2;background:${BRAND.ink};color:#fff;border-radius:28px;padding:70px;display:flex;flex-direction:column;justify-content:space-between;min-height:460px}
.sheet .hero p{font-size:34px;line-height:1.55;color:rgba(255,255,255,.8);font-weight:500}
.sheet .hero p b{color:${BRAND.lime}}
.sheet .pf{width:460px;height:460px;border-radius:50%;overflow:hidden;flex:none;box-shadow:0 0 0 10px #fff, 0 0 0 14px #ddd}
.sheet .sw{flex:1;border-radius:22px;padding:30px;height:300px;display:flex;flex-direction:column;justify-content:flex-end;font-weight:800;font-size:30px}
.sheet .sw small{display:block;font-weight:500;font-size:19px;margin-top:6px;opacity:.75}
.sheet .ser{flex:1;border-radius:28px;padding:56px;color:#fff}
.sheet .ser .t{font-size:30px;font-weight:800;opacity:.85}
.sheet .ser .h{font-size:64px;font-weight:900;margin:16px 0 22px;letter-spacing:-0.04em}
.sheet .ser p{font-size:28px;line-height:1.6;opacity:.9}
.sheet .ty{flex:1;background:#fff;border-radius:22px;padding:48px}
.sheet .ty .a{font-size:84px;font-weight:900;letter-spacing:-0.045em;line-height:1.1}
.sheet .ty .b{font-family:'Black Han Sans';font-size:84px;line-height:1.1}
.sheet .ty small{display:block;font-size:22px;color:${BRAND.gray};margin-top:18px;line-height:1.5}
`;

const profile = `<div class="card profile"><span class="tg">ON<i></i></span><span class="off">OFF</span></div>`;

const sw = (bg, fg, name, hex, role) =>
  `<div class="sw" style="background:${bg};color:${fg};${bg === BRAND.paper ? 'box-shadow:inset 0 0 0 2px #ddd' : ''}">${name}<small>${hex} · ${role}</small></div>`;

const sheet = `<div class="sheet">
  <h1>ONOFF · BRAND</h1>
  <div class="row">
    <div class="hero">${logo(3.2)}<p>아침엔 <b>ON</b> — 시사·경제를 깊게 켜고,<br>오후엔 <b>OFF</b> — 마케팅·트렌드로 힘을 뺀다.<br>하루 두 번, 깊이를 조절하는 뉴스 카드.</p></div>
    <div class="pf"><img src="profile.png" style="width:100%;height:100%"></div>
  </div>
  <h1>COLOR</h1>
  <div class="row">
    ${sw(BRAND.ink, '#fff', 'Ink', BRAND.ink, '기본·아웃트로')}
    ${sw(BRAND.lime, BRAND.ink, 'Signal Lime', BRAND.lime, '로고·썸네일 강조')}
    ${sw(BRAND.on, '#fff', 'ON Blue', BRAND.on, '오전 시사경제')}
    ${sw(BRAND.off, '#fff', 'OFF Coral', BRAND.off, '오후 마케팅')}
    ${sw(BRAND.paper, BRAND.ink, 'Paper', BRAND.paper, '본문 배경')}
  </div>
  <h1>SERIES</h1>
  <div class="row">
    <div class="ser" style="background:${BRAND.on}"><div class="t">AM 08:00 · DEEP</div><div class="h">ON 시사·경제</div><p>금리, 환율, 정책, 정치 이슈.<br>숫자와 맥락으로 “왜”까지 설명한다.<br>카드 7~9장 · 실사 + 출처 필수</p></div>
    <div class="ser" style="background:${BRAND.off}"><div class="t">PM 18:00 · LIGHT</div><div class="h">OFF 마케팅</div><p>캠페인, 브랜드, 밈, 팝업.<br>재밌게 보고 “포인트” 하나는 챙긴다.<br>카드 5~7장 · 실사 + 출처 / 이모지 AI 가능</p></div>
  </div>
  <h1>TYPE</h1>
  <div class="row">
    <div class="ty"><div class="a">Pretendard Black</div><small>썸네일 헤드라인 · 본문(Medium 34px / 행간 1.66)</small></div>
    <div class="ty"><div class="b">블랙한산스 스티커</div><small>썸네일 스티커 문구 전용 (한 줄, 8자 이내)</small></div>
  </div>
</div>`;

const out = path.resolve('brand');
await fs.mkdir(out, { recursive: true });
const browser = await chromium.launch();
const p = await browser.newPage({ viewport: { width: 1600, height: 1200 } });
async function shot(name, html, sel, opts = {}) {
  const f = path.join(out, `_${name}.html`);
  await fs.writeFile(f, page(html, extra));
  await p.goto('file://' + f);
  await p.evaluate(() => document.fonts.ready);
  await p.locator(sel).screenshot({ path: path.join(out, `${name}.png`), ...opts });
  await fs.rm(f);
}
await shot('profile', profile, '.profile');
await shot('logo-dark', `<div class="logoBox" style="background:${BRAND.ink};color:#fff">${logo(4)}</div>`, '.logoBox');
await shot('logo-light', `<div class="logoBox" style="background:${BRAND.paper};color:${BRAND.ink}">${logo(4)}</div>`, '.logoBox');
await shot('brand-sheet', sheet, '.sheet');
await browser.close();
console.log('brand assets →', out);
