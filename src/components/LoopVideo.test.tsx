import { act, fireEvent, screen } from '@testing-library/react'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import { renderIn } from '../test/render'
import { LoopVideo } from './LoopVideo'

let observerCallback: IntersectionObserverCallback | undefined
const play = vi.fn(() => Promise.resolve())
const pause = vi.fn()

function setReducedMotion(reduce: boolean) {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: reduce && query.includes('reduce'),
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }))
}

function intersect(isIntersecting: boolean) {
  act(() => {
    observerCallback?.([{ isIntersecting } as IntersectionObserverEntry], {} as IntersectionObserver)
  })
}

beforeEach(() => {
  observerCallback = undefined
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      constructor(cb: IntersectionObserverCallback) {
        observerCallback = cb
      }
      observe() {}
      disconnect() {}
    },
  )
  vi.spyOn(HTMLMediaElement.prototype, 'play').mockImplementation(play)
  vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(pause)
  setReducedMotion(false)
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
  play.mockClear()
  pause.mockClear()
})

const renderVideo = () =>
  renderIn(<LoopVideo src="/media/a.mp4" poster="/media/a.jpg" label="DoneToday demo" />)

test('renders a muted, looping, lazy video with a poster', () => {
  renderVideo()
  const video = screen.getByLabelText('DoneToday demo') as HTMLVideoElement
  expect(video.tagName).toBe('VIDEO')
  expect(video.muted).toBe(true)
  expect(video).toHaveAttribute('loop')
  expect(video).toHaveAttribute('playsinline')
  expect(video).toHaveAttribute('preload', 'none')
  expect(video).toHaveAttribute('poster', '/media/a.jpg')
})

test('plays while visible and pauses when it leaves the viewport', () => {
  renderVideo()
  intersect(true)
  expect(play).toHaveBeenCalledTimes(1)
  intersect(false)
  expect(pause).toHaveBeenCalledTimes(1)
})

test('with reduced motion it waits for a click on Play', () => {
  setReducedMotion(true)
  renderVideo()
  intersect(true)
  expect(play).not.toHaveBeenCalled()
  fireEvent.click(screen.getByRole('button', { name: 'Play' }))
  expect(play).toHaveBeenCalledTimes(1)
})

test('a rejected autoplay keeps the poster and does not throw', async () => {
  play.mockImplementationOnce(() => Promise.reject(new Error('NotAllowedError')))
  renderVideo()
  intersect(true)
  await Promise.resolve()
  expect(screen.getByLabelText('DoneToday demo')).toHaveAttribute('poster', '/media/a.jpg')
})

test('without IntersectionObserver it renders and does not autoplay', () => {
  vi.stubGlobal('IntersectionObserver', undefined)
  renderVideo()
  expect(screen.getByLabelText('DoneToday demo')).toBeInTheDocument()
  expect(play).not.toHaveBeenCalled()
})
