// KNOW 릴스 시안: 수능날 코스피 5천 붕괴 → 역전 마감 (2026-11-19)
// 수치 출처: 한국거래소 집계(디지털데일리·아시아경제 11/19, 아시아경제·파이낸셜뉴스 11/17 보도)
import { page, BRAND } from '../../src/templates.mjs';

export const duration = 21;
export const posterAt = 2.6;

const { ink, sky, mag } = BRAND;
const deep = '#0B72C9';

// 장중 차트: 확인된 지점만 연결 (분 단위 시세 아님)
const P = { open: 5090.04, low: 4963.61, close: 5137.89, line: 5000 };
const W = 900, H = 640, X0 = 60, Y0 = 60;
const yv = (v) => Y0 + ((5160 - v) / (5160 - 4940)) * (H - 120);
const pts = [[X0 + 20, yv(P.open)], [X0 + 330, yv(P.low)], [X0 + 800, yv(P.close)]];
const pathD = `M${pts[0][0]},${pts[0][1]} C${pts[0][0] + 120},${pts[0][1] + 10} ${pts[1][0] - 120},${pts[1][1]} ${pts[1][0]},${pts[1][1]} S${pts[2][0] - 160},${pts[2][1] + 30} ${pts[2][0]},${pts[2][1]}`;

// 큰 그림: 6월 최고점 vs 11/17 vs 11/19
const bars = [
  { k: '6월 최고점', v: 9114.55, c: '#4a4f5c' },
  { k: '11/17 종가', v: 4968.48, c: mag },
  { k: '11/19 종가', v: 5137.89, c: sky },
];

const css = `
html,body{margin:0;background:${ink}}
.stage{width:1080px;height:1920px;position:relative;overflow:hidden;background:${ink};font-family:'Pretendard';color:#fff;letter-spacing:-0.03em;word-break:keep-all}
.bg{position:absolute;inset:0;background:radial-gradient(90% 60% at 80% 10%, rgba(92,211,255,.18), transparent 60%),radial-gradient(70% 50% at 10% 90%, rgba(255,30,200,.12), transparent 60%)}
.grid{position:absolute;inset:0;opacity:.07;background-image:linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px);background-size:90px 90px}
.sc{position:absolute;inset:0;opacity:0}
.top{position:absolute;top:110px;left:70px;right:70px;display:flex;justify-content:space-between;align-items:center;z-index:9}
.top .d{font-weight:700;font-size:30px;opacity:.85}
.logo{display:inline-flex;align-items:center;line-height:1}
.logo .kn{background:${sky};color:${ink};font-weight:900;letter-spacing:-0.05em;font-size:44px;padding:8px 14px 6px;transform:rotate(-3deg);box-shadow:4px 4px 0 #000,4px 4px 0 2px #fff}
.logo .ish{background:${mag};color:#fff;font-weight:900;font-style:italic;font-size:38px;padding:7px 14px 6px;margin-left:-6px;border:3px solid #fff;border-radius:8px;transform:rotate(6deg) translateY(6px);box-shadow:4px 4px 0 #000}
.chip{display:inline-flex;align-items:center;gap:10px;font-weight:900;font-size:40px;padding:14px 26px 13px;border-radius:999px;background:#fff;color:${ink};box-shadow:5px 5px 0 #000}
.chip.dot::before{content:'';width:16px;height:16px;border-radius:50%;background:#FF2D2D;box-shadow:0 0 12px #FF2D2D}
.chip.hot{background:${sky};box-shadow:5px 5px 0 #000,0 0 30px rgba(92,211,255,.6)}
.sticker{display:inline-block;font-family:'Black Han Sans';font-size:96px;line-height:1;padding:22px 34px 16px;background:${sky};color:${ink};box-shadow:10px 10px 0 #000,0 0 60px rgba(92,211,255,.45)}
.h1{font-weight:900;font-size:118px;line-height:1.16;letter-spacing:-0.05em}
.h1 em{font-style:normal;color:${sky};text-shadow:0 0 34px rgba(92,211,255,.6)}
.badge{display:inline-flex;align-items:center;gap:12px;font-weight:800;font-size:36px;padding:12px 26px;border-radius:999px;background:${sky};color:${ink}}
.badge::before{content:'';width:14px;height:14px;border-radius:50%;background:${ink}}
.lbl{font-weight:800;font-size:40px;color:${sky};margin-bottom:22px}
.h2{font-weight:900;font-size:84px;line-height:1.2;letter-spacing:-0.045em}
.h2 em{font-style:normal;color:${sky}}
.num{font-weight:900;font-size:150px;letter-spacing:-0.05em;font-variant-numeric:tabular-nums;line-height:1}
.small{font-size:26px;opacity:.6;font-weight:500}
.rc{background:#1b1c22;border-radius:28px;padding:44px 48px;border:2px solid rgba(255,255,255,.08)}
.rc .t{font-weight:900;font-size:50px;margin-bottom:18px;display:flex;align-items:center;gap:16px}
.rc p{font-size:38px;line-height:1.55;color:rgba(255,255,255,.85);font-weight:500;margin:0}
.rc b{color:#fff}
.say{display:inline-block;background:#fff;border:4px solid #111;color:#111;font-weight:800;font-size:40px;padding:16px 26px;box-shadow:6px 6px 0 #000}
.say em{font-style:normal;color:${deep}}
.src{position:absolute;left:70px;right:70px;bottom:90px;font-size:24px;opacity:.55;line-height:1.5}
`;

