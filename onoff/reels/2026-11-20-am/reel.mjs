// KNOW 릴스: 한한령 풀리나? 한중 FTA 서비스·투자 후속협상 실질 타결 (2026-11-18 현지시간)
// 근거: posts/2026-11-20-am/content.json 의 sources (산업통상부·청와대 브리핑 보도)
import { page, BRAND } from '../../src/templates.mjs';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

export const duration = 21;
export const posterAt = 2.8;
const { ink, sky, mag } = BRAND;
const deep = '#0B72C9';
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const coverImg = pathToFileURL(path.join(ROOT, 'posts/2026-11-20-am/images/01-cover-graphic.png')).href;

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

const items = [
  ['콘텐츠 ‘최혜국 대우’', '영화·게임, 제3국보다 불리하지 않게<br>사전심사도 비차별 원칙'],
  ['공동제작 확대', '영화뿐 → 드라마·애니·예능·다큐까지'],
  ['단체관광객 직접 모집', '우리 여행사가 중국 단체관광객 모집 근거'],
  ['법률·유통·금융 개방', '투자자 보호(ISDS)도 투자 설립 이전 단계까지'],
];

const body = `<div class="stage">
  <div class="bg"></div><div class="grid"></div>
  <div class="top"><span class="logo"><span class="kn">KNOW</span><span class="ish">-ish</span></span><span class="d">11.20 FRI · KNOW 경제</span></div>

  <div class="sc" id="s1">
    <div id="s1img" style="position:absolute;top:240px;left:0;width:1080px;height:1350px;background:url('${coverImg}') center 30%/cover"></div>
    <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(14,14,16,1) 0%,rgba(14,14,16,0) 18%,rgba(14,14,16,0) 38%,rgba(14,14,16,.95) 62%,${ink} 100%)"></div>
    <div id="s1chips" style="position:absolute;top:260px;left:70px;display:flex;gap:16px"><span class="chip">서비스·투자</span><span class="chip dark">K팝은 빠짐</span></div>
    <div id="s1stk" style="position:absolute;top:420px;right:70px;transform:rotate(4deg)"><span class="sticker">10년 만에?</span></div>
    <div style="position:absolute;left:70px;right:70px;top:1060px">
      <div id="s1badge"><span class="badge">KNOW · 경제</span></div>
      <div class="h1" id="s1t1" style="margin-top:36px">‘한한령’ 풀리나?</div>
      <div class="h1" id="s1t2"><em>8년 8개월</em> 만의<br>한중 합의</div>
    </div>
  </div>

  <div class="sc" id="s2">
    <div style="position:absolute;top:260px;left:70px;right:70px"><div class="lbl">타임라인</div><div class="h2">막혔던 10년,<br>협상만 <em>8년 8개월</em></div></div>
    <div class="tl" id="tl"></div>
    <div class="ev" id="e1" style="top:690px;--c:${mag}"><i></i><div><div class="y">2016</div><div class="t">사드 배치 결정 이후<br>K-콘텐츠 중국 진출 막힘 (한한령)</div></div></div>
    <div class="ev" id="e2" style="top:1000px;--c:#9aa3b5"><i></i><div><div class="y">2018. 3</div><div class="t">한중 FTA 서비스·투자<br>후속협상 시작</div></div></div>
    <div class="ev" id="e3" style="top:1310px;--c:${sky}"><i></i><div><div class="y">2026. 11. 18</div><div class="t">선전 APEC 정상회담에서<br><b style="color:#fff">실질 타결</b> 선언</div></div></div>
  </div>

  <div class="sc" id="s3">
    <div style="position:absolute;top:260px;left:70px;right:70px"><div class="lbl">뭐가 달라지나</div><div class="h2">문이 열리는 곳 <em>4</em></div></div>
    ${items.map(([t, s], k) => `<div class="it" id="i${k}" style="top:${560 + k * 270}px"><span class="n">${k + 1}</span><div><div class="t">${t}</div><div class="s">${s}</div></div></div>`).join('')}
  </div>

  <div class="sc" id="s4">
    <div style="position:absolute;top:260px;left:70px;right:70px"><div class="lbl" style="color:${mag}">그런데 아직</div><div class="h2">‘끝났다’가 아니라<br><em>‘열리기 시작’</em></div></div>
    <div class="it no" id="n1" style="top:660px"><span class="n">!</span><div><div class="t">K팝 등 공연은 빠짐</div><div class="s">협정에 명시되지 않았어요</div></div></div>
    <div class="it no" id="n2" style="top:930px"><span class="n">!</span><div><div class="t">정식 서명·발효 전</div><div class="s">협정문 법률 검토 등 절차가 남았어요</div></div></div>
    <div class="it no" id="n3" style="top:1200px"><span class="n">!</span><div><div class="t">중국은 ‘한한령’ 공식 인정 X</div><div class="s">문화교류는 “점진적으로” (시 주석)</div></div></div>
    <div id="sb" style="position:absolute;top:1500px;right:70px;transform:rotate(-2deg)"><span class="say">공연 허가 의무는 없지만 <em>금지 조항도 없다</em></span></div>
  </div>

  <div class="sc" id="s5">
    <div style="position:absolute;top:420px;left:70px;right:70px">
      <div class="lbl">KNOW-ISH 한 줄 정리</div>
      <div class="h2" style="font-size:100px">문은 열렸다,<br><em>얼마나 열릴지</em>는<br>이제부터</div>
      <div style="margin-top:60px;font-size:38px;line-height:1.6;color:rgba(255,255,255,.75);font-weight:500">K팝 공연 허가, 서명·발효 일정 나오면<br>바로 정리해드릴게요.</div>
    </div>
    <div style="position:absolute;bottom:330px;left:70px;display:flex;gap:18px"><span class="chip hot">저장해두고 다시 보기</span><span class="chip" style="background:transparent;color:#fff;border:3px solid rgba(255,255,255,.4);box-shadow:none">@knowish.mag</span></div>
    <div class="src">자료: 산업통상부·청와대 브리핑(시사저널·노컷뉴스·한국경제·한국일보·데일리경제 보도)</div>
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
window.setT = (t) => {
  scene($('#s1'), t, 0, 4.2);
  const z = 1.12 - 0.12 * eo(span(t, 0, 4)); $('#s1img').style.transform = 'scale(' + z + ')';
  rise($('#s1chips'), span(t, 0.2, 0.7), 30);
  $('#s1stk').style.opacity = cl(span(t, 0.6, 0.8)); $('#s1stk').style.transform = 'rotate(4deg) scale(' + pop(span(t, 0.6, 1.2)) + ')';
  rise($('#s1badge'), span(t, 1.0, 1.4)); rise($('#s1t1'), span(t, 1.2, 1.7)); rise($('#s1t2'), span(t, 1.6, 2.1));

  scene($('#s2'), t, 4.0, 9.6);
  $('#tl').style.height = (680 * eo(span(t, 4.5, 8.0))) + 'px';
  slide($('#e1'), span(t, 4.6, 5.2)); slide($('#e2'), span(t, 5.9, 6.5)); slide($('#e3'), span(t, 7.2, 7.8));
  $('#e3').querySelector('i').style.transform = 'scale(' + pop(span(t, 7.2, 7.8)) + ')';

  scene($('#s3'), t, 9.4, 14.2);
  [0, 1, 2, 3].forEach((k) => rise($('#i' + k), span(t, 9.9 + k * 0.6, 10.4 + k * 0.6), 70));

  scene($('#s4'), t, 14.0, 18.8);
  ['#n1', '#n2', '#n3'].forEach((s, k) => rise($(s), span(t, 14.5 + k * 0.6, 15.0 + k * 0.6), 70));
  $('#sb').style.opacity = cl(span(t, 16.6, 16.8)); $('#sb').style.transform = 'rotate(-2deg) scale(' + pop(span(t, 16.6, 17.1)) + ')';

  scene($('#s5'), t, 18.6, 21.4);
};
window.setT(0);
</script>`;

export const html = page(body, css);
