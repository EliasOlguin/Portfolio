import { screen, within } from '@testing-library/react'
import { expect, test } from 'vitest'
import { renderIn } from '../test/render'
import { Experience } from './Experience'
import { Metrics } from './Metrics'

test('metrics separate role, system scope and personal progression', () => {
  renderIn(<Metrics />)
  const items = screen.getAllByRole('definition').map((d) => d.textContent)
  expect(items).toEqual(['2022 – 2024', '6', '20 months'])
  const kinds = [...document.querySelectorAll('.metrics__kind')].map((k) => k.textContent)
  expect(kinds).toEqual(['Role', 'System scope', 'Progression'])
})

test('no metric claims measured uptime or vague merit', () => {
  renderIn(<Metrics />)
  const text = document.body.textContent ?? ''
  expect(text).not.toMatch(/24\/7|merit|my system/i)
})

test('experience shows the Newsan role and both systems', () => {
  renderIn(<Experience />)
  expect(screen.getByRole('heading', { name: 'Software Developer · Newsan' })).toBeInTheDocument()
  expect(
    screen.getByRole('heading', { name: 'Production Traceability System · SPP module' }),
  ).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'ESD Safety Control' })).toBeInTheDocument()
})

test('each system explains the problem, my contribution and the operational benefit', () => {
  renderIn(<Experience />)
  for (const name of ['Production Traceability System · SPP module', 'ESD Safety Control']) {
    const item = screen.getByRole('heading', { name }).closest('.job__item') as HTMLElement
    const terms = within(item)
      .getAllByRole('term')
      .map((t) => t.textContent)
    expect(terms).toEqual(['Problem', 'My contribution', 'Operational benefit'])
  }
})

test('the SPP entry scopes my part to the core module of a system used in six factories', () => {
  renderIn(<Experience />)
  const text = document.body.textContent ?? ''
  expect(text).toMatch(/responsible for SPP, the core module/)
  expect(text).toMatch(/used in 6 factories/)
})

test('experience lists the stack chips', () => {
  renderIn(<Experience />)
  const chips = within(screen.getByRole('list', { name: 'Stack' })).getAllByRole('listitem')
  expect(chips.map((c) => c.textContent)).toEqual([
    'React',
    'Redux',
    'TypeScript',
    'C# / .NET Core',
    'SQL Server',
    'Raspberry Pi',
  ])
})
