// 브랜드 에셋 렌더: 프로필(하늘/마젠타 배경), 로고, 브랜드 시트, 인스타 프로필 목업
// 사용: node src/brand.mjs   (onoff 폴더에서, 샘플 카드 렌더 후 실행)
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
import fs from 'node:fs/promises';
import path from 'node:path';
import { page, logo, BRAND } from './templates.mjs';

const { ink, sky, mag, paper } = BRAND;

const extra = `
.L{position:relative;display:inline-flex;flex-direction:column;align-items:flex-start;white-space:nowrap;--s:1}
.L .k{display:inline-block;background:var(--kb);color:var(--kt);font-weight:900;letter-spacing:-0.05em;line-height:1;
  font-size:calc(64px*var(--s));padding:calc(10px*var(--s)) calc(18px*var(--s)) calc(6px*var(--s));transform:rotate(-3deg);
  box-shadow:calc(6px*var(--s)) calc(6px*var(--s)) 0 var(--sh), calc(6px*var(--s)) calc(6px*var(--s)) 0 calc(2px*var(--s)) #fff}
.L .i{position:relative;align-self:flex-end;margin-top:calc(-6px*var(--s));margin-right:calc(-24px*var(--s));
  background:var(--ib);color:#fff;transform:rotate(8deg);border:calc(4px*var(--s)) solid #fff;border-radius:calc(10px*var(--s));
  box-shadow:calc(5px*var(--s)) calc(5px*var(--s)) 0 ${ink};font-weight:900;font-style:italic;letter-spacing:-0.03em;line-height:1;
  font-size:calc(58px*var(--s));padding:calc(8px*var(--s)) calc(20px*var(--s)) calc(6px*var(--s))}
.prof{width:1080px;height:1080px;display:flex;align-items:center;justify-content:center;font-family:'Pretendard'}
.logoBox{padding:60px 80px;display:inline-block}

/* sheet */
.sheet{width:1600px;background:${paper};padding:90px;font-family:'Pretendard';color:${ink};letter-spacing:-0.02em}
.sheet h1{font-size:28px;font-weight:800;letter-spacing:.12em;color:#6B6B70;margin-bottom:26px}
.sheet .row{display:flex;gap:36px;align-items:stretch;margin-bottom:76px}
.sheet .hero{flex:1.3;background:${ink};color:#fff;border-radius:28px;padding:70px;display:flex;flex-direction:column;justify-content:space-between;gap:50px}
.sheet .hero p{font-size:32px;line-height:1.6;color:rgba(255,255,255,.82);font-weight:500}
.sheet .hero p .a{color:${sky};font-weight:800}.sheet .hero p .b{color:${mag};font-weight:800}
.sheet .pfs{display:flex;flex-direction:column;gap:20px;align-items:center;justify-content:center}
.sheet .pf{width:250px;height:250px;border-radius:50%;overflow:hidden}
.sheet .pf img{width:100%;height:100%}
.sheet .pfs small{font-size:20px;color:#6B6B70;font-weight:600}
.sheet .sw{flex:1;border-radius:22px;padding:30px;height:280px;display:flex;flex-direction:column;justify-content:flex-end;font-weight:800;font-size:30px}
.sheet .sw small{display:block;font-weight:500;font-size:19px;margin-top:6px;opacity:.8}
.sheet .ser{flex:1;border-radius:28px;padding:56px}
.sheet .ser .t{font-size:28px;font-weight:800;opacity:.85}
.sheet .ser .h{font-size:64px;font-weight:900;margin:16px 0 22px;letter-spacing:-0.04em}
.sheet .ser p{font-size:27px;line-height:1.6}
.sheet .ty{flex:1;background:#fff;border-radius:22px;padding:48px}
.sheet .ty .a{font-size:80px;font-weight:900;letter-spacing:-0.045em;line-height:1.1}
.sheet .ty .b{font-family:'Black Han Sans';font-size:80px;line-height:1.1}
.sheet .ty small{display:block;font-size:22px;color:#6B6B70;margin-top:18px;line-height:1.5}
.sheet .rule{flex:1;background:#fff;border-radius:22px;padding:40px 44px;font-size:25px;line-height:1.7}
.sheet .rule b{font-weight:800}

/* instagram mock */
.ig{width:900px;background:#fff;font-family:'Pretendard';color:#111;padding:50px 0 0}
.ig .hd{display:flex;gap:56px;align-items:center;padding:0 60px 36px}
.ig .av{width:190px;height:190px;border-radius:50%;overflow:hidden;flex:none;box-shadow:0 0 0 5px #fff,0 0 0 8px #e3e3e3}
.ig .av img{width:100%;height:100%}
.ig .nm{font-size:34px;font-weight:700;margin-bottom:10px}
.ig .sub{font-size:21px;color:#333;margin-bottom:14px}
.ig .st{display:flex;gap:30px;font-size:21px;margin-bottom:16px}
.ig .st b{font-weight:800}
.ig .bio{font-size:21px;line-height:1.55;color:#222}
.ig .btn{display:flex;gap:10px;padding:0 60px 30px}
.ig .btn span{flex:1;text-align:center;padding:14px;border-radius:10px;font-size:20px;font-weight:700;background:#efefef}
.ig .btn span.f{background:#4f5bf5;color:#fff}
.ig .hl{display:flex;gap:30px;padding:0 60px 30px}
.ig .hl div{display:flex;flex-direction:column;align-items:center;gap:8px;font-size:17px;font-weight:600}
.ig .hl i{width:100px;height:100px;border-radius:50%;box-shadow:0 0 0 4px #fff,0 0 0 6px #ddd;display:flex;align-items:center;justify-content:center;font-style:normal;font-weight:900;font-size:22px}
.ig .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:3px;border-top:1px solid #eee}
.ig .grid div{aspect-ratio:4/5;background-size:cover;background-position:center}
`;

