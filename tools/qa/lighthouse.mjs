// Lighthouse (mobile) against a running `vite preview`: node tools/qa/lighthouse.mjs [url]
// Chromium comes from Playwright; Lighthouse attaches over the debugging port.
import { spawn } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { chromium } from 'playwright'

const url = process.argv[2] ?? 'http://localhost:4180'
const out = '.superpowers/lighthouse.json'
const browser = await chromium.launch({ args: ['--remote-debugging-port=9333'] })
// Async spawn: a sync one would block the event loop Playwright needs to keep Chromium alive.
const status = await new Promise((resolve) =>
  spawn(
    'npx',
    ['-y', 'lighthouse@12', url, '--port=9333', '--quiet', '--output=json', `--output-path=${out}`, '--form-factor=mobile'],
    { shell: true, stdio: 'inherit' },
  ).on('exit', resolve),
)
await browser.close()
if (status !== 0) process.exit(status ?? 1)

const report = JSON.parse(readFileSync(out, 'utf8'))
for (const [id, c] of Object.entries(report.categories)) console.log(id.padEnd(16), Math.round(c.score * 100))
for (const a of Object.values(report.audits))
  if (a.score !== null && a.score < 0.9 && !['informative', 'notApplicable', 'manual'].includes(a.scoreDisplayMode))
    console.log('  -', a.id, a.displayValue ?? '')
