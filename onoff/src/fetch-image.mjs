// 이미지 내려받기: 이미지 URL 또는 기사/페이지 URL(og:image 추출)
// 사용: node src/fetch-image.mjs <url> posts/<id>/images/01
//   → 확장자를 붙여 저장하고 저장 경로를 출력. content.json 의 image.src 에 그 경로를 넣는다.
// 주의: 라이선스가 확인된 소스만 사용 (AUTOMATION.md 의 이미지 규칙 참고)
import fs from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

// Node fetch 는 기본적으로 HTTPS_PROXY 를 안 따름 → 프록시 환경이면 설정을 켜고 다시 실행
if ((process.env.HTTPS_PROXY || process.env.https_proxy) && !process.env.NODE_USE_ENV_PROXY) {
  const env = { ...process.env, NODE_USE_ENV_PROXY: '1', NODE_NO_WARNINGS: '1' };
  if (!env.NODE_EXTRA_CA_CERTS) { try { await fs.access('/root/.ccr/ca-bundle.crt'); env.NODE_EXTRA_CA_CERTS = '/root/.ccr/ca-bundle.crt'; } catch {} }
  const r = spawnSync(process.execPath, process.argv.slice(1), { stdio: 'inherit', env });
  process.exit(r.status ?? 1);
}

const [url, outBase] = process.argv.slice(2);
if (!url || !outBase) {
  console.error('usage: node src/fetch-image.mjs <url> <outBase>');
  process.exit(1);
}
const UA = { 'user-agent': 'Mozilla/5.0 (card-news-bot)' };

async function resolveImage(u) {
  const r = await fetch(u, { headers: UA, redirect: 'follow' });
  if (!r.ok) throw new Error(`${r.status} ${u}`);
  const ct = r.headers.get('content-type') || '';
  if (ct.startsWith('image/')) return { buf: Buffer.from(await r.arrayBuffer()), ct, from: u };
  const html = await r.text();
  const m = html.match(/<meta[^>]+property=["']og:image(?::url)?["'][^>]+content=["']([^"']+)["']/i)
    || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
  if (!m) throw new Error('og:image 를 찾지 못함: ' + u);
  return resolveImage(new URL(m[1], u).href);
}

const { buf, ct, from } = await resolveImage(url);
const ext = ct.includes('png') ? 'png' : ct.includes('webp') ? 'webp' : 'jpg';
const out = `${outBase}.${ext}`;
await fs.mkdir(path.dirname(out), { recursive: true });
await fs.writeFile(out, buf);
console.log(JSON.stringify({ saved: out, from, bytes: buf.length }));
