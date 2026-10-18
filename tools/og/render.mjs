// Renders public/og.png (1200x630) in the spec-sheet style: node tools/og/render.mjs
import { readFileSync } from 'node:fs'
import { chromium } from 'playwright'

const contours = readFileSync(
  new URL('../../src/assets/ushuaia-contours.svg', import.meta.url),
  'utf8',
)
const font = (pkg, file) =>
  readFileSync(
    new URL(`../../node_modules/@fontsource-variable/${pkg}/files/${file}`, import.meta.url),
  ).toString('base64')

const html = `<!doctype html><html><head><style>
@font-face { font-family: Geist; src: url(data:font/woff2;base64,${font('geist', 'geist-latin-wght-normal.woff2')}) format('woff2'); font-weight: 100 900; }
@font-face { font-family: GeistMono; src: url(data:font/woff2;base64,${font('geist-mono', 'geist-mono-latin-wght-normal.woff2')}) format('woff2'); font-weight: 100 900; }
body { margin: 0; width: 1200px; height: 630px; background: #0a0a0a; color: #c7c9cc; font-family: Geist; position: relative; overflow: hidden; }
.c { position: absolute; right: -60px; bottom: -160px; width: 760px; color: #2a2c30; -webkit-mask-image: linear-gradient(90deg, transparent, #000 45%); }
.c svg { width: 100%; height: auto; }
.b { position: absolute; inset: 72px 80px; }
.tag { font-family: GeistMono; font-size: 20px; letter-spacing: .12em; color: #8a8f96; display: flex; justify-content: space-between; border-bottom: 1px solid #34363a; padding-bottom: 14px; }
h1 { font-size: 116px; font-weight: 600; letter-spacing: -.03em; margin: 64px 0 20px; line-height: 1;
  background: linear-gradient(180deg,#f4f5f7 0%,#9aa0a8 45%,#e6e8eb 55%,#6c727a 100%); -webkit-background-clip: text; color: transparent; }
p { font-size: 34px; line-height: 1.35; max-width: 820px; margin: 0; }
.m { font-family: GeistMono; font-size: 22px; color: #8a8f96; margin-top: 36px; }
</style></head><body>
<div class="c">${contours}</div>
<div class="b"><div class="tag"><span>EO-01 / DEVELOPER SPEC</span><span>54.80°S 68.30°W</span></div>
<h1>Elias Olguin</h1><p>Full-stack developer. React and TypeScript on the front, C#/.NET and SQL behind it.</p>
<div class="m">Cologne, DE · EU citizen · available now</div></div></body></html>`

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
await page.setContent(html)
await page.evaluate(() => document.fonts.ready)
await page.screenshot({
  path: new URL('../../public/og.png', import.meta.url).pathname.replace(/^\/(\w:)/, '$1'),
})
await browser.close()
console.log('wrote public/og.png')
