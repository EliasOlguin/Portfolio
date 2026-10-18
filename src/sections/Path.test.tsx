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

test('every station reads the same way: role, then place, then years', () => {
  renderIn(<Path />)
  const items = within(screen.getByRole('list')).getAllByRole('listitem')
  const rows = items.map((li) => [
    li.querySelector('h3')?.textContent,
    li.querySelector('.path__place')?.textContent,
    li.querySelector('.path__dates')?.textContent,
  ])
  expect(rows).toEqual([
    ['Brazing welder', 'Newsan · Ushuaia', '2020 – 2021'],
    ['Repair technician', 'Newsan · Ushuaia', '2021 – 2022'],
    ['Software developer', 'Newsan · Ushuaia', '2022 – 2024'],
    ['Move to Germany', 'Italy · Cologne', '2024 – now'],
  ])
  expect(screen.getByRole('list').tagName).toBe('OL')
})

test.each([
  [
    'es',
    [
      'Soldador de brazing',
      'Técnico de reparación',
      'Desarrollador de software',
      'Mudanza a Alemania',
    ],
    'Italia · Colonia',
    '2024 – hoy',
  ],
  [
    'de',
    ['Hartlöter', 'Reparaturtechniker', 'Softwareentwickler', 'Umzug nach Deutschland'],
    'Italien · Köln',
    '2024 – heute',
  ],
] as const)('in %s the stations use the same structure', (lang, titles, lastPlace, lastDates) => {
  renderIn(<Path />, lang)
  const items = within(screen.getByRole('list')).getAllByRole('listitem')
  expect(items.map((li) => li.querySelector('h3')?.textContent)).toEqual(titles)
  expect(items[3].querySelector('.path__place')).toHaveTextContent(lastPlace)
  expect(items[3].querySelector('.path__dates')).toHaveTextContent(lastDates)
})

test('the footer shows the route and the mate', () => {
  const { container } = renderIn(<Footer />)
  expect(screen.getByText('54.80°S 68.30°W → 50.94°N 6.96°E')).toBeInTheDocument()
  expect(screen.getByText('built with React, TypeScript & mate')).toBeInTheDocument()
  expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
})
