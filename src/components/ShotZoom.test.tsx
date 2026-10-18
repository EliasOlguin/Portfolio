import { fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, expect, test } from 'vitest'
import { renderIn } from '../test/render'
import { ShotZoom } from './ShotZoom'

beforeEach(() => {
  // jsdom has <dialog> but no modal behaviour; mimic the open state the browser manages.
  HTMLDialogElement.prototype.showModal = function () {
    this.setAttribute('open', '')
  }
  HTMLDialogElement.prototype.close = function () {
    this.removeAttribute('open')
    this.dispatchEvent(new Event('close'))
  }
})

const slides = [
  { src: '/media/a/1.webp', caption: 'Today screen' },
  { src: '/media/a/2.webp', caption: 'Statistics' },
  { src: '/media/a/3.webp', caption: 'Settings' },
]

const renderZoom = (s = slides) =>
  renderIn(<ShotZoom name="DoneToday" src="/media/a.webp" alt="Today screen" slides={s} />)

const openGallery = () =>
  userEvent.click(screen.getByRole('button', { name: 'Enlarge screenshot: DoneToday' }))

const shown = () => {
  const img = document.querySelector('dialog img')!
  return [img.getAttribute('src'), img.getAttribute('alt')]
}

test('the card image has a clearly named button to open the screenshots', () => {
  renderZoom()
  expect(screen.getByRole('img', { name: 'Today screen' })).toHaveAttribute('src', '/media/a.webp')
  expect(screen.getByRole('button', { name: 'Enlarge screenshot: DoneToday' })).toBeInTheDocument()
})

test('opening shows the first screenshot in a named dialog with focus on Close', async () => {
  renderZoom()
  await openGallery()
  const dialog = screen.getByRole('dialog', { name: 'DoneToday · Screenshots' })
  expect(dialog).toHaveAttribute('open')
  expect(shown()).toEqual(['/media/a/1.webp', 'Today screen'])
  expect(screen.getByText('1 / 3')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Close' })).toHaveFocus()
})

test('Next and Previous buttons move through the screenshots and wrap around', async () => {
  renderZoom()
  await openGallery()
  await userEvent.click(screen.getByRole('button', { name: 'Next' }))
  expect(shown()).toEqual(['/media/a/2.webp', 'Statistics'])
  expect(screen.getByText('2 / 3')).toBeInTheDocument()
  await userEvent.click(screen.getByRole('button', { name: 'Previous' }))
  await userEvent.click(screen.getByRole('button', { name: 'Previous' }))
  expect(shown()).toEqual(['/media/a/3.webp', 'Settings'])
})

test('arrow keys move through the screenshots', async () => {
  renderZoom()
  await openGallery()
  const dialog = document.querySelector('dialog')!
  fireEvent.keyDown(dialog, { key: 'ArrowRight' })
  expect(shown()[0]).toBe('/media/a/2.webp')
  fireEvent.keyDown(dialog, { key: 'ArrowLeft' })
  fireEvent.keyDown(dialog, { key: 'ArrowLeft' })
  expect(shown()[0]).toBe('/media/a/3.webp')
})

test('the caption under each screenshot says what it shows', async () => {
  renderZoom()
  await openGallery()
  expect(document.querySelector('dialog figcaption')).toHaveTextContent('Today screen')
})

test('only the current screenshot is loaded', async () => {
  renderZoom()
  await openGallery()
  expect(document.querySelectorAll('dialog img')).toHaveLength(1)
})

test('a single screenshot shows no navigation', async () => {
  renderZoom([slides[0]])
  await openGallery()
  expect(screen.queryByRole('button', { name: 'Next' })).toBeNull()
  expect(screen.queryByText('1 / 1')).toBeNull()
})

test('Escape closes the dialog, returns focus and starts again at the first screenshot', async () => {
  renderZoom()
  const open = screen.getByRole('button', { name: 'Enlarge screenshot: DoneToday' })
  await userEvent.click(open)
  await userEvent.click(screen.getByRole('button', { name: 'Next' }))
  const dialog = document.querySelector('dialog')!
  fireEvent.keyDown(dialog, { key: 'Escape' })
  expect(dialog).not.toHaveAttribute('open')
  expect(open).toHaveFocus()
  await userEvent.click(open)
  expect(shown()[0]).toBe('/media/a/1.webp')
})

test('the Close button closes the dialog', async () => {
  renderZoom()
  await openGallery()
  await userEvent.click(screen.getByRole('button', { name: 'Close' }))
  expect(document.querySelector('dialog')).not.toHaveAttribute('open')
})
