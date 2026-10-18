import { useLayoutEffect, useRef } from 'react'
import { useLang } from '../LangProvider'
import { SECTION_IDS } from '../sectionIds'
import { useActiveSection } from '../useActiveSection'
import './SectionNav.css'

export function SectionNav() {
  const { t } = useLang()
  const { active, choose } = useActiveSection(SECTION_IDS)
  const listRef = useRef<HTMLUListElement>(null)
  const barRef = useRef<HTMLLIElement>(null)

  const labels: Record<(typeof SECTION_IDS)[number], string> = {
    experience: t.experience.title,
    projects: t.projects.title,
    path: t.path.title,
    education: t.education.title,
    contact: t.nav.contact,
  }

  // Slide the steel bar under the active link and keep that link visible on narrow screens.
  useLayoutEffect(() => {
    const list = listRef.current
    const bar = barRef.current
    const link = list?.querySelector<HTMLElement>('[aria-current]')
    if (!list || !bar) return
    if (!link) {
      bar.style.opacity = '0'
      return
    }
    bar.style.opacity = '1'
    bar.style.transform = `translateX(${link.offsetLeft}px)`
    bar.style.width = `${link.offsetWidth}px`
    list.scrollTo?.({ left: link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2 })
  }, [active, t])

  return (
    <nav className="snav" aria-label={t.nav.sections}>
      <ul ref={listRef} className="snav__list">
        {SECTION_IDS.map((id) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-current={active === id ? 'location' : undefined}
              onClick={() => choose(id)}
            >
              {labels[id]}
            </a>
          </li>
        ))}
        <li ref={barRef} className="snav__bar" aria-hidden="true" />
      </ul>
    </nav>
  )
}
