import { useRef, useState } from 'react'
import { useLang } from '../LangProvider'
import './ShotZoom.css'

/** `caption` is shown under the image; slides that carry their own text only need `alt`. */
export type Slide = { src: string; caption?: string; alt?: string }

type Props = { name: string; src: string; alt: string; slides: Slide[] }

/** Card screenshot with a button that opens a modal gallery of uncropped screenshots. */
export function ShotZoom({ name, src, alt, slides }: Props) {
  const { t } = useLang()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const openRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const [index, setIndex] = useState(0)
  const many = slides.length > 1
  const slide = slides[index]

  const open = () => {
    setIndex(0)
    dialogRef.current?.showModal()
    closeRef.current?.focus()
  }
  const close = () => dialogRef.current?.close()
  const step = (by: number) => setIndex((i) => (i + by + slides.length) % slides.length)

  return (
    <div className="zoom">
      <img className="project__shot" src={src} alt={alt} width={960} height={600} loading="lazy" />
      <button
        ref={openRef}
        type="button"
        className="zoom__open mono"
        aria-label={`${t.projects.zoom}: ${name}`}
        onClick={open}
      >
        {t.projects.zoom}
      </button>
      <dialog
        ref={dialogRef}
        className="zoom__dialog"
        aria-label={`${name} · ${t.projects.screenshots}`}
        // Browsers close on Escape by themselves; handling it here keeps focus return in one place.
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            e.preventDefault()
            close()
          } else if (many && e.key === 'ArrowRight') step(1)
          else if (many && e.key === 'ArrowLeft') step(-1)
        }}
        onClose={() => openRef.current?.focus()}
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        <div className="zoom__bar mono">
          {many && (
            <>
              <button type="button" onClick={() => step(-1)}>
                {t.projects.prev}
              </button>
              <span aria-live="polite">
                {index + 1} / {slides.length}
              </span>
              <button type="button" onClick={() => step(1)}>
                {t.projects.next}
              </button>
            </>
          )}
          <button ref={closeRef} type="button" className="zoom__close" onClick={close}>
            {t.projects.close}
          </button>
        </div>
        <figure className="zoom__figure">
          {/* Only the current screenshot is in the DOM, so the others load on demand. */}
          <img key={slide.src} src={slide.src} alt={slide.alt ?? slide.caption ?? ''} />
          {slide.caption && <figcaption>{slide.caption}</figcaption>}
        </figure>
      </dialog>
    </div>
  )
}
