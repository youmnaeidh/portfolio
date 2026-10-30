const { chromium } = require(process.env.GALLERY_PLAYWRIGHT_MODULE);
const { createServer } = require('node:http');
const { readFileSync, mkdirSync } = require('node:fs');
const assert = require('node:assert/strict');

(async () => {
  const html = readFileSync('index.html');
  const madinahHtml = readFileSync('projects/madinah/index.html');
  const eventboardHtml = readFileSync('projects/eventboard/index.html');
  const server = createServer((req, res) => {
    if (req.url === '/portfolio/' || req.url === '/') {
      res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
      res.end(html);
    } else if (req.url === '/portfolio/projects/madinah/') {
      res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
      res.end(madinahHtml);
    } else if (req.url === '/portfolio/projects/eventboard/') {
      res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
      res.end(eventboardHtml);
    } else { res.writeHead(404); res.end(); }
  });
  await new Promise(resolve => server.listen(4173, '127.0.0.1', resolve));
  const browser = await chromium.launch();
  mkdirSync('gallery-evidence', { recursive: true });
  try {
    for (const width of [1440, 390, 320]) {
      const context = await browser.newContext({ viewport: { width, height: 1000 }, isMobile: width < 500, hasTouch: width < 500, reducedMotion: 'reduce' });
      const page = await context.newPage();
      await page.goto('http://127.0.0.1:4173/portfolio/');
      const gallery = page.locator('.project-gallery');
      await gallery.scrollIntoViewIfNeeded();
      assert.equal(await gallery.locator('.gallery-slide').count(), 4);
      assert((await gallery.boundingBox()).height < 550, 'Gallery must stay compact');
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'No page overflow');
      async function checkSlide(index) {
        await page.waitForFunction(i => document.querySelector('.gallery-count').textContent === (i + 1) + ' / 4', index);
        await page.waitForFunction(i => {
          const track = document.querySelector('.project-gallery-track');
          return Math.abs(track.scrollLeft - i * track.clientWidth) < 2;
        }, index);
        const img = gallery.locator('img').nth(index);
        await img.evaluate(el => el.decode());
        assert(await img.evaluate(el => el.naturalWidth > 0));
        assert((await img.boundingBox()).height <= 390);
      }
      await checkSlide(0);
      await gallery.getByRole('button', { name: 'Next screenshot', exact: true }).click();
      await checkSlide(1);
      await gallery.getByRole('button', { name: 'Next screenshot', exact: true }).click();
      await checkSlide(2);
      await gallery.getByRole('button', { name: 'Show screenshot 4: Organizer dashboard', exact: true }).click();
      await checkSlide(3);
      assert(await gallery.getByRole('button', { name: 'Next screenshot', exact: true }).isDisabled());
      await gallery.getByRole('button', { name: 'Previous screenshot', exact: true }).click();
      await checkSlide(2);
      await gallery.locator('.project-gallery-track').focus();
      await page.keyboard.press('Home');
      await checkSlide(0);
      if (width < 500) {
        const box = await gallery.locator('.gallery-frame').first().boundingBox();
        const session = await context.newCDPSession(page);
        const startX = box.x + box.width * 0.85;
        const endX = box.x + box.width * 0.15;
        const y = box.y + box.height / 2;
        await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: startX, y }] });
        for (let step = 1; step <= 10; step++) {
          await session.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: startX + (endX-startX)*step/10, y }] });
          await new Promise(resolve => setTimeout(resolve, 25));
        }
        await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
        await checkSlide(1);
        console.log('Native touch swipe passed at ' + width + 'px');
        await gallery.getByRole('button', { name: 'Show screenshot 1: Discover Madinah', exact: true }).click();
        await checkSlide(0);
      }
      await gallery.screenshot({ path: 'gallery-evidence/eventboard-gallery-' + width + '.png' });
      console.log('PASS: ' + width + 'px, four images, bounded height, arrows, dots and keyboard');
      await page.goto('http://127.0.0.1:4173/portfolio/projects/madinah/', { waitUntil: 'domcontentloaded' });
      assert.equal(await page.title(), 'Madinah Operations Intelligence — Yomna Alhejaili');
      assert(await page.getByRole('heading', { name: 'Better recall. More noise.' }).isVisible());
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'No case-study page overflow at ' + width + 'px');
      assert.equal(await page.locator('#recall').textContent(), '85.3%');
      await page.getByRole('button', { name: 'Original' }).click();
      assert.equal(await page.locator('#recall').textContent(), '76.6%');
      assert.equal(await page.locator('#precision').textContent(), '36.6%');
      assert.equal(await page.getByRole('button', { name: 'Original' }).getAttribute('aria-pressed'), 'true');
      await page.getByRole('button', { name: 'Revised' }).click();
      assert.equal(await page.locator('#recall').textContent(), '85.3%');
      assert.equal(await page.locator('#auc').textContent(), '0.6870');
      assert.equal(await page.locator('.screen-card img').count(), 3);
      await page.screenshot({ path: 'gallery-evidence/madinah-case-study-' + width + '.png', fullPage: true });
      console.log('PASS: Madinah case study ' + width + 'px, no overflow and model comparison toggle');
      await page.goto('http://127.0.0.1:4173/portfolio/projects/eventboard/', { waitUntil: 'domcontentloaded' });
      assert.equal(await page.title(), 'EventBoard v2 — Case Study | Yomna Alhejaili');
      assert(await page.getByRole('heading', { name: 'EventBoard.' }).isVisible());
      assert(await page.getByRole('link', { name: 'Explore live demo' }).isVisible());
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'No EventBoard case-study overflow at ' + width + 'px');
      await page.locator('.views').scrollIntoViewIfNeeded();
      assert.equal(await page.locator('#view-title').textContent(), 'Local discovery, in Arabic.');
      await page.getByRole('button', { name: 'Organizer console' }).click();
      assert.equal(await page.locator('#view-title').textContent(), 'An organizer console.');
      assert.match(await page.locator('#view-image').getAttribute('src'), /organizer-desktop\.png$/);
      assert.equal(await page.getByRole('button', { name: 'Organizer console' }).getAttribute('aria-pressed'), 'true');
      await page.getByRole('button', { name: 'Mobile experience' }).click();
      assert.match(await page.locator('#view-image').getAttribute('src'), /home-mobile\.png$/);
      await page.locator('#view-image').evaluate(img => img.decode());
      assert(await page.locator('#view-image').evaluate(img => img.naturalWidth > 0));
      await page.getByRole('button', { name: 'Discover events' }).click();
      assert.equal(await page.getByRole('button', { name: 'Discover events' }).getAttribute('aria-pressed'), 'true');
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'No EventBoard overflow after view switching');
      await page.screenshot({ path: 'gallery-evidence/eventboard-case-study-' + width + '.png', fullPage: true });
      console.log('PASS: EventBoard case study ' + width + 'px, evidence, responsive layout and three views');
      await context.close();
    }
  } finally { await browser.close(); await new Promise(resolve => server.close(resolve)); }
})().catch(error => { console.error(error); process.exitCode = 1; });
