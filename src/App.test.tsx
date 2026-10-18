import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, expect, test, vi } from 'vitest'
import App from './App'

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
  expect(within(banner).getByRole('button', { name: 'Deutsch' })).toBeInTheDocument()
})

test('the first focusable element skips to the content', async () => {
  render(<App />)
  await userEvent.tab()
  const skip = screen.getByRole('link', { name: 'Skip to content' })
  expect(skip).toHaveFocus()
  expect(skip).toHaveAttribute('href', '#main')
})
