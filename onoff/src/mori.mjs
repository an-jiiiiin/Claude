// 모리걸(아기자기 내추럴) 스타일 렌더러 — content.json 을 그대로 받아 같은 slides/ 로 렌더
// 사용: node src/mori.mjs posts/<id>   (content.json 의 "style": "mori")
// 지원 타입: cover, letter, meme, body, points, gallery, compare, outro
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { page, rich, BRAND } from './templates.mjs';
import { logoA, PPO } from './logo-ppo.mjs';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const nm = (p) => pathToFileURL(path.join(ROOT, 'node_modules', p)).href;
const src = (s) => (/^(https?|file):/.test(s) ? s : pathToFileURL(path.resolve(ROOT, s)).href);
const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

export const MORI = {
  linen: '#F4EDE1', paper: '#FFFBF3', kraft: '#D9C3A0', brown: '#6B4A33', bark: '#3F2C20',
  sage: '#A9B99A', moss: '#6F8460', rose: '#E8B7B0', berry: '#C9585A', butter: '#F3E2A9',
};
const M = { ...MORI };
// 뽀용 테마: 밀크 핑크·베이비 블루·라일락·버터
export const PPO_THEME = { linen: '#FFF3F7', paper: '#FFFDF8', kraft: '#FFD9E8', brown: '#8A6A70', bark: '#5B3F42', sage: '#BFE3FF', moss: '#7DB8F5', rose: '#FFC2DA', berry: '#FF7FAE', butter: '#FFF0A8' };

// 작은 손그림 장식 (SVG)
const leaf = (c = M.moss, r = 0) => `<svg width="120" height="150" viewBox="0 0 120 150" style="transform:rotate(${r}deg)"><path d="M60 145 C58 100 60 60 64 10" stroke="${c}" stroke-width="4" fill="none" stroke-linecap="round"/>${[30, 55, 80, 105].map((y, i) => `<path d="M62 ${y} C${i % 2 ? 100 : 22} ${y - 18} ${i % 2 ? 108 : 14} ${y + 8} 62 ${y + 14}" fill="${c}" opacity=".85"/>`).join('')}</svg>`;
const flower = (c = M.rose, s = 70) => `<svg width="${s}" height="${s}" viewBox="0 0 70 70">${[0, 72, 144, 216, 288].map((a) => `<ellipse cx="35" cy="18" rx="11" ry="16" fill="${c}" transform="rotate(${a} 35 35)"/>`).join('')}<circle cx="35" cy="35" r="9" fill="${M.butter}" stroke="${M.brown}" stroke-width="2"/></svg>`;
const mush = (s = 80) => `<svg width="${s}" height="${s}" viewBox="0 0 80 80"><path d="M8 40 C8 14 72 14 72 40 Z" fill="${M.berry}" stroke="${M.bark}" stroke-width="3"/><circle cx="26" cy="30" r="5" fill="#fff"/><circle cx="48" cy="24" r="6" fill="#fff"/><circle cx="58" cy="36" r="4" fill="#fff"/><path d="M30 40 L30 66 Q40 72 50 66 L50 40 Z" fill="${M.paper}" stroke="${M.bark}" stroke-width="3"/></svg>`;
const sparkle = (c = M.brown, s = 40) => `<svg width="${s}" height="${s}" viewBox="0 0 40 40"><path d="M20 2 L23 17 L38 20 L23 23 L20 38 L17 23 L2 20 L17 17 Z" fill="${c}"/></svg>`;

