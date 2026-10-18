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

test.each([
  ['es', 'Descargar CV', '/Elias-Olguin-CV-ES.pdf'],
  ['de', 'Lebenslauf', '/Elias-Olguin-CV-DE.pdf'],
] as const)('in %s the CV download is the %s version', (lang, name, href) => {
  vi.spyOn(navigator, 'languages', 'get').mockReturnValue([lang])
  renderHero()
  expect(screen.getByRole('link', { name })).toHaveAttribute('href', href)
})

test('the first screen tells the factory-to-software story in one line', () => {
  renderHero()
  expect(
    screen.getByText(
      'I started on a factory production line, learned to code at night and went on to build software used in that same operation.',
    ),
  ).toBeInTheDocument()
})

test('the stack table states openness to remote work and relocation', () => {
  renderHero()
  expect(screen.getByRole('rowheader', { name: 'Open to' })).toBeInTheDocument()
  expect(screen.getByText('Full-stack roles · remote · relocation')).toBeInTheDocument()
})
