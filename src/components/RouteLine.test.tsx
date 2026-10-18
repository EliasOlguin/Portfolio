import { act, render } from '@testing-library/react'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import { RouteLine } from './RouteLine'

function scrollTo(y: number) {
  vi.spyOn(window, 'scrollY', 'get').mockReturnValue(y)
  act(() => {
    window.dispatchEvent(new Event('scroll'))
  })
}

beforeEach(() => {
  // Run animation-frame callbacks right away so scroll updates are synchronous in tests.
  vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
    cb(0)
    return 1
  })
  vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(800)
  vi.spyOn(document.documentElement, 'scrollHeight', 'get').mockReturnValue(4800)
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

test('is decorative and hidden from assistive tech', () => {
  const { container } = render(<RouteLine />)
  expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true')
})

test('shows both ends of the route', () => {
  const { getByText } = render(<RouteLine />)
  expect(getByText('54.8°S · Ushuaia')).toBeInTheDocument()
  expect(getByText('50.9°N · Köln')).toBeInTheDocument()
})

test('the marker reads the latitude for the current scroll position', () => {
  const { container } = render(<RouteLine />)
  const marker = () => container.querySelector('.route__now')!.textContent
  expect(marker()).toBe('54.8°S')
  scrollTo(2000) // halfway through 4000 px of scrollable height
  expect(marker()).toBe('1.9°S')
  scrollTo(4000)
  expect(marker()).toBe('50.9°N')
})

test('stops listening when unmounted', () => {
  const remove = vi.spyOn(window, 'removeEventListener')
  const { unmount } = render(<RouteLine />)
  unmount()
  expect(remove).toHaveBeenCalledWith('scroll', expect.any(Function))
})
