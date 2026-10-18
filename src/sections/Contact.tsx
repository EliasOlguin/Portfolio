import { useLang } from '../LangProvider'
import rhine from '../assets/rhine.svg?raw'
import { links } from '../links'

const river = rhine.replace('<svg ', '<svg focusable="false" ')

export function Contact() {
  const { t } = useLang()
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div
        className="contact__river"
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: river }}
      />
      <div className="wrap contact__body">
        <h2 id="contact-title" className="contact__title chrome">
          {t.contact.headline}
        </h2>
        <p className="contact__text">{t.contact.text}</p>
        <div className="contact__cta">
          <a className="btn btn--primary sheen" href={links.email}>
            {t.contact.email}
          </a>
          <a className="btn sheen" href={links.linkedin} target="_blank" rel="noopener noreferrer">
            {t.hero.cta.linkedin}
          </a>
          <a className="btn sheen" href={links.github} target="_blank" rel="noopener noreferrer">
            {t.hero.cta.github}
          </a>
        </div>
        <p className="contact__address mono">{links.email.replace('mailto:', '')}</p>
      </div>
    </section>
  )
}
