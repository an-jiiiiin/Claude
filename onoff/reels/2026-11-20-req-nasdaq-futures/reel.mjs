// KNOW 릴스(요청형): 나스닥 '선물'이 뭐길래 — 선물(膳物) 아니고 선물(先物)
// 근거: CME Group 상품 명세(E-mini Nasdaq-100, 거래시간·승수), Schwab 상품 안내, 알파스퀘어(선물≠본장)
// 시간 환산: CME Globex 일~금 18:00~17:00 ET, 11월(미국 서머타임 해제, ET=UTC-5) → KST +14시간
import { page, BRAND } from '../../src/templates.mjs';

export const duration = 21;
export const posterAt = 2.9;
const { ink, sky, mag } = BRAND;
const deep = '#0B72C9';

const css = `
html,body{margin:0;background:${ink}}
.stage{width:1080px;height:1920px;position:relative;overflow:hidden;background:${ink};font-family:'Pretendard';color:#fff;letter-spacing:-0.03em;word-break:keep-all}
.bg{position:absolute;inset:0;background:radial-gradient(90% 60% at 80% 10%, rgba(92,211,255,.16), transparent 60%),radial-gradient(70% 50% at 10% 90%, rgba(255,30,200,.12), transparent 60%)}
.grid{position:absolute;inset:0;opacity:.07;background-image:linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px);background-size:90px 90px}
.sc{position:absolute;inset:0;opacity:0}
.top{position:absolute;top:110px;left:70px;right:70px;display:flex;justify-content:space-between;align-items:center;z-index:9}
.top .d{font-weight:700;font-size:30px;opacity:.85}
.corner{display:inline-flex;align-items:center;gap:12px;background:${sky};color:${ink};font-weight:900;font-size:44px;padding:12px 26px 10px;border-radius:14px;transform:rotate(2deg);box-shadow:5px 5px 0 #000,0 0 30px rgba(92,211,255,.45)}
.corner small{font-size:28px;font-weight:800;opacity:.7}
.cbig{display:inline-flex;align-items:center;gap:22px;background:#fff;color:${ink};padding:18px 34px 16px 22px;border-radius:20px;box-shadow:8px 8px 0 #000;transform:rotate(-2deg)}
.cbig .ic{width:96px;height:96px;border-radius:16px;background:${sky};display:flex;align-items:center;justify-content:center;font-size:60px}
.cbig .k{font-weight:900;font-size:92px;line-height:1;letter-spacing:-0.05em}
.cbig .n{font-weight:800;font-size:30px;color:${deep};margin-top:6px}
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
.say{display:inline-block;background:#fff;border:4px solid #111;color:#111;font-weight:800;font-size:40px;padding:16px 26px;box-shadow:6px 6px 0 #000}
.say em{font-style:normal;color:${deep}}
.src{position:absolute;left:70px;right:70px;bottom:90px;font-size:24px;opacity:.55;line-height:1.5}

/* 선물상자 */
.gift{position:absolute;left:50%;top:560px;width:440px;height:420px;margin-left:-220px}
.gift .bx{position:absolute;left:20px;right:20px;bottom:0;height:290px;background:${mag};border-radius:14px;box-shadow:12px 12px 0 #000}
.gift .lid{position:absolute;left:0;right:0;top:70px;height:90px;background:#ff4fd8;border-radius:14px;box-shadow:12px 12px 0 #000;transform-origin:10% 100%}
.gift .rv{position:absolute;left:50%;margin-left:-28px;width:56px;top:0;bottom:0;background:${sky}}
.gift .bow{position:absolute;left:50%;top:-70px;margin-left:-110px;width:220px;height:90px}
.gift .bow i{position:absolute;top:0;width:100px;height:80px;border:16px solid ${sky};border-radius:50% 50% 10% 50%}
.gift .bow i:first-child{left:0;transform:rotate(-20deg)}
.gift .bow i:last-child{right:0;transform:scaleX(-1) rotate(-20deg)}
.gift .line{overflow:visible;position:absolute;left:30px;right:30px;bottom:150px;height:360px;opacity:0}
.xmark{position:absolute;left:50%;top:520px;margin-left:-260px;width:520px;height:520px;opacity:0}
.xmark::before,.xmark::after{content:'';position:absolute;left:-20px;right:-20px;top:50%;height:34px;margin-top:-17px;background:#ff3b3b;border-radius:17px;box-shadow:6px 6px 0 #000}
.xmark::before{transform:rotate(45deg)}.xmark::after{transform:rotate(-45deg)}

/* 한자 카드 */
.hj{position:absolute;left:70px;right:70px;display:flex;align-items:center;gap:40px;background:#1b1c22;border-radius:30px;padding:44px 48px;border:3px solid rgba(255,255,255,.1);opacity:0}
.hj .c{flex:none;font-family:'Black Han Sans';font-size:150px;line-height:1;width:330px;text-align:center}
.hj .t{font-weight:900;font-size:52px;margin-bottom:10px}
.hj .s{font-size:36px;color:rgba(255,255,255,.75);line-height:1.45;font-weight:500}
.hj.no{border-color:rgba(255,30,200,.5)}
.hj.no .c{color:${mag}}
.hj.ok{border-color:${sky};box-shadow:0 0 50px rgba(92,211,255,.25)}
.hj.ok .c{color:${sky}}
.strike{position:absolute;left:40px;width:350px;top:50%;height:10px;background:#ff3b3b;border-radius:5px;transform-origin:left center;transform:scaleX(0)}

/* 약속 흐름 */
.step{position:absolute;left:70px;right:70px;background:#1b1c22;border-radius:26px;padding:34px 40px;border:2px solid rgba(255,255,255,.08);opacity:0}
.step .k{font-weight:800;font-size:34px;color:${sky};margin-bottom:8px}
.step .t{font-weight:900;font-size:50px;line-height:1.3}
.step .s{font-size:34px;color:rgba(255,255,255,.72);margin-top:8px;font-weight:500;line-height:1.45}
.arrow{position:absolute;left:50%;margin-left:-30px;font-size:60px;color:${sky};opacity:0;font-weight:900}

/* 24시간 바 */
.bar{position:absolute;left:70px;right:70px;height:96px;border-radius:20px;background:#22242c;overflow:hidden}
.bar .on{position:absolute;top:0;bottom:0;left:0;background:linear-gradient(90deg,${deep},${sky});width:0}
.bar .gap{position:absolute;top:0;bottom:0;background:${ink};border-left:3px dashed rgba(255,255,255,.5);border-right:3px dashed rgba(255,255,255,.5)}
.bar .fill{position:absolute;top:0;bottom:0;border-radius:0}
.rowl{position:absolute;left:70px;font-weight:900;font-size:40px}
.rowl small{font-weight:600;font-size:30px;color:rgba(255,255,255,.65);margin-left:14px}
.ticks{position:absolute;left:70px;right:70px;height:40px;font-size:28px;color:rgba(255,255,255,.55);font-weight:700}
.ticks span{position:absolute;transform:translateX(-50%)}
`;

