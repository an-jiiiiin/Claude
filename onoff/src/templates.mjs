// KNOW-ISH 카드뉴스 템플릿 — 1080 x 1350 (인스타그램 4:5)
// 콘텐츠 JSON의 각 slide.type 에 맞는 HTML 을 만든다.
// 텍스트 문법: **굵게**  ==형광펜 강조==  줄바꿈은 \n
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const nm = (p) => pathToFileURL(path.join(ROOT, 'node_modules', p)).href;

export const BRAND = {
  name: 'KNOW-ISH',
  ink: '#0E0E10',
  paper: '#F5F3EE',
  sky: '#5CD3FF',  // 메인 · 오전 KNOW 시리즈
  mag: '#FF1EC8',  // 포인트 · 오후 -ISH 시리즈
  on: '#5CD3FF',
  off: '#FF1EC8',
  gray: '#6B6B70',
};

export const SERIES = {
  // accent: 면(스티커·배지)  fg: accent 위 글자색  deep: 밝은 종이 위 글자·선 색  hl: 형광펜
  // pastel: MAG 스타일 본문 바탕
  on: { key: 'on', label: 'KNOW', desc: '시사·경제', slot: 'AM', accent: BRAND.sky, fg: BRAND.ink, deep: '#0B72C9', hl: 'rgba(92,211,255,.38)', pastel: '#DCF4FF' },
  off: { key: 'off', label: '-ISH', desc: '마케팅', slot: 'PM', accent: BRAND.mag, fg: '#fff', deep: '#D1009E', hl: 'rgba(255,30,200,.20)', pastel: '#FFE6F7' },
};

const esc = (s = '') => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export const rich = (s = '') =>
  esc(s)
    .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
    .replace(/==(.+?)==/g, '<mark>$1</mark>')
    .replace(/\n/g, '<br>');

// 가로형 스티커 로고 (KNOW 하늘 블록 + -ish 마젠타 스티커)
export const logo = (size = 1) => `
<span class="logo" style="--s:${size}"><span class="kn">KNOW</span><span class="ish">-ish</span></span>`;

