// KNOW 릴스: 홈플러스 27일부터 마트 67곳 영업 중단 (2026-11-25 사내 공지)
// 근거: posts/2026-11-26-am/content.json 의 sources (경향신문·마이데일리·MTN 11/25)
import { page, BRAND } from '../../src/templates.mjs';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

export const duration = 21;
export const posterAt = 2.6;
const { ink, sky, mag } = BRAND;
const deep = '#0B72C9';
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const coverImg = pathToFileURL(path.join(ROOT, 'posts/2026-11-26-am/images/04.jpg')).href;

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
`;

const body = `<div class="stage">
  <div class="bg"></div><div class="grid"></div>
  <div class="top"><span class="logo"><span class="kn">KNOW</span><span class="ish">-ish</span></span><span class="d">11.26 THU · KNOW 유통</span></div>

  <div class="sc" id="s1">
    <div id="s1img" style="position:absolute;top:240px;left:0;width:1080px;height:1100px;background:url('${coverImg}') center 40%/cover"></div>
    <div style="position:absolute;inset:0;background:linear-gradient(180deg,${ink} 0%,rgba(14,14,16,0) 20%,rgba(14,14,16,0) 42%,rgba(14,14,16,.95) 62%,${ink} 100%)"></div>
    <div id="s1chips" style="position:absolute;top:260px;left:70px;display:flex;gap:16px"><span class="chip hot">재개 미정</span><span class="chip dark">11/27(금)</span></div>
    <div id="s1stk" style="position:absolute;top:420px;right:70px;transform:rotate(4deg)"><span class="sticker">또 셧다운</span></div>
    <div style="position:absolute;left:70px;right:70px;top:1060px">
      <div id="s1badge"><span class="badge">KNOW · 유통</span></div>
      <div class="h1" id="s1t1" style="margin-top:36px">홈플러스, 27일부터</div>
      <div class="h1" id="s1t2">마트 <em>67곳</em><br>문 닫는다</div>
    </div>
    <div class="src" style="bottom:300px">사진 | 자료 사진 · Nt / Wikimedia Commons, CC BY-SA 4.0</div>
  </div>

  <div class="sc" id="s2">
    <div style="position:absolute;top:260px;left:70px;right:70px"><div class="lbl">올해 홈플러스</div><div class="h2">닫고, 열고,<br><em style="color:${mag}">다시 닫는다</em></div></div>
    <div class="tl" id="tl"></div>
    <div class="ev" id="e1" style="top:690px;--c:#9aa3b5"><i></i><div><div class="y">5월</div><div class="t">104개 점포 중 37곳 영업 중단</div></div></div>
    <div class="ev" id="e2" style="top:900px;--c:${mag}"><i></i><div><div class="y">7월 13일</div><div class="t">나머지 점포도 임시 휴업</div></div></div>
    <div class="ev" id="e3" style="top:1110px;--c:${sky}"><i></i><div><div class="y">8월 13일</div><div class="t">2000억 원 긴급자금으로 재개장</div></div></div>
    <div class="ev" id="e4" style="top:1320px;--c:${mag}"><i></i><div><div class="y">11월 27일</div><div class="t"><b style="color:#fff">석 달 만에</b> 다시 중단</div></div></div>
    <div id="st1" style="position:absolute;top:1040px;right:60px"><span class="stamp ok">OPEN</span></div>
    <div id="st2" style="position:absolute;top:1250px;right:60px"><span class="stamp">CLOSED</span></div>
  </div>

  <div class="sc" id="s3">
    <div style="position:absolute;top:260px;left:70px;right:70px"><div class="lbl">왜 또 닫나</div><div class="h2">물건 사 올 돈이<br><em>바닥</em>났다</div></div>
    <div class="it" id="i0" style="top:620px"><span class="n">1</span><div><div class="t">매출 감소 장기화</div><div class="s">상품 수급 문제로 시작</div></div></div>
    <div class="it" id="i1" style="top:860px"><span class="n">2</span><div><div class="t">상품 매입 자금 부족</div><div class="s">온라인 배송 26일, 매장 27일 중단</div></div></div>
    <div class="it no" id="i2" style="top:1100px"><span class="n">!</span><div><div class="t">임금도 밀렸다</div><div class="s">9월 급여 25%만 지급, 10·11월분 미지급</div></div></div>
  </div>

  <div class="sc" id="s4">
    <div style="position:absolute;top:260px;left:70px;right:70px"><div class="lbl">다시 열 수 있을까</div><div class="h2">열쇠는<br><em>M&A 계약</em></div></div>
    <div class="it" id="n1" style="top:620px"><span class="n">✓</span><div><div class="t">인수의향서 접수</div><div class="s">복수 후보와 사전 협의(업계)</div></div></div>
    <div class="it no" id="n2" style="top:860px"><span class="n">…</span><div><div class="t">법원·채권단 협의, 본실사</div><div class="s">계약·자금 확보까지 시간 필요</div></div></div>
    <div id="sb" style="position:absolute;top:1160px;right:70px;transform:rotate(-2deg)"><span class="say">재개 시점은 <em>아직 미정</em></span></div>
  </div>

  <div class="sc" id="s5">
    <div style="position:absolute;top:420px;left:70px;right:70px">
      <div class="lbl">KNOW-ISH 한 줄 정리</div>
      <div class="h2" style="font-size:100px">홈플러스의<br>다음 장면은<br><em>M&A</em>가 정한다</div>
      <div style="margin-top:60px;font-size:38px;line-height:1.6;color:rgba(255,255,255,.75);font-weight:500">점포 안 임대매장은 영업을 이어가요.<br>방문 전엔 꼭 확인하세요.</div>
    </div>
    <div style="position:absolute;bottom:330px;left:70px;display:flex;gap:18px"><span class="chip hot">저장해두고 다시 보기</span><span class="chip" style="background:transparent;color:#fff;border:3px solid rgba(255,255,255,.4);box-shadow:none">@knowish.mag</span></div>
    <div class="src">자료: 홈플러스 사내 공지(경향신문·마이데일리·MTN 11/25 보도)</div>
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
function slide(el, p) { el.style.opacity = eo(p); el.style.transform = 'translateX(' + (1 - eo(p)) * -80 + 'px)'; }
function stamp(el, p) { const s = el.querySelector('.stamp'); s.style.opacity = cl(p * 3); s.style.transform = 'rotate(-8deg) scale(' + (2.2 - 1.2 * eo(p)) + ')'; }
window.setT = (t) => {
  scene($('#s1'), t, 0, 4.2);
  $('#s1img').style.transform = 'scale(' + (1.12 - 0.12 * eo(span(t, 0, 4))) + ')';
  rise($('#s1chips'), span(t, 0.2, 0.7), 30);
  $('#s1stk').style.opacity = cl(span(t, 0.6, 0.8)); $('#s1stk').style.transform = 'rotate(4deg) scale(' + pop(span(t, 0.6, 1.2)) + ')';
  rise($('#s1badge'), span(t, 1.0, 1.4)); rise($('#s1t1'), span(t, 1.2, 1.7)); rise($('#s1t2'), span(t, 1.6, 2.1));

  scene($('#s2'), t, 4.0, 10.2);
  $('#tl').style.height = (680 * eo(span(t, 4.4, 9.0))) + 'px';
  slide($('#e1'), span(t, 4.5, 5.0)); slide($('#e2'), span(t, 5.6, 6.1)); slide($('#e3'), span(t, 6.7, 7.2)); slide($('#e4'), span(t, 8.0, 8.5));
  stamp($('#st1'), span(t, 7.3, 7.7)); stamp($('#st2'), span(t, 8.6, 9.0));
  $('#e4').querySelector('i').style.transform = 'scale(' + pop(span(t, 8.0, 8.6)) + ')';

  scene($('#s3'), t, 10.0, 14.4);
  rise($('#i0'), span(t, 10.4, 10.9), 70); rise($('#i1'), span(t, 11.1, 11.6), 70); rise($('#i2'), span(t, 11.8, 12.3), 70);

  scene($('#s4'), t, 14.2, 18.6);
  rise($('#n1'), span(t, 14.6, 15.1), 70); rise($('#n2'), span(t, 15.3, 15.8), 70);
  $('#sb').style.opacity = cl(span(t, 16.3, 16.5)); $('#sb').style.transform = 'rotate(-2deg) scale(' + pop(span(t, 16.3, 16.8)) + ')';

  scene($('#s5'), t, 18.4, 21.4);
};
window.setT(0);
</script>`;

export const html = page(body, css);
