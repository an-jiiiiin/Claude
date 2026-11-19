// 릴스 렌더러: 시간 t 로 그려지는 HTML(window.setT(t))을 프레임으로 찍어 MP4 로 만든다.
// 사용: node src/reel-render.mjs reels/<id>/reel.mjs [fps]
//   reel.mjs 는 { duration, html } 을 export (html 은 templates.page() 로 감싼 문서)
//   → reels/<id>/reel.mp4 (1080x1920, H.264, 무음), reels/<id>/poster.png
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const mod = path.resolve(process.argv[2]);
const fps = Number(process.argv[3] || 30);
const dir = path.dirname(mod);
const { duration, html, posterAt = 2.5 } = await import(pathToFileURL(mod).href);

const frames = path.join(dir, '_frames');
await fs.rm(frames, { recursive: true, force: true });
await fs.mkdir(frames, { recursive: true });
const htmlPath = path.join(dir, '_reel.html');
await fs.writeFile(htmlPath, html);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
await page.goto('file://' + htmlPath);
await page.evaluate(() => document.fonts.ready);
const total = Math.round(duration * fps);
for (let f = 0; f < total; f++) {
  await page.evaluate((t) => window.setT(t), f / fps);
  await page.screenshot({ path: path.join(frames, `${String(f).padStart(5, '0')}.jpg`), type: 'jpeg', quality: 92 });
}
await page.evaluate((t) => window.setT(t), posterAt);
await page.screenshot({ path: path.join(dir, 'poster.png') });
await browser.close();

const out = path.join(dir, 'reel.mp4');
execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', String(fps), '-i', path.join(frames, '%05d.jpg'),
  '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-crf', '18', '-movflags', '+faststart', out]);
await fs.rm(frames, { recursive: true, force: true });
await fs.rm(htmlPath);
console.log(JSON.stringify({ out, frames: total, fps, duration }));