// 24시간 바: 08:00 KST 시작 → 다음날 08:00 KST (가로 940px = 24h)
const W = 940;
const x = (h) => (((h - 8 + 24) % 24) / 24) * W; // KST 시각 → px
const ticks = [8, 12, 16, 20, 0, 4, 7];

const body = `<div class="stage">
  <div class="bg"></div><div class="grid"></div>
  <div class="top"><span class="logo"><span class="kn">KNOW</span><span class="ish">-ish</span></span><span class="corner">📖 경제상식 <small>11.20</small></span></div>

  <div class="sc" id="s1">
    <div id="s1chips" style="position:absolute;top:260px;left:70px;display:flex;gap:16px"><span class="chip">오늘의 용어</span><span class="chip dark">나스닥 선물</span></div>
    <div class="gift" id="gift">
      <svg class="line" id="gline" viewBox="0 0 380 360"><polyline points="10,330 70,260 120,290 190,170 240,210 300,90 370,20" fill="none" stroke="${sky}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round" style="filter:drop-shadow(0 0 14px rgba(92,211,255,.8))"/></svg>
      <div class="bx"><div class="rv"></div></div>
      <div class="lid" id="lid"><div class="rv"></div><div class="bow"><i></i><i></i></div></div>
    </div>
    <div id="s1stk" style="position:absolute;top:400px;right:60px;transform:rotate(5deg)"><span class="sticker">포장 없음</span></div>
    <div style="position:absolute;left:70px;right:70px;top:1020px">
      <div id="s1badge"><span class="cbig"><span class="ic">📖</span><span><div class="k">경제상식</div><div class="n">KNOW-ISH 용어 사전</div></span></span></div>
      <div class="h1" id="s1t1" style="margin-top:36px">나스닥 ‘선물’,</div>
      <div class="h1" id="s1t2">리본은 <em>없습니다</em></div>
    </div>
  </div>

  <div class="sc" id="s2">
    <div style="position:absolute;top:260px;left:70px;right:70px"><div class="lbl">같은 ‘선물’, 다른 한자</div><div class="h2">받는 선물 말고<br><em>먼저 사는</em> 선물</div></div>
    <div class="hj no" id="h1" style="top:690px"><span class="c">膳物</span><div><div class="t">🎁 선물</div><div class="s">생일에 받는 그거.<br>나스닥이랑 관계 없음</div></div><div class="strike" id="stk"></div></div>
    <div class="hj ok" id="h2" style="top:1060px"><span class="c">先物</span><div><div class="t">📈 선물</div><div class="s"><b style="color:#fff">먼저 선(先) + 물건 물(物)</b><br>미래 가격을 <b style="color:${sky}">지금</b> 정하는 거래</div></div></div>
  </div>

  <div class="sc" id="s3">
    <div style="position:absolute;top:260px;left:70px;right:70px"><div class="lbl">쉽게 말하면</div><div class="h2">‘나중 가격’을<br><em>지금 약속</em>하는 것</div></div>
    <div class="step" id="p1" style="top:640px"><div class="k">비유하면</div><div class="t">김장 배추, 가을 값으로<br>미리 찜해두기 🥬</div></div>
    <div class="arrow" id="a1" style="top:960px">↓</div>
    <div class="step" id="p2" style="top:1050px"><div class="k">나스닥 선물은</div><div class="t">배추 대신 <em style="font-style:normal;color:${sky}">나스닥100 지수</em></div><div class="s">애플·엔비디아·MS 등 나스닥 대형주 100개<br>미국 CME 거래소, 1포인트 = 20달러 (E-mini 기준)</div></div>
  </div>

  <div class="sc" id="s4">
    <div style="position:absolute;top:260px;left:70px;right:70px"><div class="lbl">근데 왜 한국에서 봐요?</div><div class="h2">미국이 자는 동안에도<br><em>선물은 안 자요</em></div></div>
    <div class="ticks" style="top:690px">${ticks.map((h) => `<span style="left:${x(h)}px">${h}시</span>`).join('')}</div>
    <div class="rowl" style="top:750px">나스닥 선물 <small>하루 23시간</small></div>
    <div class="bar" style="top:815px"><div class="on" id="b1"></div><div class="gap" style="left:${x(7)}px;width:${W / 24}px"></div></div>
    <div class="rowl" style="top:960px">미국 본장 <small>23:30~06:00</small></div>
    <div class="bar" style="top:1025px"><div class="fill" id="b2" style="left:${x(23.5)}px;width:0;background:#9aa3b5"></div></div>
    <div class="rowl" style="top:1170px">코스피 <small>09:00~15:30</small></div>
    <div class="bar" style="top:1235px"><div class="fill" id="b3" style="left:${x(9)}px;width:0;background:${mag}"></div></div>
    <div style="position:absolute;top:1370px;left:70px;font-size:28px;color:rgba(255,255,255,.55);font-weight:600">한국 시간 · 11월(미국 서머타임 해제) 기준 · 아침 7~8시 1시간 휴식</div>
    <div id="sb4" style="position:absolute;top:1440px;right:70px;transform:rotate(-2deg)"><span class="say">한국 장중에도 움직여서 → <em>미국 분위기 미리보기</em></span></div>
  </div>

  <div class="sc" id="s5">
    <div style="position:absolute;top:380px;left:70px;right:70px">
      <div id="s5w" style="margin-bottom:60px"><span class="say" style="transform:rotate(-2deg)">⚠️ 선물 올랐다 ≠ <em>본장도 오른다</em></span></div>
      <div class="lbl">📖 경제상식 한 줄 정리</div>
      <div class="h2" style="font-size:96px">나스닥 선물 =<br>미국 기술주의<br><em>예고편</em></div>
      <div style="margin-top:50px;font-size:38px;line-height:1.6;color:rgba(255,255,255,.75);font-weight:500">포장도 리본도 없고,<br>‘미래 가격 약속’만 있어요.</div>
      <div style="margin-top:40px;font-size:36px;font-weight:800;color:${sky}">다음 경제상식, 궁금한 용어 댓글로 👇</div>
    </div>
    <div style="position:absolute;bottom:330px;left:70px;display:flex;gap:18px"><span class="chip hot">저장해두고 아는 척</span><span class="chip" style="background:transparent;color:#fff;border:3px solid rgba(255,255,255,.4);box-shadow:none">@knowish.mag</span></div>
    <div class="src">자료: CME Group 상품 명세(E-mini Nasdaq-100), Charles Schwab 선물 안내 · 투자 권유 아님</div>
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
const W = ${W};
window.setT = (t) => {
  // 1) 선물상자 흔들림 → 뚜껑 열림 → 상자 대신 차트
  scene($('#s1'), t, 0, 4.4);
  rise($('#s1chips'), span(t, 0.1, 0.6), 30);
  const shake = t < 1.1 ? Math.sin(t * 38) * 6 * span(t, 0.2, 0.5) : 0;
  $('#gift').style.transform = 'rotate(' + shake + 'deg)';
  const o = eo(span(t, 1.1, 1.6));
  $('#lid').style.transform = 'translate(' + (o * 160) + 'px,' + (-o * 260) + 'px) rotate(' + (o * 38) + 'deg)';
  $('#lid').style.opacity = 1 - span(t, 1.5, 1.9);
  const gl = $('#gline'); gl.style.opacity = eo(span(t, 1.3, 1.7)); gl.style.transform = 'translateY(' + (160 - eo(span(t, 1.3, 1.9)) * 300) + 'px) scale(1.15)';
  $('#s1stk').style.opacity = cl(span(t, 1.8, 2.0)); $('#s1stk').style.transform = 'rotate(5deg) scale(' + pop(span(t, 1.8, 2.3)) + ')';
  rise($('#s1badge'), span(t, 0.4, 0.8)); rise($('#s1t1'), span(t, 0.6, 1.1)); rise($('#s1t2'), span(t, 2.0, 2.5));

  // 2) 膳物 vs 先物
  scene($('#s2'), t, 4.2, 8.8);
  rise($('#h1'), span(t, 4.6, 5.1), 70);
  $('#stk').style.transform = 'scaleX(' + eo(span(t, 5.6, 6.0)) + ')';
  $('#h1').style.filter = 'grayscale(' + span(t, 5.6, 6.0) + ')';
  rise($('#h2'), span(t, 6.2, 6.7), 70);
  $('#h2').querySelector('.c').style.transform = 'scale(' + pop(span(t, 6.2, 6.8)) + ')';

  // 3) 약속 비유
  scene($('#s3'), t, 8.6, 12.8);
  rise($('#p1'), span(t, 9.0, 9.5), 70);
  $('#a1').style.opacity = eo(span(t, 10.0, 10.3));
  rise($('#p2'), span(t, 10.3, 10.8), 70);

  // 4) 24시간 바
  scene($('#s4'), t, 12.6, 17.4);
  $('#b1').style.width = (W * 23 / 24 * eo(span(t, 13.1, 14.3))) + 'px';
  $('#b2').style.width = (W * 6.5 / 24 * eo(span(t, 14.2, 14.8))) + 'px';
  $('#b3').style.width = (W * 6.5 / 24 * eo(span(t, 14.8, 15.4))) + 'px';
  $('#sb4').style.opacity = cl(span(t, 15.7, 15.9)); $('#sb4').style.transform = 'rotate(-2deg) scale(' + pop(span(t, 15.7, 16.2)) + ')';

  // 5) 주의 + 한 줄 정리
  scene($('#s5'), t, 17.2, 21.4);
  $('#s5w').style.opacity = cl(span(t, 17.5, 17.7)); $('#s5w').style.transform = 'scale(' + pop(span(t, 17.5, 18.0)) + ')';
};
window.setT(0);
</script>`;

export const html = page(body, css);
