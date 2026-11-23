// KNOW 릴스: 코스피 -5.21% 다음 날, 정부가 꺼낸 증안펀드 (2026-11-22 긴급회의)
// 근거: posts/2026-11-23-am/content.json 의 sources
import { page, BRAND } from '../../src/templates.mjs';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

export const duration = 21;
export const posterAt = 2.8;
const { ink, sky, mag } = BRAND;
const deep = '#0B72C9';
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const coverImg = pathToFileURL(path.join(ROOT, 'posts/2026-11-23-am/images/01-mof-meeting.jpg')).href;

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
`;

// 나흘 종가 (한국거래소, 11/23 장 마감 반영)
const D = [['11/18', 5067.44], ['11/19', 5137.89], ['11/20', 4869.96], ['11/23', 4708.54]];
const lo = 4620, hi = 5200, cx = (i) => 120 + i * 270, cy = (v) => 60 + (hi - v) / (hi - lo) * 560;
const PTS = D.map((p, i) => [cx(i), cy(p[1])]);
const fmt = (v) => v.toLocaleString('en-US', { minimumFractionDigits: 2 });

const body = `<div class="stage">
  <div class="bg"></div><div class="grid"></div>
  <div class="top"><span class="logo"><span class="kn">KNOW</span><span class="ish">-ish</span></span><span class="d">11.23 MON 마감 · KNOW 증시</span></div>

  <div class="sc" id="s1">
    <div id="s1img" style="position:absolute;top:240px;left:0;width:1080px;height:1100px;background:url('${coverImg}') 35% center/cover"></div>
    <div style="position:absolute;inset:0;background:linear-gradient(180deg,${ink} 0%,rgba(14,14,16,0) 20%,rgba(14,14,16,0) 40%,rgba(14,14,16,.95) 62%,${ink} 100%)"></div>
    <div id="s1chips" style="position:absolute;top:260px;left:70px;display:flex;gap:16px"><span class="chip dark">이틀째 사이드카</span><span class="chip"><i style="width:16px;height:16px;border-radius:50%;background:#FF2D2D;box-shadow:0 0 12px #FF2D2D;display:block"></i>금통위 D-3</span></div>
    <div id="s1stk" style="position:absolute;top:420px;right:70px;transform:rotate(4deg)"><span class="sticker">18년 만</span></div>
    <div style="position:absolute;left:70px;right:70px;top:1060px">
      <div id="s1badge"><span class="badge">KNOW · 증시</span></div>
      <div class="h1" id="s1t1" style="margin-top:36px">증안펀드 꺼냈는데</div>
      <div class="h1" id="s1t2">코스피 <span style="color:${mag}">4,700</span>까지<br><em>또 밀렸다</em></div>
    </div>
    <div class="src" style="bottom:300px">사진 | 재정경제부 제공</div>
  </div>

  <div class="sc" id="s2">
    <div style="position:absolute;top:260px;left:70px;right:70px"><div class="lbl">나흘 동안의 코스피 (종가)</div><div class="h2">대책 발표 다음 날에도<br><em style="color:${mag}">-3.31%</em></div></div>
    <svg style="position:absolute;top:700px;left:40px" width="1000" height="700" viewBox="0 0 1000 700">
      <line x1="40" x2="980" y1="${cy(5000)}" y2="${cy(5000)}" stroke="${mag}" stroke-width="4" stroke-dasharray="14 12"/>
      <text x="980" y="${cy(5000) - 14}" text-anchor="end" fill="${mag}" font-size="32" font-weight="900" font-family="Pretendard">5,000</text>
      <polyline id="ln" points="${PTS.map((p) => p.join(',')).join(' ')}" fill="none" stroke="${sky}" stroke-width="10" stroke-linejoin="round" stroke-linecap="round"/>
      ${PTS.map((p, i) => `<g class="pt" data-k="${i}" opacity="0"><circle cx="${p[0]}" cy="${p[1]}" r="16" fill="${i === 3 ? mag : sky}" stroke="#fff" stroke-width="5"/><text x="${p[0]}" y="${p[1] + (i === 3 ? 64 : -34)}" text-anchor="middle" fill="#fff" font-size="34" font-weight="900" font-family="Pretendard">${fmt(D[i][1])}</text><text x="${p[0]}" y="680" text-anchor="middle" fill="rgba(255,255,255,.6)" font-size="30" font-weight="700" font-family="Pretendard">${D[i][0]}</text></g>`).join('')}
    </svg>
    <div style="position:absolute;top:1430px;left:70px;right:70px;display:flex;align-items:flex-end;gap:24px"><div class="big" id="cnt" style="color:${mag}">-0.00%</div><div style="font-weight:800;font-size:38px;margin-bottom:16px;line-height:1.3">11/19 → 11/23<br>두 거래일</div></div>
  </div>

  <div class="sc" id="s3">
    <div style="position:absolute;top:260px;left:70px;right:70px"><div class="lbl">증안펀드, 언제 썼더라</div><div class="h2">실제 집행은<br><em>2008년</em>이 마지막</div></div>
    <div class="tl" id="tl"></div>
    <div class="ev" id="e1" style="top:690px;--c:${mag}"><i></i><div><div class="y">2008</div><div class="t">글로벌 금융위기<br><b style="color:#fff">5,150억 원 실제 집행</b></div></div></div>
    <div class="ev" id="e2" style="top:1000px;--c:#9aa3b5"><i></i><div><div class="y">2020. 3</div><div class="t">코로나 폭락, 10조 7,000억 원 조성<br>(실제 집행까진 X)</div></div></div>
    <div class="ev" id="e3" style="top:1310px;--c:${sky}"><i></i><div><div class="y">2026. 11. 22</div><div class="t">‘즉시 가동’ 준비 착수<br>(가동은 시장 상황 보고 결정)</div></div></div>
  </div>

  <div class="sc" id="s4">
    <div style="position:absolute;top:260px;left:70px;right:70px"><div class="lbl">정부가 꺼낸 카드</div><div class="h2">방패 <em>3장</em></div></div>
    <div class="it" id="i0" style="top:560px"><span class="n">1</span><div><div class="t">증안펀드 가동 준비</div><div class="s">발동 체계 정비, 가동은 상황 보고</div></div></div>
    <div class="it" id="i1" style="top:830px"><span class="n">2</span><div><div class="t">자사주 매수 한도 완화</div><div class="s">24일부터 3개월</div></div></div>
    <div class="it" id="i2" style="top:1100px"><span class="n">3</span><div><div class="t">불법 공매도 특별 감시</div><div class="s">금감원·거래소 3개월 집중</div></div></div>
    <div id="sb" style="position:absolute;top:1400px;right:70px;transform:rotate(-2deg)"><span class="say">23일 장중 <em>4,586</em>까지… 이틀째 사이드카</span></div>
  </div>

  <div class="sc" id="s5">
    <div style="position:absolute;top:420px;left:70px;right:70px">
      <div class="lbl">KNOW-ISH 한 줄 정리</div>
      <div class="h2" style="font-size:96px">방패는 준비됐지만,<br>낙폭은 <em style="color:${mag}">계속</em>.<br>이제 <em>꺼낼지</em>가 관건</div>
      <div style="margin-top:60px;font-size:38px;line-height:1.6;color:rgba(255,255,255,.75);font-weight:500">외국인 7거래일 연속 순매도 · 26일 금통위<br>증안펀드 실제 가동 여부, 바로 정리해드릴게요.</div>
    </div>
    <div style="position:absolute;bottom:330px;left:70px;display:flex;gap:18px"><span class="chip hot">저장해두고 다시 보기</span><span class="chip" style="background:transparent;color:#fff;border:3px solid rgba(255,255,255,.4);box-shadow:none">@knowish.mag</span></div>
    <div class="src">자료: 재정경제부·한국거래소(뉴스1·YTN·한국경제·JTBC·아주경제 보도, 11/23 마감 기준) · 투자 권유가 아닌 정보 제공용입니다</div>
  </div>