const css = `
@import url('${nm('pretendard/dist/web/static/pretendard.css')}');
@import url('${nm('@fontsource/black-han-sans/index.css')}');
@import url('${nm('@fontsource/permanent-marker/index.css')}');
@import url('${nm('@fontsource/nanum-gothic-coding/index.css')}');
*{margin:0;padding:0;box-sizing:border-box}
html,body{background:#888}
.card{width:1080px;height:1350px;position:relative;overflow:hidden;
  font-family:'Pretendard',sans-serif;color:${BRAND.ink};word-break:keep-all;
  -webkit-font-smoothing:antialiased;letter-spacing:-0.02em}
b{font-weight:800}

/* ---------- logo ---------- */
.logo{display:inline-flex;align-items:center;line-height:1;white-space:nowrap;padding:calc(4px*var(--s)) calc(10px*var(--s)) calc(8px*var(--s)) 0}
.logo .kn{display:inline-block;background:${BRAND.sky};color:${BRAND.ink};font-weight:900;letter-spacing:-0.05em;
  font-size:calc(30px*var(--s));padding:calc(6px*var(--s)) calc(10px*var(--s)) calc(4px*var(--s));transform:rotate(-3deg);
  box-shadow:calc(3px*var(--s)) calc(3px*var(--s)) 0 ${BRAND.ink}, calc(3px*var(--s)) calc(3px*var(--s)) 0 calc(1px*var(--s)) #fff}
.logo .ish{display:inline-block;background:${BRAND.mag};color:#fff;font-weight:900;font-style:italic;letter-spacing:-0.03em;
  font-size:calc(26px*var(--s));padding:calc(5px*var(--s)) calc(10px*var(--s)) calc(4px*var(--s));margin-left:calc(-4px*var(--s));
  border:calc(2px*var(--s)) solid #fff;border-radius:calc(5px*var(--s));transform:rotate(6deg) translateY(calc(4px*var(--s)));
  box-shadow:calc(3px*var(--s)) calc(3px*var(--s)) 0 ${BRAND.ink}}

/* ---------- photo / placeholder ---------- */
.photo{position:absolute;inset:0;background-size:cover;background-position:center}
.ph{background:
   radial-gradient(120% 80% at 30% 20%, #5a5f6b 0%, #2a2d33 55%, #15161a 100%);
  display:flex;align-items:center;justify-content:center;flex-direction:column;gap:14px;color:rgba(255,255,255,.55)}
.ph::before{content:'';position:absolute;inset:0;opacity:.18;
  background-image:repeating-linear-gradient(45deg,#fff 0 2px,transparent 2px 22px)}
.ph .phl{position:relative;font-weight:700;font-size:30px;letter-spacing:.2em}
.ph .phd{position:relative;font-weight:500;font-size:22px;max-width:70%;text-align:center;line-height:1.5}

/* ---------- COVER (2EZ 스타일) ---------- */
.cover{color:#fff;background:#111}
.cover .shade{position:absolute;inset:0;
  background:linear-gradient(180deg,rgba(0,0,0,.45) 0%,rgba(0,0,0,0) 22%,rgba(0,0,0,0) 42%,rgba(0,0,0,.78) 72%,rgba(0,0,0,.92) 100%)}
.cover .top{position:absolute;top:56px;left:60px;right:60px;display:flex;justify-content:space-between;align-items:center}
.cover .date{font-weight:700;font-size:26px;letter-spacing:.04em;opacity:.9}
.cover .sticker{position:absolute;top:190px;right:60px;transform:rotate(4deg);
  font-family:'Black Han Sans';font-size:84px;line-height:1;padding:18px 28px 14px;
  background:var(--acc);color:var(--acf);box-shadow:8px 8px 0 ${BRAND.ink},0 0 50px color-mix(in srgb,var(--acc) 45%,transparent)}
.cover .sticker.left{right:auto;left:60px;transform:rotate(-4deg)}
.cover .bottom{position:absolute;left:60px;right:60px;bottom:96px}
.cover .badge{display:inline-flex;align-items:center;gap:10px;font-weight:800;font-size:28px;
  padding:10px 22px;border-radius:999px;color:var(--acf);margin-bottom:28px}
.cover .badge::before{content:'';width:12px;height:12px;border-radius:50%;background:currentColor}
.cover h1{font-weight:900;font-size:86px;line-height:1.2;letter-spacing:-0.045em;text-shadow:0 2px 24px rgba(0,0,0,.35)}
.cover h1 mark{background:none;color:var(--acc);text-shadow:0 0 28px color-mix(in srgb,var(--acc) 55%,transparent)}
.cover .credit{position:absolute;bottom:38px;right:60px;font-size:20px;font-weight:500;opacity:.7}
.cover .swipe{position:absolute;bottom:38px;left:60px;font-size:20px;font-weight:700;opacity:.8;letter-spacing:.06em}

/* ---------- BODY (MOT / LUX 스타일) ---------- */
.body{background:${BRAND.paper}}
.body::after{content:'';position:absolute;inset:0;pointer-events:none;opacity:.35;
  background-image:radial-gradient(rgba(0,0,0,.05) 1px,transparent 1px);background-size:6px 6px}
.body .head{position:absolute;top:56px;left:80px;right:80px;display:flex;justify-content:space-between;align-items:center;z-index:1}
.body .kicker{font-weight:800;font-size:24px;letter-spacing:.02em;display:flex;align-items:center;gap:12px}
.body .kicker .dot{width:14px;height:14px;border-radius:50%}
.body .pno{font-weight:800;font-size:24px;color:${BRAND.gray};font-variant-numeric:tabular-nums}
.body .pno b{color:${BRAND.ink}}
.body .wrap{position:absolute;top:140px;left:80px;right:80px;bottom:150px;display:flex;flex-direction:column;z-index:1}
.body figure{position:relative;height:500px;border-radius:6px;overflow:hidden;flex:none}
.body figure .photo{position:absolute;inset:0}
.body figcaption{font-size:20px;color:${BRAND.gray};margin-top:12px;text-align:right}
.body h2{font-weight:800;font-size:54px;line-height:1.3;letter-spacing:-0.04em;margin:44px 0 30px;
  padding-left:30px;border-left:8px solid var(--ac)}
.body.noimg h2{font-size:72px;margin-top:60px;margin-bottom:48px}
.body.noimg > .wrap > p{font-size:40px;line-height:1.7}
.body.noimg > .wrap > p + p{margin-top:34px}
.body p{font-weight:500;font-size:34px;line-height:1.66;color:#2a2a2e;padding-left:38px}
.body p + p{margin-top:22px}
.body mark{background:linear-gradient(transparent 58%, var(--hl) 58%);color:inherit;padding:0 2px}
.body p b{color:var(--ac)}
.body .foot{position:absolute;left:80px;right:80px;bottom:56px;display:flex;justify-content:space-between;align-items:center;z-index:1;color:${BRAND.ink}}
.body .ref{font-size:21px;color:${BRAND.gray};max-width:70%;text-align:right;line-height:1.4}

/* compare */
.cmp{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:10px}
.cmp .col{background:#fff;border-radius:18px;padding:40px 36px;box-shadow:0 1px 0 rgba(0,0,0,.06)}
.cmp .tag{display:inline-block;font-weight:800;font-size:26px;padding:8px 18px;border-radius:999px;color:#fff;margin-bottom:24px}
.cmp h3{font-weight:800;font-size:40px;line-height:1.3;margin-bottom:20px;letter-spacing:-0.035em}
.cmp p{padding:0;font-size:29px;line-height:1.6}
.body .note{margin-top:34px;padding-left:0;font-size:30px}

/* points */
.pts{display:flex;flex-direction:column;gap:22px;margin-top:6px}
.pt{display:flex;gap:28px;background:#fff;border-radius:18px;padding:34px 36px;align-items:flex-start}
.pt .n{flex:none;width:64px;height:64px;border-radius:50%;display:flex;align-items:center;justify-content:center;
  font-weight:900;font-size:30px;color:#fff;background:var(--ac)}
.pt h3{font-weight:800;font-size:36px;letter-spacing:-0.035em;margin-bottom:8px}
.pt p{padding:0;font-size:28px;line-height:1.55}

/* ---------- OUTRO ---------- */
.outro{background:${BRAND.ink};color:#fff;display:flex;flex-direction:column;padding:120px 80px 80px}
.outro .lbl{font-weight:800;font-size:28px;color:var(--acc);letter-spacing:.04em;margin-bottom:36px}
.outro h2{font-weight:900;font-size:72px;line-height:1.28;letter-spacing:-0.045em}
.outro h2 mark{background:none;color:var(--acc)}
.outro .sub{margin-top:40px;font-size:32px;line-height:1.65;color:rgba(255,255,255,.75);font-weight:500}
.outro .cta{margin-top:auto;display:flex;gap:18px;flex-wrap:wrap}
.outro .cta span{border:2px solid rgba(255,255,255,.3);border-radius:999px;padding:16px 30px;font-size:27px;font-weight:700}
.outro .cta span.p{background:var(--acc);color:var(--acf);border-color:var(--acc)}
.outro .bot{margin-top:60px;display:flex;justify-content:space-between;align-items:center}
.outro .next{font-size:24px;color:rgba(255,255,255,.6);font-weight:600}
/* ================= MAG 스타일 (에디터 매거진 톤) ================= */
.mono{font-family:'Nanum Gothic Coding',monospace;letter-spacing:0}
.mcover{color:#fff;background:#111}
.mcover .shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.5) 0%,rgba(0,0,0,0) 16%,rgba(0,0,0,0) 45%,rgba(0,0,0,.72) 78%,rgba(0,0,0,.85) 100%)}
.mcover .lab{position:absolute;top:44px;left:48px;right:48px;display:flex;justify-content:space-between;font-size:30px;color:#fff;text-shadow:0 1px 10px rgba(0,0,0,.55)}
.mcover .lab span:first-child::before{content:'';display:inline-block;width:14px;height:14px;background:var(--acc);margin-right:10px;vertical-align:2px}
.mcover .bottom{position:absolute;left:48px;right:60px;bottom:118px}
.mcover .tag{display:inline-flex;align-items:center;gap:14px;margin-bottom:26px;font-weight:800;font-size:30px}
.mcover .tag i{width:22px;height:22px;background:var(--acc);display:block}
.mcover .tag span{background:var(--acc);color:var(--acf);padding:2px 12px}
.mcover h1{font-weight:600;font-size:96px;line-height:1.22;letter-spacing:-0.035em;text-shadow:0 2px 20px rgba(0,0,0,.35)}
.mcover h1 mark{background:none;color:var(--acc)}
.mcover .src{position:absolute;left:48px;bottom:40px;font-size:20px;opacity:.75}
.mcover .mlogo{position:absolute;right:48px;bottom:34px;opacity:.95}
.stack{display:inline-flex;flex-direction:column;align-items:flex-start;--s:1}
.stack .kn{background:${BRAND.sky};color:${BRAND.ink};font-weight:900;letter-spacing:-0.05em;line-height:1;font-size:calc(30px*var(--s));padding:calc(5px*var(--s)) calc(9px*var(--s)) calc(3px*var(--s));transform:rotate(-3deg)}
.stack .ish{align-self:flex-end;margin:calc(-3px*var(--s)) calc(-10px*var(--s)) 0 0;background:${BRAND.mag};color:#fff;font-weight:900;font-style:italic;line-height:1;font-size:calc(26px*var(--s));padding:calc(4px*var(--s)) calc(9px*var(--s));border:calc(2px*var(--s)) solid #fff;border-radius:calc(5px*var(--s));transform:rotate(7deg)}

/* 파스텔 본문 (letter / meme / mag 본문 공통) */
.pastel{background:var(--pa)}
.pastel .mtop{position:absolute;top:44px;left:60px;right:60px;display:flex;justify-content:space-between;align-items:center;font-size:24px;color:#555;z-index:2}
.pastel .mtop .pg{font-weight:700;background:rgba(0,0,0,.55);color:#fff;border-radius:999px;padding:6px 16px;font-family:'Pretendard'}
.pastel .msrc{position:absolute;left:60px;bottom:44px;font-size:20px;color:#8a8a8a;z-index:2}
.pastel .mfoot{position:absolute;right:60px;bottom:36px;z-index:2}
.letter .in{position:absolute;top:170px;left:60px;right:60px}
.letter h2{font-weight:800;font-size:54px;line-height:1.35;letter-spacing:-0.035em;margin-bottom:40px}
.letter p{font-size:31px;line-height:1.75;color:#222;font-weight:500}
.letter p + p{margin-top:28px}
.letter b{font-weight:800;color:#111}
.letter mark{background:linear-gradient(transparent 58%, var(--hl) 58%);color:inherit}
.letter .pic{position:relative;margin-top:44px;width:600px;height:400px;overflow:hidden;border-radius:4px}
.letter .pic .photo{position:absolute;inset:0}
.say{display:inline-block;background:#fff;border:3px solid #111;padding:14px 22px;font-size:30px;line-height:1.45;font-weight:600;text-align:center;color:#111;letter-spacing:-0.02em}
.say mark{background:none;color:var(--dp);font-weight:900}
.say b{font-weight:900}
.letter .say{position:absolute;left:560px;margin-top:-330px}
/* meme board */
.meme{background:#111}
.meme .panel{position:absolute;left:0;right:0;overflow:hidden;border-bottom:4px solid #111}
.meme .panel .photo{position:absolute;inset:0}
.meme .panel .cap{position:absolute;display:flex;flex-direction:column;gap:12px;max-width:62%}
.meme .panel .cap.l{left:36px}.meme .panel .cap.r{right:36px;align-items:flex-end}
.meme .panel .cap .say:nth-child(2){margin-left:120px}
.meme .panel .cap.r .say:nth-child(2){margin-left:0;margin-right:110px}
.meme .ttl{position:absolute;top:30px;left:0;right:0;text-align:center;z-index:3}
.meme .ttl span{font-family:'Black Han Sans';font-size:58px;color:#fff;-webkit-text-stroke:3px #111;paint-order:stroke fill;text-shadow:4px 4px 0 var(--dp)}
.meme .msrc{color:#fff;background:rgba(0,0,0,.55);padding:4px 12px;border-radius:6px;left:24px;bottom:16px}
/* mag 본문(body/points/compare) 오버라이드 */
.body.mag{background:var(--pa)}
.body.mag::after{display:none}
.body.mag h2{border-left:none;padding-left:0}
.body.mag p{padding-left:0}
.body.mag .kicker{font-family:'Nanum Gothic Coding',monospace;font-weight:700}
.outro.mag{background:var(--pa);color:${BRAND.ink}}
.outro.mag .lbl{color:var(--dp)}
.outro.mag h2 mark{color:var(--dp)}
.outro.mag .sub{color:#333}
.outro.mag .cta span{border-color:rgba(0,0,0,.25)}
.outro.mag .next{color:#666}

/* ===== 말풍선 (classic 에서도 사용) ===== */
.bub{position:absolute;z-index:4;transform:rotate(var(--rot,0deg))}
.cover .bub .say{font-size:36px;box-shadow:6px 6px 0 rgba(0,0,0,.85)}
.body figure .bub .say{font-size:26px;padding:10px 18px}
/* ===== 갤러리 (사진 2~4장) ===== */
.gal{display:grid;gap:14px;flex:none}
.gal.n2{grid-template-columns:1fr 1fr;height:640px}
.gal.n3{grid-template-columns:1.25fr 1fr;grid-template-rows:1fr 1fr;height:700px}
.gal.n3 .cell:first-child{grid-row:1 / 3}
.gal.n4{grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;height:740px}
.gal .cell{position:relative;overflow:hidden;border-radius:6px;background:#ddd}
.gal .cell .photo{position:absolute;inset:0}
.gal .cell .cr{position:absolute;right:8px;bottom:8px;font-size:16px;color:#fff;background:rgba(0,0,0,.5);padding:2px 8px;border-radius:4px;z-index:3}
.gal .cell .lbl{position:absolute;left:12px;top:12px;z-index:3;font-weight:800;font-size:22px;background:var(--acc,#111);color:var(--acf,#fff);padding:4px 12px}
.gal .cell .bub .say{font-size:24px;padding:8px 14px}
.body.gallery h2{margin:20px 0 26px}
.body.gallery p{font-size:30px;margin-top:26px}

`;

