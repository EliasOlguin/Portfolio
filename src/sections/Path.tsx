import { Section } from '../components/Section'
import { useLang } from '../LangProvider'
import './Path.css'

export function Path() {
  const { t } = useLang()
  return (
    <Section id="path" label={`03 / ${t.path.title}`}>
      <ol className="path mono">
        {t.path.stations.map((s) => (
          <li key={s.title} className="path__station">
            <span className="path__dot" aria-hidden="true" />
            <h3>{s.title}</h3>
            <p>{s.note}</p>
          </li>
        ))}
      </ol>
      <div className="path__since">
        <h3 className="mono">{t.path.since}</h3>
        <p>{t.path.story}</p>
      </div>
    </Section>
  )
}
