import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const w of [920, 1024, 768, 1100]) {
  const page = await browser.newPage({ viewport: { width: w, height: 800 } });
  await page.goto('http://localhost:8643/index.html', { waitUntil: 'load' });
  await page.evaluate(() => window.scrollTo({top: document.querySelector('.grid-3').closest('section').offsetTop - 80, behavior:'instant'}));
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `w-${w}.png`, animations: 'disabled' });
  await page.close();
}
await browser.close();
console.log('done');