const svgChart = `
<svg width="${W + 120}" height="${H}" viewBox="0 0 ${W + 120} ${H}">
  <defs>
    <linearGradient id="g" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="${sky}" stop-opacity=".35"/><stop offset="1" stop-color="${sky}" stop-opacity="0"/></linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <line x1="${X0}" x2="${X0 + 840}" y1="${yv(P.line)}" y2="${yv(P.line)}" stroke="${mag}" stroke-width="4" stroke-dasharray="14 12"/>
  <text x="${X0 + 846}" y="${yv(P.line) + 12}" fill="${mag}" font-size="34" font-weight="900" font-family="Pretendard">5,000</text>
  <path id="area" d="${pathD} L${pts[2][0]},${H - 40} L${pts[0][0]},${H - 40} Z" fill="url(#g)" opacity="0"/>
  <path id="ln" d="${pathD}" fill="none" stroke="${sky}" stroke-width="10" stroke-linecap="round" filter="url(#glow)"/>
  ${pts.map((p, k) => `<circle class="pt" data-k="${k}" cx="${p[0]}" cy="${p[1]}" r="16" fill="${k === 1 ? mag : sky}" stroke="#fff" stroke-width="5" opacity="0"/>`).join('')}
  <g class="pl" data-k="0" opacity="0"><text x="${pts[0][0] - 10}" y="${pts[0][1] - 40}" fill="#fff" font-size="32" font-weight="800" font-family="Pretendard">10:00 시가</text><text x="${pts[0][0] - 10}" y="${pts[0][1] - 4}" fill="#fff" font-size="30" font-family="Pretendard" opacity=".75">5,090.04</text></g>
  <g class="pl" data-k="1" opacity="0"><text x="${pts[1][0] - 100}" y="${pts[1][1] + 66}" fill="${mag}" font-size="34" font-weight="900" font-family="Pretendard">장중 저점</text><text x="${pts[1][0] - 100}" y="${pts[1][1] + 104}" fill="#fff" font-size="32" font-weight="800" font-family="Pretendard">4,963.61</text></g>
  <g class="pl" data-k="2" opacity="0"><text x="${pts[2][0] - 230}" y="${pts[2][1] - 44}" fill="${sky}" font-size="34" font-weight="900" font-family="Pretendard">16:30 종가(최고치)</text><text x="${pts[2][0] - 230}" y="${pts[2][1] - 6}" fill="#fff" font-size="32" font-weight="800" font-family="Pretendard">5,137.89</text></g>
</svg>`;

const maxV = 9114.55;
const barsHTML = bars.map((b, k) => `
  <div class="bar" data-k="${k}" style="display:flex;flex-direction:column;align-items:center;justify-content:flex-end;width:240px;height:820px">
    <div class="bv" style="font-weight:900;font-size:42px;margin-bottom:14px;opacity:0">${b.v.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
    <div class="bf" style="width:200px;height:0;background:${b.c};border-radius:14px 14px 0 0;box-shadow:${k ? `0 0 40px ${b.c}66` : 'none'}" data-h="${(b.v / maxV) * 700}"></div>
    <div style="font-weight:800;font-size:34px;margin-top:20px;color:rgba(255,255,255,.85)">${b.k}</div>
  </div>`).join('');

