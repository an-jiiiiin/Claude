// -ISH 릴스: KFC × 어벤져스: 둠스데이 — 빌런 닥터 둠 콜라보 (100개국)
// 근거: posts/2026-11-28-pm/content.json 의 sources
import { page, BRAND, logo } from '../../src/templates.mjs';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

export const duration = 20;
export const posterAt = 2.4;
const { ink, sky, mag } = BRAND;
const deep = '#0B72C9';
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const img = (p) => pathToFileURL(path.join(ROOT, p)).href;
const G = '#3DDC84';

const css = `
html,body{margin:0;background:${ink}}
.stage{width:1080px;height:1920px;position:relative;overflow:hidden;background:${ink};font-family:'Pretendard';color:#fff;letter-spacing:-0.03em;word-break:keep-all}
.bg{position:absolute;inset:0;background:radial-gradient(90% 60% at 80% 10%, rgba(92,211,255,.16), transparent 60%),radial-gradient(70% 50% at 10% 90%, rgba(255,30,200,.12), transparent 60%)}
.grid{position:absolute;inset:0;opacity:.07;background-image:linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px);background-size:90px 90px}
.sc{position:absolute;inset:0;opacity:0}
.top{position:absolute;top:110px;left:70px;right:70px;display:flex;justify-content:space-between;align-items:center;z-index:9}
.top .d{font-weight:700;font-size:30px;opacity:.85}
.chip{display:inline-flex;align-items:center;gap:10px;font-weight:900;font-size:40px;padding:14px 26px 13px;border-radius:999px;background:#fff;color:${ink};box-shadow:5px 5px 0 #000}
.chip.dark{background:${ink};color:#fff;border:3px solid #fff;box-shadow:none}
.chip.hot{background:${sky};box-shadow:5px 5px 0 #000,0 0 30px rgba(92,211,255,.6)}
.sticker{display:inline-block;font-family:'Black Han Sans';font-size:92px;line-height:1;padding:22px 34px 16px;background:${sky};color:${ink};box-shadow:10px 10px 0 #000,0 0 60px rgba(92,211,255,.45)}
.h1{font-weight:900;font-size:112px;line-height:1.16;letter-spacing:-0.05em}
.h1 em,.h2 em{font-style:normal;color:${sky};text-shadow:0 0 30px rgba(92,211,255,.55)}
.badge{display:inline-flex;align-items:center;gap:12px;font-weight:800;font-size:36px;padding:12px 26px;border-radius:999px;background:${sky};color:${ink}}
.badge::before{content:'';width:14px;height:14px;border-radius:50%;background:${ink}}
.lbl{font-weight:800;font-size:40px;color:${sky};margin-bottom:22px}
.h2{font-weight:900;font-size:84px;line-height:1.2;letter-spacing:-0.045em}
.tl{position:absolute;left:150px;top:720px;width:6px;height:0;background:linear-gradient(${mag},${sky});border-radius:3px}
.ev{position:absolute;left:110px;display:flex;align-items:flex-start;gap:40px;opacity:0}
.ev i{flex:none;width:86px;height:86px;border-radius:50%;background:${ink};border:6px solid var(--c);box-shadow:0 0 30px var(--c)}
.ev .y{font-weight:900;font-size:52px;color:var(--c)}
.ev .t{font-size:40px;font-weight:600;color:rgba(255,255,255,.88);margin-top:6px;line-height:1.4}
.big{font-weight:900;font-size:150px;letter-spacing:-0.05em;line-height:1;font-variant-numeric:tabular-nums}
.it{position:absolute;left:70px;right:70px;display:flex;gap:30px;align-items:flex-start;background:#1b1c22;border-radius:26px;padding:36px 40px;border:2px solid rgba(255,255,255,.08);opacity:0}
.it .n{flex:none;width:72px;height:72px;border-radius:50%;background:${sky};color:${ink};font-weight:900;font-size:38px;display:flex;align-items:center;justify-content:center}
.it .t{font-weight:900;font-size:46px;margin-bottom:6px}
.it .s{font-size:34px;color:rgba(255,255,255,.75);line-height:1.45;font-weight:500}
.it.no .n{background:${mag};color:#fff}
.say{display:inline-block;background:#fff;border:4px solid #111;color:#111;font-weight:800;font-size:40px;padding:16px 26px;box-shadow:6px 6px 0 #000}
.say em{font-style:normal;color:${deep}}
.src{position:absolute;left:70px;right:70px;bottom:90px;font-size:24px;opacity:.55;line-height:1.5}
.stamp{display:inline-block;font-family:'Black Han Sans';font-size:64px;padding:10px 22px 6px;border:7px solid ${mag};color:${mag};transform:rotate(-8deg);opacity:0}
.stamp.ok{border-color:${sky};color:${sky}}

.row{position:absolute;left:70px;right:70px}
.row .k{font-weight:800;font-size:42px;color:rgba(255,255,255,.8);margin-bottom:10px}
.row .v{font-weight:900;font-size:120px;letter-spacing:-0.05em;line-height:1;font-variant-numeric:tabular-nums}
.row .v small{font-size:54px;font-weight:800;opacity:.8;margin-left:8px}
.bl{display:flex;align-items:center;gap:22px;margin-top:16px}
.bl .l{width:190px;flex:none;font-size:32px;font-weight:700;color:rgba(255,255,255,.75)}
.bl .b{height:78px;border-radius:12px;width:0}
.bl .n{font-weight:900;font-size:48px;white-space:nowrap;opacity:0}
.gap{font-weight:900;font-size:46px;color:${sky};margin:14px 0 0 212px;opacity:0}

.stk-row{display:flex;align-items:center;gap:20px;margin-bottom:26px}
.stk-row .nm{width:300px;flex:none;font-size:42px;font-weight:800}
.stk-row .bb{height:70px;border-radius:10px;width:0}
.stk-row .pc{font-weight:900;font-size:50px;white-space:nowrap;opacity:0;font-variant-numeric:tabular-nums}
svg text{font-family:'Pretendard';font-weight:900}
`;

