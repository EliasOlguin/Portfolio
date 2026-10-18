// Builds the DoneToday gallery and card images from the screenshots in DoneToday/entregables.
// Run: node tools/media/donetoday-gallery.mjs <path to DoneToday/entregables>
// Output: public/media/donetoday/<lang>/<slide>.webp (whole app column, nothing cut)
//         public/media/donetoday-<lang>.webp (16:10 card crop of the Today screen)
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { chromium } from 'playwright'

const root = process.argv[2]
if (!root) throw new Error('usage: node tools/media/donetoday-gallery.mjs <entregables folder>')

const FOLDERS = { en: 'DoneToday-EN', es: 'DoneToday', de: 'DoneToday-DE' }
// Gallery order: what a recruiter should see first comes first.
export const SLIDES = [
  ['01-today', '03-hoy'],
  ['02-complete', '05-completar'],
  ['03-create', '04-crear-habito'],
  ['04-habits', '06-habitos'],
  ['05-stats', '07-estadisticas'],
  ['06-settings', '08-configuracion'],
  ['07-signup', '02-registro'],
]

const browser = await chromium.launch()
const page = await browser.newPage()

async function render(file, crop) {
  // The captures are JPEG data despite the .png name.
  const url = 'data:image/jpeg;base64,' + readFileSync(file).toString('base64')
  const data = await page.evaluate(
    async ([u, c]) => {
      const img = new Image()
      img.src = u
      await img.decode()
      // The app is a centred column; drop only the empty side margins.
      const sx = img.width * 0.255
      const sw = img.width * 0.49
      const [sy, sh, w, h] =
        c === 'card'
          ? [img.height * 0.075, sw / 1.6, 1280, 800]
          : [0, img.height, Math.round(sw), Math.round(img.height)]
      const canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
      canvas.getContext('2d').drawImage(img, sx, sy, sw, sh, 0, 0, w, h)
      return canvas.toDataURL('image/webp', 0.8)
    },
    [url, crop],
  )
  return Buffer.from(data.split(',')[1], 'base64')
}

for (const [lang, folder] of Object.entries(FOLDERS)) {
  mkdirSync(`public/media/donetoday/${lang}`, { recursive: true })
  for (const [slide, source] of SLIDES) {
    const out = `public/media/donetoday/${lang}/${slide}.webp`
    writeFileSync(out, await render(`${root}/${folder}/capturas/${source}.png`, 'full'))
  }
  writeFileSync(`public/media/donetoday-${lang}.webp`, await render(`${root}/${folder}/capturas/03-hoy.png`, 'card'))
  console.log(lang, 'ok')
}
await browser.close()
