import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import { LangProvider } from '../LangProvider'
import { LangSwitcher } from './LangSwitcher'

const renderSwitcher = () =>
  render(
    <LangProvider>
      <LangSwitcher />
    </LangProvider>,
  )

beforeEach(() => {
  vi.spyOn(navigator, 'languages', 'get').mockReturnValue(['es-AR'])
})
afterEach(() => vi.restoreAllMocks())

test('starts in the browser language', () => {
  renderSwitcher()
  expect(document.documentElement.lang).toBe('es')
  expect(screen.getByRole('button', { name: /Español/ })).toHaveAttribute('aria-pressed', 'true')
})

test('switches and saves the language from the keyboard', async () => {
  const user = userEvent.setup()
  renderSwitcher()
  const de = screen.getByRole('button', { name: /Deutsch/ })
  while (document.activeElement !== de) await user.tab()
  await user.keyboard('{Enter}')
  expect(document.documentElement.lang).toBe('de')
  expect(localStorage.getItem('lang')).toBe('de')
  expect(de).toHaveAttribute('aria-pressed', 'true')
})

test('names each language in full', () => {
  renderSwitcher()
  for (const name of ['English', 'Español', 'Deutsch'])
    expect(screen.getByRole('button', { name: new RegExp(name) })).toBeInTheDocument()
})

test('works when storage throws', async () => {
  vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
    throw new Error('blocked')
  })
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
    throw new Error('blocked')
  })
  renderSwitcher()
  expect(document.documentElement.lang).toBe('es')
  await userEvent.click(screen.getByRole('button', { name: /English/ }))
  expect(document.documentElement.lang).toBe('en')
})

test('each accessible name starts with the visible code (voice control)', () => {
  renderSwitcher()
  for (const button of screen.getAllByRole('button')) {
    const name = button.getAttribute('aria-label') ?? ''
    expect(name.startsWith(`${button.textContent} `)).toBe(true)
  }
})
