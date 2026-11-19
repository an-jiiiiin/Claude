// 사용법: node src/render.mjs content/2026-11-19-am.json [outDir]
// 콘텐츠 JSON → 슬라이드별 1080x1350 PNG
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
import fs from 'node:fs/promises';
import path from 'node:path';
import { slideHTML } from './templates.mjs';

export async function renderDoc(file, outDir) {
  const doc = JSON.parse(await fs.readFile(file, 'utf8'));
  const base = path.basename(file, '.json');
  outDir = outDir || path.join('out', base);
  await fs.mkdir(outDir, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  const files = [];
  for (let i = 0; i < doc.slides.length; i++) {
    const htmlPath = path.resolve(outDir, `_slide${i + 1}.html`);
    await fs.writeFile(htmlPath, slideHTML(doc, i));
    await page.goto('file://' + htmlPath);
    await page.evaluate(() => document.fonts.ready);
    const png = path.join(outDir, `${base}-${String(i + 1).padStart(2, '0')}.png`);
    await page.locator('.card').screenshot({ path: png });
    await fs.rm(htmlPath);
    files.push(png);
  }
  await browser.close();
  return files;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const files = await renderDoc(process.argv[2], process.argv[3]);
  console.log(files.join('\n'));
}