// image.src: http(s) URL 또는 onoff/ 기준 로컬 경로 (예: posts/2026-11-20-am/images/01.jpg)
const srcURL = (src) => (/^(https?|file):/.test(src) ? src : pathToFileURL(path.resolve(ROOT, src)).href);
const photo = (img, cls = '') =>
  img && img.src
    ? `<div class="photo ${cls}" style="background-image:url('${srcURL(img.src)}');background-position:${img.pos || 'center'};background-size:${img.fit === 'contain' ? 'contain' : img.zoom ? `${img.zoom * 100}% auto` : 'cover'};background-repeat:no-repeat;background-color:${img.bg || '#111'}"></div>`
    : `<div class="photo ph ${cls}"><span class="phl">PHOTO</span><span class="phd">${esc(img?.hint || '실사 이미지 영역')}</span></div>`;


// 말풍선: [{text, x, y, rot}]  x·y 는 % (왼쪽 위 기준), rot 은 기울기(도)
const bubbles = (list = []) =>
  (Array.isArray(list) ? list : [list]).map((b, k) => {
    const o = typeof b === 'string' ? { text: b } : b;
    const x = o.x ?? (k % 2 ? 46 : 6), y = o.y ?? 30 + k * 12, rot = o.rot ?? (k % 2 ? 2 : -2);
    return `<div class="bub" style="left:${x}%;top:${y}%;--rot:${rot}deg"><div class="say">${rich(o.text)}</div></div>`;
  }).join('');

