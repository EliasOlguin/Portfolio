import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, expect, test } from 'vitest'
import { renderIn } from '../test/render'
import { Projects } from './Projects'

beforeEach(() => {
  HTMLDialogElement.prototype.showModal = function () {
    this.setAttribute('open', '')
  }
  HTMLDialogElement.prototype.close = function () {
    this.removeAttribute('open')
  }
})

const card = (name: string) => screen.getByRole('heading', { level: 3, name }).closest('article')!

test('shows one card per project', () => {
  renderIn(<Projects />)
  expect(screen.getAllByRole('article')).toHaveLength(2)
  expect(card('DoneToday')).toBeInTheDocument()
  expect(card('recycle-app')).toBeInTheDocument()
})

test('DoneToday links to the live app and the code in a new tab', () => {
  renderIn(<Projects />)
  const c = within(card('DoneToday'))
  for (const [name, href] of [
    ['Live', 'https://donetoday-15xl.onrender.com'],
    ['Code', 'https://github.com/EliasOlguin/DoneToday'],
  ]) {
    const link = c.getByRole('link', { name })
    expect(link).toHaveAttribute('href', href)
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  }
})

test('recycle-app links to the code and the demo video', () => {
  renderIn(<Projects clips={{ doneToday: true, recycleApp: true }} />)
  const c = within(card('recycle-app'))
  expect(c.getByRole('link', { name: 'Code' })).toHaveAttribute(
    'href',
    'https://github.com/EliasOlguin/recycle-app',
  )
  expect(c.getByRole('link', { name: 'Demo video' })).toHaveAttribute(
    'href',
    '/media/recycle-app.mp4',
  )
})

test('a project without a recorded clip shows no video and no video link', () => {
  const { container } = renderIn(<Projects clips={{ doneToday: false, recycleApp: false }} />)
  expect(container.querySelector('video')).toBeNull()
  expect(screen.queryByRole('link', { name: 'Demo video' })).toBeNull()
})

test('every card lists its stack', () => {
  renderIn(<Projects />)
  for (const name of ['DoneToday', 'recycle-app'])
    expect(within(card(name)).getByRole('list', { name: 'Stack' })).toBeInTheDocument()
})

test('a project without a recorded clip shows a lazy still with fixed size and alt text', () => {
  renderIn(<Projects clips={{ doneToday: false, recycleApp: false }} />)
  for (const [name, src] of [
    ['DoneToday', '/media/donetoday-en.webp'],
    ['recycle-app', '/media/recycle-app.webp'],
  ]) {
    const img = within(card(name)).getByRole('img')
    expect(img).toHaveAttribute('src', src)
    expect(img).toHaveAccessibleName()
    expect(img).toHaveAttribute('loading', 'lazy')
    expect(img).toHaveAttribute('width', '960')
    expect(img).toHaveAttribute('height', '600')
  }
})

test('a project with a recorded clip shows the video instead of the still', () => {
  const { container } = renderIn(<Projects clips={{ doneToday: true, recycleApp: true }} />)
  expect(container.querySelectorAll('video')).toHaveLength(2)
  expect(container.querySelector('img')).toBeNull()
})

test('each card shows at most three key points up front', () => {
  renderIn(<Projects />)
  for (const name of ['DoneToday', 'recycle-app']) {
    const points = card(name).querySelector('.project__points')!
    expect(points.children.length).toBeLessThanOrEqual(3)
  }
})

test('the step-by-step lives in a native disclosure, closed by default', () => {
  renderIn(<Projects />)
  for (const name of ['DoneToday', 'recycle-app']) {
    const details = card(name).querySelector('details')!
    expect(details).not.toHaveAttribute('open')
    expect(details.querySelector('summary')).toHaveTextContent('How it works')
    expect(details.querySelectorAll('li').length).toBeGreaterThanOrEqual(3)
  }
})

test('recycle-app leads with the split between AI identification and city rules', () => {
  renderIn(<Projects />)
  const first = card('recycle-app').querySelector('.project__points li')!
  expect(first.textContent).toMatch(/only identifies/)
  expect(first.textContent).toMatch(/city/)
})

test('each card shows a verified start date and status', () => {
  renderIn(<Projects />)
  expect(within(card('DoneToday')).getByText('Since Oct 2026 · v1.2.2 · live')).toBeInTheDocument()
  expect(
    within(card('recycle-app')).getByText('Since Oct 2026 · in development'),
  ).toBeInTheDocument()
})

test('the live demo warns that free hosting can take a while to wake up', () => {
  renderIn(<Projects />)
  expect(
    within(card('DoneToday')).getByText(/first load can take up to a minute/),
  ).toBeInTheDocument()
})

test.each([
  ['en', '/media/donetoday-en.webp'],
  ['es', '/media/donetoday-es.webp'],
  ['de', '/media/donetoday-de.webp'],
] as const)('in %s DoneToday shows the Today screen in a matching language', (lang, src) => {
  renderIn(<Projects clips={{ doneToday: false, recycleApp: false }} />, lang)
  const img = within(card('DoneToday')).getByRole('img')
  expect(img).toHaveAttribute('src', src)
  expect(img.getAttribute('alt')).toMatch(/streak|racha|Streak/)
})

test.each(['en', 'es', 'de'] as const)(
  'in %s the DoneToday gallery shows the 9 walkthrough slides in that language',
  async (lang) => {
    renderIn(<Projects clips={{ doneToday: false, recycleApp: false }} />, lang)
    const dialog = card('DoneToday').querySelector('dialog')!
    await userEvent.click(within(card('DoneToday')).getAllByRole('button')[0])
    const img = dialog.querySelector('img')!
    expect(img).toHaveAttribute('src', `/media/donetoday/${lang}/slide-1.webp`)
    expect(img.getAttribute('alt')).toMatch(/^1\. /)
    expect(within(dialog).getByText('1 / 9')).toBeInTheDocument()
  },
)

test('the recycle-app gallery shows its single screenshot', async () => {
  renderIn(<Projects clips={{ doneToday: false, recycleApp: false }} />)
  await userEvent.click(within(card('recycle-app')).getAllByRole('button')[0])
  expect(card('recycle-app').querySelector('dialog img')).toHaveAttribute(
    'src',
    '/media/recycle-app.webp',
  )
})
