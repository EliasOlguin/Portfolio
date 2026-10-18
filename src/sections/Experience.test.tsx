import { screen, within } from '@testing-library/react'
import { expect, test } from 'vitest'
import { renderIn } from '../test/render'
import { Experience } from './Experience'
import { Metrics } from './Metrics'

test('metrics show the four headline numbers', () => {
  renderIn(<Metrics />)
  const values = screen.getAllByRole('definition').map((d) => d.textContent)
  expect(values).toEqual(['2 yrs', '6', '24/7', '2×'])
})

test('experience shows the Newsan role and both systems', () => {
  renderIn(<Experience />)
  expect(screen.getByRole('heading', { name: 'Software Developer · Newsan' })).toBeInTheDocument()
  expect(
    screen.getByRole('heading', { name: 'Production Traceability System (SPP)' }),
  ).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'ESD Safety Control' })).toBeInTheDocument()
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