const credit = (img) => (img?.credit ? `사진 | ${esc(img.credit)}` : '');

const pad = (n) => String(n).padStart(2, '0');
const vol = (d) => (d.vol ? `vol. ${String(d.vol).padStart(3, '0')}` : esc(d.dateLabel || ''));
const stackLogo = (sz = 1) => `<span class="stack" style="--s:${sz}"><span class="kn">KNOW</span><span class="ish">-ish</span></span>`;
const magVars = (S) => `--acc:${S.accent};--acf:${S.fg};--pa:${S.pastel};--dp:${S.deep};--hl:${S.hl}`;

function coverMag(s, d, S) {
  return `<div class="card mcover" style="${magVars(S)}">
  ${photo(s.image)}
  <div class="shade"></div>
  <div class="lab mono"><span>${vol(d)}</span><span>editor_ 노이쉬</span></div>
  <div class="bottom">
    <div class="tag"><i></i><span>${esc(s.tag || d.category || S.desc)}</span></div>
    <h1>${rich(s.title)}</h1>
  </div>
  <div class="src">${s.image?.credit ? '출처 | ' + esc(s.image.credit) : ''}</div>
  <div class="mlogo">${stackLogo(1)}</div>
</div>`;
}

function magTop(d, S, i, n, label) {
  return `<div class="mtop"><span class="mono">${esc(label || `${vol(d)} · ${S.label} ${d.category || S.desc}`)}</span><span class="pg">${i + 1}/${n}</span></div>`;
}