</div>
<script>
const $ = (s) => document.querySelector(s), $$ = (s) => [...document.querySelectorAll(s)];
const cl = (x) => Math.max(0, Math.min(1, x));
const eo = (x) => 1 - Math.pow(1 - cl(x), 3);
const pop = (x) => { x = cl(x); return x < 1 ? 1 + 2.2 * Math.pow(x - 1, 3) + 1.2 * Math.pow(x - 1, 2) : 1; };
const span = (t, a, b) => cl((t - a) / (b - a));
function scene(el, t, a, b, f = 0.35) { el.style.opacity = Math.min(span(t, a, a + f), 1 - span(t, b - f, b)); }
function rise(el, p, dy = 60) { el.style.opacity = eo(p); el.style.transform = 'translateY(' + (1 - eo(p)) * dy + 'px)'; }
function slide(el, p) { el.style.opacity = eo(p); el.style.transform = 'translateX(' + (1 - eo(p)) * -80 + 'px)'; }
const ln = $('#ln'); const L = ln.getTotalLength(); ln.style.strokeDasharray = L;
window.setT = (t) => {
  scene($('#s1'), t, 0, 4.2);
  $('#s1img').style.transform = 'scale(' + (1.12 - 0.12 * eo(span(t, 0, 4))) + ')';
  rise($('#s1chips'), span(t, 0.2, 0.7), 30);
  $('#s1stk').style.opacity = cl(span(t, 0.6, 0.8)); $('#s1stk').style.transform = 'rotate(4deg) scale(' + pop(span(t, 0.6, 1.2)) + ')';
  rise($('#s1badge'), span(t, 1.0, 1.4)); rise($('#s1t1'), span(t, 1.2, 1.7)); rise($('#s1t2'), span(t, 1.6, 2.1));

  scene($('#s2'), t, 4.0, 9.2);
  ln.style.strokeDashoffset = L * (1 - eo(span(t, 4.5, 7.6)));
  $$('.pt').forEach((g) => { const at = [4.5, 5.5, 6.5, 7.5][+g.dataset.k]; g.setAttribute('opacity', eo(span(t, at, at + 0.3))); });
  $('#cnt').textContent = '-' + (8.36 * eo(span(t, 7.4, 8.6))).toFixed(2) + '%';

  scene($('#s3'), t, 9.0, 13.8);
  $('#tl').style.height = (680 * eo(span(t, 9.4, 12.2))) + 'px';
  slide($('#e1'), span(t, 9.5, 10.0)); slide($('#e2'), span(t, 10.5, 11.0)); slide($('#e3'), span(t, 11.5, 12.0));
  $('#e3').querySelector('i').style.transform = 'scale(' + pop(span(t, 11.5, 12.1)) + ')';

  scene($('#s4'), t, 13.6, 18.0);
  [0, 1, 2].forEach((k) => rise($('#i' + k), span(t, 14.0 + k * 0.6, 14.5 + k * 0.6), 70));
  $('#sb').style.opacity = cl(span(t, 16.0, 16.2)); $('#sb').style.transform = 'rotate(-2deg) scale(' + pop(span(t, 16.0, 16.5)) + ')';

  scene($('#s5'), t, 17.8, 21.4);
};
window.setT(0);
</script>`;

export const html = page(body, css);

