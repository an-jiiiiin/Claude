// 모리걸(아기자기 내추럴) 스타일 렌더러 — content.json 을 그대로 받아 같은 slides/ 로 렌더
// 사용: node src/mori.mjs posts/<id>   (content.json 의 "style": "mori")
// 지원 타입: cover, letter, meme, body, points, gallery, compare, outro
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { page, rich, BRAND } from './templates.mjs';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const nm = (p) => pathToFileURL(path.join(ROOT, 'node_modules', p)).href;
const src = (s) => (/^(https?|file):/.test(s) ? s : pathToFileURL(path.resolve(ROOT, s)).href);
const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

export const MORI = {
  linen: '#F4EDE1', paper: '#FFFBF3', kraft: '#D9C3A0', brown: '#6B4A33', bark: '#3F2C20',
  sage: '#A9B99A', moss: '#6F8460', rose: '#E8B7B0', berry: '#C9585A', butter: '#F3E2A9',
};
const M = MORI;

// 작은 손그림 장식 (SVG)
const leaf = (c = M.moss, r = 0) => `<svg width="120" height="150" viewBox="0 0 120 150" style="transform:rotate(${r}deg)"><path d="M60 145 C58 100 60 60 64 10" stroke="${c}" stroke-width="4" fill="none" stroke-linecap="round"/>${[30, 55, 80, 105].map((y, i) => `<path d="M62 ${y} C${i % 2 ? 100 : 22} ${y - 18} ${i % 2 ? 108 : 14} ${y + 8} 62 ${y + 14}" fill="${c}" opacity=".85"/>`).join('')}</svg>`;
const flower = (c = M.rose, s = 70) => `<svg width="${s}" height="${s}" viewBox="0 0 70 70">${[0, 72, 144, 216, 288].map((a) => `<ellipse cx="35" cy="18" rx="11" ry="16" fill="${c}" transform="rotate(${a} 35 35)"/>`).join('')}<circle cx="35" cy="35" r="9" fill="${M.butter}" stroke="${M.brown}" stroke-width="2"/></svg>`;
const mush = (s = 80) => `<svg width="${s}" height="${s}" viewBox="0 0 80 80"><path d="M8 40 C8 14 72 14 72 40 Z" fill="${M.berry}" stroke="${M.bark}" stroke-width="3"/><circle cx="26" cy="30" r="5" fill="#fff"/><circle cx="48" cy="24" r="6" fill="#fff"/><circle cx="58" cy="36" r="4" fill="#fff"/><path d="M30 40 L30 66 Q40 72 50 66 L50 40 Z" fill="${M.paper}" stroke="${M.bark}" stroke-width="3"/></svg>`;
const sparkle = (c = M.brown, s = 40) => `<svg width="${s}" height="${s}" viewBox="0 0 40 40"><path d="M20 2 L23 17 L38 20 L23 23 L20 38 L17 23 L2 20 L17 17 Z" fill="${c}"/></svg>`;

