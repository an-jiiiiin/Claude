// KNOW 릴스: 한은 기준금리 3.25%로 인상 + 성장률 전망 상향 (2026-11-26 금통위)
// 근거: posts/2026-11-27-am/content.json 의 sources
import { page, BRAND, logo } from '../../src/templates.mjs';
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
  <div class="top"><span>${logo(1.6)}</span><span class="d">11.27 FRI · KNOW 금리</span></div>

  <div class="sc" id="s1">
    <div id="s1chips" style="position:absolute;top:280px;left:70px;display:flex;gap:16px"><span class="chip hot">올해 3번째</span><span class="chip dark">내년 성장 4.1%</span></div>
    <div id="s1stk" style="position:absolute;top:470px;right:70px;transform:rotate(4deg)"><span class="sticker">또 인상</span></div>
    <div id="s1big" style="position:absolute;left:70px;top:700px;font-weight:900;font-size:260px;letter-spacing:-0.06em;color:${sky};text-shadow:0 0 60px rgba(92,211,255,.5);font-variant-numeric:tabular-nums">3.25%</div>
    <div style="position:absolute;left:70px;right:70px;top:1060px">
      <div id="s1badge"><span class="badge">KNOW · 금리</span></div>
      <div class="h1" id="s1t1" style="margin-top:36px">성장률 4% 전망에</div>
      <div class="h1" id="s1t2">금리 <em>또</em> 올렸다</div>
    </div>
  </div>

  <div class="sc" id="s2">
    <div style="position:absolute;top:260px;left:70px;right:70px"><div class="lbl">2026 기준금리 (연 %)</div><div class="h2">계단처럼<br><em>세 번</em> 올랐다</div></div>
    <svg width="1080" height="900" style="position:absolute;top:640px;left:0" viewBox="0 0 1080 900">
      <g id="bars"></g>
    </svg>
    <div id="s2say" style="position:absolute;top:1560px;left:70px;transform:rotate(-2deg);opacity:0"><span class="say">10월엔 쉬고, <em>11월에 또</em></span></div>
  </div>

  <div class="sc" id="s3">
    <div style="position:absolute;top:260px;left:70px;right:70px"><div class="lbl">같은 날 나온 성장률 전망</div><div class="h2">내년 성장률<br><em>4.1%</em>로 상향</div></div>
    <div class="row" style="position:absolute;left:70px;right:70px;top:700px">
      <div style="font-weight:800;font-size:44px;margin-bottom:12px">올해 (2026)</div>
      <div class="stk-row"><span class="nm" style="width:220px;font-size:34px;opacity:.75">8월 전망</span><div class="bb" id="g1" style="background:#9aa3b5"></div><span class="pc" id="v1">3.3%</span></div>
      <div class="stk-row"><span class="nm" style="width:220px;font-size:34px;opacity:.75">11월 전망</span><div class="bb" id="g2" style="background:${sky}"></div><span class="pc" id="v2" style="color:${sky}">3.9%</span></div>
      <div style="font-weight:800;font-size:44px;margin:40px 0 12px">내년 (2027)</div>
      <div class="stk-row"><span class="nm" style="width:220px;font-size:34px;opacity:.75">8월 전망</span><div class="bb" id="g3" style="background:#9aa3b5"></div><span class="pc" id="v3">2.9%</span></div>
      <div class="stk-row"><span class="nm" style="width:220px;font-size:34px;opacity:.75">11월 전망</span><div class="bb" id="g4" style="background:${sky}"></div><span class="pc" id="v4" style="color:${sky}">4.1%</span></div>
    </div>
    <div class="src" style="bottom:330px">상향분 대부분은 반도체 호황(+0.75%p) · 한국은행 수정경제전망</div>
  </div>

  <div class="sc" id="s4">
    <div style="position:absolute;top:260px;left:70px;right:70px"><div class="lbl" style="color:${mag}">왜 또 올렸나</div><div class="h2">물가가<br><em style="color:${mag}">목표보다 높다</em></div></div>
    <div class="it no" id="w1" style="top:620px"><span class="n">1</span><div><div class="t">물가 전망 올해 2.7%</div><div class="s">내년 2.4% — 목표 2%를 웃돌아</div></div></div>
    <div class="it no" id="w2" style="top:860px"><span class="n">2</span><div><div class="t">경기는 뜨겁다</div><div class="s">반도체 수출·투자 호조</div></div></div>
    <div class="it no" id="w3" style="top:1100px"><span class="n">3</span><div><div class="t">추가 인상 여지</div><div class="s">한은이 가능성을 열어뒀어요</div></div></div>
  </div>

  <div class="sc" id="s5">
    <div style="position:absolute;top:420px;left:70px;right:70px">
      <div class="lbl">KNOW-ISH 한 줄 정리</div>
      <div class="h2" style="font-size:100px">성장은 뜨겁고<br><em>금리</em>는<br>계속 오른다</div>
      <div style="margin-top:60px;font-size:38px;line-height:1.6;color:rgba(255,255,255,.75);font-weight:500">대출·예금 금리 변화는<br>내 은행에서 꼭 확인하세요.</div>
    </div>
    <div style="position:absolute;bottom:330px;left:70px;display:flex;gap:18px"><span class="chip hot">저장해두고 다시 보기</span><span class="chip" style="background:transparent;color:#fff;border:3px solid rgba(255,255,255,.4);box-shadow:none">@knowish.mag</span></div>
    <div class="src">자료: 한국은행 금통위·수정경제전망(11/26) · 투자 권유가 아닌 정보 제공용입니다</div>
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
const steps = [['상반기', 2.50], ['7월', 2.75], ['8월', 3.00], ['10월', 3.00], ['11월', 3.25]];
const B = 760, y = (v) => B - (v - 2.2) * 560;
$('#bars').innerHTML = steps.map(([k, v], i) => { const x = 90 + i * 185, c = i === 4 ? '${mag}' : i === 3 ? '#9aa3b5' : '${sky}';
  return '<g id="b' + i + '" opacity="0"><rect x="' + x + '" y="' + y(v) + '" width="150" height="' + (B - y(v)) + '" rx="14" fill="' + c + '"/><text x="' + (x + 75) + '" y="' + (y(v) - 20) + '" fill="' + (i === 4 ? '${mag}' : '#fff') + '" font-size="46" text-anchor="middle">' + v.toFixed(2) + '</text><text x="' + (x + 75) + '" y="' + (B + 56) + '" fill="rgba(255,255,255,.7)" font-size="36" text-anchor="middle">' + k + '</text></g>'; }).join('');