const body = `<div class="stage">
  <div class="bg"></div><div class="grid"></div>
  <div class="top"><span class="logo"><span class="kn">KNOW</span><span class="ish">-ish</span></span><span class="d">11.19 THU · KNOW 증시</span></div>

  <!-- S1 훅 -->
  <div class="sc" id="s1">
    <div id="s1chips" style="position:absolute;top:260px;left:70px;display:flex;gap:16px"><span class="chip dot">수능날 장</span><span class="chip">10시 개장</span></div>
    <svg id="s1ln" width="1080" height="700" viewBox="0 0 1020 640" style="position:absolute;top:300px;left:30px;opacity:.5"><path id="ln0" d="${pathD}" fill="none" stroke="${sky}" stroke-width="8" stroke-linecap="round"/><line x1="${X0}" x2="${X0 + 840}" y1="${yv(P.line)}" y2="${yv(P.line)}" stroke="${mag}" stroke-width="3" stroke-dasharray="12 12" opacity=".7"/></svg>
    <div id="s1stk" style="position:absolute;top:430px;right:70px;transform:rotate(4deg)"><span class="sticker">오늘 마감</span></div>
    <div style="position:absolute;left:70px;right:70px;top:880px">
      <div id="s1badge"><span class="badge">KNOW · 증시</span></div>
      <div class="h1" id="s1t1" style="margin-top:40px">5천 깨졌던 코스피,</div>
      <div class="h1" id="s1t2">막판 <em>역전 마감</em></div>
    </div>
  </div>

  <!-- S2 장중 흐름 -->
  <div class="sc" id="s2">
    <div style="position:absolute;top:260px;left:70px;right:70px">
      <div class="lbl">11월 19일 코스피, 하루의 흐름</div>
      <div class="h2">장중 <em style="color:${mag}">5,000 아래</em>까지<br>밀렸다가 최고치로</div>
    </div>
    <div style="position:absolute;top:720px;left:0">${svgChart}</div>
    <div style="position:absolute;top:1430px;left:70px;right:70px;display:flex;align-items:flex-end;gap:26px">
      <div class="num" id="cnt">+0.00</div><div style="font-weight:800;font-size:44px;margin-bottom:14px">p 저점 대비 회복</div>
    </div>
    <div class="src" style="bottom:200px">※ 시가·저점·종가 세 지점을 이은 흐름도 (분 단위 시세 아님)</div>
  </div>

  <!-- S3 왜? -->
  <div class="sc" id="s3">
    <div style="position:absolute;top:260px;left:70px;right:70px"><div class="lbl">왜 이렇게 흔들렸을까</div><div class="h2">오전엔 <em style="color:${mag}">긴축 공포</em>,<br>오후엔 <em>반도체</em></div></div>
    <div class="rc" id="c1" style="position:absolute;top:700px;left:70px;right:70px"><div class="t"><span style="color:${mag}">▼</span> 오전</div><p>美 FOMC 의사록에서 <b>추가 긴축</b> 가능성 부각.<br>엔비디아는 호실적에도 <b>-2.89%</b></p></div>
    <div class="rc" id="c2" style="position:absolute;top:1080px;left:70px;right:70px"><div class="t"><span style="color:${sky}">▲</span> 오후</div><p>낙폭 컸던 <b>반도체주</b>에 매수세.<br>SK하이닉스 <b>+3.41%</b> · 삼성전기 <b>+9.26%</b></p></div>
    <div id="c3" style="position:absolute;top:1470px;right:70px;transform:rotate(-2deg)"><span class="say">외국인은 여전히 <em>4,055억 순매도</em></span></div>
  </div>

  <!-- S4 큰 그림 -->
  <div class="sc" id="s4">
    <div style="position:absolute;top:260px;left:70px;right:70px"><div class="lbl">그래도 큰 그림은</div><div class="h2">6월 고점과 비교하면<br>아직 <em style="color:${mag}">-43.6%</em></div></div>
    <div style="position:absolute;top:640px;left:70px;right:70px;display:flex;justify-content:space-between;align-items:flex-end">${barsHTML}</div>
    <div id="s4note" style="position:absolute;top:1560px;left:70px;right:70px;font-size:36px;line-height:1.55;color:rgba(255,255,255,.85);font-weight:600">이틀 전(17일)엔 <b style="color:#fff">9개월 만에</b> 종가 5,000 아래로 내려갔었어요.</div>
  </div>

  <!-- S5 한 줄 정리 -->
  <div class="sc" id="s5">
    <div style="position:absolute;top:420px;left:70px;right:70px">
      <div class="lbl">KNOW-ISH 한 줄 정리</div>
      <div class="h2" style="font-size:96px">하루 반등은 맞지만,<br><em>방향</em>은 아직<br>확인 중</div>
      <div style="margin-top:60px;font-size:38px;line-height:1.6;color:rgba(255,255,255,.75);font-weight:500">美 금리 경로와 외국인 수급,<br>이 두 가지부터 같이 보세요.</div>
    </div>
    <div style="position:absolute;bottom:330px;left:70px;display:flex;gap:18px"><span class="chip hot">저장해두고 다시 보기</span><span class="chip" style="background:transparent;color:#fff;border:3px solid rgba(255,255,255,.4);box-shadow:none">@knowish.mag</span></div>
    <div class="src">자료: 한국거래소(디지털데일리·아시아경제·파이낸셜뉴스 보도) · 투자 권유가 아닌 정보 제공용입니다</div>
  </div>
</div>
<script>
const $ = (s) => document.querySelector(s), $$ = (s) => [...document.querySelectorAll(s)];
const cl = (x) => Math.max(0, Math.min(1, x));
const eo = (x) => 1 - Math.pow(1 - cl(x), 3);              // ease-out
const pop = (x) => { x = cl(x); return x < 1 ? 1 + 2.2 * Math.pow(x - 1, 3) + 1.2 * Math.pow(x - 1, 2) : 1; }; // back-out
const span = (t, a, b) => cl((t - a) / (b - a));
function scene(el, t, a, b, fade = 0.35) {
  const o = Math.min(span(t, a, a + fade), 1 - span(t, b - fade, b));
  el.style.opacity = o; return t >= a && t <= b;
}
function rise(el, p, dy = 60) { el.style.opacity = eo(p); el.style.transform = 'translateY(' + (1 - eo(p)) * dy + 'px)'; }
const ln = document.getElementById('ln'); const L = ln.getTotalLength(); ln.style.strokeDasharray = L;
const ln0 = document.getElementById('ln0'); const L0 = ln0.getTotalLength(); ln0.style.strokeDasharray = L0;
window.setT = (t) => {
  // S1 0~4.2
  scene($('#s1'), t, 0, 4.2);
  rise($('#s1chips'), span(t, 0.1, 0.6), 30);
  ln0.style.strokeDashoffset = L0 * (1 - eo(span(t, 0, 2.2)));
  const sp = pop(span(t, 0.5, 1.1)); $('#s1stk').style.transform = 'rotate(4deg) scale(' + sp + ')'; $('#s1stk').style.opacity = cl(span(t, 0.5, 0.7));
  rise($('#s1badge'), span(t, 0.9, 1.3)); rise($('#s1t1'), span(t, 1.1, 1.6)); rise($('#s1t2'), span(t, 1.5, 2.0));
  // S2 4~10.5
  scene($('#s2'), t, 4.0, 10.5);
  const d = eo(span(t, 4.6, 8.2)); ln.style.strokeDashoffset = L * (1 - d);
  $('#area').setAttribute('opacity', eo(span(t, 8.0, 8.8)));
  $$('.pt').forEach((c) => { const at = [4.6, 6.0, 8.2][+c.dataset.k]; c.setAttribute('opacity', cl(span(t, at, at + 0.2))); c.setAttribute('r', 16 * pop(span(t, at, at + 0.4))); });
  $$('.pl').forEach((g) => { const at = [4.8, 6.2, 8.4][+g.dataset.k]; g.setAttribute('opacity', eo(span(t, at, at + 0.4))); });
  const rec = 174.28 * eo(span(t, 8.2, 9.6)); $('#cnt').textContent = '+' + rec.toFixed(2);
  // S3 10.3~15.4
  scene($('#s3'), t, 10.3, 15.4);
  rise($('#c1'), span(t, 10.8, 11.3), 80); rise($('#c2'), span(t, 12.0, 12.5), 80);
  const c3 = pop(span(t, 13.2, 13.7)); $('#c3').style.opacity = cl(span(t, 13.2, 13.4)); $('#c3').style.transform = 'rotate(-2deg) scale(' + c3 + ')';
  // S4 15.2~18.8
  scene($('#s4'), t, 15.2, 18.8);
  $$('.bar').forEach((b) => { const k = +b.dataset.k; const p = eo(span(t, 15.6 + k * 0.45, 16.6 + k * 0.45)); const f = b.querySelector('.bf'); f.style.height = (+f.dataset.h * p) + 'px'; b.querySelector('.bv').style.opacity = cl(span(t, 16.4 + k * 0.45, 16.7 + k * 0.45)); });
  rise($('#s4note'), span(t, 17.2, 17.7));
  // S5 18.6~21
  scene($('#s5'), t, 18.6, 21.4);
};
window.setT(0);
</script>`;

export const html = page(body, css);
