import { useEffect, useRef, useState } from 'react'
import { useLang } from '../LangProvider'
import './LoopVideo.css'

type Props = { src: string; poster: string; label: string }

const reducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

export function LoopVideo({ src, poster, label }: Props) {
  const { t } = useLang()
  const ref = useRef<HTMLVideoElement>(null)
  const [reduce] = useState(reducedMotion)
  const [started, setStarted] = useState(false)

  // Autoplay can be refused by the browser; the poster then simply stays.
  const play = () => ref.current?.play().catch(() => {})

  useEffect(() => {
    const video = ref.current
    if (!video || reduce || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) play()
        else video.pause()
      },
      { threshold: 0.4 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [reduce])

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
      {reduce && !started && (
        <button
          type="button"
          className="loop__play mono"
          onClick={() => {
            setStarted(true)
            play()
          }}
        >
          {t.projects.play}
        </button>
      )}
    </div>
  )
}