function letter(s, d, S, i, n) {
  const paras = (s.text || []).map((t) => `<p>${rich(t)}</p>`).join('');
  return `<div class="card pastel letter" style="${magVars(S)}">
  ${magTop(d, S, i, n, s.label)}
  <div class="in"><h2>${rich(s.title)}</h2>${paras}
  ${s.image ? `<div class="pic">${photo(s.image)}</div>` : ''}
  ${s.say ? `<div class="say">${rich(s.say)}</div>` : ''}</div>
  <div class="msrc">${s.image?.credit ? '출처 | ' + esc(s.image.credit) : s.ref ? 'Ref. ' + esc(s.ref) : ''}</div>
  <div class="mfoot">${stackLogo(0.8)}</div>
</div>`;
}

// 밈 보드: 사진 2~3장을 위아래로 쌓고, 말풍선 박스 2개씩(말 → 반응)
function meme(s, d, S, i, n) {
  const ps = s.panels || [];
  const top = s.title ? 120 : 0;
  const h = (1350 - top) / ps.length;
  const panels = ps.map((p, k) => {
    const side = p.side || (k % 2 ? 'l' : 'r');
    const caps = [p.say, p.react].filter(Boolean).map((t) => `<div class="say">${rich(t)}</div>`).join('');
    return `<div class="panel" style="top:${top + k * h}px;height:${h}px">${photo(p.image)}
      <div class="cap ${side}" style="${p.capTop != null ? `top:${p.capTop}px` : 'bottom:40px'}">${caps}</div></div>`;
  }).join('');
  const credits = [...new Set(ps.map((p) => p.image?.credit).filter(Boolean))].join(', ');
  return `<div class="card pastel meme" style="${magVars(S)}">
  ${s.title ? `<div class="ttl"><span>${esc(s.title)}</span></div>` : ''}
  ${panels}
  <div class="msrc">${credits ? '출처 | ' + esc(credits) : ''}</div>
</div>`;
}

