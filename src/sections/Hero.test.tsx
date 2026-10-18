import { render, screen } from '@testing-library/react'
import { beforeEach, expect, test, vi } from 'vitest'
import { LangProvider } from '../LangProvider'
import { Hero } from './Hero'

const renderHero = () =>
  render(
    <LangProvider>
      <Hero />
    </LangProvider>,
  )

beforeEach(() => {
  vi.spyOn(navigator, 'languages', 'get').mockReturnValue(['en'])
})

test('shows the name as the page heading', () => {
  renderHero()
  expect(screen.getByRole('heading', { level: 1, name: 'Elias Olguin' })).toBeInTheDocument()
})

test('offers the CV as a download', () => {
  renderHero()
  const cv = screen.getByRole('link', { name: 'Download CV' })
  expect(cv).toHaveAttribute('href', '/Elias-Olguin-CV.pdf')
  expect(cv).toHaveAttribute('download')
})

test('links to GitHub, LinkedIn and email', () => {
  renderHero()
  expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
    'href',
    'https://github.com/EliasOlguin',
  )
  expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
    'href',
    'https://www.linkedin.com/in/eliasolguin/',
  )
  expect(screen.getByRole('link', { name: 'Email' })).toHaveAttribute(
    'href',
    'mailto:eliasolguinde@gmail.com',
  )
})

test('lists the stack rows in the current language', () => {
  renderHero()
  for (const row of ['Frontend', 'Backend', 'Data', 'Base'])
    expect(screen.getByRole('rowheader', { name: row })).toBeInTheDocument()
  expect(screen.getByText('React · TypeScript · JavaScript · Redux')).toBeInTheDocument()
})

test('the contour drawing is decorative', () => {
  const { container } = renderHero()
  expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
})