const A2 = (bg) => {
  const o = bg === 'sky' ? { kb: ink, kt: '#fff', sh: '#fff', ib: mag } : { kb: sky, kt: ink, sh: ink, ib: ink };
  return `<span class="L" style="--s:3.3;margin-right:30px;--kb:${o.kb};--kt:${o.kt};--sh:${o.sh};--ib:${o.ib}"><span class="k">KNOW</span><span class="i">-ish</span></span>`;
};
const PROFILES = { sky: sky, mag: mag };

const sw = (bg, fg, name, hex, role, border) =>
  `<div class="sw" style="background:${bg};color:${fg};${border ? 'box-shadow:inset 0 0 0 2px #ddd' : ''}">${name}<small>${hex} · ${role}</small></div>`;

const sheet = `<div class="sheet">
  <h1>KNOW-ISH · 노이쉬 · @know.ish</h1>
  <div class="row">
    <div class="hero">${logo(3)}<p>우리, 아는 척 좀 해봅시다.<br>아침엔 <span class="a">KNOW</span> — 시사·경제를 제대로 알고,<br>오후엔 <span class="b">-ISH</span> — 마케팅·트렌드로 센스 있게 아는 척.</p></div>
    <div class="pfs"><div class="pf"><img src="profile-sky.png"></div><small>프로필 ② 하늘 배경</small><div class="pf"><img src="profile-mag.png"></div><small>프로필 ③ 마젠타 배경</small></div>
  </div>
  <h1>COLOR</h1>
  <div class="row">
    ${sw(sky, ink, 'Neon Sky', sky, '메인 · KNOW · 검정 글씨')}
    ${sw(mag, '#fff', 'Neon Magenta', mag, '포인트 · -ISH · 흰 글씨')}
    ${sw(ink, '#fff', 'Ink', ink, '썸네일·아웃트로 바탕')}
    ${sw(paper, ink, 'Paper', paper, '본문 바탕', true)}
  </div>
  <div class="row">
    <div class="rule"><b>글씨 규칙</b><br>하늘 위에는 <b>검정</b>(대비 11:1)<br>마젠타 위에는 <b>굵은 흰 글씨</b>, 큰 글자만<br>종이 위 강조 글씨는 진한 톤 <b style="color:#0B72C9">#0B72C9</b> · <b style="color:#D1009E">#D1009E</b></div>
    <div class="rule"><b>피할 것</b><br>라임·연두 (같은 분야 BARK와 겹침)<br>검정 원 + 형광 글자 프로필 (BARK·2EZ 구조)<br>마젠타 바탕 위 검정 글씨</div>
  </div>
  <h1>SERIES</h1>
  <div class="row">
    <div class="ser" style="background:${sky};color:${ink}"><div class="t">AM 08:00 · DEEP</div><div class="h">KNOW 시사·경제</div><p>금리, 환율, 정책, 정치 이슈.<br>숫자와 맥락으로 “왜”까지 설명한다.<br>카드 7~9장 · 실사 + 출처 필수</p></div>
    <div class="ser" style="background:${mag};color:#fff"><div class="t">PM 18:00 · LIGHT</div><div class="h">-ISH 마케팅</div><p>캠페인, 브랜드, 밈, 팝업.<br>재밌게 보고 “포인트” 하나는 챙긴다.<br>카드 5~7장 · 실사 + 출처 / 이모지 AI 가능</p></div>
  </div>
  <h1>TYPE</h1>
  <div class="row">
    <div class="ty"><div class="a">Pretendard Black</div><small>로고 · 썸네일 헤드라인 · 본문(Medium 34px / 행간 1.66)</small></div>
    <div class="ty"><div class="b">블랙한산스 스티커</div><small>썸네일 스티커 문구 전용 (한 줄, 8자 이내)</small></div>
  </div>
</div>`;

