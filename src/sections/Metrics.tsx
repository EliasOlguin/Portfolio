import { Section } from '../components/Section'
import { useLang } from '../LangProvider'

export function Metrics() {
  const { t } = useLang()
  return (
    <Section id="glance" label={t.metrics.title}>
      <dl className="metrics mono">
        {t.metrics.items.map((m) => (
          <div key={m.label} className="metrics__item">
            <dt>
              <span className="metrics__kind">{m.kind}</span>
              <span className="metrics__label">{m.label}</span>
            </dt>
            <dd>{m.value}</dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
