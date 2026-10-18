import { Chips } from '../components/Chips'
import { Section } from '../components/Section'
import { useLang } from '../LangProvider'
import { experienceStack } from '../links'

export function Experience() {
  const { t } = useLang()
  const e = t.experience
  return (
    <Section id="experience" label={`01 / ${e.title}`}>
      <article className="job">
        <h3 className="job__role">{e.role}</h3>
        <p className="job__place mono">{e.place}</p>
        <div className="job__items">
          {e.items.map((item) => (
            <div key={item.name} className="job__item">
              <h4>{item.name}</h4>
              <dl className="job__facts">
                <dt>{e.labels.problem}</dt>
                <dd>{item.problem}</dd>
                <dt>{e.labels.contribution}</dt>
                <dd>{item.contribution}</dd>
                <dt>{e.labels.benefit}</dt>
                <dd>{item.benefit}</dd>
              </dl>
            </div>
          ))}
        </div>
        <Chips items={experienceStack} />
      </article>
    </Section>
  )
}
