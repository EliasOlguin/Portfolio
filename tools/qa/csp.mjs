// Loads the built site with the production headers from vercel.json and fails on any CSP violation.
// Run against `vite preview`: node tools/qa/csp.mjs [url]
import { readFileSync } from 'node:fs'
import { chromium } from 'playwright'

const url = process.argv[2] ?? 'http://localhost:4180'
const headers = Object.fromEntries(
  JSON.parse(readFileSync('vercel.json', 'utf8')).headers[0].headers.map((h) => [
    h.key.toLowerCase(),
    h.value,
  ]),
)
// upgrade-insecure-requests would rewrite http://localhost to https during the local check.
headers['content-security-policy'] = headers['content-security-policy'].replace(
  '; upgrade-insecure-requests',
  '',
)

const browser = await chromium.launch()
const page = await browser.newPage()
const problems = []
page.on('console', (m) => m.type() === 'error' && problems.push(m.text()))
page.on('pageerror', (e) => problems.push(e.message))
await page.route('**/*', async (route) => {
  const response = await route.fetch()
  await route.fulfill({ response, headers: { ...response.headers(), ...headers } })
})
await page.goto(url, { waitUntil: 'networkidle' })
await page.click('button[lang=de]')
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
await page.waitForTimeout(500)
await browser.close()

if (problems.length) {
  console.error(problems.join('\n'))
  process.exit(1)
}
console.log('no CSP violations or console errors')
