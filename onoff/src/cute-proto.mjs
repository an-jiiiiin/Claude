// 아기자기(스크랩북) 스타일 시안 3장 — 엔비디아 게시물로 시연
// node src/cute-proto.mjs → samples/cute-demo/0N.png + compare.png
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { page, BRAND } from './templates.mjs';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const nm = (p) => pathToFileURL(path.join(ROOT, 'node_modules', p)).href;
const img = pathToFileURL(path.join(ROOT, 'posts/2026-11-23-req-nvidia/images/01-jensen-huang.jpg')).href;
const { ink, sky, mag } = BRAND;
const cream = '#FFF8EC', butter = '#FFE98A', mint = '#BFF0E3', pinkL = '#FFD3EC', skyL = '#CDEFFF';

const fonts = `<style>@import url('${nm('@fontsource/gaegu/700.css')}');@import url('${nm('@fontsource/jua/index.css')}');</style>`;
const css = `
.cc{width:1080px;height:1350px;position:relative;overflow:hidden;background:${cream};font-family:'Pretendard';color:${ink};letter-spacing:-0.02em;word-break:keep-all}
.cc::before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(14,14,16,.06) 2px,transparent 2px),linear-gradient(90deg,rgba(14,14,16,.06) 2px,transparent 2px);background-size:54px 54px}
.hand{font-family:'Gaegu'}
.jua{font-family:'Jua'}
.emo{font-family:'Noto Color Emoji'}
.tape{position:absolute;width:190px;height:54px;background:rgba(255,233,138,.85);transform:rotate(-8deg);box-shadow:0 2px 0 rgba(0,0,0,.05)}
.tape.p{background:rgba(255,30,200,.35)}.tape.s{background:rgba(92,211,255,.45)}
.ep{position:absolute;top:44px;left:50px;display:flex;gap:12px;align-items:center;z-index:5}
.ep .no{font-family:'Jua';font-size:34px;background:${ink};color:${butter};padding:8px 20px 4px;border-radius:999px}
.ep .tag{font-family:'Jua';font-size:30px;background:#fff;border:4px solid ${ink};padding:6px 18px 2px;border-radius:999px}
.logo{position:absolute;top:46px;right:50px;display:flex;align-items:center;z-index:5}
.logo .kn{background:${sky};color:${ink};font-weight:900;font-size:34px;padding:6px 12px 4px;transform:rotate(-3deg);border:3px solid ${ink}}
.logo .ish{background:${mag};color:#fff;font-weight:900;font-style:italic;font-size:30px;padding:5px 11px;margin-left:-4px;border:3px solid ${ink};border-radius:6px;transform:rotate(6deg) translateY(4px)}
.polaroid{position:absolute;background:#fff;padding:22px 22px 90px;box-shadow:0 10px 0 ${ink}, 0 10px 0 4px ${ink};border:4px solid ${ink}}
.polaroid .ph{width:100%;height:100%;background-size:cover;background-position:center 20%}
.polaroid .cap{position:absolute;left:0;right:0;bottom:18px;text-align:center;font-family:'Gaegu';font-size:44px}
.bub{position:absolute;background:#fff;border:5px solid ${ink};border-radius:46px;padding:22px 34px;font-family:'Jua';font-size:46px;line-height:1.25;box-shadow:8px 8px 0 ${ink}}
.bub::after{content:'';position:absolute;bottom:-34px;left:70px;border:18px solid transparent;border-top:22px solid ${ink}}
.title{position:absolute;left:60px;right:60px;bottom:140px;font-family:'Jua';font-size:104px;line-height:1.12;letter-spacing:-0.03em}
.title .hl{background:linear-gradient(transparent 55%, ${butter} 55%);padding:0 6px}
.title .pk{color:${mag}}
.doodle{position:absolute;font-family:'Gaegu';font-size:40px;color:${mag}}
.save{position:absolute;bottom:52px;right:50px;font-family:'Jua';font-size:30px;background:${butter};border:4px solid ${ink};border-radius:16px;padding:10px 20px 6px;transform:rotate(-3deg)}
.swipe{position:absolute;bottom:58px;left:56px;font-family:'Gaegu';font-size:40px}
.paper{position:absolute;background:#fff;border:5px solid ${ink};border-radius:30px;box-shadow:10px 10px 0 ${ink}}
.h2{font-family:'Jua';font-size:76px;line-height:1.15}
.step{display:flex;gap:26px;align-items:flex-start;margin-bottom:34px}
.step .d{flex:none;font-family:'Jua';font-size:34px;padding:10px 18px 6px;border-radius:16px;border:4px solid ${ink}}
.step .t{font-family:'Jua';font-size:46px;line-height:1.2}
.step .s{font-size:32px;line-height:1.45;color:#333;margin-top:6px;font-weight:600}
.stamp{position:absolute;font-family:'Jua';font-size:70px;border:8px solid;padding:8px 22px 2px;border-radius:14px}
.chk{display:flex;gap:20px;align-items:center;font-size:40px;font-weight:700;margin-bottom:26px}
.chk i{flex:none;width:52px;height:52px;border:5px solid ${ink};border-radius:12px;background:#fff;display:flex;align-items:center;justify-content:center;font-style:normal;font-size:40px;color:${mag}}
.next{position:absolute;left:60px;right:60px;bottom:120px;height:360px;border:5px dashed ${ink};border-radius:30px;background:${pinkL};overflow:hidden}
.next .blur{position:absolute;inset:0;filter:blur(14px);font-family:'Jua';font-size:84px;padding:90px 50px;color:${ink};opacity:.55}
.next .lb{position:absolute;top:28px;left:34px;font-family:'Jua';font-size:38px;background:${ink};color:#fff;padding:8px 20px 4px;border-radius:999px}
.next .q{position:absolute;right:40px;bottom:30px;font-family:'Jua';font-size:46px}
`;