const body = `<div class="stage">
  <div class="bg"></div><div class="grid"></div>
  <div class="top"><span>${logo(1.6)}</span><span class="d">11.28 SAT · -ISH 콜라보</span></div>

  <div class="sc" id="s1">
    <div id="s1img" style="position:absolute;top:240px;left:0;width:1080px;height:1100px;background:url('${img('posts/2026-11-28-pm/images/00-cover.jpg')}') center 40%/cover"></div>
    <div style="position:absolute;inset:0;background:linear-gradient(180deg,${ink} 0%,rgba(14,14,16,0) 20%,rgba(14,14,16,0) 42%,rgba(14,14,16,.95) 62%,${ink} 100%)"></div>
    <div id="s1chips" style="position:absolute;top:260px;left:70px;display:flex;gap:16px"><span class="chip hot">100개국</span><span class="chip dark">1/4까지</span></div>
    <div id="s1stk" style="position:absolute;top:420px;right:70px;transform:rotate(4deg)"><span class="sticker" style="background:${G}">빌런 콜라보</span></div>
    <div style="position:absolute;left:70px;right:70px;top:1060px">
      <div id="s1badge"><span class="badge">-ISH · 콜라보</span></div>
      <div class="h1" id="s1t1" style="margin-top:36px">치킨집이</div>
      <div class="h1" id="s1t2"><em style="color:${G};text-shadow:0 0 30px rgba(61,220,132,.55)">빌런 편</em>에 섰다</div>
    </div>
    <div class="src" style="bottom:300px">사진 | KFC 글로벌 보도자료 (글로벌 메뉴 이미지)</div>
  </div>

  <div class="sc" id="s2">
    <div style="position:absolute;top:260px;left:70px;right:70px"><div class="lbl">KFC × 어벤져스: 둠스데이</div><div class="h2">히어로 말고<br><em style="color:${G}">닥터 둠</em></div></div>
    <div id="flip" style="position:absolute;left:140px;top:700px;width:800px;height:420px;border-radius:40px;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:120px;letter-spacing:-0.04em">빨강 → ?</div>
    <div id="cnt" style="position:absolute;left:70px;right:70px;top:1220px;text-align:center;font-weight:900;font-size:110px;opacity:0"><span id="n100">0</span><span style="font-size:56px">개국</span></div>
    <div id="cntS" style="position:absolute;left:70px;right:70px;top:1360px;text-align:center;font-size:38px;opacity:0;color:rgba(255,255,255,.8)">KFC 역사상 최대 글로벌 협업</div>
  </div>

  <div class="sc" id="s3">
    <div style="position:absolute;top:260px;left:70px;right:70px"><div class="lbl">한국판 메뉴</div><div class="h2">검정 + 초록<br><em style="color:${G}">둠 시리즈 5종</em></div></div>
    ${['둠징거', '둠트리플다운', '둠프라이', '둠너겟', '둠에그타르트'].map((m, i) => `<div class="it" id="m${i}" style="top:${620 + i * 170}px;padding:26px 40px"><span class="n" style="background:${G};color:#111">${i + 1}</span><div><div class="t" style="margin:6px 0 0">${m}</div></div></div>`).join('')}
  </div>

  <div class="sc" id="s4">
    <div style="position:absolute;top:260px;left:70px;right:70px"><div class="lbl">건대입구역점</div><div class="h2">매장이 통째로<br><em style="color:${G}">초록</em>이 됐다</div></div>
    <div class="it" id="w1" style="top:620px"><span class="n" style="background:${G};color:#111">1</span><div><div class="t">UV로 숨은 서명 찾기</div><div class="s">→ ‘닥터 둠 계약 인증서’</div></div></div>
    <div class="it" id="w2" style="top:860px"><span class="n" style="background:${G};color:#111">2</span><div><div class="t">앱 가입 + 메뉴 구매 인증</div><div class="s">→ 가챠 ‘둠 드롭’</div></div></div>
    <div class="it" id="w3" style="top:1100px"><span class="n" style="background:${G};color:#111">3</span><div><div class="t">공식 굿즈 10종 전시</div><div class="s">테마 매장은 12월 27일까지</div></div></div>
  </div>

  <div class="sc" id="s5">
    <div style="position:absolute;top:420px;left:70px;right:70px">
      <div class="lbl">KNOW-ISH 한 줄 정리</div>
      <div class="h2" style="font-size:100px">요즘 콜라보는<br><em style="color:${G}">빌런</em>이<br>더 잘 팔린다?</div>
      <div style="margin-top:60px;font-size:38px;line-height:1.6;color:rgba(255,255,255,.75);font-weight:500">둠 시리즈는 1월 4일까지.<br>둠징거 세트 1만2000원.</div>
    </div>
    <div style="position:absolute;bottom:330px;left:70px;display:flex;gap:18px"><span class="chip hot">저장해두고 다시 보기</span><span class="chip" style="background:transparent;color:#fff;border:3px solid rgba(255,255,255,.4);box-shadow:none">@knowish.mag</span></div>
    <div class="src">자료: KFC 글로벌 발표(11/4), MTN·아이뉴스24(11/17), 비즈워치(11/16)</div>
  </div>
</div>
<script>
const $ = (s) => document.querySelector(s);
const cl = (x) => Math.max(0, Math.min(1, x));
const eo = (x) => 1 - Math.pow(1 - cl(x), 3);
const pop = (x) => { x = cl(x); return x < 1 ? 1 + 2.2 * Math.pow(x - 1, 3) + 1.2 * Math.pow(x - 1, 2) : 1; };
const span = (t, a, b) => cl((t - a) / (b - a));
function scene(el, t, a, b, f = 0.35) { el.style.opacity = Math.min(span(t, a, a + f), 1 - span(t, b - f, b)); }
function rise(el, p, dy = 60) { el.style.opacity = eo(p); el.style.transform = 'translateY(' + (1 - eo(p)) * dy + 'px)'; }
const lerp = (a, b, p) => Math.round(a + (b - a) * p);
window.setT = (t) => {
  scene($('#s1'), t, 0, 4.0);
  $('#s1img').style.transform = 'scale(' + (1.12 - 0.12 * eo(span(t, 0, 4))) + ')';
  rise($('#s1chips'), span(t, 0.2, 0.7), 30);
  $('#s1stk').style.opacity = cl(span(t, 0.6, 0.8)); $('#s1stk').style.transform = 'rotate(4deg) scale(' + pop(span(t, 0.6, 1.2)) + ')';
  rise($('#s1badge'), span(t, 1.0, 1.4)); rise($('#s1t1'), span(t, 1.2, 1.7)); rise($('#s1t2'), span(t, 1.6, 2.1));

  scene($('#s2'), t, 3.8, 8.8);
  const fp = eo(span(t, 5.0, 5.8)); const f = $('#flip');
  f.style.background = 'rgb(' + lerp(228, 61, fp) + ',' + lerp(0, 220, fp) + ',' + lerp(43, 132, fp) + ')';
  f.style.color = fp > .5 ? '#111' : '#fff'; f.textContent = fp > .5 ? '초록 💚' : '빨강 ❤️';
  f.style.transform = 'rotateY(' + (Math.sin(fp * Math.PI) * 25) + 'deg) scale(' + pop(span(t, 4.2, 4.8)) + ')';
  $('#cnt').style.opacity = cl(span(t, 6.0, 6.3)); $('#n100').textContent = Math.round(100 * eo(span(t, 6.0, 7.2)));
  $('#cntS').style.opacity = cl(span(t, 7.0, 7.4));

  scene($('#s3'), t, 8.6, 13.4);
  for (let i = 0; i < 5; i++) rise($('#m' + i), span(t, 9.0 + i * 0.5, 9.5 + i * 0.5), 70);

  scene($('#s4'), t, 13.2, 17.8);
  rise($('#w1'), span(t, 13.6, 14.1), 70); rise($('#w2'), span(t, 14.4, 14.9), 70); rise($('#w3'), span(t, 15.2, 15.7), 70);

  scene($('#s5'), t, 17.6, 20.4);
};
window.setT(0);
</script>`;

export const html = page(body, css);
