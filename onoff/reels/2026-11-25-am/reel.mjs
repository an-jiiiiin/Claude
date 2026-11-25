// KNOW 릴스: 잠실 래미안아이파크 줍줍 2가구에 5만 3447명 (2026-11-24 청약)
// 근거: posts/2026-11-25-am/content.json 의 sources (뉴시스 11/24, 청약홈·실거래가 공개시스템 인용)
import { page, BRAND } from '../../src/templates.mjs';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

export const duration = 20;
export const posterAt = 2.6;
const { ink, sky, mag } = BRAND;
const deep = '#0B72C9';
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const coverImg = pathToFileURL(path.join(ROOT, 'posts/2026-11-25-am/images/01-jamsil.jpg')).href;

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
`;

const body = `<div class="stage">
  <div class="bg"></div><div class="grid"></div>
  <div class="top"><span class="logo"><span class="kn">KNOW</span><span class="ish">-ish</span></span><span class="d">11.25 WED · KNOW 부동산</span></div>

  <div class="sc" id="s1">
    <div id="s1img" style="position:absolute;top:240px;left:0;width:1080px;height:1100px;background:url('${coverImg}') center 70%/cover"></div>
    <div style="position:absolute;inset:0;background:linear-gradient(180deg,${ink} 0%,rgba(14,14,16,0) 20%,rgba(14,14,16,0) 42%,rgba(14,14,16,.95) 62%,${ink} 100%)"></div>
    <div id="s1chips" style="position:absolute;top:260px;left:70px;display:flex;gap:16px"><span class="chip hot">17억 차익</span><span class="chip dark">27일 발표</span></div>
    <div id="s1stk" style="position:absolute;top:420px;right:70px;transform:rotate(4deg)"><span class="sticker">줍줍 대란</span></div>
    <div style="position:absolute;left:70px;right:70px;top:1060px">
      <div id="s1badge"><span class="badge">KNOW · 부동산</span></div>
      <div class="h1" id="s1t1" style="margin-top:36px">2가구 줍줍에</div>
      <div class="h1" id="s1t2"><em>5만 3천 명</em><br>몰렸다</div>
    </div>
    <div class="src" style="bottom:300px">사진 | 잠실 일대(2019) · Tristan Surtel / Wikimedia Commons, CC BY-SA 4.0</div>
  </div>

  <div class="sc" id="s2">
    <div style="position:absolute;top:260px;left:70px;right:70px"><div class="lbl">11/24 잠실 래미안아이파크</div><div class="h2">1가구에<br><em>3만 명</em>이 넘게</div></div>
    <div class="row" id="r1" style="top:700px"><div class="k">전용 43㎡ · 1가구</div><div class="v"><span id="c1">0</span><small>대 1</small></div></div>
    <div class="row" id="r2" style="top:960px"><div class="k">전용 59㎡ · 1가구</div><div class="v" style="color:${sky}"><span id="c2">0</span><small>대 1</small></div></div>
    <div class="row" id="r3" style="top:1240px"><div class="k">일반공급 2가구 신청자 합계</div><div class="v"><span id="c3">0</span><small>명</small></div></div>
  </div>

  <div class="sc" id="s3">
    <div style="position:absolute;top:260px;left:70px;right:70px"><div class="lbl">왜 몰렸나</div><div class="h2">최초 분양가 그대로,<br>시세와 <em>최대 17억</em> 차이</div></div>
    <div class="row" style="top:700px"><div class="k">전용 59㎡</div>
      <div class="bl"><span class="l">줍줍 분양가</span><div class="b" id="b1" style="background:${sky}"></div><span class="n" id="n1">15.8억</span></div>
      <div class="bl"><span class="l">4월 실거래</span><div class="b" id="b2" style="background:#fff"></div><span class="n" id="n2">32.7억</span></div>
      <div class="gap" id="g1">→ 차이 약 16.9억</div></div>
    <div class="row" style="top:1110px"><div class="k">전용 43㎡</div>
      <div class="bl"><span class="l">줍줍 분양가</span><div class="b" id="b3" style="background:${sky}"></div><span class="n" id="n3">11.1억</span></div>
      <div class="bl"><span class="l">6월 실거래</span><div class="b" id="b4" style="background:#fff"></div><span class="n" id="n4">23.8억</span></div>
      <div class="gap" id="g2">→ 차이 약 12.8억</div></div>
    <div class="src" style="bottom:330px">분양가상한제 적용 단지 · 자료: 청약홈, 국토교통부 실거래가 공개시스템(뉴시스 11/24)</div>
  </div>

  <div class="sc" id="s4">
    <div style="position:absolute;top:260px;left:70px;right:70px"><div class="lbl" style="color:${mag}">그런데</div><div class="h2">당첨돼도<br><em style="color:${mag}">넘어야 할 벽</em></div></div>
    <div class="it no" id="w1" style="top:620px"><span class="n">1</span><div><div class="t">계약금 30% · 12월 4일</div><div class="s">59㎡ 기준 약 4억 7000만 원</div></div></div>
    <div class="it no" id="w2" style="top:860px"><span class="n">2</span><div><div class="t">잔금 70% · 30일 이내</div><div class="s">59㎡ 기준 약 11억 원</div></div></div>
    <div class="it no" id="w3" style="top:1100px"><span class="n">3</span><div><div class="t">재당첨 제한 10년</div><div class="s">실거주 의무 2년 · 입주 2027년 1월</div></div></div>
  </div>

  <div class="sc" id="s5">
    <div style="position:absolute;top:420px;left:70px;right:70px">
      <div class="lbl">KNOW-ISH 한 줄 정리</div>
      <div class="h2" style="font-size:100px">줍줍 경쟁률은<br><em>가격 차이</em>만큼<br>커진다</div>
      <div style="margin-top:60px;font-size:38px;line-height:1.6;color:rgba(255,255,255,.75);font-weight:500">대신 한 달 남짓 안에<br>15억 원 넘는 돈이 필요해요.</div>
    </div>
    <div style="position:absolute;bottom:330px;left:70px;display:flex;gap:18px"><span class="chip hot">저장해두고 다시 보기</span><span class="chip" style="background:transparent;color:#fff;border:3px solid rgba(255,255,255,.4);box-shadow:none">@knowish.mag</span></div>
    <div class="src">자료: 한국부동산원 청약홈·국토교통부(뉴시스 11/24 보도) · 투자 권유가 아닌 정보 제공용입니다</div>
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
const fmt = (n) => Math.round(n).toLocaleString('ko-KR');
const W = 700 / 32.7;
function bar(id, nid, v, p) { $(id).style.width = (v * W * eo(p)) + 'px'; $(nid).style.opacity = cl((p - 0.7) * 4); }
window.setT = (t) => {
  scene($('#s1'), t, 0, 4.0);
  $('#s1img').style.transform = 'scale(' + (1.12 - 0.12 * eo(span(t, 0, 4))) + ')';
  rise($('#s1chips'), span(t, 0.2, 0.7), 30);
  $('#s1stk').style.opacity = cl(span(t, 0.6, 0.8)); $('#s1stk').style.transform = 'rotate(4deg) scale(' + pop(span(t, 0.6, 1.2)) + ')';
  rise($('#s1badge'), span(t, 1.0, 1.4)); rise($('#s1t1'), span(t, 1.2, 1.7)); rise($('#s1t2'), span(t, 1.6, 2.1));

  scene($('#s2'), t, 3.8, 8.6);
  rise($('#r1'), span(t, 4.2, 4.6)); $('#c1').textContent = fmt(20322 * eo(span(t, 4.3, 5.6)));
  rise($('#r2'), span(t, 5.0, 5.4)); $('#c2').textContent = fmt(33125 * eo(span(t, 5.1, 6.4)));
  rise($('#r3'), span(t, 6.2, 6.6)); $('#c3').textContent = fmt(53447 * eo(span(t, 6.3, 7.5)));

  scene($('#s3'), t, 8.4, 13.8);
  bar('#b1', '#n1', 15.79, span(t, 8.9, 9.8)); bar('#b2', '#n2', 32.7, span(t, 9.4, 10.6));
  $('#g1').style.opacity = cl(span(t, 10.6, 11.0));
  bar('#b3', '#n3', 11.05, span(t, 10.9, 11.7)); bar('#b4', '#n4', 23.8, span(t, 11.3, 12.3));
  $('#g2').style.opacity = cl(span(t, 12.3, 12.7));

  scene($('#s4'), t, 13.6, 17.8);
  rise($('#w1'), span(t, 14.0, 14.5), 70); rise($('#w2'), span(t, 14.7, 15.2), 70); rise($('#w3'), span(t, 15.4, 15.9), 70);

  scene($('#s5'), t, 17.6, 20.4);
};
window.setT(0);
</script>`;

export const html = page(body, css);