const css = `
.mc{width:1080px;height:1350px;position:relative;overflow:hidden;background:${M.linen};font-family:'Pretendard';color:${M.bark};letter-spacing:-0.02em;word-break:keep-all}
.mc::before{content:'';position:absolute;inset:0;opacity:.35;background-image:repeating-linear-gradient(0deg,rgba(107,74,51,.06) 0 2px,transparent 2px 6px),repeating-linear-gradient(90deg,rgba(107,74,51,.05) 0 2px,transparent 2px 7px)}
.mc::after{content:'';position:absolute;inset:26px;border:3px dashed rgba(107,74,51,.35);border-radius:28px;pointer-events:none}
.jua{font-family:'Jua'}.hand{font-family:'Gaegu';font-weight:700}.emo{font-family:'Noto Color Emoji'}
.d{position:absolute;z-index:3}
.top{position:absolute;top:58px;left:64px;right:64px;display:flex;justify-content:space-between;align-items:center;z-index:6}
.tagk{display:inline-flex;align-items:center;gap:10px;font-family:'Jua';font-size:30px;background:${M.kraft};color:${M.bark};padding:8px 22px 4px 18px;border-radius:8px 999px 999px 8px;box-shadow:0 3px 0 rgba(63,44,32,.25)}
.tagk::before{content:'';width:12px;height:12px;border-radius:50%;background:${M.linen};border:3px solid ${M.brown}}
.lg{display:inline-flex;align-items:center}
.lg .kn{background:${BRAND.sky};color:${BRAND.ink};font-weight:900;font-size:30px;padding:5px 11px 3px;transform:rotate(-3deg);border:3px solid ${M.bark}}
.lg .ish{background:${BRAND.mag};color:#fff;font-weight:900;font-style:italic;font-size:26px;padding:4px 10px;margin-left:-4px;border:3px solid ${M.bark};border-radius:6px;transform:rotate(6deg) translateY(4px)}
.pol{position:absolute;background:#fff;padding:20px 20px 80px;border-radius:4px;box-shadow:0 14px 30px rgba(63,44,32,.22),0 2px 0 rgba(63,44,32,.15);z-index:2}
.pol .pimg{width:100%;height:100%;background-size:cover;background-position:center}
.pol .cp{position:absolute;left:0;right:0;bottom:16px;text-align:center;font-family:'Gaegu';font-weight:700;font-size:40px;color:${M.brown}}
.tape{position:absolute;width:180px;height:50px;background:rgba(169,185,154,.75);z-index:4;box-shadow:0 1px 0 rgba(0,0,0,.05)}
.tape.r{background:rgba(232,183,176,.8)}.tape.y{background:rgba(243,226,169,.85)}
.stmp{position:absolute;z-index:5;font-family:'Jua';font-size:58px;color:${M.berry};border:6px double ${M.berry};padding:10px 24px 4px;border-radius:14px;background:rgba(255,251,243,.6)}
.chips{display:flex;gap:12px;flex-wrap:wrap}
.chip{font-family:'Jua';font-size:30px;padding:8px 20px 4px;border-radius:999px;border:3px solid ${M.bark};background:${M.paper}}
.chip.hot{background:${M.rose}}.chip.dark{background:${M.bark};color:${M.paper}}
.ctitle{position:absolute;left:70px;right:70px;bottom:150px;z-index:6;font-family:'Jua';font-size:96px;line-height:1.13;letter-spacing:-0.03em;color:${M.bark}}
.mc .ctitle mark{background:linear-gradient(transparent 52%, ${M.rose} 52%);color:${M.berry};padding:0 8px}
.ctitle b{font-weight:400;color:${M.moss}}
.cred{position:absolute;right:66px;bottom:62px;font-size:20px;color:${M.brown};opacity:.7;z-index:6}
.swp{position:absolute;left:66px;bottom:56px;font-family:'Gaegu';font-weight:700;font-size:38px;color:${M.brown};z-index:6}
.save{position:absolute;right:66px;bottom:96px;z-index:6;font-family:'Jua';font-size:28px;background:${M.butter};border:3px solid ${M.bark};padding:8px 18px 4px;border-radius:10px;transform:rotate(-4deg)}
.pc{position:absolute;background:${M.paper};border-radius:26px;box-shadow:0 12px 0 rgba(63,44,32,.12);z-index:2}
.lined{background-image:repeating-linear-gradient(transparent 0 58px, rgba(169,185,154,.5) 58px 60px);background-position:0 26px}
.h2{font-family:'Jua';font-size:68px;line-height:1.18;color:${M.bark}}
.h2 mark{background:linear-gradient(transparent 55%, ${M.butter} 55%);color:inherit}
.lbl{font-family:'Gaegu';font-weight:700;font-size:40px;color:${M.moss};margin-bottom:8px}
.txt p{font-size:36px;line-height:1.66;font-weight:500;margin:0 0 22px}
.txt b{color:${M.berry};font-weight:800}
.mc mark{background:linear-gradient(transparent 58%, rgba(169,185,154,.7) 58%);color:inherit;padding:0 2px}
.txt mark{background:linear-gradient(transparent 58%, rgba(169,185,154,.7) 58%);color:inherit;padding:0 2px}
.bub{position:absolute;z-index:5;background:#fff;border:4px solid ${M.bark};border-radius:40px;padding:16px 28px 12px;font-family:'Jua';font-size:38px;box-shadow:6px 6px 0 ${M.kraft}}
.bub::after{content:'';position:absolute;bottom:-28px;left:56px;border:14px solid transparent;border-top:18px solid ${M.bark}}
.bub mark{background:none;color:${M.berry}}
.ref{position:absolute;left:66px;bottom:58px;font-size:20px;color:${M.brown};opacity:.75;z-index:6}
.pno{font-family:'Gaegu';font-weight:700;font-size:36px;color:${M.brown}}
.ptag{position:absolute;z-index:5;background:${M.kraft};border:3px solid ${M.bark};border-radius:10px 10px 10px 10px;padding:14px 22px 10px;font-family:'Jua';font-size:34px;line-height:1.25;box-shadow:4px 4px 0 rgba(63,44,32,.25)}
.ptag::before{content:'';position:absolute;left:-16px;top:50%;width:18px;height:18px;margin-top:-9px;border-radius:50%;background:${M.linen};border:3px solid ${M.bark}}
.ptag .s{font-size:26px;color:${M.brown};display:block}
.ptag mark{background:none;color:${M.berry}}
.row{display:flex;gap:24px;align-items:flex-start;margin-bottom:30px}
.row .n{flex:none;width:68px;height:68px;border-radius:50%;background:${M.sage};border:3px solid ${M.bark};display:flex;align-items:center;justify-content:center;font-family:'Jua';font-size:36px;color:${M.paper}}
.row .t{font-family:'Jua';font-size:44px;line-height:1.2}
.row .s{font-size:31px;line-height:1.45;color:${M.brown};margin-top:6px;font-weight:600}
.chk{display:flex;gap:18px;align-items:flex-start;font-size:36px;font-weight:700;line-height:1.45;margin-bottom:22px}
.chk i{flex:none;width:50px;height:50px;border:4px solid ${M.bark};border-radius:12px;background:#fff;display:flex;align-items:center;justify-content:center;font-style:normal;font-size:38px;color:${M.berry};margin-top:2px}
`;

