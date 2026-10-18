import { useLang } from '../LangProvider'
import { links } from '../links'

export function Contact() {
  const { t } = useLang()
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="wrap">
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
      </div>
    </section>
  )
}
