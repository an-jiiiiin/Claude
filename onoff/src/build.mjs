// 게시물 폴더 하나를 빌드: 슬라이드 PNG + 검수용 시트(review.png) + review.md
// 사용: node src/build.mjs posts/2026-11-20-am
//   posts/<id>/content.json  (원고, 필수)
//   posts/<id>/images/        (실사 이미지, 선택)
//   → posts/<id>/slides/01.png ... , review.png, review.md, status.json
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
import fs from 'node:fs/promises';
import path from 'node:path';
import { renderDoc } from './render.mjs';
import { page, SERIES } from './templates.mjs';
import { validate } from './validate.mjs';

const dir = path.resolve(process.argv[2] || '');
const doc = JSON.parse(await fs.readFile(path.join(dir, 'content.json'), 'utf8'));
const problems = validate(doc);

// 1) 슬라이드 렌더 (파일명을 01.png 형태로 정리)
const slidesDir = path.join(dir, 'slides');
await fs.rm(slidesDir, { recursive: true, force: true });
const tmp = await renderDoc(path.join(dir, 'content.json'), slidesDir);
const slides = [];
for (let i = 0; i < tmp.length; i++) {
  const f = path.join(slidesDir, `${String(i + 1).padStart(2, '0')}.png`);
  await fs.rename(tmp[i], f);
  slides.push(f);
}

// 2) 검수 시트: 슬라이드 썸네일 + 캡션 + 출처 + 체크리스트
const S = SERIES[doc.series];
const esc = (t = '') => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const photos = doc.slides.filter((s) => s.image);
const missing = photos.filter((s) => !s.image.src);
const css = `
.rv{width:1800px;background:#F5F3EE;padding:60px;font-family:'Pretendard';color:#0E0E10}
.rv h1{font-size:44px;font-weight:900;letter-spacing:-0.03em;margin-bottom:6px}
.rv .meta{font-size:22px;color:#666;margin-bottom:30px}
.rv .g{display:grid;grid-template-columns:repeat(5,1fr);gap:14px;margin-bottom:36px}
.rv .g img{width:100%;border-radius:8px;display:block}
.rv .g div{font-size:16px;color:#888;text-align:center;margin-top:4px}
.rv .two{display:grid;grid-template-columns:1.2fr 1fr;gap:24px}
.rv .box{background:#fff;border-radius:18px;padding:32px;font-size:21px;line-height:1.6}
.rv .box h2{font-size:26px;font-weight:800;margin-bottom:12px}
.rv pre{white-space:pre-wrap;font-family:'Pretendard';font-size:20px;line-height:1.6}
.rv .warn{color:#D1009E;font-weight:700}
.rv .ok{color:#0B72C9;font-weight:700}
.rv a{color:#0B72C9;word-break:break-all}
`;
const grid = slides.map((f, i) => `<div><img src="slides/${path.basename(f)}"><div>${i + 1}</div></div>`).join('');
const html = `<div class="rv">
  <h1>[승인 요청] ${S.label} · ${esc(doc.category || S.desc)} — ${esc(doc.slides[0].title.replace(/==|\*\*/g, '').replace(/\n/g, ' '))}</h1>
  <div class="meta">${esc(path.basename(dir))} · 슬라이드 ${slides.length}장 · 게시 예정 ${doc.series === 'on' ? '08:00' : '18:00'} KST</div>
  <div class="g">${grid}</div>
  <div class="two">
    <div class="box"><h2>캡션</h2><pre>${esc(doc.caption || '')}</pre></div>
    <div class="box"><h2>검수 체크</h2>
      ${problems.length ? problems.map((p) => `<div class="warn">⚠ ${esc(p)}</div>`).join('') : '<div class="ok">✓ 형식 검사 통과</div>'}
      ${missing.length ? `<div class="warn">⚠ 실사 이미지 미지정 ${missing.length}장 (회색 자리) — 이미지 지정 후 재빌드 필요</div>` : '<div class="ok">✓ 실사 이미지 모두 지정됨</div>'}
      <h2 style="margin-top:20px">출처</h2>${(doc.sources || []).map((u) => `<div><a>${esc(u)}</a></div>`).join('') || '<div class="warn">⚠ 출처 없음</div>'}
      <h2 style="margin-top:20px">이미지 출처</h2>${photos.map((s) => `<div>${esc(s.image.credit || '?')} — ${esc(s.image.license || '라이선스 미기재')}</div>`).join('') || '<div>없음</div>'}
    </div>
  </div>
</div>`;
const browser = await chromium.launch();
const p = await browser.newPage({ viewport: { width: 1800, height: 1200 } });
const f = path.join(dir, '_review.html');
await fs.writeFile(f, page(html, css));
await p.goto('file://' + f);
await p.evaluate(() => document.fonts.ready);
await p.locator('.rv').screenshot({ path: path.join(dir, 'review.png') });
await fs.rm(f);
await browser.close();

// 3) review.md + status.json
const md = `# [승인 요청] ${S.label} · ${doc.category || S.desc}

- 게시물: \`${path.basename(dir)}\` (슬라이드 ${slides.length}장, 게시 예정 ${doc.series === 'on' ? '08:00' : '18:00'} KST)
- 형식 검사: ${problems.length ? problems.map((x) => '⚠ ' + x).join(' / ') : '통과'}
- 실사 이미지: ${missing.length ? `⚠ ${missing.length}장 미지정` : '모두 지정'}

## 캡션
\`\`\`
${doc.caption || ''}
\`\`\`

## 출처
${(doc.sources || []).map((u) => `- ${u}`).join('\n')}

## 이미지
${photos.map((s) => `- ${s.image.credit || '?'} · ${s.image.license || '라이선스 미기재'}${s.image.src ? '' : ' · ⚠ 미지정'}`).join('\n') || '- 없음'}

승인하려면 이 세션에 **"승인"**, 수정하려면 바꿀 내용을 적어주세요.
`;
await fs.writeFile(path.join(dir, 'review.md'), md);
const statusPath = path.join(dir, 'status.json');
let status = {};
try { status = JSON.parse(await fs.readFile(statusPath, 'utf8')); } catch {}
await fs.writeFile(statusPath, JSON.stringify({ ...status, state: status.state === 'published' ? 'published' : 'pending_review', builtAt: new Date().toISOString(), problems, missingImages: missing.length }, null, 2));
console.log(JSON.stringify({ dir, slides: slides.length, problems, missingImages: missing.length }, null, 2));
