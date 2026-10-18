import { screen, within } from '@testing-library/react'
import { expect, test } from 'vitest'
import { Footer } from '../components/Footer'
import { renderIn } from '../test/render'
import { Path } from './Path'

test('the path explains the period since 2024 as context, not as a job', () => {
  renderIn(<Path />)
  const text = document.body.textContent ?? ''
  expect(text).toMatch(/Since 2024/)
  expect(text).toMatch(/citizenship/)
  expect(text).toMatch(/personal projects/)
  expect(text).toMatch(/English/)
})

test('the path is an ordered list of four stations', () => {
  renderIn(<Path />)
  const items = within(screen.getByRole('list')).getAllByRole('listitem')
  expect(items.map((li) => li.querySelector('h3')?.textContent)).toEqual([
    'Brazing welder',
    'Repair technician',
    'Software developer',
    'Cologne',
  ])
  expect(items.map((li) => li.textContent?.match(/20\d\d/)?.[0])).toEqual([
    '2020',
    '2021',
    '2022',
    '2024',
  ])
  expect(screen.getByRole('list').tagName).toBe('OL')
})

test('the footer shows the route and the mate', () => {
  const { container } = renderIn(<Footer />)
  expect(screen.getByText('54.80°S 68.30°W → 50.94°N 6.96°E')).toBeInTheDocument()
  expect(screen.getByText('built with React, TypeScript & mate')).toBeInTheDocument()
  expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
})
