// 승인된 게시물을 인스타그램 캐러셀로 게시 (Instagram Graph API)
// 사용: node src/publish.mjs posts/2026-11-20-am [--dry-run]
//
// 필요:
//  - IG_USER_ID          : 인스타 비즈니스 계정 ID (docs/INSTAGRAM_SETUP.md)
//  - 액세스 토큰         : 환경의 네트워크 시크릿(graph.facebook.com, Authorization: Bearer)으로 주입되거나
//                          IG_ACCESS_TOKEN 환경변수
//  - IMAGE_BASE_URL      : 슬라이드 PNG 가 공개적으로 열리는 주소의 앞부분.
//                          기본값은 이 공개 저장소의 raw URL (브랜치는 GIT_BRANCH 또는 현재 브랜치)
//  - posts/<id>/status.json 의 state 가 "approved" 여야 함 (승인 후 게시 원칙)
import fs from 'node:fs/promises';
import path from 'node:path';
import { execSync } from 'node:child_process';

const dir = path.resolve(process.argv[2] || '');
const dry = process.argv.includes('--dry-run');
const GRAPH = 'https://graph.facebook.com/v21.0';

const doc = JSON.parse(await fs.readFile(path.join(dir, 'content.json'), 'utf8'));
const statusPath = path.join(dir, 'status.json');
const status = JSON.parse(await fs.readFile(statusPath, 'utf8'));
if (status.state === 'published') { console.log('이미 게시됨:', status.permalink || status.mediaId); process.exit(0); }
if (status.state !== 'approved' && !dry) { console.error('승인되지 않은 게시물입니다. status.json state="approved" 필요'); process.exit(1); }

const slides = (await fs.readdir(path.join(dir, 'slides'))).filter((f) => f.endsWith('.png')).sort();
if (slides.length < 2 || slides.length > 10) { console.error(`캐러셀은 2~10장 (현재 ${slides.length})`); process.exit(1); }

const git = (c) => execSync(`git ${c}`, { cwd: dir }).toString().trim();
const repoRoot = git('rev-parse --show-toplevel');
const branch = process.env.GIT_BRANCH || git('rev-parse --abbrev-ref HEAD');
const remote = git('remote get-url origin').replace(/\.git$/, '').match(/github\.com[/:]([^/]+\/[^/]+)$/)?.[1];
const base = process.env.IMAGE_BASE_URL || `https://raw.githubusercontent.com/${remote}/${branch}`;
const urls = slides.map((f) => `${base}/${path.relative(repoRoot, path.join(dir, 'slides', f)).split(path.sep).join('/')}`);

if (dry) {
  console.log(JSON.stringify({ dryRun: true, igUser: process.env.IG_USER_ID || '(미설정)', urls, caption: doc.caption }, null, 2));
  process.exit(0);
}

const IG = process.env.IG_USER_ID;
if (!IG) { console.error('IG_USER_ID 가 없습니다'); process.exit(1); }
const headers = { 'content-type': 'application/json' };
if (process.env.IG_ACCESS_TOKEN) headers.authorization = `Bearer ${process.env.IG_ACCESS_TOKEN}`;
else headers.authorization = 'Bearer placeholder'; // 네트워크 시크릿이 프록시에서 실제 토큰으로 교체

async function api(p, body, method = 'POST') {
  const r = await fetch(`${GRAPH}/${p}`, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const j = await r.json();
  if (!r.ok || j.error) throw new Error(`${p}: ${JSON.stringify(j.error || j)}`);
  return j;
}

// 공개 URL 이 실제로 열리는지 먼저 확인 (push 전 게시 방지)
for (const u of urls) {
  const r = await fetch(u, { method: 'HEAD' });
  if (!r.ok) { console.error(`이미지 URL 이 공개되지 않았습니다 (먼저 git push): ${u}`); process.exit(1); }
}

const children = [];
for (const image_url of urls) children.push((await api(`${IG}/media`, { image_url, is_carousel_item: true })).id);
const container = await api(`${IG}/media`, { media_type: 'CAROUSEL', children: children.join(','), caption: doc.caption });

for (let i = 0; i < 30; i++) {
  const s = await api(`${container.id}?fields=status_code`, null, 'GET');
  if (s.status_code === 'FINISHED') break;
  if (s.status_code === 'ERROR') throw new Error('컨테이너 처리 실패');
  await new Promise((r) => setTimeout(r, 2000));
}
const pub = await api(`${IG}/media_publish`, { creation_id: container.id });
const info = await api(`${pub.id}?fields=permalink`, null, 'GET').catch(() => ({}));
await fs.writeFile(statusPath, JSON.stringify({ ...status, state: 'published', mediaId: pub.id, permalink: info.permalink, publishedAt: new Date().toISOString() }, null, 2));
console.log('게시 완료:', info.permalink || pub.id);