const mkCss = () => `
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
.ttl mark{background:linear-gradient(transparent 52%, ${M.rose} 52%);color:${M.berry};padding:0 8px}
.ctitle b{font-weight:400;color:${M.moss}}
.cred{position:absolute;right:66px;bottom:62px;font-size:20px;color:${M.brown};opacity:.7;z-index:6}
.swp{position:absolute;left:66px;bottom:56px;font-family:'Gaegu';font-weight:700;font-size:38px;color:${M.brown};z-index:6}
.save{position:absolute;right:66px;bottom:96px;z-index:6;font-family:'Jua';font-size:28px;background:${M.butter};border:3px solid ${M.bark};padding:8px 18px 4px;border-radius:10px;transform:rotate(-4deg)}
.pc{position:absolute;background:${M.paper};border-radius:26px;box-shadow:0 12px 0 rgba(63,44,32,.12);z-index:2}
.lined{background-image:repeating-linear-gradient(transparent 0 58px, ${M.sage}99 58px 60px);background-position:0 26px}
.h2{font-family:'Jua';font-size:68px;line-height:1.18;color:${M.bark}}
.h2 mark{background:linear-gradient(transparent 55%, ${M.butter} 55%);color:inherit}
.lbl{font-family:'Gaegu';font-weight:700;font-size:40px;color:${M.moss};margin-bottom:8px}
.txt p{font-size:36px;line-height:1.66;font-weight:500;margin:0 0 22px}
.txt b{color:${M.berry};font-weight:800}
.mc mark{background:linear-gradient(transparent 58%, ${M.rose} 58%);color:inherit;padding:0 2px}
.txt mark{background:linear-gradient(transparent 58%, ${M.rose} 58%);color:inherit;padding:0 2px}
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

const top = (d, i, n, tag) => `<div class="top"><span class="tagk">${esc(tag || (d.series === 'on' ? 'KNOW 노트' : '-ISH 노트') + ' · ' + (d.category || ''))}</span>${i == null ? `<span>${logoA(0.62)}</span>` : `<span class="pno">${i + 1} / ${n}</span>`}</div>`;
const pol = (im, x, y, w, h, rot, cap) => `<div class="pol" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;transform:rotate(${rot}deg)"><div class="pimg" style="background-image:url('${src(im.src)}');background-position:${im.pos || 'center'}"></div>${cap ? `<div class="cp">${esc(cap)}</div>` : ''}</div>`;
const tape = (x, y, rot, c = '') => `<div class="tape ${c}" style="left:${x}px;top:${y}px;transform:rotate(${rot}deg)"></div>`;
const dec = (html, x, y) => `<div class="d" style="left:${x}px;top:${y}px">${html}</div>`;
const refL = (s) => (s.ref || s.image?.credit ? `<div class="ref">${s.image?.credit ? '사진 | ' + esc(s.image.credit) + ' · ' : ''}${s.ref ? 'Ref. ' + esc(s.ref) : ''}</div>` : '');

const heart = (c, s) => `<svg width="${s}" height="${s}" viewBox="0 0 40 36"><path d="M20 34 C6 24 1 17 1 10 A9 9 0 0 1 20 7 A9 9 0 0 1 39 10 C39 17 34 24 20 34Z" fill="${c}"/></svg>`;
const blob = (x, y, w, h, c, r = 0) => `<div class="d" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;background:${c};border-radius:50% 46% 52% 48%/48% 54% 46% 52%;transform:rotate(${r}deg);z-index:1"></div>`;
const mini = (t, x, y, r, bg) => `<div class="d" style="left:${x}px;top:${y}px;transform:rotate(${r}deg);z-index:7;font-family:'Jua';font-size:30px;background:${bg};border:3px solid ${M.bark};border-radius:999px;padding:8px 18px 4px;box-shadow:3px 3px 0 ${M.bark}">${t}</div>`;

