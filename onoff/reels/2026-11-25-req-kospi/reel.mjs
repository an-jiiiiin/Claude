// KNOW 속보 릴스: 코스피 5000 탈환 하루 만에 -6.16% (2026-11-25 마감)
// 근거: 한국거래소 마감 수치(이투데이·뉴스핌·국제뉴스 11/25 보도)
import { page, BRAND } from '../../src/templates.mjs';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

export const duration = 20;
export const posterAt = 2.4;
const { ink, sky, mag } = BRAND;
const deep = '#0B72C9';
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');

const css = `
html,body{margin:0;background:${ink}}
.stage{width:1080px;height:1920px;position:relative;overflow:hidden;background:${ink};font-family:'Pretendard';color:#fff;letter-spacing:-0.03em;word-break:keep-all}
.bg{position:absolute;inset:0;background:radial-gradient(90% 60% at 80% 10%, rgba(92,211,255,.16), transparent 60%),radial-gradient(70% 50% at 10% 90%, rgba(255,30,200,.12), transparent 60%)}
.grid{position:absolute;inset:0;opacity:.07;background-image:linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px);background-size:90px 90px}
.sc{position:absolute;inset:0;opacity:0}
.top{position:absolute;top:110px;left:70px;right:70px;display:flex;justify-content:space-between;align-items:center;z-index:9}
.top .d{font-weight:700;font-size:30px;opacity:.85}
.logo{display:inline-flex;align-items:center;line-height:1}
.logo .kn{background:${sky};color:${ink};font-weight:900;letter-spacing:-0.05em;font-size:44px;padding:8px 14px 6px;transform:rotate(-3deg);box-shadow:4px 4px 0 #000,4px 4px 0 2px #fff}
.logo .ish{background:${mag};color:#fff;font-weight:900;font-style:italic;font-size:38px;padding:7px 14px 6px;margin-left:-6px;border:3px solid #fff;border-radius:8px;transform:rotate(6deg) translateY(6px);box-shadow:4px 4px 0 #000}
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
  <div class="top"><span class="logo"><span class="kn">KNOW</span><span class="ish">-ish</span></span><span class="d">11.25 WED · 속보 · KNOW 증시</span></div>

  <div class="sc" id="s1">
    <div id="s1chips" style="position:absolute;top:260px;left:70px;display:flex;gap:16px"><span class="chip hot">-6.16%</span><span class="chip"><i style="width:16px;height:16px;border-radius:50%;background:#FF2D2D;box-shadow:0 0 12px #FF2D2D;display:block"></i>매도 사이드카</span></div>
    <div id="s1stk" style="position:absolute;top:470px;right:70px;transform:rotate(4deg)"><span class="sticker" style="background:${mag};color:#fff">하루 만에</span></div>
    <div id="s1big" style="position:absolute;left:70px;top:700px;font-weight:900;font-size:260px;letter-spacing:-0.06em;color:${mag};text-shadow:0 0 60px rgba(255,30,200,.5);font-variant-numeric:tabular-nums">-6.16%</div>
    <div style="position:absolute;left:70px;right:70px;top:1060px">
      <div id="s1badge"><span class="badge">KNOW · 증시</span></div>
      <div class="h1" id="s1t1" style="margin-top:36px">코스피 5000 탈환</div>
      <div class="h1" id="s1t2"><em>하루 만에</em> 폭락</div>
    </div>
  </div>

  <div class="sc" id="s2">
    <div style="position:absolute;top:260px;left:70px;right:70px"><div class="lbl">사흘간의 코스피 (종가를 이은 선)</div><div class="h2">+6% 다음 날<br><em style="color:${mag}">-6%</em></div></div>
    <svg width="1080" height="900" style="position:absolute;top:640px;left:0" viewBox="0 0 1080 900">
      <polyline id="ln" points="170,600 540,170 910,620" fill="none" stroke="url(#gr)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1400" stroke-dashoffset="1400"/>
      <defs><linearGradient id="gr" x1="0" x2="1"><stop offset="0" stop-color="${sky}"/><stop offset=".5" stop-color="${sky}"/><stop offset=".55" stop-color="${mag}"/><stop offset="1" stop-color="${mag}"/></linearGradient></defs>
      <g id="p1" opacity="0"><circle cx="170" cy="600" r="22" fill="#fff"/><text x="170" y="700" fill="#fff" font-size="54" text-anchor="middle">4,708</text><text x="170" y="760" fill="rgba(255,255,255,.6)" font-size="34" text-anchor="middle">11/23</text></g>
      <g id="p2" opacity="0"><circle cx="540" cy="170" r="22" fill="${sky}"/><text x="540" y="115" fill="${sky}" font-size="64" text-anchor="middle">5,006</text><text x="540" y="45" fill="rgba(255,255,255,.75)" font-size="34" text-anchor="middle">11/24 · +6.32%</text></g>
      <g id="p3" opacity="0"><circle cx="910" cy="620" r="22" fill="${mag}"/><text x="910" y="720" fill="${mag}" font-size="64" text-anchor="middle">4,697</text><text x="910" y="780" fill="rgba(255,255,255,.75)" font-size="34" text-anchor="middle">11/25 · -6.16%</text></g>
    </svg>
    <div id="s2say" style="position:absolute;top:1520px;left:70px;transform:rotate(-2deg);opacity:0"><span class="say">사이드카 <em>매수 → 매도</em>, 이틀 연속</span></div>
  </div>

  <div class="sc" id="s3">
    <div style="position:absolute;top:260px;left:70px;right:70px"><div class="lbl">반도체가 끌어내렸다</div><div class="h2">삼성전자 시총<br><em style="color:${mag}">1000조 원</em> 붕괴</div></div>
    <div style="position:absolute;top:680px;left:70px;right:70px">
      <div class="stk-row"><span class="nm">삼성전기</span><div class="bb" id="k1" style="background:${mag}"></div><span class="pc" id="q1">-12.00%</span></div>
      <div class="stk-row"><span class="nm">SK스퀘어</span><div class="bb" id="k2" style="background:${mag}"></div><span class="pc" id="q2">-11.19%</span></div>
      <div class="stk-row"><span class="nm">SK하이닉스</span><div class="bb" id="k3" style="background:${mag}"></div><span class="pc" id="q3">-11.05%</span></div>
      <div class="stk-row"><span class="nm">삼성전자</span><div class="bb" id="k4" style="background:${mag}"></div><span class="pc" id="q4">-9.87%</span></div>
      <div class="stk-row" style="margin-top:50px"><span class="nm">삼성바이오</span><div class="bb" id="k5" style="background:${sky}"></div><span class="pc" id="q5" style="color:${sky}">+5.66%</span></div>
      <div class="stk-row"><span class="nm">셀트리온</span><div class="bb" id="k6" style="background:${sky}"></div><span class="pc" id="q6" style="color:${sky}">+3.83%</span></div>
    </div>
    <div class="src" style="bottom:330px">삼성전자 17만 700원 · SK하이닉스 103만 원 (11/25 종가)</div>
  </div>

  <div class="sc" id="s4">
    <div style="position:absolute;top:260px;left:70px;right:70px"><div class="lbl" style="color:${mag}">왜 빠졌나</div><div class="h2">젠슨 황 효과,<br><em style="color:${mag}">하루 만에 소멸</em></div></div>
    <div class="it no" id="w1" style="top:620px"><span class="n">1</span><div><div class="t">AI 투자 수익성 우려</div><div class="s">메모리 공급 과잉 우려까지 겹쳐</div></div></div>
    <div class="it no" id="w2" style="top:860px"><span class="n">2</span><div><div class="t">미국 반도체주 동반 급락</div><div class="s">엔비디아 -5.86% · 마이크론 -11.01%</div></div></div>
    <div class="it no" id="w3" style="top:1100px"><span class="n">3</span><div><div class="t">외국인 다시 ‘팔자’</div><div class="s">1조 9천억 원 이상 순매도, 개인이 받아내</div></div></div>
  </div>

  <div class="sc" id="s5">
    <div style="position:absolute;top:420px;left:70px;right:70px">
      <div class="lbl">KNOW-ISH 한 줄 정리</div>
      <div class="h2" style="font-size:100px">+6% 하루,<br>-6% 하루.<br><em>변동성</em>이 뉴스다</div>
      <div style="margin-top:60px;font-size:38px;line-height:1.6;color:rgba(255,255,255,.75);font-weight:500">AI·반도체 우려가 풀리기 전까진<br>하루 단위 급등락에 주의.</div>
    </div>
    <div style="position:absolute;bottom:330px;left:70px;display:flex;gap:18px"><span class="chip hot">저장해두고 다시 보기</span><span class="chip" style="background:transparent;color:#fff;border:3px solid rgba(255,255,255,.4);box-shadow:none">@knowish.mag</span></div>
    <div class="src">자료: 한국거래소 마감 수치(이투데이·뉴스핌·국제뉴스 11/25) · 투자 권유가 아닌 정보 제공용입니다</div>
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
function bar(id, qid, v, p) { $(id).style.width = (v * 50 * eo(p)) + 'px'; $(qid).style.opacity = cl((p - 0.6) * 3); }
window.setT = (t) => {
  scene($('#s1'), t, 0, 4.0);
  rise($('#s1chips'), span(t, 0.2, 0.7), 30);
  $('#s1stk').style.opacity = cl(span(t, 0.6, 0.8)); $('#s1stk').style.transform = 'rotate(4deg) scale(' + pop(span(t, 0.6, 1.2)) + ')';
  $('#s1big').style.opacity = cl(span(t, 0.3, 0.6)); $('#s1big').style.transform = 'scale(' + pop(span(t, 0.3, 1.0)) + ')';
  rise($('#s1badge'), span(t, 1.0, 1.4)); rise($('#s1t1'), span(t, 1.2, 1.7)); rise($('#s1t2'), span(t, 1.6, 2.1));

  scene($('#s2'), t, 3.8, 8.8);
  $('#p1').setAttribute('opacity', cl(span(t, 4.2, 4.5)));
  $('#ln').setAttribute('stroke-dashoffset', 1400 * (1 - 0.47 * eo(span(t, 4.5, 5.5)) - 0.53 * eo(span(t, 5.9, 7.0))));
  $('#p2').setAttribute('opacity', cl(span(t, 5.3, 5.6)));
  $('#p3').setAttribute('opacity', cl(span(t, 6.8, 7.1)));
  $('#s2say').style.opacity = cl(span(t, 7.4, 7.6)); $('#s2say').style.transform = 'rotate(-2deg) scale(' + pop(span(t, 7.4, 7.9)) + ')';

  scene($('#s3'), t, 8.6, 13.8);
  bar('#k1', '#q1', 12.00, span(t, 9.0, 9.8)); bar('#k2', '#q2', 11.19, span(t, 9.3, 10.1));
  bar('#k3', '#q3', 11.05, span(t, 9.6, 10.4)); bar('#k4', '#q4', 9.87, span(t, 9.9, 10.7));
  bar('#k5', '#q5', 5.66, span(t, 11.0, 11.7)); bar('#k6', '#q6', 3.83, span(t, 11.3, 12.0));

  scene($('#s4'), t, 13.6, 17.8);
  rise($('#w1'), span(t, 14.0, 14.5), 70); rise($('#w2'), span(t, 14.7, 15.2), 70); rise($('#w3'), span(t, 15.4, 15.9), 70);

  scene($('#s5'), t, 17.6, 20.4);
};
window.setT(0);
</script>`;

export const html = page(body, css);