function bar(id, qid, v, p) { $(id).style.width = (v * 150 * eo(p)) + 'px'; $(qid).style.opacity = cl((p - 0.6) * 3); }
window.setT = (t) => {
  scene($('#s1'), t, 0, 4.0);
  rise($('#s1chips'), span(t, 0.2, 0.7), 30);
  $('#s1stk').style.opacity = cl(span(t, 0.6, 0.8)); $('#s1stk').style.transform = 'rotate(4deg) scale(' + pop(span(t, 0.6, 1.2)) + ')';
  $('#s1big').style.opacity = cl(span(t, 0.3, 0.6)); $('#s1big').style.transform = 'scale(' + pop(span(t, 0.3, 1.0)) + ')';
  rise($('#s1badge'), span(t, 1.0, 1.4)); rise($('#s1t1'), span(t, 1.2, 1.7)); rise($('#s1t2'), span(t, 1.6, 2.1));

  scene($('#s2'), t, 3.8, 8.8);
  for (let i = 0; i < 5; i++) { const p = span(t, 4.3 + i * 0.6, 4.8 + i * 0.6); const g = $('#b' + i); g.setAttribute('opacity', eo(p)); g.setAttribute('transform', 'translate(0,' + (1 - eo(p)) * 40 + ')'); }
  $('#s2say').style.opacity = cl(span(t, 7.4, 7.6)); $('#s2say').style.transform = 'rotate(-2deg) scale(' + pop(span(t, 7.4, 7.9)) + ')';

  scene($('#s3'), t, 8.6, 13.8);
  bar('#g1', '#v1', 3.3, span(t, 9.0, 9.8)); bar('#g2', '#v2', 3.9, span(t, 9.5, 10.3));
  bar('#g3', '#v3', 2.9, span(t, 10.6, 11.4)); bar('#g4', '#v4', 4.1, span(t, 11.1, 11.9));

  scene($('#s4'), t, 13.6, 17.8);
  rise($('#w1'), span(t, 14.0, 14.5), 70); rise($('#w2'), span(t, 14.7, 15.2), 70); rise($('#w3'), span(t, 15.4, 15.9), 70);

  scene($('#s5'), t, 17.6, 20.4);
};
window.setT(0);
</script>`;

export const html = page(body, css);
