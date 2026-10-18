import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, expect, test, vi } from 'vitest'
import App from './App'
import { PHONE_RE } from './test/phone'

beforeEach(() => {
  vi.spyOn(navigator, 'languages', 'get').mockReturnValue(['en-US'])
})

test('renders the main landmark', () => {
  render(<App />)
  expect(screen.getByRole('main')).toHaveAttribute('id', 'main')
})

test('the header holds the language switcher', () => {
  render(<App />)
  const banner = screen.getByRole('banner')
  expect(within(banner).getByRole('button', { name: /Deutsch/ })).toBeInTheDocument()
})

test('the first focusable element skips to the content', async () => {
  render(<App />)
  await userEvent.tab()
  const skip = screen.getByRole('link', { name: 'Skip to content' })
  expect(skip).toHaveFocus()
  expect(skip).toHaveAttribute('href', '#main')
})

test.each(['en', 'es', 'de'])('no phone number on the page in %s', (lang) => {
  vi.spyOn(navigator, 'languages', 'get').mockReturnValue([lang])
  render(<App />)
  expect(document.body.textContent).not.toMatch(PHONE_RE)
  expect(document.body.innerHTML).not.toMatch(PHONE_RE)
})

test('sections appear in the spec order', () => {
  render(<App />)
  const labels = screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent)
  expect(labels).toEqual([
    'At a glance',
    '01 / Experience',
    '02 / Projects',
    '03 / Path',
    '04 / Education',
    'Languages',
    'Let’s build something.',
  ])
})

test('the header holds the section menu', () => {
  render(<App />)
  const banner = screen.getByRole('banner')
  expect(within(banner).getByRole('navigation', { name: 'Sections' })).toBeInTheDocument()
})

test('every menu link points at a section that exists', () => {
  render(<App />)
  const nav = screen.getByRole('navigation', { name: 'Sections' })
  for (const link of within(nav).getAllByRole('link'))
    expect(document.querySelector(link.getAttribute('href')!)).not.toBeNull()
})
