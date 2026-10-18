import { act, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import { renderIn } from '../test/render'
import { SECTION_IDS } from '../sectionIds'
import { SectionNav } from './SectionNav'

type Observer = {
  cb: IntersectionObserverCallback
  options?: IntersectionObserverInit
  targets: Element[]
}
let observers: Observer[] = []
// The band observer is the one with a rootMargin; its callback drives most tests.
const band = () => observers.find((o) => o.options?.rootMargin)!

beforeEach(() => {
  observers = []
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      o: Observer
      constructor(cb: IntersectionObserverCallback, options?: IntersectionObserverInit) {
        this.o = { cb, options, targets: [] }
        observers.push(this.o)
      }
      observe(el: Element) {
        this.o.targets.push(el)
      }
      disconnect() {
        observers = observers.filter((o) => o !== this.o)
      }
    },
  )
  for (const id of SECTION_IDS) {
    const section = document.createElement('section')
    section.id = id
    document.body.append(section)
  }
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
  for (const id of SECTION_IDS) document.getElementById(id)?.remove()
})

function report(changes: [id: string, isIntersecting: boolean][], observer = band()) {
  act(() => {
    observer.cb(
      changes.map(
        ([id, isIntersecting]) =>
          ({
            isIntersecting,
            target: document.getElementById(id)!,
          }) as unknown as IntersectionObserverEntry,
      ),
      {} as IntersectionObserver,
    )
  })
}

const enter = (id: string) => report([[id, true]])

const nav = () => screen.getByRole('navigation', { name: 'Sections' })

test('links to every section in order', () => {
  renderIn(<SectionNav />)
  const links = within(nav()).getAllByRole('link')
  expect(links.map((a) => a.getAttribute('href'))).toEqual([
    '#experience',
    '#projects',
    '#path',
    '#education',
    '#contact',
  ])
  expect(links.map((a) => a.textContent)).toEqual([
    'Experience',
    'Projects',
    'Path',
    'Education',
    'Contact',
  ])
})

test('observes each section', () => {
  renderIn(<SectionNav />)
  expect(band().targets.map((el) => el.id)).toEqual([...SECTION_IDS])
})

test('marks the section in view as current', () => {
  renderIn(<SectionNav />)
  expect(within(nav()).queryByRole('link', { current: 'location' })).toBeNull()
  enter('projects')
  expect(within(nav()).getByRole('link', { current: 'location' })).toHaveTextContent('Projects')
  enter('contact')
  expect(within(nav()).getByRole('link', { current: 'location' })).toHaveTextContent('Contact')
  expect(within(nav()).getAllByRole('link', { current: 'location' })).toHaveLength(1)
})

test('labels follow the current language', () => {
  renderIn(<SectionNav />, 'de')
  expect(screen.getByRole('navigation', { name: 'Abschnitte' })).toBeInTheDocument()
  expect(
    within(screen.getByRole('navigation'))
      .getAllByRole('link')
      .map((a) => a.textContent),
  ).toEqual(['Erfahrung', 'Projekte', 'Werdegang', 'Ausbildung', 'Kontakt'])
})

test('renders without IntersectionObserver and marks nothing current', () => {
  vi.stubGlobal('IntersectionObserver', undefined)
  renderIn(<SectionNav />)
  expect(within(nav()).getAllByRole('link')).toHaveLength(5)
  expect(within(nav()).queryByRole('link', { current: 'location' })).toBeNull()
})

test('scrolling back above every section clears the current item', () => {
  renderIn(<SectionNav />)
  enter('experience')
  report([['experience', false]])
  expect(within(nav()).queryByRole('link', { current: 'location' })).toBeNull()
})

test('a jump that leaves one section and enters another in one batch marks the new one', () => {
  renderIn(<SectionNav />)
  enter('experience')
  report([
    ['experience', false],
    ['path', true],
  ])
  expect(within(nav()).getByRole('link', { current: 'location' })).toHaveTextContent('Path')
})

test('the last section becomes current once it is fully visible, even outside the band', () => {
  renderIn(<SectionNav />)
  enter('education')
  const end = observers.find((o) => o !== band())!
  expect(end.targets.map((el) => el.id)).toEqual(['contact'])
  report([['contact', true]], end)
  expect(within(nav()).getByRole('link', { current: 'location' })).toHaveTextContent('Contact')
  report([['contact', false]], end)
  expect(within(nav()).getByRole('link', { current: 'location' })).toHaveTextContent('Education')
})
