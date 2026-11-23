// KNOW 릴스: 젠슨 황, 사임 11일 만에 엔비디아 복귀 (2026-11-23 현지시간)
// 근거: posts/2026-11-24-am/content.json 의 sources
import { page, BRAND } from '../../src/templates.mjs';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

export const duration = 21;
export const posterAt = 2.8;
const { ink, sky, mag } = BRAND;
const deep = '#0B72C9';
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const coverImg = pathToFileURL(path.join(ROOT, 'posts/2026-11-24-am/images/01-jensen-huang.jpg')).href;

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
  <div class="top"><span class="logo"><span class="kn">KNOW</span><span class="ish">-ish</span></span><span class="d">11.24 TUE · KNOW 글로벌</span></div>

  <div class="sc" id="s1">
    <div id="s1img" style="position:absolute;top:240px;left:0;width:1080px;height:1100px;background:url('${coverImg}') center 18%/cover"></div>
    <div style="position:absolute;inset:0;background:linear-gradient(180deg,${ink} 0%,rgba(14,14,16,0) 20%,rgba(14,14,16,0) 42%,rgba(14,14,16,.95) 62%,${ink} 100%)"></div>
    <div id="s1chips" style="position:absolute;top:260px;left:70px;display:flex;gap:16px"><span class="chip hot">만장일치</span><span class="chip"><i style="width:16px;height:16px;border-radius:50%;background:#FF2D2D;box-shadow:0 0 12px #FF2D2D;display:block"></i>속보</span></div>
    <div id="s1stk" style="position:absolute;top:420px;right:70px;transform:rotate(4deg)"><span class="sticker">11일 만</span></div>
    <div style="position:absolute;left:70px;right:70px;top:1060px">
      <div id="s1badge"><span class="badge">KNOW · 글로벌</span></div>
      <div class="h1" id="s1t1" style="margin-top:36px">젠슨 황, 엔비디아로</div>
      <div class="h1" id="s1t2"><em>6일 만에 번복</em>된<br>복귀</div>
    </div>
    <div class="src" style="bottom:300px">사진 | NVIDIA Newsroom</div>
  </div>

  <div class="sc" id="s2">
    <div style="position:absolute;top:260px;left:70px;right:70px"><div class="lbl">11일간의 반전</div><div class="h2">사임 → “복귀 없다” →<br><em>만장일치 복귀</em></div></div>
    <div class="tl" id="tl"></div>
    <div class="ev" id="e1" style="top:690px;--c:${mag}"><i></i><div><div class="y">11/12</div><div class="t">개인적 행동 공개 후 자진 사임<br>크레스 CFO가 임시 CEO로</div></div></div>
    <div class="ev" id="e2" style="top:1000px;--c:#9aa3b5"><i></i><div><div class="y">11/17</div><div class="t">이사회 “복귀시킬 계획 없다”<br>후임 물색 착수</div></div></div>
    <div class="ev" id="e3" style="top:1310px;--c:${sky}"><i></i><div><div class="y">11/23</div><div class="t">만장일치로 <b style="color:#fff">즉시 복귀</b><br>사장·CEO·이사</div></div></div>
    <div id="st1" style="position:absolute;top:1010px;right:90px"><span class="stamp">NO</span></div>
    <div id="st2" style="position:absolute;top:1320px;right:90px"><span class="stamp ok">YES</span></div>
  </div>

  <div class="sc" id="s3">
    <div style="position:absolute;top:260px;left:70px;right:70px"><div class="lbl">왜 뒤집었나</div><div class="h2">이사회가 내놓은<br>근거 <em>2가지</em></div></div>
    <div class="it" id="i0" style="top:620px"><span class="n">1</span><div><div class="t">면담 끝에 “만족”</div><div class="s">진정성과 회사를 이끌 역량에 만족</div></div></div>
    <div class="it" id="i1" style="top:890px"><span class="n">2</span><div><div class="t">美 정부 고위급 의견</div><div class="s">이를 토대로 “국가안보 위험 없다” 확신</div></div></div>
    <div id="q" style="position:absolute;top:1200px;left:70px;right:70px;font-size:42px;font-weight:700;line-height:1.5;color:rgba(255,255,255,.9);opacity:0">“젠슨이 엔비디아를 이끌 <span style="color:${sky}">적임자</span>”<div style="font-size:28px;opacity:.6;margin-top:10px">— 하비 존스 이사회 의장</div></div>
  </div>

  <div class="sc" id="s4">
    <div style="position:absolute;top:260px;left:70px;right:70px"><div class="lbl" style="color:${mag}">그런데 아직</div><div class="h2">돌아왔지만,<br><em style="color:${mag}">조사는 계속</em></div></div>
    <div class="it no" id="n1" style="top:620px"><span class="n">!</span><div><div class="t">외국 정보기관 공작 의혹</div><div class="s">독립이사 위원회 조사, 결론까지 진행</div></div></div>
    <div class="it no" id="n2" style="top:890px"><span class="n">!</span><div><div class="t">정부 조사에도 계속 협조</div><div class="s">국가안보·수출통제위원회도 신설</div></div></div>
    <div id="sb" style="position:absolute;top:1200px;right:70px;transform:rotate(-2deg)"><span class="say">황 “조사 <em>전적으로 지지·협조</em>”</span></div>
  </div>

  <div class="sc" id="s5">
    <div style="position:absolute;top:420px;left:70px;right:70px">
      <div class="lbl">KNOW-ISH 한 줄 정리</div>
      <div class="h2" style="font-size:100px">황은 돌아왔다,<br><em>조사 결과</em>까지가<br>완결</div>
      <div style="margin-top:60px;font-size:38px;line-height:1.6;color:rgba(255,255,255,.75);font-weight:500">CEO 공백 불확실성은 일단 해소.<br>오늘 국내 반도체주 반응도 지켜봐요.</div>
    </div>
    <div style="position:absolute;bottom:330px;left:70px;display:flex;gap:18px"><span class="chip hot">저장해두고 다시 보기</span><span class="chip" style="background:transparent;color:#fff;border:3px solid rgba(255,255,255,.4);box-shadow:none">@knowish.mag</span></div>
    <div class="src">자료: NVIDIA 공식 발표(11/23), AP·CBS, AI타임스 · 투자 권유가 아닌 정보 제공용입니다</div>
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

  scene($('#s2'), t, 4.0, 10.0);
  $('#tl').style.height = (680 * eo(span(t, 4.4, 8.4))) + 'px';
  slide($('#e1'), span(t, 4.5, 5.0)); slide($('#e2'), span(t, 5.8, 6.3)); slide($('#e3'), span(t, 7.6, 8.1));
  stamp($('#st1'), span(t, 6.5, 6.9)); stamp($('#st2'), span(t, 8.3, 8.7));
  $('#e3').querySelector('i').style.transform = 'scale(' + pop(span(t, 7.6, 8.2)) + ')';

  scene($('#s3'), t, 9.8, 14.4);
  rise($('#i0'), span(t, 10.2, 10.7), 70); rise($('#i1'), span(t, 10.9, 11.4), 70); rise($('#q'), span(t, 11.8, 12.4), 40);

  scene($('#s4'), t, 14.2, 18.6);
  rise($('#n1'), span(t, 14.6, 15.1), 70); rise($('#n2'), span(t, 15.3, 15.8), 70);
  $('#sb').style.opacity = cl(span(t, 16.3, 16.5)); $('#sb').style.transform = 'rotate(-2deg) scale(' + pop(span(t, 16.3, 16.8)) + ')';

  scene($('#s5'), t, 18.4, 21.4);
};
window.setT(0);
</script>`;

export const html = page(body, css);

