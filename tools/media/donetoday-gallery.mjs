// Builds the DoneToday gallery and card images from DoneToday/entregables.
// Run: node tools/media/donetoday-gallery.mjs <path to DoneToday/entregables>
// Output: public/media/donetoday/<lang>/slide-<n>.webp (the 9 walkthrough slides, 1600x900)
//         public/media/donetoday-<lang>.webp (16:10 card crop of the Today capture)
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { chromium } from 'playwright'

const root = process.argv[2]
if (!root) throw new Error('usage: node tools/media/donetoday-gallery.mjs <entregables folder>')

const FOLDERS = { en: 'DoneToday-EN', es: 'DoneToday', de: 'DoneToday-DE' }
export const SLIDE_COUNT = 9

const browser = await chromium.launch()
const page = await browser.newPage()

async function toWebp(file, mime, crop) {
  const url = `data:${mime};base64,` + readFileSync(file).toString('base64')
  const data = await page.evaluate(
    async ([u, card]) => {
      const img = new Image()
      img.src = u
      await img.decode()
      const canvas = document.createElement('canvas')
      if (card) {
        // The app is a centred column; take a 16:10 window of it from the top.
        const sx = img.width * 0.255
        const sw = img.width * 0.49
        canvas.width = 1280
        canvas.height = 800
        canvas
          .getContext('2d')
          .drawImage(img, sx, img.height * 0.075, sw, sw / 1.6, 0, 0, 1280, 800)
      } else {
        canvas.width = img.width
        canvas.height = img.height
        canvas.getContext('2d').drawImage(img, 0, 0)
      }
      return canvas.toDataURL('image/webp', 0.85)
    },
    [url, crop],
  )
  return Buffer.from(data.split(',')[1], 'base64')
}

for (const [lang, folder] of Object.entries(FOLDERS)) {
  mkdirSync(`public/media/donetoday/${lang}`, { recursive: true })
  for (let n = 1; n <= SLIDE_COUNT; n++) {
    const src = `${root}/${folder}/diapositivas/slide-${n}.png`
    writeFileSync(
      `public/media/donetoday/${lang}/slide-${n}.webp`,
      await toWebp(src, 'image/png', false),
    )
  }
  // The captures are JPEG data despite the .png name.
  const today = `${root}/${folder}/capturas/03-hoy.png`
  writeFileSync(`public/media/donetoday-${lang}.webp`, await toWebp(today, 'image/jpeg', true))
  console.log(lang, 'ok')
}
await browser.close()
