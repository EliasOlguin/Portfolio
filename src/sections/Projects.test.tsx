import { screen, within } from '@testing-library/react'
import { expect, test } from 'vitest'
import { renderIn } from '../test/render'
import { Projects } from './Projects'

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
  renderIn(<Projects />)
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

test('every card lists its stack', () => {
  renderIn(<Projects />)
  for (const name of ['DoneToday', 'recycle-app'])
    expect(within(card(name)).getByRole('list', { name: 'Stack' })).toBeInTheDocument()
})
