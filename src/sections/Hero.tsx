import contours from '../assets/ushuaia-contours.svg?raw'
import { useLang } from '../LangProvider'
import { links, stack } from '../links'
import './Hero.css'

const svg = contours.replace('<svg ', '<svg aria-hidden="true" focusable="false" ')

export function Hero() {
  const { lang, t } = useLang()
  const rows = [
    [t.hero.rows.frontend, stack.frontend],
    [t.hero.rows.backend, stack.backend],
    [t.hero.rows.data, stack.data],
    [t.hero.rows.base, t.hero.base],
  ]

  return (
    <div className="hero" id="top">
      <div className="hero__contours" dangerouslySetInnerHTML={{ __html: svg }} />
      <div className="wrap hero__body">
        <p className="hero__tag mono">
          <span>EO-01 / DEVELOPER SPEC</span>
          <span>54.80°S 68.30°W</span>
        </p>
        <h1 className="hero__name chrome">Elias Olguin</h1>
        <p className="hero__headline">{t.hero.headline}</p>
        <table className="hero__spec mono">
          <tbody>
            {rows.map(([label, value]) => (
              <tr key={label}>
                <th scope="row">{label}</th>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="hero__cta">
          <a className="btn btn--primary sheen" href={links.cv[lang]} download>
            {t.hero.cta.cv}
          </a>
          <a className="btn sheen" href={links.github} target="_blank" rel="noopener noreferrer">
            {t.hero.cta.github}
          </a>
          <a className="btn sheen" href={links.linkedin} target="_blank" rel="noopener noreferrer">
            {t.hero.cta.linkedin}
          </a>
          <a className="btn sheen" href={links.email}>
            {t.hero.cta.email}
          </a>
        </div>
      </div>
    </div>
  )
}
