// node render.js  → cardnews/png/c1-1.png … c3-5.png (1080×1350)
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 1400 }, deviceScaleFactor: 1 });
  await page.goto('file://' + path.join(__dirname, process.argv[2]||'cards.html'));
  await page.evaluate(() => document.fonts.ready);
  const ids = await page.$$eval('section.card', els => els.map(e => e.id));
  for (const id of ids) {
    await page.locator('#' + id).screenshot({ path: path.join(__dirname, 'png', id + '.png') });
  }
  const fonts = await page.evaluate(() => [...document.fonts].filter(f => f.status === 'loaded').length);
  console.log('rendered', ids.length, 'cards; fonts loaded:', fonts);
  // overflow check
  const over = await page.$$eval('section.card', els => els.filter(e => {
    const b = e.querySelector('.c-body') || e.querySelector('.panel'); return b && b.scrollHeight > b.clientHeight + 1;
  }).map(e => e.id));
  console.log('overflowing:', over);
  await browser.close();
})();
