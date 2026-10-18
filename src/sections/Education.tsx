import { useLang } from '../LangProvider'

export function Education() {
  const { t } = useLang()
  return (
    <section id="education" className="section" aria-label={t.education.title}>
      <div className="wrap columns">
        <div>
          <h2 className="section__label mono">04 / {t.education.title}</h2>
          <ul className="rows">
            {t.education.items.map((e) => (
              <li key={e.name}>
                <span>{e.name}</span>
                <span className="mono">{e.year}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="section__label mono">{t.languages.title}</h2>
          <ul className="rows">
            {t.languages.items.map((l) => (
              <li key={l.name}>
                <span>{l.name}</span>
                <span className="mono">{l.level}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
