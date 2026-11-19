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
  lime: '#D4FF3A',
  on: '#2B4BFF',   // 오전 · 시사경제 (깊게)
  off: '#FF5C39',  // 오후 · 마케팅 (가볍게)
  gray: '#6B6B70',
};

export const SERIES = {
  on: { key: 'on', label: 'KNOW', desc: '시사·경제', slot: 'AM', accent: BRAND.on },
  off: { key: 'off', label: '-ISH', desc: '마케팅', slot: 'PM', accent: BRAND.off },
};

const esc = (s = '') => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export const rich = (s = '') =>
  esc(s)
    .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
    .replace(/==(.+?)==/g, '<mark>$1</mark>')
    .replace(/\n/g, '<br>');

// light=true: 밝은 배경용 (-ish 를 잉크색 + 라임 형광펜으로)
export const logo = (size = 1, light = false) => `
<span class="logo ${light ? 'light' : ''}" style="--s:${size}"><span class="kn">KNOW</span><span class="ish">-ish</span></span>`;

const css = `
@import url('${nm('pretendard/dist/web/static/pretendard.css')}');
@import url('${nm('@fontsource/black-han-sans/index.css')}');
@import url('${nm('@fontsource/permanent-marker/index.css')}');
*{margin:0;padding:0;box-sizing:border-box}
html,body{background:#888}
.card{width:1080px;height:1350px;position:relative;overflow:hidden;
  font-family:'Pretendard',sans-serif;color:${BRAND.ink};word-break:keep-all;
  -webkit-font-smoothing:antialiased;letter-spacing:-0.02em}
b{font-weight:800}

/* ---------- logo ---------- */
.logo{display:inline-flex;align-items:baseline;line-height:1;white-space:nowrap}
.logo .kn{font-family:'Pretendard';font-weight:900;font-size:calc(32px*var(--s));letter-spacing:-0.04em}
.logo .ish{font-family:'Permanent Marker';font-size:calc(30px*var(--s));color:${BRAND.lime};
  display:inline-block;transform:rotate(-8deg) translate(calc(3px*var(--s)),calc(-4px*var(--s)));margin-left:calc(2px*var(--s))}
.logo.light .ish{color:${BRAND.ink};padding:0 calc(4px*var(--s));
  background:linear-gradient(transparent 45%, ${BRAND.lime} 45%, ${BRAND.lime} 88%, transparent 88%)}

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
  background:${BRAND.lime};color:${BRAND.ink};box-shadow:8px 8px 0 ${BRAND.ink}}
.cover .sticker.left{right:auto;left:60px;transform:rotate(-4deg)}
.cover .bottom{position:absolute;left:60px;right:60px;bottom:96px}
.cover .badge{display:inline-flex;align-items:center;gap:10px;font-weight:800;font-size:28px;
  padding:10px 22px;border-radius:999px;color:#fff;margin-bottom:28px}
.cover .badge::before{content:'';width:12px;height:12px;border-radius:50%;background:#fff}
.cover h1{font-weight:900;font-size:86px;line-height:1.2;letter-spacing:-0.045em;text-shadow:0 2px 24px rgba(0,0,0,.35)}
.cover h1 mark{background:none;color:${BRAND.lime}}
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
.outro .lbl{font-weight:800;font-size:28px;color:${BRAND.lime};letter-spacing:.04em;margin-bottom:36px}
.outro h2{font-weight:900;font-size:72px;line-height:1.28;letter-spacing:-0.045em}
.outro h2 mark{background:none;color:${BRAND.lime}}
.outro .sub{margin-top:40px;font-size:32px;line-height:1.65;color:rgba(255,255,255,.75);font-weight:500}
.outro .cta{margin-top:auto;display:flex;gap:18px;flex-wrap:wrap}
.outro .cta span{border:2px solid rgba(255,255,255,.3);border-radius:999px;padding:16px 30px;font-size:27px;font-weight:700}
.outro .cta span.p{background:${BRAND.lime};color:${BRAND.ink};border-color:${BRAND.lime}}
.outro .bot{margin-top:60px;display:flex;justify-content:space-between;align-items:center}
.outro .next{font-size:24px;color:rgba(255,255,255,.6);font-weight:600}
`;

const photo = (img, cls = '') =>
  img && img.src
    ? `<div class="photo ${cls}" style="background-image:url('${img.src}')"></div>`
    : `<div class="photo ph ${cls}"><span class="phl">PHOTO</span><span class="phd">${esc(img?.hint || '실사 이미지 영역')}</span></div>`;

const credit = (img) => (img?.credit ? `사진 | ${esc(img.credit)}` : '');

function cover(s, d, S) {
  return `<div class="card cover">
  ${photo(s.image)}
  <div class="shade"></div>
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
  const hl = S.key === 'on' ? 'rgba(43,75,255,.18)' : 'rgba(255,92,57,.22)';
  return `<div class="card body ${noimg ? 'noimg' : ''}" style="--ac:${S.accent};--hl:${hl}">
  <div class="head">
    <span class="kicker"><span class="dot" style="background:${S.accent}"></span>${S.label} | ${esc(d.category || S.desc)}</span>
    <span class="pno"><b>${String(i + 1).padStart(2, '0')}</b> / ${String(n).padStart(2, '0')}</span>
  </div>
  <div class="wrap">${inner}</div>
  <div class="foot">${logo(0.85, true)}<span class="ref">${s.ref ? 'Ref. ' + esc(s.ref) : ''}</span></div>
</div>`;
}

function body(s, d, S, i, n) {
  const fig = s.image
    ? `<figure>${photo(s.image)}</figure><figcaption>${credit(s.image)}</figcaption>`
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
  return `<div class="card outro">
  <div class="lbl">KNOW-ISH 한 줄 정리</div>
  <h2>${rich(s.title)}</h2>
  ${s.text ? `<div class="sub">${rich(s.text)}</div>` : ''}
  <div class="cta"><span class="p">저장해두고 다시 보기</span><span>친구에게 공유</span><span>팔로우 @knowish.daily</span></div>
  <div class="bot">${logo(1)}<span class="next">${esc(s.next || (S.key === 'on' ? '오후엔 가볍게, -ISH 마케팅 편으로' : '내일 아침, KNOW 시사경제 편으로'))}</span></div>
</div>`;
}

const RENDER = { cover, body, compare, points, outro };

export function slideHTML(doc, i) {
  const S = SERIES[doc.series];
  const s = doc.slides[i];
  const inner = RENDER[s.type](s, doc, S, i, doc.slides.length);
  return page(inner);
}

export const page = (inner, extraCss = '') =>
  `<!doctype html><html><head><meta charset="utf-8"><style>${css}${extraCss}</style></head><body>${inner}</body></html>`;