const head = (n) => `<div class="ep"><span class="no">EP.${n}</span><span class="tag">아는척 브리핑</span></div><div class="logo"><span class="kn">KNOW</span><span class="ish">-ish</span></div>`;

const s1 = `<div class="cc">
 ${head('07')}
 <div class="polaroid" style="left:300px;top:170px;width:560px;height:640px;transform:rotate(4deg)"><div class="ph" style="background-image:url('${img}')"></div><div class="cap">돌아온 가죽재킷 🧥</div></div>
 <div class="tape" style="left:470px;top:150px"></div>
 <div class="bub" style="left:44px;top:250px;transform:rotate(-4deg)">6일 전엔<br><span style="color:${mag}">“NO”</span>였는데?!</div>
 <div class="doodle" style="left:880px;top:820px;transform:rotate(10deg)">✦ 반전 ✦</div>
 <div class="doodle emo" style="left:90px;top:640px;font-size:96px;transform:rotate(-12deg)">😳</div>
 <div class="title">젠슨 황<br><span class="hl">엔비디아 컴백</span>의<br><span class="pk">진짜 이유</span> 3가지</div>
 <div class="swipe">넘겨서 확인 👉</div>
 <div class="save">📌 저장각</div>
</div>`;

const s2 = `<div class="cc">
 ${head('07')}
 <div class="paper" style="left:60px;right:60px;top:150px;bottom:150px;padding:60px 56px">
   <div class="h2">11일 동안<br>무슨 일이? <span class="emo">🎢</span></div>
   <div style="margin-top:50px">
    <div class="step"><span class="d" style="background:${pinkL}">11/12</span><div><div class="t">자진 사임</div><div class="s">개인적 행동 공개 후 물러남</div></div></div>
    <div class="step"><span class="d" style="background:#eee">11/17</span><div><div class="t">이사회 “복귀 없다”</div><div class="s">후임 찾으려고 헤드헌터까지</div></div></div>
    <div class="step"><span class="d" style="background:${skyL}">11/23</span><div><div class="t">만장일치 컴백!</div><div class="s">면담 + 美 정부 의견 듣고 번복</div></div></div>
   </div>
 </div>
 <div class="stamp" style="right:110px;top:560px;color:${mag};border-color:${mag};transform:rotate(-12deg)">NO</div>
 <div class="stamp" style="right:90px;top:820px;color:#0B72C9;border-color:#0B72C9;transform:rotate(8deg)">YES</div>
 <div class="tape p" style="left:40px;top:130px"></div><div class="tape s" style="right:40px;bottom:130px;transform:rotate(10deg)"></div>
 <div class="swipe" style="bottom:60px">2 / 7</div>
</div>`;

const s3 = `<div class="cc" style="background:${skyL}">
 ${head('07')}
 <div class="paper" style="left:60px;right:60px;top:150px;height:640px;padding:50px 56px">
   <div class="h2" style="font-size:64px">아는 척 체크리스트 <span class="emo">✅</span></div>
   <div style="margin-top:36px">
    <div class="chk"><i>✓</i>“번복 근거는 면담 + 美 정부 의견”</div>
    <div class="chk"><i>✓</i>“크레스는 다시 CFO로”</div>
    <div class="chk"><i>✓</i>“근데 조사는 아직 안 끝났어”</div>
   </div>
   <div class="hand" style="font-size:40px;color:${mag};margin-top:10px">→ 이 세 마디면 회의에서 아는 척 완료 ✌️</div>
 </div>
 <div class="next">
   <div class="lb">다음 EP.08 예고</div>
   <div class="blur">기준금리 3.25%? 내 대출이자 얼마나…</div>
   <div class="q">내일 오전 8시 공개 <span class="emo">🔒</span></div>
 </div>
 <div class="save" style="bottom:40px">📌 저장하고 내일 보기</div>
</div>`;

const out = path.join(ROOT, 'samples/cute-demo');
await fs.mkdir(out, { recursive: true });
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
for (const [i, h] of [s1, s2, s3].entries()) {
  const f = path.join(out, `_s${i}.html`);
  await fs.writeFile(f, page(fonts + h, css));
  await p.goto('file://' + f);
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(400);
  await p.locator('.cc').screenshot({ path: path.join(out, `0${i + 1}.png`) });
  await fs.rm(f);
}
await b.close();
console.log('ok');