const top = (d, i, n, tag) => `<div class="top"><span class="tagk">${esc(tag || (d.series === 'on' ? 'KNOW 노트' : '-ISH 노트') + ' · ' + (d.category || ''))}</span>${i == null ? `<span class="lg"><span class="kn">KNOW</span><span class="ish">-ish</span></span>` : `<span class="pno">${i + 1} / ${n}</span>`}</div>`;
const pol = (im, x, y, w, h, rot, cap) => `<div class="pol" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;transform:rotate(${rot}deg)"><div class="pimg" style="background-image:url('${src(im.src)}');background-position:${im.pos || 'center'}"></div>${cap ? `<div class="cp">${esc(cap)}</div>` : ''}</div>`;
const tape = (x, y, rot, c = '') => `<div class="tape ${c}" style="left:${x}px;top:${y}px;transform:rotate(${rot}deg)"></div>`;
const dec = (html, x, y) => `<div class="d" style="left:${x}px;top:${y}px">${html}</div>`;
const refL = (s) => (s.ref || s.image?.credit ? `<div class="ref">${s.image?.credit ? '사진 | ' + esc(s.image.credit) + ' · ' : ''}${s.ref ? 'Ref. ' + esc(s.ref) : ''}</div>` : '');

const R = {
  cover(s, d) {
    const ch = (s.chips || []).map((c) => { const o = typeof c === 'string' ? { text: c } : c; return `<span class="chip ${o.kind === 'hot' ? 'hot' : o.kind === 'dark' ? 'dark' : ''}">${esc(o.text)}</span>`; }).join('');
    return `<div class="mc">
      ${top(d, null, 0, s.tag)}
      <div class="chips" style="position:absolute;top:140px;left:64px;z-index:6">${ch}</div>
      ${pol(s.image, 250, 220, 600, 600, 3, s.polCap || '')}
      ${tape(450, 196, -6)}
      ${s.sticker ? `<div class="stmp" style="left:70px;top:300px;transform:rotate(-10deg)">${esc(s.sticker)}</div>` : ''}
      ${dec(leaf(M.moss, -20), 850, 700)}${dec(flower(M.rose, 90), 110, 700)}${dec(flower(M.butter, 56), 900, 230)}${dec(sparkle(M.brown, 38), 200, 210)}${dec(mush(78), 930, 860)}
      <div class="ctitle">${rich(s.title)}</div>
      <div class="swp">넘겨보기 🍂</div>
      <div class="save">📌 저장각</div>
      <div class="cred" style="bottom:30px">사진 | ${esc(s.image?.credit || '')}</div>
    </div>`;
  },
  letter(s, d, i, n) {
    const ps = (s.text || []).map((t) => `<p>${rich(t)}</p>`).join('');
    return `<div class="mc">${top(d, i, n, s.label)}
      <div class="pc lined" style="left:64px;right:64px;top:150px;bottom:130px;padding:56px 54px">
        <div class="h2">${rich(s.title)}</div>
        <div class="txt" style="margin-top:34px">${ps}</div>
      </div>
      ${s.image ? pol(s.image, 560, 800, 400, 340, 5, '') + tape(680, 780, 4, 'r') : ''}
      ${s.say ? `<div class="bub" style="left:130px;top:960px;transform:rotate(-3deg)">${rich(s.say)}</div>` : ''}
      ${dec(leaf(M.sage, 25), 70, 1050)}${dec(flower(M.rose, 60), 930, 150)}
      ${refL({ ref: s.ref })}
    </div>`;
  },
  meme(s, d, i, n) {
    const ps = s.panels || [];
    const pos = [[70, 260, -4], [560, 520, 3], [90, 820, -2]];
    const tags = [[600, 300], [120, 640], [600, 900]];
    return `<div class="mc">${top(d, i, n)}
      <div class="h2" style="position:absolute;left:70px;top:140px;z-index:6">${esc(s.title)} <span class="emo">🏷️</span></div>
      ${ps.map((p, k) => pol(p.image, pos[k][0], pos[k][1], 430, 330, pos[k][2], '') + tape(pos[k][0] + 120, pos[k][1] - 22, pos[k][2] * 2, k % 2 ? 'y' : 'r')).join('')}
      ${ps.map((p, k) => `<div class="ptag" style="left:${tags[k][0]}px;top:${tags[k][1]}px;transform:rotate(${k % 2 ? -3 : 3}deg)"><span class="s">${rich(p.say)}</span>${rich(p.react)}</div>`).join('')}
      ${dec(leaf(M.moss, 15), 940, 1150)}
      ${refL(s)}
    </div>`;
  },
  body(s, d, i, n) {
    const items = (s.text || []).map((t, k) => `<div class="row"><span class="n">${k + 1}</span><div class="s" style="font-size:40px;line-height:1.45;color:${M.bark};font-weight:600;margin-top:8px">${rich(t)}</div></div>`).join('');
    return `<div class="mc">${top(d, i, n)}
      <div class="pc" style="left:64px;right:64px;top:150px;bottom:130px;padding:60px 56px">
        <div class="h2">${rich(s.title)} <span class="emo">🧺</span></div>
        <div style="margin-top:56px">${items}</div>
      </div>
      ${s.image ? pol(s.image, 470, 760, 470, 380, -4, s.polCap || '') + tape(600, 740, 3, 'y') : ''}
      ${dec(mush(90), 120, 1050)}${dec(flower(M.sage, 64), 940, 160)}
      ${refL(s)}
    </div>`;
  },
  points(s, d, i, n) {
    const items = s.points.map((p, k) => `<div class="row"><span class="n">${k + 1}</span><div><div class="t">${rich(p.title)}</div><div class="s">${rich(p.text)}</div></div></div>`).join('');
    return `<div class="mc">${top(d, i, n)}
      <div class="pc" style="left:64px;right:64px;top:150px;bottom:130px;padding:60px 56px;background:${M.paper}">
        <div class="lbl">recipe card</div>
        <div class="h2">${rich(s.title)}</div>
        <div style="margin-top:50px">${items}</div>
      </div>
      ${tape(420, 130, -3, 'y')}${dec(leaf(M.moss, -15), 920, 1040)}
      ${refL(s)}
    </div>`;
  },
  outro(s, d) {
    const one = (s.text || '').replace(/^아는 척 한 줄:\s*/, '');
    return `<div class="mc" style="background:#E3E9D8">
      ${top(d, null, 0, 'KNOW-ISH 한 줄 정리')}
      <div class="pc lined" style="left:64px;right:64px;top:160px;height:560px;padding:56px 54px">
        <div class="h2" style="font-size:80px">${rich(s.title)}</div>
        <div class="hand" style="font-size:44px;color:${M.moss};margin-top:24px">🌿 아는 척 한 줄</div>
        <div style="font-size:36px;line-height:1.6;font-weight:600;margin-top:8px">${rich(one)}</div>
      </div>
      <div class="pc" style="left:64px;right:64px;top:770px;height:300px;padding:44px 50px">
        <div class="chk"><i>✓</i>저장해두고 2차 출시 날 다시 보기</div>
        <div class="chk"><i>✓</i>굿즈 좋아하는 친구한테 공유</div>
        <div class="chk"><i>✓</i>@knowish.mag 팔로우하고 내일 소식 받기</div>
      </div>
      ${dec(flower(M.rose, 100), 870, 1110)}${dec(flower(M.butter, 64), 790, 1180)}${dec(leaf(M.moss, 20), 70, 1100)}
      <div class="swp" style="left:auto;right:66px;bottom:60px">내일 아침 KNOW 편에서 만나요 ☕</div>
    </div>`;
  },
};

const fonts = `<style>@import url('${nm('@fontsource/gaegu/700.css')}');@import url('${nm('@fontsource/jua/index.css')}');</style>`;

export async function renderMori(dir) {
  const doc = JSON.parse(await fs.readFile(path.join(dir, 'content.json'), 'utf8'));
  const out = path.join(dir, 'slides');
  await fs.rm(out, { recursive: true, force: true });
  await fs.mkdir(out, { recursive: true });
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  const n = doc.slides.length;
  for (let i = 0; i < n; i++) {
    const s = doc.slides[i];
    const f = path.join(out, '_s.html');
    await fs.writeFile(f, page(fonts + R[s.type](s, doc, i, n), css));
    await p.goto('file://' + f);
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(250);
    await p.locator('.mc').screenshot({ path: path.join(out, `${String(i + 1).padStart(2, '0')}.png`) });
    await fs.rm(f);
  }
  await b.close();
  return n;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(await renderMori(path.resolve(process.argv[2])), 'slides');
}