function cover(s, d, S) {
  if (d.style === 'mag') return coverMag(s, d, S);
  return `<div class="card cover" style="--acc:${S.accent};--acf:${S.fg};--dp:${S.deep}">
  ${photo(s.image)}
  <div class="shade"></div>
  ${bubbles(s.says)}
  <div class="top">${logo(1)}<span class="date">${esc(d.dateLabel)} · ${S.slot}</span></div>
  ${s.sticker ? `<div class="sticker ${s.stickerSide === 'left' ? 'left' : ''}">${esc(s.sticker)}</div>` : ''}
  <div class="bottom">
    <span class="badge" style="background:${S.accent}">${S.label} · ${esc(d.category || S.desc)}</span>
    <h1>${rich(s.title)}</h1>
  </div>
  <div class="swipe">SWIPE →</div>
  <div class="credit">${credit(s.image)}</div>
</div>`;
}

function bodyShell(inner, s, d, S, i, n, noimg) {
  return `<div class="card body ${noimg ? 'noimg' : ''} ${d.style === 'mag' ? 'mag' : ''}" style="--ac:${S.deep};--hl:${S.hl};--pa:${S.pastel}">
  <div class="head">
    <span class="kicker"><span class="dot" style="background:${S.accent}"></span>${S.label} | ${esc(d.category || S.desc)}</span>
    <span class="pno"><b>${String(i + 1).padStart(2, '0')}</b> / ${String(n).padStart(2, '0')}</span>
  </div>
  <div class="wrap">${inner}</div>
  <div class="foot">${logo(0.85)}<span class="ref">${s.ref ? 'Ref. ' + esc(s.ref) : ''}</span></div>
</div>`;
}