const igMock = (key, covers) => `<div class="ig">
  <div class="hd"><div class="av"><img src="profile-${key}.png"></div>
    <div><div class="nm">know.ish</div><div class="sub">노이쉬 | 시사·경제·마케팅 인사이트</div>
      <div class="st"><span>게시물 <b>6</b></span><span>팔로워 <b>0</b></span><span>팔로우 <b>0</b></span></div>
      <div class="bio">우리, 아는 척 좀 해봅시다 🤓<br>☀️ AM 8시 KNOW — 시사·경제 제대로 알기<br>🌙 PM 6시 -ISH — 마케팅·트렌드 센스 있게</div></div></div>
  <div class="btn"><span class="f">팔로우</span><span>메시지 보내기</span></div>
  <div class="hl"><div><i style="background:${sky}">KNOW</i>시사·경제</div><div><i style="background:${mag};color:#fff">-ISH</i>마케팅</div><div><i style="background:${ink};color:${sky}">Q&A</i>질문</div></div>
  <div class="grid">${covers.map((c) => `<div style="background-image:url('${c}')"></div>`).join('')}</div>
</div>`;

const out = path.resolve('brand');
await fs.mkdir(out, { recursive: true });
const browser = await chromium.launch();
const p = await browser.newPage({ viewport: { width: 1600, height: 1200 } });
async function shot(name, html, sel) {
  const f = path.join(out, `_${name}.html`);
  await fs.writeFile(f, page(html, extra));
  await p.goto('file://' + f);
  await p.evaluate(() => document.fonts.ready);
  await p.locator(sel).screenshot({ path: path.join(out, `${name}.png`) });
  await fs.rm(f);
}
for (const [k, bg] of Object.entries(PROFILES)) await shot(`profile-${k}`, `<div class="prof" style="background:${bg}">${A2(k)}</div>`, '.prof');
await shot('logo-dark', `<div class="logoBox" style="background:${ink}">${logo(4)}</div>`, '.logoBox');
await shot('logo-light', `<div class="logoBox" style="background:${paper}">${logo(4)}</div>`, '.logoBox');
await shot('brand-sheet', sheet, '.sheet');

// 인스타 프로필 목업: 그리드 최신순 (오후 → 오전 → 데모)
const rel = (f) => path.relative(out, path.resolve(f));
const covers = [
  'samples/2026-11-19-pm/2026-11-19-pm-01.png', 'samples/2026-11-19-am/2026-11-19-am-01.png',
  'samples/demo/demo-pm-01.png', 'samples/demo/demo-am-01.png', 'samples/demo/demo-pm2-01.png', 'samples/demo/demo-am2-01.png',
].map(rel);
for (const k of Object.keys(PROFILES)) await shot(`ig-mock-${k}`, igMock(k, covers), '.ig');
await browser.close();
console.log('brand assets →', out);