const confetti = (seed) => (M.linen === '#FFF3F7' ? ['✨', '🎀', '💗', '⭐', '🫧', '🍓'].slice(seed % 3, seed % 3 + 4).map((e, k) => `<div class="d emo" style="left:${[960, 70, 960, 860][k]}px;top:${[150, 1180, 1160, 1215][k]}px;font-size:${[50, 44, 48, 40][k]}px;z-index:9;transform:rotate(${[12, -10, 8, -14][k]}deg)">${e}</div>`).join('') : '');
const R = {
  // 사진 집중형(세련): 꽉 찬 사진 + 작은 태그 + 굵은 형광 제목 + 부제 + 작은 로고
  coverPhoto(s, d) {
    const im = (s.images || [s.image])[0];
    const hl = s.hl || '#F4FF7A';
    return `<div class="mc" style="background:#111">
      <style>.mc::after{display:none}.mc::before{display:none}.ph-t mark{background:none;color:#fff}</style>
      <div class="d" style="inset:0;background-image:url('${src(im.src)}');background-size:cover;background-position:${im.pos || 'center'};z-index:1"></div>
      <div class="d" style="inset:0;background:linear-gradient(180deg,rgba(0,0,0,.28) 0%,rgba(0,0,0,0) 20%,rgba(0,0,0,0) 46%,rgba(0,0,0,.62) 74%,rgba(0,0,0,.82) 100%);z-index:2"></div>
      <div class="d" style="left:56px;top:54px;z-index:5">${logoA(0.5)}</div>
      <div class="d" style="left:64px;right:64px;bottom:170px;z-index:5">
        <span style="display:inline-block;font-weight:800;font-size:26px;letter-spacing:.04em;background:${hl};color:#111;padding:8px 16px;margin-bottom:24px;position:relative">${esc(s.tag || d.category || '')}<i style="position:absolute;left:14px;bottom:-12px;border:8px solid transparent;border-top:10px solid ${hl}"></i></span>
        <div class="ph-t" style="font-family:'Pretendard';font-weight:900;font-size:92px;line-height:1.16;letter-spacing:-0.045em;color:${hl};text-shadow:0 2px 24px rgba(0,0,0,.35)">${rich(s.title)}</div>
        ${s.sub ? `<div style="margin-top:22px;font-size:30px;font-weight:600;color:${hl};opacity:.92;letter-spacing:-0.02em">${esc(s.sub)}</div>` : ''}
      </div>
      <div class="d" style="right:56px;bottom:56px;z-index:5;font-size:20px;color:rgba(255,255,255,.7)">사진 | ${esc(im.credit || '')}</div>
      <div class="d" style="left:64px;bottom:56px;z-index:5;font-size:22px;font-weight:700;color:rgba(255,255,255,.8);letter-spacing:.08em">SWIPE →</div>
    </div>`;
  },
  // 표지 개선안: 주인공 1 + 조연 2 + 장식 2~3
  coverHero(s, d) {
    const ims = s.images || [s.image];
    const ch = (s.chips || []).slice(0, 3).map((c) => { const o = typeof c === 'string' ? { text: c } : c; return `<span class="chip ${o.kind === 'hot' ? 'hot' : o.kind === 'dark' ? 'dark' : ''}">${esc(o.text)}</span>`; }).join('');
    return `<div class="mc">
      ${blob(560, 120, 560, 520, M.rose + '77', -8)}
      <div class="top"><span>${logoA(0.62)}</span><span class="chips">${ch}</span></div>
      ${pol(ims[0], 150, 190, 640, 600, -3, (s.polCaps || [])[0] || '')}${tape(380, 168, -5)}
      ${ims[1] ? pol(ims[1], 750, 300, 270, 250, 7, '') + tape(820, 282, 8, 'r') : ''}
      ${ims[2] ? pol(ims[2], 730, 600, 270, 230, -5, '') : ''}
      ${s.sticker ? `<div class="stmp" style="left:60px;top:250px;transform:rotate(-10deg);z-index:8;background:#fff">${esc(s.sticker)}</div>` : ''}
      ${(s.says || []).slice(0, 1).map((b) => `<div class="bub" style="left:70px;top:760px;transform:rotate(-4deg);z-index:8;font-size:34px">${rich(typeof b === 'string' ? b : b.text)}</div>`).join('')}
      <div class="d emo" style="left:930px;top:200px;font-size:54px;z-index:9">🎀</div><div class="d emo" style="left:560px;top:820px;font-size:44px;z-index:9">✨</div>
      <div class="d" style="left:0;right:0;bottom:0;height:330px;background:linear-gradient(transparent, ${M.linen} 36%);z-index:9"></div>
      <div class="ctitle" style="z-index:10;bottom:120px">${rich(s.title)}</div>
      <div class="swp" style="z-index:10">넘겨보기 💌</div>
      <div class="save" style="z-index:10;bottom:120px">📌 저장각</div>
      <div class="cred" style="z-index:10;bottom:32px">사진 | ${esc((s.image || ims[0])?.credit || '')}</div>
    </div>`;
  },
  // 표지 개선안: 2x2 정리된 스크랩 + 제목 띠
  coverGrid(s, d) {
    const ims = (s.images || [s.image]).slice(0, 4);
    const minis = (s.minis || []).slice(0, 3).map((m, k) => `<span class="chip" style="background:${[M.butter, '#fff', M.sage][k]}">${esc(m)}</span>`).join('');
    const pos = [[70, 170, -3], [540, 160, 3], [80, 560, 2], [550, 550, -2]];
    return `<div class="mc">
      <div class="top"><span>${logoA(0.62)}</span><span class="pno">11.26 · -ISH</span></div>
      ${ims.map((im, k) => pol(im, pos[k][0], pos[k][1], 450, 350, pos[k][2], '') + (k % 2 ? '' : tape(pos[k][0] + 150, pos[k][1] - 20, -4, k ? 'y' : ''))).join('')}
      ${s.sticker ? `<div class="stmp" style="left:390px;top:470px;transform:rotate(-8deg);z-index:8;background:#fff">${esc(s.sticker)}</div>` : ''}
      <div class="pc" style="left:56px;right:56px;bottom:56px;height:330px;padding:34px 44px;z-index:9;box-shadow:0 8px 0 ${M.rose}">
        <div class="chips" style="margin-bottom:14px">${minis}</div>
        <div style="font-family:'Jua';font-size:84px;line-height:1.13;letter-spacing:-0.03em" class="ttl">${rich(s.title)}</div>
      </div>
      <div class="d emo" style="left:960px;top:900px;font-size:50px;z-index:10">🎀</div>
    </div>`;
  },
  // 표지 개선안: 제목 중심 (위 큰 제목 + 아래 사진 한 장)
  coverTitle(s, d) {
    const ims = s.images || [s.image];
    return `<div class="mc">
      <div class="top"><span>${logoA(0.62)}</span><span class="chips">${(s.chips || []).slice(0, 2).map((c) => { const o = typeof c === 'string' ? { text: c } : c; return `<span class="chip ${o.kind === 'hot' ? 'hot' : ''}">${esc(o.text)}</span>`; }).join('')}</span></div>
      <div style="position:absolute;left:70px;right:70px;top:170px;z-index:6;font-family:'Jua';font-size:104px;line-height:1.12;letter-spacing:-0.03em" class="ttl">${rich(s.title)}</div>
      ${pol(ims[0], 170, 520, 740, 600, 3, (s.polCaps || [])[0] || '')}${tape(450, 500, -4)}
      ${s.sticker ? `<div class="stmp" style="left:720px;top:470px;transform:rotate(8deg);z-index:8;background:#fff">${esc(s.sticker)}</div>` : ''}
      <div class="d emo" style="left:90px;top:1080px;font-size:58px;z-index:9">🎀</div>
      <div class="swp" style="z-index:10;bottom:46px">넘겨보기 💌</div>
      <div class="save" style="z-index:10;bottom:50px">📌 저장각</div>
    </div>`;
  },
  // 복잡·빼곡 콜라주 표지: 사진 여러 장 + 스티커/말풍선 잔뜩 + 큰 제목
  coverBusy(s, d) {
    const ims = s.images || [s.image];
    const ch = (s.chips || []).map((c) => { const o = typeof c === 'string' ? { text: c } : c; return `<span class="chip ${o.kind === 'hot' ? 'hot' : o.kind === 'dark' ? 'dark' : ''}">${esc(o.text)}</span>`; }).join('');
    const spots = [[60, 190, 470, 470, -6], [520, 160, 500, 400, 5], [600, 520, 410, 330, -3], [40, 610, 380, 300, 4]];
    return `<div class="mc">
      ${blob(-60, 120, 520, 460, M.sage + '88', 8)}${blob(560, 420, 560, 520, M.rose + '99', -10)}${blob(300, 900, 420, 260, M.butter, 4)}
      <div class="top">${`<span>${logoA(0.62)}</span>`}<span class="chips">${ch}</span></div>
      ${ims.slice(0, 4).map((im, k) => pol(im, ...spots[k].slice(0, 4), spots[k][4], (s.polCaps || [])[k] || '') + tape(spots[k][0] + 140, spots[k][1] - 20, k % 2 ? 6 : -5, ['', 'r', 'y', ''][k])).join('')}
      ${(s.minis || []).map((m, k) => mini(esc(m), [610, 80, 470, 760][k % 4], [110, 560, 850, 470][k % 4], [4, -6, 3, -4][k % 4], [M.butter, '#fff', M.sage, M.rose][k % 4])).join('')}
      ${s.sticker ? `<div class="stmp" style="left:420px;top:430px;transform:rotate(-8deg);z-index:8;background:#fff">${esc(s.sticker)}</div>` : ''}
      ${(s.says || []).map((b, k) => `<div class="bub" style="left:${[90, 640][k % 2]}px;top:${[930, 870][k % 2]}px;transform:rotate(${[-4, 4][k % 2]}deg);z-index:8;font-size:32px">${rich(typeof b === 'string' ? b : b.text)}</div>`).join('')}
      ${['✨', '🎀', '💗', '⭐', '🫧'].map((e, k) => `<div class="d emo" style="left:${[480, 980, 40, 930, 360][k]}px;top:${[150, 410, 520, 770, 870][k]}px;font-size:${[50, 60, 46, 44, 52][k]}px;z-index:9">${e}</div>`).join('')}
      <div class="d" style="left:0;right:0;bottom:0;height:330px;background:linear-gradient(transparent, ${M.linen} 38%);z-index:9"></div>
      <div class="ctitle" style="z-index:10;bottom:120px">${rich(s.title)}</div>
      <div class="swp" style="z-index:10">넘겨보기 💌</div>
      <div class="save" style="z-index:10;bottom:120px">📌 저장각</div>
      <div class="cred" style="z-index:10;bottom:32px">사진 | ${esc((s.image || ims[0])?.credit || '')}</div>
    </div>`;
  },
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
    return `<div class="mc">${confetti(i)}${top(d, i, n, s.label)}
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
    return `<div class="mc">${confetti(i)}${top(d, i, n)}
      <div class="h2" style="position:absolute;left:70px;top:140px;z-index:6">${esc(s.title)} <span class="emo">🏷️</span></div>
      ${ps.map((p, k) => pol(p.image, pos[k][0], pos[k][1], 430, 330, pos[k][2], '') + tape(pos[k][0] + 120, pos[k][1] - 22, pos[k][2] * 2, k % 2 ? 'y' : 'r')).join('')}
      ${ps.map((p, k) => `<div class="ptag" style="left:${tags[k][0]}px;top:${tags[k][1]}px;transform:rotate(${k % 2 ? -3 : 3}deg)"><span class="s">${rich(p.say)}</span>${rich(p.react)}</div>`).join('')}
      ${dec(leaf(M.moss, 15), 940, 1150)}
      ${refL(s)}
    </div>`;
  },
  body(s, d, i, n) {
    const items = (s.text || []).map((t, k) => `<div class="row"><span class="n">${k + 1}</span><div class="s" style="font-size:40px;line-height:1.45;color:${M.bark};font-weight:600;margin-top:8px">${rich(t)}</div></div>`).join('');
    return `<div class="mc">${confetti(i)}${top(d, i, n)}
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
    return `<div class="mc">${confetti(i)}${top(d, i, n)}
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
    return `<div class="mc" style="background:${M.linen === '#FFF3F7' ? '#E3F1FF' : '#E3E9D8'}">
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
  Object.assign(M, MORI, doc.theme === 'ppo' ? PPO_THEME : {});
  const out = path.join(dir, 'slides');
  await fs.rm(out, { recursive: true, force: true });
  await fs.mkdir(out, { recursive: true });
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  const n = doc.slides.length;
  for (let i = 0; i < n; i++) {
    const s = doc.slides[i];
    const f = path.join(out, '_s.html');
    await fs.writeFile(f, page(fonts + R[s.type === 'cover' && doc.cover ? { busy: 'coverBusy', hero: 'coverHero', grid: 'coverGrid', title: 'coverTitle', photo: 'coverPhoto' }[doc.cover] || 'cover' : s.type](s, doc, i, n), mkCss()));
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