function body(s, d, S, i, n) {
  const fig = s.image
    ? `<figure style="--dp:${S.deep}">${photo(s.image)}${bubbles(s.says)}</figure><figcaption>${credit(s.image)}</figcaption>`
    : '';
  const paras = (s.text || []).map((t) => `<p>${rich(t)}</p>`).join('');
  return bodyShell(`${fig}<h2>${rich(s.title)}</h2>${paras}`, s, d, S, i, n, !s.image);
}

function compare(s, d, S, i, n) {
  const cols = s.columns
    .map(
      (c) => `<div class="col"><span class="tag" style="background:${c.color || S.accent}">${esc(c.tag)}</span>
      <h3>${rich(c.title)}</h3><p>${rich(c.text)}</p></div>`
    )
    .join('');
  return bodyShell(
    `<h2>${rich(s.title)}</h2><div class="cmp">${cols}</div>${s.note ? `<p class="note">${rich(s.note)}</p>` : ''}`,
    s, d, S, i, n, true
  );
}

function points(s, d, S, i, n) {
  const pts = s.points
    .map((p, k) => `<div class="pt"><span class="n">${k + 1}</span><div><h3>${rich(p.title)}</h3><p>${rich(p.text)}</p></div></div>`)
    .join('');
  return bodyShell(`<h2>${rich(s.title)}</h2><div class="pts">${pts}</div>`, s, d, S, i, n, true);
}

function outro(s, d, S) {
  return `<div class="card outro ${d.style === 'mag' ? 'mag' : ''}" style="${magVars(S)}">
  <div class="lbl">KNOW-ISH 한 줄 정리</div>
  <h2>${rich(s.title)}</h2>
  ${s.text ? `<div class="sub">${rich(s.text)}</div>` : ''}
  <div class="cta"><span class="p">저장해두고 다시 보기</span><span>친구에게 공유</span><span>팔로우 @knowish.mag</span></div>
  <div class="bot">${logo(1)}<span class="next">${esc(s.next || (S.key === 'on' ? '오후엔 가볍게, -ISH 마케팅 편으로' : '내일 아침, KNOW 시사경제 편으로'))}</span></div>
</div>`;
}

function gallery(s, d, S, i, n) {
  const ims = s.images || [];
  const cells = ims.map((im) => `<div class="cell">${photo(im)}${im.label ? `<span class="lbl">${esc(im.label)}</span>` : ''}${bubbles(im.says)}${im.credit ? `<span class="cr">${esc(im.credit)}</span>` : ''}</div>`).join('');
  const paras = (s.text || []).map((t) => `<p>${rich(t)}</p>`).join('');
  const inner = `<h2>${rich(s.title)}</h2><div class="gal n${ims.length}" style="--acc:${S.accent};--acf:${S.fg};--dp:${S.deep}">${cells}</div>${paras}`;
  return bodyShell(inner, s, d, S, i, n, true).replace('class="card body', 'class="card body gallery');
}

const RENDER = { cover, body, compare, points, outro, letter, meme, gallery };

export function slideHTML(doc, i) {
  const S = SERIES[doc.series];
  const s = doc.slides[i];
  const inner = RENDER[s.type](s, doc, S, i, doc.slides.length);
  return page(inner);
}

export const page = (inner, extraCss = '') =>
  `<!doctype html><html><head><meta charset="utf-8"><style>${css}${extraCss}</style></head><body>${inner}</body></html>`;
