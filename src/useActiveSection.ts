import { useEffect, useState } from 'react'

/**
 * The id of the section crossing the middle band of the viewport, or null when none is (e.g. the hero).
 * The last section also counts once it is fully visible: a short final section never reaches the band.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    // Observers only report changes, so remember which sections are currently in the band.
    const inBand = new Set<string>()
    let lastFullyVisible = false
    const update = () =>
      // On a boundary two sections can share the band; the lower one is the one being entered.
      setActive(
        lastFullyVisible ? ids[ids.length - 1] : (ids.findLast((id) => inBand.has(id)) ?? null),
      )

    const band = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inBand.add(entry.target.id)
          else inBand.delete(entry.target.id)
        }
        update()
      },
      // A thin band just above the middle: usually one section is in it at a time.
      { rootMargin: '-45% 0px -50% 0px' },
    )
    const end = new IntersectionObserver(
      ([entry]) => {
        lastFullyVisible = entry.isIntersecting
        update()
      },
      { threshold: 0.99 },
    )

    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) band.observe(el)
    }
    const last = document.getElementById(ids[ids.length - 1])
    if (last) end.observe(last)

    return () => {
      band.disconnect()
      end.disconnect()
    }
  }, [ids])

  return active
}
