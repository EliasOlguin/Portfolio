import { useEffect, useRef } from 'react'
import { formatLat, latitudeAt, progressOf } from '../route'
import './RouteLine.css'

const TICKS = [-50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50]

/** Decorative meridian in the left margin; its marker follows the scroll from Ushuaia to Köln. */
export function RouteLine() {
  const trackRef = useRef<HTMLDivElement>(null)
  const nowRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let queued = false
    const update = () => {
      queued = false
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0
      trackRef.current?.style.setProperty('--p', String(Math.min(1, Math.max(0, progress))))
      if (nowRef.current) nowRef.current.textContent = formatLat(latitudeAt(progress))
    }
    // At most one update per frame, however fast the scroll events arrive.
    const onScroll = () => {
      if (queued) return
      queued = true
      requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div className="route mono" aria-hidden="true">
      <span className="route__end route__end--start">54.8°S · Ushuaia</span>
      <div ref={trackRef} className="route__track">
        {TICKS.map((lat) => (
          <i key={lat} className="route__tick" style={{ top: `${progressOf(lat) * 100}%` }} />
        ))}
        <span className="route__marker">
          <span ref={nowRef} className="route__now">
            {formatLat(latitudeAt(0))}
          </span>
        </span>
      </div>
      <span className="route__end route__end--end">50.9°N · Köln</span>
    </div>
  )
}
