import { useEffect, useRef, useState } from 'react'
import { useLang } from '../LangProvider'
import './LoopVideo.css'

type Props = { src: string; poster: string; label: string }

const reducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

export function LoopVideo({ src, poster, label }: Props) {
  const { t } = useLang()
  const ref = useRef<HTMLVideoElement>(null)
  const [reduce] = useState(reducedMotion)
  const [playing, setPlaying] = useState(false)
  // Once the visitor pauses, scrolling back must not restart the clip (WCAG 2.2.2).
  const userPaused = useRef(reduce)

  const play = () => {
    setPlaying(true)
    // Autoplay can be refused by the browser; the poster then simply stays.
    ref.current?.play().catch(() => setPlaying(false))
  }
  const pause = () => {
    setPlaying(false)
    ref.current?.pause()
  }

  useEffect(() => {
    const video = ref.current
    if (!video || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          video.pause()
          setPlaying(false)
        } else if (!userPaused.current) play()
      },
      { threshold: 0.4 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  const toggle = () => {
    userPaused.current = playing
    if (playing) pause()
    else play()
  }

  return (
    <div className="loop">
      <video
        ref={ref}
        src={src}
        poster={poster}
        aria-label={label}
        muted
        loop
        playsInline
        preload="none"
      />
      <button type="button" className="loop__play mono" onClick={toggle}>
        {playing ? t.projects.pause : t.projects.play}
      </button>
    </div>
  )
}
