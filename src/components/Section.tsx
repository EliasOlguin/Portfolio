import type { ReactNode } from 'react'

type Props = { id: string; label: string; children: ReactNode }

/** A page section whose <h2> is the mono spec label, e.g. "01 / EXPERIENCE". */
export function Section({ id, label, children }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="section">
      <div className="wrap">
        <h2 id={`${id}-title`} className="section__label mono">
          {label}
        </h2>
        {children}
      </div>
    </section>
  )
}
