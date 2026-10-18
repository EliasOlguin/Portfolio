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

const renderZoom = () =>
  renderIn(
    <ShotZoom
      name="DoneToday"
      src="/media/a.webp"
      fullSrc="/media/a-full.webp"
      alt="Today screen"
    />,
  )

test('the card image has a clearly named button to enlarge it', () => {
  renderZoom()
  expect(screen.getByRole('img', { name: 'Today screen' })).toHaveAttribute('src', '/media/a.webp')
  expect(screen.getByRole('button', { name: 'Enlarge screenshot: DoneToday' })).toBeInTheDocument()
})

test('opening shows the full screenshot in a named dialog with focus on Close', async () => {
  renderZoom()
  await userEvent.click(screen.getByRole('button', { name: 'Enlarge screenshot: DoneToday' }))
  const dialog = screen.getByRole('dialog', { name: 'DoneToday · Today screen' })
  expect(dialog).toHaveAttribute('open')
  expect(dialog.querySelector('img')).toHaveAttribute('src', '/media/a-full.webp')
  expect(screen.getByRole('button', { name: 'Close' })).toHaveFocus()
})

test('Escape closes the dialog and returns focus to the button', async () => {
  renderZoom()
  const open = screen.getByRole('button', { name: 'Enlarge screenshot: DoneToday' })
  await userEvent.click(open)
  const dialog = document.querySelector('dialog')!
  fireEvent.keyDown(dialog, { key: 'Escape' })
  expect(dialog).not.toHaveAttribute('open')
  expect(open).toHaveFocus()
})

test('the Close button closes the dialog', async () => {
  renderZoom()
  await userEvent.click(screen.getByRole('button', { name: 'Enlarge screenshot: DoneToday' }))
  await userEvent.click(screen.getByRole('button', { name: 'Close' }))
  expect(document.querySelector('dialog')).not.toHaveAttribute('open')
})
