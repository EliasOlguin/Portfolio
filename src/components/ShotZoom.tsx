import { useRef } from 'react'
import { useLang } from '../LangProvider'
import './ShotZoom.css'

type Props = { name: string; src: string; fullSrc: string; alt: string }

/** Card screenshot with a button that opens the uncropped image in a modal dialog. */
export function ShotZoom({ name, src, fullSrc, alt }: Props) {
  const { t } = useLang()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const openRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  const open = () => {
    dialogRef.current?.showModal()
    closeRef.current?.focus()
  }
  const close = () => dialogRef.current?.close()

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
        aria-label={`${name} · ${alt}`}
        // Browsers close on Escape by themselves; handling it here keeps focus return in one place.
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            e.preventDefault()
            close()
          }
        }}
        onClose={() => openRef.current?.focus()}
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        <button ref={closeRef} type="button" className="zoom__close mono" onClick={close}>
          {t.projects.close}
        </button>
        <img src={fullSrc} alt={alt} loading="lazy" />
      </dialog>
    </div>
  )
}
